#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:-stage}"
SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'
ASSETS='/etc/nginx/snippets/sikhadenge-claude-31aug6pm-assets-final.conf'
ROOT='/var/www/sikhadenge.in'
CWD='/var/www/sikhadenge.in/releases/production-ai-video-icons-hotfix-20260829-091916'
CURRENT_CHUNK="$CWD/.next/static/chunks/pages/masterclass/claude/free-802d96fd8696db68-v315r-20260830-204006-v316-20260830-204806-hero-v1-trust-v1-outcomes-v1-agenda-v1-20260910.js"
OLD_PROOF="$ROOT/claude-proof-static-v4.js"
NEW_PROOF="$ROOT/claude-proof-static-v5.js"
OLD_PROOF_URL='/claude-proof-static-v4.js?v=claude-proof-static-v4-20260902'
NEW_PROOF_URL='/claude-proof-static-v5.js?v=job-impact-evidence-v1-20260910'
MARKER='/var/backups/sikhadenge/.claude-job-impact-v1-last'

rollback() {
  set +e
  [[ -s "$MARKER" ]] || { sikhadenge-funnel-lockctl lock || true; return 0; }
  B="$(cat "$MARKER")"
  echo "ROLLBACK_FROM=$B"
  sikhadenge-funnel-lockctl unlock 5 || true
  [[ -s "$B/sikhadenge.in-ssl.before" ]] && cat "$B/sikhadenge.in-ssl.before" > "$SITE"
  [[ -s "$B/claude-assets.before" ]] && cat "$B/claude-assets.before" > "$ASSETS"
  if [[ -f "$B/new-proof.before" ]]; then cp -a "$B/new-proof.before" "$NEW_PROOF"; else rm -f "$NEW_PROOF"; fi
  nginx -t && systemctl reload nginx
  sikhadenge-funnel-lockctl reseal || true
  sikhadenge-funnel-lockctl lock || true
  echo "ROLLBACK_DONE=$B"
}

if [[ "$MODE" == rollback ]]; then rollback; exit 0; fi
[[ "$MODE" == stage ]] || { echo "usage: $0 stage|rollback" >&2; exit 2; }

TS="$(date +%Y%m%d-%H%M%S)"
BK="/var/backups/sikhadenge/claude-job-impact-v1-$TS"
mkdir -p "$BK"
cp -L "$SITE" "$BK/sikhadenge.in-ssl.before"
cp -L "$ASSETS" "$BK/claude-assets.before"
[[ -f "$NEW_PROOF" ]] && cp -a "$NEW_PROOF" "$BK/new-proof.before" || true
printf '%s\n' "$BK" > "$MARKER"
onerr(){ rc=$?; echo "STAGE_ERROR_RC=$rc"; rollback; exit "$rc"; }
trap onerr ERR

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 'https://sikhadenge.in/masterclass/ai-video?jobimpact_before=1' -o "$BK/ai.before.html"
AI_BEFORE="$(sha256sum "$BK/ai.before.html"|awk '{print $1}')"

sikhadenge-funnel-lockctl check
test "$(sha256sum "$CURRENT_CHUNK"|awk '{print $1}')" = 'ad12771c1d5d9b23d995afbf7d019a2b8c4b9710fb6527fab586d5e3f827719a'
test "$(sha256sum "$OLD_PROOF"|awk '{print $1}')" = '3ae0c4874f675c443f0607f85b0ef37d802625e7bbde3a92873be4a77d193a82'
sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl assert-unlocked

# Keep the current Agenda V1 page chunk byte-identical. The legacy AI-shift
# section remains hidden by claude-proof-hide-old-v2. Only the visible proof
# layer is versioned from v4 to v5.
cp -a "$OLD_PROOF" "$NEW_PROOF"
python3 - "$NEW_PROOF" <<'PY'
import sys,re
p=sys.argv[1]; s=open(p,encoding='utf-8').read()
jobs='''  const jobs = [
    {
      brand: "ILO",
      brandClass: "compact",
      stat: "1 in 4",
      title: "workers are in occupations with some GenAI exposure",
      copy: "ILO's 2025 global index says exposure is widespread, but transformation of work is more likely than wholesale job replacement.",
      source: "ILO · Generative AI and Jobs · 2025",
    },
    {
      brand: "WORLD ECONOMIC FORUM",
      brandClass: "stacked",
      stat: "+78M",
      title: "net jobs projected globally by 2030",
      copy: "WEF projects 170M roles created and 92M displaced by 2030 as technology and other macrotrends reshape the labour market.",
      source: "WEF · Future of Jobs Report 2025",
    },
    {
      brand: "LinkedIn",
      brandClass: "compact",
      stat: "70%",
      title: "of skills used in most jobs are expected to change by 2030",
      copy: "LinkedIn's Work Change Report identifies AI as a major catalyst behind rapidly changing skill requirements.",
      source: "LinkedIn · Work Change Report 2025",
    },
  ];'''
skills='''  const skills = [
    {
      brand: "pwc",
      brandClass: "compact",
      stat: "+69%",
      title: "growth in jobs requiring specific AI skills",
      copy: "PwC's 2026 analysis reports 69% growth for jobs requiring specific AI skills, compared with 9% growth across the overall jobs market.",
      source: "PwC · Global AI Jobs Barometer 2026",
    },
    {
      brand: "pwc",
      brandClass: "compact",
      stat: "2×+",
      title: "faster skill change in the most AI-exposed jobs",
      copy: "PwC reports skills needed in the most AI-exposed jobs are changing more than twice as fast as in the least exposed roles.",
      source: "PwC · Global AI Jobs Barometer 2026",
    },
    {
      brand: "WORLD ECONOMIC FORUM",
      brandClass: "stacked",
      stat: "AI + Big Data",
      title: "among the fastest-growing skills through 2030",
      copy: "WEF says technology skills are rising in importance alongside human skills such as creative thinking, resilience and collaboration.",
      source: "WEF · Future of Jobs Report 2025",
    },
  ];'''
pat=r'  const jobs = \[.*?\n  \];\n\n  const skills = \[.*?\n  \];'
out,n=re.subn(pat,jobs+'\n\n'+skills,s,count=1,flags=re.S)
print('PROOF_ARRAY_REPLACE_COUNT',n)
if n != 1: raise SystemExit('proof arrays pattern mismatch')
out=out.replace('window.__CLAUDE_PROOF_STATIC_V4__','window.__CLAUDE_PROOF_STATIC_V5__')
open(p,'w',encoding='utf-8').write(out)
print('JOB_IMPACT_PROOF_PATCH=PASS')
PY
node --check "$NEW_PROOF"
PROOF_SHA="$(sha256sum "$NEW_PROOF"|awk '{print $1}')"
echo "NEW_PROOF_SHA=$PROOF_SHA"

if ! grep -Fq 'SIKHADENGE_CLAUDE_JOB_IMPACT_V1_PROOF_20260910' "$ASSETS"; then
cat >> "$ASSETS" <<EOF

# SIKHADENGE_CLAUDE_JOB_IMPACT_V1_PROOF_20260910
location = /claude-proof-static-v5.js {
    alias $NEW_PROOF;
    default_type application/javascript;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    add_header X-SD-Claude-Asset "proof-v5-20260910" always;
}
EOF
fi

python3 - "$SITE" "$OLD_PROOF_URL" "$NEW_PROOF_URL" <<'PY'
import sys
p,oldproof,newproof=sys.argv[1:]
s=open(p,encoding='utf-8').read(); needle='location = /masterclass/claude/free {'; a=s.find(needle)
if a < 0: raise SystemExit('Claude route missing')
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
if route.count(oldproof) != 1: raise SystemExit(f'old proof URL count={route.count(oldproof)}')
if newproof in route: raise SystemExit('new proof URL unexpectedly already present')
route=route.replace(oldproof,newproof,1)
open(p,'w',encoding='utf-8').write(s[:a]+route+s[end:])
print('JOB_IMPACT_ROUTE_PATCH=PASS')
PY

nginx -t
systemctl reload nginx
sleep 2

code="$(curl -L -sS --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 -o "$BK/proof.public.js" -w '%{http_code}' "https://sikhadenge.in${NEW_PROOF_URL}&first=$TS")"
test "$code" = 200; echo "NEW_PROOF_HTTP=$code"
test "$(sha256sum "$BK/proof.public.js"|awk '{print $1}')" = "$PROOF_SHA"
grep -Fq 'stat: "1 in 4"' "$BK/proof.public.js"
grep -Fq 'Global AI Jobs Barometer 2026' "$BK/proof.public.js"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 "https://sikhadenge.in/masterclass/claude/free?jobimpact_server=$TS" -o "$BK/claude.after.html"
grep -Fq "$NEW_PROOF_URL" "$BK/claude.after.html"
grep -Fq 'Master <mark>Claude + 25+ AI Tools</mark>' "$BK/claude.after.html"
grep -Fq '<strong>150,000+ Learners</strong>' "$BK/claude.after.html"
grep -Fq '>What you can <span class="sd-heading-highlight">do with AI</span></h2>' "$BK/claude.after.html"
grep -Fq 'LIVE MASTERCLASS AGENDA' "$BK/claude.after.html"
grep -Fq 'Why AI-skilled professionals are ' "$BK/claude.after.html"
grep -Fq 'hero-v1-trust-v1-outcomes-v1-agenda-v1-20260910.js' "$BK/claude.after.html"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 'https://sikhadenge.in/masterclass/ai-video?jobimpact_after=1' -o "$BK/ai.after.html"
test "$AI_BEFORE" = "$(sha256sum "$BK/ai.after.html"|awk '{print $1}')"
echo "AI_UNCHANGED_SHA=$AI_BEFORE"
trap - ERR
echo "JOB_IMPACT_STAGE_PASS=$BK"
