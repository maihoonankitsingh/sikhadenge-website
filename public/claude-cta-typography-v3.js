(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_CTA_TYPOGRAPHY_V3__) return;
  window.__CLAUDE_CTA_TYPOGRAPHY_V3__ = true;

  const CTA = '[data-sd-cta-primary-v1="1"]';

  function sizes() {
    const w = window.innerWidth;
    if (w <= 370) return { main: "13.5px", pill: "12px" };
    if (w <= 640) return { main: "14px", pill: "12.5px" };
    if (w <= 1024) return { main: "15px", pill: "13px" };
    return { main: "16px", pill: "13.5px" };
  }

  function apply() {
    const s = sizes();
    document.querySelectorAll(CTA).forEach((anchor) => {
      const main = anchor.querySelector(':scope > .sd-cta-main-copy-v2');
      const pill = anchor.querySelector(':scope > .sd-cta-free-pill-v2');
      if (main) main.style.setProperty("font-size", s.main, "important");
      if (pill) pill.style.setProperty("font-size", s.pill, "important");
    });
    document.documentElement.setAttribute("data-claude-cta-typography", "v3");
  }

  let raf = 0;
  const schedule = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(apply);
  };

  const observer = new MutationObserver(schedule);

  const boot = () => {
    apply();
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.addEventListener("resize", schedule, { passive: true });
    [200, 500, 1000, 2000, 4000, 7000, 11000, 16000].forEach((ms) => setTimeout(apply, ms));
    setTimeout(() => observer.disconnect(), 20000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
