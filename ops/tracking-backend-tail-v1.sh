#!/usr/bin/env bash
set -Eeuo pipefail
: "${SSH_HOST:?}"; : "${SSH_USER:?}"; SSH_PORT="${SSH_PORT:-22}"; KEY="$HOME/.ssh/prod"
ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeu
pid_for(){ ss -ltnp 2>/dev/null | awk -v p=":$1" '$4 ~ p"$" {if(match($0,/pid=[0-9]+/)){print substr($0,RSTART+4,RLENGTH-4);exit}}'; }
P="$(pid_for 3955)"; C="$(readlink -f /proc/$P/cwd)"; echo '===== REG_TAIL ====='; nl -ba "$C/app/api/masterclass/lead/route.ts" | sed -n '440,700p'
P="$(pid_for 3965)"; C="$(readlink -f /proc/$P/cwd)"; echo '===== PAYMENT_TAIL ====='; nl -ba "$C/server.js" | sed -n '520,1150p'
echo RESULT=TRACKING_BACKEND_TAIL_COMPLETE
REMOTE
