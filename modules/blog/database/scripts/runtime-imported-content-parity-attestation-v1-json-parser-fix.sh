#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

PACKAGE="${1:-}"
OUT="${2:-}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
BASE="$ROOT/modules/blog/database/scripts/runtime-imported-content-parity-attestation-v1.sh"
PATCHED="$OUT/runtime-imported-content-parity-attestation-v1.parser-fixed.sh"
EXPECTED_BASE_BLOB='f48a64ae4153a1b6fcb9099d52bbca71151de4bf'

fail() {
  mkdir -p "${OUT:-/tmp/blog-runtime-parity-parser-fix-failure}"
  printf 'BLOG_RUNTIME_IMPORTED_CONTENT_PARITY_PARSER_FIX_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "${OUT:-UNSET}" >&2
  exit 1
}

for command_name in bash git python3 grep; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "$PACKAGE" && test -d "$PACKAGE" || fail 'package_missing'
test -n "$OUT" || fail 'output_directory_missing'
mkdir -p "$OUT"
test -s "$BASE" || fail 'base_attestor_missing'

ACTUAL_BASE_BLOB="$(git hash-object "$BASE")"
test "$ACTUAL_BASE_BLOB" = "$EXPECTED_BASE_BLOB" || fail 'base_attestor_blob_mismatch'

python3 - "$BASE" "$PATCHED" <<'PY'
from pathlib import Path
import sys

source = Path(sys.argv[1])
target = Path(sys.argv[2])
text = source.read_text(encoding="utf-8")

old_parser = '''FIRST_SLUG="$(node -e "const x=require(process.argv[1]); console.log(x.samples[0].slug)" "$VALUES")"
MIDDLE_SLUG="$(node -e "const x=require(process.argv[1]); console.log(x.samples[1].slug)" "$VALUES")"
LAST_SLUG="$(node -e "const x=require(process.argv[1]); console.log(x.samples[2].slug)" "$VALUES")"'''
new_parser = '''FIRST_SLUG="$(node -e "const fs=require('node:fs'); const x=JSON.parse(fs.readFileSync(process.argv[1],'utf8')); console.log(x.samples[0].slug)" "$VALUES")"
MIDDLE_SLUG="$(node -e "const fs=require('node:fs'); const x=JSON.parse(fs.readFileSync(process.argv[1],'utf8')); console.log(x.samples[1].slug)" "$VALUES")"
LAST_SLUG="$(node -e "const fs=require('node:fs'); const x=JSON.parse(fs.readFileSync(process.argv[1],'utf8')); console.log(x.samples[2].slug)" "$VALUES")"'''
old_root = 'ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"'
new_root = 'ROOT="${BLOG_RUNTIME_PARITY_ROOT:?BLOG_RUNTIME_PARITY_ROOT_missing}"'

if text.count(old_parser) != 1:
    raise SystemExit("runtime_values_parser_patch_anchor_invalid")
if text.count(old_root) != 1:
    raise SystemExit("runtime_root_patch_anchor_invalid")

text = text.replace(old_parser, new_parser, 1)
text = text.replace(old_root, new_root, 1)
target.write_text(text, encoding="utf-8")
target.chmod(0o700)
PY

test -s "$PATCHED" || fail 'patched_attestor_missing'
if grep -Fq 'const x=require(process.argv[1])' "$PATCHED"; then
  fail 'legacy_json_require_parser_still_present'
fi
grep -Fq "JSON.parse(fs.readFileSync(process.argv[1],'utf8'))" "$PATCHED" || fail 'json_parser_fix_missing'
grep -Fqx 'ROOT="${BLOG_RUNTIME_PARITY_ROOT:?BLOG_RUNTIME_PARITY_ROOT_missing}"' "$PATCHED" || fail 'explicit_runtime_root_fix_missing'

echo 'BLOG_RUNTIME_IMPORTED_CONTENT_PARITY_PARSER_FIX_STATUS=PASS'
echo 'BASE_ATTESTOR_GIT_BLOB_VERIFIED=YES'
echo 'RUNTIME_VALUES_PARSER=JSON_PARSE_UTF8'
echo 'PATCHED_ATTESTOR_ROOT=EXPLICIT_PROJECT_ROOT'
echo 'DATABASE_WRITE_CAPABILITY_ADDED=NO'
echo "REPORT=$OUT"

BLOG_RUNTIME_PARITY_ROOT="$ROOT" exec bash "$PATCHED" "$PACKAGE" "$OUT"
