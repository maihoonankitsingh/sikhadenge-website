# Claude Closing Conversion V1 — Golden Handover — 2026-09-10

## Scope

Only the closing conversion band on `/masterclass/claude/free` was changed. The H2, CTA component, CTA destination, attribution/tracking, Bonus V1, Testimonials V1B, prior funnel sections, registration flow, and AI Video funnel were preserved.

## Accepted copy

H2 remains exactly:

`Learn AI. Apply it. Work smarter.`

Closing paragraph is now exactly:

`Join the free live masterclass and learn a repeatable AI workflow for research, content, productivity and everyday work — in easy Hinglish, with no coding required.`

The primary CTA remains the existing conversion-layer output and routes to `/gen-ai-masterclass/register-one-step`.

## Implementation

The closing paragraph is owned by the Claude Next page chunk. Closing V1 was implemented by publishing a fresh immutable chunk instead of overwriting the prior Audience V1B immutable asset. The exact upstream SSR encoding of the old paragraph used `today&#x27;s`; one narrow Claude-route `sub_filter` changes only that first-paint paragraph, while the new immutable page chunk carries the same copy through hydration.

Accepted immutable chunk filename:

`free-802d96fd8696db68-v315r-20260830-204006-v316-20260830-204806-hero-v1-trust-v1-outcomes-v1-agenda-v1-audience-v1b-closing-v1-20260910.js`

Accepted immutable chunk SHA-256:

`59664d0c769afb5f1425beb15ea7f19008e0a12d1334c86cea58ca87a5c76f48`

## Golden state

- `SEALED_AT=20260910-215907`
- `CLAUDE_PUBLIC_SHA=e5e74f1a2e20c13752d290bb4025c9b1daa303cf0377d963c68a121dfe794535`
- `AI_PUBLIC_SHA=b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2`
- `LINKED_ASSETS=51`
- `PROTECTED_SOURCE_FILES=61`
- `LOCK_STATE=LOCKED`
- Golden Guard timer enabled and active
- repeated deep checks: `bad=0`, `config_changed=0`, `source_changed=0`

## Acceptance QA

Both pre-lock and post-lock browser suites passed at:

- desktop: 1440×1000
- tablet: 768×1024
- mobile: 390×844

Assertions included:

- 18 main sections
- 15 FAQ items
- 8 registration CTAs
- closing section remains index 15, after Bonus V1 and before FAQ
- H2 remains unchanged
- new paragraph exact-match after hydration
- old paragraph absent from visible page text
- one closing CTA with registration pathname `/gen-ai-masterclass/register-one-step`
- CTA remains fully inside viewport with >=44px height
- no horizontal page overflow
- no failed linked CSS/JS assets
- Testimonials V1B and Bonus V1 remain present
- current Hero remains present
- only the previously measured React hydration error families/bounds are tolerated (#418 <= 26, #423 <= 1, #425 <= 2); unknown browser errors still fail

## Production execution

- deploy commit: `c61ee1fbb4915769ed428c61840dba28db05ffaf`
- workflow run: `34502143719`
- job: `102955278404`
- controlled stage: PASS
- pre-lock browser QA: PASS
- reseal/deep guard: PASS
- post-lock browser QA: PASS
- rollback: SKIPPED

## Maintenance

Use `ops/deploy-claude-closing-v1-20260910.sh` only as a forensic/reproducible record of this accepted change. For any future intentional funnel edit, use the Golden Lock lifecycle: check -> unlock -> assert-unlocked -> exact change -> server/browser QA -> reseal -> lock -> deep guard -> post-lock regression. Never overwrite an already-published immutable Next asset with different bytes.
