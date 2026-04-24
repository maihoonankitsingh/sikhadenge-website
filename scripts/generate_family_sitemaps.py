import json
from pathlib import Path
from collections import defaultdict

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
DATA = ROOT / "data/generated-seo-merged.json"
PUBLIC = ROOT / "public"
SITEMAP_DIR = PUBLIC / "sitemaps"
REPORT = ROOT / "reports/family_sitemaps_report.txt"

BASE_URL = "https://sikhadenge.in"
TODAY = "2026-04-15"

strong_20 = [
    "ai-tools","ai-skills","ai-course","ai-career","ai-jobs","ai-marketing","ai-automation",
    "prompt-engineering","ai-freelancing","ai-content-creation","ai-video-editing",
    "ai-for-marketing","ai-for-sales","ai-for-design","ai-for-productivity",
    "ai-business-ideas","ai-side-hustle","make-money-with-ai","ai-expert","ai-learning-path"
]

pending_30 = [
    "graphic-design","video-editing","digital-marketing","seo","copywriting",
    "web-development","no-code-development","personal-branding","freelancing","motion-graphics",
    "after-effects","premiere-pro","logo-design","ui-design","ux-design",
    "python","app-development","remote-jobs","online-business","sales",
    "consulting","ecommerce","social-media-marketing","performance-marketing","email-marketing",
    "content-marketing","youtube-growth","instagram-growth","ai-for-creators","web-design"
]

all_families = strong_20 + pending_30

def load():
    return json.loads(DATA.read_text())

def detect_family(item):
    for key in ("familyKey", "rootSlug", "topicFamily", "family"):
        v = item.get(key)
        if isinstance(v, str) and v.strip():
            return v.strip()
    slug = item.get("slug")
    if isinstance(slug, str):
        for fam in sorted(all_families, key=len, reverse=True):
            if slug == fam or slug.startswith(fam + "-"):
                return fam
    return None

def make_url(loc):
    return f'  <url><loc>{loc}</loc><lastmod>{TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>'

data = load()
family_urls = defaultdict(list)

for item in data:
    if not isinstance(item, dict):
        continue
    slug = item.get("slug")
    if not isinstance(slug, str) or not slug.strip():
        continue
    fam = detect_family(item)
    if fam:
        family_urls[fam].append(f"{BASE_URL}/{slug}")

# de-dup + sort
for fam in list(family_urls.keys()):
    family_urls[fam] = sorted(set(family_urls[fam]))

SITEMAP_DIR.mkdir(parents=True, exist_ok=True)

group_defs = [
    ("sitemap-strong-1.xml", strong_20[:10]),
    ("sitemap-strong-2.xml", strong_20[10:]),
    ("sitemap-pending-1.xml", pending_30[:10]),
    ("sitemap-pending-2.xml", pending_30[10:20]),
    ("sitemap-pending-3.xml", pending_30[20:]),
]

written = []
report_lines = []

for filename, families in group_defs:
    urls = []
    for fam in families:
        urls.extend(family_urls.get(fam, []))
    urls = sorted(set(urls))

    xml = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    xml.extend(make_url(u) for u in urls)
    xml.append('</urlset>')

    out = SITEMAP_DIR / filename
    out.write_text("\n".join(xml), encoding="utf-8")
    written.append(filename)

    report_lines.append(f"{filename}\t{len(urls)}")
    for fam in families:
        report_lines.append(f"  {fam}\t{len(family_urls.get(fam, []))}")
    report_lines.append("")

# sitemap index
index_xml = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for filename in written:
    index_xml.append(f"  <sitemap><loc>{BASE_URL}/sitemaps/{filename}</loc><lastmod>{TODAY}</lastmod></sitemap>")
index_xml.append('</sitemapindex>')

(PUBLIC / "sitemap-families.xml").write_text("\n".join(index_xml), encoding="utf-8")

REPORT.write_text("\n".join(report_lines), encoding="utf-8")
print(REPORT.read_text())
print("\nWROTE:")
for f in written:
    print(" -", f)
print(" - sitemap-families.xml")
