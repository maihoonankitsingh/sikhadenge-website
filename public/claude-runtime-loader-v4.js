(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__SD_CLAUDE_RUNTIME_LOADER_V4__) return;
  window.__SD_CLAUDE_RUNTIME_LOADER_V4__ = 1;

  const norm = (value) => String(value || "").replace(/\s+/g, " ").trim();

  function installTechnicalStyle() {
    if (document.getElementById("sd-claude-tech-health-v4-style")) return;
    const style = document.createElement("style");
    style.id = "sd-claude-tech-health-v4-style";
    style.textContent = `
      [class*="hostImage"]{background-image:none!important;background-color:#f6eee8!important}
      @media(max-width:767px){
        #sd-sitewide-live-proof-host-v1{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}
        footer a{min-height:32px;display:inline-flex;align-items:center}
        footer small,[class*="payment"] small{font-size:11px!important;line-height:1.4!important}
        #claude-ai-video-proof-v4 .sd-proof-v4-eyebrow{font-size:10px!important}
        #claude-ai-video-proof-v4 .sd-proof-v4-card small{font-size:11px!important;line-height:1.45!important}
        #claude-ai-video-proof-v4 .sd-proof-v4-note p{font-size:11px!important}
        #claude-ai-video-proof-v4 .sd-proof-v4-actions a span{font-size:11px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function removeCleanOnlyCompatibilitySection() {
    const heading = [...document.querySelectorAll("main h2")].find(
      (node) => norm(node.textContent) === "Use AI tools for work you already do."
    );
    const section = heading?.closest("section");
    if (!section) return false;
    section.remove();
    document.documentElement.setAttribute("data-claude-clean-only-section-removed", "1");
    return true;
  }

  function lazyHeavyMedia() {
    const host = [...document.querySelectorAll('[class*="hostImage"]')][0];
    if (host && host.getAttribute("data-sd-lazy-host") !== "1") {
      host.setAttribute("data-sd-lazy-host", "1");
      const load = () => {
        host.style.setProperty(
          "background-image",
          "url(/images/about/about-mission-class.webp)",
          "important"
        );
        host.style.setProperty("background-color", "transparent", "important");
      };
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              io.disconnect();
              load();
            }
          },
          { rootMargin: "650px 0px" }
        );
        io.observe(host);
      } else {
        setTimeout(load, 3500);
      }
    }

    document.querySelectorAll("video").forEach((video) => {
      if (video.getBoundingClientRect().top > innerHeight * 1.2) video.preload = "none";
    });

    document.querySelectorAll("img").forEach((img) => {
      if (img.getBoundingClientRect().top > innerHeight * 1.25) {
        img.loading = "lazy";
        img.decoding = "async";
        if (img.getAttribute("fetchpriority") === "high") img.setAttribute("fetchpriority", "low");
      }
    });
  }

  const legacyScripts = [
    "/api/social-proof/live?widget=1&v=sitewide-live-proof-v1-20260902-224804",
    "/claude-proof-hide-old-v2.js?v=20260902-2300",
    "/claude-proof-static-v4.js?v=claude-proof-static-v4-20260902",
    "/claude-proof-anchor-v3.js?v=claude-proof-anchor-v3-20260902",
    "/claude-proof-exact-v1.js?v=claude-exact-ai-video-proof-20260902",
    "/claude-proof-theme-v2.js?v=claude-proof-premium-v3-20260903",
    "/claude-heading-v11-restore-current.js?v=old-v11-current-20260903b",
    "/claude-proof-real-logos-v1.js?v=real-logos-note-remove-20260903",
    "/claude-badge-spacing-v1.js?v=badge-gap-standard12-20260903",
    "/claude-remove-empty-community-v1.js?v=remove-blank-strip-20260903",
  ];

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = () => resolve({ src, ok: true });
      script.onerror = () => resolve({ src, ok: false });
      document.body.appendChild(script);
    });

  function testimonialCss() {
    if (document.getElementById("sd-testimonial-compat-v4-style")) return;
    const style = document.createElement("style");
    style.id = "sd-testimonial-compat-v4-style";
    style.textContent = `
      #sd-claude-testimonials-v305{position:relative;overflow:hidden;padding:56px 0 58px;background:#fff;font-family:inherit;content-visibility:auto;contain-intrinsic-size:560px}
      #sd-claude-testimonials-v305 *{box-sizing:border-box}
      #sd-claude-testimonials-v305 .sd-v305-shell{width:100%;margin:0;padding:0}
      #sd-claude-testimonials-v305 .sd-v305-head{width:min(calc(100% - 32px),920px);margin:0 auto 38px;text-align:center}
      #sd-claude-testimonials-v305 .sd-v305-pill{display:inline-flex;align-items:center;gap:8px;min-height:34px;padding:7px 14px;border:1px solid rgba(215,99,67,.28);border-radius:999px;background:#fffaf7;color:#bf5234;font-size:10px;font-weight:800;line-height:1;letter-spacing:.12em;text-transform:uppercase}
      #sd-claude-testimonials-v305 .sd-v305-pill-dot{width:8px;height:8px;border-radius:50%;background:#f36a31;box-shadow:0 0 0 4px rgba(243,106,49,.10)}
      #sd-claude-testimonials-v305 .sd-v305-title{margin:15px auto 0}
      #sd-claude-testimonials-v305 .sd-v305-desc{max-width:640px;margin:15px auto 0;color:#64748b;font-size:15.5px;font-weight:500;line-height:1.7}
      #sd-claude-testimonials-v305 .sd-v305-viewport{position:relative;width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);overflow:hidden;padding:4px 0 10px}
      #sd-claude-testimonials-v305 .sd-v305-track{display:flex;width:max-content;animation:sd-v305-marquee 36s linear infinite;will-change:transform}
      #sd-claude-testimonials-v305 .sd-v305-set{display:flex;flex:0 0 auto;gap:16px;padding-right:16px}
      #sd-claude-testimonials-v305:hover .sd-v305-track,#sd-claude-testimonials-v305:focus-within .sd-v305-track,#sd-claude-testimonials-v305[data-playing="1"] .sd-v305-track{animation-play-state:paused}
      @keyframes sd-v305-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
      #sd-claude-testimonials-v305 .sd-v305-card{position:relative;width:280px;min-width:280px;height:420px;flex:0 0 280px;overflow:hidden;border:1px solid rgba(8,23,51,.30);border-radius:17px;background:#fff;box-shadow:0 3px 10px rgba(15,23,42,.055)}
      #sd-claude-testimonials-v305 .sd-v305-poster-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center center;background:#f8fafc}
      #sd-claude-testimonials-v305 .sd-v305-open{position:absolute;z-index:10;inset:0;width:100%;height:100%;padding:0;border:0;background:transparent;cursor:pointer}
      #sd-claude-testimonials-v305 .sd-v305-play{position:absolute;left:50%;top:50%;display:grid;width:66px;height:66px;place-items:center;border:0;border-radius:999px;background:rgba(255,255,255,.96);box-shadow:0 8px 24px rgba(15,23,42,.13);transform:translate(-50%,-50%);backdrop-filter:blur(5px)}
      #sd-claude-testimonials-v305 .sd-v305-play svg{width:22px;height:22px;margin-left:3px;fill:#2563eb}
      #sd-claude-testimonials-v305 .sd-v305-inline-video{position:absolute;z-index:30;inset:0;width:100%;height:100%;border:0;border-radius:inherit;background:#000;object-fit:cover;object-position:center center}
      #sd-claude-testimonials-v305 .sd-v305-close{position:absolute;z-index:50;top:10px;right:10px;display:grid;width:36px;height:36px;place-items:center;border:1px solid rgba(255,255,255,.35);border-radius:50%;background:rgba(2,6,23,.72);color:#fff;cursor:pointer;font-size:20px;line-height:1}
      @media(max-width:1100px){#sd-claude-testimonials-v305{padding:50px 0 54px}#sd-claude-testimonials-v305 .sd-v305-head{margin-bottom:32px}#sd-claude-testimonials-v305 .sd-v305-card{width:258px;min-width:258px;height:387px;flex-basis:258px}}
      @media(max-width:640px){#sd-claude-testimonials-v305{padding:44px 0 48px}#sd-claude-testimonials-v305 .sd-v305-head{width:calc(100% - 24px);margin-bottom:27px}#sd-claude-testimonials-v305 .sd-v305-desc{font-size:14px;line-height:1.6}#sd-claude-testimonials-v305 .sd-v305-set{gap:12px;padding-right:12px}#sd-claude-testimonials-v305 .sd-v305-card{width:min(72vw,240px);min-width:min(72vw,240px);height:min(108vw,360px);flex-basis:min(72vw,240px);border-radius:16px}#sd-claude-testimonials-v305 .sd-v305-play{width:58px;height:58px}#sd-claude-testimonials-v305 .sd-v305-play svg{width:19px;height:19px}}
      @media(prefers-reduced-motion:reduce){#sd-claude-testimonials-v305 .sd-v305-viewport{overflow-x:auto;scrollbar-width:none}#sd-claude-testimonials-v305 .sd-v305-track{animation:none}#sd-claude-testimonials-v305 .sd-v305-set:nth-child(2){display:none}}
    `;
    document.head.appendChild(style);
  }

  function makeTestimonialCard(index) {
    const number = String(index).padStart(2, "0");
    return `<article class="sd-v305-card" data-video="/ai-video-testimonials/${number}.mp4"><img class="sd-v305-poster-img" src="/ai-video-testimonials/${number}.jpg" alt="SikhaDenge learner video testimonial ${index}" loading="lazy" decoding="async"><button type="button" class="sd-v305-open" aria-label="Watch real learner testimonial ${index}"><span class="sd-v305-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg></span></button></article>`;
  }

  function installTestimonials() {
    if (document.getElementById("sd-claude-testimonials-v305")) return true;
    const toolkitHeading = [...document.querySelectorAll("main h2")].find(
      (node) => norm(node.textContent) === "Learn 25+ AI Tools"
    );
    const toolkitSection = toolkitHeading?.closest("section");
    if (!toolkitSection) return false;

    testimonialCss();
    const section = document.createElement("section");
    section.id = "sd-claude-testimonials-v305";
    section.setAttribute("aria-labelledby", "sd-v305-title");
    section.setAttribute("data-sd-testimonial-version", "v305-compat-v4");
    const cards = Array.from({ length: 6 }, (_, i) => makeTestimonialCard(i + 1)).join("");
    section.innerHTML = `<div class="sd-v305-shell"><header class="sd-v305-head"><div class="sd-v305-pill"><span class="sd-v305-pill-dot" aria-hidden="true"></span>Real Learner Stories</div><h2 class="sd-v305-title sd-heading-v11" id="sd-v305-title">Real learners. <span class="sd-heading-v11-highlight">Real experiences.</span></h2><p class="sd-v305-desc">Hear directly from learners about their Sikhadenge learning experience.</p></header><div class="sd-v305-viewport" aria-label="Real learner video testimonials"><div class="sd-v305-track"><div class="sd-v305-set">${cards}</div><div class="sd-v305-set" aria-hidden="true">${cards}</div></div></div></div>`;
    toolkitSection.insertAdjacentElement("afterend", section);

    section.addEventListener("click", (event) => {
      const close = event.target.closest(".sd-v305-close");
      if (close) {
        const card = close.closest(".sd-v305-card");
        card?.querySelector("video")?.pause();
        card?.querySelector("video")?.remove();
        close.remove();
        section.removeAttribute("data-playing");
        return;
      }
      const open = event.target.closest(".sd-v305-open");
      if (!open) return;
      const card = open.closest(".sd-v305-card");
      if (!card || card.querySelector("video")) return;
      section.setAttribute("data-playing", "1");
      const video = document.createElement("video");
      video.className = "sd-v305-inline-video";
      video.src = card.dataset.video;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "metadata";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "sd-v305-close";
      button.setAttribute("aria-label", "Close testimonial video");
      button.textContent = "×";
      card.append(video, button);
      video.play().catch(() => {});
      video.addEventListener("ended", () => button.click(), { once: true });
    });
    return true;
  }

  async function boot() {
    installTechnicalStyle();
    removeCleanOnlyCompatibilitySection();
    lazyHeavyMedia();

    const results = [];
    for (const src of legacyScripts) results.push(await loadScript(src));
    document.documentElement.setAttribute(
      "data-claude-runtime-script-errors",
      String(results.filter((result) => !result.ok).length)
    );

    [0, 250, 700, 1400, 2600].forEach((ms) => setTimeout(installTestimonials, ms));
    setTimeout(lazyHeavyMedia, 1600);
    document.documentElement.setAttribute("data-claude-runtime-loader", "v4-ready");
  }

  const start = () => setTimeout(boot, 250);
  if (document.readyState === "complete") start();
  else addEventListener("load", start, { once: true });
})();
