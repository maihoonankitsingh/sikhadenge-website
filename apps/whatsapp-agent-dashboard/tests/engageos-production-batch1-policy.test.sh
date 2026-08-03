#!/usr/bin/env bash
set -Eeuo pipefail

workflow_path="../../.github/workflows/whatsapp-agent-production-batch1.yml"
script_root="scripts"
lineage_test="tests/engageos-production-migration-lineage.integration.sh"

scripts=(
  "$script_root/engageos-production-backup.sh"
  "$script_root/engageos-production-migrate.sh"
  "$script_root/engageos-production-build-deploy.sh"
  "$script_root/engageos-production-verify.sh"
  "$script_root/engageos-production-rollback.sh"
  "$script_root/engageos-production-batch1.sh"
)

for script_path in "${scripts[@]}" "$lineage_test"; do
  test -f "$script_path"
  bash -n "$script_path"
done

test -f "$workflow_path"

forbidden_patterns=(
  'git[[:space:]]+clean'
  'rm[[:space:]]+-rf'
  'source[[:space:]]+.*\.env'
  '(^|[[:space:]])\.[[:space:]]+.*\.env'
  'ssh-keyscan'
  'echo[[:space:]].*DATABASE_URL'
  'printf[[:space:]].*DATABASE_URL'
)

for pattern in "${forbidden_patterns[@]}"; do
  if grep -En "$pattern" "${scripts[@]}" "$workflow_path"; then
    printf 'Forbidden production automation pattern detected: %s\n' "$pattern" >&2
    exit 1
  fi
done

backup_script="$script_root/engageos-production-backup.sh"
grep -Fq 'pg_dump --format=custom --no-owner --no-privileges' "$backup_script"
grep -Fq 'pg_restore --list' "$backup_script"
grep -Fq 'sha256sum "$DUMP_FILE"' "$backup_script"
grep -Fq 'PASS: VERIFIED_DATABASE_BACKUP_CREATED' "$backup_script"

migration_script="$script_root/engageos-production-migrate.sh"
grep -Fq '20260723160037_init_whatsapp_agent' "$migration_script"
grep -Fq '20260802000000_baseline_existing_schema' "$migration_script"
grep -Fq '20260802174500_add_engageos_security_persistence' "$migration_script"
grep -Fq 'prisma migrate resolve --applied' "$migration_script"
grep -Fq 'prisma migrate deploy' "$migration_script"
grep -Fq 'enabled_flag_count' "$migration_script"
grep -Fq 'ENGAGEOS_SECURITY_PERSISTENCE_ENABLED must remain absent or false' "$migration_script"
grep -Fq 'PASS: ENGAGEOS_MIGRATION_VERIFIED_FLAGS_OFF' "$migration_script"

build_script="$script_root/engageos-production-build-deploy.sh"
grep -Fq 'npm run typecheck' "$build_script"
grep -Fq 'NODE_ENV=production npm run build' "$build_script"
grep -Fq 'merge --ff-only' "$build_script"
grep -Fq 'backup/vps-before-engageos-' "$build_script"
grep -Fq 'mv "$LIVE_APP/.next" "$OLD_NEXT"' "$build_script"
grep -Fq 'pm2 restart "$PM2_PROCESS_NAME"' "$build_script"
grep -Fq 'npx prisma generate' "$build_script"
state_line="$(grep -nF 'cat > "$BACKUP_DIR/deploy-state.txt"' "$build_script" | cut -d: -f1)"
merge_line="$(grep -nF 'merge --ff-only' "$build_script" | cut -d: -f1)"
test -n "$state_line"
test -n "$merge_line"
test "$state_line" -lt "$merge_line"

verify_script="$script_root/engageos-production-verify.sh"
grep -Fq 'cat "$LIVE_APP/.next/BUILD_ID"' "$verify_script"
grep -Fq '/api/webhooks/whatsapp' "$verify_script"
grep -Fq 'hub.challenge=987654' "$verify_script"
grep -Fq 'enabled_flag_count' "$verify_script"
grep -Fq 'PASS: POST_DEPLOY_VERIFICATION_COMPLETE' "$verify_script"

rollback_script="$script_root/engageos-production-rollback.sh"
grep -Fq 'git -C "$LIVE_APP" reset --hard "$OLD_SOURCE_SHA"' "$rollback_script"
grep -Fq 'mv "$OLD_NEXT" "$LIVE_APP/.next"' "$rollback_script"
grep -Fq 'npx prisma generate' "$rollback_script"
grep -Fq 'DATABASE_SCHEMA_ROLLBACK=NOT_ATTEMPTED_ADDITIVE_FLAGS_OFF' "$rollback_script"
if grep -Eqi 'DROP[[:space:]]+TABLE|TRUNCATE[[:space:]]+TABLE|DELETE[[:space:]]+FROM|ALTER[[:space:]]+TABLE' "$rollback_script"; then
  printf 'Rollback script must not destructively mutate the database.\n' >&2
  exit 1
fi

orchestrator="$script_root/engageos-production-batch1.sh"
for task in 'TASK 1/5' 'TASK 2/5' 'TASK 3/5' 'TASK 4/5' 'TASK 5/5'; do
  grep -Fq "$task" "$orchestrator"
done
grep -Fq 'engageos-production-preflight.sh' "$orchestrator"
grep -Fq 'engageos-production-rollback.sh' "$orchestrator"
grep -Fq 'PASS: ENGAGEOS_PRODUCTION_BATCH_1_COMPLETE' "$orchestrator"

for required_text in \
  'workflow_dispatch:' \
  'default: false' \
  '[production-batch1]' \
  'environment: whatsapp-agent-production' \
  'WHATSAPP_PROD_HOST' \
  'WHATSAPP_PROD_USER' \
  'WHATSAPP_PROD_SSH_PRIVATE_KEY' \
  'WHATSAPP_PROD_SSH_HOST_KEY' \
  'StrictHostKeyChecking=yes' \
  'Verify pinned SSH transport' \
  'ConnectTimeout=15' \
  'PASS: PINNED_SSH_TRANSPORT_VERIFIED' \
  ': > production-batch.log' \
  'npm install --include=dev --no-audit --no-fund' \
  'actions/upload-artifact@v4'; do
  grep -Fq "$required_text" "$workflow_path"
done

if grep -Fq 'ln -s "$LIVE_APP/node_modules"' "$workflow_path"; then
  printf 'Production stage must not share live node_modules.\n' >&2
  exit 1
fi

grep -Fq 'test -z "$(git status --porcelain --untracked-files=no)"' "$workflow_path"
grep -Fq 'git merge-base --is-ancestor HEAD "$TARGET_SHA"' "$workflow_path"
grep -Fq 'git -C "$LIVE_APP" worktree remove --force' "$workflow_path"

grep -Fq 'a17a92761bebc93eea76c7c443933b5a0c3443e3' "$lineage_test"
grep -Fq '20260723160037_init_whatsapp_agent' "$lineage_test"
grep -Fq 'npm run test:production-migration-lineage:integration' ../../.github/workflows/whatsapp-agent-ci.yml

printf 'EngageOS production batch 1 policy test passed.\n'
