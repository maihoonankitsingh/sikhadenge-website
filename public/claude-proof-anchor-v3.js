(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_PROOF_ANCHOR_V3__) return;
  window.__CLAUDE_PROOF_ANCHOR_V3__ = true;

  const JOBS_ID = "ai-video-job-impact-v80";
  const SKILLS_ID = "ai-video-ai-opportunity-v85";
  const OLD_TEXT = "why ai-skilled professionals are moving ahead faster";
  const FALLBACK_TEXT = "move from quick answers to structured, reviewable work";
  const MARKER = "data-claude-proof-anchor-v3";

  const norm = (value) =>
    String(value || "")
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  function hasExactProof() {
    return Boolean(
      document.getElementById(JOBS_ID) && document.getElementById(SKILLS_ID)
    );
  }

  function hasOldTarget() {
    return [...document.querySelectorAll("h1,h2,h3")].some((el) =>
      norm(el.textContent).includes(OLD_TEXT)
    );
  }

  function findFallbackSection() {
    const heading = [...document.querySelectorAll("h1,h2,h3")].find((el) =>
      norm(el.textContent).includes(FALLBACK_TEXT)
    );
    return heading ? heading.closest("section") : null;
  }

  function ensureAnchor() {
    if (hasExactProof() || hasOldTarget()) return true;

    const section = findFallbackSection();
    if (!section) return false;
    if (section.querySelector(`[${MARKER}]`)) return true;

    const marker = document.createElement("h3");
    marker.setAttribute(MARKER, "1");
    marker.setAttribute("aria-hidden", "true");
    marker.textContent = "Why AI-skilled professionals are moving ahead faster";
    marker.style.cssText = [
      "position:absolute",
      "width:1px",
      "height:1px",
      "padding:0",
      "margin:-1px",
      "overflow:hidden",
      "clip:rect(0,0,0,0)",
      "white-space:nowrap",
      "border:0",
      "pointer-events:none",
    ].join(";");

    section.insertBefore(marker, section.firstChild);
    document.documentElement.setAttribute("data-claude-proof-anchor", "v3");
    return true;
  }

  let raf = 0;
  const observer = new MutationObserver(() => {
    if (hasExactProof()) {
      observer.disconnect();
      return;
    }
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(ensureAnchor);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureAnchor, { once: true });
  } else {
    ensureAnchor();
  }

  [0, 50, 120, 250, 500, 900, 1500, 2500, 4000, 6500].forEach((ms) =>
    setTimeout(() => {
      if (hasExactProof()) {
        observer.disconnect();
        return;
      }
      ensureAnchor();
    }, ms)
  );

  setTimeout(() => observer.disconnect(), 12000);
})();
