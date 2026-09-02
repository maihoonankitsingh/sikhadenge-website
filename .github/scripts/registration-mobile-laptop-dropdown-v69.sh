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
MARKER="SIKHADENGE_MOBILE_LAPTOP_DROPDOWN_V69_START"
EXPECT_PAGE1_SHA="13b891266630475342cd63ca28e5336d6b137b13490d6c13c3ddff71088fe592"
EXPECT_HOT_SHA="6e6361e54b575178cf6cad115234ab3e9c5d25d666a9e89df5a11001eab9c3d0"
TS="$(date +%Y%m%d-%H%M%S)"
TAG="v69-mobile-laptop-dropdown-${TS}"

PAGE1="$(awk '/location = \/registration-v2-page1\.js/ {f=1} f && /alias / {gsub(";", "", $2); print $2; exit}' "$SNIPPET")"
HOT="$(awk '/location = \/registration-v2-hot\.js/ {f=1} f && /alias / {gsub(";", "", $2); print $2; exit}' "$SNIPPET")"

test -f "$PAGE1"; test -f "$HOT"; test -f "$SNIPPET"

echo '===== 1. PRE-PATCH GUARDS ====='
PAGE1_SHA_BEFORE="$(sha256sum "$PAGE1" | awk '{print $1}')"
HOT_SHA_BEFORE="$(sha256sum "$HOT" | awk '{print $1}')"
echo "page1_before_sha=$PAGE1_SHA_BEFORE"
echo "hot_before_sha=$HOT_SHA_BEFORE"
test "$PAGE1_SHA_BEFORE" = "$EXPECT_PAGE1_SHA"
test "$HOT_SHA_BEFORE" = "$EXPECT_HOT_SHA"
grep -Fq 'SIKHADENGE_MOBILE_INLINE_NAV_V68_START' "$PAGE1"
grep -Fq 'sd-laptop-grid-v46' "$PAGE1"
grep -Fq 'Yes, I have one' "$PAGE1"
grep -Fq 'I will arrange one' "$PAGE1"
if grep -Fq "$MARKER" "$PAGE1"; then
  echo 'V69 already installed; refusing duplicate append.'
  exit 1
fi
echo 'guards=PASS'

echo '===== 2. FRESH ROLLBACK BACKUP ====='
BK="/var/backups/sikhadenge/mobile-laptop-dropdown-v69-${TS}"
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

echo '===== 3. APPEND MOBILE-ONLY V69 ====='
cat >> "$PAGE1" <<'JAVASCRIPT'

/* =========================================================
   SIKHADENGE_MOBILE_LAPTOP_DROPDOWN_V69_START
   Scope: phone only (<=767px)
   Existing laptop cards + original click/value logic are preserved.
   Desktop/tablet remains unchanged.
   ========================================================= */
;(() => {
  'use strict';

  const KEY = '__SD_MOBILE_LAPTOP_DROPDOWN_V69__';
  if (window[KEY]) return;
  window[KEY] = true;

  const MQ = window.matchMedia('(max-width: 767px)');
  const GRID_ID = 'sd-laptop-grid-v46';
  const WRAP_ID = 'sd-mobile-laptop-dropdown-v69';
  const SELECT_ID = 'sd-mobile-laptop-select-v69';
  const STYLE_ID = 'sd-mobile-laptop-dropdown-v69-style';
  const LABELS = ['Yes, I have one', 'I will arrange one'];

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${WRAP_ID} { display: none; }
      @media (max-width: 767px) {
        #${GRID_ID}.sd-mobile-laptop-grid-hidden-v69 { display: none !important; }
        #${WRAP_ID} {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        #${SELECT_ID} {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          height: 48px !important;
          min-height: 48px !important;
          box-sizing: border-box !important;
          margin: 0 !important;
          padding: 0 14px !important;
          font: inherit !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          line-height: normal !important;
          outline: none !important;
          cursor: pointer !important;
          -webkit-text-size-adjust: 100%;
        }
        #${SELECT_ID}:focus-visible {
          outline: 2px solid currentColor !important;
          outline-offset: 2px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  let raf = 0;

  function clean(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function cardText(card) {
    return clean(card?.innerText || card?.textContent || '');
  }

  function findCards(grid) {
    if (!grid) return [];
    const direct = Array.from(grid.children || []);
    const cards = [];

    for (const label of LABELS) {
      let card = direct.find((node) => cardText(node).includes(label));
      if (!card) {
        const leaf = Array.from(grid.querySelectorAll('*'))
          .find((node) => cardText(node) === label);
        card = leaf?.closest('.sd-v46-laptop-card, button, label, [role="button"]') || null;
      }
      if (card) cards.push(card);
    }

    return [...new Set(cards)];
  }

  function isSelected(card) {
    if (!card) return false;
    if (card.matches('[aria-checked="true"], [aria-selected="true"], [data-selected="true"], [data-state="checked"]')) return true;
    if (card.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked, [aria-checked="true"], [aria-selected="true"], [data-selected="true"], [data-state="checked"]')) return true;
    return Array.from(card.classList || []).some((name) => /(^|[-_])(selected|active|checked)([-_]|$)/i.test(name));
  }

  function triggerOriginalCard(card) {
    if (!card) return;
    const input = card.querySelector('input[type="radio"], input[type="checkbox"]');
    if (input && !input.checked) {
      input.click();
      return;
    }
    const clickable = card.matches('button, label, [role="button"]')
      ? card
      : card.querySelector('button, label, [role="button"]');
    (clickable || card).click();
  }

  function removeMobileDropdown() {
    const grid = document.getElementById(GRID_ID);
    grid?.classList.remove('sd-mobile-laptop-grid-hidden-v69');
    document.getElementById(WRAP_ID)?.remove();
  }

  function apply() {
    if (!MQ.matches) {
      removeMobileDropdown();
      return;
    }

    const grid = document.getElementById(GRID_ID);
    if (!grid || !grid.isConnected) return;

    const cards = findCards(grid);
    if (cards.length !== 2) return;

    let wrap = document.getElementById(WRAP_ID);
    let select = document.getElementById(SELECT_ID);

    if (!wrap || !select || wrap.parentElement !== grid.parentElement) {
      wrap?.remove();
      wrap = document.createElement('div');
      wrap.id = WRAP_ID;

      select = document.createElement('select');
      select.id = SELECT_ID;
      select.setAttribute('aria-label', 'Laptop or desktop access');

      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Select an option';
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);

      LABELS.forEach((label) => {
        const option = document.createElement('option');
        option.value = label;
        option.textContent = label;
        select.appendChild(option);
      });

      const sample = window.getComputedStyle(cards[0]);
      const borderColor = sample.borderTopColor && sample.borderTopColor !== 'rgba(0, 0, 0, 0)'
        ? sample.borderTopColor : '#e7e5e4';
      const bg = sample.backgroundColor && sample.backgroundColor !== 'rgba(0, 0, 0, 0)'
        ? sample.backgroundColor : '#ffffff';
      const radius = parseFloat(sample.borderTopLeftRadius) > 0
        ? sample.borderTopLeftRadius : '14px';

      select.style.setProperty('border', `1px solid ${borderColor}`, 'important');
      select.style.setProperty('border-radius', radius, 'important');
      select.style.setProperty('background-color', bg, 'important');
      select.style.setProperty('color', sample.color || '#111827', 'important');
      select.style.setProperty('font-family', sample.fontFamily || 'inherit', 'important');
      select.style.setProperty('box-shadow', 'none', 'important');

      select.addEventListener('change', () => {
        const value = select.value;
        const latestCards = findCards(document.getElementById(GRID_ID));
        const index = LABELS.indexOf(value);
        if (index < 0 || !latestCards[index]) return;
        triggerOriginalCard(latestCards[index]);
        setTimeout(() => {
          const current = document.getElementById(SELECT_ID);
          if (current) current.value = value;
        }, 0);
      });

      wrap.appendChild(select);
      grid.parentElement.insertBefore(wrap, grid);
    }

    grid.classList.add('sd-mobile-laptop-grid-hidden-v69');
    const selectedIndex = cards.findIndex(isSelected);
    if (selectedIndex >= 0 && select) select.value = LABELS[selectedIndex];
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
  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (typeof MQ.addEventListener === 'function') MQ.addEventListener('change', schedule);
  else MQ.addListener(schedule);

  window.addEventListener('resize', schedule, { passive: true });
})();
/* SIKHADENGE_MOBILE_LAPTOP_DROPDOWN_V69_END */
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
PUB="/tmp/registration-v2-page1-v69-${TS}.js"
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
  "https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=claude-masterclass&v69=${TS}" \
  "https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass&v69=${TS}"; do
  code="$(curl -L --compressed -sS -o /dev/null -w '%{http_code}' "$u")"
  echo "$code $u"
  test "$code" = '200'
done

echo '===== 7. HOT/BACKEND PRESERVATION ====='
HOT_SHA_AFTER="$(sha256sum "$HOT" | awk '{print $1}')"
echo "hot_after_sha=$HOT_SHA_AFTER"
test "$HOT_SHA_AFTER" = "$EXPECT_HOT_SHA"

echo 'RESULT=MOBILE_LAPTOP_DROPDOWN_V69_LIVE'
echo "BACKUP=$BK"
echo "TAG=$TAG"
trap - EXIT
REMOTE
