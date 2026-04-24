import json
from pathlib import Path
from collections import Counter

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
MASTER = ROOT / "data/generated-seo-master.json"
MERGED = ROOT / "data/generated-seo-merged.json"
LOCK = ROOT / "config/seo/pending-canonical-families-30.json"

pending = json.loads(LOCK.read_text())["pending_canonical_30"]

family_labels = {
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
    "delhi","mumbai","bangalore","hyderabad","pune","chennai","kolkata","ahmedabad","jaipur","lucknow",
    "noida","gurgaon","indore","surat","patna","bhopal","kanpur","nagpur","vadodara","coimbatore",
    "kochi","ludhiana","raipur","ranchi","varanasi","ghaziabad","thane","visakhapatnam","vijayawada","dehradun",
    "allahabad","amritsar","aurangabad","bareilly","bhubaneswar","chandigarh","cuttack","dhanbad","goa","gorakhpur",
    "gwalior","jalandhar","jammu","jamshedpur","jhansi","kolhapur","kozhikode","madurai","meerut","mohali",
    "mysore","nashik","rajkot","siliguri","trichy","trivandrum","udaipur","warangal","faridabad","guwahati"
]

audiences = [
    "beginners","students","freelancers","job-seekers","working-professionals",
    "creators","founders","small-business-owners","agencies","consultants"
]

city_patterns = [
    ("in-{city}", "{label} in {City}"),
    ("course-in-{city}", "{label} Course in {City}"),
    ("training-in-{city}", "{label} Training in {City}"),
    ("classes-in-{city}", "{label} Classes in {City}"),
    ("jobs-in-{city}", "{label} Jobs in {City}"),
    ("salary-in-{city}", "{label} Salary in {City}"),
    ("for-beginners-in-{city}", "{label} for Beginners in {City}"),
    ("for-students-in-{city}", "{label} for Students in {City}"),
    ("for-freelancers-in-{city}", "{label} for Freelancers in {City}"),
    ("without-coding-in-{city}", "{label} Without Coding in {City}")
]

audience_intents = [
    ("best-course", "Best {label} Course"),
    ("best-training", "Best {label} Training"),
    ("roadmap", "{label} Roadmap"),
    ("jobs", "{label} Jobs"),
    ("salary", "{label} Salary"),
    ("tools", "{label} Tools"),
    ("skills", "{label} Skills"),
    ("how-to-learn", "How to Learn {label}"),
    ("how-to-start", "How to Start {label}"),
    ("without-coding", "{label} Without Coding")
]

question_patterns = [
    ("what-is", "What is {label}"),
    ("is-good-career", "Is {label} a Good Career"),
    ("future-scope", "{label} Future Scope"),
    ("salary-in-india", "{label} Salary in India"),
    ("salary-in-india-2026", "{label} Salary in India 2026"),
    ("best-course", "Best {label} Course"),
    ("best-training", "Best {label} Training"),
    ("best-tools", "Best {label} Tools"),
    ("best-skills", "Best {label} Skills"),
    ("course-for-beginners", "{label} Course for Beginners")
]

commercial_patterns = [
    "best-course-in-india",
    "best-training-in-india",
    "course-online",
    "training-online",
    "classes-online",
    "portfolio-projects",
    "entry-level-jobs",
    "roadmap-2026",
    "jobs-2026",
    "for-career-growth"
]

def city_label(city: str) -> str:
    return city.replace("-", " ").title()

def audience_label(aud: str) -> str:
    return aud.replace("-", " ").title()

def load(path: Path):
    return json.loads(path.read_text())

def save(path: Path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2))

def make_page(family, slug, title, city="india", audience="beginners", kind="programmatic", modifier="practical growth"):
    label = family_labels[family]
    desc = f"Practical guide to {title.lower()} with skills, tools, workflows, salary, jobs, and course-style clarity."
    return {
        "slug": slug,
        "title": title,
        "description": desc,
        "metaTitle": f"{title} | Sikhadenge",
        "metaDescription": desc,
        "familyKey": family,
        "rootSlug": family,
        "pageKind": kind,
        "skill": label,
        "relatedFamilies": [family, "ai-tools", "ai-skills", "ai-career"],
        "dynamicValues": {
            "audience": audience,
            "city": city,
            "location": city,
            "usecase": "practical work",
            "modifier": modifier
        }
    }

def ensure_pages(data):
    existing = set()
    for item in data:
        if isinstance(item, dict):
            s = item.get("slug")
            if isinstance(s, str):
                existing.add(s)

    added_counter = Counter()

    for family in pending:
        label = family_labels[family]

        # 60 cities x 10 = 600
        for city in cities:
            City = city_label(city)
            for suffix_tpl, title_tpl in city_patterns:
                slug = f"{family}-{suffix_tpl.format(city=city)}"
                title = title_tpl.format(label=label, City=City)
                if slug not in existing:
                    audience = "beginners"
                    if "students" in slug:
                        audience = "students"
                    elif "freelancers" in slug:
                        audience = "freelancers"
                    elif "jobs" in slug:
                        audience = "job-seekers"
                    data.append(make_page(family, slug, title, city=city, audience=audience, kind="city_intent", modifier="local intent"))
                    existing.add(slug)
                    added_counter[family] += 1

        # 10 audiences x 10 intents = 100
        for aud in audiences:
            Aud = audience_label(aud)
            for suffix, title_tpl in audience_intents:
                slug = f"{family}-{suffix}-for-{aud}"
                title = f"{title_tpl.format(label=label)} for {Aud}"
                if slug not in existing:
                    data.append(make_page(family, slug, title, audience=aud, kind="audience_intent", modifier=suffix.replace('-', ' ')))
                    existing.add(slug)
                    added_counter[family] += 1

        # 10 question pages = 10
        for suffix, title_tpl in question_patterns:
            slug = f"{family}-{suffix}"
            title = title_tpl.format(label=label)
            if slug not in existing:
                data.append(make_page(family, slug, title, kind="question_intent", modifier=suffix.replace('-', ' ')))
                existing.add(slug)
                added_counter[family] += 1

        # 10 commercial = 10
        for suffix in commercial_patterns:
            slug = f"{family}-{suffix}"
            title = f"{label} {suffix.replace('-', ' ').title()}"
            if slug not in existing:
                data.append(make_page(family, slug, title, kind="commercial_intent", modifier=suffix.replace('-', ' ')))
                existing.add(slug)
                added_counter[family] += 1

        # extra 300 pages: top 30 cities x 10 audiences
        for city in cities[:30]:
            City = city_label(city)
            for aud in audiences:
                Aud = audience_label(aud)
                slug = f"{family}-for-{aud}-in-{city}"
                title = f"{label} for {Aud} in {City}"
                if slug not in existing:
                    data.append(make_page(family, slug, title, city=city, audience=aud, kind="city_audience", modifier="geo + audience"))
                    existing.add(slug)
                    added_counter[family] += 1

    return data, added_counter

for path in [MASTER, MERGED]:
    data = load(path)
    data, added_counter = ensure_pages(data)
    save(path, data)
    print(f"\n=== {path.name} ===")
    print("families_updated =", len(added_counter))
    for fam in pending:
        print(f"{fam}\tadded\t{added_counter.get(fam, 0)}")

# final count report
merged = load(MERGED)
final_counts = Counter()
samples = {fam: [] for fam in pending}

for item in merged:
    if not isinstance(item, dict):
        continue
    fam = item.get("familyKey") or item.get("rootSlug")
    slug = item.get("slug")
    if isinstance(fam, str) and fam in pending:
        final_counts[fam] += 1
        if isinstance(slug, str) and len(samples[fam]) < 5:
            samples[fam].append(slug)
    elif isinstance(slug, str):
        for fam in pending:
            if slug == fam or slug.startswith(fam + "-"):
                final_counts[fam] += 1
                if len(samples[fam]) < 5:
                    samples[fam].append(slug)
                break

report = ROOT / "reports/pending_30_expansion_counts.txt"
lines = ["=== PENDING 30 EXPANSION COUNTS ==="]
for fam in pending:
    lines.append(f"{fam}\t{final_counts.get(fam, 0)}")
lines.append("\n=== 1000+ STATUS ===")
for fam in pending:
    c = final_counts.get(fam, 0)
    lines.append(f"{fam}\t{'YES' if c >= 1000 else 'NO'}\t{c}")
lines.append("\n=== SAMPLE SLUGS ===")
for fam in pending:
    lines.append(f"\n[{fam}]")
    for s in samples[fam]:
        lines.append(f"- {s}")

report.write_text("\n".join(lines), encoding="utf-8")
print("\nWROTE", report)
print(report.read_text())
