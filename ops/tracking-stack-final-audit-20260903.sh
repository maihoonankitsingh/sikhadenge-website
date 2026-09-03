#!/usr/bin/env bash
# audit trigger: 2026-09-03T22:47+05:30
set -Eeuo pipefail
: "${SSH_HOST:?missing SSH_HOST}"
: "${SSH_USER:?missing SSH_USER}"
SSH_PORT="${SSH_PORT:-22}"
KEY="$HOME/.ssh/prod"
ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeu
export PM2_HOME=/root/.pm2
printf '%s\n' '===== TRACKING_STACK_FINAL_AUDIT =====' 'READ_ONLY=1'

pid_for_port(){ ss -ltnp 2>/dev/null | awk -v p=":$1" '$4 ~ p"$" {if(match($0,/pid=[0-9]+/)){print substr($0,RSTART+4,RLENGTH-4);exit}}'; }
for port in 3940 3971 3955 3400 3965; do
  pid="$(pid_for_port "$port" || true)"; echo "PORT=$port PID=${pid:-NONE}";
  if [[ -n "$pid" ]]; then
    echo "CWD=$(readlink -f /proc/$pid/cwd 2>/dev/null || true)"
    tr '\0' '\n' < /proc/$pid/environ 2>/dev/null | sed -n -E '/^(NODE_ENV|PORT|NEXT_PUBLIC_[A-Z0-9_]+|GA4_[A-Z0-9_]+|GOOGLE_[A-Z0-9_]+|META_[A-Z0-9_]+|SEGMENT_[A-Z0-9_]+|CLARITY_[A-Z0-9_]+|LEAD_INGEST_[A-Z0-9_]+)=/s/=.*/=PRESENT/p' | sort -u || true
  fi
  echo '---'
done

printf '%s\n' '===== ENV KEY PRESENCE BY ACTIVE CWD ====='
for port in 3940 3971 3955 3400 3965; do
  pid="$(pid_for_port "$port" || true)"; [[ -n "$pid" ]] || continue
  cwd="$(readlink -f /proc/$pid/cwd 2>/dev/null || true)"; [[ -d "$cwd" ]] || continue
  echo "PORT=$port CWD=$cwd"
  for k in NEXT_PUBLIC_GA_MEASUREMENT_ID NEXT_PUBLIC_GA4_MEASUREMENT_ID GA4_MEASUREMENT_ID GA4_API_SECRET NEXT_PUBLIC_GOOGLE_ADS_ID GOOGLE_ADS_ID GOOGLE_ADS_CONVERSION_LABEL GOOGLE_ADS_OFFLINE_CONVERSION_URL GOOGLE_ADS_ACCESS_TOKEN NEXT_PUBLIC_META_PIXEL_ID META_PIXEL_ID META_CAPI_ACCESS_TOKEN META_CONVERSIONS_API_URL META_CONVERSIONS_ACCESS_TOKEN NEXT_PUBLIC_CLARITY_ID CLARITY_PROJECT_ID NEXT_PUBLIC_SEGMENT_WRITE_KEY SEGMENT_WRITE_KEY LEAD_INGEST_WEBHOOK_SECRET; do
    present=0
    for e in "$cwd/.env" "$cwd/.env.local" "$cwd/.env.production" "$cwd/.env.production.local"; do
      [[ -f "$e" ]] && grep -Eq "^${k}=.+" "$e" && present=1 || true
    done
    echo "$k=$present"
  done
 done

printf '%s\n' '===== PUBLIC/NONSECRET TRACKING IDS IN ACTIVE SOURCE ====='
for port in 3940 3971 3955 3400; do
  pid="$(pid_for_port "$port" || true)"; [[ -n "$pid" ]] || continue
  cwd="$(readlink -f /proc/$pid/cwd 2>/dev/null || true)"; [[ -d "$cwd" ]] || continue
  echo "PORT=$port"
  grep -RhoE --binary-files=without-match --exclude-dir=node_modules --exclude-dir=.git --exclude='*.map' '(GTM-[A-Z0-9]+|G-[A-Z0-9]{6,}|AW-[0-9]+|clarity\.ms/tag/[A-Za-z0-9_-]+|connect\.facebook\.net|facebook\.com/tr\?id=[0-9]+|fbq\([^\n]{0,120}|analytics\.load\([^\n]{0,120}|cdn\.segment\.com)' "$cwd" 2>/dev/null | head -80 || true
 done

printf '%s\n' '===== TRACKER CODE MARKERS ACTIVE SOURCE ====='
for port in 3940 3971 3955; do
  pid="$(pid_for_port "$port" || true)"; [[ -n "$pid" ]] || continue
  cwd="$(readlink -f /proc/$pid/cwd 2>/dev/null || true)"; [[ -d "$cwd" ]] || continue
  echo "PORT=$port CWD=$cwd"
  grep -RIl --binary-files=without-match --exclude-dir=node_modules --exclude-dir=.git --exclude='*.map' -E 'clarity\.ms|Microsoft Clarity|analytics\.load|segment\.com|googletagmanager|gtag\(|fbq\(|META_PIXEL|GA4_|GOOGLE_ADS|utm_campaign_id|gclid|fbclid|analytics/events|masterclass/lead' "$cwd" 2>/dev/null | head -80 || true
 done

printf '%s\n' '===== NGINX LIVE TRACKING/ROUTES ====='
nginx -T 2>/dev/null | grep -nE 'masterclass/ai-video|masterclass/claude/free|register-one-step|analytics/events|webhooks/leads|masterclass/lead|create-order|verify-payment|sub_filter|tracking' | head -260 || true

printf '%s\n' '===== LIVE HTML TRACKER MARKERS ====='
for url in \
 'https://sikhadenge.in/masterclass/ai-video?utm_source=audit&utm_medium=cpc&utm_campaign=qa&utm_campaign_id=cmp123&utm_adset_id=set123&utm_ad_id=ad123&fbclid=fb123&gclid=g123' \
 'https://sikhadenge.in/masterclass/claude/free?utm_source=audit&utm_medium=cpc&utm_campaign=qa&utm_campaign_id=cmp123&utm_adset_id=set123&utm_ad_id=ad123&fbclid=fb123&gclid=g123' \
 'https://sikhadenge.in/gen-ai-masterclass/register-one-step?utm_source=audit&utm_medium=cpc&utm_campaign=qa&utm_campaign_id=cmp123&utm_adset_id=set123&utm_ad_id=ad123&fbclid=fb123&gclid=g123'; do
  f="$(mktemp)"; code="$(curl -LksS --max-time 20 -o "$f" -w '%{http_code}' "$url" || true)"; echo "URL=$url HTTP=$code BYTES=$(wc -c < "$f" 2>/dev/null || echo 0)"
  grep -Eo 'GTM-[A-Z0-9]+|G-[A-Z0-9]{6,}|AW-[0-9]+|clarity\.ms[^"< ]*|segment\.com[^"< ]*|connect\.facebook\.net[^"< ]*|facebook\.com/tr\?id=[0-9]+|registration-stable-[^"< ]+|analytics/events|masterclass/lead|register-one-step[^"< ]*' "$f" | head -100 || true
  rm -f "$f"
done

printf '%s\n' '===== DATABASE TRACKING COVERAGE ====='
pid="$(pid_for_port 3955 || true)"; cwd="$(readlink -f /proc/$pid/cwd 2>/dev/null || true)"
if [[ -n "$cwd" && -f "$cwd/package.json" ]]; then
  cd "$cwd"
  node <<'NODE' 2>/dev/null || true
const {PrismaClient}=require('@prisma/client'); const p=new PrismaClient();
(async()=>{const total=await p.masterclassLead.count(); const fields=['utm_source','utm_medium','utm_campaign','utm_campaign_id','utm_adset_id','utm_ad_id','fbclid','gclid','landing_url','referrer']; const out={total}; for(const f of fields){try{out[f]=await p.masterclassLead.count({where:{[f]:{not:null}}})}catch{out[f]='NA'}} console.log(JSON.stringify(out)); await p.$disconnect()})().catch(async e=>{console.log('DB_AUDIT_ERR='+e.message); await p.$disconnect()});
NODE
fi
printf '%s\n' 'RESULT=TRACKING_STACK_FINAL_AUDIT_COMPLETE'
REMOTE
