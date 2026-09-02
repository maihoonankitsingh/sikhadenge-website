(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_HIDE_OLD_PROOF_V2__) return;
  window.__CLAUDE_HIDE_OLD_PROOF_V2__ = true;

  const norm = (value) =>
    String(value || "")
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  const hideOld = () => {
    const heading = [...document.querySelectorAll("h1,h2,h3")].find((el) =>
      norm(el.textContent).includes(
        "why ai-skilled professionals are moving ahead faster"
      )
    );

    if (!heading) return false;

    const section = heading.closest("section") || heading.parentElement;
    if (!section) return false;

    section.setAttribute("data-claude-old-proof-hidden", "1");
    section.style.setProperty("display", "none", "important");
    section.style.setProperty("visibility", "hidden", "important");
    section.style.setProperty("height", "0", "important");
    section.style.setProperty("min-height", "0", "important");
    section.style.setProperty("margin", "0", "important");
    section.style.setProperty("padding", "0", "important");
    section.style.setProperty("overflow", "hidden", "important");
    return true;
  };

  const boot = () => {
    hideOld();

    const observer = new MutationObserver(() => {
      if (hideOld()) {
        const jobs = document.getElementById("ai-video-job-impact-v80");
        const skills = document.getElementById("ai-video-ai-opportunity-v85");
        if (jobs && skills) observer.disconnect();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    [25, 60, 120, 250, 500, 900, 1500, 2500, 4000, 6500].forEach((ms) => {
      setTimeout(hideOld, ms);
    });

    setTimeout(() => observer.disconnect(), 12000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
