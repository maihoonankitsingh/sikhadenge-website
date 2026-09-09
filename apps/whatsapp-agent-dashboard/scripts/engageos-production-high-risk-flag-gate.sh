#!/usr/bin/env bash
set -Eeuo pipefail

ENV_FILE="${ENV_FILE:-.env}"
failures=0

pass() { printf 'PASS: %s\n' "$*"; }
fail() { printf 'FAIL: %s\n' "$*" >&2; failures=$((failures + 1)); }

read_env_value() {
  local key="$1"
  local file="$2"
  node - "$file" "$key" <<'NODE'
const fs = require('node:fs');
const [file, key] = process.argv.slice(2);
if (!file || !key || !fs.existsSync(file)) process.exit(0);
const text = fs.readFileSync(file, 'utf8');
let value = '';
for (const rawLine of text.split(/\r?\n/)) {
  const line = rawLine.trim();
  if (!line || line.startsWith('#')) continue;
  const normalized = line.startsWith('export ') ? line.slice(7).trim() : line;
  const separator = normalized.indexOf('=');
  if (separator < 1) continue;
  if (normalized.slice(0, separator).trim() !== key) continue;
  value = normalized.slice(separator + 1).trim();
  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")))
  ) {
    value = value.slice(1, -1);
  }
}
process.stdout.write(value);
NODE
}

effective_value() {
  local key="$1"
  if [[ -v "$key" ]]; then
    printf '%s' "${!key}"
    return 0
  fi
  read_env_value "$key" "$ENV_FILE"
}

normalize() {
  printf '%s' "$1" | tr '[:upper:]' '[:lower:]' | xargs
}

assert_false_or_absent() {
  local key="$1"
  local value normalized
  value="$(effective_value "$key")"
  normalized="$(normalize "$value")"
  case "$normalized" in
    ''|false|0|off|no)
      pass "$key is fail-closed"
      ;;
    *)
      fail "$key must be absent or disabled for the initial EngageOS production deploy"
      ;;
  esac
}

assert_exact_or_absent() {
  local key="$1"
  local expected="$2"
  local value normalized
  value="$(effective_value "$key")"
  normalized="$(normalize "$value")"
  if [[ -z "$normalized" || "$normalized" == "$expected" ]]; then
    pass "$key is ${expected} or absent"
  else
    fail "$key must be absent or ${expected} for the initial EngageOS production deploy"
  fi
}

assert_empty_or_absent() {
  local key="$1"
  local value
  value="$(effective_value "$key")"
  if [[ -z "$(printf '%s' "$value" | xargs)" ]]; then
    pass "$key is empty or absent"
  else
    fail "$key must be empty or absent for the initial EngageOS production deploy"
  fi
}

assert_on_or_absent() {
  local key="$1"
  local value normalized
  value="$(effective_value "$key")"
  normalized="$(normalize "$value")"
  if [[ -z "$normalized" || "$normalized" == "on" || "$normalized" == "true" || "$normalized" == "1" ]]; then
    pass "$key is protective or absent"
  else
    fail "$key must be absent or protective for the initial EngageOS production deploy"
  fi
}

printf 'ENGAGEOS_HIGH_RISK_FLAG_GATE_BEGIN\n'

if [[ ! -f "$ENV_FILE" ]]; then
  fail "environment file not found: $ENV_FILE"
else
  pass "environment file found"
fi

# Phase 3 durable runtime must not be activated by the code-deploy operation.
assert_false_or_absent ENGAGEOS_EVENT_RUNTIME_ENABLED
assert_false_or_absent ENGAGEOS_EVENT_WORKER_ENABLED

# Phase 6 normalized cutover/backfill remains rollback-safe on legacy reads.
assert_exact_or_absent ENGAGEOS_WHATSAPP_CORE_MODE legacy
assert_false_or_absent ENGAGEOS_WHATSAPP_BACKFILL_COMPLETE

# Phase 7 Instagram external actions remain disabled.
assert_exact_or_absent INSTAGRAM_OUTBOUND_MODE disabled
assert_false_or_absent INSTAGRAM_COMMENT_AUTOMATION_ENABLED
assert_exact_or_absent INSTAGRAM_COMMENT_ACTION_MODE disabled
assert_on_or_absent INSTAGRAM_COMMENT_ACTION_KILL_SWITCH

# Phase 8 Facebook/Messenger external actions remain disabled.
assert_exact_or_absent MESSENGER_OUTBOUND_MODE disabled
assert_false_or_absent FACEBOOK_PAGE_COMMENT_AUTOMATION_ENABLED
assert_exact_or_absent FACEBOOK_PAGE_COMMENT_ACTION_MODE disabled
assert_on_or_absent FACEBOOK_PAGE_COMMENT_ACTION_KILL_SWITCH
assert_false_or_absent FACEBOOK_PAGE_COMMENT_WRITE_APPROVED
assert_false_or_absent ENGAGEOS_MESSENGER_POLICY_ENFORCED

# Existing WhatsApp outbound path remains explicitly disabled during code rollout.
assert_exact_or_absent WHATSAPP_OUTBOUND_MODE disabled
assert_false_or_absent WHATSAPP_CUTOVER_APPROVED
assert_empty_or_absent WHATSAPP_OUTBOUND_LIVE_ACK

# Agent and bulk/external writes remain disabled independently.
assert_false_or_absent AGENT_MODEL_CALLS_ENABLED
assert_false_or_absent AGENT_AUTO_REPLY_ENABLED
assert_false_or_absent AGENT_IMMEDIATE_DISPATCH_ENABLED
assert_false_or_absent WHATSAPP_CAMPAIGNS_ENABLED
assert_false_or_absent AUTOMATION_ACTIONS_ENABLED
assert_false_or_absent INTEGRATION_EXTERNAL_WRITES_ENABLED

# Phase 10 enforcement is a separate controlled activation after production evidence.
assert_false_or_absent ENGAGEOS_GROUNDED_AI_POLICY_ENFORCED

printf 'HIGH_RISK_FLAG_FAILURES=%s\n' "$failures"
if [[ "$failures" -eq 0 ]]; then
  printf 'HIGH_RISK_FLAG_GATE_STATUS=PASS\n'
  printf 'ENGAGEOS_HIGH_RISK_FLAG_GATE_END\n'
  exit 0
fi

printf 'HIGH_RISK_FLAG_GATE_STATUS=FAIL\n'
printf 'ENGAGEOS_HIGH_RISK_FLAG_GATE_END\n'
exit 1
