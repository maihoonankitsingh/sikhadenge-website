(() => {
  if (typeof window === "undefined") return;
  if (window.location.pathname !== "/masterclass/ai-video") return;

  const mount = () => {
    if (document.getElementById("ai-live-studio-v8")) return;

    const legacy = document.getElementById("build");
    if (!legacy || !legacy.parentNode) return;

    legacy.id = "build-legacy-v7";
    legacy.setAttribute("aria-hidden", "true");

    const section = document.createElement("section");
    section.id = "build";
    section.className = "aiv8-section";
    section.innerHTML = `
      <div id="ai-live-studio-v8" class="aiv8-shell">
        <div class="aiv8-head">
          <span class="aiv8-eyebrow"><i></i> LIVE AI VIDEO WORKFLOW</span>
          <h2>Watch one idea become a <em>finished cinematic video.</em></h2>
          <p>Instead of showing five disconnected examples, the masterclass walks through the full creative chain — direction, frame, motion, iteration and final delivery.</p>
        </div>

        <div class="aiv8-studio">
          <div class="aiv8-player">
            <div class="aiv8-player-top">
              <div><span class="aiv8-status-dot"></span><b>AI DIRECTOR MODE</b></div>
              <span>LIVE BUILD · 16:9</span>
            </div>

            <div class="aiv8-screen" aria-label="Cinematic AI video workflow preview">
              <div class="aiv8-gridlines"></div>
              <div class="aiv8-light aiv8-light-one"></div>
              <div class="aiv8-light aiv8-light-two"></div>
              <div class="aiv8-product">
                <span></span><i></i><b>AI</b>
              </div>
              <div class="aiv8-camera-path"><span>CAMERA PATH</span><i></i></div>
              <div class="aiv8-screen-label"><small>SHOT 04</small><strong>Final hero frame</strong></div>
              <div class="aiv8-screen-meta"><span>6s</span><span>24 fps</span><span>Cinematic</span></div>
            </div>

            <div class="aiv8-timeline">
              <div class="aiv8-time-head"><span>SCENE TIMELINE</span><small>One idea · four controlled passes</small></div>
              <div class="aiv8-scenes">
                <button type="button" class="is-active"><span class="aiv8-mini aiv8-mini-1"></span><small>01</small><b>Prompt</b></button>
                <button type="button"><span class="aiv8-mini aiv8-mini-2"></span><small>02</small><b>Frame</b></button>
                <button type="button"><span class="aiv8-mini aiv8-mini-3"></span><small>03</small><b>Motion</b></button>
                <button type="button"><span class="aiv8-mini aiv8-mini-4"></span><small>04</small><b>Final</b></button>
              </div>
            </div>
          </div>

          <aside class="aiv8-director">
            <div class="aiv8-director-head">
              <span>WHAT CHANGES LIVE</span>
              <h3>You learn to direct the output, not just press Generate.</h3>
            </div>

            <div class="aiv8-steps">
              <article><span>01</span><div><b>Prompt direction</b><p>Subject, action, mood, lighting and shot intent.</p></div></article>
              <article><span>02</span><div><b>Reference frame</b><p>Choose text, image or keyframe as the visual anchor.</p></div></article>
              <article><span>03</span><div><b>Motion & camera</b><p>Control movement, lens feel, speed and timing.</p></div></article>
              <article><span>04</span><div><b>Compare variations</b><p>Review versions and change one variable deliberately.</p></div></article>
              <article><span>05</span><div><b>Finish & deliver</b><p>Sequence, audio, captions, cleanup and export.</p></div></article>
            </div>

            <a class="aiv8-cta" href="/gen-ai-masterclass/register-one-step?source=ai-video-masterclass">
              <span>See the full workflow live</span><b>→</b>
            </a>
          </aside>
        </div>

        <div class="aiv8-output-row">
          <span>OUTPUTS YOU CAN APPLY IT TO</span>
          <div>
            <b>Product Commercial</b>
            <b>Cinematic Reel</b>
            <b>Character Shot</b>
            <b>Social Ad</b>
            <b>Image → Video</b>
          </div>
        </div>
      </div>`;

    legacy.insertAdjacentElement("afterend", section);
  };

  const ready = () => window.requestAnimationFrame(() => window.requestAnimationFrame(mount));

  if (document.readyState === "complete") ready();
  else window.addEventListener("load", ready, { once: true });
})();
