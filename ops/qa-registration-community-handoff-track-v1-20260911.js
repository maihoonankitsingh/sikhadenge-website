'use strict';

const puppeteer = require('puppeteer-core');

const URL_BASE = 'https://sikhadenge.in/gen-ai-masterclass/register-one-step';
const CURRENT_ASSET = '/registration-stable-hot-v72.js';
const TRACK_MARKER = 'SIKHADENGE_REGISTRATION_COMMUNITY_HANDOFF_TRACK_V1_START';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const waitNode = async (fn, timeout = 10000, step = 100) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (fn()) return true;
    await sleep(step);
  }
  return false;
};

async function runScenario(browser, cfg) {
  const page = await browser.newPage();
  await page.setViewport({
    width: cfg.width,
    height: cfg.height,
    isMobile: cfg.mobile,
    hasTouch: cfg.mobile,
  });

  const leadPosts = [];
  const gtagCalls = [];
  const waAttempts = [];
  const badAssets = [];
  const pageErrors = [];

  await page.exposeFunction('__qaCaptureGtag', (...args) => {
    gtagCalls.push(args);
  });

  await page.setRequestInterception(true);
  page.on('request', req => {
    const u = req.url();
    const method = req.method();

    if (method === 'POST' && u.includes('/api/masterclass/lead')) {
      let payload = null;
      try { payload = JSON.parse(req.postData() || '{}'); } catch {}
      leadPosts.push(payload);
      req.respond({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, id: `qa-${cfg.name}` }),
      }).catch(() => {});
      return;
    }

    if (method === 'GET' && u.includes('/gen-ai-masterclass/welcome')) {
      req.respond({
        status: 200,
        contentType: 'text/html',
        body: '<!doctype html><html><body><a href="https://wa.me/15551234567">QA WhatsApp</a></body></html>',
      }).catch(() => {});
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
    if (r.status() >= 400 && (/\.css(?:\?|$)/.test(u) || /\.js(?:\?|$)/.test(u))) {
      badAssets.push(`${r.status()} ${u}`);
    }
  });

  await page.goto(
    `${URL_BASE}?source=claude&utm_source=qa&utm_medium=e2e&utm_campaign=community-handoff-${cfg.name}&_=${Date.now()}`,
    { waitUntil: 'networkidle2', timeout: 60000 }
  );
  await sleep(2500);

  await page.evaluate(consentGranted => {
    localStorage.setItem('sd_consent_v1', JSON.stringify({
      policyVersion: '2026-07-15.1',
      analytics: consentGranted ? 'granted' : 'denied',
      advertising: 'denied',
      updatedAt: new Date().toISOString(),
    }));
    window.gtag = (...args) => {
      try { window.__qaCaptureGtag(...args); } catch {}
    };
  }, cfg.analyticsGranted);

  const before = await page.evaluate(({ CURRENT_ASSET, TRACK_MARKER }) => {
    const scripts = [...document.scripts].map(s => s.src || '');
    const html = document.documentElement;
    return Promise.all([
      fetch(`${CURRENT_ASSET}?v=20260903-131023&community_handoff_qa=${Date.now()}`, { cache: 'no-store' }).then(r => r.text()),
      Promise.resolve({
        currentAssetCount: scripts.filter(s => s.includes(CURRENT_ASSET)).length,
        nativeSuppress: scripts.filter(s => s.includes('/registration-native-suppress-v1-20260910.js')).length,
        overflow: html.scrollWidth > html.clientWidth + 2,
        name: !!document.querySelector('[data-field="name"]'),
        email: !!document.querySelector('[data-field="email"]'),
        phone: !!document.querySelector('[data-field="phone"]'),
      })
    ]).then(([source, state]) => ({ ...state, trackMarker: source.includes(TRACK_MARKER) }));
  }, { CURRENT_ASSET, TRACK_MARKER });

  if (before.currentAssetCount !== 1 || before.nativeSuppress !== 1 || !before.trackMarker || before.overflow || !before.name || !before.email || !before.phone) {
    throw new Error(`${cfg.name}: initial registration asset/layout assertion failed ${JSON.stringify(before)}`);
  }

  await page.type('[data-field="name"]', 'QA Registration No Lead');
  await page.type('[data-field="email"]', `qa-community-${Date.now()}@example.com`);
  await page.type('[data-field="phone"]', '9876543210');

  const clickPrimary = async () => {
    const clicked = await page.evaluate(() => {
      const buttons = [...document.querySelectorAll('.sdv2-actions .sdv2-btn.primary, .sdv2-actions .primary')];
      const btn = buttons.find(b => {
        const r = b.getBoundingClientRect();
        return !b.disabled && r.width > 0 && r.height > 0;
      });
      if (!btn) return false;
      btn.click();
      return true;
    });
    if (!clicked) throw new Error(`${cfg.name}: no visible primary button`);
  };

  await clickPrimary();
  await page.waitForSelector('[data-role]', { timeout: 10000 });
  await page.click('[data-role]');
  await clickPrimary();

  await page.waitForSelector('[data-goal]', { timeout: 10000 });
  await page.click('[data-goal]');
  await clickPrimary();

  await page.waitForSelector('[data-laptop]', { timeout: 10000 });
  await page.click('[data-laptop]');
  await clickPrimary();

  await page.waitForSelector('.sdv2-success', { timeout: 10000 });

  const successState = await page.evaluate(() => {
    const n = s => String(s || '').replace(/\s+/g, ' ').trim();
    const success = document.querySelector('.sdv2-success');
    const btn = document.querySelector('[data-action="welcome"]');
    const r = btn?.getBoundingClientRect();
    return {
      text: n(success?.innerText),
      hasButton: !!btn,
      buttonText: n(btn?.textContent),
      buttonRect: r ? { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } : null,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
    };
  });

  if (!successState.hasButton || !successState.text.includes('Join the WhatsApp Community') || successState.overflow) {
    throw new Error(`${cfg.name}: success UI assertion failed ${JSON.stringify(successState)}`);
  }

  if (cfg.mode === 'manual') {
    await page.click('[data-action="welcome"]');
  }

  const gotWa = await waitNode(() => waAttempts.length >= 1, 7000);
  if (!gotWa) throw new Error(`${cfg.name}: WhatsApp handoff navigation was not attempted`);

  await sleep(2200);

  const handoffCalls = gtagCalls.filter(args => args[0] === 'event' && args[1] === 'whatsapp_community_handoff');
  const leadCalls = gtagCalls.filter(args => args[0] === 'event' && args[1] === 'generate_lead');

  if (leadPosts.length !== 1) {
    throw new Error(`${cfg.name}: expected exactly one intercepted lead POST, got ${leadPosts.length}`);
  }

  const payload = leadPosts[0] || {};
  if (payload.name !== 'QA Registration No Lead' || payload.phone !== '9876543210' || payload.utm_source !== 'qa') {
    throw new Error(`${cfg.name}: intercepted payload regression ${JSON.stringify(payload)}`);
  }

  if (waAttempts.length !== 1) {
    throw new Error(`${cfg.name}: expected one WhatsApp navigation attempt, got ${waAttempts.length}`);
  }

  if (cfg.analyticsGranted) {
    if (handoffCalls.length !== 1) {
      throw new Error(`${cfg.name}: expected exactly one consented whatsapp_community_handoff event, got ${handoffCalls.length}`);
    }
    const params = handoffCalls[0][2] || {};
    if (params.event_category !== 'registration' || params.event_label !== 'whatsapp-community' || params.page_path !== '/gen-ai-masterclass/register-one-step') {
      throw new Error(`${cfg.name}: handoff event payload mismatch ${JSON.stringify(params)}`);
    }
    if (leadCalls.length !== 1) {
      throw new Error(`${cfg.name}: expected existing generate_lead event to remain exactly once, got ${leadCalls.length}`);
    }
  } else {
    if (handoffCalls.length !== 0) {
      throw new Error(`${cfg.name}: handoff analytics fired despite denied analytics consent`);
    }
    if (leadCalls.length !== 0) {
      throw new Error(`${cfg.name}: generate_lead fired despite denied analytics consent`);
    }
  }

  const unknownErrors = pageErrors.filter(e => !/Minified React error #(418|423|425)/.test(e));
  if (unknownErrors.length || badAssets.length) {
    throw new Error(`${cfg.name}: browser regression errors ${JSON.stringify({ unknownErrors, badAssets })}`);
  }

  console.log('REG_COMMUNITY_HANDOFF_V1', cfg.name, JSON.stringify({
    before,
    successState,
    analyticsGranted: cfg.analyticsGranted,
    mode: cfg.mode,
    leadPosts: leadPosts.length,
    waAttempts: waAttempts.length,
    handoffCalls: handoffCalls.length,
    leadCalls: leadCalls.length,
    pageErrors: pageErrors.length,
    badAssets,
  }));

  await page.close();
}

(async () => {
  const chrome = process.env.CHROME;
  if (!chrome) throw new Error('CHROME executable missing');

  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    await runScenario(browser, {
      name: 'desktop-manual-consent',
      width: 1440,
      height: 1000,
      mobile: false,
      analyticsGranted: true,
      mode: 'manual',
    });

    await runScenario(browser, {
      name: 'mobile-auto-consent',
      width: 390,
      height: 844,
      mobile: true,
      analyticsGranted: true,
      mode: 'auto',
    });

    await runScenario(browser, {
      name: 'mobile-manual-denied',
      width: 390,
      height: 844,
      mobile: true,
      analyticsGranted: false,
      mode: 'manual',
    });
  } finally {
    await browser.close();
  }

  console.log('REGISTRATION_COMMUNITY_HANDOFF_TRACK_V1_QA_PASS');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
