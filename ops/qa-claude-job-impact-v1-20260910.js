const puppeteer = require('puppeteer-core');
const norm = s => (s || '').replace(/\s+/g, ' ').replace(/,\s*/g, ',').trim();
const wantH = 'Master Claude + 25+ AI Tools to work smarter,create faster & get better results.';
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
const stats = ['1 in 4', '+78M', '70%', '+69%', '2×+', 'AI + Big Data'];
const titles = [
  'workers are in occupations with some GenAI exposure',
  'net jobs projected globally by 2030',
  'of skills used in most jobs are expected to change by 2030',
  'growth in jobs requiring specific AI skills',
  'faster skill change in the most AI-exposed jobs',
  'among the fastest-growing skills through 2030',
];

(async () => {
  const b = await puppeteer.launch({ executablePath: process.env.CHROME, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const fail = [];
  for (const [n, w, h, m] of [['desktop',1440,1000,false],['tablet',768,1024,true],['mobile',390,844,true]]) {
    const p = await b.newPage();
    await p.setViewport({ width:w, height:h, isMobile:m, hasTouch:m });
    const bad=[];
    p.on('response', r => { const u=r.url(); if (r.status()>=400 && (/\.css(?:\?|$)/.test(u)||/\.js(?:\?|$)/.test(u))) bad.push(`${r.status()} ${u}`); });
    await p.goto(`https://sikhadenge.in/masterclass/claude/free?jobimpact_browser=${n}-${Date.now()}`, { waitUntil:'networkidle2', timeout:60000 });
    await new Promise(r => setTimeout(r,3500));
    const x = await p.evaluate(() => {
      const h1=document.querySelector('h1');
      const hero=h1?.closest('section')||h1?.parentElement?.parentElement;
      const proof=hero?[...hero.querySelectorAll('[class*="proofCard"]')].slice(0,3).map(c=>(c.querySelector('strong')?.textContent||'').trim()):[];
      const hs=[...document.querySelectorAll('h2')];
      const oh=hs.find(h=>(h.textContent||'').replace(/\s+/g,' ').trim()==='What you can do with AI');
      const os=oh?.closest('section');
      const outcomeItems=os?[...os.querySelectorAll('[class*="itemText"]')].map(e=>(e.textContent||'').trim()).slice(0,6):[];
      const agendaHeads=[...document.querySelectorAll('h3,h4')].map(e=>(e.textContent||'').replace(/\s+/g,' ').trim());
      const oldShiftHeading=hs.find(h=>(h.textContent||'').replace(/\s+/g,' ').trim()==='Why AI-skilled professionals are moving ahead faster.');
      const oldShift=oldShiftHeading?.closest('section');
      const oldShiftHidden=!!oldShift && oldShift.getAttribute('data-claude-old-proof-hidden')==='1' && getComputedStyle(oldShift).display==='none';
      const root=document.getElementById('claude-ai-video-proof-v4');
      const cards=root?[...root.querySelectorAll('.sd-proof-v4-card')].map(c=>({stat:(c.querySelector('.sd-proof-v4-stat')?.textContent||'').trim(),title:(c.querySelector('h3')?.textContent||'').trim(),source:(c.querySelector('small')?.textContent||'').trim()})):[];
      const visible=(document.body.innerText||'').replace(/\s+/g,' ');
      const reg='/gen-ai-masterclass/register-one-step';
      const ctas=[...document.querySelectorAll('a[href]')].filter(a=>{try{return new URL(a.href,location.href).pathname===reg}catch{return false}}).length;
      return {h1:h1?.textContent||'',proof,outcomeItems,agendaHeads,oldShiftHidden,cards,visible,sections:document.querySelectorAll('main section').length,faq:document.querySelectorAll('section[data-sd-claude-faq-v2="1"] details').length,ctas,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+2,scripts:[...document.scripts].map(s=>s.src).filter(Boolean)};
    });
    const trust=x.proof.length===3&&x.proof[0]==='150,000+ Learners'&&x.proof[1]==='4.9/5 Rating'&&x.proof[2]==='Live · Practical';
    const out=JSON.stringify(x.outcomeItems)===JSON.stringify(outcomes);
    const ag=agenda.every(t=>x.agendaHeads.includes(t));
    const cardOK=x.cards.length===6&&JSON.stringify(x.cards.map(c=>c.stat))===JSON.stringify(stats)&&JSON.stringify(x.cards.map(c=>c.title))===JSON.stringify(titles)&&x.cards.every(c=>/2025|2026/.test(c.source));
    const old=['30 Crore','40 Crore','9.2 Crore','10.35M','AI Prompt Engineers Earn $300k','workers could be displaced by automation'];
    const oldVisible=old.filter(t=>x.visible.includes(t));
    console.log(n, JSON.stringify({h1:x.h1,proof:x.proof,outcomeItems:x.outcomeItems,oldShiftHidden:x.oldShiftHidden,cards:x.cards,sections:x.sections,faq:x.faq,ctas:x.ctas,overflow:x.overflow}), 'oldVisible', oldVisible, 'failedAssets', bad.length);
    const scriptOK=x.scripts.some(s=>s.includes('hero-v1-trust-v1-outcomes-v1-agenda-v1-20260910.js'))&&x.scripts.some(s=>s.includes('claude-proof-static-v5.js'))&&!x.scripts.some(s=>s.includes('agenda-v1-job-impact-v1-20260910.js'));
    if(norm(x.h1)!==wantH||!trust||!out||!ag||!x.oldShiftHidden||!cardOK||oldVisible.length||x.sections!==18||x.faq!==15||x.ctas<7||x.overflow||bad.length||!scriptOK) fail.push(n+': cards='+JSON.stringify(x.cards)+' hidden='+x.oldShiftHidden+' old='+oldVisible.join(',')+' bad='+bad.join(','));
    await p.close();
  }
  await b.close();
  if(fail.length) throw Error(fail.join('\n'));
  console.log('CLAUDE_JOB_IMPACT_V1_3VIEW_QA_PASS');
})().catch(e=>{console.error(e);process.exit(1)});
