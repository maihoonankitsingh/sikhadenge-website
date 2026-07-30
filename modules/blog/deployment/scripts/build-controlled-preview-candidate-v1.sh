#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

# systemd transient services do not always provide HOME. Pin PM2 to the
# production root account state so `pm2 jlist` never falls back to /etc/.pm2.
export HOME="${HOME:-/root}"
export PM2_HOME="${PM2_HOME:-$HOME/.pm2}"

ROOT="${ROOT:-/var/www/sikhadenge.in/sikhadenge-website-space}"
BASE_COMMIT="${BASE_COMMIT:-be9476bddb9b2091c37eab69049e2efef9c31879}"
TARGET_COMMIT="${TARGET_COMMIT:-74af60d3a3026646a0b66feb869e5b7ce60bd229}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-deploy/blog-review-preview-prod-20260729}"
PM2_NAME="${PM2_NAME:-sikhadenge-in}"
ARTIFACT_ROOT="${ARTIFACT_ROOT:-/var/lib/sikhadenge-blog-artifacts}"
CANDIDATE_ROOT="${CANDIDATE_ROOT:-/var/www/sikhadenge.in/_candidate-builds}"
TS="$(date +%Y%m%d_%H%M%S)"
OUT="$ARTIFACT_ROOT/blog-review-preview-candidate-build-v1-$TS"
CANDIDATE="$CANDIDATE_ROOT/blog-review-preview-prod-v1-$TS"
LOCK_FILE="/var/lock/sikhadenge-blog-review-preview-candidate-build.lock"
STATUS_FILE="$OUT/status.txt"

mkdir -p "$OUT" "$CANDIDATE_ROOT"
chmod 700 "$OUT"

fail() {
  local reason="$1"
  {
    echo "BLOG_REVIEW_PREVIEW_CANDIDATE_BUILD_STATUS=FAIL"
    echo "REASON=$reason"
    echo "BASE_COMMIT=$BASE_COMMIT"
    echo "TARGET_COMMIT=$TARGET_COMMIT"
    echo "CANDIDATE_DIR=$CANDIDATE"
    echo "REPORT=$OUT"
    echo "PRODUCTION_DEPLOYMENT_PERFORMED=NO"
    echo "PM2_RESTART_PERFORMED=NO"
    echo "PREVIEW_TOKEN_CREATED=NO"
    echo "DATABASE_WRITE_PERFORMED=NO"
  } | tee "$STATUS_FILE" >&2
  exit 1
}

for command_name in git tar npm node psql sha256sum curl jq pm2 flock find stat findmnt cmp awk cut sort wc du; do
  command -v "$command_name" >/dev/null 2>&1 || fail "${command_name}_not_found"
done

test -d "$PM2_HOME" || fail "pm2_home_missing"

exec 9>"$LOCK_FILE"
flock -n 9 || fail "candidate_build_lock_busy"

test -d "$ROOT/.git" || fail "production_repository_missing"
test -f "$ROOT/package-lock.json" || fail "production_lockfile_missing"
test -f "$ROOT/.env.local" || fail "production_env_missing"
test ! -e "$CANDIDATE" || fail "candidate_directory_exists"

LIVE_HEAD_BEFORE="$(git -C "$ROOT" rev-parse HEAD)"
LIVE_BRANCH_BEFORE="$(git -C "$ROOT" branch --show-current)"
LIVE_STATUS_BEFORE="$(git -C "$ROOT" status --porcelain)"
LIVE_BUILD_ID_BEFORE="$(cat "$ROOT/.next/BUILD_ID" 2>/dev/null || true)"
PM2_JSON_BEFORE="$(pm2 jlist 2>"$OUT/pm2-before.stderr.log")" || fail "production_pm2_snapshot_before_failed"
printf '%s' "$PM2_JSON_BEFORE" | jq -e 'type == "array"' >/dev/null || fail "production_pm2_json_before_invalid"
PM2_BEFORE="$(printf '%s' "$PM2_JSON_BEFORE" | jq -c --arg name "$PM2_NAME" '.[] | select(.name==$name) | {pid,status:.pm2_env.status,restarts:.pm2_env.restart_time}')"

{
  echo "HOME=$HOME"
  echo "PM2_HOME=$PM2_HOME"
  echo "LIVE_HEAD_BEFORE=$LIVE_HEAD_BEFORE"
  echo "LIVE_BRANCH_BEFORE=$LIVE_BRANCH_BEFORE"
  echo "LIVE_BUILD_ID_BEFORE=$LIVE_BUILD_ID_BEFORE"
  echo "PM2_BEFORE=$PM2_BEFORE"
} > "$OUT/production-before.txt"

# This release is intentionally pinned to the clean production baseline.
test "$LIVE_HEAD_BEFORE" = "$BASE_COMMIT" || fail "production_head_drift"
test -z "$LIVE_STATUS_BEFORE" || fail "production_worktree_not_clean"
test -n "$LIVE_BUILD_ID_BEFORE" || fail "production_build_id_missing"
test -n "$PM2_BEFORE" || fail "production_pm2_process_missing"
test "$(printf '%s' "$PM2_BEFORE" | jq -r '.status')" = "online" || fail "production_pm2_not_online"

# Fetch metadata only. No checkout, reset, merge, cherry-pick or branch update is performed.
git -C "$ROOT" fetch origin "$DEPLOY_BRANCH" >"$OUT/git-fetch.log" 2>&1 || fail "deployment_branch_fetch_failed"
git -C "$ROOT" cat-file -e "$TARGET_COMMIT^{commit}" || fail "target_commit_missing"
test "$(git -C "$ROOT" rev-parse "$TARGET_COMMIT^")" = "$BASE_COMMIT" || fail "target_not_direct_child_of_production_base"

cat > "$OUT/allowed-files.txt" <<'FILES'
app/api/internal/blog-review-preview/[slug]/route.ts
modules/blog/database/client.ts
modules/blog/database/generated/.gitignore
modules/blog/database/schema.prisma
modules/blog/preview/controlled-review-preview.ts
modules/blog/preview/index.ts
modules/blog/repositories/imported-page-repository.ts
modules/blog/repositories/index.ts
modules/blog/repositories/workspace-repository.ts
FILES

# Require exactly nine added runtime files and zero modifications/deletions.
git -C "$ROOT" diff --name-status "$BASE_COMMIT" "$TARGET_COMMIT" > "$OUT/target-diff-name-status.txt"
awk '$1!="A" {exit 1}' "$OUT/target-diff-name-status.txt" || fail "target_contains_non_addition_change"
cut -f2- "$OUT/target-diff-name-status.txt" | sort > "$OUT/actual-files.txt"
sort "$OUT/allowed-files.txt" > "$OUT/allowed-files.sorted.txt"
cmp -s "$OUT/actual-files.txt" "$OUT/allowed-files.sorted.txt" || fail "target_file_allowlist_mismatch"
test "$(wc -l < "$OUT/actual-files.txt" | tr -d ' ')" = "9" || fail "target_file_count_mismatch"
test "$(git -C "$ROOT" rev-parse "$BASE_COMMIT:app/blog/[slug]/page.tsx")" = "$(git -C "$ROOT" rev-parse "$TARGET_COMMIT:app/blog/[slug]/page.tsx")" || fail "live_blog_route_changed_in_target"

# Read-only database signature before build. The build must not mutate data.
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

mkdir -p "$CANDIDATE"
chmod 700 "$CANDIDATE"
git -C "$ROOT" archive --format=tar "$TARGET_COMMIT" | tar -xf - -C "$CANDIDATE" || fail "candidate_archive_extract_failed"
ln -s "$ROOT/.env.local" "$CANDIDATE/.env.local"

{
  echo "CANDIDATE=$CANDIDATE"
  echo "TARGET_COMMIT=$TARGET_COMMIT"
  echo "ARCHIVE_FILE_COUNT=$(find "$CANDIDATE" -mindepth 1 -not -path "$CANDIDATE/.env.local" | wc -l | tr -d ' ')"
  stat -c 'CANDIDATE_DEVICE=%d CANDIDATE_INODE=%i CANDIDATE_MODE=%a' "$CANDIDATE"
  findmnt -T "$CANDIDATE"
} > "$OUT/candidate-identity.txt"

cd "$CANDIDATE"

# Install dependencies inside the standalone candidate. No shared node_modules symlink.
set +e
npm ci --prefer-offline --no-audit --no-fund >"$OUT/npm-ci.log" 2>&1
NPM_RC=$?
set -e
echo "NPM_CI_RC=$NPM_RC" > "$OUT/npm-ci-status.txt"
test "$NPM_RC" -eq 0 || fail "npm_ci_failed"
test -d node_modules || fail "node_modules_missing_after_npm_ci"
test ! -L node_modules || fail "node_modules_is_symlink"
test -f node_modules/next/package.json || fail "next_package_missing_after_npm_ci"
test -f node_modules/next/dist/compiled/jest-worker/processChild.js || fail "next_worker_missing_after_npm_ci"
test -x node_modules/.bin/next || fail "next_binary_missing_after_npm_ci"
test -x node_modules/.bin/prisma || fail "prisma_binary_missing_after_npm_ci"
test "$(node -p "require('./node_modules/next/package.json').version")" = "14.2.35" || fail "next_version_mismatch"

{
  echo "NODE_MODULES_PRESENT=YES"
  echo "NODE_MODULES_IS_SYMLINK=NO"
  echo "NEXT_VERSION=$(node -p "require('./node_modules/next/package.json').version")"
  echo "NEXT_WORKER_PRESENT=YES"
  echo "NODE_MODULES_BYTES=$(du -sb node_modules | awk '{print $1}')"
  stat -c 'NODE_MODULES_DEVICE=%d NODE_MODULES_INODE=%i NODE_MODULES_MODE=%a' node_modules
  sha256sum node_modules/next/package.json node_modules/next/dist/compiled/jest-worker/processChild.js
} > "$OUT/dependency-integrity.txt"

# Generate only the isolated Blog client under modules/blog/database/generated/client.
set +e
./node_modules/.bin/prisma generate --schema modules/blog/database/schema.prisma >"$OUT/prisma-generate.log" 2>&1
PRISMA_RC=$?
set -e
echo "PRISMA_GENERATE_RC=$PRISMA_RC" > "$OUT/prisma-status.txt"
test "$PRISMA_RC" -eq 0 || fail "isolated_prisma_generate_failed"
test -s modules/blog/database/generated/client/index.js || fail "isolated_prisma_client_js_missing"
test -s modules/blog/database/generated/client/index.d.ts || fail "isolated_prisma_client_dts_missing"
test -d node_modules || fail "node_modules_missing_after_prisma_generate"

# Produce the candidate build without changing the production .next directory.
set +e
NEXT_TELEMETRY_DISABLED=1 npm run build >"$OUT/next-build.log" 2>&1
BUILD_RC=$?
set -e
echo "NEXT_BUILD_RC=$BUILD_RC" > "$OUT/build-status.txt"
test -d node_modules || fail "node_modules_missing_after_next_build"
test -f node_modules/next/package.json || fail "next_package_missing_after_next_build"
test "$BUILD_RC" -eq 0 || fail "next_production_build_failed"
test -s .next/BUILD_ID || fail "candidate_build_id_missing"
test -f '.next/server/app/api/internal/blog-review-preview/[slug]/route.js' || fail "controlled_preview_route_artifact_missing"

CANDIDATE_BUILD_ID="$(cat .next/BUILD_ID)"
CANDIDATE_ROUTE_SHA="$(sha256sum '.next/server/app/api/internal/blog-review-preview/[slug]/route.js' | awk '{print $1}')"

{
  echo "CANDIDATE_BUILD_ID=$CANDIDATE_BUILD_ID"
  echo "CONTROLLED_PREVIEW_ROUTE_ARTIFACT=PASS"
  echo "CONTROLLED_PREVIEW_ROUTE_SHA256=$CANDIDATE_ROUTE_SHA"
  echo "NEXT_BUILD_BYTES=$(du -sb .next | awk '{print $1}')"
  find .next/server/app/api/internal/blog-review-preview -maxdepth 3 -type f -printf '%p %s bytes\n' | sort
} > "$OUT/candidate-build-artifacts.txt"

# Confirm build/import operations did not mutate the Blog content database.
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

# Production source, live build and PM2 process must remain byte/state identical.
LIVE_HEAD_AFTER="$(git -C "$ROOT" rev-parse HEAD)"
LIVE_BRANCH_AFTER="$(git -C "$ROOT" branch --show-current)"
LIVE_STATUS_AFTER="$(git -C "$ROOT" status --porcelain)"
LIVE_BUILD_ID_AFTER="$(cat "$ROOT/.next/BUILD_ID" 2>/dev/null || true)"
PM2_JSON_AFTER="$(pm2 jlist 2>"$OUT/pm2-after.stderr.log")" || fail "production_pm2_snapshot_after_failed"
printf '%s' "$PM2_JSON_AFTER" | jq -e 'type == "array"' >/dev/null || fail "production_pm2_json_after_invalid"
PM2_AFTER="$(printf '%s' "$PM2_JSON_AFTER" | jq -c --arg name "$PM2_NAME" '.[] | select(.name==$name) | {pid,status:.pm2_env.status,restarts:.pm2_env.restart_time}')"

test "$LIVE_HEAD_AFTER" = "$LIVE_HEAD_BEFORE" || fail "production_head_changed"
test "$LIVE_BRANCH_AFTER" = "$LIVE_BRANCH_BEFORE" || fail "production_branch_changed"
test -z "$LIVE_STATUS_AFTER" || fail "production_worktree_changed"
test "$LIVE_BUILD_ID_AFTER" = "$LIVE_BUILD_ID_BEFORE" || fail "production_build_id_changed"
test "$PM2_AFTER" = "$PM2_BEFORE" || fail "production_pm2_state_changed"

for url in \
  "https://sikhadenge.in/" \
  "https://sikhadenge.in/blog" \
  "https://sikhadenge.in/blog/chatgpt-se-resume-kaise-banaye"
do
  code="$(curl -sS -L -o /dev/null -w '%{http_code}' --max-time 30 "$url" || true)"
  printf '%s %s\n' "$code" "$url" >> "$OUT/live-http-after.txt"
  test "$code" = "200" || fail "production_http_baseline_failed"
done

{
  echo "BLOG_REVIEW_PREVIEW_CANDIDATE_BUILD_STATUS=PASS"
  echo "BASE_COMMIT=$BASE_COMMIT"
  echo "TARGET_COMMIT=$TARGET_COMMIT"
  echo "TARGET_DIRECT_CHILD_OF_PRODUCTION_BASE=YES"
  echo "TARGET_ALLOWED_FILES_ONLY=YES"
  echo "TARGET_NEW_RUNTIME_FILES=9"
  echo "LIVE_BLOG_ROUTE_MODIFIED=NO"
  echo "STANDALONE_CANDIDATE_DIRECTORY=YES"
  echo "SHARED_NODE_MODULES_SYMLINK=NO"
  echo "NPM_CI_STATUS=PASS"
  echo "NEXT_PACKAGE_INTEGRITY=PASS"
  echo "ISOLATED_PRISMA_GENERATE_STATUS=PASS"
  echo "NEXT_PRODUCTION_BUILD_STATUS=PASS"
  echo "CONTROLLED_PREVIEW_ROUTE_ARTIFACT=PASS"
  echo "CANDIDATE_BUILD_ID=$CANDIDATE_BUILD_ID"
  echo "DATABASE_SIGNATURE_UNCHANGED=YES"
  echo "DATABASE_READ_PERFORMED=YES"
  echo "DATABASE_WRITE_PERFORMED=NO"
  echo "PRODUCTION_HEAD_UNCHANGED=YES"
  echo "PRODUCTION_BUILD_ID_UNCHANGED=YES"
  echo "PRODUCTION_PM2_STATE_UNCHANGED=YES"
  echo "PRODUCTION_HTTP_BASELINE=PASS"
  echo "PRODUCTION_DEPLOYMENT_PERFORMED=NO"
  echo "PM2_RESTART_PERFORMED=NO"
  echo "PREVIEW_TOKEN_CREATED=NO"
  echo "CANDIDATE_DIR=$CANDIDATE"
  echo "REPORT=$OUT"
} | tee "$STATUS_FILE"
