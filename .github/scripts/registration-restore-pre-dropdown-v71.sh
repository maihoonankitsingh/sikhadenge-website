#!/usr/bin/env bash
set -Eeuo pipefail

: "${SSH_HOST:?missing SSH_HOST}"
: "${SSH_USER:?missing SSH_USER}"
: "${SSH_PORT:?missing SSH_PORT}"

KEY="$HOME/.ssh/prod"

ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeuo pipefail
export TZ=Asia/Kolkata

SNIPPET="/etc/nginx/snippets/sikhadenge-registration-v2-hot.conf"
SOURCE="/var/backups/sikhadenge/mobile-laptop-dropdown-v69-20260902-190918/registration-v2-page1.js.before"
EXPECT_CURRENT_SHA="5d6d6acf9280a301fdacd54ca72f92b32cf0a1b1fa2cbcc04ad72b4d853ff7b4"
EXPECT_SOURCE_SHA="13b891266630475342cd63ca28e5336d6b137b13490d6c13c3ddff71088fe592"
EXPECT_HOT_SHA="6e6361e54b575178cf6cad115234ab3e9c5d25d666a9e89df5a11001eab9c3d0"
TS="$(date +%Y%m%d-%H%M%S)"
TAG="v71-restore-pre-dropdown-${TS}"

PAGE1="$(awk '/location = \/registration-v2-page1\.js/ {f=1} f && /alias / {gsub(";", "", $2); print $2; exit}' "$SNIPPET")"
HOT="$(awk '/location = \/registration-v2-hot\.js/ {f=1} f && /alias / {gsub(";", "", $2); print $2; exit}' "$SNIPPET")"

test -f "$PAGE1"
test -f "$HOT"
test -f "$SNIPPET"
test -f "$SOURCE"

echo '===== 1. GUARDS ====='
CURRENT_SHA="$(sha256sum "$PAGE1" | awk '{print $1}')"
SOURCE_SHA="$(sha256sum "$SOURCE" | awk '{print $1}')"
HOT_SHA="$(sha256sum "$HOT" | awk '{print $1}')"
echo "current_sha=$CURRENT_SHA"
echo "source_sha=$SOURCE_SHA"
echo "hot_sha=$HOT_SHA"
test "$CURRENT_SHA" = "$EXPECT_CURRENT_SHA"
test "$SOURCE_SHA" = "$EXPECT_SOURCE_SHA"
test "$HOT_SHA" = "$EXPECT_HOT_SHA"
grep -Fq 'SIKHADENGE_MOBILE_INLINE_NAV_V68_START' "$SOURCE"
! grep -Fq 'SIKHADENGE_MOBILE_LAPTOP_DROPDOWN_V69_START' "$SOURCE"
! grep -Fq 'SIKHADENGE_MOBILE_LAPTOP_HIDE_CARDS_V70_START' "$SOURCE"
node --check "$SOURCE" >/dev/null
echo 'guards=PASS'

echo '===== 2. FRESH BACKUP ====='
BK="/var/backups/sikhadenge/restore-pre-dropdown-v71-${TS}"
mkdir -p "$BK"
cp -a "$PAGE1" "$BK/registration-v2-page1.js.before"
cp -a "$SNIPPET" "$BK/sikhadenge-registration-v2-hot.conf.before"
sha256sum "$BK/registration-v2-page1.js.before" > "$BK/page1-before.sha256"
sha256sum "$BK/sikhadenge-registration-v2-hot.conf.before" > "$BK/snippet-before.sha256"
echo "backup=$BK"

rollback() {
  set +e
  echo 'AUTO_ROLLBACK_START'
  cp -a "$BK/registration-v2-page1.js.before" "$PAGE1"
  cp -a "$BK/sikhadenge-registration-v2-hot.conf.before" "$SNIPPET"
  nginx -t && systemctl reload nginx
  echo 'AUTO_ROLLBACK_DONE'
}
trap 'rc=$?; if [ $rc -ne 0 ]; then rollback; fi; exit $rc' EXIT

echo '===== 3. RESTORE PRE-DROPDOWN PAGE1 ====='
cat "$SOURCE" > "$PAGE1"
chmod --reference="$BK/registration-v2-page1.js.before" "$PAGE1"
chown --reference="$BK/registration-v2-page1.js.before" "$PAGE1"
node --check "$PAGE1" >/dev/null
RESTORED_SHA="$(sha256sum "$PAGE1" | awk '{print $1}')"
echo "restored_sha=$RESTORED_SHA"
test "$RESTORED_SHA" = "$EXPECT_SOURCE_SHA"

echo '===== 4. CACHE BUST ====='
export SNIPPET TAG
python3 <<'PY'
from pathlib import Path
import os,re
p=Path(os.environ['SNIPPET'])
s=p.read_text(encoding='utf-8')
replacement=f'/registration-v2-page1.js?v={os.environ["TAG"]}'
s2,n=re.subn(r'/registration-v2-page1\.js(?:\?v=[^"\x27< ]+)?', replacement, s, count=1)
if n != 1:
    raise SystemExit(f'cache-bust replacement count={n}')
p.write_text(s2,encoding='utf-8')
print('cache_bust=', replacement)
PY

grep -Fq "/registration-v2-page1.js?v=${TAG}" "$SNIPPET"
nginx -t
systemctl reload nginx
echo 'nginx_reload=PASS'

echo '===== 5. PUBLIC ASSET ====='
PUB="/tmp/registration-v2-page1-v71-${TS}.js"
curl -L --compressed -fsS "https://sikhadenge.in/registration-v2-page1.js?v=${TAG}" -o "$PUB"
node --check "$PUB" >/dev/null
PUBLIC_SHA="$(sha256sum "$PUB" | awk '{print $1}')"
echo "public_sha=$PUBLIC_SHA"
test "$PUBLIC_SHA" = "$EXPECT_SOURCE_SHA"
grep -Fq 'SIKHADENGE_MOBILE_INLINE_NAV_V68_START' "$PUB"
! grep -Fq 'SIKHADENGE_MOBILE_LAPTOP_DROPDOWN_V69_START' "$PUB"
! grep -Fq 'SIKHADENGE_MOBILE_LAPTOP_HIDE_CARDS_V70_START' "$PUB"

echo '===== 6. BOTH FUNNELS ====='
for u in \
  "https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=claude-masterclass&v71=${TS}" \
  "https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass&v71=${TS}"
do
  code="$(curl -L --compressed -sS -o /dev/null -w '%{http_code}' "$u")"
  echo "$code $u"
  test "$code" = '200'
done

echo '===== 7. HOT/BACKEND PRESERVATION ====='
HOT_AFTER="$(sha256sum "$HOT" | awk '{print $1}')"
echo "hot_after_sha=$HOT_AFTER"
test "$HOT_AFTER" = "$EXPECT_HOT_SHA"

echo 'RESULT=PRE_DROPDOWN_V68_STATE_RESTORED'
echo "BACKUP=$BK"
echo "TAG=$TAG"
trap - EXIT
REMOTE
