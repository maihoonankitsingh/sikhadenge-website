# Claude Hero V7 Professional

Scope: `/masterclass/claude/free` hero/first screen only.

## Design direction
- Balanced 49/51 desktop composition.
- No giant image canvas or oversized rectangle.
- Existing Claude workflow DOM is reused and restyled as the premium product visual.
- One unified date/time/format information bar instead of three detached cards.
- One dominant primary CTA and a quiet secondary CTA.
- Warm Claude-inspired editorial palette, restrained gradients, subtle depth and whitespace.
- Tablet and mobile breakpoints included.
- No registration URL, form backend, tracking, payment, WhatsApp or other funnel logic is changed.

## Installation
Upload this folder to the server, then run:

```bash
cd /path/to/Claude_Hero_V7_Professional
python3 install_v7.py
```

The installer only modifies source files and creates a backup. It does not build or restart PM2.

After source installation, use the existing isolated hard-link staging build process. Do not duplicate the 8 GB `public` directory with a normal rsync copy.
