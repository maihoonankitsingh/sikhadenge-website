const puppeteer=require('puppeteer-core');

const expectedCopy='Join the free live masterclass and learn a repeatable AI workflow for research, content, productivity and everyday work — in easy Hinglish, with no coding required.';
const errorMax={'react-418':26,'react-423':1,'react-425':2};
const norm=s=>(s||'').replace(/\s+/g,' ').trim();
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
    page.on('response',r=>{
      const u=r.url();
      if(r.status()>=400&&(/\.css(?:\?|$)/.test(u)||/\.js(?:\?|$)/.test(u))) badAssets.push(`${r.status()} ${u}`);
    });
    await page.goto(`https://sikhadenge.in/masterclass/claude/free?closing_v1_qa=${name}-${Date.now()}`,{waitUntil:'networkidle2',timeout:60000});
    await new Promise(r=>setTimeout(r,6000));

    const state=await page.evaluate(()=>{
      const n=s=>(s||'').replace(/\s+/g,' ').trim();
      const reg='/gen-ai-masterclass/register-one-step';
      const sections=[...document.querySelectorAll('main section')];
      const closing=sections.find(s=>n(s.innerText).includes('Learn AI. Apply it. Work smarter.'));
      const idx=closing?sections.indexOf(closing):-1;
      const prev=idx>0?sections[idx-1]:null,next=idx>=0?sections[idx+1]:null;
      const h2=n(closing?.querySelector('h2')?.textContent);
      const p=n(closing?.querySelector('p')?.textContent);
      const ctas=closing?[...closing.querySelectorAll('a[href]')].map(a=>{const r=a.getBoundingClientRect();return {text:n(a.textContent),path:new URL(a.href,location.href).pathname,aria:a.getAttribute('aria-label')||'',x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}}):[];
      const sr=closing?.getBoundingClientRect();
      const totalCtas=[...document.querySelectorAll('a[href]')].filter(a=>{try{return new URL(a.href,location.href).pathname===reg}catch{return false}}).length;
      const testimonial=document.getElementById('sd-claude-testimonials-v305');
      const bonus=sections.find(s=>s.getAttribute('data-sd-claude-bonus-value')==='v1');
      const newChunk=[...document.scripts].filter(s=>(s.src||'').includes('audience-v1b-closing-v1-20260910.js')).length;
      const oldParagraphVisible=n(document.body.innerText).includes("Reserve your free seat and learn practical workflows across today's most useful AI tools.");
      return {
        sectionCount:sections.length,
        faqCount:document.querySelectorAll('section[data-sd-claude-faq-v2="1"] details').length,
        totalCtas,
        pageOverflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+2,
        found:!!closing,idx,h2,p,ctas,
        sectionRect:sr?{x:Math.round(sr.x),w:Math.round(sr.width),h:Math.round(sr.height)}:null,
        prev:n(prev?.innerText?.slice(0,180)),next:n(next?.innerText?.slice(0,180)),
        h1:n(document.querySelector('h1')?.textContent),
        testimonialFlag:testimonial?.getAttribute('data-sd-testimonials-conversion')||'',
        bonusFlag:bonus?.getAttribute('data-sd-claude-bonus-value')||'',
        newChunk,oldParagraphVisible
      };
    });

    const errors=signature(pageErrors);
    const errorsOK=errorsWithinBaseline(errors);
    const coreOK=state.sectionCount===18&&state.faqCount===15&&state.totalCtas===8&&!state.pageOverflow&&state.h1.includes('Master Claude + 25+ AI Tools')&&state.testimonialFlag==='v1b'&&state.bonusFlag==='v1';
    const orderOK=state.idx===15&&state.prev.startsWith('FREE AI MASTERCLASS BONUS KIT')&&state.next.startsWith('FAQ Frequently asked questions.');
    const closingOK=state.found&&state.h2==='Learn AI. Apply it. Work smarter.'&&state.p===expectedCopy&&!state.oldParagraphVisible&&state.newChunk===1&&state.ctas.length===1&&state.ctas[0].path==='/gen-ai-masterclass/register-one-step'&&state.ctas[0].text.includes('₹999')&&state.ctas[0].text.includes('Free')&&state.ctas[0].aria==='Get My Free Seat — ₹999 value, Free now';
    const rectOK=state.sectionRect&&Math.abs(state.sectionRect.w-width)<=2&&state.sectionRect.x>=-1&&state.ctas[0]&&state.ctas[0].x>=0&&state.ctas[0].x+state.ctas[0].w<=width+1&&state.ctas[0].h>=44;

    console.log('CLOSING_V1',name,JSON.stringify({state,errors,errorsOK,badAssets,coreOK,orderOK,closingOK,rectOK}));
    if(!coreOK||!orderOK||!closingOK||!rectOK||!errorsOK||badAssets.length){
      failures.push(`${name}: ${JSON.stringify({state,errors,badAssets,coreOK,orderOK,closingOK,rectOK})}`);
    }
    await page.close();
  }
  await browser.close();
  if(failures.length) throw new Error(failures.join('\n'));
  console.log('CLAUDE_CLOSING_V1_3VIEW_QA_PASS');
})().catch(e=>{console.error(e);process.exit(1)});
