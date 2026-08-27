(() => {
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  if (path !== "/masterclass/ai-video") return;

  const mount = () => {
    if (document.getElementById("ai-tools-premium-v6")) return;
    const hero = document.getElementById("top");
    if (!hero || !hero.parentNode) return;

    const videoTools = [
      { name: "Kling AI", desc: "Text & image to video", domain: "klingai.com", cls: "kling" },
      { name: "Higgsfield", desc: "Cinematic motion workflows", domain: "higgsfield.ai", cls: "higgsfield" },
      { name: "Google Veo", desc: "Cinematic video generation", domain: "deepmind.google", cls: "veo" },
      { name: "Runway", desc: "Generation, references & iteration", domain: "runwayml.com", cls: "runway" },
      { name: "Pika", desc: "Short-form video & effects", domain: "pika.art", cls: "pika" },
      { name: "Luma AI", desc: "Creative motion & video generation", domain: "lumalabs.ai", cls: "luma" },
    ];

    const imageTools = [
      { name: "Midjourney", desc: "Concepts & visual art direction", domain: "midjourney.com", cls: "midjourney" },
      { name: "Ideogram", desc: "Typography, posters & ad visuals", domain: "ideogram.ai", cls: "ideogram" },
      { name: "Adobe Firefly", desc: "Commercial creative generation", domain: "adobe.com", cls: "firefly" },
      { name: "Leonardo AI", desc: "Assets, characters & visual concepts", domain: "leonardo.ai", cls: "leonardo" },
      { name: "FLUX", desc: "Photoreal image generation", domain: "bfl.ai", cls: "flux" },
      { name: "OpenAI Images", desc: "Prompt-driven image creation", domain: "openai.com", cls: "openai" },
    ];

    const logo = (tool) => {
      if (tool.cls === "kling") {
        return '<span class="aitv6-logo aitv6-logo-kling"><span class="aitv6-kling-mark">◉</span><b>KlingAI</b></span>';
      }
      if (tool.cls === "higgsfield") {
        return '<span class="aitv6-logo aitv6-logo-higgs"><span class="aitv6-higgs-mark">⌁</span><b>Higgsfield</b></span>';
      }
      return `<span class="aitv6-logo"><img src="https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128" alt="" loading="lazy" decoding="async"><b>${tool.name}</b></span>`;
    };

    const cards = (items, category) => items.map((tool, index) => `
      <article class="aitv6-card aitv6-card-${tool.cls}" style="--delay:${index * 35}ms">
        <div class="aitv6-card-top">
          ${logo(tool)}
          <span class="aitv6-arrow" aria-hidden="true">↗</span>
        </div>
        <div class="aitv6-card-copy">
          <small>${category}</small>
          <h3>${tool.name}</h3>
          <p>${tool.desc}</p>
        </div>
      </article>`).join("");

    const section = document.createElement("section");
    section.id = "ai-tools-premium-v6";
    section.className = "aitv6-section";
    section.innerHTML = `
      <div class="aitv6-shell">
        <div class="aitv6-head">
          <span class="aitv6-eyebrow"><i></i> AI CREATION STACK</span>
          <h2>Create across the tools shaping <em>modern visual content.</em></h2>
          <p>Learn the workflow logic that transfers across leading AI video and image-generation platforms — not a random tour of buttons.</p>
        </div>

        <div class="aitv6-tabs" role="tablist" aria-label="AI creation tool categories">
          <button class="aitv6-tab is-active" type="button" role="tab" aria-selected="true" data-panel="video">
            <span class="aitv6-tab-icon">▶</span><span>Video Generation</span><b>6 tools</b>
          </button>
          <button class="aitv6-tab" type="button" role="tab" aria-selected="false" data-panel="image">
            <span class="aitv6-tab-icon">✦</span><span>Image Generation</span><b>6 tools</b>
          </button>
        </div>

        <div class="aitv6-panel is-active" data-panel-content="video" role="tabpanel">
          <div class="aitv6-grid">${cards(videoTools, "AI VIDEO")}</div>
        </div>

        <div class="aitv6-panel" data-panel-content="image" role="tabpanel" hidden>
          <div class="aitv6-grid">${cards(imageTools, "AI IMAGE")}</div>
        </div>

        <div class="aitv6-workflow">
          <div class="aitv6-workflow-copy">
            <span>WORKFLOW, NOT TOOL HYPE</span>
            <h3>Not another “50 AI tools” workshop.</h3>
            <p>Build a repeatable process for choosing a tool, generating options, comparing results and refining usable creative output.</p>
          </div>
          <div class="aitv6-flow" aria-label="Prompt to deliver workflow">
            <span><b>01</b>Prompt</span><i>→</i><span><b>02</b>Generate</span><i>→</i><span><b>03</b>Compare</span><i>→</i><span><b>04</b>Refine</span><i>→</i><span><b>05</b>Deliver</span>
          </div>
        </div>

        <p class="aitv6-note">Tool availability, features and credits can vary by provider. The focus is on transferable creative workflow.</p>
      </div>`;

    hero.insertAdjacentElement("afterend", section);

    const tabs = section.querySelectorAll(".aitv6-tab");
    const panels = section.querySelectorAll(".aitv6-panel");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-panel");
        tabs.forEach((item) => {
          const active = item === tab;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", active ? "true" : "false");
        });
        panels.forEach((panel) => {
          const active = panel.getAttribute("data-panel-content") === target;
          panel.classList.toggle("is-active", active);
          panel.hidden = !active;
        });
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
