#!/usr/bin/env bash
set -Eeuo pipefail

export HOME=/root
export PM2_HOME=/root/.pm2

APP='sikhadenge-ai-video-golden-faq-3940-20260904-130510'
PORT='3940'
CWD='/var/www/sikhadenge.in/releases/production-ai-video-golden-faq-final-20260904-130510'
HTML="$CWD/.next/server/pages/masterclass/ai-video.html"
LIVE='https://sikhadenge.in/masterclass/ai-video'
CLAUDE='https://sikhadenge.in/masterclass/claude/free'
REGISTER='https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass'
GOLDEN_RUNTIME='/var/www/sikhadenge.in/releases/production-ai-workflow-premium-zero-build-20260829-110420/public/ai-video-icons-hotfix.js'
EXPECTED_RUNTIME_SHA='6e8c050e8271f95d20e5e7df1f650dba477142eadd694aefdf6259e2fa73cb51'
STYLE_ID='ai-video-ui-v91-inline'
TS="$(date +%Y%m%d-%H%M%S)"
BACKUP="/var/backups/sikhadenge/ai-video-ui-v91-${TS}"

log(){ printf '\n[%s] %s\n' "$(date '+%H:%M:%S')" "$*"; }
fail(){ echo "❌ $*" >&2; exit 1; }

wait_200(){
  local url="$1" tries="${2:-45}" code=''
  for ((i=1;i<=tries;i++)); do
    code="$(curl -L -sS -o /dev/null -w '%{http_code}' "$url" || true)"
    [[ "$code" == '200' ]] && return 0
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

rollback(){
  trap - ERR INT TERM
  set +e
  echo
  echo '⚠️ V91 deploy failed — restoring exact pre-deploy HTML'
  if [[ -f "$BACKUP/ai-video.html.before" ]]; then
    cp -f "$BACKUP/ai-video.html.before" "$HTML"
    pm2 restart "$APP" >/dev/null 2>&1 || true
    wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || true
    pm2 save >/dev/null 2>&1 || true
  fi
  echo "Rollback backup: $BACKUP"
  exit 1
}

log '1/8 — Production integrity preflight'
[[ -f "$HTML" ]] || fail 'Live SSR HTML missing'
[[ "$(pm2_cwd)" == "$CWD" ]] || fail "PM2 cwd mismatch: $(pm2_cwd)"
[[ "$(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')" == "$EXPECTED_RUNTIME_SHA" ]] || fail 'Golden runtime SHA changed'
[[ "$(pm2_status)" == 'online' ]] || pm2 restart "$APP"
wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || fail 'Port 3940 unhealthy'
wait_200 "$LIVE?preflight=$TS" 45 || fail 'Public AI Video unhealthy'
wait_200 "$REGISTER" 45 || fail 'Registration route unhealthy'
wait_200 "$CLAUDE?preflight=$TS" 45 || fail 'Claude route unhealthy'
for marker in 'Create cinematic AI videos' 'Six blocks' 'Understand the tools' 'Get My Free Seat'; do
  grep -Fq "$marker" "$HTML" || fail "Core marker missing: $marker"
done
[[ "$(grep -o '<style' "$HTML" | wc -l)" -ge 35 ]] || fail 'Unexpected style stack; refusing blind patch'

echo '✅ Golden runtime + funnel routes healthy'

log '2/8 — Exact rollback snapshot + immutable funnel fingerprints'
mkdir -p "$BACKUP"
cp -a "$HTML" "$BACKUP/ai-video.html.before"
PRE_SHA="$(sha256sum "$HTML" | awk '{print $1}')"
curl -fsS "$CLAUDE?sha=$TS" -o "$BACKUP/claude.before.html"
CLAUDE_SHA="$(sha256sum "$BACKUP/claude.before.html" | awk '{print $1}')"
python3 - "$HTML" "$BACKUP" <<'PY'
import re,sys,json
p,b=sys.argv[1:3]
s=open(p,encoding='utf-8',errors='ignore').read()
def vals(pattern): return re.findall(pattern,s,re.I)
obj={
 'script_src': vals(r'<script[^>]+src=["\']([^"\']+)["\']'),
 'href': vals(r'<a[^>]+href=["\']([^"\']+)["\']'),
 'form_action': vals(r'<form[^>]+action=["\']([^"\']*)["\']'),
 'section_count': len(re.findall(r'<section\b',s,re.I)),
 'script_count': len(re.findall(r'<script\b',s,re.I)),
 'style_count': len(re.findall(r'<style\b',s,re.I)),
}
open(b+'/fingerprint.before.json','w').write(json.dumps(obj,indent=2))
PY
printf 'PRE_SHA=%s\nCLAUDE_SHA=%s\nAPP=%s\nCWD=%s\n' "$PRE_SHA" "$CLAUDE_SHA" "$APP" "$CWD" > "$BACKUP/state.env"
trap rollback ERR INT TERM

echo "Backup: $BACKUP"

log '3/8 — Build single final V91 presentation layer'
CSS_FILE="$(mktemp)"
cat > "$CSS_FILE" <<'CSS'
/* SikhaDenge AI Video — V91 presentation-only consolidation layer.
   Purpose: normalize the accumulated visual patches without changing content,
   links, scripts, forms, tracking, checkout, or interactive behaviour. */

:root{
  --v91-ink:#0b1220;
  --v91-body:#526079;
  --v91-muted:#718096;
  --v91-line:#e3e8f2;
  --v91-soft:#f7f9ff;
  --v91-blue:#2563eb;
  --v91-indigo:#5b5cf0;
  --v91-violet:#8b5cf6;
  --v91-coral:#f05a35;
  --v91-shadow:0 18px 46px rgba(15,23,42,.075);
  --v91-shadow-soft:0 10px 30px rgba(15,23,42,.055);
  --v91-radius:22px;
}

html body main{
  color:var(--v91-ink)!important;
  background:#fff!important;
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;
  -webkit-font-smoothing:antialiased!important;
  text-rendering:optimizeLegibility!important;
}
html body main [class*="ai-video-masterclass_container__"]{
  width:min(1160px,calc(100% - 48px))!important;
  max-width:1160px!important;
  margin-inline:auto!important;
}
html body main [class*="ai-video-masterclass_sectionHeading__"]{
  max-width:820px!important;
  margin-left:auto!important;
  margin-right:auto!important;
  color:var(--v91-ink)!important;
  font-size:clamp(36px,4vw,54px)!important;
  line-height:1.05!important;
  letter-spacing:-.045em!important;
  font-weight:850!important;
  text-wrap:balance!important;
}
html body main [class*="ai-video-masterclass_sectionSubtitle__"]{
  max-width:720px!important;
  margin-left:auto!important;
  margin-right:auto!important;
  color:var(--v91-body)!important;
  font-size:16px!important;
  line-height:1.72!important;
  text-wrap:balance!important;
}
html body main [class*="ai-video-masterclass_sectionTag__"]{
  min-height:32px!important;
  padding:7px 12px!important;
  border:1px solid rgba(79,70,229,.15)!important;
  border-radius:999px!important;
  background:#fff!important;
  color:#4f46e5!important;
  font-size:10.5px!important;
  font-weight:800!important;
  letter-spacing:.11em!important;
  box-shadow:0 7px 20px rgba(15,23,42,.035)!important;
}

/* HERO — preserve all V125/V18x functionality; only calm page-level spacing. */
html body main #hero,
html body main #ai-video-hero-v125{
  isolation:isolate!important;
}
html body main #hero{
  padding-bottom:38px!important;
}
html body main #hero [class*="heroInner__"]{
  width:min(1180px,calc(100% - 48px))!important;
  margin-inline:auto!important;
}

/* FIRST LEARNING BLOCK — five outcomes become a deliberate card system. */
html body main #what-you-learn{
  padding:86px 0 92px!important;
  background:linear-gradient(180deg,#fff 0%,#f8faff 100%)!important;
}
html body main #what-you-learn [class*="outcomeGrid__"]{
  display:grid!important;
  grid-template-columns:repeat(5,minmax(0,1fr))!important;
  gap:14px!important;
  margin-top:34px!important;
  align-items:stretch!important;
}
html body main #what-you-learn [class*="outcomeCard__"]{
  min-width:0!important;
  min-height:190px!important;
  padding:22px 20px!important;
  border:1px solid var(--v91-line)!important;
  border-radius:20px!important;
  background:rgba(255,255,255,.96)!important;
  box-shadow:var(--v91-shadow-soft)!important;
  transform:none!important;
}
html body main #what-you-learn [class*="outcomeIcon__"]{
  display:grid!important;
  place-items:center!important;
  width:42px!important;
  height:42px!important;
  margin-bottom:18px!important;
  border:1px solid rgba(91,92,240,.14)!important;
  border-radius:13px!important;
  background:linear-gradient(135deg,#eef4ff,#f6f1ff)!important;
  color:var(--v91-indigo)!important;
}
html body main #what-you-learn [class*="outcomeCard__"] h3{
  margin:0 0 8px!important;
  color:var(--v91-ink)!important;
  font-size:16px!important;
  line-height:1.3!important;
  letter-spacing:-.02em!important;
  font-weight:780!important;
}
html body main #what-you-learn [class*="outcomeCard__"] p{
  margin:0!important;
  color:var(--v91-body)!important;
  font-size:13px!important;
  line-height:1.62!important;
}

/* Repeated persuasion/research panels. This is where legacy patches had the
   biggest visual drift. Keep their DOM/content exactly intact. */
html body main #ai-video-proof-section-v13,
html body main #ai-video-job-impact-v80,
html body main #ai-video-ai-opportunity-v85,
html body main #ai-workflow-v4{
  position:relative!important;
  overflow:hidden!important;
  padding:84px 0!important;
}
html body main #ai-video-proof-section-v13,
html body main #ai-video-ai-opportunity-v85{
  background:linear-gradient(180deg,#fff 0%,#f8faff 100%)!important;
}
html body main #ai-video-job-impact-v80,
html body main #ai-workflow-v4{
  background:#fff!important;
}
html body main #ai-video-proof-section-v13 > div,
html body main #ai-video-job-impact-v80 > div,
html body main #ai-video-ai-opportunity-v85 > div,
html body main #ai-workflow-v4 > div{
  width:min(1120px,calc(100% - 48px))!important;
  max-width:1120px!important;
  margin-inline:auto!important;
}
html body main #ai-video-proof-section-v13 h2,
html body main #ai-video-job-impact-v80 h2,
html body main #ai-video-ai-opportunity-v85 h2,
html body main #ai-workflow-v4 h2{
  max-width:820px!important;
  margin-left:auto!important;
  margin-right:auto!important;
  color:var(--v91-ink)!important;
  font-size:clamp(34px,3.7vw,50px)!important;
  line-height:1.06!important;
  letter-spacing:-.045em!important;
  font-weight:850!important;
  text-align:center!important;
  text-wrap:balance!important;
}
html body main #ai-video-proof-section-v13 > div > p,
html body main #ai-video-job-impact-v80 > div > p,
html body main #ai-video-ai-opportunity-v85 > div > p,
html body main #ai-workflow-v4 > div > p{
  max-width:720px!important;
  margin-left:auto!important;
  margin-right:auto!important;
  color:var(--v91-body)!important;
  font-size:15.5px!important;
  line-height:1.7!important;
  text-align:center!important;
}
html body main #ai-video-job-impact-v80 article,
html body main #ai-video-ai-opportunity-v85 article,
html body main #ai-video-proof-section-v13 article,
html body main #ai-workflow-v4 article,
html body main #ai-video-job-impact-v80 [class*="card"],
html body main #ai-video-ai-opportunity-v85 [class*="card"],
html body main #ai-workflow-v4 [class*="card"]{
  min-width:0!important;
  border:1px solid var(--v91-line)!important;
  border-radius:20px!important;
  background:#fff!important;
  box-shadow:var(--v91-shadow-soft)!important;
}
html body main #ai-video-job-impact-v80 article,
html body main #ai-video-ai-opportunity-v85 article{
  padding:24px!important;
}
html body main #ai-video-job-impact-v80 article p,
html body main #ai-video-ai-opportunity-v85 article p,
html body main #ai-workflow-v4 article p{
  color:var(--v91-body)!important;
  font-size:13px!important;
  line-height:1.58!important;
}
html body main #ai-video-job-impact-v80 [class*="stat"],
html body main #ai-video-job-impact-v80 [class*="value"],
html body main #ai-video-job-impact-v80 [class*="number"]{
  color:#e54f2a!important;
  font-weight:850!important;
  letter-spacing:-.035em!important;
}
html body main #ai-video-ai-opportunity-v85 [class*="stat"],
html body main #ai-video-ai-opportunity-v85 [class*="value"],
html body main #ai-video-ai-opportunity-v85 [class*="number"]{
  color:var(--v91-indigo)!important;
  font-weight:850!important;
  letter-spacing:-.035em!important;
}

/* CORE CURRICULUM — stronger module hierarchy. */
html body main #learn{
  padding:92px 0 96px!important;
  background:linear-gradient(180deg,#f8faff 0%,#fff 100%)!important;
}
html body main #learn [class*="moduleGrid__"]{
  display:grid!important;
  grid-template-columns:repeat(3,minmax(0,1fr))!important;
  gap:16px!important;
  margin-top:36px!important;
  align-items:stretch!important;
}
html body main #learn [class*="moduleCard__"]{
  min-width:0!important;
  min-height:210px!important;
  padding:24px!important;
  border:1px solid var(--v91-line)!important;
  border-radius:22px!important;
  background:#fff!important;
  box-shadow:var(--v91-shadow-soft)!important;
  transform:none!important;
}
html body main #learn [class*="moduleNumber__"]{
  display:inline-grid!important;
  place-items:center!important;
  min-width:38px!important;
  height:30px!important;
  padding:0 10px!important;
  margin-bottom:18px!important;
  border:1px solid rgba(91,92,240,.15)!important;
  border-radius:999px!important;
  background:#f0f4ff!important;
  color:var(--v91-indigo)!important;
  font-size:11px!important;
  font-weight:850!important;
  letter-spacing:.08em!important;
}
html body main #learn [class*="moduleContent__"] h3{
  margin:0 0 9px!important;
  color:var(--v91-ink)!important;
  font-size:18px!important;
  line-height:1.28!important;
  letter-spacing:-.025em!important;
  font-weight:800!important;
}
html body main #learn [class*="moduleContent__"] p{
  color:var(--v91-body)!important;
  font-size:13px!important;
  line-height:1.62!important;
}
html body main #learn [class*="moduleOutcome__"]{
  margin-top:16px!important;
  padding-top:14px!important;
  border-top:1px solid #edf0f6!important;
  color:#40516b!important;
  font-size:12px!important;
  line-height:1.5!important;
}

/* TOOLS — keep the dark identity, remove cramped wall-of-text feel. */
html body main #tools{
  padding:94px 0 100px!important;
  background:
    radial-gradient(circle at 10% 18%,rgba(37,99,235,.22),transparent 30%),
    radial-gradient(circle at 92% 62%,rgba(139,92,246,.23),transparent 34%),
    linear-gradient(135deg,#07152c 0%,#0c1934 48%,#20164b 100%)!important;
}
html body main #tools [class*="container__"]{
  width:min(1160px,calc(100% - 48px))!important;
}
html body main #tools [class*="sectionHeading__"]{
  color:#f8fbff!important;
  text-align:left!important;
  margin-left:0!important;
  max-width:760px!important;
}
html body main #tools [class*="sectionSubtitle__"]{
  color:#b9c5d8!important;
  text-align:left!important;
  margin-left:0!important;
  max-width:660px!important;
}
html body main #tools [class*="toolsGrid__"]{
  display:grid!important;
  grid-template-columns:minmax(260px,.78fr) minmax(0,1.5fr)!important;
  gap:34px!important;
  align-items:center!important;
  margin-top:40px!important;
}
html body main #tools [class*="toolsList__"]{
  display:grid!important;
  grid-template-columns:1fr!important;
  gap:9px!important;
}
html body main #tools [class*="toolItem__"]{
  min-height:48px!important;
  padding:10px 12px!important;
  border:1px solid rgba(148,163,184,.16)!important;
  border-radius:14px!important;
  background:rgba(255,255,255,.055)!important;
  color:#eaf0fb!important;
}
html body main #tools [class*="toolItem__"] p,
html body main #tools [class*="toolItem__"] span{
  color:#c6d0e0!important;
  font-size:12.5px!important;
  line-height:1.45!important;
}
html body main #tools [class*="toolsDemo__"]{
  overflow:hidden!important;
  border:1px solid rgba(255,255,255,.16)!important;
  border-radius:24px!important;
  background:rgba(255,255,255,.075)!important;
  box-shadow:0 26px 70px rgba(0,0,0,.24)!important;
}

/* WORKFLOWS — four use cases, visually equal and easy to scan. */
html body main [class*="workflowsSection__"]{
  padding:88px 0 94px!important;
  background:#fff!important;
}
html body main [class*="workflowGrid__"]{
  display:grid!important;
  grid-template-columns:repeat(4,minmax(0,1fr))!important;
  gap:16px!important;
  margin-top:34px!important;
  align-items:stretch!important;
}
html body main [class*="workflowCard__"]{
  min-width:0!important;
  min-height:188px!important;
  padding:22px!important;
  border:1px solid var(--v91-line)!important;
  border-radius:20px!important;
  background:linear-gradient(180deg,#fff,#fbfcff)!important;
  box-shadow:var(--v91-shadow-soft)!important;
  transform:none!important;
}
html body main [class*="workflowIcon__"]{
  display:grid!important;
  place-items:center!important;
  width:42px!important;
  height:42px!important;
  margin-bottom:17px!important;
  border-radius:13px!important;
  background:linear-gradient(135deg,#edf4ff,#f7efff)!important;
  color:var(--v91-indigo)!important;
}
html body main [class*="workflowCard__"] h3{
  color:var(--v91-ink)!important;
  font-size:16px!important;
  line-height:1.3!important;
  font-weight:790!important;
}
html body main [class*="workflowCard__"] p{
  color:var(--v91-body)!important;
  font-size:13px!important;
  line-height:1.58!important;
}

/* TESTIMONIALS — consistent media cards and readable metadata. */
html body main [class*="testimonialsSection__"],
html body main #ai-video-testimonials-v54{
  padding:88px 0 96px!important;
  background:linear-gradient(180deg,#f8faff,#fff)!important;
}
html body main [class*="testimonialGrid__"]{
  display:grid!important;
  grid-template-columns:repeat(5,minmax(0,1fr))!important;
  gap:14px!important;
  margin-top:34px!important;
  align-items:start!important;
}
html body main [class*="testimonialCard__"]{
  min-width:0!important;
  overflow:hidden!important;
  border:1px solid var(--v91-line)!important;
  border-radius:20px!important;
  background:#fff!important;
  box-shadow:var(--v91-shadow-soft)!important;
}
html body main [class*="testimonialCard__"] video,
html body main [class*="testimonialCard__"] img{
  width:100%!important;
  aspect-ratio:9/12!important;
  object-fit:cover!important;
  display:block!important;
}
html body main [class*="testimonialProfile__"]{
  padding:14px 15px 16px!important;
}
html body main [class*="testimonialProfile__"] p,
html body main [class*="testimonialProfile__"] span{
  color:var(--v91-body)!important;
  font-size:11.5px!important;
  line-height:1.45!important;
}

/* Audience V4 deliberately left alone. It is the cleanest current custom section. */

/* FAQ V3 — retain its accordion JS and markup, refine only rhythm/surface. */
html body main #faq{
  padding:90px 0 96px!important;
  background:linear-gradient(180deg,#f8faff 0%,#f3f6ff 100%)!important;
}
html body main #faq .faq-v3-shell{
  width:min(1060px,calc(100% - 48px))!important;
  margin-inline:auto!important;
}
html body main #faq .faq-v3-head{
  max-width:760px!important;
  margin:0 auto 34px!important;
  text-align:center!important;
}
html body main #faq .faq-v3-title{
  color:var(--v91-ink)!important;
  font-size:clamp(34px,3.8vw,50px)!important;
  line-height:1.06!important;
  letter-spacing:-.045em!important;
  font-weight:850!important;
}
html body main #faq .faq-v3-sub{
  color:var(--v91-body)!important;
  font-size:15px!important;
  line-height:1.65!important;
}
html body main #faq .faq-v3-grid{
  gap:12px!important;
}
html body main #faq .faq-v3-item{
  overflow:hidden!important;
  border:1px solid #dde4f0!important;
  border-radius:15px!important;
  background:#fff!important;
  box-shadow:0 8px 24px rgba(15,23,42,.045)!important;
}
html body main #faq .faq-v3-q{
  min-height:58px!important;
  padding:15px 17px!important;
  color:var(--v91-ink)!important;
  font-size:13.5px!important;
  line-height:1.45!important;
  font-weight:700!important;
}
html body main #faq .faq-v3-a-inner{
  padding:0 17px 16px!important;
  color:var(--v91-body)!important;
  font-size:13px!important;
  line-height:1.65!important;
}

/* FINAL CTA — strong finish without changing its actual CTA/link. */
html body main #final{
  padding:86px 0 54px!important;
  background:#fff!important;
}
html body main #final [class*="finalCtaCard__"]{
  overflow:hidden!important;
  padding:42px 46px!important;
  border:1px solid rgba(255,255,255,.12)!important;
  border-radius:26px!important;
  background:
    radial-gradient(circle at 82% 30%,rgba(139,92,246,.38),transparent 34%),
    radial-gradient(circle at 10% 80%,rgba(37,99,235,.22),transparent 34%),
    linear-gradient(120deg,#07162c 0%,#101a3c 52%,#3a166f 100%)!important;
  box-shadow:0 26px 70px rgba(15,23,42,.18)!important;
}
html body main #final [class*="finalCtaCard__"] h2{
  color:#fff!important;
  font-size:clamp(32px,3.5vw,46px)!important;
  line-height:1.08!important;
  letter-spacing:-.04em!important;
}
html body main #final [class*="finalCtaCard__"] p{
  color:#cbd5e1!important;
  font-size:14px!important;
  line-height:1.6!important;
}

/* PAYMENT / TRUST — quieter, structured and readable. */
html body #ai-video-payment-footer-v5{
  padding-top:52px!important;
  background:linear-gradient(180deg,#fff,#f8faff)!important;
}
html body #ai-video-payment-footer-v5 > div{
  width:min(1120px,calc(100% - 48px))!important;
  margin-inline:auto!important;
}
html body #ai-video-payment-footer-v5 h2{
  color:var(--v91-ink)!important;
  letter-spacing:-.035em!important;
}
html body #ai-video-payment-footer-v5 p{
  color:var(--v91-body)!important;
  line-height:1.6!important;
}

/* Tablet */
@media (max-width:1050px){
  html body main [class*="ai-video-masterclass_container__"],
  html body main #hero [class*="heroInner__"],
  html body main #tools [class*="container__"]{width:min(100% - 40px,960px)!important}
  html body main #what-you-learn [class*="outcomeGrid__"]{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  html body main #learn [class*="moduleGrid__"]{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  html body main [class*="workflowGrid__"]{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  html body main [class*="testimonialGrid__"]{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  html body main #tools [class*="toolsGrid__"]{grid-template-columns:minmax(220px,.8fr) minmax(0,1.25fr)!important;gap:24px!important}
}

/* Mobile */
@media (max-width:700px){
  html body main [class*="ai-video-masterclass_container__"],
  html body main #hero [class*="heroInner__"],
  html body main #tools [class*="container__"],
  html body main #faq .faq-v3-shell,
  html body #ai-video-payment-footer-v5 > div,
  html body main #ai-video-proof-section-v13 > div,
  html body main #ai-video-job-impact-v80 > div,
  html body main #ai-video-ai-opportunity-v85 > div,
  html body main #ai-workflow-v4 > div{width:calc(100% - 32px)!important}

  html body main [class*="ai-video-masterclass_sectionHeading__"],
  html body main #ai-video-proof-section-v13 h2,
  html body main #ai-video-job-impact-v80 h2,
  html body main #ai-video-ai-opportunity-v85 h2,
  html body main #ai-workflow-v4 h2,
  html body main #faq .faq-v3-title{
    font-size:30px!important;
    line-height:1.08!important;
    letter-spacing:-.038em!important;
  }
  html body main [class*="ai-video-masterclass_sectionSubtitle__"]{font-size:14px!important;line-height:1.62!important}

  html body main #what-you-learn,
  html body main #learn,
  html body main [class*="workflowsSection__"],
  html body main [class*="testimonialsSection__"],
  html body main #ai-video-testimonials-v54,
  html body main #faq,
  html body main #final,
  html body main #ai-video-proof-section-v13,
  html body main #ai-video-job-impact-v80,
  html body main #ai-video-ai-opportunity-v85,
  html body main #ai-workflow-v4{
    padding-top:62px!important;
    padding-bottom:66px!important;
  }
  html body main #tools{padding:66px 0 72px!important}

  html body main #what-you-learn [class*="outcomeGrid__"],
  html body main #learn [class*="moduleGrid__"],
  html body main [class*="workflowGrid__"],
  html body main [class*="testimonialGrid__"]{
    grid-template-columns:1fr!important;
    gap:12px!important;
  }
  html body main #what-you-learn [class*="outcomeCard__"],
  html body main #learn [class*="moduleCard__"],
  html body main [class*="workflowCard__"]{
    min-height:0!important;
    padding:19px!important;
    border-radius:18px!important;
  }
  html body main [class*="testimonialCard__"] video,
  html body main [class*="testimonialCard__"] img{aspect-ratio:16/10!important}

  html body main #tools [class*="toolsGrid__"]{grid-template-columns:1fr!important;gap:22px!important;margin-top:28px!important}
  html body main #tools [class*="sectionHeading__"],
  html body main #tools [class*="sectionSubtitle__"]{text-align:center!important;margin-left:auto!important;margin-right:auto!important}
  html body main #tools [class*="toolsList__"]{grid-template-columns:1fr!important}

  html body main #final [class*="finalCtaCard__"]{padding:30px 22px!important;border-radius:22px!important;text-align:center!important}
  html body main #faq .faq-v3-grid{grid-template-columns:1fr!important;gap:10px!important}
  html body main #faq .faq-v3-q{min-height:54px!important;padding:14px 15px!important;font-size:13px!important}
  html body main #faq .faq-v3-a-inner{padding:0 15px 15px!important}
}

@media (prefers-reduced-motion:reduce){
  html body main *,html body main *::before,html body main *::after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}
}
CSS

python3 - "$HTML" "$CSS_FILE" "$STYLE_ID" <<'PY'
import re,sys
path,css_path,style_id=sys.argv[1:4]
s=open(path,encoding='utf-8',errors='strict').read()
css=open(css_path,encoding='utf-8',errors='strict').read()
# Idempotent: remove an earlier V91 layer if present, then append as the final
# source-level style before </body> so it can consolidate older !important patches.
pat=re.compile(r'\s*<style\s+id=["\']'+re.escape(style_id)+r'["\'][^>]*>.*?</style>\s*',re.I|re.S)
s=pat.sub('\n',s)
block='\n<style id="'+style_id+'">\n'+css+'\n</style>\n'
idx=s.lower().rfind('</body>')
if idx < 0: raise SystemExit('No </body> found; refusing mutation')
s=s[:idx]+block+s[idx:]
open(path,'w',encoding='utf-8',newline='').write(s)
PY
rm -f "$CSS_FILE"

grep -Fq "id=\"$STYLE_ID\"" "$HTML" || fail 'V91 style was not written'
[[ "$(grep -o "id=\"$STYLE_ID\"" "$HTML" | wc -l)" == '1' ]] || fail 'V91 style duplicated'

echo '✅ V91 layer built once, no DOM/script mutation'

log '4/8 — Static invariants before restart'
python3 - "$BACKUP/ai-video.html.before" "$HTML" "$STYLE_ID" "$BACKUP" <<'PY'
import re,sys,json,hashlib
before_path,after_path,style_id,b=sys.argv[1:5]
before=open(before_path,encoding='utf-8',errors='strict').read()
after=open(after_path,encoding='utf-8',errors='strict').read()
pat=re.compile(r'\s*<style\s+id=["\']'+re.escape(style_id)+r'["\'][^>]*>.*?</style>\s*',re.I|re.S)
normalized=pat.sub('\n',after)
# normalize the single insertion-adjacent newline generated by the idempotent writer
norm_sha=hashlib.sha256(normalized.encode()).hexdigest()
pre_sha=hashlib.sha256(before.encode()).hexdigest()
if normalized != before:
    # whitespace-only equivalence is accepted only outside tags; report hard mismatch otherwise.
    b2=re.sub(r'>\s+<','><',before)
    n2=re.sub(r'>\s+<','><',normalized)
    if b2 != n2:
        raise SystemExit('Non-V91 HTML changed')

def fp(s):
    return {
      'script_src':re.findall(r'<script[^>]+src=["\']([^"\']+)["\']',s,re.I),
      'href':re.findall(r'<a[^>]+href=["\']([^"\']+)["\']',s,re.I),
      'form_action':re.findall(r'<form[^>]+action=["\']([^"\']*)["\']',s,re.I),
      'section_count':len(re.findall(r'<section\b',s,re.I)),
      'script_count':len(re.findall(r'<script\b',s,re.I)),
    }
a,bb=fp(before),fp(after)
for key in ['script_src','href','form_action','section_count','script_count']:
    if a[key] != bb[key]: raise SystemExit('Invariant changed: '+key)
if after.count('id="'+style_id+'"') != 1: raise SystemExit('V91 style count != 1')
open(b+'/fingerprint.after.json','w').write(json.dumps(bb,indent=2))
print('PRE_SHA=',pre_sha)
print('NORMALIZED_AFTER_SHA=',norm_sha)
print('scripts=',bb['script_count'],'sections=',bb['section_count'],'hrefs=',len(bb['href']))
print('✅ links/scripts/forms/section structure unchanged')
PY

log '5/8 — Restart current Golden app only'
pm2 restart "$APP" >/dev/null
wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || fail 'Local AI Video failed after restart'
pm2 save >/dev/null

log '6/8 — Public production verification'
curl -fsS "$LIVE?ui=v91-$TS" -o "$BACKUP/ai-video.after.html"
AI_HTTP="$(curl -L -sS -o /dev/null -w '%{http_code}' "$LIVE?health=v91-$TS")"
CLAUDE_HTTP="$(curl -L -sS -o /dev/null -w '%{http_code}' "$CLAUDE?health=v91-$TS")"
[[ "$AI_HTTP" == '200' ]] || fail "AI public HTTP=$AI_HTTP"
[[ "$CLAUDE_HTTP" == '200' ]] || fail "Claude public HTTP=$CLAUDE_HTTP"
grep -Fq "id=\"$STYLE_ID\"" "$BACKUP/ai-video.after.html" || fail 'Public page does not contain V91 style'
for marker in 'Create cinematic AI videos' 'Six blocks' 'Understand the tools' 'Get My Free Seat'; do
  grep -Fq "$marker" "$BACKUP/ai-video.after.html" || fail "Public marker missing: $marker"
done
curl -fsS "$CLAUDE?sha2=$TS" -o "$BACKUP/claude.after.html"
CLAUDE_AFTER_SHA="$(sha256sum "$BACKUP/claude.after.html" | awk '{print $1}')"
[[ "$CLAUDE_AFTER_SHA" == "$CLAUDE_SHA" ]] || fail 'Claude response changed during AI-only deploy'

echo "AI_HTTP=$AI_HTTP CLAUDE_HTTP=$CLAUDE_HTTP"
echo '✅ Public page live; Claude byte-identical'

log '7/8 — Browser responsive QA (Chromium if available)'
BROWSER_QA='not-run'
if command -v chromium >/dev/null 2>&1 || command -v chromium-browser >/dev/null 2>&1; then
  CHROME="$(command -v chromium || command -v chromium-browser)"
  for size in '1440,1000' '834,1112' '390,844'; do
    W="${size%,*}"; H="${size#*,}"
    "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size="$W,$H" --virtual-time-budget=4000 --dump-dom "$LIVE?qa=v91-${W}-${TS}" > "$BACKUP/dom-${W}.html" 2>/dev/null || true
    grep -Fq "$STYLE_ID" "$BACKUP/dom-${W}.html" || fail "Chromium DOM missing V91 at ${W}px"
  done
  BROWSER_QA='chromium-dom-pass'
else
  echo 'Chromium binary not installed on production host; source/public QA already passed.'
fi

log '8/8 — Final state'
trap - ERR INT TERM
POST_SHA="$(sha256sum "$HTML" | awk '{print $1}')"
printf 'POST_SHA=%s\nAI_HTTP=%s\nCLAUDE_HTTP=%s\nBROWSER_QA=%s\n' "$POST_SHA" "$AI_HTTP" "$CLAUDE_HTTP" "$BROWSER_QA" >> "$BACKUP/state.env"

echo '============================================================'
echo '✅ AI VIDEO V91 UI-ONLY DEPLOY COMPLETE'
echo "APP=$APP"
echo "CWD=$CWD"
echo "STYLE_ID=$STYLE_ID"
echo "AI_HTTP=$AI_HTTP"
echo "CLAUDE_HTTP=$CLAUDE_HTTP"
echo "BROWSER_QA=$BROWSER_QA"
echo "ROLLBACK_BACKUP=$BACKUP"
echo 'UNCHANGED=content,links,forms,scripts,tracking,checkout,API,Claude'
echo '============================================================'
