(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_PROOF_STATIC_V4__) return;
  window.__CLAUDE_PROOF_STATIC_V4__ = true;

  const ROOT_ID = "claude-ai-video-proof-v4";
  const JOBS_ID = "ai-video-job-impact-v80";
  const SKILLS_ID = "ai-video-ai-opportunity-v85";
  const REGISTER = "/gen-ai-masterclass/register-one-step";

  const norm = (value) =>
    String(value || "")
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  const esc = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const jobs = [
    {
      brand: "Goldman Sachs",
      brandClass: "serif",
      stat: "30 Crore",
      title: "full-time jobs exposed to AI automation",
      copy: "A major global estimate showing the scale of work that could be affected as generative AI is adopted.",
      source: "Goldman Sachs · Generative AI and the future of work",
    },
    {
      brand: "McKinsey & Company",
      brandClass: "serif",
      stat: "40 Crore",
      title: "workers could be displaced by automation",
      copy: "Global workforce scenarios show how automation can shift occupations and the skills people need to stay relevant.",
      source: "McKinsey Global Institute · Future of Work",
    },
    {
      brand: "WORLD ECONOMIC FORUM",
      brandClass: "stacked",
      stat: "9.2 Crore",
      title: "current jobs projected to be displaced by 2030",
      copy: "The Future of Jobs research also projects substantial job creation as technology changes the labour market.",
      source: "World Economic Forum · Future of Jobs Report 2025",
    },
  ];

  const skills = [
    {
      brand: "pwc",
      brandClass: "compact",
      stat: "+69%",
      title: "Jobs asking for AI skills are outpacing the broader job market.",
      copy: "PwC's global AI Jobs Barometer shows stronger growth in roles that explicitly require AI-related skills.",
      source: "PwC · Global AI Jobs Barometer",
    },
    {
      brand: "WORLD ECONOMIC FORUM",
      brandClass: "stacked",
      stat: "+78M",
      title: "The global job market is expected to create more roles than it loses.",
      copy: "The 2025 report projects 170M roles created and 92M displaced by 2030, for a net gain of 78M jobs.",
      source: "World Economic Forum · Future of Jobs Report 2025",
    },
    {
      brand: "servicenow",
      brandClass: "compact",
      stat: "10.35M",
      title: "India's workforce is moving toward AI-enabled roles.",
      copy: "India-focused workforce research points to millions of technology roles being reshaped as AI becomes part of everyday work.",
      source: "ServiceNow workforce research · India",
    },
  ];

  function card(item) {
    return `
      <article class="sd-proof-v4-card">
        <span class="sd-proof-v4-tape" aria-hidden="true"></span>
        <div class="sd-proof-v4-brand ${esc(item.brandClass || "")}">${esc(item.brand)}</div>
        <div class="sd-proof-v4-rule" aria-hidden="true"></div>
        <strong class="sd-proof-v4-stat">${esc(item.stat)}</strong>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.copy)}</p>
        <small>${esc(item.source)}</small>
      </article>`;
  }

  function addCss() {
    if (document.getElementById("sd-proof-v4-css")) return;
    const style = document.createElement("style");
    style.id = "sd-proof-v4-css";
    style.textContent = `
      #${ROOT_ID}{--sd-orange:#f36a31;--sd-orange-dark:#d76343;--sd-peach:#fff1ea;--sd-surface:#fffaf7;--sd-ink:#171717;--sd-muted:#76706d;--sd-line:#f4a17d;width:100%;font-family:Manrope,Inter,Arial,sans-serif;color:var(--sd-ink);background:var(--sd-surface);overflow:hidden;box-sizing:border-box}
      #${ROOT_ID} *{box-sizing:border-box}
      #${ROOT_ID} .sd-proof-v4-section{width:100%;background:var(--sd-surface)}
      #${ROOT_ID} .sd-proof-v4-section+ .sd-proof-v4-section{border-top:1px solid #f2e5de;background:linear-gradient(180deg,#fffaf7 0%,#fff7f2 100%)}
      #${ROOT_ID} .sd-proof-v4-shell{width:min(1080px,calc(100% - 48px));margin:0 auto;padding:74px 0 78px;text-align:center}
      #${ROOT_ID} .sd-proof-v4-eyebrow{display:inline-flex;align-items:center;justify-content:center;min-height:27px;padding:0 11px;border:1px solid rgba(243,106,49,.32);border-radius:999px;background:#fff;color:var(--sd-orange-dark);box-shadow:0 6px 18px rgba(215,99,67,.05);font-size:8px;font-weight:800;letter-spacing:.13em;text-transform:uppercase}
      #${ROOT_ID} .sd-proof-v4-title{max-width:830px;margin:14px auto 12px;color:var(--sd-ink);font-family:Manrope,Inter,Arial,sans-serif;font-size:clamp(32px,3.45vw,46px);line-height:1.06;letter-spacing:-.045em;font-weight:800;text-align:center;text-wrap:balance}
      #${ROOT_ID} .sd-proof-v4-title .sd-proof-v4-highlight{display:inline;background:var(--sd-orange);color:#fff;border-radius:6px;padding:.01em .17em .055em;font-style:normal;font-weight:800;-webkit-box-decoration-break:clone;box-decoration-break:clone}
      #${ROOT_ID} .sd-proof-v4-intro{max-width:720px;margin:0 auto 31px;color:var(--sd-muted);font-family:Manrope,Inter,Arial,sans-serif;font-size:13px;line-height:1.62;font-weight:450;text-align:center;text-wrap:pretty}
      #${ROOT_ID} .sd-proof-v4-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;width:min(940px,100%);margin:0 auto;align-items:stretch}
      #${ROOT_ID} .sd-proof-v4-card{position:relative;min-width:0;min-height:350px;padding:32px 23px 21px;border:1px solid #ead8cf;border-radius:10px;background:linear-gradient(180deg,#fffefa 0%,#fffaf5 100%);box-shadow:0 12px 30px rgba(71,43,32,.07);text-align:left;display:flex;flex-direction:column;overflow:hidden;isolation:isolate;font-family:Manrope,Inter,Arial,sans-serif}
      #${ROOT_ID} .sd-proof-v4-card:before{content:"";position:absolute;z-index:-1;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(152,101,75,.025) 0,rgba(152,101,75,.025) 1px,transparent 1px,transparent 6px)}
      #${ROOT_ID} .sd-proof-v4-tape{position:absolute;z-index:3;top:-3px;left:50%;width:76px;height:16px;transform:translateX(-50%) rotate(-1.1deg);background:rgba(255,225,198,.62);border-left:1px solid rgba(221,150,111,.16);border-right:1px solid rgba(221,150,111,.16)}
      #${ROOT_ID} .sd-proof-v4-brand{position:relative;z-index:2;min-height:48px;display:flex;align-items:flex-end;color:#171717;font-size:20px;font-weight:800;line-height:1.05;letter-spacing:-.035em}
      #${ROOT_ID} .sd-proof-v4-brand.serif{font-family:Georgia,"Times New Roman",serif;font-size:21px;font-weight:700}
      #${ROOT_ID} .sd-proof-v4-brand.stacked{max-width:155px;font-size:14px;font-weight:900;line-height:.92;letter-spacing:-.04em}
      #${ROOT_ID} .sd-proof-v4-brand.compact{font-size:23px;font-weight:900;letter-spacing:-.04em}
      #${ROOT_ID} .sd-proof-v4-rule{position:relative;z-index:2;width:100%;height:1px;margin:12px 0 16px;background:#eaded7}
      #${ROOT_ID} .sd-proof-v4-stat{position:relative;z-index:2;display:block;margin:0;color:var(--sd-orange);font-size:clamp(34px,3vw,44px);font-weight:900;line-height:.96;letter-spacing:-.05em}
      #${ROOT_ID} .sd-proof-v4-card h3{position:relative;z-index:2;margin:8px 0;color:#2b2725;font-size:14px;font-weight:800;line-height:1.32;letter-spacing:-.018em}
      #${ROOT_ID} .sd-proof-v4-card p{position:relative;z-index:2;margin:0;color:#716b68;font-size:10.5px;font-weight:500;line-height:1.58}
      #${ROOT_ID} .sd-proof-v4-card small{position:relative;z-index:2;display:block;margin-top:auto;padding-top:15px;color:#938983;font-size:8.5px;font-weight:650;line-height:1.45;border-top:1px solid #eaded7}
      #${ROOT_ID} .sd-proof-v4-note{display:flex;align-items:flex-start;gap:11px;width:min(940px,100%);margin:28px auto 15px;padding:13px 16px;border:1px solid #efddd3;border-radius:9px;background:#fff;box-shadow:0 7px 18px rgba(71,43,32,.035);text-align:left}
      #${ROOT_ID} .sd-proof-v4-note>span{display:grid;place-items:center;flex:0 0 auto;width:18px;height:18px;margin-top:1px;border:1px solid rgba(243,106,49,.32);border-radius:50%;color:var(--sd-orange);font-size:9px;font-weight:900}
      #${ROOT_ID} .sd-proof-v4-note p{margin:0;color:#7c7470;font-size:9.5px;line-height:1.5}
      #${ROOT_ID} .sd-proof-v4-opportunity{width:min(940px,100%);margin:0 auto;padding:14px 18px;border:1px solid #efddd3;border-radius:9px;background:#fff;box-shadow:0 8px 22px rgba(71,43,32,.04);color:#272321;font-size:12px;font-weight:700;line-height:1.45}
      #${ROOT_ID} .sd-proof-v4-opportunity strong{color:var(--sd-orange-dark);font-weight:800}
      #${ROOT_ID} .sd-proof-v4-skills .sd-proof-v4-opportunity{margin-top:28px}
      #${ROOT_ID} .sd-proof-v4-actions{display:flex;justify-content:center;margin-top:21px;padding:0 16px 2px}
      #${ROOT_ID} .sd-proof-v4-actions a{display:inline-flex;align-items:center;justify-content:center;gap:5px;min-height:47px;padding:0 23px;border:1px solid rgba(215,99,67,.18);border-radius:10px;background:linear-gradient(135deg,#f47a4b 0%,#f36a31 58%,#e85d2f 100%);box-shadow:0 11px 25px rgba(243,106,49,.22);color:#fff;text-decoration:none;font-family:Manrope,Inter,Arial,sans-serif;font-size:11.5px;font-weight:800;line-height:1;letter-spacing:-.02em;transition:transform .18s ease,box-shadow .18s ease}
      #${ROOT_ID} .sd-proof-v4-actions a span{font-size:9.5px;font-weight:700;opacity:.92}
      #${ROOT_ID} .sd-proof-v4-actions a:hover{transform:translateY(-1px);box-shadow:0 14px 30px rgba(243,106,49,.28)}
      @media(max-width:900px){#${ROOT_ID} .sd-proof-v4-shell{width:min(100% - 40px,1080px);padding:66px 0 70px}#${ROOT_ID} .sd-proof-v4-grid{grid-template-columns:1fr;max-width:720px;gap:14px}#${ROOT_ID} .sd-proof-v4-card{min-height:286px}#${ROOT_ID} .sd-proof-v4-note,#${ROOT_ID} .sd-proof-v4-opportunity{max-width:720px}}
      @media(max-width:640px){#${ROOT_ID} .sd-proof-v4-shell{width:min(100% - 28px,1080px);padding:52px 0 56px}#${ROOT_ID} .sd-proof-v4-eyebrow{min-height:26px;padding:0 10px;font-size:7.5px}#${ROOT_ID} .sd-proof-v4-title{margin:12px auto 11px;font-size:clamp(27px,8.2vw,34px);line-height:1.08;letter-spacing:-.038em}#${ROOT_ID} .sd-proof-v4-intro{margin-bottom:24px;font-size:12px;line-height:1.58;padding:0 4px}#${ROOT_ID} .sd-proof-v4-grid{gap:11px}#${ROOT_ID} .sd-proof-v4-card{min-height:0;padding:28px 18px 18px}#${ROOT_ID} .sd-proof-v4-brand{min-height:42px}#${ROOT_ID} .sd-proof-v4-stat{font-size:36px}#${ROOT_ID} .sd-proof-v4-card h3{font-size:13px}#${ROOT_ID} .sd-proof-v4-note{margin-top:22px;padding:12px 13px}#${ROOT_ID} .sd-proof-v4-note p{font-size:9px}#${ROOT_ID} .sd-proof-v4-opportunity{padding:13px 14px;font-size:11px}#${ROOT_ID} .sd-proof-v4-skills .sd-proof-v4-opportunity{margin-top:22px}#${ROOT_ID} .sd-proof-v4-actions{margin-top:18px}#${ROOT_ID} .sd-proof-v4-actions a{width:min(100%,330px);min-height:50px;border-radius:11px;font-size:12px}}
      @media(prefers-reduced-motion:reduce){#${ROOT_ID} .sd-proof-v4-actions a{transition:none}#${ROOT_ID} .sd-proof-v4-actions a:hover{transform:none}}
    `;
    document.head.appendChild(style);
  }

  function build() {
    const root = document.createElement("section");
    root.id = ROOT_ID;
    root.setAttribute("aria-label", "AI jobs and AI skills research");
    root.setAttribute("data-claude-proof-static", "v4");
    root.innerHTML = `
      <div id="${JOBS_ID}" class="sd-proof-v4-section sd-proof-v4-jobs" data-claude-proof-clone="jobs">
        <div class="sd-proof-v4-shell">
          <span class="sd-proof-v4-eyebrow">WORK, REIMAGINED</span>
          <h2 class="sd-proof-v4-title" data-sd-claude-title="1">AI &amp; automation are reshaping <span class="sd-proof-v4-highlight" data-sd-claude-highlight="1">hundreds of millions of jobs.</span></h2>
          <p class="sd-proof-v4-intro">Major global research shows how quickly work is changing — and why learning to work with AI is becoming a practical skill, not an optional extra.</p>
          <div class="sd-proof-v4-grid">${jobs.map(card).join("")}</div>
          <div class="sd-proof-v4-note"><span aria-hidden="true">i</span><p>These are global estimates and scenarios, not guaranteed layoffs. Research also points to new job creation, with many existing roles expected to change rather than disappear completely.</p></div>
          <div class="sd-proof-v4-opportunity">The opportunity isn't to compete with AI. <strong>It's to learn how to direct it.</strong></div>
        </div>
      </div>
      <div id="${SKILLS_ID}" class="sd-proof-v4-section sd-proof-v4-skills" data-claude-proof-clone="skills">
        <div class="sd-proof-v4-shell">
          <span class="sd-proof-v4-eyebrow">LATEST AI SKILLS DATA</span>
          <h2 class="sd-proof-v4-title" data-sd-claude-title="1">AI isn't only changing jobs. <span class="sd-proof-v4-highlight" data-sd-claude-highlight="1">It's increasing the value of AI skills.</span></h2>
          <p class="sd-proof-v4-intro">Recent global and India-focused research shows stronger demand for AI capability, higher skill premiums, and millions of tech jobs expected to be created or re-shaped.</p>
          <div class="sd-proof-v4-grid">${skills.map(card).join("")}</div>
          <div class="sd-proof-v4-opportunity">The market isn't simply moving toward “AI jobs.” <strong>It's moving toward people who can work effectively with AI.</strong></div>
          <div class="sd-proof-v4-actions" data-claude-ai-video-proof-cta="1"><a href="${REGISTER}" data-sd-claude-cta="1">Get My Free Seat <span>· 100% · Free</span></a></div>
        </div>
      </div>`;
    return root;
  }

  function findSectionByText(text) {
    const heading = [...document.querySelectorAll("h1,h2,h3")].find((el) =>
      norm(el.textContent).includes(text)
    );
    return heading ? heading.closest("section") : null;
  }

  function mount() {
    addCss();

    const already = document.getElementById(ROOT_ID);
    if (already) {
      document.documentElement.setAttribute("data-claude-exact-ai-video-proof", "ready");
      document.documentElement.setAttribute("data-claude-proof-theme", "v4");
      return true;
    }

    const existingJobs = document.getElementById(JOBS_ID);
    const existingSkills = document.getElementById(SKILLS_ID);
    const cloneCta = document.querySelector('[data-claude-ai-video-proof-cta="1"]');
    const old = findSectionByText("why ai-skilled professionals are moving ahead faster");
    const fallback = findSectionByText("move from quick answers to structured, reviewable work");
    const target = old || fallback;
    const root = build();

    if (existingJobs && existingSkills && existingJobs.parentNode) {
      existingJobs.parentNode.insertBefore(root, existingJobs);
      existingJobs.remove();
      existingSkills.remove();
      if (cloneCta && !root.contains(cloneCta)) cloneCta.remove();
      if (target && target.isConnected && target !== root) target.remove();
    } else if (target && target.parentNode) {
      target.replaceWith(root);
    } else {
      return false;
    }

    document.documentElement.setAttribute("data-claude-exact-ai-video-proof", "ready");
    document.documentElement.setAttribute("data-claude-proof-theme", "v4");
    return true;
  }

  let raf = 0;
  const observer = new MutationObserver(() => {
    if (document.getElementById(ROOT_ID)) {
      observer.disconnect();
      return;
    }
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(mount);
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }

  [0, 40, 100, 220, 450, 800, 1400, 2400, 4000].forEach((ms) => setTimeout(mount, ms));
  setTimeout(() => observer.disconnect(), 9000);
})();
