import json
from pathlib import Path

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
MASTER = ROOT / "data/generated-seo-master.json"
MERGED = ROOT / "data/generated-seo-merged.json"

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

def make_page(tool, slug, title):
    desc = f"Practical guide to {title.lower()} with prompts, workflows, use cases, course clarity, and learning direction."
    return {
        "slug": slug,
        "title": title,
        "description": desc,
        "metaTitle": f"{title} | Sikhadenge",
        "metaDescription": desc,
        "familyKey": tool,
        "rootSlug": tool,
        "pageKind": "tool_alias_root",
        "skill": labels[tool],
        "relatedFamilies": [tool, "ai-tools", "ai-skills", "ai-career"],
        "dynamicValues": {
            "audience": "beginners",
            "city": "india",
            "location": "india",
            "usecase": "practical work",
            "modifier": "alias root"
        }
    }

for path in [MASTER, MERGED]:
    data = json.loads(path.read_text())
    existing = {x.get("slug") for x in data if isinstance(x, dict)}
    added = 0

    for tool in tools:
        for slug, title in [
            (f"expert-in-{tool}", f"Expert in {labels[tool]}"),
            (f"master-in-{tool}", f"Master in {labels[tool]}")
        ]:
            if slug not in existing:
                data.append(make_page(tool, slug, title))
                existing.add(slug)
                added += 1

    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(path.name, "added =", added)
