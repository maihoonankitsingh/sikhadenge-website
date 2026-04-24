import json
from pathlib import Path
from collections import Counter, defaultdict

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
SOURCE = ROOT / "data/generated-seo-merged.json"
TEMP_OUT = ROOT / "data/tmp/generated-seo-tools-1000-temp.json"
REPORT = ROOT / "reports/tool_families_1000_temp_report.txt"
TOOLS = json.loads((ROOT / "config/seo/tool-family-heads-20.json").read_text())["tools"]

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
    "delhi","mumbai","bangalore","hyderabad","pune","chennai","kolkata","ahmedabad","jaipur","lucknow",
    "noida","gurgaon","indore","surat","patna","bhopal","kanpur","nagpur","vadodara","coimbatore",
    "kochi","ludhiana","raipur","ranchi","varanasi","ghaziabad","thane","visakhapatnam","vijayawada","dehradun",
    "agra","ajmer","allahabad","amritsar","aurangabad","bareilly","bhubaneswar","chandigarh","cuttack","dhanbad",
    "goa","gorakhpur","gwalior","jalandhar","jammu","jamshedpur","jhansi","kolhapur","kozhikode","madurai"
]

audiences = [
    "beginners","students","freelancers","job-seekers","marketers",
    "designers","creators","founders","small-business-owners","teachers"
]

city_patterns = [
    ("course-in-{city}", "{label} Course in {City}"),
    ("training-in-{city}", "{label} Training in {City}"),
    ("for-beginners-in-{city}", "{label} for Beginners in {City}"),
    ("best-course-in-{city}", "Best {label} Course in {City}"),
    ("classes-in-{city}", "{label} Classes in {City}"),
    ("best-training-in-{city}", "Best {label} Training in {City}"),
    ("salary-guide-in-{city}", "{label} Salary Guide in {City}"),
    ("career-roadmap-in-{city}", "{label} Career Roadmap in {City}")
]

audience_patterns = [
    ("for-{aud}", "{label} for {Aud}"),
    ("best-prompts-for-{aud}", "Best {label} Prompts for {Aud}"),
    ("course-for-{aud}", "{label} Course for {Aud}"),
    ("use-cases-for-{aud}", "{label} Use Cases for {Aud}"),
    ("expert-for-{aud}", "{label} Expert for {Aud}"),
    ("master-for-{aud}", "{label} Master for {Aud}"),
    ("jobs-for-{aud}", "{label} Jobs for {Aud}"),
    ("salary-for-{aud}", "{label} Salary for {Aud}"),
    ("guide-for-{aud}", "{label} Guide for {Aud}"),
    ("prompts-for-{aud}", "{label} Prompts for {Aud}"),
    ("workflow-for-{aud}", "{label} Workflow for {Aud}"),
    ("best-tools-for-{aud}", "Best {label} Tools for {Aud}")
]

global_patterns = [
    ("", "{label}"),
    ("course", "{label} Course"),
    ("tutorial", "{label} Tutorial"),
    ("guide", "{label} Guide"),
    ("expert", "{label} Expert"),
    ("master", "{label} Master"),
    ("expert-guide", "{label} Expert Guide"),
    ("master-guide", "{label} Master Guide"),
    ("prompts", "{label} Prompts"),
    ("best-prompts", "Best {label} Prompts"),
    ("alternatives", "{label} Alternatives"),
    ("certification", "{label} Certification"),
    ("certification-course", "{label} Certification Course"),
    ("jobs", "{label} Jobs"),
    ("salary", "{label} Salary"),
    ("career-roadmap", "{label} Career Roadmap"),
    ("projects", "{label} Projects"),
    ("step-by-step-guide", "{label} Step by Step Guide"),
    ("course-guide", "{label} Course Guide"),
    ("training-guide", "{label} Training Guide"),
    ("how-to-use", "How to Use {label}"),
    ("best-use-cases", "Best {label} Use Cases"),
    ("for-content-writing", "{label} for Content Writing"),
    ("for-copywriting", "{label} for Copywriting"),
    ("for-seo", "{label} for SEO"),
    ("for-graphic-design", "{label} for Graphic Design"),
    ("for-video-editing", "{label} for Video Editing"),
    ("for-research", "{label} for Research"),
    ("for-automation", "{label} for Automation"),
    ("for-sales", "{label} for Sales"),
    ("for-email-marketing", "{label} for Email Marketing"),
    ("for-youtube", "{label} for YouTube"),
    ("for-instagram", "{label} for Instagram"),
    ("for-students", "{label} for Students"),
    ("for-freelancers", "{label} for Freelancers"),
    ("for-job-seekers", "{label} for Job Seekers"),
    ("for-teachers", "{label} for Teachers"),
    ("for-small-business", "{label} for Small Business"),
    ("for-startups", "{label} for Startups"),
    ("best-course-in-india", "Best {label} Course in India"),
    ("best-training-in-india", "Best {label} Training in India"),
    ("course-online", "{label} Course Online"),
    ("training-online", "{label} Training Online"),
    ("salary-in-india", "{label} Salary in India"),
    ("salary-in-india-2026", "{label} Salary in India 2026"),
    ("entry-level-jobs", "{label} Entry Level Jobs"),
    ("future-scope", "{label} Future Scope"),
    ("career-scope", "{label} Career Scope"),
    ("best-resources", "Best {label} Resources"),
    ("interview-questions", "{label} Interview Questions"),
    ("portfolio-projects", "{label} Portfolio Projects"),
    ("resume-guide", "{label} Resume Guide"),
    ("freelance-guide", "{label} Freelance Guide"),
    ("client-acquisition-guide", "{label} Client Acquisition Guide"),
    ("expert-in", "Expert in {label}"),
    ("master-in", "Master in {label}")
]

comparison_patterns = [
    ("vs-chatgpt", "{label} vs ChatGPT"),
    ("vs-claude", "{label} vs Claude"),
    ("vs-gemini", "{label} vs Gemini"),
    ("vs-perplexity", "{label} vs Perplexity"),
    ("vs-copilot", "{label} vs Copilot"),
    ("vs-cursor", "{label} vs Cursor"),
    ("vs-midjourney", "{label} vs Midjourney"),
    ("vs-canva-ai", "{label} vs Canva AI"),
    ("vs-nano-banana", "{label} vs Nano Banana"),
    ("vs-runway", "{label} vs Runway")
]

city_audience_patterns = [
    ("for-{aud}-in-{city}", "{label} for {Aud} in {City}"),
    ("best-course-for-{aud}-in-{city}", "Best {label} Course for {Aud} in {City}")
]

def city_title(city):
    return city.replace("-", " ").title()

def aud_title(aud):
    return aud.replace("-", " ").title()

def make_page(tool, slug, title, city="india", audience="beginners", kind="tool_programmatic", modifier="tool growth"):
    desc = f"Practical guide to {title.lower()} with prompts, use cases, workflows, course clarity, and learning direction."
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
existing = set()
for item in data:
    if isinstance(item, dict):
        s = item.get("slug")
        if isinstance(s, str):
            existing.add(s)

new_items = []
per_tool = Counter()
samples = defaultdict(list)

for tool in TOOLS:
    label = labels[tool]

    for city in cities:
        City = city_title(city)
        for suffix_tpl, title_tpl in city_patterns:
            slug = f"{tool}-{suffix_tpl.format(city=city)}"
            title = title_tpl.format(label=label, City=City)
            if slug not in existing:
                new_items.append(make_page(tool, slug, title, city=city, kind="tool_city"))
                existing.add(slug)
                per_tool[tool] += 1
                if len(samples[tool]) < 5:
                    samples[tool].append(slug)

    for aud in audiences:
        Aud = aud_title(aud)
        for suffix_tpl, title_tpl in audience_patterns:
            slug = f"{tool}-{suffix_tpl.format(aud=aud)}"
            title = title_tpl.format(label=label, Aud=Aud)
            if slug not in existing:
                new_items.append(make_page(tool, slug, title, audience=aud, kind="tool_audience"))
                existing.add(slug)
                per_tool[tool] += 1
                if len(samples[tool]) < 5:
                    samples[tool].append(slug)

    for suffix, title_tpl in global_patterns:
        title = title_tpl.format(label=label)

        if suffix == "":
            slug = tool
        elif suffix == "expert-in":
            slug = f"expert-in-{tool}"
        elif suffix == "master-in":
            slug = f"master-in-{tool}"
        else:
            slug = f"{tool}-{suffix}"

        if slug not in existing:
            new_items.append(make_page(tool, slug, title, kind="tool_global"))
            existing.add(slug)
            per_tool[tool] += 1
            if len(samples[tool]) < 5:
                samples[tool].append(slug)

    for suffix, title_tpl in comparison_patterns:
        slug = f"{tool}-{suffix}"
        title = title_tpl.format(label=label)
        if slug not in existing:
            new_items.append(make_page(tool, slug, title, kind="tool_comparison"))
            existing.add(slug)
            per_tool[tool] += 1
            if len(samples[tool]) < 5:
                samples[tool].append(slug)

    for city in cities[:10]:
        City = city_title(city)
        for aud in audiences:
            Aud = aud_title(aud)
            for suffix_tpl, title_tpl in city_audience_patterns:
                slug = f"{tool}-{suffix_tpl.format(aud=aud, city=city)}"
                title = title_tpl.format(label=label, Aud=Aud, City=City)
                if slug not in existing:
                    new_items.append(make_page(tool, slug, title, city=city, audience=aud, kind="tool_city_audience"))
                    existing.add(slug)
                    per_tool[tool] += 1
                    if len(samples[tool]) < 5:
                        samples[tool].append(slug)

TEMP_OUT.write_text(json.dumps(new_items, ensure_ascii=False, indent=2), encoding="utf-8")

lines = ["=== TOOL FAMILIES 1000 TEMP REPORT ==="]
for tool in TOOLS:
    lines.append(f"{tool}\t{per_tool[tool]}")
lines.append("")
lines.append(f"total_new_items={len(new_items)}")
lines.append("")
lines.append("=== SAMPLE SLUGS ===")
for tool in TOOLS:
    lines.append(f"\n[{tool}]")
    for s in samples[tool]:
        lines.append(s)

REPORT.write_text("\n".join(lines), encoding="utf-8")
print(REPORT.read_text())
