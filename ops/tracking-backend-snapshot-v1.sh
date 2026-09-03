#!/usr/bin/env bash
set -Eeuo pipefail
: "${SSH_HOST:?missing SSH_HOST}"; : "${SSH_USER:?missing SSH_USER}"; SSH_PORT="${SSH_PORT:-22}"; KEY="$HOME/.ssh/prod"
ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeu
pid_for(){ ss -ltnp 2>/dev/null | awk -v p=":$1" '$4 ~ p"$" {if(match($0,/pid=[0-9]+/)){print substr($0,RSTART+4,RLENGTH-4);exit}}'; }
P3955="$(pid_for 3955)"; C3955="$(readlink -f /proc/$P3955/cwd)"; R="$C3955/app/api/masterclass/lead/route.ts"
echo "===== REG_ROUTE=$R ====="
[[ -f "$R" ]] && nl -ba "$R" | sed -n '1,440p' || true
P3965="$(pid_for 3965)"; C3965="$(readlink -f /proc/$P3965/cwd)"; echo "===== PAYMENT_CWD=$C3965 ====="
for f in "$C3965/server.js" "$C3965/app.js"; do [[ -f "$f" ]] && { echo "===== PAYMENT_FILE=$f ====="; nl -ba "$f" | sed -n '1,520p'; }; done
echo '===== DASHBOARD_STATUS ====='; cd /opt/sikhadenge-dashboard; echo "HEAD=$(git rev-parse HEAD)"; git status --short; for f in app/api/webhooks/leads/route.ts app/dashboard/analytics/funnel/page.tsx app/dashboard/analytics/funnel/lead/'[id]'/page.tsx app/dashboard/analytics/page.tsx; do echo "TARGET=$f STATUS=$(git status --porcelain -- "$f" | tr '\n' ';')"; done
echo 'RESULT=TRACKING_BACKEND_SNAPSHOT_COMPLETE'
REMOTE
