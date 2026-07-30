#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ROOT="${ROOT:-/var/www/sikhadenge.in/sikhadenge-website-space}"
SOURCE_COMMIT="${SOURCE_COMMIT:-38e4f3949fc258d8c8c9d6b1d250a4e53a154a3e}"
SOURCE_BLOB="${SOURCE_BLOB:-4a7de18b310590fc16a8ed0e41514ac08fb94961}"
SOURCE_PATH="modules/blog/deployment/scripts/deploy-controlled-preview-production-v1.sh"
TMP="/tmp/deploy-controlled-preview-production-v3-$PPID-$$.sh"

cleanup() {
  rm -f "$TMP" 2>/dev/null || true
}
trap cleanup EXIT

command -v git >/dev/null 2>&1
command -v python3 >/dev/null 2>&1

test -d "$ROOT/.git"
test "$(git -C "$ROOT" rev-parse "$SOURCE_COMMIT:$SOURCE_PATH")" = "$SOURCE_BLOB"

git -C "$ROOT" show "$SOURCE_COMMIT:$SOURCE_PATH" > "$TMP"

python3 - "$TMP" <<'PY'
from pathlib import Path
import sys

path = Path(sys.argv[1])
text = path.read_text(encoding="utf-8")

replacements = [
    (
        "MUTATED=0\nSWAPPED_NEXT=0\nRESTARTED=0",
        "MUTATED=0\nOLD_NEXT_MOVED=0\nSWAPPED_NEXT=0\nRESTARTED=0",
    ),
    (
        '    echo "SWAPPED_NEXT=$SWAPPED_NEXT"\n    echo "RESTARTED=$RESTARTED"',
        '    echo "OLD_NEXT_MOVED=$OLD_NEXT_MOVED"\n    echo "SWAPPED_NEXT=$SWAPPED_NEXT"\n    echo "RESTARTED=$RESTARTED"',
    ),
    (
        '  if test "$SWAPPED_NEXT" = "1" && test -d "$ROLLBACK_NEXT"; then',
        '  if test "$OLD_NEXT_MOVED" = "1" && test -d "$ROLLBACK_NEXT"; then',
    ),
    (
        'mv "$ROOT/.next" "$ROLLBACK_NEXT" || fail "current_build_backup_failed"\nmv "$STAGED_NEXT" "$ROOT/.next" || fail "candidate_build_switch_failed"',
        'mv "$ROOT/.next" "$ROLLBACK_NEXT" || fail "current_build_backup_failed"\nOLD_NEXT_MOVED=1\nmv "$STAGED_NEXT" "$ROOT/.next" || fail "candidate_build_switch_failed"',
    ),
    (
        '''MALFORMED_STATUS="$(curl -sS -D "$OUT/malformed.headers" -o "$OUT/malformed.json" -w '%{http_code}' --max-time 30 "$MALFORMED_URL" || true)"
test "$MALFORMED_STATUS" = "400" || fail "malformed_slug_status_invalid"

printf 'header = "x-sikhadenge-blog-review-token: %s"\n' "$TOKEN" > "$CURL_CONFIG"
chmod 600 "$CURL_CONFIG"
AUTH_STATUS="$(curl --config "$CURL_CONFIG" -sS -D "$OUT/auth.headers" -o "$OUT/auth.json" -w '%{http_code}' --max-time 30 "$PREVIEW_URL" || true)"
rm -f "$CURL_CONFIG"
test "$AUTH_STATUS" = "200" || fail "authenticated_preview_status_invalid"''',
        '''MALFORMED_UNAUTH_STATUS="$(curl -sS -D "$OUT/malformed-unauth.headers" -o "$OUT/malformed-unauth.json" -w '%{http_code}' --max-time 30 "$MALFORMED_URL" || true)"
test "$MALFORMED_UNAUTH_STATUS" = "404" || fail "unauthenticated_malformed_slug_status_invalid"

printf 'header = "x-sikhadenge-blog-review-token: %s"\n' "$TOKEN" > "$CURL_CONFIG"
chmod 600 "$CURL_CONFIG"
MALFORMED_AUTH_STATUS="$(curl --config "$CURL_CONFIG" -sS -D "$OUT/malformed-auth.headers" -o "$OUT/malformed-auth.json" -w '%{http_code}' --max-time 30 "$MALFORMED_URL" || true)"
test "$MALFORMED_AUTH_STATUS" = "400" || fail "authenticated_malformed_slug_status_invalid"
AUTH_STATUS="$(curl --config "$CURL_CONFIG" -sS -D "$OUT/auth.headers" -o "$OUT/auth.json" -w '%{http_code}' --max-time 30 "$PREVIEW_URL" || true)"
rm -f "$CURL_CONFIG"
test "$AUTH_STATUS" = "200" || fail "authenticated_preview_status_invalid"''',
    ),
    (
        '  echo "MALFORMED_SLUG_STATUS=$MALFORMED_STATUS"',
        '  echo "UNAUTHENTICATED_MALFORMED_SLUG_STATUS=$MALFORMED_UNAUTH_STATUS"\n  echo "AUTHENTICATED_MALFORMED_SLUG_STATUS=$MALFORMED_AUTH_STATUS"',
    ),
]

for old, new in replacements:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"deployment_v3_patch_contract_failed:{count}:{old[:64]}")
    text = text.replace(old, new, 1)

path.write_text(text, encoding="utf-8")
PY

chmod 700 "$TMP"
bash -n "$TMP"

export HOME="${HOME:-/root}"
export PM2_HOME="${PM2_HOME:-/root/.pm2}"

bash "$TMP"
