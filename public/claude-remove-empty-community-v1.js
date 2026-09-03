(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_REMOVE_EMPTY_COMMUNITY_V1__) return;
  window.__CLAUDE_REMOVE_EMPTY_COMMUNITY_V1__ = true;

  const STYLE_ID = "sd-claude-remove-empty-community-v1-style";
  const SELECTOR = 'section[class*="claude-masterclass-live_community__"]';

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      html body ${SELECTOR} {
        display: none !important;
        height: 0 !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
      }
    `;
    document.head.appendChild(style);
  }

  function removeExactStrip() {
    document.querySelectorAll(SELECTOR).forEach((section) => {
      const text = (section.innerText || "").replace(/\s+/g, " ").trim();
      if (text === "Use AI tools for work you already do.") {
        section.remove();
        document.documentElement.setAttribute("data-claude-empty-community-removed", "1");
      }
    });
  }

  function apply() {
    ensureStyle();
    removeExactStrip();
  }

  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, { once: true });
  } else {
    apply();
  }

  [0, 50, 150, 350, 700, 1200, 2200, 4000].forEach((ms) => setTimeout(apply, ms));
  setTimeout(() => observer.disconnect(), 7000);
})();
