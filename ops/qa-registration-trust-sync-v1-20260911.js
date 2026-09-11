'use strict';
const puppeteer=require('puppeteer-core');

const REG='/gen-ai-masterclass/register-one-step';
const NEW_ASSET='/registration-stable-page1-v72-trust-sync-v1-20260911.js';
const OLD_ASSET='/registration-stable-page1-v72.js';
const stable=['Live Activity','2 Hours Live','WhatsApp Community Access','5,00,000+ SikhaDenge Community'];
const legacy=['3 Hours Live','WhatsApp Joining Link','Bonus Resources'];

(async()=>{
  const browser=await puppeteer.launch({executablePath:process.env.CHROME,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
  for(const [name,w,h,m] of [['desktop',1440,1000,false],['tablet',768,1024,true],['mobile',390,844,true]]){
    const p=await browser.newPage();
    await p.setViewport({width:w,height:h,isMobile:m,hasTouch:m});
    const bad=[],pageErrors=[];
    p.on('pageerror',e=>pageErrors.push(String(e)));
    p.on('response',r=>{const u=r.url(); if(r.status()>=400&&(/\.css(?:\?|$)/.test(u)||/\.js(?:\?|$)/.test(u)||r.request().resourceType()==='document')) bad.push(`${r.status()} ${u}`)});

    await p.evaluateOnNewDocument((reg,stable,legacy)=>{
      const n=s=>(s||'').replace(/\s+/g,' ').trim();
      const has=(hay,needle)=>hay.toLocaleLowerCase().includes(String(needle).toLocaleLowerCase());
      const vis=el=>{if(!el)return false;const cs=getComputedStyle(el),r=el.getBoundingClientRect();return cs.display!=='none'&&cs.visibility!=='hidden'&&Number(cs.opacity||1)>0&&r.width>0&&r.height>0};
      function snap(){
        if(location.pathname!==reg||!document.body)return;
        const body=n(document.body.innerText);
        const oldNative=[...document.querySelectorAll('input')].filter(el=>['Enter name','Email','Phone number'].includes(el.getAttribute('placeholder')||''));
        const newInputs=['sd-reg-name','sd-reg-email','sd-reg-phone'].map(id=>document.getElementById(id)).filter(Boolean);
        const cont=[...document.querySelectorAll('button')].find(b=>n(b.textContent).includes('Continue — 2 quick questions'));
        const row={
          t:Math.round(performance.now()),
          stable:Object.fromEntries(stable.map(x=>[x,has(body,x)])),
          legacy:Object.fromEntries(legacy.map(x=>[x,has(body,x)])),
          oldNativeVisible:oldNative.filter(vis).length,
          newInputsVisible:newInputs.filter(vis).length,
          continueVisible:vis(cont),
          overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+2,
          body:body.slice(0,1200)
        };
        let arr=[];try{arr=JSON.parse(sessionStorage.getItem('__trust_sync_frames')||'[]')}catch{}
        arr.push(row); if(arr.length>120)arr=arr.slice(-120); sessionStorage.setItem('__trust_sync_frames',JSON.stringify(arr));
      }
      addEventListener('DOMContentLoaded',()=>{sessionStorage.removeItem('__trust_sync_frames');let c=0;snap();const id=setInterval(()=>{snap();if(++c>=70)clearInterval(id)},50)});
    },REG,stable,legacy);

    await p.goto(`https://sikhadenge.in/masterclass/claude/free?trust_sync_qa=${name}-${Date.now()}`,{waitUntil:'networkidle2',timeout:60000});
    await new Promise(r=>setTimeout(r,3000));
    const source=await p.evaluate(()=>{
      const a=document.querySelector('section[data-sd-claude-final-handoff-v1="1"] a[href]');
      return {flag:document.querySelector('section[data-sd-claude-final-handoff-v1="1"]')?.getAttribute('data-sd-claude-final-handoff-v1')||'',path:a?new URL(a.href,location.href).pathname:'',overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+2};
    });
    if(source.flag!=='1'||source.path!==REG||source.overflow) throw new Error(`Claude source handoff changed ${name}`);

    await Promise.all([
      p.waitForFunction(reg=>location.pathname===reg,{timeout:30000},REG),
      p.evaluate(()=>document.querySelector('section[data-sd-claude-final-handoff-v1="1"] a[href]').click())
    ]);
    await new Promise(r=>setTimeout(r,5000));

    const state=await p.evaluate((reg,newAsset,oldAsset)=>{
      const n=s=>(s||'').replace(/\s+/g,' ').trim();
      let frames=[];try{frames=JSON.parse(sessionStorage.getItem('__trust_sync_frames')||'[]')}catch{}
      const scripts=[...document.scripts].map(s=>s.src).filter(Boolean);
      const newInputs=['sd-reg-name','sd-reg-email','sd-reg-phone'].map(id=>document.getElementById(id));
      const nativeMain=document.querySelector('[data-sd-registration-native-suppressed="v1"]');
      const attr=localStorage.getItem('sd_funnel_attribution_v1');
      let attrObj=null;try{attrObj=JSON.parse(attr||'null')}catch{}
      return {
        path:location.pathname,url:location.href,frames,
        newAssetCount:scripts.filter(s=>s.includes(newAsset)).length,
        oldAssetCount:scripts.filter(s=>s.includes(oldAsset)).length,
        inputIds:newInputs.map(x=>x?.id||''),
        inputsRequired:newInputs.every(x=>x&&x.required),
        nativeSuppressed:!!nativeMain&&getComputedStyle(nativeMain).display==='none'&&nativeMain.getAttribute('aria-hidden')==='true',
        attributionFunnel:attrObj?.lastTouch?.funnel||attrObj?.firstTouch?.funnel||'',
        sessionId:sessionStorage.getItem('sd_session_id_v1')||attrObj?.sessionId||'',
        pageOverflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+2,
        h1:n(document.querySelector('h1')?.textContent)
      };
    },REG,NEW_ASSET,OLD_ASSET);

    const frames=state.frames;
    const sampled=frames.length>=10;
    const noLegacy=sampled&&frames.every(f=>Object.values(f.legacy).every(v=>v===false));
    const canonicalAlways=sampled&&frames.every(f=>stable.every(x=>f.stable[x]===true));
    const formAlways=sampled&&frames.every(f=>f.oldNativeVisible===0&&f.newInputsVisible===3&&f.continueVisible&&!f.overflow);
    const assetsOK=state.newAssetCount===1&&state.oldAssetCount===0&&bad.length===0;
    const stateOK=!!(state.path===REG&&!state.pageOverflow&&state.inputsRequired&&state.nativeSuppressed&&state.attributionFunnel==='claude-masterclass'&&state.sessionId);

    console.log('REG_TRUST_SYNC_V1',name,JSON.stringify({source,state:{...state,frames:undefined},sampled,noLegacy,canonicalAlways,formAlways,assetsOK,stateOK,firstFrame:frames[0],lastFrame:frames[frames.length-1],bad,pageErrors}));
    if(!(sampled&&noLegacy&&canonicalAlways&&formAlways&&assetsOK&&stateOK)) throw new Error(`registration trust sync QA failure ${name}`);
    await p.close();
  }
  await browser.close();
  console.log('REGISTRATION_TRUST_SYNC_V1_3VIEW_QA_PASS');
})().catch(e=>{console.error(e);process.exit(1)});
