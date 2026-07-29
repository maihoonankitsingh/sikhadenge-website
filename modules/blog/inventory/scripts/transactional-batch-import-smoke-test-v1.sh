#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

PLAN="${1:-}"
PLAN_SUMMARY="${2:-}"
OUT="${3:-/tmp/blog-existing-batch-import-smoke-v1-$(date +%Y%m%d_%H%M%S)}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
BASE_SCRIPT="$ROOT/modules/blog/inventory/scripts/transactional-sample-import-smoke-test.sh"
PATCHED_SCRIPT="$OUT/transactional-batch-import-smoke-test.patched.sh"
EXPECTED_BASE_BLOB='0cd447da5cd9caf61e2932b1b9624d27f8226c0c'
EXPECTED_BATCH_RECORDS='1000'
EXPECTED_BATCH_ROWS='3000'

fail() {
  printf 'BLOG_TRANSACTIONAL_BATCH_IMPORT_V1_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

for command_name in bash date git python3; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "$PLAN" && test -s "$PLAN" || fail 'plan_missing'
test -n "$PLAN_SUMMARY" && test -s "$PLAN_SUMMARY" || fail 'plan_summary_missing'
test -s "$BASE_SCRIPT" || fail 'base_smoke_script_missing'
mkdir -p "$OUT"

ACTUAL_BASE_BLOB="$(git hash-object "$BASE_SCRIPT")"
test "$ACTUAL_BASE_BLOB" = "$EXPECTED_BASE_BLOB" || fail 'base_smoke_script_blob_mismatch'

python3 - "$BASE_SCRIPT" "$PATCHED_SCRIPT" <<'PY'
from pathlib import Path
import sys

source = Path(sys.argv[1])
target = Path(sys.argv[2])
text = source.read_text(encoding="utf-8")

replacements = [
    (
        "const positions = new Set([1, Math.floor(EXPECTED_RECORDS / 2) + 1, EXPECTED_RECORDS]);",
        "const SAMPLE_RECORDS = 1000;\n"
        "const positions = new Set(\n"
        "  Array.from({ length: SAMPLE_RECORDS }, (_, index) =>\n"
        "    1 + Math.floor((index * (EXPECTED_RECORDS - 1)) / (SAMPLE_RECORDS - 1)),\n"
        "  ),\n"
        ");",
    ),
    (
        "if (selected.length !== 3) die('sample_selection_count_mismatch');",
        "if (selected.length !== SAMPLE_RECORDS) die('sample_selection_count_mismatch');",
    ),
    (
        "if ([pageIds, versionIds, fingerprintIds, slugs, exactHashes].some((set) => set.size !== 3)) {",
        "if ([pageIds, versionIds, fingerprintIds, slugs, exactHashes].some((set) => set.size !== SAMPLE_RECORDS)) {",
    ),
    (
        "SET LOCAL statement_timeout = '120s';",
        "SET LOCAL statement_timeout = '300s';",
    ),
    (
        "SET LOCAL idle_in_transaction_session_timeout = '120s';",
        "SET LOCAL idle_in_transaction_session_timeout = '300s';",
    ),
    (
        '      priority, "sourceRecordKey", metadata\n'
        '    ) VALUES (',
        '      priority, "sourceRecordKey", metadata, "createdAt", "updatedAt"\n'
        '    ) VALUES (',
    ),
    (
        '      ${sqlJson(page.metadata)}\n'
        '    );`);',
        '      ${sqlJson(page.metadata)}, now(), now()\n'
        '    );`);',
    ),
    (
        '      "generatedBy", "generationPromptHash", notes, "createdBy"\n'
        '    ) VALUES (',
        '      "generatedBy", "generationPromptHash", notes, "createdBy", "createdAt", "updatedAt"\n'
        '    ) VALUES (',
    ),
    (
        '      ${sqlText(version.generationPromptHash)}, ${sqlText(version.notes)}, ${sqlText(version.createdBy)}\n'
        '    );`);',
        '      ${sqlText(version.generationPromptHash)}, ${sqlText(version.notes)}, ${sqlText(version.createdBy)},\n'
        '      now(), now()\n'
        '    );`);',
    ),
    (
        '      "minHash", "simHash", "tokenCount", shingles, metadata\n'
        '    ) VALUES (',
        '      "minHash", "simHash", "tokenCount", shingles, metadata, "createdAt"\n'
        '    ) VALUES (',
    ),
    (
        '      ${sqlJson(fingerprint.metadata)}\n'
        '    );`);',
        '      ${sqlJson(fingerprint.metadata)}, now()\n'
        '    );`);',
    ),
    (
        "WHERE id IN (${pageIdList})) <> 3 THEN",
        "WHERE id IN (${pageIdList})) <> ${SAMPLE_RECORDS} THEN",
    ),
    (
        "WHERE id IN (${versionIdList})) <> 3 THEN",
        "WHERE id IN (${versionIdList})) <> ${SAMPLE_RECORDS} THEN",
    ),
    (
        "WHERE id IN (${fingerprintIdList})) <> 3 THEN",
        "WHERE id IN (${fingerprintIdList})) <> ${SAMPLE_RECORDS} THEN",
    ),
    (
        "RAISE EXCEPTION 'Expected three sample pages inside transaction';",
        "RAISE EXCEPTION 'Expected complete page batch inside transaction';",
    ),
    (
        "RAISE EXCEPTION 'Expected three sample versions inside transaction';",
        "RAISE EXCEPTION 'Expected complete version batch inside transaction';",
    ),
    (
        "RAISE EXCEPTION 'Expected three sample fingerprints inside transaction';",
        "RAISE EXCEPTION 'Expected complete fingerprint batch inside transaction';",
    ),
    (
        'FIRST_SLUG="$(node -e "const x=require(process.argv[1]); process.stdout.write(x[0].record.page.slug)" "$SAMPLE_JSON")"',
        'FIRST_SLUG="$(node -e "const x=require(process.argv[1]); process.stdout.write(x[0].record.page.slug)" "$SAMPLE_JSON")"',
    ),
    (
        'MIDDLE_SLUG="$(node -e "const x=require(process.argv[1]); process.stdout.write(x[1].record.page.slug)" "$SAMPLE_JSON")"',
        'MIDDLE_SLUG="$(node -e "const x=require(process.argv[1]); process.stdout.write(x[Math.floor(x.length/2)].record.page.slug)" "$SAMPLE_JSON")"',
    ),
    (
        'LAST_SLUG="$(node -e "const x=require(process.argv[1]); process.stdout.write(x[2].record.page.slug)" "$SAMPLE_JSON")"',
        'LAST_SLUG="$(node -e "const x=require(process.argv[1]); process.stdout.write(x[x.length-1].record.page.slug)" "$SAMPLE_JSON")"',
    ),
    ("SAMPLE_SELECTION=FIRST_MIDDLE_LAST", "SAMPLE_SELECTION=EVENLY_SPACED_ACROSS_PLAN"),
    ("SAMPLE_RECORDS=3", "SAMPLE_RECORDS=1000"),
    ("SAMPLE_PAGES_INSERTED_BEFORE_ROLLBACK=3", "SAMPLE_PAGES_INSERTED_BEFORE_ROLLBACK=1000"),
    ("SAMPLE_PAGE_VERSIONS_INSERTED_BEFORE_ROLLBACK=3", "SAMPLE_PAGE_VERSIONS_INSERTED_BEFORE_ROLLBACK=1000"),
    ("SAMPLE_CONTENT_FINGERPRINTS_INSERTED_BEFORE_ROLLBACK=3", "SAMPLE_CONTENT_FINGERPRINTS_INSERTED_BEFORE_ROLLBACK=1000"),
    ("SAMPLE_TOTAL_ROWS_INSERTED_BEFORE_ROLLBACK=9", "SAMPLE_TOTAL_ROWS_INSERTED_BEFORE_ROLLBACK=3000"),
]

for old, new in replacements:
    count = text.count(old)
    expected = 1
    if count != expected:
        raise SystemExit(f"batch_patch_anchor_count_invalid:{count}:{old[:80]!r}")
    text = text.replace(old, new, 1)

target.write_text(text, encoding="utf-8")
target.chmod(0o700)
PY

test -s "$PATCHED_SCRIPT" || fail 'patched_batch_script_missing'
grep -q 'const SAMPLE_RECORDS = 1000;' "$PATCHED_SCRIPT" || fail 'batch_selection_patch_missing'
grep -q 'SAMPLE_SELECTION=EVENLY_SPACED_ACROSS_PLAN' "$PATCHED_SCRIPT" || fail 'batch_status_patch_missing'
grep -q 'metadata, "createdAt", "updatedAt"' "$PATCHED_SCRIPT" || fail 'page_timestamp_patch_missing'
grep -q '"createdBy", "createdAt", "updatedAt"' "$PATCHED_SCRIPT" || fail 'version_timestamp_patch_missing'
grep -q 'metadata, "createdAt"' "$PATCHED_SCRIPT" || fail 'fingerprint_timestamp_patch_missing'

START_NS="$(date +%s%N)"
bash "$PATCHED_SCRIPT" "$PLAN" "$PLAN_SUMMARY" "$OUT"
END_NS="$(date +%s%N)"
ELAPSED_MS="$(( (END_NS - START_NS) / 1000000 ))"

test -s "$OUT/status.txt" || fail 'batch_status_missing'
grep -q '^BLOG_TRANSACTIONAL_SAMPLE_IMPORT_STATUS=PASS$' "$OUT/status.txt" || fail 'base_batch_status_not_pass'
grep -q '^SAMPLE_RECORDS=1000$' "$OUT/status.txt" || fail 'batch_record_count_not_verified'
grep -q '^SAMPLE_TOTAL_ROWS_INSERTED_BEFORE_ROLLBACK=3000$' "$OUT/status.txt" || fail 'batch_row_count_not_verified'
grep -q '^TRANSACTION_ROLLED_BACK=YES$' "$OUT/status.txt" || fail 'batch_rollback_not_verified'
grep -q '^DATABASE_PERSISTENT_WRITE_PERFORMED=NO$' "$OUT/status.txt" || fail 'persistent_write_detected'

cat >>"$OUT/status.txt" <<STATUS
BATCH_DISTRIBUTION=EVENLY_SPACED_ACROSS_120097_RECORDS
BATCH_RECORDS=$EXPECTED_BATCH_RECORDS
BATCH_TOTAL_ROWS=$EXPECTED_BATCH_ROWS
BATCH_ELAPSED_MS=$ELAPSED_MS
RAW_SQL_TIMESTAMPS_EXPLICIT=YES
PRISMA_UPDATED_AT_ASSUMPTION_REMOVED=YES
BLOG_TRANSACTIONAL_BATCH_IMPORT_V1_STATUS=PASS
STATUS

tail -n 7 "$OUT/status.txt"
