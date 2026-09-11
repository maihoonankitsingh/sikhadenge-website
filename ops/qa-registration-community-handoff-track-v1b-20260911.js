'use strict';

const puppeteer = require('puppeteer-core');

const URL_BASE = 'https://sikhadenge.in/gen-ai-masterclass/register-one-step';
const CURRENT_ASSET = '/registration-stable-hot-v72.js';
const TRACK_MARKER = 'SIKHADENGE_REGISTRATION_COMMUNITY_HANDOFF_TRACK_V1_START';
const sleep = ms => new Promise(r => setTimeout(r, ms));

function visibleState(el) {
  if (!el) return false;
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity) !== 0 && r.width > 0 && r.height > 0;
}

async function runScenario(browser, cfg) {
  const page = await browser.newPage();
  await page.setViewport({ width: cfg.width, height: cfg.height, isMobile: cfg.mobile, hasTouch: cfg.mobile });

  const leadPosts = [];
  const gtagCalls = [];
  const waAttempts = [];
  const badAssets = [];
  const pageErrors = [];

  await page.exposeFunction('__qaCaptureGtag', (...args) => gtagCalls.push(args));
  await page.setRequestInterception(true);

  page.on('request', req => {
    const u = req.url();
    if (req.method() === 'POST' && u.includes('/api/masterclass/lead')) {
      let payload = null;
      try { payload = JSON.parse(req.postData() || '{}'); } catch {}
      leadPosts.push(payload);
      req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, id: `qa-${cfg.name}` }) }).catch(() => {});
      return;
    }
    if (/^https:\/\/(?:wa\.me|chat\.whatsapp\.com|api\.whatsapp\.com|(?:www\.)?whatsapp\.com)\//i.test(u)) {
      waAttempts.push(u);
      req.abort('blockedbyclient').catch(() => {});
      return;
    }
    req.continue().catch(() => {});
  });

  page.on('pageerror', e => pageErrors.push(String(e)));
  page.on('response', r => {
    const u = r.url();
    if (r.status() >= 400 && (/\.css(?:\?|$)/.test(u) || /\.js(?:\?|$)/.test(u))) badAssets.push(`${r.status()} ${u}`);
  });

  await page.goto(`${URL_BASE}?source=claude&utm_source=qa&utm_medium=e2e&utm_campaign=community-handoff-v1b-${cfg.name}&_=${Date.now()}`, { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(2500);

  await page.evaluate(consentGranted => {
    localStorage.setItem('sd_consent_v1', JSON.stringify({
      policyVersion: '2026-07-15.1',
      analytics: consentGranted ? 'granted' : 'denied',
      advertising: 'denied',
      updatedAt: new Date().toISOString(),
    }));
    window.gtag = (...args) => { try { window.__qaCaptureGtag(...args); } catch {} };
  }, cfg.analyticsGranted);

  const before = await page.evaluate(async ({ CURRENT_ASSET, TRACK_MARKER }) => {
    const scripts = [...document.scripts].map(s => s.src || '');
    const source = await fetch(`${CURRENT_ASSET}?v=20260903-131023&community_handoff_v1b=${Date.now()}`, { cache: 'no-store' }).then(r => r.text());
    const html = document.documentElement;
    return {
      currentAssetCount: scripts.filter(s => s.includes(CURRENT_ASSET)).length,
      nativeSuppress: scripts.filter(s => s.includes('/registration-native-suppress-v1-20260910.js')).length,
      trackMarker: source.includes(TRACK_MARKER),
      overflow: html.scrollWidth > html.clientWidth + 2,
      name: !!document.querySelector('#sd-reg-name'),
      email: !!document.querySelector('#sd-reg-email'),
      phone: !!document.querySelector('#sd-reg-phone'),
    };
  }, { CURRENT_ASSET, TRACK_MARKER });

  if (before.currentAssetCount !== 1 || before.nativeSuppress !== 1 || !before.trackMarker || before.overflow || !before.name || !before.email || !before.phone) {
    throw new Error(`${cfg.name}: initial registration assertion failed ${JSON.stringify(before)}`);
  }

  const setField = async (selector, value) => page.evaluate(({ selector, value }) => {
    const el = document.querySelector(selector);
    if (!el) throw new Error(`missing ${selector}`);
    const d = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    d.set.call(el, value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, { selector, value });

  const activateVisible = async (selector, label) => {
    const state = await page.evaluate(({ selector }) => {
      const nodes = [...document.querySelectorAll(selector)];
      const el = nodes.find(node => {
        const cs = getComputedStyle(node), r = node.getBoundingClientRect();
        return !node.disabled && cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity) !== 0 && r.width > 0 && r.height > 0;
      });
      if (!el) return { found: false };
      const r = el.getBoundingClientRect();
      el.click();
      return { found: true, rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], value: el.getAttribute('data-action') || el.getAttribute('data-role') || el.getAttribute('data-goal') || el.getAttribute('data-laptop') || '' };
    }, { selector });
    console.log('REG_COMMUNITY_V1B_ACTIVATE', cfg.name, label, JSON.stringify(state));
    if (!state.found) throw new Error(`${cfg.name}: ${label} missing/not visible`);
    await sleep(350);
  };

  await setField('#sd-reg-name', 'QA Registration No Lead');
  await setField('#sd-reg-email', `qa-community-${Date.now()}@example.com`);
  await setField('#sd-reg-phone', '9876543210');

  // Proven V72 user flow: Details -> Role -> Goal+Laptop -> Bonus -> Submit -> Confirmation.
  await activateVisible('#sdv2-root [data-action="details-next"]', 'details-next');
  await activateVisible('#sdv2-root [data-role]', 'role');
  await activateVisible('#sdv2-root [data-action="role-next"]', 'role-next');
  await activateVisible('#sdv2-root [data-goal]', 'goal');
  await activateVisible('#sdv2-root [data-laptop="true"]', 'laptop');
  await activateVisible('#sdv2-root [data-action="goal-next"]', 'goal-next');
  await activateVisible('#sdv2-root [data-action="submit"]', 'bonus-submit');

  await page.waitForFunction(() => {
    const root = document.getElementById('sdv2-root');
    const btn = root?.querySelector('[data-action="welcome"]');
    if (!btn) return false;
    const cs = getComputedStyle(btn), r = btn.getBoundingClientRect();
    return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity) !== 0 && r.width > 0 && r.height > 0 && /REGISTRATION COMPLETE/i.test(root.innerText || '');
  }, { timeout: 10000 });

  const successState = await page.evaluate(() => {
    const n = s => String(s || '').replace(/\s+/g, ' ').trim();
    const root = document.getElementById('sdv2-root');
    const btn = root?.querySelector('[data-action="welcome"]');
    const r = btn?.getBoundingClientRect();
    return {
      text: n(root?.innerText),
      hasButton: !!btn,
      buttonText: n(btn?.textContent),
      buttonRect: r ? { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } : null,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
    };
  });

  if (!successState.hasButton || !successState.text.includes('Join the WhatsApp Community') || !successState.text.includes('REGISTRATION COMPLETE') || successState.overflow) {
    throw new Error(`${cfg.name}: confirmation UI assertion failed ${JSON.stringify(successState)}`);
  }

  if (cfg.mode === 'manual') await activateVisible('#sdv2-root [data-action="welcome"]', 'welcome');

  const waDeadline = Date.now() + 8000;
  while (waAttempts.length < 1 && Date.now() < waDeadline) await sleep(100);
  if (waAttempts.length < 1) throw new Error(`${cfg.name}: WhatsApp handoff navigation was not attempted`);
  await sleep(1200);

  const handoffCalls = gtagCalls.filter(args => args[0] === 'event' && args[1] === 'whatsapp_community_handoff');
  const leadCalls = gtagCalls.filter(args => args[0] === 'event' && args[1] === 'generate_lead');

  if (leadPosts.length !== 1) throw new Error(`${cfg.name}: expected one intercepted lead POST, got ${leadPosts.length}`);
  const payload = leadPosts[0] || {};
  if (payload.name !== 'QA Registration No Lead' || payload.phone !== '9876543210' || payload.utm_source !== 'qa') {
    throw new Error(`${cfg.name}: intercepted payload regression ${JSON.stringify(payload)}`);
  }
  if (waAttempts.length !== 1) throw new Error(`${cfg.name}: expected one WhatsApp navigation attempt, got ${waAttempts.length}`);

  if (cfg.analyticsGranted) {
    if (handoffCalls.length !== 1) throw new Error(`${cfg.name}: expected one consented whatsapp_community_handoff event, got ${handoffCalls.length}`);
    const params = handoffCalls[0][2] || {};
    if (params.event_category !== 'registration' || params.event_label !== 'whatsapp-community' || params.page_path !== '/gen-ai-masterclass/register-one-step') {
      throw new Error(`${cfg.name}: handoff event payload mismatch ${JSON.stringify(params)}`);
    }
    if (leadCalls.length !== 1) throw new Error(`${cfg.name}: expected existing generate_lead event once, got ${leadCalls.length}`);
  } else {
    if (handoffCalls.length !== 0) throw new Error(`${cfg.name}: handoff analytics fired despite denied consent`);
    if (leadCalls.length !== 0) throw new Error(`${cfg.name}: generate_lead fired despite denied consent`);
  }

  const unknownErrors = pageErrors.filter(e => !/Minified React error #(418|423|425)/.test(e));
  if (unknownErrors.length || badAssets.length) throw new Error(`${cfg.name}: browser regression ${JSON.stringify({ unknownErrors, badAssets })}`);

  console.log('REG_COMMUNITY_HANDOFF_V1B', cfg.name, JSON.stringify({
    before, successState, analyticsGranted: cfg.analyticsGranted, mode: cfg.mode,
    leadPosts: leadPosts.length, waAttempts: waAttempts.length,
    handoffCalls: handoffCalls.length, leadCalls: leadCalls.length,
    pageErrors: pageErrors.length, badAssets,
  }));

  await page.close();
}

(async () => {
  if (!process.env.CHROME) throw new Error('CHROME executable missing');
  const browser = await puppeteer.launch({ executablePath: process.env.CHROME, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  try {
    await runScenario(browser, { name: 'desktop-manual-consent', width: 1440, height: 1000, mobile: false, analyticsGranted: true, mode: 'manual' });
    await runScenario(browser, { name: 'mobile-auto-consent', width: 390, height: 844, mobile: true, analyticsGranted: true, mode: 'auto' });
    await runScenario(browser, { name: 'mobile-manual-denied', width: 390, height: 844, mobile: true, analyticsGranted: false, mode: 'manual' });
  } finally {
    await browser.close();
  }
  console.log('REGISTRATION_COMMUNITY_HANDOFF_TRACK_V1B_QA_PASS');
})().catch(err => { console.error(err); process.exit(1); });
