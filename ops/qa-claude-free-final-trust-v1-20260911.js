'use strict';
const puppeteer=require('puppeteer-core');
const errorMax={'react-418':26,'react-423':1,'react-425':2};
function signature(errs){const out={};for(const e of errs){const m=String(e).match(/Minified React error #(\d+)/);const k=m?`react-${m[1]}`:String(e);out[k]=(out[k]||0)+1;}return out;}
function errorsWithinBaseline(actual){for(const [k,v] of Object.entries(actual)){if(!(k in errorMax)||v>errorMax[k]) return false;}return true;}

(async()=>{
  const browser=await puppeteer.launch({executablePath:process.env.CHROME,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
  const failures=[];
  for(const [name,width,height,mobile] of [['desktop',1440,1000,false],['tablet',768,1024,true],['mobile',390,844,true]]){
    const page=await browser.newPage();
    await page.setViewport({width,height,isMobile:mobile,hasTouch:mobile});
    const errors=[],bad=[];
    page.on('pageerror',e=>errors.push(String(e)));
    page.on('response',r=>{const u=r.url();if(r.status()>=400&&(/\.css(?:\?|$)/.test(u)||/\.js(?:\?|$)/.test(u)))bad.push(`${r.status()} ${u}`)});
    await page.goto(`https://sikhadenge.in/masterclass/claude/free?free_final_trust_v1_qa=${name}-${Date.now()}`,{waitUntil:'networkidle2',timeout:60000});
    await new Promise(r=>setTimeout(r,6000));

    const state=await page.evaluate(()=>{
      const n=s=>(s||'').replace(/\s+/g,' ').trim();
      const reg='/gen-ai-masterclass/register-one-step';
      const sections=[...document.querySelectorAll('main section')]; const sec=sections[17]||null;
      const links=sec?[...sec.querySelectorAll('a[href]')].map(a=>{const r=a.getBoundingClientRect();let path='';try{path=new URL(a.href,location.href).pathname}catch{};return{text:n(a.textContent),path,aria:a.getAttribute('aria-label')||'',rect:{x:Math.round(r.x),w:Math.round(r.width),h:Math.round(r.height)}}}):[];
      const totalCtas=[...document.querySelectorAll('a[href]')].filter(a=>{try{return new URL(a.href,location.href).pathname===reg}catch{return false}}).length;
      const payment=document.querySelector('.claude-payment-trust-footer_paymentArea__aYkQy');
      const divider=document.querySelector('.claude-payment-trust-footer_divider___nkaU');
      const legal=document.querySelector('.claude-payment-trust-footer_legal__It3D5');
      const footer=document.querySelector('footer[class*="claude-payment-trust-footer_footer"]');
      const sr=sec?.getBoundingClientRect(); const body=n(document.body.innerText);
      const scripts=[...document.scripts].map(s=>s.src).filter(Boolean);
      return {
        sectionCount:sections.length,idx:sec?sections.indexOf(sec):-1,
        h2:n(sec?.querySelector('h2')?.textContent),p:n(sec?.querySelector('p')?.textContent),text:n(sec?.innerText),
        signals:sec?[...sec.querySelectorAll('.sd-final-handoff-signal-v1')].map(x=>n(x.textContent)):[],
        note:n(sec?.querySelector('.sd-final-handoff-note-v1')?.textContent),links,totalCtas,
        rect:sr?{x:Math.round(sr.x),w:Math.round(sr.width),h:Math.round(sr.height)}:null,
        overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+2,
        faqCount:document.querySelectorAll('section[data-sd-claude-faq-v2="1"] details').length,
        h1:n(document.querySelector('h1')?.textContent),
        testimonialFlag:document.documentElement.getAttribute('data-claude-testimonials-conversion-v1'),
        bonusFlag:document.documentElement.getAttribute('data-claude-bonus-value-v1'),
        handoffFlag:sec?.getAttribute('data-sd-claude-final-handoff-v1')||'',
        paymentFound:!!payment,paymentDisplay:payment?getComputedStyle(payment).display:'',dividerDisplay:divider?getComputedStyle(divider).display:'',
        legalVisible:!!legal&&getComputedStyle(legal).display!=='none'&&legal.getBoundingClientRect().height>0,
        footerVisible:!!footer&&getComputedStyle(footer).display!=='none',legalText:n(legal?.innerText),
        visiblePaymentCopy:/SECURE PAYMENT OPTIONS|Trusted checkout experience|Net Banking/.test(body),
        stylePresent:!!document.getElementById('sd-claude-free-final-trust-v1'),
        handoffScript:scripts.filter(s=>s.includes('/claude-final-handoff-v1-20260910.js')).length,
        faqScript:scripts.filter(s=>s.includes('/claude-faq-conversion-v1-20260910.js')).length,
        attribution:scripts.some(s=>s.includes('/funnel-attribution-bridge-v1.js'))
      };
    });

    const sig=signature(errors), errorsOK=errorsWithinBaseline(sig);
    const handoffOK=state.sectionCount===18&&state.idx===17&&state.handoffFlag==='1'&&state.h2==='Ready to build your first practical AI workflow?'&&state.p==='Join the free live masterclass and learn Claude + 25+ AI tools for real work — step by step, in easy Hinglish.'&&JSON.stringify(state.signals)===JSON.stringify(['Live Online','Easy Hinglish','No Coding Required'])&&state.note==='Joining details follow after registration.'&&state.links.length===1&&state.links[0].path==='/gen-ai-masterclass/register-one-step'&&state.links[0].aria==='Get My Free Seat — ₹999 value, Free now';
    const trustOK=state.paymentFound&&state.paymentDisplay==='none'&&state.dividerDisplay==='none'&&!state.visiblePaymentCopy&&state.stylePresent&&state.legalVisible&&state.footerVisible&&state.legalText.includes('Disclaimer:')&&state.legalText.includes('Privacy Policy')&&state.legalText.includes('Terms & Conditions');
    const preserved=state.faqCount===15&&state.totalCtas===8&&state.h1.includes('Master Claude + 25+ AI Tools')&&state.testimonialFlag==='v1b'&&state.bonusFlag==='v1'&&state.handoffScript===1&&state.faqScript===1&&state.attribution;
    const responsive=!state.overflow&&state.rect&&Math.abs(state.rect.w-width)<=2&&state.rect.x>=-1&&state.links[0]&&state.links[0].rect.x>=0&&state.links[0].rect.x+state.links[0].rect.w<=width+1&&state.links[0].rect.h>=44;
    const assets=bad.length===0;
    console.log('FREE_FINAL_TRUST_V1',name,JSON.stringify({state,sig,errorsOK,bad,handoffOK,trustOK,preserved,responsive,assets}));
    if(!handoffOK||!trustOK||!preserved||!responsive||!assets||!errorsOK) failures.push(`${name}: ${JSON.stringify({state,sig,bad,handoffOK,trustOK,preserved,responsive,assets})}`);
    await page.close();
  }
  await browser.close();
  if(failures.length) throw new Error(failures.join('\n'));
  console.log('CLAUDE_FREE_FINAL_TRUST_V1_3VIEW_QA_PASS');
})().catch(e=>{console.error(e);process.exit(1)});
