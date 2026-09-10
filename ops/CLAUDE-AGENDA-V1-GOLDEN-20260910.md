# Claude Agenda V1 — Golden Production Record

Date: 2026-09-10
Protected route: `/masterclass/claude/free`

## Scope

Only the existing live masterclass Agenda / Roadmap copy was refined. No layout, card count, icons, spacing, CTA destination, registration flow, attribution, tracking, FAQ, AI Video page or unrelated Nginx configuration was intentionally changed.

## Live Agenda V1 copy

Eyebrow: `LIVE MASTERCLASS AGENDA`

Intro: `5 practical modules that show what to use, when to use it and how to combine AI tools into repeatable work.`

Modules:
1. `Choose the right AI tool for the task`
2. `Research, summarise & extract insights`
3. `Create professional work faster`
4. `Code & automate repetitive work`
5. `Build a repeatable AI workflow`

The existing main section headline `From first prompt to professional AI workflow.` remains unchanged.

## Technical implementation

Previous client page chunk SHA:
`ff52a32e33e94e6e499ee402ff24b0bc84a5d9c882f9d2df44e45a2fb6865a8d`

Agenda V1 client chunk SHA:
`ad12771c1d5d9b23d995afbf7d019a2b8c4b9710fb6527fab586d5e3f827719a`

A new immutable versioned Next.js page chunk is served for Claude so the change does not overwrite an already cached immutable asset. Exact server-side `sub_filter` replacements keep first-render HTML consistent with the hydrated client bundle.

## Browser QA

Real Chromium QA passed at:
- Desktop: 1440×1000
- Tablet: 768×1024
- Mobile: 390×844

All three views verified:
- Hero V1 retained
- Trust V1 retained
- Outcomes V1 retained
- Agenda V1 labels/module headings present
- old `Coding, agents & automation` text absent
- 18 main sections
- 15 FAQ entries
- 8 registration CTAs
- zero horizontal overflow
- zero CSS/JS responses >= 400
- Agenda V1 versioned page chunk loaded

## Golden state

Golden seal: `seal-20260910-130658`

AI Video public SHA (unchanged):
`b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2`

Claude public SHA:
`6224eae3faa8a86c66c2b61de82f68e76c12c93d6e8866c1ff90466831430ba8`

Protected linked assets: 49
Protected source/config files: 56

Post-seal deep checks repeatedly passed with `bad=0`, `config_changed=0`, `source_changed=0` and the lock returned to `LOCK_STATE=LOCKED` with the systemd timer enabled and active.

## Deployment history note

The first Agenda V1 attempt rolled back safely because an over-specific bundle verification expected a particular minified JSX serialization (`children:` prefix). The actual page patch was not accepted. The verifier was corrected to check exact text presence independent of minifier serialization. The second deployment then passed server checks, three-view browser QA, Golden reseal and final lock verification.

Temporary inspect/deployment workflows were removed after success.
