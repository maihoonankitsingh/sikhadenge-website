const puppeteer=require('puppeteer-core');

const expected={
  subtitle:'3 practical take-home resources to help you apply what you learn after the live session.',
  line:'Use them during and after the masterclass to turn the live learning into a repeatable AI workflow.',
  titles:['AI Workflow Playbook','Prompt + Context Framework','Workbook + Deep-Work Checklist'],
  benefits:[
    'A repeatable step-by-step system to move from task → right tool → prompt → useful output.',
    'A reusable structure for clearer instructions, better context and more reliable AI responses.',
    'A practical worksheet to plan focused AI work, apply the workflow and review the final output.'
  ]
};
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
      if(r.status()>=400&&(/\.css(?:\?|$)/.test(u)||/\.js(?:\?|$)/.test(u)||/claude-bonus-value-v1-20260910\.js/.test(u))) badAssets.push(`${r.status()} ${u}`);
    });
    await page.goto(`https://sikhadenge.in/masterclass/claude/free?bonus_v1_qa=${name}-${Date.now()}`,{waitUntil:'networkidle2',timeout:60000});
    await new Promise(r=>setTimeout(r,6000));

    const state=await page.evaluate(()=>{
      const n=s=>(s||'').replace(/\s+/g,' ').trim();
      const sections=[...document.querySelectorAll('main section')];
      const bonus=sections.find(s=>[...s.querySelectorAll('strong')].some(e=>n(e.textContent)==='FREE AI MASTERCLASS BONUS KIT'));
      const idx=bonus?sections.indexOf(bonus):-1;
      const prev=idx>0?sections[idx-1]:null,next=idx>=0?sections[idx+1]:null;
      const topBar=bonus?[...bonus.querySelectorAll('div')].find(el=>n(el.querySelector(':scope > strong')?.textContent)==='FREE AI MASTERCLASS BONUS KIT'):null;
      const subtitle=n(topBar?.querySelector(':scope > span')?.textContent);
      const cards=bonus?[...bonus.querySelectorAll('article')]:[];
      const cardData=cards.map(card=>{
        const rect=card.getBoundingClientRect();
        const benefit=card.querySelector('.sd-bonus-benefit-v1');
        const bs=benefit?getComputedStyle(benefit):null;
        const included=[...card.querySelectorAll('span')].find(e=>/Included with Free Seat/i.test(n(e.textContent)));
        return {
          title:n(card.querySelector('h3')?.textContent),
          benefit:n(benefit?.textContent),
          included:n(included?.textContent),
          aria:included?.getAttribute('aria-label')||'',
          flag:card.getAttribute('data-sd-bonus-card-v1')||'',
          w:Math.round(rect.width),h:Math.round(rect.height),
          benefitStyle:bs?{fontSize:bs.fontSize,lineHeight:bs.lineHeight,textAlign:bs.textAlign}:null
        };
      });
      const line=bonus?[...bonus.querySelectorAll('p')].find(p=>!p.classList.contains('sd-bonus-benefit-v1')):null;
      const sectionCtas=bonus?[...bonus.querySelectorAll('a[href]')].map(a=>({text:n(a.textContent),path:new URL(a.href,location.href).pathname})):[];
      const reg='/gen-ai-masterclass/register-one-step';
      const totalCtas=[...document.querySelectorAll('a[href]')].filter(a=>{try{return new URL(a.href,location.href).pathname===reg}catch{return false}}).length;
      const testimonial=document.getElementById('sd-claude-testimonials-v305');
      return {
        sectionCount:sections.length,faqCount:document.querySelectorAll('section[data-sd-claude-faq-v2="1"] details').length,totalCtas,
        pageOverflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+2,
        bonusFound:!!bonus,idx,flag:bonus?.getAttribute('data-sd-claude-bonus-value')||'',
        subtitle,line:n(line?.textContent),cards:cardData,sectionCtas,
        prev:n(prev?.querySelector('h2')?.textContent||prev?.innerText?.slice(0,120)),
        next:n(next?.querySelector('h2')?.textContent||next?.innerText?.slice(0,120)),
        scriptCount:[...document.scripts].filter(s=>(s.src||'').includes('/claude-bonus-value-v1-20260910.js')).length,
        runtime:!!window.__SD_CLAUDE_BONUS_VALUE_V1__,
        testimonialFlag:testimonial?.getAttribute('data-sd-testimonials-conversion')||'',
        testimonialScript:[...document.scripts].filter(s=>(s.src||'').includes('/claude-testimonials-conversion-v1b-20260910.js')).length,
        h1:n(document.querySelector('h1')?.textContent)
      };
    });

    const errors=signature(pageErrors);
    const coreOK=state.sectionCount===18&&state.faqCount===15&&state.totalCtas===8&&!state.pageOverflow&&state.h1.includes('Master Claude + 25+ AI Tools')&&state.testimonialFlag==='v1b'&&state.testimonialScript===1;
    const orderOK=state.idx===14&&state.prev==='Real learners. Real experiences.'&&state.next.startsWith('Learn AI. Apply it. Work smarter.');
    const bonusOK=state.bonusFound&&state.flag==='v1'&&state.runtime&&state.scriptCount===1&&state.subtitle===expected.subtitle&&state.line===expected.line&&state.cards.length===3&&state.sectionCtas.length===1&&state.sectionCtas[0].path==='/gen-ai-masterclass/register-one-step'&&state.sectionCtas[0].text.includes('₹999')&&state.sectionCtas[0].text.includes('Free');
    const contentOK=state.cards.every((c,i)=>c.title===expected.titles[i]&&c.benefit===expected.benefits[i]&&c.included==='Included with Free Seat'&&c.aria==='Included with your free masterclass seat'&&c.flag==='1');
    let responsiveOK=contentOK;
    if(name==='desktop') responsiveOK=responsiveOK&&state.cards.every(c=>Math.abs(c.w-399)<=2&&c.h>=326&&c.benefitStyle?.fontSize==='14px'&&c.benefitStyle?.textAlign==='center');
    if(name==='tablet') responsiveOK=responsiveOK&&state.cards.every(c=>Math.abs(c.w-233)<=2&&c.h>=326&&c.benefitStyle?.fontSize==='13.5px'&&c.benefitStyle?.textAlign==='center');
    if(name==='mobile') responsiveOK=responsiveOK&&state.cards.every(c=>Math.abs(c.w-366)<=2&&c.h>=285&&c.benefitStyle?.fontSize==='13.5px'&&c.benefitStyle?.textAlign==='center');
    const errorsOK=errorsWithinBaseline(errors);

    console.log('BONUS_V1',name,JSON.stringify({state,errors,errorsOK,badAssets,coreOK,orderOK,bonusOK,responsiveOK}));
    if(!coreOK||!orderOK||!bonusOK||!responsiveOK||!errorsOK||badAssets.length){failures.push(`${name}: ${JSON.stringify({state,errors,badAssets,coreOK,orderOK,bonusOK,responsiveOK})}`);}
    await page.close();
  }
  await browser.close();
  if(failures.length) throw new Error(failures.join('\n'));
  console.log('CLAUDE_BONUS_VALUE_V1_3VIEW_QA_PASS');
})().catch(e=>{console.error(e);process.exit(1)});
