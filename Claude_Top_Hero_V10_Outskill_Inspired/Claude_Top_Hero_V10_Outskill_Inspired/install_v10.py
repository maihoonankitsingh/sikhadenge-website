#!/usr/bin/env python3
from pathlib import Path
from datetime import datetime
import re, shutil

ROOT = Path("/var/www/sikhadenge.in/sikhadenge-website-space")
TSX = ROOT / "pages/masterclass/claude/free.tsx"
CSS = ROOT / "styles/claude-masterclass-live.module.css"
pkg = Path(__file__).resolve().parent

hero_path = pkg / "hero.v10.fragment.txt"
css_path = pkg / "hero-v10.css"

if not TSX.exists() or not CSS.exists():
    raise SystemExit("STOP: live Claude page files not found")
if not hero_path.exists() or not css_path.exists():
    raise SystemExit("STOP: V10 package incomplete")

tsx = TSX.read_text(encoding="utf-8")
css = CSS.read_text(encoding="utf-8")
hero = hero_path.read_text(encoding="utf-8").strip()
patch = css_path.read_text(encoding="utf-8").strip()

for token in [
    'const registerHref = "/gen-ai-masterclass/register-one-step";',
    '<section className={styles.hero}>',
    'id="why"',
    'inter.variable',
]:
    if token not in tsx:
        raise SystemExit(f"STOP: expected source token missing: {token}")

stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
backup = ROOT / "_safe_backups" / f"claude-before-top-v10-{stamp}"
backup.mkdir(parents=True, exist_ok=True)
shutil.copy2(TSX, backup / "free.tsx.before")
shutil.copy2(CSS, backup / "claude-masterclass-live.module.css.before")

pattern = r'\s*<section className=\{styles\.hero\}>.*?</section>'
new_tsx, count = re.subn(pattern, "\n" + hero, tsx, count=1, flags=re.S)
if count != 1:
    raise SystemExit(f"STOP: hero replacement count was {count}, expected 1")

css, removed = re.subn(
    r'/\* CLAUDE TOP HERO V10 OUTSKILL-INSPIRED START \*/.*?/\* CLAUDE TOP HERO V10 OUTSKILL-INSPIRED END \*/',
    '',
    css,
    flags=re.S,
)
new_css = css.rstrip() + "\n\n" + patch + "\n"

checks = {
    "Registration route preserved": '/gen-ai-masterclass/register-one-step' in new_tsx,
    "Inter preserved": 'inter.variable' in new_tsx and '--font-inter' in new_tsx,
    "Only one new hero": new_tsx.count('className={styles.hero}') == 1,
    "Agenda anchor preserved": 'id="agenda"' in new_tsx,
    "Rest-of-page marker preserved": 'id="why"' in new_tsx,
    "V10 CSS present": 'CLAUDE TOP HERO V10 OUTSKILL-INSPIRED START' in new_css,
}

for name, ok in checks.items():
    print(f"{name} => {ok}")

if not all(checks.values()):
    raise SystemExit("STOP: V10 safety verification failed")

TSX.write_text(new_tsx, encoding="utf-8")
CSS.write_text(new_css, encoding="utf-8")

print(f"Removed previous V10 CSS block: {removed}")
print("OK: Claude top hero V10 installed in source")
print(f"Backup: {backup}")
print("Scope: top hero section + hero-only CSS")
print("Registration/backend/tracking/payment logic unchanged")
print("No build or PM2 restart was performed")
