# AI Video Masterclass — Production Architecture Guard

Route: `/masterclass/ai-video`

## Goal

Keep the ads landing page source-first, responsive, measurable and rollback-safe. The rendered hero and funnel must come from React + CSS source, not from post-load DOM reconstruction.

## Locked architecture rules

1. **Source-first rendering**
   - Hero, CTA, trust points, sections and responsive layouts belong in `pages/masterclass/ai-video/index.tsx` and the route CSS modules.
   - Do not recreate or replace the document after load.

2. **Never use document replacement**
   - Do not introduce `document.open()`, `document.write()` or `document.close()`.
   - Do not use an iframe/1280px desktop-mirror tablet shell.
   - Do not restore `tabletV7`, `desktopEmbed` or equivalent aliases.

3. **No runtime hotfix stack**
   - Do not add MutationObserver loops that rewrite hero/CTA/layout styles.
   - Do not add repeated delayed DOM reconstruction passes for this route.
   - Fix source and rebuild instead.

4. **One offer source of truth**
   - Current masterclass duration is 2 hours.
   - Duration copy must be driven from the source constants in the page component.
   - Hero, agenda, final CTA and mobile sticky must not disagree.

5. **Responsive source CSS only**
   - Desktop: native layout.
   - Tablet: native CSS/Grid reflow; never desktop emulation.
   - Mobile: native single-column/mobile layouts with safe-area-aware sticky CTA.

6. **Performance rules**
   - Prefer local assets for above-the-fold visuals.
   - Avoid per-card third-party favicon/image requests.
   - Avoid global route override styles and `!important` specificity stacks.
   - Keep below-fold rendering eligible for `content-visibility` where safe.

7. **Accessibility rules**
   - Preserve one H1.
   - Every section heading should label its section where practical.
   - Tab widgets require `aria-controls`, `aria-selected`, panels and keyboard navigation.
   - Interactive targets should remain comfortably tappable on mobile.
   - Respect `prefers-reduced-motion`.

8. **SEO/share rules**
   - Keep a route canonical URL.
   - Keep page-specific Open Graph/Twitter metadata.
   - Keep Course and FAQ structured data synchronized with visible content.

9. **Tracking rules**
   - Registration destination stays `/gen-ai-masterclass/register-one-step?source=ai-video-masterclass` unless the funnel owner intentionally changes it.
   - CTA tracking may emit only through already-authorized analytics runtimes; never bypass consent logic.

## Required pre-merge check

Run:

```bash
npm run ai-video:audit
```

The dedicated GitHub Actions workflow `.github/workflows/ai-video-quality.yml` must also pass.

## Production deployment rule

GitHub source changes do **not** authorize an in-place edit of the locked ads-live release. Build and validate a candidate/preview first. Only promote after desktop, tablet and mobile browser QA, CTA/registration verification and measured performance checks.

The current ads-live golden release should remain untouched until the candidate passes those gates.
