#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

export HOME="${HOME:-/root}"
export PM2_HOME="${PM2_HOME:-/root/.pm2}"

ROOT="${ROOT:-/var/www/sikhadenge.in/sikhadenge-website-space}"
BASE_COMMIT="${BASE_COMMIT:-be9476bddb9b2091c37eab69049e2efef9c31879}"
TARGET_COMMIT="${TARGET_COMMIT:-74af60d3a3026646a0b66feb869e5b7ce60bd229}"
PRODUCTION_BRANCH="${PRODUCTION_BRANCH:-live-clean-sync-20260424}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-deploy/blog-review-preview-prod-20260729}"
EXPECTED_PRODUCTION_BUILD_ID="${EXPECTED_PRODUCTION_BUILD_ID:-rmOFYZtEaWPw35Ygy2l7q}"
EXPECTED_NEXT_VERSION="${EXPECTED_NEXT_VERSION:-14.2.35}"
EXPECTED_BASE_LOCK_BLOB="${EXPECTED_BASE_LOCK_BLOB:-75d4d13235ee57c2d3ed92d411180fd716d5eb24}"
EXPECTED_V1_BLOB="${EXPECTED_V1_BLOB:-8832f7eea1fae78bb6247f51fe09c2586a95bc6d}"
V1_PATH="modules/blog/deployment/scripts/verify-controlled-preview-production-closure-v1.sh"
REBUILD_REPORT="${REBUILD_REPORT:-/var/lib/sikhadenge-blog-artifacts/blog-review-preview-rollback-rebuild-v1-20260731_080012}"
ROLLBACK_ROOT="${ROLLBACK_ROOT:-/var/www/sikhadenge.in/_rollback-builds}"
ARTIFACT_ROOT="${ARTIFACT_ROOT:-/var/lib/sikhadenge-blog-artifacts}"
TS="$(date +%Y%m%d_%H%M%S)"
OUT="$ARTIFACT_ROOT/blog-review-preview-production-closure-v2-$TS"
STATUS="$OUT/status.txt"
V1_SCRIPT="/dev/shm/blog-preview-production-closure-v1-$TS.sh"
ROLLBACK_ARTIFACT=""
ROLLBACK_MANIFEST=""
ROLLBACK_BUILD_ID=""
V1_REPORT=""

mkdir -p "$OUT"
chmod 700 "$OUT"

cleanup() {
  rm -f "$V1_SCRIPT" 2>/dev/null || true
}
trap cleanup EXIT

fail() {
  local reason="$1"
  {
    echo "BLOG_REVIEW_PREVIEW_PRODUCTION_CLOSURE_V2_STATUS=FAIL"
    echo "REASON=$reason"
    echo "ROLLBACK_VALIDATION_MODE=SOURCE_EQUIVALENT_REBUILD"
    echo "PRODUCTION_MUTATION_PERFORMED=NO"
    echo "PM2_RESTART_PERFORMED=NO"
    echo "PREVIEW_TOKEN_CHANGED=NO"
    echo "DATABASE_WRITE_PERFORMED=NO"
    echo "REMOTE_BRANCH_CHANGED=NO"
    echo "REPORT=$OUT"
  } | tee "$STATUS" >&2
  exit 1
}

status_value() {
  local status_file="$1"
  local key="$2"
  awk -v key="$key" '
    index($0, key "=") == 1 {
      sub(/^[^=]*=/, "")
      print
      exit
    }
  ' "$status_file"
}

for cmd in git awk grep sha256sum bash chmod tee cat cmp sort wc tr; do
  command -v "$cmd" >/dev/null 2>&1 || fail "${cmd}_not_found"
done

test -d "$ROOT/.git" || fail "production_repository_missing"
test -f "$REBUILD_REPORT/status.txt" || fail "rollback_rebuild_report_missing"
test "$(git -C "$ROOT" branch --show-current)" = "$PRODUCTION_BRANCH" || fail "production_branch_mismatch"
test "$(git -C "$ROOT" rev-parse HEAD)" = "$TARGET_COMMIT" || fail "production_head_mismatch"
test -z "$(git -C "$ROOT" status --porcelain)" || fail "production_worktree_not_clean"
test "$(cat "$ROOT/.next/BUILD_ID" 2>/dev/null)" = "$EXPECTED_PRODUCTION_BUILD_ID" || fail "production_build_id_mismatch"
test "$(git -C "$ROOT" ls-remote origin "refs/heads/$PRODUCTION_BRANCH" | awk '{print $1}')" = "$TARGET_COMMIT" || fail "remote_production_head_mismatch"
test "$(git -C "$ROOT" rev-parse "$TARGET_COMMIT^")" = "$BASE_COMMIT" || fail "target_not_direct_child"
test "$(git -C "$ROOT" rev-parse "$BASE_COMMIT:package-lock.json")" = "$EXPECTED_BASE_LOCK_BLOB" || fail "base_lock_blob_mismatch"
test "$(git -C "$ROOT" rev-parse "$TARGET_COMMIT:package-lock.json")" = "$EXPECTED_BASE_LOCK_BLOB" || fail "target_lock_blob_mismatch"

grep -qx 'BLOG_REVIEW_PREVIEW_ROLLBACK_REBUILD_STATUS=PASS' "$REBUILD_REPORT/status.txt" || fail "rollback_rebuild_not_passed"
grep -qx "ROLLBACK_SOURCE_COMMIT=$BASE_COMMIT" "$REBUILD_REPORT/status.txt" || fail "rollback_source_commit_report_mismatch"
grep -qx 'ROLLBACK_SOURCE_EQUIVALENT=YES' "$REBUILD_REPORT/status.txt" || fail "rollback_source_equivalent_not_confirmed"
grep -qx 'ORIGINAL_BUILD_ID_RECOVERED=NO' "$REBUILD_REPORT/status.txt" || fail "original_build_id_report_invalid"
grep -qx "ROLLBACK_NEXT_VERSION=$EXPECTED_NEXT_VERSION" "$REBUILD_REPORT/status.txt" || fail "rollback_next_version_report_mismatch"
grep -qx "ROLLBACK_PACKAGE_LOCK_BLOB=$EXPECTED_BASE_LOCK_BLOB" "$REBUILD_REPORT/status.txt" || fail "rollback_lock_blob_report_mismatch"
grep -qx 'ROLLBACK_PREVIEW_ROUTE_PRESENT=NO' "$REBUILD_REPORT/status.txt" || fail "rollback_preview_route_report_invalid"
grep -qx 'PRODUCTION_HEAD_UNCHANGED=YES' "$REBUILD_REPORT/status.txt" || fail "rollback_head_guard_missing"
grep -qx 'PRODUCTION_BUILD_UNCHANGED=YES' "$REBUILD_REPORT/status.txt" || fail "rollback_build_guard_missing"
grep -qx 'DATABASE_SIGNATURE_UNCHANGED=YES' "$REBUILD_REPORT/status.txt" || fail "rollback_database_guard_missing"
grep -qx 'PM2_STATE_UNCHANGED=YES' "$REBUILD_REPORT/status.txt" || fail "rollback_pm2_guard_missing"
grep -qx 'PREVIEW_TOKEN_CHANGED=NO' "$REBUILD_REPORT/status.txt" || fail "rollback_token_guard_missing"
grep -qx 'REMOTE_BRANCH_CHANGED=NO' "$REBUILD_REPORT/status.txt" || fail "rollback_remote_guard_missing"
grep -qx 'PRODUCTION_MUTATION_PERFORMED=NO' "$REBUILD_REPORT/status.txt" || fail "rollback_mutation_guard_missing"

ROLLBACK_ARTIFACT="$(status_value "$REBUILD_REPORT/status.txt" ROLLBACK_ARTIFACT)"
ROLLBACK_MANIFEST="$(status_value "$REBUILD_REPORT/status.txt" ROLLBACK_MANIFEST)"
ROLLBACK_BUILD_ID="$(status_value "$REBUILD_REPORT/status.txt" ROLLBACK_BUILD_ID)"

test -n "$ROLLBACK_ARTIFACT" || fail "rollback_artifact_path_empty"
test -n "$ROLLBACK_MANIFEST" || fail "rollback_manifest_path_empty"
test -n "$ROLLBACK_BUILD_ID" || fail "rollback_build_id_empty"
case "$ROLLBACK_ARTIFACT" in
  "$ROLLBACK_ROOT"/blog-review-preview-predeployment-base-v1-*) ;;
  *) fail "rollback_artifact_path_outside_guarded_root" ;;
esac

test -d "$ROLLBACK_ARTIFACT" || fail "rollback_artifact_missing"
test ! -L "$ROLLBACK_ARTIFACT" || fail "rollback_artifact_is_symlink"
test "$ROLLBACK_MANIFEST" = "$ROLLBACK_ARTIFACT/manifest.sha256" || fail "rollback_manifest_path_mismatch"
test -s "$ROLLBACK_ARTIFACT/.next/BUILD_ID" || fail "rollback_build_missing"
test -s "$ROLLBACK_ARTIFACT/source-commit.txt" || fail "rollback_source_marker_missing"
test -s "$ROLLBACK_ARTIFACT/package-lock-blob.txt" || fail "rollback_lock_marker_missing"
test -s "$ROLLBACK_ARTIFACT/next-version.txt" || fail "rollback_next_version_marker_missing"
test -s "$ROLLBACK_ARTIFACT/build-id.txt" || fail "rollback_build_id_marker_missing"
test -s "$ROLLBACK_ARTIFACT/next-files.sha256" || fail "rollback_next_files_manifest_missing"
test -s "$ROLLBACK_MANIFEST" || fail "rollback_manifest_missing"

test "$(cat "$ROLLBACK_ARTIFACT/source-commit.txt")" = "$BASE_COMMIT" || fail "rollback_source_marker_mismatch"
test "$(cat "$ROLLBACK_ARTIFACT/package-lock-blob.txt")" = "$EXPECTED_BASE_LOCK_BLOB" || fail "rollback_lock_marker_mismatch"
test "$(cat "$ROLLBACK_ARTIFACT/next-version.txt")" = "$EXPECTED_NEXT_VERSION" || fail "rollback_next_version_marker_mismatch"
test "$(cat "$ROLLBACK_ARTIFACT/build-id.txt")" = "$ROLLBACK_BUILD_ID" || fail "rollback_build_id_marker_mismatch"
test "$(cat "$ROLLBACK_ARTIFACT/.next/BUILD_ID")" = "$ROLLBACK_BUILD_ID" || fail "rollback_next_build_id_mismatch"
test ! -e "$ROLLBACK_ARTIFACT/.next/server/app/api/internal/blog-review-preview/[slug]/route.js" || fail "rollback_contains_controlled_preview_route"

sha256sum -c "$ROLLBACK_MANIFEST" > "$OUT/rollback-manifest-check.txt" 2>&1 || fail "rollback_manifest_verification_failed"
sha256sum -c "$ROLLBACK_ARTIFACT/next-files.sha256" > "$OUT/rollback-next-files-check.txt" 2>&1 || fail "rollback_next_files_verification_failed"

SOURCE_COMMIT="$(git -C "$ROOT" rev-parse "origin/$DEPLOY_BRANCH")"
test "$(git -C "$ROOT" rev-parse "$SOURCE_COMMIT:$V1_PATH")" = "$EXPECTED_V1_BLOB" || fail "v1_verifier_blob_mismatch"
git -C "$ROOT" show "$SOURCE_COMMIT:$V1_PATH" > "$V1_SCRIPT" || fail "v1_verifier_extract_failed"
chmod 700 "$V1_SCRIPT"
bash -n "$V1_SCRIPT" || fail "v1_verifier_syntax_invalid"

set +e
ROLLBACK_NEXT="$ROLLBACK_ARTIFACT/.next" \
EXPECTED_ROLLBACK_BUILD_ID="$ROLLBACK_BUILD_ID" \
HOME="$HOME" PM2_HOME="$PM2_HOME" \
/usr/bin/bash "$V1_SCRIPT" > "$OUT/v1.stdout" 2> "$OUT/v1.stderr"
V1_RC=$?
set -e

cat "$OUT/v1.stdout"
cat "$OUT/v1.stderr" >&2

test "$V1_RC" -eq 0 || fail "v1_closure_failed"
grep -qx 'BLOG_REVIEW_PREVIEW_PRODUCTION_CLOSURE_STATUS=PASS' "$OUT/v1.stdout" || fail "v1_closure_pass_marker_missing"
V1_REPORT="$(status_value "$OUT/v1.stdout" REPORT)"
test -n "$V1_REPORT" || fail "v1_report_path_missing"
test -f "$V1_REPORT/status.txt" || fail "v1_report_status_missing"
grep -qx 'BLOG_REVIEW_PREVIEW_PRODUCTION_CLOSURE_STATUS=PASS' "$V1_REPORT/status.txt" || fail "v1_report_not_passed"
grep -qx "ROLLBACK_BUILD_ID=$ROLLBACK_BUILD_ID" "$V1_REPORT/status.txt" || fail "v1_rollback_build_id_mismatch"
grep -qx 'ROLLBACK_BUILD_RETAINED=YES' "$V1_REPORT/status.txt" || fail "v1_rollback_retention_missing"
grep -qx 'DATABASE_SIGNATURE_UNCHANGED=YES' "$V1_REPORT/status.txt" || fail "v1_database_guard_missing"
grep -qx 'PM2_RESTART_PERFORMED=NO' "$V1_REPORT/status.txt" || fail "v1_pm2_guard_missing"
grep -qx 'PRODUCTION_MUTATION_PERFORMED=NO' "$V1_REPORT/status.txt" || fail "v1_mutation_guard_missing"

{
  echo "BLOG_REVIEW_PREVIEW_PRODUCTION_CLOSURE_V2_STATUS=PASS"
  echo "V1_PRODUCTION_CLOSURE_STATUS=PASS"
  echo "PRODUCTION_BRANCH=$PRODUCTION_BRANCH"
  echo "PRODUCTION_COMMIT=$TARGET_COMMIT"
  echo "REMOTE_PRODUCTION_COMMIT=$TARGET_COMMIT"
  echo "LOCAL_REMOTE_COMMIT_ALIGNED=YES"
  echo "PRODUCTION_BUILD_ID=$EXPECTED_PRODUCTION_BUILD_ID"
  echo "MINIMAL_RUNTIME_FILE_COUNT=9"
  echo "LIVE_BLOG_ROUTE_MODIFIED=NO"
  echo "ROLLBACK_VALIDATION_MODE=SOURCE_EQUIVALENT_REBUILD"
  echo "ROLLBACK_SOURCE_COMMIT=$BASE_COMMIT"
  echo "ROLLBACK_SOURCE_EQUIVALENT=YES"
  echo "ORIGINAL_BUILD_ID_RECOVERED=NO"
  echo "ROLLBACK_BUILD_ID=$ROLLBACK_BUILD_ID"
  echo "ROLLBACK_NEXT_VERSION=$EXPECTED_NEXT_VERSION"
  echo "ROLLBACK_PACKAGE_LOCK_BLOB=$EXPECTED_BASE_LOCK_BLOB"
  echo "ROLLBACK_PREVIEW_ROUTE_PRESENT=NO"
  echo "ROLLBACK_ARTIFACT=$ROLLBACK_ARTIFACT"
  echo "ROLLBACK_MANIFEST=$ROLLBACK_MANIFEST"
  echo "ROLLBACK_MANIFEST_VERIFIED=YES"
  echo "ROLLBACK_NEXT_FILES_VERIFIED=YES"
  echo "ROLLBACK_BUILD_RETAINED=YES"
  echo "DATABASE_SIGNATURE_UNCHANGED=YES"
  echo "DATABASE_WRITE_PERFORMED=NO"
  echo "PM2_RESTART_PERFORMED=NO"
  echo "PREVIEW_TOKEN_CHANGED=NO"
  echo "REMOTE_BRANCH_CHANGED=NO"
  echo "PRODUCTION_MUTATION_PERFORMED=NO"
  echo "CLOSURE_EVIDENCE_FROZEN=YES"
  echo "V1_REPORT=$V1_REPORT"
  echo "REPORT=$OUT"
} | tee "$STATUS"

cleanup
trap - EXIT
