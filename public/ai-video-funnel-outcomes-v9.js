(() => {
  if (typeof window === "undefined") return;
  if (window.location.pathname !== "/masterclass/ai-video") return;

  const mount = () => {
    const section = document.getElementById("build");
    if (!section || section.dataset.aiv9Mounted === "true") return;

    section.dataset.aiv9Mounted = "true";
    section.className = "aiv9-section";
    section.innerHTML = `
      <div class="aiv9-shell">
        <div class="aiv9-head">
          <span class="aiv9-eyebrow"><i></i> WHAT YOU’LL BE ABLE TO CREATE</span>
          <h2>Turn simple ideas into <em>AI videos people actually watch.</em></h2>
          <p>No confusing software tour. You’ll see how to build useful video outputs for ads, reels and image-to-video content — step by step.</p>
        </div>

        <div class="aiv9-outcomes">
          <article class="aiv9-outcome aiv9-product">
            <div class="aiv9-visual" aria-hidden="true">
              <div class="aiv9-visual-top"><span>01</span><b>PRODUCT AD</b><small>9:16 / 16:9</small></div>
              <div class="aiv9-product-stage">
                <span class="aiv9-orbit"></span>
                <span class="aiv9-product-object"><i></i></span>
                <span class="aiv9-light aiv9-light-one"></span>
                <span class="aiv9-light aiv9-light-two"></span>
              </div>
              <div class="aiv9-frame-caption"><span>AI GENERATED SHOT</span><b>Premium product commercial</b></div>
            </div>
            <div class="aiv9-copy">
              <span>OUTPUT 01</span>
              <h3>Create scroll-stopping product ads.</h3>
              <p>Turn a product idea into polished commercial shots with controlled camera movement, lighting and motion.</p>
              <div class="aiv9-tags"><span>Prompting</span><span>Camera</span><span>Motion</span></div>
            </div>
          </article>

          <article class="aiv9-outcome aiv9-reel">
            <div class="aiv9-visual" aria-hidden="true">
              <div class="aiv9-visual-top"><span>02</span><b>CINEMATIC REEL</b><small>SHORT FORM</small></div>
              <div class="aiv9-reel-stage">
                <span class="aiv9-sun"></span>
                <span class="aiv9-ridge aiv9-ridge-one"></span>
                <span class="aiv9-ridge aiv9-ridge-two"></span>
                <span class="aiv9-subject"></span>
                <span class="aiv9-film-line"></span>
              </div>
              <div class="aiv9-frame-caption"><span>MULTI-SHOT FLOW</span><b>Cinematic social reel</b></div>
            </div>
            <div class="aiv9-copy">
              <span>OUTPUT 02</span>
              <h3>Build cinematic reels with connected shots.</h3>
              <p>Plan multiple scenes so the visuals feel intentional instead of looking like random AI clips stitched together.</p>
              <div class="aiv9-tags"><span>Shots</span><span>Consistency</span><span>Story</span></div>
            </div>
          </article>

          <article class="aiv9-outcome aiv9-motion">
            <div class="aiv9-visual" aria-hidden="true">
              <div class="aiv9-visual-top"><span>03</span><b>IMAGE → VIDEO</b><small>MOTION</small></div>
              <div class="aiv9-motion-stage">
                <span class="aiv9-motion-ring aiv9-ring-one"></span>
                <span class="aiv9-motion-ring aiv9-ring-two"></span>
                <span class="aiv9-portrait"><i></i></span>
                <span class="aiv9-trail aiv9-trail-one"></span>
                <span class="aiv9-trail aiv9-trail-two"></span>
              </div>
              <div class="aiv9-frame-caption"><span>REFERENCE-LED</span><b>Still image brought to life</b></div>
            </div>
            <div class="aiv9-copy">
              <span>OUTPUT 03</span>
              <h3>Animate images without losing the visual direction.</h3>
              <p>Use a reference image as the starting point and control motion, framing and scene intent instead of accepting random movement.</p>
              <div class="aiv9-tags"><span>Reference</span><span>I2V</span><span>Control</span></div>
            </div>
          </article>
        </div>

        <div class="aiv9-conversion-band">
          <div class="aiv9-band-copy">
            <span>BY THE END OF THE LIVE MASTERCLASS</span>
            <h3>You’ll understand the complete path from <em>prompt → shot → finished video.</em></h3>
          </div>
          <div class="aiv9-benefits">
            <span><i>✓</i> Text-to-video</span>
            <span><i>✓</i> Image-to-video</span>
            <span><i>✓</i> Camera & motion</span>
            <span><i>✓</i> Consistent shots</span>
            <span><i>✓</i> Ads & reels</span>
          </div>
          <a class="aiv9-cta" href="/gen-ai-masterclass/register-one-step?source=ai-video-masterclass">
            <span>Reserve My Seat</span><b>→</b>
          </a>
        </div>
      </div>`;
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
