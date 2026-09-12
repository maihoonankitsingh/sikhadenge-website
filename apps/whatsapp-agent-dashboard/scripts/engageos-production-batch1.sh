#!/usr/bin/env bash
# Production rollout marker: Page 01 hero asset delivery + cache-bust diagnostic — 2026-09-12
# Production rollout marker: Page 01 bundled LEFT hero asset hotfix — 2026-09-12
# Production rollout marker: Page 01 generated LEFT visual + genuine SikhaDenge logo overlay; RIGHT auth unchanged — 2026-09-12
# Production rollout marker: Page 01 code-native DOM/CSS/SVG + real SikhaDenge asset — 2026-09-12
# Production rollout marker: Page 01 approved reference exact visual — 2026-09-12
# Production rollout marker: Page 01 approved split-screen responsive UI — 2026-09-12
# Production rollout marker: Page 01 original SikhaDenge logo + responsive exact reference deploy — 2026-09-12
# Production rollout marker: Page 01 pixel-reference exact live — 2026-09-12
# Retry marker: dedicated GitHub Actions SSH port 2222 configured on 2026-08-03
# CI marker: validate canonical pinned host entry workflow fix on 2026-08-03
# Retry marker: keep release branch stable during production execution on 2026-08-03
# Production rollout marker: validated EngageOS + Enterprise UI release on 2026-09-10
# Production rollout marker: final UI/UX audit closure deploy on 2026-09-11
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

probe_page01_asset() {
  local label="$1"
  local probe_file
  local headers_file
  local http_status
  local byte_count
  local magic_hex
  local content_type
  probe_file="$(mktemp)"
  headers_file="$(mktemp)"
  http_status="$(curl -sS -L -D "$headers_file" -o "$probe_file" -w '%{http_code}' "${PUBLIC_URL}/page01-left-generated-crop.webp?probe=${RUN_ID}-${label}")"
  byte_count="$(wc -c < "$probe_file" | tr -d ' ')"
  magic_hex="$(od -An -tx1 -N12 "$probe_file" | tr -d ' \n')"
  content_type="$(awk 'BEGIN{IGNORECASE=1} /^content-type:/ {gsub("\r", ""); sub(/^[^:]*:[[:space:]]*/, ""); value=$0} END{print value}' "$headers_file")"
  printf 'PAGE01_ASSET_%s_HTTP=%s\n' "$label" "$http_status"
  printf 'PAGE01_ASSET_%s_BYTES=%s\n' "$label" "$byte_count"
  printf 'PAGE01_ASSET_%s_CONTENT_TYPE=%s\n' "$label" "$content_type"
  printf 'PAGE01_ASSET_%s_MAGIC=%s\n' "$label" "$magic_hex"
  rm -f "$probe_file" "$headers_file"
}

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

printf '===== GATE: HIGH-RISK FLAGS FAIL-CLOSED =====\n'
ENV_FILE="$ENV_FILE" \
bash "$STAGE_APP/scripts/engageos-production-high-risk-flag-gate.sh"

printf '===== TASK 1/5: VERIFIED DATABASE BACKUP =====\n'
bash "$STAGE_APP/scripts/engageos-production-backup.sh"
test -s "$BACKUP_DIR/database.dump"
test -s "$BACKUP_DIR/database.dump.sha256"
sha256sum --check "$BACKUP_DIR/database.dump.sha256"

printf '===== TASK 2/5: GUARDED PHASE 2 MIGRATION =====\n'
bash "$STAGE_APP/scripts/engageos-production-migrate.sh"

printf '===== PAGE 01 ASSET DELIVERY BEFORE ACTIVATION =====\n'
probe_page01_asset BEFORE

printf '===== TASK 3/5: ISOLATED BUILD AND ATOMIC ACTIVATION =====\n'
bash "$STAGE_APP/scripts/engageos-production-build-deploy.sh"

printf '===== PAGE 01 ASSET DELIVERY AFTER ACTIVATION =====\n'
probe_page01_asset AFTER

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
