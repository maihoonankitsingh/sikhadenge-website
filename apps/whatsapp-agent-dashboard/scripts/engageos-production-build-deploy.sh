#!/usr/bin/env bash
set -Eeuo pipefail

: "${LIVE_APP:?LIVE_APP is required}"
: "${STAGE_APP:?STAGE_APP is required}"
: "${RELEASE_SHA:?RELEASE_SHA is required}"
: "${RUN_ID:?RUN_ID is required}"
: "${BACKUP_DIR:?BACKUP_DIR is required}"

PM2_PROCESS_NAME="${PM2_PROCESS_NAME:-sikhadenge-whatsapp-agent}"
RELEASE_BRANCH="${RELEASE_BRANCH:-release/whatsapp-instagram-agent-flow-20260731}"
OLD_SOURCE_SHA="$(cat "$BACKUP_DIR/source-before.sha")"
OLD_BUILD_ID="$(cat "$BACKUP_DIR/build-before.id")"
OLD_NEXT="$LIVE_APP/.next-before-engageos-${RUN_ID}"
STAGED_NEXT="$LIVE_APP/.next-stage-engageos-${RUN_ID}"
FAILED_NEXT="$LIVE_APP/.next-failed-engageos-${RUN_ID}"

PM2_JSON_FILE="$(mktemp)"
trap 'rm -f "$PM2_JSON_FILE"' EXIT
pm2 jlist > "$PM2_JSON_FILE"
RUNTIME_APP="$(node - "$PM2_PROCESS_NAME" "$PM2_JSON_FILE" <<'NODE'
const fs = require('node:fs');
const [name, file] = process.argv.slice(2);
const entry = JSON.parse(fs.readFileSync(file, 'utf8')).find((item) => item.name === name);
if (!entry) process.exit(1);
process.stdout.write(String(entry.pm2_env?.pm_cwd || ''));
NODE
)"
rm -f "$PM2_JSON_FILE"
trap - EXIT

if [[ -z "$RUNTIME_APP" ]]; then
  RUNTIME_APP="$LIVE_APP"
fi
case "$RUNTIME_APP" in
  /var/www/sikhadenge-whatsapp-agent/*) ;;
  *)
    printf 'FAIL: unexpected PM2 runtime cwd: %s\n' "$RUNTIME_APP" >&2
    exit 1
    ;;
esac

test -d "$RUNTIME_APP"
test -d "$RUNTIME_APP/.next"
OLD_RUNTIME_BUILD_ID="$(cat "$RUNTIME_APP/.next/BUILD_ID")"
test -n "$OLD_RUNTIME_BUILD_ID"

RUNTIME_OLD_NEXT="$RUNTIME_APP/.next-before-engageos-${RUN_ID}"
RUNTIME_STAGED_NEXT="$RUNTIME_APP/.next-stage-engageos-${RUN_ID}"
RUNTIME_FAILED_NEXT="$RUNTIME_APP/.next-failed-engageos-${RUN_ID}"

cleanup_staged_next() {
  if [[ -d "$STAGED_NEXT" ]]; then
    find "$STAGED_NEXT" -depth -delete
  fi
  if [[ "$RUNTIME_APP" != "$LIVE_APP" && -d "$RUNTIME_STAGED_NEXT" ]]; then
    find "$RUNTIME_STAGED_NEXT" -depth -delete
  fi
}
trap cleanup_staged_next ERR

test "$(git -C "$STAGE_APP" rev-parse HEAD)" = "$RELEASE_SHA"
test -d "$STAGE_APP/node_modules"
test -f "$STAGE_APP/.env"
test -s "$STAGE_APP/public/sikhadenge-header-safe-320.png"
printf 'PASS: PAGE01_CODE_NATIVE_ASSET_GATE\n'

cd "$STAGE_APP"
npx prisma generate
npm run typecheck
NODE_ENV=production npm run build

NEW_BUILD_ID="$(cat "$STAGE_APP/.next/BUILD_ID")"
test -n "$NEW_BUILD_ID"
test "$NEW_BUILD_ID" != "$OLD_BUILD_ID"

cleanup_staged_next
cp -a "$STAGE_APP/.next" "$STAGED_NEXT"
test "$(cat "$STAGED_NEXT/BUILD_ID")" = "$NEW_BUILD_ID"

if [[ "$RUNTIME_APP" != "$LIVE_APP" ]]; then
  cp -a "$STAGE_APP/.next" "$RUNTIME_STAGED_NEXT"
  test "$(cat "$RUNTIME_STAGED_NEXT/BUILD_ID")" = "$NEW_BUILD_ID"
fi

current_branch="$(git -C "$LIVE_APP" branch --show-current)"
test "$current_branch" = "$RELEASE_BRANCH"
test "$(git -C "$LIVE_APP" rev-parse HEAD)" = "$OLD_SOURCE_SHA"
test -z "$(git -C "$LIVE_APP" status --porcelain --untracked-files=no)"
git -C "$LIVE_APP" merge-base --is-ancestor "$OLD_SOURCE_SHA" "$RELEASE_SHA"

if [[ -e "$OLD_NEXT" ]]; then
  printf 'FAIL: rollback build path already exists: %s\n' "$OLD_NEXT" >&2
  exit 1
fi
if [[ -e "$FAILED_NEXT" ]]; then
  printf 'FAIL: failed-build path already exists: %s\n' "$FAILED_NEXT" >&2
  exit 1
fi
if [[ "$RUNTIME_APP" != "$LIVE_APP" ]]; then
  if [[ -e "$RUNTIME_OLD_NEXT" ]]; then
    printf 'FAIL: runtime rollback build path already exists: %s\n' "$RUNTIME_OLD_NEXT" >&2
    exit 1
  fi
  if [[ -e "$RUNTIME_FAILED_NEXT" ]]; then
    printf 'FAIL: runtime failed-build path already exists: %s\n' "$RUNTIME_FAILED_NEXT" >&2
    exit 1
  fi
fi

ERROR_LOG="/root/.pm2/logs/${PM2_PROCESS_NAME}-error.log"
if [[ -f "$ERROR_LOG" ]]; then
  stat -c '%s' "$ERROR_LOG" > "$BACKUP_DIR/error-log-size-before.txt"
else
  printf '0\n' > "$BACKUP_DIR/error-log-size-before.txt"
fi

cat > "$BACKUP_DIR/deploy-state.txt" <<EOF
LIVE_APP=$LIVE_APP
RUNTIME_APP=$RUNTIME_APP
RELEASE_SHA=$RELEASE_SHA
OLD_SOURCE_SHA=$OLD_SOURCE_SHA
OLD_BUILD_ID=$OLD_BUILD_ID
OLD_RUNTIME_BUILD_ID=$OLD_RUNTIME_BUILD_ID
NEW_BUILD_ID=$NEW_BUILD_ID
OLD_NEXT=$OLD_NEXT
FAILED_NEXT=$FAILED_NEXT
RUNTIME_OLD_NEXT=$RUNTIME_OLD_NEXT
RUNTIME_FAILED_NEXT=$RUNTIME_FAILED_NEXT
PM2_PROCESS_NAME=$PM2_PROCESS_NAME
PREPARED_UTC=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
EOF
chmod 600 "$BACKUP_DIR/deploy-state.txt"

git -C "$LIVE_APP" branch "backup/vps-before-engageos-${RUN_ID}" "$OLD_SOURCE_SHA"
git -C "$LIVE_APP" merge --ff-only "$RELEASE_SHA"
test "$(git -C "$LIVE_APP" rev-parse HEAD)" = "$RELEASE_SHA"

# The login page is code-native. Only real brand/static assets are synced into
# the separate PM2 runtime tree when production is serving from a mirror release.
if [[ "$RUNTIME_APP" != "$LIVE_APP" ]]; then
  install -d -m 755 "$RUNTIME_APP/public"
  install -m 644 "$LIVE_APP/public/sikhadenge-header-safe-320.png" "$RUNTIME_APP/public/sikhadenge-header-safe-320.png"
  if [[ -f "$LIVE_APP/public/sikhadenge-official-logo.png" ]]; then
    install -m 644 "$LIVE_APP/public/sikhadenge-official-logo.png" "$RUNTIME_APP/public/sikhadenge-official-logo.png"
  fi
fi
printf 'PASS: PAGE01_CODE_NATIVE_PUBLIC_ASSETS_SYNCED\n'

cd "$LIVE_APP"
npx prisma generate

mv "$LIVE_APP/.next" "$OLD_NEXT"
mv "$STAGED_NEXT" "$LIVE_APP/.next"
test "$(cat "$LIVE_APP/.next/BUILD_ID")" = "$NEW_BUILD_ID"

if [[ "$RUNTIME_APP" != "$LIVE_APP" ]]; then
  mv "$RUNTIME_APP/.next" "$RUNTIME_OLD_NEXT"
  mv "$RUNTIME_STAGED_NEXT" "$RUNTIME_APP/.next"
  test "$(cat "$RUNTIME_APP/.next/BUILD_ID")" = "$NEW_BUILD_ID"
fi

printf 'ACTIVATED_UTC=%s\n' "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" >> "$BACKUP_DIR/deploy-state.txt"

pm2 restart "$PM2_PROCESS_NAME"
sleep 5

test "$(cat "$LIVE_APP/.next/BUILD_ID")" = "$NEW_BUILD_ID"
test "$(cat "$RUNTIME_APP/.next/BUILD_ID")" = "$NEW_BUILD_ID"
printf 'RUNTIME_APP=%s\n' "$RUNTIME_APP"
printf 'OLD_RUNTIME_BUILD_ID=%s\n' "$OLD_RUNTIME_BUILD_ID"
printf 'NEW_BUILD_ID=%s\n' "$NEW_BUILD_ID"
printf 'ROLLBACK_BUILD_PATH=%s\n' "$OLD_NEXT"
if [[ "$RUNTIME_APP" != "$LIVE_APP" ]]; then
  printf 'RUNTIME_ROLLBACK_BUILD_PATH=%s\n' "$RUNTIME_OLD_NEXT"
fi
printf 'PASS: RELEASE_BUILD_ACTIVATED\n'
