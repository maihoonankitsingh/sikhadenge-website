import json
from pathlib import Path
from collections import defaultdict

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
DATA = ROOT / "data/generated-seo-merged.json"
PUBLIC = ROOT / "public"
SITEMAP_DIR = PUBLIC / "sitemaps"
REPORT = ROOT / "reports/tool_sitemaps_report.txt"

BASE_URL = "https://sikhadenge.in"
TODAY = "2026-04-15"

tools = [
    "chatgpt","claude","gemini","perplexity","nano-banana","copilot","canva-ai","cursor","midjourney","elevenlabs",
    "heygen","gamma","notion-ai","leonardo-ai","replit-ai","bolt-new","suno","grok","sora","runway"
]

def load():
    return json.loads(DATA.read_text())

def detect_tool(item):
    for key in ("familyKey", "rootSlug", "topicFamily", "family"):
        v = item.get(key)
        if isinstance(v, str) and v.strip() in tools:
            return v.strip()
    slug = item.get("slug")
    if isinstance(slug, str):
        for tool in sorted(tools, key=len, reverse=True):
            if slug == tool or slug.startswith(tool + "-") or slug == f"expert-in-{tool}" or slug == f"master-in-{tool}":
                return tool
    return None

def make_url(loc):
    return f'  <url><loc>{loc}</loc><lastmod>{TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>'

data = load()
tool_urls = defaultdict(list)

for item in data:
    if not isinstance(item, dict):
        continue
    slug = item.get("slug")
    if not isinstance(slug, str) or not slug.strip():
        continue
    tool = detect_tool(item)
    if tool:
        tool_urls[tool].append(f"{BASE_URL}/{slug}")

for tool in list(tool_urls.keys()):
    tool_urls[tool] = sorted(set(tool_urls[tool]))

SITEMAP_DIR.mkdir(parents=True, exist_ok=True)

group_defs = [
    ("sitemap-tools-1.xml", tools[:5]),
    ("sitemap-tools-2.xml", tools[5:10]),
    ("sitemap-tools-3.xml", tools[10:15]),
    ("sitemap-tools-4.xml", tools[15:20]),
]

written = []
report_lines = []

for filename, group_tools in group_defs:
    urls = []
    for tool in group_tools:
        urls.extend(tool_urls.get(tool, []))
    urls = sorted(set(urls))

    xml = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    xml.extend(make_url(u) for u in urls)
    xml.append('</urlset>')

    out = SITEMAP_DIR / filename
    out.write_text("\n".join(xml), encoding="utf-8")
    written.append(filename)

    report_lines.append(f"{filename}\t{len(urls)}")
    for tool in group_tools:
        report_lines.append(f"  {tool}\t{len(tool_urls.get(tool, []))}")
    report_lines.append("")

tool_index = ['<?xml version="1.0" encoding="UTF-8"?>',
              '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for filename in written:
    tool_index.append(f"  <sitemap><loc>{BASE_URL}/sitemaps/{filename}</loc><lastmod>{TODAY}</lastmod></sitemap>")
tool_index.append('</sitemapindex>')

(PUBLIC / "sitemap-tools-index.xml").write_text("\n".join(tool_index), encoding="utf-8")

# main family sitemap index me tool index include karo agar missing ho
family_index_path = PUBLIC / "sitemap-families.xml"
if family_index_path.exists():
    text = family_index_path.read_text(encoding="utf-8")
    tool_loc = f"{BASE_URL}/sitemap-tools-index.xml"
    if tool_loc not in text:
        insert_line = f"  <sitemap><loc>{tool_loc}</loc><lastmod>{TODAY}</lastmod></sitemap>\n"
        text = text.replace("</sitemapindex>", insert_line + "</sitemapindex>")
        family_index_path.write_text(text, encoding="utf-8")

REPORT.write_text("\n".join(report_lines), encoding="utf-8")
print(REPORT.read_text())
print("\nWROTE:")
for f in written:
    print(" -", f)
print(" - sitemap-tools-index.xml")
