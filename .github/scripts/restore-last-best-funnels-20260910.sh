#!/usr/bin/env bash
set -Eeuo pipefail

SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'
AI_SNIP='/etc/nginx/snippets/sikhadenge-ai-video-3940.conf'
CLAUDE_ASSETS='/etc/nginx/snippets/sikhadenge-claude-31aug6pm-assets-final.conf'
CLAUDE_SRC='/var/backups/sikhadenge/claude-before-best-restore-20260831-234122/free.html.current'
CLAUDE_SHA='559f4b3deb2111f5bcb36ba9518481b1e72c462ea6707135a597ba4953303078'
HIST_RELEASE='/var/www/sikhadenge.in/releases/production-ai-video-icons-hotfix-20260829-091916'
CLAUDE_LIVE_DIR='/var/www/sikhadenge.in/rollback-live'
CLAUDE_LIVE="$CLAUDE_LIVE_DIR/claude-31aug-6pm-best-$CLAUDE_SHA.html"
RECOVER_DIR="$CLAUDE_LIVE_DIR/claude-assets-$CLAUDE_SHA"
TS="$(date +%Y%m%d-%H%M%S)"
BK="/var/backups/sikhadenge/last-best-live-$TS"

mkdir -p "$BK" "$CLAUDE_LIVE_DIR" "$RECOVER_DIR"
chmod 0755 "$CLAUDE_LIVE_DIR" "$RECOVER_DIR"

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
  cat "$BK/sikhadenge-claude-31aug6pm-assets-final.conf.before" > "$CLAUDE_ASSETS"
  nginx -t
  systemctl reload nginx
  exit "$rc"
}
trap rollback ERR

# AI Video: audited last-best is the golden/final release on 3940.
# Verify it and deliberately leave the route/code untouched.
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

mime_for() {
  case "$1" in
    *.css) echo 'text/css' ;;
    *.js) echo 'application/javascript' ;;
    *.svg) echo 'image/svg+xml' ;;
    *.png) echo 'image/png' ;;
    *.webp) echo 'image/webp' ;;
    *.jpg|*.jpeg) echo 'image/jpeg' ;;
    *.woff2) echo 'font/woff2' ;;
    *.woff) echo 'font/woff' ;;
    *.ttf) echo 'font/ttf' ;;
    *.ico) echo 'image/x-icon' ;;
    *) echo 'application/octet-stream' ;;
  esac
}

recover_asset() {
  local u="$1" path base cand='' dst mime
  path="${u%%\?*}"
  base="${path##*/}"
  test -n "$base"

  if [ -d "$HIST_RELEASE" ]; then
    cand="$(find "$HIST_RELEASE" -type f -name "$base" -print -quit 2>/dev/null || true)"
  fi
  if [ -z "$cand" ]; then
    cand="$(find /var/www/sikhadenge.in/releases -type f -name "$base" -print -quit 2>/dev/null || true)"
  fi
  if [ -z "$cand" ]; then
    cand="$(find /var/backups/sikhadenge -type f -name "$base" -print -quit 2>/dev/null || true)"
  fi
  if [ -z "$cand" ]; then
    echo "UNRECOVERABLE_CLAUDE_ASSET url=$u basename=$base"
    return 1
  fi

  dst="$RECOVER_DIR/$base"
  install -m 0644 "$cand" "$dst"
  mime="$(mime_for "$base")"
  echo "RECOVER_CLAUDE_ASSET url=$path source=$cand"

  if grep -Fq "location = $path {" "$CLAUDE_ASSETS"; then
    return 0
  fi
  if nginx -T 2>/dev/null | grep -Fq "location = $path {"; then
    echo "EXACT_ROUTE_ALREADY_EXISTS_BUT_ASSET_FAILED url=$path"
    return 1
  fi

  cat >> "$CLAUDE_ASSETS" <<EOF

# AUTO_RECOVERED_CLAUDE_31AUG_ASSET $path
location = $path {
    alias $dst;
    default_type $mime;
    add_header Cache-Control "public, max-age=3600";
    add_header X-SD-Claude-Asset "31aug-6pm-recovered" always;
}
EOF
}

# First pass: recover any historical dependencies no longer exposed by today's Nginx.
echo '=== VERIFY/RECOVER CLAUDE DEPENDENCIES ==='
recovered=0
while IFS= read -r u; do
  code="$(curl -L -sS --max-time 20 -o /dev/null -w '%{http_code}' "https://sikhadenge.in${u}" || true)"
  case "$code" in
    200|204|301|302|304) ;;
    *)
      echo "MISSING_CLAUDE_ASSET http=$code url=$u"
      recover_asset "$u"
      recovered=1
      ;;
  esac
done < "$BK/claude-assets.txt"

if [ "$recovered" = '1' ]; then
  nginx -t
  systemctl reload nginx
  sleep 2
fi

# Second pass must be clean before the page route is switched.
while IFS= read -r u; do
  code="$(curl -L -sS --max-time 20 -o /dev/null -w '%{http_code}' "https://sikhadenge.in${u}" || true)"
  case "$code" in
    200|204|301|302|304) ;;
    *) echo "BAD_CLAUDE_ASSET_AFTER_RECOVERY http=$code url=$u"; exit 1 ;;
  esac
done < "$BK/claude-assets.txt"

# Replace ONLY the exact Claude page location. APIs/forms and AI Video are untouched.
# Keep the invisible attribution bridge, but omit later UI overlays so the visual state
# is the exact historical best snapshot.
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
grep -q 'free-802d96fd8696db68-v315r-20260830-204006-v316-20260830-204806.js' "$BK/claude.after.html"
grep -q 'sikhadenge-hero-multitool-v241.css' "$BK/claude.after.html"
grep -q 'funnel-attribution-bridge-v1.js' "$BK/claude.after.html"
grep -q 'proxy_pass http://127.0.0.1:3940;' "$AI_SNIP"

# Final asset pass after route cutover.
while IFS= read -r u; do
  code="$(curl -L -sS --max-time 20 -o /dev/null -w '%{http_code}' "https://sikhadenge.in${u}" || true)"
  case "$code" in
    200|204|301|302|304) ;;
    *) echo "POST_RESTORE_BAD_ASSET http=$code url=$u"; exit 1 ;;
  esac
done < "$BK/claude-assets.txt"

echo '=== RESTORE COMPLETE ==='
echo 'AI_VIDEO=production-ai-video-golden-faq-final-20260904-130510 via 3940'
echo "CLAUDE=31aug-2026-6pm-best source_sha256=$CLAUDE_SHA"
echo "RECOVERED_ASSETS=$recovered"
echo "ROLLBACK_BACKUP=$BK"
echo "AI_HTTP=$AI_CODE CLAUDE_HTTP=$CL_CODE"
trap - ERR
