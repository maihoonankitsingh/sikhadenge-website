const puppeteer = require('puppeteer-core');

const EXPECT = 'Master Claude + 25+ AI Tools to Work Smarter, Create Faster & Get Better Results.';
const HERO_HTML = 'Master <mark>Claude + 25+ AI Tools</mark> to Work Smarter,<br>Create Faster &amp; Get Better Results.';

async function main() {
  const executablePath = process.env.CHROME;
  if (!executablePath) throw new Error('CHROME environment variable is required');

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  const failures = [];
  try {
    for (const [name, width, height, isMobile] of [
      ['desktop', 1440, 1000, false],
      ['mobile', 390, 844, true],
    ]) {
      const page = await browser.newPage();
      await page.setViewport({ width, height, isMobile, hasTouch: isMobile });
      const badAssets = [];
      page.on('response', (response) => {
        const url = response.url();
        if (response.status() >= 400 && (/\.css(?:\?|$)/.test(url) || /\.js(?:\?|$)/.test(url))) {
          badAssets.push(`${response.status()} ${url}`);
        }
      });

      await page.goto(`https://sikhadenge.in/masterclass/claude/free?hero_v12_qa=${name}&t=${Date.now()}`, {
        waitUntil: 'networkidle2',
        timeout: 60000,
      });
      await new Promise((resolve) => setTimeout(resolve, 1300));

      const state = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const rect = h1 ? h1.getBoundingClientRect() : null;
        return {
          h1: (h1?.textContent || '').replace(/\s+/g, ' ').trim(),
          marker: h1?.getAttribute('data-sd-claude-hero') || '',
          html: h1?.innerHTML || '',
          ctas: document.querySelectorAll('a[href="/gen-ai-masterclass/register-one-step"]').length,
          tracking: !!document.querySelector('script[src*="funnel-attribution-bridge-v1.js"]'),
          heroScript: !!document.querySelector('script[src*="claude-heading-v11-restore-current.js?v=hero-v12-20260910"]'),
          sections: document.querySelectorAll('main section').length,
          faq: document.querySelectorAll('section[data-sd-claude-faq-v2="1"] details').length,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          h1Left: rect?.left ?? null,
          h1Right: rect?.right ?? null,
          viewport: window.innerWidth,
        };
      });

      console.log(name, JSON.stringify(state), 'failedAssets=', badAssets.length);

      if (state.h1 !== EXPECT) failures.push(`${name}: unexpected H1: ${state.h1}`);
      if (state.marker !== 'v12') failures.push(`${name}: Hero v12 marker missing`);
      if (!state.html.includes('<mark>Claude + 25+ AI Tools</mark>')) failures.push(`${name}: mark treatment missing`);
      if (state.ctas < 7) failures.push(`${name}: CTA count regressed to ${state.ctas}`);
      if (!state.tracking) failures.push(`${name}: attribution bridge missing`);
      if (!state.heroScript) failures.push(`${name}: cache-busted hero script missing`);
      if (state.sections !== 18) failures.push(`${name}: section count ${state.sections}, expected 18`);
      if (state.faq !== 15) failures.push(`${name}: FAQ count ${state.faq}, expected 15`);
      if (state.overflow > 2) failures.push(`${name}: horizontal overflow ${state.overflow}px`);
      if (state.h1Left !== null && state.h1Left < -2) failures.push(`${name}: H1 clips left (${state.h1Left})`);
      if (state.h1Right !== null && state.h1Right > state.viewport + 2) failures.push(`${name}: H1 clips right (${state.h1Right}/${state.viewport})`);
      if (badAssets.length) failures.push(`${name}: failed CSS/JS: ${badAssets.join(' | ')}`);

      await page.close();
    }

    const ai = await browser.newPage();
    await ai.setViewport({ width: 1440, height: 1000 });
    const badAiAssets = [];
    ai.on('response', (response) => {
      const url = response.url();
      if (response.status() >= 400 && (/\.css(?:\?|$)/.test(url) || /\.js(?:\?|$)/.test(url))) {
        badAiAssets.push(`${response.status()} ${url}`);
      }
    });
    await ai.goto(`https://sikhadenge.in/masterclass/ai-video?hero_v12_control=1&t=${Date.now()}`, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });
    const aiState = await ai.evaluate(() => ({
      marker: document.body.innerText.includes('Create cinematic AI videos'),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }));
    console.log('ai-video-control', JSON.stringify(aiState), 'failedAssets=', badAiAssets.length);
    if (!aiState.marker) failures.push('AI Video control marker missing');
    if (aiState.overflow > 2) failures.push(`AI Video horizontal overflow ${aiState.overflow}px`);
    if (badAiAssets.length) failures.push(`AI Video failed CSS/JS: ${badAiAssets.join(' | ')}`);
    await ai.close();
  } finally {
    await browser.close();
  }

  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
  console.log('CLAUDE_HERO_V12_BROWSER_QA=PASS');
}

if (process.argv.includes('--preflight')) {
  // Preflight mutates only the browser DOM, never production source/config.
  (async () => {
    const executablePath = process.env.CHROME;
    if (!executablePath) throw new Error('CHROME environment variable is required');
    const browser = await puppeteer.launch({ executablePath, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
    try {
      for (const [name, width, height, isMobile] of [['desktop', 1440, 1000, false], ['mobile', 390, 844, true]]) {
        const page = await browser.newPage();
        await page.setViewport({ width, height, isMobile, hasTouch: isMobile });
        await page.goto(`https://sikhadenge.in/masterclass/claude/free?hero_v12_preflight=${name}&t=${Date.now()}`, { waitUntil: 'networkidle2', timeout: 60000 });
        const state = await page.evaluate((html) => {
          const h1 = document.querySelector('h1');
          if (!h1) return { missing: true };
          h1.innerHTML = html;
          const r = h1.getBoundingClientRect();
          return {
            missing: false,
            text: h1.textContent.replace(/\s+/g, ' ').trim(),
            left: r.left,
            right: r.right,
            viewport: window.innerWidth,
            overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          };
        }, HERO_HTML);
        console.log('preflight', name, JSON.stringify(state));
        if (state.missing || state.text !== EXPECT || state.overflow > 2 || state.left < -2 || state.right > state.viewport + 2) {
          throw new Error(`${name}: proposed hero does not fit safely: ${JSON.stringify(state)}`);
        }
        await page.close();
      }
    } finally {
      await browser.close();
    }
    console.log('CLAUDE_HERO_V12_PREFLIGHT=PASS');
  })().catch((error) => { console.error(error); process.exit(1); });
} else {
  main().catch((error) => { console.error(error); process.exit(1); });
}
