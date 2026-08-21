# Phase 13 — Premium Funnel Frontend

## Objective

Upgrade the public SikhaDenge AI funnel from a functional acquisition UI into one coherent, premium, conversion-oriented frontend without changing payment truth, pricing, attribution, eligibility, consent, CRM state or provider integrations.

## Covered journey

- ChatGPT FREE masterclass
- ChatGPT paid-entry masterclass
- Claude FREE masterclass
- Claude paid-entry masterclass
- Masterclass registration form
- Secure Razorpay checkout shell
- Registration/payment confirmation screens
- ChatGPT implementation workshop
- Claude implementation workshop
- SikhaDenge AI Expert Program
- AI Expert confirmation state

## Visual system

The public funnel now uses a shared design language:

- deep navy base for high-intent acquisition/transaction surfaces
- SikhaDenge electric-blue/cyan/teal accents
- a warm amber product accent for Claude-specific pages
- high-contrast white content surfaces for explanation/education sections
- larger balanced display typography
- stronger card hierarchy and spacing
- subtle glass/surface depth without sacrificing readability
- consistent radii, shadows and CTA treatment
- responsive layouts optimized for desktop, tablet and mobile
- reduced-motion support

## Masterclass hero

The previous abstract orbit visual has been replaced with a clearer `AI Workflow Lab` command-center composition. It communicates the actual teaching promise visually:

1. Context
2. Method
3. Output

The hero also surfaces practical learning cues without adding outcome guarantees:

- Live workflow demos
- Beginner-friendly Hinglish
- Practical takeaways

## Navigation / conversion hierarchy

The funnel header now has a clear `Reserve Seat` CTA while preserving the existing SikhaDenge logo and live-session announcement.

The primary CTA remains the business-logic-controlled CTA from the funnel config, including FREE vs paid entry variants.

## Registration experience

The form logic is unchanged. Presentation now makes the sequence clearer:

- Step 01 — learner details
- Step 02 — confirmation or secure checkout

It also visually distinguishes registration/WhatsApp communication from payment and reinforces that paid amounts are server controlled.

Consent behavior remains unchanged and mandatory for the masterclass WhatsApp flow.

## Workshop

Both product-specific workshop pages retain their existing content, attribution and secure checkout flow while receiving:

- stronger hero typography
- premium sticky offer card on desktop
- richer curriculum rows
- elevated deliverable/FAQ cards
- consistent final CTA treatment

## AI Expert Program

The verified-workshop-only backend offer keeps all existing eligibility checks. The frontend now aligns visually with the same premium funnel family, including:

- stronger hero and offer panel hierarchy
- refined outcome cards
- richer roadmap rows
- premium enrollment decision card
- aligned FAQ and confirmation surfaces

## Checkout and confirmation

Checkout/payment truth is untouched. Phase 13 only aligns presentation:

- stronger payment-card hierarchy
- clearer trust section
- consistent accent treatment
- premium confirmation card
- responsive transaction layouts

## Safety / integrity constraints

Phase 13 does **not**:

- change any configured price
- allow browser-controlled payment amounts
- create purchases manually
- bypass workshop/core eligibility
- modify Razorpay verification
- modify Meta dedup logic
- weaken WhatsApp consent
- invent testimonials, scarcity, income claims or job guarantees
- merge or deploy to production

## Files

Updated:

- `components/funnel/sections/HeroSection.tsx`
- `components/funnel/FunnelHeader.tsx`
- `components/funnel/RegistrationCard.tsx`
- `pages/_app.tsx`

Added:

- `styles/funnel-premium.css`
- `styles/funnel-transaction-premium.css`
- `docs/funnels/PHASE-13-PREMIUM-FRONTEND.md`

## Release status

This phase is source-complete on `feature/ai-masterclass-funnel-v2`. It remains inside draft PR #108. Production merge/deployment is not authorized by this document.
