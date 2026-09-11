# Registration Step-2 Accessibility V1 — Golden Handover (2026-09-11)

## Scope
Narrow accessibility fix for `/gen-ai-masterclass/register-one-step` Step 2 (`About You`).

The visible V31 Step-2 UI already had the approved conversion copy and layout. The legacy V72 engine remains in the DOM as the state/proxy engine, visually off-screen and `aria-hidden="true"`. Audit proved its six interactive controls still had `tabIndex=0`, which could place keyboard focus on invisible controls.

This release keeps the legacy engine enabled for programmatic clicks/state, but sets all focusable descendants of `.sd-v31-engine-hidden` to `tabIndex=-1`. It does not use `disabled` or `inert` and does not change the visible Step-2 UI.

## Proven pre-change issue
Audit commit: `3dc39cf8dfa6a3fc0995291406e71da4023e9c9d`
Audit run: `34622770868`
Audit job: `103340501763`

Before the fix, all six hidden engine buttons had `tabIndex=0` while their parent was `aria-hidden="true"`.

## Production implementation
Trigger commit: `05600d5af387e21436db8ea5ca4f075ef4d9c825`
Workflow run: `34623112937`
Job: `103341620348`

Deploy script:
- `ops/deploy-registration-step2-a11y-v1-20260911.sh`

QA:
- `ops/qa-registration-step2-a11y-v1-20260911.js`

Fresh immutable public asset:
- `/registration-stable-page1-v72-step2-a11y-v1-20260911.js?v=step2-a11y-v1-20260911`

Asset SHA-256:
- `015a19056357f974e3f8faaa6e9b6ffa8e85cf565ed9990c4f48978e96c33fc5`

Server directory:
- `/var/www/sikhadenge.in/registration-step2-a11y-v1-20260911`

Backup:
- `/var/backups/sikhadenge/registration-step2-a11y-v1-20260911-220842`

## Golden state
Golden seal:
- `20260911-220935`

Claude public SHA (unchanged):
- `87f0dd7849d2f26b6eb1eb24a886f6faedb046bbbfd37414553761d3274d7355`

AI Video public SHA (unchanged):
- `b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2`

Golden Guard after reseal:
- `LINKED_ASSETS=52`
- `PROTECTED_SOURCE_FILES=63`
- `LOCK_STATE=LOCKED`
- deep asset checks `bad=0`
- guard timer enabled + active

## Browser acceptance
Passed pre-lock and again post-lock at:
- Desktop `1440x1000`
- Tablet `768x1024`
- Mobile `390x844`

Verified on all views:
- Page-1 canonical trust cues preserved (`LIVE ACTIVITY`, `2 Hours Live`, `WhatsApp Community Access`, `5,00,000+ SikhaDenge Community`)
- legacy trust labels absent
- name/email/phone fields unchanged and required
- attribution localStorage preserved
- fresh Page-1 asset loaded exactly once; previous Trust-Sync asset not loaded
- V72 hot engine and native-suppress layers preserved
- Step-2 visible copy/options unchanged
- all legacy `.sd-v31-engine-hidden` buttons have `tabIndex=-1`, remain enabled, and stay `aria-hidden=true`
- visible Step-2 role controls remain keyboard-focusable (`tabIndex=0`)
- selecting `Student / Fresher` sets `aria-pressed=true` and enables visible Continue
- programmatic mapping through the hidden V72 engine still works
- Step-3 `Your Goal` is reached successfully
- no `/api/masterclass/lead` POST occurs during Page-1 -> Step-2 -> Step-3 QA
- no horizontal overflow
- no broken CSS/JS/document responses
- no unknown browser errors

## Explicit non-scope
No changes to:
- Claude landing page
- AI Video landing page
- Page-1 copy/design/fields
- visible Step-2 copy/design/options
- Step-3 copy/design
- `registration-stable-hot-v72.js`
- lead API / CRM
- attribution bridge
- WhatsApp community handoff
- analytics consent behavior

## Safe future changes
Use the Golden Lock workflow: locked preflight -> unlock -> exact narrow change -> browser QA -> reseal -> lock -> deep guard -> post-lock browser regression. Do not overwrite immutable public asset URLs; publish a fresh versioned URL for changed bytes.
