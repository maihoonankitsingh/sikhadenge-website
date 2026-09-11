# Registration Trust Sync V1 — 2026-09-11

## Scope

Narrow production fix for `/gen-ai-masterclass/register-one-step` reached from the Claude masterclass funnel.

The previous `registration-stable-page1-v72.js` contained two conflicting trust-cue layers:

- initial legacy strip: `3 Hours Live`, `Hinglish`, `WhatsApp Joining Link`, `Bonus Resources`
- later canonical/dynamic layer: `LIVE ACTIVITY`, `2 Hours Live`, `WhatsApp Community Access`, `5,00,000+ SikhaDenge Community`

This caused a visible content swap shortly after Page-1 mounted.

## Accepted implementation

The old immutable V72 URL was not overwritten.

A fresh immutable asset was created from the accepted V72 Page-1 file and only the four initial labels were aligned with the canonical state:

- `3 Hours Live` -> `Live Activity`
- `Hinglish` -> `2 Hours Live`
- `WhatsApp Joining Link` -> `WhatsApp Community Access`
- `Bonus Resources` -> `5,00,000+ SikhaDenge Community`

All later V72 live-activity/data logic remains intact.

Canonical asset:

- URL: `/registration-stable-page1-v72-trust-sync-v1-20260911.js?v=trust-sync-v1-20260911`
- SHA-256: `2531652c8629b975b7b7074d402e5fd48698891d40338f33881f07e3d8658211`
- Server file: `/var/www/sikhadenge.in/registration-trust-sync-v1-20260911/registration-stable-page1-v72-trust-sync-v1-20260911.js`

Previous source asset preserved:

- `/var/www/sikhadenge.in/registration-stable-v72-20260903-131023/registration-stable-page1-v72.js`
- SHA-256: `13b891266630475342cd63ca28e5336d6b137b13490d6c13c3ddff71088fe592`

The registration Nginx snippet now points its Page-1 preload/body references to the fresh immutable asset. The old immutable URL remains available for forensic rollback.

## Production verification

Final successful deployment:

- trigger commit: `5d0800e193711dd655b2e6bd165ffb8a88e1f017`
- workflow run: `34619375289`
- job: `103329232326`
- backup: `/var/backups/sikhadenge/registration-trust-sync-v1-20260911-213025`

Final Golden state:

- seal: `20260911-213138`
- Claude public SHA: `87f0dd7849d2f26b6eb1eb24a886f6faedb046bbbfd37414553761d3274d7355`
- AI Video public SHA: `b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2`
- linked assets: `52`
- protected source/config files: `63`
- lock state: `LOCKED`
- Golden guard timer: enabled + active
- repeated deep checks: `bad=0`, `config_changed=0`, `source_changed=0`

## Browser QA

Desktop 1440x1000, tablet 768x1024, and mobile 390x844 passed both before and after Golden reseal.

Every sampled frame confirmed:

- no `3 Hours Live`
- no `WhatsApp Joining Link`
- no legacy `Bonus Resources` trust cue
- `Live Activity` present from first sampled frame
- `2 Hours Live` present from first sampled frame
- `WhatsApp Community Access` present from first sampled frame
- `5,00,000+ SikhaDenge Community` present from first sampled frame
- visible Page-1 fields remain `sd-reg-name`, `sd-reg-email`, `sd-reg-phone`
- old native inputs remain suppressed
- no horizontal overflow
- no failed CSS/JS/document requests
- Claude attribution remains `claude-masterclass`
- session ID remains present
- no form/lead submission was performed during QA

Later runtime enrichment still adds the live-activity count/update text; this is expected and does not change the stable trust cues.

## First-attempt rollback note

The first controlled attempt used the same product bytes and rendered correctly, but the QA matcher treated `Live Activity` and the later `LIVE ACTIVITY` capitalization as different states. The safety workflow rejected that run and restored/resealed the previous Golden state. QA was corrected to case-insensitive semantic matching; product bytes were not changed. The final retry passed pre-lock QA, reseal/deep guard, and post-lock QA; rollback was skipped.

## Do not broaden this fix

- Do not change `/api/masterclass/lead`, CRM, payment, or form submission behavior as part of this fix.
- Do not rebuild the funnel-attribution bridge.
- Do not fix the known V72 non-AI-video attribution/classification bug unless separately authorized.
- Do not overwrite the old immutable V72 asset URL.
- Do not submit fake production leads for routine QA.

Permanent repository artifacts:

- `ops/deploy-registration-trust-sync-v1-20260911.sh`
- `ops/qa-registration-trust-sync-v1-20260911.js`
