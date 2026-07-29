#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

PACKAGE="${1:-}"
READINESS_REPORT="${2:-}"
OUT="${3:-}"
APPROVAL="${4:-}"

EXPECTED_APPROVAL='APPROVE EXISTING BLOG PRODUCTION IMPORT V1 RESUME AFTER SAFETY FIX'
ORIGINAL_APPROVAL='APPROVE EXISTING BLOG PRODUCTION IMPORT V1'
EXPECTED_BASE_BLOB='748d449c528033eb439da7c1dad18350de627450'

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
BASE_IMPORTER="$ROOT/modules/blog/inventory/scripts/import-existing-blog-batch-package-v1.sh"
PATCHED_IMPORTER="$OUT/import-existing-blog-batch-package-v1.resume-patched.sh"

fail() {
  mkdir -p "${OUT:-/tmp/blog-import-resume-failure}"
  printf 'BLOG_EXISTING_PRODUCTION_IMPORT_RESUME_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "${OUT:-UNSET}" >&2
  exit 1
}

for command_name in bash git python3 grep; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

[ "$APPROVAL" = "$EXPECTED_APPROVAL" ] || fail 'explicit_resume_approval_phrase_mismatch'
test -n "$PACKAGE" && test -d "$PACKAGE" || fail 'package_missing'
test -n "$READINESS_REPORT" && test -d "$READINESS_REPORT" || fail 'readiness_report_missing'
test -n "$OUT" && test -d "$OUT" || fail 'existing_import_report_missing'
test -s "$BASE_IMPORTER" || fail 'base_importer_missing'

ACTUAL_BASE_BLOB="$(git hash-object "$BASE_IMPORTER")"
[ "$ACTUAL_BASE_BLOB" = "$EXPECTED_BASE_BLOB" ] || fail 'base_importer_blob_mismatch'

python3 - "$BASE_IMPORTER" "$PATCHED_IMPORTER" <<'PY'
from pathlib import Path
import sys

source = Path(sys.argv[1])
target = Path(sys.argv[2])
text = source.read_text(encoding="utf-8")

old = "if grep -Eiq '(^|[[:space:]])(UPDATE|DELETE|TRUNCATE|DROP|ALTER)[[:space:]]' \"$SQL_FILE\"; then"
new = "if grep -Eiq '^[[:space:]]*(UPDATE|DELETE|TRUNCATE|DROP|ALTER)[[:space:]]' \"$SQL_FILE\"; then"

if text.count(old) != 1:
    raise SystemExit("forbidden_sql_scan_patch_anchor_invalid")

text = text.replace(old, new, 1)
target.write_text(text, encoding="utf-8")
target.chmod(0o700)
PY

test -s "$PATCHED_IMPORTER" || fail 'patched_importer_missing'
grep -Fqx "  if grep -Eiq '^[[:space:]]*(UPDATE|DELETE|TRUNCATE|DROP|ALTER)[[:space:]]' \"\$SQL_FILE\"; then" "$PATCHED_IMPORTER" || fail 'statement_anchored_scan_missing'
if grep -Fq "(^|[[:space:]])(UPDATE|DELETE|TRUNCATE|DROP|ALTER)" "$PATCHED_IMPORTER"; then
  fail 'broad_content_scanning_still_present'
fi

echo 'BLOG_EXISTING_PRODUCTION_IMPORT_RESUME_PATCH_STATUS=PASS'
echo 'BASE_IMPORTER_GIT_BLOB_VERIFIED=YES'
echo 'FORBIDDEN_SQL_SCAN=STATEMENT_ANCHORED'
echo 'QUOTED_CONTENT_KEYWORDS_ALLOWED=YES'
echo 'EXPLICIT_RESUME_APPROVAL_VERIFIED=YES'
echo "REPORT=$OUT"

exec bash "$PATCHED_IMPORTER" "$PACKAGE" "$READINESS_REPORT" "$OUT" "$ORIGINAL_APPROVAL"
