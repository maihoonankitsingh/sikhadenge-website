# Phase 15 — GrowthSchool-inspired conversion redesign

## Objective

Rebuild the SikhaDenge ChatGPT and Claude masterclass acquisition pages using high-performing education-funnel principles observed in current GrowthSchool workshop experiences, while keeping the SikhaDenge design, copy, claims, tracking, pricing and provider relationships original.

This phase does **not** copy GrowthSchool source code, brand assets, proprietary wording or testimonial content.

## Conversion architecture

The masterclass page now follows a denser guided narrative:

1. Live announcement and persistent reserve-seat CTA
2. Product-specific hero with clear entry, date/time and WhatsApp delivery
3. Trust/proof band
4. Problem framing
5. Capability/outcomes
6. Product-specific live masterclass agenda
7. Live workflow demonstrations
8. Before → after workflow transformation
9. Audience segmentation
10. Mentor authority
11. Practical resources
12. Optional learning path: masterclass → workshop → AI Expert
13. Premium registration block
14. FAQ
15. Final CTA
16. Mobile sticky CTA

## Product-specific visual systems

### ChatGPT

- Graphite / deep green base
- Emerald `#10A37F` primary direction
- Bright teal/green secondary accent
- Hero workflow language: Prompt → Research → Professional Output
- Focus: productivity, prompting, research, documents and reusable workflows

### Claude

- Warm charcoal / dark brown base
- Terracotta `#D97757` primary direction
- Warm peach/orange secondary accent
- Hero workflow language: Source → Synthesis → Working Artifact
- Focus: long documents, deep research, synthesis, projects and artifacts

The Claude experience is intentionally more than a recolored ChatGPT page: agenda, hero workflow, transformation copy and visual tone are product-specific.

## New sections

### AgendaSection

Five live modules per product plus a sticky session-format CTA card.

### TransformationSection

A two-column Before / After board showing the difference between unstructured AI usage and workflow-first AI usage.

## Conversion and UX improvements

- Stronger first-screen entry/format/delivery hierarchy
- Repeated tracked CTAs without changing event taxonomy
- Richer proof and information bands
- Mentor chip inside hero visual
- Premium dark/light section rhythm
- Hover/elevation hierarchy on capability cards
- Sticky agenda CTA on desktop
- Clear learning-path explanation without forced upsell
- Registration facts for entry, date/time and language
- Responsive layouts at desktop, tablet and narrow mobile sizes
- Reduced-motion support retained

## Business logic preserved

No changes were made to:

- Razorpay amount authority or payment verification
- FREE vs paid-entry business rules
- attribution / UTM / Meta event IDs
- WhatsApp consent
- paid-entry WhatsApp activation-after-capture rule
- workshop eligibility
- AI Expert eligibility
- CRM lifecycle truth
- refund handling

## Automated verification

Funnel v2 CI run #401 passed on Phase 15 head `ca7b10448acabcd94a83ce734d83ba80b95d2874`:

- committed lockfile install — PASS
- payment security self-tests — PASS
- integration readiness tests — PASS
- production dependency audit (zero high required) — PASS
- Prisma generate — PASS
- fresh PostgreSQL migration rehearsal — PASS
- DB integrity smoke — PASS
- Next.js production build/type-check — PASS
- HTTP lifecycle rehearsal — PASS
- production route smoke — PASS

## Release state

Phase 15 is source/build verified only. PR #108 remains draft. No production merge, migration, Razorpay Live switch or live-traffic activation is authorized by this phase.
