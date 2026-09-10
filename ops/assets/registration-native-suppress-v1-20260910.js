(() => {
  'use strict';

  if (window.__SD_REGISTRATION_NATIVE_SUPPRESS_V1__) return;
  window.__SD_REGISTRATION_NATIVE_SUPPRESS_V1__ = true;

  const norm = (value) => String(value || '').replace(/\s+/g, ' ').trim();

  function findNativeMain() {
    const candidates = [...document.querySelectorAll('main')].filter((main) => {
      if (main.closest('#sdv2-root') || main.querySelector('#sdv2-root')) return false;

      const form = main.querySelector('form');
      if (!form) return false;

      const text = norm(main.textContent);
      if (!text.includes('Book free masterclass')) return false;
      if (!text.includes('Direct registration on the same page.')) return false;

      const oldName = [...form.querySelectorAll('input')]
        .some((input) => input.getAttribute('placeholder') === 'Enter name');
      const oldSubmit = [...form.querySelectorAll('button,input[type="submit"]')]
        .some((button) => /Register for\s*₹1999\s*FREE/i.test(norm(button.textContent || button.value)));

      return oldName && oldSubmit;
    });

    return candidates.length === 1 ? candidates[0] : null;
  }

  function apply() {
    const v72Root = document.getElementById('sdv2-root');
    if (!v72Root) return false;

    const nativeMain = findNativeMain();
    if (!nativeMain) return false;

    nativeMain.setAttribute('data-sd-registration-native-suppressed', 'v1');
    nativeMain.setAttribute('aria-hidden', 'true');
    nativeMain.setAttribute('inert', '');
    try { nativeMain.inert = true; } catch (_) {}
    nativeMain.style.setProperty('display', 'none', 'important');

    v72Root.setAttribute('data-sd-registration-native-suppress', 'v1');
    document.documentElement.setAttribute('data-sd-registration-native-suppress-v1', '1');
    return true;
  }

  let queued = false;
  const run = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      apply();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }

  const observer = new MutationObserver(run);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
