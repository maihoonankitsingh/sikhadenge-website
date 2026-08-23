from pathlib import Path
from datetime import datetime
import re
import shutil

ROOT = Path('/var/www/sikhadenge.in/sikhadenge-website-space')
CSS = ROOT / 'styles/claude-masterclass-live.module.css'
APP = ROOT / 'pages/_app.tsx'
PATCH = Path(__file__).with_name('claude-hero-v7.css.txt')

if not CSS.exists():
    raise SystemExit(f'STOP: missing {CSS}')
if not PATCH.exists():
    raise SystemExit(f'STOP: missing {PATCH}')

stamp = datetime.now().strftime('%Y%m%d-%H%M%S')
backup = ROOT / '_safe_backups' / f'claude-hero-before-v7-{stamp}'
backup.mkdir(parents=True, exist_ok=False)
shutil.copy2(CSS, backup / 'claude-masterclass-live.module.css.before')
if APP.exists():
    shutil.copy2(APP, backup / '_app.tsx.before')

text = CSS.read_text(encoding='utf-8')

# Remove prior experimental hero blocks, regardless of multiline comments.
patterns = [
    (r'/\* CLAUDE HERO PREMIUM V6 START.*?/\* CLAUDE HERO PREMIUM V6 END \*/', 'V6'),
    (r'/\* CLAUDE HERO V6\.1 OPTICAL BALANCE START.*?/\* CLAUDE HERO V6\.1 OPTICAL BALANCE END \*/', 'V6.1'),
    (r'/\* CLAUDE HERO V6\.2 CLEAN BALANCE START.*?/\* CLAUDE HERO V6\.2 CLEAN BALANCE END \*/', 'V6.2'),
    (r'/\* CLAUDE HERO V7 PROFESSIONAL START.*?/\* CLAUDE HERO V7 PROFESSIONAL END \*/', 'existing V7'),
]
for pattern, label in patterns:
    text, count = re.subn(pattern, '', text, flags=re.S)
    if count:
        print(f'Removed {label} block: {count}')

patch = PATCH.read_text(encoding='utf-8').strip()
CSS.write_text(text.rstrip() + '\n\n' + patch + '\n', encoding='utf-8')

# Remove the unused global v5 experiment import so the production CSS bundle is unambiguous.
if APP.exists():
    app = APP.read_text(encoding='utf-8')
    old = 'import "../styles/funnel-claude-hero-v5.css";\n'
    if old in app:
        app = app.replace(old, '')
        APP.write_text(app, encoding='utf-8')
        print('Removed unused funnel-claude-hero-v5.css import from pages/_app.tsx')

updated = CSS.read_text(encoding='utf-8')
assert 'CLAUDE HERO V7 PROFESSIONAL START' in updated
assert 'CLAUDE HERO V6.1 OPTICAL BALANCE START' not in updated
assert 'CLAUDE HERO V6.2 CLEAN BALANCE START' not in updated

print('OK: Claude Hero V7 Professional installed in source')
print(f'Backup: {backup}')
print('No build or PM2 restart was performed by this installer.')
