# Claude Audience V1 Golden — 2026-09-10

## Scope
Production route: `/masterclass/claude/free`

Audience V1 changes only the audience eyebrow and four persona cards. The existing Audience H2/highlight pipeline is intentionally preserved. Hero, trust strip, outcomes, agenda, Job Impact proof v5, CTA destinations, attribution, registration flow and AI Video are outside this change.

## Final live audience copy

Eyebrow: `WHO THIS MASTERCLASS IS FOR`

Existing H2 preserved: `Use the right AI tool where speed, quality and structured output matter.`

1. **Working professionals & business owners** — Apply AI to research, writing, planning and everyday digital work.
2. **Students & freshers** — Use AI for projects, research and practical career preparation.
3. **Freelancers & creators** — Research, create and deliver client work more efficiently with repeatable AI workflows.
4. **Job seekers & career switchers** — Use AI for LinkedIn, interviews, research and faster skill-building.

## Implementation

Controlled deploy utility: `ops/deploy-claude-audience-v1-20260910.sh`

Responsive QA: `ops/qa-claude-audience-v1-20260910.js`

Final immutable client chunk:
`/_next/static/chunks/pages/masterclass/claude/free-802d96fd8696db68-v315r-20260830-204006-v316-20260830-204806-hero-v1-trust-v1-outcomes-v1-agenda-v1-audience-v1b-20260910.js`

Final chunk SHA-256:
`37d8783868343bb243fd824a3fd26c2981e9be4a36d5cda21a920ba3283d1688`

The final deployment intentionally used a new `v1b` immutable URL. A prior failed attempt had already populated Cloudflare cache for the earlier `audience-v1-20260910.js` URL with different bytes. Reusing that immutable URL was rejected by the Golden Guard. The old immutable URL was not overwritten or relied upon.

## Acceptance QA

Final GitHub Actions run: `34490548303`
Job: `102915848507`
Trigger commit: `d1b05cfd31ddb0c8a6eca2ea553d09edf2eef282`

Passed:
- Static validation
- Controlled production stage
- Canonical immutable chunk HTTP 200 + exact SHA match
- SSR semantic copy verification
- Desktop 1440×1000 browser QA
- Tablet 768×1024 browser QA
- Mobile 390×844 browser QA
- Existing Hero copy preserved
- Trust strip preserved
- Outcomes V1 preserved
- Agenda V1 preserved
- Job Impact v5 evidence stats preserved
- 18 main sections
- 15 FAQ items
- 8 registration CTAs
- No horizontal overflow
- No failed CSS/JS assets in browser QA
- Legacy audience copy absent from visible text
- AI Video public body unchanged

## Golden state

Seal: `seal-20260910-201148`

Claude public SHA-256:
`06453cdded91aad388608d58124921a471dc6cdc5af8b1ab90fcfcdb2e372530`

AI Video public SHA-256 unchanged:
`b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2`

Linked assets: `49`
Protected source/config files: `58`
Golden Lock state: `LOCKED`
Guard timer: `enabled` and `active`

Post-reseal deep checks returned `bad=0`, `config_changed=0`, `source_changed=0`.

## Failure history / why final architecture is safe

1. Initial Audience H2 rewrite collided with the existing heading/highlight transformation pipeline. That attempt rolled back before browser acceptance. Final V1 preserves the H2 and only changes the audience eyebrow/cards.
2. A later browser-PASS attempt reused an earlier immutable chunk URL. Golden Guard correctly rejected the canonical Cloudflare-cached SHA mismatch. Final V1B uses a brand-new immutable URL and verifies its canonical URL SHA before browser QA/reseal.
3. All failed attempts used automatic rollback and returned production to the prior locked Golden state before the next attempt.

## Future change procedure

Use the controlled sequence only:
`unlock -> assert-unlocked -> exact intended change -> server/browser QA -> canonical asset SHA verification -> reseal -> lock -> deep check`.

Never overwrite a previously published immutable Next.js asset URL with different bytes; publish a fresh versioned URL instead.
