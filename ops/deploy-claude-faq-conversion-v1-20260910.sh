#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:-stage}"
SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'
ASSETS='/etc/nginx/snippets/sikhadenge-claude-31aug6pm-assets-final.conf'
CWD='/var/www/sikhadenge.in/releases/production-ai-video-icons-hotfix-20260829-091916'
OLD_URL='/claude-faq-v2.js?v=faq15-final2-20260904'
NEW_FILE="$CWD/claude-faq-conversion-v1-20260910.js"
NEW_PATH='/claude-faq-conversion-v1-20260910.js'
NEW_URL='/claude-faq-conversion-v1-20260910.js?v=faq-conversion-v1-20260910'
MARKER='/var/backups/sikhadenge/.claude-faq-conversion-v1-last'
EXPECTED_AI='b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2'
EXPECTED_CLAUDE='e5e74f1a2e20c13752d290bb4025c9b1daa303cf0377d963c68a121dfe794535'
EXPECTED_OLD_FAQ_SHA='a1f7945edb9d8115d28fb29888236178dd33d7b22d7967d7caf0fbbccc271a88'

rollback() {
  set +e
  if [[ ! -s "$MARKER" ]]; then
    sikhadenge-funnel-lockctl lock || true
    return 0
  fi
  B="$(cat "$MARKER")"
  echo "ROLLBACK_FROM=$B"
  sikhadenge-funnel-lockctl unlock 5 || true
  [[ -s "$B/sikhadenge.in-ssl.before" ]] && cat "$B/sikhadenge.in-ssl.before" > "$SITE"
  [[ -s "$B/claude-assets.before" ]] && cat "$B/claude-assets.before" > "$ASSETS"
  if [[ -f "$B/new-faq.before" ]]; then cp -a "$B/new-faq.before" "$NEW_FILE"; else rm -f "$NEW_FILE"; fi
  if nginx -t; then systemctl reload nginx; fi
  sikhadenge-funnel-lockctl reseal || true
  sikhadenge-funnel-lockctl lock || true
  sikhadenge-funnel-lockctl check || true
  echo "ROLLBACK_DONE=$B"
}

if [[ "$MODE" == rollback ]]; then rollback; exit 0; fi
[[ "$MODE" == stage ]] || { echo "usage: $0 stage|rollback" >&2; exit 2; }

TS="$(date +%Y%m%d-%H%M%S)"
BK="/var/backups/sikhadenge/claude-faq-conversion-v1-$TS"
mkdir -p "$BK"
cp -L "$SITE" "$BK/sikhadenge.in-ssl.before"
cp -L "$ASSETS" "$BK/claude-assets.before"
[[ -f "$NEW_FILE" ]] && cp -a "$NEW_FILE" "$BK/new-faq.before" || true
printf '%s\n' "$BK" > "$MARKER"
onerr(){ rc=$?; echo "FAQ_CONVERSION_V1_STAGE_ERROR_RC=$rc"; rollback; exit "$rc"; }
trap onerr ERR

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/ai-video?faq_v1_before=$TS" -o "$BK/ai.before.html"
AI_BEFORE="$(sha256sum "$BK/ai.before.html"|awk '{print $1}')"
test "$AI_BEFORE" = "$EXPECTED_AI"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/claude/free?faq_v1_before=$TS" -o "$BK/claude.before.html"
CLAUDE_BEFORE="$(sha256sum "$BK/claude.before.html"|awk '{print $1}')"
echo "FAQ_V1_CLAUDE_BEFORE_SHA=$CLAUDE_BEFORE"
test "$CLAUDE_BEFORE" = "$EXPECTED_CLAUDE"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in${OLD_URL}" -o "$BK/faq-v2.public.js"
OLD_FAQ_SHA="$(sha256sum "$BK/faq-v2.public.js"|awk '{print $1}')"
echo "FAQ_V1_OLD_SCRIPT_SHA=$OLD_FAQ_SHA"
test "$OLD_FAQ_SHA" = "$EXPECTED_OLD_FAQ_SHA"

sikhadenge-funnel-lockctl check
python3 - "$SITE" "$OLD_URL" "$NEW_URL" <<'PY'
import sys
p,old,new=sys.argv[1:]
s=open(p,encoding='utf-8',errors='ignore').read(); needle='location = /masterclass/claude/free {'; a=s.find(needle)
if a<0: raise SystemExit('Claude exact route missing')
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
if end is None: raise SystemExit('Claude route parse failed')
route=s[a:end]
print('FAQ_V1_OLD_URL_COUNT',route.count(old),'NEW_URL_COUNT',route.count(new))
if route.count(old)!=1 or route.count(new)!=0: raise SystemExit('unexpected FAQ script mapping state')
PY

sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl assert-unlocked

cp -a "$BK/faq-v2.public.js" "$NEW_FILE"
python3 - "$NEW_FILE" <<'PY'
import json,sys
p=sys.argv[1]
s=open(p,encoding='utf-8').read()
flag='  window.__CLAUDE_FAQ_V2__ = true;'
if s.count(flag)!=1: raise SystemExit('FAQ v2 sentinel not found exactly once')
s=s.replace(flag,flag+'\n  window.__CLAUDE_FAQ_CONVERSION_V1__ = true;',1)
start=s.find('  const faqs = [')
if start<0: raise SystemExit('FAQ array start missing')
end=s.find('\n  ];',start)
if end<0: raise SystemExit('FAQ array end missing')
end+=len('\n  ];')
faqs=[
  {'q':'Is this AI tools masterclass really free?','a':'Yes. The current live masterclass registration on this page is free. Use any “Get My Free Seat” button to continue to the existing SikhaDenge registration flow.'},
  {'q':'Do I need coding experience?','a':'No. Coding experience is not required. The masterclass is designed for non-technical and first-time AI learners, with practical workflows explained step by step.'},
  {'q':'Which language is used?','a':'The live session is taught in easy Hinglish, with practical steps explained clearly so beginners and working professionals can follow along.'},
  {'q':'Do I need Claude Pro or other paid AI subscriptions?','a':'No. A paid AI subscription is not required to follow the masterclass. Some tools may offer optional paid plans, but the session is structured around workflows you can understand and start with accessible options.'},
  {'q':'Where will I get the joining details?','a':'After registration, continue through SikhaDenge’s existing confirmation and WhatsApp joining flow. Follow the instructions shown after you submit the registration form.'},
  {'q':'Is SikhaDenge affiliated with Anthropic?','a':'No. SikhaDenge is an independent learning platform and is not affiliated with or endorsed by Anthropic. Tool and brand names are used for educational reference.'},
  {'q':'Who is this masterclass for?','a':'It is designed for students, freshers, job seekers, career switchers, freelancers, creators, business owners and working professionals who want practical AI workflows for real work.'},
  {'q':'Is this a live session?','a':'Yes. This page is for the current live online masterclass. The session includes guided teaching, practical workflow demos and live Q&A.'},
  {'q':'Is the session practical or only theory?','a':'The focus is practical application. You will see step-by-step workflows for research, writing, content, productivity, analysis and other everyday digital tasks rather than theory-only teaching.'},
  {'q':'What will I learn in this masterclass?','a':'You will learn how to choose the right AI tool for a task, write better prompts, research and summarize information, create content and presentations, analyze work, and build repeatable productivity workflows.'},
  {'q':'Is this masterclass only about Claude?','a':'No. Claude is a core part of the experience, but this is a broader AI tools masterclass covering a multi-tool workflow with ChatGPT, Gemini, Codex, Perplexity and other tools shown on this page.'},
  {'q':'Why learn multiple AI tools instead of just one?','a':'Different tools are stronger for different tasks. The masterclass shows how to match the task to the right AI tool or workflow instead of depending on a single platform.'},
  {'q':'What bonus resources are included with the free seat?','a':'The page currently includes a Free AI Masterclass Bonus Kit with three practical take-home resources designed to help you apply the workflows after the live session.'},
  {'q':'What if I’m completely new to AI?','a':'That is fine. The learning flow starts from practical basics, uses easy Hinglish and requires no programming background, so first-time learners can follow step by step.'},
  {'q':'How do I reserve my free seat?','a':'Click any “Get My Free Seat” or registration button on this page and complete the SikhaDenge registration flow. Then follow the confirmation and joining instructions shown there.'},
]
block='  const faqs = '+json.dumps(faqs,ensure_ascii=False,indent=2)+';'
s=s[:start]+block+s[end:]
open(p,'w',encoding='utf-8').write(s)
print('FAQ_CONVERSION_V1_SCRIPT_PATCH=PASS',len(faqs))
PY
node --check "$NEW_FILE"
NEW_SHA="$(sha256sum "$NEW_FILE"|awk '{print $1}')"
echo "FAQ_CONVERSION_V1_NEW_SCRIPT_SHA=$NEW_SHA"

if grep -Fq 'SIKHADENGE_CLAUDE_FAQ_CONVERSION_V1_ASSET_20260910' "$ASSETS"; then
  echo 'FAQ Conversion V1 asset marker already exists' >&2; exit 41
fi
cat >> "$ASSETS" <<EOF

# SIKHADENGE_CLAUDE_FAQ_CONVERSION_V1_ASSET_20260910
location = $NEW_PATH {
    alias $NEW_FILE;
    default_type application/javascript;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    add_header X-SD-Claude-Asset "faq-conversion-v1-20260910" always;
}
EOF

python3 - "$SITE" "$OLD_URL" "$NEW_URL" <<'PY'
import sys
p,old,new=sys.argv[1:]
s=open(p,encoding='utf-8',errors='ignore').read(); needle='location = /masterclass/claude/free {'; a=s.find(needle)
if a<0: raise SystemExit('Claude exact route missing')
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
if end is None: raise SystemExit('Claude route parse failed')
route=s[a:end]
if route.count(old)!=1 or route.count(new)!=0: raise SystemExit('unexpected FAQ route state before patch')
route=route.replace(old,new,1)
route=route.replace('\n}', '\n    # SIKHADENGE_CLAUDE_FAQ_CONVERSION_V1_20260910\n}',1)
open(p,'w',encoding='utf-8').write(s[:a]+route+s[end:])
print('FAQ_CONVERSION_V1_ROUTE_PATCH=PASS')
PY

nginx -t
systemctl reload nginx
sleep 2

code="$(curl -L -sS --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 -o "$BK/faq-v1.public.js" -w '%{http_code}' "https://sikhadenge.in${NEW_URL}")"
test "$code" = 200
test "$(sha256sum "$BK/faq-v1.public.js"|awk '{print $1}')" = "$NEW_SHA"
echo "FAQ_CONVERSION_V1_CANONICAL_HTTP=$code"
echo "FAQ_CONVERSION_V1_CANONICAL_SHA=$NEW_SHA"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/claude/free?faq_v1_after=$TS" -o "$BK/claude.after.html"
python3 - "$BK/claude.after.html" "$OLD_URL" "$NEW_URL" <<'PY'
import sys
p,old,new=sys.argv[1:]
raw=open(p,encoding='utf-8',errors='ignore').read()
if new not in raw: raise SystemExit('new FAQ script URL missing from public HTML')
if old in raw: raise SystemExit('old FAQ script URL still present in public HTML')
for x in ['/funnel-attribution-bridge-v1.js?v=20260903-1','/claude-testimonials-conversion-v1b-20260910.js','/claude-bonus-value-v1-20260910.js','audience-v1b-closing-v1-20260910.js']:
    if x not in raw: raise SystemExit('preserved script missing '+x)
print('FAQ_CONVERSION_V1_SERVER_HTML_CHECK=PASS')
PY

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/ai-video?faq_v1_after=$TS" -o "$BK/ai.after.html"
AI_AFTER="$(sha256sum "$BK/ai.after.html"|awk '{print $1}')"
test "$AI_AFTER" = "$AI_BEFORE"
echo "AI_UNCHANGED_SHA=$AI_AFTER"

trap - ERR
echo "FAQ_CONVERSION_V1_STAGE_PASS=$BK"
