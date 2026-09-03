#!/usr/bin/env bash
set -Eeuo pipefail
BASE='ops/deploy-canonical-funnel-tracking-v1.sh'
[[ -f "$BASE" ]] || { echo 'base deploy script missing'; exit 1; }
TMP="$(mktemp)"
cp "$BASE" "$TMP"
python3 - "$TMP" <<'PY'
from pathlib import Path
import sys
p=Path(sys.argv[1]); s=p.read_text()
a='D_PID="$(pid_for 3400)"; D_APP="$(pm2_name_for_pid "$D_PID")"'
b='D_PID="$(pid_for 3400)"; D_APP="sikhadenge-dashboard-revenue"'
c='R_PID="$(pid_for 3955)"; R_CWD="$(readlink -f /proc/$R_PID/cwd)"; R_APP="$(pm2_name_for_pid "$R_PID")"'
d='R_PID="$(pid_for 3955)"; R_CWD="$(readlink -f /proc/$R_PID/cwd)"; R_APP="sikhadenge-checkout-hotfix-3955-20260831-210229"'
if a not in s or c not in s: raise SystemExit('expected PM2 guard lines not found')
s=s.replace(a,b,1).replace(c,d,1)
p.write_text(s)
PY
chmod +x "$TMP"
bash "$TMP"
rm -f "$TMP"
