#!/usr/bin/env bash
set -Eeuo pipefail

STATE='/var/backups/sikhadenge/.claude-hero-v12-last'
SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'

test -s "$STATE"
BK="$(cat "$STATE")"
test -d "$BK"
test -s "$BK/sikhadenge.in-ssl.before"
test -s "$BK/claude-heading.before.js"
test -s "$BK/asset.path"
ASSET="$(cat "$BK/asset.path")"
test -n "$ASSET"

sikhadenge-funnel-lockctl unlock 10 >/dev/null 2>&1 || true
cat "$BK/sikhadenge.in-ssl.before" > "$SITE"
cat "$BK/claude-heading.before.js" > "$ASSET"
nginx -t
systemctl reload nginx
sleep 2

# Restore the previous approved state as the Golden state.
sikhadenge-funnel-lockctl reseal
sikhadenge-funnel-lockctl lock
sikhadenge-funnel-lockctl check
sikhadenge-funnel-golden-guard --deep

echo "CLAUDE_HERO_V12_ROLLBACK=PASS BACKUP=$BK"
