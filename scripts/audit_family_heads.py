import json
from pathlib import Path
from collections import Counter, defaultdict

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
merged_path = ROOT / "data/generated-seo-merged.json"
config_path = ROOT / "config/seo/family-config.json"
lock_path = ROOT / "config/seo/family-heads-lock.json"
alias_path = ROOT / "config/seo/family-head-aliases.json"
report_path = ROOT / "reports/family_head_audit.txt"

merged = json.loads(merged_path.read_text())
cfg = json.loads(config_path.read_text())
locked = json.loads(lock_path.read_text())["locked_family_heads"]
aliases = json.loads(alias_path.read_text())["support_cluster_only"]

locked_set = set(locked)

def detect_family(item):
    for key in ("familyKey", "rootSlug", "topicFamily", "family"):
        v = item.get(key)
        if isinstance(v, str) and v.strip():
            return v.strip()
    slug = item.get("slug")
    if isinstance(slug, str) and slug.strip():
        slug = slug.strip()
        for fam in sorted(list(locked_set | set(aliases.keys())), key=len, reverse=True):
            if slug == fam or slug.startswith(fam + "-") or slug.startswith(fam + "/"):
                return fam
    return "__unmapped__"

counts = Counter()
samples = defaultdict(list)

for item in merged:
    if not isinstance(item, dict):
        continue
    fam = detect_family(item)
    counts[fam] += 1
    slug = item.get("slug")
    if isinstance(slug, str) and len(samples[fam]) < 5:
        samples[fam].append(slug)

config_families = []
for item in cfg.get("families", []):
    if isinstance(item, dict):
        fam = item.get("familyKey") or item.get("rootSlug") or item.get("slug") or item.get("title")
        if isinstance(fam, str):
            config_families.append(fam)

config_families = sorted(set(config_families))

existing_locked = [f for f in locked if counts.get(f, 0) > 0 or f in config_families]
missing_locked = [f for f in locked if counts.get(f, 0) == 0 and f not in config_families]
deprecated_present = [f for f in aliases if counts.get(f, 0) > 0 or f in config_families]
strong_1000 = sorted([(f, counts.get(f, 0)) for f in locked if counts.get(f, 0) >= 1000], key=lambda x: (-x[1], x[0]))
foundation_only = sorted([(f, counts.get(f, 0)) for f in locked if 0 < counts.get(f, 0) < 1000], key=lambda x: (x[1], x[0]))

lines = []
lines.append("=== LOCKED FAMILY HEADS ===")
for f in locked:
    lines.append(f)

lines.append("\n=== STRONG 1000+ FAMILIES ===")
for f, c in strong_1000:
    lines.append(f"{f}\t{c}")

lines.append("\n=== FOUNDATION / UNDER-1000 FAMILIES ===")
for f, c in foundation_only:
    lines.append(f"{f}\t{c}")

lines.append("\n=== DEPRECATED / SUPPORT-CLUSTER HEADS PRESENT ===")
for f in deprecated_present:
    lines.append(f"{f}\t->\t{aliases[f]}")

lines.append("\n=== MISSING LOCKED FAMILY HEADS ===")
for f in missing_locked:
    lines.append(f)

lines.append("\n=== SAMPLE SLUGS ===")
for fam, c in strong_1000[:20] + foundation_only[:30]:
    lines.append(f"\n[{fam}] count={c}")
    for s in samples.get(fam, []):
        lines.append(f" - {s}")

report_path.write_text("\n".join(lines), encoding="utf-8")
print(report_path.read_text())
