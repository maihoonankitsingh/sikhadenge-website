#!/usr/bin/env bash
set -Eeuo pipefail
: "${SSH_HOST:?missing SSH_HOST}"
: "${SSH_USER:?missing SSH_USER}"
SSH_PORT="${SSH_PORT:-22}"
KEY="$HOME/.ssh/prod"
ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=15 "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeu
export PM2_HOME=/root/.pm2
V72=/var/www/sikhadenge.in/registration-stable-v72-20260903-131023

echo '===== TRACKING_COMPLETION_AUDIT_V1 ====='
date -Is

pid_for(){ ss -ltnp 2>/dev/null | awk -v p=":$1" '$4 ~ p"$" {if(match($0,/pid=[0-9]+/)){print substr($0,RSTART+4,RLENGTH-4);exit}}'; }
for port in 3400 3940 3955 3965 3971; do
  pid="$(pid_for "$port")"
  if [[ -n "$pid" ]]; then echo "PORT=$port PID=$pid CWD=$(readlink -f /proc/$pid/cwd 2>/dev/null || true)"; else echo "PORT=$port PID=NONE"; fi
done

echo '===== V72_HASHES ====='
sha256sum "$V72/registration-stable-page1-v72.js" "$V72/registration-stable-hot-v72.js" 2>/dev/null || true

echo '===== ACTIVE_HTML_VENDOR_MARKERS ====='
for item in \
  'AI|https://sikhadenge.in/masterclass/ai-video?utm_source=meta&utm_medium=paid_social&utm_campaign=audit&utm_campaign_id=111&utm_adset_id=222&utm_ad_id=333&fbclid=TESTFB&gclid=TESTGC' \
  'CLAUDE|https://sikhadenge.in/masterclass/claude/free?utm_source=meta&utm_medium=paid_social&utm_campaign=audit&utm_campaign_id=111&utm_adset_id=222&utm_ad_id=333&fbclid=TESTFB&gclid=TESTGC' \
  'REG|https://sikhadenge.in/gen-ai-masterclass/register-one-step?utm_source=meta&utm_medium=paid_social&utm_campaign=audit&utm_campaign_id=111&utm_adset_id=222&utm_ad_id=333&fbclid=TESTFB&gclid=TESTGC'; do
  name="${item%%|*}"; url="${item#*|}"; f="$(mktemp)"; curl -LksS --max-time 25 "$url" -o "$f" || true
  echo "PAGE=$name HTTP_BYTES=$(wc -c < "$f" 2>/dev/null || echo 0)"
  python3 - "$f" <<'PY'
import re,sys
s=open(sys.argv[1],errors='ignore').read()
checks={
 'GTM':r'GTM-[A-Z0-9]+', 'GA4':r'G-[A-Z0-9]{6,}', 'GOOGLE_ADS':r'AW-[0-9]+',
 'CLARITY':r'clarity\.ms/(?:tag|s)/[A-Za-z0-9_-]+|clarity\(',
 'SEGMENT':r'cdn\.segment\.com|analytics\.load\(|analytics\.track\(',
 'META':r'connect\.facebook\.net|fbq\(', 'INTERNAL':r'analytics/events|generate_lead'
}
for k,p in checks.items(): print(f'{k}_MARKER={1 if re.search(p,s,re.I) else 0}')
for label,p in [('GA4_IDS',r'G-[A-Z0-9]{6,}'),('ADS_IDS',r'AW-[0-9]+')]:
 vals=sorted(set(re.findall(p,s,re.I)))
 print(label+'='+(','.join(vals[:8]) if vals else 'NONE'))
for p in re.findall(r'/gen-ai-masterclass/register-one-step[^"\'<> ]*',s):
 print('CTA='+p.replace('&amp;','&')[:600])
PY
  rm -f "$f"
done

echo '===== RUNTIME_ENV_KEY_PRESENCE ====='
python3 <<'PY'
import os,re,subprocess
ports=[3400,3940,3955,3965,3971]
keys=['GA4_MEASUREMENT_ID','NEXT_PUBLIC_GA4_MEASUREMENT_ID','NEXT_PUBLIC_GA_MEASUREMENT_ID','GA_MEASUREMENT_ID','GA4_API_SECRET','GOOGLE_ADS_CONVERSION_ID','NEXT_PUBLIC_GOOGLE_ADS_ID','GOOGLE_ADS_CONVERSION_LABEL','GOOGLE_ADS_OFFLINE_CONVERSION_URL','GOOGLE_ADS_ACCESS_TOKEN','GOOGLE_ADS_DEVELOPER_TOKEN','META_PIXEL_ID','NEXT_PUBLIC_META_PIXEL_ID','META_CAPI_ACCESS_TOKEN','META_CONVERSIONS_API_URL','META_CONVERSIONS_ACCESS_TOKEN','META_ACCESS_TOKEN','META_AD_ACCOUNT_ID','CLARITY_PROJECT_ID','NEXT_PUBLIC_CLARITY_PROJECT_ID','NEXT_PUBLIC_MICROSOFT_CLARITY_ID','SEGMENT_WRITE_KEY','NEXT_PUBLIC_SEGMENT_WRITE_KEY','LEAD_INGEST_WEBHOOK_SECRET','IDENTITY_HASH_SECRET','INTERNAL_CRON_SECRET']
ss=subprocess.check_output(['ss','-ltnp'],text=True,stderr=subprocess.DEVNULL)
def pid_for(port):
 for line in ss.splitlines():
  if re.search(rf':{port}\s',line):
   m=re.search(r'pid=(\d+)',line)
   if m:return int(m.group(1))
def env(pid):
 out={}
 if not pid:return out
 for x in open(f'/proc/{pid}/environ','rb').read().split(b'\0'):
  if b'=' in x:
   k,v=x.split(b'=',1);out[k.decode(errors='ignore')]=v.decode(errors='ignore')
 return out
for port in ports:
 e=env(pid_for(port));print('PORT',port)
 for k in keys:
  if e.get(k):print(k+'=1')
PY

echo '===== ENV_FILE_KEY_SOURCES ====='
python3 <<'PY'
from pathlib import Path
import re
roots=[Path('/var/www/sikhadenge.in'),Path('/opt/sikhadenge-dashboard'),Path('/root/.pm2')]
keys=['GA4_MEASUREMENT_ID','NEXT_PUBLIC_GA4_MEASUREMENT_ID','NEXT_PUBLIC_GA_MEASUREMENT_ID','GA_MEASUREMENT_ID','GA4_API_SECRET','GOOGLE_ADS_CONVERSION_ID','NEXT_PUBLIC_GOOGLE_ADS_ID','GOOGLE_ADS_CONVERSION_LABEL','GOOGLE_ADS_OFFLINE_CONVERSION_URL','GOOGLE_ADS_ACCESS_TOKEN','GOOGLE_ADS_DEVELOPER_TOKEN','META_PIXEL_ID','NEXT_PUBLIC_META_PIXEL_ID','META_CAPI_ACCESS_TOKEN','META_CONVERSIONS_API_URL','META_CONVERSIONS_ACCESS_TOKEN','META_ACCESS_TOKEN','META_AD_ACCOUNT_ID','CLARITY_PROJECT_ID','NEXT_PUBLIC_CLARITY_PROJECT_ID','NEXT_PUBLIC_MICROSOFT_CLARITY_ID','SEGMENT_WRITE_KEY','NEXT_PUBLIC_SEGMENT_WRITE_KEY','LEAD_INGEST_WEBHOOK_SECRET','IDENTITY_HASH_SECRET','INTERNAL_CRON_SECRET']
for root in roots:
 if not root.exists(): continue
 cand=[]
 if root.name=='.pm2': cand=[root/'dump.pm2']
 else:
  for p in root.rglob('.env*'):
   try:
    if p.is_file() and p.stat().st_size<2_000_000:cand.append(p)
   except:pass
 for p in cand:
  try:s=p.read_text(errors='ignore')
  except:continue
  got=[k for k in keys if re.search(rf'(?m)(?:^|["\s,]){re.escape(k)}(?:["\s]*[:=])',s)]
  if got:
   print('SOURCE='+str(p));print('KEYS='+','.join(got))
PY

echo '===== TRACKER_ID_SOURCE_SCAN_NONSECRET ====='
python3 <<'PY'
from pathlib import Path
import re
roots=[Path('/var/www/sikhadenge.in'),Path('/opt/sikhadenge-dashboard'),Path('/etc/nginx')]
patterns={'GA4':r'G-[A-Z0-9]{6,}','ADS':r'AW-[0-9]+','CLARITY':r'clarity\.ms/tag/([A-Za-z0-9_-]+)','SEGMENT':r'cdn\.segment\.com/analytics\.js/v1/([A-Za-z0-9_-]+)'}
seen=set()
for root in roots:
 if not root.exists():continue
 for p in root.rglob('*'):
  try:
   if not p.is_file() or p.stat().st_size>1_500_000:continue
   if any(x in p.parts for x in ('node_modules','.git','.next')):continue
   s=p.read_text(errors='ignore')
  except:continue
  hits=[]
  for k,pat in patterns.items():
   vals=sorted(set(re.findall(pat,s,re.I)))
   if vals:hits.append(k)
  if hits:
   key=(str(p),tuple(hits))
   if key not in seen:
    seen.add(key);print('FILE='+str(p)+' MARKERS='+','.join(hits))
PY

echo '===== V72_TRACKING_HOOKS ====='
grep -nE -C 2 'fetch\(|/api/masterclass/lead|fbq\(|trackMetaEvent|gtag\(|generate_lead|utm_campaign_id|utm_adset_id|utm_ad_id|fbclid|gclid|msclkid|landingUrl|referrer' "$V72/registration-stable-page1-v72.js" "$V72/registration-stable-hot-v72.js" 2>/dev/null | head -360 || true

echo '===== ACTIVE_BACKEND_ROUTE ====='
P3955="$(pid_for 3955)"; C3955="$(readlink -f /proc/$P3955/cwd 2>/dev/null || true)"; LF="$C3955/app/api/masterclass/lead/route.ts"
echo "C3955=$C3955"
if [[ -f "$LF" ]]; then grep -nE -C 3 'sendMetaLeadEvent|event_id|eventID|fbp|fbc|gclid|utm_campaign_id|utm_adset_id|utm_ad_id|LEAD_INGEST|webhooks/leads|NeoDove|analytics' "$LF" | head -360 || true; fi

echo '===== ACTIVE_PAYMENT_TRACKING ====='
P3965="$(pid_for 3965)"; C3965="$(readlink -f /proc/$P3965/cwd 2>/dev/null || true)"; echo "C3965=$C3965"
if [[ -n "$C3965" ]]; then grep -RIn --binary-files=without-match --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git -E 'Purchase|purchase|fbq|Meta|CAPI|gtag|Google Ads|conversion|gclid|fbclid|utm_|verify-payment|Razorpay' "$C3965" 2>/dev/null | head -320 || true; fi

echo '===== DASHBOARD_STATE ====='
D=/opt/sikhadenge-dashboard
if [[ -d "$D/.git" ]]; then cd "$D"; echo "HEAD=$(git rev-parse HEAD)"; git status --short | head -80; fi
for f in app/api/webhooks/leads/route.ts app/dashboard/analytics/funnel/page.tsx; do [[ -f "$D/$f" ]] && echo "FILE=$f SHA=$(sha256sum "$D/$f" | awk '{print $1}')"; done

echo '===== V72_HASHES_RECHECK ====='
sha256sum "$V72/registration-stable-page1-v72.js" "$V72/registration-stable-hot-v72.js" 2>/dev/null || true
echo 'RESULT=TRACKING_COMPLETION_AUDIT_V1_COMPLETE'
REMOTE
