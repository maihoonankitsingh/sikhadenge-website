#!/usr/bin/env bash
set -Eeuo pipefail

ROOT='/var/lib/sikhadenge-funnel-golden-lock'
GOLD="$ROOT/current"
SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'
AI_SNIP='/etc/nginx/snippets/sikhadenge-ai-video-3940.conf'
CL_ASSETS='/etc/nginx/snippets/sikhadenge-claude-31aug6pm-assets-final.conf'
AI_URL='https://sikhadenge.in/masterclass/ai-video'
CL_URL='https://sikhadenge.in/masterclass/claude/free'
UNLOCK="$ROOT/unlocked-until"
RUNLOCK='/run/lock/sikhadenge-funnel-golden-guard.lock'
LOG='/var/log/sikhadenge-funnel-golden-lock.log'
TS="$(date +%Y%m%d-%H%M%S)"
TMP="/tmp/sd-funnel-guard-$TS-$$"
FORCE_DEEP=0
[[ "${1:-}" == '--deep' ]] && FORCE_DEEP=1

mkdir -p /run/lock "$ROOT"; touch "$LOG"; chmod 0600 "$LOG" || true
exec 9>"$RUNLOCK"; flock -n 9 || exit 0
log(){ printf '%s %s\n' "$(date -Is)" "$*" | tee -a "$LOG"; }

[[ -L "$GOLD" && -r "$GOLD/state.env" ]] || { log 'CRITICAL no active Golden seal'; exit 1; }
# shellcheck disable=SC1090
source "$GOLD/state.env"

if [[ -f "$UNLOCK" ]]; then
  until=$(cat "$UNLOCK" 2>/dev/null || echo 0); now=$(date +%s)
  if [[ "$until" =~ ^[0-9]+$ ]] && (( now < until )); then log "UNLOCKED guard bypass until=$until"; exit 0; fi
  rm -f "$UNLOCK"; log 'unlock window expired; guard active again'
fi
mkdir -p "$TMP"
trap 'rm -rf "$TMP"' EXIT
export HOME=/root PM2_HOME=/root/.pm2

sha(){ sha256sum "$1" | awk '{print $1}'; }
fetch(){ local u="$1" o="$2"; curl -L -sS --connect-timeout 4 --max-time 25 -o "$o" -w '%{http_code}' "$u" || true; }

extract_claude_route(){
  python3 - "$SITE" "$1" <<'PY'
from pathlib import Path
import sys
src,dst=map(Path,sys.argv[1:]); s=src.read_text(errors='ignore'); needle='location = /masterclass/claude/free {'; start=s.find(needle)
if start<0: raise SystemExit(2)
brace=s.find('{',start); depth=0; quote=None; esc=False; end=None
for i in range(brace,len(s)):
 ch=s[i]
 if esc: esc=False; continue
 if ch=='\\': esc=True; continue
 if quote:
  if ch==quote: quote=None
  continue
 if ch in ('"',"'"): quote=ch; continue
 if ch=='{': depth+=1
 elif ch=='}':
  depth-=1
  if depth==0: end=i+1; break
if end is None: raise SystemExit(3)
dst.write_text(s[start:end]+'\n')
PY
}

replace_claude_route(){
  python3 - "$SITE" "$GOLD/config/claude-route.conf" <<'PY'
from pathlib import Path
import sys
site,gold=map(Path,sys.argv[1:]); s=site.read_text(errors='ignore'); repl=gold.read_text().rstrip(); needle='location = /masterclass/claude/free {'; start=s.find(needle)
if start<0: raise SystemExit('Claude route missing')
brace=s.find('{',start); depth=0; quote=None; esc=False; end=None
for i in range(brace,len(s)):
 ch=s[i]
 if esc: esc=False; continue
 if ch=='\\': esc=True; continue
 if quote:
  if ch==quote: quote=None
  continue
 if ch in ('"',"'"): quote=ch; continue
 if ch=='{': depth+=1
 elif ch=='}':
  depth-=1
  if depth==0: end=i+1; break
if end is None: raise SystemExit('Claude route malformed')
site.write_text(s[:start]+repl+s[end:])
PY
}

app_online(){
  local app="$1"
  pm2 jlist 2>/dev/null | python3 -c 'import json,sys; n=sys.argv[1]; a=json.load(sys.stdin); print("1" if any(x.get("name")==n and (x.get("pm2_env") or {}).get("status")=="online" for x in a) else "0")' "$app" 2>/dev/null | grep -qx 1
}

restart_app(){ local app="$1"; log "REPAIR pm2 restart $app"; pm2 restart "$app" --update-env >/dev/null 2>&1 || return 1; sleep 2; }

CONFIG_CHANGED=0
SOURCE_CHANGED=0

# 1) Source-level integrity. Any accidental edit to the locked page build is restored locally.
while IFS=$'\t' read -r want path rel; do
  [[ -n "$want" && -n "$path" && -n "$rel" ]] || continue
  got='MISSING'; [[ -f "$path" ]] && got=$(sha "$path")
  if [[ "$got" != "$want" ]]; then
    log "DRIFT source=$path got=$got want=$want"
    [[ -r "$GOLD/$rel" ]] || { log "CRITICAL Golden source copy missing: $rel"; exit 1; }
    mkdir -p "$(dirname "$path")"
    install -m 0644 "$GOLD/$rel" "$path"
    SOURCE_CHANGED=1
    log "REPAIR restored source=$path"
  fi
done < "$GOLD/source-files.tsv"

# 2) Dedicated AI Video Nginx snippet can be restored as one isolated unit.
got=$(sha "$AI_SNIP" 2>/dev/null || echo MISSING)
if [[ "$got" != "$AI_SNIP_SHA" ]]; then
  log "DRIFT AI snippet got=$got want=$AI_SNIP_SHA"
  cp -a "$AI_SNIP" "$TMP/ai-snippet.before" 2>/dev/null || true
  install -m 0644 "$GOLD/config/ai-snippet.conf" "$AI_SNIP"
  CONFIG_CHANGED=1; log 'REPAIR restored isolated AI Video Nginx snippet'
fi

# 3) Claude asset snippet is isolated and locked independently.
got=$(sha "$CL_ASSETS" 2>/dev/null || echo MISSING)
if [[ "$got" != "$CLAUDE_ASSETS_SHA" ]]; then
  log "DRIFT Claude assets snippet got=$got want=$CLAUDE_ASSETS_SHA"
  cp -a "$CL_ASSETS" "$TMP/claude-assets.before" 2>/dev/null || true
  install -m 0644 "$GOLD/config/claude-assets.conf" "$CL_ASSETS"
  CONFIG_CHANGED=1; log 'REPAIR restored Claude asset routes'
fi

# 4) Only the exact Claude page location block is compared/restored; unrelated website Nginx stays mutable.
if extract_claude_route "$TMP/claude-route.now"; then got=$(sha "$TMP/claude-route.now"); else got='MISSING'; fi
if [[ "$got" != "$CLAUDE_ROUTE_SHA" ]]; then
  log "DRIFT Claude route got=$got want=$CLAUDE_ROUTE_SHA"
  cp -a "$SITE" "$TMP/site.before"
  replace_claude_route
  CONFIG_CHANGED=1; log 'REPAIR restored exact Claude route block only'
fi

# Ensure the two isolated snippets remain included. Reinsert narrowly if a future config rewrite drops them.
if ! grep -Fq "include $AI_SNIP;" "$SITE"; then
  log 'DRIFT AI Video snippet include missing'
  [[ -f "$TMP/site.before" ]] || cp -a "$SITE" "$TMP/site.before"
  python3 - "$SITE" "$AI_SNIP" <<'PY'
from pathlib import Path
import sys
p=Path(sys.argv[1]); inc=f'    include {sys.argv[2]};\n'; s=p.read_text()
if inc.strip() not in s:
 i=s.rfind('}')
 if i<0: raise SystemExit('site server closing brace missing')
 s=s[:i]+inc+s[i:]
 p.write_text(s)
PY
  CONFIG_CHANGED=1; log 'REPAIR reinserted AI Video snippet include'
fi
if ! grep -Fq "include $CL_ASSETS;" "$SITE"; then
  log 'DRIFT Claude assets include missing'
  [[ -f "$TMP/site.before" ]] || cp -a "$SITE" "$TMP/site.before"
  python3 - "$SITE" "$CL_ASSETS" <<'PY'
from pathlib import Path
import sys
p=Path(sys.argv[1]); s=p.read_text(); needle='location = /masterclass/claude/free {'; start=s.find(needle)
if start<0: raise SystemExit('Claude route missing')
brace=s.find('{',start); depth=0; quote=None; esc=False; end=None
for i in range(brace,len(s)):
 ch=s[i]
 if esc: esc=False; continue
 if ch=='\\': esc=True; continue
 if quote:
  if ch==quote: quote=None
  continue
 if ch in ('"',"'"): quote=ch; continue
 if ch=='{': depth+=1
 elif ch=='}':
  depth-=1
  if depth==0: end=i+1; break
if end is None: raise SystemExit('Claude route malformed')
inc=f'\n    include {sys.argv[2]};'
s=s[:end]+inc+s[end:]
p.write_text(s)
PY
  CONFIG_CHANGED=1; log 'REPAIR reinserted Claude assets include'
fi

if (( CONFIG_CHANGED )); then
  if nginx -t >/dev/null 2>&1; then systemctl reload nginx; log 'REPAIR nginx validated and reloaded';
  else
    log 'CRITICAL repaired Nginx did not validate; rolling config back'
    [[ -f "$TMP/site.before" ]] && cp -a "$TMP/site.before" "$SITE"
    [[ -f "$TMP/ai-snippet.before" ]] && cp -a "$TMP/ai-snippet.before" "$AI_SNIP"
    [[ -f "$TMP/claude-assets.before" ]] && cp -a "$TMP/claude-assets.before" "$CL_ASSETS"
    nginx -t >/dev/null 2>&1 && systemctl reload nginx || true
    exit 1
  fi
fi

# 5) PM2 process availability + direct origin fingerprint.
if ! app_online "$AI_APP"; then restart_app "$AI_APP" || { log 'CRITICAL cannot restart AI app'; exit 1; }; fi
if ! app_online "$CLAUDE_APP"; then restart_app "$CLAUDE_APP" || { log 'CRITICAL cannot restart Claude origin app'; exit 1; }; fi

ai_local=$(fetch "http://127.0.0.1:$AI_PORT/masterclass/ai-video" "$TMP/ai.local")
cl_local=$(fetch "http://127.0.0.1:$CLAUDE_PORT/masterclass/claude/free" "$TMP/cl.local")
if [[ "$ai_local" != 200 || $(sha "$TMP/ai.local" 2>/dev/null || echo bad) != "$AI_UPSTREAM_SHA" ]]; then
  log "DRIFT AI origin http=$ai_local sha=$(sha "$TMP/ai.local" 2>/dev/null || echo bad)"; restart_app "$AI_APP" || true
fi
if [[ "$cl_local" != 200 || $(sha "$TMP/cl.local" 2>/dev/null || echo bad) != "$CLAUDE_UPSTREAM_SHA" ]]; then
  log "DRIFT Claude origin http=$cl_local sha=$(sha "$TMP/cl.local" 2>/dev/null || echo bad)"; restart_app "$CLAUDE_APP" || true
fi

# 6) Public page fingerprint. External/CDN failure never triggers destructive config replacement if local origins/config are healthy.
ai_code=$(fetch "$AI_URL?guard=$TS" "$TMP/ai.public")
cl_code=$(fetch "$CL_URL?guard=$TS" "$TMP/cl.public")
ai_sha=$(sha "$TMP/ai.public" 2>/dev/null || echo bad); cl_sha=$(sha "$TMP/cl.public" 2>/dev/null || echo bad)
[[ "$ai_code" == 200 && "$ai_sha" == "$AI_PUBLIC_SHA" ]] || { log "PUBLIC_MISMATCH AI http=$ai_code sha=$ai_sha want=$AI_PUBLIC_SHA"; FAIL=1; }
[[ "$cl_code" == 200 && "$cl_sha" == "$CLAUDE_PUBLIC_SHA" ]] || { log "PUBLIC_MISMATCH CLAUDE http=$cl_code sha=$cl_sha want=$CLAUDE_PUBLIC_SHA"; FAIL=1; }

# 7) Deep CSS/JS integrity every 5 minutes, or on demand. This specifically prevents the prior missing-CSS/page-JS failure class.
minute=$((10#$(date +%M)))
if (( FORCE_DEEP || minute % 5 == 0 )); then
  deep_bad=0
  while IFS=$'\t' read -r page kind url want bytes rel; do
    code=$(fetch "https://sikhadenge.in$url" "$TMP/asset")
    got=$(sha "$TMP/asset" 2>/dev/null || echo bad)
    if [[ "$code" != 200 || "$got" != "$want" ]]; then log "ASSET_MISMATCH page=$page kind=$kind http=$code url=$url got=$got want=$want"; deep_bad=$((deep_bad+1)); fi
  done < "$GOLD/assets.tsv"
  (( deep_bad == 0 )) || FAIL=1
  log "DEEP_ASSET_CHECK total=$(wc -l < "$GOLD/assets.tsv") bad=$deep_bad"
fi

if [[ ${FAIL:-0} == 0 ]]; then
  log "PASS seal=$SEALED_AT config_changed=$CONFIG_CHANGED source_changed=$SOURCE_CHANGED"
  exit 0
fi
log 'CRITICAL Golden guard could not fully restore expected public state; manual review required'
exit 1
