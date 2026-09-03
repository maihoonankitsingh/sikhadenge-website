#!/usr/bin/env bash
set -Eeuo pipefail
: "${SSH_HOST:?missing SSH_HOST}"
: "${SSH_USER:?missing SSH_USER}"
SSH_PORT="${SSH_PORT:-22}"
KEY="$HOME/.ssh/prod"
ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=15 "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeuo pipefail
export TZ=Asia/Kolkata
AI=/var/www/sikhadenge.in/releases/production-ai-workflow-premium-zero-build-20260829-110420
REG=/var/www/sikhadenge.in/releases/sitewide-manrope-font-20260902-231335
DASH=/opt/sikhadenge-dashboard
V72=/var/www/sikhadenge.in/registration-stable-v72-20260903-131023

echo '===== FOCUSED FUNNEL ATTRIBUTION AUDIT ====='
date -Is

echo '===== V72 LOCK ====='
sha256sum "$V72/registration-stable-page1-v72.js" "$V72/registration-stable-hot-v72.js"

echo '===== ACTIVE AI VIDEO CTA SOURCE ====='
mapfile -t CTA_FILES < <(grep -RIl --exclude-dir=node_modules --exclude-dir=.next --exclude='*.bak*' --exclude='*bk*' --exclude='*.map' 'source=ai-video-masterclass' "$AI/app" "$AI/src" 2>/dev/null | head -10)
printf '%s\n' "${CTA_FILES[@]}"
for f in "${CTA_FILES[@]}"; do
  echo "--- FILE=$f ---"
  grep -n -C 12 'source=ai-video-masterclass' "$f" | head -160 || true
done

echo '===== AI VIDEO ANALYTICS COMPONENT ====='
sed -n '1,340p' "$AI/app/ClarityEvents.tsx" 2>/dev/null | sed -n '1,340p'

echo '===== BROWSER ATTRIBUTION ====='
for f in "$AI/lib/sikhadenge-analytics/browser-attribution.ts" "$AI/lib/sikhadenge-analytics/browser-identity.ts" "$AI/lib/sikhadenge-analytics/browser-transport.ts"; do
  echo "--- $f ---"
  sed -n '1,320p' "$f" 2>/dev/null || true
done

echo '===== ACTIVE REGISTRATION COMPONENT TRACKING ====='
RF="$REG/app/gen-ai-masterclass/register-one-step/_components/RegisterOneStepPage.tsx"
grep -n -E 'utm_|fbclid|gclid|msclkid|fetch\(|api/masterclass/lead|tracking|source|session|anonymous' "$RF" | head -240 || true
sed -n '45,230p' "$RF" 2>/dev/null || true

echo '===== V72 SUBMIT/TRACKING PATH ====='
VF="$V72/registration-stable-page1-v72.js"
grep -n -E 'api/masterclass/lead|utm_|fbclid|gclid|msclkid|fetch\(|FormData|source=ai-video|URLSearchParams|session|anonymous' "$VF" | head -260 || true

echo '===== ACTIVE 3955 MASTERCLASS LEAD ROUTE ====='
LF="$REG/app/api/masterclass/lead/route.ts"
sed -n '1,520p' "$LF" 2>/dev/null || true

echo '===== DASHBOARD SIGNED LEAD WEBHOOK ====='
sed -n '1,420p' "$DASH/app/api/webhooks/leads/route.ts" 2>/dev/null || true

echo '===== DASHBOARD CRM LEAD CREATE ====='
sed -n '1,360p' "$DASH/app/api/crm/leads/route.ts" 2>/dev/null || true

echo '===== DASHBOARD OFFLINE CONVERSION DELIVERY ====='
sed -n '1,320p' "$DASH/app/api/internal/offline-conversions/deliver/route.ts" 2>/dev/null || true

echo '===== ACTIVE RAZORPAY WEBHOOK LOCATIONS ====='
for base in "$REG" "$DASH"; do
  find "$base/app/api" -type f -path '*razorpay*' -name 'route.ts' -print 2>/dev/null | head -20
done
for f in "$REG/app/api/finance/webhooks/razorpay/route.ts" "$REG/app/api/webhooks/razorpay/route.ts" "$DASH/app/api/finance/webhooks/razorpay/route.ts"; do
  [ -f "$f" ] || continue
  echo "--- $f ---"
  sed -n '1,420p' "$f"
done

echo '===== LMS API/COURSE ROUTES ====='
find "$DASH/app/api/lms" -maxdepth 4 -type f -name 'route.ts' -print 2>/dev/null | sort

echo '===== DASHBOARD ADS/ANALYTICS UI FILES ====='
find "$DASH/app/dashboard" -type f \( -name 'page.tsx' -o -name '*.tsx' \) 2>/dev/null | grep -Ei 'analytics|marketing|ads|attribution|crm|lead|revenue|funnel|lms|learning' | head -120 || true

echo '===== DB ATTRIBUTION POPULATION / LINKAGE AGGREGATES ====='
PID="$(ss -ltnp 2>/dev/null | awk '$4 ~ /:3400$/ {if(match($0,/pid=[0-9]+/)){print substr($0,RSTART+4,RLENGTH-4);exit}}')"
export PID DASH
node <<'NODE'
const fs=require('fs'),path=require('path');
const pid=process.env.PID,cwd=process.env.DASH;
for(const ent of fs.readFileSync(`/proc/${pid}/environ`,'utf8').split('\0')){const i=ent.indexOf('=');if(i>0)process.env[ent.slice(0,i)]=ent.slice(i+1);}
process.chdir(cwd);
const {PrismaClient}=require(path.join(cwd,'node_modules/@prisma/client'));
const p=new PrismaClient();
(async()=>{
  const scalar=async(sql)=>{const r=await p.$queryRawUnsafe(sql);return r[0]||{};};
  console.log('MASTERCLASS_TRACKING',JSON.stringify(await scalar(`SELECT
    COUNT(*)::int total,
    COUNT(*) FILTER (WHERE COALESCE("utm_source",'')<>'')::int utm_source,
    COUNT(*) FILTER (WHERE COALESCE("utm_campaign",'')<>'')::int utm_campaign,
    COUNT(*) FILTER (WHERE COALESCE("utm_campaign_id",'')<>'')::int campaign_id,
    COUNT(*) FILTER (WHERE COALESCE("utm_adset_id",'')<>'')::int adset_id,
    COUNT(*) FILTER (WHERE COALESCE("utm_ad_id",'')<>'')::int ad_id,
    COUNT(*) FILTER (WHERE COALESCE("utm_content",'')<>'')::int content,
    COUNT(*) FILTER (WHERE COALESCE("fbclid",'')<>'')::int fbclid,
    COUNT(*) FILTER (WHERE COALESCE("gclid",'')<>'')::int gclid,
    COUNT(*) FILTER (WHERE COALESCE("msclkid",'')<>'')::int msclkid,
    COUNT(*) FILTER (WHERE COALESCE("landing_url",'')<>'')::int landing_url
    FROM "MasterclassLead"`)));
  console.log('MASTERCLASS_SOURCE_TOP',JSON.stringify(await p.$queryRawUnsafe(`SELECT COALESCE(NULLIF("source",''),'(blank)') source, COUNT(*)::int count FROM "MasterclassLead" GROUP BY 1 ORDER BY count DESC LIMIT 20`)));
  console.log('MASTERCLASS_PAGE_TOP',JSON.stringify(await p.$queryRawUnsafe(`SELECT COALESCE(NULLIF("page",''),'(blank)') page, COUNT(*)::int count FROM "MasterclassLead" GROUP BY 1 ORDER BY count DESC LIMIT 20`)));
  console.log('ADMISSION_MATCH',JSON.stringify(await scalar(`SELECT
    (SELECT COUNT(*)::int FROM "Admission") admissions,
    (SELECT COUNT(*)::int FROM "Admission" a JOIN "MasterclassLead" m ON regexp_replace(COALESCE(a.phone,''),'\\D','','g') = regexp_replace(COALESCE(m.phone,''),'\\D','','g') AND regexp_replace(COALESCE(a.phone,''),'\\D','','g')<>'') matched_masterclass,
    (SELECT COUNT(*)::int FROM "Admission" a JOIN "Lead" l ON regexp_replace(COALESCE(a.phone,''),'\\D','','g') = regexp_replace(COALESCE(l.phone,''),'\\D','','g') AND regexp_replace(COALESCE(a.phone,''),'\\D','','g')<>'') matched_lead,
    (SELECT COUNT(*)::int FROM "Admission" WHERE "leadId" IS NULL) admission_lead_null,
    (SELECT COUNT(*)::int FROM "Payment" WHERE "leadId" IS NULL) payment_lead_null
  `)));
  console.log('DUPLICATE_CANONICAL_PHONE',JSON.stringify(await scalar(`SELECT COUNT(*)::int duplicate_groups FROM (SELECT regexp_replace(COALESCE(phone,''),'\\D','','g') p,COUNT(*) FROM "Lead" WHERE COALESCE(phone,'')<>'' GROUP BY 1 HAVING COUNT(*)>1) x`)));
  console.log('COURSES',JSON.stringify(await p.$queryRawUnsafe(`SELECT id,code,title FROM "LearningCourse" ORDER BY "createdAt" DESC LIMIT 50`)));
  console.log('ADMISSION_COURSES',JSON.stringify(await p.$queryRawUnsafe(`SELECT COALESCE(NULLIF(course,''),'(blank)') course, COUNT(*)::int count FROM "Admission" GROUP BY 1 ORDER BY count DESC LIMIT 40`)));
  console.log('PAYMENT_STATUS',JSON.stringify(await p.$queryRawUnsafe(`SELECT COALESCE(NULLIF(status,''),'(blank)') status, COUNT(*)::int count FROM "Payment" GROUP BY 1 ORDER BY count DESC`)));
  console.log('ANALYTICS_EVENT_TOP',JSON.stringify(await p.$queryRawUnsafe(`SELECT "eventName",COUNT(*)::int count FROM "AnalyticsEvent" GROUP BY "eventName" ORDER BY count DESC LIMIT 40`)));
  console.log('CONSENT_COUNTS',JSON.stringify(await scalar(`SELECT COUNT(*)::int total, COUNT(*) FILTER (WHERE "analyticsConsent"=true)::int analytics_yes, COUNT(*) FILTER (WHERE "advertisingConsent"=true)::int advertising_yes FROM "ConsentRecord"`)));
})().catch(e=>{console.error('DB_AUDIT_ERROR',e.message.slice(0,800));process.exitCode=1}).finally(()=>p.$disconnect());
NODE

echo '===== ENV KEYS RELEVANT TO DELIVERY (NAMES ONLY) ====='
for f in "$DASH/.env" "$DASH/.env.local" "$DASH/.env.production" "$DASH/.env.production.local" "$REG/.env.local" "$AI/.env.local"; do
  [ -f "$f" ] || continue
  echo "--- $f ---"
  grep -E '^(META_|GOOGLE_ADS_|GA4_|NEXT_PUBLIC_META_|NEXT_PUBLIC_GA_|IDENTITY_HASH_SECRET|LEAD_INGEST_WEBHOOK_SECRET|INTERNAL_CRON_SECRET|RAZORPAY_WEBHOOK_SECRET)=' "$f" 2>/dev/null | sed 's/=.*$/=PRESENT/' || true
done

echo '===== V72 LOCK RECHECK ====='
sha256sum "$V72/registration-stable-page1-v72.js" "$V72/registration-stable-hot-v72.js"
echo 'RESULT=FOCUSED_FUNNEL_ATTRIBUTION_AUDIT_COMPLETE'
REMOTE
