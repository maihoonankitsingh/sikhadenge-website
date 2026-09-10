# Claude Outcomes V1 + Golden Network Hardening — 2026-09-10

## Scope

Protected production routes:

- `https://sikhadenge.in/masterclass/claude/free`
- `https://sikhadenge.in/masterclass/ai-video`

No registration, lead API, CRM, payment, attribution, or unrelated site configuration was intentionally changed by this work.

## Claude final approved state

Hero remains:

- `Master Claude + 25+ AI Tools to work smarter, create faster & get better results.`

Trust row remains:

- `150,000+ Learners`
- `4.9/5 Rating`
- `Live · Practical`

Outcome section heading:

- `What you can do with AI`

Outcome cards:

1. `Research a topic and turn it into presentation-ready insights`
2. `Summarise long reports, PDFs & notes into clear action points`
3. `Create structured presentations, emails & professional content faster`
4. `Understand and improve code with AI-assisted workflows`
5. `Work with Excel formulas & data using natural-language AI guidance`
6. `Improve LinkedIn research, profile content & outreach workflows`

The older hard-duration claims such as `Complete research reports in around 20 minutes` and `Create presentation-ready content in seconds` are not part of the approved Outcomes V1 state.

## Browser QA

Final Outcomes V1 deployment passed real Chromium QA at:

- Desktop: `1440x1000`
- Tablet: `768x1024`
- Mobile: `390x844`

Assertions passed:

- Hero exact text preserved
- Trust row exact text preserved
- Outcomes heading and all six outcome cards exact
- 18 main sections preserved
- 15 FAQ details preserved
- 8 registration CTAs preserved
- No horizontal overflow
- No failed CSS/JS responses in the browser QA run
- AI Video public body remained byte-identical during the Outcomes deployment

## Final Golden state

Final reproducibility/reinstall verification produced Golden seal:

- Seal: `/var/lib/sikhadenge-funnel-golden-lock/seal-20260910-124107`
- AI public SHA-256: `b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2`
- Claude public SHA-256: `6bb4c3705c439050ff404205a85efd59d73b6ce0a9953a3f1edc7ca60a9149d9`
- AI upstream SHA-256: `9f7202ae3d3ee585d22f2ebf250ff0f0d1d43ebc58e5a3ae1f2381739c5e8434`
- Claude upstream SHA-256: `c40c8a8caaf55cfa53e947c3127c4164e229d548fd61ee3fe5bd62d75e04cd`
- AI Nginx snippet SHA-256: `367ca058269236180575c0af7819d1affd0700e9700b123edf5b01ff9fc4d264`
- Claude assets snippet SHA-256: `d38cb65fe1ee03493718f9d246807c387b989fd8baddfdd24b29aec32cbe5673`
- Claude exact route SHA-256: `434c145b15043e4144dc094437c0a20a12292c2ecf2458c0b8ed2631d6f7f9fa`
- Linked CSS/JS assets: `49`
- Protected source/config files: `55`
- Lock state after final verification: `LOCKED`
- Timer: enabled and active

## Network resilience hardening

Permanent hardening script:

- `ops/harden-funnel-golden-network-checks-20260910.sh`

The production Golden guard was hardened because genuine DNS/transport failures (`HTTP 000`) were incorrectly being treated as content corruption during deep asset verification.

The hardened behavior is:

1. External transport fetch gets up to 3 attempts.
2. Only if all external attempts end as `HTTP 000`, the guard performs a local HTTPS verification through Nginx using `sikhadenge.in -> 127.0.0.1` resolution.
3. The local fallback must return HTTP 200 and the exact sealed SHA-256.
4. A real public HTTP response such as 404/500 is not accepted as success by this fallback rule.
5. A wrong SHA-256 is never accepted.
6. Service timeout was increased from 55 seconds to 90 seconds so retry-capable deep checks can complete safely.

Two previously failing CSS paths were explicitly verified through the local HTTPS fallback:

- `/sikhadenge-audience-v328.css?v=v330-20260830-233653`
- `/sikhadenge-workflow-v324.css?v=v326-20260830-230043`

After hardening, two consecutive 49/49 deep asset checks passed. During the final Outcomes deployment, a real DNS resolving timeout occurred and the hardened guard still completed with `bad=0`, demonstrating that transient transport failure no longer causes a false rollback when the exact local public asset state is healthy.

## Reinstall reproducibility

`.github/workflows/install-two-funnel-golden-lock-20260910.yml` now stages and applies `ops/harden-funnel-golden-network-checks-20260910.sh` immediately after the base Golden lock installation.

A production reinstall test completed successfully with:

- static safety validation PASS
- AI HTTP 200
- Claude HTTP 200
- Golden seal recreated from the current approved Outcomes V1 state
- network hardening reapplied
- two consecutive 49/49 deep checks PASS
- timer enabled and active
- final state LOCKED

## Future intentional edits

Do not edit the protected Claude or AI Video funnel directly while the lock is active; the guard can restore the Golden state.

Use this controlled sequence:

1. `sikhadenge-funnel-lockctl check`
2. `sikhadenge-funnel-lockctl unlock 15`
3. Make only the explicitly approved narrow change.
4. Run server verification and real browser QA.
5. Verify the other protected funnel is unchanged when practical.
6. `sikhadenge-funnel-lockctl reseal`
7. `sikhadenge-funnel-lockctl status`
8. Confirm `LOCK_STATE=LOCKED`, timer enabled/active, and deep asset check `bad=0`.

Do not bypass Golden integrity checks, do not add broad `/_next/static` routing, and do not freeze or replace the whole website Nginx configuration.
