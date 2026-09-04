#!/usr/bin/env bash
set -Eeuo pipefail

export HOME=/root
export PM2_HOME=/root/.pm2

PORT="3940"
LIVE_URL="https://sikhadenge.in/masterclass/ai-video"
REGISTER_URL="https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass"

GOLDEN_RELEASE="/var/www/sikhadenge.in/releases/production-ai-workflow-premium-zero-build-20260829-110420"
GOLDEN_HTML="$GOLDEN_RELEASE/.next/server/pages/masterclass/ai-video.html"
GOLDEN_RUNTIME="$GOLDEN_RELEASE/public/ai-video-icons-hotfix.js"
GOLDEN_BACKUP="/root/ai-video-GOLDEN-ADS-LIVE-20260903-125516"
EXPECTED_RUNTIME_SHA="6e8c050e8271f95d20e5e7df1f650dba477142eadd694aefdf6259e2fa73cb51"

TS="$(date +%Y%m%d-%H%M%S)"
NEW_RELEASE="/var/www/sikhadenge.in/releases/production-ai-video-golden-faq-premium-v3-${TS}"
NEW_APP="sikhadenge-ai-video-golden-faq-v3-3940-${TS}"
TEMP_APP="sikhadenge-ai-video-golden-faq-v3-preflight-${TS}"
NEW_HTML="$NEW_RELEASE/.next/server/pages/masterclass/ai-video.html"
STATE_FILE="/root/ai-video-golden-faq-v3-state-${TS}.env"
LIVE_BODY="/tmp/ai-video-golden-faq-v3-${TS}.html"

CURRENT_APP=""
CURRENT_CWD=""
BASE_HTML=""
TEMP_STARTED=0
CUTOVER=0

log(){ printf '\n[%s] %s\n' "$(date '+%H:%M:%S')" "$*"; }
fail(){ echo "❌ $*" >&2; return 1; }

pm2_value(){
  local app="$1" key="$2"
  pm2 jlist | python3 -c '
import json,sys
app,key=sys.argv[1],sys.argv[2]
for item in json.load(sys.stdin):
    if item.get("name")==app:
        env=item.get("pm2_env") or {}
        print(env.get(key,"missing"))
        break
else:
    print("missing")
' "$app" "$key"
}

wait_200(){
  local url="$1" tries="${2:-45}" code=""
  for ((i=1;i<=tries;i++)); do
    code="$(curl -L -sS -o /dev/null -w '%{http_code}' "$url" || true)"
    [[ "$code" == "200" ]] && return 0
    sleep 1
  done
  echo "Last HTTP: ${code:-none} for $url" >&2
  return 1
}

cleanup_temp(){
  set +e
  if [[ "$TEMP_STARTED" == "1" ]]; then
    pm2 delete "$TEMP_APP" >/dev/null 2>&1 || true
    TEMP_STARTED=0
  fi
  set -e
}

rollback(){
  trap - ERR INT TERM
  set +e
  echo
  echo "======================================================"
  echo "⚠️ FAQ V3 CUTOVER FAILED — RESTORING PREVIOUS LIVE APP"
  echo "======================================================"
  pm2 stop "$NEW_APP" >/dev/null 2>&1 || true
  pm2 delete "$NEW_APP" >/dev/null 2>&1 || true
  if [[ -n "$CURRENT_APP" ]]; then
    pm2 restart "$CURRENT_APP" >/dev/null 2>&1 || true
    wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || true
    wait_200 "${LIVE_URL}?faqV3Rollback=${TS}" 45 || true
  fi
  pm2 save >/dev/null 2>&1 || true
  echo "Previous app restored: ${CURRENT_APP:-unknown}"
}

on_error(){
  local rc="$1" line="$2"
  trap - ERR INT TERM
  echo "❌ Deployment error at line $line (exit $rc)" >&2
  cleanup_temp || true
  [[ "$CUTOVER" == "1" ]] && rollback || true
  exit "$rc"
}

trap 'rc=$?; on_error "$rc" "$LINENO"' ERR
trap 'on_error 130 "$LINENO"' INT TERM

echo "======================================================"
echo " SIKHADENGE AI VIDEO — PREMIUM FAQ V3 ONLY"
echo "======================================================"
echo "New release: $NEW_RELEASE"
echo "Scope:       FAQ content + typography + spacing + cards + SVG chevron only"
echo "Safety:      dynamic current-app rollback, no Nginx reload, golden immutable"

log "1/10 — Required tools"
for c in pm2 curl python3 cp grep fuser readlink sha256sum lsattr chattr node ss; do
  command -v "$c" >/dev/null || fail "Missing command: $c"
done

log "2/10 — Identify current live port-3940 app"
LISTENER_PID="$(fuser -n tcp "$PORT" 2>/dev/null | tr ' ' '\n' | grep -E '^[0-9]+$' | head -1 || true)"
[[ -n "$LISTENER_PID" ]] || fail "No listener on port $PORT"
CURRENT_CWD="$(readlink -f "/proc/${LISTENER_PID}/cwd" 2>/dev/null || true)"
CURRENT_APP="$(pm2 jlist | python3 -c '
import json,os,sys
cwd=os.path.realpath(sys.argv[1]) if sys.argv[1] else ""
for item in json.load(sys.stdin):
    env=item.get("pm2_env") or {}
    pcwd=env.get("pm_cwd") or ""
    if env.get("status")=="online" and pcwd and os.path.realpath(pcwd)==cwd:
        print(item.get("name", ""))
        break
' "$CURRENT_CWD")"
[[ -n "$CURRENT_APP" ]] || fail "Could not map current listener to PM2"
case "$CURRENT_CWD" in
  "$GOLDEN_RELEASE"|/var/www/sikhadenge.in/releases/production-ai-video-golden-faq-*) ;;
  *) fail "Unexpected current AI Video release: $CURRENT_CWD" ;;
esac
BASE_HTML="$CURRENT_CWD/.next/server/pages/masterclass/ai-video.html"
[[ -f "$BASE_HTML" ]] || fail "Current live HTML missing"
echo "Current app: $CURRENT_APP"
echo "Current CWD: $CURRENT_CWD"

log "3/10 — Verify current page + golden recovery integrity"
[[ -d "$GOLDEN_BACKUP" ]] || fail "Golden backup missing"
[[ -f "$GOLDEN_HTML" && -f "$GOLDEN_RUNTIME" ]] || fail "Golden files missing"
[[ "$(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Golden runtime SHA changed"
[[ "$(lsattr -d "$GOLDEN_HTML" | awk '{print $1}')" == *i* ]] || fail "Golden HTML lost immutable lock"
[[ "$(lsattr -d "$GOLDEN_RUNTIME" | awk '{print $1}')" == *i* ]] || fail "Golden runtime lost immutable lock"
[[ -f "$CURRENT_CWD/public/ai-video-icons-hotfix.js" ]] || fail "Current runtime missing"
[[ "$(sha256sum "$CURRENT_CWD/public/ai-video-icons-hotfix.js" | awk '{print $1}')" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Current runtime drift"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$BASE_HTML" || fail "Advanced page marker missing: $marker"
done
python3 - "$BASE_HTML" <<'PY'
from pathlib import Path
import re,sys
s=Path(sys.argv[1]).read_text(encoding='utf-8')
patterns=[
 r'<script id="ai-video-faq-final-only-inline">.*?</script>',
 r'<script id="ai-video-faq-premium-v2-inline">.*?</script>',
 r'<script id="ai-video-faq-premium-v3-inline">.*?</script>',
]
count=sum(len(re.findall(p,s,re.S)) for p in patterns)
if count not in (0,1):
    raise SystemExit(f'Unexpected FAQ runtime block count: {count}')
print(f'Existing FAQ runtime blocks: {count}')
PY
echo "✅ Current advanced page and recovery baseline verified"

log "4/10 — Clone current live release"
[[ ! -e "$NEW_RELEASE" ]] || fail "New release already exists"
mkdir -p "$NEW_RELEASE"
cp -a "$CURRENT_CWD/." "$NEW_RELEASE/"
chattr -i "$NEW_HTML" "$NEW_RELEASE/public/ai-video-icons-hotfix.js" 2>/dev/null || true
[[ "$(sha256sum "$NEW_RELEASE/public/ai-video-icons-hotfix.js" | awk '{print $1}')" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Runtime drift in clone"
echo "✅ Current live page cloned"

log "5/10 — Replace only FAQ runtime with hard-scoped futuristic V3"
FAQ_JS="$(mktemp)"
cat >"$FAQ_JS" <<'JS'
(function(){
  'use strict';
  var FAQS=[
    ["What will I learn in the AI Video Generation Masterclass?","You’ll learn a practical AI-video workflow covering idea development, prompt structure, shot planning, text-to-video, image-to-video, camera direction, refinement and final output for ads, reels and cinematic content."],
    ["Is this AI video masterclass beginner-friendly?","Yes. The session is designed for beginners and explains the complete workflow step by step, even if you have never used an AI video-generation tool before."],
    ["How long is the live masterclass?","It is a focused 2-hour live masterclass built around demonstrations, practical workflows and live Q&A."],
    ["Is the session live or recorded?","This is primarily a live learning session. Joining live gives you the best experience because you can follow the demonstrations and ask questions in real time."],
    ["Do I need video-editing experience before joining?","No. Previous editing experience is not required. The workflow starts from the fundamentals and is designed to remain easy to follow."],
    ["Do I need coding or technical AI knowledge?","No coding or advanced technical background is required. The entire workflow is creator-friendly and focused on visual execution."],
    ["Will you cover both text-to-video and image-to-video?","Yes. You’ll understand both workflows, including prompting, reference images, motion control, iteration and visual consistency."],
    ["Which AI video tools will be discussed?","The masterclass introduces leading AI video tools such as Kling AI, Higgsfield, Google Veo, Runway, Pika, Luma AI, Hailuo AI and Seedance, while focusing on transferable workflow skills."],
    ["Will I learn how to write better prompts for AI video?","Yes. You’ll learn how to define subject, action, camera, lighting, mood, timing and movement so AI models receive much clearer creative direction."],
    ["Will the masterclass cover camera movement, lighting and shot design?","Yes. You’ll learn how camera movement, framing, lighting, composition and shot intention influence the final AI-generated video."],
    ["Will I learn how to keep multiple AI-generated scenes consistent?","Yes. We cover reference-based generation, shot planning and controlled iteration so multiple clips feel visually connected."],
    ["Will we create ads, reels and product-style videos?","Yes. The practical workflows are designed around short-form ads, reels, product films, cinematic clips and creator content."],
    ["Do I need every paid AI tool before joining?","No. You can understand the complete workflow without subscribing to every tool. Individual platforms may have their own free credits, limits or paid plans."],
    ["Who is this masterclass most useful for?","It is ideal for creators, video editors, freelancers, marketers, agencies, founders, students and beginners who want to create better AI-generated video content."],
    ["What language is the masterclass in, and can I ask questions live?","The session is taught in easy Hinglish and includes live Q&A so you can ask questions while following the demonstrations."]
  ];
  var STYLE_ID='ai-video-faq-premium-v3-style';
  var PATCHED=false;
  function esc(v){return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}
  function findFaq(){return document.querySelector('#faq,[data-section="faq"],[data-faq-section]')||Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){return /frequently asked|common questions|know before|faq/i.test((s.textContent||'').replace(/\s+/g,' '));})||null;}
  function installStyle(){
    if(document.getElementById(STYLE_ID))return;
    var st=document.createElement('style');st.id=STYLE_ID;
    st.textContent=[
      'html body #faq[data-faq-v3="true"]{--faq-bg:#f7f9fc;--faq-card:rgba(255,255,255,.96);--faq-text:#0b1220;--faq-muted:#667085;--faq-border:#e2e8f0;--faq-accent:#6366f1;--faq-accent2:#8b5cf6;position:relative!important;isolation:isolate!important;overflow:hidden!important;padding:96px 0 102px!important;background:radial-gradient(circle at 8% 0%,rgba(99,102,241,.10),transparent 29%),radial-gradient(circle at 94% 8%,rgba(59,130,246,.08),transparent 26%),linear-gradient(180deg,#fbfcff 0%,#f7f9fc 100%)!important}',
      'html body #faq[data-faq-v3="true"] *{box-sizing:border-box!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-shell{width:min(1120px,calc(100% - 40px))!important;margin:0 auto!important;padding:0!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-head{max-width:850px!important;margin:0 auto 42px!important;text-align:center!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-badge{display:inline-flex!important;align-items:center!important;gap:9px!important;min-height:36px!important;padding:0 15px!important;border:1px solid rgba(99,102,241,.18)!important;border-radius:999px!important;background:rgba(255,255,255,.92)!important;color:#4f46e5!important;box-shadow:0 8px 24px rgba(15,23,42,.04)!important;font-size:11px!important;font-weight:800!important;line-height:1!important;letter-spacing:.11em!important;text-transform:uppercase!important;text-decoration:none!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-dot{width:7px!important;height:7px!important;border-radius:50%!important;background:linear-gradient(135deg,#6366f1,#8b5cf6)!important;box-shadow:0 0 0 5px rgba(99,102,241,.08)!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-title{margin:17px auto 13px!important;color:#0b1220!important;background:none!important;font-size:clamp(38px,4.8vw,56px)!important;font-weight:800!important;line-height:1.05!important;letter-spacing:-.048em!important;text-decoration:none!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-title span{background:linear-gradient(90deg,#4f46e5,#7c3aed 48%,#2563eb)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;text-decoration:none!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-sub{max-width:700px!important;margin:0 auto!important;color:#64748b!important;background:none!important;font-size:16px!important;font-weight:450!important;line-height:1.7!important;text-decoration:none!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-list{display:grid!important;width:min(100%,1030px)!important;gap:13px!important;margin:0 auto!important;padding:0!important}',
      'html body #faq[data-faq-v3="true"] details.faq-v3-item{display:block!important;overflow:hidden!important;margin:0!important;padding:0!important;border:1px solid #e2e8f0!important;border-radius:18px!important;background:rgba(255,255,255,.96)!important;box-shadow:0 3px 12px rgba(15,23,42,.035)!important}',
      'html body #faq[data-faq-v3="true"] details.faq-v3-item[open]{border-color:rgba(99,102,241,.28)!important;background:linear-gradient(180deg,#fff,#fbfbff)!important;box-shadow:0 18px 42px rgba(79,70,229,.085)!important}',
      'html body #faq[data-faq-v3="true"] summary.faq-v3-question{display:grid!important;grid-template-columns:minmax(0,1fr) 38px!important;align-items:center!important;gap:20px!important;min-height:72px!important;margin:0!important;padding:16px 18px 16px 23px!important;border:0!important;border-radius:0!important;outline:0!important;list-style:none!important;cursor:pointer!important;background:transparent!important;color:#0b1220!important;text-decoration:none!important;box-shadow:none!important;font-size:15.5px!important;font-weight:620!important;line-height:1.45!important;letter-spacing:-.012em!important}',
      'html body #faq[data-faq-v3="true"] summary.faq-v3-question::-webkit-details-marker{display:none!important}',
      'html body #faq[data-faq-v3="true"] summary.faq-v3-question>span:first-child{display:block!important;min-width:0!important;margin:0!important;padding:0!important;background:none!important;color:#0b1220!important;-webkit-text-fill-color:#0b1220!important;font:inherit!important;font-size:15.5px!important;font-weight:620!important;line-height:1.45!important;letter-spacing:-.012em!important;text-decoration:none!important;text-shadow:none!important;box-shadow:none!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-chevron{display:grid!important;place-items:center!important;width:36px!important;height:36px!important;min-width:36px!important;min-height:36px!important;margin:0!important;padding:0!important;border:1px solid #e0e7f2!important;border-radius:11px!important;background:linear-gradient(180deg,#fff,#f7f9fc)!important;color:#64748b!important;box-shadow:0 2px 5px rgba(15,23,42,.04)!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-chevron svg{display:block!important;width:17px!important;height:17px!important;fill:none!important;stroke:currentColor!important;stroke-width:2!important;stroke-linecap:round!important;stroke-linejoin:round!important}',
      'html body #faq[data-faq-v3="true"] details[open] .faq-v3-chevron{transform:rotate(180deg)!important;color:#4f46e5!important;border-color:rgba(99,102,241,.22)!important;background:#f4f4ff!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-answer{display:block!important;margin:0!important;padding:0 80px 24px 23px!important;background:transparent!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-answer:before{content:""!important;display:block!important;width:34px!important;height:2px!important;margin:0 0 14px!important;border-radius:999px!important;background:linear-gradient(90deg,#6366f1,#8b5cf6)!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-answer p{display:block!important;max-width:870px!important;margin:0!important;padding:0!important;color:#667085!important;-webkit-text-fill-color:#667085!important;background:none!important;font-size:14.5px!important;font-weight:430!important;line-height:1.75!important;letter-spacing:0!important;text-decoration:none!important;box-shadow:none!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-foot{display:flex!important;justify-content:center!important;margin:30px 0 0!important;padding:0!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-foot-inner{display:inline-flex!important;align-items:center!important;gap:9px!important;padding:10px 15px!important;border:1px solid rgba(148,163,184,.18)!important;border-radius:999px!important;background:rgba(255,255,255,.7)!important;color:#64748b!important;font-size:12.5px!important;font-weight:500!important;line-height:1.2!important;text-decoration:none!important}',
      'html body #faq[data-faq-v3="true"] .faq-v3-check{display:grid!important;place-items:center!important;width:21px!important;height:21px!important;border-radius:50%!important;background:linear-gradient(135deg,#6366f1,#8b5cf6)!important;color:#fff!important;font-size:11px!important;font-weight:800!important}',
      '@media(max-width:768px){html body #faq[data-faq-v3="true"]{padding:72px 0 80px!important}html body #faq[data-faq-v3="true"] .faq-v3-shell{width:min(100% - 24px,1120px)!important}html body #faq[data-faq-v3="true"] .faq-v3-head{margin-bottom:30px!important}html body #faq[data-faq-v3="true"] .faq-v3-title{font-size:34px!important;line-height:1.08!important}html body #faq[data-faq-v3="true"] .faq-v3-sub{font-size:14.5px!important}html body #faq[data-faq-v3="true"] .faq-v3-list{gap:10px!important}html body #faq[data-faq-v3="true"] details.faq-v3-item{border-radius:16px!important}html body #faq[data-faq-v3="true"] summary.faq-v3-question{grid-template-columns:minmax(0,1fr) 34px!important;min-height:66px!important;gap:13px!important;padding:14px 13px 14px 17px!important;font-size:14px!important}html body #faq[data-faq-v3="true"] summary.faq-v3-question>span:first-child{font-size:14px!important;line-height:1.45!important}html body #faq[data-faq-v3="true"] .faq-v3-chevron{width:32px!important;height:32px!important;min-width:32px!important;min-height:32px!important;border-radius:10px!important}html body #faq[data-faq-v3="true"] .faq-v3-chevron svg{width:15px!important;height:15px!important}html body #faq[data-faq-v3="true"] .faq-v3-answer{padding:0 50px 20px 17px!important}html body #faq[data-faq-v3="true"] .faq-v3-answer p{font-size:13.5px!important;line-height:1.72!important}}',
      '@media(prefers-reduced-motion:reduce){html body #faq[data-faq-v3="true"] *,html body #faq[data-faq-v3="true"] *:before,html body #faq[data-faq-v3="true"] *:after{transition:none!important}}'
    ].join('');
    document.head.appendChild(st);
  }
  function updateSchema(){
    var data={'@context':'https://schema.org','@type':'FAQPage',mainEntity:FAQS.map(function(i){return{'@type':'Question',name:i[0],acceptedAnswer:{'@type':'Answer',text:i[1]}};})};
    var found=false;Array.prototype.slice.call(document.querySelectorAll('script[type="application/ld+json"]')).forEach(function(s){try{var j=JSON.parse(s.textContent||'{}');if(j&&j['@type']==='FAQPage'){s.textContent=JSON.stringify(data);s.setAttribute('data-ai-faq-v3','1');found=true;}}catch(e){}});
    if(!found){var s=document.createElement('script');s.type='application/ld+json';s.setAttribute('data-ai-faq-v3','1');s.textContent=JSON.stringify(data);document.head.appendChild(s);}
  }
  function patch(){
    if(PATCHED)return true;var section=findFaq();if(!section)return false;installStyle();
    section.className='';section.id='faq';section.setAttribute('data-faq-v3','true');section.setAttribute('aria-labelledby','faq-v3-title');
    var chev='<span class="faq-v3-chevron" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg></span>';
    var items=FAQS.map(function(i){return '<details class="faq-v3-item"><summary class="faq-v3-question"><span>'+esc(i[0])+'</span>'+chev+'</summary><div class="faq-v3-answer"><p>'+esc(i[1])+'</p></div></details>';}).join('');
    section.innerHTML='<div class="faq-v3-shell"><div class="faq-v3-head"><div class="faq-v3-badge"><span class="faq-v3-dot"></span>AI VIDEO MASTERCLASS FAQS</div><h2 class="faq-v3-title" id="faq-v3-title">Questions before you <span>join live?</span></h2><p class="faq-v3-sub">Everything you need to know about the live session, AI video tools, learning level and practical workflow.</p></div><div class="faq-v3-list">'+items+'</div><div class="faq-v3-foot"><div class="faq-v3-foot-inner"><span class="faq-v3-check">✓</span>Beginner friendly · Live Q&A · No coding required</div></div></div>';
    Array.prototype.forEach.call(section.querySelectorAll('details'),function(d){d.addEventListener('toggle',function(){if(!d.open)return;Array.prototype.forEach.call(section.querySelectorAll('details[open]'),function(o){if(o!==d)o.open=false;});});});
    updateSchema();PATCHED=true;document.documentElement.setAttribute('data-ai-video-faq-version','premium-v3');return true;
  }
  function boot(){if(patch())return;[200,600,1200,2200].forEach(function(d){window.setTimeout(patch,d);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();window.addEventListener('load',patch,{once:true});
})();
JS
node --check "$FAQ_JS"
python3 - "$NEW_HTML" "$FAQ_JS" <<'PY'
from pathlib import Path
import re,sys
hp=Path(sys.argv[1]); jp=Path(sys.argv[2])
html=hp.read_text(encoding='utf-8'); js=jp.read_text(encoding='utf-8')
patterns=[
 r'<script id="ai-video-faq-final-only-inline">.*?</script>',
 r'<script id="ai-video-faq-premium-v2-inline">.*?</script>',
 r'<script id="ai-video-faq-premium-v3-inline">.*?</script>',
]
removed=0
for p in patterns:
    html,n=re.subn(p,'',html,count=1,flags=re.S)
    removed+=n
if removed>1:
    raise SystemExit('More than one FAQ runtime block found')
block='<script id="ai-video-faq-premium-v3-inline">\n'+js+'\n</script>'
if '</body>' not in html:
    raise SystemExit('Closing body tag missing')
html=html.replace('</body>',block+'</body>',1)
hp.write_text(html,encoding='utf-8')
print('Previous FAQ runtime blocks removed:',removed)
PY
grep -Fq 'ai-video-faq-premium-v3-inline' "$NEW_HTML" || fail "V3 inline marker missing"
grep -Fq 'data-faq-v3' "$NEW_HTML" || fail "V3 hard-scope marker missing"
grep -Fq 'font-size:15.5px!important' "$NEW_HTML" || fail "V3 typography guard missing"
grep -Fq '<svg viewBox="0 0 24 24">' "$NEW_HTML" || fail "V3 SVG chevron missing"
grep -Fq 'What will I learn in the AI Video Generation Masterclass?' "$NEW_HTML" || fail "FAQ V3 content missing"
FAQ_COUNT="$(grep -o '^    \["' "$FAQ_JS" | wc -l | tr -d ' ')"
[[ "$FAQ_COUNT" == "15" ]] || fail "Expected 15 FAQs, found $FAQ_COUNT"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$NEW_HTML" || fail "Advanced marker changed: $marker"
done
python3 - "$BASE_HTML" "$NEW_HTML" <<'PY'
from pathlib import Path
import re,sys
base=Path(sys.argv[1]).read_text(encoding='utf-8')
new=Path(sys.argv[2]).read_text(encoding='utf-8')
pat=re.compile(r'<script id="ai-video-faq-(?:final-only-inline|premium-v2-inline|premium-v3-inline)">.*?</script>',re.S)
base_clean=pat.sub('',base,count=1)
new_clean=pat.sub('',new,count=1)
if base_clean!=new_clean:
    raise SystemExit('Non-FAQ HTML drift detected')
print('Non-FAQ HTML equivalence: PASS')
PY
echo "✅ Only FAQ runtime changed; rest of page byte-equivalent"

log "6/10 — Temporary-port preflight"
TEMP_PORT=""
for p in {3951..3960}; do
  if ! ss -ltnH 2>/dev/null | awk '{print $4}' | grep -Eq "(^|:)${p}$"; then TEMP_PORT="$p"; break; fi
done
[[ -n "$TEMP_PORT" ]] || fail "No free preflight port"
NODE_ENV=production pm2 start npm --name "$TEMP_APP" --cwd "$NEW_RELEASE" -- start -- -p "$TEMP_PORT"
TEMP_STARTED=1
wait_200 "http://127.0.0.1:${TEMP_PORT}/masterclass/ai-video" 45 || fail "Preflight page failed"
PREFLIGHT="$(mktemp)"
curl -fsSL "http://127.0.0.1:${TEMP_PORT}/masterclass/ai-video" -o "$PREFLIGHT"
grep -Fq 'ai-video-faq-premium-v3-inline' "$PREFLIGHT" || fail "Preflight V3 marker missing"
grep -Fq 'data-faq-v3' "$PREFLIGHT" || fail "Preflight V3 CSS scope missing"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$PREFLIGHT" || fail "Preflight advanced marker missing: $marker"
done
cleanup_temp
echo "✅ Premium FAQ V3 preflight passed"

log "7/10 — Atomic same-port cutover"
CUTOVER=1
pm2 stop "$CURRENT_APP"
for _ in {1..30}; do
  ! fuser -n tcp "$PORT" >/dev/null 2>&1 && break
  sleep 1
done
! fuser -n tcp "$PORT" >/dev/null 2>&1 || fail "Port $PORT did not release"
NODE_ENV=production pm2 start npm --name "$NEW_APP" --cwd "$NEW_RELEASE" -- start -- -p "$PORT"
wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || fail "V3 app health failed"
echo "✅ Premium FAQ V3 app online"

log "8/10 — Public live smoke"
curl -fsSL -H 'Cache-Control: no-cache' "${LIVE_URL}?faqV3=${TS}" -o "$LIVE_BODY"
grep -Fq 'ai-video-faq-premium-v3-inline' "$LIVE_BODY" || fail "Live V3 marker missing"
grep -Fq 'data-faq-v3' "$LIVE_BODY" || fail "Live V3 CSS marker missing"
grep -Fq 'What will I learn in the AI Video Generation Masterclass?' "$LIVE_BODY" || fail "Live V3 FAQ copy missing"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$LIVE_BODY" || fail "Live advanced marker missing: $marker"
done
echo "✅ Public advanced page + premium FAQ V3 verified"

log "9/10 — Registration + golden integrity"
wait_200 "$REGISTER_URL" 20 || fail "Registration route failed"
[[ "$(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Golden runtime changed"
[[ "$(lsattr -d "$GOLDEN_HTML" | awk '{print $1}')" == *i* ]] || fail "Golden HTML lost immutable lock"
[[ "$(lsattr -d "$GOLDEN_RUNTIME" | awk '{print $1}')" == *i* ]] || fail "Golden runtime lost immutable lock"
[[ "$(pm2_value "$NEW_APP" status)" == "online" ]] || fail "New V3 app is not online"
[[ "$(pm2_value "$CURRENT_APP" status)" == "stopped" ]] || fail "Rollback app must remain stopped"
echo "✅ Registration healthy; golden recovery untouched"

log "10/10 — Persist rollback state"
cat >"$STATE_FILE" <<EOF
DEPLOYED_AT=$TS
NEW_APP=$NEW_APP
NEW_RELEASE=$NEW_RELEASE
PREVIOUS_APP=$CURRENT_APP
PREVIOUS_CWD=$CURRENT_CWD
GOLDEN_RELEASE=$GOLDEN_RELEASE
GOLDEN_RUNTIME_SHA=$EXPECTED_RUNTIME_SHA
FAQ_COUNT=15
FAQ_VERSION=premium-v3-inline
EOF
pm2 save
CUTOVER=0

LIVE_CODE="$(curl -L -sS -o /dev/null -w '%{http_code}' "${LIVE_URL}?faqV3Final=${TS}")"
REG_CODE="$(curl -L -sS -o /dev/null -w '%{http_code}' "$REGISTER_URL")"

echo
echo "======================================================"
echo "✅ PREMIUM FAQ V3 LIVE — FAQ ONLY"
echo "======================================================"
echo "Live landing HTTP:  $LIVE_CODE"
echo "Registration HTTP:  $REG_CODE"
echo "FAQ count:          15"
echo "FAQ version:        premium-v3-inline"
echo "New app:            $NEW_APP ($(pm2_value "$NEW_APP" status))"
echo "Rollback app:       $CURRENT_APP ($(pm2_value "$CURRENT_APP" status))"
echo "New release:        $NEW_RELEASE"
echo "Golden runtime SHA: $EXPECTED_RUNTIME_SHA"
echo "State file:         $STATE_FILE"
echo "======================================================"
