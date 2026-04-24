#!/usr/bin/env bash
set -euo pipefail

cd /var/www/sikhadenge.space/sikhadenge-website-space

npx prisma generate
rm -rf .next
npm run build
pm2 restart sikhadenge-in
pm2 save

echo "OK: redeploy done"
