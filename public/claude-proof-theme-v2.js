(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_PROOF_THEME_V2__) return;
  window.__CLAUDE_PROOF_THEME_V2__ = true;

  const JOBS_ID = "ai-video-job-impact-v80";
  const SKILLS_ID = "ai-video-ai-opportunity-v85";
  const THEME_ATTR = "data-claude-proof-theme";
  const THEME_VALUE = "v2";

  const ORANGE = "#f36a31";
  const ORANGE_DARK = "#d76343";
  const PEACH = "#fff1ea";
  const SURFACE = "#fffaf7";
  const INK = "#171717";
  const MUTED = "#76706d";
  const LINE = "#f4a17d";

  const setImportant = (el, prop, value) => {
    if (!(el instanceof Element)) return;
    el.style.setProperty(prop, value, "important");
  };

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
    if (!d) return { h: 0, s: 0, l: max };
    let h;
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
    const l = (max + min) / 2;
    const s = d / (1 - Math.abs(2 * l - 1));
    return { h, s: Number.isFinite(s) ? s : 0, l };
  }

  function isPurpleAccent(r, g, b) {
    const { h, s } = rgbToHue(r, g, b);
    return s >= 0.12 && h >= 245 && h <= 335;
  }

  function orangeReplacement(r, g, b, alpha) {
    const avg = (r + g + b) / 3;
    let out;
    if (avg >= 238) out = [255, 241, 234];
    else if (avg >= 205) out = [250, 196, 170];
    else if (avg >= 165) out = [247, 139, 93];
    else if (avg >= 110) out = [243, 106, 49];
    else out = [215, 99, 67];
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

  function rethemePurpleAccents(root) {
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
        if (mapped !== current) setImportant(el, prop, mapped);
      });
    });
  }

  function styleHeading(root, phrase) {
    if (!(root instanceof Element)) return;

    const heading = [...root.querySelectorAll("h1,h2,h3")].find((el) =>
      norm(el.textContent).includes(norm(phrase))
    );
    if (!heading) return;

    heading.setAttribute("data-sd-claude-title", "1");
    setImportant(heading, "font-family", "Manrope, Inter, Arial, sans-serif");
    setImportant(heading, "font-size", "clamp(26px, 3.2vw, 40px)");
    setImportant(heading, "font-weight", "800");
    setImportant(heading, "line-height", "1.06");
    setImportant(heading, "letter-spacing", "-0.04em");
    setImportant(heading, "color", INK);
    setImportant(heading, "text-align", "center");
    setImportant(heading, "text-wrap", "balance");
    setImportant(heading, "max-width", "820px");
    setImportant(heading, "margin-left", "auto");
    setImportant(heading, "margin-right", "auto");

    if (!heading.querySelector('[data-sd-claude-highlight="1"]')) {
      const full = String(heading.textContent || "").trim();
      const lower = full.toLowerCase();
      const needle = phrase.toLowerCase();
      const index = lower.indexOf(needle);

      if (index >= 0) {
        const before = full.slice(0, index);
        const exact = full.slice(index, index + phrase.length);
        const after = full.slice(index + phrase.length);
        heading.textContent = "";
        if (before) heading.appendChild(document.createTextNode(before));

        const mark = document.createElement("span");
        mark.setAttribute("data-sd-claude-highlight", "1");
        mark.textContent = exact;
        setImportant(mark, "display", "inline");
        setImportant(mark, "background", ORANGE);
        setImportant(mark, "color", "#ffffff");
        setImportant(mark, "border-radius", "6px");
        setImportant(mark, "padding", "0.01em 0.18em 0.06em");
        setImportant(mark, "box-decoration-break", "clone");
        setImportant(mark, "-webkit-box-decoration-break", "clone");
        setImportant(mark, "font-weight", "800");
        heading.appendChild(mark);

        if (after) heading.appendChild(document.createTextNode(after));
      }
    }

    const headerScope = heading.parentElement || root;
    const subtitle = [...headerScope.querySelectorAll("p")].find((el) => {
      const text = norm(el.textContent);
      return text.length >= 45 && text.length <= 360;
    });

    if (subtitle) {
      subtitle.setAttribute("data-sd-claude-subtitle", "1");
      setImportant(subtitle, "font-family", "Manrope, Inter, Arial, sans-serif");
      setImportant(subtitle, "font-size", "clamp(12px, 1.15vw, 14px)");
      setImportant(subtitle, "font-weight", "450");
      setImportant(subtitle, "line-height", "1.55");
      setImportant(subtitle, "letter-spacing", "-0.01em");
      setImportant(subtitle, "color", MUTED);
      setImportant(subtitle, "text-align", "center");
      setImportant(subtitle, "max-width", "720px");
      setImportant(subtitle, "margin-left", "auto");
      setImportant(subtitle, "margin-right", "auto");
    }
  }

  function styleTypography(root) {
    if (!(root instanceof Element)) return;
    setImportant(root, "font-family", "Manrope, Inter, Arial, sans-serif");
    setImportant(root, "background-color", SURFACE);

    root.querySelectorAll("h4,h5,h6,p,li,a,button,[role='button']").forEach((el) => {
      setImportant(el, "font-family", "Manrope, Inter, Arial, sans-serif");
    });

    root.querySelectorAll("p,li").forEach((el) => {
      const cs = getComputedStyle(el);
      const size = Number.parseFloat(cs.fontSize || "0");
      if (size > 0 && size < 10.5) {
        setImportant(el, "font-size", "10.5px");
      }
      if (Number.parseFloat(cs.lineHeight || "0") < size * 1.25) {
        setImportant(el, "line-height", "1.35");
      }
    });
  }

  function styleCta() {
    const wrap = document.querySelector('[data-claude-ai-video-proof-cta="1"]');
    if (!(wrap instanceof Element)) return;

    setImportant(wrap, "background", SURFACE);
    setImportant(wrap, "padding-top", "4px");
    setImportant(wrap, "padding-bottom", "30px");

    const candidates = [
      ...wrap.querySelectorAll('a,button,[role="button"]'),
    ];
    const cta = candidates.find((el) => {
      const text = norm(el.textContent);
      return (
        text.includes("get my free seat") ||
        text.includes("reserve my seat") ||
        text.includes("reserve my free seat")
      );
    }) || candidates[0];

    if (!(cta instanceof Element)) return;
    cta.setAttribute("data-sd-claude-cta", "1");
    setImportant(cta, "display", "inline-flex");
    setImportant(cta, "align-items", "center");
    setImportant(cta, "justify-content", "center");
    setImportant(cta, "gap", "8px");
    setImportant(cta, "min-height", "46px");
    setImportant(cta, "padding", "12px 22px");
    setImportant(cta, "border", "1px solid rgba(215, 99, 67, 0.18)");
    setImportant(cta, "border-radius", "10px");
    setImportant(
      cta,
      "background",
      `linear-gradient(135deg, #f47a4b 0%, ${ORANGE} 58%, #e85d2f 100%)`
    );
    setImportant(cta, "color", "#ffffff");
    setImportant(cta, "font-family", "Manrope, Inter, Arial, sans-serif");
    setImportant(cta, "font-size", "13px");
    setImportant(cta, "font-weight", "800");
    setImportant(cta, "line-height", "1");
    setImportant(cta, "letter-spacing", "-0.02em");
    setImportant(cta, "text-decoration", "none");
    setImportant(cta, "box-shadow", "0 10px 24px rgba(243, 106, 49, 0.22)");
    setImportant(cta, "transform", "none");
  }

  function addResponsiveThemeCss() {
    if (document.getElementById("sd-claude-proof-theme-v2-css")) return;
    const style = document.createElement("style");
    style.id = "sd-claude-proof-theme-v2-css";
    style.textContent = `
      #${JOBS_ID}, #${SKILLS_ID} {
        --sd-claude-orange: ${ORANGE};
        --sd-claude-orange-dark: ${ORANGE_DARK};
        --sd-claude-peach: ${PEACH};
        --sd-claude-surface: ${SURFACE};
        --sd-claude-ink: ${INK};
        --sd-claude-line: ${LINE};
      }

      #${JOBS_ID} [data-sd-claude-title="1"],
      #${SKILLS_ID} [data-sd-claude-title="1"] {
        text-rendering: geometricPrecision !important;
        -webkit-font-smoothing: antialiased !important;
      }

      [data-sd-claude-cta="1"] {
        transition: transform .18s ease, box-shadow .18s ease, filter .18s ease !important;
      }

      [data-sd-claude-cta="1"]:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 13px 28px rgba(243, 106, 49, .28) !important;
        filter: saturate(1.03) !important;
      }

      @media (max-width: 640px) {
        #${JOBS_ID} [data-sd-claude-title="1"],
        #${SKILLS_ID} [data-sd-claude-title="1"] {
          font-size: clamp(24px, 7.2vw, 30px) !important;
          line-height: 1.08 !important;
          letter-spacing: -.035em !important;
          padding-left: 14px !important;
          padding-right: 14px !important;
        }

        #${JOBS_ID} [data-sd-claude-subtitle="1"],
        #${SKILLS_ID} [data-sd-claude-subtitle="1"] {
          font-size: 12px !important;
          line-height: 1.5 !important;
          padding-left: 18px !important;
          padding-right: 18px !important;
        }

        [data-sd-claude-cta="1"] {
          width: min(100%, 310px) !important;
          min-height: 48px !important;
          padding: 13px 20px !important;
          font-size: 13px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function applyTheme() {
    const jobs = document.getElementById(JOBS_ID);
    const skills = document.getElementById(SKILLS_ID);
    if (!(jobs instanceof Element) || !(skills instanceof Element)) return false;

    addResponsiveThemeCss();

    [jobs, skills].forEach((root) => {
      rethemePurpleAccents(root);
      styleTypography(root);
    });

    styleHeading(jobs, "hundreds of millions of jobs.");
    styleHeading(skills, "It's increasing the value of AI skills.");
    styleCta();

    document.documentElement.setAttribute(THEME_ATTR, THEME_VALUE);
    return true;
  }

  let raf = 0;
  const observer = new MutationObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(applyTheme);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTheme, { once: true });
  } else {
    applyTheme();
  }

  [50, 150, 350, 700, 1200, 2200, 4000, 7000, 11000, 16000].forEach((ms) => {
    setTimeout(applyTheme, ms);
  });

  setTimeout(() => observer.disconnect(), 22000);
})();
