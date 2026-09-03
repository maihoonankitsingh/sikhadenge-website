#!/usr/bin/env bash
set -Eeuo pipefail
: "${SSH_HOST:?missing SSH_HOST}"
: "${SSH_USER:?missing SSH_USER}"
SSH_PORT="${SSH_PORT:-22}"
KEY="$HOME/.ssh/prod"
ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeu
export PM2_HOME=/root/.pm2
KEYS='META_PIXEL_ID NEXT_PUBLIC_META_PIXEL_ID META_CAPI_ACCESS_TOKEN META_CONVERSIONS_API_URL META_CONVERSIONS_ACCESS_TOKEN META_ACCESS_TOKEN META_AD_ACCOUNT_ID GOOGLE_ADS_OFFLINE_CONVERSION_URL GOOGLE_ADS_ACCESS_TOKEN GOOGLE_ADS_DEVELOPER_TOKEN GOOGLE_ADS_CONVERSION_ACTION GOOGLE_ADS_CONVERSION_ACTIONS_JSON LEAD_INGEST_WEBHOOK_SECRET'
echo '===== ATTRIBUTION_CREDENTIAL_SOURCE_SCAN ====='
python3 - <<'PY'
from pathlib import Path
import re
roots=[Path('/var/www/sikhadenge.in'),Path('/opt/sikhadenge-dashboard'),Path('/var/backups/sikhadenge'),Path('/root/.pm2')]
keys='META_PIXEL_ID NEXT_PUBLIC_META_PIXEL_ID META_CAPI_ACCESS_TOKEN META_CONVERSIONS_API_URL META_CONVERSIONS_ACCESS_TOKEN META_ACCESS_TOKEN META_AD_ACCOUNT_ID GOOGLE_ADS_OFFLINE_CONVERSION_URL GOOGLE_ADS_ACCESS_TOKEN GOOGLE_ADS_DEVELOPER_TOKEN GOOGLE_ADS_CONVERSION_ACTION GOOGLE_ADS_CONVERSION_ACTIONS_JSON LEAD_INGEST_WEBHOOK_SECRET'.split()
seen=set()
for root in roots:
    if not root.exists(): continue
    candidates=[]
    if root.name=='.pm2':
        candidates=[root/'dump.pm2']
    else:
        for p in root.rglob('.env*'):
            if p.is_file() and p.stat().st_size < 2_000_000: candidates.append(p)
    for p in candidates:
        if not p.exists(): continue
        try: txt=p.read_text(errors='ignore')
        except: continue
        present=[]
        for k in keys:
            if re.search(rf'(?m)(?:^|["\s,]){re.escape(k)}(?:["\s]*[:=])',txt): present.append(k)
        if present:
            key=(str(p),tuple(present))
            if key not in seen:
                seen.add(key)
                print('SOURCE',p)
                print('KEYS',','.join(present))
PY
P3955="$(ss -ltnp 2>/dev/null | awk '$4 ~ /:3955$/ {if(match($0,/pid=[0-9]+/)){print substr($0,RSTART+4,RLENGTH-4);exit}}')"
C3955="$(readlink -f /proc/$P3955/cwd)"
echo '===== META_PIXEL_TOP ====='
sed -n '1,75p' "$C3955/lib/metaPixel.ts" 2>/dev/null || true
echo 'RESULT=ATTRIBUTION_CREDENTIAL_SOURCE_SCAN_COMPLETE'
REMOTE
