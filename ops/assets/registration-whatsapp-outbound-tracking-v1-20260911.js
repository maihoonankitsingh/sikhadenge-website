/* SIKHADENGE_REGISTRATION_WHATSAPP_OUTBOUND_TRACKING_V1_START */
(() => {
  'use strict';

  if (window.__SD_REGISTRATION_WHATSAPP_OUTBOUND_TRACKING_V1__) return;
  window.__SD_REGISTRATION_WHATSAPP_OUTBOUND_TRACKING_V1__ = true;

  const CONSENT_KEY = 'sd_consent_v1';
  const POLICY_VERSION = '2026-07-15.1';
  const EVENT_NAME = 'whatsapp_community_outbound';
  const PAGE_PATH = '/gen-ai-masterclass/register-one-step';

  let manualIntentUntil = 0;
  let tracked = false;
  let observer = null;

  function readCookie(name) {
    const prefix = `${name}=`;
    for (const part of document.cookie.split(';')) {
      const item = part.trim();
      if (!item.startsWith(prefix)) continue;
      const raw = item.slice(prefix.length);
      try { return decodeURIComponent(raw); } catch (_) { return raw; }
    }
    return undefined;
  }

  function readConsent() {
    let raw = null;
    try { raw = localStorage.getItem(CONSENT_KEY); } catch (_) {}
    if (!raw) raw = readCookie(CONSENT_KEY);
    if (!raw) return null;

    try {
      const value = JSON.parse(raw);
      if (value.policyVersion !== POLICY_VERSION) return null;
      if (value.analytics !== 'granted' && value.analytics !== 'denied') return null;
      if (value.advertising !== 'granted' && value.advertising !== 'denied') return null;
      return value;
    } catch (_) {
      return null;
    }
  }

  function welcomeButton() {
    return document.querySelector('#sdv2-root [data-action="welcome"]');
  }

  function mark(method, status) {
    document.documentElement.setAttribute('data-sd-wa-outbound-tracking-v1', status);
    document.documentElement.setAttribute('data-sd-wa-outbound-method-v1', method);
  }

  function trackAttempt(method) {
    if (tracked) return;
    tracked = true;

    const consent = readConsent();
    if (!consent || consent.analytics !== 'granted' || typeof window.gtag !== 'function') {
      mark(method, 'consent-not-granted');
      return;
    }

    try {
      window.gtag('event', EVENT_NAME, {
        event_category: 'engagement',
        event_label: 'gen-ai-masterclass-whatsapp-community',
        page_path: PAGE_PATH,
        method,
        source: 'registration_confirmation',
        transport_type: 'beacon'
      });
      mark(method, 'sent');
    } catch (_) {
      mark(method, 'error');
    }
  }

  function inspect() {
    const button = welcomeButton();
    if (!button || tracked) return;

    const busy = button.dataset.sdV56R1Busy === '1';
    const opening = /Opening WhatsApp Community/i.test(button.textContent || '');
    if (!busy && !opening) return;

    const method = performance.now() <= manualIntentUntil ? 'manual' : 'auto';
    trackAttempt(method);
  }

  document.addEventListener('click', (event) => {
    const target = event.target && event.target.closest
      ? event.target.closest('#sdv2-root [data-action="welcome"]')
      : null;
    if (!target) return;
    manualIntentUntil = performance.now() + 2000;
  }, true);

  function boot() {
    inspect();
    if (observer) return;
    observer = new MutationObserver(inspect);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-sd-v56-r1-busy', 'disabled']
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
/* SIKHADENGE_REGISTRATION_WHATSAPP_OUTBOUND_TRACKING_V1_END */
