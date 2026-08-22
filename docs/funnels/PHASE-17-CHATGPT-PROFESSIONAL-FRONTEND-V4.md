# Phase 17 — ChatGPT Free Masterclass Professional Frontend V4

## Status

Implemented on `feature/ai-masterclass-funnel-v2` only.

Production activation, `main` merge, payment-mode changes and live-traffic activation are not part of this phase.

## Realistic design prompt used

> Audit the existing SikhaDenge ChatGPT free masterclass landing page at `/masterclass/chatgpt/free#agenda` and redesign it into a premium, conversion-focused education landing page. Keep the existing registration, WhatsApp consent, tracking and backend logic unchanged. Use a professional ChatGPT-inspired graphite + emerald visual system, strong typographic hierarchy, deliberate spacing, clear event facts, real-work workflow visuals, credible proof, a structured 2-hour agenda, mentor authority, practical resources, FAQ and repeated tracked CTAs. Avoid generic AI gradients, cartoon visuals, oversized playful cards and random decorative effects. The result should feel intentionally art-directed rather than AI-generated. It must be responsive and usable at 375 px, 430 px, tablet, laptop and large desktop widths, with visible focus states, adequate tap targets, no horizontal overflow and a clear mobile sticky CTA.

## Existing-page audit

The route already had a dedicated `ChatGPTFreeV3` implementation and reusable funnel infrastructure.

### Preserved infrastructure

- `FunnelAnalytics`
- `FunnelTracker`
- `TrackedCta`
- `RegistrationCard`
- `MobileStickyCta`
- dynamic `FunnelConfig` date/time/language/offer labels
- current registration API and redirect behavior
- current WhatsApp consent behavior
- current first-party attribution and funnel event implementation

### V3 design issues targeted in V4

- weak brand/navigation layer above the hero
- a light hero that did not fully express the established graphite + emerald ChatGPT family
- multiple card grids with similar visual weight
- insufficient contrast between narrative sections
- workflow visual that read more like a generic chat mockup than a professional method
- limited before/after transformation emphasis
- less deliberate desktop-to-mobile hierarchy
- opportunity for stronger keyboard/focus treatment and anchor navigation

## V4 design system

### Visual language

- primary surface: graphite / near-black
- primary accent: emerald `#10A37F`
- secondary accent: restrained mint/teal
- light surfaces: white, off-white and desaturated green-grey
- borders instead of heavy shadows for most cards
- gradients restricted to hero atmosphere, CTA surfaces and selected dark feature areas
- no cartoon illustrations, decorative AI robots or neon cyberpunk styling

### Typography

- one modern sans-serif system using Inter with system fallbacks
- compact, high-weight display titles
- tight display tracking and line-height
- readable body copy with restrained maximum widths
- consistent uppercase kicker treatment for hierarchy

### Layout

- maximum content width: 1200 px
- explicit dark/light section rhythm
- hero uses a two-column desktop layout and collapses to a centered single-column mobile/tablet layout
- consistent cards and dividers use shared radius/spacing language
- core responsive breakpoints include 1100, 900, 680, 430 and 380 px

## New conversion architecture

1. live announcement bar
2. SikhaDenge branded navigation + tracked CTA
3. hero: outcome-led headline + dynamic event facts + proof
4. AI Workflow Lab visual: `Context → Method → Output`
5. four-point proof band
6. problem framing
7. six practical capabilities
8. live workflow before/after demo
9. audience fit
10. 2-hour live agenda
11. before/after transformation
12. mentor authority
13. practical resources
14. learning path
15. registration
16. FAQ
17. final CTA
18. legal/brand footer
19. mobile sticky CTA

## Implementation

### Added

- `components/funnel/chatgpt/ChatGPTFreeV4.tsx`
- `styles/chatgpt-masterclass-v4.module.css`

### Updated

- `pages/masterclass/chatgpt/free.tsx` now renders `ChatGPTFreeV4`.

### Rollback

`ChatGPTFreeV3.tsx` and `chatgpt-masterclass-v3.module.css` remain untouched. Reverting the route import restores V3 without rebuilding registration logic.

## Business-logic boundary

V4 does not modify:

- `/api/funnel/register`
- Razorpay behavior
- payment purpose/authority
- price configuration
- CRM truth
- Meta event identity/dedup logic
- WhatsApp consent semantics
- refund handling
- eligibility logic

Tracked CTA locations are presentation analytics labels only:

- `chatgpt_v4_header`
- `chatgpt_v4_hero`
- `chatgpt_v4_agenda`
- `chatgpt_v4_final`

All CTAs continue through the existing `TrackedCta` component and target the existing `#register` form.

## Accessibility and interaction

- skip-to-content link
- semantic navigation label
- semantic heading hierarchy
- native `details` / `summary` FAQ controls
- visible `:focus-visible` treatment
- CTA/tap targets designed around 44–52 px minimum height
- decorative graphics marked `aria-hidden`
- reduced-motion handling retained at stylesheet level

## Responsive QA matrix

Validate the route at these widths before production release:

| Width | Primary checks |
|---|---|
| 375 px | hero wrap, header CTA, event cards, workflow lab, agenda rows, form, sticky CTA, no horizontal scroll |
| 430 px | hero hierarchy, proof grid, mentor badge, FAQ, footer |
| 768–834 px | tablet hero transition, section grids, mentor layout, registration form |
| 1366 px | hero fold, workflow-lab balance, CTA visibility, section rhythm |
| 1440 px | typography, content density, card proportions, agenda scanability |
| 1920 px | max-width behavior, negative space, no uncontrolled stretching |

## Release gate

Do not treat the design as production-cleared until the exact V4 head passes the repository CI/build and runtime screenshot QA. Provider/payment release gates remain separate from frontend visual approval.
