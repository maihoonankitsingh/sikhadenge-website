#!/usr/bin/env bash
# Retry marker: dedicated GitHub Actions SSH port 2222 configured on 2026-08-03
# CI marker: validate canonical pinned host entry workflow fix on 2026-08-03
# Retry marker: keep release branch stable during production execution on 2026-08-03
set -Eeuo pipefail

: "${LIVE_APP:?LIVE_APP is required}"
: "${STAGE_APP:?STAGE_APP is required}"
: "${RELEASE_SHA:?RELEASE_SHA is required}"
: "${RUN_ID:?RUN_ID is required}"

PM2_PROCESS_NAME="${PM2_PROCESS_NAME:-sikhadenge-whatsapp-agent}"
PUBLIC_URL="${PUBLIC_URL:-https://whatsapp.sikhadenge.in}"
BACKUP_ROOT="${BACKUP_ROOT:-/root/sikhadenge-backups}"
BACKUP_DIR="${BACKUP_ROOT}/engageos-${RUN_ID}"
ENV_FILE="${ENV_FILE:-${LIVE_APP}/.env}"

export LIVE_APP STAGE_APP RELEASE_SHA RUN_ID PM2_PROCESS_NAME PUBLIC_URL
export BACKUP_ROOT BACKUP_DIR ENV_FILE

rollback_on_error() {
  local exit_code=$?
  trap - ERR
  printf 'FAIL: PRODUCTION_BATCH_1_FAILED code=%s\n' "$exit_code" >&2
  if [[ -f "$BACKUP_DIR/deploy-state.txt" ]]; then
    printf 'INFO: activation state exists; starting automatic application rollback\n' >&2
    if bash "$STAGE_APP/scripts/engageos-production-rollback.sh"; then
      printf 'PASS: AUTOMATIC_ROLLBACK_COMPLETED\n' >&2
    else
      printf 'CRITICAL: AUTOMATIC_ROLLBACK_FAILED\n' >&2
    fi
  else
    printf 'INFO: activation did not begin; application rollback not required\n' >&2
  fi
  exit "$exit_code"
}
trap rollback_on_error ERR

printf 'ENGAGEOS_PRODUCTION_BATCH_1_BEGIN\n'
printf 'RUN_ID=%s\n' "$RUN_ID"
printf 'RELEASE_SHA=%s\n' "$RELEASE_SHA"
printf 'STARTED_UTC=%s\n' "$(date -u +'%Y-%m-%dT%H:%M:%SZ')"

test "$(git -C "$STAGE_APP" rev-parse HEAD)" = "$RELEASE_SHA"
test -z "$(git -C "$LIVE_APP" status --porcelain --untracked-files=no)"
git -C "$LIVE_APP" merge-base --is-ancestor "$(git -C "$LIVE_APP" rev-parse HEAD)" "$RELEASE_SHA"

printf '===== GATE: READ-ONLY PREFLIGHT =====\n'
EXPECTED_RELEASE_SHA="$RELEASE_SHA" \
ENV_FILE="$ENV_FILE" \
PM2_PROCESS_NAME="$PM2_PROCESS_NAME" \
CHECK_HTTP_URL="$PUBLIC_URL" \
VERIFY_PG_DUMP=1 \
bash "$STAGE_APP/scripts/engageos-production-preflight.sh"

printf '===== TASK 1/5: VERIFIED DATABASE BACKUP =====\n'
bash "$STAGE_APP/scripts/engageos-production-backup.sh"
test -s "$BACKUP_DIR/database.dump"
test -s "$BACKUP_DIR/database.dump.sha256"
sha256sum --check "$BACKUP_DIR/database.dump.sha256"

printf '===== TASK 2/5: GUARDED PHASE 2 MIGRATION =====\n'
bash "$STAGE_APP/scripts/engageos-production-migrate.sh"

printf '===== TASK 3/5: ISOLATED BUILD AND ATOMIC ACTIVATION =====\n'
bash "$STAGE_APP/scripts/engageos-production-build-deploy.sh"

printf '===== TASK 4/5: POST-DEPLOY VERIFICATION =====\n'
bash "$STAGE_APP/scripts/engageos-production-verify.sh"

printf '===== TASK 5/5: ROLLBACK READINESS EVIDENCE =====\n'
test -f "$BACKUP_DIR/deploy-state.txt"
test -d "$(awk -F= '$1 == "OLD_NEXT" {sub($1 "=", ""); print; exit}' "$BACKUP_DIR/deploy-state.txt")"
test -f "$BACKUP_DIR/source-before.sha"
test -f "$BACKUP_DIR/build-before.id"
printf 'PASS: ROLLBACK_ARTIFACTS_PRESERVED\n'

cat > "$BACKUP_DIR/batch-result.txt" <<EOF
RUN_ID=$RUN_ID
RELEASE_SHA=$RELEASE_SHA
STATUS=PASS
BACKUP_MANIFEST=$BACKUP_DIR/manifest.txt
MIGRATION_EVIDENCE=$BACKUP_DIR/migration-evidence.txt
POST_DEPLOY_EVIDENCE=$BACKUP_DIR/post-deploy-evidence.txt
COMPLETED_UTC=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
EOF
chmod 600 "$BACKUP_DIR/batch-result.txt"
cat "$BACKUP_DIR/batch-result.txt"
printf 'PASS: ENGAGEOS_PRODUCTION_BATCH_1_COMPLETE\n'
printf 'ENGAGEOS_PRODUCTION_BATCH_1_END\n'
