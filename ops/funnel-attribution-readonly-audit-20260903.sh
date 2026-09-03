#!/usr/bin/env bash
set -Eeuo pipefail

: "${SSH_HOST:?missing SSH_HOST}"
: "${SSH_USER:?missing SSH_USER}"
SSH_PORT="${SSH_PORT:-22}"
KEY="$HOME/.ssh/prod"

ssh -p "$SSH_PORT" -i "$KEY" \
  -o BatchMode=yes \
  -o IdentitiesOnly=yes \
  -o StrictHostKeyChecking=yes \
  -o ConnectTimeout=15 \
  "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeuo pipefail
export TZ=Asia/Kolkata

echo '===== FUNNEL ATTRIBUTION READONLY AUDIT ====='
date -Is

echo '===== LOCKED REGISTRATION ASSET HASHES ====='
for f in \
  /var/www/sikhadenge.in/registration-stable-v72-*/registration-stable-page1-v72.js \
  /var/www/sikhadenge.in/registration-stable-v72-*/registration-stable-hot-v72.js; do
  [ -f "$f" ] && sha256sum "$f"
done | tail -4

echo '===== PORT OWNERS ====='
ss -ltnp 2>/dev/null | grep -E ':(3400|3940|3955)\b' || true

echo '===== PM2 SANITIZED RUNTIME MAP ====='
pm2 jlist > /tmp/sd-funnel-pm2.json
node <<'NODE'
const fs=require('fs');
const a=JSON.parse(fs.readFileSync('/tmp/sd-funnel-pm2.json','utf8'));
const keys=[
  'DATABASE_URL','LEAD_INGEST_WEBHOOK_SECRET','INTERNAL_CRON_SECRET',
  'META_CONVERSIONS_API_URL','META_CONVERSIONS_ACCESS_TOKEN','META_PIXEL_ID','NEXT_PUBLIC_META_PIXEL_ID',
  'GA4_MEASUREMENT_ID','GA4_API_SECRET','NEXT_PUBLIC_GA_ID',
  'GOOGLE_ADS_OFFLINE_CONVERSION_URL','GOOGLE_ADS_ACCESS_TOKEN','GOOGLE_ADS_DEVELOPER_TOKEN',
  'RAZORPAY_WEBHOOK_SECRET'
];
for(const p of a){
  const e=p.pm2_env||{};
  const port=String(e.PORT||'');
  if(!['3400','3940','3955'].includes(port) && !/(dashboard|heading|registration|ai.video|masterclass)/i.test(String(p.name||''))) continue;
  const present={}; for(const k of keys) present[k]=Boolean(e[k]);
  console.log(JSON.stringify({name:p.name,pid:p.pid,status:e.status,port:port||null,cwd:e.pm_cwd||null,script:e.pm_exec_path||null,envPresent:present}));
}
NODE

echo '===== NGINX FUNNEL ROUTING ====='
grep -RInE 'masterclass/ai-video|gen-ai-masterclass/register-one-step|api/masterclass/lead|api/analytics/events|127\.0\.0\.1:(3400|3940|3955)' /etc/nginx/nginx.conf /etc/nginx/conf.d /etc/nginx/sites-enabled /etc/nginx/snippets 2>/dev/null | head -120 || true

echo '===== LIVE AI VIDEO CTA ATTRIBUTION PROPAGATION ====='
AI_URL='https://sikhadenge.in/masterclass/ai-video?utm_source=meta&utm_medium=paid_social&utm_campaign=AUDIT_CAMPAIGN&utm_campaign_id=AUDIT_CMP_123&utm_adset_id=AUDIT_SET_123&utm_ad_id=AUDIT_AD_123&utm_content=AUDIT_CREATIVE&utm_term=AUDIT_TERM&fbclid=AUDIT_FBCLID'
curl -L --compressed -ksS "$AI_URL" -o /tmp/sd-ai-video-audit.html
printf 'AI_HTTP='; curl -L --compressed -ksS -o /dev/null -w '%{http_code}\n' "$AI_URL"
printf 'CTA_HREFS:\n'
grep -oE 'href="[^"]*gen-ai-masterclass/register-one-step[^"]*"' /tmp/sd-ai-video-audit.html | head -20 || true
for token in AUDIT_CAMPAIGN AUDIT_CMP_123 AUDIT_SET_123 AUDIT_AD_123 AUDIT_FBCLID; do
  if grep -Fq "$token" /tmp/sd-ai-video-audit.html; then echo "HTML_CONTAINS_${token}=YES"; else echo "HTML_CONTAINS_${token}=NO"; fi
done

echo '===== LIVE REGISTRATION ROUTE MARKERS ====='
REG_URL='https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass&utm_source=meta&utm_medium=paid_social&utm_campaign=AUDIT_CAMPAIGN&utm_campaign_id=AUDIT_CMP_123&utm_adset_id=AUDIT_SET_123&utm_ad_id=AUDIT_AD_123&utm_content=AUDIT_CREATIVE&fbclid=AUDIT_FBCLID'
curl -L --compressed -ksS "$REG_URL" -o /tmp/sd-registration-audit.html
printf 'REG_HTTP='; curl -L --compressed -ksS -o /dev/null -w '%{http_code}\n' "$REG_URL"
for token in registration-stable-prepaint-v72 registration-stable-page1-v72 registration-stable-hot-v72 'api/social-proof/live?widget=1'; do
  if grep -Fq "$token" /tmp/sd-registration-audit.html; then echo "REG_MARKER_${token}=YES"; else echo "REG_MARKER_${token}=NO"; fi
done

echo '===== PUBLIC ANALYTICS ROUTE PRESENCE ====='
printf 'ANALYTICS_EVENTS_STATUS='; curl -ksS -o /tmp/sd-analytics-events.out -w '%{http_code}\n' 'https://sikhadenge.in/api/analytics/events'
printf 'MASTERCLASS_LEAD_GET_STATUS='; curl -ksS -o /tmp/sd-masterclass-lead-get.out -w '%{http_code}\n' 'https://sikhadenge.in/api/masterclass/lead'

echo '===== HTML TRACKING MARKERS ====='
node <<'NODE'
const fs=require('fs');
for(const [name,path] of [['ai','/tmp/sd-ai-video-audit.html'],['reg','/tmp/sd-registration-audit.html']]){
  const s=fs.readFileSync(path,'utf8');
  const checks={fbq:/\bfbq\s*\(/.test(s),facebookScript:/connect\.facebook\.net|fbevents\.js/.test(s),gtag:/\bgtag\s*\(/.test(s),gtagScript:/googletagmanager\.com\/gtag\/js/.test(s),gtm:/googletagmanager\.com\/gtm\.js/.test(s),analyticsEvents:/\/api\/analytics\/events/.test(s),utmCampaignId:/utm_campaign_id/.test(s),utmAdId:/utm_ad_id/.test(s),anonymousId:/anonymousId/.test(s),sessionId:/sessionId/.test(s)};
  console.log(name.toUpperCase(),JSON.stringify(checks));
}
NODE

echo '===== RUNTIME SOURCE TRACKING SEARCH ====='
node <<'NODE' > /tmp/sd-runtime-cwds.tsv
const fs=require('fs');
const a=JSON.parse(fs.readFileSync('/tmp/sd-funnel-pm2.json','utf8'));
for(const p of a){const e=p.pm2_env||{};const port=String(e.PORT||'');if(['3400','3940','3955'].includes(port)&&e.pm_cwd)console.log([port,String(p.name||'').replace(/\t/g,' '),e.pm_cwd].join('\t'));}
NODE
cat /tmp/sd-runtime-cwds.tsv
while IFS=$'\t' read -r port name cwd; do
  [ -d "$cwd" ] || continue
  echo "--- PORT=$port NAME=$name CWD=$cwd ---"
  grep -RIlE --exclude-dir=node_modules --exclude-dir=.git --exclude='*.map' 'utm_campaign_id|utm_ad_id|fbclid|anonymousId|sessionId|/api/analytics/events|masterclassLead\.upsert|masterclassLead\.create' "$cwd" 2>/dev/null | head -40 || true
done < /tmp/sd-runtime-cwds.tsv

echo '===== DASHBOARD DATABASE LINKAGE (COUNTS ONLY, NO PII) ====='
DASH_PID="$(node <<'NODE'
const fs=require('fs');const a=JSON.parse(fs.readFileSync('/tmp/sd-funnel-pm2.json','utf8'));const p=a.find(x=>String(x.pm2_env?.PORT||'')==='3400');if(p)process.stdout.write(String(p.pid||''));
NODE
)"
DASH_CWD="$(awk -F '\t' '$1=="3400"{print $3;exit}' /tmp/sd-runtime-cwds.tsv)"
if [ -n "$DASH_PID" ] && [ -n "$DASH_CWD" ] && [ -d "$DASH_CWD" ]; then
  export DASH_PID DASH_CWD
  node <<'NODE'
const fs=require('fs'),path=require('path');
const pid=process.env.DASH_PID,cwd=process.env.DASH_CWD;
for(const entry of fs.readFileSync(`/proc/${pid}/environ`,'utf8').split('\0')){const i=entry.indexOf('=');if(i>0)process.env[entry.slice(0,i)]=entry.slice(i+1);}
process.chdir(cwd);
const {PrismaClient}=require(path.join(cwd,'node_modules/@prisma/client'));
const prisma=new PrismaClient();
(async()=>{
  const modelNames=['masterclassLead','lead','admission','payment','enrollment','identityLink','attributionSession','attributionTouch','conversionAttribution','analyticsEvent','offlineConversionJob','financialOrder'];
  const counts={};
  for(const m of modelNames){try{counts[m]=await prisma[m].count();}catch(e){counts[m]=`ERR:${e.constructor?.name||'unknown'}`;}}
  console.log('TOTAL_COUNTS',JSON.stringify(counts));
  try{
    const rows=await prisma.$queryRawUnsafe(`
      SELECT
        (SELECT COUNT(*)::int FROM "IdentityLink" WHERE "entityType"='masterclass_lead') AS "masterclassIdentityLinks",
        (SELECT COUNT(*)::int FROM "IdentityLink" WHERE "entityType"='lead') AS "leadIdentityLinks",
        (SELECT COUNT(DISTINCT ml."entityId")::int FROM "IdentityLink" ml JOIN "IdentityLink" l ON l."identityId"=ml."identityId" AND l."entityType"='lead' WHERE ml."entityType"='masterclass_lead') AS "masterclassLinkedToCanonicalLead",
        (SELECT COUNT(*)::int FROM "MasterclassLead" m JOIN "Lead" l ON l."phone"=m."phone") AS "masterclassPhoneMatchesCanonicalLead",
        (SELECT COUNT(*)::int FROM "Admission" WHERE "leadId" IS NOT NULL) AS "admissionsWithLead",
        (SELECT COUNT(*)::int FROM "Payment" WHERE "leadId" IS NOT NULL) AS "paymentsWithLead",
        (SELECT COUNT(*)::int FROM "Payment" WHERE "admissionId" IS NOT NULL) AS "paymentsWithAdmission",
        (SELECT COUNT(*)::int FROM "Enrollment") AS "enrollments",
        (SELECT COUNT(*)::int FROM "FinancialOrder" WHERE "campaignId" IS NOT NULL) AS "ordersWithCampaignId",
        (SELECT COUNT(*)::int FROM "FinancialOrder" WHERE "attributionTouchId" IS NOT NULL) AS "ordersWithAttributionTouchId"
    `);
    console.log('LINKAGE',JSON.stringify(rows[0]||{}));
  }catch(e){console.log('LINKAGE_ERROR',e.message.slice(0,300));}
  try{
    const touches=await prisma.attributionTouch.groupBy({by:['touchKind'],_count:{_all:true},orderBy:{_count:{touchKind:'desc'}}});
    console.log('TOUCH_KINDS',JSON.stringify(touches));
  }catch(e){console.log('TOUCH_KINDS_ERROR',e.message.slice(0,300));}
  try{
    const jobs=await prisma.offlineConversionJob.groupBy({by:['platform','conversionType','status'],_count:{_all:true}});
    console.log('OFFLINE_JOBS',JSON.stringify(jobs));
  }catch(e){console.log('OFFLINE_JOBS_ERROR',e.message.slice(0,300));}
  try{
    const events=await prisma.analyticsEvent.groupBy({by:['eventName'],_count:{_all:true},orderBy:{_count:{eventName:'desc'}},take:30});
    console.log('ANALYTICS_EVENTS',JSON.stringify(events));
  }catch(e){console.log('ANALYTICS_EVENTS_ERROR',e.message.slice(0,300));}
  try{
    const cols=await prisma.$queryRawUnsafe(`SELECT table_name,column_name FROM information_schema.columns WHERE table_schema='public' AND table_name IN ('MasterclassLead','Lead','Admission','Payment','Enrollment','FinancialOrder') ORDER BY table_name,ordinal_position`);
    const grouped={}; for(const r of cols){(grouped[r.table_name]??=[]).push(r.column_name);} console.log('KEY_TABLE_COLUMNS',JSON.stringify(grouped));
  }catch(e){console.log('COLUMN_AUDIT_ERROR',e.message.slice(0,300));}
})().catch(e=>{console.error('DB_AUDIT_FATAL',e.message.slice(0,500));process.exitCode=1;}).finally(()=>prisma.$disconnect());
NODE
else
  echo 'DASHBOARD_RUNTIME_NOT_FOUND_FOR_DB_AUDIT'
fi

echo '===== V72 HASH RECHECK ====='
for f in \
  /var/www/sikhadenge.in/registration-stable-v72-*/registration-stable-page1-v72.js \
  /var/www/sikhadenge.in/registration-stable-v72-*/registration-stable-hot-v72.js; do
  [ -f "$f" ] && sha256sum "$f"
done | tail -4

echo 'RESULT=READONLY_ATTRIBUTION_AUDIT_COMPLETE'
REMOTE
