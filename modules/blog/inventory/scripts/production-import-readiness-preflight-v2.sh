#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

PLAN="${1:-}"
PLAN_SUMMARY="${2:-}"
BATCH_REPORT="${3:-}"
OUT="${4:-/tmp/blog-production-import-readiness-v2-$(date +%Y%m%d_%H%M%S)}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
BASE_SCRIPT="$ROOT/modules/blog/inventory/scripts/production-import-readiness-preflight-v1.sh"
PATCHED_SCRIPT="$OUT/production-import-readiness-preflight.patched.sh"
EXPECTED_BASE_BLOB='d08c1adc83dd52d62f56ef97da2d91aff18cabe6'

fail() {
  mkdir -p "$OUT"
  printf 'BLOG_PRODUCTION_IMPORT_READINESS_V2_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

for command_name in bash git python3; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "$PLAN" && test -s "$PLAN" || fail 'plan_missing'
test -n "$PLAN_SUMMARY" && test -s "$PLAN_SUMMARY" || fail 'plan_summary_missing'
test -n "$BATCH_REPORT" && test -d "$BATCH_REPORT" || fail 'batch_report_missing'
test -s "$BASE_SCRIPT" || fail 'base_preflight_script_missing'
mkdir -p "$OUT"

ACTUAL_BASE_BLOB="$(git hash-object "$BASE_SCRIPT")"
test "$ACTUAL_BASE_BLOB" = "$EXPECTED_BASE_BLOB" || fail 'base_preflight_script_blob_mismatch'

python3 - "$BASE_SCRIPT" "$PATCHED_SCRIPT" <<'PY'
from pathlib import Path
import sys

source = Path(sys.argv[1])
target = Path(sys.argv[2])
text = source.read_text(encoding="utf-8")

old_commands = (
    "for command_name in psql pg_restore sha256sum stat find sort head df awk date flock node; do"
)
new_commands = (
    "for command_name in psql pg_restore sha256sum stat find sort head df awk date flock node readlink sleep; do"
)
if text.count(old_commands) != 1:
    raise SystemExit("command_list_patch_anchor_invalid")
text = text.replace(old_commands, new_commands, 1)

old_block = '''PG_DATA_DIRECTORY="$(psql "$DATABASE_URL" -X -Atc 'SHOW data_directory;')"
test -d "$PG_DATA_DIRECTORY" || fail 'postgres_data_directory_missing'
'''
new_block = '''PG_DATA_PROBE_APP="sikhadenge-blog-readiness-probe-$$"
PG_DATA_PROBE_LOG="$OUT/postgres-data-directory-probe.log"
PGAPPNAME="$PG_DATA_PROBE_APP" psql "$DATABASE_URL" -X -Atc "SELECT pg_sleep(30);" >"$PG_DATA_PROBE_LOG" 2>&1 &
PG_DATA_PROBE_CLIENT_PID=$!
PG_BACKEND_PID=""

cleanup_pg_data_probe() {
  if [ -n "${PG_DATA_PROBE_CLIENT_PID:-}" ]; then
    kill "$PG_DATA_PROBE_CLIENT_PID" >/dev/null 2>&1 || true
    wait "$PG_DATA_PROBE_CLIENT_PID" >/dev/null 2>&1 || true
    PG_DATA_PROBE_CLIENT_PID=""
  fi
}

for _probe_attempt in 1 2 3 4 5 6 7 8 9 10; do
  PG_BACKEND_PID="$(psql "$DATABASE_URL" -X -Atc "
    SELECT pid
    FROM pg_stat_activity
    WHERE application_name='${PG_DATA_PROBE_APP}'
      AND datname=current_database()
      AND usename=current_user
    ORDER BY backend_start DESC
    LIMIT 1;
  " || true)"
  [ -n "$PG_BACKEND_PID" ] && break
  sleep 1
done

if [ -z "$PG_BACKEND_PID" ]; then
  cleanup_pg_data_probe
  fail 'postgres_backend_probe_missing'
fi

case "$PG_BACKEND_PID" in *[!0-9]*|'')
  cleanup_pg_data_probe
  fail 'postgres_backend_pid_invalid'
  ;;
esac

PG_DATA_DIRECTORY="$(readlink -f "/proc/$PG_BACKEND_PID/cwd" 2>/dev/null || true)"
cleanup_pg_data_probe

test -n "$PG_DATA_DIRECTORY" && test -d "$PG_DATA_DIRECTORY" || fail 'postgres_data_directory_missing'
test -f "$PG_DATA_DIRECTORY/PG_VERSION" || fail 'postgres_data_directory_pg_version_missing'
test -d "$PG_DATA_DIRECTORY/base" || fail 'postgres_data_directory_base_missing'
test -d "$PG_DATA_DIRECTORY/global" || fail 'postgres_data_directory_global_missing'
'''
if text.count(old_block) != 1:
    raise SystemExit("postgres_data_directory_patch_anchor_invalid")
text = text.replace(old_block, new_block, 1)

target.write_text(text, encoding="utf-8")
target.chmod(0o700)
PY

test -s "$PATCHED_SCRIPT" || fail 'patched_preflight_script_missing'
grep -q 'PG_DATA_PROBE_APP=' "$PATCHED_SCRIPT" || fail 'active_backend_probe_patch_missing'
grep -q 'readlink -f "/proc/\$PG_BACKEND_PID/cwd"' "$PATCHED_SCRIPT" || fail 'backend_cwd_discovery_patch_missing'
if grep -q "SHOW data_directory" "$PATCHED_SCRIPT"; then
  fail 'privileged_data_directory_query_still_present'
fi

bash "$PATCHED_SCRIPT" "$PLAN" "$PLAN_SUMMARY" "$BATCH_REPORT" "$OUT"

test -s "$OUT/status.txt" || fail 'preflight_status_missing'
grep -qx 'BLOG_PRODUCTION_IMPORT_READINESS_STATUS=PASS' "$OUT/status.txt" || fail 'base_preflight_not_pass'
grep -qx 'DATABASE_WRITE_PERFORMED=NO' "$OUT/status.txt" || fail 'unexpected_database_write'
grep -qx 'BULK_IMPORT_APPROVED=NO' "$OUT/status.txt" || fail 'unexpected_bulk_import_approval'

cat >>"$OUT/status.txt" <<STATUS
POSTGRES_DATA_DIRECTORY_DISCOVERY=ACTIVE_TARGET_BACKEND_CWD
DATABASE_ROLE_SETTINGS_PRIVILEGE_REQUIRED=NO
DATABASE_ROLE_PRIVILEGES_CHANGED=NO
BLOG_PRODUCTION_IMPORT_READINESS_V2_STATUS=PASS
STATUS

tail -n 4 "$OUT/status.txt"
