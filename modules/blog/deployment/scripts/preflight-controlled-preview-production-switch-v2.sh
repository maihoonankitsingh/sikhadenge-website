#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

export HOME="${HOME:-/root}"
export PM2_HOME="${PM2_HOME:-/root/.pm2}"

ROOT="${ROOT:-/var/www/sikhadenge.in/sikhadenge-website-space}"
BASE_COMMIT="${BASE_COMMIT:-be9476bddb9b2091c37eab69049e2efef9c31879}"
TARGET_COMMIT="${TARGET_COMMIT:-74af60d3a3026646a0b66feb869e5b7ce60bd229}"
PM2_NAME="${PM2_NAME:-sikhadenge-in}"
CANDIDATE="${CANDIDATE:-/var/www/sikhadenge.in/_candidate-builds/blog-review-preview-prod-v1-20260730_094918}"
BUILD_REPORT="${BUILD_REPORT:-/var/lib/sikhadenge-blog-artifacts/blog-review-preview-candidate-build-v1-20260730_094918}"
RUNTIME_REPORT="${RUNTIME_REPORT:-/var/lib/sikhadenge-blog-artifacts/blog-review-preview-candidate-runtime-smoke-v1-20260730_102517}"
ARTIFACT_ROOT="${ARTIFACT_ROOT:-/var/lib/sikhadenge-blog-artifacts}"
TS="$(date +%Y%m%d_%H%M%S)"
OUT="$ARTIFACT_ROOT/blog-review-preview-production-switch-preflight-v2-$TS"
STATUS="$OUT/status.txt"

mkdir -p "$OUT"
chmod 700 "$OUT"

fail() {
  local reason="$1"
  {
    echo "BLOG_REVIEW_PREVIEW_PRODUCTION_SWITCH_PREFLIGHT_STATUS=FAIL"
    echo "REASON=$reason"
    echo "PRODUCTION_DEPLOYMENT_PERFORMED=NO"
    echo "PM2_RESTART_PERFORMED=NO"
    echo "PREVIEW_TOKEN_CREATED=NO"
    echo "DATABASE_WRITE_PERFORMED=NO"
    echo "REPORT=$OUT"
  } | tee "$STATUS" >&2
  exit 1
}

for cmd in git jq pm2 ss nginx grep sed sort pgrep ps curl node find df; do
  command -v "$cmd" >/dev/null 2>&1 || fail "${cmd}_not_found"
done

test -d "$ROOT/.git" || fail "production_repository_missing"
test -f "$ROOT/.env.local" || fail "production_env_missing"
test -s "$ROOT/.next/BUILD_ID" || fail "production_build_missing"
test -s "$CANDIDATE/.next/BUILD_ID" || fail "candidate_build_missing"
grep -qx 'BLOG_REVIEW_PREVIEW_CANDIDATE_BUILD_STATUS=PASS' "$BUILD_REPORT/status.txt" || fail "candidate_build_not_passed"
grep -qx 'BLOG_REVIEW_PREVIEW_CANDIDATE_RUNTIME_SMOKE_STATUS=PASS' "$RUNTIME_REPORT/status.txt" || fail "candidate_runtime_not_passed"

test "$(git -C "$ROOT" rev-parse HEAD)" = "$BASE_COMMIT" || fail "production_head_drift"
test "$(git -C "$ROOT" branch --show-current)" = "live-clean-sync-20260424" || fail "production_branch_mismatch"
test -z "$(git -C "$ROOT" status --porcelain)" || fail "production_worktree_not_clean"
git -C "$ROOT" cat-file -e "$TARGET_COMMIT^{commit}" || fail "target_commit_missing"
test "$(git -C "$ROOT" rev-parse "$TARGET_COMMIT^")" = "$BASE_COMMIT" || fail "target_not_direct_child"
test "$(git -C "$ROOT" merge-base "$BASE_COMMIT" "$TARGET_COMMIT")" = "$BASE_COMMIT" || fail "target_not_fast_forward"
test "$(git -C "$ROOT" rev-parse "$BASE_COMMIT:app/blog/[slug]/page.tsx")" = "$(git -C "$ROOT" rev-parse "$TARGET_COMMIT:app/blog/[slug]/page.tsx")" || fail "live_blog_route_changed"

PM2_RAW="$OUT/pm2-jlist.json"
pm2 jlist > "$PM2_RAW" 2>"$OUT/pm2-jlist.stderr" || fail "pm2_jlist_failed"
jq -e . "$PM2_RAW" >/dev/null || fail "pm2_json_invalid"
test "$(jq --arg name "$PM2_NAME" '[.[] | select(.name==$name)] | length' "$PM2_RAW")" = "1" || fail "pm2_process_count_invalid"

jq --arg name "$PM2_NAME" '
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
    interpreter:.pm2_env.exec_interpreter,
    execMode:.pm2_env.exec_mode,
    port:(.pm2_env.env.PORT // .pm2_env.PORT // null),
    nodeEnv:(.pm2_env.env.NODE_ENV // .pm2_env.NODE_ENV // null)
  }' "$PM2_RAW" > "$OUT/pm2-safe.json"

PM2_STATUS="$(jq -r '.status' "$OUT/pm2-safe.json")"
PM2_PID="$(jq -r '.pid' "$OUT/pm2-safe.json")"
PM2_CWD="$(jq -r '.cwd' "$OUT/pm2-safe.json")"
test "$PM2_STATUS" = "online" || fail "production_pm2_not_online"
test "$PM2_PID" != "0" && test "$PM2_PID" != "null" || fail "production_pm2_pid_invalid"
test "$PM2_CWD" = "$ROOT" || fail "production_pm2_cwd_mismatch"

printf '%s\n' "$PM2_PID" > "$OUT/pm2-process-pids.txt"
frontier="$PM2_PID"
for _depth in 1 2 3 4 5 6 7 8; do
  next_frontier=""
  for parent_pid in $frontier; do
    children="$(pgrep -P "$parent_pid" 2>/dev/null || true)"
    if test -n "$children"; then
      printf '%s\n' $children >> "$OUT/pm2-process-pids.txt"
      next_frontier="$next_frontier $children"
    fi
  done
  frontier="$next_frontier"
  test -n "${frontier// /}" || break
done
sort -n -u "$OUT/pm2-process-pids.txt" -o "$OUT/pm2-process-pids.txt"

: > "$OUT/pm2-process-tree-safe.txt"
while IFS= read -r process_pid; do
  ps -p "$process_pid" -o pid=,ppid=,etime=,comm=,args= >> "$OUT/pm2-process-tree-safe.txt" 2>/dev/null || true
done < "$OUT/pm2-process-pids.txt"
test -s "$OUT/pm2-process-tree-safe.txt" || fail "production_pm2_process_tree_missing"

ss -H -ltnp > "$OUT/listeners-all.txt" 2>/dev/null || true
: > "$OUT/production-listeners.txt"
while IFS= read -r process_pid; do
  grep -E "pid=${process_pid}," "$OUT/listeners-all.txt" >> "$OUT/production-listeners.txt" || true
done < "$OUT/pm2-process-pids.txt"
sort -u "$OUT/production-listeners.txt" -o "$OUT/production-listeners.txt"
test -s "$OUT/production-listeners.txt" || fail "production_listener_not_found_in_pm2_process_tree"

sed -nE 's/^.*:([0-9]+)[[:space:]].*$/\1/p' "$OUT/production-listeners.txt" | sort -n -u > "$OUT/production-listener-ports.txt"
test -s "$OUT/production-listener-ports.txt" || fail "production_listener_port_not_found"

NGINX_FILES="$OUT/nginx-site-files.txt"
grep -RIlE 'server_name[[:space:]].*sikhadenge\.in' /etc/nginx/sites-enabled /etc/nginx/conf.d 2>/dev/null | sort -u > "$NGINX_FILES" || true
test -s "$NGINX_FILES" || fail "nginx_site_config_not_found"
: > "$OUT/nginx-routing-safe.txt"
while IFS= read -r file; do
  echo "FILE=$file" >> "$OUT/nginx-routing-safe.txt"
  grep -nE '^[[:space:]]*(listen|server_name|location|proxy_pass|proxy_set_header|include)[[:space:]]' "$file" >> "$OUT/nginx-routing-safe.txt" || true
done < "$NGINX_FILES"
nginx -t > "$OUT/nginx-test.txt" 2>&1 || fail "nginx_config_test_failed"

TOKEN_META="$(node - "$ROOT/.env.local" <<'NODE'
const fs = require('node:fs');
const envPath = process.argv[2];
const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
const matches = lines.filter((line) => /^\s*BLOG_REVIEW_PREVIEW_TOKEN=/.test(line));
let length = 0;
if (matches.length === 1) {
  let value = matches[0].replace(/^\s*[^=]*=/, '').trim();
  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")))
  ) {
    value = value.slice(1, -1);
  }
  length = Buffer.byteLength(value, 'utf8');
}
process.stdout.write(`${matches.length}|${length}`);
NODE
)"
IFS='|' read -r TOKEN_LINES TOKEN_LENGTH <<< "$TOKEN_META"
test "$TOKEN_LINES" -le 1 || fail "duplicate_preview_token_entries"
if test "$TOKEN_LINES" = "1"; then
  test "$TOKEN_LENGTH" -ge 32 && test "$TOKEN_LENGTH" -le 512 || fail "existing_preview_token_invalid"
fi

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

{
  echo "PRODUCTION_HEAD=$(git -C "$ROOT" rev-parse HEAD)"
  echo "PRODUCTION_BRANCH=$(git -C "$ROOT" branch --show-current)"
  echo "PRODUCTION_BUILD_ID=$(cat "$ROOT/.next/BUILD_ID")"
  echo "CANDIDATE_BUILD_ID=$(cat "$CANDIDATE/.next/BUILD_ID")"
  echo "TARGET_COMMIT=$TARGET_COMMIT"
  echo "TARGET_DIRECT_CHILD=YES"
  echo "TARGET_FAST_FORWARD=YES"
  echo "LIVE_BLOG_ROUTE_MODIFIED=NO"
  echo "PM2_PID=$PM2_PID"
  echo "PM2_STATUS=$PM2_STATUS"
  echo "PM2_CWD=$PM2_CWD"
  echo "PM2_PROCESS_TREE_SIZE=$(wc -l < "$OUT/pm2-process-pids.txt" | tr -d ' ')"
  echo "LISTENER_PORTS=$(paste -sd, "$OUT/production-listener-ports.txt")"
  echo "PREVIEW_TOKEN_ENTRY_COUNT=$TOKEN_LINES"
  echo "PREVIEW_TOKEN_LENGTH=$TOKEN_LENGTH"
} > "$OUT/preflight-facts.txt"

df -h "$ROOT" "$CANDIDATE" "$ARTIFACT_ROOT" > "$OUT/disk.txt"
df -i "$ROOT" > "$OUT/inodes.txt"

{
  echo "BLOG_REVIEW_PREVIEW_PRODUCTION_SWITCH_PREFLIGHT_STATUS=PASS"
  echo "PRODUCTION_BASE_COMMIT=$BASE_COMMIT"
  echo "MINIMAL_RUNTIME_COMMIT=$TARGET_COMMIT"
  echo "TARGET_FAST_FORWARD_READY=YES"
  echo "CANDIDATE_BUILD_STATUS=PASS"
  echo "CANDIDATE_RUNTIME_SMOKE_STATUS=PASS"
  echo "PRODUCTION_PM2_STATUS=ONLINE"
  echo "PRODUCTION_PM2_CWD_MATCH=YES"
  echo "PRODUCTION_PM2_PROCESS_TREE_DISCOVERED=YES"
  echo "PRODUCTION_LISTENER_DISCOVERED=YES"
  echo "NGINX_SITE_CONFIG_DISCOVERED=YES"
  echo "NGINX_CONFIG_TEST=PASS"
  echo "PREVIEW_TOKEN_CURRENTLY_PRESENT=$(test "$TOKEN_LINES" = "1" && echo YES || echo NO)"
  echo "PRODUCTION_BUILD_PROCESS_ACTIVE=NO"
  echo "PRODUCTION_HTTP_BASELINE=PASS"
  echo "PRODUCTION_DEPLOYMENT_PERFORMED=NO"
  echo "PM2_RESTART_PERFORMED=NO"
  echo "DATABASE_WRITE_PERFORMED=NO"
  echo "REPORT=$OUT"
} | tee "$STATUS"

cat "$OUT/pm2-safe.json"
echo "--- PM2 PROCESS TREE ---"
cat "$OUT/pm2-process-tree-safe.txt"
echo "--- PRODUCTION LISTENER ---"
cat "$OUT/production-listeners.txt"
echo "--- NGINX ROUTING ---"
cat "$OUT/nginx-routing-safe.txt"
