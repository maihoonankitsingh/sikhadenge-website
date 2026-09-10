(()=>{
  'use strict';
  if(window.__SD_CLAUDE_BONUS_VALUE_V1__) return;
  window.__SD_CLAUDE_BONUS_VALUE_V1__=true;

  const TITLE='FREE AI MASTERCLASS BONUS KIT';
  const SUBTITLE='3 practical take-home resources to help you apply what you learn after the live session.';
  const LINE='Use them during and after the masterclass to turn the live learning into a repeatable AI workflow.';
  const ITEMS=[
    {
      title:'AI Workflow Playbook',
      benefit:'A repeatable step-by-step system to move from task → right tool → prompt → useful output.'
    },
    {
      title:'Prompt + Context Framework',
      benefit:'A reusable structure for clearer instructions, better context and more reliable AI responses.'
    },
    {
      title:'Workbook + Deep-Work Checklist',
      benefit:'A practical worksheet to plan focused AI work, apply the workflow and review the final output.'
    }
  ];

  function addStyles(){
    if(document.getElementById('sd-claude-bonus-value-v1-style')) return;
    const style=document.createElement('style');
    style.id='sd-claude-bonus-value-v1-style';
    style.textContent=`
      section[data-sd-claude-bonus-value="v1"] [data-sd-bonus-card-v1="1"]{
        height:auto!important;
        min-height:326px;
      }
      section[data-sd-claude-bonus-value="v1"] .sd-bonus-benefit-v1{
        margin:10px auto 15px;
        max-width:320px;
        color:#625b56;
        font-size:14px;
        line-height:1.5;
        font-weight:500;
        letter-spacing:-.01em;
        text-align:center;
      }
      section[data-sd-claude-bonus-value="v1"] [data-sd-bonus-card-v1="1"] > span:last-child{
        margin-top:auto!important;
      }
      @media (max-width:900px){
        section[data-sd-claude-bonus-value="v1"] [data-sd-bonus-card-v1="1"]{min-height:326px;}
        section[data-sd-claude-bonus-value="v1"] .sd-bonus-benefit-v1{font-size:13.5px;line-height:1.48;}
      }
      @media (max-width:520px){
        section[data-sd-claude-bonus-value="v1"] [data-sd-bonus-card-v1="1"]{min-height:0;}
        section[data-sd-claude-bonus-value="v1"] .sd-bonus-benefit-v1{
          margin:8px auto 13px;
          max-width:310px;
          font-size:13.5px;
          line-height:1.5;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function findSection(){
    const norm=s=>(s||'').replace(/\s+/g,' ').trim();
    return [...document.querySelectorAll('main section')].find(section=>{
      const strong=[...section.querySelectorAll('strong')].find(el=>norm(el.textContent)===TITLE);
      return !!strong;
    })||null;
  }

  function apply(){
    const section=findSection();
    if(!section) return false;
    if(section.getAttribute('data-sd-claude-bonus-value')==='v1') return true;

    const norm=s=>(s||'').replace(/\s+/g,' ').trim();
    const topBar=[...section.querySelectorAll('div')].find(el=>{
      const strong=el.querySelector(':scope > strong');
      return strong&&norm(strong.textContent)===TITLE;
    });
    const topSpan=topBar?.querySelector(':scope > span');
    if(!topSpan) return false;

    const cards=[...section.querySelectorAll('article')];
    if(cards.length!==3) return false;

    for(const item of ITEMS){
      const card=cards.find(el=>norm(el.querySelector('h3')?.textContent)===item.title);
      if(!card) return false;
    }

    topSpan.textContent=SUBTITLE;

    ITEMS.forEach(item=>{
      const card=cards.find(el=>norm(el.querySelector('h3')?.textContent)===item.title);
      const h3=card.querySelector('h3');
      card.setAttribute('data-sd-bonus-card-v1','1');
      let p=card.querySelector('.sd-bonus-benefit-v1');
      if(!p){
        p=document.createElement('p');
        p.className='sd-bonus-benefit-v1';
        h3.insertAdjacentElement('afterend',p);
      }
      p.textContent=item.benefit;
      const included=[...card.querySelectorAll('span')].find(el=>/^Included(?: with Free Seat)?$/i.test(norm(el.textContent)));
      if(included){
        included.textContent='Included with Free Seat';
        included.setAttribute('aria-label','Included with your free masterclass seat');
      }
    });

    const line=[...section.querySelectorAll('p')].find(el=>!el.classList.contains('sd-bonus-benefit-v1')&&/keep these resources after the session|repeatable AI workflow/i.test(norm(el.textContent)));
    if(line) line.textContent=LINE;

    section.setAttribute('data-sd-claude-bonus-value','v1');
    addStyles();
    return true;
  }

  function start(){
    let tries=0;
    const run=()=>{
      tries++;
      if(apply()||tries>=20) return;
      setTimeout(run,250);
    };
    run();
  }

  if(document.readyState==='complete') setTimeout(start,350);
  else window.addEventListener('load',()=>setTimeout(start,350),{once:true});
})();
