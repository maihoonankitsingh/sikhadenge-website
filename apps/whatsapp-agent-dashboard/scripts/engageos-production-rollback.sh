#!/usr/bin/env bash
set -Eeuo pipefail

: "${LIVE_APP:?LIVE_APP is required}"
: "${BACKUP_DIR:?BACKUP_DIR is required}"

PUBLIC_URL="${PUBLIC_URL:-https://whatsapp.sikhadenge.in}"

test -f "$BACKUP_DIR/deploy-state.txt"

state_value() {
  local key="$1"
  awk -F= -v key="$key" '$1 == key {sub($1 "=", ""); print; exit}' "$BACKUP_DIR/deploy-state.txt"
}

OLD_SOURCE_SHA="$(state_value OLD_SOURCE_SHA)"
OLD_BUILD_ID="$(state_value OLD_BUILD_ID)"
OLD_NEXT="$(state_value OLD_NEXT)"
FAILED_NEXT="$(state_value FAILED_NEXT)"
PM2_PROCESS_NAME="$(state_value PM2_PROCESS_NAME)"

: "${OLD_SOURCE_SHA:?missing OLD_SOURCE_SHA}"
: "${OLD_BUILD_ID:?missing OLD_BUILD_ID}"
: "${OLD_NEXT:?missing OLD_NEXT}"
: "${FAILED_NEXT:?missing FAILED_NEXT}"
: "${PM2_PROCESS_NAME:?missing PM2_PROCESS_NAME}"

current_build_id="$(cat "$LIVE_APP/.next/BUILD_ID" 2>/dev/null || true)"
if [[ "$current_build_id" != "$OLD_BUILD_ID" ]]; then
  test -d "$OLD_NEXT"
  if [[ -e "$FAILED_NEXT" ]]; then
    printf 'FAIL: failed-build preservation path already exists: %s\n' "$FAILED_NEXT" >&2
    exit 1
  fi
  mv "$LIVE_APP/.next" "$FAILED_NEXT"
  mv "$OLD_NEXT" "$LIVE_APP/.next"
fi

git -C "$LIVE_APP" reset --hard "$OLD_SOURCE_SHA"
test "$(git -C "$LIVE_APP" rev-parse HEAD)" = "$OLD_SOURCE_SHA"
test "$(cat "$LIVE_APP/.next/BUILD_ID")" = "$OLD_BUILD_ID"

pm2 restart "$PM2_PROCESS_NAME"
sleep 5

pm2_status="$(pm2 jlist | node - "$PM2_PROCESS_NAME" <<'NODE'
let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { raw += chunk; });
process.stdin.on('end', () => {
  const name = process.argv[2];
  const entry = JSON.parse(raw).find((item) => item.name === name);
  if (!entry) process.exit(1);
  process.stdout.write(String(entry.pm2_env?.status || ''));
});
NODE
)"
test "$pm2_status" = "online"

login_status="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "${PUBLIC_URL%/}/login")"
test "$login_status" = "200"

cat > "$BACKUP_DIR/rollback-evidence.txt" <<EOF
RESTORED_SOURCE_SHA=$OLD_SOURCE_SHA
RESTORED_BUILD_ID=$OLD_BUILD_ID
PM2_STATUS=$pm2_status
LOGIN_HTTP=$login_status
FAILED_BUILD_PATH=$FAILED_NEXT
ROLLED_BACK_UTC=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
DATABASE_SCHEMA_ROLLBACK=NOT_ATTEMPTED_ADDITIVE_FLAGS_OFF
EOF
chmod 600 "$BACKUP_DIR/rollback-evidence.txt"
cat "$BACKUP_DIR/rollback-evidence.txt"
printf 'PASS: APPLICATION_ROLLBACK_COMPLETE\n'
