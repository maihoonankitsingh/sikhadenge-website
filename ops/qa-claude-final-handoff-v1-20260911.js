'use strict';
const puppeteer=require('puppeteer-core');

const expected='Reserve your free seat for the live masterclass. Complete registration once, then follow the confirmation and WhatsApp joining instructions to attend.';
const oldCopy='Reserve your free seat and continue to the existing SikhaDenge registration page.';
const errorMax={'react-418':26,'react-423':1,'react-425':2};
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
function signature(errs){const out={};for(const e of errs){const m=String(e).match(/Minified React error #(\d+)/);const k=m?`react-${m[1]}`:String(e);out[k]=(out[k]||0)+1;}return out;}
function errorsWithinBaseline(actual){for(const [k,v] of Object.entries(actual)){if(!(k in errorMax)||v>errorMax[k]) return false;}return true;}

(async()=>{
  const browser=await puppeteer.launch({executablePath:process.env.CHROME,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
  const failures=[];
  for(const [name,width,height,mobile] of [['desktop',1440,1000,false],['tablet',768,1024,true],['mobile',390,844,true]]){
    const page=await browser.newPage();
    await page.setViewport({width,height,isMobile:mobile,hasTouch:mobile});
    const pageErrors=[],badAssets=[];
    page.on('pageerror',e=>pageErrors.push(String(e)));
    page.on('response',r=>{const u=r.url();if(r.status()>=400&&(/\.css(?:\?|$)/.test(u)||/\.js(?:\?|$)/.test(u))) badAssets.push(`${r.status()} ${u}`);});
    await page.goto(`https://sikhadenge.in/masterclass/claude/free?handoff_v1_qa=${name}-${Date.now()}&utm_source=qa&utm_medium=automation`,{waitUntil:'networkidle2',timeout:60000});
    await new Promise(r=>setTimeout(r,6000));

    const state=await page.evaluate(()=>{
      const n=s=>(s||'').replace(/\s+/g,' ').trim();
      const reg='/gen-ai-masterclass/register-one-step';
      const sections=[...document.querySelectorAll('main section')];
      const sec=sections[17]||null;
      const idx=sec?sections.indexOf(sec):-1;
      const sr=sec?.getBoundingClientRect();
      const eyebrow=n(sec?.querySelector('span')?.textContent);
      const h2=n(sec?.querySelector('h2')?.textContent);
      const p=n(sec?.querySelector('p')?.textContent);
      const ctas=sec?[...sec.querySelectorAll('a[href]')].map(a=>{const r=a.getBoundingClientRect();let u=null;try{u=new URL(a.href,location.href)}catch{};return {text:n(a.textContent),path:u?.pathname||'',search:u?.search||'',aria:a.getAttribute('aria-label')||'',rect:{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}}}):[];
      const allRegister=[...document.querySelectorAll('a[href]')].filter(a=>{try{return new URL(a.href,location.href).pathname===reg}catch{return false}});
      const scripts=[...document.scripts].map(s=>s.src).filter(Boolean);
      const finalNew=scripts.filter(s=>s.includes('closing-v1-handoff-v1-20260911.js')).length;
      const finalOld=scripts.filter(s=>s.includes('audience-v1b-closing-v1-20260910.js')).length;
      const faq=document.documentElement.getAttribute('data-claude-faq-v2');
      const testimonial=document.documentElement.getAttribute('data-claude-testimonials-conversion-v1');
      const bonus=document.documentElement.getAttribute('data-claude-bonus-value-v1');
      const closing=sections.find(s=>n(s.querySelector('h2')?.textContent)==='Learn AI. Apply it. Work smarter.');
      return {
        sectionCount:sections.length,idx,eyebrow,h2,p,ctas,
        registerCount:allRegister.length,
        pageOverflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+2,
        sectionRect:sr?{x:Math.round(sr.x),w:Math.round(sr.width),h:Math.round(sr.height)}:null,
        h1:n(document.querySelector('h1')?.textContent),
        faqCount:document.querySelectorAll('section[data-sd-claude-faq-v2="1"] details').length,
        faqRoot:faq,testimonialFlag:testimonial,bonusFlag:bonus,
        closingCopy:n(closing?.querySelector('p')?.textContent),
        finalNew,finalOld,
        oldVisible:n(document.body.innerText).includes('Reserve your free seat and continue to the existing SikhaDenge registration page.'),
        attribution:scripts.some(s=>s.includes('/funnel-attribution-bridge-v1.js')),
        prev:idx>0?n(sections[idx-1].innerText.slice(0,160)):''
      };
    });

    const errors=signature(pageErrors);
    const errorsOK=errorsWithinBaseline(errors);
    const coreOK=state.sectionCount===18&&state.idx===17&&state.faqCount===15&&state.registerCount===8&&!state.pageOverflow&&state.h1.includes('Master Claude + 25+ AI Tools')&&state.faqRoot==='15'&&state.testimonialFlag==='v1b'&&state.bonusFlag==='v1'&&state.attribution;
    const handoffOK=state.eyebrow==='NEXT LIVE BATCH'&&state.h2==='Your first AI workflow starts with one live session.'&&state.p===expected&&!state.oldVisible&&state.ctas.length===1&&state.ctas[0].path==='/gen-ai-masterclass/register-one-step'&&state.ctas[0].text.includes('₹999')&&state.ctas[0].text.includes('Free')&&state.ctas[0].aria==='Get My Free Seat — ₹999 value, Free now';
    const preserved=state.closingCopy==='Join the free live masterclass and learn a repeatable AI workflow for research, content, productivity and everyday work — in easy Hinglish, with no coding required.'&&state.prev.startsWith('FAQ Frequently asked questions.');
    const assets=state.finalNew===1&&state.finalOld===0&&badAssets.length===0;
    const rectOK=state.sectionRect&&Math.abs(state.sectionRect.w-width)<=2&&state.sectionRect.x>=-1&&state.ctas[0]&&state.ctas[0].rect.x>=0&&state.ctas[0].rect.x+state.ctas[0].rect.w<=width+1&&state.ctas[0].rect.h>=44;

    console.log('FINAL_HANDOFF_V1',name,JSON.stringify({state,errors,errorsOK,badAssets,coreOK,handoffOK,preserved,assets,rectOK}));
    if(!coreOK||!handoffOK||!preserved||!assets||!rectOK||!errorsOK||badAssets.length){
      failures.push(`${name}: ${JSON.stringify({state,errors,badAssets,coreOK,handoffOK,preserved,assets,rectOK})}`);
    }
    await page.close();
  }
  await browser.close();
  if(failures.length) throw new Error(failures.join('\n'));
  console.log('CLAUDE_FINAL_HANDOFF_V1_3VIEW_QA_PASS');
})().catch(e=>{console.error(e);process.exit(1)});
