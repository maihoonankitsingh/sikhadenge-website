'use strict';
const puppeteer=require('puppeteer-core');

const faqs=[
  ['Is this AI tools masterclass really free?','Yes. The current live masterclass registration on this page is free. Use any “Get My Free Seat” button to continue to the existing SikhaDenge registration flow.'],
  ['Do I need coding experience?','No. Coding experience is not required. The masterclass is designed for non-technical and first-time AI learners, with practical workflows explained step by step.'],
  ['Which language is used?','The live session is taught in easy Hinglish, with practical steps explained clearly so beginners and working professionals can follow along.'],
  ['Do I need Claude Pro or other paid AI subscriptions?','No. A paid AI subscription is not required to follow the masterclass. Some tools may offer optional paid plans, but the session is structured around workflows you can understand and start with accessible options.'],
  ['Where will I get the joining details?','After registration, continue through SikhaDenge’s existing confirmation and WhatsApp joining flow. Follow the instructions shown after you submit the registration form.'],
  ['Is SikhaDenge affiliated with Anthropic?','No. SikhaDenge is an independent learning platform and is not affiliated with or endorsed by Anthropic. Tool and brand names are used for educational reference.'],
  ['Who is this masterclass for?','It is designed for students, freshers, job seekers, career switchers, freelancers, creators, business owners and working professionals who want practical AI workflows for real work.'],
  ['Is this a live session?','Yes. This page is for the current live online masterclass. The session includes guided teaching, practical workflow demos and live Q&A.'],
  ['Is the session practical or only theory?','The focus is practical application. You will see step-by-step workflows for research, writing, content, productivity, analysis and other everyday digital tasks rather than theory-only teaching.'],
  ['What will I learn in this masterclass?','You will learn how to choose the right AI tool for a task, write better prompts, research and summarize information, create content and presentations, analyze work, and build repeatable productivity workflows.'],
  ['Is this masterclass only about Claude?','No. Claude is a core part of the experience, but this is a broader AI tools masterclass covering a multi-tool workflow with ChatGPT, Gemini, Codex, Perplexity and other tools shown on this page.'],
  ['Why learn multiple AI tools instead of just one?','Different tools are stronger for different tasks. The masterclass shows how to match the task to the right AI tool or workflow instead of depending on a single platform.'],
  ['What bonus resources are included with the free seat?','The page currently includes a Free AI Masterclass Bonus Kit with three practical take-home resources designed to help you apply the workflows after the live session.'],
  ['What if I’m completely new to AI?','That is fine. The learning flow starts from practical basics, uses easy Hinglish and requires no programming background, so first-time learners can follow step by step.'],
  ['How do I reserve my free seat?','Click any “Get My Free Seat” or registration button on this page and complete the SikhaDenge registration flow. Then follow the confirmation and joining instructions shown there.'],
];
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
const allowedError=e=>/Minified React error #(418|423)/.test(String(e));

(async()=>{
  const browser=await puppeteer.launch({executablePath:process.env.CHROME,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
  for(const [name,w,h,m] of [['desktop',1440,1000,false],['tablet',768,1024,true],['mobile',390,844,true]]){
    const page=await browser.newPage();
    await page.setViewport({width:w,height:h,isMobile:m,hasTouch:m});
    const errors=[],bad=[];
    page.on('pageerror',e=>errors.push(String(e)));
    page.on('response',r=>{const u=r.url(); if(r.status()>=400&&(/\.css(?:\?|$)/.test(u)||/\.js(?:\?|$)/.test(u))) bad.push(`${r.status()} ${u}`)});
    await page.goto(`https://sikhadenge.in/masterclass/claude/free?faq_conversion_v1=${name}-${Date.now()}`,{waitUntil:'networkidle2',timeout:60000});
    await new Promise(r=>setTimeout(r,4500));
    const state=await page.evaluate(()=>{
      const n=s=>(s||'').replace(/\s+/g,' ').trim();
      const sections=[...document.querySelectorAll('main section')];
      const sec=document.querySelector('section[data-sd-claude-faq-v2="1"]');
      const idx=sec?sections.indexOf(sec):-1;
      const rows=sec?[...sec.querySelectorAll('details.sd-faq-v2-item')].map((d,i)=>({i:i+1,q:n(d.querySelector('summary')?.textContent),a:n(d.querySelector('p')?.textContent),open:d.open})):[];
      const register=[...document.querySelectorAll('a[href]')].map(a=>{try{return new URL(a.href,location.href).pathname}catch{return ''}}).filter(x=>x==='/gen-ai-masterclass/register-one-step');
      const scripts=[...document.scripts].map(s=>s.src).filter(Boolean);
      const rect=sec?.getBoundingClientRect();
      return {
        sectionCount:sections.length,faqCount:rows.length,idx,rows,
        rootCount:document.documentElement.getAttribute('data-claude-faq-v2'),
        conversionFlag:window.__CLAUDE_FAQ_CONVERSION_V1__===true,
        firstOpen:rows[0]?.open===true,onlyFirstOpen:rows.filter(x=>x.open).length===1,
        registerCount:register.length,allRegisterPathsOK:register.length===8,
        attribution:scripts.some(s=>s.includes('/funnel-attribution-bridge-v1.js')),
        newScript:scripts.filter(s=>s.includes('/claude-faq-conversion-v1-20260910.js')).length,
        oldScript:scripts.filter(s=>s.includes('/claude-faq-v2.js')).length,
        overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+2,
        rect:rect?{w:Math.round(rect.width),h:Math.round(rect.height)}:null,
        prev:idx>0?n(sections[idx-1].innerText):'',next:idx>=0&&idx<sections.length-1?n(sections[idx+1].innerText):'',
        h1:n(document.querySelector('h1')?.textContent),
        testimonialFlag:document.documentElement.getAttribute('data-claude-testimonials-conversion-v1'),
        bonusFlag:document.documentElement.getAttribute('data-claude-bonus-value-v1')
      };
    });
    const exact=state.rows.length===faqs.length&&state.rows.every((r,i)=>r.q===faqs[i][0]&&r.a===faqs[i][1]);
    const structural=state.sectionCount===18&&state.faqCount===15&&state.idx===16&&state.rootCount==='15'&&state.firstOpen&&state.onlyFirstOpen;
    const preserved=state.allRegisterPathsOK&&state.attribution&&state.h1.includes('Master Claude + 25+ AI Tools')&&state.prev.includes('Learn AI. Apply it. Work smarter.')&&state.next.includes('NEXT LIVE BATCH')&&state.testimonialFlag==='v1b'&&state.bonusFlag==='v1';
    const assets=state.newScript===1&&state.oldScript===0&&bad.length===0;
    const errorsOK=errors.every(allowedError);
    const responsive=!state.overflow&&state.rect&&Math.abs(state.rect.w-w)<=2;
    console.log('FAQ_CONVERSION_V1',name,JSON.stringify({state,exact,structural,preserved,assets,errorsOK,responsive,bad,errorCount:errors.length}));
    if(!(exact&&structural&&preserved&&assets&&errorsOK&&responsive)) throw new Error(`FAQ conversion QA failure ${name}`);

    await page.evaluate(()=>{const rows=document.querySelectorAll('section[data-sd-claude-faq-v2="1"] details.sd-faq-v2-item'); rows[1].querySelector('summary').click();});
    await new Promise(r=>setTimeout(r,350));
    const accordion=await page.evaluate(()=>[...document.querySelectorAll('section[data-sd-claude-faq-v2="1"] details.sd-faq-v2-item')].map(d=>d.open));
    if(accordion.filter(Boolean).length!==1||accordion[1]!==true) throw new Error(`FAQ accordion behavior failure ${name}`);
    await page.close();
  }
  await browser.close();
  console.log('CLAUDE_FAQ_CONVERSION_V1_3VIEW_QA_PASS');
})().catch(e=>{console.error(e);process.exit(1)});
