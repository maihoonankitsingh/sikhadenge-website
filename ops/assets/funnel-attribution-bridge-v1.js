(function () {
  'use strict';
  if (window.__sdFunnelAttributionBridgeV1) return;
  window.__sdFunnelAttributionBridgeV1 = true;

  var STORE_KEY = 'sd_funnel_attribution_v1';
  var ANON_KEY = 'sd_anonymous_id_v1';
  var SESSION_KEY = 'sd_session_id_v1';
  var REGISTER_PATH = '/gen-ai-masterclass/register-one-step';
  var KEYS = [
    'utm_source','utm_medium','utm_campaign','utm_content','utm_term','utm_id',
    'utm_campaign_id','utm_adset_id','utm_ad_id','fbclid','gclid','msclkid'
  ];
  var ALIASES = {
    utm_campaign_id: ['utm_campaign_id','campaign_id'],
    utm_adset_id: ['utm_adset_id','adset_id'],
    utm_ad_id: ['utm_ad_id','ad_id']
  };

  function safeGet(storage, key) { try { return storage.getItem(key); } catch (_) { return null; } }
  function safeSet(storage, key, value) { try { storage.setItem(key, value); } catch (_) {} }
  function parseJson(value) { try { return value ? JSON.parse(value) : null; } catch (_) { return null; } }
  function uid(prefix) {
    try { if (crypto && crypto.randomUUID) return prefix + '_' + crypto.randomUUID(); } catch (_) {}
    return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 12);
  }
  function cookie(name) {
    var parts = document.cookie ? document.cookie.split(';') : [];
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i].trim();
      if (p.indexOf(name + '=') === 0) return decodeURIComponent(p.slice(name.length + 1));
    }
    return '';
  }
  function readParam(sp, key) {
    var names = ALIASES[key] || [key];
    for (var i = 0; i < names.length; i++) {
      var value = sp.get(names[i]);
      if (value && value.trim()) return value.trim().slice(0, 500);
    }
    return '';
  }
  function currentParams() {
    var sp = new URLSearchParams(window.location.search || '');
    var out = {};
    KEYS.forEach(function (key) {
      var value = readParam(sp, key);
      if (value) out[key] = value;
    });
    return out;
  }
  function funnelName() {
    var p = window.location.pathname;
    if (p === '/masterclass/ai-video') return 'ai-video-masterclass';
    if (p === '/masterclass/claude/free') return 'claude-masterclass';
    return '';
  }
  function touch(params) {
    var out = {};
    KEYS.forEach(function (key) { if (params[key]) out[key] = params[key]; });
    out.landingPage = window.location.href.slice(0, 1900);
    out.referrer = (document.referrer || '').slice(0, 1900);
    out.capturedAt = new Date().toISOString();
    var funnel = funnelName();
    if (funnel) out.funnel = funnel;
    return out;
  }
  function meaningful(obj) {
    if (!obj) return false;
    for (var i = 0; i < KEYS.length; i++) if (obj[KEYS[i]]) return true;
    return false;
  }
  function merge(a, b) {
    var out = {};
    if (a) Object.keys(a).forEach(function (k) { if (a[k] !== undefined && a[k] !== null && a[k] !== '') out[k] = a[k]; });
    if (b) Object.keys(b).forEach(function (k) { if (b[k] !== undefined && b[k] !== null && b[k] !== '') out[k] = b[k]; });
    return out;
  }

  var anonymousId = safeGet(localStorage, ANON_KEY) || uid('anon');
  safeSet(localStorage, ANON_KEY, anonymousId);
  var sessionId = safeGet(sessionStorage, SESSION_KEY) || uid('sess');
  safeSet(sessionStorage, SESSION_KEY, sessionId);

  var prior = parseJson(safeGet(localStorage, STORE_KEY)) || {};
  var nowParams = currentParams();
  var nowTouch = touch(nowParams);
  var state = {
    version: 1,
    anonymousId: anonymousId,
    sessionId: sessionId,
    firstTouch: prior.firstTouch || nowTouch,
    lastTouch: meaningful(nowParams) ? merge(prior.lastTouch, nowTouch) : (prior.lastTouch || nowTouch),
    updatedAt: new Date().toISOString()
  };
  safeSet(localStorage, STORE_KEY, JSON.stringify(state));
  window.__sdFunnelAttributionV1 = state;

  function effective() {
    var out = {};
    out = merge(out, state.firstTouch || {});
    out = merge(out, state.lastTouch || {});
    out = merge(out, currentParams());
    return out;
  }
  function enrichRegistrationUrl(raw) {
    try {
      var u = new URL(raw, window.location.href);
      if (u.origin !== window.location.origin || u.pathname !== REGISTER_PATH) return raw;
      var e = effective();
      KEYS.forEach(function (key) {
        if (!u.searchParams.get(key) && e[key]) u.searchParams.set(key, e[key]);
      });
      if (!u.searchParams.get('source')) {
        var f = funnelName() || (state.lastTouch && state.lastTouch.funnel) || '';
        if (f) u.searchParams.set('source', f);
      }
      return u.pathname + (u.search ? u.search : '') + (u.hash ? u.hash : '');
    } catch (_) { return raw; }
  }
  function rewriteAnchor(a) {
    if (!a || !a.getAttribute) return;
    var raw = a.getAttribute('href');
    if (!raw || raw.indexOf(REGISTER_PATH) === -1) return;
    var next = enrichRegistrationUrl(raw);
    if (next !== raw) a.setAttribute('href', next);
  }
  function rewriteAll() {
    var anchors = document.querySelectorAll('a[href*="' + REGISTER_PATH + '"]');
    for (var i = 0; i < anchors.length; i++) rewriteAnchor(anchors[i]);
  }

  document.addEventListener('pointerdown', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
    rewriteAnchor(a);
  }, true);
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
    rewriteAnchor(a);
  }, true);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', rewriteAll, { once: true });
  else rewriteAll();

  if (window.location.pathname === REGISTER_PATH) {
    var e = effective();
    var current = new URL(window.location.href);
    var changed = false;
    KEYS.forEach(function (key) {
      if (!current.searchParams.get(key) && e[key]) { current.searchParams.set(key, e[key]); changed = true; }
    });
    if (!current.searchParams.get('source')) {
      var lastFunnel = (state.lastTouch && state.lastTouch.funnel) || (state.firstTouch && state.firstTouch.funnel) || '';
      if (lastFunnel) { current.searchParams.set('source', lastFunnel); changed = true; }
    }
    if (changed) history.replaceState(history.state, '', current.pathname + current.search + current.hash);

    var originalFetch = window.fetch;
    if (typeof originalFetch === 'function' && !window.__sdLeadFetchBridgeV1) {
      window.__sdLeadFetchBridgeV1 = true;
      window.fetch = function (input, init) {
        try {
          var requestUrl = typeof input === 'string' ? input : (input && input.url) || '';
          var method = String((init && init.method) || (input && input.method) || 'GET').toUpperCase();
          var parsedUrl = new URL(requestUrl, window.location.href);
          if (method === 'POST' && parsedUrl.pathname === '/api/masterclass/lead' && init && typeof init.body === 'string') {
            var body = JSON.parse(init.body);
            var attr = effective();
            KEYS.forEach(function (key) { if (!body[key] && attr[key]) body[key] = attr[key]; });
            if (!body.source) body.source = (state.lastTouch && state.lastTouch.funnel) || 'website';
            if (!body.landingUrl) body.landingUrl = (state.firstTouch && state.firstTouch.landingPage) || window.location.href;
            if (!body.referrer) body.referrer = (state.firstTouch && state.firstTouch.referrer) || document.referrer || '';
            if (!body.fbp) body.fbp = cookie('_fbp') || undefined;
            if (!body.fbc) body.fbc = cookie('_fbc') || undefined;
            body.anonymousId = body.anonymousId || anonymousId;
            body.sessionId = body.sessionId || sessionId;
            body.firstTouch = body.firstTouch || state.firstTouch || null;
            body.lastTouch = body.lastTouch || state.lastTouch || null;
            init = Object.assign({}, init, { body: JSON.stringify(body) });
          }
        } catch (_) {}
        return originalFetch.call(this, input, init);
      };
    }
  }
})();
