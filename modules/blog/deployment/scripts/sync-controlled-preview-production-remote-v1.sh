#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

export HOME="${HOME:-/root}"
export PM2_HOME="${PM2_HOME:-/root/.pm2}"

ROOT="${ROOT:-/var/www/sikhadenge.in/sikhadenge-website-space}"
BASE_COMMIT="${BASE_COMMIT:-be9476bddb9b2091c37eab69049e2efef9c31879}"
TARGET_COMMIT="${TARGET_COMMIT:-74af60d3a3026646a0b66feb869e5b7ce60bd229}"
PRODUCTION_BRANCH="${PRODUCTION_BRANCH:-live-clean-sync-20260424}"
PM2_NAME="${PM2_NAME:-sikhadenge-in}"
EXPECTED_BUILD_ID="${EXPECTED_BUILD_ID:-rmOFYZtEaWPw35Ygy2l7q}"
DEPLOYMENT_REPORT="${DEPLOYMENT_REPORT:-/var/lib/sikhadenge-blog-artifacts/blog-review-preview-production-deployment-v1-20260730_213457}"
ARTIFACT_ROOT="${ARTIFACT_ROOT:-/var/lib/sikhadenge-blog-artifacts}"
TS="$(date +%Y%m%d_%H%M%S)"
OUT="$ARTIFACT_ROOT/blog-review-preview-production-remote-sync-v1-$TS"
STATUS="$OUT/status.txt"
LOCK_FILE="/var/lock/sikhadenge-blog-review-preview-production-deployment.lock"
CURL_CONFIG="/dev/shm/blog-preview-remote-sync-$TS.conf"
TOKEN=""
REMOTE_UPDATED=0

mkdir -p "$OUT"
chmod 700 "$OUT"

cleanup_secret() {
  rm -f "$CURL_CONFIG" 2>/dev/null || true
  TOKEN=""
}
trap cleanup_secret EXIT

fail() {
  local reason="$1"
  {
    echo "BLOG_REVIEW_PREVIEW_PRODUCTION_REMOTE_SYNC_STATUS=FAIL"
    echo "REASON=$reason"
    echo "LOCAL_PRODUCTION_COMMIT=$(git -C "$ROOT" rev-parse HEAD 2>/dev/null || true)"
    echo "REMOTE_PRODUCTION_BRANCH_UPDATED=$(test "$REMOTE_UPDATED" = "1" && echo YES || echo NO)"
    echo "PM2_RESTART_PERFORMED=NO"
    echo "PREVIEW_TOKEN_CHANGED=NO"
    echo "DATABASE_WRITE_PERFORMED=NO"
    echo "REPORT=$OUT"
  } | tee "$STATUS" >&2
  exit 1
}

for cmd in git jq pm2 curl grep awk cut sort cmp flock pgrep sha256sum; do
  command -v "$cmd" >/dev/null 2>&1 || fail "${cmd}_not_found"
done

exec 9>"$LOCK_FILE"
flock -n 9 || fail "deployment_lock_busy"

test -d "$ROOT/.git" || fail "production_repository_missing"
test -f "$ROOT/.env.local" || fail "production_env_missing"
test -s "$ROOT/.next/BUILD_ID" || fail "production_build_missing"
test -s "$DEPLOYMENT_REPORT/status.txt" || fail "deployment_status_missing"
test -s "$DEPLOYMENT_REPORT/database-signature-before.txt" || fail "database_signature_before_missing"
test -s "$DEPLOYMENT_REPORT/database-signature-after.txt" || fail "database_signature_after_missing"

grep -qx 'BLOG_REVIEW_PREVIEW_PRODUCTION_DEPLOYMENT_STATUS=PASS' "$DEPLOYMENT_REPORT/status.txt" || fail "deployment_not_passed"
grep -qx "DEPLOYED_COMMIT=$TARGET_COMMIT" "$DEPLOYMENT_REPORT/status.txt" || fail "deployment_commit_mismatch"
grep -qx 'DATABASE_SIGNATURE_UNCHANGED=YES' "$DEPLOYMENT_REPORT/status.txt" || fail "deployment_database_guard_missing"
grep -qx 'LIVE_BLOG_ROUTE_MODIFIED=NO' "$DEPLOYMENT_REPORT/status.txt" || fail "deployment_live_blog_guard_missing"
grep -qx 'PUBLICATION_APPROVED=NO' "$DEPLOYMENT_REPORT/status.txt" || fail "publication_guard_missing"
grep -qx 'INDEX_ELIGIBILITY_APPROVED=NO' "$DEPLOYMENT_REPORT/status.txt" || fail "indexing_guard_missing"
cmp -s "$DEPLOYMENT_REPORT/database-signature-before.txt" "$DEPLOYMENT_REPORT/database-signature-after.txt" || fail "database_signature_report_mismatch"

test "$(git -C "$ROOT" branch --show-current)" = "$PRODUCTION_BRANCH" || fail "production_branch_mismatch"
test "$(git -C "$ROOT" rev-parse HEAD)" = "$TARGET_COMMIT" || fail "production_head_not_target"
test -z "$(git -C "$ROOT" status --porcelain)" || fail "production_worktree_not_clean"
test "$(git -C "$ROOT" rev-parse "$TARGET_COMMIT^")" = "$BASE_COMMIT" || fail "target_not_direct_child"
test "$(git -C "$ROOT" merge-base "$BASE_COMMIT" "$TARGET_COMMIT")" = "$BASE_COMMIT" || fail "target_not_fast_forward"
test "$(git -C "$ROOT" rev-parse "$BASE_COMMIT:app/blog/[slug]/page.tsx")" = "$(git -C "$ROOT" rev-parse "$TARGET_COMMIT:app/blog/[slug]/page.tsx")" || fail "live_blog_route_changed"

cat > "$OUT/expected-files.txt" <<'EOF'
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
sort -o "$OUT/expected-files.txt" "$OUT/expected-files.txt"
git -C "$ROOT" diff --name-only "$BASE_COMMIT" "$TARGET_COMMIT" | sort > "$OUT/actual-files.txt"
cmp -s "$OUT/expected-files.txt" "$OUT/actual-files.txt" || fail "minimal_runtime_allowlist_mismatch"
test "$(wc -l < "$OUT/actual-files.txt" | tr -d ' ')" = "9" || fail "minimal_runtime_file_count_invalid"

test "$(cat "$ROOT/.next/BUILD_ID")" = "$EXPECTED_BUILD_ID" || fail "production_build_id_mismatch"
test -f "$ROOT/.next/server/app/api/internal/blog-review-preview/[slug]/route.js" || fail "production_preview_route_artifact_missing"
test -s "$ROOT/modules/blog/database/generated/client/index.js" || fail "production_generated_client_missing"

TOKEN_LINES="$(grep -cE '^[[:space:]]*BLOG_REVIEW_PREVIEW_TOKEN=' "$ROOT/.env.local" || true)"
test "$TOKEN_LINES" = "1" || fail "preview_token_entry_count_invalid"
TOKEN="$(grep -E '^[[:space:]]*BLOG_REVIEW_PREVIEW_TOKEN=' "$ROOT/.env.local" | tail -n1 | cut -d= -f2-)"
[[ "$TOKEN" =~ ^[0-9a-f]{96}$ ]] || fail "preview_token_format_invalid"

PM2_RAW="$OUT/pm2-jlist.json"
pm2 jlist > "$PM2_RAW" 2>"$OUT/pm2-jlist.stderr" || fail "pm2_jlist_failed"
jq -e . "$PM2_RAW" >/dev/null || fail "pm2_json_invalid"
test "$(jq --arg name "$PM2_NAME" '[.[] | select(.name==$name)] | length' "$PM2_RAW")" = "1" || fail "pm2_process_count_invalid"
PM2_STATUS="$(jq -r --arg name "$PM2_NAME" '.[] | select(.name==$name) | .pm2_env.status' "$PM2_RAW")"
PM2_CWD="$(jq -r --arg name "$PM2_NAME" '.[] | select(.name==$name) | .pm2_env.pm_cwd' "$PM2_RAW")"
PM2_PID="$(jq -r --arg name "$PM2_NAME" '.[] | select(.name==$name) | .pid' "$PM2_RAW")"
PM2_RESTARTS="$(jq -r --arg name "$PM2_NAME" '.[] | select(.name==$name) | .pm2_env.restart_time' "$PM2_RAW")"
test "$PM2_STATUS" = "online" || fail "production_pm2_not_online"
test "$PM2_CWD" = "$ROOT" || fail "production_pm2_cwd_mismatch"
test "$PM2_PID" != "0" && test "$PM2_PID" != "null" || fail "production_pm2_pid_invalid"

ROOT_BUILD_PROCESSES="$(pgrep -af 'next build|npm run build' | grep -F "$ROOT" || true)"
printf '%s\n' "$ROOT_BUILD_PROCESSES" > "$OUT/production-build-processes.txt"
test -z "$ROOT_BUILD_PROCESSES" || fail "production_build_process_active"

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

WRONG_STATUS="$(curl -sS -H 'x-sikhadenge-blog-review-token: wrong-token-value-not-authorized' -D "$OUT/wrong.headers" -o "$OUT/wrong.json" -w '%{http_code}' --max-time 30 "$PREVIEW_URL" || true)"
test "$WRONG_STATUS" = "404" || fail "wrong_token_preview_status_invalid"

MALFORMED_UNAUTH_STATUS="$(curl -sS -D "$OUT/malformed-unauth.headers" -o "$OUT/malformed-unauth.json" -w '%{http_code}' --max-time 30 "$MALFORMED_URL" || true)"
test "$MALFORMED_UNAUTH_STATUS" = "404" || fail "unauthenticated_malformed_slug_status_invalid"

printf 'header = "x-sikhadenge-blog-review-token: %s"\n' "$TOKEN" > "$CURL_CONFIG"
chmod 600 "$CURL_CONFIG"
MALFORMED_AUTH_STATUS="$(curl --config "$CURL_CONFIG" -sS -D "$OUT/malformed-auth.headers" -o "$OUT/malformed-auth.json" -w '%{http_code}' --max-time 30 "$MALFORMED_URL" || true)"
test "$MALFORMED_AUTH_STATUS" = "400" || fail "authenticated_malformed_slug_status_invalid"
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

grep -qiE '^x-robots-tag:.*noindex.*nofollow.*noarchive' "$OUT/auth.headers" || fail "robots_headers_invalid"
grep -qiE '^cache-control:.*private.*no-store' "$OUT/auth.headers" || fail "cache_headers_invalid"
if grep -qiE '^link:.*canonical' "$OUT/auth.headers"; then
  fail "canonical_header_present"
fi

if grep -R -F "$TOKEN" "$OUT" >/dev/null 2>&1; then
  fail "preview_token_leaked_to_artifacts"
fi

REMOTE_BEFORE="$(git -C "$ROOT" ls-remote origin "refs/heads/$PRODUCTION_BRANCH" | awk '{print $1}')"
PUSH_MODE=""
case "$REMOTE_BEFORE" in
  "$BASE_COMMIT")
    git -C "$ROOT" push --porcelain origin "$TARGET_COMMIT:refs/heads/$PRODUCTION_BRANCH" > "$OUT/push.txt" 2>&1 || fail "remote_fast_forward_push_failed"
    REMOTE_UPDATED=1
    PUSH_MODE="FAST_FORWARD"
    ;;
  "$TARGET_COMMIT")
    PUSH_MODE="ALREADY_SYNCHRONIZED"
    ;;
  *)
    fail "remote_production_branch_drift"
    ;;
esac

REMOTE_AFTER="$(git -C "$ROOT" ls-remote origin "refs/heads/$PRODUCTION_BRANCH" | awk '{print $1}')"
test "$REMOTE_AFTER" = "$TARGET_COMMIT" || fail "remote_production_branch_not_target"

{
  echo "BLOG_REVIEW_PREVIEW_PRODUCTION_REMOTE_SYNC_STATUS=PASS"
  echo "PRODUCTION_BRANCH=$PRODUCTION_BRANCH"
  echo "LOCAL_PRODUCTION_COMMIT=$TARGET_COMMIT"
  echo "REMOTE_PRODUCTION_COMMIT_BEFORE=$REMOTE_BEFORE"
  echo "REMOTE_PRODUCTION_COMMIT_AFTER=$REMOTE_AFTER"
  echo "REMOTE_SYNC_MODE=$PUSH_MODE"
  echo "REMOTE_PRODUCTION_BRANCH_UPDATED=YES"
  echo "MINIMAL_RUNTIME_FILE_COUNT=9"
  echo "LIVE_BLOG_ROUTE_MODIFIED=NO"
  echo "PRODUCTION_BUILD_ID=$EXPECTED_BUILD_ID"
  echo "PM2_STATUS=ONLINE"
  echo "PM2_PID=$PM2_PID"
  echo "PM2_RESTARTS=$PM2_RESTARTS"
  echo "UNAUTHENTICATED_PREVIEW_STATUS=$UNAUTH_STATUS"
  echo "WRONG_TOKEN_PREVIEW_STATUS=$WRONG_STATUS"
  echo "UNAUTHENTICATED_MALFORMED_SLUG_STATUS=$MALFORMED_UNAUTH_STATUS"
  echo "AUTHENTICATED_MALFORMED_SLUG_STATUS=$MALFORMED_AUTH_STATUS"
  echo "AUTHENTICATED_PREVIEW_STATUS=$AUTH_STATUS"
  echo "DATABASE_SIGNATURE_UNCHANGED=YES"
  echo "DATABASE_WRITE_PERFORMED=NO"
  echo "PM2_RESTART_PERFORMED=NO"
  echo "PREVIEW_TOKEN_CHANGED=NO"
  echo "ROLLBACK_BUILD_RETAINED=YES"
  echo "REPORT=$OUT"
} | tee "$STATUS"

cleanup_secret
trap - EXIT
