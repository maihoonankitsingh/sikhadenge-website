(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_PROOF_REAL_LOGOS_V1__) return;
  window.__CLAUDE_PROOF_REAL_LOGOS_V1__ = true;

  const ROOT_ID = "claude-ai-video-proof-v4";
  const JOBS_ID = "ai-video-job-impact-v80";
  const STYLE_ID = "sd-claude-proof-real-logos-v1-css";

  const LOGOS = {
    "goldman sachs": {
      alt: "Goldman Sachs",
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Goldman_Sachs_logo.svg",
      cls: "goldman",
    },
    "mckinsey & company": {
      alt: "McKinsey & Company",
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/McKinsey_and_Company_Logo_1.svg",
      cls: "mckinsey",
    },
    "world economic forum": {
      alt: "World Economic Forum",
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/World_Economic_Forum_logo.svg",
      cls: "wef",
    },
    "pwc": {
      alt: "PwC",
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/PwC_Company_Logo.svg",
      cls: "pwc",
    },
    "servicenow": {
      alt: "ServiceNow",
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/ServiceNow_logo.svg",
      cls: "servicenow",
    },
  };

  const normalize = (value) =>
    String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${ROOT_ID} .sd-proof-v4-brand[data-sd-real-brand-logo="1"] {
        min-height:54px !important;
        display:flex !important;
        align-items:center !important;
        justify-content:flex-start !important;
        overflow:visible !important;
        line-height:1 !important;
      }

      #${ROOT_ID} .sd-proof-v4-brand[data-sd-real-brand-logo="1"] img {
        display:block !important;
        width:auto !important;
        height:auto !important;
        max-width:100% !important;
        object-fit:contain !important;
        object-position:left center !important;
      }

      #${ROOT_ID} .sd-proof-v4-brand[data-sd-real-brand-logo="1"] img.sd-real-logo-goldman {
        width:138px !important;
        max-height:44px !important;
      }
      #${ROOT_ID} .sd-proof-v4-brand[data-sd-real-brand-logo="1"] img.sd-real-logo-mckinsey {
        width:190px !important;
        max-height:34px !important;
      }
      #${ROOT_ID} .sd-proof-v4-brand[data-sd-real-brand-logo="1"] img.sd-real-logo-wef {
        width:94px !important;
        max-height:58px !important;
      }
      #${ROOT_ID} .sd-proof-v4-brand[data-sd-real-brand-logo="1"] img.sd-real-logo-pwc {
        width:86px !important;
        max-height:56px !important;
      }
      #${ROOT_ID} .sd-proof-v4-brand[data-sd-real-brand-logo="1"] img.sd-real-logo-servicenow {
        width:156px !important;
        max-height:34px !important;
      }

      #${JOBS_ID} .sd-proof-v4-opportunity {
        margin-top:28px !important;
      }

      @media (max-width:640px) {
        #${ROOT_ID} .sd-proof-v4-brand[data-sd-real-brand-logo="1"] {
          min-height:48px !important;
        }
        #${ROOT_ID} .sd-proof-v4-brand[data-sd-real-brand-logo="1"] img.sd-real-logo-goldman { width:126px !important; }
        #${ROOT_ID} .sd-proof-v4-brand[data-sd-real-brand-logo="1"] img.sd-real-logo-mckinsey { width:168px !important; }
        #${ROOT_ID} .sd-proof-v4-brand[data-sd-real-brand-logo="1"] img.sd-real-logo-wef { width:84px !important; }
        #${ROOT_ID} .sd-proof-v4-brand[data-sd-real-brand-logo="1"] img.sd-real-logo-pwc { width:78px !important; }
        #${ROOT_ID} .sd-proof-v4-brand[data-sd-real-brand-logo="1"] img.sd-real-logo-servicenow { width:142px !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function removeInfoNote() {
    const jobs = document.getElementById(JOBS_ID);
    if (!(jobs instanceof Element)) return false;
    jobs.querySelectorAll(".sd-proof-v4-note").forEach((node) => node.remove());
    return true;
  }

  function replaceBrandTextWithLogo() {
    const root = document.getElementById(ROOT_ID);
    if (!(root instanceof Element)) return 0;

    let count = 0;
    root.querySelectorAll(".sd-proof-v4-brand").forEach((brand) => {
      if (!(brand instanceof Element)) return;
      if (brand.getAttribute("data-sd-real-brand-logo") === "1") {
        count += 1;
        return;
      }

      const key = normalize(brand.textContent);
      const def = LOGOS[key];
      if (!def) return;

      const img = document.createElement("img");
      img.src = def.src;
      img.alt = def.alt;
      img.className = `sd-real-brand-logo sd-real-logo-${def.cls}`;
      img.setAttribute("data-sd-real-logo", def.cls);
      img.setAttribute("loading", "eager");
      img.setAttribute("decoding", "async");
      img.setAttribute("referrerpolicy", "no-referrer");

      brand.replaceChildren(img);
      brand.setAttribute("data-sd-real-brand-logo", "1");
      brand.setAttribute("aria-label", def.alt);
      brand.classList.remove("serif", "stacked", "compact");
      count += 1;
    });

    return count;
  }

  function apply() {
    ensureStyle();
    const removed = removeInfoNote();
    const logos = replaceBrandTextWithLogo();
    if (removed || logos) {
      document.documentElement.setAttribute("data-claude-proof-real-logos", String(logos));
      document.documentElement.setAttribute("data-claude-proof-note-removed", removed ? "1" : "0");
    }
  }

  let raf = 0;
  const observer = new MutationObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(apply);
  });

  const boot = () => {
    apply();
    observer.observe(document.documentElement, { childList: true, subtree: true });
    [80, 180, 400, 800, 1400, 2600, 5000, 9000, 15000, 22000].forEach((ms) => setTimeout(apply, ms));
    setTimeout(() => observer.disconnect(), 26000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
