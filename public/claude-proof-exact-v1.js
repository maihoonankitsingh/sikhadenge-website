(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_EXACT_AI_VIDEO_PROOF_V1__) return;
  window.__CLAUDE_EXACT_AI_VIDEO_PROOF_V1__ = true;

  const SOURCE = "/masterclass/ai-video?claude-proof-clone=20260902";
  const JOBS_ID = "ai-video-job-impact-v80";
  const SKILLS_ID = "ai-video-ai-opportunity-v85";
  const READY_ATTR = "data-claude-exact-ai-video-proof";
  const STYLE_ATTR = "data-claude-ai-video-proof-style";

  let templates = null;
  let observer = null;
  let applying = false;

  const norm = (value) =>
    String(value || "")
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  function findOldSection() {
    const heading = [...document.querySelectorAll("h1,h2,h3")].find((el) =>
      norm(el.textContent).includes(
        "why ai-skilled professionals are moving ahead faster"
      )
    );

    return heading ? heading.closest("section") : null;
  }

  function cloneRelevantStyles(sourceDoc) {
    sourceDoc.querySelectorAll("style").forEach((style, index) => {
      const css = style.textContent || "";
      if (
        !/(ai-v80|ai-v85|ai-video-job-impact-v80|ai-video-ai-opportunity-v85)/i.test(css)
      ) {
        return;
      }

      const signature = `${index}:${css.length}:${css.slice(0, 80)}`;
      if (
        [...document.querySelectorAll(`style[${STYLE_ATTR}]`)].some(
          (s) => s.getAttribute(STYLE_ATTR) === signature
        )
      ) {
        return;
      }

      const copy = document.createElement("style");
      copy.setAttribute(STYLE_ATTR, signature);
      copy.textContent = css;
      document.head.appendChild(copy);
    });

    sourceDoc
      .querySelectorAll('link[rel="stylesheet"][href*="fonts.googleapis.com"]')
      .forEach((link) => {
        const href = link.href;
        if (!href) return;
        const alreadyLoaded = [...document.querySelectorAll('link[rel="stylesheet"]')]
          .some((existing) => existing.href === href);
        if (alreadyLoaded) return;
        const copy = document.createElement("link");
        copy.rel = "stylesheet";
        copy.href = href;
        document.head.appendChild(copy);
      });
  }

  function copyComputedTree(source, target, sourceWindow) {
    if (!(source instanceof sourceWindow.Element) || !(target instanceof Element)) {
      return;
    }

    const computed = sourceWindow.getComputedStyle(source);
    for (let i = 0; i < computed.length; i += 1) {
      const prop = computed[i];
      const value = computed.getPropertyValue(prop);
      const priority = computed.getPropertyPriority(prop);
      try {
        target.style.setProperty(prop, value, priority);
      } catch (_) {}
    }

    const sourceChildren = [...source.children];
    const targetChildren = [...target.children];

    sourceChildren.forEach((child, index) => {
      if (targetChildren[index]) {
        copyComputedTree(child, targetChildren[index], sourceWindow);
      }
    });
  }

  function firstFollowingCta(sourceDoc, skills) {
    const candidates = [
      ...sourceDoc.querySelectorAll(
        'a[href*="/gen-ai-masterclass/register-one-step"], button, [role="button"]'
      ),
    ].filter((el) => {
      const text = norm(el.textContent);
      return (
        text.includes("get my free seat") ||
        text.includes("reserve my seat") ||
        text.includes("reserve my free seat")
      );
    });

    return (
      candidates.find((el) => {
        const pos = skills.compareDocumentPosition(el);
        return Boolean(pos & Node.DOCUMENT_POSITION_FOLLOWING);
      }) || null
    );
  }

  function smallestCtaBlock(cta, sourceDoc) {
    let block = cta;
    const ctaText = norm(cta.textContent);

    for (let i = 0; i < 4; i += 1) {
      const parent = block.parentElement;
      if (!parent || parent === sourceDoc.body || parent.tagName === "MAIN") break;

      const interactiveCount = parent.querySelectorAll(
        'a,button,[role="button"]'
      ).length;
      const parentText = norm(parent.textContent);

      if (
        interactiveCount === 1 &&
        parentText.length <= ctaText.length + 36 &&
        parent.children.length <= 3
      ) {
        block = parent;
        continue;
      }
      break;
    }

    return block;
  }

  function makeCtaTemplate(sourceDoc, sourceWindow, skills) {
    const cta = firstFollowingCta(sourceDoc, skills);
    if (!cta) return null;

    const sourceBlock = smallestCtaBlock(cta, sourceDoc);
    const clone = sourceBlock.cloneNode(true);
    copyComputedTree(sourceBlock, clone, sourceWindow);

    clone
      .querySelectorAll('a[href*="/gen-ai-masterclass/register-one-step"]')
      .forEach((a) => {
        a.setAttribute("href", "/gen-ai-masterclass/register-one-step");
      });

    if (
      clone.matches &&
      clone.matches('a[href*="/gen-ai-masterclass/register-one-step"]')
    ) {
      clone.setAttribute("href", "/gen-ai-masterclass/register-one-step");
    }

    const wrap = document.createElement("div");
    wrap.setAttribute("data-claude-ai-video-proof-cta", "1");
    wrap.style.cssText = [
      "display:flex",
      "align-items:center",
      "justify-content:center",
      "width:100%",
      "margin-top:-1px",
      "padding:0 16px 30px",
      `background:${sourceWindow.getComputedStyle(skills).background}`,
      "box-sizing:border-box",
    ].join(";");

    wrap.appendChild(clone);
    return wrap;
  }

  function applyTemplates() {
    if (!templates || applying) return false;
    applying = true;

    try {
      const old = findOldSection();
      const existingJobs = document.getElementById(JOBS_ID);
      const existingSkills = document.getElementById(SKILLS_ID);

      if (existingJobs && existingSkills) {
        if (old) old.remove();
        document.documentElement.setAttribute(READY_ATTR, "ready");
        return true;
      }

      if (!old || !old.parentNode) return false;

      const fragment = document.createDocumentFragment();
      fragment.appendChild(templates.jobs.cloneNode(true));
      fragment.appendChild(templates.skills.cloneNode(true));
      if (templates.cta) fragment.appendChild(templates.cta.cloneNode(true));

      old.replaceWith(fragment);
      document.documentElement.setAttribute(READY_ATTR, "ready");
      return true;
    } finally {
      applying = false;
    }
  }

  function captureFromIframe(frame) {
    let sourceDoc;
    let sourceWindow;

    try {
      sourceDoc = frame.contentDocument;
      sourceWindow = frame.contentWindow;
    } catch (_) {
      return false;
    }

    if (!sourceDoc || !sourceWindow) return false;

    const jobs = sourceDoc.getElementById(JOBS_ID);
    const skills = sourceDoc.getElementById(SKILLS_ID);
    if (!jobs || !skills) return false;

    cloneRelevantStyles(sourceDoc);

    templates = {
      jobs: jobs.cloneNode(true),
      skills: skills.cloneNode(true),
      cta: makeCtaTemplate(sourceDoc, sourceWindow, skills),
    };

    templates.jobs.setAttribute("data-claude-proof-clone", "jobs");
    templates.skills.setAttribute("data-claude-proof-clone", "skills");

    applyTemplates();

    if (!observer) {
      let raf = 0;
      observer = new MutationObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(applyTemplates);
      });
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    }

    setTimeout(() => frame.remove(), 250);
    return true;
  }

  function boot() {
    if (document.getElementById(JOBS_ID) && document.getElementById(SKILLS_ID)) {
      document.documentElement.setAttribute(READY_ATTR, "ready");
      return;
    }

    const old = findOldSection();
    if (!old) {
      setTimeout(boot, 250);
      return;
    }

    const frame = document.createElement("iframe");
    frame.src = SOURCE;
    frame.setAttribute("aria-hidden", "true");
    frame.setAttribute("tabindex", "-1");
    frame.style.cssText = [
      "position:fixed",
      "left:-20000px",
      "top:0",
      `width:${Math.max(document.documentElement.clientWidth || 0, 360)}px`,
      "height:1400px",
      "opacity:0",
      "pointer-events:none",
      "border:0",
      "z-index:-2147483647",
    ].join(";");

    document.body.appendChild(frame);

    let attempts = 0;
    const probe = () => {
      attempts += 1;

      try {
        const sourceDoc = frame.contentDocument;
        const jobs = sourceDoc && sourceDoc.getElementById(JOBS_ID);
        const skills = sourceDoc && sourceDoc.getElementById(SKILLS_ID);

        if (jobs && skills) {
          setTimeout(() => {
            if (!captureFromIframe(frame) && attempts < 80) {
              setTimeout(probe, 200);
            }
          }, 1100);
          return;
        }
      } catch (_) {}

      if (attempts < 80) {
        setTimeout(probe, 200);
      } else {
        frame.remove();
      }
    };

    frame.addEventListener("load", probe, { once: true });
    setTimeout(probe, 600);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  [500, 1200, 2500, 5000].forEach((ms) => {
    setTimeout(() => {
      if (templates) applyTemplates();
    }, ms);
  });
})();
