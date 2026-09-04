(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_VALUE_ANCHOR_V1__) return;
  window.__CLAUDE_VALUE_ANCHOR_V1__ = true;

  const STYLE_ID = "sd-claude-value-anchor-v1-style";
  const ROOT_ATTR = "data-claude-value-anchor";
  const STICKY_ATTR = "data-sd-cta-sticky-v1";

  const norm = (value) => String(value || "").replace(/\s+/g, " ").trim();

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      html body [${STICKY_ATTR}="1"] [data-sd-value-price-v1="1"] {
        display: inline-flex !important;
        align-items: baseline !important;
        gap: 9px !important;
        white-space: nowrap !important;
        font-family: "__manrope_a43dd5", "__manrope_Fallback_a43dd5", Manrope, sans-serif !important;
      }

      html body [${STICKY_ATTR}="1"] [data-sd-value-price-v1="1"] .sd-value-old-v1 {
        color: #9B6F61 !important;
        font-size: 15px !important;
        line-height: 1 !important;
        font-weight: 650 !important;
        letter-spacing: -.02em !important;
        text-decoration-line: line-through !important;
        text-decoration-thickness: 1.5px !important;
        text-decoration-color: #BF5234 !important;
        opacity: .86 !important;
      }

      html body [${STICKY_ATTR}="1"] [data-sd-value-price-v1="1"] .sd-value-free-v1 {
        color: #1D1917 !important;
        font-size: 29px !important;
        line-height: 1 !important;
        font-weight: 780 !important;
        letter-spacing: -.035em !important;
      }

      html body [${STICKY_ATTR}="1"] [data-sd-value-eyebrow-v1="1"] {
        color: #9B6F61 !important;
        font-size: 10px !important;
        line-height: 1.1 !important;
        font-weight: 760 !important;
        letter-spacing: .12em !important;
        text-transform: uppercase !important;
      }

      @media (max-width: 1024px) {
        html body [${STICKY_ATTR}="1"] [data-sd-value-price-v1="1"] {
          gap: 8px !important;
        }
        html body [${STICKY_ATTR}="1"] [data-sd-value-price-v1="1"] .sd-value-old-v1 {
          font-size: 14px !important;
        }
        html body [${STICKY_ATTR}="1"] [data-sd-value-price-v1="1"] .sd-value-free-v1 {
          font-size: 26px !important;
        }
      }

      @media (max-width: 640px) {
        html body [${STICKY_ATTR}="1"] [data-sd-value-eyebrow-v1="1"] {
          display: none !important;
        }
        html body [${STICKY_ATTR}="1"] [data-sd-value-price-v1="1"] {
          gap: 6px !important;
        }
        html body [${STICKY_ATTR}="1"] [data-sd-value-price-v1="1"] .sd-value-old-v1 {
          font-size: 12px !important;
        }
        html body [${STICKY_ATTR}="1"] [data-sd-value-price-v1="1"] .sd-value-free-v1 {
          font-size: 22px !important;
          letter-spacing: -.025em !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function deepestExact(root, text) {
    const matches = [...root.querySelectorAll("span,p,strong,small,div")]
      .filter((node) => norm(node.textContent) === text);
    return matches.find((node) => ![...node.children].some((child) => norm(child.textContent) === text)) || matches.at(-1) || null;
  }

  function findSticky() {
    return document.querySelector(`[${STICKY_ATTR}="1"]`) || document.querySelector('[class*="heroOfferBar"]');
  }

  function apply() {
    ensureStyle();
    const sticky = findSticky();
    if (!sticky) return false;

    sticky.setAttribute(STICKY_ATTR, "1");

    let eyebrow = sticky.querySelector('[data-sd-value-eyebrow-v1="1"]');
    if (!eyebrow) {
      eyebrow = deepestExact(sticky, "FREE LIVE AI TOOLS MASTERCLASS") || deepestExact(sticky, "MASTERCLASS VALUE");
      if (eyebrow) {
        eyebrow.textContent = "MASTERCLASS VALUE";
        eyebrow.setAttribute("data-sd-value-eyebrow-v1", "1");
      }
    }

    let price = sticky.querySelector('[data-sd-value-price-v1="1"]');
    if (!price) {
      const free = deepestExact(sticky, "FREE");
      if (free) {
        free.setAttribute("data-sd-value-price-v1", "1");
        free.setAttribute("aria-label", "Masterclass value 999 rupees, currently free");
        free.innerHTML = '<span class="sd-value-old-v1">₹999</span><span class="sd-value-free-v1">FREE</span>';
        price = free;
      }
    }

    if (!price) return false;
    document.documentElement.setAttribute(ROOT_ATTR, "v1");
    document.documentElement.setAttribute("data-claude-value-old", "999");
    document.documentElement.setAttribute("data-claude-value-now", "FREE");
    return true;
  }

  let raf = 0;
  const observer = new MutationObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(apply);
  });

  function boot() {
    apply();
    observer.observe(document.documentElement, { childList: true, subtree: true });
    [250, 650, 1200, 2200, 4000, 7000, 11000, 16000].forEach((ms) => setTimeout(apply, ms));
    setTimeout(() => observer.disconnect(), 20000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
