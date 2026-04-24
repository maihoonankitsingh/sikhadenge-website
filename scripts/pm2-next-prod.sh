#!/usr/bin/env bash
set -euo pipefail
cd /var/www/sikhadenge.space/sikhadenge-website
export NODE_ENV=production
export PORT=3000
exec node node_modules/next/dist/bin/next start -H 127.0.0.1 -p 3000
