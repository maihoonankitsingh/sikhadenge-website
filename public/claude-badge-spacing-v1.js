(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_BADGE_SPACING_V1__) return;
  window.__CLAUDE_BADGE_SPACING_V1__ = true;

  const STYLE_ID = "sd-claude-badge-spacing-v1-style";

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      /* Claude page only: one standard 12px badge-to-heading rhythm. */

      html body .sd-eyebrow-pill-v12 {
        margin-bottom: 12px !important;
      }

      html body .sd-eyebrow-pill-v12 + h2.sd-heading-v11 {
        margin-top: 0 !important;
      }

      html body .sd-pill-row-v14 {
        margin-bottom: 12px !important;
      }

      html body .sd-pill-row-v14 .sd-eyebrow-pill-v12 {
        margin-bottom: 0 !important;
      }

      html body .sd-pill-row-v14 + h2.sd-heading-v11 {
        margin-top: 0 !important;
      }

      html body #claude-ai-video-proof-v4 .sd-proof-v4-eyebrow {
        margin-bottom: 0 !important;
      }

      html body #claude-ai-video-proof-v4 .sd-proof-v4-eyebrow + h2.sd-proof-v4-title,
      html body #claude-ai-video-proof-v4 .sd-proof-v4-eyebrow + h2.sd-heading-v11 {
        margin-top: 12px !important;
      }
    `;
    document.head.appendChild(style);
  }

  function markTargets() {
    document.querySelectorAll(".sd-eyebrow-pill-v12").forEach((el) => {
      el.setAttribute("data-sd-badge-gap-normalized", "1");
    });
    document.querySelectorAll("#claude-ai-video-proof-v4 .sd-proof-v4-eyebrow").forEach((el) => {
      el.setAttribute("data-sd-badge-gap-normalized", "1");
    });
    document.documentElement.setAttribute("data-claude-badge-spacing", "v1-standard-12");
  }

  function apply() {
    ensureStyle();
    markTargets();
  }

  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, { once: true });
  } else {
    apply();
  }

  [50, 150, 350, 700, 1200, 2200, 4000, 7000, 11000].forEach((ms) => setTimeout(apply, ms));
  setTimeout(() => observer.disconnect(), 16000);
})();
