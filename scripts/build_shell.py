#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
通过 _includes/sidebar-zh.html 与 _includes/footer-zh.html 统一生成附件页外壳。

仅改写 attachments 目录下的静态页面（保留页面自身的正文、样式与脚本），
不依赖 Jekyll 构建，因此 GitHub Pages 无需额外构建配置。

用法：
    python scripts/build_shell.py          # 写入
    python scripts/build_shell.py --check  # 仅检查是否有页面与模板不一致
"""
import os
import re
import sys
import glob
import io

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INCLUDES = os.path.join(ROOT, '_includes')

SIDEBAR_MARK = ('<!-- @@SIDEBAR@@ -->', '<!-- @@/SIDEBAR@@ -->')
FOOTER_MARK = ('<!-- @@FOOTER@@ -->', '<!-- @@/FOOTER@@ -->')


def render(name, root_prefix):
    s = io.open(os.path.join(INCLUDES, name), encoding='utf-8').read()
    return s.replace('{{root}}', root_prefix).strip()


def block_with_marker(content, mark):
    return '%s\n%s\n%s' % (mark[0], content, mark[1])


def update(s, name, mark, pattern, root_prefix):
    content = render(name, root_prefix)
    wrapped = block_with_marker(content, mark)
    if mark[0] in s:
        return re.sub(mark[0] + '.*?' + mark[1], wrapped, s, count=1, flags=re.S), True
    m = re.search(pattern, s, re.S)
    if not m:
        return s, False
    return s[:m.start()] + wrapped + s[m.end():], True


def main():
    check_only = '--check' in sys.argv
    files = sorted(glob.glob(os.path.join(ROOT, 'attachments', '**', '*.html'), recursive=True))
    changed = []
    missing = []

    for f in files:
        s = io.open(f, encoding='utf-8').read()
        if '<meta http-equiv="refresh"' in s:
            continue

        rel = os.path.relpath(f, ROOT).replace('\\', '/')
        prefix = '../' * rel.count('/')  # attachments/<dir>/page.html -> ../../

        s2, ok1 = update(s, 'sidebar-zh.html', SIDEBAR_MARK,
                         r'<div[^>]*id="sidebar-wrapper"[^>]*>.*?</ul>\s*</div>', prefix)
        s2, ok2 = update(s2, 'footer-zh.html', FOOTER_MARK,
                         r'<footer\b.*?</footer>', prefix)

        if not (ok1 and ok2):
            missing.append(rel)
            continue
        if s2 != s:
            changed.append(rel)
            if not check_only:
                io.open(f, 'w', encoding='utf-8').write(s2)

    print('pages scanned:', len(files))
    print('updated pages:', len(changed))
    print('pages without shell match:', len(missing), missing[:5])
    if check_only and changed:
        print('out of sync:', changed[:10])
        sys.exit(1)


if __name__ == '__main__':
    main()
