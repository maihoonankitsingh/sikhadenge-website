# Registration Native Suppression V1 — Golden Handover

Date: 2026-09-11 IST

## Purpose
Suppress the duplicate native registration UI on `/gen-ai-masterclass/register-one-step` while preserving the accepted V72 registration experience, attribution bridge, lead API contract, Claude funnel, and AI Video funnel.

## Accepted implementation
- Asset: `ops/assets/registration-native-suppress-v1-20260910.js`
- Asset SHA256: `c7b1e197a9636ff1a24229fd58095d8b42f62eb6f45d73a9a2518b239195d1d7`
- QA: `ops/qa-registration-native-suppress-v1-20260910.js`
- Controlled deploy: `ops/deploy-registration-native-suppress-v1-20260910.sh`
- Successful run: `34555551434`
- Successful job: `103127374168`
- Trigger commit: `e9dfe3e5736e088a08ddd6e82da06d38b7d9116a`
- Production backup: `/var/backups/sikhadenge/registration-native-suppress-v1-20260911-081128`

## Golden state
- Seal: `20260911-081255`
- Claude public SHA: `6c89ce95c27a5f56ab90bbf36d646233fae94a90c2bf7cdc6d2504900bb4871f`
- AI Video public SHA: `b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2`
- Linked assets: 52
- Protected source/config files: 63
- Golden lock: LOCKED
- Deep checks: `bad=0`, `config_changed=0`, `source_changed=0`

## Acceptance evidence
Desktop 1440x1000, tablet 768x1024 and mobile 390x844 passed before and after reseal.

Verified on each viewport:
- Final Claude CTA lands on `/gen-ai-masterclass/register-one-step`.
- UTM values and `source=claude-masterclass` are preserved.
- Suppression asset is loaded exactly once.
- V72 `#sdv2-root` remains visible and active.
- Legacy/native registration main is `display:none`, `aria-hidden=true`, inert, keyboard-inaccessible and not visible.
- Old `Register for ₹1999 FREE` action is not visible.
- V72 details, role, goal, laptop and submit flow completes.
- `/api/masterclass/lead` POST was intercepted in QA only and payload contract verified without writing a QA lead.
- Payload includes name, email, phone, experience, goal, laptop boolean and UTM attribution.
- Confirmation state and WhatsApp next-step render successfully.
- No horizontal overflow and no broken linked CSS/JS.
- Claude and AI Video public hashes remain unchanged.

## Important QA detail
V72 animated step panels can temporarily report very large negative X coordinates while still being rendered and programmatically active. Puppeteer geometric `page.click()` is therefore not a valid acceptance primitive for those transition-state controls. The accepted QA dispatches the element's DOM click after confirming it exists and is rendered; this tests the actual V72 event contract without depending on transient animation coordinates.

## Safety
Do not rebuild the registration flow or attribution bridge as part of this suppression layer. For intentional changes use the Golden Lock workflow: unlock, assert-unlocked, make the exact change, run full 3-view E2E QA, reseal, lock, deep-check, then rerun the same browser suite after lock.
