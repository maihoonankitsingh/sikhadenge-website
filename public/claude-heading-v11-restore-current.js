(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_HEADING_V11_RESTORE_CURRENT__) return;
  window.__CLAUDE_HEADING_V11_RESTORE_CURRENT__ = true;

  const STYLE_ID = "sikhadenge-heading-v11-restore-current-style";
  const ROOT_MARKER = "data-claude-heading-v11-restored";

  const definitions = [
    ["Why join this course?", ["this course?", "this course"]],
    ["Use AI tools for work you already do.", ["AI tools"]],
    ["Learn AI Tools by Doing — Live, Practical & Step-by-Step.", ["AI Tools"]],
    ["From first prompt to professional AI workflow.", ["AI workflow.", "AI workflow"]],
    ["Your first step into practical AI mastery.", ["AI mastery.", "AI mastery"]],
    ["AI & automation are reshaping hundreds of millions of jobs.", ["hundreds of millions of jobs.", "hundreds of millions of jobs"]],
    ["AI isn't only changing jobs. It's increasing the value of AI skills.", ["It's increasing the value of AI skills.", "increasing the value of AI skills."]],
    ["A complete practical starting kit for modern AI work.", ["modern AI work.", "modern AI work"]],
    ["Connect the right AI tool to the work you already do.", ["right AI tool"]],
    ["Move from quick answers to structured, reviewable work.", ["reviewable work.", "reviewable work"]],
    ["Use the right AI tool where speed, quality and structured output matter.", ["structured output"]],
    ["Practical teaching. Clear workflows. Real digital work.", ["Clear workflows.", "Clear workflows"]],
    ["Is this workshop for you?", ["workshop for you?", "workshop for you"]],
    ["Learn 25+ AI Tools", ["25+ AI Tools"]],
    ["Learn AI. Apply it. Work smarter.", ["Work smarter.", "Work smarter"]],
    ["Frequently asked questions.", ["asked questions.", "asked questions"]],
    ["Your first AI workflow starts with one live session.", ["live session.", "live session"]],
    ["Trusted checkout experience", ["checkout experience"]],
  ];

  const normalize = (value) => String(value || "").replace(/\s+/g, " ").trim();

  function ensureStyle() {
    let style = document.getElementById(STYLE_ID);
    if (style) return style;
    style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      html body h2.sd-heading-v11 {
        max-width: 820px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        text-align: center !important;
        font-family: "__manrope_a43dd5", "__manrope_Fallback_a43dd5", Manrope, sans-serif !important;
        font-size: clamp(30px, 2.25vw, 38px) !important;
        line-height: 1.18 !important;
        font-weight: 640 !important;
        letter-spacing: -0.026em !important;
        text-wrap: balance !important;
        overflow-wrap: normal !important;
        word-break: normal !important;
        hyphens: none !important;
      }

      html body h2.sd-heading-v11 .sd-heading-v11-highlight {
        display: inline-block !important;
        white-space: nowrap !important;
        vertical-align: baseline !important;
        font-family: "__manrope_a43dd5", "__manrope_Fallback_a43dd5", Manrope, sans-serif !important;
        font-size: 1em !important;
        font-weight: 675 !important;
        line-height: 1.08 !important;
        padding: 0.02em 0.18em 0.05em !important;
        border-radius: 8px !important;
        background: linear-gradient(135deg, #BF5234 0%, #D76E4B 100%) !important;
        color: #FFFFFF !important;
        box-shadow: none !important;
        text-decoration: none !important;
        -webkit-text-fill-color: #FFFFFF !important;
      }

      @media (max-width: 1024px) {
        html body h2.sd-heading-v11 {
          max-width: 760px !important;
          font-size: clamp(28px, 3.7vw, 34px) !important;
          line-height: 1.19 !important;
        }
        html body h2.sd-heading-v11 .sd-heading-v11-highlight {
          line-height: 1.08 !important;
          padding: 0.02em 0.17em 0.05em !important;
          border-radius: 8px !important;
        }
      }

      @media (max-width: 640px) {
        html body h2.sd-heading-v11 {
          max-width: 94% !important;
          font-size: clamp(24px, 6.2vw, 28px) !important;
          line-height: 1.20 !important;
          font-weight: 640 !important;
          letter-spacing: -0.021em !important;
        }
        html body h2.sd-heading-v11 .sd-heading-v11-highlight {
          font-weight: 675 !important;
          line-height: 1.08 !important;
          padding: 0.015em 0.15em 0.045em !important;
          border-radius: 7px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return style;
  }

  function findHeading(text) {
    return [...document.querySelectorAll("h2")].find((node) => normalize(node.textContent) === text) || null;
  }

  function pickPhrase(text, candidates) {
    return candidates.find((phrase) => text.includes(phrase)) || null;
  }

  function clearConflictingInlineTypography(node) {
    [
      "font-family",
      "font-size",
      "font-weight",
      "line-height",
      "letter-spacing",
      "color",
      "text-align",
      "text-wrap",
      "overflow-wrap",
      "word-break",
      "hyphens",
      "max-width",
      "margin-left",
      "margin-right",
    ].forEach((prop) => node.style.removeProperty(prop));

    if (node.closest("#claude-ai-video-proof-v4") || node.classList.contains("sd-proof-v4-title")) {
      node.removeAttribute("data-sd-claude-title");
    }
  }

  function buildHeading(node, text, phrase) {
    const index = text.indexOf(phrase);
    if (index < 0) return false;

    const already = node.classList.contains("sd-heading-v11") &&
      node.querySelectorAll(":scope > .sd-heading-v11-highlight").length === 1 &&
      normalize(node.textContent) === text &&
      normalize(node.querySelector(":scope > .sd-heading-v11-highlight")?.textContent) === phrase;

    clearConflictingInlineTypography(node);
    node.classList.remove("sd-final-heading-v8", "sd-heading-v9", "sd-heading-v10");
    node.classList.add("sd-heading-v11");

    if (already) return true;

    const before = text.slice(0, index);
    const after = text.slice(index + phrase.length);
    const fragment = document.createDocumentFragment();
    if (before) fragment.appendChild(document.createTextNode(before));
    const highlight = document.createElement("span");
    highlight.className = "sd-heading-v11-highlight";
    highlight.textContent = phrase;
    fragment.appendChild(highlight);
    if (after) fragment.appendChild(document.createTextNode(after));
    node.replaceChildren(fragment);
    return true;
  }

  function apply() {
    ensureStyle();
    let applied = 0;
    definitions.forEach(([text, candidates]) => {
      const node = findHeading(text);
      if (!node) return;
      const phrase = pickPhrase(text, candidates);
      if (!phrase) return;
      if (buildHeading(node, text, phrase)) applied += 1;
    });
    document.documentElement.setAttribute(ROOT_MARKER, String(applied));
    return applied;
  }

  let raf = 0;
  const observer = new MutationObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(apply);
  });

  const boot = () => {
    apply();
    observer.observe(document.documentElement, { childList: true, subtree: true });
    [250, 700, 1400, 2600, 5000, 9000, 15000, 22000].forEach((ms) => setTimeout(apply, ms));
    setTimeout(() => observer.disconnect(), 26000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
