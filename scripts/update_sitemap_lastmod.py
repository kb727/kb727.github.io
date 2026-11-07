#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Sync <lastmod> in sitemap.xml with each target file's mtime (YYYY-MM-DD).

URL mapping: https://kb727.com/ -> index.html; other paths map directly
onto the repo (e.g. /attachments/Business/x.html). URLs whose file is
missing are skipped.

Usage:
    python scripts/update_sitemap_lastmod.py          # rewrite sitemap.xml
    python scripts/update_sitemap_lastmod.py --check  # exit 1 if out of sync
"""
import io
import os
import re
import sys
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITEMAP = os.path.join(ROOT, 'sitemap.xml')
ENTRY_RE = re.compile(r'(<loc>(https://kb727\.com/[^<]*)</loc>\s*<lastmod>)([^<]*)(</lastmod>)')


def url_to_file(url):
    path = url[len('https://kb727.com/'):]
    if path in ('', '/'):
        path = 'index.html'
    p = os.path.join(ROOT, path.replace('/', os.sep))
    return p if os.path.isfile(p) else None


def main():
    check_only = '--check' in sys.argv
    s = io.open(SITEMAP, encoding='utf-8').read()
    changed = []
    skipped = []

    def repl(m):
        url = m.group(2)
        f = url_to_file(url)
        if f is None:
            skipped.append(url)
            return m.group(0)
        want = time.strftime('%Y-%m-%d', time.localtime(os.path.getmtime(f)))
        if m.group(3) != want:
            changed.append((url, m.group(3), want))
            return m.group(1) + want + m.group(4)
        return m.group(0)

    s2 = ENTRY_RE.sub(repl, s)
    print('entries changed:', len(changed))
    for url, old, new in changed:
        print(' ', url, old, '->', new)
    if skipped:
        print('skipped (no file):', len(skipped))
        for url in skipped:
            print(' ', url)
    if check_only:
        sys.exit(1 if changed else 0)
    if s2 != s:
        io.open(SITEMAP, 'w', encoding='utf-8', newline='').write(s2)
        print('sitemap.xml updated')


if __name__ == '__main__':
    main()
