import json
from pathlib import Path

ROOT = Path("/var/www/sikhadenge.space/sikhadenge-website-space")
final50 = json.loads((ROOT / "config/seo/final-family-heads-50.json").read_text())
dupes = json.loads((ROOT / "config/seo/ignored-duplicate-family-heads.json").read_text())
matrix = json.loads((ROOT / "config/seo/programmatic-matrix-1000.json").read_text())

strong20 = final50["strong_existing_20"]
pending30 = final50["pending_canonical_30"]
ignored = dupes["ignore_as_family_head"]

out = []
out.append("=== FINAL 50 FAMILY STRUCTURE ===")
out.append(f"strong_existing_20 = {len(strong20)}")
out.append(f"pending_canonical_30 = {len(pending30)}")
out.append(f"ignored_duplicate_heads = {len(ignored)}")
out.append("")
out.append("=== PENDING 30 ===")
for f in pending30:
    out.append(f)
out.append("")
out.append("=== IGNORED DUPLICATE HEADS ===")
for k, v in ignored.items():
    out.append(f"{k} -> {v}")
out.append("")
out.append("=== 1000+ MATRIX ===")
out.append(json.dumps(matrix, indent=2))

report = ROOT / "reports/pending_30_family_structure.txt"
report.write_text("\n".join(out), encoding="utf-8")
print(report.read_text())
