'use strict';

const puppeteer = require('puppeteer-core');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function setField(page, selector, value) {
  await page.evaluate(({ selector, value }) => {
    const el = document.querySelector(selector);
    if (!el) throw new Error(`missing ${selector}`);
    const d = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    d.set.call(el, value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, { selector, value });
}

async function activate(page, selector, label) {
  const state = await page.evaluate(({ selector }) => {
    const el = document.querySelector(selector);
    if (!el) return { found: false };
    const c = getComputedStyle(el), r = el.getBoundingClientRect();
    const rendered = c.display !== 'none' && c.visibility !== 'hidden' && Number(c.opacity) !== 0 && r.width > 0 && r.height > 0;
    if (rendered) el.click();
    return { found: true, rendered, text: String(el.textContent || '').replace(/\s+/g, ' ').trim() };
  }, { selector });
  if (!state.found || !state.rendered) throw new Error(`${label} missing/not rendered: ${JSON.stringify(state)}`);
  await sleep(320);
}

async function runScenario(browser, scenario) {
  const { name, width, height, mobile, method, analytics } = scenario;
  const page = await browser.newPage();
  await page.setViewport({ width, height, isMobile: mobile, hasTouch: mobile });

  const badAssets = [], pageErrors = [], gtagEvents = [], outboundRequests = [];
  page.on('pageerror', (e) => pageErrors.push(String(e)));
  page.on('response', (r) => {
    const u = r.url();
    if (r.status() >= 400 && (/\.css(?:\?|$)/.test(u) || /\.js(?:\?|$)/.test(u))) badAssets.push(`${r.status()} ${u}`);
  });
  page.on('console', (msg) => {
    const text = msg.text();
    if (!text.startsWith('__SD_QA_GTAG__')) return;
    try { gtagEvents.push(JSON.parse(text.slice('__SD_QA_GTAG__'.length))); } catch (_) {}
  });

  const url = `https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=claude-masterclass&utm_source=internal_qa&utm_medium=e2e&utm_campaign=wa_outbound_${name}&utm_content=post_registration&qa_nonce=${Date.now()}`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(3500);

  const consent = { policyVersion: '2026-07-15.1', analytics, advertising: 'denied', updatedAt: new Date().toISOString() };
  await page.evaluate((consent) => {
    localStorage.setItem('sd_consent_v1', JSON.stringify(consent));
    window.gtag = (...args) => console.log('__SD_QA_GTAG__' + JSON.stringify(args));
  }, consent);

  const initial = await page.evaluate(() => {
    const scripts = [...document.scripts].map((s) => s.src || '');
    const root = document.getElementById('sdv2-root');
    return {
      path: location.pathname,
      tracker: scripts.filter((s) => s.includes('/registration-whatsapp-outbound-tracking-v1-20260911.js')).length,
      hot: scripts.filter((s) => s.includes('/registration-stable-hot-v72.js')).length,
      page1: scripts.filter((s) => s.includes('/registration-stable-page1-v72.js')).length,
      suppress: scripts.filter((s) => s.includes('/registration-native-suppress-v1-20260910.js')).length,
      rootVisible: !!root && getComputedStyle(root).display !== 'none' && root.getBoundingClientRect().width > 0,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2
    };
  });
  if (initial.path !== '/gen-ai-masterclass/register-one-step' || initial.tracker !== 1 || initial.hot !== 1 || initial.page1 !== 1 || initial.suppress !== 1 || !initial.rootVisible || initial.overflow || badAssets.length) {
    throw new Error(`${name} initial invariant: ${JSON.stringify({ initial, badAssets })}`);
  }

  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const u = req.url();
    if (req.method() === 'POST' && u.includes('/api/masterclass/lead')) {
      return req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: `qa-wa-${name}`, success: true }) });
    }
    if (req.method() === 'GET' && u.startsWith('https://sikhadenge.in/gen-ai-masterclass/welcome')) {
      return req.respond({ status: 200, contentType: 'text/html', body: '<!doctype html><html><body><a href="https://chat.whatsapp.com/QAOutboundTrackingV1">Join WhatsApp Community</a></body></html>' });
    }
    if (/^https:\/\/(?:chat\.whatsapp\.com|wa\.me|api\.whatsapp\.com|(?:www\.)?whatsapp\.com)\//i.test(u)) {
      outboundRequests.push(u);
      return req.abort('blockedbyclient');
    }
    req.continue();
  });

  await setField(page, '#sd-reg-name', 'QA WhatsApp Tracking');
  await setField(page, '#sd-reg-email', 'qa.whatsapp.tracking@example.com');
  await setField(page, '#sd-reg-phone', '9999999999');
  await activate(page, '#sdv2-root [data-action="details-next"]', `${name}: details-next`);
  await activate(page, '#sdv2-root [data-role]', `${name}: role`);
  await activate(page, '#sdv2-root [data-action="role-next"]', `${name}: role-next`);
  await activate(page, '#sdv2-root [data-goal]', `${name}: goal`);
  await activate(page, '#sdv2-root [data-laptop="true"]', `${name}: laptop`);
  await activate(page, '#sdv2-root [data-action="goal-next"]', `${name}: goal-next`);
  await activate(page, '#sdv2-root [data-action="submit"]', `${name}: submit`);

  const deadline = Date.now() + 5000;
  let welcome = false;
  while (Date.now() < deadline) {
    welcome = await page.evaluate(() => !!document.querySelector('#sdv2-root [data-action="welcome"]'));
    if (welcome) break;
    await sleep(80);
  }
  if (!welcome) throw new Error(`${name}: confirmation/welcome button missing`);

  if (method === 'manual') {
    await page.evaluate(() => document.querySelector('#sdv2-root [data-action="welcome"]').click());
  }

  await sleep(method === 'auto' ? 2600 : 1200);

  const waEvents = gtagEvents.filter((args) => Array.isArray(args) && args[0] === 'event' && args[1] === 'whatsapp_community_outbound');
  const leadEvents = gtagEvents.filter((args) => Array.isArray(args) && args[0] === 'event' && args[1] === 'generate_lead');
  const marker = await page.evaluate(() => ({
    status: document.documentElement.getAttribute('data-sd-wa-outbound-tracking-v1') || '',
    method: document.documentElement.getAttribute('data-sd-wa-outbound-method-v1') || '',
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2
  })).catch(() => ({ status: 'navigation-context-lost', method: '', overflow: false }));

  const expectedTracked = analytics === 'granted';
  const trackingOK = expectedTracked
    ? waEvents.length === 1 && waEvents[0][2]?.method === method && waEvents[0][2]?.page_path === '/gen-ai-masterclass/register-one-step'
    : waEvents.length === 0;
  const leadOK = expectedTracked ? leadEvents.length === 1 : leadEvents.length === 0;
  const outboundOK = outboundRequests.length >= 1;
  const markerOK = marker.status === 'navigation-context-lost' || (expectedTracked ? marker.status === 'sent' : marker.status === 'consent-not-granted');

  console.log('WA_OUTBOUND_TRACKING_V1', name, JSON.stringify({ initial, analytics, method, waEvents, leadEvents, outboundRequests, marker, trackingOK, leadOK, outboundOK, markerOK, badAssets, pageErrorCount: pageErrors.length }));

  await page.close();
  if (!trackingOK || !leadOK || !outboundOK || !markerOK || badAssets.length) {
    throw new Error(`${name} tracking QA failure`);
  }
}

(async () => {
  const browser = await puppeteer.launch({ executablePath: process.env.CHROME, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const scenarios = [
    { name: 'desktop-manual', width: 1440, height: 1000, mobile: false, method: 'manual', analytics: 'granted' },
    { name: 'tablet-auto', width: 768, height: 1024, mobile: true, method: 'auto', analytics: 'granted' },
    { name: 'mobile-auto', width: 390, height: 844, mobile: true, method: 'auto', analytics: 'granted' },
    { name: 'mobile-denied', width: 390, height: 844, mobile: true, method: 'manual', analytics: 'denied' }
  ];
  try {
    for (const scenario of scenarios) await runScenario(browser, scenario);
    console.log('REGISTRATION_WHATSAPP_OUTBOUND_TRACKING_V1_QA_PASS');
  } finally {
    await browser.close();
  }
})().catch((e) => { console.error(e); process.exit(1); });
