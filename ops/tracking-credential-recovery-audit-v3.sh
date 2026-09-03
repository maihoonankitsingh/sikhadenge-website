#!/usr/bin/env bash
set -Eeuo pipefail
: "${SSH_HOST:?missing SSH_HOST}"; : "${SSH_USER:?missing SSH_USER}"
SSH_PORT="${SSH_PORT:-22}"; KEY="$HOME/.ssh/prod"
ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeu
export PM2_HOME=/root/.pm2
pid_for(){ ss -ltnp 2>/dev/null | awk -v p=":$1" '$4 ~ p"$" {if(match($0,/pid=[0-9]+/)){print substr($0,RSTART+4,RLENGTH-4);exit}}'; }

echo '===== TRACKING_CREDENTIAL_RECOVERY_V3 ====='
python3 <<'PY'
import os,re,subprocess,json
ports=[3400,3930,3940,3955,3965,3971]
public_patterns={
 'GA4':r'\bG-[A-Z0-9]{6,}\b',
 'GOOGLE_ADS':r'\bAW-[0-9]{6,}\b',
 'META_PIXEL':r'\b(?:[0-9]{10,20})\b',
 'CLARITY':r'clarity\.ms/(?:tag|s)/([A-Za-z0-9_-]{5,})',
 'SEGMENT':r'cdn\.segment\.com/analytics\.js/v1/([A-Za-z0-9_-]{8,})',
}
private_keys=['GA4_API_SECRET','META_CAPI_ACCESS_TOKEN','META_CONVERSIONS_ACCESS_TOKEN','META_ACCESS_TOKEN','GOOGLE_ADS_ACCESS_TOKEN','GOOGLE_ADS_DEVELOPER_TOKEN','GOOGLE_ADS_CONVERSION_ACTION','GOOGLE_ADS_CONVERSION_ACTIONS_JSON','SEGMENT_WRITE_KEY','LEAD_INGEST_WEBHOOK_SECRET','IDENTITY_HASH_SECRET','INTERNAL_CRON_SECRET']
public_env=['GA4_MEASUREMENT_ID','NEXT_PUBLIC_GA4_MEASUREMENT_ID','NEXT_PUBLIC_GA_MEASUREMENT_ID','GA_MEASUREMENT_ID','GOOGLE_ADS_CONVERSION_ID','NEXT_PUBLIC_GOOGLE_ADS_ID','GOOGLE_ADS_CONVERSION_LABEL','META_PIXEL_ID','NEXT_PUBLIC_META_PIXEL_ID','CLARITY_PROJECT_ID','NEXT_PUBLIC_CLARITY_PROJECT_ID','NEXT_PUBLIC_MICROSOFT_CLARITY_ID','NEXT_PUBLIC_SEGMENT_WRITE_KEY']
ss=subprocess.check_output(['ss','-ltnp'],text=True,stderr=subprocess.DEVNULL)
def pid(port):
 for line in ss.splitlines():
  if re.search(rf':{port}\s',line):
   m=re.search(r'pid=(\d+)',line)
   if m:return int(m.group(1))
def env(p):
 out={}
 if not p:return out
 try:data=open(f'/proc/{p}/environ','rb').read()
 except:return out
 for x in data.split(b'\0'):
  if b'=' in x:
   k,v=x.split(b'=',1);out[k.decode(errors='ignore')]=v.decode(errors='ignore')
 return out
for port in ports:
 p=pid(port); e=env(p); cwd=os.path.realpath(f'/proc/{p}/cwd') if p else ''
 print(f'PORT={port} CWD={cwd}')
 for k in public_env:
  if e.get(k): print(f' PUBLIC_ENV {k}={e[k]}')
 for k in private_keys:
  if e.get(k): print(f' PRIVATE_ENV {k}=PRESENT')
PY

# inspect only active service dirs + pm2 dump + nginx configs; print public ids, private key names only
mapfile -t ACTIVE < <(for port in 3400 3930 3940 3955 3965 3971; do p="$(pid_for "$port")"; [[ -n "$p" ]] && readlink -f /proc/$p/cwd || true; done | awk '!seen[$0]++')
printf '%s\n' "${ACTIVE[@]}" | sed 's/^/ACTIVE_DIR=/'

python3 - "${ACTIVE[@]}" <<'PY'
from pathlib import Path
import re,sys,json
roots=[Path(x) for x in sys.argv[1:] if x]
extra=[Path('/root/.pm2/dump.pm2'),Path('/etc/nginx/sites-enabled/sikhadenge.in-ssl')]
public_env=['GA4_MEASUREMENT_ID','NEXT_PUBLIC_GA4_MEASUREMENT_ID','NEXT_PUBLIC_GA_MEASUREMENT_ID','GA_MEASUREMENT_ID','GOOGLE_ADS_CONVERSION_ID','NEXT_PUBLIC_GOOGLE_ADS_ID','GOOGLE_ADS_CONVERSION_LABEL','META_PIXEL_ID','NEXT_PUBLIC_META_PIXEL_ID','CLARITY_PROJECT_ID','NEXT_PUBLIC_CLARITY_PROJECT_ID','NEXT_PUBLIC_MICROSOFT_CLARITY_ID','NEXT_PUBLIC_SEGMENT_WRITE_KEY']
private_keys=['GA4_API_SECRET','META_CAPI_ACCESS_TOKEN','META_CONVERSIONS_ACCESS_TOKEN','META_ACCESS_TOKEN','GOOGLE_ADS_ACCESS_TOKEN','GOOGLE_ADS_DEVELOPER_TOKEN','GOOGLE_ADS_CONVERSION_ACTION','GOOGLE_ADS_CONVERSION_ACTIONS_JSON','SEGMENT_WRITE_KEY','LEAD_INGEST_WEBHOOK_SECRET','IDENTITY_HASH_SECRET','INTERNAL_CRON_SECRET']
patterns={
 'GA4':re.compile(r'\bG-[A-Z0-9]{6,}\b',re.I),
 'GOOGLE_ADS':re.compile(r'\bAW-[0-9]{6,}\b',re.I),
 'CLARITY':re.compile(r'clarity\.ms/(?:tag|s)/([A-Za-z0-9_-]{5,})',re.I),
 'SEGMENT':re.compile(r'cdn\.segment\.com/analytics\.js/v1/([A-Za-z0-9_-]{8,})',re.I),
}
files=[]
for root in roots:
 for name in ['.env','.env.local','.env.production','.env.production.local','next.config.js','next.config.mjs','next.config.ts','server.js','ecosystem.config.js','ecosystem.config.cjs']:
  p=root/name
  if p.is_file():files.append(p)
 for sub in ['app','src','lib','pages','public']:
  d=root/sub
  if d.is_dir():
   for p in d.rglob('*'):
    try:
     if p.is_file() and p.stat().st_size<900_000 and p.suffix.lower() in {'.js','.jsx','.ts','.tsx','.html','.mjs','.cjs'}: files.append(p)
    except: pass
files+=extra
seen=set()
for p in files:
 if str(p) in seen or not p.exists():continue
 seen.add(str(p))
 try:s=p.read_text(errors='ignore')
 except:continue
 pub=[]
 for k in public_env:
  for m in re.finditer(rf'(?m)^\s*{re.escape(k)}\s*=\s*["\']?([^\s"\']+)',s):
   v=m.group(1).strip()
   if v and not any(x in v.lower() for x in ['paste','example','your_','changeme']):pub.append(f'{k}={v[:120]}')
 for label,pat in patterns.items():
  vals=[]
  for m in pat.finditer(s): vals.append(m.group(1) if m.lastindex else m.group(0))
  vals=sorted(set(vals))
  if vals: pub.append(label+'='+','.join(vals[:10]))
 priv=[]
 for k in private_keys:
  if re.search(rf'(?m)(?:^|["\s,]){re.escape(k)}(?:["\s]*[:=])',s):priv.append(k)
 if pub or priv:
  print('FILE='+str(p))
  if pub:print(' PUBLIC '+' | '.join(sorted(set(pub))))
  if priv:print(' PRIVATE_KEYS='+','.join(sorted(set(priv))))
PY

echo '===== LIVE_SCRIPT_URLS ====='
for url in 'https://sikhadenge.in/masterclass/ai-video' 'https://sikhadenge.in/masterclass/claude/free' 'https://sikhadenge.in/gen-ai-masterclass/register-one-step'; do f=$(mktemp); curl -LksS --max-time 20 "$url" -o "$f" || true; echo "URL=$url"; grep -Eo 'https://www\.googletagmanager\.com/gtag/js\?id=[^"&< ]+|https://connect\.facebook\.net/[^"< ]+|https://www\.clarity\.ms/[^"< ]+|https://cdn\.segment\.com/[^"< ]+|G-[A-Z0-9]{6,}|AW-[0-9]{6,}' "$f" | sort -u | head -30 || true; rm -f "$f"; done

echo 'RESULT=TRACKING_CREDENTIAL_RECOVERY_V3_COMPLETE'
REMOTE
