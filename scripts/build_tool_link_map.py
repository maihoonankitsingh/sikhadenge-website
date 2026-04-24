import json
from pathlib import Path
from collections import defaultdict

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
DATA = ROOT / "data/generated-seo-merged.json"
OUT = ROOT / "data/generated/tool-link-map.json"
REPORT = ROOT / "reports/tool_link_map_report.txt"

tools = [
    "chatgpt","claude","gemini","perplexity","nano-banana","copilot","canva-ai","cursor","midjourney","elevenlabs",
    "heygen","gamma","notion-ai","leonardo-ai","replit-ai","bolt-new","suno","grok","sora","runway"
]

tool_display = {
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

data = json.loads(DATA.read_text())
by_tool = defaultdict(list)

for item in data:
    if not isinstance(item, dict):
        continue
    slug = item.get("slug")
    fam = item.get("familyKey") or item.get("rootSlug")
    if not isinstance(slug, str):
        continue
    if isinstance(fam, str) and fam in tools:
        by_tool[fam].append(slug)
        continue
    for t in sorted(tools, key=len, reverse=True):
        if slug == t or slug.startswith(t + "-") or slug == f"expert-in-{t}" or slug == f"master-in-{t}":
            by_tool[t].append(slug)
            break

link_map = {}
report_lines = []

def pick_first(slugs, starts):
    for s in slugs:
        if s == starts or s.startswith(starts):
            return s
    return None

for tool in tools:
    slugs = sorted(set(by_tool.get(tool, [])))
    links = []

    preferred = [
        tool,
        f"{tool}-course",
        f"{tool}-prompts",
        f"{tool}-best-prompts",
        f"{tool}-expert",
        f"{tool}-master",
        f"expert-in-{tool}",
        f"master-in-{tool}",
        f"{tool}-alternatives",
        f"{tool}-best-use-cases",
        f"{tool}-for-students",
        f"{tool}-for-freelancers",
        f"{tool}-for-content-writing",
        f"{tool}-for-seo",
        f"{tool}-for-research",
        f"{tool}-course-in-delhi",
        f"{tool}-best-course-in-delhi",
        f"{tool}-training-in-mumbai",
        f"{tool}-vs-chatgpt",
        f"{tool}-vs-claude",
        f"{tool}-vs-gemini"
    ]

    seen = set()
    for pref in preferred:
        if pref in slugs and pref not in seen:
            seen.add(pref)
            links.append(pref)

    for s in slugs:
        if len(links) >= 24:
            break
        if s not in seen:
            seen.add(s)
            links.append(s)

    cards = []
    for slug in links[:12]:
        label = slug.replace("-", " ").title()
        if slug == tool:
            label = f"{tool_display[tool]} Guide"
        elif slug == f"{tool}-course":
            label = f"{tool_display[tool]} Course"
        elif slug == f"{tool}-prompts":
            label = f"{tool_display[tool]} Prompts"
        elif slug == f"{tool}-expert":
            label = f"{tool_display[tool]} Expert"
        elif slug == f"{tool}-master":
            label = f"{tool_display[tool]} Master"
        elif slug == f"expert-in-{tool}":
            label = f"Expert in {tool_display[tool]}"
        elif slug == f"master-in-{tool}":
            label = f"Master in {tool_display[tool]}"
        cards.append({"slug": slug, "label": label})

    related_tools = []
    idx = tools.index(tool)
    neighbors = tools[max(0, idx-2): idx] + tools[idx+1: idx+3]
    for other in neighbors:
        related_tools.append({
            "slug": other,
            "label": tool_display[other]
        })

    link_map[tool] = {
        "cards": cards,
        "relatedTools": related_tools
    }

    report_lines.append(f"{tool}\t{len(slugs)}\t{len(cards)}")

OUT.write_text(json.dumps(link_map, ensure_ascii=False, indent=2), encoding="utf-8")
REPORT.write_text("\n".join(report_lines), encoding="utf-8")
print(REPORT.read_text())
print(f"\nWrote {OUT}")
