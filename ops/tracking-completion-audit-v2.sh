#!/usr/bin/env bash
set -Eeuo pipefail
: "${SSH_HOST:?missing SSH_HOST}"; : "${SSH_USER:?missing SSH_USER}"; SSH_PORT="${SSH_PORT:-22}"; KEY="$HOME/.ssh/prod"
ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeu
export PM2_HOME=/root/.pm2
pid_for(){ ss -ltnp 2>/dev/null | awk -v p=":$1" '$4 ~ p"$" {if(match($0,/pid=[0-9]+/)){print substr($0,RSTART+4,RLENGTH-4);exit}}'; }
V72=/var/www/sikhadenge.in/registration-stable-v72-20260903-131023
echo '===== FAST_TRACKING_AUDIT_V2 ====='; date -Is
python3 <<'PY'
import re,subprocess,os
ports=[3400,3940,3955,3965,3971]
keys=['GA4_MEASUREMENT_ID','NEXT_PUBLIC_GA4_MEASUREMENT_ID','NEXT_PUBLIC_GA_MEASUREMENT_ID','GA_MEASUREMENT_ID','GA4_API_SECRET','GOOGLE_ADS_CONVERSION_ID','NEXT_PUBLIC_GOOGLE_ADS_ID','GOOGLE_ADS_CONVERSION_LABEL','GOOGLE_ADS_OFFLINE_CONVERSION_URL','GOOGLE_ADS_ACCESS_TOKEN','GOOGLE_ADS_DEVELOPER_TOKEN','GOOGLE_ADS_CONVERSION_ACTION','GOOGLE_ADS_CONVERSION_ACTIONS_JSON','META_PIXEL_ID','NEXT_PUBLIC_META_PIXEL_ID','META_CAPI_ACCESS_TOKEN','META_CONVERSIONS_API_URL','META_CONVERSIONS_ACCESS_TOKEN','META_ACCESS_TOKEN','META_AD_ACCOUNT_ID','CLARITY_PROJECT_ID','NEXT_PUBLIC_CLARITY_PROJECT_ID','NEXT_PUBLIC_MICROSOFT_CLARITY_ID','SEGMENT_WRITE_KEY','NEXT_PUBLIC_SEGMENT_WRITE_KEY','LEAD_INGEST_WEBHOOK_SECRET','IDENTITY_HASH_SECRET','INTERNAL_CRON_SECRET']
ss=subprocess.check_output(['ss','-ltnp'],text=True,stderr=subprocess.DEVNULL)
def pid(port):
 for line in ss.splitlines():
  if re.search(rf':{port}\s',line):
   m=re.search(r'pid=(\d+)',line)
   if m:return int(m.group(1))
def env(p):
 out={}
 if not p:return out
 for x in open(f'/proc/{p}/environ','rb').read().split(b'\0'):
  if b'=' in x:
   k,v=x.split(b'=',1);out[k.decode(errors='ignore')]=v.decode(errors='ignore')
 return out
for port in ports:
 p=pid(port); cwd=os.path.realpath(f'/proc/{p}/cwd') if p else ''
 e=env(p); print(f'PORT={port} PID={p or "NONE"} CWD={cwd}')
 for k in keys:
  if e.get(k):print('  '+k+'=1')
PY

echo '===== CURRENT_ENV_FILES ====='
for port in 3400 3940 3955 3965 3971; do p="$(pid_for "$port")"; [[ -n "$p" ]] || continue; cwd="$(readlink -f /proc/$p/cwd)"; for f in "$cwd"/.env "$cwd"/.env.local "$cwd"/.env.production "$cwd"/.env.production.local; do [[ -f "$f" ]] || continue; echo "ENVFILE=$f"; grep -E '^(GA4_|NEXT_PUBLIC_GA|GOOGLE_ADS_|NEXT_PUBLIC_GOOGLE_ADS|META_|NEXT_PUBLIC_META|CLARITY_|NEXT_PUBLIC_CLARITY|NEXT_PUBLIC_MICROSOFT_CLARITY|SEGMENT_|NEXT_PUBLIC_SEGMENT|LEAD_INGEST_|IDENTITY_HASH_|INTERNAL_CRON_)' "$f" | sed -E 's/=.*/=PRESENT/' || true; done; done

echo '===== LIVE_MARKERS ====='
for spec in 'AI https://sikhadenge.in/masterclass/ai-video' 'CLAUDE https://sikhadenge.in/masterclass/claude/free' 'REG https://sikhadenge.in/gen-ai-masterclass/register-one-step'; do set -- $spec; n=$1; u=$2; f=$(mktemp); curl -LksS --max-time 20 "$u?utm_source=meta&utm_campaign_id=111&utm_adset_id=222&utm_ad_id=333&fbclid=TEST&gclid=TESTG" -o "$f" || true; echo "PAGE=$n"; python3 - "$f" <<'PY'
import re,sys
s=open(sys.argv[1],errors='ignore').read()
for k,p in {'META':r'connect\.facebook\.net|fbq\(','GA4':r'G-[A-Z0-9]{6,}','ADS':r'AW-[0-9]+','CLARITY':r'clarity\.ms|clarity\(','SEGMENT':r'cdn\.segment\.com|analytics\.load\(','INTERNAL':r'analytics/events|generate_lead'}.items():print(k+'='+str(int(bool(re.search(p,s,re.I)))))
for m in sorted(set(re.findall(r'/gen-ai-masterclass/register-one-step[^"\'<> ]*',s))):print('CTA='+m.replace('&amp;','&')[:500])
PY
rm -f "$f"; done

echo '===== ACTIVE_SOURCE_MARKERS ====='
for port in 3940 3971 3955 3965; do p="$(pid_for "$port")"; [[ -n "$p" ]] || continue; cwd="$(readlink -f /proc/$p/cwd)"; echo "PORT=$port CWD=$cwd"; grep -RIn --binary-files=without-match --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git -E 'register-one-step|fbq\(|trackMetaEvent|sendMetaLeadEvent|event_id|eventID|gtag\(|clarity|segment|utm_campaign_id|utm_adset_id|utm_ad_id|fbclid|gclid|verify-payment|Purchase|LEAD_INGEST' "$cwd/app" "$cwd/src" "$cwd/lib" "$cwd/server.js" 2>/dev/null | head -260 || true; done

echo '===== V72_MARKERS ====='; grep -nE -C 2 '/api/masterclass/lead|fetch\(|fbq\(|gtag\(|utm_campaign_id|fbclid|gclid' "$V72/registration-stable-page1-v72.js" "$V72/registration-stable-hot-v72.js" 2>/dev/null | head -260 || true

echo '===== NGINX_LOCATION_HEADERS ====='; nginx -T 2>/dev/null | grep -nE -A18 -B2 'location = /masterclass/ai-video|location = /masterclass/claude/free|location = /gen-ai-masterclass/register-one-step' | head -260 || true

echo '===== HASH_LOCK ====='; sha256sum "$V72/registration-stable-page1-v72.js" "$V72/registration-stable-hot-v72.js"
echo 'RESULT=FAST_TRACKING_AUDIT_V2_COMPLETE'
REMOTE
