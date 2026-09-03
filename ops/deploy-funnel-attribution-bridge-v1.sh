#!/usr/bin/env bash
set -Eeuo pipefail
: "${SSH_HOST:?missing SSH_HOST}"; : "${SSH_USER:?missing SSH_USER}"
SSH_PORT="${SSH_PORT:-22}"; KEY="$HOME/.ssh/prod"
ASSET="ops/assets/funnel-attribution-bridge-v1.js"
[[ -f "$ASSET" ]] || { echo 'asset missing'; exit 1; }
node --check "$ASSET"
REMOTE_TMP="/tmp/funnel-attribution-bridge-v1-${GITHUB_RUN_ID:-manual}-$$.js"
scp -P "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes "$ASSET" "$SSH_USER@$SSH_HOST:$REMOTE_TMP"
ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes "$SSH_USER@$SSH_HOST" "REMOTE_TMP='$REMOTE_TMP' bash -s" <<'REMOTE'
set -Eeuo pipefail
TS="$(date +%Y%m%d-%H%M%S)"
REG=/etc/nginx/snippets/sikhadenge-registration-v2-hot.conf
DIR=/var/www/sikhadenge.in/tracking-live-v1
ASSET="$DIR/funnel-attribution-bridge-v1.js"
BACK="/var/backups/sikhadenge/funnel-attribution-bridge-v1-$TS"
V72=/var/www/sikhadenge.in/registration-stable-v72-20260903-131023
PAGE_SHA='13b891266630475342cd63ca28e5336d6b137b13490d6c13c3ddff71088fe592'
HOT_SHA='bc9e84f6800bbbe856aaded94361c76dc5aee23a6c2dfe979926e15b4d50b313'

find_conf(){
  local needle="$1"
  grep -RIlF --exclude='*.bak' --exclude='*.before' -- "$needle" /etc/nginx/sites-enabled /etc/nginx/snippets 2>/dev/null | head -1
}
AI_CONF="$(find_conf 'location = /masterclass/ai-video {')"
CLAUDE_CONF="$(find_conf 'location = /masterclass/claude/free {')"
[[ -n "$AI_CONF" && -n "$CLAUDE_CONF" && -f "$REG" ]] || { echo "ACTIVE_CONF_GUARD_FAIL AI=$AI_CONF CLAUDE=$CLAUDE_CONF REG=$REG"; exit 1; }
echo "AI_CONF=$AI_CONF"
echo "CLAUDE_CONF=$CLAUDE_CONF"
echo "REG_CONF=$REG"

mkdir -p "$BACK" "$DIR"
mapfile -t CONFIGS < <(printf '%s\n' "$AI_CONF" "$CLAUDE_CONF" "$REG" | awk '!seen[$0]++')
for f in "${CONFIGS[@]}"; do cp -a "$f" "$BACK/$(echo "$f" | sed 's#/#__#g').before"; done
[[ -f "$ASSET" ]] && cp -a "$ASSET" "$BACK/funnel-attribution-bridge-v1.js.before" || true

got_page="$(sha256sum "$V72/registration-stable-page1-v72.js" | awk '{print $1}')"
got_hot="$(sha256sum "$V72/registration-stable-hot-v72.js" | awk '{print $1}')"
[[ "$got_page" == "$PAGE_SHA" && "$got_hot" == "$HOT_SHA" ]] || { echo 'V72_PRE_HASH_GUARD_FAIL'; exit 1; }

install -m 0644 "$REMOTE_TMP" "$ASSET"
node --check "$ASSET"
rm -f "$REMOTE_TMP"

python3 - "$AI_CONF" "$CLAUDE_CONF" "$REG" <<'PY'
from pathlib import Path
import sys
ai=Path(sys.argv[1]); claude=Path(sys.argv[2]); reg=Path(sys.argv[3])
marker='funnel-attribution-bridge-v1.js?v=20260903-1'
directive='\n    sub_filter \'</head>\' \'<script src="/funnel-attribution-bridge-v1.js?v=20260903-1"></script></head>\';'
static='''\nlocation = /funnel-attribution-bridge-v1.js {\n    alias /var/www/sikhadenge.in/tracking-live-v1/funnel-attribution-bridge-v1.js;\n    default_type application/javascript;\n    add_header Cache-Control "public, max-age=300, must-revalidate" always;\n}\n\n'''

def bounds(s, header):
    start=s.find(header)
    if start < 0: raise SystemExit(f'missing location: {header}')
    op=s.find('{', start); depth=0; quote=None; esc=False
    for i in range(op, len(s)):
        c=s[i]
        if quote:
            if esc: esc=False
            elif c=='\\': esc=True
            elif c==quote: quote=None
            continue
        if c in ('"',"'"): quote=c; continue
        if c=='{': depth+=1
        elif c=='}':
            depth-=1
            if depth==0:return start,op,i+1
    raise SystemExit(f'unclosed location: {header}')

def inject(path, header):
    s=path.read_text(); a,op,b=bounds(s,header); block=s[a:b]
    if marker not in block:
        s=s[:op+1]+directive+s[op+1:]; path.write_text(s)

# The AI route snippet is included inside the public SSL server; adding a sibling location
# before its route is therefore in the same server context and serves the companion asset.
s=ai.read_text()
if 'location = /funnel-attribution-bridge-v1.js {' not in s:
    pos=s.find('location = /masterclass/ai-video {')
    if pos < 0: raise SystemExit('AI route missing for static location insertion')
    s=s[:pos]+static+s[pos:]; ai.write_text(s)
inject(ai,'location = /masterclass/ai-video {')
inject(claude,'location = /masterclass/claude/free {')
inject(reg,'location = /gen-ai-masterclass/register-one-step {')
PY

rollback(){
  echo 'ROLLBACK_FUNNEL_ATTRIBUTION_BRIDGE'
  for f in "${CONFIGS[@]}"; do b="$BACK/$(echo "$f" | sed 's#/#__#g').before"; [[ -f "$b" ]] && cp -a "$b" "$f"; done
  if [[ -f "$BACK/funnel-attribution-bridge-v1.js.before" ]]; then cp -a "$BACK/funnel-attribution-bridge-v1.js.before" "$ASSET"; else rm -f "$ASSET"; fi
  nginx -t && systemctl reload nginx || true
}
trap 'rc=$?; if [[ $rc -ne 0 ]]; then rollback; fi; exit $rc' EXIT

nginx -t
systemctl reload nginx
sleep 2
curl -fsS 'https://sikhadenge.in/funnel-attribution-bridge-v1.js?v=20260903-1' -o /tmp/sd-bridge-public.js
cmp -s "$ASSET" /tmp/sd-bridge-public.js
for url in 'https://sikhadenge.in/masterclass/ai-video?check=trackingbridge' 'https://sikhadenge.in/masterclass/claude/free?check=trackingbridge' 'https://sikhadenge.in/gen-ai-masterclass/register-one-step?check=trackingbridge'; do
  f="$(mktemp)"; curl -LfsS "$url" -o "$f"; grep -Fq '/funnel-attribution-bridge-v1.js?v=20260903-1' "$f"; rm -f "$f"; echo "INJECT_PASS=$url";
done

got_page2="$(sha256sum "$V72/registration-stable-page1-v72.js" | awk '{print $1}')"
got_hot2="$(sha256sum "$V72/registration-stable-hot-v72.js" | awk '{print $1}')"
[[ "$got_page2" == "$PAGE_SHA" && "$got_hot2" == "$HOT_SHA" ]] || { echo 'V72_POST_HASH_GUARD_FAIL'; exit 1; }
echo "BACKUP=$BACK"
echo 'V72_HASH_LOCK=PASS'
echo 'RESULT=FUNNEL_ATTRIBUTION_BRIDGE_V1_LIVE'
trap - EXIT
REMOTE
