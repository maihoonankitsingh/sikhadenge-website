#!/usr/bin/env python3
from pathlib import Path
from datetime import datetime
import re, shutil

ROOT = Path("/var/www/sikhadenge.in/sikhadenge-website-space")
TSX = ROOT / "pages/masterclass/claude/free.tsx"
CSS = ROOT / "styles/claude-masterclass-live.module.css"

PKG = Path(__file__).resolve().parent
DESKTOP = PKG / "real-work-desktop.png"
MOBILE = PKG / "real-work-mobile.png"

DEST_DIR = ROOT / "public/funnels/claude/real-work"
DEST_DESKTOP = DEST_DIR / "real-work-desktop.png"
DEST_MOBILE = DEST_DIR / "real-work-mobile.png"

if not TSX.exists() or not CSS.exists():
    raise SystemExit("STOP: Claude page source files not found")

if not DESKTOP.exists() or not MOBILE.exists():
    raise SystemExit("STOP: responsive image assets missing from package")

tsx = TSX.read_text(encoding="utf-8")
css = CSS.read_text(encoding="utf-8")

for token in [
    'className={styles.community}',
    '/gen-ai-masterclass/register-one-step',
]:
    if token not in tsx:
        raise SystemExit(f"STOP: expected source token missing: {token}")

stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
backup = ROOT / "_safe_backups" / f"claude-before-v11-real-work-image-{stamp}"
backup.mkdir(parents=True, exist_ok=True)

shutil.copy2(TSX, backup / "free.tsx.before")
shutil.copy2(CSS, backup / "claude-masterclass-live.module.css.before")

DEST_DIR.mkdir(parents=True, exist_ok=True)

if DEST_DESKTOP.exists():
    shutil.copy2(DEST_DESKTOP, backup / "real-work-desktop.png.before")
if DEST_MOBILE.exists():
    shutil.copy2(DEST_MOBILE, backup / "real-work-mobile.png.before")

shutil.copy2(DESKTOP, DEST_DESKTOP)
shutil.copy2(MOBILE, DEST_MOBILE)

new_section = r'''<section className={styles.community}>
          <div className={`${styles.container} ${styles.realWorkSection}`}>
            <div className={styles.realWorkPanel}>

              <picture className={styles.realWorkPicture} aria-hidden="true">
                <source
                  media="(max-width: 640px)"
                  srcSet="/funnels/claude/real-work/real-work-mobile.png"
                />
                <img
                  src="/funnels/claude/real-work/real-work-desktop.png"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </picture>

              <div className={styles.realWorkOverlay}>
                <span className={styles.realWorkEyebrow}>
                  BUILT FOR REAL WORK
                </span>

                <h2>
                  Use Claude for <em>work you already do.</em>
                </h2>

                <p>
                  Research, writing, analysis and repeatable workflows —
                  shown live with a practical, step-by-step approach.
                </p>

                <div className={styles.realWorkTags} aria-label="Claude workflow examples">
                  <span>Research &amp; Long Docs</span>
                  <span>Professional Writing</span>
                  <span>Structured Analysis</span>
                  <span>Reusable Workflows</span>
                </div>
              </div>

            </div>
          </div>
        </section>'''

tsx, count = re.subn(
    r'<section className=\{styles\.community\}>.*?</section>',
    new_section,
    tsx,
    count=1,
    flags=re.S
)

if count != 1:
    raise SystemExit(f"STOP: community section replacement count={count}, expected 1")

for pattern in [
    r'/\* CLAUDE V10\.10 REAL TRUST BAR START \*/.*?/\* CLAUDE V10\.10 REAL TRUST BAR END \*/',
    r'/\* CLAUDE V10\.10 WORKFLOW TRUST STRIP START \*/.*?/\* CLAUDE V10\.10 WORKFLOW TRUST STRIP END \*/',
    r'/\* CLAUDE V11 REAL WORK IMAGE SECTION START \*/.*?/\* CLAUDE V11 REAL WORK IMAGE SECTION END \*/',
]:
    css = re.sub(pattern, '', css, flags=re.S)

patch = r'''
/* CLAUDE V11 REAL WORK IMAGE SECTION START */

.community{
  position:relative;
  padding:30px 0 !important;
  overflow:hidden;
  background:#f7f2ec !important;
}

.realWorkSection{
  position:relative;
}

.realWorkPanel{
  position:relative;
  isolation:isolate;
  overflow:hidden;
  min-height:430px;
  border:1px solid rgba(255,255,255,.08);
  border-radius:28px;
  background:#111214;
  box-shadow:
    0 28px 80px rgba(30,20,15,.14),
    inset 0 1px 0 rgba(255,255,255,.04);
}

.realWorkPicture{
  position:absolute;
  inset:0;
  z-index:0;
  display:block;
}

.realWorkPicture img{
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center;
}

.realWorkPanel::after{
  content:"";
  position:absolute;
  inset:0;
  z-index:1;
  pointer-events:none;
  background:
    linear-gradient(
      90deg,
      rgba(14,15,17,.20) 0%,
      rgba(14,15,17,.08) 42%,
      rgba(14,15,17,.03) 68%,
      rgba(14,15,17,.10) 100%
    );
}

.realWorkOverlay{
  position:relative;
  z-index:2;
  width:min(38%,470px);
  min-height:430px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:48px 0 48px 58px;
}

.realWorkEyebrow{
  margin-bottom:15px;
  color:#ec9776;
  font-size:10px;
  font-weight:850;
  line-height:1;
  letter-spacing:.16em;
}

.realWorkOverlay h2{
  margin:0;
  color:#fff;
  font-size:clamp(38px,3.2vw,54px);
  font-weight:590;
  line-height:1.03;
  letter-spacing:-.052em;
  text-wrap:balance;
}

.realWorkOverlay h2 em{
  color:#f0a080;
  font-style:normal;
  font-weight:620;
}

.realWorkOverlay p{
  max-width:430px;
  margin:20px 0 0;
  color:#c3b7b0;
  font-size:15px;
  font-weight:430;
  line-height:1.7;
}

.realWorkTags{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:8px;
  margin-top:24px;
}

.realWorkTags span{
  display:flex;
  min-height:38px;
  align-items:center;
  padding:0 12px;
  border:1px solid rgba(240,151,118,.17);
  border-radius:11px;
  background:rgba(255,255,255,.035);
  color:#eaded7;
  font-size:10px;
  font-weight:610;
  line-height:1.25;
  backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);
}

@media(max-width:1024px){
  .community{
    padding:24px 0 !important;
  }

  .realWorkPanel{
    min-height:390px;
    border-radius:24px;
  }

  .realWorkOverlay{
    width:min(46%,430px);
    min-height:390px;
    padding:38px 0 38px 38px;
  }

  .realWorkOverlay h2{
    font-size:clamp(34px,4.8vw,46px);
  }

  .realWorkOverlay p{
    font-size:14px;
  }

  .realWorkTags{
    grid-template-columns:1fr;
    max-width:270px;
  }
}

@media(max-width:640px){
  .community{
    padding:18px 0 !important;
  }

  .realWorkSection{
    width:min(100% - 20px,1240px) !important;
  }

  .realWorkPanel{
    min-height:0;
    aspect-ratio:1122 / 1402;
    border-radius:22px;
  }

  .realWorkPicture img{
    object-position:center top;
  }

  .realWorkPanel::after{
    background:
      linear-gradient(
        180deg,
        rgba(14,15,17,.18) 0%,
        rgba(14,15,17,.03) 46%,
        rgba(14,15,17,.08) 100%
      );
  }

  .realWorkOverlay{
    position:absolute;
    inset:0 0 auto 0;
    width:100%;
    min-height:0;
    justify-content:flex-start;
    padding:28px 22px 0;
    text-align:left;
  }

  .realWorkEyebrow{
    margin-bottom:10px;
    font-size:8px;
  }

  .realWorkOverlay h2{
    max-width:330px;
    font-size:clamp(30px,8.8vw,38px);
    line-height:1.04;
  }

  .realWorkOverlay p{
    max-width:330px;
    margin-top:12px;
    font-size:13px;
    line-height:1.55;
  }

  .realWorkTags{
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:6px;
    width:100%;
    max-width:350px;
    margin-top:14px;
  }

  .realWorkTags span{
    min-height:34px;
    padding:0 9px;
    border-radius:9px;
    font-size:9px;
  }
}

@media(max-width:380px){
  .realWorkOverlay{
    padding:23px 18px 0;
  }

  .realWorkOverlay h2{
    font-size:28px;
  }

  .realWorkOverlay p{
    font-size:12px;
  }

  .realWorkTags span{
    min-height:32px;
    font-size:8px;
  }
}

/* CLAUDE V11 REAL WORK IMAGE SECTION END */
'''

css = css.rstrip() + patch + "\n"

checks = {
    "Desktop asset reference":
        "/funnels/claude/real-work/real-work-desktop.png" in tsx,
    "Mobile asset reference":
        "/funnels/claude/real-work/real-work-mobile.png" in tsx,
    "HTML heading":
        "Use Claude for <em>work you already do.</em>" in tsx,
    "HTML workflow tags":
        "Research &amp; Long Docs" in tsx and "Reusable Workflows" in tsx,
    "Registration preserved":
        "/gen-ai-masterclass/register-one-step" in tsx,
    "V11 CSS present":
        "CLAUDE V11 REAL WORK IMAGE SECTION START" in css,
}

for name, ok in checks.items():
    print(f"{name} => {ok}")

if not all(checks.values()):
    raise SystemExit("STOP: V11 verification failed")

TSX.write_text(tsx, encoding="utf-8")
CSS.write_text(css, encoding="utf-8")

print("Assets copied =>", DEST_DESKTOP.exists() and DEST_MOBILE.exists())
print("OK: V11 responsive real-work image section installed in source")
print(f"Backup: {backup}")
print("Changed: community section + scoped CSS + 2 responsive image assets")
print("No build, PM2, backend, registration, tracking or payment changes were performed.")
