#!/usr/bin/env bash
set -Eeuo pipefail

# SikhaDenge AI Video — V90.1 consent/LCP hotfix blue-green cutover.
# Pinned to the exact commit that passed 39/39 source audit, 3-view browser QA,
# 21/21 section QA and Lighthouse desktop 100 / mobile 99 performance.

DEPLOY_SHA="c216c8470d761aae1baa644e2cb3dc8d78b936c7"
DEPLOY_BRANCH="redesign/ai-video-warm-reference-20260830"
SHORT_SHA="${DEPLOY_SHA:0:12}"

SOURCE_REPO="/var/www/sikhadenge.in/sikhadenge-website-space"
RELEASES_DIR="/var/www/sikhadenge.in/releases"

GOLDEN_RELEASE="/var/www/sikhadenge.in/releases/production-ai-workflow-premium-zero-build-20260829-110420"
GOLDEN_HTML="$GOLDEN_RELEASE/.next/server/pages/masterclass/ai-video.html"
GOLDEN_RUNTIME="$GOLDEN_RELEASE/public/ai-video-icons-hotfix.js"
EXPECTED_RUNTIME_SHA="6e8c050e8271f95d20e5e7df1f650dba477142eadd694aefdf6259e2fa73cb51"
GOLDEN_BACKUP="/root/ai-video-GOLDEN-ADS-LIVE-20260903-125516"

PREV_APP="sikhadenge-ai-video-v90-3940-20260903-220828"
PREV_RELEASE="/var/www/sikhadenge.in/releases/production-ai-video-source-first-v90-75889cdbef1c-20260903-220828"
PREV_PREFIX="/ai-video-real-output-v77/v90-75889cdbef1c-20260903-220828"
ORIGINAL_APP="sikhadenge-ai-workflow-premium-3940"
PORT="3940"

ALIAS_URL_ROOT="/ai-video-real-output-v77"
ALIAS_FS_ROOT="$GOLDEN_RELEASE/public/ai-video-real-output-v77"
LIVE_URL="https://sikhadenge.in/masterclass/ai-video"
REGISTER_URL="https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass"

TS="$(date +%Y%m%d-%H%M%S)"
VERSION="v90-1-${SHORT_SHA}-${TS}"
PUBLIC_PREFIX="$ALIAS_URL_ROOT/$VERSION"
ASSET_DIR="$ALIAS_FS_ROOT/$VERSION"
NEW_RELEASE="$RELEASES_DIR/production-ai-video-source-first-${VERSION}"
NEW_APP="sikhadenge-ai-video-v90-1-3940-${TS}"
TEMP_APP="sikhadenge-ai-video-v90-1-preflight-${TS}"
STATE_FILE="/root/ai-video-v90-1-deploy-state-${TS}.env"
NGINX_DUMP="/tmp/ai-video-v90-1-nginx-${TS}.txt"
PRE_BODY="/tmp/ai-video-v90-before-${TS}.html"
LIVE_BODY="/tmp/ai-video-v90-1-live-${TS}.html"
ASSET_LIST="/tmp/ai-video-v90-1-assets-${TS}.txt"

CUTOVER=0
TEMP_STARTED=0

log() { printf '\n[%s] %s\n' "$(date '+%H:%M:%S')" "$*"; }
fail() { echo "❌ $*" >&2; return 1; }

pm2_value() {
  local app="$1" key="$2"
  pm2 jlist | python3 -c '
import json,sys
name,key=sys.argv[1],sys.argv[2]
try:
    data=json.load(sys.stdin)
except Exception:
    print("missing")
    raise SystemExit
for item in data:
    if item.get("name")==name:
        env=item.get("pm2_env") or {}
        print(env.get(key,"missing"))
        break
else:
    print("missing")
' "$app" "$key"
}

wait_http_200() {
  local url="$1" tries="${2:-40}" i code=""
  for ((i=1; i<=tries; i++)); do
    code="$(curl -L -sS -o /dev/null -w '%{http_code}' "$url" || true)"
    [[ "$code" == "200" ]] && return 0
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
  echo "⚠️  AI VIDEO V90.1 CUTOVER FAILED — ROLLING BACK TO V90"
  echo "======================================================"
  pm2 stop "$NEW_APP" >/dev/null 2>&1 || true
  pm2 delete "$NEW_APP" >/dev/null 2>&1 || true
  pm2 restart "$PREV_APP"
  wait_http_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || true
  wait_http_200 "${LIVE_URL}?rollbackV90=${TS}" 45 || true
  pm2 save >/dev/null 2>&1 || true
  echo "V90 rollback app: $PREV_APP ($(pm2_value "$PREV_APP" status))"
  echo "Live rollback HTTP: $(curl -L -sS -o /dev/null -w '%{http_code}' "${LIVE_URL}?rollbackFinal=${TS}" || true)"
  echo "Original golden backup remains: $GOLDEN_BACKUP"
  echo "Failed V90.1 release retained: $NEW_RELEASE"
  echo "❌ Production restored to V90."
}

on_error() {
  local rc="$1" line="$2"
  trap - ERR INT TERM
  echo "❌ Deployment error at line $line (exit $rc)" >&2
  cleanup_temp || true
  [[ "$CUTOVER" == "1" ]] && rollback || true
  exit "$rc"
}

on_signal() {
  trap - ERR INT TERM
  echo "❌ Deployment interrupted" >&2
  cleanup_temp || true
  [[ "$CUTOVER" == "1" ]] && rollback || true
  exit 130
}

trap 'rc=$?; on_error "$rc" "$LINENO"' ERR
trap 'on_signal' INT TERM

printf '%s\n' \
  "======================================================" \
  " SIKHADENGE AI VIDEO — V90.1 BLUE/GREEN PRODUCTION" \
  "======================================================" \
  "Exact source:   $DEPLOY_SHA" \
  "Current V90:    $PREV_APP" \
  "New V90.1:      $NEW_APP" \
  "Asset prefix:   $PUBLIC_PREFIX" \
  "" \
  "Safety policy:" \
  "- current V90 is preserved as immediate rollback" \
  "- original golden app/files remain untouched" \
  "- no Nginx restart/reload" \
  "- failed post-cutover checks auto-rollback to V90"

log "1/12 — Required command check"
for cmd in git npm node pm2 nginx curl python3 sha256sum lsattr ss grep; do
  command -v "$cmd" >/dev/null || fail "Required command missing: $cmd"
done

log "2/12 — Original golden integrity"
[[ -e "$GOLDEN_BACKUP" ]] || fail "Golden backup missing: $GOLDEN_BACKUP"
[[ -f "$GOLDEN_HTML" ]] || fail "Golden HTML missing"
[[ -f "$GOLDEN_RUNTIME" ]] || fail "Golden runtime missing"
HTML_ATTR="$(lsattr -d "$GOLDEN_HTML" | awk '{print $1}')"
RUNTIME_ATTR="$(lsattr -d "$GOLDEN_RUNTIME" | awk '{print $1}')"
RUNTIME_SHA="$(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')"
[[ "$HTML_ATTR" == *i* ]] || fail "Golden HTML is not immutable: $HTML_ATTR"
[[ "$RUNTIME_ATTR" == *i* ]] || fail "Golden runtime is not immutable: $RUNTIME_ATTR"
[[ "$RUNTIME_SHA" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Golden runtime SHA drift: $RUNTIME_SHA"
echo "✅ Original golden lock and runtime SHA are intact"

log "3/12 — Current V90 production topology"
[[ -d "$SOURCE_REPO" ]] || fail "Source repo missing: $SOURCE_REPO"
[[ -d "$PREV_RELEASE" ]] || fail "Current V90 release missing: $PREV_RELEASE"
git -C "$SOURCE_REPO" rev-parse --is-inside-work-tree >/dev/null || fail "Source repo is not a Git worktree"
ORIGIN="$(git -C "$SOURCE_REPO" remote get-url origin)"
case "$ORIGIN" in *maihoonankitsingh/sikhadenge-website*) ;; *) fail "Unexpected Git origin: $ORIGIN" ;; esac

PREV_STATUS="$(pm2_value "$PREV_APP" status)"
PREV_CWD="$(pm2_value "$PREV_APP" pm_cwd)"
ORIGINAL_STATUS="$(pm2_value "$ORIGINAL_APP" status)"
[[ "$PREV_STATUS" == "online" ]] || fail "Current V90 app is not online: $PREV_STATUS"
[[ "$PREV_CWD" == "$PREV_RELEASE" ]] || fail "Current V90 PM2 CWD mismatch: $PREV_CWD"
[[ "$ORIGINAL_STATUS" == "stopped" ]] || fail "Original rollback app expected stopped, got: $ORIGINAL_STATUS"
wait_http_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 10 || fail "Current V90 local health failed"
wait_http_200 "${LIVE_URL}?preV901=${TS}" 10 || fail "Current V90 public health failed"
wait_http_200 "$REGISTER_URL" 10 || fail "Registration route failed before deploy"
curl -fsSL -H 'Cache-Control: no-cache' "${LIVE_URL}?baselineV90=${TS}" -o "$PRE_BODY"
grep -Fq 'ai-video-hero-title' "$PRE_BODY" || fail "Current live page is not source-first V90"
grep -Fq "$PREV_PREFIX/_next/static" "$PRE_BODY" || fail "Current live asset prefix does not match known V90 baseline"
echo "✅ V90 baseline is exact and healthy"

log "4/12 — Existing Nginx isolated-asset route verification"
nginx -T >"$NGINX_DUMP" 2>&1
nginx -t
grep -Fq "$ALIAS_URL_ROOT" "$NGINX_DUMP" || fail "Nginx alias URL root missing"
grep -Fq "$ALIAS_FS_ROOT" "$NGINX_DUMP" || fail "Nginx alias filesystem root mismatch"
grep -Fq "masterclass/ai-video" "$NGINX_DUMP" || fail "AI Video Nginx route missing"
grep -Fq "3940" "$NGINX_DUMP" || fail "Port 3940 missing from Nginx configuration"
install -d -m 0755 "$ALIAS_FS_ROOT"
echo "✅ Existing alias can host V90.1 versioned assets"

log "5/12 — Fetch exact validated V90.1 source"
git -C "$SOURCE_REPO" fetch --prune origin "$DEPLOY_BRANCH"
git -C "$SOURCE_REPO" cat-file -e "${DEPLOY_SHA}^{commit}" || fail "V90.1 deploy SHA unavailable after fetch"
ACTUAL_COMMIT="$(git -C "$SOURCE_REPO" rev-parse "$DEPLOY_SHA")"
[[ "$ACTUAL_COMMIT" == "$DEPLOY_SHA" ]] || fail "Resolved commit mismatch: $ACTUAL_COMMIT"
[[ ! -e "$NEW_RELEASE" ]] || fail "New release path already exists: $NEW_RELEASE"
git -C "$SOURCE_REPO" worktree add --detach "$NEW_RELEASE" "$DEPLOY_SHA"
CONSENT="$NEW_RELEASE/components/consent/ConsentBanner.tsx"
[[ -f "$CONSENT" ]] || fail "ConsentBanner source missing"
grep -Fq 'prefetch={false}' "$CONSENT" || fail "Consent prefetch hotfix missing"
grep -Fq 'Essential storage keeps the site working.' "$CONSENT" || fail "Compact mobile consent copy missing"
node "$NEW_RELEASE/scripts/audit-ai-video-masterclass.mjs"
echo "✅ Exact V90.1 source and 39/39 architecture guards confirmed"

log "6/12 — Locked dependency install + production build"
cd "$NEW_RELEASE"
npm ci --no-audit --no-fund
AI_VIDEO_ASSET_PREFIX="$PUBLIC_PREFIX" NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production npm run build
PAGE_HTML="$NEW_RELEASE/.next/server/pages/masterclass/ai-video.html"
[[ -f "$PAGE_HTML" ]] || fail "Candidate prerendered HTML missing"
[[ -d "$NEW_RELEASE/.next/static" ]] || fail "Candidate .next/static missing"
[[ -f "$NEW_RELEASE/public/ai-video-kling-mark.svg" ]] || fail "Kling asset missing"
[[ -f "$NEW_RELEASE/public/ai-video-higgsfield-mark.svg" ]] || fail "Higgsfield asset missing"
grep -Fq 'ai-video-hero-title' "$PAGE_HTML" || fail "Source hero marker missing"
grep -Fq '2-Hour' "$PAGE_HTML" || fail "2-Hour marker missing"
grep -Fq '/gen-ai-masterclass/register-one-step?source=ai-video-masterclass' "$PAGE_HTML" || fail "CTA target missing"
grep -Fq "$PUBLIC_PREFIX/_next/static" "$PAGE_HTML" || fail "Isolated asset prefix missing"
for bad in 'tabletV7' 'document.write' 'document.open' 'AI_VIDEO_TABLET_DESKTOP_CONTEXT_V7_TEST'; do
  ! grep -Fq "$bad" "$PAGE_HTML" || fail "Forbidden marker in candidate HTML: $bad"
done
echo "✅ V90.1 candidate build complete"

log "7/12 — Namespace candidate-only hero assets"
python3 - "$NEW_RELEASE/.next" "$PUBLIC_PREFIX" <<'PY'
from pathlib import Path
import sys
root=Path(sys.argv[1]); prefix=sys.argv[2]
replacements={
 b'"/ai-video-kling-mark.svg"': f'"{prefix}/ai-video-kling-mark.svg"'.encode(),
 b"'/ai-video-kling-mark.svg'": f"'{prefix}/ai-video-kling-mark.svg'".encode(),
 b'"/ai-video-higgsfield-mark.svg"': f'"{prefix}/ai-video-higgsfield-mark.svg"'.encode(),
 b"'/ai-video-higgsfield-mark.svg'": f"'{prefix}/ai-video-higgsfield-mark.svg'".encode(),
}
changed=0
for p in root.rglob('*'):
    if not p.is_file() or p.suffix not in {'.html','.js','.json','.css'}: continue
    data=p.read_bytes(); new=data
    for old,repl in replacements.items(): new=new.replace(old,repl)
    if new!=data:
        p.write_bytes(new); changed+=1
if not changed: raise SystemExit('No generated hero asset references were patched')
print(f'Patched generated files: {changed}')
PY
grep -Fq "$PUBLIC_PREFIX/ai-video-kling-mark.svg" "$PAGE_HTML" || fail "Prefixed Kling URL missing"
grep -Fq "$PUBLIC_PREFIX/ai-video-higgsfield-mark.svg" "$PAGE_HTML" || fail "Prefixed Higgsfield URL missing"
echo "✅ Candidate public assets namespaced"

log "8/12 — Publish versioned V90.1 static assets"
[[ ! -e "$ASSET_DIR" ]] || fail "Asset directory already exists: $ASSET_DIR"
install -d -m 0755 "$ASSET_DIR/_next"
cp -a "$NEW_RELEASE/.next/static" "$ASSET_DIR/_next/static"
install -m 0644 "$NEW_RELEASE/public/ai-video-kling-mark.svg" "$ASSET_DIR/ai-video-kling-mark.svg"
install -m 0644 "$NEW_RELEASE/public/ai-video-higgsfield-mark.svg" "$ASSET_DIR/ai-video-higgsfield-mark.svg"
chmod -R a+rX "$ASSET_DIR"
python3 - "$PAGE_HTML" "$PUBLIC_PREFIX" >"$ASSET_LIST" <<'PY'
from pathlib import Path
import re,sys
html=Path(sys.argv[1]).read_text(errors='ignore'); prefix=sys.argv[2]
urls=set()
for value in re.findall(r'(?:src|href)="([^"]+)"',html):
    value=value.replace('&amp;','&')
    if value.startswith(prefix+'/'): urls.add(value)
for value in sorted(urls): print(value)
PY
[[ -s "$ASSET_LIST" ]] || fail "No prefixed candidate assets found"
while IFS= read -r asset; do
  code="$(curl -L -sS -o /dev/null -w '%{http_code}' "https://sikhadenge.in${asset}" || true)"
  [[ "$code" == "200" ]] || fail "Candidate asset unavailable: $asset -> $code"
done <"$ASSET_LIST"
echo "✅ All V90.1 prefixed assets publicly reachable before cutover"

log "9/12 — Temporary-port V90.1 preflight"
TEMP_PORT=""
for p in {3951..3960}; do
  if ! ss -ltnH | awk '{print $4}' | grep -Eq "(^|:)${p}$"; then TEMP_PORT="$p"; break; fi
done
[[ -n "$TEMP_PORT" ]] || fail "No free preflight port in 3951-3960"
AI_VIDEO_ASSET_PREFIX="$PUBLIC_PREFIX" NODE_ENV=production pm2 start npm --name "$TEMP_APP" --cwd "$NEW_RELEASE" -- start -- -p "$TEMP_PORT"
TEMP_STARTED=1
wait_http_200 "http://127.0.0.1:${TEMP_PORT}/masterclass/ai-video" 45 || fail "V90.1 preflight server failed"
TEMP_BODY="$(mktemp)"
curl -fsSL "http://127.0.0.1:${TEMP_PORT}/masterclass/ai-video" -o "$TEMP_BODY"
grep -Fq 'ai-video-hero-title' "$TEMP_BODY" || fail "Preflight hero marker missing"
grep -Fq "$PUBLIC_PREFIX/_next/static" "$TEMP_BODY" || fail "Preflight asset prefix mismatch"
cleanup_temp
echo "✅ V90.1 preflight passed on port $TEMP_PORT"

log "10/12 — Atomic same-port cutover: V90 → V90.1"
CUTOVER=1
pm2 stop "$PREV_APP"
for _ in {1..30}; do
  ! ss -ltnH | awk '{print $4}' | grep -Eq "(^|:)${PORT}$" && break
  sleep 1
done
! ss -ltnH | awk '{print $4}' | grep -Eq "(^|:)${PORT}$" || fail "Port $PORT did not release"
AI_VIDEO_ASSET_PREFIX="$PUBLIC_PREFIX" NODE_ENV=production pm2 start npm --name "$NEW_APP" --cwd "$NEW_RELEASE" -- start -- -p "$PORT"
wait_http_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || fail "V90.1 local health failed"
echo "✅ V90.1 app online on port $PORT"

log "11/12 — Public post-cutover smoke + rollback integrity"
curl -fsSL -H 'Cache-Control: no-cache' "${LIVE_URL}?v901Deploy=${TS}" -o "$LIVE_BODY"
grep -Fq 'ai-video-hero-title' "$LIVE_BODY" || fail "Live page is not V90.1 source-first page"
grep -Fq '2-Hour' "$LIVE_BODY" || fail "Live 2-Hour copy missing"
grep -Fq '/gen-ai-masterclass/register-one-step?source=ai-video-masterclass' "$LIVE_BODY" || fail "Live CTA target missing"
grep -Fq "$PUBLIC_PREFIX/_next/static" "$LIVE_BODY" || fail "Live page not using V90.1 chunks"
grep -Fq "$PUBLIC_PREFIX/ai-video-kling-mark.svg" "$LIVE_BODY" || fail "Live Kling URL mismatch"
grep -Fq "$PUBLIC_PREFIX/ai-video-higgsfield-mark.svg" "$LIVE_BODY" || fail "Live Higgsfield URL mismatch"
for bad in 'tabletV7' 'document.write' 'document.open' 'document.close' 'AI_VIDEO_TABLET_DESKTOP_CONTEXT_V7_TEST'; do
  ! grep -Fq "$bad" "$LIVE_BODY" || fail "Forbidden live marker: $bad"
done
while IFS= read -r asset; do
  code="$(curl -L -sS -o /dev/null -w '%{http_code}' "https://sikhadenge.in${asset}" || true)"
  [[ "$code" == "200" ]] || fail "Live V90.1 asset failed: $asset -> $code"
done <"$ASSET_LIST"
REG_CODE="$(curl -L -sS -o /dev/null -w '%{http_code}' "$REGISTER_URL" || true)"
[[ "$REG_CODE" == "200" ]] || fail "Registration destination failed after cutover: $REG_CODE"
[[ "$(pm2_value "$NEW_APP" status)" == "online" ]] || fail "New V90.1 PM2 app is not online"
[[ "$(pm2_value "$PREV_APP" status)" == "stopped" ]] || fail "V90 rollback app must remain stopped"
[[ "$(pm2_value "$ORIGINAL_APP" status)" == "stopped" ]] || fail "Original golden app must remain stopped"
HTML_ATTR_AFTER="$(lsattr -d "$GOLDEN_HTML" | awk '{print $1}')"
RUNTIME_ATTR_AFTER="$(lsattr -d "$GOLDEN_RUNTIME" | awk '{print $1}')"
RUNTIME_SHA_AFTER="$(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')"
[[ "$HTML_ATTR_AFTER" == *i* ]] || fail "Golden HTML lost immutable protection"
[[ "$RUNTIME_ATTR_AFTER" == *i* ]] || fail "Golden runtime lost immutable protection"
[[ "$RUNTIME_SHA_AFTER" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Golden runtime changed"
cat >"$STATE_FILE" <<EOF
DEPLOYED_AT=$TS
DEPLOY_SHA=$DEPLOY_SHA
NEW_RELEASE=$NEW_RELEASE
NEW_APP=$NEW_APP
PREV_APP=$PREV_APP
PREV_RELEASE=$PREV_RELEASE
ORIGINAL_APP=$ORIGINAL_APP
PORT=$PORT
PUBLIC_PREFIX=$PUBLIC_PREFIX
ASSET_DIR=$ASSET_DIR
GOLDEN_BACKUP=$GOLDEN_BACKUP
GOLDEN_RUNTIME_SHA=$RUNTIME_SHA_AFTER
EOF
pm2 save
CUTOVER=0

log "12/12 — Final V90.1 production status"
LIVE_CODE="$(curl -L -sS -o /dev/null -w '%{http_code}' "${LIVE_URL}?finalV901=${TS}")"
REG_CODE="$(curl -L -sS -o /dev/null -w '%{http_code}' "$REGISTER_URL")"
echo "======================================================"
echo "✅ AI VIDEO V90.1 PRODUCTION CUTOVER COMPLETE"
echo "======================================================"
echo "Live landing HTTP:     $LIVE_CODE"
echo "Registration HTTP:     $REG_CODE"
echo "New V90.1 app:         $NEW_APP ($(pm2_value "$NEW_APP" status))"
echo "V90 rollback app:      $PREV_APP ($(pm2_value "$PREV_APP" status))"
echo "Original golden app:   $ORIGINAL_APP ($(pm2_value "$ORIGINAL_APP" status))"
echo "Source commit:         $DEPLOY_SHA"
echo "Candidate release:     $NEW_RELEASE"
echo "Versioned asset path:  $PUBLIC_PREFIX"
echo "Golden backup:         $GOLDEN_BACKUP"
echo "Golden runtime SHA:    $RUNTIME_SHA_AFTER"
echo "Deployment state:      $STATE_FILE"
echo
echo "Next: run external live Chromium diagnostics, CTA E2E, section QA and Lighthouse verification."
