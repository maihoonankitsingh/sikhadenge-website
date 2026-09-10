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
8. **Deploy gate** — production mutation tooling must call `sikhadenge-funnel-lockctl assert-unlocked`; while the Golden Lock is active the command blocks with exit code 73. A finite unlock window must be opened deliberately before a protected change.
9. **Legacy workflow quarantine** — historical one-shot AI Video/Claude deploy, restore, hotfix and funnel-tracking workflows that could mutate these production routes were moved out of `.github/workflows` into `ops/legacy-funnel-workflows/`. They remain available only for forensic/history reference and cannot auto-run as Actions workflows from that archive location.
10. **Incident-aware logging** — repair, critical, public fingerprint mismatch and asset mismatch events are persisted as an incident epoch + detail under `/var/lib/sikhadenge-funnel-golden-lock/`.
11. **GitHub failure alerting** — `.github/workflows/funnel-golden-health-monitor.yml` runs every five minutes. It performs a deep guard check and creates a GitHub issue for a new incident or an unresolved health failure, records the incident as alerted, and fails that monitor run for visibility. One incident epoch is alerted only once.

## Operator commands

```bash
sikhadenge-funnel-lockctl status
sikhadenge-funnel-lockctl check
sikhadenge-funnel-lockctl assert-unlocked
sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl reseal
sikhadenge-funnel-lockctl lock
```

### Intentional page update procedure

Never edit a locked funnel as an ordinary production hotfix. Use this sequence:

```bash
sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl assert-unlocked
# make one intended AI Video / Claude change
# run production + desktop/mobile browser QA
sikhadenge-funnel-lockctl reseal
```

The unlock window auto-expires; the guard resumes when it expires. `reseal` refuses to create a new Golden state unless both pages and every linked CSS/JS asset are healthy.

A new GitHub Actions workflow that writes protected funnel state must perform the same `assert-unlocked` gate on the production server before its first mutation. Do not reactivate a file from `ops/legacy-funnel-workflows/` as a production workflow.

## Runtime files

- Guard: `/usr/local/sbin/sikhadenge-funnel-golden-guard`
- Seal utility: `/usr/local/sbin/sikhadenge-funnel-seal-current`
- Control utility: `/usr/local/sbin/sikhadenge-funnel-lockctl`
- Golden state: `/var/lib/sikhadenge-funnel-golden-lock/current`
- Guard log: `/var/log/sikhadenge-funnel-golden-lock.log`
- Last incident epoch: `/var/lib/sikhadenge-funnel-golden-lock/last-incident.epoch`
- Last incident detail: `/var/lib/sikhadenge-funnel-golden-lock/last-incident.txt`
- Last alerted incident: `/var/lib/sikhadenge-funnel-golden-lock/last-alerted-incident.epoch`
- Timer: `sikhadenge-funnel-golden-guard.timer`
- Service: `sikhadenge-funnel-golden-guard.service`
- GitHub monitor: `.github/workflows/funnel-golden-health-monitor.yml`
- Legacy workflow archive: `ops/legacy-funnel-workflows/`

## Verification completed

The protection was accepted only after:

- both public pages returned HTTP 200;
- all 49 linked CSS/JS assets passed integrity checks;
- 53 directly owned source/config files were captured;
- the known AI Video CSS/page-JS failure assets matched their approved hashes;
- a controlled no-reload Nginx drift fire-drill was automatically detected and repaired;
- Chromium checks passed on 1440px desktop and 390px mobile for both pages with zero failed CSS/JS requests and zero horizontal overflow;
- `assert-unlocked` was proven to reject a protected deployment while the lock was active;
- 37 historical page-mutating workflows were quarantined from the active Actions directory;
- the health monitor healthy path passed;
- a synthetic incident-marker test created GitHub issue #167, marked the incident as alerted, and was then closed as a successful test. No production page/config mutation was used for that alert test.

## Important limitation

No web system can be guaranteed to have zero errors forever because DNS, CDN, provider, network and hardware failures can occur outside the application. This lock is designed to prevent and automatically repair the known local failure classes while keeping recovery narrow and reversible.
