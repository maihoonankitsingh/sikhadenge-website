'use strict';
const puppeteer=require('puppeteer-core');

const disclaimer='Disclaimer: The information, tools, examples and strategies shared in this masterclass are provided for educational and informational purposes only. Individual results depend on effort, experience, background and circumstances and are not guaranteed. Any testimonials, productivity examples, salary references or outcomes shown on this website are illustrative and should not be interpreted as a promise of specific results. Third-party trademarks, logos and product names belong to their respective owners. SikhaDenge and ThinkGrow Private Limited are not affiliated with or endorsed by those third-party brands unless explicitly stated. Session schedules, bonuses, prices and promotional terms may change where applicable. © 2026 ThinkGrow Private Limited · SikhaDenge Privacy Policy · Terms & Conditions';
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
    await page.goto(`https://sikhadenge.in/masterclass/claude/free?footer_trust_v1_qa=${name}-${Date.now()}`,{waitUntil:'networkidle2',timeout:60000});
    await new Promise(r=>setTimeout(r,5500));

    const state=await page.evaluate(()=>{
      const n=s=>(s||'').replace(/\s+/g,' ').trim();
      const reg='/gen-ai-masterclass/register-one-step';
      const sections=[...document.querySelectorAll('main section')];
      const final=document.querySelector('section[data-sd-claude-final-handoff-v1="1"]');
      const faq=document.querySelector('section[data-sd-claude-faq-v2="1"]');
      const nodes=[...document.querySelectorAll('body *')];
      const footer=nodes.filter(el=>{
        const t=n(el.innerText||el.textContent);
        return t.startsWith('Disclaimer:')&&t.includes('ThinkGrow Private Limited')&&t.includes('Privacy Policy')&&t.includes('Terms & Conditions')&&t.length<2500;
      }).sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0]||null;
      const links=footer?[...footer.querySelectorAll('a[href]')].filter(a=>{try{return ['/privacy-policy','/terms'].includes(new URL(a.href,location.href).pathname)}catch{return false}}).map(a=>{const r=a.getBoundingClientRect(),cs=getComputedStyle(a);return {text:n(a.textContent),path:new URL(a.href,location.href).pathname,flag:a.getAttribute('data-sd-policy-touch-target-v1')||'',rect:{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)},fontSize:parseFloat(cs.fontSize)||0,lineHeight:parseFloat(cs.lineHeight)||0,display:cs.display}}):[];
      const scripts=[...document.scripts].map(s=>s.src).filter(Boolean);
      const regLinks=[...document.querySelectorAll('a[href]')].filter(a=>{try{return new URL(a.href,location.href).pathname===reg}catch{return false}});
      return {
        sectionCount:sections.length,
        faqCount:faq?.querySelectorAll('details.sd-faq-v2-item').length||0,
        final:!!final,
        finalText:n(final?.innerText),
        footerFound:!!footer,
        footerText:n(footer?.innerText||footer?.textContent),
        rootFlag:document.documentElement.getAttribute('data-claude-footer-trust-v1')||'',
        sectionFlag:footer?.getAttribute('data-sd-claude-footer-trust-v1')||'',
        links,
        regCount:regLinks.length,
        regPathsOK:regLinks.length===8&&regLinks.every(a=>new URL(a.href,location.href).pathname===reg),
        testimonialFlag:document.documentElement.getAttribute('data-claude-testimonials-conversion-v1')||'',
        bonusFlag:document.documentElement.getAttribute('data-claude-bonus-value-v1')||'',
        attribution:scripts.some(s=>s.includes('/funnel-attribution-bridge-v1.js')),
        faqScript:scripts.filter(s=>s.includes('/claude-faq-conversion-v1-20260910.js')).length,
        handoffScript:scripts.filter(s=>s.includes('/claude-final-handoff-v1-20260910.js')).length,
        footerScript:scripts.filter(s=>s.includes('/claude-footer-trust-v1-20260911.js')).length,
        securePaymentVisible:n(document.body.innerText).includes('SECURE PAYMENT OPTIONS'),
        overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+2,
        h1:n(document.querySelector('h1')?.textContent)
      };
    });

    const errors=signature(pageErrors),errorsOK=errorsWithinBaseline(errors);
    const coreOK=state.sectionCount===18&&state.faqCount===15&&state.final&&state.regCount===8&&state.regPathsOK&&state.testimonialFlag==='v1b'&&state.bonusFlag==='v1'&&state.attribution&&state.faqScript===1&&state.handoffScript===1&&state.h1.includes('Master Claude + 25+ AI Tools');
    const footerOK=state.footerFound&&state.footerText===disclaimer&&state.rootFlag==='1'&&state.sectionFlag==='1'&&state.footerScript===1&&!state.securePaymentVisible;
    const linksOK=state.links.length===2&&state.links[0].path==='/privacy-policy'&&state.links[1].path==='/terms'&&state.links.every(x=>x.flag==='1'&&x.rect.h>=44&&x.fontSize>=12&&x.rect.x>=0&&x.rect.x+x.rect.w<=width+1);
    const layoutOK=!state.overflow&&badAssets.length===0;
    console.log('FOOTER_TRUST_V1',name,JSON.stringify({state,errors,errorsOK,badAssets,coreOK,footerOK,linksOK,layoutOK}));
    if(!(coreOK&&footerOK&&linksOK&&layoutOK&&errorsOK)) failures.push(`${name}: ${JSON.stringify({state,errors,badAssets,coreOK,footerOK,linksOK,layoutOK})}`);
    await page.close();
  }
  await browser.close();
  if(failures.length) throw new Error(failures.join('\n'));
  console.log('CLAUDE_FOOTER_TRUST_V1_3VIEW_QA_PASS');
})().catch(e=>{console.error(e);process.exit(1)});
