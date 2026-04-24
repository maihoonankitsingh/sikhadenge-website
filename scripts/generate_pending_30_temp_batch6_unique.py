import json
from pathlib import Path
from collections import Counter, defaultdict

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
SOURCE = ROOT / "data/generated-seo-merged.json"
TEMP_OUT = ROOT / "data/tmp/generated-seo-pending30-temp-batch6-unique.json"
REPORT = ROOT / "reports/pending30_temp_batch6_unique_report.txt"

pending = [
    "graphic-design","video-editing","digital-marketing","seo","copywriting",
    "web-development","no-code-development","personal-branding","freelancing","motion-graphics",
    "after-effects","premiere-pro","logo-design","ui-design","ux-design",
    "python","app-development","remote-jobs","online-business","sales",
    "consulting","ecommerce","social-media-marketing","performance-marketing","email-marketing",
    "content-marketing","youtube-growth","instagram-growth","ai-for-creators","web-design"
]

labels = {
    "graphic-design": "Graphic Design",
    "video-editing": "Video Editing",
    "digital-marketing": "Digital Marketing",
    "seo": "SEO",
    "copywriting": "Copywriting",
    "web-development": "Web Development",
    "no-code-development": "No-Code Development",
    "personal-branding": "Personal Branding",
    "freelancing": "Freelancing",
    "motion-graphics": "Motion Graphics",
    "after-effects": "After Effects",
    "premiere-pro": "Premiere Pro",
    "logo-design": "Logo Design",
    "ui-design": "UI Design",
    "ux-design": "UX Design",
    "python": "Python",
    "app-development": "App Development",
    "remote-jobs": "Remote Jobs",
    "online-business": "Online Business",
    "sales": "Sales",
    "consulting": "Consulting",
    "ecommerce": "Ecommerce",
    "social-media-marketing": "Social Media Marketing",
    "performance-marketing": "Performance Marketing",
    "email-marketing": "Email Marketing",
    "content-marketing": "Content Marketing",
    "youtube-growth": "YouTube Growth",
    "instagram-growth": "Instagram Growth",
    "ai-for-creators": "AI for Creators",
    "web-design": "Web Design",
}

cities = [
    "sonipat","rohtak","panipat","rewari","yamunanagar","karnal","sirsa","bhatinda","pathankot","shimla",
    "solan","haldwani","rudrapur","haridwar","muzaffarpur","darbhanga","bhagalpur","durg","korba","satna"
]

audiences = [
    "beginners","students","freelancers","job-seekers","working-professionals"
]

city_patterns = [
    ("career-roadmap-in-{city}", "{label} Career Roadmap in {City}"),
    ("salary-guide-in-{city}", "{label} Salary Guide in {City}"),
    ("best-institute-in-{city}", "Best {label} Institute in {City}")
]

audience_patterns = [
    ("portfolio-for-{aud}", "{label} Portfolio for {Aud}"),
    ("career-roadmap-for-{aud}", "{label} Career Roadmap for {Aud}"),
    ("salary-guide-for-{aud}", "{label} Salary Guide for {Aud}"),
    ("job-guide-for-{aud}", "{label} Job Guide for {Aud}")
]

unique_patterns = [
    ("step-by-step-guide", "{label} Step by Step Guide"),
    ("practical-projects", "{label} Practical Projects"),
    ("real-world-examples", "{label} Real World Examples"),
    ("tools-list-2026", "{label} Tools List 2026"),
    ("career-roadmap-2026", "{label} Career Roadmap 2026"),
    ("salary-guide-2026", "{label} Salary Guide 2026"),
    ("job-guide-2026", "{label} Job Guide 2026"),
    ("course-guide-2026", "{label} Course Guide 2026"),
    ("training-guide-2026", "{label} Training Guide 2026"),
    ("practical-skills-checklist", "{label} Practical Skills Checklist"),
    ("portfolio-checklist", "{label} Portfolio Checklist"),
    ("interview-questions", "{label} Interview Questions"),
    ("resume-guide", "{label} Resume Guide"),
    ("freelance-guide", "{label} Freelance Guide"),
    ("client-acquisition-guide", "{label} Client Acquisition Guide"),
    ("beginner-mistakes", "{label} Beginner Mistakes"),
    ("daily-practice-plan", "{label} Daily Practice Plan"),
    ("weekly-learning-plan", "{label} Weekly Learning Plan"),
    ("monthly-learning-plan", "{label} Monthly Learning Plan"),
    ("best-resources", "Best {label} Resources")
]

def city_title(city):
    return city.replace("-", " ").title()

def aud_title(aud):
    return aud.replace("-", " ").title()

def make_page(family, slug, title, city="india", audience="beginners", kind="programmatic", modifier="practical growth"):
    desc = f"Practical guide to {title.lower()} with skills, tools, workflows, salary, jobs, and course clarity."
    return {
        "slug": slug,
        "title": title,
        "description": desc,
        "metaTitle": f"{title} | Sikhadenge",
        "metaDescription": desc,
        "familyKey": family,
        "rootSlug": family,
        "pageKind": kind,
        "skill": labels[family],
        "relatedFamilies": [family, "ai-tools", "ai-skills", "ai-career"],
        "dynamicValues": {
            "audience": audience,
            "city": city,
            "location": city,
            "usecase": "practical work",
            "modifier": modifier
        }
    }

data = json.loads(SOURCE.read_text())
existing = set()
for item in data:
    if isinstance(item, dict):
        s = item.get("slug")
        if isinstance(s, str):
            existing.add(s)

new_items = []
per_family = Counter()
samples = defaultdict(list)

for family in pending:
    label = labels[family]

    # 20 cities x 3 = 60
    for city in cities:
        City = city_title(city)
        for suffix_tpl, title_tpl in city_patterns:
            slug = f"{family}-{suffix_tpl.format(city=city)}"
            title = title_tpl.format(label=label, City=City)
            if slug not in existing:
                item = make_page(family, slug, title, city=city, kind="city_unique_batch6", modifier="unique local")
                new_items.append(item)
                existing.add(slug)
                per_family[family] += 1
                if len(samples[family]) < 5:
                    samples[family].append(slug)

    # 5 audiences x 4 = 20
    for aud in audiences:
        Aud = aud_title(aud)
        for suffix_tpl, title_tpl in audience_patterns:
            slug = f"{family}-{suffix_tpl.format(aud=aud)}"
            title = title_tpl.format(label=label, Aud=Aud)
            if slug not in existing:
                item = make_page(family, slug, title, audience=aud, kind="audience_unique_batch6", modifier="unique audience")
                new_items.append(item)
                existing.add(slug)
                per_family[family] += 1
                if len(samples[family]) < 5:
                    samples[family].append(slug)

    # 20 unique patterns
    for suffix, title_tpl in unique_patterns:
        slug = f"{family}-{suffix}"
        title = title_tpl.format(label=label)
        if slug not in existing:
            item = make_page(family, slug, title, kind="unique_batch6", modifier=suffix.replace("-", " "))
            new_items.append(item)
            existing.add(slug)
            per_family[family] += 1
            if len(samples[family]) < 5:
                samples[family].append(slug)

TEMP_OUT.write_text(json.dumps(new_items, ensure_ascii=False, indent=2), encoding="utf-8")

lines = [f"total_new_items={len(new_items)}", ""]
for fam in pending:
    lines.append(f"{fam}\t{per_family[fam]}")
lines.append("\nSAMPLES")
for fam in pending:
    lines.append(f"\n[{fam}]")
    for s in samples[fam]:
        lines.append(s)

REPORT.write_text("\n".join(lines), encoding="utf-8")
print(REPORT.read_text())
