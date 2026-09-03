#!/usr/bin/env bash
set -Eeuo pipefail
: "${SSH_HOST:?missing SSH_HOST}"
: "${SSH_USER:?missing SSH_USER}"
SSH_PORT="${SSH_PORT:-22}"
KEY="$HOME/.ssh/prod"

ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=15 "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeuo pipefail
export TZ=Asia/Kolkata

echo '===== FUNNEL ATTRIBUTION READONLY AUDIT V2 ====='
date -Is

listener_pid(){
  local port="$1"
  ss -ltnp 2>/dev/null | awk -v p=":${port}" '$4 ~ p"$" {if(match($0,/pid=[0-9]+/)){x=substr($0,RSTART+4,RLENGTH-4);print x;exit}}'
}

: > /tmp/sd-listeners.tsv
for port in 3400 3940 3955; do
  pid="$(listener_pid "$port")"
  if [ -n "$pid" ] && [ -d "/proc/$pid" ]; then
    cwd="$(readlink -f "/proc/$pid/cwd" || true)"
    cmd="$(tr '\0' ' ' < "/proc/$pid/cmdline" | sed -E 's/[[:space:]]+/ /g' | cut -c1-260)"
    printf '%s\t%s\t%s\t%s\n' "$port" "$pid" "$cwd" "$cmd" | tee -a /tmp/sd-listeners.tsv
  else
    echo "PORT_${port}_LISTENER_NOT_FOUND"
  fi
done

echo '===== DIRECT ROUTE OWNERSHIP ====='
for port in 3400 3940 3955; do
  for path in /api/analytics/events /api/masterclass/lead; do
    code="$(curl -sS -o /dev/null -w '%{http_code}' "http://127.0.0.1:${port}${path}" || true)"
    echo "PORT_${port} ${path} GET=${code}"
  done
done

echo '===== LISTENER ENV KEY PRESENCE ONLY ====='
export LISTENER_FILE=/tmp/sd-listeners.tsv
node <<'NODE'
const fs=require('fs');
const keys=['DATABASE_URL','LEAD_INGEST_WEBHOOK_SECRET','INTERNAL_CRON_SECRET','META_CONVERSIONS_API_URL','META_CONVERSIONS_ACCESS_TOKEN','META_PIXEL_ID','NEXT_PUBLIC_META_PIXEL_ID','GA4_MEASUREMENT_ID','GA4_API_SECRET','NEXT_PUBLIC_GA_ID','GOOGLE_ADS_OFFLINE_CONVERSION_URL','GOOGLE_ADS_ACCESS_TOKEN','GOOGLE_ADS_DEVELOPER_TOKEN','RAZORPAY_WEBHOOK_SECRET'];
for(const line of fs.readFileSync(process.env.LISTENER_FILE,'utf8').trim().split('\n').filter(Boolean)){
  const [port,pid,cwd]=line.split('\t');
  const env={};
  for(const ent of fs.readFileSync(`/proc/${pid}/environ`,'utf8').split('\0')){const i=ent.indexOf('=');if(i>0)env[ent.slice(0,i)]=ent.slice(i+1);}
  const present={};for(const k of keys)present[k]=Boolean(env[k]);
  console.log(`PORT_${port}`,JSON.stringify({pid:Number(pid),cwd,present}));
}
NODE

echo '===== RUNTIME ENV FILE KEY NAMES ONLY ====='
while IFS=$'\t' read -r port pid cwd cmd; do
  echo "--- PORT=$port CWD=$cwd ---"
  if [ -d "$cwd" ]; then
    find "$cwd" -maxdepth 2 -type f \( -name '.env' -o -name '.env.production' -o -name '.env.local' -o -name '.env.production.local' \) -print 2>/dev/null | while read -r ef; do
      echo "ENV_FILE=$ef"
      grep -E '^(DATABASE_URL|LEAD_INGEST_WEBHOOK_SECRET|INTERNAL_CRON_SECRET|META_CONVERSIONS_API_URL|META_CONVERSIONS_ACCESS_TOKEN|META_PIXEL_ID|NEXT_PUBLIC_META_PIXEL_ID|GA4_MEASUREMENT_ID|GA4_API_SECRET|NEXT_PUBLIC_GA_ID|GOOGLE_ADS_OFFLINE_CONVERSION_URL|GOOGLE_ADS_ACCESS_TOKEN|GOOGLE_ADS_DEVELOPER_TOKEN|RAZORPAY_WEBHOOK_SECRET)=' "$ef" 2>/dev/null | sed 's/=.*$/=PRESENT/' || true
    done
  fi
done < /tmp/sd-listeners.tsv

echo '===== TRACKING SOURCE FILES ====='
while IFS=$'\t' read -r port pid cwd cmd; do
  echo "--- PORT=$port CWD=$cwd ---"
  [ -d "$cwd" ] || continue
  for base in app lib src pages .next/server/app; do
    [ -d "$cwd/$base" ] || continue
    grep -RIlE --exclude='*.map' 'utm_campaign_id|utm_adset_id|utm_ad_id|fbclid|anonymousId|sessionId|/api/analytics/events|masterclassLead\.(upsert|create)|AttributionTouch|recordTouch|resolveIdentity' "$cwd/$base" 2>/dev/null | head -50 || true
  done
 done < /tmp/sd-listeners.tsv

echo '===== 3940 AI VIDEO SOURCE CTA/TRACKING SNIPPETS ====='
AI_CWD="$(awk -F '\t' '$1=="3940"{print $3;exit}' /tmp/sd-listeners.tsv)"
if [ -n "$AI_CWD" ] && [ -d "$AI_CWD" ]; then
  grep -RInE --exclude='*.map' --exclude-dir=node_modules 'gen-ai-masterclass/register-one-step|utm_campaign_id|utm_adset_id|utm_ad_id|fbclid|analytics/events|fbq\(|gtag\(' "$AI_CWD/app" "$AI_CWD/lib" "$AI_CWD/src" 2>/dev/null | head -100 || true
fi

echo '===== 3955 LEAD ROUTE TRACKING SNIPPETS ====='
REG_CWD="$(awk -F '\t' '$1=="3955"{print $3;exit}' /tmp/sd-listeners.tsv)"
if [ -n "$REG_CWD" ] && [ -d "$REG_CWD" ]; then
  grep -RInE --exclude='*.map' --exclude-dir=node_modules 'masterclassLead\.(upsert|create)|utm_campaign_id|utm_adset_id|utm_ad_id|fbclid|recordTouch|resolveIdentity|attributeConversion|anonymousId|sessionId' "$REG_CWD/app" "$REG_CWD/lib" "$REG_CWD/src" 2>/dev/null | head -160 || true
fi

echo '===== DASHBOARD DATABASE LINKAGE: COUNTS ONLY ====='
DASH_PID="$(awk -F '\t' '$1=="3400"{print $2;exit}' /tmp/sd-listeners.tsv)"
DASH_CWD="$(awk -F '\t' '$1=="3400"{print $3;exit}' /tmp/sd-listeners.tsv)"
if [ -n "$DASH_PID" ] && [ -d "$DASH_CWD" ]; then
  export DASH_PID DASH_CWD
  node <<'NODE'
const fs=require('fs'),path=require('path');
const pid=process.env.DASH_PID,cwd=process.env.DASH_CWD;
for(const ent of fs.readFileSync(`/proc/${pid}/environ`,'utf8').split('\0')){const i=ent.indexOf('=');if(i>0)process.env[ent.slice(0,i)]=ent.slice(i+1);}
process.chdir(cwd);
let PrismaClient;
try{({PrismaClient}=require(path.join(cwd,'node_modules/@prisma/client')));}catch(e){console.log('PRISMA_CLIENT_LOAD_ERROR',e.message);process.exit(0);}
const prisma=new PrismaClient();
(async()=>{
  const models=['masterclassLead','lead','leadSource','admission','payment','enrollment','identityLink','attributionSession','attributionTouch','conversionAttribution','analyticsEvent','offlineConversionJob','financialOrder'];
  const counts={};for(const m of models){try{counts[m]=await prisma[m].count();}catch(e){counts[m]=`ERR:${e.constructor?.name||'unknown'}`;}}
  console.log('TOTAL_COUNTS',JSON.stringify(counts));
  try{
    const rows=await prisma.$queryRawUnsafe(`SELECT
      (SELECT COUNT(*)::int FROM "IdentityLink" WHERE "entityType"='masterclass_lead') AS "masterclassIdentityLinks",
      (SELECT COUNT(*)::int FROM "IdentityLink" WHERE "entityType"='lead') AS "leadIdentityLinks",
      (SELECT COUNT(DISTINCT ml."entityId")::int FROM "IdentityLink" ml JOIN "IdentityLink" l ON l."identityId"=ml."identityId" AND l."entityType"='lead' WHERE ml."entityType"='masterclass_lead') AS "masterclassLinkedToCanonicalLead",
      (SELECT COUNT(*)::int FROM "MasterclassLead" m JOIN "Lead" l ON l."phone"=m."phone") AS "masterclassPhoneMatchesCanonicalLead",
      (SELECT COUNT(*)::int FROM "Admission" WHERE "leadId" IS NOT NULL) AS "admissionsWithLead",
      (SELECT COUNT(*)::int FROM "Payment" WHERE "leadId" IS NOT NULL) AS "paymentsWithLead",
      (SELECT COUNT(*)::int FROM "Payment" WHERE "admissionId" IS NOT NULL) AS "paymentsWithAdmission",
      (SELECT COUNT(*)::int FROM "Enrollment") AS "enrollments",
      (SELECT COUNT(*)::int FROM "FinancialOrder" WHERE "campaignId" IS NOT NULL) AS "ordersWithCampaignId",
      (SELECT COUNT(*)::int FROM "FinancialOrder" WHERE "attributionTouchId" IS NOT NULL) AS "ordersWithAttributionTouchId"`);
    console.log('LINKAGE',JSON.stringify(rows[0]||{}));
  }catch(e){console.log('LINKAGE_ERROR',e.message.slice(0,500));}
  try{console.log('TOUCH_KINDS',JSON.stringify(await prisma.attributionTouch.groupBy({by:['touchKind'],_count:{_all:true}})));}catch(e){console.log('TOUCH_KINDS_ERROR',e.message.slice(0,300));}
  try{console.log('OFFLINE_JOBS',JSON.stringify(await prisma.offlineConversionJob.groupBy({by:['platform','conversionType','status'],_count:{_all:true}})));}catch(e){console.log('OFFLINE_JOBS_ERROR',e.message.slice(0,300));}
  try{console.log('ANALYTICS_EVENTS',JSON.stringify(await prisma.analyticsEvent.groupBy({by:['eventName'],_count:{_all:true},take:50})));}catch(e){console.log('ANALYTICS_EVENTS_ERROR',e.message.slice(0,300));}
  try{
    const q=await prisma.$queryRawUnsafe(`SELECT table_name,column_name FROM information_schema.columns WHERE table_schema='public' AND table_name IN ('MasterclassLead','Lead','LeadSource','Admission','Payment','Enrollment','FinancialOrder') ORDER BY table_name,ordinal_position`);
    const g={};for(const r of q)(g[r.table_name]??=[]).push(r.column_name);console.log('KEY_TABLE_COLUMNS',JSON.stringify(g));
  }catch(e){console.log('COLUMN_AUDIT_ERROR',e.message.slice(0,300));}
})().catch(e=>console.log('DB_AUDIT_FATAL',e.message.slice(0,500))).finally(()=>prisma.$disconnect());
NODE
else
  echo 'DASHBOARD_LISTENER_NOT_FOUND'
fi

echo '===== LIVE CTA PROPAGATION RECONFIRM ====='
AI_URL='https://sikhadenge.in/masterclass/ai-video?utm_source=meta&utm_medium=paid_social&utm_campaign=AUDIT_CAMPAIGN&utm_campaign_id=AUDIT_CMP_123&utm_adset_id=AUDIT_SET_123&utm_ad_id=AUDIT_AD_123&utm_content=AUDIT_CREATIVE&fbclid=AUDIT_FBCLID'
curl -L --compressed -ksS "$AI_URL" -o /tmp/sd-ai-v2.html
grep -oE 'href="[^"]*gen-ai-masterclass/register-one-step[^"]*"' /tmp/sd-ai-v2.html | head -10 || true

echo '===== V72 IMMUTABILITY RECHECK ====='
sha256sum /var/www/sikhadenge.in/registration-stable-v72-20260903-131023/registration-stable-page1-v72.js
sha256sum /var/www/sikhadenge.in/registration-stable-v72-20260903-131023/registration-stable-hot-v72.js

echo 'RESULT=READONLY_ATTRIBUTION_AUDIT_V2_COMPLETE'
REMOTE
