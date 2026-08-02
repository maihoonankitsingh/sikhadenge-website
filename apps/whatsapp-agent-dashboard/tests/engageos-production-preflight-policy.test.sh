#!/usr/bin/env bash
set -Eeuo pipefail

script_path="scripts/engageos-production-preflight.sh"

test -f "$script_path"
bash -n "$script_path"

forbidden_patterns=(
  'prisma[[:space:]]+migrate[[:space:]]+deploy'
  'prisma[[:space:]]+migrate[[:space:]]+resolve'
  'pm2[[:space:]]+(restart|reload|stop|delete|kill)'
  'git[[:space:]]+(reset|checkout|switch|pull|merge|rebase|clean)'
  '(^|[[:space:]])(INSERT|UPDATE|DELETE|ALTER|CREATE|DROP|TRUNCATE)[[:space:]]'
  'source[[:space:]]+.*ENV_FILE'
  '(^|[[:space:]])\.[[:space:]]+.*ENV_FILE'
  '(^|[[:space:]])(cat|printf|echo)[[:space:]].*DATABASE_URL'
)

for pattern in "${forbidden_patterns[@]}"; do
  if grep -En "$pattern" "$script_path"; then
    printf 'Forbidden production-preflight pattern detected: %s\n' "$pattern" >&2
    exit 1
  fi
done

grep -Fq "SELECT current_database()" "$script_path"
grep -Fq "PREFLIGHT_STATUS=PASS" "$script_path"
grep -Fq "PREFLIGHT_STATUS=FAIL" "$script_path"
grep -Fq "EngageOS security master must be absent or false" "$script_path"
grep -Fq "schema-only" "$script_path"

printf 'EngageOS production preflight policy test passed.\n'