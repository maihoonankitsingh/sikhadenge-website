#!/usr/bin/env bash
set -Eeuo pipefail
ROOT='/var/lib/sikhadenge-funnel-golden-lock'
UNLOCK="$ROOT/unlocked-until"
SEAL='/usr/local/sbin/sikhadenge-funnel-seal-current'
GUARD='/usr/local/sbin/sikhadenge-funnel-golden-guard'
TIMER='sikhadenge-funnel-golden-guard.timer'

[[ ${EUID:-$(id -u)} -eq 0 ]] || { echo 'lockctl must run as root' >&2; exit 1; }
cmd=${1:-status}
case "$cmd" in
  status)
    echo '=== SIKHADENGE TWO-FUNNEL GOLDEN LOCK ==='
    if [[ -L "$ROOT/current" && -r "$ROOT/current/state.env" ]]; then cat "$ROOT/current/state.env"; else echo 'NO_ACTIVE_SEAL'; fi
    if [[ -f "$UNLOCK" ]]; then echo "UNLOCKED_UNTIL_EPOCH=$(cat "$UNLOCK")"; else echo 'LOCK_STATE=LOCKED'; fi
    systemctl is-enabled "$TIMER" 2>/dev/null || true
    systemctl is-active "$TIMER" 2>/dev/null || true
    systemctl list-timers "$TIMER" --no-pager 2>/dev/null || true
    ;;
  check)
    exec "$GUARD" --deep
    ;;
  unlock)
    mins=${2:-15}; [[ "$mins" =~ ^[0-9]+$ ]] && (( mins >= 1 && mins <= 120 )) || { echo 'unlock minutes must be 1..120' >&2; exit 2; }
    mkdir -p "$ROOT"; echo $(( $(date +%s) + mins*60 )) > "$UNLOCK"; chmod 0600 "$UNLOCK"
    echo "UNLOCKED_FOR_MINUTES=$mins"
    echo 'Make intentional edits, fully QA them, then run: sikhadenge-funnel-lockctl reseal'
    ;;
  lock)
    rm -f "$UNLOCK"; "$GUARD" --deep
    echo 'LOCKED_AND_VERIFIED'
    ;;
  reseal)
    [[ -x "$SEAL" ]] || { echo 'seal utility missing' >&2; exit 1; }
    "$SEAL"
    rm -f "$UNLOCK"
    "$GUARD" --deep
    echo 'RESEALED_LOCKED_AND_VERIFIED'
    ;;
  *)
    echo 'Usage: sikhadenge-funnel-lockctl {status|check|unlock [1..120 min]|lock|reseal}' >&2
    exit 2
    ;;
esac
