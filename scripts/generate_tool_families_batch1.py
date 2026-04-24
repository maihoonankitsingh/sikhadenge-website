import json
from pathlib import Path
from collections import Counter, defaultdict

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
MASTER = ROOT / "data/generated-seo-master.json"
MERGED = ROOT / "data/generated-seo-merged.json"
TOOLS = json.loads((ROOT / "config/seo/tool-family-heads-batch1.json").read_text())["tools"]
REPORT = ROOT / "reports/tool_families_batch1_report.txt"

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
    "elevenlabs": "ElevenLabs"
}

cities = [
    "delhi","mumbai","bangalore","hyderabad","pune",
    "chennai","kolkata","ahmedabad","jaipur","lucknow",
    "noida","gurgaon","indore","surat","patna",
    "bhopal","kanpur","nagpur","vadodara","coimbatore"
]

audiences = [
    "beginners","students","freelancers","job-seekers",
    "marketers","designers","creators","founders"
]

city_patterns = [
    ("course-in-{city}", "{label} Course in {City}"),
    ("training-in-{city}", "{label} Training in {City}"),
    ("for-beginners-in-{city}", "{label} for Beginners in {City}"),
    ("best-course-in-{city}", "Best {label} Course in {City}")
]

audience_patterns = [
    ("for-{aud}", "{label} for {Aud}"),
    ("best-prompts-for-{aud}", "Best {label} Prompts for {Aud}"),
    ("course-for-{aud}", "{label} Course for {Aud}"),
    ("use-cases-for-{aud}", "{label} Use Cases for {Aud}")
]

global_patterns = [
    ("course", "{label} Course"),
    ("tutorial", "{label} Tutorial"),
    ("guide", "{label} Guide"),
    ("prompts", "{label} Prompts"),
    ("best-prompts", "Best {label} Prompts"),
    ("alternatives", "{label} Alternatives"),
    ("certification", "{label} Certification"),
    ("certification-course", "{label} Certification Course"),
    ("jobs", "{label} Jobs"),
    ("salary", "{label} Salary"),
    ("career-roadmap", "{label} Career Roadmap"),
    ("projects", "{label} Projects"),
    ("for-content-writing", "{label} for Content Writing"),
    ("for-seo", "{label} for SEO"),
    ("for-graphic-design", "{label} for Graphic Design"),
    ("for-video-editing", "{label} for Video Editing"),
    ("for-research", "{label} for Research"),
    ("for-automation", "{label} for Automation"),
    ("vs-chatgpt", "{label} vs ChatGPT"),
    ("vs-claude", "{label} vs Claude"),
    ("vs-gemini", "{label} vs Gemini"),
    ("best-use-cases", "Best {label} Use Cases"),
    ("how-to-use", "How to Use {label}"),
    ("step-by-step-guide", "{label} Step by Step Guide")
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

def load(path):
    return json.loads(path.read_text())

def save(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

master = load(MASTER)
merged = load(MERGED)

master_existing = {x.get("slug") for x in master if isinstance(x, dict)}
merged_existing = {x.get("slug") for x in merged if isinstance(x, dict)}

per_tool = Counter()
samples = defaultdict(list)

def add_items(target, existing):
    local_counts = Counter()
    for tool in TOOLS:
        label = labels[tool]

        for city in cities:
            City = city_title(city)
            for suffix_tpl, title_tpl in city_patterns:
                slug = f"{tool}-{suffix_tpl.format(city=city)}"
                title = title_tpl.format(label=label, City=City)
                if slug not in existing:
                    target.append(make_page(tool, slug, title, city=city, kind="tool_city"))
                    existing.add(slug)
                    local_counts[tool] += 1
                    if len(samples[tool]) < 5:
                        samples[tool].append(slug)

        for aud in audiences:
            Aud = aud_title(aud)
            for suffix_tpl, title_tpl in audience_patterns:
                slug = f"{tool}-{suffix_tpl.format(aud=aud)}"
                title = title_tpl.format(label=label, Aud=Aud)
                if slug not in existing:
                    target.append(make_page(tool, slug, title, audience=aud, kind="tool_audience"))
                    existing.add(slug)
                    local_counts[tool] += 1
                    if len(samples[tool]) < 5:
                        samples[tool].append(slug)

        for suffix, title_tpl in global_patterns:
            slug = f"{tool}-{suffix}"
            title = title_tpl.format(label=label)
            if slug not in existing:
                target.append(make_page(tool, slug, title, kind="tool_global"))
                existing.add(slug)
                local_counts[tool] += 1
                if len(samples[tool]) < 5:
                    samples[tool].append(slug)

    return local_counts

master_counts = add_items(master, master_existing)
merged_counts = add_items(merged, merged_existing)

save(MASTER, master)
save(MERGED, merged)

lines = []
lines.append("=== TOOL FAMILIES BATCH 1 REPORT ===")
for tool in TOOLS:
    lines.append(f"{tool}\tmaster_added={master_counts.get(tool,0)}\tmerged_added={merged_counts.get(tool,0)}")
lines.append("")
lines.append("=== SAMPLE SLUGS ===")
for tool in TOOLS:
    lines.append(f"\n[{tool}]")
    for s in samples[tool]:
        lines.append(s)

REPORT.write_text("\n".join(lines), encoding="utf-8")
print(REPORT.read_text())
