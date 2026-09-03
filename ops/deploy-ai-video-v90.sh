#!/usr/bin/env bash
set -Eeuo pipefail

# SikhaDenge AI Video — source-first v90 blue/green production cutover.
# This script is intentionally pinned to the exact candidate that passed
# source audit, 3-view browser QA, section viewport QA and Lighthouse 90+.

DEPLOY_SHA="75889cdbef1c0fb7591d0b6f7dff24b25ff6b662"
DEPLOY_BRANCH="redesign/ai-video-warm-reference-20260830"
SHORT_SHA="${DEPLOY_SHA:0:12}"

SOURCE_REPO="/var/www/sikhadenge.in/sikhadenge-website-space"
RELEASES_DIR="/var/www/sikhadenge.in/releases"
CURRENT_RELEASE="/var/www/sikhadenge.in/releases/production-ai-workflow-premium-zero-build-20260829-110420"

LIVE_HTML="$CURRENT_RELEASE/.next/server/pages/masterclass/ai-video.html"
LIVE_RUNTIME="$CURRENT_RELEASE/public/ai-video-icons-hotfix.js"
EXPECTED_RUNTIME_SHA="6e8c050e8271f95d20e5e7df1f650dba477142eadd694aefdf6259e2fa73cb51"
GOLDEN="/root/ai-video-GOLDEN-ADS-LIVE-20260903-125516"

OLD_APP="sikhadenge-ai-workflow-premium-3940"
PORT="3940"

ALIAS_URL_ROOT="/ai-video-real-output-v77"
ALIAS_FS_ROOT="$CURRENT_RELEASE/public/ai-video-real-output-v77"

LIVE_URL="https://sikhadenge.in/masterclass/ai-video"
REGISTER_URL="https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass"

TS="$(date +%Y%m%d-%H%M%S)"
VERSION="v90-${SHORT_SHA}-${TS}"
PUBLIC_PREFIX="$ALIAS_URL_ROOT/$VERSION"
ASSET_DIR="$ALIAS_FS_ROOT/$VERSION"
NEW_RELEASE="$RELEASES_DIR/production-ai-video-source-first-${VERSION}"
NEW_APP="sikhadenge-ai-video-v90-3940-${TS}"
TEMP_APP="sikhadenge-ai-video-v90-preflight-${TS}"
STATE_FILE="/root/ai-video-v90-deploy-state-${TS}.env"
NGINX_DUMP="/tmp/ai-video-nginx-${TS}.txt"
LIVE_BODY="/tmp/ai-video-live-${TS}.html"

CUTOVER=0
TEMP_STARTED=0

log() {
  printf '\n[%s] %s\n' "$(date '+%H:%M:%S')" "$*"
}

fail() {
  echo "❌ $*" >&2
  return 1
}

pm2_status() {
  local app="$1"
  pm2 jlist | python3 -c '
import json,sys
name=sys.argv[1]
try:
    data=json.load(sys.stdin)
except Exception:
    print("missing")
    raise SystemExit
for app in data:
    if app.get("name")==name:
        print((app.get("pm2_env") or {}).get("status","unknown"))
        break
else:
    print("missing")
' "$app"
}

pm2_cwd() {
  local app="$1"
  pm2 jlist | python3 -c '
import json,sys
name=sys.argv[1]
try:
    data=json.load(sys.stdin)
except Exception:
    print("")
    raise SystemExit
for app in data:
    if app.get("name")==name:
        print((app.get("pm2_env") or {}).get("pm_cwd", ""))
        break
' "$app"
}

wait_http_200() {
  local url="$1"
  local tries="${2:-40}"
  local i code
  for ((i=1; i<=tries; i++)); do
    code="$(curl -L -sS -o /dev/null -w '%{http_code}' "$url" || true)"
    if [[ "$code" == "200" ]]; then
      return 0
    fi
    sleep 1
  done
  echo "Last HTTP status for $url: ${code:-none}" >&2
  return 1
}

cleanup_temp() {
  set +e
  if [[ "$TEMP_STARTED" == "1" ]]; then
    pm2 delete "$TEMP_APP" >/dev/null 2>&1 || true
    TEMP_STARTED=0
  fi
  set -e
}

rollback() {
  trap - ERR INT TERM
  set +e

  echo
  echo "======================================================"
  echo "⚠️  AI VIDEO V90 CUTOVER FAILED — AUTOMATIC ROLLBACK"
  echo "======================================================"

  pm2 stop "$NEW_APP" >/dev/null 2>&1 || true
  pm2 delete "$NEW_APP" >/dev/null 2>&1 || true

  pm2 restart "$OLD_APP"

  wait_http_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || true
  wait_http_200 "${LIVE_URL}?rollbackCheck=${TS}" 45 || true

  echo
  echo "Old app status: $(pm2_status "$OLD_APP")"
  echo "Live rollback HTTP: $(curl -L -sS -o /dev/null -w '%{http_code}' "${LIVE_URL}?rollbackFinal=${TS}" || true)"
  echo "Golden backup remains: $GOLDEN"
  echo "Candidate release retained for forensic inspection: $NEW_RELEASE"
  echo "Candidate assets retained: $ASSET_DIR"
  echo
  echo "❌ Production was rolled back to the pre-deploy app."
}

on_error() {
  local rc="$1"
  local line="$2"
  trap - ERR INT TERM
  echo
  echo "❌ Deployment error at line $line (exit $rc)" >&2
  cleanup_temp || true
  if [[ "$CUTOVER" == "1" ]]; then
    rollback || true
  fi
  exit "$rc"
}

on_signal() {
  trap - ERR INT TERM
  echo "❌ Deployment interrupted" >&2
  cleanup_temp || true
  if [[ "$CUTOVER" == "1" ]]; then
    rollback || true
  fi
  exit 130
}

trap 'rc=$?; on_error "$rc" "$LINENO"' ERR
trap 'on_signal' INT TERM

printf '%s\n' \
  "======================================================" \
  " SIKHADENGE AI VIDEO — V90 BLUE/GREEN PRODUCTION" \
  "======================================================" \
  "Exact source: $DEPLOY_SHA" \
  "Old app:      $OLD_APP" \
  "New app:      $NEW_APP" \
  "Asset prefix: $PUBLIC_PREFIX" \
  "" \
  "Safety policy:" \
  "- current golden HTML/runtime remain immutable" \
  "- no Nginx restart/reload" \
  "- old PM2 app is retained for rollback" \
  "- cutover auto-rolls back on failed health checks"

log "1/12 — Required command check"
for cmd in git npm node pm2 nginx curl python3 sha256sum lsattr ss grep; do
  command -v "$cmd" >/dev/null || fail "Required command missing: $cmd"
done

log "2/12 — Golden baseline integrity"
[[ -e "$GOLDEN" ]] || fail "Golden backup missing: $GOLDEN"
[[ -f "$LIVE_HTML" ]] || fail "Current live HTML missing: $LIVE_HTML"
[[ -f "$LIVE_RUNTIME" ]] || fail "Current runtime missing: $LIVE_RUNTIME"

HTML_ATTR="$(lsattr -d "$LIVE_HTML" | awk '{print $1}')"
RUNTIME_ATTR="$(lsattr -d "$LIVE_RUNTIME" | awk '{print $1}')"
[[ "$HTML_ATTR" == *i* ]] || fail "Current HTML is not immutable: $HTML_ATTR"
[[ "$RUNTIME_ATTR" == *i* ]] || fail "Current runtime is not immutable: $RUNTIME_ATTR"

RUNTIME_SHA="$(sha256sum "$LIVE_RUNTIME" | awk '{print $1}')"
[[ "$RUNTIME_SHA" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Runtime SHA drift: $RUNTIME_SHA"

echo "✅ Golden backup present"
echo "✅ Current HTML immutable: $HTML_ATTR"
echo "✅ Current runtime immutable: $RUNTIME_ATTR"
echo "✅ Runtime SHA exact: $RUNTIME_SHA"

log "3/12 — Current production topology"
[[ -d "$SOURCE_REPO" ]] || fail "Source repo directory missing: $SOURCE_REPO"
git -C "$SOURCE_REPO" rev-parse --is-inside-work-tree >/dev/null || fail "Not a Git worktree: $SOURCE_REPO"

ORIGIN="$(git -C "$SOURCE_REPO" remote get-url origin)"
case "$ORIGIN" in
  *maihoonankitsingh/sikhadenge-website*) ;;
  *) fail "Unexpected Git origin: $ORIGIN" ;;
esac

OLD_STATUS="$(pm2_status "$OLD_APP")"
OLD_CWD="$(pm2_cwd "$OLD_APP")"
[[ "$OLD_STATUS" == "online" ]] || fail "Old production PM2 app is not online: $OLD_STATUS"
[[ "$OLD_CWD" == "$CURRENT_RELEASE" ]] || fail "Old PM2 CWD mismatch: $OLD_CWD"

wait_http_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 10 || fail "Local old app is not healthy"
wait_http_200 "${LIVE_URL}?preDeploy=${TS}" 10 || fail "Public old page is not healthy"
wait_http_200 "$REGISTER_URL" 10 || fail "Registration page is not healthy before deployment"

echo "✅ Existing ads-live app online at port $PORT"
echo "✅ Existing public landing page HTTP 200"
echo "✅ Existing registration route HTTP 200"

log "4/12 — Nginx isolated asset alias verification"
nginx -T >"$NGINX_DUMP" 2>&1
nginx -t

grep -Fq "$ALIAS_URL_ROOT" "$NGINX_DUMP" || fail "Nginx has no $ALIAS_URL_ROOT route"
grep -Fq "$ALIAS_FS_ROOT" "$NGINX_DUMP" || fail "Nginx alias does not reference expected filesystem root: $ALIAS_FS_ROOT"
grep -Fq "masterclass/ai-video" "$NGINX_DUMP" || fail "Nginx AI Video route not found"
grep -Fq "3940" "$NGINX_DUMP" || fail "Expected port 3940 not found in Nginx configuration"

install -d -m 0755 "$ALIAS_FS_ROOT"
echo "✅ Existing Nginx alias can host versioned candidate assets"

log "5/12 — Fetch exact validated source"
git -C "$SOURCE_REPO" fetch --prune origin "$DEPLOY_BRANCH"
git -C "$SOURCE_REPO" cat-file -e "${DEPLOY_SHA}^{commit}" || fail "Validated deploy SHA not available after fetch"

ACTUAL_COMMIT="$(git -C "$SOURCE_REPO" rev-parse "$DEPLOY_SHA")"
[[ "$ACTUAL_COMMIT" == "$DEPLOY_SHA" ]] || fail "Resolved commit mismatch: $ACTUAL_COMMIT"

[[ ! -e "$NEW_RELEASE" ]] || fail "Candidate release path already exists: $NEW_RELEASE"
git -C "$SOURCE_REPO" worktree add --detach "$NEW_RELEASE" "$DEPLOY_SHA"

echo "✅ Candidate worktree: $NEW_RELEASE"

log "6/12 — Locked dependency install + production build"
cd "$NEW_RELEASE"
npm ci --no-audit --no-fund

AI_VIDEO_ASSET_PREFIX="$PUBLIC_PREFIX" \
NEXT_TELEMETRY_DISABLED=1 \
NODE_ENV=production \
npm run build

PAGE_HTML="$NEW_RELEASE/.next/server/pages/masterclass/ai-video.html"
[[ -f "$PAGE_HTML" ]] || fail "Candidate prerendered HTML missing"
[[ -d "$NEW_RELEASE/.next/static" ]] || fail "Candidate .next/static missing"
[[ -f "$NEW_RELEASE/public/ai-video-kling-mark.svg" ]] || fail "Kling local asset missing"
[[ -f "$NEW_RELEASE/public/ai-video-higgsfield-mark.svg" ]] || fail "Higgsfield local asset missing"

grep -Fq 'ai-video-hero-title' "$PAGE_HTML" || fail "New source hero marker missing"
grep -Fq '2-Hour' "$PAGE_HTML" || fail "2-Hour source-of-truth marker missing"
grep -Fq '/gen-ai-masterclass/register-one-step?source=ai-video-masterclass' "$PAGE_HTML" || fail "Registration CTA target missing"
grep -Fq "$PUBLIC_PREFIX/_next/static" "$PAGE_HTML" || fail "Isolated Next asset prefix missing from built HTML"

if grep -Fq 'tabletV7' "$PAGE_HTML"; then fail "Forbidden tabletV7 marker found"; fi
if grep -Fq 'document.write' "$PAGE_HTML"; then fail "Forbidden document.write found"; fi
if grep -Fq 'document.open' "$PAGE_HTML"; then fail "Forbidden document.open found"; fi

echo "✅ Exact candidate built with isolated Next asset namespace"

log "7/12 — Namespace the two new public hero assets"
python3 - "$NEW_RELEASE/.next" "$PUBLIC_PREFIX" <<'PY'
from pathlib import Path
import sys

root = Path(sys.argv[1])
prefix = sys.argv[2]
replacements = {
    b'"/ai-video-kling-mark.svg"': f'"{prefix}/ai-video-kling-mark.svg"'.encode(),
    b"'/ai-video-kling-mark.svg'": f"'{prefix}/ai-video-kling-mark.svg'".encode(),
    b'"/ai-video-higgsfield-mark.svg"': f'"{prefix}/ai-video-higgsfield-mark.svg"'.encode(),
    b"'/ai-video-higgsfield-mark.svg'": f"'{prefix}/ai-video-higgsfield-mark.svg'".encode(),
}

changed = 0
for p in root.rglob('*'):
    if not p.is_file() or p.suffix not in {'.html', '.js', '.json', '.css'}:
        continue
    data = p.read_bytes()
    new = data
    for old, repl in replacements.items():
        new = new.replace(old, repl)
    if new != data:
        p.write_bytes(new)
        changed += 1

if changed == 0:
    raise SystemExit('No generated files contained the public hero asset references')
print(f'Patched generated files: {changed}')
PY

grep -Fq "$PUBLIC_PREFIX/ai-video-kling-mark.svg" "$PAGE_HTML" || fail "Prefixed Kling asset missing from HTML"
grep -Fq "$PUBLIC_PREFIX/ai-video-higgsfield-mark.svg" "$PAGE_HTML" || fail "Prefixed Higgsfield asset missing from HTML"

echo "✅ Public candidate-only assets are isolated from the rest of the site"

log "8/12 — Publish versioned static assets through existing alias"
[[ ! -e "$ASSET_DIR" ]] || fail "Versioned asset directory already exists: $ASSET_DIR"
install -d -m 0755 "$ASSET_DIR/_next"
cp -a "$NEW_RELEASE/.next/static" "$ASSET_DIR/_next/static"
install -m 0644 "$NEW_RELEASE/public/ai-video-kling-mark.svg" "$ASSET_DIR/ai-video-kling-mark.svg"
install -m 0644 "$NEW_RELEASE/public/ai-video-higgsfield-mark.svg" "$ASSET_DIR/ai-video-higgsfield-mark.svg"
chmod -R a+rX "$ASSET_DIR"

python3 - "$PAGE_HTML" "$PUBLIC_PREFIX" >"/tmp/ai-video-assets-${TS}.txt" <<'PY'
from pathlib import Path
import re
import sys

html = Path(sys.argv[1]).read_text(errors="ignore")
prefix = sys.argv[2]
urls = set()
for value in re.findall(r'(?:src|href)="([^"]+)"', html):
    value = value.replace('&amp;', '&')
    if value.startswith(prefix + '/'):
        urls.add(value)
for value in sorted(urls):
    print(value)
PY

[[ -s "/tmp/ai-video-assets-${TS}.txt" ]] || fail "No prefixed assets discovered in built HTML"

while IFS= read -r asset; do
  code="$(curl -L -sS -o /dev/null -w '%{http_code}' "https://sikhadenge.in${asset}" || true)"
  [[ "$code" == "200" ]] || fail "Public candidate asset failed before cutover: $asset -> $code"
done <"/tmp/ai-video-assets-${TS}.txt"

echo "✅ Every prefixed asset referenced by candidate HTML is publicly reachable"

log "9/12 — Candidate server preflight on temporary port"
TEMP_PORT=""
for p in {3951..3960}; do
  if ! ss -ltnH | awk '{print $4}' | grep -Eq "(^|:)${p}$"; then
    TEMP_PORT="$p"
    break
  fi
done
[[ -n "$TEMP_PORT" ]] || fail "No free preflight port found in 3951-3960"

AI_VIDEO_ASSET_PREFIX="$PUBLIC_PREFIX" \
NODE_ENV=production \
pm2 start npm --name "$TEMP_APP" --cwd "$NEW_RELEASE" -- start -- -p "$TEMP_PORT"
TEMP_STARTED=1

wait_http_200 "http://127.0.0.1:${TEMP_PORT}/masterclass/ai-video" 45 || fail "Candidate temporary server failed"

TEMP_BODY="$(mktemp)"
curl -fsSL "http://127.0.0.1:${TEMP_PORT}/masterclass/ai-video" -o "$TEMP_BODY"
grep -Fq 'ai-video-hero-title' "$TEMP_BODY" || fail "Candidate server returned wrong hero"
grep -Fq '2-Hour' "$TEMP_BODY" || fail "Candidate server returned wrong duration"
grep -Fq "$PUBLIC_PREFIX/_next/static" "$TEMP_BODY" || fail "Candidate server returned wrong asset prefix"

cleanup_temp

echo "✅ Candidate server preflight passed on port $TEMP_PORT"

log "10/12 — Atomic same-port PM2 cutover"
CUTOVER=1

pm2 stop "$OLD_APP"

for _ in {1..30}; do
  if ! ss -ltnH | awk '{print $4}' | grep -Eq "(^|:)${PORT}$"; then
    break
  fi
  sleep 1
done

if ss -ltnH | awk '{print $4}' | grep -Eq "(^|:)${PORT}$"; then
  fail "Port $PORT did not release after stopping old app"
fi

AI_VIDEO_ASSET_PREFIX="$PUBLIC_PREFIX" \
NODE_ENV=production \
pm2 start npm --name "$NEW_APP" --cwd "$NEW_RELEASE" -- start -- -p "$PORT"

wait_http_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || fail "New production app failed local health check"

echo "✅ New source-first app is online on port $PORT"

log "11/12 — Public post-cutover E2E smoke verification"
curl -fsSL \
  -H 'Cache-Control: no-cache' \
  "${LIVE_URL}?v90Deploy=${TS}" \
  -o "$LIVE_BODY"

grep -Fq 'ai-video-hero-title' "$LIVE_BODY" || fail "Live page is not the new source-first hero"
grep -Fq '2-Hour' "$LIVE_BODY" || fail "Live page does not show the 2-Hour source of truth"
grep -Fq '/gen-ai-masterclass/register-one-step?source=ai-video-masterclass' "$LIVE_BODY" || fail "Live CTA registration path missing"
grep -Fq "$PUBLIC_PREFIX/_next/static" "$LIVE_BODY" || fail "Live page is not using isolated candidate chunks"
grep -Fq "$PUBLIC_PREFIX/ai-video-kling-mark.svg" "$LIVE_BODY" || fail "Live Kling asset URL mismatch"
grep -Fq "$PUBLIC_PREFIX/ai-video-higgsfield-mark.svg" "$LIVE_BODY" || fail "Live Higgsfield asset URL mismatch"

for bad in 'tabletV7' 'document.write' 'document.open' 'document.close' 'AI_VIDEO_TABLET_DESKTOP_CONTEXT_V7_TEST'; do
  if grep -Fq "$bad" "$LIVE_BODY"; then
    fail "Forbidden legacy marker on live page: $bad"
  fi
done

while IFS= read -r asset; do
  code="$(curl -L -sS -o /dev/null -w '%{http_code}' "https://sikhadenge.in${asset}" || true)"
  [[ "$code" == "200" ]] || fail "Live candidate asset failed: $asset -> $code"
done <"/tmp/ai-video-assets-${TS}.txt"

REG_CODE="$(curl -L -sS -o /dev/null -w '%{http_code}' "$REGISTER_URL" || true)"
[[ "$REG_CODE" == "200" ]] || fail "CTA registration destination failed after cutover: $REG_CODE"

NEW_STATUS="$(pm2_status "$NEW_APP")"
OLD_STATUS_AFTER="$(pm2_status "$OLD_APP")"
[[ "$NEW_STATUS" == "online" ]] || fail "New PM2 app is not online: $NEW_STATUS"
[[ "$OLD_STATUS_AFTER" == "stopped" ]] || fail "Old PM2 rollback app should remain stopped, got: $OLD_STATUS_AFTER"

# The rollback baseline must remain byte-for-byte and attribute-for-attribute intact.
HTML_ATTR_AFTER="$(lsattr -d "$LIVE_HTML" | awk '{print $1}')"
RUNTIME_ATTR_AFTER="$(lsattr -d "$LIVE_RUNTIME" | awk '{print $1}')"
RUNTIME_SHA_AFTER="$(sha256sum "$LIVE_RUNTIME" | awk '{print $1}')"
[[ "$HTML_ATTR_AFTER" == *i* ]] || fail "Golden HTML lost immutable protection"
[[ "$RUNTIME_ATTR_AFTER" == *i* ]] || fail "Golden runtime lost immutable protection"
[[ "$RUNTIME_SHA_AFTER" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Golden runtime changed during deployment"

cat >"$STATE_FILE" <<EOF
DEPLOYED_AT=$TS
DEPLOY_SHA=$DEPLOY_SHA
NEW_RELEASE=$NEW_RELEASE
NEW_APP=$NEW_APP
OLD_APP=$OLD_APP
PORT=$PORT
PUBLIC_PREFIX=$PUBLIC_PREFIX
ASSET_DIR=$ASSET_DIR
GOLDEN=$GOLDEN
OLD_RUNTIME_SHA=$RUNTIME_SHA_AFTER
EOF

pm2 save
CUTOVER=0

log "12/12 — Final production status"
LIVE_CODE="$(curl -L -sS -o /dev/null -w '%{http_code}' "${LIVE_URL}?finalV90=${TS}")"
REG_CODE="$(curl -L -sS -o /dev/null -w '%{http_code}' "$REGISTER_URL")"

echo "======================================================"
echo "✅ AI VIDEO V90 PRODUCTION CUTOVER COMPLETE"
echo "======================================================"
echo "Live landing HTTP:     $LIVE_CODE"
echo "Registration HTTP:     $REG_CODE"
echo "New PM2 app:           $NEW_APP ($(pm2_status "$NEW_APP"))"
echo "Old rollback app:      $OLD_APP ($(pm2_status "$OLD_APP"))"
echo "Source commit:         $DEPLOY_SHA"
echo "Candidate release:     $NEW_RELEASE"
echo "Versioned asset path:  $PUBLIC_PREFIX"
echo "Golden backup:         $GOLDEN"
echo "Golden runtime SHA:    $RUNTIME_SHA_AFTER"
echo "Deployment state:      $STATE_FILE"
echo
echo "Next: run external Chromium desktop/tablet/mobile + Lighthouse live-production verification from GitHub Actions."
