#!/usr/bin/env bash
set -Eeuo pipefail

export HOME=/root
export PM2_HOME=/root/.pm2

PORT=3940
LIVE_URL="https://sikhadenge.in/masterclass/ai-video"
REGISTER_URL="https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass"
FAILED_PARTIAL="/var/www/sikhadenge.in/releases/production-ai-video-golden-faq-premium-v3-20260904-133056"
GOLDEN_RUNTIME="/var/www/sikhadenge.in/releases/production-ai-workflow-premium-zero-build-20260829-110420/public/ai-video-icons-hotfix.js"
EXPECTED_RUNTIME_SHA="6e8c050e8271f95d20e5e7df1f650dba477142eadd694aefdf6259e2fa73cb51"
TS="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="/root/ai-video-faq-v3-inplace-backup-${TS}"
LIVE_BODY="/tmp/ai-video-faq-v3-live-${TS}.html"

log(){ printf '\n[%s] %s\n' "$(date '+%H:%M:%S')" "$*"; }
fail(){ echo "❌ $*" >&2; exit 1; }

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

log "1/8 — Detect current live AI Video app"
LISTENER_PID="$(fuser -n tcp "$PORT" 2>/dev/null | tr ' ' '\n' | grep -E '^[0-9]+$' | head -1 || true)"
[[ -n "$LISTENER_PID" ]] || fail "No listener on port $PORT"
CURRENT_CWD="$(readlink -f "/proc/${LISTENER_PID}/cwd" 2>/dev/null || true)"
CURRENT_APP="$(pm2 jlist | python3 -c '
import json,os,sys
cwd=os.path.realpath(sys.argv[1])
for item in json.load(sys.stdin):
    env=item.get("pm2_env") or {}
    pcwd=env.get("pm_cwd") or ""
    if env.get("status")=="online" and pcwd and os.path.realpath(pcwd)==cwd:
        print(item.get("name", "")); break
' "$CURRENT_CWD")"
[[ -n "$CURRENT_APP" ]] || fail "Could not map port 3940 listener to PM2"
case "$CURRENT_CWD" in
  /var/www/sikhadenge.in/releases/production-ai-video-golden-faq-final-*|/var/www/sikhadenge.in/releases/production-ai-video-golden-faq-premium-v2-*|/var/www/sikhadenge.in/releases/production-ai-video-golden-faq-premium-v3-*) ;;
  *) fail "Unexpected current release: $CURRENT_CWD" ;;
esac
CURRENT_HTML="$CURRENT_CWD/.next/server/pages/masterclass/ai-video.html"
[[ -f "$CURRENT_HTML" ]] || fail "Current AI Video HTML missing"
echo "Current app: $CURRENT_APP"
echo "Current CWD: $CURRENT_CWD"

log "2/8 — Golden integrity"
[[ "$(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Golden runtime SHA changed"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$CURRENT_HTML" || fail "Advanced page marker missing: $marker"
done
echo "✅ Golden runtime + advanced page markers verified"

log "3/8 — Remove only failed partial V3 clone and verify free space"
if [[ -e "$FAILED_PARTIAL" ]]; then
  [[ "$FAILED_PARTIAL" != "$CURRENT_CWD" ]] || fail "Refusing to delete current live release"
  IN_USE="$(pm2 jlist | python3 -c '
import json,os,sys
p=os.path.realpath(sys.argv[1])
for item in json.load(sys.stdin):
    env=item.get("pm2_env") or {}
    cwd=env.get("pm_cwd") or ""
    if cwd and os.path.realpath(cwd)==p and env.get("status")=="online":
        print(item.get("name",""))
' "$FAILED_PARTIAL")"
  [[ -z "$IN_USE" ]] || fail "Failed partial release is unexpectedly in use by $IN_USE"
  du -sh "$FAILED_PARTIAL" 2>/dev/null || true
  rm -rf --one-file-system "$FAILED_PARTIAL"
  echo "✅ Failed partial clone removed"
fi
AVAIL_MB="$(df -Pm "$CURRENT_CWD" | awk 'NR==2{print $4}')"
echo "Free space after cleanup: ${AVAIL_MB} MB"
[[ "$AVAIL_MB" -ge 128 ]] || {
  echo "❌ Still less than 128 MB free. No live file modified."
  echo "Largest release directories:"
  du -xsh /var/www/sikhadenge.in/releases/* 2>/dev/null | sort -h | tail -12 || true
  exit 1
}

log "4/8 — Backup only current AI Video HTML"
mkdir -p "$BACKUP_DIR"
cp -a "$CURRENT_HTML" "$BACKUP_DIR/ai-video.html.before-v3"
BASE_SHA="$(sha256sum "$CURRENT_HTML" | awk '{print $1}')"
printf 'CURRENT_APP=%q\nCURRENT_CWD=%q\nBASE_SHA=%q\n' "$CURRENT_APP" "$CURRENT_CWD" "$BASE_SHA" > "$BACKUP_DIR/state.env"
echo "Backup: $BACKUP_DIR"

rollback(){
  trap - ERR INT TERM
  set +e
  echo "⚠️ FAQ V3 smoke failed — restoring previous HTML"
  cp -f "$BACKUP_DIR/ai-video.html.before-v3" "$CURRENT_HTML"
  pm2 restart "$CURRENT_APP" >/dev/null 2>&1 || true
  wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || true
  pm2 save >/dev/null 2>&1 || true
  echo "✅ Previous FAQ HTML restored"
  exit 1
}
trap rollback ERR INT TERM

log "5/8 — Replace only FAQ runtime in-place"
FAQ_JS="$(mktemp)"
cat > "$FAQ_JS" <<'JS'
(function(){
'use strict';
var FAQS=[
["What exactly will I learn in this AI Video Generation Masterclass?","You’ll learn a practical AI-video workflow covering idea development, prompt structure, shot planning, text-to-video, image-to-video, camera direction, refinement and final output for ads, reels and cinematic content."],
["Is this AI video masterclass beginner-friendly?","Yes. The session is designed for beginners and explains the workflow step by step, even if you have never used an AI video-generation tool before."],
["How long is the live masterclass?","It is a focused 2-hour live masterclass built around demonstrations, practical workflows and live Q&A."],
["Is the session live or recorded?","This is primarily a live learning session. Joining live gives you the best experience because you can follow the demonstrations and ask questions in real time."],
["Do I need video-editing experience before joining?","No. Previous editing experience is not required. The workflow starts from the fundamentals and is designed to remain easy to follow."],
["Do I need coding or technical AI knowledge?","No coding or advanced technical background is required. The workflow is creator-friendly and focused on visual execution."],
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
function esc(v){return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}
function findFaq(){return document.querySelector('#faq,[data-section="faq"],[data-faq-section]')||Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){return /frequently asked|common questions|know before|faq/i.test((s.textContent||'').replace(/\s+/g,' '));})||null;}
function addStyle(){if(document.getElementById(STYLE_ID))return;var s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
section#faq[data-ai-faq-v3="1"]{--t:#0b1220;--m:#667085;--b:#e2e8f0;--a:#6366f1;position:relative!important;isolation:isolate!important;overflow:hidden!important;content-visibility:visible!important;contain:none!important;padding:96px 0 104px!important;background:radial-gradient(circle at 8% 0%,rgba(99,102,241,.10),transparent 28%),radial-gradient(circle at 94% 8%,rgba(59,130,246,.08),transparent 25%),linear-gradient(180deg,#fbfcff 0%,#f6f8fc 100%)!important;font-family:inherit!important}
section#faq[data-ai-faq-v3="1"] *{box-sizing:border-box!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-shell{width:min(1080px,calc(100% - 40px))!important;margin:0 auto!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-head{max-width:790px!important;margin:0 auto 38px!important;text-align:center!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-kicker{display:inline-flex!important;align-items:center!important;gap:8px!important;min-height:34px!important;padding:0 14px!important;border:1px solid rgba(99,102,241,.18)!important;border-radius:999px!important;background:rgba(255,255,255,.86)!important;color:#4f46e5!important;font-size:11px!important;font-weight:800!important;letter-spacing:.10em!important;text-transform:uppercase!important;box-shadow:0 8px 24px rgba(15,23,42,.04)!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-dot{width:7px!important;height:7px!important;border-radius:50%!important;background:linear-gradient(135deg,#6366f1,#8b5cf6)!important;box-shadow:0 0 0 5px rgba(99,102,241,.08)!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-title{margin:16px auto 12px!important;color:var(--t)!important;font-size:clamp(38px,4vw,54px)!important;font-weight:820!important;line-height:1.05!important;letter-spacing:-.045em!important;text-decoration:none!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-title em{font-style:normal!important;background:linear-gradient(90deg,#4f46e5,#7c3aed,#2563eb)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-sub{max-width:690px!important;margin:0 auto!important;color:#64748b!important;font-size:15.5px!important;font-weight:450!important;line-height:1.7!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-list{display:grid!important;gap:13px!important;width:100%!important;margin:0!important}
section#faq[data-ai-faq-v3="1"] details.faq-v3-item{display:block!important;overflow:hidden!important;margin:0!important;border:1px solid var(--b)!important;border-radius:18px!important;background:rgba(255,255,255,.94)!important;box-shadow:0 3px 10px rgba(15,23,42,.025),0 12px 28px rgba(15,23,42,.025)!important;transition:border-color .2s ease,box-shadow .2s ease,transform .2s ease!important}
section#faq[data-ai-faq-v3="1"] details.faq-v3-item:hover{transform:translateY(-1px)!important;border-color:#d4dce8!important;box-shadow:0 16px 34px rgba(15,23,42,.055)!important}
section#faq[data-ai-faq-v3="1"] details.faq-v3-item[open]{border-color:rgba(99,102,241,.28)!important;background:linear-gradient(180deg,#fff,#fafbff)!important;box-shadow:0 20px 44px rgba(79,70,229,.075)!important}
section#faq[data-ai-faq-v3="1"] summary.faq-v3-question{display:grid!important;grid-template-columns:1fr 40px!important;align-items:center!important;gap:20px!important;min-height:74px!important;margin:0!important;padding:0 18px 0 22px!important;cursor:pointer!important;list-style:none!important;background:transparent!important;color:var(--t)!important;text-decoration:none!important;border:0!important;outline:0!important;box-shadow:none!important}
section#faq[data-ai-faq-v3="1"] summary.faq-v3-question::-webkit-details-marker{display:none!important}
section#faq[data-ai-faq-v3="1"] summary.faq-v3-question .faq-v3-question-text{display:block!important;color:var(--t)!important;background:transparent!important;text-decoration:none!important;box-shadow:none!important;font-size:15.5px!important;font-weight:650!important;line-height:1.48!important;letter-spacing:-.01em!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-chevron{display:grid!important;place-items:center!important;width:38px!important;height:38px!important;border:1px solid #dce4ef!important;border-radius:12px!important;background:linear-gradient(180deg,#fff,#f7f9fc)!important;color:#64748b!important;box-shadow:0 2px 5px rgba(15,23,42,.035),inset 0 1px 0 rgba(255,255,255,.9)!important;transition:transform .2s ease,color .2s ease,border-color .2s ease,background .2s ease!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-chevron svg{display:block!important;width:17px!important;height:17px!important;fill:none!important;stroke:currentColor!important;stroke-width:2!important;stroke-linecap:round!important;stroke-linejoin:round!important}
section#faq[data-ai-faq-v3="1"] details[open] .faq-v3-chevron{transform:rotate(180deg)!important;color:#4f46e5!important;border-color:rgba(99,102,241,.22)!important;background:#f3f4ff!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-answer{padding:0 82px 24px 22px!important;background:transparent!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-answer:before{content:""!important;display:block!important;width:34px!important;height:2px!important;margin:0 0 13px!important;border-radius:999px!important;background:linear-gradient(90deg,#6366f1,#8b5cf6)!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-answer p{margin:0!important;max-width:900px!important;color:#5f6f84!important;background:transparent!important;font-size:14.5px!important;font-weight:440!important;line-height:1.75!important;letter-spacing:0!important;text-decoration:none!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-foot{display:flex!important;justify-content:center!important;margin-top:28px!important}
section#faq[data-ai-faq-v3="1"] .faq-v3-foot span{display:inline-flex!important;align-items:center!important;gap:9px!important;padding:9px 14px!important;border:1px solid #e2e8f0!important;border-radius:999px!important;background:rgba(255,255,255,.72)!important;color:#64748b!important;font-size:12.5px!important;font-weight:550!important}
@media(max-width:760px){section#faq[data-ai-faq-v3="1"]{padding:70px 0 78px!important}section#faq[data-ai-faq-v3="1"] .faq-v3-shell{width:min(100% - 24px,1080px)!important}section#faq[data-ai-faq-v3="1"] .faq-v3-head{margin-bottom:28px!important}section#faq[data-ai-faq-v3="1"] .faq-v3-title{font-size:32px!important;line-height:1.08!important}section#faq[data-ai-faq-v3="1"] .faq-v3-sub{font-size:14px!important}section#faq[data-ai-faq-v3="1"] .faq-v3-list{gap:10px!important}section#faq[data-ai-faq-v3="1"] details.faq-v3-item{border-radius:15px!important}section#faq[data-ai-faq-v3="1"] summary.faq-v3-question{grid-template-columns:1fr 34px!important;gap:13px!important;min-height:66px!important;padding:0 12px 0 16px!important}section#faq[data-ai-faq-v3="1"] summary.faq-v3-question .faq-v3-question-text{font-size:14px!important;line-height:1.45!important}section#faq[data-ai-faq-v3="1"] .faq-v3-chevron{width:32px!important;height:32px!important;border-radius:10px!important}section#faq[data-ai-faq-v3="1"] .faq-v3-chevron svg{width:15px!important;height:15px!important}section#faq[data-ai-faq-v3="1"] .faq-v3-answer{padding:0 48px 19px 16px!important}section#faq[data-ai-faq-v3="1"] .faq-v3-answer p{font-size:13.5px!important;line-height:1.7!important}}
`;document.head.appendChild(s);}
function schema(){var data={'@context':'https://schema.org','@type':'FAQPage',mainEntity:FAQS.map(function(i){return{'@type':'Question',name:i[0],acceptedAnswer:{'@type':'Answer',text:i[1]}};})};var found=false;Array.prototype.slice.call(document.querySelectorAll('script[type="application/ld+json"]')).forEach(function(s){try{var j=JSON.parse(s.textContent||'{}');if(j&&j['@type']==='FAQPage'){s.textContent=JSON.stringify(data);s.setAttribute('data-ai-faq-v3-schema','1');found=true;}}catch(e){}});if(!found){var s=document.createElement('script');s.type='application/ld+json';s.setAttribute('data-ai-faq-v3-schema','1');s.textContent=JSON.stringify(data);document.head.appendChild(s);}}
function patch(){var section=findFaq();if(!section)return false;addStyle();section.id='faq';section.setAttribute('data-ai-faq-v3','1');section.setAttribute('aria-labelledby','faq-v3-title');var chev='<span class="faq-v3-chevron" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg></span>';var items=FAQS.map(function(i){return '<details class="faq-v3-item"><summary class="faq-v3-question"><span class="faq-v3-question-text">'+esc(i[0])+'</span>'+chev+'</summary><div class="faq-v3-answer"><p>'+esc(i[1])+'</p></div></details>';}).join('');section.innerHTML='<div class="faq-v3-shell"><div class="faq-v3-head"><span class="faq-v3-kicker"><i class="faq-v3-dot"></i>AI VIDEO MASTERCLASS FAQS</span><h2 class="faq-v3-title" id="faq-v3-title">Questions before you <em>join live?</em></h2><p class="faq-v3-sub">Everything you need to know about the live session, AI video tools, learning level and practical workflow.</p></div><div class="faq-v3-list">'+items+'</div><div class="faq-v3-foot"><span>✓ Beginner friendly · Live Q&A · No coding required</span></div></div>';Array.prototype.forEach.call(section.querySelectorAll('details'),function(d){d.addEventListener('toggle',function(){if(!d.open)return;Array.prototype.forEach.call(section.querySelectorAll('details[open]'),function(o){if(o!==d)o.open=false;});});});schema();document.documentElement.setAttribute('data-ai-video-faq-version','premium-v3');return true;}
function boot(){if(patch())return;[200,600,1200,2200].forEach(function(d){setTimeout(patch,d);});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();window.addEventListener('load',patch,{once:true});
})();
JS
node --check "$FAQ_JS"
python3 - "$CURRENT_HTML" "$FAQ_JS" <<'PY'
from pathlib import Path
import re,sys
p=Path(sys.argv[1]); js=Path(sys.argv[2]).read_text(encoding='utf-8'); html=p.read_text(encoding='utf-8')
patterns=[
 re.compile(r'<script id="ai-video-faq-final-only-inline">.*?</script>',re.S),
 re.compile(r'<script id="ai-video-faq-premium-v2-inline">.*?</script>',re.S),
 re.compile(r'<script id="ai-video-faq-premium-v3-inline">.*?</script>',re.S),
]
found=[]
for pat in patterns:
    found += pat.findall(html)
if len(found)!=1:
    raise SystemExit(f'Expected exactly one FAQ runtime block, found {len(found)}')
for pat in patterns:
    if pat.search(html):
        html=pat.sub('<script id="ai-video-faq-premium-v3-inline">\n'+js+'\n</script>',html,count=1)
        break
p.write_text(html,encoding='utf-8')
PY
grep -Fq 'ai-video-faq-premium-v3-inline' "$CURRENT_HTML" || fail "V3 inline marker missing"
grep -Fq 'data-ai-faq-v3' "$CURRENT_HTML" || fail "Hard-scoped V3 CSS marker missing"
grep -Fq 'What exactly will I learn in this AI Video Generation Masterclass?' "$CURRENT_HTML" || fail "FAQ copy missing"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$CURRENT_HTML" || fail "Non-FAQ marker changed: $marker"
done
echo "✅ FAQ runtime replaced in-place; advanced page markers intact"

log "6/8 — Restart same PM2 app and smoke test"
pm2 restart "$CURRENT_APP"
wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || false
curl -fsSL -H 'Cache-Control: no-cache' "${LIVE_URL}?faqV3=${TS}" -o "$LIVE_BODY"
grep -Fq 'ai-video-faq-premium-v3-inline' "$LIVE_BODY" || false
grep -Fq 'What exactly will I learn in this AI Video Generation Masterclass?' "$LIVE_BODY" || false
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$LIVE_BODY" || false
done
wait_200 "$REGISTER_URL" 20 || false

log "7/8 — Persist and verify disk"
pm2 save
FINAL_SHA="$(sha256sum "$CURRENT_HTML" | awk '{print $1}')"
FREE_MB="$(df -Pm "$CURRENT_CWD" | awk 'NR==2{print $4}')"

log "8/8 — Complete"
trap - ERR INT TERM
echo "======================================================"
echo "✅ PREMIUM FAQ V3 LIVE — LOW-DISK IN-PLACE MODE"
echo "======================================================"
echo "Live landing HTTP:  $(curl -L -sS -o /dev/null -w '%{http_code}' "${LIVE_URL}?finalFaqV3=${TS}")"
echo "Registration HTTP:  $(curl -L -sS -o /dev/null -w '%{http_code}' "$REGISTER_URL")"
echo "Current app:         $CURRENT_APP"
echo "Current release:     $CURRENT_CWD"
echo "FAQ version:         premium-v3-inline"
echo "FAQ count:           15"
echo "HTML before SHA:     $BASE_SHA"
echo "HTML after SHA:      $FINAL_SHA"
echo "Backup dir:          $BACKUP_DIR"
echo "Free space:          ${FREE_MB} MB"
echo "Golden runtime SHA:  $(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')"
