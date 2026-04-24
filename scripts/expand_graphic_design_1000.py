import json
from pathlib import Path
from collections import Counter

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
FILES = [
    ROOT / "data/generated-seo-master.json",
    ROOT / "data/generated-seo-merged.json",
]

FAMILY = "graphic-design"
LABEL = "Graphic Design"

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

intent_patterns = [
    ("for-beginners", "Graphic Design for Beginners"),
    ("for-students", "Graphic Design for Students"),
    ("for-freelancers", "Graphic Design for Freelancers"),
    ("for-job-seekers", "Graphic Design for Job Seekers"),
    ("for-creators", "Graphic Design for Creators"),
    ("for-founders", "Graphic Design for Founders"),
    ("course", "Graphic Design Course"),
    ("training", "Graphic Design Training"),
    ("classes", "Graphic Design Classes"),
    ("jobs", "Graphic Design Jobs"),
    ("salary", "Graphic Design Salary"),
    ("roadmap", "Graphic Design Roadmap"),
    ("without-coding", "Graphic Design Without Coding"),
    ("best-course", "Best Graphic Design Course"),
    ("best-training", "Best Graphic Design Training"),
    ("best-tools", "Best Graphic Design Tools"),
    ("best-skills", "Best Graphic Design Skills"),
    ("how-to-learn", "How to Learn Graphic Design"),
    ("how-to-start", "How to Start Graphic Design"),
    ("what-is", "What is Graphic Design"),
]

city_patterns = [
    ("in-{city}", "Graphic Design in {City}"),
    ("course-in-{city}", "Graphic Design Course in {City}"),
    ("training-in-{city}", "Graphic Design Training in {City}"),
    ("classes-in-{city}", "Graphic Design Classes in {City}"),
    ("jobs-in-{city}", "Graphic Design Jobs in {City}"),
    ("salary-in-{city}", "Graphic Design Salary in {City}"),
    ("for-beginners-in-{city}", "Graphic Design for Beginners in {City}"),
    ("for-students-in-{city}", "Graphic Design for Students in {City}"),
    ("for-freelancers-in-{city}", "Graphic Design for Freelancers in {City}"),
    ("without-coding-in-{city}", "Graphic Design Without Coding in {City}")
]

extra_patterns = [
    "best-course-in-india","best-training-in-india","course-online","training-online","classes-online",
    "portfolio-projects","internship-guide","entry-level-jobs","salary-in-india","salary-in-india-2026",
    "best-tools-for-beginners","best-skills-for-beginners","roadmap-2026","jobs-2026","course-for-beginners",
    "training-for-students","for-college-students","for-school-students","for-business-owners","for-side-hustle",
    "for-remote-jobs","for-home-based-work","for-career-growth","future-scope","career-scope",
    "how-to-build-portfolio","how-to-get-clients","how-to-get-job","how-to-make-money","best-projects",
    "best-course-in-delhi","best-course-in-mumbai","best-course-in-bangalore","best-course-in-hyderabad","best-course-in-pune",
    "best-course-in-jaipur","best-course-in-lucknow","training-in-delhi","training-in-mumbai","training-in-bangalore",
    "training-in-hyderabad","training-in-pune","training-in-jaipur","training-in-lucknow","jobs-without-degree",
    "jobs-without-experience","for-instagram-creators","for-youtube-creators","for-social-media","for-branding"
]

def city_label(city):
    return city.replace("-", " ").title()

def make_page(slug, title, city="india", audience="beginners", kind="programmatic", modifier="practical growth"):
    desc = f"Practical guide to {title.lower()} with skills, tools, workflows, course options, and career direction."
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

def detect_family(item):
    for key in ("familyKey", "rootSlug", "topicFamily", "family"):
        v = item.get(key)
        if isinstance(v, str) and v.strip():
            return v.strip()
    slug = item.get("slug")
    if isinstance(slug, str) and (slug == FAMILY or slug.startswith(FAMILY + "-")):
        return FAMILY
    return None

for path in FILES:
    data = json.loads(path.read_text())
    if not isinstance(data, list):
        raise SystemExit(f"{path.name} is not a list")

    existing = set()
    for item in data:
        if isinstance(item, dict):
            s = item.get("slug")
            if isinstance(s, str):
                existing.add(s)

    added = 0

    # 60 cities x 10 patterns = 600
    for city in cities:
        City = city_label(city)
        for suffix_tpl, title_tpl in city_patterns:
            slug = f"{FAMILY}-{suffix_tpl.format(city=city)}"
            title = title_tpl.format(City=City)
            if slug not in existing:
                audience = "beginners"
                if "students" in slug:
                    audience = "students"
                elif "freelancers" in slug:
                    audience = "freelancers"
                elif "jobs" in slug:
                    audience = "job-seekers"
                data.append(make_page(slug, title, city=city, audience=audience, kind="city_intent", modifier="local search"))
                existing.add(slug)
                added += 1

    # 10 audiences x 20 intents = 200
    for aud in audiences:
        aud_label = aud.replace("-", " ").title()
        for suffix, title in intent_patterns:
            slug = f"{FAMILY}-{suffix}-for-{aud}"
            full_title = f"{title} for {aud_label}"
            if slug not in existing:
                data.append(make_page(slug, full_title, audience=aud, kind="audience_intent", modifier=suffix.replace("-", " ")))
                existing.add(slug)
                added += 1

    # 50 extras
    for extra in extra_patterns:
        slug = f"{FAMILY}-{extra}"
        title = f"{LABEL} {extra.replace('-', ' ').title()}"
        if slug not in existing:
            data.append(make_page(slug, title, kind="commercial_intent", modifier=extra.replace("-", " ")))
            existing.add(slug)
            added += 1

    # city x audience quick clusters: 20 cities x 10 audiences = 200
    for city in cities[:20]:
        City = city_label(city)
        for aud in audiences:
            aud_label = aud.replace("-", " ").title()
            slug = f"{FAMILY}-for-{aud}-in-{city}"
            title = f"{LABEL} for {aud_label} in {City}"
            if slug not in existing:
                data.append(make_page(slug, title, city=city, audience=aud, kind="city_audience", modifier="geo + audience"))
                existing.add(slug)
                added += 1

    # top cities x 8 commercial patterns = 160
    commercial_city_patterns = [
        ("best-course-in-{city}", "Best Graphic Design Course in {City}"),
        ("best-training-in-{city}", "Best Graphic Design Training in {City}"),
        ("best-classes-in-{city}", "Best Graphic Design Classes in {City}"),
        ("course-fees-in-{city}", "Graphic Design Course Fees in {City}"),
        ("jobs-for-beginners-in-{city}", "Graphic Design Jobs for Beginners in {City}"),
        ("salary-for-freshers-in-{city}", "Graphic Design Salary for Freshers in {City}"),
        ("roadmap-in-{city}", "Graphic Design Roadmap in {City}"),
        ("best-tools-in-{city}", "Best Graphic Design Tools in {City}")
    ]
    for city in cities[:20]:
        City = city_label(city)
        for suffix_tpl, title_tpl in commercial_city_patterns:
            slug = f"{FAMILY}-{suffix_tpl.format(city=city)}"
            title = title_tpl.format(City=City)
            if slug not in existing:
                data.append(make_page(slug, title, city=city, kind="city_commercial", modifier="local commercial"))
                existing.add(slug)
                added += 1

    path.write_text(json.dumps(data, ensure_ascii=False, indent=2))
    print(f"{path.name}: added {added} pages")

# report
merged = json.loads(MERGED.read_text())
count = 0
samples = []
for item in merged:
    if isinstance(item, dict):
        fam = detect_family(item)
        if fam == FAMILY:
            count += 1
            s = item.get("slug")
            if isinstance(s, str) and len(samples) < 20:
                samples.append(s)

report = ROOT / "reports/graphic_design_expansion_report.txt"
lines = [f"graphic-design\t{count}", "", "sample_slugs:"]
for s in samples:
    lines.append(f"- {s}")
report.write_text("\n".join(lines), encoding="utf-8")
print(report.read_text())
