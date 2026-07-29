#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

PLAN="${1:-}"
PLAN_SUMMARY="${2:-}"
OUT="${3:-/tmp/blog-existing-sample-import-smoke-v2-$(date +%Y%m%d_%H%M%S)}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
BASE_SCRIPT="$ROOT/modules/blog/inventory/scripts/transactional-sample-import-smoke-test.sh"
PATCHED_SCRIPT="$OUT/transactional-sample-import-smoke-test.patched.sh"
EXPECTED_BASE_BLOB='0cd447da5cd9caf61e2932b1b9624d27f8226c0c'

fail() {
  printf 'BLOG_TRANSACTIONAL_SAMPLE_IMPORT_V2_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

for command_name in bash git python3; do
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
]

for old, new in replacements:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"timestamp_patch_anchor_count_invalid:{count}:{old[:60]!r}")
    text = text.replace(old, new, 1)

target.write_text(text, encoding="utf-8")
target.chmod(0o700)
PY

test -s "$PATCHED_SCRIPT" || fail 'patched_smoke_script_missing'
grep -q 'metadata, "createdAt", "updatedAt"' "$PATCHED_SCRIPT" || fail 'page_timestamp_patch_missing'
grep -q '"createdBy", "createdAt", "updatedAt"' "$PATCHED_SCRIPT" || fail 'version_timestamp_patch_missing'
grep -q 'metadata, "createdAt"' "$PATCHED_SCRIPT" || fail 'fingerprint_timestamp_patch_missing'

bash "$PATCHED_SCRIPT" "$PLAN" "$PLAN_SUMMARY" "$OUT"

echo 'RAW_SQL_TIMESTAMPS_EXPLICIT=YES'
echo 'PRISMA_UPDATED_AT_ASSUMPTION_REMOVED=YES'
echo 'BLOG_TRANSACTIONAL_SAMPLE_IMPORT_V2_STATUS=PASS'
