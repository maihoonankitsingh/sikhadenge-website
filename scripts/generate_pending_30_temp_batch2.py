import json
from pathlib import Path
from collections import Counter, defaultdict

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
SOURCE = ROOT / "data/generated-seo-merged.json"
TEMP_OUT = ROOT / "data/tmp/generated-seo-pending30-temp-batch2.json"
REPORT = ROOT / "reports/pending30_temp_batch2_report.txt"

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
    "allahabad","amritsar","aurangabad","bareilly","bhubaneswar","chandigarh","cuttack","dhanbad","goa","gorakhpur",
    "gwalior","jalandhar","jammu","jamshedpur","jhansi","kolhapur","kozhikode","madurai","meerut","mohali",
    "mysore","nashik","rajkot","siliguri","trichy","trivandrum","udaipur","warangal","faridabad","guwahati"
]

audiences = [
    "beginners","students","freelancers","job-seekers","working-professionals",
    "creators","founders","small-business-owners","agencies","consultants"
]

city_patterns = [
    ("classes-in-{city}", "{label} Classes in {City}"),
    ("for-students-in-{city}", "{label} for Students in {City}"),
    ("for-freelancers-in-{city}", "{label} for Freelancers in {City}"),
    ("without-coding-in-{city}", "{label} Without Coding in {City}"),
    ("best-course-in-{city}", "Best {label} Course in {City}")
]

audience_patterns = [
    ("best-training-for-{aud}", "Best {label} Training for {Aud}"),
    ("skills-for-{aud}", "{label} Skills for {Aud}"),
    ("without-coding-for-{aud}", "{label} Without Coding for {Aud}"),
    ("salary-in-india-for-{aud}", "{label} Salary in India for {Aud}"),
    ("projects-for-{aud}", "{label} Projects for {Aud}")
]

question_patterns = [
    ("future-scope", "{label} Future Scope"),
    ("best-training", "Best {label} Training"),
    ("best-skills", "Best {label} Skills"),
    ("best-projects", "Best {label} Projects"),
    ("course-online", "{label} Course Online"),
    ("training-online", "{label} Training Online"),
    ("classes-online", "{label} Classes Online"),
    ("for-career-growth", "{label} for Career Growth"),
    ("for-side-hustle", "{label} for Side Hustle"),
    ("for-remote-jobs", "{label} for Remote Jobs")
]

def city_title(city):
    return city.replace("-", " ").title()

def aud_title(aud):
    return aud.replace("-", " ").title()

def make_page(family, slug, title, city="india", audience="beginners", kind="programmatic", modifier="practical growth"):
    desc = f"Practical guide to {title.lower()} with skills, tools, workflows, jobs, salary, and learning clarity."
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

    for city in cities:
        City = city_title(city)
        for suffix_tpl, title_tpl in city_patterns:
            slug = f"{family}-{suffix_tpl.format(city=city)}"
            title = title_tpl.format(label=label, City=City)
            if slug not in existing:
                audience = "beginners"
                if "students" in slug:
                    audience = "students"
                elif "freelancers" in slug:
                    audience = "freelancers"
                item = make_page(family, slug, title, city=city, audience=audience, kind="city_intent_batch2", modifier="local intent")
                new_items.append(item)
                existing.add(slug)
                per_family[family] += 1
                if len(samples[family]) < 5:
                    samples[family].append(slug)

    for aud in audiences:
        Aud = aud_title(aud)
        for suffix_tpl, title_tpl in audience_patterns:
            slug = f"{family}-{suffix_tpl.format(aud=aud)}"
            title = title_tpl.format(label=label, Aud=Aud)
            if slug not in existing:
                item = make_page(family, slug, title, audience=aud, kind="audience_intent_batch2", modifier="audience intent")
                new_items.append(item)
                existing.add(slug)
                per_family[family] += 1
                if len(samples[family]) < 5:
                    samples[family].append(slug)

    for suffix, title_tpl in question_patterns:
        slug = f"{family}-{suffix}"
        title = title_tpl.format(label=label)
        if slug not in existing:
            item = make_page(family, slug, title, kind="question_intent_batch2", modifier=suffix.replace("-", " "))
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
