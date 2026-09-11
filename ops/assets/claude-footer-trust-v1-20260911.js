(()=>{
  'use strict';

  const ROOT_FLAG='data-claude-footer-trust-v1';
  const SECTION_FLAG='data-sd-claude-footer-trust-v1';
  const POLICY_PATHS=new Set(['/privacy-policy','/terms']);
  const norm=s=>String(s||'').replace(/\s+/g,' ').trim();

  function findDisclaimerRoot(){
    const matches=[...document.querySelectorAll('body *')].filter(el=>{
      const t=norm(el.innerText||el.textContent);
      return t.startsWith('Disclaimer:') &&
        t.includes('ThinkGrow Private Limited') &&
        t.includes('Privacy Policy') &&
        t.includes('Terms & Conditions') &&
        t.length<2500;
    });
    if(!matches.length) return null;
    matches.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length);
    return matches[0];
  }

  function apply(){
    const root=findDisclaimerRoot();
    if(!root) return false;

    const links=[...root.querySelectorAll('a[href]')].filter(a=>{
      try{return POLICY_PATHS.has(new URL(a.href,location.href).pathname)}catch{return false}
    });
    if(links.length!==2) return false;

    root.setAttribute(SECTION_FLAG,'1');
    for(const a of links){
      a.style.setProperty('display','inline-flex','important');
      a.style.setProperty('align-items','center','important');
      a.style.setProperty('justify-content','center','important');
      a.style.setProperty('min-height','44px','important');
      a.style.setProperty('padding','8px 4px','important');
      a.style.setProperty('font-size','12px','important');
      a.style.setProperty('line-height','20px','important');
      a.style.setProperty('vertical-align','middle','important');
      a.style.setProperty('text-underline-offset','3px','important');
      a.setAttribute('data-sd-policy-touch-target-v1','1');
    }
    document.documentElement.setAttribute(ROOT_FLAG,'1');
    return true;
  }

  const start=()=>{
    [0,120,500,1500,3000].forEach(ms=>setTimeout(apply,ms));
    const observer=new MutationObserver(()=>apply());
    observer.observe(document.body,{childList:true,subtree:true});
    setTimeout(()=>observer.disconnect(),5000);
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
