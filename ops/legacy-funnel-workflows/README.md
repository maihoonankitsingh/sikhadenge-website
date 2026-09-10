# Archived Funnel Mutator Workflows

These historical one-shot GitHub Actions workflows were moved out of `.github/workflows` on 2026-09-10 after the AI Video and Claude masterclass funnels were sealed by the Two-Funnel Golden Lock.

They are retained only for forensic/history reference. Do **not** move or execute one directly against production.

Any intentional change to `/masterclass/ai-video` or `/masterclass/claude/free` must use the controlled sequence:

1. `sikhadenge-funnel-lockctl unlock 15`
2. apply one scoped change
3. production + desktop/mobile browser QA
4. `sikhadenge-funnel-lockctl reseal`

A production mutation workflow must call `sikhadenge-funnel-lockctl assert-unlocked` before it writes protected funnel state.
