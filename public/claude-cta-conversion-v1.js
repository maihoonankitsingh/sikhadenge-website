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
  const MAIN_LABEL = "Get My Free Seat • ₹999 →";
  const FREE_LABEL = "Free";

  const normalize = (value) => String(value || "").replace(/\s+/g, " ").trim();

  function ensureStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }

    style.textContent = `
      html body [${CTA_ATTR}="1"] {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 12px !important;
        white-space: nowrap !important;
      }

      html body [${CTA_ATTR}="1"] .sd-cta-main-copy-v2 {
        display: inline-flex !important;
        align-items: center !important;
        min-width: 0 !important;
        color: inherit !important;
        font: inherit !important;
        line-height: inherit !important;
        letter-spacing: inherit !important;
        white-space: nowrap !important;
      }

      html body [${CTA_ATTR}="1"] .sd-cta-free-pill-v2 {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex: 0 0 auto !important;
        min-height: 38px !important;
        padding: 0 18px !important;
        border-radius: 999px !important;
        background: #FFFFFF !important;
        color: #D94F32 !important;
        font-family: "__manrope_a43dd5", "__manrope_Fallback_a43dd5", Manrope, sans-serif !important;
        font-size: 13px !important;
        line-height: 1 !important;
        font-weight: 760 !important;
        letter-spacing: -.01em !important;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.35), 0 3px 10px rgba(29,25,23,.08) !important;
      }

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
        min-width: 318px !important;
        min-height: 58px !important;
        padding: 8px 10px 8px 20px !important;
        border: 1px solid rgba(135,47,24,.16) !important;
        border-radius: 16px !important;
        background: linear-gradient(135deg,#BF5234 0%,#D76E4B 100%) !important;
        color: #FFFFFF !important;
        font-family: "__manrope_a43dd5", "__manrope_Fallback_a43dd5", Manrope, sans-serif !important;
        font-size: 14px !important;
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

      @media (max-width: 1024px) {
        html body [${STICKY_ATTR}="1"] a[href="${REG}"] {
          min-width: 296px !important;
          min-height: 56px !important;
          font-size: 13.5px !important;
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
        html body [${CTA_ATTR}="1"] {
          gap: 8px !important;
        }
        html body [${CTA_ATTR}="1"] .sd-cta-main-copy-v2 {
          font-size: 12.5px !important;
        }
        html body [${CTA_ATTR}="1"] .sd-cta-free-pill-v2 {
          min-height: 34px !important;
          padding: 0 14px !important;
          font-size: 12px !important;
        }
        html body [${STICKY_ATTR}="1"] a[href="${REG}"] {
          min-width: 258px !important;
          min-height: 54px !important;
          padding: 7px 8px 7px 14px !important;
          border-radius: 15px !important;
          font-size: 12.5px !important;
          font-weight: 760 !important;
          letter-spacing: -.012em !important;
          box-shadow: 0 12px 28px rgba(191,82,52,.25), inset 0 1px 0 rgba(255,255,255,.2) !important;
        }
      }

      @media (max-width: 370px) {
        html body [${CTA_ATTR}="1"] .sd-cta-main-copy-v2 {
          font-size: 11.5px !important;
        }
        html body [${CTA_ATTR}="1"] .sd-cta-free-pill-v2 {
          min-height: 32px !important;
          padding: 0 11px !important;
          font-size: 11.5px !important;
        }
        html body [${STICKY_ATTR}="1"] a[href="${REG}"] {
          min-width: 244px !important;
          padding-left: 11px !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        html body [${STICKY_ATTR}="1"] a[href="${REG}"] {
          transition: none !important;
        }
      }
    `;
  }

  function deepestExact(root, text) {
    const matches = [...root.querySelectorAll("span,p,strong,small,div")]
      .filter((node) => normalize(node.textContent) === text);
    return matches.find((node) => ![...node.children].some((child) => normalize(child.textContent) === text)) || matches.at(-1) || null;
  }

  function ensureAnchorContent(anchor) {
    const main = anchor.querySelector(':scope > .sd-cta-main-copy-v2');
    const pill = anchor.querySelector(':scope > .sd-cta-free-pill-v2');
    if (main && pill && normalize(main.textContent) === MAIN_LABEL && normalize(pill.textContent) === FREE_LABEL && anchor.children.length === 2) return;

    const mainCopy = document.createElement("span");
    mainCopy.className = "sd-cta-main-copy-v2";
    mainCopy.textContent = MAIN_LABEL;

    const freePill = document.createElement("span");
    freePill.className = "sd-cta-free-pill-v2";
    freePill.textContent = FREE_LABEL;
    freePill.setAttribute("aria-hidden", "true");

    anchor.replaceChildren(mainCopy, freePill);
    anchor.setAttribute("aria-label", "Get My Free Seat — ₹999 value, Free now");
  }

  function markStickyCopy(sticky) {
    const eyebrow = deepestExact(sticky, "FREE LIVE AI TOOLS MASTERCLASS") || deepestExact(sticky, "MASTERCLASS VALUE");
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
      ensureAnchorContent(anchor);
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
        ensureAnchorContent(anchor);
      }
    }

    document.documentElement.setAttribute(ROOT_ATTR, "v2-copy-999-free");
    document.documentElement.setAttribute("data-claude-cta-count-v1", String(anchors.length));
    document.documentElement.setAttribute("data-claude-cta-sticky-found-v1", sticky ? "1" : "0");
    document.documentElement.setAttribute("data-claude-cta-main-copy-v2", MAIN_LABEL);
    document.documentElement.setAttribute("data-claude-cta-free-copy-v2", FREE_LABEL);
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
