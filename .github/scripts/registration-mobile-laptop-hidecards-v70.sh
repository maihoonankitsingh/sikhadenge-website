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
MARKER="SIKHADENGE_MOBILE_LAPTOP_HIDE_CARDS_V70_START"
EXPECT_PAGE1_SHA="baebec9333818c2613a44d41127d1615cee651c82185a74a1f235939c7ce6fb4"
EXPECT_HOT_SHA="6e6361e54b575178cf6cad115234ab3e9c5d25d666a9e89df5a11001eab9c3d0"
TS="$(date +%Y%m%d-%H%M%S)"
TAG="v70-mobile-laptop-hidecards-${TS}"

PAGE1="$(awk '/location = \/registration-v2-page1\.js/ {f=1} f && /alias / {gsub(";", "", $2); print $2; exit}' "$SNIPPET")"
HOT="$(awk '/location = \/registration-v2-hot\.js/ {f=1} f && /alias / {gsub(";", "", $2); print $2; exit}' "$SNIPPET")"

test -f "$PAGE1"
test -f "$HOT"
test -f "$SNIPPET"

echo '===== 1. GUARDS ====='
PAGE1_SHA_BEFORE="$(sha256sum "$PAGE1" | awk '{print $1}')"
HOT_SHA_BEFORE="$(sha256sum "$HOT" | awk '{print $1}')"
echo "page1_before_sha=$PAGE1_SHA_BEFORE"
echo "hot_before_sha=$HOT_SHA_BEFORE"
test "$PAGE1_SHA_BEFORE" = "$EXPECT_PAGE1_SHA"
test "$HOT_SHA_BEFORE" = "$EXPECT_HOT_SHA"
grep -Fq 'SIKHADENGE_MOBILE_INLINE_NAV_V68_START' "$PAGE1"
grep -Fq 'SIKHADENGE_MOBILE_LAPTOP_DROPDOWN_V69_START' "$PAGE1"
grep -Fq 'sd-laptop-grid-v46' "$PAGE1"
if grep -Fq "$MARKER" "$PAGE1"; then
  echo 'V70 already installed; refusing duplicate append.'
  exit 1
fi
echo 'guards=PASS'

echo '===== 2. BACKUP ====='
BK="/var/backups/sikhadenge/mobile-laptop-hidecards-v70-${TS}"
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

echo '===== 3. APPEND V70 ====='
cat >> "$PAGE1" <<'JAVASCRIPT'

/* =========================================================
   SIKHADENGE_MOBILE_LAPTOP_HIDE_CARDS_V70_START
   Scope: phone only (<=767px)
   Fix only: hide original laptop cards when V69 dropdown is present.
   Desktop/tablet remains unchanged.
   ========================================================= */
;(() => {
  'use strict';

  const KEY = '__SD_MOBILE_LAPTOP_HIDE_CARDS_V70__';
  if (window[KEY]) return;
  window[KEY] = true;

  const MQ = window.matchMedia('(max-width: 767px)');
  const GRID_SELECTOR = '#sd-laptop-grid-v46';
  const DROPDOWN_ID = 'sd-mobile-laptop-dropdown-v69';
  const originals = new WeakMap();
  let raf = 0;

  function remember(grid) {
    if (originals.has(grid)) return;
    originals.set(grid, {
      displayValue: grid.style.getPropertyValue('display'),
      displayPriority: grid.style.getPropertyPriority('display'),
      ariaHidden: grid.getAttribute('aria-hidden')
    });
  }

  function hideGrid(grid) {
    remember(grid);

    if (grid.style.getPropertyValue('display') !== 'none' ||
        grid.style.getPropertyPriority('display') !== 'important') {
      grid.style.setProperty('display', 'none', 'important');
    }

    if (grid.getAttribute('aria-hidden') !== 'true') {
      grid.setAttribute('aria-hidden', 'true');
    }
  }

  function restoreGrid(grid) {
    const original = originals.get(grid);
    if (!original) return;

    if (original.displayValue) {
      grid.style.setProperty(
        'display',
        original.displayValue,
        original.displayPriority || ''
      );
    } else {
      grid.style.removeProperty('display');
    }

    if (original.ariaHidden === null) {
      grid.removeAttribute('aria-hidden');
    } else {
      grid.setAttribute('aria-hidden', original.ariaHidden);
    }
  }

  function apply() {
    const grids = Array.from(document.querySelectorAll(GRID_SELECTOR));
    if (!grids.length) return;

    if (MQ.matches) {
      const dropdown = document.getElementById(DROPDOWN_ID);
      if (!dropdown) return;
      grids.forEach(hideGrid);
      return;
    }

    grids.forEach(restoreGrid);
  }

  function schedule() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      apply();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  } else {
    schedule();
  }

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class', 'aria-hidden']
  });

  if (typeof MQ.addEventListener === 'function') {
    MQ.addEventListener('change', schedule);
  } else {
    MQ.addListener(schedule);
  }

  window.addEventListener('resize', schedule, { passive: true });
})();
/* =========================================================
   SIKHADENGE_MOBILE_LAPTOP_HIDE_CARDS_V70_END
   ========================================================= */
JAVASCRIPT

node --check "$PAGE1"
grep -Fq "$MARKER" "$PAGE1"
echo 'page1_syntax_and_marker=PASS'

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
print('cache_bust=',replacement)
PY

grep -Fq "/registration-v2-page1.js?v=${TAG}" "$SNIPPET"
nginx -t
systemctl reload nginx
echo 'nginx_reload=PASS'

echo '===== 5. PUBLIC ASSET ====='
PUB="/tmp/registration-v2-page1-v70-${TS}.js"
curl -L --compressed -fsS "https://sikhadenge.in/registration-v2-page1.js?v=${TAG}" -o "$PUB"
node --check "$PUB"
grep -Fq "$MARKER" "$PUB"
PAGE1_SHA_AFTER="$(sha256sum "$PAGE1" | awk '{print $1}')"
PUBLIC_SHA="$(sha256sum "$PUB" | awk '{print $1}')"
echo "page1_after_sha=$PAGE1_SHA_AFTER"
echo "public_sha=$PUBLIC_SHA"
test "$PUBLIC_SHA" = "$PAGE1_SHA_AFTER"

echo '===== 6. BOTH FUNNELS ====='
for u in \
  "https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=claude-masterclass&v70=${TS}" \
  "https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass&v70=${TS}"
do
  code="$(curl -L --compressed -sS -o /dev/null -w '%{http_code}' "$u")"
  echo "$code $u"
  test "$code" = '200'
done

echo '===== 7. HOT/BACKEND PRESERVATION ====='
HOT_SHA_AFTER="$(sha256sum "$HOT" | awk '{print $1}')"
echo "hot_after_sha=$HOT_SHA_AFTER"
test "$HOT_SHA_AFTER" = "$EXPECT_HOT_SHA"

echo 'RESULT=MOBILE_LAPTOP_HIDE_CARDS_V70_LIVE'
echo "BACKUP=$BK"
echo "TAG=$TAG"
trap - EXIT
REMOTE
