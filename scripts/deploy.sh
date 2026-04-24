#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/sikhadenge.space/sikhadenge-website"
cd "$APP_DIR"

echo "== git fetch/pull =="
git fetch --all --prune
git pull --ff-only

echo "== install deps (safe) =="
npm ci --silent

echo "== build =="
rm -rf .next
npm run build --silent

echo "== restart pm2 =="
pm2 restart sikhadenge-web --update-env

echo "== done =="
pm2 status | sed -n '1,12p'
