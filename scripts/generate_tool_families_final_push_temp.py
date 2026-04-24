import json
from pathlib import Path
from collections import Counter, defaultdict

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
SOURCE = ROOT / "data/generated-seo-merged.json"
TEMP_OUT = ROOT / "data/tmp/generated-seo-tools-final-push-temp.json"
REPORT = ROOT / "reports/tool_families_final_push_report.txt"

tools = [
    "chatgpt","claude","gemini","perplexity","nano-banana","copilot","canva-ai","cursor","midjourney","elevenlabs",
    "heygen","gamma","notion-ai","leonardo-ai","replit-ai","bolt-new","suno","grok","sora","runway"
]

labels = {
    "chatgpt": "ChatGPT",
    "claude": "Claude",
    "gemini": "Gemini",
    "perplexity": "Perplexity",
    "nano-banana": "Nano Banana",
    "copilot": "Copilot",
    "canva-ai": "Canva AI",
    "cursor": "Cursor",
    "midjourney": "Midjourney",
    "elevenlabs": "ElevenLabs",
    "heygen": "HeyGen",
    "gamma": "Gamma",
    "notion-ai": "Notion AI",
    "leonardo-ai": "Leonardo AI",
    "replit-ai": "Replit AI",
    "bolt-new": "Bolt.new",
    "suno": "Suno",
    "grok": "Grok",
    "sora": "Sora",
    "runway": "Runway"
}

cities = [
    "sonipat","rohtak","panipat","rewari","yamunanagar","karnal","sirsa","bhatinda","pathankot","shimla",
    "solan","haldwani","rudrapur","haridwar","muzaffarpur","darbhanga","bhagalpur","durg","korba","satna"
]

audiences = [
    "beginners","students","freelancers","job-seekers","marketers","designers"
]

city_patterns = [
    ("expert-in-{city}", "{label} Expert in {City}"),
    ("master-in-{city}", "{label} Master in {City}"),
    ("prompts-in-{city}", "{label} Prompts in {City}"),
    ("use-cases-in-{city}", "{label} Use Cases in {City}"),
    ("workflow-in-{city}", "{label} Workflow in {City}")
]

audience_patterns = [
    ("expert-for-{aud}", "{label} Expert for {Aud}"),
    ("master-for-{aud}", "{label} Master for {Aud}"),
    ("salary-guide-for-{aud}", "{label} Salary Guide for {Aud}"),
    ("career-roadmap-for-{aud}", "{label} Career Roadmap for {Aud}"),
    ("projects-for-{aud}", "{label} Projects for {Aud}"),
    ("step-by-step-for-{aud}", "{label} Step by Step for {Aud}")
]

unique_patterns = [
    ("prompt-library", "{label} Prompt Library"),
    ("prompt-examples", "{label} Prompt Examples"),
    ("best-workflows", "Best {label} Workflows"),
    ("real-world-workflows", "{label} Real World Workflows"),
    ("best-use-cases-2026", "Best {label} Use Cases 2026"),
    ("daily-practice-plan", "{label} Daily Practice Plan"),
    ("weekly-learning-plan", "{label} Weekly Learning Plan"),
    ("monthly-learning-plan", "{label} Monthly Learning Plan"),
    ("beginner-mistakes", "{label} Beginner Mistakes"),
    ("advanced-use-cases", "Advanced {label} Use Cases"),
    ("expert-tips", "{label} Expert Tips"),
    ("masterclass-guide", "{label} Masterclass Guide"),
    ("course-roadmap-2026", "{label} Course Roadmap 2026"),
    ("salary-guide-2026", "{label} Salary Guide 2026"),
    ("job-guide-2026", "{label} Job Guide 2026"),
    ("course-fees", "{label} Course Fees"),
    ("best-course-for-students", "Best {label} Course for Students"),
    ("best-course-for-freelancers", "Best {label} Course for Freelancers"),
    ("best-course-for-beginners", "Best {label} Course for Beginners"),
    ("best-training-for-beginners", "Best {label} Training for Beginners"),
    ("for-business-owners", "{label} for Business Owners"),
    ("for-home-based-work", "{label} for Home Based Work"),
    ("for-side-hustle", "{label} for Side Hustle"),
    ("for-remote-jobs", "{label} for Remote Jobs"),
    ("interview-questions-and-answers", "{label} Interview Questions and Answers"),
    ("resume-and-portfolio-guide", "{label} Resume and Portfolio Guide"),
    ("client-work-guide", "{label} Client Work Guide"),
    ("service-offer-guide", "{label} Service Offer Guide"),
    ("project-ideas", "{label} Project Ideas"),
    ("practical-projects", "{label} Practical Projects"),
    ("best-resources-2026", "Best {label} Resources 2026"),
    ("free-vs-paid", "{label} Free vs Paid"),
    ("pricing-guide", "{label} Pricing Guide"),
    ("certification-guide", "{label} Certification Guide"),
    ("career-options", "{label} Career Options"),
    ("portfolio-checklist", "{label} Portfolio Checklist"),
    ("skill-checklist", "{label} Skill Checklist"),
    ("roadmap-for-career-growth", "{label} Roadmap for Career Growth"),
    ("how-to-become-expert", "How to Become Expert in {label}"),
    ("how-to-master", "How to Master {label}")
]

city_audience_patterns = [
    ("expert-for-{aud}-in-{city}", "{label} Expert for {Aud} in {City}"),
    ("master-for-{aud}-in-{city}", "{label} Master for {Aud} in {City}")
]

def city_title(city):
    return city.replace("-", " ").title()

def aud_title(aud):
    return aud.replace("-", " ").title()

def make_page(tool, slug, title, city="india", audience="beginners", kind="tool_final_push", modifier="tool growth"):
    desc = f"Practical guide to {title.lower()} with prompts, use cases, workflows, career path, and course clarity."
    return {
        "slug": slug,
        "title": title,
        "description": desc,
        "metaTitle": f"{title} | Sikhadenge",
        "metaDescription": desc,
        "familyKey": tool,
        "rootSlug": tool,
        "pageKind": kind,
        "skill": labels[tool],
        "relatedFamilies": [tool, "ai-tools", "ai-skills", "ai-career"],
        "dynamicValues": {
            "audience": audience,
            "city": city,
            "location": city,
            "usecase": "practical work",
            "modifier": modifier
        }
    }

data = json.loads(SOURCE.read_text())
existing = {x.get("slug") for x in data if isinstance(x, dict)}

new_items = []
per_tool = Counter()
samples = defaultdict(list)

for tool in tools:
    label = labels[tool]

    # 20 cities x 5 = 100
    for city in cities:
        City = city_title(city)
        for suffix_tpl, title_tpl in city_patterns:
            slug = f"{tool}-{suffix_tpl.format(city=city)}"
            title = title_tpl.format(label=label, City=City)
            if slug not in existing:
                new_items.append(make_page(tool, slug, title, city=city, kind="tool_city_final"))
                existing.add(slug)
                per_tool[tool] += 1
                if len(samples[tool]) < 5:
                    samples[tool].append(slug)

    # 6 audiences x 6 = 36
    for aud in audiences:
        Aud = aud_title(aud)
        for suffix_tpl, title_tpl in audience_patterns:
            slug = f"{tool}-{suffix_tpl.format(aud=aud)}"
            title = title_tpl.format(label=label, Aud=Aud)
            if slug not in existing:
                new_items.append(make_page(tool, slug, title, audience=aud, kind="tool_audience_final"))
                existing.add(slug)
                per_tool[tool] += 1
                if len(samples[tool]) < 5:
                    samples[tool].append(slug)

    # 40 unique
    for suffix, title_tpl in unique_patterns:
        slug = f"{tool}-{suffix}"
        title = title_tpl.format(label=label)
        if slug not in existing:
            new_items.append(make_page(tool, slug, title, kind="tool_unique_final"))
            existing.add(slug)
            per_tool[tool] += 1
            if len(samples[tool]) < 5:
                samples[tool].append(slug)

    # 10 cities x 6 audiences x 2 = 120
    for city in cities[:10]:
        City = city_title(city)
        for aud in audiences:
            Aud = aud_title(aud)
            for suffix_tpl, title_tpl in city_audience_patterns:
                slug = f"{tool}-{suffix_tpl.format(aud=aud, city=city)}"
                title = title_tpl.format(label=label, Aud=Aud, City=City)
                if slug not in existing:
                    new_items.append(make_page(tool, slug, title, city=city, audience=aud, kind="tool_city_audience_final"))
                    existing.add(slug)
                    per_tool[tool] += 1
                    if len(samples[tool]) < 5:
                        samples[tool].append(slug)

TEMP_OUT.write_text(json.dumps(new_items, ensure_ascii=False, indent=2), encoding="utf-8")

lines = ["=== TOOL FAMILIES FINAL PUSH REPORT ==="]
for tool in tools:
    lines.append(f"{tool}\t{per_tool[tool]}")
lines.append("")
lines.append(f"total_new_items={len(new_items)}")
lines.append("")
lines.append("=== SAMPLE SLUGS ===")
for tool in tools:
    lines.append(f"\n[{tool}]")
    for s in samples[tool]:
        lines.append(s)

REPORT.write_text("\n".join(lines), encoding="utf-8")
print(REPORT.read_text())
