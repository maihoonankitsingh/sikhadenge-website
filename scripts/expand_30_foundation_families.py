import json
from pathlib import Path
from collections import Counter

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
MASTER = ROOT / "data/generated-seo-master.json"
MERGED = ROOT / "data/generated-seo-merged.json"

FOUNDATION_30 = [
    "graphic-design",
    "video-editing",
    "digital-marketing",
    "seo",
    "copywriting",
    "content-writing",
    "web-development",
    "no-code-development",
    "personal-branding",
    "freelancing",
    "motion-graphics",
    "after-effects",
    "premiere-pro",
    "logo-design",
    "ui-design",
    "ux-design",
    "python",
    "app-development",
    "remote-jobs",
    "online-business",
    "sales",
    "consulting",
    "ecommerce",
    "social-media-marketing",
    "performance-marketing",
    "email-marketing",
    "content-marketing",
    "youtube-growth",
    "instagram-growth",
    "ai-for-creators",
]

FAMILY_LABELS = {
    "graphic-design": "Graphic Design",
    "video-editing": "Video Editing",
    "digital-marketing": "Digital Marketing",
    "seo": "SEO",
    "copywriting": "Copywriting",
    "content-writing": "Content Writing",
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
}

CITIES = [
    "ahmedabad","allahabad","amritsar","aurangabad","bangalore","bareilly","bhopal","bhubaneswar","chandigarh","chennai",
    "coimbatore","cuttack","dehradun","delhi","dhanbad","faridabad","ghaziabad","goa","gorakhpur","gurgaon",
    "guwahati","gwalior","hyderabad","indore","jaipur","jalandhar","jammu","jamshedpur","jhansi","kanpur",
    "kochi","kolhapur","kolkata","kozhikode","lucknow","ludhiana","madurai","meerut","mohali","mumbai",
    "mysore","nagpur","nashik","noida","patna","pune","raipur","rajkot","ranchi","siliguri",
    "surat","thane","trichy","trivandrum","udaipur","vadodara","varanasi","vijayawada","visakhapatnam","warangal"
]

TOP_CITIES = [
    "delhi","mumbai","bangalore","hyderabad","pune","chennai","kolkata","ahmedabad","jaipur","lucknow",
    "noida","gurgaon","indore","surat","patna","bhopal","kanpur","nagpur","vadodara","coimbatore",
    "kochi","ludhiana","raipur","ranchi","varanasi","ghaziabad","thane","visakhapatnam","vijayawada","dehradun"
]

GENERAL_AUDIENCES = [
    "beginners","students","freelancers","job-seekers","working-professionals",
    "creators","founders","small-business-owners","agencies","consultants"
]

GENERAL_INTENTS = [
    ("best", "Best {label}"),
    ("course", "{label} Course"),
    ("roadmap", "{label} Roadmap"),
    ("jobs", "{label} Jobs"),
    ("salary", "{label} Salary"),
    ("tools", "{label} Tools"),
    ("skills", "{label} Skills"),
    ("training", "{label} Training"),
    ("without-coding", "{label} Without Coding"),
    ("how-to-learn", "How to Learn {label}")
]

CITY_PATTERNS = [
    ("in-{city}", "{label} in {City}"),
    ("course-in-{city}", "{label} Course in {City}"),
    ("training-in-{city}", "{label} Training in {City}"),
    ("classes-in-{city}", "{label} Classes in {City}"),
    ("jobs-in-{city}", "{label} Jobs in {City}"),
    ("salary-in-{city}", "{label} Salary in {City}"),
    ("for-beginners-in-{city}", "{label} for Beginners in {City}"),
    ("for-students-in-{city}", "{label} for Students in {City}")
]

EXTRA_CITY_PATTERNS = [
    ("for-freelancers-in-{city}", "{label} for Freelancers in {City}"),
    ("for-job-seekers-in-{city}", "{label} for Job Seekers in {City}"),
    ("roadmap-in-{city}", "{label} Roadmap in {City}"),
    ("without-coding-in-{city}", "{label} Without Coding in {City}"),
    ("best-course-in-{city}", "Best {label} Course in {City}"),
    ("best-training-in-{city}", "Best {label} Training in {City}"),
]

QUESTION_PATTERNS = [
    ("what-is", "What is {label}"),
    ("is-good-career", "Is {label} a Good Career"),
    ("how-to-start", "How to Start {label}"),
    ("best-skills", "Best {label} Skills"),
    ("best-tools", "Best {label} Tools"),
    ("for-beginners", "{label} for Beginners"),
    ("for-students", "{label} for Students"),
    ("for-freelancers", "{label} for Freelancers"),
    ("for-job-seekers", "{label} for Job Seekers"),
    ("for-creators", "{label} for Creators"),
    ("for-founders", "{label} for Founders"),
    ("for-small-business", "{label} for Small Business"),
    ("for-agencies", "{label} for Agencies"),
    ("roadmap-for-beginners", "{label} Roadmap for Beginners"),
    ("jobs-without-coding", "{label} Jobs Without Coding"),
    ("course-for-beginners", "{label} Course for Beginners"),
    ("training-for-students", "{label} Training for Students"),
    ("salary-in-india", "{label} Salary in India"),
    ("best-course", "Best {label} Course"),
    ("best-training", "Best {label} Training")
]

def load(path):
    return json.loads(path.read_text())

def save(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2))

def title_case_city(city):
    return city.replace("-", " ").title()

def make_page(slug, title, family, city=None, audience=None, page_kind="programmatic", modifier=None, usecase=None):
    label = FAMILY_LABELS[family]
    desc = f"Practical guide to {title.lower()} with skills, tools, workflow, career direction, and course-style clarity."
    return {
        "slug": slug,
        "title": title,
        "description": desc,
        "metaTitle": f"{title} | Sikhadenge",
        "metaDescription": desc,
        "familyKey": family,
        "rootSlug": family,
        "pageKind": page_kind,
        "skill": label,
        "relatedFamilies": [family, "ai-tools", "ai-skills", "ai-career"],
        "dynamicValues": {
            "audience": audience or "beginners",
            "city": city or "india",
            "location": city or "india",
            "usecase": usecase or "practical work",
            "modifier": modifier or "career growth"
        }
    }

def detect_family(item):
    for key in ("familyKey", "rootSlug", "topicFamily", "family"):
        v = item.get(key)
        if isinstance(v, str) and v.strip():
            return v.strip()
    slug = item.get("slug")
    if isinstance(slug, str):
        for fam in sorted(FOUNDATION_30, key=len, reverse=True):
            if slug == fam or slug.startswith(fam + "-"):
                return fam
    return None

for target in [MASTER, MERGED]:
    data = load(target)
    existing = set()
    for item in data:
        if isinstance(item, dict):
            s = item.get("slug")
            if isinstance(s, str):
                existing.add(s)

    added = 0
    for fam in FOUNDATION_30:
        label = FAMILY_LABELS[fam]

        # 1) 60 cities x 8 patterns = 480
        for city in CITIES:
            City = title_case_city(city)
            for suffix_tmpl, title_tmpl in CITY_PATTERNS:
                suffix = suffix_tmpl.format(city=city)
                title = title_tmpl.format(label=label, City=City)
                slug = f"{fam}-{suffix}"
                if slug not in existing:
                    data.append(make_page(slug, title, fam, city=city, page_kind="city", modifier="local intent"))
                    existing.add(slug)
                    added += 1

        # 2) 30 top cities x 6 patterns = 180
        for city in TOP_CITIES:
            City = title_case_city(city)
            for suffix_tmpl, title_tmpl in EXTRA_CITY_PATTERNS:
                suffix = suffix_tmpl.format(city=city)
                title = title_tmpl.format(label=label, City=City)
                slug = f"{fam}-{suffix}"
                if slug not in existing:
                    data.append(make_page(slug, title, fam, city=city, page_kind="city_intent", modifier="local + commercial"))
                    existing.add(slug)
                    added += 1

        # 3) 20 question / audience / intent pages
        for suffix, title_tmpl in QUESTION_PATTERNS:
            title = title_tmpl.format(label=label)
            slug = f"{fam}-{suffix}"
            if slug not in existing:
                audience = "beginners"
                if "students" in suffix:
                    audience = "students"
                elif "freelancers" in suffix:
                    audience = "freelancers"
                elif "job-seekers" in suffix or "jobs" in suffix:
                    audience = "job-seekers"
                elif "creators" in suffix:
                    audience = "creators"
                elif "founders" in suffix:
                    audience = "founders"
                elif "small-business" in suffix:
                    audience = "small-business-owners"
                elif "agencies" in suffix:
                    audience = "agencies"
                data.append(make_page(slug, title, fam, audience=audience, page_kind="intent", modifier=suffix.replace("-", " ")))
                existing.add(slug)
                added += 1

        # 4) audience x general intent = 10 x 10 = 100
        for aud in GENERAL_AUDIENCES:
            for intent_suffix, intent_title in GENERAL_INTENTS:
                title = f"{intent_title.format(label=label)} for {aud.replace('-', ' ').title()}"
                slug = f"{fam}-{intent_suffix}-for-{aud}"
                if slug not in existing:
                    data.append(make_page(slug, title, fam, audience=aud, page_kind="audience_intent", modifier=intent_suffix.replace('-', ' ')))
                    existing.add(slug)
                    added += 1

        # 5) extra commercial cluster pages = 60
        extras = [
            "best-course-in-india","best-training-in-india","course-fees","salary-for-beginners","salary-for-freshers",
            "roadmap-2026","tools-2026","skills-2026","jobs-2026","course-online","training-online","classes-online",
            "certification","certification-course","without-experience","without-degree","without-coding-for-students",
            "for-college-students","for-school-students","for-business-owners","for-side-hustle","for-remote-jobs",
            "for-home-based-work","for-career-growth","best-youtube-resources","best-projects","portfolio-projects",
            "internship-guide","entry-level-jobs","best-course-for-beginners","best-tools-for-beginners",
            "best-skills-for-beginners","best-training-for-students","how-to-start-from-zero","how-to-learn-fast",
            "how-to-get-clients","how-to-build-portfolio","how-to-get-job","how-to-make-money","how-to-become-expert",
            "tips-for-beginners","mistakes-to-avoid","future-scope","career-scope","jobs-in-india","salary-in-india-2026",
            "best-course-in-delhi","best-course-in-mumbai","best-course-in-bangalore","best-course-in-hyderabad",
            "best-course-in-pune","best-course-in-jaipur","best-course-in-lucknow","training-in-delhi","training-in-mumbai",
            "training-in-bangalore","training-in-hyderabad","training-in-pune","training-in-jaipur","training-in-lucknow"
        ]
        for extra in extras:
            title = f"{label} {extra.replace('-', ' ').title()}"
            slug = f"{fam}-{extra}"
            if slug not in existing:
                data.append(make_page(slug, title, fam, page_kind="commercial_intent", modifier=extra.replace("-", " ")))
                existing.add(slug)
                added += 1

    save(target, data)
    print(f"{target.name}: added {added} new programmatic pages")

# final report
merged = load(MERGED)
counts = Counter()
for item in merged:
    if isinstance(item, dict):
        fam = detect_family(item)
        if fam:
            counts[fam] += 1

report = ROOT / "reports/foundation_30_counts_after_expansion.txt"
lines = ["=== FOUNDATION 30 COUNTS AFTER EXPANSION ==="]
for fam in FOUNDATION_30:
    lines.append(f"{fam}\t{counts.get(fam, 0)}")
lines.append("\n=== 1000+ STATUS ===")
for fam in FOUNDATION_30:
    c = counts.get(fam, 0)
    lines.append(f"{fam}\t{'YES' if c >= 1000 else 'NO'}\t{c}")
report.write_text("\n".join(lines), encoding="utf-8")
print(report.read_text())
