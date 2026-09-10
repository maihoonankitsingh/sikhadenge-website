const puppeteer = require('puppeteer-core');
const norm = s => (s || '').replace(/\s+/g, ' ').replace(/,\s*/g, ',').trim();
const wantH = 'Master Claude + 25+ AI Tools to work smarter,create faster & get better results.';
const wantAudienceH2 = 'Use the right AI tool where speed, quality and structured output matter.';
const audience = [
  ['Working professionals & business owners','Apply AI to research, writing, planning and everyday digital work.'],
  ['Students & freshers','Use AI for projects, research and practical career preparation.'],
  ['Freelancers & creators','Research, create and deliver client work more efficiently with repeatable AI workflows.'],
  ['Job seekers & career switchers','Use AI for LinkedIn, interviews, research and faster skill-building.'],
];
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
const impactStats = ['1 in 4','+78M','70%','+69%','2×+','AI + Big Data'];

(async () => {
  const b = await puppeteer.launch({ executablePath: process.env.CHROME, headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const fails=[];
  for (const [name,w,h,m] of [['desktop',1440,1000,false],['tablet',768,1024,true],['mobile',390,844,true]]) {
    const p=await b.newPage();
    await p.setViewport({width:w,height:h,isMobile:m,hasTouch:m});
    const bad=[];
    p.on('response', r => { const u=r.url(); if(r.status()>=400 && (/\.css(?:\?|$)/.test(u)||/\.js(?:\?|$)/.test(u))) bad.push(`${r.status()} ${u}`); });
    await p.goto(`https://sikhadenge.in/masterclass/claude/free?audience_browser=${name}-${Date.now()}`,{waitUntil:'networkidle2',timeout:60000});
    await new Promise(r=>setTimeout(r,3500));
    const x=await p.evaluate(() => {
      const n=s=>(s||'').replace(/\s+/g,' ').trim();
      const h1=document.querySelector('h1');
      const hero=h1?.closest('section')||h1?.parentElement?.parentElement;
      const proof=hero?[...hero.querySelectorAll('[class*="proofCard"]')].slice(0,3).map(c=>(c.querySelector('strong')?.textContent||'').trim()):[];
      const h2s=[...document.querySelectorAll('h2')];
      const eyebrowEl=[...document.querySelectorAll('span')].find(e=>n(e.textContent)==='WHO THIS MASTERCLASS IS FOR');
      const as=eyebrowEl?.closest('section');
      const audienceH2=n(as?.querySelector('h2')?.textContent||'');
      const eyebrow=eyebrowEl?n(eyebrowEl.textContent):'';
      const audienceCards=as?[...as.querySelectorAll('article')].map(a=>[(a.querySelector('strong')?.textContent||'').trim(),(a.querySelector('p')?.textContent||'').trim()]):[];
      const oh=h2s.find(h=>n(h.textContent)==='What you can do with AI');
      const os=oh?.closest('section');
      const outcomeItems=os?[...os.querySelectorAll('[class*="itemText"]')].map(e=>(e.textContent||'').trim()).slice(0,6):[];
      const agendaHeads=[...document.querySelectorAll('h3,h4')].map(e=>n(e.textContent));
      const root=document.getElementById('claude-ai-video-proof-v4');
      const impact=root?[...root.querySelectorAll('.sd-proof-v4-card')].map(c=>(c.querySelector('.sd-proof-v4-stat')?.textContent||'').trim()):[];
      const visible=n(document.body.innerText||'');
      const reg='/gen-ai-masterclass/register-one-step';
      const ctas=[...document.querySelectorAll('a[href]')].filter(a=>{try{return new URL(a.href,location.href).pathname===reg}catch{return false}}).length;
      return {h1:h1?.textContent||'',proof,eyebrow,audienceH2,audienceCards,outcomeItems,agendaHeads,impact,visible,sections:document.querySelectorAll('main section').length,faq:document.querySelectorAll('section[data-sd-claude-faq-v2="1"] details').length,ctas,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+2,scripts:[...document.scripts].map(s=>s.src).filter(Boolean)};
    });
    const trust=x.proof.length===3&&x.proof[0]==='150,000+ Learners'&&x.proof[1]==='4.9/5 Rating'&&x.proof[2]==='Live · Practical';
    const audienceOK=x.eyebrow==='WHO THIS MASTERCLASS IS FOR'&&x.audienceH2===wantAudienceH2&&JSON.stringify(x.audienceCards)===JSON.stringify(audience);
    const outcomesOK=JSON.stringify(x.outcomeItems)===JSON.stringify(outcomes);
    const agendaOK=agenda.every(t=>x.agendaHeads.includes(t));
    const impactOK=JSON.stringify(x.impact)===JSON.stringify(impactStats);
    const legacy=['BUILT FOR PRACTICAL LEARNERS','Students & job seekers','Use AI to improve planning, communication and decision support.','AI Prompt Engineers Earn $300k','30 Crore','40 Crore','9.2 Crore'];
    const oldVisible=legacy.filter(t=>x.visible.includes(t));
    const scriptOK=x.scripts.some(s=>s.includes('agenda-v1-audience-v1-20260910.js'))&&x.scripts.some(s=>s.includes('claude-proof-static-v5.js'));
    console.log(name,JSON.stringify({h1:x.h1,proof:x.proof,eyebrow:x.eyebrow,audienceH2:x.audienceH2,audience:x.audienceCards,impact:x.impact,sections:x.sections,faq:x.faq,ctas:x.ctas,overflow:x.overflow}), 'oldVisible',oldVisible,'failedAssets',bad.length);
    if(norm(x.h1)!==wantH||!trust||!audienceOK||!outcomesOK||!agendaOK||!impactOK||oldVisible.length||x.sections!==18||x.faq!==15||x.ctas<7||x.overflow||bad.length||!scriptOK) fails.push(`${name}: audienceH2=${x.audienceH2} audience=${JSON.stringify(x.audienceCards)} old=${oldVisible.join(',')} bad=${bad.join(',')}`);
    await p.close();
  }
  await b.close();
  if(fails.length) throw Error(fails.join('\n'));
  console.log('CLAUDE_AUDIENCE_V1_3VIEW_QA_PASS');
})().catch(e=>{console.error(e);process.exit(1)});
