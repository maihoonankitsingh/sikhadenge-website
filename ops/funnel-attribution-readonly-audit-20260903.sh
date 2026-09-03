#!/usr/bin/env bash
set -Eeuo pipefail
: "${SSH_HOST:?missing SSH_HOST}"
: "${SSH_USER:?missing SSH_USER}"
SSH_PORT="${SSH_PORT:-22}"
KEY="$HOME/.ssh/prod"
ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeuo pipefail
REG=/var/www/sikhadenge.in/releases/sitewide-manrope-font-20260902-231335
DASH=/opt/sikhadenge-dashboard
V72=/var/www/sikhadenge.in/registration-stable-v72-20260903-131023

echo '===== META PIXEL HELPER ====='
sed -n '1,320p' "$REG/lib/metaPixel.ts" 2>/dev/null || true

echo '===== TRACK LEAD HELPER IMPORT CONTEXT ====='
sed -n '1,55p' "$REG/app/gen-ai-masterclass/register-one-step/_components/RegisterOneStepPage.tsx" 2>/dev/null || true

echo '===== PROCESS SECRET KEY PRESENCE ONLY ====='
for port in 3400 3955; do
 pid="$(ss -ltnp 2>/dev/null | awk -v p=":${port}" '$4 ~ p"$" {if(match($0,/pid=[0-9]+/)){print substr($0,RSTART+4,RLENGTH-4);exit}}')"
 export pid port
 node <<'NODE'
const fs=require('fs');const pid=process.env.pid,port=process.env.port;const env={};
for(const x of fs.readFileSync(`/proc/${pid}/environ`,'utf8').split('\0')){const i=x.indexOf('=');if(i>0)env[x.slice(0,i)]=x.slice(i+1)}
const keys=['IDENTITY_HASH_SECRET','LEAD_INGEST_WEBHOOK_SECRET','META_PIXEL_ID','NEXT_PUBLIC_META_PIXEL_ID','META_CAPI_ACCESS_TOKEN','META_CONVERSIONS_ACCESS_TOKEN','META_CONVERSIONS_API_URL','GA4_MEASUREMENT_ID','GA4_API_SECRET','NEXT_PUBLIC_GA_ID','GOOGLE_ADS_OFFLINE_CONVERSION_URL','GOOGLE_ADS_ACCESS_TOKEN','GOOGLE_ADS_DEVELOPER_TOKEN'];
const out={};for(const k of keys)out[k]=Boolean(env[k]);console.log(`PORT_${port}`,JSON.stringify(out));
NODE
done

echo '===== V72 HASHES ====='
sha256sum "$V72/registration-stable-page1-v72.js" "$V72/registration-stable-hot-v72.js"
echo 'RESULT=META_DEDUPE_AUDIT_COMPLETE'
REMOTE
