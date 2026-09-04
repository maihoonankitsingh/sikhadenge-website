(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_STICKY_CTA_V4__) return;
  window.__CLAUDE_STICKY_CTA_V4__ = true;

  const REG = "/gen-ai-masterclass/register-one-step";
  const STYLE_ID = "sd-claude-sticky-cta-v4-style";
  const STICKY = '[data-sd-cta-sticky-v1="1"]';

  function ensureStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }

    style.textContent = `
      html body ${STICKY} {
        background:
          radial-gradient(circle at 84% 18%, rgba(215,110,75,.075), transparent 30%),
          linear-gradient(180deg, rgba(255,252,249,.985) 0%, rgba(252,247,243,.985) 100%) !important;
        border-top: 1px solid rgba(191,82,52,.16) !important;
        box-shadow: 0 -14px 42px rgba(43,31,25,.10) !important;
        -webkit-backdrop-filter: blur(20px) saturate(1.08) !important;
        backdrop-filter: blur(20px) saturate(1.08) !important;
      }

      html body ${STICKY} a[href="${REG}"] {
        position: relative !important;
        isolation: isolate !important;
        overflow: hidden !important;
        min-width: 420px !important;
        min-height: 64px !important;
        padding: 8px 10px 8px 24px !important;
        gap: 16px !important;
        border: 1px solid rgba(123,37,17,.24) !important;
        border-radius: 19px !important;
        background: linear-gradient(135deg,#B9482B 0%,#CF5A38 48%,#E47852 100%) !important;
        color: #FFFFFF !important;
        cursor: pointer !important;
        box-shadow:
          0 18px 38px rgba(180,70,39,.30),
          0 6px 14px rgba(180,70,39,.18),
          inset 0 1px 0 rgba(255,255,255,.27),
          inset 0 -1px 0 rgba(112,32,13,.12) !important;
        transform: translateY(-1px) !important;
        transition: transform .18s ease, box-shadow .18s ease, filter .18s ease !important;
        -webkit-tap-highlight-color: transparent !important;
      }

      html body ${STICKY} a[href="${REG}"]::before {
        content: "" !important;
        position: absolute !important;
        z-index: -1 !important;
        inset: 0 !important;
        pointer-events: none !important;
        background:
          linear-gradient(180deg, rgba(255,255,255,.16), transparent 42%),
          radial-gradient(circle at 14% 0%, rgba(255,255,255,.18), transparent 31%) !important;
        opacity: .95 !important;
      }

      html body ${STICKY} a[href="${REG}"]::after {
        content: "" !important;
        position: absolute !important;
        top: -42% !important;
        left: -28% !important;
        width: 32% !important;
        height: 190% !important;
        pointer-events: none !important;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent) !important;
        transform: rotate(18deg) !important;
        transition: left .55s ease !important;
      }

      html body ${STICKY} a[href="${REG}"]:hover {
        transform: translateY(-3px) scale(1.008) !important;
        filter: saturate(1.04) brightness(1.015) !important;
        box-shadow:
          0 23px 46px rgba(180,70,39,.34),
          0 8px 17px rgba(180,70,39,.20),
          inset 0 1px 0 rgba(255,255,255,.30),
          inset 0 -1px 0 rgba(112,32,13,.12) !important;
      }

      html body ${STICKY} a[href="${REG}"]:hover::after {
        left: 112% !important;
      }

      html body ${STICKY} a[href="${REG}"]:active {
        transform: translateY(0) scale(.995) !important;
        box-shadow:
          0 11px 24px rgba(180,70,39,.25),
          0 4px 9px rgba(180,70,39,.14),
          inset 0 1px 0 rgba(255,255,255,.22) !important;
      }

      html body ${STICKY} a[href="${REG}"]:focus-visible {
        outline: 4px solid rgba(215,110,75,.24) !important;
        outline-offset: 4px !important;
      }

      html body ${STICKY} a[href="${REG}"] .sd-cta-main-copy-v2 {
        color: #FFFFFF !important;
        font-weight: 800 !important;
        letter-spacing: -.018em !important;
        text-shadow: 0 1px 1px rgba(86,26,12,.10) !important;
      }

      html body ${STICKY} a[href="${REG}"] .sd-cta-free-pill-v2 {
        min-width: 82px !important;
        min-height: 46px !important;
        padding: 0 18px !important;
        border: 1px solid rgba(191,82,52,.10) !important;
        border-radius: 999px !important;
        background: linear-gradient(180deg,#FFFFFF 0%,#FFF8F4 100%) !important;
        color: #C54D2F !important;
        font-weight: 800 !important;
        box-shadow:
          0 7px 18px rgba(98,31,14,.14),
          inset 0 1px 0 rgba(255,255,255,.95) !important;
      }

      @media (max-width: 1024px) {
        html body ${STICKY} a[href="${REG}"] {
          min-width: 372px !important;
          min-height: 60px !important;
          padding: 7px 9px 7px 20px !important;
          gap: 13px !important;
          border-radius: 18px !important;
        }
        html body ${STICKY} a[href="${REG}"] .sd-cta-free-pill-v2 {
          min-width: 76px !important;
          min-height: 42px !important;
          padding: 0 16px !important;
        }
      }

      @media (max-width: 640px) {
        html body ${STICKY} {
          background: linear-gradient(180deg, rgba(255,252,249,.99) 0%, rgba(252,247,243,.99) 100%) !important;
          box-shadow: 0 -10px 30px rgba(43,31,25,.11) !important;
        }
        html body ${STICKY} a[href="${REG}"] {
          width: min(100%, 344px) !important;
          min-width: 0 !important;
          min-height: 56px !important;
          padding: 6px 7px 6px 14px !important;
          gap: 8px !important;
          border-radius: 16px !important;
          box-shadow:
            0 14px 30px rgba(180,70,39,.28),
            0 5px 12px rgba(180,70,39,.16),
            inset 0 1px 0 rgba(255,255,255,.25) !important;
          transform: none !important;
        }
        html body ${STICKY} a[href="${REG}"]:hover {
          transform: none !important;
        }
        html body ${STICKY} a[href="${REG}"] .sd-cta-free-pill-v2 {
          min-width: 64px !important;
          min-height: 38px !important;
          padding: 0 13px !important;
        }
      }

      @media (max-width: 370px) {
        html body ${STICKY} a[href="${REG}"] {
          width: min(100%, 318px) !important;
          padding-left: 11px !important;
          gap: 6px !important;
        }
        html body ${STICKY} a[href="${REG}"] .sd-cta-free-pill-v2 {
          min-width: 58px !important;
          padding: 0 10px !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        html body ${STICKY} a[href="${REG}"] {
          transition: none !important;
        }
        html body ${STICKY} a[href="${REG}"]::after {
          display: none !important;
        }
      }
    `;
  }

  function apply() {
    ensureStyle();
    const sticky = document.querySelector(STICKY);
    if (!sticky) return;
    const anchor = sticky.querySelector(`a[href="${REG}"]`);
    if (!anchor) return;

    sticky.setAttribute("data-sd-sticky-cta-v4", "1");
    anchor.setAttribute("data-sd-sticky-cta-button-v4", "1");
    document.documentElement.setAttribute("data-claude-sticky-cta", "v4");
  }

  let raf = 0;
  const schedule = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(apply);
  };

  const observer = new MutationObserver(schedule);
  const boot = () => {
    apply();
    observer.observe(document.documentElement, { childList: true, subtree: true });
    [250, 650, 1200, 2400, 4200, 7000, 11000].forEach((ms) => setTimeout(apply, ms));
    setTimeout(() => observer.disconnect(), 15000);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
