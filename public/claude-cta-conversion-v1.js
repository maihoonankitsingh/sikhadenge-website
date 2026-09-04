(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_CTA_CONVERSION_V1__) return;
  window.__CLAUDE_CTA_CONVERSION_V1__ = true;

  const REG = "/gen-ai-masterclass/register-one-step";
  const STYLE_ID = "sd-claude-cta-conversion-v1-style";
  const ROOT_ATTR = "data-claude-cta-conversion";
  const CTA_ATTR = "data-sd-cta-primary-v1";
  const STICKY_ATTR = "data-sd-cta-sticky-v1";
  const LABEL = "Reserve My Free Seat";

  const normalize = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const labelPattern = /^(?:Reserve My Free Seat|Get My Free Seat · 100% · Free|Reserve My Free Seat →|Register Now for Free|Yes, Reserve My Free Seat)$/i;

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      html body [${CTA_ATTR}="1"]:focus-visible {
        outline: 3px solid rgba(215,110,75,.34) !important;
        outline-offset: 3px !important;
      }

      html body [${STICKY_ATTR}="1"] {
        background: rgba(252,249,246,.965) !important;
        border-top: 1px solid rgba(191,82,52,.14) !important;
        box-shadow: 0 -14px 38px rgba(43,31,25,.095) !important;
        -webkit-backdrop-filter: blur(18px) saturate(1.08) !important;
        backdrop-filter: blur(18px) saturate(1.08) !important;
      }

      html body [${STICKY_ATTR}="1"] [data-sd-cta-sticky-eyebrow-v1="1"] {
        color: #9B6F61 !important;
        font-size: 10px !important;
        line-height: 1.1 !important;
        font-weight: 760 !important;
        letter-spacing: .12em !important;
        text-transform: uppercase !important;
      }

      html body [${STICKY_ATTR}="1"] [data-sd-cta-sticky-free-v1="1"] {
        color: #1D1917 !important;
        font-family: "__manrope_a43dd5", "__manrope_Fallback_a43dd5", Manrope, sans-serif !important;
        font-size: 29px !important;
        line-height: 1 !important;
        font-weight: 760 !important;
        letter-spacing: -.035em !important;
      }

      html body [${STICKY_ATTR}="1"] [data-sd-cta-sticky-time-v1="1"] {
        color: #746C67 !important;
        font-size: 12.5px !important;
        line-height: 1.25 !important;
        font-weight: 540 !important;
      }

      html body [${STICKY_ATTR}="1"] a[href="${REG}"] {
        min-width: 262px !important;
        min-height: 58px !important;
        padding: 0 18px 0 22px !important;
        border: 1px solid rgba(135,47,24,.16) !important;
        border-radius: 16px !important;
        background: linear-gradient(135deg,#BF5234 0%,#D76E4B 100%) !important;
        color: #FFFFFF !important;
        font-family: "__manrope_a43dd5", "__manrope_Fallback_a43dd5", Manrope, sans-serif !important;
        font-size: 15px !important;
        line-height: 1.1 !important;
        font-weight: 760 !important;
        letter-spacing: -.014em !important;
        box-shadow: 0 15px 34px rgba(191,82,52,.25), inset 0 1px 0 rgba(255,255,255,.22) !important;
        transform: translateY(0) !important;
        transition: transform .18s ease, box-shadow .18s ease, filter .18s ease !important;
        -webkit-tap-highlight-color: transparent !important;
      }

      html body [${STICKY_ATTR}="1"] a[href="${REG}"]:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 18px 38px rgba(191,82,52,.30), inset 0 1px 0 rgba(255,255,255,.24) !important;
        filter: saturate(1.04) !important;
      }

      html body [${STICKY_ATTR}="1"] a[href="${REG}"]:active {
        transform: translateY(0) !important;
        box-shadow: 0 10px 24px rgba(191,82,52,.22), inset 0 1px 0 rgba(255,255,255,.18) !important;
      }

      html body [${STICKY_ATTR}="1"] a[href="${REG}"] .sd-cta-arrow-v1 {
        display: inline-grid !important;
        place-items: center !important;
        flex: 0 0 34px !important;
        width: 34px !important;
        height: 34px !important;
        margin-left: 12px !important;
        border-radius: 999px !important;
        background: rgba(255,255,255,.16) !important;
        color: #FFFFFF !important;
        font-size: 19px !important;
        font-weight: 600 !important;
        line-height: 1 !important;
      }

      @media (max-width: 1024px) {
        html body [${STICKY_ATTR}="1"] a[href="${REG}"] {
          min-width: 232px !important;
          min-height: 56px !important;
          font-size: 14px !important;
        }
        html body [${STICKY_ATTR}="1"] [data-sd-cta-sticky-free-v1="1"] {
          font-size: 26px !important;
        }
      }

      @media (max-width: 640px) {
        html body [${STICKY_ATTR}="1"] {
          border-top-color: rgba(191,82,52,.16) !important;
          box-shadow: 0 -10px 30px rgba(43,31,25,.10) !important;
        }
        html body [${STICKY_ATTR}="1"] [data-sd-cta-sticky-eyebrow-v1="1"],
        html body [${STICKY_ATTR}="1"] [data-sd-cta-sticky-trust-v1="1"] {
          display: none !important;
        }
        html body [${STICKY_ATTR}="1"] [data-sd-cta-sticky-free-v1="1"] {
          font-size: 22px !important;
          letter-spacing: -.025em !important;
        }
        html body [${STICKY_ATTR}="1"] [data-sd-cta-sticky-time-v1="1"] {
          font-size: 11.5px !important;
          line-height: 1.2 !important;
        }
        html body [${STICKY_ATTR}="1"] a[href="${REG}"] {
          min-width: 202px !important;
          min-height: 56px !important;
          padding: 0 11px 0 16px !important;
          border-radius: 15px !important;
          font-size: 13.5px !important;
          font-weight: 760 !important;
          letter-spacing: -.012em !important;
          box-shadow: 0 12px 28px rgba(191,82,52,.25), inset 0 1px 0 rgba(255,255,255,.2) !important;
        }
        html body [${STICKY_ATTR}="1"] a[href="${REG}"] .sd-cta-arrow-v1 {
          flex-basis: 30px !important;
          width: 30px !important;
          height: 30px !important;
          margin-left: 8px !important;
          font-size: 17px !important;
        }
      }

      @media (max-width: 370px) {
        html body [${STICKY_ATTR}="1"] a[href="${REG}"] {
          min-width: 190px !important;
          font-size: 13px !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        html body [${STICKY_ATTR}="1"] a[href="${REG}"] {
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function deepestExact(root, text) {
    const matches = [...root.querySelectorAll("span,p,strong,small,div")]
      .filter((node) => normalize(node.textContent) === text);
    return matches.find((node) => ![...node.children].some((child) => normalize(child.textContent) === text)) || matches.at(-1) || null;
  }

  function normalizeAnchorLabel(anchor) {
    const walker = document.createTreeWalker(anchor, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    const exact = nodes.find((node) => labelPattern.test(normalize(node.nodeValue)));
    if (exact) {
      exact.nodeValue = LABEL;
      return true;
    }

    const text = normalize(anchor.textContent);
    if (!labelPattern.test(text)) return false;
    const iconLike = [...anchor.children].filter((child) => {
      const t = normalize(child.textContent);
      return !t || t === "→" || child.querySelector("svg");
    });
    anchor.replaceChildren(document.createTextNode(LABEL), ...iconLike);
    return true;
  }

  function ensureStickyArrow(anchor) {
    if (anchor.querySelector(".sd-cta-arrow-v1")) return;
    const existing = [...anchor.children].find((child) => normalize(child.textContent) === "→" || child.querySelector("svg"));
    if (existing) {
      existing.classList.add("sd-cta-arrow-v1");
      return;
    }
    const arrow = document.createElement("span");
    arrow.className = "sd-cta-arrow-v1";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    anchor.appendChild(arrow);
  }

  function markStickyCopy(sticky) {
    const eyebrow = deepestExact(sticky, "FREE LIVE AI TOOLS MASTERCLASS");
    const free = deepestExact(sticky, "FREE");
    const time = [...sticky.querySelectorAll("span,p,strong,small,div")]
      .filter((node) => /8:00 PM IST/i.test(normalize(node.textContent)))
      .find((node) => ![...node.children].some((child) => /8:00 PM IST/i.test(normalize(child.textContent)))) || null;
    if (eyebrow) eyebrow.setAttribute("data-sd-cta-sticky-eyebrow-v1", "1");
    if (free) free.setAttribute("data-sd-cta-sticky-free-v1", "1");
    if (time) time.setAttribute("data-sd-cta-sticky-time-v1", "1");
    ["Easy Hinglish", "No coding required"].forEach((text) => {
      const node = deepestExact(sticky, text);
      if (node) node.setAttribute("data-sd-cta-sticky-trust-v1", "1");
    });
  }

  function apply() {
    ensureStyle();
    const anchors = [...document.querySelectorAll(`a[href="${REG}"]`)];
    anchors.forEach((anchor) => {
      anchor.setAttribute(CTA_ATTR, "1");
      normalizeAnchorLabel(anchor);
    });

    let sticky = document.querySelector('[class*="heroOfferBar"]');
    if (!sticky) {
      sticky = anchors.map((anchor) => {
        let node = anchor.parentElement;
        while (node && node !== document.body) {
          const position = getComputedStyle(node).position;
          if (position === "fixed" || position === "sticky") return node;
          node = node.parentElement;
        }
        return null;
      }).find(Boolean) || null;
    }

    if (sticky) {
      sticky.setAttribute(STICKY_ATTR, "1");
      markStickyCopy(sticky);
      const anchor = sticky.querySelector(`a[href="${REG}"]`);
      if (anchor) {
        anchor.setAttribute(CTA_ATTR, "1");
        normalizeAnchorLabel(anchor);
        ensureStickyArrow(anchor);
      }
    }

    document.documentElement.setAttribute(ROOT_ATTR, "v1");
    document.documentElement.setAttribute("data-claude-cta-count-v1", String(anchors.length));
    document.documentElement.setAttribute("data-claude-cta-sticky-found-v1", sticky ? "1" : "0");
  }

  let raf = 0;
  const observer = new MutationObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(apply);
  });

  const boot = () => {
    apply();
    observer.observe(document.documentElement, { childList: true, subtree: true });
    [300, 800, 1600, 3200, 6000, 10000, 16000].forEach((ms) => setTimeout(apply, ms));
    setTimeout(() => observer.disconnect(), 20000);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
