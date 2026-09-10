'use strict';
const puppeteer=require('puppeteer-core');

const expectedH2='Ready to build your first practical AI workflow?';
const expectedP='Join the free live masterclass and learn Claude + 25+ AI tools for real work — step by step, in easy Hinglish.';
const expectedSignals=['Live Online','Easy Hinglish','No Coding Required'];
const expectedNote='Joining details follow after registration.';
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
    page.on('response',r=>{const u=r.url();if(r.status()>=400&&(/\.css(?:\?|$)/.test(u)||/\.js(?:\?|$)/.test(u)))badAssets.push(`${r.status()} ${u}`)});
    await page.goto(`https://sikhadenge.in/masterclass/claude/free?final_handoff_v1_qa=${name}-${Date.now()}`,{waitUntil:'networkidle2',timeout:60000});
    await new Promise(r=>setTimeout(r,6000));

    const state=await page.evaluate(()=>{
      const n=s=>(s||'').replace(/\s+/g,' ').trim(); const reg='/gen-ai-masterclass/register-one-step';
      const sections=[...document.querySelectorAll('main section')];
      const sec=document.querySelector('section[data-sd-claude-final-handoff-v1="1"]');
      const idx=sec?sections.indexOf(sec):-1;
      const h2=sec?.querySelector('h2'); const p=sec?.querySelector('.sd-final-handoff-copy-v1 > p');
      const signals=sec?[...sec.querySelectorAll('.sd-final-handoff-signal-v1')].map(x=>{const r=x.getBoundingClientRect();return {text:n(x.textContent),rect:{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}}}):[];
      const note=sec?.querySelector('.sd-final-handoff-note-v1');
      const cta=sec?.querySelector('a[data-sd-final-handoff-cta-v1="1"]');
      const cr=cta?.getBoundingClientRect(); const sr=sec?.getBoundingClientRect();
      let ctaPath=''; try{ctaPath=cta?new URL(cta.href,location.href).pathname:''}catch{}
      const totalReg=[...document.querySelectorAll('a[href]')].filter(a=>{try{return new URL(a.href,location.href).pathname===reg}catch{return false}}).length;
      const scripts=[...document.scripts].map(s=>s.src).filter(Boolean);
      const testimonial=document.getElementById('sd-claude-testimonials-v305');
      const bonus=sections.find(s=>s.getAttribute('data-sd-claude-bonus-value')==='v1');
      const faq=document.querySelector('section[data-sd-claude-faq-v2="1"]');
      const oldCopy=n(document.body.innerText).includes('Reserve your free seat and continue to the existing SikhaDenge registration page.');
      return {
        sectionCount:sections.length,idx,found:!!sec,rootFlag:document.documentElement.getAttribute('data-claude-final-handoff-v1'),
        h2:n(h2?.textContent),highlight:n(h2?.querySelector('.sd-heading-v11-highlight')?.textContent),p:n(p?.textContent),signals,note:n(note?.textContent),
        cta:{text:n(cta?.textContent),path:ctaPath,aria:cta?.getAttribute('aria-label')||'',rect:cr?{x:Math.round(cr.x),y:Math.round(cr.y),w:Math.round(cr.width),h:Math.round(cr.height)}:null},
        sectionRect:sr?{x:Math.round(sr.x),y:Math.round(sr.y),w:Math.round(sr.width),h:Math.round(sr.height)}:null,
        totalReg,finalReg:sec?[...sec.querySelectorAll('a[href]')].filter(a=>{try{return new URL(a.href,location.href).pathname===reg}catch{return false}}).length:0,
        faqCount:faq?.querySelectorAll('details.sd-faq-v2-item').length||0,
        prev:idx>0?n(sections[idx-1].innerText):'',h1:n(document.querySelector('h1')?.textContent),
        testimonialFlag:testimonial?.getAttribute('data-sd-testimonials-conversion')||'',bonusFlag:bonus?.getAttribute('data-sd-claude-bonus-value')||'',
        attribution:scripts.some(s=>s.includes('/funnel-attribution-bridge-v1.js')),
        faqScript:scripts.filter(s=>s.includes('/claude-faq-conversion-v1-20260910.js')).length,
        newScript:scripts.filter(s=>s.includes('/claude-final-handoff-v1-20260910.js')).length,
        oldCopy,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+2
      };
    });

    const errors=signature(pageErrors); const errorsOK=errorsWithinBaseline(errors);
    const copyOK=state.found&&state.rootFlag==='1'&&state.h2===expectedH2&&state.highlight==='AI workflow?'&&state.p===expectedP&&state.note===expectedNote&&!state.oldCopy;
    const signalsOK=state.signals.length===3&&state.signals.every((x,i)=>x.text===expectedSignals[i]&&x.rect.x>=0&&x.rect.x+x.rect.w<=width+1&&x.rect.h>=30);
    const ctaOK=state.finalReg===1&&state.cta.path==='/gen-ai-masterclass/register-one-step'&&state.cta.text.includes('Get My Free Seat')&&state.cta.text.includes('₹999')&&state.cta.text.includes('Free')&&state.cta.aria==='Get My Free Seat — ₹999 value, Free now'&&state.cta.rect&&state.cta.rect.h>=44&&state.cta.rect.x>=0&&state.cta.rect.x+state.cta.rect.w<=width+1&&Math.abs((state.cta.rect.x+state.cta.rect.w/2)-width/2)<=8;
    const preserved=state.sectionCount===18&&state.idx===17&&state.faqCount===15&&state.totalReg===8&&state.prev.startsWith('FAQ Frequently asked questions.')&&state.h1.includes('Master Claude + 25+ AI Tools')&&state.testimonialFlag==='v1b'&&state.bonusFlag==='v1'&&state.attribution&&state.faqScript===1;
    const assets=state.newScript===1&&badAssets.length===0;
    const responsive=!state.overflow&&state.sectionRect&&Math.abs(state.sectionRect.w-width)<=2&&state.sectionRect.x>=-1&&state.sectionRect.h>300&&state.sectionRect.h<720;

    console.log('FINAL_HANDOFF_V1',name,JSON.stringify({state,copyOK,signalsOK,ctaOK,preserved,assets,responsive,errors,errorsOK,badAssets}));
    if(!(copyOK&&signalsOK&&ctaOK&&preserved&&assets&&responsive&&errorsOK&&!badAssets.length)) failures.push(`${name}: ${JSON.stringify({state,copyOK,signalsOK,ctaOK,preserved,assets,responsive,errors,badAssets})}`);
    await page.close();
  }
  await browser.close();
  if(failures.length) throw new Error(failures.join('\n'));
  console.log('CLAUDE_FINAL_HANDOFF_V1_3VIEW_QA_PASS');
})().catch(e=>{console.error(e);process.exit(1)});
