# Claude Final Registration Handoff V1 — Golden Record — 2026-09-10

## Scope

Production URL: `https://sikhadenge.in/masterclass/claude/free`

This change is limited to the final `NEXT LIVE BATCH` main-section registration handoff. It does not modify the registration application, lead API, attribution bridge, FAQ content, testimonials, bonus kit, earlier closing CTA, hero, or the AI Video funnel.

## Accepted customer-facing state

Eyebrow remains:

`NEXT LIVE BATCH`

Heading:

`Ready to build your first practical AI workflow?`

Supporting copy:

`Join the free live masterclass and learn Claude + 25+ AI tools for real work — step by step, in easy Hinglish.`

Reassurance signals:

- `Live Online`
- `Easy Hinglish`
- `No Coding Required`

Primary CTA remains the existing CTA element and destination:

- copy: `Get My Free Seat • ₹999 → Free`
- path: `/gen-ai-masterclass/register-one-step`
- aria-label: `Get My Free Seat — ₹999 value, Free now`

Post-CTA note:

`Joining details follow after registration.`

The previous process-oriented sentence `Reserve your free seat and continue to the existing SikhaDenge registration page.` is intentionally removed from the rendered final handoff.

## UI behavior

The existing final-section styling is preserved as the base. A route-scoped enhancement centers the final decision block and its CTA at desktop, tablet, and mobile widths. The section retains one registration CTA and adds only three compact reassurance signals plus the joining-details note. No countdown, fake urgency, popup, new form, or unsupported promise is introduced.

## Production asset

Repository source:

`ops/assets/claude-final-handoff-v1-20260910.js`

Production asset:

`/claude-final-handoff-v1-20260910.js`

Production asset SHA-256:

`a92e1bc165770d0c8db33f08def3f6dbb9991fcecd7d861e5ee832f5b0c5f43c`

The asset is injected only into the exact Claude route after the existing bonus-value script.

## Deployment and rollback

Permanent deployment script:

`ops/deploy-claude-final-handoff-v1-20260910.sh`

Permanent browser QA:

`ops/qa-claude-final-handoff-v1-20260910.js`

Successful GitHub Actions run:

- run: `34506216509`
- job: `102968939345`
- trigger commit: `e512bd208afabae51f4ff80706f42ca6fb5c928a`

Production backup:

`/var/backups/sikhadenge/claude-final-handoff-v1-20260910-223722`

Rollback is built into the deployment script and restores the Nginx site, Claude asset snippet, and target asset before resealing and relocking.

## Golden state after acceptance

Golden seal:

`/var/lib/sikhadenge-funnel-golden-lock/seal-20260910-223831`

Accepted public SHA-256 values:

- Claude: `6c89ce95c27a5f56ab90bbf36d646233fae94a90c2bf7cdc6d2504900bb4871f`
- AI Video: `b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2`

Accepted upstream SHA-256 values:

- Claude upstream: `c40c8a8caafaf55cfa53e947c3127c4164e229d548fd61ee3fe5bd62d75e04cd`
- AI Video upstream: `9f7202ae3d3ee585d22f2ebf250ff0f0d1d43ebc58e5a3ae1f2381739c5e8434`

Golden inventory after reseal:

- linked assets: `52`
- protected source files: `63`
- lock state: `LOCKED`
- Golden Guard deep check: `bad=0`
- guard timer: enabled and active

## Browser acceptance

The same QA suite passed before reseal and again after the funnel was locked.

Desktop `1440 × 1000`:

- final CTA: `340 × 58`, horizontally centered
- final section: `1440 × 550`
- all three reassurance signals visible and in viewport

Tablet `768 × 1024`:

- final CTA: `330 × 58`, horizontally centered
- final section: `768 × 540`
- all three reassurance signals visible and in viewport

Mobile `390 × 844`:

- final CTA: `308 × 55`, horizontally centered
- final section: `390 × 537`
- reassurance signals wrap cleanly without overflow

Global invariants verified in all three views:

- `main section` count remains `18`
- final handoff remains section index `17`
- FAQ count remains `15`
- total registration links remain `8`
- final section contains exactly `1` registration link
- registration destination remains `/gen-ai-masterclass/register-one-step`
- attribution bridge remains present
- FAQ Conversion V1 remains present exactly once
- Testimonials remains `v1b`
- Bonus Kit remains `v1`
- Claude H1 still contains `Master Claude + 25+ AI Tools`
- horizontal overflow: none
- broken linked CSS/JS: none
- AI Video public body remained byte-identical to its accepted SHA

Known pre-existing React hydration error signature stayed within the established baseline and did not increase.

## Change discipline

Any intentional future modification to either protected funnel must follow the Golden Lock procedure:

1. `sikhadenge-funnel-lockctl unlock <minutes>`
2. `sikhadenge-funnel-lockctl assert-unlocked`
3. make the exact scoped change
4. run production/browser QA
5. `sikhadenge-funnel-lockctl reseal`
6. `sikhadenge-funnel-lockctl lock`
7. run `check` and deep guard verification

Do not bypass the lock or broaden this final-handoff enhancement into registration/API/attribution changes without separate authorization.
