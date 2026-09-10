const puppeteer = require('puppeteer-core');

const norm = s => (s || '').replace(/\s+/g, ' ').replace(/,\s*/g, ',').trim();
const wantH1 = 'Master Claude + 25+ AI Tools to work smarter,create faster & get better results.';
const pill = 'LEARNER VIDEO TESTIMONIALS';
const title = 'Real learners. Real experiences.';
const desc = 'Watch 6 learner video testimonials and hear their Sikhadenge learning experience in their own words.';
const outcomes = [
  'Research a topic and turn it into presentation-ready insights',
  'Summarise long reports, PDFs & notes into clear action points',
  'Create structured presentations, emails & professional content faster',
  'Understand and improve code with AI-assisted workflows',
  'Work with Excel formulas & data using natural-language AI guidance',
  'Improve LinkedIn research, profile content & outreach workflows',
];
const agenda = [
  'Choose the right AI tool for the task',
  'Research, summarise & extract insights',
  'Create professional work faster',
  'Code & automate repetitive work',
  'Build a repeatable AI workflow',
];
const audience = [
  ['Working professionals & business owners','Apply AI to research, writing, planning and everyday digital work.'],
  ['Students & freshers','Use AI for projects, research and practical career preparation.'],
  ['Freelancers & creators','Research, create and deliver client work more efficiently with repeatable AI workflows.'],
  ['Job seekers & career switchers','Use AI for LinkedIn, interviews, research and faster skill-building.'],
];
const impactStats = ['1 in 4','+78M','70%','+69%','2×+','AI + Big Data'];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  const failures = [];

  for (const [name, width, height, mobile] of [
    ['desktop', 1440, 1000, false],
    ['tablet', 768, 1024, true],
    ['mobile', 390, 844, true],
  ]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height, isMobile: mobile, hasTouch: mobile });

    const badAssets = [];
    const pageErrors = [];
    page.on('response', response => {
      const url = response.url();
      if (response.status() >= 400 && (/\.css(?:\?|$)/.test(url) || /\.js(?:\?|$)/.test(url) || /ai-video-testimonials\//.test(url))) {
        badAssets.push(`${response.status()} ${url}`);
      }
    });
    page.on('pageerror', error => pageErrors.push(String(error)));

    await page.goto(`https://sikhadenge.in/masterclass/claude/free?testimonials_v1_qa=${name}-${Date.now()}`, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });
    await new Promise(resolve => setTimeout(resolve, 5000));

    const state = await page.evaluate(() => {
      const n = value => (value || '').replace(/\s+/g, ' ').trim();
      const h1 = document.querySelector('h1');
      const hero = h1?.closest('section') || h1?.parentElement?.parentElement;
      const proof = hero ? [...hero.querySelectorAll('[class*="proofCard"]')].slice(0, 3).map(card => (card.querySelector('strong')?.textContent || '').trim()) : [];

      const outcomeH2 = [...document.querySelectorAll('h2')].find(h => n(h.textContent) === 'What you can do with AI');
      const outcomeSection = outcomeH2?.closest('section');
      const outcomeItems = outcomeSection ? [...outcomeSection.querySelectorAll('[class*="itemText"]')].map(e => (e.textContent || '').trim()).slice(0, 6) : [];

      const agendaHeads = [...document.querySelectorAll('h3,h4')].map(e => n(e.textContent));

      const audienceEyebrow = [...document.querySelectorAll('span')].find(e => n(e.textContent) === 'WHO THIS MASTERCLASS IS FOR');
      const audienceSection = audienceEyebrow?.closest('section');
      const audienceCards = audienceSection ? [...audienceSection.querySelectorAll('article')].map(article => [
        (article.querySelector('strong')?.textContent || '').trim(),
        (article.querySelector('p')?.textContent || '').trim(),
      ]) : [];

      const impactRoot = document.getElementById('claude-ai-video-proof-v4');
      const impact = impactRoot ? [...impactRoot.querySelectorAll('.sd-proof-v4-card')].map(card => (card.querySelector('.sd-proof-v4-stat')?.textContent || '').trim()) : [];

      const root = document.getElementById('sd-claude-testimonials-v305');
      const firstSet = root?.querySelector('.sd-v305-set:first-child');
      const secondSet = root?.querySelector('.sd-v305-set:nth-child(2)');
      const cards = root ? [...root.querySelectorAll('.sd-v305-card')] : [];
      const uniqueCards = firstSet ? [...firstSet.querySelectorAll('.sd-v305-card')] : [];
      const viewport = root?.querySelector('.sd-v305-viewport');
      const track = root?.querySelector('.sd-v305-track');
      const trackStyle = track ? getComputedStyle(track) : null;
      const viewportStyle = viewport ? getComputedStyle(viewport) : null;
      const secondStyle = secondSet ? getComputedStyle(secondSet) : null;
      const firstCardStyle = uniqueCards[0] ? getComputedStyle(uniqueCards[0]) : null;
      const firstRect = uniqueCards[0]?.getBoundingClientRect();
      const sections = [...document.querySelectorAll('main section')];
      const sectionIndex = root ? sections.indexOf(root) : -1;
      const previous = sectionIndex > 0 ? sections[sectionIndex - 1] : null;
      const next = sectionIndex >= 0 ? sections[sectionIndex + 1] : null;
      const meta = root ? [...root.querySelectorAll('.sd-testimonial-meta-v1 span')].map(e => ({ text: n(e.textContent), display: getComputedStyle(e).display })) : [];
      const registration = '/gen-ai-masterclass/register-one-step';
      const ctas = [...document.querySelectorAll('a[href]')].filter(a => {
        try { return new URL(a.href, location.href).pathname === registration; } catch { return false; }
      }).length;

      return {
        h1: h1?.textContent || '',
        proof,
        outcomeItems,
        agendaHeads,
        audienceCards,
        impact,
        sectionCount: document.querySelectorAll('main section').length,
        faqCount: document.querySelectorAll('section[data-sd-claude-faq-v2="1"] details').length,
        ctas,
        pageOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
        scriptPresent: [...document.scripts].some(s => (s.src || '').includes('/claude-testimonials-conversion-v1-20260910.js')),
        conversionFlag: root?.getAttribute('data-sd-testimonials-conversion') || '',
        countFlag: root?.getAttribute('data-sd-testimonial-count') || '',
        pill: n(root?.querySelector('.sd-v305-pill')?.textContent),
        title: n(root?.querySelector('.sd-v305-title')?.textContent),
        desc: n(root?.querySelector('.sd-v305-desc')?.textContent),
        meta,
        totalCards: cards.length,
        uniqueCards: uniqueCards.length,
        cardLabels: uniqueCards.map(c => c.getAttribute('aria-label') || ''),
        buttonLabels: uniqueCards.map(c => c.querySelector('.sd-v305-open')?.getAttribute('aria-label') || ''),
        duplicateTabIndexes: secondSet ? [...secondSet.querySelectorAll('.sd-v305-open')].map(b => b.getAttribute('tabindex') || '') : [],
        mediaPairs: uniqueCards.map(c => [c.dataset.poster || '', c.dataset.video || '']),
        cardSize: firstRect ? [Math.round(firstRect.width), Math.round(firstRect.height)] : [0, 0],
        animation: trackStyle ? [trackStyle.animationName, trackStyle.animationDuration, trackStyle.animationPlayState] : [],
        viewportOverflowX: viewportStyle?.overflowX || '',
        scrollSnapType: viewportStyle?.scrollSnapType || '',
        viewportScrollable: viewport ? viewport.scrollWidth > viewport.clientWidth + 2 : false,
        secondDisplay: secondStyle?.display || '',
        firstCardSnap: firstCardStyle?.scrollSnapAlign || '',
        sectionIndex,
        previousHeading: n(previous?.querySelector('h2')?.textContent || previous?.innerText?.slice(0, 120)),
        nextHeading: n(next?.querySelector('h2')?.textContent || next?.innerText?.slice(0, 120)),
        runtimeFlag: !!window.__SD_CLAUDE_TESTIMONIALS_CONVERSION_V1__,
      };
    });

    const trustOK = state.proof.length === 3 && state.proof[0] === '150,000+ Learners' && state.proof[1] === '4.9/5 Rating' && state.proof[2] === 'Live · Practical';
    const outcomesOK = JSON.stringify(state.outcomeItems) === JSON.stringify(outcomes);
    const agendaOK = agenda.every(item => state.agendaHeads.includes(item));
    const audienceOK = JSON.stringify(state.audienceCards) === JSON.stringify(audience);
    const impactOK = JSON.stringify(state.impact) === JSON.stringify(impactStats);
    const labelsOK = state.cardLabels.every((value, i) => value === `Learner video testimonial ${i + 1} of 6`) && state.buttonLabels.every((value, i) => value === `Watch learner video testimonial ${i + 1} of 6`);
    const mediaOK = state.mediaPairs.every((pair, i) => pair[0] === `/ai-video-testimonials/${String(i + 1).padStart(2, '0')}.jpg` && pair[1] === `/ai-video-testimonials/${String(i + 1).padStart(2, '0')}.mp4`);
    const baseTestimonialOK = state.conversionFlag === 'v1' && state.countFlag === '6' && state.runtimeFlag && state.pill === pill && state.title === title && state.desc === desc && state.uniqueCards === 6 && state.totalCards === 12 && labelsOK && mediaOK;
    const metaText = state.meta.map(x => x.text);
    const metaOK = metaText.includes('6 learner videos') && metaText.includes('Tap any story to watch') && metaText.includes('Swipe to browse');
    const orderOK = state.sectionIndex === 13 && state.previousHeading === 'Learn 25+ AI Tools' && state.nextHeading.startsWith('FREE AI MASTERCLASS BONUS KIT');

    let responsiveOK = false;
    if (name === 'desktop') {
      responsiveOK = Math.abs(state.cardSize[0] - 280) <= 1 && Math.abs(state.cardSize[1] - 420) <= 1 && state.animation[0] === 'sd-v305-marquee' && state.animation[1] === '36s' && state.secondDisplay !== 'none' && state.meta.find(x => x.text === 'Swipe to browse')?.display === 'none';
    } else if (name === 'tablet') {
      responsiveOK = Math.abs(state.cardSize[0] - 258) <= 1 && Math.abs(state.cardSize[1] - 387) <= 1 && state.animation[0] === 'sd-v305-marquee' && state.animation[1] === '36s' && state.secondDisplay !== 'none' && state.meta.find(x => x.text === 'Swipe to browse')?.display === 'none';
    } else {
      responsiveOK = Math.abs(state.cardSize[0] - 240) <= 1 && Math.abs(state.cardSize[1] - 360) <= 1 && state.animation[0] === 'none' && state.secondDisplay === 'none' && state.viewportScrollable && /auto|scroll/.test(state.viewportOverflowX) && state.scrollSnapType.includes('x') && state.firstCardSnap === 'start' && state.meta.find(x => x.text === 'Swipe to browse')?.display !== 'none';
      const scroll = await page.evaluate(async () => {
        const viewport = document.querySelector('#sd-claude-testimonials-v305 .sd-v305-viewport');
        if (!viewport) return -1;
        viewport.scrollLeft = 320;
        await new Promise(resolve => setTimeout(resolve, 500));
        return viewport.scrollLeft;
      });
      if (!(scroll > 0)) responsiveOK = false;
      console.log('MOBILE_MANUAL_SCROLL_LEFT', scroll);
    }

    const legacyVisible = await page.evaluate(() => {
      const text = (document.body.innerText || '').replace(/\s+/g, ' ');
      return ['Real Learner Stories', 'Hear directly from learners about their Sikhadenge learning experience.'].filter(value => text.includes(value));
    });

    // Dispatch through DOM instead of geometric Puppeteer click because the desktop/tablet rail is moving.
    const clicked = await page.evaluate(() => {
      const button = document.querySelector('#sd-claude-testimonials-v305 .sd-v305-set:first-child .sd-v305-open');
      if (!button) return false;
      button.click();
      return true;
    });
    await new Promise(resolve => setTimeout(resolve, 1200));
    const interaction = await page.evaluate(() => {
      const root = document.getElementById('sd-claude-testimonials-v305');
      const video = root?.querySelector('.sd-v305-set:first-child .sd-v305-card video');
      return {
        exists: !!video,
        src: video?.currentSrc || video?.src || '',
        controls: !!video?.controls,
        playsInline: !!video?.playsInline,
        rootPlaying: root?.getAttribute('data-playing') || '',
      };
    });
    const interactionOK = clicked && interaction.exists && interaction.src.includes('/ai-video-testimonials/01.mp4') && interaction.controls && interaction.playsInline && interaction.rootPlaying === '1';

    console.log(name, JSON.stringify({
      h1: state.h1,
      proof: state.proof,
      testimonial: { pill: state.pill, title: state.title, desc: state.desc, meta: state.meta, cards: state.uniqueCards, cardSize: state.cardSize, animation: state.animation, secondDisplay: state.secondDisplay, scrollSnapType: state.scrollSnapType },
      sectionIndex: state.sectionIndex,
      sectionCount: state.sectionCount,
      faqCount: state.faqCount,
      ctas: state.ctas,
      pageOverflow: state.pageOverflow,
      interaction,
      legacyVisible,
      badAssets,
      pageErrors,
    }));

    if (
      norm(state.h1) !== wantH1 || !trustOK || !outcomesOK || !agendaOK || !audienceOK || !impactOK ||
      !baseTestimonialOK || !metaOK || !orderOK || !responsiveOK || !interactionOK || legacyVisible.length ||
      state.sectionCount !== 18 || state.faqCount !== 15 || state.ctas !== 8 || state.pageOverflow ||
      !state.scriptPresent || state.duplicateTabIndexes.some(value => value !== '-1') || badAssets.length || pageErrors.length
    ) {
      failures.push(`${name}: state=${JSON.stringify(state)} interaction=${JSON.stringify(interaction)} legacy=${legacyVisible.join('|')} bad=${badAssets.join('|')} errors=${pageErrors.join('|')}`);
    }

    await page.close();
  }

  await browser.close();

  if (failures.length) throw new Error(failures.join('\n'));
  console.log('CLAUDE_TESTIMONIALS_V1_3VIEW_QA_PASS');
})().catch(error => {
  console.error(error);
  process.exit(1);
});
