'use strict';

const puppeteer = require('puppeteer-core');
const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim();

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });

  const failures = [];
  for (const [name, width, height, mobile] of [
    ['desktop', 1440, 1000, false],
    ['tablet', 768, 1024, true],
    ['mobile', 390, 844, true]
  ]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height, isMobile: mobile, hasTouch: mobile });

    const badAssets = [];
    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    page.on('response', (r) => {
      const u = r.url();
      if (r.status() >= 400 && (/\.css(?:\?|$)/.test(u) || /\.js(?:\?|$)/.test(u))) badAssets.push(`${r.status()} ${u}`);
    });

    const campaign = `section12_native_suppress_${name}`;
    const landing = `https://sikhadenge.in/masterclass/claude/free?utm_source=internal_qa&utm_medium=e2e&utm_campaign=${campaign}&utm_content=final_cta&qa_nonce=${Date.now()}`;
    await page.goto(landing, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 4500));

    const landingState = await page.evaluate(() => {
      const n = (s) => String(s || '').replace(/\s+/g, ' ').trim();
      const sections = [...document.querySelectorAll('main section')];
      const final = sections[17];
      const cta = final?.querySelector('a[href]');
      return { sections: sections.length, h1: n(document.querySelector('h1')?.textContent), finalText: n(final?.innerText), ctaPath: cta ? new URL(cta.href, location.href).pathname : '', ctaHref: cta?.href || '', overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2 };
    });
    if (landingState.sections !== 18 || !landingState.h1.includes('Master Claude + 25+ AI Tools') || !landingState.finalText.includes('Ready to build your first practical AI workflow?') || landingState.ctaPath !== '/gen-ai-masterclass/register-one-step' || landingState.overflow) throw new Error(`${name} landing regression: ${JSON.stringify(landingState)}`);

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }),
      page.evaluate(() => document.querySelectorAll('main section')[17].querySelector('a[href]').click())
    ]);
    await new Promise((r) => setTimeout(r, 4500));
    await page.evaluate(() => { const n = (s) => String(s || '').replace(/\s+/g, ' ').trim(); [...document.querySelectorAll('button')].find((b) => /Reject non-essential/i.test(n(b.textContent)))?.click(); });
    await new Promise((r) => setTimeout(r, 350));

    const registrationState = await page.evaluate(() => {
      const n = (s) => String(s || '').replace(/\s+/g, ' ').trim();
      const visible = (el) => { if (!el) return false; const c = getComputedStyle(el), r = el.getBoundingClientRect(); return c.display !== 'none' && c.visibility !== 'hidden' && Number(c.opacity) !== 0 && r.width > 0 && r.height > 0; };
      const nativeMain = [...document.querySelectorAll('main')].find((m) => { if (m.closest('#sdv2-root') || m.querySelector('#sdv2-root')) return false; const text = n(m.textContent); return text.includes('Book free masterclass') && text.includes('Direct registration on the same page.'); });
      const root = document.getElementById('sdv2-root');
      const oldSubmit = nativeMain ? [...nativeMain.querySelectorAll('button,input[type="submit"]')].find((el) => /Register for\s*₹1999\s*FREE/i.test(n(el.textContent || el.value))) : null;
      const newContinue = root?.querySelector('[data-action="details-next"]');
      const scriptCount = [...document.scripts].filter((s) => (s.src || '').includes('/registration-native-suppress-v1-20260910.js')).length;
      const params = Object.fromEntries(new URLSearchParams(location.search));
      return { path: location.pathname, params, scriptCount, htmlFlag: document.documentElement.getAttribute('data-sd-registration-native-suppress-v1') || '', rootFlag: root?.getAttribute('data-sd-registration-native-suppress') || '', rootVisible: visible(root), rootPosition: root ? getComputedStyle(root).position : '', rootZ: root ? Number(getComputedStyle(root).zIndex) : 0, nativeFound: !!nativeMain, nativeDisplay: nativeMain ? getComputedStyle(nativeMain).display : '', nativeAriaHidden: nativeMain?.getAttribute('aria-hidden') || '', nativeInert: nativeMain ? nativeMain.inert === true || nativeMain.hasAttribute('inert') : false, nativeMarker: nativeMain?.getAttribute('data-sd-registration-native-suppressed') || '', nativeVisible: visible(nativeMain), oldSubmitVisible: visible(oldSubmit), newContinueVisible: visible(newContinue), bodyHasOldText: n(document.body.innerText).includes('Book free masterclass'), bodyHasV72Text: n(document.body.innerText).includes('Reserve your free seat'), overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2 };
    });

    const keyboardFocus = [];
    await page.evaluate(() => { document.body.focus(); });
    for (let i = 0; i < 12; i++) { await page.keyboard.press('Tab'); keyboardFocus.push(await page.evaluate(() => { const e = document.activeElement; return { id: e?.id || '', placeholder: e?.getAttribute?.('placeholder') || '', text: String(e?.textContent || e?.value || '').replace(/\s+/g, ' ').trim().slice(0, 120) }; })); }
    const oldKeyboardHit = keyboardFocus.some((f) => f.placeholder === 'Enter name' || f.placeholder === 'Email' || f.placeholder === 'Phone number' || /Register for\s*₹1999/i.test(f.text));
    const v72KeyboardHit = keyboardFocus.some((f) => ['sd-reg-name', 'sd-reg-email', 'sd-reg-phone'].includes(f.id) || /Continue\s*—\s*2 quick questions/i.test(f.text));
    const structuralOK = registrationState.path === '/gen-ai-masterclass/register-one-step' && registrationState.params.source === 'claude-masterclass' && registrationState.params.utm_source === 'internal_qa' && registrationState.params.utm_medium === 'e2e' && registrationState.params.utm_campaign === campaign && registrationState.params.utm_content === 'final_cta' && registrationState.scriptCount === 1 && registrationState.htmlFlag === '1' && registrationState.rootFlag === 'v1' && registrationState.rootVisible && registrationState.rootPosition === 'fixed' && registrationState.rootZ > 1000000 && registrationState.nativeFound && registrationState.nativeDisplay === 'none' && registrationState.nativeAriaHidden === 'true' && registrationState.nativeInert && registrationState.nativeMarker === 'v1' && !registrationState.nativeVisible && !registrationState.oldSubmitVisible && registrationState.newContinueVisible && !registrationState.bodyHasOldText && registrationState.bodyHasV72Text && !registrationState.overflow && !oldKeyboardHit && v72KeyboardHit;
    console.log('REG_NATIVE_SUPPRESS', name, JSON.stringify({ landingState, registrationState, keyboardFocus, structuralOK, badAssets, pageErrorCount: pageErrors.length }));
    if (!structuralOK || badAssets.length) { failures.push(`${name} suppression: ${JSON.stringify({ registrationState, keyboardFocus, badAssets })}`); await page.close(); continue; }

    const intercepted = [];
    await page.setRequestInterception(true);
    page.on('request', (req) => { const url = req.url(); if (req.method() === 'POST' && url.includes('/api/masterclass/lead')) { intercepted.push({ url, postData: req.postData() || '' }); return req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: `qa-intercepted-${name}`, success: true }) }); } if (req.isNavigationRequest() && /^https?:/.test(url) && !url.startsWith('https://sikhadenge.in/')) return req.abort(); req.continue(); });

    const setField = async (selector, value) => page.evaluate(({ selector, value }) => { const el = document.querySelector(selector); if (!el) throw new Error(`missing ${selector}`); const d = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value'); d.set.call(el, value); el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }, { selector, value });
    const activate = async (selector, label) => {
      const state = await page.evaluate(({ selector }) => { const el = document.querySelector(selector); if (!el) return { found: false }; const c = getComputedStyle(el), r = el.getBoundingClientRect(); const rendered = c.display !== 'none' && c.visibility !== 'hidden' && Number(c.opacity) !== 0 && r.width > 0 && r.height > 0; if (rendered) el.click(); return { found: true, rendered, tag: el.tagName, rect: [Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)], value: el.getAttribute('data-role') || el.getAttribute('data-goal') || el.getAttribute('data-laptop') || el.getAttribute('data-action') || '' }; }, { selector });
      console.log('REG_DYNAMIC_ACTIVATE', name, label, JSON.stringify(state));
      if (!state.found || !state.rendered) throw new Error(`${name}: ${label} missing/not rendered`);
      await new Promise((r) => setTimeout(r, 350));
    };

    await setField('#sd-reg-name', 'QA Section Twelve');
    await setField('#sd-reg-email', 'qa.section12@example.com');
    await setField('#sd-reg-phone', '9999999999');
    await activate('#sdv2-root [data-action="details-next"]', 'details-next');
    await activate('#sdv2-root [data-role]', 'role');
    await activate('#sdv2-root [data-action="role-next"]', 'role-next');
    await activate('#sdv2-root [data-goal]', 'goal');
    await activate('#sdv2-root [data-laptop="true"]', 'laptop');
    await activate('#sdv2-root [data-action="goal-next"]', 'goal-next');

    const submitState = await page.evaluate(() => { const el = document.querySelector('#sdv2-root [data-action="submit"]'); if (!el) return { found:false,visible:false }; const c=getComputedStyle(el),r=el.getBoundingClientRect(); return { found:true,visible:c.display!=='none'&&c.visibility!=='hidden'&&Number(c.opacity)!==0&&r.width>0&&r.height>0,text:String(el.textContent||'').replace(/\s+/g,' ').trim(),rect:[Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)] }; });
    console.log('REG_SUBMIT_STATE', name, JSON.stringify(submitState));
    if (!submitState.found || !submitState.visible) throw new Error(`${name}: submit action missing/not visible on bonus step`);
    await page.evaluate(() => document.querySelector('#sdv2-root [data-action="submit"]').click());

    const deadline = Date.now() + 5000; while (intercepted.length === 0 && Date.now() < deadline) await new Promise((r) => setTimeout(r, 100)); await new Promise((r) => setTimeout(r, 450));
    let payload=null; try { payload=intercepted[0]?JSON.parse(intercepted[0].postData):null; } catch (_) {}
    const confirmationState = await page.evaluate(() => { const n=(s)=>String(s||'').replace(/\s+/g,' ').trim(); const root=document.getElementById('sdv2-root'); const welcome=root?.querySelector('[data-action="welcome"]'); return { text:n(root?.innerText).slice(0,4500), welcomeVisible:!!welcome&&getComputedStyle(welcome).display!=='none'&&welcome.getBoundingClientRect().width>0, oldVisibleText:n(document.body.innerText).includes('Register for ₹1999'), overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+2 }; });
    const payloadOK=!!payload&&payload.name==='QA Section Twelve'&&payload.email==='qa.section12@example.com'&&payload.phone==='9999999999'&&!!payload.experience&&!!payload.goal&&typeof payload.laptop==='boolean'&&payload.utm_source==='internal_qa'&&payload.utm_medium==='e2e'&&payload.utm_campaign===campaign&&payload.utm_content==='final_cta';
    const confirmationOK=intercepted.length===1&&confirmationState.welcomeVisible&&!confirmationState.oldVisibleText&&!confirmationState.overflow;
    console.log('REG_E2E_INTERCEPTED',name,JSON.stringify({payload,payloadOK,confirmationState,confirmationOK,interceptedCount:intercepted.length}));
    if(!payloadOK||!confirmationOK) failures.push(`${name} E2E: ${JSON.stringify({payload,confirmationState,interceptedCount:intercepted.length})}`);
    await page.close();
  }
  await browser.close();
  if(failures.length) throw new Error(failures.join('\n'));
  console.log('REGISTRATION_NATIVE_SUPPRESS_V1_3VIEW_E2E_QA_PASS');
})().catch((e)=>{ console.error(e); process.exit(1); });
