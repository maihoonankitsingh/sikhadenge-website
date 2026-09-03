#!/usr/bin/env bash
set -Eeuo pipefail
: "${SSH_HOST:?}"; : "${SSH_USER:?}"; SSH_PORT="${SSH_PORT:-22}"; KEY="$HOME/.ssh/prod"
ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeu
V=/var/www/sikhadenge.in/registration-stable-v72-20260903-131023
echo '===== V72 META / RESPONSE CONTEXT ====='
for f in "$V/registration-stable-hot-v72.js" "$V/registration-stable-page1-v72.js"; do echo "FILE=$f"; grep -nE -C 8 'eventId|eventID|responseJson|result\.id|data\.id|trackMetaEvent|CompleteRegistration|fbq\(' "$f" | head -360 || true; done
echo RESULT=V72_META_DEDUPE_READONLY_COMPLETE
REMOTE
