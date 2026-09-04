#!/usr/bin/env bash
set -Eeuo pipefail

export HOME=/root
export PM2_HOME=/root/.pm2

PORT="3940"
LIVE_URL="https://sikhadenge.in/masterclass/ai-video"
REGISTER_URL="https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass"

BASE_APP="sikhadenge-ai-video-golden-faq-3940-20260904-130510"
BASE_RELEASE="/var/www/sikhadenge.in/releases/production-ai-video-golden-faq-final-20260904-130510"
GOLDEN_RELEASE="/var/www/sikhadenge.in/releases/production-ai-workflow-premium-zero-build-20260829-110420"
GOLDEN_HTML="$GOLDEN_RELEASE/.next/server/pages/masterclass/ai-video.html"
GOLDEN_RUNTIME="$GOLDEN_RELEASE/public/ai-video-icons-hotfix.js"
GOLDEN_BACKUP="/root/ai-video-GOLDEN-ADS-LIVE-20260903-125516"
EXPECTED_RUNTIME_SHA="6e8c050e8271f95d20e5e7df1f650dba477142eadd694aefdf6259e2fa73cb51"

TS="$(date +%Y%m%d-%H%M%S)"
NEW_RELEASE="/var/www/sikhadenge.in/releases/production-ai-video-golden-faq-premium-v2-${TS}"
NEW_APP="sikhadenge-ai-video-golden-faq-v2-3940-${TS}"
TEMP_APP="sikhadenge-ai-video-golden-faq-v2-preflight-${TS}"
NEW_HTML="$NEW_RELEASE/.next/server/pages/masterclass/ai-video.html"
STATE_FILE="/root/ai-video-golden-faq-v2-state-${TS}.env"
LIVE_BODY="/tmp/ai-video-golden-faq-v2-${TS}.html"
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
  echo "⚠️ FAQ V2 CUTOVER FAILED — RESTORING CURRENT FAQ APP"
  echo "======================================================"
  pm2 stop "$NEW_APP" >/dev/null 2>&1 || true
  pm2 delete "$NEW_APP" >/dev/null 2>&1 || true
  pm2 restart "$BASE_APP" >/dev/null 2>&1 || true
  wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || true
  wait_200 "${LIVE_URL}?faqV2Rollback=${TS}" 45 || true
  pm2 save >/dev/null 2>&1 || true
  echo "Previous FAQ app restored: $BASE_APP"
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
echo " SIKHADENGE AI VIDEO — PREMIUM FAQ V2 ONLY"
echo "======================================================"
echo "Base app:     $BASE_APP"
echo "Base release: $BASE_RELEASE"
echo "New release:  $NEW_RELEASE"
echo "Scope:        FAQ typography / spacing / chevron / copy only"

log "1/10 — Required tools"
for c in pm2 curl python3 cp grep fuser sha256sum lsattr chattr node; do
  command -v "$c" >/dev/null || fail "Missing command: $c"
done

log "2/10 — Verify current FAQ release + golden integrity"
[[ -d "$BASE_RELEASE" ]] || fail "Current FAQ release missing"
[[ -f "$BASE_RELEASE/.next/server/pages/masterclass/ai-video.html" ]] || fail "Current FAQ HTML missing"
[[ "$(pm2_value "$BASE_APP" status)" == "online" ]] || fail "Expected current FAQ app is not online"
[[ -d "$GOLDEN_BACKUP" ]] || fail "Golden backup missing"
[[ "$(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Golden runtime SHA changed"
[[ "$(lsattr -d "$GOLDEN_HTML" | awk '{print $1}')" == *i* ]] || fail "Golden HTML lost immutable lock"
[[ "$(lsattr -d "$GOLDEN_RUNTIME" | awk '{print $1}')" == *i* ]] || fail "Golden runtime lost immutable lock"
BASE_HTML="$BASE_RELEASE/.next/server/pages/masterclass/ai-video.html"
grep -Fq 'ai-video-faq-final-only-inline' "$BASE_HTML" || fail "Current inline FAQ marker missing"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$BASE_HTML" || fail "Advanced page marker missing: $marker"
done
echo "✅ Current advanced page + FAQ baseline verified"

log "3/10 — Clone current live FAQ release"
[[ ! -e "$NEW_RELEASE" ]] || fail "New release already exists"
mkdir -p "$NEW_RELEASE"
cp -a "$BASE_RELEASE/." "$NEW_RELEASE/"
chattr -i "$NEW_HTML" "$NEW_RELEASE/public/ai-video-icons-hotfix.js" 2>/dev/null || true
[[ "$(sha256sum "$NEW_RELEASE/public/ai-video-icons-hotfix.js" | awk '{print $1}')" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Runtime drift in clone"
echo "✅ Current live page cloned"

log "4/10 — Replace only inline FAQ runtime with premium V2"
FAQ_JS="$(mktemp)"
cat >"$FAQ_JS" <<'JS'
(function(){
  'use strict';
  var FAQS=[
    ["What will I learn in the AI Video Generation Masterclass?","You’ll learn a practical, repeatable workflow for planning, generating and refining AI videos—from prompts and references to camera direction, motion, consistency and final output for ads, reels and product content."],
    ["Is this masterclass suitable for complete beginners?","Yes. The session is structured step by step, so you can follow even if you are new to AI video tools or have never created an AI-generated video before."],
    ["How long is the live session?","The masterclass is a focused 2-hour live session with practical demonstrations, workflow breakdowns and live Q&A."],
    ["Is the masterclass live or recorded?","This is a live masterclass. The best experience is to attend live so you can follow the demonstrations in sequence and ask questions during the session."],
    ["Do I need prior video-editing experience?","No. Prior editing experience is not required. The workflow starts from the fundamentals and explains how each stage fits together."],
    ["Do I need coding or technical AI knowledge?","No. The workflow is creator-friendly and does not require coding or an advanced technical background."],
    ["Will you cover both text-to-video and image-to-video workflows?","Yes. You’ll see how text prompts and image references can be used for video generation, including motion direction, iteration and visual consistency."],
    ["Which AI video tools will be covered?","The page features tools such as Kling AI, Higgsfield, Google Veo, Runway, Pika, Luma AI, Hailuo AI and Seedance. The focus is on transferable workflow principles, so you are not dependent on a single tool."],
    ["Will I learn how to write effective AI video prompts?","Yes. You’ll learn how to structure prompts around subject, action, camera, lighting, timing, style and sound so the model receives clearer creative direction."],
    ["Will you cover camera movement, lighting, and shot design?","Yes. The session covers framing, camera movement, lighting, visual style and shot intent so generated clips feel more deliberate and cinematic."],
    ["Will I learn how to keep characters and scenes consistent?","Yes. You’ll learn practical methods using references, shot planning and controlled iteration to make multiple clips feel connected rather than random."],
    ["Will we create ads, reels, and product videos?","Yes. The practical examples are built around short-form content such as product ads, reels, cinematic clips and creator-style visual sequences."],
    ["Do I need paid AI tools before joining?","No. You can understand and practise the workflow without owning every paid subscription. Individual platforms may have their own free limits, credits or paid plans."],
    ["Who should attend this masterclass?","It is designed for creators, video editors, freelancers, marketers, agencies, founders, students and beginners who want to produce stronger AI-generated video content."],
    ["What language is the masterclass taught in, and can I ask questions live?","The session is taught in easy Hinglish and includes live Q&A, so you can follow the demonstrations comfortably and ask questions during the masterclass."]
  ];
  var STYLE_ID='ai-video-faq-premium-v2-style';
  var PATCHED=false;
  function esc(v){return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}
  function findFaq(){return document.querySelector('#faq,[data-section="faq"],[data-faq-section]')||Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){return /frequently asked|common questions|know before|faq/i.test((s.textContent||'').replace(/\s+/g,' '));})||null;}
  function style(){
    if(document.getElementById(STYLE_ID))return;
    var el=document.createElement('style');el.id=STYLE_ID;
    el.textContent=[
      '.ai-faq-v2{position:relative;overflow:hidden;padding:88px 0 96px;background:linear-gradient(180deg,#f7f9fc 0%,#f4f7fb 100%)}',
      '.ai-faq-v2 *{box-sizing:border-box}',
      '.ai-faq-v2-shell{width:min(1080px,calc(100% - 40px));margin:0 auto}',
      '.ai-faq-v2-head{max-width:780px;margin:0 auto 34px;text-align:center}',
      '.ai-faq-v2-kicker{display:inline-flex;align-items:center;justify-content:center;min-height:30px;padding:0 13px;border:1px solid #dfe6f1;border-radius:999px;background:#fff;color:#4f46e5;font-size:11px!important;font-weight:800!important;letter-spacing:.09em;text-transform:uppercase;box-shadow:0 4px 14px rgba(15,23,42,.035)}',
      '.ai-faq-v2-title{margin:14px auto 10px!important;color:#0f172a!important;font-size:clamp(34px,3.6vw,48px)!important;font-weight:800!important;line-height:1.08!important;letter-spacing:-.035em!important}',
      '.ai-faq-v2-title em{font-style:normal;background:linear-gradient(90deg,#4f46e5,#2563eb);-webkit-background-clip:text;background-clip:text;color:transparent}',
      '.ai-faq-v2-sub{max-width:680px;margin:0 auto!important;color:#64748b!important;font-size:15px!important;font-weight:450!important;line-height:1.7!important}',
      '.ai-faq-v2-list{display:grid;gap:12px;margin:0 auto}',
      '.ai-faq-v2-item{overflow:hidden;border:1px solid #e1e6ee!important;border-radius:16px!important;background:#fff!important;box-shadow:0 3px 12px rgba(15,23,42,.03)!important;transition:border-color .18s ease,box-shadow .18s ease,transform .18s ease}',
      '.ai-faq-v2-item:hover{border-color:#d5dce7!important;box-shadow:0 8px 24px rgba(15,23,42,.055)!important}',
      '.ai-faq-v2-item[open]{border-color:#cdd8ee!important;box-shadow:0 12px 30px rgba(59,84,160,.08)!important}',
      '.ai-faq-v2-question{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:20px!important;min-height:68px!important;padding:16px 16px 16px 20px!important;cursor:pointer!important;list-style:none!important;background:#fff!important;color:#111827!important;text-decoration:none!important}',
      '.ai-faq-v2-question::-webkit-details-marker{display:none}',
      '.ai-faq-v2-question-text{display:block!important;min-width:0!important;background:transparent!important;color:#111827!important;text-decoration:none!important;box-shadow:none!important;font-size:15.5px!important;font-weight:650!important;line-height:1.5!important;letter-spacing:-.008em!important}',
      '.ai-faq-v2-chevron{display:grid!important;place-items:center!important;width:34px!important;height:34px!important;flex:0 0 34px!important;border:1px solid #dbe4f1!important;border-radius:10px!important;background:#f8fafc!important;color:#52627a!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.75)!important;transition:transform .18s ease,border-color .18s ease,background .18s ease,color .18s ease!important}',
      '.ai-faq-v2-chevron svg{width:15px!important;height:15px!important;display:block!important;stroke:currentColor!important;stroke-width:2!important;fill:none!important}',
      '.ai-faq-v2-item[open] .ai-faq-v2-chevron{transform:rotate(180deg);border-color:#cbd8f0!important;background:#f1f5ff!important;color:#3157c8!important}',
      '.ai-faq-v2-answer{padding:0 66px 22px 20px!important}',
      '.ai-faq-v2-answer p{margin:0!important;max-width:900px!important;color:#5d6b80!important;background:transparent!important;font-size:14.5px!important;font-weight:450!important;line-height:1.75!important;letter-spacing:0!important}',
      '@media(max-width:760px){.ai-faq-v2{padding:64px 0 72px}.ai-faq-v2-shell{width:min(100% - 24px,1080px)}.ai-faq-v2-head{margin-bottom:26px}.ai-faq-v2-title{font-size:30px!important}.ai-faq-v2-sub{font-size:14px!important}.ai-faq-v2-list{gap:10px}.ai-faq-v2-item{border-radius:14px!important}.ai-faq-v2-question{min-height:62px!important;padding:15px 12px 15px 16px!important;gap:14px!important}.ai-faq-v2-question-text{font-size:14px!important;line-height:1.45!important}.ai-faq-v2-chevron{width:32px!important;height:32px!important;flex-basis:32px!important;border-radius:9px!important}.ai-faq-v2-answer{padding:0 48px 18px 16px!important}.ai-faq-v2-answer p{font-size:13.5px!important;line-height:1.7!important}}',
      '@media(prefers-reduced-motion:reduce){.ai-faq-v2-item,.ai-faq-v2-chevron{transition:none!important}}'
    ].join('');
    document.head.appendChild(el);
  }
  function schema(){
    var data={'@context':'https://schema.org','@type':'FAQPage',mainEntity:FAQS.map(function(i){return{'@type':'Question',name:i[0],acceptedAnswer:{'@type':'Answer',text:i[1]}};})};
    var found=false;Array.prototype.slice.call(document.querySelectorAll('script[type="application/ld+json"]')).forEach(function(s){try{var j=JSON.parse(s.textContent||'{}');if(j&&j['@type']==='FAQPage'){s.textContent=JSON.stringify(data);s.setAttribute('data-ai-faq-v2','1');found=true;}}catch(e){}});
    if(!found){var s=document.createElement('script');s.type='application/ld+json';s.setAttribute('data-ai-faq-v2','1');s.textContent=JSON.stringify(data);document.head.appendChild(s);}
  }
  function patch(){
    if(PATCHED)return true;var section=findFaq();if(!section)return false;style();
    section.className='ai-faq-v2';section.id='faq';section.setAttribute('aria-labelledby','faq-title');
    var chevron='<span class="ai-faq-v2-chevron" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>';
    var items=FAQS.map(function(i){return '<details class="ai-faq-v2-item"><summary class="ai-faq-v2-question"><span class="ai-faq-v2-question-text">'+esc(i[0])+'</span>'+chevron+'</summary><div class="ai-faq-v2-answer"><p>'+esc(i[1])+'</p></div></details>';}).join('');
    section.innerHTML='<div class="ai-faq-v2-shell"><div class="ai-faq-v2-head"><span class="ai-faq-v2-kicker">AI VIDEO MASTERCLASS FAQS</span><h2 class="ai-faq-v2-title" id="faq-title">Questions before you <em>join live?</em></h2><p class="ai-faq-v2-sub">Everything you need to know about the live format, tools, skill level and practical AI video workflow.</p></div><div class="ai-faq-v2-list">'+items+'</div></div>';
    Array.prototype.forEach.call(section.querySelectorAll('details'),function(d){d.addEventListener('toggle',function(){if(!d.open)return;Array.prototype.forEach.call(section.querySelectorAll('details[open]'),function(o){if(o!==d)o.open=false;});});});
    schema();PATCHED=true;document.documentElement.setAttribute('data-ai-video-faq-v2','15');return true;
  }
  function boot(){if(patch())return;[200,600,1200,2200].forEach(function(d){window.setTimeout(patch,d);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();window.addEventListener('load',patch,{once:true});
})();
JS
node --check "$FAQ_JS"
python3 - "$NEW_HTML" "$FAQ_JS" <<'PY'
from pathlib import Path
import re,sys
html_path=Path(sys.argv[1]); js_path=Path(sys.argv[2])
html=html_path.read_text(encoding='utf-8')
js=js_path.read_text(encoding='utf-8')
pattern=re.compile(r'<script id="ai-video-faq-final-only-inline">.*?</script>',re.S)
if len(pattern.findall(html))!=1:
    raise SystemExit('Expected exactly one existing FAQ inline block')
new='<script id="ai-video-faq-premium-v2-inline">\n'+js+'\n</script>'
html=pattern.sub(new,html,count=1)
html_path.write_text(html,encoding='utf-8')
PY
grep -Fq 'ai-video-faq-premium-v2-inline' "$NEW_HTML" || fail "V2 inline marker missing"
grep -Fq 'ai-faq-v2-question-text' "$NEW_HTML" || fail "V2 typography marker missing"
grep -Fq '<svg viewBox="0 0 24 24">' "$NEW_HTML" || fail "SVG chevron missing"
grep -Fq 'What will I learn in the AI Video Generation Masterclass?' "$NEW_HTML" || fail "FAQ copy missing"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$NEW_HTML" || fail "Advanced marker changed: $marker"
done
# Verify everything except the FAQ runtime block is byte-identical to current live FAQ release.
python3 - "$BASE_HTML" "$NEW_HTML" <<'PY'
from pathlib import Path
import re,sys
base=Path(sys.argv[1]).read_text(encoding='utf-8')
new=Path(sys.argv[2]).read_text(encoding='utf-8')
p1=re.compile(r'<script id="ai-video-faq-final-only-inline">.*?</script>',re.S)
p2=re.compile(r'<script id="ai-video-faq-premium-v2-inline">.*?</script>',re.S)
base_clean=p1.sub('__FAQ_RUNTIME__',base,count=1)
new_clean=p2.sub('__FAQ_RUNTIME__',new,count=1)
if base_clean!=new_clean:
    raise SystemExit('Non-FAQ HTML drift detected')
print('Non-FAQ HTML equivalence: PASS')
PY
echo "✅ Only FAQ runtime changed; rest of page is identical"

log "5/10 — Temporary-port preflight"
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
grep -Fq 'ai-video-faq-premium-v2-inline' "$PREFLIGHT" || fail "Preflight V2 marker missing"
grep -Fq 'ai-faq-v2-question-text' "$PREFLIGHT" || fail "Preflight V2 styles missing"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do grep -Fq "$marker" "$PREFLIGHT" || fail "Preflight advanced marker missing: $marker"; done
cleanup_temp
echo "✅ Premium FAQ V2 clone preflight passed"

log "6/10 — Atomic same-port cutover"
CUTOVER=1
pm2 stop "$BASE_APP"
for _ in {1..30}; do ! fuser -n tcp "$PORT" >/dev/null 2>&1 && break; sleep 1; done
! fuser -n tcp "$PORT" >/dev/null 2>&1 || fail "Port $PORT did not release"
NODE_ENV=production pm2 start npm --name "$NEW_APP" --cwd "$NEW_RELEASE" -- start -- -p "$PORT"
wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || fail "New FAQ V2 app health failed"
echo "✅ Premium FAQ V2 app online"

log "7/10 — Public live smoke"
curl -fsSL -H 'Cache-Control: no-cache' "${LIVE_URL}?faqPremiumV2=${TS}" -o "$LIVE_BODY"
grep -Fq 'ai-video-faq-premium-v2-inline' "$LIVE_BODY" || fail "Live V2 marker missing"
grep -Fq 'ai-faq-v2-question-text' "$LIVE_BODY" || fail "Live typography marker missing"
grep -Fq 'What will I learn in the AI Video Generation Masterclass?' "$LIVE_BODY" || fail "Live FAQ copy missing"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do grep -Fq "$marker" "$LIVE_BODY" || fail "Live advanced marker missing: $marker"; done
echo "✅ Public advanced page + premium FAQ V2 verified"

log "8/10 — Registration + golden integrity"
wait_200 "$REGISTER_URL" 20 || fail "Registration route failed"
[[ "$(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Golden runtime changed"
[[ "$(lsattr -d "$GOLDEN_HTML" | awk '{print $1}')" == *i* ]] || fail "Golden HTML lock changed"
[[ "$(lsattr -d "$GOLDEN_RUNTIME" | awk '{print $1}')" == *i* ]] || fail "Golden runtime lock changed"
[[ "$(pm2_value "$NEW_APP" status)" == "online" ]] || fail "New app not online"
[[ "$(pm2_value "$BASE_APP" status)" == "stopped" ]] || fail "Rollback app must remain stopped"
echo "✅ Registration healthy; golden backup untouched"

log "9/10 — Persist rollback state"
cat >"$STATE_FILE" <<EOF
DEPLOYED_AT=$TS
NEW_APP=$NEW_APP
NEW_RELEASE=$NEW_RELEASE
ROLLBACK_APP=$BASE_APP
ROLLBACK_RELEASE=$BASE_RELEASE
GOLDEN_RELEASE=$GOLDEN_RELEASE
GOLDEN_RUNTIME_SHA=$EXPECTED_RUNTIME_SHA
FAQ_COUNT=15
FAQ_VERSION=premium-v2-inline
EOF
pm2 save

log "10/10 — Final status"
CUTOVER=0
LIVE_CODE="$(curl -L -sS -o /dev/null -w '%{http_code}' "${LIVE_URL}?faqPremiumV2Final=${TS}")"
REG_CODE="$(curl -L -sS -o /dev/null -w '%{http_code}' "$REGISTER_URL")"
echo "======================================================"
echo "✅ PREMIUM FAQ V2 LIVE — FAQ ONLY"
echo "======================================================"
echo "Live landing HTTP:  $LIVE_CODE"
echo "Registration HTTP:  $REG_CODE"
echo "FAQ count:          15"
echo "New app:            $NEW_APP ($(pm2_value "$NEW_APP" status))"
echo "Rollback app:       $BASE_APP ($(pm2_value "$BASE_APP" status))"
echo "New release:        $NEW_RELEASE"
echo "FAQ version:        premium-v2-inline"
echo "Golden runtime SHA: $EXPECTED_RUNTIME_SHA"
echo "State file:         $STATE_FILE"
echo "======================================================"
