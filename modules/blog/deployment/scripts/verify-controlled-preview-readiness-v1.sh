#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ROOT="${ROOT:-/var/www/sikhadenge.in/sikhadenge-website-space}"
MANIFEST_COMMIT="${MANIFEST_COMMIT:-69345b5b1e6e8a1d89d939d8a56646eeb304af0b}"
MANIFEST_PATH="${MANIFEST_PATH:-modules/blog/inventory/releases/0015-controlled-blog-review-preview-production-readiness-v1.release.json}"
BUILD_REPORT="${BUILD_REPORT:-/var/lib/sikhadenge-blog-artifacts/blog-review-preview-candidate-build-v1-20260730_094918}"
RUNTIME_REPORT="${RUNTIME_REPORT:-/var/lib/sikhadenge-blog-artifacts/blog-review-preview-candidate-runtime-smoke-v1-20260730_102517}"
CANDIDATE="${CANDIDATE:-/var/www/sikhadenge.in/_candidate-builds/blog-review-preview-prod-v1-20260730_094918}"
EXPECTED_HEAD="${EXPECTED_HEAD:-be9476bddb9b2091c37eab69049e2efef9c31879}"
EXPECTED_BUILD_ID="${EXPECTED_BUILD_ID:-QoIU-RyXUuhyOX2WOMKtk}"
PM2_NAME="${PM2_NAME:-sikhadenge-in}"

for cmd in git jq pm2; do
  command -v "$cmd" >/dev/null 2>&1 || {
    echo "PHASE_C1_READINESS_EVIDENCE_FREEZE=FAIL"
    echo "REASON=${cmd}_missing"
    exit 1
  }
done

test -d "$ROOT/.git"
test -f "$BUILD_REPORT/status.txt"
test -f "$RUNTIME_REPORT/status.txt"
test -s "$CANDIDATE/.next/BUILD_ID"

git -C "$ROOT" cat-file -e "$MANIFEST_COMMIT^{commit}"
TMP="$(mktemp /tmp/blog-preview-readiness.XXXXXX.json)"
trap 'rm -f "$TMP"' EXIT

git -C "$ROOT" show "$MANIFEST_COMMIT:$MANIFEST_PATH" > "$TMP"
jq -e . "$TMP" >/dev/null

test "$(jq -r '.candidateBuild.status' "$TMP")" = "PASS"
test "$(jq -r '.isolatedRuntimeSmoke.status' "$TMP")" = "PASS"
test "$(jq -r '.candidateBuild.buildId' "$TMP")" = "$(cat "$CANDIDATE/.next/BUILD_ID")"
test "$(jq -r '.safety.readyForControlledDeploymentExecution' "$TMP")" = "true"
test "$(jq -r '.safety.productionDeploymentPerformed' "$TMP")" = "false"

grep -qx 'BLOG_REVIEW_PREVIEW_CANDIDATE_BUILD_STATUS=PASS' "$BUILD_REPORT/status.txt"
grep -qx 'BLOG_REVIEW_PREVIEW_CANDIDATE_RUNTIME_SMOKE_STATUS=PASS' "$RUNTIME_REPORT/status.txt"

test "$(git -C "$ROOT" rev-parse HEAD)" = "$EXPECTED_HEAD"
test -z "$(git -C "$ROOT" status --porcelain)"
test "$(cat "$ROOT/.next/BUILD_ID")" = "$EXPECTED_BUILD_ID"

PM2_JSON="$(HOME=/root PM2_HOME=/root/.pm2 pm2 jlist)"
printf '%s' "$PM2_JSON" | jq -e --arg name "$PM2_NAME" '
  any(.[]; .name == $name and .pm2_env.status == "online")
' >/dev/null

jq '{
  releaseId,
  candidateBuildStatus: .candidateBuild.status,
  candidateBuildId: .candidateBuild.buildId,
  runtimeSmokeStatus: .isolatedRuntimeSmoke.status,
  authenticatedPreviewStatus: .isolatedRuntimeSmoke.authenticatedPreviewStatus,
  unauthenticatedPreviewStatus: .isolatedRuntimeSmoke.unauthenticatedPreviewStatus,
  readyForControlledDeploymentExecution: .safety.readyForControlledDeploymentExecution,
  productionDeploymentPerformed: .safety.productionDeploymentPerformed
}' "$TMP"

echo "HEAD=$(git -C "$ROOT" rev-parse HEAD)"
echo "BUILD_ID=$(cat "$ROOT/.next/BUILD_ID")"
printf '%s' "$PM2_JSON" | jq -r --arg name "$PM2_NAME" '.[] | select(.name == $name) | {pid,status:.pm2_env.status,restarts:.pm2_env.restart_time}'
echo "PHASE_C1_READINESS_EVIDENCE_FREEZE=PASS"
echo "PRODUCTION_DEPLOYMENT_PERFORMED=NO"
