# SikhaDenge Two-Funnel Golden Lock

Production protection for these approved pages only:

- `/masterclass/ai-video`
- `/masterclass/claude/free`

## Why this exists

These funnels use isolated historical Next.js builds plus Nginx routing. A previously observed failure class was a valid page HTML referencing build-specific CSS/page-JS while the public `/_next/static` routing returned 404. The Golden Lock protects the approved render state without freezing unrelated website configuration.

## Protection model

1. **Atomic Golden seal** — current public fingerprints, origin fingerprints, the exact AI Video Nginx snippet, the exact Claude route block, the Claude asset snippet, all linked CSS/JS, and directly owned source/alias files are captured under `/var/lib/sikhadenge-funnel-golden-lock/current`.
2. **60-second self-heal** — `sikhadenge-funnel-golden-guard.timer` runs the guard every minute.
3. **5-minute deep asset verification** — all CSS/JS captured by the active seal are checked for HTTP 200 and exact content hash.
4. **Source/config drift repair** — accidental edits to protected source files or isolated funnel Nginx configuration are restored from the Golden seal. Nginx is reloaded only after `nginx -t` succeeds.
5. **PM2 recovery** — the guard checks the two origin processes and restarts a stopped process when possible. `pm2 save` persists the process set for reboot recovery.
6. **Narrow scope** — the whole `sikhadenge.in-ssl` file is deliberately not frozen. For Claude, only the exact `/masterclass/claude/free` location block is restored. Homepage, admissions, registration and unrelated routes remain independently editable.
7. **Safe failure behavior** — an external/CDN/network failure by itself does not cause a broad destructive rollback. Repairs are limited to verified local Golden-owned state.

## Operator commands

```bash
sikhadenge-funnel-lockctl status
sikhadenge-funnel-lockctl check
sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl reseal
sikhadenge-funnel-lockctl lock
```

### Intentional page update procedure

Never edit a locked funnel as an ordinary production hotfix. Use this sequence:

```bash
sikhadenge-funnel-lockctl unlock 15
# make the intended AI Video / Claude change
# run production + browser QA
sikhadenge-funnel-lockctl reseal
```

The unlock window auto-expires; the guard resumes when it expires. `reseal` refuses to create a new Golden state unless both pages and every linked CSS/JS asset are healthy.

## Runtime files

- Guard: `/usr/local/sbin/sikhadenge-funnel-golden-guard`
- Seal utility: `/usr/local/sbin/sikhadenge-funnel-seal-current`
- Control utility: `/usr/local/sbin/sikhadenge-funnel-lockctl`
- Golden state: `/var/lib/sikhadenge-funnel-golden-lock/current`
- Guard log: `/var/log/sikhadenge-funnel-golden-lock.log`
- Timer: `sikhadenge-funnel-golden-guard.timer`
- Service: `sikhadenge-funnel-golden-guard.service`

## Verification completed at installation

The installation was accepted only after:

- both public pages returned HTTP 200;
- all 49 linked CSS/JS assets passed integrity checks;
- 53 directly owned source/config files were captured;
- the known AI Video CSS/page-JS failure assets matched their approved hashes;
- a controlled no-reload Nginx drift fire-drill was automatically detected and repaired;
- final Chromium checks passed on 1440px desktop and 390px mobile for both pages with zero failed CSS/JS requests and zero horizontal overflow.

## Important limitation

No web system can be guaranteed to have zero errors forever because DNS, CDN, provider, network and hardware failures can occur outside the application. This lock is designed to prevent and automatically repair the known local failure classes while keeping recovery narrow and reversible.
