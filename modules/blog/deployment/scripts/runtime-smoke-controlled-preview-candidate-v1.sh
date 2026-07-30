#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

export HOME="${HOME:-/root}"
export PM2_HOME="${PM2_HOME:-/root/.pm2}"

ROOT="${ROOT:-/var/www/sikhadenge.in/sikhadenge-website-space}"
CANDIDATE_DIR="${CANDIDATE_DIR:-}"
CANDIDATE_REPORT="${CANDIDATE_REPORT:-}"
BASE_COMMIT="${BASE_COMMIT:-be9476bddb9b2091c37eab69049e2efef9c31879}"
TARGET_COMMIT="${TARGET_COMMIT:-74af60d3a3026646a0b66feb869e5b7ce60bd229}"
PM2_NAME="${PM2_NAME:-sikhadenge-in}"
SLUG="${SLUG:-chatgpt-se-resume-kaise-banaye}"
ARTIFACT_ROOT="${ARTIFACT_ROOT:-/var/lib/sikhadenge-blog-artifacts}"
TS="$(date +%Y%m%d_%H%M%S)"
OUT="$ARTIFACT_ROOT/blog-review-preview-candidate-runtime-smoke-v1-$TS"
LOCK_FILE="/var/lock/sikhadenge-blog-review-preview-runtime-smoke.lock"
STATUS_FILE="$OUT/status.txt"
SERVER_PID=""
PORT=""
TOKEN=""

mkdir -p "$OUT"
chmod 700 "$OUT"

cleanup() {
  local rc=$?
  if test -n "$SERVER_PID" && kill -0 "$SERVER_PID" 2>/dev/null; then
    kill -TERM "$SERVER_PID" 2>/dev/null || true
    for _ in $(seq 1 30); do
      kill -0 "$SERVER_PID" 2>/dev/null || break
      sleep 1
    done
    kill -KILL "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
  if test -n "$PORT"; then
    ss -H -ltn "sport = :$PORT" > "$OUT/port-after-cleanup.txt" 2>/dev/null || true
  fi
  TOKEN=""
  return "$rc"
}
trap cleanup EXIT INT TERM

fail() {
  local reason="$1"
  {
    echo "BLOG_REVIEW_PREVIEW_CANDIDATE_RUNTIME_SMOKE_STATUS=FAIL"
    echo "REASON=$reason"
    echo "BASE_COMMIT=$BASE_COMMIT"
    echo "TARGET_COMMIT=$TARGET_COMMIT"
    echo "CANDIDATE_DIR=$CANDIDATE_DIR"
    echo "CANDIDATE_REPORT=$CANDIDATE_REPORT"
    echo "REPORT=$OUT"
    echo "PRODUCTION_DEPLOYMENT_PERFORMED=NO"
    echo "PRODUCTION_PM2_RESTART_PERFORMED=NO"
    echo "PERSISTENT_PREVIEW_TOKEN_CREATED=NO"
    echo "DATABASE_WRITE_PERFORMED=NO"
  } | tee "$STATUS_FILE" >&2
  exit 1
}

for command_name in git node curl jq psql pm2 flock ss openssl sha256sum grep awk sed; do
  command -v "$command_name" >/dev/null 2>&1 || fail "${command_name}_not_found"
done

exec 9>"$LOCK_FILE"
flock -n 9 || fail "runtime_smoke_lock_busy"

test -n "$CANDIDATE_DIR" || fail "candidate_dir_not_supplied"
test -n "$CANDIDATE_REPORT" || fail "candidate_report_not_supplied"
test -d "$CANDIDATE_DIR" || fail "candidate_dir_missing"
test -d "$CANDIDATE_REPORT" || fail "candidate_report_missing"
test -f "$CANDIDATE_REPORT/status.txt" || fail "candidate_status_missing"
grep -qx 'BLOG_REVIEW_PREVIEW_CANDIDATE_BUILD_STATUS=PASS' "$CANDIDATE_REPORT/status.txt" || fail "candidate_build_not_passed"
grep -qx "TARGET_COMMIT=$TARGET_COMMIT" "$CANDIDATE_REPORT/status.txt" || fail "candidate_target_commit_mismatch"
grep -qx "CANDIDATE_DIR=$CANDIDATE_DIR" "$CANDIDATE_REPORT/status.txt" || fail "candidate_directory_attestation_mismatch"

test -s "$CANDIDATE_DIR/.next/BUILD_ID" || fail "candidate_build_id_missing"
test -x "$CANDIDATE_DIR/node_modules/.bin/next" || fail "candidate_next_binary_missing"
test -f "$CANDIDATE_DIR/node_modules/next/package.json" || fail "candidate_next_package_missing"
test -f "$CANDIDATE_DIR/.next/server/app/api/internal/blog-review-preview/[slug]/route.js" || fail "candidate_preview_route_artifact_missing"
test "$(readlink -f "$CANDIDATE_DIR/.env.local")" = "$(readlink -f "$ROOT/.env.local")" || fail "candidate_env_link_mismatch"

LIVE_HEAD_BEFORE="$(git -C "$ROOT" rev-parse HEAD)"
LIVE_BRANCH_BEFORE="$(git -C "$ROOT" branch --show-current)"
LIVE_STATUS_BEFORE="$(git -C "$ROOT" status --porcelain)"
LIVE_BUILD_ID_BEFORE="$(cat "$ROOT/.next/BUILD_ID" 2>/dev/null || true)"

PM2_RAW_BEFORE="$OUT/pm2-before.raw.json"
HOME=/root PM2_HOME=/root/.pm2 pm2 jlist > "$PM2_RAW_BEFORE" 2>"$OUT/pm2-before.stderr.log" || fail "production_pm2_query_before_failed"
jq -e . "$PM2_RAW_BEFORE" >/dev/null 2>&1 || fail "production_pm2_json_before_invalid"
PM2_BEFORE="$(jq -c --arg name "$PM2_NAME" '.[] | select(.name==$name) | {pid,status:.pm2_env.status,restarts:.pm2_env.restart_time}' "$PM2_RAW_BEFORE")"

test "$LIVE_HEAD_BEFORE" = "$BASE_COMMIT" || fail "production_head_drift"
test -z "$LIVE_STATUS_BEFORE" || fail "production_worktree_not_clean"
test -n "$LIVE_BUILD_ID_BEFORE" || fail "production_build_id_missing"
test -n "$PM2_BEFORE" || fail "production_pm2_process_missing"
test "$(printf '%s' "$PM2_BEFORE" | jq -r '.status')" = "online" || fail "production_pm2_not_online"

set -a
# shellcheck disable=SC1090
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

for candidate_port in $(seq 3310 3340); do
  if ! ss -H -ltn "sport = :$candidate_port" 2>/dev/null | grep -q .; then
    PORT="$candidate_port"
    break
  fi
done
test -n "$PORT" || fail "no_isolated_runtime_port_available"
echo "PORT=$PORT" > "$OUT/runtime-port.txt"

TOKEN="$(openssl rand -base64 48 | tr -d '\n')"
WRONG_TOKEN="$(openssl rand -base64 48 | tr -d '\n')"
test "$(printf '%s' "$TOKEN" | wc -c | tr -d ' ')" -ge 32 || fail "ephemeral_token_generation_failed"

(
  cd "$CANDIDATE_DIR"
  exec env \
    HOME=/root \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    BLOG_REVIEW_PREVIEW_TOKEN="$TOKEN" \
    ./node_modules/.bin/next start -H 127.0.0.1 -p "$PORT"
) >"$OUT/server.log" 2>&1 &
SERVER_PID=$!
echo "SERVER_PID=$SERVER_PID" > "$OUT/server-process.txt"

READY=NO
for _ in $(seq 1 90); do
  kill -0 "$SERVER_PID" 2>/dev/null || fail "candidate_server_exited_before_ready"
  ROOT_CODE="$(curl -sS -H 'Host: sikhadenge.in' -o /dev/null -w '%{http_code}' --max-time 5 "http://127.0.0.1:$PORT/" || true)"
  if test "$ROOT_CODE" = "200"; then
    READY=YES
    break
  fi
  sleep 2
done
test "$READY" = "YES" || fail "candidate_server_readiness_timeout"

echo "ROOT_STATUS=200" > "$OUT/local-baseline-status.txt"
for path in "/blog" "/blog/$SLUG"; do
  code="$(curl -sS -H 'Host: sikhadenge.in' -o /dev/null -w '%{http_code}' --max-time 30 "http://127.0.0.1:$PORT$path" || true)"
  printf '%s %s\n' "$code" "$path" >> "$OUT/local-baseline-status.txt"
  test "$code" = "200" || fail "candidate_local_baseline_failed"
done

ENDPOINT="http://127.0.0.1:$PORT/api/internal/blog-review-preview/$SLUG"

UNAUTH_CODE="$(curl -sS -H 'Host: sikhadenge.in' -D "$OUT/unauth.headers" -o "$OUT/unauth.body.json" -w '%{http_code}' --max-time 30 "$ENDPOINT" || true)"
test "$UNAUTH_CODE" = "404" || fail "unauthenticated_request_not_hidden"
jq -e '.ok == false and .error == "NOT_FOUND"' "$OUT/unauth.body.json" >/dev/null || fail "unauthenticated_body_contract_failed"

WRONG_CODE="$(curl -sS -H 'Host: sikhadenge.in' -H "x-sikhadenge-blog-review-token: $WRONG_TOKEN" -D "$OUT/wrong-token.headers" -o "$OUT/wrong-token.body.json" -w '%{http_code}' --max-time 30 "$ENDPOINT" || true)"
test "$WRONG_CODE" = "404" || fail "wrong_token_request_not_hidden"
jq -e '.ok == false and .error == "NOT_FOUND"' "$OUT/wrong-token.body.json" >/dev/null || fail "wrong_token_body_contract_failed"

MALFORMED_CODE="$(curl -sS -H 'Host: sikhadenge.in' -H "x-sikhadenge-blog-review-token: $TOKEN" -D "$OUT/malformed.headers" -o "$OUT/malformed.body.json" -w '%{http_code}' --max-time 30 "http://127.0.0.1:$PORT/api/internal/blog-review-preview/bad%20slug" || true)"
test "$MALFORMED_CODE" = "400" || fail "malformed_slug_status_failed"
jq -e '.ok == false and .error == "INVALID_SLUG"' "$OUT/malformed.body.json" >/dev/null || fail "malformed_slug_body_contract_failed"

VALID_CODE="$(curl -sS -H 'Host: sikhadenge.in' -H "x-sikhadenge-blog-review-token: $TOKEN" -D "$OUT/valid.headers" -o "$OUT/valid.body.json" -w '%{http_code}' --max-time 30 "$ENDPOINT" || true)"
test "$VALID_CODE" = "200" || fail "authenticated_preview_request_failed"

jq -e --arg slug "$SLUG" '
  .ok == true and
  .mode == "CONTROLLED_REVIEW_PREVIEW" and
  .record.page.slug == $slug and
  .record.page.lifecycleStatus == "DISCOVERED" and
  .record.page.indexEligibility == "BLOCKED" and
  .record.version.status == "WRITING" and
  .record.version.origin == "MIGRATED" and
  .record.safety.publicationBlocked == true and
  .record.safety.publicationApproved == false and
  .record.safety.indexEligibilityApproved == false and
  .record.safety.routeEligible == false and
  .metadata.index == false and
  .metadata.canonicalUrl == null and
  .access.authenticated == true and
  .access.tokenStored == false and
  .access.tokenReturned == false and
  .routeSafety.reviewOnly == true and
  .routeSafety.routeMounted == true and
  .routeSafety.routeEligible == false and
  .routeSafety.publicationApproved == false and
  .routeSafety.indexEligibilityApproved == false and
  .routeSafety.databaseWriteAllowed == false and
  .routeSafety.liveBlogRouteModified == false
' "$OUT/valid.body.json" >/dev/null || fail "authenticated_preview_body_contract_failed"

header_value() {
  local name="$1"
  local file="$2"
  awk -v target="${name,,}" 'BEGIN{IGNORECASE=1} {
    line=$0
    sub(/\r$/, "", line)
    split(line, parts, ":")
    key=tolower(parts[1])
    if (key==target) {
      sub(/^[^:]*:[[:space:]]*/, "", line)
      print line
    }
  }' "$file" | tail -n 1
}

CACHE_CONTROL="$(header_value 'cache-control' "$OUT/valid.headers")"
ROBOTS="$(header_value 'x-robots-tag' "$OUT/valid.headers")"
REFERRER="$(header_value 'referrer-policy' "$OUT/valid.headers")"
FRAME="$(header_value 'x-frame-options' "$OUT/valid.headers")"
CONTENT_TYPE_OPTIONS="$(header_value 'x-content-type-options' "$OUT/valid.headers")"
VARY="$(header_value 'vary' "$OUT/valid.headers")"

test "$CACHE_CONTROL" = "private, no-store, no-cache, max-age=0, must-revalidate" || fail "cache_control_header_failed"
test "$ROBOTS" = "noindex, nofollow, noarchive, nosnippet, noimageindex" || fail "robots_header_failed"
test "$REFERRER" = "no-referrer" || fail "referrer_policy_header_failed"
test "$FRAME" = "DENY" || fail "frame_options_header_failed"
test "$CONTENT_TYPE_OPTIONS" = "nosniff" || fail "content_type_options_header_failed"
printf '%s' "$VARY" | grep -qi 'x-sikhadenge-blog-review-token' || fail "vary_header_failed"
! grep -qiE '(^|[[:space:]])link:.*rel="canonical"' "$OUT/valid.headers" || fail "canonical_header_present"

DB_SIGNATURE_AFTER="$(psql "$DATABASE_URL" -X -At -F'|' -c "SELECT
  (SELECT count(*) FROM blog_content.workspaces),
  (SELECT count(*) FROM blog_content.pages),
  (SELECT count(*) FROM blog_content.page_versions),
  (SELECT count(*) FROM blog_content.content_fingerprints),
  (SELECT count(*) FROM blog_content.publications),
  (SELECT count(*) FROM blog_content.quality_runs),
  (SELECT count(*) FROM blog_content.editorial_reviews);")" || fail "database_signature_after_failed"
echo "$DB_SIGNATURE_AFTER" > "$OUT/database-signature-after.txt"
test "$DB_SIGNATURE_BEFORE" = "$DB_SIGNATURE_AFTER" || fail "database_signature_changed"

LIVE_HEAD_AFTER="$(git -C "$ROOT" rev-parse HEAD)"
LIVE_BRANCH_AFTER="$(git -C "$ROOT" branch --show-current)"
LIVE_STATUS_AFTER="$(git -C "$ROOT" status --porcelain)"
LIVE_BUILD_ID_AFTER="$(cat "$ROOT/.next/BUILD_ID" 2>/dev/null || true)"
PM2_RAW_AFTER="$OUT/pm2-after.raw.json"
HOME=/root PM2_HOME=/root/.pm2 pm2 jlist > "$PM2_RAW_AFTER" 2>"$OUT/pm2-after.stderr.log" || fail "production_pm2_query_after_failed"
jq -e . "$PM2_RAW_AFTER" >/dev/null 2>&1 || fail "production_pm2_json_after_invalid"
PM2_AFTER="$(jq -c --arg name "$PM2_NAME" '.[] | select(.name==$name) | {pid,status:.pm2_env.status,restarts:.pm2_env.restart_time}' "$PM2_RAW_AFTER")"

test "$LIVE_HEAD_AFTER" = "$LIVE_HEAD_BEFORE" || fail "production_head_changed"
test "$LIVE_BRANCH_AFTER" = "$LIVE_BRANCH_BEFORE" || fail "production_branch_changed"
test -z "$LIVE_STATUS_AFTER" || fail "production_worktree_changed"
test "$LIVE_BUILD_ID_AFTER" = "$LIVE_BUILD_ID_BEFORE" || fail "production_build_id_changed"
test "$PM2_AFTER" = "$PM2_BEFORE" || fail "production_pm2_state_changed"

for url in \
  "https://sikhadenge.in/" \
  "https://sikhadenge.in/blog" \
  "https://sikhadenge.in/blog/$SLUG"
do
  code="$(curl -sS -L -o /dev/null -w '%{http_code}' --max-time 30 "$url" || true)"
  printf '%s %s\n' "$code" "$url" >> "$OUT/production-http-after.txt"
  test "$code" = "200" || fail "production_http_baseline_failed"
done

if grep -RFl --exclude='status.txt' "$TOKEN" "$OUT" >/dev/null 2>&1; then
  fail "ephemeral_token_leaked_to_artifacts"
fi
if grep -RFl --exclude='status.txt' "$WRONG_TOKEN" "$OUT" >/dev/null 2>&1; then
  fail "wrong_token_leaked_to_artifacts"
fi

{
  echo "BLOG_REVIEW_PREVIEW_CANDIDATE_RUNTIME_SMOKE_STATUS=PASS"
  echo "BASE_COMMIT=$BASE_COMMIT"
  echo "TARGET_COMMIT=$TARGET_COMMIT"
  echo "CANDIDATE_BUILD_STATUS=PASS"
  echo "CANDIDATE_BUILD_ID=$(cat "$CANDIDATE_DIR/.next/BUILD_ID")"
  echo "ISOLATED_RUNTIME_BIND=127.0.0.1"
  echo "ISOLATED_RUNTIME_PORT=$PORT"
  echo "LOCAL_ROOT_STATUS=200"
  echo "LOCAL_BLOG_STATUS=200"
  echo "LOCAL_EXISTING_BLOG_STATUS=200"
  echo "UNAUTHENTICATED_PREVIEW_STATUS=404"
  echo "WRONG_TOKEN_PREVIEW_STATUS=404"
  echo "MALFORMED_SLUG_STATUS=400"
  echo "AUTHENTICATED_PREVIEW_STATUS=200"
  echo "AUTHENTICATED_RECORD_STATE=DISCOVERED_WRITING_MIGRATED_BLOCKED"
  echo "REVIEW_ONLY_SAFETY_CONTRACT=PASS"
  echo "NOINDEX_NOFOLLOW_NOARCHIVE_HEADERS=PASS"
  echo "PRIVATE_NO_STORE_HEADERS=PASS"
  echo "CANONICAL_HEADER_PRESENT=NO"
  echo "EPHEMERAL_TOKEN_RETURNED=NO"
  echo "EPHEMERAL_TOKEN_STORED=NO"
  echo "EPHEMERAL_TOKEN_LEAKED_TO_ARTIFACTS=NO"
  echo "DATABASE_SIGNATURE_UNCHANGED=YES"
  echo "DATABASE_WRITE_PERFORMED=NO"
  echo "PRODUCTION_HEAD_UNCHANGED=YES"
  echo "PRODUCTION_BUILD_ID_UNCHANGED=YES"
  echo "PRODUCTION_PM2_STATE_UNCHANGED=YES"
  echo "PRODUCTION_HTTP_BASELINE=PASS"
  echo "PRODUCTION_DEPLOYMENT_PERFORMED=NO"
  echo "PRODUCTION_PM2_RESTART_PERFORMED=NO"
  echo "PERSISTENT_PREVIEW_TOKEN_CREATED=NO"
  echo "CANDIDATE_DIR=$CANDIDATE_DIR"
  echo "CANDIDATE_REPORT=$CANDIDATE_REPORT"
  echo "REPORT=$OUT"
} | tee "$STATUS_FILE"
