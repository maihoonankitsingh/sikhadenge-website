(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_CTA_TYPOGRAPHY_V3__) return;
  window.__CLAUDE_CTA_TYPOGRAPHY_V3__ = true;

  const STYLE_ID = "sd-claude-cta-typography-v3-style";
  const CTA = '[data-sd-cta-primary-v1="1"]';

  function apply() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }

    style.textContent = `
      html body ${CTA} .sd-cta-main-copy-v2 {
        font-family: "__manrope_a43dd5", "__manrope_Fallback_a43dd5", Manrope, sans-serif !important;
        font-size: 16px !important;
        line-height: 1.12 !important;
        font-weight: 760 !important;
        letter-spacing: -.015em !important;
      }

      html body ${CTA} .sd-cta-free-pill-v2 {
        font-size: 13.5px !important;
        line-height: 1 !important;
        font-weight: 760 !important;
      }

      @media (max-width: 1024px) {
        html body ${CTA} .sd-cta-main-copy-v2 {
          font-size: 15px !important;
        }
        html body ${CTA} .sd-cta-free-pill-v2 {
          font-size: 13px !important;
        }
      }

      @media (max-width: 640px) {
        html body ${CTA} .sd-cta-main-copy-v2 {
          font-size: 14px !important;
          line-height: 1.1 !important;
        }
        html body ${CTA} .sd-cta-free-pill-v2 {
          font-size: 12.5px !important;
        }
      }

      @media (max-width: 370px) {
        html body ${CTA} .sd-cta-main-copy-v2 {
          font-size: 13.5px !important;
        }
        html body ${CTA} .sd-cta-free-pill-v2 {
          font-size: 12px !important;
        }
      }
    `;

    document.documentElement.setAttribute("data-claude-cta-typography", "v3");
  }

  const boot = () => {
    apply();
    [400, 1000, 2200, 5000].forEach((ms) => setTimeout(apply, ms));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
