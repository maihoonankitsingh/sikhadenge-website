# Claude Free Final Trust V1 — 2026-09-11

## Scope

Claude free masterclass route only:

- `https://sikhadenge.in/masterclass/claude/free`
- Preserve the already accepted `NEXT LIVE BATCH` / final handoff section.
- Remove payment-expectation friction beneath the free-seat CTA.
- Preserve legal disclaimer, Privacy Policy, Terms & Conditions, registration destination, attribution, FAQ, testimonials, bonus kit, and AI Video funnel.

## Accepted user-facing final handoff

- H2: `Ready to build your first practical AI workflow?`
- Paragraph: `Join the free live masterclass and learn Claude + 25+ AI tools for real work — step by step, in easy Hinglish.`
- Signals: `Live Online`, `Easy Hinglish`, `No Coding Required`
- CTA destination: `/gen-ai-masterclass/register-one-step`
- Note: `Joining details follow after registration.`

These were already part of the accepted Golden baseline before this V1 trust cleanup and were not rewritten.

## Change

On the Claude free route only, hide:

- `.claude-payment-trust-footer_paymentArea__aYkQy`
- `.claude-payment-trust-footer_divider___nkaU`

Keep visible:

- `.claude-payment-trust-footer_legal__It3D5`
- Disclaimer
- Privacy Policy
- Terms & Conditions

The style is composed into the route's existing single `</head>` `sub_filter`, ahead of the existing attribution bridge. No duplicate head filter is introduced and `/funnel-attribution-bridge-v1.js?v=20260903-1` remains injected exactly once.

## Production acceptance

Successful workflow:

- Run: `34559025970`
- Job: `103137724449`
- Trigger commit: `d172871709dd372d21065610bef5196f231b0f04`
- Backup: `/var/backups/sikhadenge/claude-free-final-trust-v1-20260911-090557`

Final Golden state:

- Seal: `20260911-090702`
- Claude public SHA: `87f0dd7849d2f26b6eb1eb24a886f6faedb046bbbfd37414553761d3274d7355`
- AI Video public SHA: `b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2`
- Linked assets: `52`
- Protected source/config files: `63`
- Lock state: `LOCKED`
- Golden Guard timer: enabled and active
- Deep checks after reseal: `bad=0`, `config_changed=0`, `source_changed=0`

## Browser QA

Passed before reseal and again after lock on:

- Desktop `1440×1000`
- Tablet `768×1024`
- Mobile `390×844`

Verified on every view:

- 18 main sections
- final handoff is section index 17
- accepted H2 / paragraph / signals / note unchanged
- 8 registration CTAs and final CTA path unchanged
- 15 FAQs
- testimonial script present exactly once
- bonus script present exactly once
- FAQ conversion script present exactly once
- final handoff script present exactly once
- attribution bridge present
- payment area computed `display:none`
- payment divider computed `display:none`
- payment copy not visible to the user
- legal footer remains visible
- Disclaimer, Privacy Policy and Terms & Conditions remain visible
- zero horizontal overflow
- zero broken linked CSS/JS responses
- known React hydration errors remained within the established baseline

## Permanent implementation files

- `ops/deploy-claude-free-final-trust-v1-20260911.sh`
- `ops/qa-claude-free-final-trust-v1-20260911.js`

## Notes

Earlier attempts were rejected by safety gates for stale-baseline, raw-SSR, Nginx head-filter, and obsolete QA-marker assumptions. Each failed attempt automatically rolled back and resealed the then-current Golden baseline. The accepted run above is the first run where stage, three-view pre-lock QA, Golden reseal/deep guard, and three-view post-lock QA all passed with rollback skipped.
