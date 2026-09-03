(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_PROOF_THEME_V3__) return;
  window.__CLAUDE_PROOF_THEME_V3__ = true;

  const ROOT_ID = "claude-ai-video-proof-v4";
  const JOBS_ID = "ai-video-job-impact-v80";
  const SKILLS_ID = "ai-video-ai-opportunity-v85";
  const THEME_ATTR = "data-claude-proof-theme";
  const THEME_VALUE = "v3-premium";
  const STYLE_ID = "sd-claude-proof-theme-v3-css";
  const FONT = '"__manrope_a43dd5", "__manrope_Fallback_a43dd5", Manrope, sans-serif';

  const norm = (value) =>
    String(value || "")
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  function rgbToHue(r, g, b) {
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const d = max - min;
    if (!d) return { h: 0, s: 0 };
    let h;
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
    const l = (max + min) / 2;
    const s = d / (1 - Math.abs(2 * l - 1));
    return { h, s: Number.isFinite(s) ? s : 0 };
  }

  function isPurpleAccent(r, g, b) {
    const { h, s } = rgbToHue(r, g, b);
    return s >= 0.12 && h >= 245 && h <= 335;
  }

  function orangeReplacement(r, g, b, alpha) {
    const avg = (r + g + b) / 3;
    let out;
    if (avg >= 238) out = [255, 245, 240];
    else if (avg >= 205) out = [250, 196, 170];
    else if (avg >= 165) out = [236, 132, 91];
    else if (avg >= 110) out = [215, 110, 75];
    else out = [191, 82, 52];
    return alpha == null
      ? `rgb(${out[0]}, ${out[1]}, ${out[2]})`
      : `rgba(${out[0]}, ${out[1]}, ${out[2]}, ${alpha})`;
  }

  function mapPurpleRgb(value) {
    return String(value || "").replace(
      /rgba?\(\s*(\d{1,3})\s*[, ]\s*(\d{1,3})\s*[, ]\s*(\d{1,3})(?:\s*[,\/]\s*([\d.]+))?\s*\)/gi,
      (match, rs, gs, bs, as) => {
        const r = Number(rs);
        const g = Number(gs);
        const b = Number(bs);
        if (!isPurpleAccent(r, g, b)) return match;
        return orangeReplacement(r, g, b, as == null ? null : Number(as));
      }
    );
  }

  function rethemeInlinePurple(root) {
    if (!(root instanceof Element)) return;
    const props = [
      "color",
      "background-color",
      "background-image",
      "border-top-color",
      "border-right-color",
      "border-bottom-color",
      "border-left-color",
      "outline-color",
      "text-decoration-color",
      "box-shadow",
      "fill",
      "stroke",
    ];

    [root, ...root.querySelectorAll("*")].forEach((el) => {
      props.forEach((prop) => {
        const current = el.style.getPropertyValue(prop);
        if (!current) return;
        const mapped = mapPurpleRgb(current);
        if (mapped !== current) el.style.setProperty(prop, mapped, "important");
      });
    });
  }

  function tagCta() {
    const wrap = document.querySelector('[data-claude-ai-video-proof-cta="1"]');
    if (!(wrap instanceof Element)) return;
    const cta = [...wrap.querySelectorAll('a,button,[role="button"]')].find((el) => {
      const text = norm(el.textContent);
      return text.includes("free seat") || text.includes("reserve my seat");
    });
    if (cta instanceof Element) cta.setAttribute("data-sd-claude-cta", "premium-v3");
  }

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${ROOT_ID} {
        --sd-p3-orange:#D76E4B;
        --sd-p3-orange-deep:#BF5234;
        --sd-p3-orange-soft:#F4A17D;
        --sd-p3-ink:#1D1917;
        --sd-p3-muted:#746C67;
        --sd-p3-line:rgba(191,82,52,.16);
        --sd-p3-paper:#FFFDFC;
        --sd-p3-surface:#FFF9F5;
        --sd-p3-surface-2:#FFF5EF;
        width:100% !important;
        overflow:hidden !important;
        background:
          radial-gradient(circle at 12% 8%,rgba(215,110,75,.08),transparent 30%),
          radial-gradient(circle at 88% 58%,rgba(244,161,125,.09),transparent 33%),
          linear-gradient(180deg,#FFFCFA 0%,#FFF8F4 100%) !important;
        color:var(--sd-p3-ink) !important;
        font-family:${FONT} !important;
        -webkit-font-smoothing:antialiased !important;
        text-rendering:geometricPrecision !important;
      }

      #${ROOT_ID},
      #${ROOT_ID} * {
        box-sizing:border-box !important;
      }

      #${JOBS_ID},
      #${SKILLS_ID},
      #${JOBS_ID} *,
      #${SKILLS_ID} * {
        font-family:${FONT} !important;
      }

      #${JOBS_ID},
      #${SKILLS_ID} {
        position:relative !important;
        isolation:isolate !important;
        background:transparent !important;
      }

      #${JOBS_ID}::before,
      #${SKILLS_ID}::before {
        content:"";
        position:absolute;
        inset:0;
        z-index:-1;
        pointer-events:none;
        background-image:
          linear-gradient(rgba(191,82,52,.028) 1px,transparent 1px),
          linear-gradient(90deg,rgba(191,82,52,.028) 1px,transparent 1px);
        background-size:34px 34px;
        mask-image:linear-gradient(to bottom,rgba(0,0,0,.35),transparent 78%);
        -webkit-mask-image:linear-gradient(to bottom,rgba(0,0,0,.35),transparent 78%);
      }

      #${SKILLS_ID} {
        border-top:1px solid rgba(191,82,52,.11) !important;
        background:linear-gradient(180deg,rgba(255,255,255,.44),rgba(255,247,242,.68)) !important;
      }

      #${ROOT_ID} .sd-proof-v4-shell {
        width:min(1120px,calc(100% - 56px)) !important;
        margin:0 auto !important;
        padding:84px 0 88px !important;
        text-align:center !important;
      }

      #${ROOT_ID} .sd-proof-v4-eyebrow {
        display:inline-flex !important;
        align-items:center !important;
        justify-content:center !important;
        min-height:30px !important;
        padding:0 13px !important;
        border:1px solid rgba(191,82,52,.26) !important;
        border-radius:999px !important;
        background:rgba(255,255,255,.82) !important;
        box-shadow:0 8px 26px rgba(89,48,35,.06),inset 0 1px 0 rgba(255,255,255,.9) !important;
        color:var(--sd-p3-orange-deep) !important;
        font-size:8px !important;
        font-weight:700 !important;
        line-height:1 !important;
        letter-spacing:.14em !important;
        text-transform:uppercase !important;
        backdrop-filter:blur(10px) !important;
        -webkit-backdrop-filter:blur(10px) !important;
      }

      #${ROOT_ID} .sd-proof-v4-title,
      #${ROOT_ID} h2.sd-heading-v11 {
        max-width:820px !important;
        margin:16px auto 12px !important;
        color:var(--sd-p3-ink) !important;
        font-family:${FONT} !important;
        font-size:clamp(30px,2.25vw,38px) !important;
        font-weight:640 !important;
        line-height:1.18 !important;
        letter-spacing:-.026em !important;
        text-align:center !important;
        text-wrap:balance !important;
      }

      #${ROOT_ID} .sd-proof-v4-title .sd-proof-v4-highlight,
      #${ROOT_ID} h2.sd-heading-v11 .sd-heading-v11-highlight {
        display:inline-block !important;
        white-space:nowrap !important;
        vertical-align:baseline !important;
        background:linear-gradient(135deg,#BF5234 0%,#D76E4B 100%) !important;
        color:#fff !important;
        -webkit-text-fill-color:#fff !important;
        border-radius:8px !important;
        padding:.02em .18em .05em !important;
        font-family:${FONT} !important;
        font-size:1em !important;
        font-weight:675 !important;
        line-height:1.08 !important;
        box-shadow:none !important;
        text-decoration:none !important;
        box-decoration-break:clone !important;
        -webkit-box-decoration-break:clone !important;
      }

      #${ROOT_ID} .sd-proof-v4-intro {
        max-width:740px !important;
        margin:0 auto 36px !important;
        padding:0 8px !important;
        color:var(--sd-p3-muted) !important;
        font-size:12.5px !important;
        font-weight:500 !important;
        line-height:1.7 !important;
        letter-spacing:-.01em !important;
        text-align:center !important;
        text-wrap:pretty !important;
      }

      #${ROOT_ID} .sd-proof-v4-grid {
        display:grid !important;
        grid-template-columns:repeat(3,minmax(0,1fr)) !important;
        gap:18px !important;
        width:min(980px,100%) !important;
        margin:0 auto !important;
        align-items:stretch !important;
      }

      #${ROOT_ID} .sd-proof-v4-card {
        position:relative !important;
        min-width:0 !important;
        min-height:370px !important;
        padding:34px 25px 22px !important;
        border:1px solid rgba(191,82,52,.16) !important;
        border-radius:18px !important;
        background:
          linear-gradient(180deg,rgba(255,255,255,.96) 0%,rgba(255,250,247,.92) 100%) !important;
        box-shadow:
          0 18px 48px rgba(78,43,31,.075),
          0 2px 8px rgba(78,43,31,.035),
          inset 0 1px 0 rgba(255,255,255,.96) !important;
        text-align:left !important;
        display:flex !important;
        flex-direction:column !important;
        overflow:hidden !important;
        isolation:isolate !important;
        transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease !important;
      }

      #${ROOT_ID} .sd-proof-v4-card::before {
        content:"" !important;
        position:absolute !important;
        inset:0 !important;
        z-index:-2 !important;
        pointer-events:none !important;
        background:
          radial-gradient(circle at 100% 0%,rgba(215,110,75,.075),transparent 34%),
          linear-gradient(135deg,rgba(255,255,255,.7),rgba(255,247,242,.28)) !important;
      }

      #${ROOT_ID} .sd-proof-v4-card::after {
        content:"";
        position:absolute;
        top:0;
        left:24px;
        right:24px;
        height:2px;
        border-radius:0 0 999px 999px;
        background:linear-gradient(90deg,transparent,#D76E4B 22%,#F4A17D 50%,#D76E4B 78%,transparent);
        opacity:.72;
      }

      #${ROOT_ID} .sd-proof-v4-card:hover {
        transform:translateY(-4px) !important;
        border-color:rgba(191,82,52,.28) !important;
        box-shadow:
          0 26px 64px rgba(78,43,31,.105),
          0 6px 18px rgba(78,43,31,.055),
          inset 0 1px 0 rgba(255,255,255,.98) !important;
      }

      #${ROOT_ID} .sd-proof-v4-tape {
        top:0 !important;
        left:50% !important;
        width:68px !important;
        height:5px !important;
        transform:translateX(-50%) !important;
        border:0 !important;
        border-radius:0 0 999px 999px !important;
        background:linear-gradient(90deg,#F4A17D,#D76E4B,#F4A17D) !important;
        box-shadow:0 3px 10px rgba(215,110,75,.14) !important;
        opacity:.9 !important;
      }

      #${ROOT_ID} .sd-proof-v4-brand,
      #${ROOT_ID} .sd-proof-v4-brand.serif,
      #${ROOT_ID} .sd-proof-v4-brand.stacked,
      #${ROOT_ID} .sd-proof-v4-brand.compact {
        position:relative !important;
        z-index:2 !important;
        min-height:46px !important;
        display:flex !important;
        align-items:flex-end !important;
        max-width:none !important;
        color:#201B18 !important;
        font-family:${FONT} !important;
        font-size:17px !important;
        font-weight:700 !important;
        line-height:1.08 !important;
        letter-spacing:-.025em !important;
      }

      #${ROOT_ID} .sd-proof-v4-brand.stacked {
        max-width:170px !important;
        font-size:12.5px !important;
        font-weight:750 !important;
        line-height:1 !important;
        letter-spacing:.005em !important;
      }

      #${ROOT_ID} .sd-proof-v4-brand.compact {
        font-size:19px !important;
        font-weight:750 !important;
      }

      #${ROOT_ID} .sd-proof-v4-rule {
        width:100% !important;
        height:1px !important;
        margin:13px 0 19px !important;
        background:linear-gradient(90deg,rgba(191,82,52,.24),rgba(191,82,52,.08) 72%,transparent) !important;
      }

      #${ROOT_ID} .sd-proof-v4-stat {
        display:block !important;
        margin:0 !important;
        color:var(--sd-p3-orange-deep) !important;
        font-size:clamp(40px,3.2vw,50px) !important;
        font-weight:760 !important;
        line-height:.96 !important;
        letter-spacing:-.045em !important;
        text-shadow:0 8px 22px rgba(191,82,52,.08) !important;
      }

      #${ROOT_ID} .sd-proof-v4-card h3 {
        margin:10px 0 8px !important;
        color:#2B2521 !important;
        font-size:14px !important;
        font-weight:640 !important;
        line-height:1.38 !important;
        letter-spacing:-.018em !important;
      }

      #${ROOT_ID} .sd-proof-v4-card p {
        margin:0 !important;
        color:#746C67 !important;
        font-size:11px !important;
        font-weight:500 !important;
        line-height:1.66 !important;
        letter-spacing:-.004em !important;
      }

      #${ROOT_ID} .sd-proof-v4-card small {
        display:block !important;
        margin-top:auto !important;
        padding-top:16px !important;
        border-top:1px solid rgba(191,82,52,.12) !important;
        color:#8A807A !important;
        font-size:8.5px !important;
        font-weight:600 !important;
        line-height:1.48 !important;
        letter-spacing:.015em !important;
      }

      #${ROOT_ID} .sd-proof-v4-note {
        display:flex !important;
        align-items:flex-start !important;
        gap:12px !important;
        width:min(980px,100%) !important;
        margin:30px auto 16px !important;
        padding:15px 18px !important;
        border:1px solid rgba(191,82,52,.14) !important;
        border-radius:14px !important;
        background:rgba(255,255,255,.78) !important;
        box-shadow:0 12px 32px rgba(78,43,31,.045),inset 0 1px 0 rgba(255,255,255,.92) !important;
        text-align:left !important;
        backdrop-filter:blur(12px) !important;
        -webkit-backdrop-filter:blur(12px) !important;
      }

      #${ROOT_ID} .sd-proof-v4-note > span {
        display:grid !important;
        place-items:center !important;
        flex:0 0 auto !important;
        width:24px !important;
        height:24px !important;
        margin-top:0 !important;
        border:1px solid rgba(191,82,52,.22) !important;
        border-radius:8px !important;
        background:linear-gradient(180deg,#FFF7F2,#FFF0E8) !important;
        color:var(--sd-p3-orange-deep) !important;
        font-size:10px !important;
        font-weight:750 !important;
        box-shadow:0 5px 14px rgba(191,82,52,.08) !important;
      }

      #${ROOT_ID} .sd-proof-v4-note p {
        margin:1px 0 0 !important;
        color:#776E69 !important;
        font-size:10px !important;
        font-weight:500 !important;
        line-height:1.58 !important;
      }

      #${ROOT_ID} .sd-proof-v4-opportunity {
        position:relative !important;
        width:min(980px,100%) !important;
        margin:0 auto !important;
        padding:16px 20px !important;
        border:1px solid rgba(191,82,52,.16) !important;
        border-radius:14px !important;
        background:linear-gradient(180deg,rgba(255,255,255,.94),rgba(255,248,244,.9)) !important;
        box-shadow:0 14px 36px rgba(78,43,31,.05),inset 0 1px 0 rgba(255,255,255,.98) !important;
        color:#2A2420 !important;
        font-size:12px !important;
        font-weight:640 !important;
        line-height:1.5 !important;
        overflow:hidden !important;
      }

      #${ROOT_ID} .sd-proof-v4-opportunity::before {
        content:"";
        position:absolute;
        inset:0 auto 0 0;
        width:3px;
        background:linear-gradient(180deg,#F4A17D,#BF5234);
      }

      #${ROOT_ID} .sd-proof-v4-opportunity strong {
        color:var(--sd-p3-orange-deep) !important;
        font-weight:700 !important;
      }

      #${ROOT_ID} .sd-proof-v4-skills .sd-proof-v4-opportunity {
        margin-top:30px !important;
      }

      #${ROOT_ID} .sd-proof-v4-actions {
        display:flex !important;
        justify-content:center !important;
        margin-top:24px !important;
        padding:0 16px 2px !important;
        background:transparent !important;
      }

      #${ROOT_ID} [data-sd-claude-cta="premium-v3"] {
        display:inline-flex !important;
        align-items:center !important;
        justify-content:center !important;
        gap:8px !important;
        min-width:255px !important;
        min-height:52px !important;
        padding:13px 24px !important;
        border:1px solid rgba(137,57,35,.18) !important;
        border-radius:13px !important;
        background:linear-gradient(135deg,#D76E4B 0%,#BF5234 100%) !important;
        color:#fff !important;
        font-family:${FONT} !important;
        font-size:13px !important;
        font-weight:700 !important;
        line-height:1 !important;
        letter-spacing:-.015em !important;
        text-decoration:none !important;
        box-shadow:0 14px 32px rgba(191,82,52,.22),inset 0 1px 0 rgba(255,255,255,.18) !important;
        transform:none !important;
        transition:transform .2s ease,box-shadow .2s ease,filter .2s ease !important;
      }

      #${ROOT_ID} [data-sd-claude-cta="premium-v3"] span {
        font-size:10px !important;
        font-weight:600 !important;
        opacity:.9 !important;
      }

      #${ROOT_ID} [data-sd-claude-cta="premium-v3"]:hover {
        transform:translateY(-2px) !important;
        box-shadow:0 20px 38px rgba(191,82,52,.28),inset 0 1px 0 rgba(255,255,255,.2) !important;
        filter:saturate(1.03) !important;
      }

      @media (max-width:1024px) {
        #${ROOT_ID} .sd-proof-v4-shell {
          width:min(100% - 40px,1120px) !important;
          padding:72px 0 76px !important;
        }
        #${ROOT_ID} .sd-proof-v4-title,
        #${ROOT_ID} h2.sd-heading-v11 {
          max-width:760px !important;
          font-size:clamp(28px,3.7vw,34px) !important;
          line-height:1.19 !important;
        }
      }

      @media (max-width:900px) {
        #${ROOT_ID} .sd-proof-v4-grid {
          grid-template-columns:1fr !important;
          max-width:720px !important;
          gap:16px !important;
        }
        #${ROOT_ID} .sd-proof-v4-card {
          min-height:300px !important;
        }
        #${ROOT_ID} .sd-proof-v4-note,
        #${ROOT_ID} .sd-proof-v4-opportunity {
          max-width:720px !important;
        }
      }

      @media (max-width:640px) {
        #${ROOT_ID} .sd-proof-v4-shell {
          width:min(100% - 24px,1120px) !important;
          padding:54px 0 58px !important;
        }
        #${ROOT_ID} .sd-proof-v4-eyebrow {
          min-height:28px !important;
          padding:0 11px !important;
          font-size:7.5px !important;
        }
        #${ROOT_ID} .sd-proof-v4-title,
        #${ROOT_ID} h2.sd-heading-v11 {
          max-width:94% !important;
          margin:14px auto 11px !important;
          font-size:clamp(24px,6.2vw,28px) !important;
          line-height:1.20 !important;
          font-weight:640 !important;
          letter-spacing:-.021em !important;
        }
        #${ROOT_ID} .sd-proof-v4-title .sd-proof-v4-highlight,
        #${ROOT_ID} h2.sd-heading-v11 .sd-heading-v11-highlight {
          font-weight:675 !important;
          line-height:1.08 !important;
          padding:.015em .15em .045em !important;
          border-radius:7px !important;
        }
        #${ROOT_ID} .sd-proof-v4-intro {
          margin-bottom:26px !important;
          padding:0 8px !important;
          font-size:11.5px !important;
          line-height:1.62 !important;
        }
        #${ROOT_ID} .sd-proof-v4-grid {
          gap:13px !important;
        }
        #${ROOT_ID} .sd-proof-v4-card {
          min-height:0 !important;
          padding:30px 19px 19px !important;
          border-radius:16px !important;
        }
        #${ROOT_ID} .sd-proof-v4-card::after {
          left:18px !important;
          right:18px !important;
        }
        #${ROOT_ID} .sd-proof-v4-brand,
        #${ROOT_ID} .sd-proof-v4-brand.serif,
        #${ROOT_ID} .sd-proof-v4-brand.compact {
          min-height:42px !important;
          font-size:16px !important;
        }
        #${ROOT_ID} .sd-proof-v4-brand.stacked {
          min-height:42px !important;
          font-size:12px !important;
        }
        #${ROOT_ID} .sd-proof-v4-stat {
          font-size:38px !important;
        }
        #${ROOT_ID} .sd-proof-v4-card h3 {
          font-size:13.5px !important;
        }
        #${ROOT_ID} .sd-proof-v4-card p {
          font-size:10.5px !important;
        }
        #${ROOT_ID} .sd-proof-v4-note {
          margin-top:23px !important;
          padding:13px 14px !important;
          border-radius:12px !important;
        }
        #${ROOT_ID} .sd-proof-v4-note p {
          font-size:9.5px !important;
        }
        #${ROOT_ID} .sd-proof-v4-opportunity {
          padding:14px 15px !important;
          border-radius:12px !important;
          font-size:11px !important;
        }
        #${ROOT_ID} .sd-proof-v4-skills .sd-proof-v4-opportunity {
          margin-top:23px !important;
        }
        #${ROOT_ID} .sd-proof-v4-actions {
          margin-top:20px !important;
          padding:0 !important;
        }
        #${ROOT_ID} [data-sd-claude-cta="premium-v3"] {
          width:min(100%,330px) !important;
          min-width:0 !important;
          min-height:52px !important;
          padding:13px 20px !important;
          border-radius:12px !important;
          font-size:12.5px !important;
        }
      }

      @media (prefers-reduced-motion:reduce) {
        #${ROOT_ID} .sd-proof-v4-card,
        #${ROOT_ID} [data-sd-claude-cta="premium-v3"] {
          transition:none !important;
        }
        #${ROOT_ID} .sd-proof-v4-card:hover,
        #${ROOT_ID} [data-sd-claude-cta="premium-v3"]:hover {
          transform:none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function applyTheme() {
    const root = document.getElementById(ROOT_ID);
    const jobs = document.getElementById(JOBS_ID);
    const skills = document.getElementById(SKILLS_ID);
    if (!(root instanceof Element) || !(jobs instanceof Element) || !(skills instanceof Element)) return false;

    ensureStyle();
    rethemeInlinePurple(jobs);
    rethemeInlinePurple(skills);
    tagCta();
    document.documentElement.setAttribute(THEME_ATTR, THEME_VALUE);
    return true;
  }

  let raf = 0;
  const observer = new MutationObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(applyTheme);
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTheme, { once: true });
  } else {
    applyTheme();
  }

  [50, 150, 350, 700, 1200, 2200, 4000, 7000, 11000, 16000].forEach((ms) => setTimeout(applyTheme, ms));
  setTimeout(() => observer.disconnect(), 22000);
})();
