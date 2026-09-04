#!/usr/bin/env bash
set -Eeuo pipefail

export HOME=/root
export PM2_HOME=/root/.pm2

TARGET_APP="sikhadenge-ai-video-v90-1-3940-20260904-105133"
TARGET_RELEASE="/var/www/sikhadenge.in/releases/production-ai-video-source-first-v90-1-c216c8470d76-20260904-105133"
TARGET_PREFIX="/ai-video-real-output-v77/v90-1-c216c8470d76-20260904-105133"
TARGET_SHA="c216c8470d761aae1baa644e2cb3dc8d78b936c7"
PORT="3940"
LIVE_URL="https://sikhadenge.in/masterclass/ai-video"
REGISTER_URL="https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass"

GOLDEN_RELEASE="/var/www/sikhadenge.in/releases/production-ai-workflow-premium-zero-build-20260829-110420"
GOLDEN_HTML="$GOLDEN_RELEASE/.next/server/pages/masterclass/ai-video.html"
GOLDEN_RUNTIME="$GOLDEN_RELEASE/public/ai-video-icons-hotfix.js"
EXPECTED_RUNTIME_SHA="6e8c050e8271f95d20e5e7df1f650dba477142eadd694aefdf6259e2fa73cb51"
GOLDEN_BACKUP="/root/ai-video-GOLDEN-ADS-LIVE-20260903-125516"

TS="$(date +%Y%m%d-%H%M%S)"
LIVE_BODY="/tmp/ai-video-v90-1-restored-${TS}.html"
CURRENT_APP=""
CURRENT_CWD=""
CUTOVER=0

log(){ printf '\n[%s] %s\n' "$(date '+%H:%M:%S')" "$*"; }
fail(){ echo "❌ $*" >&2; return 1; }

pm2_value(){
  local app="$1" key="$2"
  pm2 jlist | python3 - "$app" "$key" <<'PY'
import json,sys
app,key=sys.argv[1:3]
for item in json.load(sys.stdin):
    if item.get('name')==app:
        env=item.get('pm2_env') or {}
        print(env.get(key,'missing'))
        break
else:
    print('missing')
PY
}

wait_200(){
  local url="$1" tries="${2:-45}" code=""
  for ((i=1;i<=tries;i++)); do
    code="$(curl -L -sS -o /dev/null -w '%{http_code}' "$url" || true)"
    [[ "$code" == "200" ]] && return 0
    sleep 1
  done
  echo "Last HTTP: ${code:-none} for $url" >&2
  return 1
}

rollback(){
  trap - ERR INT TERM
  set +e
  echo
  echo "⚠️ RESTORE FAILED — returning to previous listener"
  pm2 stop "$TARGET_APP" >/dev/null 2>&1 || true
  if [[ -n "$CURRENT_APP" && "$CURRENT_APP" != "$TARGET_APP" ]]; then
    pm2 restart "$CURRENT_APP" >/dev/null 2>&1 || true
    wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || true
  fi
  pm2 save >/dev/null 2>&1 || true
  exit 1
}

trap '[[ "$CUTOVER" == "1" ]] && rollback || exit 1' ERR
trap '[[ "$CUTOVER" == "1" ]] && rollback || exit 130' INT TERM

printf '%s\n' \
  "======================================================" \
  " SIKHADENGE AI VIDEO — RESTORE APPROVED V90.1" \
  "======================================================" \
  "Target app:     $TARGET_APP" \
  "Target release: $TARGET_RELEASE" \
  "Target source:  $TARGET_SHA" \
  "Asset prefix:   $TARGET_PREFIX"

log "1/8 — Required tools"
for c in pm2 curl python3 git grep fuser readlink sha256sum lsattr; do
  command -v "$c" >/dev/null || fail "Missing command: $c"
done

log "2/8 — Exact V90.1 release validation"
[[ -d "$TARGET_RELEASE" ]] || fail "Approved V90.1 release missing"
[[ -f "$TARGET_RELEASE/.next/server/pages/masterclass/ai-video.html" ]] || fail "V90.1 prerendered HTML missing"
ACTUAL_SHA="$(git -C "$TARGET_RELEASE" rev-parse HEAD)"
[[ "$ACTUAL_SHA" == "$TARGET_SHA" ]] || fail "V90.1 release SHA mismatch: $ACTUAL_SHA"
grep -Fq 'ai-video-hero-title' "$TARGET_RELEASE/.next/server/pages/masterclass/ai-video.html" || fail "Hero marker missing"
grep -Fq "$TARGET_PREFIX/_next/static" "$TARGET_RELEASE/.next/server/pages/masterclass/ai-video.html" || fail "V90.1 asset prefix missing"
grep -Fq '/gen-ai-masterclass/register-one-step?source=ai-video-masterclass' "$TARGET_RELEASE/.next/server/pages/masterclass/ai-video.html" || fail "CTA target missing"
echo "✅ Exact approved V90.1 release verified"

log "3/8 — Golden recovery integrity"
[[ -e "$GOLDEN_BACKUP" ]] || fail "Golden backup missing"
[[ "$(lsattr -d "$GOLDEN_HTML" | awk '{print $1}')" == *i* ]] || fail "Golden HTML is not immutable"
[[ "$(lsattr -d "$GOLDEN_RUNTIME" | awk '{print $1}')" == *i* ]] || fail "Golden runtime is not immutable"
[[ "$(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Golden runtime SHA changed"
echo "✅ Golden backup/locks untouched"

log "4/8 — Identify current port-3940 app"
LISTENER_PID="$(fuser -n tcp "$PORT" 2>/dev/null | tr ' ' '\n' | grep -E '^[0-9]+$' | head -1 || true)"
if [[ -n "$LISTENER_PID" ]]; then
  CURRENT_CWD="$(readlink -f "/proc/${LISTENER_PID}/cwd" 2>/dev/null || true)"
  CURRENT_APP="$(pm2 jlist | python3 - "$CURRENT_CWD" <<'PY'
import json,os,sys
cwd=os.path.realpath(sys.argv[1]) if sys.argv[1] else ''
for item in json.load(sys.stdin):
    env=item.get('pm2_env') or {}
    pcwd=env.get('pm_cwd') or ''
    if env.get('status')=='online' and pcwd and os.path.realpath(pcwd)==cwd:
        print(item.get('name',''))
        break
PY
)"
  echo "Current listener PID: $LISTENER_PID"
  echo "Current CWD:          ${CURRENT_CWD:-unknown}"
  echo "Current PM2 app:      ${CURRENT_APP:-unknown}"
  [[ -n "$CURRENT_APP" ]] || fail "Could not safely map port 3940 listener to PM2"
  case "$CURRENT_CWD" in
    "$TARGET_RELEASE"|/var/www/sikhadenge.in/releases/production-ai-video-source-first-*|"$GOLDEN_RELEASE") ;;
    *) fail "Port 3940 is owned by unexpected path: $CURRENT_CWD" ;;
  esac
else
  echo "Port 3940 currently has no listener"
fi

log "5/8 — Restore exact V90.1 app"
if [[ "$CURRENT_CWD" != "$TARGET_RELEASE" ]]; then
  CUTOVER=1
  if [[ -n "$CURRENT_APP" ]]; then
    pm2 stop "$CURRENT_APP"
  fi
  export AI_VIDEO_ASSET_PREFIX="$TARGET_PREFIX"
  export NODE_ENV=production
  if pm2 describe "$TARGET_APP" >/dev/null 2>&1; then
    pm2 restart "$TARGET_APP" --update-env
  else
    pm2 start npm --name "$TARGET_APP" --cwd "$TARGET_RELEASE" -- start -- -p "$PORT"
  fi
else
  echo "Exact V90.1 release already owns port 3940; no process cutover needed"
fi
wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || fail "Local V90.1 health failed"
[[ "$(pm2_value "$TARGET_APP" status)" == "online" ]] || fail "Target V90.1 PM2 app not online"
[[ "$(pm2_value "$TARGET_APP" pm_cwd)" == "$TARGET_RELEASE" ]] || fail "Target V90.1 PM2 CWD mismatch"
echo "✅ Exact V90.1 app online"

log "6/8 — Public live verification"
curl -fsSL -H 'Cache-Control: no-cache' "${LIVE_URL}?restoreV901=${TS}" -o "$LIVE_BODY"
grep -Fq 'ai-video-hero-title' "$LIVE_BODY" || fail "Live hero marker missing"
grep -Fq "$TARGET_PREFIX/_next/static" "$LIVE_BODY" || fail "Live page is not serving approved V90.1 assets"
grep -Fq '/gen-ai-masterclass/register-one-step?source=ai-video-masterclass' "$LIVE_BODY" || fail "Live CTA target missing"
for bad in 'tabletV7' 'document.write' 'document.open' 'AI_VIDEO_TABLET_DESKTOP_CONTEXT_V7_TEST'; do
  ! grep -Fq "$bad" "$LIVE_BODY" || fail "Forbidden old hotfix marker live: $bad"
done
echo "✅ Public page is exact V90.1 source-first build"

log "7/8 — Registration verification"
wait_200 "$REGISTER_URL" 20 || fail "Registration route is not HTTP 200"
echo "✅ Registration HTTP 200"

log "8/8 — Persist PM2 state"
pm2 save
CUTOVER=0

echo
echo "======================================================"
echo "✅ APPROVED NEW AI VIDEO PAGE V90.1 RESTORED"
echo "======================================================"
echo "Live URL:        $LIVE_URL"
echo "Live HTTP:       $(curl -L -sS -o /dev/null -w '%{http_code}' "${LIVE_URL}?finalRestore=${TS}")"
echo "Registration:    $(curl -L -sS -o /dev/null -w '%{http_code}' "$REGISTER_URL")"
echo "PM2 app:         $TARGET_APP ($(pm2_value "$TARGET_APP" status))"
echo "Release:         $TARGET_RELEASE"
echo "Source commit:   $TARGET_SHA"
echo "Asset prefix:    $TARGET_PREFIX"
echo "Golden SHA:      $(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')"
