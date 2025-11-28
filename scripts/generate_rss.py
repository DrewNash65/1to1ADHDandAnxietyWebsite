#!/usr/bin/env python3
"""
Generate a simple RSS feed from HTML files in `blog/articles`.
Writes `blog/rss.xml`.

Usage:
  python3 scripts/generate_rss.py

Environment:
  BASE_URL (optional) - default: https://adhd.1to1pediatrics.com
"""
import os
import glob
import re
from datetime import datetime, timezone
from email.utils import format_datetime

BASE_URL = os.environ.get('BASE_URL', 'https://adhd.1to1pediatrics.com')
ART_DIR = os.path.join('blog', 'articles')
OUT_PATH = os.path.join('blog', 'rss.xml')

if not os.path.isdir(ART_DIR):
    print(f"Articles directory not found: {ART_DIR}")
    raise SystemExit(1)

files = glob.glob(os.path.join(ART_DIR, '*.html'))
items = []

for fp in files:
    try:
        with open(fp, 'r', encoding='utf-8') as f:
            html = f.read()
    except Exception as e:
        print('Skipping', fp, 'read error:', e)
        continue

    # title
    m = re.search(r'<meta\s+property="og:title"\s+content="([^"]+)"', html, re.I)
    if m:
        title = m.group(1).strip()
    else:
        m = re.search(r'<title>(.*?)</title>', html, re.I|re.S)
        title = (m.group(1).strip() if m else os.path.splitext(os.path.basename(fp))[0])

    # description
    m = re.search(r'<meta\s+name="description"\s+content="([^"]+)"', html, re.I)
    if m:
        desc = m.group(1).strip()
    else:
        # try og:description
        m = re.search(r'<meta\s+property="og:description"\s+content="([^"]+)"', html, re.I)
        desc = m.group(1).strip() if m else ''

    # published date
    m = re.search(r'<meta\s+property="article:published_time"\s+content="([^"]+)"', html, re.I)
    pub_dt = None
    if m:
        date_str = m.group(1).strip()
        # try ISO parse
        try:
            pub_dt = datetime.fromisoformat(date_str)
            if pub_dt.tzinfo is None:
                pub_dt = pub_dt.replace(tzinfo=timezone.utc)
        except Exception:
            try:
                pub_dt = datetime.strptime(date_str, '%Y-%m-%d')
                pub_dt = pub_dt.replace(tzinfo=timezone.utc)
            except Exception:
                pub_dt = None

    if not pub_dt:
        # fallback: file mtime
        ts = os.path.getmtime(fp)
        pub_dt = datetime.fromtimestamp(ts, tz=timezone.utc)

    rel = os.path.relpath(fp).replace('\\', '/')
    link = BASE_URL.rstrip('/') + '/' + rel.lstrip('/')

    items.append({
        'title': title,
        'desc': desc,
        'link': link,
        'pub_dt': pub_dt,
        'guid': link,
    })

# sort newest first
items.sort(key=lambda x: x['pub_dt'], reverse=True)

channel_title = "1-to-1 ADHD & Anxiety Solutions Blog"
channel_link = BASE_URL.rstrip('/') + '/blog.html'
channel_desc = "Expert insights, tips, and latest research on ADHD and anxiety in children by Dr. Andrew L. Nash"

now = datetime.now(timezone.utc)

parts = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/blog/rss.xsl"?>',
    '<rss version="2.0">',
    '<channel>',
    f'<title><![CDATA[{channel_title}]]></title>',
    f'<link>{channel_link}</link>',
    f'<description><![CDATA[{channel_desc}]]></description>',
    '<language>en-us</language>',
    f'<lastBuildDate>{format_datetime(now)}</lastBuildDate>',
]

for it in items:
    title = it['title']
    desc = it['desc'] or ''
    link = it['link']
    guid = it['guid']
    pubDate = format_datetime(it['pub_dt'])

    parts.append('<item>')
    parts.append(f'<title><![CDATA[{title}]]></title>')
    parts.append(f'<link>{link}</link>')
    parts.append(f'<guid isPermaLink="true">{guid}</guid>')
    parts.append(f'<pubDate>{pubDate}</pubDate>')
    # wrap description in CDATA to preserve HTML
    parts.append(f'<description><![CDATA[{desc}]]></description>')
    parts.append('</item>')

parts.append('</channel>')
parts.append('</rss>')

xml = '\n'.join(parts)

os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
with open(OUT_PATH, 'w', encoding='utf-8') as f:
    f.write(xml)

print('WROTE', OUT_PATH)

# Also emit a plain HTML view for browsers that don't apply XSL transforms
HTML_OUT = os.path.join('blog', 'rss.html')
html_parts = [
    '<!doctype html>',
    '<html>',
    '<head>',
    '<meta charset="utf-8"/>',
    f'<title>{channel_title}</title>',
    '<style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;padding:24px} .item{border-bottom:1px solid #e6e6e6;padding:16px 0} .meta{color:#6b7280;font-size:0.95rem} a.title{color:#0e8a9b;text-decoration:none;font-weight:700;font-size:1.05rem}</style>',
    '</head>',
    '<body>',
    f'<h1>{channel_title}</h1>',
    f'<p>{channel_desc}</p>'
]

for it in items:
    t = it['title']
    d = it['desc'] or ''
    l = it['link']
    pd = format_datetime(it['pub_dt'])
    html_parts.append('<div class="item">')
    html_parts.append(f'<div class="meta">{pd}</div>')
    html_parts.append(f'<div><a class="title" href="{l}">{t}</a></div>')
    html_parts.append(f'<div class="meta">{d}</div>')
    html_parts.append('</div>')

html_parts.append('</body>')
html_parts.append('</html>')

html = '\n'.join(html_parts)
with open(HTML_OUT, 'w', encoding='utf-8') as f:
    f.write(html)
print('WROTE', HTML_OUT)
