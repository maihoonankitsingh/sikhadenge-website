#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

export HOME="${HOME:-/root}"
export PM2_HOME="${PM2_HOME:-/root/.pm2}"

ROOT="${ROOT:-/var/www/sikhadenge.in/sikhadenge-website-space}"
BASE_COMMIT="${BASE_COMMIT:-be9476bddb9b2091c37eab69049e2efef9c31879}"
TARGET_COMMIT="${TARGET_COMMIT:-74af60d3a3026646a0b66feb869e5b7ce60bd229}"
PRODUCTION_BRANCH="${PRODUCTION_BRANCH:-live-clean-sync-20260424}"
EXPECTED_BUILD_ID="${EXPECTED_BUILD_ID:-rmOFYZtEaWPw35Ygy2l7q}"
EXPECTED_ROLLBACK_BUILD_ID="${EXPECTED_ROLLBACK_BUILD_ID:-QoIU-RyXUuhyOX2WOMKtk}"
PM2_NAME="${PM2_NAME:-sikhadenge-in}"
DEPLOY_REPORT="${DEPLOY_REPORT:-/var/lib/sikhadenge-blog-artifacts/blog-review-preview-production-deployment-v1-20260730_213457}"
SYNC_REPORT="${SYNC_REPORT:-/var/lib/sikhadenge-blog-artifacts/blog-review-preview-production-remote-sync-v1-20260730_220608}"
ROLLBACK_NEXT="${ROLLBACK_NEXT:-$ROOT/.next.rollback-20260730_213457}"
ARTIFACT_ROOT="${ARTIFACT_ROOT:-/var/lib/sikhadenge-blog-artifacts}"
TS="$(date +%Y%m%d_%H%M%S)"
OUT="$ARTIFACT_ROOT/blog-review-preview-production-closure-v1-$TS"
STATUS="$OUT/status.txt"
CURL_CONFIG="/dev/shm/blog-preview-closure-curl-$TS.conf"
TOKEN=""
DATABASE_URL=""

mkdir -p "$OUT"
chmod 700 "$OUT"

cleanup_secret() {
  rm -f "$CURL_CONFIG" 2>/dev/null || true
  TOKEN=""
  DATABASE_URL=""
}
trap cleanup_secret EXIT

fail() {
  local reason="$1"
  {
    echo "BLOG_REVIEW_PREVIEW_PRODUCTION_CLOSURE_STATUS=FAIL"
    echo "REASON=$reason"
    echo "PRODUCTION_MUTATION_PERFORMED=NO"
    echo "PM2_RESTART_PERFORMED=NO"
    echo "PREVIEW_TOKEN_CHANGED=NO"
    echo "DATABASE_WRITE_PERFORMED=NO"
    echo "REMOTE_BRANCH_CHANGED=NO"
    echo "REPORT=$OUT"
  } | tee "$STATUS" >&2
  exit 1
}

read_env_value() {
  local key="$1"
  python3 - "$ROOT/.env.local" "$key" <<'PY'
from pathlib import Path
import re
import sys

path = Path(sys.argv[1])
key = sys.argv[2]
values = []
pattern = re.compile(r'^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=(.*)$')
for raw in path.read_text(encoding='utf-8').splitlines():
    stripped = raw.lstrip()
    if not stripped or stripped.startswith('#'):
        continue
    match = pattern.match(raw)
    if not match or match.group(1) != key:
        continue
    value = match.group(2).strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
        value = value[1:-1]
    values.append(value)
if len(values) != 1:
    raise SystemExit(20 + len(values))
sys.stdout.write(values[0])
PY
}

for cmd in git jq pm2 curl psql python3 grep awk cmp sort stat sha256sum tr wc; do
  command -v "$cmd" >/dev/null 2>&1 || fail "${cmd}_not_found"
done

test -d "$ROOT/.git" || fail "production_repository_missing"
test -f "$ROOT/.env.local" || fail "production_env_missing"
test -s "$ROOT/.next/BUILD_ID" || fail "production_build_missing"
test -f "$DEPLOY_REPORT/status.txt" || fail "deployment_report_missing"
test -f "$SYNC_REPORT/status.txt" || fail "remote_sync_report_missing"
test -s "$ROLLBACK_NEXT/BUILD_ID" || fail "rollback_build_missing"

grep -qx 'BLOG_REVIEW_PREVIEW_PRODUCTION_DEPLOYMENT_STATUS=PASS' "$DEPLOY_REPORT/status.txt" || fail "deployment_report_not_passed"
grep -qx 'BLOG_REVIEW_PREVIEW_PRODUCTION_REMOTE_SYNC_STATUS=PASS' "$SYNC_REPORT/status.txt" || fail "remote_sync_report_not_passed"

test "$(git -C "$ROOT" branch --show-current)" = "$PRODUCTION_BRANCH" || fail "production_branch_mismatch"
test "$(git -C "$ROOT" rev-parse HEAD)" = "$TARGET_COMMIT" || fail "production_head_mismatch"
test -z "$(git -C "$ROOT" status --porcelain)" || fail "production_worktree_not_clean"
test "$(git -C "$ROOT" rev-parse "$TARGET_COMMIT^")" = "$BASE_COMMIT" || fail "target_not_direct_child"
test "$(git -C "$ROOT" merge-base "$BASE_COMMIT" "$TARGET_COMMIT")" = "$BASE_COMMIT" || fail "target_not_fast_forward"

REMOTE_HEAD="$(git -C "$ROOT" ls-remote origin "refs/heads/$PRODUCTION_BRANCH" | awk '{print $1}')"
test "$REMOTE_HEAD" = "$TARGET_COMMIT" || fail "remote_production_head_mismatch"

test "$(cat "$ROOT/.next/BUILD_ID")" = "$EXPECTED_BUILD_ID" || fail "production_build_id_mismatch"
test "$(cat "$ROLLBACK_NEXT/BUILD_ID")" = "$EXPECTED_ROLLBACK_BUILD_ID" || fail "rollback_build_id_mismatch"
test -f "$ROOT/.next/server/app/api/internal/blog-review-preview/[slug]/route.js" || fail "production_preview_route_artifact_missing"

cat > "$OUT/expected-runtime-files.txt" <<'EOF'
app/api/internal/blog-review-preview/[slug]/route.ts
modules/blog/database/client.ts
modules/blog/database/generated/.gitignore
modules/blog/database/schema.prisma
modules/blog/preview/controlled-review-preview.ts
modules/blog/preview/index.ts
modules/blog/repositories/imported-page-repository.ts
modules/blog/repositories/index.ts
modules/blog/repositories/workspace-repository.ts
EOF
sort -o "$OUT/expected-runtime-files.txt" "$OUT/expected-runtime-files.txt"
git -C "$ROOT" diff --name-only "$BASE_COMMIT" "$TARGET_COMMIT" | sort > "$OUT/actual-runtime-files.txt"
cmp -s "$OUT/expected-runtime-files.txt" "$OUT/actual-runtime-files.txt" || fail "minimal_runtime_allowlist_mismatch"
test "$(wc -l < "$OUT/actual-runtime-files.txt" | tr -d ' ')" = "9" || fail "minimal_runtime_file_count_invalid"
test "$(git -C "$ROOT" rev-parse "$BASE_COMMIT:app/blog/[slug]/page.tsx")" = "$(git -C "$ROOT" rev-parse "$TARGET_COMMIT:app/blog/[slug]/page.tsx")" || fail "live_blog_route_changed"

TOKEN_LINES="$(grep -cE '^[[:space:]]*BLOG_REVIEW_PREVIEW_TOKEN=' "$ROOT/.env.local" || true)"
test "$TOKEN_LINES" = "1" || fail "preview_token_entry_count_invalid"
TOKEN="$(read_env_value BLOG_REVIEW_PREVIEW_TOKEN)" || fail "preview_token_read_failed"
test "${#TOKEN}" = "96" || fail "preview_token_length_invalid"
test "$(stat -c '%a' "$ROOT/.env.local")" = "600" || fail "production_env_mode_invalid"

DATABASE_URL_LINES="$(grep -cE '^[[:space:]]*DATABASE_URL=' "$ROOT/.env.local" || true)"
test "$DATABASE_URL_LINES" = "1" || fail "database_url_entry_count_invalid"
DATABASE_URL="$(read_env_value DATABASE_URL)" || fail "database_url_read_failed"
test -n "$DATABASE_URL" || fail "database_url_empty"

PM2_COUNT_BEFORE="$(pm2 jlist | jq --arg name "$PM2_NAME" '[.[] | select(.name==$name)] | length')"
test "$PM2_COUNT_BEFORE" = "1" || fail "pm2_process_count_invalid"
pm2 jlist | jq --arg name "$PM2_NAME" '
  .[] | select(.name==$name) |
  {
    pm_id,
    name,
    pid,
    status:.pm2_env.status,
    restarts:.pm2_env.restart_time,
    cwd:.pm2_env.pm_cwd,
    execPath:.pm2_env.pm_exec_path,
    args:.pm2_env.args,
    execMode:.pm2_env.exec_mode
  }
' > "$OUT/pm2-safe-before.json"
PM2_PID_BEFORE="$(jq -r '.pid' "$OUT/pm2-safe-before.json")"
PM2_RESTARTS_BEFORE="$(jq -r '.restarts' "$OUT/pm2-safe-before.json")"
PM2_STATUS_BEFORE="$(jq -r '.status' "$OUT/pm2-safe-before.json")"
PM2_CWD_BEFORE="$(jq -r '.cwd' "$OUT/pm2-safe-before.json")"
test "$PM2_STATUS_BEFORE" = "online" || fail "production_pm2_not_online"
test "$PM2_PID_BEFORE" != "0" && test "$PM2_PID_BEFORE" != "null" || fail "production_pm2_pid_invalid"
test "$PM2_CWD_BEFORE" = "$ROOT" || fail "production_pm2_cwd_mismatch"

DB_SIGNATURE_BEFORE="$(psql "$DATABASE_URL" -X -At -F'|' -c "SELECT
  (SELECT count(*) FROM blog_content.workspaces),
  (SELECT count(*) FROM blog_content.pages),
  (SELECT count(*) FROM blog_content.page_versions),
  (SELECT count(*) FROM blog_content.content_fingerprints),
  (SELECT count(*) FROM blog_content.publications),
  (SELECT count(*) FROM blog_content.quality_runs),
  (SELECT count(*) FROM blog_content.editorial_reviews);")" || fail "database_signature_before_failed"
echo "$DB_SIGNATURE_BEFORE" > "$OUT/database-signature-before.txt"
IFS='|' read -r DB_WORKSPACES DB_PAGES DB_VERSIONS DB_FINGERPRINTS DB_PUBLICATIONS DB_QUALITY DB_REVIEWS <<< "$DB_SIGNATURE_BEFORE"
test "$DB_PAGES" = "120097" || fail "database_page_count_invalid"
test "$DB_VERSIONS" = "120097" || fail "database_version_count_invalid"
test "$DB_FINGERPRINTS" = "120097" || fail "database_fingerprint_count_invalid"
test "$DB_PUBLICATIONS" = "0" || fail "publications_not_zero"
test "$DB_QUALITY" = "0" || fail "quality_runs_not_zero"
test "$DB_REVIEWS" = "0" || fail "editorial_reviews_not_zero"

for url in \
  'https://sikhadenge.in/' \
  'https://sikhadenge.in/blog' \
  'https://sikhadenge.in/blog/chatgpt-se-resume-kaise-banaye'
do
  code="$(curl -sS -L -o /dev/null -w '%{http_code}' --max-time 30 "$url" || true)"
  printf '%s %s\n' "$code" "$url" >> "$OUT/live-http.txt"
  test "$code" = "200" || fail "production_http_baseline_failed"
done

PREVIEW_URL='https://sikhadenge.in/api/internal/blog-review-preview/chatgpt-se-resume-kaise-banaye'
MALFORMED_URL='https://sikhadenge.in/api/internal/blog-review-preview/Bad_Slug'

UNAUTH_STATUS="$(curl -sS -D "$OUT/unauth.headers" -o "$OUT/unauth.json" -w '%{http_code}' --max-time 30 "$PREVIEW_URL" || true)"
test "$UNAUTH_STATUS" = "404" || fail "unauthenticated_preview_status_invalid"
jq -e '.ok == false and .error == "NOT_FOUND"' "$OUT/unauth.json" >/dev/null || fail "unauthenticated_preview_body_invalid"

WRONG_STATUS="$(curl -sS -H 'x-sikhadenge-blog-review-token: wrong-token-value-not-authorized' -D "$OUT/wrong.headers" -o "$OUT/wrong.json" -w '%{http_code}' --max-time 30 "$PREVIEW_URL" || true)"
test "$WRONG_STATUS" = "404" || fail "wrong_token_preview_status_invalid"
jq -e '.ok == false and .error == "NOT_FOUND"' "$OUT/wrong.json" >/dev/null || fail "wrong_token_preview_body_invalid"

MALFORMED_UNAUTH_STATUS="$(curl -sS -D "$OUT/malformed-unauth.headers" -o "$OUT/malformed-unauth.json" -w '%{http_code}' --max-time 30 "$MALFORMED_URL" || true)"
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
jq -e '
  .ok == true and
  .mode == "CONTROLLED_REVIEW_PREVIEW" and
  .record.page.lifecycleStatus == "DISCOVERED" and
  .record.version.status == "WRITING" and
  .record.version.origin == "MIGRATED" and
  .record.page.indexEligibility == "BLOCKED" and
  .routeSafety.reviewOnly == true and
  .routeSafety.routeEligible == false and
  .routeSafety.publicationApproved == false and
  .routeSafety.indexEligibilityApproved == false and
  .routeSafety.databaseWriteAllowed == false and
  .routeSafety.liveBlogRouteModified == false
' "$OUT/auth.json" >/dev/null || fail "authenticated_preview_contract_invalid"

tr -d '\r' < "$OUT/auth.headers" > "$OUT/auth.headers.normalized"
grep -qiE '^x-robots-tag:.*noindex.*nofollow.*noarchive' "$OUT/auth.headers.normalized" || fail "robots_headers_invalid"
grep -qiE '^cache-control:.*private.*no-store' "$OUT/auth.headers.normalized" || fail "cache_headers_invalid"
if grep -qiE '^link:.*canonical' "$OUT/auth.headers.normalized"; then
  fail "canonical_header_present"
fi

if grep -R -F "$TOKEN" "$OUT" >/dev/null 2>&1; then
  fail "preview_token_leaked_to_artifacts"
fi

DB_SIGNATURE_AFTER="$(psql "$DATABASE_URL" -X -At -F'|' -c "SELECT
  (SELECT count(*) FROM blog_content.workspaces),
  (SELECT count(*) FROM blog_content.pages),
  (SELECT count(*) FROM blog_content.page_versions),
  (SELECT count(*) FROM blog_content.content_fingerprints),
  (SELECT count(*) FROM blog_content.publications),
  (SELECT count(*) FROM blog_content.quality_runs),
  (SELECT count(*) FROM blog_content.editorial_reviews);")" || fail "database_signature_after_failed"
echo "$DB_SIGNATURE_AFTER" > "$OUT/database-signature-after.txt"
test "$DB_SIGNATURE_AFTER" = "$DB_SIGNATURE_BEFORE" || fail "database_signature_changed"

pm2 jlist | jq --arg name "$PM2_NAME" '
  .[] | select(.name==$name) |
  {
    pm_id,
    name,
    pid,
    status:.pm2_env.status,
    restarts:.pm2_env.restart_time,
    cwd:.pm2_env.pm_cwd,
    execPath:.pm2_env.pm_exec_path,
    args:.pm2_env.args,
    execMode:.pm2_env.exec_mode
  }
' > "$OUT/pm2-safe-after.json"
PM2_PID_AFTER="$(jq -r '.pid' "$OUT/pm2-safe-after.json")"
PM2_RESTARTS_AFTER="$(jq -r '.restarts' "$OUT/pm2-safe-after.json")"
PM2_STATUS_AFTER="$(jq -r '.status' "$OUT/pm2-safe-after.json")"
test "$PM2_STATUS_AFTER" = "online" || fail "production_pm2_after_not_online"
test "$PM2_PID_AFTER" = "$PM2_PID_BEFORE" || fail "pm2_pid_changed_during_closure"
test "$PM2_RESTARTS_AFTER" = "$PM2_RESTARTS_BEFORE" || fail "pm2_restarts_changed_during_closure"

test "$(git -C "$ROOT" rev-parse HEAD)" = "$TARGET_COMMIT" || fail "production_head_changed_during_closure"
test -z "$(git -C "$ROOT" status --porcelain)" || fail "production_worktree_changed_during_closure"
test "$(git -C "$ROOT" ls-remote origin "refs/heads/$PRODUCTION_BRANCH" | awk '{print $1}')" = "$TARGET_COMMIT" || fail "remote_head_changed_during_closure"
test "$(cat "$ROOT/.next/BUILD_ID")" = "$EXPECTED_BUILD_ID" || fail "production_build_changed_during_closure"
test "$(grep -cE '^[[:space:]]*BLOG_REVIEW_PREVIEW_TOKEN=' "$ROOT/.env.local" || true)" = "1" || fail "preview_token_changed_during_closure"

{
  echo "BLOG_REVIEW_PREVIEW_PRODUCTION_CLOSURE_STATUS=PASS"
  echo "PRODUCTION_BRANCH=$PRODUCTION_BRANCH"
  echo "PRODUCTION_COMMIT=$TARGET_COMMIT"
  echo "REMOTE_PRODUCTION_COMMIT=$REMOTE_HEAD"
  echo "LOCAL_REMOTE_COMMIT_ALIGNED=YES"
  echo "MINIMAL_RUNTIME_FILE_COUNT=9"
  echo "LIVE_BLOG_ROUTE_MODIFIED=NO"
  echo "PRODUCTION_BUILD_ID=$EXPECTED_BUILD_ID"
  echo "ROLLBACK_BUILD_ID=$EXPECTED_ROLLBACK_BUILD_ID"
  echo "ROLLBACK_BUILD_RETAINED=YES"
  echo "PREVIEW_TOKEN_PRESENT=YES"
  echo "PREVIEW_TOKEN_LENGTH=${#TOKEN}"
  echo "PREVIEW_TOKEN_RETURNED=NO"
  echo "PREVIEW_TOKEN_LEAKED_TO_ARTIFACTS=NO"
  echo "PM2_STATUS=ONLINE"
  echo "PM2_PID=$PM2_PID_AFTER"
  echo "PM2_RESTARTS=$PM2_RESTARTS_AFTER"
  echo "PM2_RESTART_PERFORMED=NO"
  echo "PRODUCTION_HTTP_BASELINE=PASS"
  echo "UNAUTHENTICATED_PREVIEW_STATUS=$UNAUTH_STATUS"
  echo "WRONG_TOKEN_PREVIEW_STATUS=$WRONG_STATUS"
  echo "UNAUTHENTICATED_MALFORMED_SLUG_STATUS=$MALFORMED_UNAUTH_STATUS"
  echo "AUTHENTICATED_MALFORMED_SLUG_STATUS=$MALFORMED_AUTH_STATUS"
  echo "AUTHENTICATED_PREVIEW_STATUS=$AUTH_STATUS"
  echo "REVIEW_ONLY_SAFETY_CONTRACT=PASS"
  echo "NOINDEX_NOFOLLOW_NOARCHIVE_HEADERS=PASS"
  echo "PRIVATE_NO_STORE_HEADERS=PASS"
  echo "CANONICAL_HEADER_PRESENT=NO"
  echo "DATABASE_PAGE_COUNT=$DB_PAGES"
  echo "DATABASE_VERSION_COUNT=$DB_VERSIONS"
  echo "DATABASE_FINGERPRINT_COUNT=$DB_FINGERPRINTS"
  echo "PUBLICATION_COUNT=$DB_PUBLICATIONS"
  echo "QUALITY_RUN_COUNT=$DB_QUALITY"
  echo "EDITORIAL_REVIEW_COUNT=$DB_REVIEWS"
  echo "DATABASE_SIGNATURE_UNCHANGED=YES"
  echo "DATABASE_WRITE_PERFORMED=NO"
  echo "PRODUCTION_MUTATION_PERFORMED=NO"
  echo "PREVIEW_TOKEN_CHANGED=NO"
  echo "REMOTE_BRANCH_CHANGED=NO"
  echo "REPORT=$OUT"
} | tee "$STATUS"

cleanup_secret
trap - EXIT
