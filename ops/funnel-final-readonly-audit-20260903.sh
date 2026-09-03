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
DASH=/opt/sikhadenge-dashboard

echo '===== FINAL_READONLY_AUDIT_BEGIN ====='
date -Is
sha256sum "$V72/registration-stable-page1-v72.js" "$V72/registration-stable-hot-v72.js"

pid_for() {
  local port="$1"
  ss -ltnp 2>/dev/null | awk -v p=":${port}" '$4 ~ p"$" {if(match($0,/pid=[0-9]+/)){print substr($0,RSTART+4,RLENGTH-4);exit}}'
}

P3400="$(pid_for 3400)"
P3940="$(pid_for 3940)"
P3955="$(pid_for 3955)"
C3940="$(readlink -f "/proc/$P3940/cwd")"
C3955="$(readlink -f "/proc/$P3955/cwd")"

echo "P3400=$P3400"
echo "P3940=$P3940 C3940=$C3940"
echo "P3955=$P3955 C3955=$C3955"

echo '===== DASHBOARD_GIT_STATE ====='
printf 'HEAD='; git -C "$DASH" rev-parse HEAD || true
printf 'BRANCH='; git -C "$DASH" branch --show-current || true
printf 'ORIGIN='; git -C "$DASH" remote get-url origin 2>/dev/null | sed -E 's#https://[^/@]+@#https://***@#' || true
echo 'STATUS_BEGIN'
git -C "$DASH" status --porcelain=v1 || true
echo 'STATUS_END'
echo 'REMOTE_MAIN_CHECK'
git -C "$DASH" ls-remote origin refs/heads/main 2>/dev/null | awk '{print $1}' || true

echo '===== AI_VIDEO_CTA_FILES ====='
python3 - "$C3940" <<'PY'
from pathlib import Path
import sys
root=Path(sys.argv[1])
needle='source=ai-video-masterclass'
seen=0
for base in ['app','src','components','public','lib']:
    p=root/base
    if not p.exists(): continue
    for f in p.rglob('*'):
        if not f.is_file() or any(x in f.parts for x in ('node_modules','.next','.git')): continue
        try: txt=f.read_text(errors='ignore')
        except: continue
        if needle in txt:
            print('CTA_FILE',f)
            lines=txt.splitlines()
            for i,line in enumerate(lines):
                if needle in line:
                    lo=max(0,i-12); hi=min(len(lines),i+13)
                    print(f'--- {f}:{i+1} ---')
                    for j in range(lo,hi): print(f'{j+1}:{lines[j]}')
                    break
            seen+=1
            if seen>=12: raise SystemExit
PY

echo '===== AI_VIDEO_ATTRIBUTION_SOURCE ====='
AF="$C3940/lib/sikhadenge-analytics/browser-attribution.ts"
if [[ -f "$AF" ]]; then
  sed -n '1,190p' "$AF"
fi

echo '===== META_PIXEL_HELPER ====='
MF="$C3955/lib/metaPixel.ts"
if [[ -f "$MF" ]]; then
  sed -n '70,135p' "$MF"
else
  find "$C3955" -maxdepth 4 -type f -iname '*meta*pixel*.ts*' -print 2>/dev/null | head -20 || true
fi

echo '===== REGISTER_COMPONENT_META_BLOCK ====='
RF="$C3955/app/gen-ai-masterclass/register-one-step/_components/RegisterOneStepPage.tsx"
if [[ -f "$RF" ]]; then
  sed -n '130,225p' "$RF"
fi

echo '===== LEAD_ROUTE_TAIL ====='
LF="$C3955/app/api/masterclass/lead/route.ts"
if [[ -f "$LF" ]]; then
  grep -n -E 'export async function POST|sendMetaLeadEvent|MASTERCLASS_SUBMISSION|NextResponse.json|pushToNeodove|pushToMasterclassWhatsApp' "$LF" | tail -80 || true
  echo '--- ROUTE_LAST_180 ---'
  tail -180 "$LF"
fi

echo '===== ENV_FILES_KEY_PRESENCE ====='
python3 - "$DASH" "$C3940" "$C3955" <<'PY'
from pathlib import Path
import sys,re
keys=['DATABASE_URL','IDENTITY_HASH_SECRET','LEAD_INGEST_WEBHOOK_SECRET','INTERNAL_CRON_SECRET','META_PIXEL_ID','NEXT_PUBLIC_META_PIXEL_ID','META_CAPI_ACCESS_TOKEN','META_CONVERSIONS_API_URL','META_CONVERSIONS_ACCESS_TOKEN','GOOGLE_ADS_OFFLINE_CONVERSION_URL','GOOGLE_ADS_ACCESS_TOKEN','GOOGLE_ADS_DEVELOPER_TOKEN','GOOGLE_ADS_CONVERSION_ACTION','GOOGLE_ADS_CONVERSION_ACTIONS_JSON','RAZORPAY_WEBHOOK_SECRET','META_ACCESS_TOKEN','META_AD_ACCOUNT_ID']
for root in map(Path,sys.argv[1:]):
    print('ROOT',root)
    for name in ['.env','.env.local','.env.production','.env.production.local']:
        f=root/name
        if not f.exists(): continue
        txt=f.read_text(errors='ignore')
        print('ENVFILE',f)
        for k in keys:
            m=re.search(rf'(?m)^\s*(?:export\s+)?{re.escape(k)}\s*=\s*(.*)$',txt)
            if m:
                v=m.group(1).strip().strip('"\'')
                print(f'{k}_PRESENT={1 if v else 0}')
PY

echo '===== PM2_ENV_KEY_PRESENCE ====='
python3 - "$P3400" "$P3940" "$P3955" <<'PY'
import sys
keys=['DATABASE_URL','IDENTITY_HASH_SECRET','LEAD_INGEST_WEBHOOK_SECRET','INTERNAL_CRON_SECRET','META_PIXEL_ID','NEXT_PUBLIC_META_PIXEL_ID','META_CAPI_ACCESS_TOKEN','META_CONVERSIONS_API_URL','META_CONVERSIONS_ACCESS_TOKEN','GOOGLE_ADS_OFFLINE_CONVERSION_URL','GOOGLE_ADS_ACCESS_TOKEN','GOOGLE_ADS_DEVELOPER_TOKEN','GOOGLE_ADS_CONVERSION_ACTION','GOOGLE_ADS_CONVERSION_ACTIONS_JSON','RAZORPAY_WEBHOOK_SECRET','META_ACCESS_TOKEN','META_AD_ACCOUNT_ID']
for pid in sys.argv[1:]:
    raw=open(f'/proc/{pid}/environ','rb').read().split(b'\0')
    env={}
    for x in raw:
        if b'=' in x:
            k,v=x.split(b'=',1); env[k.decode(errors='ignore')]=v.decode(errors='ignore')
    print('PID',pid)
    for k in keys: print(f'{k}_PRESENT={1 if env.get(k) else 0}')
PY

echo '===== AD_SPEND_RUNTIME ====='
if [[ -f "$DASH/app/api/ad-spend/route.ts" ]]; then sed -n '1,240p' "$DASH/app/api/ad-spend/route.ts"; fi

echo '===== V72_FINAL_HASH ====='
sha256sum "$V72/registration-stable-page1-v72.js" "$V72/registration-stable-hot-v72.js"
echo 'RESULT=FINAL_READONLY_AUDIT_COMPLETE'
REMOTE
