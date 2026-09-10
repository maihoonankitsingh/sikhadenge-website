#!/usr/bin/env bash
set -Eeuo pipefail

SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'
ASSET='/var/www/sikhadenge.in/claude-heading-v11-restore-current.js'
OLDQ='/claude-heading-v11-restore-current.js?v=old-v11-current-20260903b'
NEWQ='/claude-heading-v11-restore-current.js?v=hero-v12-20260910'
MARKER='SIKHADENGE_CLAUDE_HERO_V12'
TS="$(date +%Y%m%d-%H%M%S)"
BK="/var/backups/sikhadenge/claude-hero-v12-$TS"
STATE='/var/backups/sikhadenge/.claude-hero-v12-last'
MUTATED=0
mkdir -p "$BK"

rollback() {
  rc=$?
  trap - ERR
  if [[ "$MUTATED" = 1 ]]; then
    echo "ROLLBACK_START rc=$rc backup=$BK"
    sikhadenge-funnel-lockctl unlock 10 >/dev/null 2>&1 || true
    [[ -s "$BK/sikhadenge.in-ssl.before" ]] && cat "$BK/sikhadenge.in-ssl.before" > "$SITE"
    if [[ -s "$BK/claude-heading.before.js" ]]; then cat "$BK/claude-heading.before.js" > "$ASSET"; fi
    nginx -t && systemctl reload nginx || true
    sleep 2
    sikhadenge-funnel-lockctl reseal >/dev/null 2>&1 || true
    sikhadenge-funnel-lockctl lock >/dev/null 2>&1 || true
    sikhadenge-funnel-golden-guard --deep >/dev/null 2>&1 || true
    echo "ROLLBACK_DONE backup=$BK"
  else
    sikhadenge-funnel-lockctl lock >/dev/null 2>&1 || true
  fi
  exit "$rc"
}
trap rollback ERR

# Start from the currently approved sealed state.
sikhadenge-funnel-lockctl lock
sikhadenge-funnel-lockctl check
sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl assert-unlocked

test -s "$SITE"
test -s "$ASSET"

# Strict preconditions: exactly the expected pre-v12 state.
if grep -Fq "$MARKER" "$ASSET"; then
  echo 'REFUSE: Claude Hero v12 marker already exists; do not double-apply.' >&2
  exit 72
fi

python3 - "$SITE" "$OLDQ" <<'PY'
import sys
p,q=sys.argv[1:]
s=open(p,encoding='utf-8').read()
needle='location = /masterclass/claude/free {'
a=s.find(needle)
if a<0: raise SystemExit('Claude exact route missing')
b=s.find('{',a); depth=0; end=None
for i in range(b,len(s)):
    if s[i]=='{': depth+=1
    elif s[i]=='}':
        depth-=1
        if depth==0:
            end=i+1
            break
if end is None: raise SystemExit('Claude route parse failed')
seg=s[a:end]
count=seg.count(q)
print('CLAUDE_OLD_QUERY_COUNT=',count)
if count != 1: raise SystemExit(f'refuse: expected exactly one old heading query, got {count}')
PY

cp -L "$SITE" "$BK/sikhadenge.in-ssl.before"
cp -L "$ASSET" "$BK/claude-heading.before.js"
printf '%s\n' "$ASSET" > "$BK/asset.path"
printf '%s\n' "$BK" > "$STATE"

cat >> "$ASSET" <<'JS'

/* SIKHADENGE_CLAUDE_HERO_V12 — exact Claude Hero H1 message-match only */
(() => {
  "use strict";
  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__SIKHADENGE_CLAUDE_HERO_V12__) return;
  window.__SIKHADENGE_CLAUDE_HERO_V12__ = true;

  const EXPECT = "Master Claude + 25+ AI Tools to Work Smarter, Create Faster & Get Better Results.";
  const HTML = "Master <mark>Claude + 25+ AI Tools</mark> to Work Smarter,<br>Create Faster &amp; Get Better Results.";

  function applyHero() {
    const h1 = document.querySelector("h1.claude-masterclass-live_heroHeadline__3oLU3") ||
      document.querySelector("main h1") || document.querySelector("h1");
    if (!h1) return false;
    const current = String(h1.textContent || "").replace(/\s+/g, " ").trim();
    if (current !== EXPECT || h1.getAttribute("data-sd-claude-hero") !== "v12") {
      h1.innerHTML = HTML;
      h1.setAttribute("data-sd-claude-hero", "v12");
    }
    return true;
  }

  let raf = 0;
  const observer = new MutationObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(applyHero);
  });

  function boot() {
    applyHero();
    observer.observe(document.documentElement, { childList: true, subtree: true });
    [120, 350, 800, 1500, 2600, 4200].forEach((ms) => setTimeout(applyHero, ms));
    setTimeout(() => observer.disconnect(), 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
JS
MUTATED=1

python3 - "$SITE" "$OLDQ" "$NEWQ" <<'PY'
import sys
p,oldq,newq=sys.argv[1:]
s=open(p,encoding='utf-8').read()
needle='location = /masterclass/claude/free {'
a=s.find(needle)
if a<0: raise SystemExit('Claude exact route missing')
b=s.find('{',a); depth=0; end=None
for i in range(b,len(s)):
    if s[i]=='{': depth+=1
    elif s[i]=='}':
        depth-=1
        if depth==0:
            end=i+1
            break
if end is None: raise SystemExit('Claude route parse failed')
seg=s[a:end]
if seg.count(oldq) != 1: raise SystemExit('old heading query count changed during deploy')
seg=seg.replace(oldq,newq,1)
open(p,'w',encoding='utf-8').write(s[:a]+seg+s[end:])
PY

nginx -t
systemctl reload nginx
sleep 2

grep -Fq "$MARKER" "$ASSET"
curl -fsSL --max-time 30 'https://sikhadenge.in/claude-heading-v11-restore-current.js?v=hero-v12-20260910' | grep -Fq "$MARKER"
curl -fsSL --max-time 30 'https://sikhadenge.in/masterclass/claude/free?hero_v12_server=1' > "$BK/claude.after.html"
grep -Fq "$NEWQ" "$BK/claude.after.html"
grep -Fq '/gen-ai-masterclass/register-one-step' "$BK/claude.after.html"
grep -Fq '/funnel-attribution-bridge-v1.js?v=20260903-1' "$BK/claude.after.html"

curl -fsSL --max-time 30 'https://sikhadenge.in/masterclass/ai-video?hero_v12_control=1' > "$BK/ai.after.html"
grep -Fq 'Create cinematic AI videos' "$BK/ai.after.html"
for u in '/_next/static/css/0dc2b316d6c10c6c.css' '/_next/static/chunks/pages/masterclass/ai-video-e4484da06cac6162.js'; do
  code="$(curl -L -sS --max-time 20 -o /dev/null -w '%{http_code}' "https://sikhadenge.in$u")"
  test "$code" = 200
  echo "AI_CONTROL_ASSET=$code $u"
done

echo "CLAUDE_HERO_V12_SERVER_STAGE=PASS BACKUP=$BK"
trap - ERR
