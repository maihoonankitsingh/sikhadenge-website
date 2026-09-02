#!/usr/bin/env bash
set -Eeuo pipefail

: "${SSH_HOST:?missing SSH_HOST}"
: "${SSH_USER:?missing SSH_USER}"
: "${SSH_PORT:?missing SSH_PORT}"

KEY="$HOME/.ssh/prod"

ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeuo pipefail
export TZ=Asia/Kolkata

SITE="/etc/nginx/sites-enabled/sikhadenge.in-ssl"
REG="/etc/nginx/snippets/sikhadenge-registration-v2-hot.conf"
AV="/etc/nginx/snippets/sikhadenge-ai-video-3940.conf"
SP="/var/www/sikhadenge.in/social-proof-live/server.js"
ASSET_DIR="/var/www/sikhadenge.in/sitewide-live-proof-v1"
ASSET="$ASSET_DIR/sitewide-live-proof-v1.js"

EXPECT_SITE_SHA="c28e02f69daf6bc4f1bc7698441e7e35f93ce170dffcf10479796cc3491f6077"
EXPECT_REG_SHA="8001bd6eeb891374ee5ed8ca7c121688c0af7a12a07a06a9174e768282f39236"
EXPECT_AV_SHA="3a06aea30f25ed648c6c9115870f72ca4b3d74d8177af1f67af9a0637022d690"
EXPECT_SP_SHA="739a494cbc745fdb31da91488820156df9ee161acfecd3a93eb5a47443ed94ee"
EXPECT_PAGE1_SHA="13b891266630475342cd63ca28e5336d6b137b13490d6c13c3ddff71088fe592"
EXPECT_HOT_SHA="6e6361e54b575178cf6cad115234ab3e9c5d25d666a9e89df5a11001eab9c3d0"

TS="$(date +%Y%m%d-%H%M%S)"
TAG="sitewide-live-proof-v1-${TS}"
MARKER="SIKHADENGE_SITEWIDE_LIVE_PROOF_V1"

PAGE1="$(awk '/location = \/registration-v2-page1\.js/ {f=1} f && /alias / {gsub(";", "", $2); print $2; exit}' "$REG")"
HOT="$(awk '/location = \/registration-v2-hot\.js/ {f=1} f && /alias / {gsub(";", "", $2); print $2; exit}' "$REG")"

test -f "$SITE"
test -f "$REG"
test -f "$AV"
test -f "$SP"
test -f "$PAGE1"
test -f "$HOT"

echo '===== 1. IMMUTABLE GUARDS ====='
SITE_SHA="$(sha256sum "$SITE" | awk '{print $1}')"
REG_SHA="$(sha256sum "$REG" | awk '{print $1}')"
AV_SHA="$(sha256sum "$AV" | awk '{print $1}')"
SP_SHA="$(sha256sum "$SP" | awk '{print $1}')"
PAGE1_SHA="$(sha256sum "$PAGE1" | awk '{print $1}')"
HOT_SHA="$(sha256sum "$HOT" | awk '{print $1}')"
printf 'site=%s\nreg=%s\nav=%s\nsp=%s\npage1=%s\nhot=%s\n' "$SITE_SHA" "$REG_SHA" "$AV_SHA" "$SP_SHA" "$PAGE1_SHA" "$HOT_SHA"
test "$SITE_SHA" = "$EXPECT_SITE_SHA"
test "$REG_SHA" = "$EXPECT_REG_SHA"
test "$AV_SHA" = "$EXPECT_AV_SHA"
test "$SP_SHA" = "$EXPECT_SP_SHA"
test "$PAGE1_SHA" = "$EXPECT_PAGE1_SHA"
test "$HOT_SHA" = "$EXPECT_HOT_SHA"
! grep -Fq "$MARKER" "$SITE"
! grep -Fq "$MARKER" "$REG"
! grep -Fq "$MARKER" "$AV"
! grep -Fq "$MARKER" "$SP"
echo 'guards=PASS'

echo '===== 2. FRESH ROLLBACK BACKUP ====='
BK="/var/backups/sikhadenge/sitewide-live-proof-v1-${TS}"
mkdir -p "$BK"
cp -a "$SITE" "$BK/sikhadenge.in-ssl.before"
cp -a "$REG" "$BK/sikhadenge-registration-v2-hot.conf.before"
cp -a "$AV" "$BK/sikhadenge-ai-video-3940.conf.before"
cp -a "$SP" "$BK/social-proof-server.js.before"
if [ -f "$ASSET" ]; then cp -a "$ASSET" "$BK/sitewide-live-proof-v1.js.before"; fi
sha256sum "$SITE" "$REG" "$AV" "$SP" "$PAGE1" "$HOT" > "$BK/before.sha256"
echo "backup=$BK"

rollback() {
  set +e
  echo 'AUTO_ROLLBACK_START'
  cp -a "$BK/sikhadenge.in-ssl.before" "$SITE"
  cp -a "$BK/sikhadenge-registration-v2-hot.conf.before" "$REG"
  cp -a "$BK/sikhadenge-ai-video-3940.conf.before" "$AV"
  cp -a "$BK/social-proof-server.js.before" "$SP"
  if [ -f "$BK/sitewide-live-proof-v1.js.before" ]; then
    mkdir -p "$ASSET_DIR"
    cp -a "$BK/sitewide-live-proof-v1.js.before" "$ASSET"
  else
    rm -f "$ASSET"
  fi
  pm2 restart sikhadenge-social-proof-live >/dev/null 2>&1 || true
  nginx -t && systemctl reload nginx
  echo 'AUTO_ROLLBACK_DONE'
}
trap 'rc=$?; if [ $rc -ne 0 ]; then rollback; fi; exit $rc' EXIT

echo '===== 3. SOCIAL PROOF API V1 ====='
cat > "$SP" <<'SERVERJS'
"use strict";

/* SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_API_START */

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ACTIVE =
  "/var/www/sikhadenge.in/releases/production-ai-video-icons-hotfix-20260829-091916";

const PORT = 3944;
const IST_OFFSET = 330 * 60 * 1000;
const CACHE_MS = 2000;

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  const txt = fs.readFileSync(file, "utf8");

  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;

    const i = line.indexOf("=");
    if (i < 1) continue;

    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv(path.join(ACTIVE, ".env.local"));
loadEnv(path.join(ACTIVE, ".env.production"));
loadEnv(path.join(ACTIVE, ".env"));

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL missing");
}

const { PrismaClient } = require(
  path.join(ACTIVE, "node_modules/@prisma/client")
);

const prisma = new PrismaClient();

function midnightIST(daysAgo = 0) {
  const shifted = new Date(Date.now() + IST_OFFSET);
  return new Date(
    Date.UTC(
      shifted.getUTCFullYear(),
      shifted.getUTCMonth(),
      shifted.getUTCDate() - daysAgo
    ) - IST_OFFSET
  );
}

function publicFirstName(value) {
  const normalized = String(value || "")
    .normalize("NFKC")
    .replace(/[^\p{L}\p{M}'’ -]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  const first = normalized.split(" ").filter(Boolean)[0] || "Learner";
  return first.slice(0, 24);
}

function eventKey(lead) {
  if (!lead) return null;
  return crypto
    .createHash("sha256")
    .update(`${String(lead.id)}|${new Date(lead.createdAt).toISOString()}`)
    .digest("hex")
    .slice(0, 20);
}

async function queryStats() {
  const todayStart = midnightIST(0);
  const tomorrow = new Date(todayStart.getTime() + 86400000);
  const start30 = midnightIST(29);

  const [recent30d, todayActual, currentDbTotal, latest] =
    await Promise.all([
      prisma.masterclassLead.count({
        where: {
          createdAt: { gte: start30, lt: tomorrow }
        }
      }),
      prisma.masterclassLead.count({
        where: {
          createdAt: { gte: todayStart, lt: tomorrow }
        }
      }),
      prisma.masterclassLead.count(),
      prisma.masterclassLead.findFirst({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          createdAt: true
        }
      })
    ]);

  return {
    ok: true,
    recent30d,
    todayActual,
    currentDbTotal,
    totalLearners: 500000,
    window: "30d",
    timezone: "Asia/Kolkata",
    latestRegistration: latest
      ? {
          eventKey: eventKey(latest),
          name: publicFirstName(latest.name),
          createdAt: new Date(latest.createdAt).toISOString()
        }
      : null,
    updatedAt: new Date().toISOString()
  };
}

let cachedValue = null;
let cachedAt = 0;
let inflight = null;

async function getStats() {
  const now = Date.now();
  if (cachedValue && now - cachedAt < CACHE_MS) return cachedValue;
  if (inflight) return inflight;

  inflight = queryStats()
    .then((value) => {
      cachedValue = value;
      cachedAt = Date.now();
      return value;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

function json(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    "Pragma": "no-cache",
    "Expires": "0",
    "X-Content-Type-Options": "nosniff",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1");

    if (req.method === "GET" && url.pathname === "/healthz") {
      return json(res, 200, { ok: true });
    }

    if (
      req.method === "GET" &&
      url.pathname === "/api/social-proof/live"
    ) {
      return json(res, 200, await getStats());
    }

    return json(res, 404, { ok: false });
  } catch (error) {
    console.error("SOCIAL_PROOF_ERROR", error);
    return json(res, 500, { ok: false });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("Social proof listening on 3944");
});

async function shutdown() {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

/* SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_API_END */
SERVERJS

node --check "$SP"
grep -Fq 'SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_API_START' "$SP"
echo 'social_proof_source=PASS'

echo '===== 4. GLOBAL WIDGET ASSET ====='
mkdir -p "$ASSET_DIR"
cat > "$ASSET" <<'WIDGETJS'
/* SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_WIDGET_START */
;(() => {
  "use strict";

  if (window.__SIKHADENGE_SITEWIDE_LIVE_PROOF_V1__) return;
  window.__SIKHADENGE_SITEWIDE_LIVE_PROOF_V1__ = true;

  const API = "/api/social-proof/live";
  const POLL_VISIBLE_MS = 5000;
  const POLL_HIDDEN_MS = 30000;
  const REGISTRATION_PATH = "/gen-ai-masterclass/register-one-step";

  let currentData = null;
  let baselineReady = false;
  let lastEventKey = null;
  let timer = 0;
  let stopped = false;

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function fmt(value) {
    const n = Number(value || 0);
    return Number.isFinite(n) ? n.toLocaleString("en-IN") : "0";
  }

  function latest(data) {
    const item = data && data.latestRegistration;
    if (!item || !item.eventKey || !item.name) return null;
    return item;
  }

  function ensureInlineStyle() {
    if (document.getElementById("sd-sitewide-live-proof-inline-v1-style")) return;
    const style = document.createElement("style");
    style.id = "sd-sitewide-live-proof-inline-v1-style";
    style.textContent = `
      .sd-sitewide-latest-inline-v1{
        display:flex!important;
        align-items:center!important;
        gap:6px!important;
        margin-top:3px!important;
        font-size:10.5px!important;
        line-height:1.25!important;
        color:inherit!important;
        opacity:.86!important;
      }
      .sd-sitewide-latest-inline-v1-dot{
        width:6px!important;
        height:6px!important;
        flex:0 0 6px!important;
        border-radius:999px!important;
        background:#22c55e!important;
        box-shadow:0 0 0 3px rgba(34,197,94,.12)!important;
      }
      .sd-sitewide-latest-inline-v1 strong{
        font-weight:700!important;
      }
    `;
    document.head.appendChild(style);
  }

  function enhanceRegistrationCard(data) {
    if (location.pathname !== REGISTRATION_PATH) return false;

    const card = document.querySelector(".sd-real-live-card");
    if (!card) return true;

    const info = latest(data);
    if (!info) return true;

    ensureInlineStyle();

    let row = card.querySelector(".sd-sitewide-latest-inline-v1");
    if (!row) {
      row = document.createElement("div");
      row.className = "sd-sitewide-latest-inline-v1";
      const textHost = card.querySelector(".sd-real-text") || card;
      textHost.appendChild(row);
    }

    row.innerHTML = `
      <span class="sd-sitewide-latest-inline-v1-dot" aria-hidden="true"></span>
      <span>Latest: <strong>${esc(info.name)}</strong> registered</span>
    `;

    return true;
  }

  function createHost() {
    let host = document.getElementById("sd-sitewide-live-proof-host-v1");
    if (host) return host;

    host = document.createElement("div");
    host.id = "sd-sitewide-live-proof-host-v1";
    host.setAttribute("aria-live", "polite");
    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host{
          all:initial;
          position:fixed;
          left:18px;
          bottom:18px;
          width:318px;
          z-index:2147482000;
          pointer-events:none;
          font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          -webkit-font-smoothing:antialiased;
        }
        *{box-sizing:border-box}
        .card{
          pointer-events:auto;
          width:100%;
          min-height:86px;
          display:grid;
          grid-template-columns:18px minmax(0,1fr) auto;
          grid-template-rows:auto auto auto;
          column-gap:10px;
          row-gap:1px;
          padding:12px 13px;
          border:1px solid rgba(226,96,69,.40);
          border-radius:18px;
          background:rgba(255,249,245,.97);
          color:#171717;
          box-shadow:0 14px 38px rgba(15,23,42,.14);
          backdrop-filter:blur(12px);
        }
        .pulse{
          grid-row:1 / 4;
          align-self:center;
          width:13px;height:13px;border-radius:999px;
          background:#51d88a;
          box-shadow:0 0 0 7px rgba(81,216,138,.15);
        }
        .title{
          font-size:11px;
          line-height:14px;
          font-weight:800;
          letter-spacing:.045em;
          text-transform:uppercase;
          color:#cf553e;
        }
        .live{
          align-self:start;
          display:inline-flex;
          align-items:center;
          gap:5px;
          padding:5px 9px;
          border-radius:999px;
          background:#16a34a;
          color:#fff;
          font-size:10px;
          line-height:1;
          font-weight:800;
          letter-spacing:.04em;
        }
        .live::before{
          content:"";
          width:6px;height:6px;border-radius:999px;background:#fff;
        }
        .countrow{
          grid-column:2 / 4;
          display:flex;
          align-items:baseline;
          gap:6px;
          min-width:0;
        }
        .number{
          font-size:25px;
          line-height:28px;
          font-weight:800;
          letter-spacing:-.04em;
          color:#cf553e;
        }
        .desc{
          font-size:11px;
          line-height:14px;
          color:#333;
          white-space:nowrap;
        }
        .foot{
          grid-column:2 / 4;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:8px;
          min-width:0;
          margin-top:2px;
          font-size:10px;
          line-height:13px;
          color:#777;
        }
        .latest{
          min-width:0;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          color:#4b5563;
        }
        .latest strong{color:#202020;font-weight:750}
        .auto{white-space:nowrap;color:#8a8a8a}
        .toast{
          position:absolute;
          left:0;
          bottom:104px;
          width:100%;
          display:flex;
          align-items:center;
          gap:10px;
          padding:11px 12px;
          border:1px solid rgba(34,197,94,.25);
          border-radius:15px;
          background:rgba(255,255,255,.98);
          color:#111827;
          box-shadow:0 16px 42px rgba(15,23,42,.18);
          opacity:0;
          transform:translateY(10px);
          visibility:hidden;
          transition:opacity .22s ease,transform .22s ease,visibility .22s;
        }
        .toast.show{opacity:1;transform:translateY(0);visibility:visible}
        .toastdot{
          width:10px;height:10px;border-radius:999px;background:#22c55e;
          box-shadow:0 0 0 5px rgba(34,197,94,.12);
          flex:0 0 10px;
        }
        .toastcopy{min-width:0}
        .toastlabel{
          display:block;
          margin-bottom:1px;
          font-size:9px;
          line-height:12px;
          font-weight:800;
          letter-spacing:.06em;
          text-transform:uppercase;
          color:#16a34a;
        }
        .toasttext{
          display:block;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          font-size:12px;
          line-height:16px;
          font-weight:650;
        }
        @media(max-width:640px){
          :host{
            left:12px;
            bottom:calc(12px + env(safe-area-inset-bottom,0px));
            width:min(336px,calc(100vw - 24px));
          }
          .card{border-radius:16px;padding:11px 12px}
          .number{font-size:23px;line-height:26px}
          .desc{font-size:10.5px}
        }
        @media(prefers-reduced-motion:reduce){
          .toast{transition:none}
        }
      </style>
      <div class="toast" role="status">
        <span class="toastdot" aria-hidden="true"></span>
        <span class="toastcopy">
          <span class="toastlabel">New registration</span>
          <span class="toasttext"></span>
        </span>
      </div>
      <div class="card">
        <span class="pulse" aria-hidden="true"></span>
        <span class="title">Live Activity</span>
        <span class="live">LIVE</span>
        <div class="countrow">
          <strong class="number">—</strong>
          <span class="desc">joined in last 30 days</span>
        </div>
        <div class="foot">
          <span class="latest">Latest registration loading…</span>
          <span class="auto">Updates automatically</span>
        </div>
      </div>
    `;

    return host;
  }

  function renderFloating(data) {
    const isRegistration = location.pathname === REGISTRATION_PATH;
    const host = createHost();
    const root = host.shadowRoot;
    const card = root.querySelector(".card");

    card.style.display = isRegistration ? "none" : "grid";

    const number = root.querySelector(".number");
    const latestNode = root.querySelector(".latest");
    if (number) number.textContent = fmt(data.recent30d);

    const info = latest(data);
    if (latestNode) {
      latestNode.innerHTML = info
        ? `Latest: <strong>${esc(info.name)}</strong> registered`
        : "Live registrations updating";
    }
  }

  let toastTimer = 0;

  function showToast(info) {
    if (!info) return;
    const host = createHost();
    const root = host.shadowRoot;
    const toast = root.querySelector(".toast");
    const text = root.querySelector(".toasttext");
    if (!toast || !text) return;

    text.textContent = `${info.name} just registered`;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 4800);
  }

  function render(data) {
    currentData = data;
    enhanceRegistrationCard(data);
    renderFloating(data);
  }

  async function fetchData() {
    const controller = new AbortController();
    const abortTimer = window.setTimeout(() => controller.abort(), 4500);

    try {
      const response = await fetch(`${API}?v=${Date.now()}`, {
        method: "GET",
        cache: "no-store",
        credentials: "same-origin",
        headers: { Accept: "application/json" },
        signal: controller.signal
      });

      if (!response.ok) return null;
      const data = await response.json();
      if (!data || data.ok !== true) return null;
      return data;
    } catch (_) {
      return null;
    } finally {
      clearTimeout(abortTimer);
    }
  }

  async function refresh() {
    if (stopped) return;

    const data = await fetchData();
    if (data) {
      const info = latest(data);
      render(data);

      if (!baselineReady) {
        baselineReady = true;
        lastEventKey = info ? info.eventKey : null;
      } else if (info && info.eventKey !== lastEventKey) {
        lastEventKey = info.eventKey;
        showToast(info);
      }
    }

    const delay = document.visibilityState === "visible"
      ? POLL_VISIBLE_MS
      : POLL_HIDDEN_MS;

    clearTimeout(timer);
    timer = window.setTimeout(refresh, delay);
  }

  function boot() {
    createHost();
    refresh();

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        clearTimeout(timer);
        refresh();
      }
    });

    const observer = new MutationObserver(() => {
      if (currentData && location.pathname === REGISTRATION_PATH) {
        enhanceRegistrationCard(currentData);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    window.addEventListener("pagehide", () => {
      stopped = true;
      clearTimeout(timer);
    }, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
/* SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_WIDGET_END */
WIDGETJS

node --check "$ASSET"
grep -Fq 'SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_WIDGET_START' "$ASSET"
echo 'widget_asset=PASS'

echo '===== 5. PATCH NGINX INJECTION ====='
export SITE REG AV ASSET TAG
python3 <<'PY'
from pathlib import Path
import os

site = Path(os.environ["SITE"])
reg = Path(os.environ["REG"])
av = Path(os.environ["AV"])
tag = os.environ["TAG"]
asset = os.environ["ASSET"]
script = f'<script src="/sitewide-live-proof-v1.js?v={tag}"></script>'

# ---- Main server ----
s = site.read_text(encoding="utf-8")
anchor = "  # SIKHADENGE_REGISTRATION_V2_HOT\n  include /etc/nginx/snippets/sikhadenge-registration-v2-hot.conf;\n"
if s.count(anchor) != 1:
    raise SystemExit(f"site include anchor count={s.count(anchor)}")
asset_block = f'''\n  # SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_ASSET_START\n  location = /sitewide-live-proof-v1.js {{\n    alias {asset};\n    default_type application/javascript;\n    add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;\n    add_header X-SD-Sitewide-Live-Proof "v1" always;\n    access_log off;\n  }}\n  # SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_ASSET_END\n'''
s = s.replace(anchor, anchor + asset_block, 1)

# Claude exact route.
claude_start = s.index("    location = /masterclass/claude/free {")
claude_end = s.index("\n    }", claude_start) + len("\n    }")
claude = s[claude_start:claude_end]
if 'proxy_set_header Accept-Encoding "";' not in claude:
    raise SystemExit("Claude Accept-Encoding guard missing")
claude_anchor = "        proxy_connect_timeout 10s;"
if claude.count(claude_anchor) != 1:
    raise SystemExit("Claude anchor mismatch")
claude_inject = f'''        # SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_CLAUDE_START\n        sub_filter_once on;\n        sub_filter '</body>' '{script}</body>';\n        # SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_CLAUDE_END\n\n'''
claude = claude.replace(claude_anchor, claude_inject + claude_anchor, 1)
s = s[:claude_start] + claude + s[claude_end:]

# Main public location /. Private dashboard/admin/auth remains untouched.
main_start = s.rfind("  location / {")
if main_start < 0:
    raise SystemExit("main location / not found")
main_end = s.index("\n  }", main_start) + len("\n  }")
main = s[main_start:main_end]
main_anchor = "    proxy_set_header X-Forwarded-Proto $scheme;"
if main.count(main_anchor) != 1:
    raise SystemExit(f"main forwarded proto count={main.count(main_anchor)}")
main_inject = f'''    # SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_MAIN_START\n    proxy_set_header Accept-Encoding "";\n    sub_filter_once on;\n    sub_filter '</body>' '{script}</body>';\n    # SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_MAIN_END\n'''
main = main.replace(main_anchor, main_anchor + "\n\n" + main_inject, 1)
s = s[:main_start] + main + s[main_end:]

# Static public learn-directory HTML also gets the widget.
dir_start = s.find("  location ~ ^/learn-directory-[0-9][0-9][0-9]\\.html$ {")
if dir_start >= 0:
    dir_end = s.index("\n  }", dir_start) + len("\n  }")
    block = s[dir_start:dir_end]
    anchor2 = "    default_type text/html;"
    if block.count(anchor2) != 1:
        raise SystemExit("learn-directory anchor mismatch")
    inject2 = f'''    # SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_STATIC_HTML_START\n    sub_filter_once on;\n    sub_filter '</body>' '{script}</body>';\n    # SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_STATIC_HTML_END\n'''
    block = block.replace(anchor2, anchor2 + "\n" + inject2, 1)
    s = s[:dir_start] + block + s[dir_end:]

site.write_text(s, encoding="utf-8")

# ---- AI Video special HTML route ----
a = av.read_text(encoding="utf-8")
av_start = a.index("location = /masterclass/ai-video {")
av_end = a.index("\n}", av_start) + len("\n}")
block = a[av_start:av_end]
av_anchor = "    proxy_set_header X-Forwarded-Proto $scheme;"
if block.count(av_anchor) != 1:
    raise SystemExit("AI Video forwarded proto anchor mismatch")
av_inject = f'''    # SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_AI_VIDEO_START\n    proxy_set_header Accept-Encoding "";\n    sub_filter_once on;\n    sub_filter '</body>' '{script}</body>';\n    # SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_AI_VIDEO_END\n'''
block = block.replace(av_anchor, av_anchor + "\n\n" + av_inject, 1)
a = a[:av_start] + block + a[av_end:]
av.write_text(a, encoding="utf-8")

# ---- Registration exact HTML route: extend existing body injection only ----
r = reg.read_text(encoding="utf-8")
needle = "<script src=\"/registration-v2-page1.js?v=v71-restore-pre-dropdown-20260902-192436\"></script></body>"
replacement = f"<script src=\"/registration-v2-page1.js?v=v71-restore-pre-dropdown-20260902-192436\"></script>{script}</body>"
if r.count(needle) != 1:
    raise SystemExit(f"registration body injection anchor count={r.count(needle)}")
r = r.replace(needle, replacement, 1)
r = r.replace(
    "# SIKHADENGE_REGISTRATION_V2_HOT_END",
    "# SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_REGISTRATION\n# SIKHADENGE_REGISTRATION_V2_HOT_END",
    1,
)
reg.write_text(r, encoding="utf-8")
PY

grep -Fq 'SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_MAIN_START' "$SITE"
grep -Fq 'SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_CLAUDE_START' "$SITE"
grep -Fq 'SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_AI_VIDEO_START' "$AV"
grep -Fq 'SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_REGISTRATION' "$REG"
echo 'nginx_patch_markers=PASS'

echo '===== 6. RESTART SOCIAL PROOF + API VERIFY ====='
pm2 restart sikhadenge-social-proof-live >/dev/null
for i in $(seq 1 20); do
  if curl -fsS http://127.0.0.1:3944/healthz >/dev/null 2>&1; then break; fi
  sleep 0.5
done
curl -fsS http://127.0.0.1:3944/healthz | grep -Fq '"ok":true'

API_TMP="/tmp/sd-sitewide-api-${TS}.json"
curl -fsS http://127.0.0.1:3944/api/social-proof/live -o "$API_TMP"
node - "$API_TMP" <<'NODE'
const fs=require('fs');
const p=process.argv[2];
const o=JSON.parse(fs.readFileSync(p,'utf8'));
if(o.ok!==true) throw new Error('api ok false');
if(typeof o.recent30d!=='number') throw new Error('recent30d missing');
if(o.latestRegistration){
  if(typeof o.latestRegistration.eventKey!=='string'||!o.latestRegistration.eventKey) throw new Error('eventKey missing');
  if(typeof o.latestRegistration.name!=='string'||!o.latestRegistration.name) throw new Error('public name missing');
  if(/@|\d{6,}/.test(o.latestRegistration.name)) throw new Error('unsafe public name');
  if(typeof o.latestRegistration.createdAt!=='string') throw new Error('createdAt missing');
}
console.log(JSON.stringify({ok:true,recent30dType:typeof o.recent30d,latestShape:o.latestRegistration?Object.keys(o.latestRegistration):null,nameLength:o.latestRegistration?o.latestRegistration.name.length:0}));
NODE
echo 'social_proof_api=PASS'

echo '===== 7. NGINX VERIFY + RELOAD ====='
nginx -t
systemctl reload nginx
echo 'nginx_reload=PASS'

echo '===== 8. PUBLIC ASSET + API ====='
PUB_JS="/tmp/sitewide-live-proof-v1-${TS}.js"
curl -L --compressed -fsS "https://sikhadenge.in/sitewide-live-proof-v1.js?v=${TAG}" -o "$PUB_JS"
node --check "$PUB_JS"
grep -Fq 'SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_WIDGET_START' "$PUB_JS"

PUB_API="/tmp/sitewide-live-proof-public-${TS}.json"
curl -L --compressed -fsS "https://sikhadenge.in/api/social-proof/live?v=${TS}" -o "$PUB_API"
node - "$PUB_API" <<'NODE'
const fs=require('fs');
const o=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
if(o.ok!==true) throw new Error('public api failed');
if(!Object.prototype.hasOwnProperty.call(o,'latestRegistration')) throw new Error('latestRegistration missing');
console.log(JSON.stringify({ok:true,keys:Object.keys(o),latestShape:o.latestRegistration?Object.keys(o.latestRegistration):null}));
NODE

echo '===== 9. HTML INJECTION CHECK ====='
check_page(){
  local label="$1" url="$2" out="/tmp/sd-proof-${label}-${TS}.html"
  curl -L --compressed -fsS "$url" -o "$out"
  grep -Fq "/sitewide-live-proof-v1.js?v=${TAG}" "$out"
  echo "PASS $label"
}
check_page root "https://sikhadenge.in/?proof=${TS}"
check_page about "https://sikhadenge.in/about-us?proof=${TS}"
check_page claude "https://sikhadenge.in/masterclass/claude/free?proof=${TS}"
check_page aivideo "https://sikhadenge.in/masterclass/ai-video?proof=${TS}"
check_page registration "https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=claude-masterclass&proof=${TS}"
check_page registrationai "https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass&proof=${TS}"

echo '===== 10. PRESERVATION ====='
PAGE1_AFTER="$(sha256sum "$PAGE1" | awk '{print $1}')"
HOT_AFTER="$(sha256sum "$HOT" | awk '{print $1}')"
echo "page1_after=$PAGE1_AFTER"
echo "hot_after=$HOT_AFTER"
test "$PAGE1_AFTER" = "$EXPECT_PAGE1_SHA"
test "$HOT_AFTER" = "$EXPECT_HOT_SHA"

echo 'RESULT=SITEWIDE_LIVE_PROOF_V1_LIVE'
echo "BACKUP=$BK"
echo "TAG=$TAG"
trap - EXIT
REMOTE
