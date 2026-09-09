#!/usr/bin/env bash
set -Eeuo pipefail

export HOME=/root
export PM2_HOME=/root/.pm2

APP='sikhadenge-ai-video-golden-faq-3940-20260904-130510'
PORT='3940'
CWD='/var/www/sikhadenge.in/releases/production-ai-video-golden-faq-final-20260904-130510'
HTML="$CWD/.next/server/pages/masterclass/ai-video.html"
SNAP='/var/backups/sikhadenge/ai-video-ui-v91-20260910-032700/ai-video.html.before'
EXPECTED_SNAPSHOT_SHA='9f7202ae3d3ee585d22f2ebf250ff0f0d1d43ebc58e5a3ae1f2381739c5e8434'
LIVE='https://sikhadenge.in/masterclass/ai-video'
CLAUDE='https://sikhadenge.in/masterclass/claude/free'
REGISTER='https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass'
V91_STYLE='ai-video-ui-v91-inline'
TS="$(date +%Y%m%d-%H%M%S)"
BACKUP="/var/backups/sikhadenge/pre-sep4-golden-restore-${TS}"

log(){ printf '\n[%s] %s\n' "$(date '+%H:%M:%S')" "$*"; }
fail(){ echo "❌ $*" >&2; exit 1; }

wait_200(){
  local url="$1" tries="${2:-45}" code=''
  for ((i=1;i<=tries;i++)); do
    code="$(curl -L -sS -o /dev/null -w '%{http_code}' "$url" || true)"
    [[ "$code" == '200' ]] && return 0
    sleep 1
  done
  echo "Last HTTP: ${code:-none} for $url" >&2
  return 1
}

pm2_status(){
  pm2 jlist | python3 -c '
import json,sys
app=sys.argv[1]
for item in json.load(sys.stdin):
    if item.get("name")==app:
        print((item.get("pm2_env") or {}).get("status","missing")); break
else: print("missing")
' "$APP"
}

pm2_cwd(){
  pm2 jlist | python3 -c '
import json,sys
app=sys.argv[1]
for item in json.load(sys.stdin):
    if item.get("name")==app:
        print((item.get("pm2_env") or {}).get("pm_cwd","missing")); break
else: print("missing")
' "$APP"
}

rollback(){
  trap - ERR INT TERM
  set +e
  echo
  echo '⚠️ Sep4 Golden restore failed — restoring exact pre-restore AI Video HTML'
  if [[ -f "$BACKUP/ai-video.html.before-restore" ]]; then
    cp -f "$BACKUP/ai-video.html.before-restore" "$HTML"
    pm2 restart "$APP" >/dev/null 2>&1 || true
    wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || true
    pm2 save >/dev/null 2>&1 || true
  fi
  echo "Rollback backup: $BACKUP"
  exit 1
}

log '1/7 — Verify exact Sep4 Golden target and current production identity'
[[ -f "$HTML" ]] || fail 'Current AI Video SSR HTML missing'
[[ -f "$SNAP" ]] || fail 'Exact pre-V91 Golden snapshot missing'
[[ "$(pm2_cwd)" == "$CWD" ]] || fail "PM2 cwd mismatch: $(pm2_cwd)"
[[ "$(pm2_status)" == 'online' ]] || pm2 restart "$APP"
SNAP_SHA="$(sha256sum "$SNAP" | awk '{print $1}')"
[[ "$SNAP_SHA" == "$EXPECTED_SNAPSHOT_SHA" ]] || fail "Snapshot SHA mismatch: $SNAP_SHA"
for marker in 'Create cinematic AI videos' 'Six blocks' 'Understand the tools' 'Get My Free Seat'; do
  grep -Fq "$marker" "$SNAP" || fail "Golden snapshot core marker missing: $marker"
done
! grep -Fq "$V91_STYLE" "$SNAP" || fail 'Target snapshot unexpectedly contains V91 UI layer'
wait_200 "$LIVE?restore-preflight=$TS" 45 || fail 'Current public AI Video unhealthy'
wait_200 "$REGISTER" 45 || fail 'Registration route unhealthy'
wait_200 "$CLAUDE?restore-preflight=$TS" 45 || fail 'Claude route unhealthy'
echo "✅ Exact Sep4 Golden target verified: $SNAP_SHA"

log '2/7 — Create fresh rollback snapshot before restore'
mkdir -p "$BACKUP"
cp -a "$HTML" "$BACKUP/ai-video.html.before-restore"
CUR_SHA="$(sha256sum "$HTML" | awk '{print $1}')"
curl -fsS "$CLAUDE?before=$TS" -o "$BACKUP/claude.before.html"
CLAUDE_BEFORE_SHA="$(sha256sum "$BACKUP/claude.before.html" | awk '{print $1}')"
printf 'CURRENT_SHA=%s\nTARGET_SHA=%s\nAPP=%s\nCWD=%s\n' "$CUR_SHA" "$SNAP_SHA" "$APP" "$CWD" > "$BACKUP/state.env"
echo "Rollback backup: $BACKUP"
trap rollback ERR INT TERM

log '3/7 — Restore exact Sep4 Golden HTML only'
cp -f "$SNAP" "$HTML"
RESTORED_SHA="$(sha256sum "$HTML" | awk '{print $1}')"
[[ "$RESTORED_SHA" == "$EXPECTED_SNAPSHOT_SHA" ]] || fail 'Restored HTML SHA is not exact Sep4 Golden snapshot'
! grep -Fq "$V91_STYLE" "$HTML" || fail 'V91 layer still present after restore'
echo '✅ Exact Golden HTML restored; no Nginx/API/Claude mutation'

log '4/7 — Restart only AI Video Golden app'
pm2 restart "$APP" >/dev/null
wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || fail 'Port 3940 did not recover'
pm2 save >/dev/null

log '5/7 — Verify public AI Video + registration'
wait_200 "$LIVE?restored=$TS" 45 || fail 'Public AI Video failed after restore'
wait_200 "$REGISTER" 45 || fail 'Registration route failed after restore'
curl -fsS "$LIVE?qa=$TS" -o "$BACKUP/ai-video.after.public.html"
for marker in 'Create cinematic AI videos' 'Six blocks' 'Understand the tools' 'Get My Free Seat'; do
  grep -Fq "$marker" "$BACKUP/ai-video.after.public.html" || fail "Public Golden marker missing: $marker"
done
! grep -Fq "$V91_STYLE" "$BACKUP/ai-video.after.public.html" || fail 'Public response still exposes V91 style layer'
AI_HTTP="$(curl -L -sS -o /dev/null -w '%{http_code}' "$LIVE?final=$TS")"
[[ "$AI_HTTP" == '200' ]] || fail "AI Video final HTTP=$AI_HTTP"

log '6/7 — Prove Claude remained byte-identical'
curl -fsS "$CLAUDE?after=$TS" -o "$BACKUP/claude.after.html"
CLAUDE_AFTER_SHA="$(sha256sum "$BACKUP/claude.after.html" | awk '{print $1}')"
[[ "$CLAUDE_AFTER_SHA" == "$CLAUDE_BEFORE_SHA" ]] || fail 'Claude response changed during AI Video restore'
CLAUDE_HTTP="$(curl -L -sS -o /dev/null -w '%{http_code}' "$CLAUDE?final=$TS")"
[[ "$CLAUDE_HTTP" == '200' ]] || fail "Claude final HTTP=$CLAUDE_HTTP"

log '7/7 — Final state'
trap - ERR INT TERM
echo '============================================================'
echo '✅ AI VIDEO SEP4 GOLDEN RESTORE COMPLETE'
echo "APP=$APP"
echo "CWD=$CWD"
echo "TARGET_SNAPSHOT=$SNAP"
echo "TARGET_SHA=$SNAP_SHA"
echo "AI_HTTP=$AI_HTTP"
echo "CLAUDE_HTTP=$CLAUDE_HTTP"
echo "ROLLBACK_BACKUP=$BACKUP"
echo 'UNCHANGED=links,forms,scripts,tracking,checkout,API,Claude,Nginx'
echo '============================================================'
