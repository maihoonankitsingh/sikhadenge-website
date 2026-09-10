(() => {
  'use strict';

  if (window.__SD_CLAUDE_TESTIMONIALS_CONVERSION_V1__) return;
  window.__SD_CLAUDE_TESTIMONIALS_CONVERSION_V1__ = true;

  const ROOT_ID = 'sd-claude-testimonials-v305';
  const STYLE_ID = 'sd-claude-testimonials-conversion-v1-style';
  const META_CLASS = 'sd-testimonial-meta-v1';
  const PILL = 'LEARNER VIDEO TESTIMONIALS';
  const DESC = 'Watch 6 learner video testimonials and hear their Sikhadenge learning experience in their own words.';
  const clean = value => (value || '').replace(/\s+/g, ' ').trim();

  function setAttr(node, name, value) {
    if (node && node.getAttribute(name) !== value) node.setAttribute(name, value);
  }

  function installStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${ROOT_ID} .${META_CLASS}{
        display:flex;
        align-items:center;
        justify-content:center;
        flex-wrap:wrap;
        gap:8px 10px;
        margin:16px auto 0;
        color:#475569;
        font-size:12px;
        font-weight:700;
        line-height:1.35;
      }
      #${ROOT_ID} .${META_CLASS} span{
        display:inline-flex;
        align-items:center;
        min-height:30px;
        padding:6px 10px;
        border:1px solid rgba(15,23,42,.10);
        border-radius:999px;
        background:#fff;
        box-shadow:0 3px 10px rgba(15,23,42,.035);
      }
      #${ROOT_ID} .${META_CLASS} .sd-testimonial-mobile-hint-v1{display:none;}

      @media (max-width:640px){
        #${ROOT_ID} .sd-v305-head{margin-bottom:24px !important;}
        #${ROOT_ID} .${META_CLASS}{
          width:calc(100% - 8px);
          margin-top:13px;
          gap:7px;
          font-size:11px;
        }
        #${ROOT_ID} .${META_CLASS} span{min-height:28px;padding:5px 9px;}
        #${ROOT_ID} .${META_CLASS} .sd-testimonial-mobile-hint-v1{display:inline-flex;}

        #${ROOT_ID} .sd-v305-viewport{
          overflow-x:auto !important;
          overflow-y:hidden !important;
          scroll-snap-type:x mandatory !important;
          scroll-padding-inline:16px !important;
          overscroll-behavior-x:contain !important;
          -webkit-overflow-scrolling:touch !important;
          scrollbar-width:none !important;
        }
        #${ROOT_ID} .sd-v305-viewport::-webkit-scrollbar{display:none !important;}
        #${ROOT_ID} .sd-v305-track{
          animation:none !important;
          transform:none !important;
          will-change:auto !important;
        }
        #${ROOT_ID} .sd-v305-set:first-child{padding-left:16px !important;}
        #${ROOT_ID} .sd-v305-set:nth-child(2){display:none !important;}
        #${ROOT_ID} .sd-v305-card{
          scroll-snap-align:start !important;
          scroll-snap-stop:always !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function makeMeta() {
    const meta = document.createElement('div');
    meta.className = META_CLASS;
    meta.setAttribute('aria-label', 'Testimonial section details');
    meta.innerHTML = '<span>6 learner videos</span><span>Tap any story to watch</span><span class="sd-testimonial-mobile-hint-v1">Swipe to browse</span>';
    return meta;
  }

  function labelCards(root) {
    const sets = Array.from(root.querySelectorAll('.sd-v305-set'));
    sets.forEach((set, setIndex) => {
      const cards = Array.from(set.querySelectorAll('.sd-v305-card'));
      cards.forEach((card, index) => {
        const number = (index % 6) + 1;
        setAttr(card, 'role', 'group');
        setAttr(card, 'aria-label', `Learner video testimonial ${number} of 6`);
        const button = card.querySelector('.sd-v305-open');
        if (button) {
          setAttr(button, 'aria-label', `Watch learner video testimonial ${number} of 6`);
          if (setIndex > 0) setAttr(button, 'tabindex', '-1');
        }
      });
    });
  }

  function updatePill(pill) {
    if (clean(pill.textContent) === PILL) return;
    const dot = pill.querySelector('.sd-v305-pill-dot');
    if (!dot) {
      pill.textContent = PILL;
      return;
    }
    Array.from(pill.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) node.remove();
    });
    pill.appendChild(document.createTextNode(PILL));
  }

  function apply() {
    installStyle();
    const root = document.getElementById(ROOT_ID);
    if (!root) return false;

    const pill = root.querySelector('.sd-v305-pill');
    const desc = root.querySelector('.sd-v305-desc');
    if (!pill || !desc) return false;

    updatePill(pill);
    if (clean(desc.textContent) !== DESC) desc.textContent = DESC;

    let meta = root.querySelector(`.${META_CLASS}`);
    if (!meta) {
      meta = makeMeta();
      desc.insertAdjacentElement('afterend', meta);
    }

    labelCards(root);
    setAttr(root, 'data-sd-testimonials-conversion', 'v1');
    setAttr(root, 'data-sd-testimonial-count', '6');
    return true;
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      apply();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }
  window.addEventListener('load', apply, { once: true });

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  [250, 700, 1400, 2600, 4200, 7000, 11000].forEach(ms => setTimeout(apply, ms));
  setTimeout(() => {
    observer.disconnect();
    apply();
  }, 13000);
})();
