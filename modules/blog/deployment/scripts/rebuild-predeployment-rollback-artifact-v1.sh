#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

export HOME="${HOME:-/root}"
export PM2_HOME="${PM2_HOME:-$HOME/.pm2}"

ROOT="${ROOT:-/var/www/sikhadenge.in/sikhadenge-website-space}"
BASE_COMMIT="${BASE_COMMIT:-be9476bddb9b2091c37eab69049e2efef9c31879}"
TARGET_COMMIT="${TARGET_COMMIT:-74af60d3a3026646a0b66feb869e5b7ce60bd229}"
PRODUCTION_BRANCH="${PRODUCTION_BRANCH:-live-clean-sync-20260424}"
PM2_NAME="${PM2_NAME:-sikhadenge-in}"
ARTIFACT_ROOT="${ARTIFACT_ROOT:-/var/lib/sikhadenge-blog-artifacts}"
ROLLBACK_ROOT="${ROLLBACK_ROOT:-/var/www/sikhadenge.in/_rollback-builds}"
TS="$(date +%Y%m%d_%H%M%S)"
OUT="$ARTIFACT_ROOT/blog-review-preview-rollback-rebuild-v1-$TS"
WORK="$ROLLBACK_ROOT/.work-predeployment-base-v1-$TS"
FINAL="$ROLLBACK_ROOT/blog-review-preview-predeployment-base-v1-$TS"
STATUS="$OUT/status.txt"
LOCK_FILE="/var/lock/sikhadenge-blog-preview-rollback-rebuild.lock"
DATABASE_URL=""

mkdir -p "$OUT" "$ROLLBACK_ROOT"
chmod 700 "$OUT" "$ROLLBACK_ROOT"

cleanup() {
  DATABASE_URL=""
  if test -d "$WORK"; then
    rm -rf "$WORK" 2>/dev/null || true
  fi
}
trap cleanup EXIT

fail() {
  local reason="$1"
  {
    echo "BLOG_REVIEW_PREVIEW_ROLLBACK_REBUILD_STATUS=FAIL"
    echo "REASON=$reason"
    echo "ROLLBACK_SOURCE_COMMIT=$BASE_COMMIT"
    echo "ROLLBACK_ARTIFACT=$FINAL"
    echo "PRODUCTION_MUTATION_PERFORMED=NO"
    echo "PM2_RESTART_PERFORMED=NO"
    echo "PREVIEW_TOKEN_CHANGED=NO"
    echo "DATABASE_WRITE_PERFORMED=NO"
    echo "REMOTE_BRANCH_CHANGED=NO"
    echo "REPORT=$OUT"
  } | tee "$STATUS" >&2
  exit 1
}

for cmd in git tar npm node psql sha256sum curl jq pm2 flock find stat findmnt awk cut sort wc du df cmp tr python3; do
  command -v "$cmd" >/dev/null 2>&1 || fail "${cmd}_not_found"
done

test -d "$PM2_HOME" || fail "pm2_home_missing"
exec 9>"$LOCK_FILE"
flock -n 9 || fail "rollback_rebuild_lock_busy"

test -d "$ROOT/.git" || fail "production_repository_missing"
test -f "$ROOT/package-lock.json" || fail "production_lockfile_missing"
test -f "$ROOT/.env.local" || fail "production_env_missing"
test -s "$ROOT/.next/BUILD_ID" || fail "production_build_missing"
test ! -e "$WORK" || fail "rollback_work_directory_exists"
test ! -e "$FINAL" || fail "rollback_final_directory_exists"

LIVE_HEAD_BEFORE="$(git -C "$ROOT" rev-parse HEAD)"
LIVE_BRANCH_BEFORE="$(git -C "$ROOT" branch --show-current)"
LIVE_STATUS_BEFORE="$(git -C "$ROOT" status --porcelain)"
LIVE_BUILD_ID_BEFORE="$(cat "$ROOT/.next/BUILD_ID")"
REMOTE_HEAD_BEFORE="$(git -C "$ROOT" ls-remote origin "refs/heads/$PRODUCTION_BRANCH" | awk '{print $1}')"
ENV_SHA_BEFORE="$(sha256sum "$ROOT/.env.local" | awk '{print $1}')"
PM2_JSON_BEFORE="$(pm2 jlist 2>"$OUT/pm2-before.stderr")" || fail "pm2_snapshot_before_failed"
printf '%s' "$PM2_JSON_BEFORE" | jq -e 'type == "array"' >/dev/null || fail "pm2_json_before_invalid"
PM2_BEFORE="$(printf '%s' "$PM2_JSON_BEFORE" | jq -c --arg name "$PM2_NAME" '.[] | select(.name==$name) | {pid,status:.pm2_env.status,restarts:.pm2_env.restart_time,cwd:.pm2_env.pm_cwd}')"

test "$LIVE_HEAD_BEFORE" = "$TARGET_COMMIT" || fail "production_head_not_deployed_target"
test "$LIVE_BRANCH_BEFORE" = "$PRODUCTION_BRANCH" || fail "production_branch_mismatch"
test -z "$LIVE_STATUS_BEFORE" || fail "production_worktree_not_clean"
test "$REMOTE_HEAD_BEFORE" = "$TARGET_COMMIT" || fail "remote_production_head_mismatch"
test -n "$PM2_BEFORE" || fail "production_pm2_missing"
test "$(printf '%s' "$PM2_BEFORE" | jq -r '.status')" = "online" || fail "production_pm2_not_online"
test "$(printf '%s' "$PM2_BEFORE" | jq -r '.cwd')" = "$ROOT" || fail "production_pm2_cwd_mismatch"

git -C "$ROOT" cat-file -e "$BASE_COMMIT^{commit}" || fail "base_commit_missing"
test "$(git -C "$ROOT" rev-parse "$TARGET_COMMIT^")" = "$BASE_COMMIT" || fail "target_not_direct_child_of_base"
BASE_LOCK_SHA="$(git -C "$ROOT" rev-parse "$BASE_COMMIT:package-lock.json")"
CURRENT_LOCK_SHA="$(git -C "$ROOT" rev-parse "$TARGET_COMMIT:package-lock.json")"
test "$BASE_LOCK_SHA" = "$CURRENT_LOCK_SHA" || fail "package_lock_changed_between_base_and_target"

DATABASE_URL="$(python3 - "$ROOT/.env.local" <<'PY'
from pathlib import Path
import re
import sys
path = Path(sys.argv[1])
values = []
for raw in path.read_text(encoding='utf-8').splitlines():
    m = re.match(r'^\s*DATABASE_URL\s*=(.*)$', raw)
    if not m:
        continue
    value = m.group(1).strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
        value = value[1:-1]
    values.append(value)
if len(values) != 1 or not values[0]:
    raise SystemExit(1)
sys.stdout.write(values[0])
PY
)" || fail "database_url_read_failed"

DB_SIGNATURE_BEFORE="$(psql "$DATABASE_URL" -X -At -F'|' -c "SELECT
  (SELECT count(*) FROM blog_content.workspaces),
  (SELECT count(*) FROM blog_content.pages),
  (SELECT count(*) FROM blog_content.page_versions),
  (SELECT count(*) FROM blog_content.content_fingerprints),
  (SELECT count(*) FROM blog_content.publications),
  (SELECT count(*) FROM blog_content.quality_runs),
  (SELECT count(*) FROM blog_content.editorial_reviews);")" || fail "database_signature_before_failed"
echo "$DB_SIGNATURE_BEFORE" > "$OUT/database-signature-before.txt"

AVAILABLE_KB="$(df -Pk "$ROLLBACK_ROOT" | awk 'NR==2 {print $4}')"
test "$AVAILABLE_KB" -gt 6291456 || fail "insufficient_disk_for_rollback_rebuild"

mkdir -p "$WORK"
chmod 700 "$WORK"
git -C "$ROOT" archive --format=tar "$BASE_COMMIT" | tar -xf - -C "$WORK" || fail "base_archive_extract_failed"
ln -s "$ROOT/.env.local" "$WORK/.env.local"

{
  echo "ROLLBACK_SOURCE_COMMIT=$BASE_COMMIT"
  echo "BASE_PACKAGE_LOCK_BLOB=$BASE_LOCK_SHA"
  echo "TARGET_PACKAGE_LOCK_BLOB=$CURRENT_LOCK_SHA"
  echo "ARCHIVE_FILE_COUNT=$(find "$WORK" -mindepth 1 -not -path "$WORK/.env.local" | wc -l | tr -d ' ')"
  stat -c 'WORK_DEVICE=%d WORK_INODE=%i WORK_MODE=%a' "$WORK"
  findmnt -T "$WORK"
} > "$OUT/source-identity.txt"

cd "$WORK"
set +e
npm ci --prefer-offline --no-audit --no-fund >"$OUT/npm-ci.log" 2>&1
NPM_RC=$?
set -e
echo "NPM_CI_RC=$NPM_RC" > "$OUT/npm-ci-status.txt"
test "$NPM_RC" -eq 0 || fail "npm_ci_failed"
test -d node_modules || fail "node_modules_missing_after_npm_ci"
test ! -L node_modules || fail "node_modules_is_symlink"
test -f node_modules/next/package.json || fail "next_package_missing"
test -f node_modules/next/dist/compiled/jest-worker/processChild.js || fail "next_worker_missing"
test -x node_modules/.bin/next || fail "next_binary_missing"
NEXT_VERSION="$(node -p "require('./node_modules/next/package.json').version")"
test "$NEXT_VERSION" = "14.2.35" || fail "next_version_mismatch"

set +e
NEXT_TELEMETRY_DISABLED=1 npm run build >"$OUT/next-build.log" 2>&1
BUILD_RC=$?
set -e
echo "NEXT_BUILD_RC=$BUILD_RC" > "$OUT/build-status.txt"
test "$BUILD_RC" -eq 0 || fail "next_production_build_failed"
test -s .next/BUILD_ID || fail "rollback_build_id_missing"
test ! -e '.next/server/app/api/internal/blog-review-preview/[slug]/route.js' || fail "preview_route_present_in_predeployment_build"

ROLLBACK_BUILD_ID="$(cat .next/BUILD_ID)"
mkdir -p "$FINAL"
chmod 700 "$FINAL"
mv .next "$FINAL/.next" || fail "rollback_build_preserve_failed"
printf '%s\n' "$BASE_COMMIT" > "$FINAL/source-commit.txt"
printf '%s\n' "$BASE_LOCK_SHA" > "$FINAL/package-lock-blob.txt"
printf '%s\n' "$NEXT_VERSION" > "$FINAL/next-version.txt"
printf '%s\n' "$ROLLBACK_BUILD_ID" > "$FINAL/build-id.txt"

find "$FINAL/.next" -type f -print0 | sort -z | xargs -0 sha256sum > "$FINAL/next-files.sha256"
sha256sum "$FINAL/source-commit.txt" "$FINAL/package-lock-blob.txt" "$FINAL/next-version.txt" "$FINAL/build-id.txt" "$FINAL/next-files.sha256" > "$FINAL/manifest.sha256"
chmod -R go-rwx "$FINAL"

test "$(cat "$FINAL/source-commit.txt")" = "$BASE_COMMIT" || fail "preserved_source_commit_mismatch"
test "$(cat "$FINAL/package-lock-blob.txt")" = "$BASE_LOCK_SHA" || fail "preserved_lock_blob_mismatch"
test "$(cat "$FINAL/.next/BUILD_ID")" = "$ROLLBACK_BUILD_ID" || fail "preserved_build_id_mismatch"
test ! -e "$FINAL/.next/server/app/api/internal/blog-review-preview/[slug]/route.js" || fail "preserved_preview_route_present"

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

LIVE_HEAD_AFTER="$(git -C "$ROOT" rev-parse HEAD)"
LIVE_BRANCH_AFTER="$(git -C "$ROOT" branch --show-current)"
LIVE_STATUS_AFTER="$(git -C "$ROOT" status --porcelain)"
LIVE_BUILD_ID_AFTER="$(cat "$ROOT/.next/BUILD_ID")"
REMOTE_HEAD_AFTER="$(git -C "$ROOT" ls-remote origin "refs/heads/$PRODUCTION_BRANCH" | awk '{print $1}')"
ENV_SHA_AFTER="$(sha256sum "$ROOT/.env.local" | awk '{print $1}')"
PM2_JSON_AFTER="$(pm2 jlist 2>"$OUT/pm2-after.stderr")" || fail "pm2_snapshot_after_failed"
printf '%s' "$PM2_JSON_AFTER" | jq -e 'type == "array"' >/dev/null || fail "pm2_json_after_invalid"
PM2_AFTER="$(printf '%s' "$PM2_JSON_AFTER" | jq -c --arg name "$PM2_NAME" '.[] | select(.name==$name) | {pid,status:.pm2_env.status,restarts:.pm2_env.restart_time,cwd:.pm2_env.pm_cwd}')"

test "$LIVE_HEAD_AFTER" = "$LIVE_HEAD_BEFORE" || fail "production_head_changed"
test "$LIVE_BRANCH_AFTER" = "$LIVE_BRANCH_BEFORE" || fail "production_branch_changed"
test -z "$LIVE_STATUS_AFTER" || fail "production_worktree_changed"
test "$LIVE_BUILD_ID_AFTER" = "$LIVE_BUILD_ID_BEFORE" || fail "production_build_changed"
test "$REMOTE_HEAD_AFTER" = "$REMOTE_HEAD_BEFORE" || fail "remote_branch_changed"
test "$ENV_SHA_AFTER" = "$ENV_SHA_BEFORE" || fail "production_env_changed"
test "$PM2_AFTER" = "$PM2_BEFORE" || fail "production_pm2_state_changed"

for url in \
  'https://sikhadenge.in/' \
  'https://sikhadenge.in/blog' \
  'https://sikhadenge.in/blog/chatgpt-se-resume-kaise-banaye'
do
  code="$(curl -sS -L -o /dev/null -w '%{http_code}' --max-time 30 "$url" || true)"
  printf '%s %s\n' "$code" "$url" >> "$OUT/live-http-after.txt"
  test "$code" = "200" || fail "production_http_baseline_failed"
done

{
  echo "BLOG_REVIEW_PREVIEW_ROLLBACK_REBUILD_STATUS=PASS"
  echo "ROLLBACK_SOURCE_COMMIT=$BASE_COMMIT"
  echo "ROLLBACK_SOURCE_EQUIVALENT=YES"
  echo "ORIGINAL_BUILD_ID_RECOVERED=NO"
  echo "ROLLBACK_BUILD_ID=$ROLLBACK_BUILD_ID"
  echo "ROLLBACK_NEXT_VERSION=$NEXT_VERSION"
  echo "ROLLBACK_PACKAGE_LOCK_BLOB=$BASE_LOCK_SHA"
  echo "ROLLBACK_PREVIEW_ROUTE_PRESENT=NO"
  echo "ROLLBACK_ARTIFACT=$FINAL"
  echo "ROLLBACK_MANIFEST=$FINAL/manifest.sha256"
  echo "PRODUCTION_HEAD_UNCHANGED=YES"
  echo "PRODUCTION_BUILD_UNCHANGED=YES"
  echo "PRODUCTION_HTTP_BASELINE=PASS"
  echo "DATABASE_SIGNATURE_UNCHANGED=YES"
  echo "DATABASE_WRITE_PERFORMED=NO"
  echo "PM2_STATE_UNCHANGED=YES"
  echo "PM2_RESTART_PERFORMED=NO"
  echo "PREVIEW_TOKEN_CHANGED=NO"
  echo "REMOTE_BRANCH_CHANGED=NO"
  echo "PRODUCTION_MUTATION_PERFORMED=NO"
  echo "REPORT=$OUT"
} | tee "$STATUS"

rm -rf "$WORK"
cleanup
trap - EXIT
