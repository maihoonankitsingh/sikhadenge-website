#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:-stage}"
SITE_SNIP='/etc/nginx/snippets/sikhadenge-registration-v2-hot.conf'
SRC='/var/www/sikhadenge.in/registration-trust-sync-v1-20260911/registration-stable-page1-v72-trust-sync-v1-20260911.js'
NEW_DIR='/var/www/sikhadenge.in/registration-step2-a11y-v1-20260911'
NEW_FILE="$NEW_DIR/registration-stable-page1-v72-step2-a11y-v1-20260911.js"
OLD_PATH='/registration-stable-page1-v72-trust-sync-v1-20260911.js'
OLD_REF='/registration-stable-page1-v72-trust-sync-v1-20260911.js?v=trust-sync-v1-20260911'
NEW_PATH='/registration-stable-page1-v72-step2-a11y-v1-20260911.js'
NEW_REF='/registration-stable-page1-v72-step2-a11y-v1-20260911.js?v=step2-a11y-v1-20260911'
EXPECTED_SRC_SHA='2531652c8629b975b7b7074d402e5fd48698891d40338f33881f07e3d8658211'
EXPECTED_CLAUDE='87f0dd7849d2f26b6eb1eb24a886f6faedb046bbbfd37414553761d3274d7355'
EXPECTED_AI='b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2'
STATE='/tmp/sikhadenge-registration-step2-a11y-v1.state'

status_value(){ sikhadenge-funnel-lockctl status | awk -F= -v k="$1" '$1==k{print $2;exit}'; }
sha(){ sha256sum "$1" | awk '{print $1}'; }

rollback(){
  [[ -f "$STATE" ]] || { echo 'ROLLBACK_STATE_MISSING'; sikhadenge-funnel-lockctl lock || true; return 1; }
  # shellcheck disable=SC1090
  source "$STATE"
  echo "ROLLBACK_FROM=$BACKUP"
  sikhadenge-funnel-lockctl unlock 5 || true
  cp -a "$BACKUP/nginx.before" "$SITE_SNIP"
  rm -rf "$NEW_DIR"
  nginx -t
  systemctl reload nginx
  sikhadenge-funnel-lockctl reseal
  sikhadenge-funnel-lockctl lock
  sikhadenge-funnel-lockctl check
  /usr/local/sbin/sikhadenge-funnel-golden-guard --deep
  test "$(status_value LOCK_STATE)" = LOCKED
  test "$(status_value CLAUDE_PUBLIC_SHA)" = "$EXPECTED_CLAUDE"
  test "$(status_value AI_PUBLIC_SHA)" = "$EXPECTED_AI"
  echo REGISTRATION_STEP2_A11Y_V1_ROLLBACK_PASS
}

if [[ "$MODE" == rollback ]]; then rollback; exit 0; fi
[[ "$MODE" == stage ]] || { echo "Unknown mode: $MODE"; exit 2; }

# Locked, healthy, exact accepted baseline only.
sikhadenge-funnel-lockctl check
/usr/local/sbin/sikhadenge-funnel-golden-guard --deep
test "$(status_value LOCK_STATE)" = LOCKED
test "$(status_value CLAUDE_PUBLIC_SHA)" = "$EXPECTED_CLAUDE"
test "$(status_value AI_PUBLIC_SHA)" = "$EXPECTED_AI"
test -f "$SRC"
test "$(sha "$SRC")" = "$EXPECTED_SRC_SHA"

python3 - "$SITE_SNIP" "$OLD_REF" "$NEW_REF" "$NEW_PATH" <<'PY'
import sys
p,old,new,newpath=sys.argv[1:]
s=open(p,encoding='utf-8').read()
print('PREFLIGHT_STEP2_A11Y_REF_COUNTS',s.count(old),s.count(new),s.count('location = '+newpath+' {'))
if s.count(old)!=2 or s.count(new)!=0 or ('location = '+newpath+' {') in s:
    raise SystemExit('unexpected registration asset reference state')
PY

TS="$(date +%Y%m%d-%H%M%S)"
BACKUP="/var/backups/sikhadenge/registration-step2-a11y-v1-$TS"
mkdir -p "$BACKUP"
cp -a "$SITE_SNIP" "$BACKUP/nginx.before"
printf 'BACKUP=%q\n' "$BACKUP" > "$STATE"
printf 'BASE_CLAUDE=%q\n' "$EXPECTED_CLAUDE" >> "$STATE"
printf 'BASE_AI=%q\n' "$EXPECTED_AI" >> "$STATE"
echo "REG_STEP2_A11Y_BACKUP=$BACKUP"

sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl assert-unlocked

mkdir -p "$NEW_DIR"
cp -a "$SRC" "$NEW_FILE"
cat >> "$NEW_FILE" <<'JS'

/* SIKHADENGE_REGISTRATION_STEP2_A11Y_V1_START */
;(() => {
  'use strict';
  const ROOT_ID = 'sdv2-root';
  const HIDDEN = '.sd-v31-engine-hidden';
  const FOCUSABLE = 'button,a[href],input,select,textarea,[tabindex]';

  const sanitize = (root) => {
    if (!root) return;
    root.querySelectorAll(HIDDEN).forEach((container) => {
      container.setAttribute('aria-hidden', 'true');
      container.querySelectorAll(FOCUSABLE).forEach((el) => {
        if (el.getAttribute('tabindex') !== '-1') el.setAttribute('tabindex', '-1');
      });
    });
  };

  const init = () => {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    sanitize(root);
    const observer = new MutationObserver(() => sanitize(root));
    observer.observe(root, { childList: true, subtree: true });
    window.__SD_REG_STEP2_A11Y_V1__ = true;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
/* SIKHADENGE_REGISTRATION_STEP2_A11Y_V1_END */
JS
chmod 0644 "$NEW_FILE"
NEW_SHA="$(sha "$NEW_FILE")"
echo "REGISTRATION_STEP2_A11Y_V1_NEW_SHA=$NEW_SHA"
test "$NEW_SHA" != "$EXPECTED_SRC_SHA"
grep -Fq 'SIKHADENGE_REGISTRATION_STEP2_A11Y_V1_START' "$NEW_FILE"

# Clone only the exact current Page-1 asset location and swap the two current refs.
python3 - "$SITE_SNIP" "$OLD_PATH" "$OLD_REF" "$NEW_PATH" "$NEW_REF" "$SRC" "$NEW_FILE" <<'PY'
import sys
p,oldpath,oldref,newpath,newref,src,newfile=sys.argv[1:]
s=open(p,encoding='utf-8').read()
needle=f'location = {oldpath} {{'
a=s.find(needle)
if a<0: raise SystemExit('current Page-1 asset location missing')
q=s.find('{',a); d=0; quote=None; esc=False; end=None
for i in range(q,len(s)):
    ch=s[i]
    if esc: esc=False; continue
    if ch=='\\': esc=True; continue
    if quote:
        if ch==quote: quote=None
        continue
    if ch in ('"',"'"): quote=ch; continue
    if ch=='{': d+=1
    elif ch=='}':
        d-=1
        if d==0: end=i+1; break
if end is None: raise SystemExit('current Page-1 location parse failed')
block=s[a:end]
if block.count(src)!=1: raise SystemExit('current asset alias not unique in location')
newblock=block.replace(oldpath,newpath,1).replace(src,newfile,1)
if s.count(oldref)!=2: raise SystemExit('current injected ref count not 2')
s=s[:end]+'\n\n'+newblock+s[end:]
s=s.replace(oldref,newref)
if s.count(newref)!=2 or s.count(oldref)!=0 or s.count(f'location = {newpath} {{')!=1:
    raise SystemExit('new registration asset reference verification failed')
open(p,'w',encoding='utf-8').write(s)
print('REGISTRATION_STEP2_A11Y_V1_NGINX_PATCH=PASS')
PY

nginx -t
systemctl reload nginx
sleep 1

TMP="$(mktemp)"
curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 "https://sikhadenge.in${NEW_REF}" -o "$TMP"
PUB_SHA="$(sha "$TMP")"
echo "REGISTRATION_STEP2_A11Y_V1_PUBLIC_SHA=$PUB_SHA"
test "$PUB_SHA" = "$NEW_SHA"
grep -Fq 'SIKHADENGE_REGISTRATION_STEP2_A11Y_V1_START' "$TMP"
rm -f "$TMP"

HTML="$(curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 'https://sikhadenge.in/gen-ai-masterclass/register-one-step?step2_a11y_stage=1')"
[[ "$HTML" == *"$NEW_REF"* ]]
[[ "$HTML" != *"$OLD_REF"* ]]

# Funnel pages must remain byte-identical.
CLAUDE_NOW="$(curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 'https://sikhadenge.in/masterclass/claude/free' | sha256sum | awk '{print $1}')"
AI_NOW="$(curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 'https://sikhadenge.in/masterclass/ai-video' | sha256sum | awk '{print $1}')"
echo "CLAUDE_UNCHANGED_SHA=$CLAUDE_NOW"
echo "AI_UNCHANGED_SHA=$AI_NOW"
test "$CLAUDE_NOW" = "$EXPECTED_CLAUDE"
test "$AI_NOW" = "$EXPECTED_AI"

echo REGISTRATION_STEP2_A11Y_V1_STAGE_PASS
