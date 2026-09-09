#!/usr/bin/env bash
set -Eeuo pipefail

SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'
AI_SNIP='/etc/nginx/snippets/sikhadenge-ai-video-3940.conf'
CLAUDE_ASSETS='/etc/nginx/snippets/sikhadenge-claude-31aug6pm-assets-final.conf'
CLAUDE_SRC='/var/backups/sikhadenge/claude-before-best-restore-20260831-234122/free.html.current'
CLAUDE_SHA='559f4b3deb2111f5bcb36ba9518481b1e72c462ea6707135a597ba4953303078'
CLAUDE_LIVE_DIR='/var/www/sikhadenge.in/rollback-live'
CLAUDE_LIVE="$CLAUDE_LIVE_DIR/claude-31aug-6pm-best-$CLAUDE_SHA.html"
TS="$(date +%Y%m%d-%H%M%S)"
BK="/var/backups/sikhadenge/last-best-live-$TS"

mkdir -p "$BK" "$CLAUDE_LIVE_DIR"
chmod 0755 "$CLAUDE_LIVE_DIR"

# Fresh production safety point before any mutation.
cp -L "$SITE" "$BK/sikhadenge.in-ssl.before"
cp -L "$AI_SNIP" "$BK/sikhadenge-ai-video-3940.conf.before"
cp -L "$CLAUDE_ASSETS" "$BK/sikhadenge-claude-31aug6pm-assets-final.conf.before"
curl -fsSL --max-time 30 'https://sikhadenge.in/masterclass/ai-video?pre_restore=1' -o "$BK/ai-video.before.html"
curl -fsSL --max-time 30 'https://sikhadenge.in/masterclass/claude/free?pre_restore=1' -o "$BK/claude.before.html"
printf '%s\n' "$BK" > "$BK/BACKUP_PATH.txt"

rollback() {
  rc=$?
  echo "RESTORE_FAILED rc=$rc -- restoring nginx config"
  cat "$BK/sikhadenge.in-ssl.before" > "$SITE"
  nginx -t
  systemctl reload nginx
  exit "$rc"
}
trap rollback ERR

# AI Video: the audited last-best state is the current golden/final 3940 release.
# Do not regress it to the older 3930/Aug-30 build; verify and leave it untouched.
echo '=== VERIFY AI VIDEO GOLDEN ==='
grep -q 'proxy_pass http://127.0.0.1:3940;' "$AI_SNIP"
curl -fsSL --max-time 25 http://127.0.0.1:3940/masterclass/ai-video -o "$BK/ai-3940.direct.html"
grep -qi 'Create cinematic AI videos' "$BK/ai-3940.direct.html"
grep -qi 'Six blocks' "$BK/ai-3940.direct.html"
grep -qi 'Understand the tools' "$BK/ai-3940.direct.html"

# Claude: exact audited historical 31-Aug ~6PM state.
echo '=== VERIFY CLAUDE BEST SNAPSHOT ==='
test -s "$CLAUDE_SRC"
ACTUAL_SHA="$(sha256sum "$CLAUDE_SRC" | awk '{print $1}')"
test "$ACTUAL_SHA" = "$CLAUDE_SHA"
install -m 0644 "$CLAUDE_SRC" "$CLAUDE_LIVE"
test "$(sha256sum "$CLAUDE_LIVE" | awk '{print $1}')" = "$CLAUDE_SHA"

# Verify every same-origin JS/CSS/link dependency referenced by the saved HTML
# is reachable before switching the public route.
python3 - "$CLAUDE_SRC" > "$BK/claude-assets.txt" <<'PY'
import re, sys
s = open(sys.argv[1], encoding='utf-8', errors='ignore').read()
urls = []
for pat in (r'<script[^>]+src=["\']([^"\']+)', r'<link[^>]+href=["\']([^"\']+)'):
    urls.extend(re.findall(pat, s, re.I))
for u in dict.fromkeys(urls):
    if u.startswith('/') and not u.startswith('//'):
        print(u)
PY

while IFS= read -r u; do
  code="$(curl -L -sS --max-time 20 -o /dev/null -w '%{http_code}' "https://sikhadenge.in${u}" || true)"
  case "$code" in
    200|204|301|302|304) ;;
    *) echo "BAD_CLAUDE_ASSET http=$code url=$u"; exit 1 ;;
  esac
done < "$BK/claude-assets.txt"

# Replace only the exact Claude page location. All APIs, forms, tracking endpoints,
# historical static-asset locations, and the AI Video route remain untouched.
python3 - "$SITE" "$CLAUDE_LIVE" <<'PY'
import re, sys
p, html = sys.argv[1], sys.argv[2]
s = open(p, encoding='utf-8').read()
pat = r'(?ms)^\s*location = /masterclass/claude/free \{.*?^\s*\}'
repl = f'''    location = /masterclass/claude/free {{
        alias {html};
        default_type text/html;
        charset utf-8;
        add_header Cache-Control "private, no-store, no-cache, must-revalidate, max-age=0" always;
        add_header X-SD-Claude-Snapshot "31aug-2026-6pm-best" always;
        sub_filter_once on;
        sub_filter '</head>' '<script src="/funnel-attribution-bridge-v1.js?v=20260903-1"></script></head>';
    }}'''
out, n = re.subn(pat, repl, s, count=1)
if n != 1:
    raise SystemExit(f'expected 1 Claude route, replaced {n}')
open(p, 'w', encoding='utf-8').write(out)
PY

nginx -t
systemctl reload nginx
sleep 2

echo '=== PUBLIC POST-RESTORE QA ==='
AI_CODE="$(curl -L -sS --max-time 30 -o "$BK/ai-video.after.html" -w '%{http_code}' "https://sikhadenge.in/masterclass/ai-video?restore=$TS")"
CL_CODE="$(curl -L -sS --max-time 30 -D "$BK/claude.after.headers" -o "$BK/claude.after.html" -w '%{http_code}' "https://sikhadenge.in/masterclass/claude/free?restore=$TS")"
test "$AI_CODE" = '200'
test "$CL_CODE" = '200'
grep -qi 'Create cinematic AI videos' "$BK/ai-video.after.html"
grep -qi 'Six blocks' "$BK/ai-video.after.html"
grep -qi 'Master 25+ AI Tools' "$BK/claude.after.html"
grep -qi 'X-SD-Claude-Snapshot: 31aug-2026-6pm-best' "$BK/claude.after.headers"

# Public Claude response intentionally has only the invisible attribution bridge
# injected into the exact historical HTML; verify historical build fingerprint.
grep -q 'free-802d96fd8696db68-v315r-20260830-204006-v316-20260830-204806.js' "$BK/claude.after.html"
grep -q 'sikhadenge-hero-multitool-v241.css' "$BK/claude.after.html"

# Confirm AI production routing was not changed by the Claude UI restore.
grep -q 'proxy_pass http://127.0.0.1:3940;' "$AI_SNIP"

echo '=== RESTORE COMPLETE ==='
echo 'AI_VIDEO=production-ai-video-golden-faq-final-20260904-130510 via 3940'
echo "CLAUDE=31aug-2026-6pm-best source_sha256=$CLAUDE_SHA"
echo "ROLLBACK_BACKUP=$BK"
echo "AI_HTTP=$AI_CODE CLAUDE_HTTP=$CL_CODE"
trap - ERR
