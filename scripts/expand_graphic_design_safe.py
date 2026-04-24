import json
from pathlib import Path

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
MERGED = ROOT / "data/generated-seo-merged.json"
MASTER = ROOT / "data/generated-seo-master.json"
REPORT = ROOT / "reports/graphic_design_safe_report.txt"

FAMILY = "graphic-design"
LABEL = "Graphic Design"

cities = [
    "delhi","mumbai","bangalore","hyderabad","pune","chennai","kolkata","ahmedabad","jaipur","lucknow",
    "noida","gurgaon","indore","surat","patna","bhopal","kanpur","nagpur","vadodara","coimbatore"
]

audiences = [
    "beginners","students","freelancers","job-seekers","working-professionals",
    "creators","founders","small-business-owners","agencies","consultants"
]

city_patterns = [
    ("for-beginners-in-{city}", "Graphic Design for Beginners in {City}"),
    ("course-in-{city}", "Graphic Design Course in {City}"),
    ("jobs-in-{city}", "Graphic Design Jobs in {City}"),
    ("salary-in-{city}", "Graphic Design Salary in {City}"),
    ("training-in-{city}", "Graphic Design Training in {City}")
]

audience_patterns = [
    ("best-course-for-{aud}", "Best Graphic Design Course for {Aud}"),
    ("roadmap-for-{aud}", "Graphic Design Roadmap for {Aud}"),
    ("jobs-for-{aud}", "Graphic Design Jobs for {Aud}"),
    ("salary-for-{aud}", "Graphic Design Salary for {Aud}"),
    ("tools-for-{aud}", "Graphic Design Tools for {Aud}")
]

question_patterns = [
    ("what-is", "What is Graphic Design"),
    ("how-to-start", "How to Start Graphic Design"),
    ("how-to-learn", "How to Learn Graphic Design"),
    ("best-course", "Best Graphic Design Course"),
    ("best-tools", "Best Graphic Design Tools"),
    ("roadmap", "Graphic Design Roadmap"),
    ("salary-in-india", "Graphic Design Salary in India"),
    ("jobs-without-degree", "Graphic Design Jobs Without Degree"),
    ("jobs-without-experience", "Graphic Design Jobs Without Experience"),
    ("portfolio-projects", "Graphic Design Portfolio Projects")
]

def city_label(city: str) -> str:
    return city.replace("-", " ").title()

def aud_label(aud: str) -> str:
    return aud.replace("-", " ").title()

def load(path: Path):
    return json.loads(path.read_text())

def save(path: Path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2))

def make_page(slug: str, title: str, city="india", audience="beginners", kind="programmatic", modifier="practical growth"):
    desc = f"Practical guide to {title.lower()} with skills, tools, workflow, salary, jobs, and course clarity."
    return {
        "slug": slug,
        "title": title,
        "description": desc,
        "metaTitle": f"{title} | Sikhadenge",
        "metaDescription": desc,
        "familyKey": FAMILY,
        "rootSlug": FAMILY,
        "pageKind": kind,
        "skill": LABEL,
        "relatedFamilies": [FAMILY, "ai-tools", "ai-skills", "ai-career"],
        "dynamicValues": {
            "audience": audience,
            "city": city,
            "location": city,
            "usecase": "creative work",
            "modifier": modifier
        }
    }

def expand(data):
    existing = set()
    for item in data:
        if isinstance(item, dict):
            s = item.get("slug")
            if isinstance(s, str):
                existing.add(s)

    added = []
    # 20 cities x 5 = 100
    for city in cities:
        City = city_label(city)
        for suffix_tpl, title_tpl in city_patterns:
            slug = f"{FAMILY}-{suffix_tpl.format(city=city)}"
            title = title_tpl.format(City=City)
            if slug not in existing:
                audience = "beginners"
                if "jobs" in slug:
                    audience = "job-seekers"
                data.append(make_page(slug, title, city=city, audience=audience, kind="city_intent", modifier="local intent"))
                existing.add(slug)
                added.append(slug)

    # 10 audiences x 5 = 50
    for aud in audiences:
        Aud = aud_label(aud)
        for suffix_tpl, title_tpl in audience_patterns:
            slug = f"{FAMILY}-{suffix_tpl.format(aud=aud)}"
            title = title_tpl.format(Aud=Aud)
            if slug not in existing:
                data.append(make_page(slug, title, audience=aud, kind="audience_intent", modifier="audience intent"))
                existing.add(slug)
                added.append(slug)

    # 10 question pages
    for suffix, title in question_patterns:
        slug = f"{FAMILY}-{suffix}"
        if slug not in existing:
            data.append(make_page(slug, title, kind="question_intent", modifier=suffix.replace("-", " ")))
            existing.add(slug)
            added.append(slug)

    return data, added

master = load(MASTER)
merged = load(MERGED)

master, added_master = expand(master)
merged, added_merged = expand(merged)

save(MASTER, master)
save(MERGED, merged)

final_count = 0
samples = []
for item in merged:
    if not isinstance(item, dict):
        continue
    slug = item.get("slug")
    fam = item.get("familyKey") or item.get("rootSlug")
    if fam == FAMILY or (isinstance(slug, str) and (slug == FAMILY or slug.startswith(FAMILY + "-"))):
        final_count += 1
        if isinstance(slug, str) and len(samples) < 20:
            samples.append(slug)

lines = [
    f"added_master={len(added_master)}",
    f"added_merged={len(added_merged)}",
    f"graphic_design_final_count={final_count}",
    "",
    "sample_added:"
]
for s in added_merged[:30]:
    lines.append(s)
lines.append("")
lines.append("sample_present:")
for s in samples:
    lines.append(s)

REPORT.write_text("\n".join(lines), encoding="utf-8")
print(REPORT.read_text())
