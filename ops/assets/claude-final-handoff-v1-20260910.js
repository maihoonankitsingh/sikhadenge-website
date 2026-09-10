(() => {
  'use strict';

  if (location.pathname !== '/masterclass/claude/free') return;
  if (window.__CLAUDE_FINAL_HANDOFF_V1__) return;
  window.__CLAUDE_FINAL_HANDOFF_V1__ = true;

  const SECTION_ATTR = 'data-sd-claude-final-handoff-v1';
  const STYLE_ID = 'sd-claude-final-handoff-v1-style';
  const REG_PATH = '/gen-ai-masterclass/register-one-step';
  const HEADING_HTML = 'Ready to build your first practical <span class="sd-heading-v11-highlight">AI workflow?</span>';
  const BODY_COPY = 'Join the free live masterclass and learn Claude + 25+ AI tools for real work — step by step, in easy Hinglish.';

  function normalize(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function findSection() {
    return [...document.querySelectorAll('main section')].find((section) => {
      const eyebrow = section.querySelector('span');
      return normalize(eyebrow?.textContent) === 'NEXT LIVE BATCH' &&
        !![...section.querySelectorAll('a[href]')].find((a) => {
          try { return new URL(a.href, location.href).pathname === REG_PATH; } catch { return false; }
        });
    }) || null;
  }

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      html body section[${SECTION_ATTR}="1"] .sd-final-handoff-box-v1 {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 0 !important;
        text-align: center !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-final-handoff-copy-v1 {
        width: min(100%, 820px) !important;
        margin: 0 auto !important;
        text-align: center !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-final-handoff-copy-v1 h2 {
        max-width: 780px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        text-align: center !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-final-handoff-copy-v1 > p {
        max-width: 720px !important;
        margin: 15px auto 0 !important;
        text-align: center !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-final-handoff-signals-v1 {
        display: flex !important;
        flex-wrap: wrap !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 9px !important;
        margin: 18px auto 0 !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-final-handoff-signal-v1 {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        min-height: 34px !important;
        padding: 7px 12px !important;
        border: 1px solid rgba(255,255,255,.18) !important;
        border-radius: 999px !important;
        background: rgba(255,255,255,.08) !important;
        color: rgba(255,255,255,.9) !important;
        font-size: 12.5px !important;
        line-height: 1.2 !important;
        font-weight: 650 !important;
        letter-spacing: -.005em !important;
        white-space: nowrap !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-final-handoff-signal-v1::before {
        content: '✓' !important;
        margin-right: 6px !important;
        color: #FFE1D6 !important;
        font-size: 12px !important;
        font-weight: 800 !important;
      }

      html body section[${SECTION_ATTR}="1"] a[data-sd-final-handoff-cta-v1="1"] {
        width: min(100%, 340px) !important;
        margin: 28px auto 0 !important;
        justify-self: auto !important;
        align-self: center !important;
        justify-content: center !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-final-handoff-note-v1 {
        margin: 10px auto 0 !important;
        color: rgba(255,255,255,.68) !important;
        font-size: 12.5px !important;
        line-height: 1.45 !important;
        font-weight: 520 !important;
        text-align: center !important;
      }

      @media (max-width: 768px) {
        html body section[${SECTION_ATTR}="1"] .sd-final-handoff-copy-v1 {
          width: min(100%, 640px) !important;
        }
        html body section[${SECTION_ATTR}="1"] .sd-final-handoff-copy-v1 > p {
          max-width: 610px !important;
        }
        html body section[${SECTION_ATTR}="1"] .sd-final-handoff-signals-v1 {
          gap: 8px !important;
          margin-top: 16px !important;
        }
        html body section[${SECTION_ATTR}="1"] a[data-sd-final-handoff-cta-v1="1"] {
          margin-top: 24px !important;
          width: min(100%, 330px) !important;
        }
      }

      @media (max-width: 430px) {
        html body section[${SECTION_ATTR}="1"] .sd-final-handoff-copy-v1 > p {
          margin-top: 13px !important;
          font-size: 15px !important;
          line-height: 1.62 !important;
        }
        html body section[${SECTION_ATTR}="1"] .sd-final-handoff-signals-v1 {
          max-width: 330px !important;
        }
        html body section[${SECTION_ATTR}="1"] .sd-final-handoff-signal-v1 {
          min-height: 32px !important;
          padding: 6px 10px !important;
          font-size: 12px !important;
        }
        html body section[${SECTION_ATTR}="1"] a[data-sd-final-handoff-cta-v1="1"] {
          width: min(100%, 320px) !important;
        }
        html body section[${SECTION_ATTR}="1"] .sd-final-handoff-note-v1 {
          font-size: 12px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function render() {
    const section = findSection();
    if (!section) return false;
    const box = section.firstElementChild;
    if (!box) return false;
    const copy = box.firstElementChild;
    if (!copy) return false;
    const h2 = copy.querySelector('h2');
    const p = copy.querySelector('p');
    const cta = [...box.querySelectorAll('a[href]')].find((a) => {
      try { return new URL(a.href, location.href).pathname === REG_PATH; } catch { return false; }
    });
    if (!h2 || !p || !cta) return false;

    ensureStyle();
    section.setAttribute(SECTION_ATTR, '1');
    box.classList.add('sd-final-handoff-box-v1');
    copy.classList.add('sd-final-handoff-copy-v1');

    if (normalize(h2.textContent) !== 'Ready to build your first practical AI workflow?') {
      h2.innerHTML = HEADING_HTML;
    }
    if (normalize(p.textContent) !== BODY_COPY) p.textContent = BODY_COPY;

    let signals = copy.querySelector('.sd-final-handoff-signals-v1');
    if (!signals) {
      signals = document.createElement('div');
      signals.className = 'sd-final-handoff-signals-v1';
      signals.setAttribute('aria-label', 'Masterclass format');
      ['Live Online', 'Easy Hinglish', 'No Coding Required'].forEach((label) => {
        const item = document.createElement('span');
        item.className = 'sd-final-handoff-signal-v1';
        item.textContent = label;
        signals.appendChild(item);
      });
      p.insertAdjacentElement('afterend', signals);
    }

    cta.setAttribute('data-sd-final-handoff-cta-v1', '1');

    let note = box.querySelector('.sd-final-handoff-note-v1');
    if (!note) {
      note = document.createElement('div');
      note.className = 'sd-final-handoff-note-v1';
      note.textContent = 'Joining details follow after registration.';
      cta.insertAdjacentElement('afterend', note);
    }

    document.documentElement.setAttribute('data-claude-final-handoff-v1', '1');
    return true;
  }

  function boot() {
    render();
    [400, 900, 1600, 2800, 4500, 7500, 12000].forEach((ms) => setTimeout(render, ms));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
