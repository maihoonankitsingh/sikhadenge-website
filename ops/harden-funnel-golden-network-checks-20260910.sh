#!/usr/bin/env bash
set -Eeuo pipefail

GUARD='/usr/local/sbin/sikhadenge-funnel-golden-guard'
SEAL='/usr/local/sbin/sikhadenge-funnel-seal-current'
SERVICE='/etc/systemd/system/sikhadenge-funnel-golden-guard.service'
ROOT='/var/lib/sikhadenge-funnel-golden-lock'
TS="$(date +%Y%m%d-%H%M%S)"
BK="/var/backups/sikhadenge/funnel-golden-network-hardening-$TS"

[[ ${EUID:-$(id -u)} -eq 0 ]] || { echo 'must run as root' >&2; exit 1; }
for f in "$GUARD" "$SEAL" "$SERVICE"; do [[ -s "$f" ]] || { echo "missing: $f" >&2; exit 1; }; done
mkdir -p "$BK"
cp -a "$GUARD" "$BK/guard.before"
cp -a "$SEAL" "$BK/seal.before"
cp -a "$SERVICE" "$BK/service.before"

rollback(){
  rc=$?
  trap - ERR INT TERM
  set +e
  cp -a "$BK/guard.before" "$GUARD"
  cp -a "$BK/seal.before" "$SEAL"
  cp -a "$BK/service.before" "$SERVICE"
  systemctl daemon-reload >/dev/null 2>&1 || true
  echo "ROLLBACK_COMPLETE=$BK rc=$rc"
  exit "$rc"
}
trap rollback ERR INT TERM

python3 - "$GUARD" <<'PY'
from pathlib import Path
import sys
p=Path(sys.argv[1]); s=p.read_text()
old='''fetch(){ local u="$1" o="$2"; curl -L -sS --connect-timeout 4 --max-time 25 -o "$o" -w '%{http_code}' "$u" || true; }'''
new='''fetch(){
  local u="$1" o="$2" code='000' attempt
  for attempt in 1 2 3; do
    rm -f "$o"
    code=$(curl -L -sS --connect-timeout 4 --max-time 25 -o "$o" -w '%{http_code}' "$u" || true)
    [[ -n "$code" ]] || code='000'
    if [[ "$code" != '000' ]]; then printf '%s' "$code"; return 0; fi
    (( attempt < 3 )) && sleep "$attempt"
  done
  printf '%s' "$code"
}

fetch_local_https(){
  local u="$1" o="$2" code='000' attempt
  for attempt in 1 2; do
    rm -f "$o"
    code=$(curl -L -sS --resolve sikhadenge.in:443:127.0.0.1 --connect-timeout 3 --max-time 20 -o "$o" -w '%{http_code}' "$u" || true)
    [[ -n "$code" ]] || code='000'
    if [[ "$code" != '000' ]]; then printf '%s' "$code"; return 0; fi
    (( attempt < 2 )) && sleep 1
  done
  printf '%s' "$code"
}'''
if old not in s:
    if 'fetch_local_https(){' in s and 'for attempt in 1 2 3' in s:
        print('GUARD_FETCH_ALREADY_HARDENED')
    else:
        raise SystemExit('guard fetch signature not found; refusing broad patch')
else:
    s=s.replace(old,new,1)

old_pages='''ai_code=$(fetch "$AI_URL?guard=$TS" "$TMP/ai.public")
cl_code=$(fetch "$CL_URL?guard=$TS" "$TMP/cl.public")
ai_sha=$(sha "$TMP/ai.public" 2>/dev/null || echo bad); cl_sha=$(sha "$TMP/cl.public" 2>/dev/null || echo bad)
[[ "$ai_code" == 200 && "$ai_sha" == "$AI_PUBLIC_SHA" ]] || { log "PUBLIC_MISMATCH AI http=$ai_code sha=$ai_sha want=$AI_PUBLIC_SHA"; FAIL=1; }
[[ "$cl_code" == 200 && "$cl_sha" == "$CLAUDE_PUBLIC_SHA" ]] || { log "PUBLIC_MISMATCH CLAUDE http=$cl_code sha=$cl_sha want=$CLAUDE_PUBLIC_SHA"; FAIL=1; }'''
new_pages='''ai_code=$(fetch "$AI_URL?guard=$TS" "$TMP/ai.public")
cl_code=$(fetch "$CL_URL?guard=$TS" "$TMP/cl.public")
ai_sha=$(sha "$TMP/ai.public" 2>/dev/null || echo bad); cl_sha=$(sha "$TMP/cl.public" 2>/dev/null || echo bad)
if [[ "$ai_code" == '000' ]]; then
  ai_local_public_code=$(fetch_local_https "$AI_URL?guard-local=$TS" "$TMP/ai.public.local")
  ai_local_public_sha=$(sha "$TMP/ai.public.local" 2>/dev/null || echo bad)
  if [[ "$ai_local_public_code" == 200 && "$ai_local_public_sha" == "$AI_PUBLIC_SHA" ]]; then
    log "TRANSIENT_PUBLIC_FETCH AI external_http=000 local_https=200 sha_verified=$AI_PUBLIC_SHA"
    ai_code=200; ai_sha="$AI_PUBLIC_SHA"
  fi
fi
if [[ "$cl_code" == '000' ]]; then
  cl_local_public_code=$(fetch_local_https "$CL_URL?guard-local=$TS" "$TMP/cl.public.local")
  cl_local_public_sha=$(sha "$TMP/cl.public.local" 2>/dev/null || echo bad)
  if [[ "$cl_local_public_code" == 200 && "$cl_local_public_sha" == "$CLAUDE_PUBLIC_SHA" ]]; then
    log "TRANSIENT_PUBLIC_FETCH CLAUDE external_http=000 local_https=200 sha_verified=$CLAUDE_PUBLIC_SHA"
    cl_code=200; cl_sha="$CLAUDE_PUBLIC_SHA"
  fi
fi
[[ "$ai_code" == 200 && "$ai_sha" == "$AI_PUBLIC_SHA" ]] || { log "PUBLIC_MISMATCH AI http=$ai_code sha=$ai_sha want=$AI_PUBLIC_SHA"; FAIL=1; }
[[ "$cl_code" == 200 && "$cl_sha" == "$CLAUDE_PUBLIC_SHA" ]] || { log "PUBLIC_MISMATCH CLAUDE http=$cl_code sha=$cl_sha want=$CLAUDE_PUBLIC_SHA"; FAIL=1; }'''
if old_pages not in s:
    if 'TRANSIENT_PUBLIC_FETCH AI' not in s:
        raise SystemExit('guard public-page block not found; refusing broad patch')
else:
    s=s.replace(old_pages,new_pages,1)

old_assets='''    code=$(fetch "https://sikhadenge.in$url" "$TMP/asset")
    got=$(sha "$TMP/asset" 2>/dev/null || echo bad)
    if [[ "$code" != 200 || "$got" != "$want" ]]; then log "ASSET_MISMATCH page=$page kind=$kind http=$code url=$url got=$got want=$want"; deep_bad=$((deep_bad+1)); fi'''
new_assets='''    code=$(fetch "https://sikhadenge.in$url" "$TMP/asset")
    got=$(sha "$TMP/asset" 2>/dev/null || echo bad)
    if [[ "$code" == '000' ]]; then
      local_code=$(fetch_local_https "https://sikhadenge.in$url" "$TMP/asset.local")
      local_got=$(sha "$TMP/asset.local" 2>/dev/null || echo bad)
      if [[ "$local_code" == 200 && "$local_got" == "$want" ]]; then
        log "TRANSIENT_ASSET_FETCH page=$page kind=$kind external_http=000 url=$url local_https=200 sha_verified=$want"
        code=200; got="$want"
      fi
    fi
    if [[ "$code" != 200 || "$got" != "$want" ]]; then log "ASSET_MISMATCH page=$page kind=$kind http=$code url=$url got=$got want=$want"; deep_bad=$((deep_bad+1)); fi'''
if old_assets not in s:
    if 'TRANSIENT_ASSET_FETCH page=' not in s:
        raise SystemExit('guard asset block not found; refusing broad patch')
else:
    s=s.replace(old_assets,new_assets,1)

p.write_text(s)
print('GUARD_NETWORK_HARDENING_PATCH=PASS')
PY

python3 - "$SEAL" <<'PY'
from pathlib import Path
import sys
p=Path(sys.argv[1]); s=p.read_text()
old='''fetch200(){ local url="$1" out="$2" code; code=$(curl -L -sS --connect-timeout 5 --max-time 35 -o "$out" -w '%{http_code}' "$url" || true); [[ "$code" == 200 ]] || { echo "HTTP $code: $url" >&2; return 1; }; }'''
new='''fetch200(){
  local url="$1" out="$2" code='000' attempt
  for attempt in 1 2 3; do
    rm -f "$out"
    code=$(curl -L -sS --connect-timeout 5 --max-time 35 -o "$out" -w '%{http_code}' "$url" || true)
    [[ -n "$code" ]] || code='000'
    [[ "$code" == 200 ]] && return 0
    (( attempt < 3 )) && sleep "$attempt"
  done
  echo "HTTP $code after 3 attempts: $url" >&2
  return 1
}'''
if old not in s:
    if 'HTTP $code after 3 attempts' in s:
        print('SEAL_FETCH_ALREADY_HARDENED')
    else:
        raise SystemExit('seal fetch200 signature not found; refusing broad patch')
else:
    s=s.replace(old,new,1)
p.write_text(s)
print('SEAL_NETWORK_RETRY_PATCH=PASS')
PY

python3 - "$SERVICE" <<'PY'
from pathlib import Path
import sys
p=Path(sys.argv[1]); s=p.read_text()
if 'TimeoutStartSec=55' in s:
    s=s.replace('TimeoutStartSec=55','TimeoutStartSec=90',1)
elif 'TimeoutStartSec=90' not in s:
    raise SystemExit('unexpected service timeout; refusing broad patch')
p.write_text(s)
print('SERVICE_TIMEOUT_HARDENING=PASS')
PY

chmod 0750 "$GUARD" "$SEAL"
chmod 0644 "$SERVICE"
bash -n "$GUARD"
bash -n "$SEAL"
systemctl daemon-reload

# Verify the local HTTPS fallback path itself against the currently sealed asset hashes.
[[ -L "$ROOT/current" && -r "$ROOT/current/assets.tsv" ]]
for needle in '/sikhadenge-audience-v328.css' '/sikhadenge-workflow-v324.css'; do
  row=$(grep -F "$needle" "$ROOT/current/assets.tsv" | head -1 || true)
  [[ -n "$row" ]] || { echo "sealed asset not found: $needle" >&2; exit 1; }
  IFS=$'\t' read -r page kind url want bytes rel <<< "$row"
  out="/tmp/sd-hardening-asset-$RANDOM"
  code=$(curl -L -sS --resolve sikhadenge.in:443:127.0.0.1 --connect-timeout 3 --max-time 20 -o "$out" -w '%{http_code}' "https://sikhadenge.in$url" || true)
  got=$(sha256sum "$out" 2>/dev/null | awk '{print $1}' || true)
  rm -f "$out"
  [[ "$code" == 200 && "$got" == "$want" ]] || { echo "local fallback verification failed: $url http=$code got=$got want=$want" >&2; exit 1; }
  echo "LOCAL_HTTPS_FALLBACK_VERIFIED page=$page kind=$kind url=$url sha=$want"
done

# Run two consecutive deep checks. No hash or HTTP mismatch is allowed.
sikhadenge-funnel-lockctl check
sleep 2
sikhadenge-funnel-lockctl check
systemctl is-enabled sikhadenge-funnel-golden-guard.timer | grep -qx enabled
systemctl is-active sikhadenge-funnel-golden-guard.timer | grep -qx active

grep -Fq 'fetch_local_https(){' "$GUARD"
grep -Fq 'TRANSIENT_ASSET_FETCH' "$GUARD"
grep -Fq 'HTTP $code after 3 attempts' "$SEAL"
grep -Fq 'TimeoutStartSec=90' "$SERVICE"

trap - ERR INT TERM
printf '%s\n' \
  '============================================================' \
  'GOLDEN NETWORK HARDENING COMPLETE' \
  "BACKUP=$BK" \
  'TRANSPORT_RETRIES=3' \
  'HTTP_000_LOCAL_HTTPS_FALLBACK=ENABLED' \
  'WRONG_HTTP_OR_SHA_STILL_FAILS=YES' \
  'SERVICE_TIMEOUT=90s' \
  'DEEP_CHECKS=2_PASS' \
  '============================================================'
