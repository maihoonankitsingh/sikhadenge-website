#!/usr/bin/env python3
from pathlib import Path
from datetime import datetime
import re, shutil

ROOT = Path("/var/www/sikhadenge.in/sikhadenge-website-space")
CSS = ROOT / "styles/claude-masterclass-live.module.css"
TSX = ROOT / "pages/masterclass/claude/free.tsx"

if not CSS.exists():
    raise SystemExit("STOP: Claude CSS module not found")
if not TSX.exists():
    raise SystemExit("STOP: Claude page TSX not found")

stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
backup = ROOT / "_safe_backups" / f"claude-before-v8-{stamp}"
backup.mkdir(parents=True, exist_ok=True)
shutil.copy2(CSS, backup / CSS.name)
shutil.copy2(TSX, backup / TSX.name)

css = CSS.read_text(encoding="utf-8")
tsx = TSX.read_text(encoding="utf-8")

# Remove older experimental blocks so V8 has one clear source of truth.
patterns = [
    r'/\* CLAUDE HERO PREMIUM V6 START.*?/\* CLAUDE HERO PREMIUM V6 END \*/',
    r'/\* CLAUDE HERO V6\.1 OPTICAL BALANCE START.*?/\* CLAUDE HERO V6\.1 OPTICAL BALANCE END \*/',
    r'/\* CLAUDE HERO V6\.2 CLEAN BALANCE START.*?/\* CLAUDE HERO V6\.2 CLEAN BALANCE END \*/',
    r'/\* CLAUDE HERO V7 PROFESSIONAL START.*?/\* CLAUDE HERO V7 PROFESSIONAL END \*/',
    r'/\* CLAUDE PAGE V8 ADVANCED START.*?/\* CLAUDE PAGE V8 ADVANCED END \*/',
]

removed = 0
for pattern in patterns:
    css, count = re.subn(pattern, "", css, flags=re.S)
    removed += count

patch_path = Path(__file__).with_name("claude-v8-advanced.css")
patch = patch_path.read_text(encoding="utf-8").strip()

css = css.rstrip() + "\n\n" + patch + "\n"
CSS.write_text(css, encoding="utf-8")

# Inter is required. Preserve any existing next/font integration; abort rather than silently falling back.
checks = {
    "Inter import": 'from "next/font/google"' in tsx and "Inter" in tsx,
    "Inter CSS variable": '--font-inter' in tsx,
    "Inter page root": 'inter.variable' in tsx,
    "V8 marker": "CLAUDE PAGE V8 ADVANCED START" in css,
    "Registration route untouched": '/gen-ai-masterclass/register-one-step' in tsx,
}

print(f"Removed old design blocks: {removed}")
for name, ok in checks.items():
    print(f"{name} => {ok}")

if not all(checks.values()):
    raise SystemExit("STOP: one or more safety checks failed")

print("OK: Claude Page V8 Advanced installed in source")
print(f"Backup: {backup}")
print("No build, PM2 restart, backend, registration or tracking change was performed.")
