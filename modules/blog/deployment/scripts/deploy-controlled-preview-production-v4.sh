#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ROOT="${ROOT:-/var/www/sikhadenge.in/sikhadenge-website-space}"
SOURCE_COMMIT="${SOURCE_COMMIT:-38e4f3949fc258d8c8c9d6b1d250a4e53a154a3e}"
SOURCE_BLOB="${SOURCE_BLOB:-4a7de18b310590fc16a8ed0e41514ac08fb94961}"
SOURCE_PATH="modules/blog/deployment/scripts/deploy-controlled-preview-production-v1.sh"
PATCH_ONLY="${PATCH_ONLY:-0}"
TMP="/tmp/deploy-controlled-preview-production-v4-$PPID-$$.sh"

cleanup() {
  rm -f "$TMP" 2>/dev/null || true
}
trap cleanup EXIT

command -v git >/dev/null 2>&1
command -v python3 >/dev/null 2>&1

test -d "$ROOT/.git"
test "$PATCH_ONLY" = "0" || test "$PATCH_ONLY" = "1"
test "$(git -C "$ROOT" rev-parse "$SOURCE_COMMIT:$SOURCE_PATH")" = "$SOURCE_BLOB"

git -C "$ROOT" show "$SOURCE_COMMIT:$SOURCE_PATH" > "$TMP"

python3 - "$TMP" <<'PY'
from pathlib import Path
import sys

path = Path(sys.argv[1])
lines = path.read_text(encoding="utf-8").splitlines(keepends=True)


def exact_index(value: str) -> int:
    matches = [i for i, line in enumerate(lines) if line.rstrip("\n") == value]
    if len(matches) != 1:
        raise SystemExit(f"deployment_v4_exact_marker_failed:{len(matches)}:{value}")
    return matches[0]


def prefix_index(prefix: str) -> int:
    matches = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    if len(matches) != 1:
        raise SystemExit(f"deployment_v4_prefix_marker_failed:{len(matches)}:{prefix}")
    return matches[0]

# Harden rollback for the state where the old .next has moved but the staged
# candidate rename fails before SWAPPED_NEXT can be set.
mutated_i = exact_index("MUTATED=0")
lines.insert(mutated_i + 1, "OLD_NEXT_MOVED=0\n")

swapped_echo_i = exact_index('    echo "SWAPPED_NEXT=$SWAPPED_NEXT"')
lines.insert(swapped_echo_i, '    echo "OLD_NEXT_MOVED=$OLD_NEXT_MOVED"\n')

rollback_condition_i = exact_index('  if test "$SWAPPED_NEXT" = "1" && test -d "$ROLLBACK_NEXT"; then')
lines[rollback_condition_i] = '  if test "$OLD_NEXT_MOVED" = "1" && test -d "$ROLLBACK_NEXT"; then\n'

move_old_i = exact_index('mv "$ROOT/.next" "$ROLLBACK_NEXT" || fail "current_build_backup_failed"')
lines.insert(move_old_i + 1, "OLD_NEXT_MOVED=1\n")

# Replace the malformed-slug verification structurally. Authentication is
# intentionally checked before slug validation by the runtime contract:
# unauthenticated malformed slug is hidden as 404; authenticated malformed
# slug is rejected as 400.
malformed_start = prefix_index('MALFORMED_STATUS="$(curl ')
jq_contract_start = prefix_index("jq -e '")
if malformed_start >= jq_contract_start:
    raise SystemExit("deployment_v4_malformed_block_order_invalid")

new_block = '''MALFORMED_UNAUTH_STATUS="$(curl -sS -D "$OUT/malformed-unauth.headers" -o "$OUT/malformed-unauth.json" -w '%{http_code}' --max-time 30 "$MALFORMED_URL" || true)"
test "$MALFORMED_UNAUTH_STATUS" = "404" || fail "unauthenticated_malformed_slug_status_invalid"
jq -e '.ok == false and .error == "NOT_FOUND"' "$OUT/malformed-unauth.json" >/dev/null || fail "unauthenticated_malformed_slug_body_invalid"

printf 'header = "x-sikhadenge-blog-review-token: %s"\n' "$TOKEN" > "$CURL_CONFIG"
chmod 600 "$CURL_CONFIG"
MALFORMED_AUTH_STATUS="$(curl --config "$CURL_CONFIG" -sS -D "$OUT/malformed-auth.headers" -o "$OUT/malformed-auth.json" -w '%{http_code}' --max-time 30 "$MALFORMED_URL" || true)"
test "$MALFORMED_AUTH_STATUS" = "400" || fail "authenticated_malformed_slug_status_invalid"
jq -e '.ok == false and .error == "INVALID_SLUG"' "$OUT/malformed-auth.json" >/dev/null || fail "authenticated_malformed_slug_body_invalid"
AUTH_STATUS="$(curl --config "$CURL_CONFIG" -sS -D "$OUT/auth.headers" -o "$OUT/auth.json" -w '%{http_code}' --max-time 30 "$PREVIEW_URL" || true)"
rm -f "$CURL_CONFIG"
test "$AUTH_STATUS" = "200" || fail "authenticated_preview_status_invalid"

'''.splitlines(keepends=True)
lines[malformed_start:jq_contract_start] = new_block

status_i = exact_index('  echo "MALFORMED_SLUG_STATUS=$MALFORMED_STATUS"')
lines[status_i:status_i + 1] = [
    '  echo "UNAUTHENTICATED_MALFORMED_SLUG_STATUS=$MALFORMED_UNAUTH_STATUS"\n',
    '  echo "AUTHENTICATED_MALFORMED_SLUG_STATUS=$MALFORMED_AUTH_STATUS"\n',
]

text = "".join(lines)
contracts = {
    "OLD_NEXT_MOVED=0": 1,
    "OLD_NEXT_MOVED=1": 1,
    "MALFORMED_UNAUTH_STATUS=": 1,
    "MALFORMED_AUTH_STATUS=": 1,
    'fail "unauthenticated_malformed_slug_status_invalid"': 1,
    'fail "authenticated_malformed_slug_status_invalid"': 1,
    "UNAUTHENTICATED_MALFORMED_SLUG_STATUS=": 1,
    "AUTHENTICATED_MALFORMED_SLUG_STATUS=": 1,
}
for marker, expected in contracts.items():
    actual = text.count(marker)
    if actual != expected:
        raise SystemExit(
            f"deployment_v4_postpatch_contract_failed:{actual}:{expected}:{marker}"
        )

if 'MALFORMED_STATUS=' in text or 'MALFORMED_SLUG_STATUS=$MALFORMED_STATUS' in text:
    raise SystemExit("deployment_v4_legacy_malformed_contract_remains")

path.write_text(text, encoding="utf-8")
PY

chmod 700 "$TMP"
bash -n "$TMP"

if test "$PATCH_ONLY" = "1"; then
  echo "BLOG_REVIEW_PREVIEW_DEPLOYMENT_PATCH_VALIDATION=PASS"
  echo "SOURCE_COMMIT=$SOURCE_COMMIT"
  echo "SOURCE_BLOB=$SOURCE_BLOB"
  echo "ROLLBACK_HARDENING=PASS"
  echo "ACCESS_ORDER_VERIFICATION=PASS"
  echo "PRODUCTION_DEPLOYMENT_PERFORMED=NO"
  echo "PM2_RESTART_PERFORMED=NO"
  echo "PREVIEW_TOKEN_CREATED=NO"
  exit 0
fi

export HOME="${HOME:-/root}"
export PM2_HOME="${PM2_HOME:-/root/.pm2}"

bash "$TMP"
