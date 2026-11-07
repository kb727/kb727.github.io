"""Check that every local src/href/poster/srcset/onerror-fallback referenced by
site HTML files exists on disk. Exits 1 when anything is missing.

Usage: python scripts/check_links.py
"""
import os
import re
import glob
import io
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ATTR_RE = re.compile(r'(?:src|href|poster)\s*=\s*"([^"]*)"', re.I)
SRCSET_RE = re.compile(r'srcset\s*=\s*"([^"]+)"', re.I)
FALLBACK_RE = re.compile(r"this\.src='([^']+)'")
SKIP_PREFIX = ('#', 'javascript:', 'mailto:', 'tel:', 'data:', 'http://', 'https://', '//')


def collect(html_text):
    urls = [m.group(1).strip() for m in ATTR_RE.finditer(html_text)]
    for m in SRCSET_RE.finditer(html_text):
        urls += [p.strip().split(' ')[0] for p in m.group(1).split(',')]
    urls += FALLBACK_RE.findall(html_text)
    return urls


def main():
    missing = []
    html_files = [f for f in glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True)
                  if os.sep + '_includes' + os.sep not in f
                  and os.sep + '.git' + os.sep not in f]
    for f in html_files:
        s = io.open(f, encoding='utf-8', errors='ignore').read()
        base = os.path.dirname(f)
        for u in collect(s):
            if not u or u.startswith(SKIP_PREFIX) or '{{' in u:
                continue
            p = u.split('#')[0].split('?')[0]
            if not p:
                continue
            target = os.path.normpath(os.path.join(base, p.replace('/', os.sep)))
            if not os.path.exists(target):
                missing.append((os.path.relpath(f, ROOT), u))
    if missing:
        print('MISSING LOCAL TARGETS:', len(missing))
        for page, u in missing:
            print(' ', page, '->', u)
        return 1
    print('OK: all local references in %d html files resolve.' % len(html_files))
    return 0


if __name__ == '__main__':
    sys.exit(main())
