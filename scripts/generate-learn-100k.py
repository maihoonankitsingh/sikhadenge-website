from pathlib import Path
from datetime import date
from xml.sax.saxutils import escape
import json
import re

BASE = "https://sikhadenge.in"
TOTAL_TARGET = 100000
SPLIT_SIZE = 20000
DIRECTORY_SIZE = 1000
TODAY = date.today().isoformat()

public = Path("public")
generated = Path("data/generated")
public.mkdir(exist_ok=True)
generated.mkdir(parents=True, exist_ok=True)

tools = [
    "chatgpt","claude","gemini","perplexity","copilot","grok","notion-ai","canva-ai","midjourney","leonardo-ai",
    "dall-e","gamma","cursor","lovable","bolt-new","replit","n8n","zapier","make","google-sheets",
    "excel","airtable","notion","figma","canva","capcut","descript","elevenlabs","heygen","fireflies",
    "otter","notebooklm","google-flow","veo-3","nano-banana","meta-ai","jasper","surfer-seo","semrush","ahrefs",
    "hubspot","mailchimp","shopify","wordpress","google-analytics","google-tag-manager","looker-studio","power-bi","tableau","slack"
]

base_skills = [
    "seo","digital-marketing","content-writing","social-media-marketing","youtube-growth",
    "linkedin-marketing","email-marketing","sales","customer-support","hr",
    "recruitment","data-analysis","excel-reporting","python","no-code-automation",
    "web-development","graphic-design","video-editing","prompt-engineering","business-research",
    "product-management","project-management","finance","ecommerce","local-business-growth"
]

skill_modes = ["workflows", "projects", "automation", "reporting"]

audiences = [
    "students","freshers","freelancers","hr-professionals","marketers",
    "content-creators","small-business-owners","teachers","coaches","sales-teams",
    "support-teams","founders","agencies","designers","video-editors",
    "developers","data-analysts","operations-teams","real-estate-agents","ecommerce-sellers"
]

def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    return value

def title_case(value: str) -> str:
    special = {
        "ai": "AI", "seo": "SEO", "aeo": "AEO", "geo": "GEO", "hr": "HR",
        "ui": "UI", "ux": "UX", "ppc": "PPC", "crm": "CRM", "sql": "SQL",
        "api": "API", "n8n": "n8n", "veo": "Veo", "dall": "DALL",
        "chatgpt": "ChatGPT", "youtube": "YouTube", "linkedin": "LinkedIn",
        "notebooklm": "NotebookLM", "wordpress": "WordPress", "shopify": "Shopify",
        "power": "Power", "bi": "BI"
    }
    words = slugify(value).split("-")
    return " ".join(special.get(w, w.capitalize()) for w in words)

records = []
seen_slugs = set()
seen_titles = set()

for tool in tools:
    for skill_base in base_skills:
        for mode in skill_modes:
            skill = f"{skill_base}-{mode}"
            for audience in audiences:
                slug = f"how-to-use-{slugify(tool)}-for-{slugify(skill)}-as-{slugify(audience)}"
                title = f"How {title_case(audience)} Can Use {title_case(tool)} for {title_case(skill)}"

                if slug in seen_slugs or title in seen_titles:
                    continue

                seen_slugs.add(slug)
                seen_titles.add(title)

                records.append({
                    "slug": slug,
                    "url": f"{BASE}/learn/{slug}",
                    "title": title,
                    "tool": title_case(tool),
                    "skill": title_case(skill),
                    "audience": title_case(audience),
                    "canonical": f"{BASE}/learn/{slug}",
                    "sitemap": f"sitemap-learn-{(len(records)//SPLIT_SIZE)+1}.xml"
                })

                if len(records) >= TOTAL_TARGET:
                    break
            if len(records) >= TOTAL_TARGET:
                break
        if len(records) >= TOTAL_TARGET:
            break
    if len(records) >= TOTAL_TARGET:
        break

if len(records) != TOTAL_TARGET:
    raise SystemExit(f"Expected {TOTAL_TARGET}, got {len(records)}")

# clean old generated files
for fp in public.glob("sitemap-learn*.xml"):
    fp.unlink()
for fp in public.glob("learn-directory-*.html"):
    fp.unlink()

(generated / "learn-100k-manifest.json").write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
(generated / "learn-100k-urls.txt").write_text("\n".join(r["url"] for r in records) + "\n", encoding="utf-8")

def write_url_sitemap(path: Path, chunk):
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    for r in chunk:
        lines.append("  <url>")
        lines.append(f"    <loc>{escape(r['url'])}</loc>")
        lines.append(f"    <lastmod>{TODAY}</lastmod>")
        lines.append("  </url>")
    lines.append("</urlset>")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")

sitemap_files = []
for index in range(0, len(records), SPLIT_SIZE):
    part = len(sitemap_files) + 1
    name = f"sitemap-learn-{part}.xml"
    write_url_sitemap(public / name, records[index:index+SPLIT_SIZE])
    sitemap_files.append(name)

# directory pages: 100 pages x 1000 links
directory_files = []
for index in range(0, len(records), DIRECTORY_SIZE):
    part = len(directory_files) + 1
    label = str(part).zfill(3)
    name = f"learn-directory-{label}.html"
    chunk = records[index:index+DIRECTORY_SIZE]

    prev_link = f'<a href="/learn-directory-{str(part-1).zfill(3)}.html">Previous</a>' if part > 1 else ""
    next_link = f'<a href="/learn-directory-{str(part+1).zfill(3)}.html">Next</a>' if index + DIRECTORY_SIZE < len(records) else ""

    links = "\n".join(
        f'<li><a href="{escape(r["url"])}">{escape(r["title"])}</a></li>'
        for r in chunk
    )

    html = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Sikhadenge Learn Directory {label}</title>
  <meta name="description" content="Sikhadenge learn directory page {label} with practical AI tool, workflow, SEO, AEO, GEO, automation, career and portfolio learning paths.">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="{BASE}/{name}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body{{font-family:Arial,sans-serif;background:#f3f7f1;color:#0f172a;margin:0}}
    main{{max-width:1120px;margin:auto;padding:40px 20px}}
    h1{{font-size:42px;line-height:1.1;margin:0 0 12px}}
    p{{font-size:17px;line-height:1.7;color:#475569}}
    nav{{display:flex;gap:12px;margin:24px 0;flex-wrap:wrap}}
    a{{color:#0f766e;text-decoration:none;font-weight:700}}
    nav a{{background:white;border:1px solid #dbe4dd;border-radius:999px;padding:10px 16px}}
    ul{{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px;padding:0;list-style:none}}
    li{{background:white;border:1px solid #dbe4dd;border-radius:16px;padding:14px}}
  </style>
</head>
<body>
<main>
  <nav><a href="/learn">Learn Hub</a>{prev_link}{next_link}</nav>
  <h1>Sikhadenge Learn Directory {label}</h1>
  <p>Browse practical AI learning paths, no-code workflows, SEO, AEO, GEO, career skills, freelancing workflows and portfolio-ready guides.</p>
  <ul>
    {links}
  </ul>
  <nav><a href="/learn">Learn Hub</a>{prev_link}{next_link}</nav>
</main>
</body>
</html>
"""
    (public / name).write_text(html, encoding="utf-8")
    directory_files.append(name)

# directory sitemap
dir_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
]
dir_lines.append("  <url>")
dir_lines.append(f"    <loc>{BASE}/learn</loc>")
dir_lines.append(f"    <lastmod>{TODAY}</lastmod>")
dir_lines.append("  </url>")
for name in directory_files:
    dir_lines.append("  <url>")
    dir_lines.append(f"    <loc>{BASE}/{name}</loc>")
    dir_lines.append(f"    <lastmod>{TODAY}</lastmod>")
    dir_lines.append("  </url>")
dir_lines.append("</urlset>")
(public / "sitemap-learn-directory.xml").write_text("\n".join(dir_lines) + "\n", encoding="utf-8")

# sitemap index
index_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
]
for name in sitemap_files + ["sitemap-learn-directory.xml"]:
    index_lines.append("  <sitemap>")
    index_lines.append(f"    <loc>{BASE}/{name}</loc>")
    index_lines.append(f"    <lastmod>{TODAY}</lastmod>")
    index_lines.append("  </sitemap>")
index_lines.append("</sitemapindex>")
(public / "sitemap-learn.xml").write_text("\n".join(index_lines) + "\n", encoding="utf-8")

print("Total records:", len(records))
print("Unique slugs:", len(seen_slugs))
print("Unique titles:", len(seen_titles))
print("Learn URL sitemap files:", len(sitemap_files))
print("Directory pages:", len(directory_files))
for name in sitemap_files:
    print(name, (public / name).read_text(encoding="utf-8").count("<url>"))
print("sitemap-learn-directory.xml", (public / "sitemap-learn-directory.xml").read_text(encoding="utf-8").count("<url>"))
