#!/usr/bin/env bash
set -Eeuo pipefail

export HOME=/root
export PM2_HOME=/root/.pm2

PORT=3940
LIVE_URL="https://sikhadenge.in/masterclass/ai-video"
REGISTER_URL="https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass"
APP="sikhadenge-ai-video-golden-faq-3940-20260904-130510"
CWD="/var/www/sikhadenge.in/releases/production-ai-video-golden-faq-final-20260904-130510"
HTML="$CWD/.next/server/pages/masterclass/ai-video.html"
GOLDEN_RUNTIME="/var/www/sikhadenge.in/releases/production-ai-workflow-premium-zero-build-20260829-110420/public/ai-video-icons-hotfix.js"
EXPECTED_RUNTIME_SHA="6e8c050e8271f95d20e5e7df1f650dba477142eadd694aefdf6259e2fa73cb51"
TS="$(date +%Y%m%d-%H%M%S)"
BACKUP="/root/ai-video-audience-v4-backup-${TS}"
LIVE_BODY="/tmp/ai-video-audience-v4-live-${TS}.html"

log(){ printf '\n[%s] %s\n' "$(date '+%H:%M:%S')" "$*"; }
fail(){ echo "❌ $*" >&2; exit 1; }

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

pm2_status(){
  pm2 jlist | python3 -c '
import json,sys
app=sys.argv[1]
for item in json.load(sys.stdin):
    if item.get("name")==app:
        print((item.get("pm2_env") or {}).get("status","missing")); break
else: print("missing")
' "$APP"
}

pm2_cwd(){
  pm2 jlist | python3 -c '
import json,sys
app=sys.argv[1]
for item in json.load(sys.stdin):
    if item.get("name")==app:
        print((item.get("pm2_env") or {}).get("pm_cwd","missing")); break
else: print("missing")
' "$APP"
}

recover(){
  trap - ERR INT TERM
  set +e
  echo
  echo "⚠️ Audience V4 failed — restoring previous HTML/service"
  [[ -f "$BACKUP/ai-video.html.before-audience-v4" ]] && cp -f "$BACKUP/ai-video.html.before-audience-v4" "$HTML"
  pm2 restart "$APP" >/dev/null 2>&1 || true
  wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || true
  pm2 save >/dev/null 2>&1 || true
  echo "Rollback attempt complete"
  exit 1
}

log "1/9 — Health + integrity preflight"
[[ -f "$HTML" ]] || fail "Live AI Video HTML missing"
[[ "$(pm2_cwd)" == "$CWD" ]] || fail "PM2 cwd mismatch"
[[ "$(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Golden runtime SHA changed"
if [[ "$(pm2_status)" != "online" ]]; then pm2 restart "$APP"; fi
wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || fail "Current page not healthy"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$HTML" || fail "Core marker missing: $marker"
done
grep -Eq 'Creators & video editors|Built for people who want|WHO THIS IS FOR' "$HTML" || fail "Audience section marker missing"
echo "✅ Current advanced page healthy"

log "2/9 — Backup only live HTML"
mkdir -p "$BACKUP"
cp -a "$HTML" "$BACKUP/ai-video.html.before-audience-v4"
BASE_SHA="$(sha256sum "$HTML" | awk '{print $1}')"
printf 'APP=%q\nCWD=%q\nBASE_SHA=%q\n' "$APP" "$CWD" "$BASE_SHA" > "$BACKUP/state.env"
trap recover ERR INT TERM

echo "Backup: $BACKUP"

log "3/9 — Build Audience V4 runtime"
AUDIENCE_JS="$(mktemp --suffix=.js)"
cat > "$AUDIENCE_JS" <<'JS'
(function(){
'use strict';
var STYLE_ID='ai-video-audience-premium-v4-style';
var cards=[
 {mode:'CREATOR MODE',num:'01',title:'Creators & video editors',text:'Turn ideas into cinematic reels, hooks and shot concepts faster—without losing visual control.',benefit:'Ship more creative variations',accent:'#3b82f6',soft:'#eff6ff',icon:'play'},
 {mode:'CLIENT MODE',num:'02',title:'Freelancers & agencies',text:'Prototype client concepts, storyboards and ad directions before committing to full production.',benefit:'Pitch faster. Iterate smarter.',accent:'#8b5cf6',soft:'#f5f3ff',icon:'briefcase'},
 {mode:'GROWTH MODE',num:'03',title:'Marketers & founders',text:'Build launch creatives, product-film concepts and short-form ad variations for growth campaigns.',benefit:'Test more creative angles',accent:'#06b6d4',soft:'#ecfeff',icon:'chart'},
 {mode:'STARTER MODE',num:'04',title:'Students & beginners',text:'Learn a structured AI-video workflow from prompting to final output—no coding or advanced VFX required.',benefit:'Build practical portfolio skills',accent:'#d946ef',soft:'#fdf4ff',icon:'user'}
];
function icon(name){
 var paths={
  play:'<rect x="4" y="5" width="16" height="14" rx="3"></rect><path d="m10 9 5 3-5 3z"></path>',
  briefcase:'<rect x="4" y="7" width="16" height="12" rx="3"></rect><path d="M9 7V5h6v2M8 11h8M12 9v4"></path>',
  chart:'<path d="M5 18V10M12 18V5M19 18v-8"></path>',
  user:'<circle cx="12" cy="8" r="3"></circle><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"></path>'
 };
 return '<svg viewBox="0 0 24 24" aria-hidden="true">'+paths[name]+'</svg>';
}
function findSection(){
 var candidates=Array.prototype.slice.call(document.querySelectorAll('section'));
 return candidates.find(function(s){
  var t=(s.textContent||'').replace(/\s+/g,' ');
  return /Creators\s*&\s*video editors/i.test(t) && /Freelancers\s*&\s*agencies/i.test(t) && /Students\s*&\s*beginners/i.test(t);
 }) || candidates.find(function(s){ return /WHO THIS IS FOR|Built for people who want/i.test((s.textContent||'')); }) || null;
}
function addStyle(){
 if(document.getElementById(STYLE_ID)) return;
 var s=document.createElement('style'); s.id=STYLE_ID; s.textContent=`
section[data-ai-audience-v4="1"]{position:relative!important;isolation:isolate!important;overflow:hidden!important;content-visibility:visible!important;contain:none!important;padding:96px 0 100px!important;background:radial-gradient(circle at 7% 10%,rgba(59,130,246,.09),transparent 28%),radial-gradient(circle at 92% 18%,rgba(217,70,239,.07),transparent 28%),linear-gradient(180deg,#ffffff 0%,#f8faff 100%)!important}
section[data-ai-audience-v4="1"]:before{content:""!important;position:absolute!important;inset:0!important;z-index:-2!important;pointer-events:none!important;background-image:linear-gradient(rgba(100,116,139,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(100,116,139,.045) 1px,transparent 1px)!important;background-size:48px 48px!important;mask-image:linear-gradient(to bottom,rgba(0,0,0,.45),transparent 88%)!important}
section[data-ai-audience-v4="1"] *{box-sizing:border-box!important}
section[data-ai-audience-v4="1"] .aud-v4-shell{width:min(1160px,calc(100% - 48px))!important;margin:0 auto!important}
section[data-ai-audience-v4="1"] .aud-v4-head{max-width:820px!important;margin:0 auto 42px!important;text-align:center!important}
section[data-ai-audience-v4="1"] .aud-v4-kicker{display:inline-flex!important;align-items:center!important;gap:8px!important;min-height:34px!important;padding:0 14px!important;border:1px solid rgba(79,70,229,.15)!important;border-radius:999px!important;background:rgba(255,255,255,.86)!important;color:#4f46e5!important;box-shadow:0 8px 24px rgba(15,23,42,.04)!important;font-size:11px!important;font-weight:850!important;letter-spacing:.12em!important;text-transform:uppercase!important}
section[data-ai-audience-v4="1"] .aud-v4-kicker i{width:7px!important;height:7px!important;border-radius:99px!important;background:linear-gradient(135deg,#2563eb,#8b5cf6)!important;box-shadow:0 0 0 5px rgba(99,102,241,.08)!important}
section[data-ai-audience-v4="1"] .aud-v4-title{margin:16px auto 12px!important;color:#0b1220!important;font-size:clamp(38px,4.4vw,58px)!important;font-weight:850!important;line-height:1.04!important;letter-spacing:-.05em!important;text-wrap:balance!important}
section[data-ai-audience-v4="1"] .aud-v4-title em{font-style:normal!important;background:linear-gradient(90deg,#2563eb,#6366f1,#8b5cf6)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important}
section[data-ai-audience-v4="1"] .aud-v4-sub{max-width:720px!important;margin:0 auto!important;color:#64748b!important;font-size:15.5px!important;font-weight:470!important;line-height:1.72!important;text-wrap:balance!important}
section[data-ai-audience-v4="1"] .aud-v4-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:16px!important}
section[data-ai-audience-v4="1"] .aud-v4-card{--accent:#3b82f6;--soft:#eff6ff;position:relative!important;display:flex!important;min-height:292px!important;flex-direction:column!important;padding:22px!important;overflow:hidden!important;border:1px solid color-mix(in srgb,var(--accent) 18%,#e2e8f0)!important;border-radius:24px!important;background:linear-gradient(180deg,rgba(255,255,255,.98),rgba(250,252,255,.96))!important;box-shadow:0 18px 48px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.9)!important;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease!important}
section[data-ai-audience-v4="1"] .aud-v4-card:before{content:""!important;position:absolute!important;left:0!important;right:0!important;top:0!important;height:3px!important;background:linear-gradient(90deg,var(--accent),transparent 92%)!important}
section[data-ai-audience-v4="1"] .aud-v4-card:after{content:""!important;position:absolute!important;width:150px!important;height:150px!important;right:-68px!important;top:-70px!important;border-radius:50%!important;background:radial-gradient(circle,color-mix(in srgb,var(--accent) 13%,transparent),transparent 68%)!important;pointer-events:none!important}
section[data-ai-audience-v4="1"] .aud-v4-card:hover{transform:translateY(-5px)!important;border-color:color-mix(in srgb,var(--accent) 34%,#dbe4ef)!important;box-shadow:0 26px 60px rgba(15,23,42,.095)!important}
section[data-ai-audience-v4="1"] .aud-v4-top{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important}
section[data-ai-audience-v4="1"] .aud-v4-icon{display:grid!important;place-items:center!important;width:46px!important;height:46px!important;border:1px solid color-mix(in srgb,var(--accent) 18%,#e2e8f0)!important;border-radius:14px!important;background:var(--soft)!important;color:var(--accent)!important;box-shadow:0 8px 22px color-mix(in srgb,var(--accent) 9%,transparent)!important}
section[data-ai-audience-v4="1"] .aud-v4-icon svg{width:21px!important;height:21px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.8!important;stroke-linecap:round!important;stroke-linejoin:round!important}
section[data-ai-audience-v4="1"] .aud-v4-num{display:grid!important;place-items:center!important;min-width:34px!important;height:28px!important;padding:0 9px!important;border:1px solid color-mix(in srgb,var(--accent) 14%,#e2e8f0)!important;border-radius:999px!important;background:var(--soft)!important;color:var(--accent)!important;font-size:10px!important;font-weight:850!important;letter-spacing:.08em!important}
section[data-ai-audience-v4="1"] .aud-v4-mode{display:block!important;margin:20px 0 7px!important;color:var(--accent)!important;font-size:10px!important;font-weight:900!important;letter-spacing:.11em!important;text-transform:uppercase!important}
section[data-ai-audience-v4="1"] .aud-v4-card h3{margin:0!important;color:#0f172a!important;font-size:18px!important;font-weight:820!important;line-height:1.25!important;letter-spacing:-.025em!important}
section[data-ai-audience-v4="1"] .aud-v4-card p{margin:10px 0 0!important;color:#64748b!important;font-size:13.25px!important;font-weight:470!important;line-height:1.65!important}
section[data-ai-audience-v4="1"] .aud-v4-benefit{display:flex!important;align-items:center!important;gap:8px!important;margin-top:auto!important;padding-top:20px!important}
section[data-ai-audience-v4="1"] .aud-v4-benefit span{display:flex!important;width:100%!important;min-height:38px!important;align-items:center!important;gap:8px!important;padding:8px 11px!important;border:1px solid color-mix(in srgb,var(--accent) 12%,#e5e7eb)!important;border-radius:999px!important;background:linear-gradient(180deg,#fff,var(--soft))!important;color:#475569!important;font-size:11px!important;font-weight:720!important;box-shadow:0 7px 18px rgba(15,23,42,.035)!important}
section[data-ai-audience-v4="1"] .aud-v4-benefit b{display:grid!important;place-items:center!important;width:19px!important;height:19px!important;flex:0 0 19px!important;border-radius:50%!important;background:var(--soft)!important;color:var(--accent)!important;font-size:11px!important}
section[data-ai-audience-v4="1"] .aud-v4-checks{display:flex!important;justify-content:center!important;gap:10px!important;flex-wrap:wrap!important;width:max-content!important;max-width:100%!important;margin:26px auto 0!important;padding:8px!important;border:1px solid #e2e8f0!important;border-radius:17px!important;background:rgba(255,255,255,.88)!important;box-shadow:0 12px 32px rgba(15,23,42,.045)!important}
section[data-ai-audience-v4="1"] .aud-v4-checks span{display:inline-flex!important;min-height:34px!important;align-items:center!important;gap:7px!important;padding:0 11px!important;border:1px solid #e6ebf2!important;border-radius:11px!important;background:#fbfdff!important;color:#475569!important;font-size:11px!important;font-weight:720!important}
section[data-ai-audience-v4="1"] .aud-v4-checks b{color:#4f46e5!important;font-size:12px!important}
@media(max-width:1024px){section[data-ai-audience-v4="1"] .aud-v4-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}section[data-ai-audience-v4="1"] .aud-v4-card{min-height:272px!important}}
@media(max-width:640px){section[data-ai-audience-v4="1"]{padding:72px 0 78px!important}section[data-ai-audience-v4="1"] .aud-v4-shell{width:min(100% - 24px,1160px)!important}section[data-ai-audience-v4="1"] .aud-v4-head{margin-bottom:28px!important}section[data-ai-audience-v4="1"] .aud-v4-title{font-size:32px!important;line-height:1.08!important}section[data-ai-audience-v4="1"] .aud-v4-sub{font-size:14px!important}section[data-ai-audience-v4="1"] .aud-v4-grid{grid-template-columns:1fr!important;gap:12px!important}section[data-ai-audience-v4="1"] .aud-v4-card{min-height:246px!important;padding:19px!important;border-radius:20px!important}section[data-ai-audience-v4="1"] .aud-v4-mode{margin-top:16px!important}section[data-ai-audience-v4="1"] .aud-v4-card h3{font-size:17px!important}section[data-ai-audience-v4="1"] .aud-v4-checks{width:100%!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:7px!important}section[data-ai-audience-v4="1"] .aud-v4-checks span{justify-content:center!important;padding:0 7px!important;font-size:10.5px!important}}
@media(prefers-reduced-motion:reduce){section[data-ai-audience-v4="1"] .aud-v4-card{transition:none!important}}
`;
 document.head.appendChild(s);
}
function patch(){
 var section=findSection(); if(!section) return false;
 addStyle();
 section.setAttribute('data-ai-audience-v4','1');
 section.setAttribute('aria-labelledby','aud-v4-title');
 var html=cards.map(function(c){return '<article class="aud-v4-card" style="--accent:'+c.accent+';--soft:'+c.soft+'"><div class="aud-v4-top"><span class="aud-v4-icon">'+icon(c.icon)+'</span><span class="aud-v4-num">'+c.num+'</span></div><span class="aud-v4-mode">'+c.mode+'</span><h3>'+c.title+'</h3><p>'+c.text+'</p><div class="aud-v4-benefit"><span><b>✓</b>'+c.benefit+'</span></div></article>';}).join('');
 section.innerHTML='<div class="aud-v4-shell"><div class="aud-v4-head"><span class="aud-v4-kicker"><i></i>WHO THIS IS FOR</span><h2 class="aud-v4-title" id="aud-v4-title">One workflow. <em>Four ways to create better.</em></h2><p class="aud-v4-sub">Whether you create for yourself, clients, campaigns or your first portfolio, learn the same repeatable AI-video workflow and apply it to your goal.</p></div><div class="aud-v4-grid">'+html+'</div><div class="aud-v4-checks"><span><b>✓</b> Beginner friendly</span><span><b>✓</b> No coding</span><span><b>✓</b> Live demonstrations</span><span><b>✓</b> Practical Hinglish</span></div></div>';
 document.documentElement.setAttribute('data-ai-video-audience-version','premium-v4');
 return true;
}
function boot(){if(patch())return;[250,700,1400,2400].forEach(function(d){setTimeout(patch,d);});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('load',patch,{once:true});
})();
JS
node --check "$AUDIENCE_JS"
echo "✅ Audience V4 JavaScript syntax valid"

log "4/9 — Build candidate HTML off-line"
CANDIDATE="$(mktemp --suffix=.html)"
python3 - "$HTML" "$AUDIENCE_JS" "$CANDIDATE" <<'PY'
from pathlib import Path
import re,sys
src=Path(sys.argv[1]); js=Path(sys.argv[2]).read_text(encoding='utf-8'); out=Path(sys.argv[3])
html=src.read_text(encoding='utf-8')
pat=re.compile(r'<script id="ai-video-audience-premium-v4-inline">.*?</script>',re.S)
block='<script id="ai-video-audience-premium-v4-inline">\n'+js+'\n</script>'
if pat.search(html):
    html=pat.sub(lambda m:block,html,count=1)
else:
    if '</body>' not in html: raise SystemExit('Missing </body>')
    html=html.replace('</body>',block+'\n</body>',1)
out.write_text(html,encoding='utf-8')
PY
grep -Fq 'ai-video-audience-premium-v4-inline' "$CANDIDATE" || false
grep -Fq 'One workflow.' "$CANDIDATE" || false
grep -Fq 'Creators & video editors' "$CANDIDATE" || false
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat' 'ai-video-faq-premium-v3-inline'; do
  grep -Fq "$marker" "$CANDIDATE" || false
done
python3 - "$HTML" "$CANDIDATE" <<'PY'
from pathlib import Path
import re,sys
base=Path(sys.argv[1]).read_text(encoding='utf-8'); new=Path(sys.argv[2]).read_text(encoding='utf-8')
pat=re.compile(r'<script id="ai-video-audience-premium-v4-inline">.*?</script>\s*',re.S)
if pat.sub('',base)!=pat.sub('',new): raise SystemExit('Non-audience HTML drift detected')
print('Non-audience HTML equivalence: PASS')
PY

log "5/9 — Atomic audience-only HTML replacement"
TMP="$(mktemp "${HTML}.audv4.XXXXXX")"
cp "$CANDIDATE" "$TMP"
chmod --reference="$HTML" "$TMP"
chown --reference="$HTML" "$TMP"
mv -f "$TMP" "$HTML"
NEW_SHA="$(sha256sum "$HTML" | awk '{print $1}')"
[[ "$NEW_SHA" != "$BASE_SHA" ]] || false
echo "✅ Only Audience V4 runtime injected"

log "6/9 — Restart same app"
pm2 restart "$APP"
wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || false

log "7/9 — Public smoke checks"
curl -fsSL -H 'Cache-Control: no-cache' "${LIVE_URL}?audienceV4=${TS}" -o "$LIVE_BODY"
for marker in 'ai-video-audience-premium-v4-inline' 'One workflow.' 'Creators & video editors' 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat' 'ai-video-faq-premium-v3-inline'; do
  grep -Fq "$marker" "$LIVE_BODY" || false
done
wait_200 "$REGISTER_URL" 20 || false
echo "✅ Landing + registration smoke passed"

log "8/9 — Persist PM2"
pm2 save

log "9/9 — Complete"
trap - ERR INT TERM
FREE_MB="$(df -Pm "$CWD" | awk 'NR==2{print $4}')"
echo "======================================================"
echo "✅ AUDIENCE PREMIUM V4 LIVE — SECTION ONLY"
echo "======================================================"
echo "Live landing HTTP:   $(curl -L -sS -o /dev/null -w '%{http_code}' "${LIVE_URL}?finalAudienceV4=${TS}")"
echo "Registration HTTP:   $(curl -L -sS -o /dev/null -w '%{http_code}' "$REGISTER_URL")"
echo "Current app:          $APP"
echo "Audience version:     premium-v4-inline"
echo "HTML before SHA:      $BASE_SHA"
echo "HTML after SHA:       $NEW_SHA"
echo "Backup:               $BACKUP"
echo "Free space:           ${FREE_MB} MB"
echo "Golden runtime SHA:   $(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')"
