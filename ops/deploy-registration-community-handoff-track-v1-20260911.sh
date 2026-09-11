#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:-}"
REG_JS='/var/www/sikhadenge.in/registration-stable-v72-20260903-131023/registration-stable-hot-v72.js'
EXPECTED_OLD_SHA='bc9e84f6800bbbe856aaded94361c76dc5aee23a6c2dfe979926e15b4d50b313'
PUBLIC_JS='https://sikhadenge.in/registration-stable-hot-v72.js?v=20260903-131023'
REG_URL='https://sikhadenge.in/gen-ai-masterclass/register-one-step'
STATE_FILE='/tmp/registration-community-handoff-track-v1-20260911.state'
MARKER='SIKHADENGE_REGISTRATION_COMMUNITY_HANDOFF_TRACK_V1_START'

sha_file() { sha256sum "$1" | awk '{print $1}'; }
sha_url() {
  local url="$1" out="$2"
  curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 \
    -H 'Cache-Control: no-cache' "${url}&qa=$(date +%s%N)" -o "$out"
  sha_file "$out"
}

status_value() {
  local key="$1"
  sikhadenge-funnel-lockctl status | awk -F= -v k="$key" '$1==k{print $2}'
}

stage() {
  test -f "$REG_JS"

  local old_sha
  old_sha="$(sha_file "$REG_JS")"
  echo "REG_COMMUNITY_TRACK_V1_OLD_SHA=$old_sha"
  test "$old_sha" = "$EXPECTED_OLD_SHA"

  sikhadenge-funnel-lockctl check
  test "$(status_value LOCK_STATE)" = 'LOCKED'

  local ai_sha claude_sha
  ai_sha="$(status_value AI_PUBLIC_SHA)"
  claude_sha="$(status_value CLAUDE_PUBLIC_SHA)"
  test -n "$ai_sha"; test -n "$claude_sha"
  echo "BASE_AI_PUBLIC_SHA=$ai_sha"
  echo "BASE_CLAUDE_PUBLIC_SHA=$claude_sha"

  local ts backup tmp
  ts="$(date +%Y%m%d-%H%M%S)"
  backup="/var/backups/sikhadenge/registration-community-handoff-track-v1-${ts}"
  tmp="$(mktemp /tmp/registration-community-handoff-track-v1.XXXXXX.js)"
  mkdir -p "$backup"
  cp -a "$REG_JS" "$backup/registration-stable-hot-v72.js.before"

  cat > "$STATE_FILE" <<EOF
BACKUP=$backup
AI_SHA=$ai_sha
CLAUDE_SHA=$claude_sha
OLD_SHA=$old_sha
EOF

  python3 - "$REG_JS" "$tmp" <<'PY'
import sys
src, out = sys.argv[1:]
s = open(src, encoding='utf-8', errors='strict').read()
marker = '/* SIKHADENGE_CONFIRMATION_FINAL_WELCOME_V56_R1_START */'
if s.count(marker) != 1:
    raise SystemExit(f'expected one V56R1 marker, got {s.count(marker)}')
if 'SIKHADENGE_REGISTRATION_COMMUNITY_HANDOFF_TRACK_V1_START' in s:
    raise SystemExit('tracking marker already present')

block = r'''/* SIKHADENGE_REGISTRATION_COMMUNITY_HANDOFF_TRACK_V1_START */

  let sdCommunityHandoffTrackedV1 = false;

  function sdTrackCommunityHandoffV1() {
    if (sdCommunityHandoffTrackedV1) return;

    const consent = readConsent();

    if (
      !consent ||
      consent.analytics !== 'granted' ||
      typeof window.gtag !== 'function'
    ) return;

    sdCommunityHandoffTrackedV1 = true;

    try {
      window.gtag(
        'event',
        'whatsapp_community_handoff',
        {
          event_category: 'registration',
          event_label: 'whatsapp-community',
          page_path: '/gen-ai-masterclass/register-one-step',
          transport_type: 'beacon'
        }
      );
    }
    catch {}
  }

/* SIKHADENGE_REGISTRATION_COMMUNITY_HANDOFF_TRACK_V1_END */

'''

s = s.replace(marker, block + marker, 1)

nav = '''      window.location.assign(
        destination
      );'''
if s.count(nav) != 1:
    raise SystemExit(f'expected one WhatsApp navigation anchor, got {s.count(nav)}')

s = s.replace(
    nav,
    '''      sdTrackCommunityHandoffV1();

      window.location.assign(
        destination
      );''',
    1
)

if s.count('whatsapp_community_handoff') != 1:
    raise SystemExit('unexpected tracking event count')
if s.count('sdTrackCommunityHandoffV1();') != 1:
    raise SystemExit('unexpected tracking call count')

open(out, 'w', encoding='utf-8', newline='\n').write(s)
print('REG_COMMUNITY_TRACK_V1_PATCH=PASS')
PY

  node --check "$tmp"

  local new_sha
  new_sha="$(sha_file "$tmp")"
  test "$new_sha" != "$old_sha"
  echo "REG_COMMUNITY_TRACK_V1_NEW_SHA=$new_sha"

  install -o root -g root -m 0644 "$tmp" "$REG_JS"
  rm -f "$tmp"

  test "$(sha_file "$REG_JS")" = "$new_sha"
  grep -Fq "$MARKER" "$REG_JS"
  grep -Fq "'whatsapp_community_handoff'" "$REG_JS"

  local public_tmp public_sha
  public_tmp="$(mktemp /tmp/registration-community-handoff-public.XXXXXX.js)"
  public_sha="$(sha_url "$PUBLIC_JS" "$public_tmp")"
  rm -f "$public_tmp"
  echo "REG_COMMUNITY_TRACK_V1_PUBLIC_SHA=$public_sha"
  test "$public_sha" = "$new_sha"

  curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 \
    -H 'Cache-Control: no-cache' "${REG_URL}?community_track_stage=${ts}" \
    | grep -Fq '/registration-stable-hot-v72.js?v=20260903-131023'

  sikhadenge-funnel-lockctl check
  test "$(status_value LOCK_STATE)" = 'LOCKED'
  test "$(status_value AI_PUBLIC_SHA)" = "$ai_sha"
  test "$(status_value CLAUDE_PUBLIC_SHA)" = "$claude_sha"

  echo "REGISTRATION_COMMUNITY_HANDOFF_TRACK_V1_STAGE_PASS=$backup"
}

rollback() {
  if [[ ! -f "$STATE_FILE" ]]; then
    echo 'No deployment state file; nothing to rollback.'
    exit 0
  fi

  # shellcheck disable=SC1090
  source "$STATE_FILE"
  test -n "${BACKUP:-}"; test -f "$BACKUP/registration-stable-hot-v72.js.before"

  install -o root -g root -m 0644 "$BACKUP/registration-stable-hot-v72.js.before" "$REG_JS"
  test "$(sha_file "$REG_JS")" = "$EXPECTED_OLD_SHA"

  local public_tmp public_sha
  public_tmp="$(mktemp /tmp/registration-community-handoff-rollback.XXXXXX.js)"
  public_sha="$(sha_url "$PUBLIC_JS" "$public_tmp")"
  rm -f "$public_tmp"
  test "$public_sha" = "$EXPECTED_OLD_SHA"

  sikhadenge-funnel-lockctl check
  test "$(status_value LOCK_STATE)" = 'LOCKED'
  test "$(status_value AI_PUBLIC_SHA)" = "$AI_SHA"
  test "$(status_value CLAUDE_PUBLIC_SHA)" = "$CLAUDE_SHA"

  echo "REGISTRATION_COMMUNITY_HANDOFF_TRACK_V1_ROLLBACK_PASS=$BACKUP"
}

case "$MODE" in
  stage) stage ;;
  rollback) rollback ;;
  *) echo "Usage: $0 {stage|rollback}" >&2; exit 64 ;;
esac
