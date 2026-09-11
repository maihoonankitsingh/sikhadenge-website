'use strict';

const puppeteer = require('puppeteer-core');
const URL_BASE = 'https://sikhadenge.in/gen-ai-masterclass/register-one-step';
const NEW_ASSET = '/registration-stable-page1-v72-step2-a11y-v1-20260911.js';
const OLD_ASSET = '/registration-stable-page1-v72-trust-sync-v1-20260911.js';
const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
const knownReactError = e => /Minified React error #(418|423|425)/.test(String(e));
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run(browser, cfg) {
  const page = await browser.newPage();
  await page.setViewport({ width: cfg.width, height: cfg.height, isMobile: cfg.mobile, hasTouch: cfg.mobile });

  const leadWrites = [];
  const badAssets = [];
  const errors = [];
  await page.setRequestInterception(true);
  page.on('request', req => {
    if (req.method() === 'POST' && /\/api\/masterclass\/lead(?:\?|$)/.test(req.url())) {
      leadWrites.push({ url: req.url(), body: req.postData() || '' });
      req.abort('blockedbyclient').catch(() => {});
      return;
    }
    req.continue().catch(() => {});
  });
  page.on('pageerror', e => errors.push(String(e)));
  page.on('response', r => {
    const u = r.url();
    if (r.status() >= 400 && (/\.css(?:\?|$)/.test(u) || /\.js(?:\?|$)/.test(u) || r.request().resourceType() === 'document')) {
      badAssets.push(`${r.status()} ${r.request().resourceType()} ${u}`);
    }
  });

  const url = `${URL_BASE}?source=claude-masterclass&utm_source=qa&utm_medium=internal&utm_campaign=step2-a11y-v1-${cfg.name}&_=${Date.now()}`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(3500);

  const page1 = await page.evaluate(({ NEW_ASSET, OLD_ASSET }) => {
    const n = s => String(s || '').replace(/\s+/g, ' ').trim();
    const visible = el => {
      if (!el) return false;
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || 1) > 0;
    };
    const body = n(document.body.innerText);
    const scripts = [...document.scripts].map(s => s.src || '').filter(Boolean);
    return {
      body: body.slice(0, 3400),
      fields: ['sd-reg-name', 'sd-reg-email', 'sd-reg-phone'].map(id => {
        const el = document.getElementById(id), r = el?.getBoundingClientRect();
        return { id, exists: !!el, visible: visible(el), required: !!el?.required, h: r ? Math.round(r.height) : 0 };
      }),
      button: n([...document.querySelectorAll('button')].find(b => visible(b) && /Continue — 2 quick questions/i.test(n(b.textContent)))?.textContent),
      newAsset: scripts.filter(s => s.includes(NEW_ASSET)).length,
      oldAsset: scripts.filter(s => s.includes(OLD_ASSET)).length,
      hotAsset: scripts.filter(s => s.includes('/registration-stable-hot-v72.js')).length,
      nativeSuppress: scripts.filter(s => s.includes('/registration-native-suppress-v1-20260910.js')).length,
      attr: localStorage.getItem('sd_funnel_attribution_v1'),
      a11yFlag: window.__SD_REG_STEP2_A11Y_V1__ === true,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
      legacyTrust: ['3 Hours Live', 'WhatsApp Joining Link', 'Bonus Resources'].filter(x => body.includes(x)),
      trust: {
        twoHours: body.includes('2 Hours Live'),
        whatsapp: body.includes('WhatsApp Community Access'),
        community: body.includes('5,00,000+ SikhaDenge Community'),
        live: /LIVE ACTIVITY/i.test(body),
      },
    };
  }, { NEW_ASSET, OLD_ASSET });

  const page1OK = page1.fields.every(f => f.exists && f.visible && f.required && f.h >= 44) &&
    /Continue — 2 quick questions/.test(page1.button) && page1.newAsset === 1 && page1.oldAsset === 0 &&
    page1.hotAsset === 1 && page1.nativeSuppress === 1 && !!page1.attr && page1.a11yFlag && !page1.overflow &&
    page1.legacyTrust.length === 0 && Object.values(page1.trust).every(Boolean);

  await page.evaluate(() => {
    const set = (id, value) => {
      const el = document.getElementById(id);
      const d = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
      d.set.call(el, value);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };
    set('sd-reg-name', 'QA Step Two A11y');
    set('sd-reg-email', 'qa.step2.a11y@example.com');
    set('sd-reg-phone', '9999999999');
    const btn = document.querySelector('#sdv2-root [data-action="details-next"]');
    if (!btn) throw new Error('details-next missing');
    btn.click();
  });
  await sleep(700);

  const step2Before = await page.evaluate(() => {
    const n = s => String(s || '').replace(/\s+/g, ' ').trim();
    const root = document.getElementById('sdv2-root');
    const oldButtons = [...root.querySelectorAll('.sd-v31-engine-hidden button')].map(el => ({
      text: n(el.textContent), tabIndex: el.tabIndex, disabled: el.disabled,
      ariaHidden: el.closest('.sd-v31-engine-hidden')?.getAttribute('aria-hidden') || '',
    }));
    const roles = [...root.querySelectorAll('.sd-step2-visual-v31 [data-role-index]')].map(el => ({
      text: n(el.textContent), tabIndex: el.tabIndex, pressed: el.getAttribute('aria-pressed'), disabled: el.disabled,
    }));
    const back = root.querySelector('.sd-step2-visual-v31 .sd-v31-back');
    const next = root.querySelector('.sd-step2-visual-v31 .sd-v31-next');
    return {
      text: n(root.innerText), oldButtons, roles,
      back: back ? { tabIndex: back.tabIndex, disabled: back.disabled, text: n(back.textContent) } : null,
      next: next ? { tabIndex: next.tabIndex, disabled: next.disabled, text: n(next.textContent) } : null,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
    };
  });

  const expectedRoles = ['Student / Fresher ✓', 'Working Professional ✓', 'Freelancer / Creator ✓', 'Business Owner / Founder ✓'];
  const step2BeforeOK = /STEP 2 · ABOUT YOU/i.test(step2Before.text) && /Which best describes you\?/i.test(step2Before.text) &&
    step2Before.oldButtons.length >= 6 && step2Before.oldButtons.every(x => x.tabIndex === -1 && x.ariaHidden === 'true' && !x.disabled) &&
    step2Before.roles.length === 4 && step2Before.roles.every((r, i) => r.text === expectedRoles[i] && r.tabIndex === 0 && !r.disabled) &&
    step2Before.back?.tabIndex === 0 && step2Before.next?.tabIndex === 0 && step2Before.next?.disabled === true && !step2Before.overflow;

  await page.evaluate(() => {
    const first = document.querySelector('#sdv2-root .sd-step2-visual-v31 [data-role-index="0"]');
    if (!first) throw new Error('visible Student/Fresher role missing');
    first.click();
  });
  await sleep(350);

  const step2Selected = await page.evaluate(() => {
    const root = document.getElementById('sdv2-root');
    const first = root.querySelector('.sd-step2-visual-v31 [data-role-index="0"]');
    const next = root.querySelector('.sd-step2-visual-v31 .sd-v31-next');
    const hiddenStudent = root.querySelector('.sd-v31-engine-hidden [data-role="Student"]');
    return {
      pressed: first?.getAttribute('aria-pressed'), nextDisabled: !!next?.disabled,
      hiddenTab: hiddenStudent?.tabIndex, hiddenDisabled: !!hiddenStudent?.disabled,
    };
  });
  const selectionOK = step2Selected.pressed === 'true' && step2Selected.nextDisabled === false && step2Selected.hiddenTab === -1 && !step2Selected.hiddenDisabled;

  await page.evaluate(() => {
    const next = document.querySelector('#sdv2-root .sd-step2-visual-v31 .sd-v31-next');
    if (!next || next.disabled) throw new Error('visible Step2 Continue unavailable');
    next.click();
  });
  await sleep(700);

  const step3 = await page.evaluate(() => {
    const n = s => String(s || '').replace(/\s+/g, ' ').trim();
    const root = document.getElementById('sdv2-root');
    const hiddenFocusables = [...root.querySelectorAll('.sd-v31-engine-hidden button, .sd-v31-engine-hidden a[href], .sd-v31-engine-hidden input, .sd-v31-engine-hidden select, .sd-v31-engine-hidden textarea, .sd-v31-engine-hidden [tabindex]')];
    return {
      text: n(root.innerText).slice(0, 4200),
      hiddenFocusCount: hiddenFocusables.length,
      hiddenAllMinusOne: hiddenFocusables.every(el => el.tabIndex === -1),
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
    };
  });
  const step3OK = /Your Goal/i.test(step3.text) && step3.hiddenAllMinusOne && !step3.overflow;

  const unknownErrors = errors.filter(e => !knownReactError(e));
  const finalOK = page1OK && step2BeforeOK && selectionOK && step3OK && leadWrites.length === 0 && badAssets.length === 0 && unknownErrors.length === 0;
  console.log('REG_STEP2_A11Y_V1', cfg.name, JSON.stringify({ page1, step2Before, step2Selected, step3, leadWrites: leadWrites.length, badAssets, errors: errors.length, unknownErrors, finalOK }));
  if (!finalOK) throw new Error(`Registration Step2 A11y V1 QA failure ${cfg.name}`);
  await page.close();
}

(async () => {
  if (!process.env.CHROME) throw new Error('CHROME executable missing');
  const browser = await puppeteer.launch({ executablePath: process.env.CHROME, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  try {
    await run(browser, { name: 'desktop', width: 1440, height: 1000, mobile: false });
    await run(browser, { name: 'tablet', width: 768, height: 1024, mobile: true });
    await run(browser, { name: 'mobile', width: 390, height: 844, mobile: true });
  } finally {
    await browser.close();
  }
  console.log('REGISTRATION_STEP2_A11Y_V1_3VIEW_QA_PASS');
})().catch(err => { console.error(err); process.exit(1); });
