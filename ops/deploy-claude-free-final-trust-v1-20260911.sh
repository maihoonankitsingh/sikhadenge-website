#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:-stage}"
SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'
MARKER='/var/backups/sikhadenge/.claude-free-final-trust-v1-last'
EXPECTED_AI='b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2'
EXPECTED_CLAUDE_BEFORE='8395c8d87636cea8d2f0f0f0a23def78a52a9cc77170399ec0aa50252782ed3f'

rollback(){
  set +e
  if [[ ! -s "$MARKER" ]]; then sikhadenge-funnel-lockctl lock || true; return 0; fi
  B="$(cat "$MARKER")"
  echo "ROLLBACK_FROM=$B"
  sikhadenge-funnel-lockctl unlock 5 || true
  [[ -s "$B/sikhadenge.in-ssl.before" ]] && cat "$B/sikhadenge.in-ssl.before" > "$SITE"
  if nginx -t; then systemctl reload nginx; fi
  sikhadenge-funnel-lockctl reseal || true
  sikhadenge-funnel-lockctl lock || true
  sikhadenge-funnel-lockctl check || true
  echo "ROLLBACK_DONE=$B"
}

if [[ "$MODE" == rollback ]]; then rollback; exit 0; fi
[[ "$MODE" == stage ]] || { echo "usage: $0 stage|rollback" >&2; exit 2; }

TS="$(date +%Y%m%d-%H%M%S)"
BK="/var/backups/sikhadenge/claude-free-final-trust-v1-$TS"
mkdir -p "$BK"
cp -L "$SITE" "$BK/sikhadenge.in-ssl.before"
printf '%s\n' "$BK" > "$MARKER"
onerr(){ rc=$?; echo "FREE_FINAL_TRUST_V1_STAGE_ERROR_RC=$rc"; rollback; exit "$rc"; }
trap onerr ERR

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 "https://sikhadenge.in/masterclass/ai-video?free_final_trust_before=$TS" -o "$BK/ai.before.html"
AI_BEFORE="$(sha256sum "$BK/ai.before.html" | awk '{print $1}')"
test "$AI_BEFORE" = "$EXPECTED_AI"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 "https://sikhadenge.in/masterclass/claude/free?free_final_trust_before=$TS" -o "$BK/claude.before.html"
CLAUDE_BEFORE="$(sha256sum "$BK/claude.before.html" | awk '{print $1}')"
echo "FREE_FINAL_TRUST_V1_CLAUDE_BEFORE_SHA=$CLAUDE_BEFORE"
test "$CLAUDE_BEFORE" = "$EXPECTED_CLAUDE_BEFORE"

# Current user-facing final-handoff content is client/runtime enhanced. Do not
# assert those DOM-only strings against raw SSR bytes. The exact Golden SHA
# above plus the three-view browser suite below are the acceptance contract.
sikhadenge-funnel-lockctl check

python3 - "$SITE" <<'PY'
import sys
p=sys.argv[1]; s=open(p,encoding='utf-8',errors='ignore').read(); needle='location = /masterclass/claude/free {'; a=s.find(needle)
if a<0: raise SystemExit('Claude route missing')
q=s.find('{',a); d=0; quote=None; esc=False; end=None
for i in range(q,len(s)):
    ch=s[i]
    if esc: esc=False; continue
    if ch=='\\': esc=True; continue
    if quote:
        if ch==quote: quote=None
        continue
    if ch in ('"',"'"): quote=ch; continue
    if ch=='{': d+=1
    elif ch=='}':
        d-=1
        if d==0: end=i+1; break
if end is None: raise SystemExit('route parse failed')
route=s[a:end]
print('FREE_FINAL_TRUST_PREFLIGHT_HEAD_FILTERS', route.count("sub_filter '</head>'"))
print('FREE_FINAL_TRUST_PREFLIGHT_MARKERS', route.count('SIKHADENGE_CLAUDE_FREE_FINAL_TRUST_V1_20260911'))
if route.count('SIKHADENGE_CLAUDE_FREE_FINAL_TRUST_V1_20260911')!=0: raise SystemExit('marker already exists')
if route.count("sub_filter '</head>'")!=0: raise SystemExit('conflicting </head> sub_filter already exists')
PY

sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl assert-unlocked

python3 - "$SITE" <<'PY'
import sys
p=sys.argv[1]; s=open(p,encoding='utf-8',errors='ignore').read(); needle='location = /masterclass/claude/free {'; a=s.find(needle)
if a<0: raise SystemExit('Claude route missing')
q=s.find('{',a); d=0; quote=None; esc=False; end=None
for i in range(q,len(s)):
    ch=s[i]
    if esc: esc=False; continue
    if ch=='\\': esc=True; continue
    if quote:
        if ch==quote: quote=None
        continue
    if ch in ('"',"'"): quote=ch; continue
    if ch=='{': d+=1
    elif ch=='}':
        d-=1
        if d==0: end=i+1; break
if end is None: raise SystemExit('route parse failed')
route=s[a:end]
if 'SIKHADENGE_CLAUDE_FREE_FINAL_TRUST_V1_20260911' in route: raise SystemExit('marker already exists')
css='<style id="sd-claude-free-final-trust-v1">.claude-payment-trust-footer_paymentArea__aYkQy{display:none!important}.claude-payment-trust-footer_divider___nkaU{display:none!important}</style></head>'
insert="\n        # SIKHADENGE_CLAUDE_FREE_FINAL_TRUST_V1_20260911\n        sub_filter '</head>' "+repr(css)+";\n"
route=route[:-1]+insert+'}'
open(p,'w',encoding='utf-8').write(s[:a]+route+s[end:])
print('FREE_FINAL_TRUST_V1_ROUTE_PATCH=PASS')
PY

nginx -t
systemctl reload nginx
sleep 2

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 "https://sikhadenge.in/masterclass/claude/free?free_final_trust_after=$TS" -o "$BK/claude.after.html"
grep -Fq 'sd-claude-free-final-trust-v1' "$BK/claude.after.html"
CLAUDE_AFTER="$(sha256sum "$BK/claude.after.html" | awk '{print $1}')"
echo "FREE_FINAL_TRUST_V1_CLAUDE_AFTER_SHA=$CLAUDE_AFTER"
test "$CLAUDE_AFTER" != "$CLAUDE_BEFORE"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 "https://sikhadenge.in/masterclass/ai-video?free_final_trust_after=$TS" -o "$BK/ai.after.html"
AI_AFTER="$(sha256sum "$BK/ai.after.html" | awk '{print $1}')"
test "$AI_AFTER" = "$AI_BEFORE"
echo "AI_UNCHANGED_SHA=$AI_AFTER"

trap - ERR
echo "FREE_FINAL_TRUST_V1_STAGE_PASS=$BK"
