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
CANDIDATE="${CANDIDATE:-/var/www/sikhadenge.in/_candidate-builds/blog-review-preview-prod-v1-20260730_094918}"
BUILD_REPORT="${BUILD_REPORT:-/var/lib/sikhadenge-blog-artifacts/blog-review-preview-candidate-build-v1-20260730_094918}"
RUNTIME_REPORT="${RUNTIME_REPORT:-/var/lib/sikhadenge-blog-artifacts/blog-review-preview-candidate-runtime-smoke-v1-20260730_102517}"
PREFLIGHT_REPORT="${PREFLIGHT_REPORT:-/var/lib/sikhadenge-blog-artifacts/blog-review-preview-production-switch-preflight-v2-20260730_105622}"
ARTIFACT_ROOT="${ARTIFACT_ROOT:-/var/lib/sikhadenge-blog-artifacts}"
TS="$(date +%Y%m%d_%H%M%S)"
OUT="$ARTIFACT_ROOT/blog-review-preview-production-deployment-v1-$TS"
STATUS="$OUT/status.txt"
LOCK_FILE="/var/lock/sikhadenge-blog-review-preview-production-deployment.lock"
STAGED_NEXT="$ROOT/.next.deploy-$TS"
ROLLBACK_NEXT="$ROOT/.next.rollback-$TS"
ENV_BACKUP="$OUT/env.local.before"
CURL_CONFIG="/dev/shm/blog-preview-curl-$TS.conf"
TOKEN=""
MUTATED=0
SWAPPED_NEXT=0
RESTARTED=0

mkdir -p "$OUT"
chmod 700 "$OUT"

cleanup_secret() {
  rm -f "$CURL_CONFIG" 2>/dev/null || true
  TOKEN=""
}
trap cleanup_secret EXIT

write_failure() {
  local reason="$1"
  {
    echo "BLOG_REVIEW_PREVIEW_PRODUCTION_DEPLOYMENT_STATUS=FAIL"
    echo "REASON=$reason"
    echo "BASE_COMMIT=$BASE_COMMIT"
    echo "TARGET_COMMIT=$TARGET_COMMIT"
    echo "MUTATED=$MUTATED"
    echo "ROLLBACK_ATTEMPTED=$(test "$MUTATED" = "1" && echo YES || echo NO)"
    echo "REPORT=$OUT"
  } | tee "$STATUS" >&2
}

wait_for_pm2_and_local_http() {
  local attempt status code
  for attempt in $(seq 1 90); do
    status="$(pm2 jlist 2>/dev/null | jq -r --arg name "$PM2_NAME" '.[] | select(.name==$name) | .pm2_env.status' | head -n1)"
    code="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 5 -H 'Host: sikhadenge.in' http://127.0.0.1:3000/ 2>/dev/null || true)"
    if test "$status" = "online" && test "$code" = "200"; then
      return 0
    fi
    sleep 1
  done
  return 1
}

rollback() {
  set +e
  {
    echo "ROLLBACK_STARTED_AT=$(date -Is)"
    echo "SWAPPED_NEXT=$SWAPPED_NEXT"
    echo "RESTARTED=$RESTARTED"
  } > "$OUT/rollback.log"

  if test "$SWAPPED_NEXT" = "1" && test -d "$ROLLBACK_NEXT"; then
    if test -d "$ROOT/.next"; then
      mv "$ROOT/.next" "$OUT/failed-next" 2>>"$OUT/rollback.log" || rm -rf "$ROOT/.next"
    fi
    mv "$ROLLBACK_NEXT" "$ROOT/.next" 2>>"$OUT/rollback.log" || true
  fi

  if test -f "$ENV_BACKUP"; then
    cp -a "$ENV_BACKUP" "$ROOT/.env.local" 2>>"$OUT/rollback.log" || true
  fi

  git -C "$ROOT" reset --hard "$BASE_COMMIT" >>"$OUT/rollback.log" 2>&1 || true
  rm -rf "$ROOT/modules/blog/database/generated/client" 2>>"$OUT/rollback.log" || true
  rm -rf "$STAGED_NEXT" 2>>"$OUT/rollback.log" || true

  pm2 restart "$PM2_NAME" --update-env >>"$OUT/rollback.log" 2>&1 || true
  wait_for_pm2_and_local_http >>"$OUT/rollback.log" 2>&1 || true

  {
    echo "ROLLBACK_HEAD=$(git -C "$ROOT" rev-parse HEAD 2>/dev/null || true)"
    echo "ROLLBACK_BUILD_ID=$(cat "$ROOT/.next/BUILD_ID" 2>/dev/null || true)"
    echo "ROLLBACK_FINISHED_AT=$(date -Is)"
  } >> "$OUT/rollback.log"
}

fail() {
  local reason="$1"
  if test "$MUTATED" = "1"; then
    rollback
  fi
  write_failure "$reason"
  exit 1
}

for cmd in git jq pm2 curl psql openssl sha256sum grep awk sed stat df du cp mv rm mkdir chmod flock seq tar; do
  command -v "$cmd" >/dev/null 2>&1 || fail "${cmd}_not_found"
done

exec 9>"$LOCK_FILE"
flock -n 9 || fail "deployment_lock_busy"

test -d "$ROOT/.git" || fail "production_repository_missing"
test -f "$ROOT/.env.local" || fail "production_env_missing"
test -s "$ROOT/.next/BUILD_ID" || fail "production_build_missing"
test -s "$CANDIDATE/.next/BUILD_ID" || fail "candidate_build_missing"
test -d "$CANDIDATE/modules/blog/database/generated/client" || fail "candidate_generated_client_missing"
test -f "$CANDIDATE/.next/server/app/api/internal/blog-review-preview/[slug]/route.js" || fail "candidate_preview_route_artifact_missing"

grep -qx 'BLOG_REVIEW_PREVIEW_CANDIDATE_BUILD_STATUS=PASS' "$BUILD_REPORT/status.txt" || fail "candidate_build_not_passed"
grep -qx 'BLOG_REVIEW_PREVIEW_CANDIDATE_RUNTIME_SMOKE_STATUS=PASS' "$RUNTIME_REPORT/status.txt" || fail "candidate_runtime_not_passed"
grep -qx 'BLOG_REVIEW_PREVIEW_PRODUCTION_SWITCH_PREFLIGHT_STATUS=PASS' "$PREFLIGHT_REPORT/status.txt" || fail "switch_preflight_not_passed"

test "$(git -C "$ROOT" rev-parse HEAD)" = "$BASE_COMMIT" || fail "production_head_drift"
test "$(git -C "$ROOT" branch --show-current)" = "$PRODUCTION_BRANCH" || fail "production_branch_mismatch"
test -z "$(git -C "$ROOT" status --porcelain)" || fail "production_worktree_not_clean"
test "$(git -C "$ROOT" rev-parse "$TARGET_COMMIT^")" = "$BASE_COMMIT" || fail "target_not_direct_child"
test "$(git -C "$ROOT" merge-base "$BASE_COMMIT" "$TARGET_COMMIT")" = "$BASE_COMMIT" || fail "target_not_fast_forward"
test "$(git -C "$ROOT" rev-parse "$BASE_COMMIT:app/blog/[slug]/page.tsx")" = "$(git -C "$ROOT" rev-parse "$TARGET_COMMIT:app/blog/[slug]/page.tsx")" || fail "live_blog_route_changed"

REMOTE_PRODUCTION_HEAD="$(git -C "$ROOT" ls-remote origin "refs/heads/$PRODUCTION_BRANCH" | awk '{print $1}')"
test "$REMOTE_PRODUCTION_HEAD" = "$BASE_COMMIT" || fail "remote_production_branch_drift"

TOKEN_LINES="$(grep -cE '^[[:space:]]*BLOG_REVIEW_PREVIEW_TOKEN=' "$ROOT/.env.local" || true)"
test "$TOKEN_LINES" = "0" || fail "preview_token_already_present"

PM2_BEFORE_JSON="$OUT/pm2-before.json"
pm2 jlist > "$PM2_BEFORE_JSON" 2>"$OUT/pm2-before.stderr" || fail "pm2_before_failed"
jq -e . "$PM2_BEFORE_JSON" >/dev/null || fail "pm2_before_invalid_json"
PM2_BEFORE_COUNT="$(jq --arg name "$PM2_NAME" '[.[] | select(.name==$name)] | length' "$PM2_BEFORE_JSON")"
test "$PM2_BEFORE_COUNT" = "1" || fail "pm2_process_count_invalid"
PM2_PID_BEFORE="$(jq -r --arg name "$PM2_NAME" '.[] | select(.name==$name) | .pid' "$PM2_BEFORE_JSON")"
PM2_RESTARTS_BEFORE="$(jq -r --arg name "$PM2_NAME" '.[] | select(.name==$name) | .pm2_env.restart_time' "$PM2_BEFORE_JSON")"
PM2_STATUS_BEFORE="$(jq -r --arg name "$PM2_NAME" '.[] | select(.name==$name) | .pm2_env.status' "$PM2_BEFORE_JSON")"
test "$PM2_STATUS_BEFORE" = "online" || fail "production_pm2_not_online"

set -a
. "$ROOT/.env.local"
set +a
test -n "${DATABASE_URL:-}" || fail "DATABASE_URL_missing"

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
test "$DB_PUBLICATIONS" = "0" || fail "publications_not_zero_before"
test "$DB_QUALITY" = "0" || fail "quality_runs_not_zero_before"
test "$DB_REVIEWS" = "0" || fail "editorial_reviews_not_zero_before"

for url in \
  'https://sikhadenge.in/' \
  'https://sikhadenge.in/blog' \
  'https://sikhadenge.in/blog/chatgpt-se-resume-kaise-banaye'
do
  code="$(curl -sS -L -o /dev/null -w '%{http_code}' --max-time 30 "$url" || true)"
  printf '%s %s\n' "$code" "$url" >> "$OUT/live-http-before.txt"
  test "$code" = "200" || fail "production_http_before_failed"
done

CANDIDATE_BUILD_ID="$(cat "$CANDIDATE/.next/BUILD_ID")"
REPORT_BUILD_ID="$(grep '^CANDIDATE_BUILD_ID=' "$BUILD_REPORT/status.txt" | tail -n1 | cut -d= -f2-)"
test "$CANDIDATE_BUILD_ID" = "$REPORT_BUILD_ID" || fail "candidate_build_id_mismatch"

CANDIDATE_ROUTE_SHA="$(sha256sum "$CANDIDATE/.next/server/app/api/internal/blog-review-preview/[slug]/route.js" | awk '{print $1}')"
REPORT_ROUTE_SHA="$(grep '^CONTROLLED_PREVIEW_ROUTE_SHA256=' "$BUILD_REPORT/candidate-build-artifacts.txt" | tail -n1 | cut -d= -f2-)"
test "$CANDIDATE_ROUTE_SHA" = "$REPORT_ROUTE_SHA" || fail "candidate_route_sha_mismatch"

CANDIDATE_NEXT_KB="$(du -sk "$CANDIDATE/.next" | awk '{print $1}')"
AVAILABLE_KB="$(df -Pk "$ROOT" | awk 'NR==2 {print $4}')"
REQUIRED_KB="$((CANDIDATE_NEXT_KB + 2097152))"
test "$AVAILABLE_KB" -gt "$REQUIRED_KB" || fail "insufficient_disk_for_staged_build"

cp -a "$ROOT/.env.local" "$ENV_BACKUP" || fail "env_backup_failed"
chmod 600 "$ENV_BACKUP"

cp -a "$CANDIDATE/.next" "$STAGED_NEXT" || fail "candidate_build_stage_failed"
test "$(cat "$STAGED_NEXT/BUILD_ID")" = "$CANDIDATE_BUILD_ID" || fail "staged_build_id_mismatch"
test -f "$STAGED_NEXT/server/app/api/internal/blog-review-preview/[slug]/route.js" || fail "staged_preview_route_missing"
test "$(sha256sum "$STAGED_NEXT/server/app/api/internal/blog-review-preview/[slug]/route.js" | awk '{print $1}')" = "$CANDIDATE_ROUTE_SHA" || fail "staged_preview_route_sha_mismatch"

TOKEN="$(openssl rand -hex 48)"
test "${#TOKEN}" = "96" || fail "generated_token_length_invalid"

MUTATED=1
printf '\nBLOG_REVIEW_PREVIEW_TOKEN=%s\n' "$TOKEN" >> "$ROOT/.env.local" || fail "preview_token_write_failed"
chmod 600 "$ROOT/.env.local"
test "$(grep -cE '^[[:space:]]*BLOG_REVIEW_PREVIEW_TOKEN=' "$ROOT/.env.local")" = "1" || fail "preview_token_entry_count_invalid"

git -C "$ROOT" merge --ff-only "$TARGET_COMMIT" >"$OUT/git-fast-forward.log" 2>&1 || fail "production_fast_forward_failed"
test "$(git -C "$ROOT" rev-parse HEAD)" = "$TARGET_COMMIT" || fail "production_head_not_target"

mkdir -p "$ROOT/modules/blog/database/generated"
rm -rf "$ROOT/modules/blog/database/generated/client"
cp -a "$CANDIDATE/modules/blog/database/generated/client" "$ROOT/modules/blog/database/generated/client" || fail "generated_client_install_failed"
test -s "$ROOT/modules/blog/database/generated/client/index.js" || fail "generated_client_js_missing"
test -s "$ROOT/modules/blog/database/generated/client/index.d.ts" || fail "generated_client_dts_missing"

mv "$ROOT/.next" "$ROLLBACK_NEXT" || fail "current_build_backup_failed"
mv "$STAGED_NEXT" "$ROOT/.next" || fail "candidate_build_switch_failed"
SWAPPED_NEXT=1
test "$(cat "$ROOT/.next/BUILD_ID")" = "$CANDIDATE_BUILD_ID" || fail "production_build_id_not_candidate"

pm2 restart "$PM2_NAME" --update-env >"$OUT/pm2-restart.log" 2>&1 || fail "pm2_restart_failed"
RESTARTED=1
wait_for_pm2_and_local_http || fail "production_runtime_not_ready"

PM2_AFTER_JSON="$OUT/pm2-after.json"
pm2 jlist > "$PM2_AFTER_JSON" 2>"$OUT/pm2-after.stderr" || fail "pm2_after_failed"
jq -e . "$PM2_AFTER_JSON" >/dev/null || fail "pm2_after_invalid_json"
PM2_PID_AFTER="$(jq -r --arg name "$PM2_NAME" '.[] | select(.name==$name) | .pid' "$PM2_AFTER_JSON")"
PM2_RESTARTS_AFTER="$(jq -r --arg name "$PM2_NAME" '.[] | select(.name==$name) | .pm2_env.restart_time' "$PM2_AFTER_JSON")"
PM2_STATUS_AFTER="$(jq -r --arg name "$PM2_NAME" '.[] | select(.name==$name) | .pm2_env.status' "$PM2_AFTER_JSON")"
test "$PM2_STATUS_AFTER" = "online" || fail "production_pm2_after_not_online"
test "$PM2_RESTARTS_AFTER" -ge "$((PM2_RESTARTS_BEFORE + 1))" || fail "pm2_restart_count_not_incremented"

for url in \
  'https://sikhadenge.in/' \
  'https://sikhadenge.in/blog' \
  'https://sikhadenge.in/blog/chatgpt-se-resume-kaise-banaye'
do
  code="$(curl -sS -L -o /dev/null -w '%{http_code}' --max-time 30 "$url" || true)"
  printf '%s %s\n' "$code" "$url" >> "$OUT/live-http-after.txt"
  test "$code" = "200" || fail "production_http_after_failed"
done

PREVIEW_URL='https://sikhadenge.in/api/internal/blog-review-preview/chatgpt-se-resume-kaise-banaye'
MALFORMED_URL='https://sikhadenge.in/api/internal/blog-review-preview/Bad_Slug'

UNAUTH_STATUS="$(curl -sS -D "$OUT/unauth.headers" -o "$OUT/unauth.json" -w '%{http_code}' --max-time 30 "$PREVIEW_URL" || true)"
test "$UNAUTH_STATUS" = "404" || fail "unauthenticated_preview_status_invalid"

WRONG_STATUS="$(curl -sS -H 'x-sikhadenge-blog-review-token: wrong-token-value-not-authorized' -D "$OUT/wrong.headers" -o "$OUT/wrong.json" -w '%{http_code}' --max-time 30 "$PREVIEW_URL" || true)"
test "$WRONG_STATUS" = "404" || fail "wrong_token_preview_status_invalid"

MALFORMED_STATUS="$(curl -sS -D "$OUT/malformed.headers" -o "$OUT/malformed.json" -w '%{http_code}' --max-time 30 "$MALFORMED_URL" || true)"
test "$MALFORMED_STATUS" = "400" || fail "malformed_slug_status_invalid"

printf 'header = "x-sikhadenge-blog-review-token: %s"\n' "$TOKEN" > "$CURL_CONFIG"
chmod 600 "$CURL_CONFIG"
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

test "$(git -C "$ROOT" rev-parse HEAD)" = "$TARGET_COMMIT" || fail "production_head_changed_after_verification"
test "$(git -C "$ROOT" branch --show-current)" = "$PRODUCTION_BRANCH" || fail "production_branch_changed_after_verification"
test -z "$(git -C "$ROOT" status --porcelain --untracked-files=no)" || fail "production_tracked_worktree_dirty"
test "$(git -C "$ROOT" rev-parse "$BASE_COMMIT:app/blog/[slug]/page.tsx")" = "$(git -C "$ROOT" rev-parse HEAD:app/blog/[slug]/page.tsx)" || fail "live_blog_route_modified_after_deployment"
test "$(cat "$ROOT/.next/BUILD_ID")" = "$CANDIDATE_BUILD_ID" || fail "production_build_id_changed_after_verification"

{
  echo "BLOG_REVIEW_PREVIEW_PRODUCTION_DEPLOYMENT_STATUS=PASS"
  echo "PRODUCTION_BRANCH=$PRODUCTION_BRANCH"
  echo "PREVIOUS_COMMIT=$BASE_COMMIT"
  echo "DEPLOYED_COMMIT=$TARGET_COMMIT"
  echo "TARGET_FAST_FORWARD_APPLIED=YES"
  echo "CANDIDATE_BUILD_ID=$CANDIDATE_BUILD_ID"
  echo "TESTED_CANDIDATE_ARTIFACT_DEPLOYED=YES"
  echo "ISOLATED_GENERATED_CLIENT_DEPLOYED=YES"
  echo "PREVIEW_TOKEN_CREATED=YES"
  echo "PREVIEW_TOKEN_LENGTH=${#TOKEN}"
  echo "PREVIEW_TOKEN_RETURNED=NO"
  echo "PREVIEW_TOKEN_LEAKED_TO_ARTIFACTS=NO"
  echo "PM2_STATUS=ONLINE"
  echo "PM2_PID_BEFORE=$PM2_PID_BEFORE"
  echo "PM2_PID_AFTER=$PM2_PID_AFTER"
  echo "PM2_RESTARTS_BEFORE=$PM2_RESTARTS_BEFORE"
  echo "PM2_RESTARTS_AFTER=$PM2_RESTARTS_AFTER"
  echo "PRODUCTION_HTTP_BASELINE=PASS"
  echo "UNAUTHENTICATED_PREVIEW_STATUS=$UNAUTH_STATUS"
  echo "WRONG_TOKEN_PREVIEW_STATUS=$WRONG_STATUS"
  echo "MALFORMED_SLUG_STATUS=$MALFORMED_STATUS"
  echo "AUTHENTICATED_PREVIEW_STATUS=$AUTH_STATUS"
  echo "REVIEW_ONLY_SAFETY_CONTRACT=PASS"
  echo "NOINDEX_NOFOLLOW_NOARCHIVE_HEADERS=PASS"
  echo "PRIVATE_NO_STORE_HEADERS=PASS"
  echo "CANONICAL_HEADER_PRESENT=NO"
  echo "DATABASE_SIGNATURE_UNCHANGED=YES"
  echo "DATABASE_WRITE_PERFORMED=NO"
  echo "LIVE_BLOG_ROUTE_MODIFIED=NO"
  echo "PUBLICATION_APPROVED=NO"
  echo "INDEX_ELIGIBILITY_APPROVED=NO"
  echo "REMOTE_PRODUCTION_BRANCH_UPDATED=NO"
  echo "ROLLBACK_BUILD_RETAINED=$ROLLBACK_NEXT"
  echo "REPORT=$OUT"
} | tee "$STATUS"

cleanup_secret
trap - EXIT
