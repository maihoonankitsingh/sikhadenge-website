#!/usr/bin/env python3
from pathlib import Path
from datetime import datetime
import re
import shutil

ROOT = Path("/var/www/sikhadenge.in/sikhadenge-website-space")
TSX = ROOT / "pages/masterclass/claude/free.tsx"
CSS = ROOT / "styles/claude-masterclass-live.module.css"

PKG = Path(__file__).resolve().parent

ASSETS = {
    "real-work-desktop-v2.png": PKG / "real-work-desktop-v2.png",
    "real-work-tablet-v2.png": PKG / "real-work-tablet-v2.png",
    "real-work-mobile-v2.png": PKG / "real-work-mobile-v2.png",
}

DEST_DIR = ROOT / "public/funnels/claude/real-work"

if not TSX.exists() or not CSS.exists():
    raise SystemExit("STOP: Claude page source files not found")

for name, src in ASSETS.items():
    if not src.exists() or src.stat().st_size == 0:
        raise SystemExit(f"STOP: package asset missing: {name}")

tsx = TSX.read_text(encoding="utf-8")
css = CSS.read_text(encoding="utf-8")

required = [
    'className={styles.realWorkPicture}',
    'className={styles.realWorkOverlay}',
    '/gen-ai-masterclass/register-one-step',
    'CLAUDE V11 REAL WORK IMAGE SECTION START',
]

for token in required:
    if token not in (tsx + css):
        raise SystemExit(f"STOP: expected source token missing: {token}")

stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
backup = ROOT / "_safe_backups" / f"claude-before-v114-art-assets-{stamp}"
backup.mkdir(parents=True, exist_ok=True)

shutil.copy2(TSX, backup / "free.tsx.before")
shutil.copy2(CSS, backup / "claude-masterclass-live.module.css.before")

DEST_DIR.mkdir(parents=True, exist_ok=True)

for name, src in ASSETS.items():
    dest = DEST_DIR / name
    if dest.exists():
        shutil.copy2(dest, backup / f"{name}.before")
    shutil.copy2(src, dest)

new_picture = """<div className={styles.realWorkPicture}>
                <img
                  className={styles.realWorkDesktopArt}
                  src="/funnels/claude/real-work/real-work-desktop-v2.png"
                  alt="Use Claude for work you already do: Research and Long Docs, Professional Writing, Structured Analysis and Reusable Workflows."
                  loading="lazy"
                  decoding="async"
                />

                <img
                  className={styles.realWorkTabletArt}
                  src="/funnels/claude/real-work/real-work-tablet-v2.png"
                  alt="Use Claude for work you already do: Research and Long Docs, Professional Writing, Structured Analysis and Reusable Workflows."
                  loading="lazy"
                  decoding="async"
                />

                <img
                  className={styles.realWorkMobileArt}
                  src="/funnels/claude/real-work/real-work-mobile-v2.png"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>

              """

pattern = (
    r'<div\s+className=\{styles\.realWorkPicture\}'
    r'(?:\s+aria-hidden="true")?\s*>.*?</div>\s*'
    r'(?=<div className=\{styles\.realWorkOverlay\}>)'
)

tsx, count = re.subn(
    pattern,
    new_picture,
    tsx,
    count=1,
    flags=re.S,
)

if count != 1:
    raise SystemExit(
        f"STOP: realWorkPicture replacement count={count}, expected 1"
    )

css = re.sub(
    r'/\* CLAUDE V11\.4 FINAL ART ASSETS START \*/.*?/\* CLAUDE V11\.4 FINAL ART ASSETS END \*/',
    '',
    css,
    flags=re.S,
)

patch = r"""
/* CLAUDE V11.4 FINAL ART ASSETS START */

/* Shared artwork frame */
.realWorkPicture{
  position:absolute !important;
  inset:0 !important;
  display:block !important;
  width:100% !important;
  height:100% !important;
}

.realWorkPicture img{
  position:absolute !important;
  inset:0 !important;
  width:100% !important;
  height:100% !important;
  object-fit:cover !important;
}

.realWorkTabletArt{
  display:none !important;
}

/* Desktop: dedicated wide generated visual */
@media(min-width:1025px){
  .community{
    padding:18px 0 20px !important;
  }

  .realWorkSection{
    width:min(calc(100% - 48px),1500px) !important;
    max-width:none !important;
    margin-inline:auto !important;
  }

  .realWorkPanel{
    width:100% !important;
    min-height:0 !important;
    max-height:none !important;
    aspect-ratio:1916 / 821 !important;
    border-radius:28px !important;
    overflow:hidden !important;
    background:#0f1012 !important;
    box-shadow:
      0 28px 74px rgba(35,23,17,.13),
      0 4px 16px rgba(35,23,17,.05)
      !important;
  }

  .realWorkDesktopArt{
    display:block !important;
    object-position:center center !important;
    transform:none !important;
  }

  .realWorkTabletArt,
  .realWorkMobileArt{
    display:none !important;
  }

  .realWorkOverlay{
    display:none !important;
  }

  .realWorkPanel::after{
    display:none !important;
  }
}

/* Tablet: dedicated 4:3 generated visual */
@media(max-width:1024px) and (min-width:641px){
  .community{
    padding:16px 0 18px !important;
  }

  .realWorkSection{
    width:min(calc(100% - 28px),920px) !important;
    max-width:none !important;
    margin-inline:auto !important;
  }

  .realWorkPanel{
    width:100% !important;
    min-height:0 !important;
    max-height:none !important;
    aspect-ratio:1448 / 1086 !important;
    border-radius:24px !important;
    overflow:hidden !important;
    background:#0f1012 !important;
    box-shadow:
      0 24px 60px rgba(35,23,17,.12)
      !important;
  }

  .realWorkDesktopArt,
  .realWorkMobileArt{
    display:none !important;
  }

  .realWorkTabletArt{
    display:block !important;
    object-position:center center !important;
  }

  .realWorkOverlay{
    display:none !important;
  }

  .realWorkPanel::after{
    display:none !important;
  }
}

/* Mobile: keep proven vertical art + real HTML copy */
@media(max-width:640px){
  .community{
    padding:12px 0 14px !important;
  }

  .realWorkSection{
    width:calc(100% - 14px) !important;
    max-width:470px !important;
    margin-inline:auto !important;
  }

  .realWorkPanel{
    min-height:0 !important;
    max-height:none !important;
    aspect-ratio:1122 / 1402 !important;
    border-radius:20px !important;
    overflow:hidden !important;
  }

  .realWorkDesktopArt,
  .realWorkTabletArt{
    display:none !important;
  }

  .realWorkMobileArt{
    display:block !important;
    object-position:center top !important;
  }

  .realWorkOverlay{
    display:block !important;
    position:absolute !important;
    inset:0 0 auto 0 !important;
    width:100% !important;
    padding:23px 19px 0 !important;
  }

  .realWorkEyebrow{
    margin-bottom:8px !important;
    font-size:7px !important;
  }

  .realWorkOverlay h2{
    max-width:335px !important;
    font-size:clamp(28px,8.2vw,34px) !important;
    font-weight:580 !important;
    line-height:1.035 !important;
  }

  .realWorkOverlay p{
    max-width:330px !important;
    margin-top:10px !important;
    color:#c9bdb6 !important;
    font-size:12.5px !important;
    line-height:1.5 !important;
  }

  .realWorkTags{
    display:none !important;
  }

  .page{
    padding-bottom:
      calc(104px + env(safe-area-inset-bottom))
      !important;
  }
}

@media(max-width:390px){
  .realWorkSection{
    width:calc(100% - 12px) !important;
  }

  .realWorkOverlay{
    padding:20px 16px 0 !important;
  }

  .realWorkOverlay h2{
    font-size:28px !important;
  }

  .realWorkOverlay p{
    font-size:12px !important;
  }
}

/* CLAUDE V11.4 FINAL ART ASSETS END */
"""

css = css.rstrip() + patch + "\n"

checks = {
    "Desktop V2 asset":
        "/funnels/claude/real-work/real-work-desktop-v2.png" in tsx,
    "Tablet V2 asset":
        "/funnels/claude/real-work/real-work-tablet-v2.png" in tsx,
    "Mobile V2 asset":
        "/funnels/claude/real-work/real-work-mobile-v2.png" in tsx,
    "Tablet art class":
        "className={styles.realWorkTabletArt}" in tsx,
    "Registration preserved":
        "/gen-ai-masterclass/register-one-step" in tsx,
    "V11.4 CSS":
        "CLAUDE V11.4 FINAL ART ASSETS START" in css,
}

for name, ok in checks.items():
    print(f"{name} => {ok}")

if not all(checks.values()):
    raise SystemExit("STOP: V11.4 verification failed")

TSX.write_text(tsx, encoding="utf-8")
CSS.write_text(css, encoding="utf-8")

print("Assets copied =>", all((DEST_DIR / name).exists() for name in ASSETS))
print("OK: V11.4 desktop/tablet/mobile art assets installed in source")
print(f"Backup: {backup}")
print("No build, PM2, backend, tracking, registration or payment changes were performed.")
