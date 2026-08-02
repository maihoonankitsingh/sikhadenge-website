#!/usr/bin/env bash
set -Eeuo pipefail

: "${LIVE_APP:?LIVE_APP is required}"
: "${STAGE_APP:?STAGE_APP is required}"
: "${RELEASE_SHA:?RELEASE_SHA is required}"
: "${BACKUP_DIR:?BACKUP_DIR is required}"

PM2_PROCESS_NAME="${PM2_PROCESS_NAME:-sikhadenge-whatsapp-agent}"
PUBLIC_URL="${PUBLIC_URL:-https://whatsapp.sikhadenge.in}"
ENV_FILE="${ENV_FILE:-${LIVE_APP}/.env}"

read_env_value() {
  local key="$1"
  local file="$2"
  node - "$file" "$key" <<'NODE'
const fs = require('node:fs');
const [file, key] = process.argv.slice(2);
if (!file || !key || !fs.existsSync(file)) process.exit(1);
const text = fs.readFileSync(file, 'utf8');
for (const rawLine of text.split(/\r?\n/)) {
  const line = rawLine.trim();
  if (!line || line.startsWith('#')) continue;
  const normalized = line.startsWith('export ') ? line.slice(7).trim() : line;
  const separator = normalized.indexOf('=');
  if (separator < 1 || normalized.slice(0, separator).trim() !== key) continue;
  let value = normalized.slice(separator + 1).trim();
  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")))
  ) {
    value = value.slice(1, -1);
  }
  process.stdout.write(value);
  process.exit(0);
}
process.exit(1);
NODE
}

psql_scalar() {
  psql "$DATABASE_CLI_URL" -X -v ON_ERROR_STOP=1 -Atqc "$1"
}

NEW_BUILD_ID="$(awk -F= '$1 == "NEW_BUILD_ID" {print $2}' "$BACKUP_DIR/deploy-state.txt")"
test -n "$NEW_BUILD_ID"
test "$(git -C "$LIVE_APP" rev-parse HEAD)" = "$RELEASE_SHA"
test "$(cat "$LIVE_APP/.next/BUILD_ID")" = "$NEW_BUILD_ID"

pm2_json="$(pm2 jlist)"
pm2_status="$(node - "$PM2_PROCESS_NAME" "$pm2_json" <<'NODE'
const [name, raw] = process.argv.slice(2);
const processEntry = JSON.parse(raw).find((entry) => entry.name === name);
if (!processEntry) process.exit(1);
process.stdout.write(String(processEntry.pm2_env?.status || ''));
NODE
)"
pm2_unstable="$(node - "$PM2_PROCESS_NAME" "$pm2_json" <<'NODE'
const [name, raw] = process.argv.slice(2);
const processEntry = JSON.parse(raw).find((entry) => entry.name === name);
if (!processEntry) process.exit(1);
process.stdout.write(String(processEntry.pm2_env?.unstable_restarts ?? 0));
NODE
)"
pm2_restarts="$(node - "$PM2_PROCESS_NAME" "$pm2_json" <<'NODE'
const [name, raw] = process.argv.slice(2);
const processEntry = JSON.parse(raw).find((entry) => entry.name === name);
if (!processEntry) process.exit(1);
process.stdout.write(String(processEntry.pm2_env?.restart_time ?? 0));
NODE
)"

test "$pm2_status" = "online"
test "$pm2_unstable" = "0"

login_status="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "${PUBLIC_URL%/}/login")"
inbox_status="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "${PUBLIC_URL%/}/inbox")"
contacts_status="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "${PUBLIC_URL%/}/contacts")"
analytics_status="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "${PUBLIC_URL%/}/analytics")"

test "$login_status" = "200"
[[ "$inbox_status" == "302" || "$inbox_status" == "307" ]]
[[ "$contacts_status" == "302" || "$contacts_status" == "307" ]]
[[ "$analytics_status" == "302" || "$analytics_status" == "307" ]]

VERIFY_TOKEN="$(read_env_value WHATSAPP_VERIFY_TOKEN "$ENV_FILE")"
challenge="$(curl -sS --get --max-time 20 \
  "${PUBLIC_URL%/}/api/webhooks/whatsapp" \
  --data-urlencode 'hub.mode=subscribe' \
  --data-urlencode "hub.verify_token=$VERIFY_TOKEN" \
  --data-urlencode 'hub.challenge=987654')"
test "$challenge" = "987654"

DATABASE_URL="$(read_env_value DATABASE_URL "$ENV_FILE")"
DATABASE_CLI_URL="$(node "$STAGE_APP/scripts/prisma-postgres-cli-url.mjs" "$DATABASE_URL")"
failed_migrations="$(psql_scalar 'SELECT COUNT(*) FROM _prisma_migrations WHERE finished_at IS NULL OR rolled_back_at IS NOT NULL;')"
baseline_count="$(psql_scalar "SELECT COUNT(*) FROM _prisma_migrations WHERE migration_name = '20260802000000_baseline_existing_schema' AND finished_at IS NOT NULL AND rolled_back_at IS NULL;")"
additive_count="$(psql_scalar "SELECT COUNT(*) FROM _prisma_migrations WHERE migration_name = '20260802174500_add_engageos_security_persistence' AND finished_at IS NOT NULL AND rolled_back_at IS NULL;")"
user_count="$(psql_scalar 'SELECT COUNT(*) FROM "DashboardUser";')"
membership_count="$(psql_scalar 'SELECT COUNT(*) FROM "EngageWorkspaceMembership" WHERE "workspaceId" = '\''engagews_default'\'';')"
flag_count="$(psql_scalar "SELECT COUNT(*) FROM \"EngageFeatureFlag\" WHERE \"workspaceId\" = 'engagews_default' AND key IN ('engageos.route_permissions','engageos.outbound_policy','engageos.webhook_replay');")"
enabled_flag_count="$(psql_scalar "SELECT COUNT(*) FROM \"EngageFeatureFlag\" WHERE \"workspaceId\" = 'engagews_default' AND enabled = true;")"

test "$failed_migrations" = "0"
test "$baseline_count" = "1"
test "$additive_count" = "1"
test "$membership_count" = "$user_count"
test "$flag_count" = "3"
test "$enabled_flag_count" = "0"

ERROR_LOG="/root/.pm2/logs/${PM2_PROCESS_NAME}-error.log"
ERROR_SIZE_BEFORE="$(cat "$BACKUP_DIR/error-log-size-before.txt")"
NEW_ERROR_LOG="$BACKUP_DIR/pm2-errors-after.txt"
if [[ -f "$ERROR_LOG" ]]; then
  current_size="$(stat -c '%s' "$ERROR_LOG")"
  if (( current_size > ERROR_SIZE_BEFORE )); then
    tail -c "+$((ERROR_SIZE_BEFORE + 1))" "$ERROR_LOG" > "$NEW_ERROR_LOG"
  else
    : > "$NEW_ERROR_LOG"
  fi
else
  : > "$NEW_ERROR_LOG"
fi
chmod 600 "$NEW_ERROR_LOG"
if grep -Eqi 'Unhandled|PrismaClientInitializationError|EADDRINUSE|FATAL|uncaught exception' "$NEW_ERROR_LOG"; then
  cat "$NEW_ERROR_LOG" >&2
  printf 'FAIL: fatal PM2 error detected after activation\n' >&2
  exit 1
fi

cat > "$BACKUP_DIR/post-deploy-evidence.txt" <<EOF
RELEASE_SHA=$RELEASE_SHA
BUILD_ID=$NEW_BUILD_ID
PM2_STATUS=$pm2_status
PM2_RESTARTS=$pm2_restarts
PM2_UNSTABLE_RESTARTS=$pm2_unstable
LOGIN_HTTP=$login_status
INBOX_HTTP=$inbox_status
CONTACTS_HTTP=$contacts_status
ANALYTICS_HTTP=$analytics_status
WEBHOOK_CHALLENGE=$challenge
BASELINE_COUNT=$baseline_count
ADDITIVE_COUNT=$additive_count
DASHBOARD_USER_COUNT=$user_count
DEFAULT_MEMBERSHIP_COUNT=$membership_count
FEATURE_FLAGS_ENABLED=$enabled_flag_count
VERIFIED_UTC=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
EOF
chmod 600 "$BACKUP_DIR/post-deploy-evidence.txt"

cat "$BACKUP_DIR/post-deploy-evidence.txt"
printf 'PASS: POST_DEPLOY_VERIFICATION_COMPLETE\n'
