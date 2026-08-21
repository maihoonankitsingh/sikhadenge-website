import { spawn, spawnSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, ".tmp", "phase15-visual-qa");
const chromeProfile = path.join(root, ".tmp", "phase15-chrome-profile");
const port = Number(process.env.PHASE15_QA_PORT || 3001);
const baseUrl = `http://127.0.0.1:${port}`;
const debuggingPort = Number(process.env.PHASE15_CDP_PORT || 9222);

const routes = [
  { key: "chatgpt", path: "/masterclass/chatgpt/free" },
  { key: "claude", path: "/masterclass/claude/free" },
];

const viewports = [
  { key: "375", width: 375, height: 812 },
  { key: "430", width: 430, height: 932 },
  { key: "768", width: 768, height: 1024 },
  { key: "834", width: 834, height: 1112 },
  { key: "1366", width: 1366, height: 768 },
  { key: "1440", width: 1440, height: 900 },
  { key: "1920", width: 1920, height: 1080 },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function findChrome() {
  for (const binary of ["google-chrome-stable", "google-chrome", "chromium", "chromium-browser"]) {
    const result = spawnSync("which", [binary], { encoding: "utf8" });
    if (result.status === 0 && result.stdout.trim()) return result.stdout.trim();
  }
  throw new Error("No Chrome/Chromium binary found on the runner");
}

async function waitForHttp(url, timeoutMs = 45000) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { redirect: "manual" });
      if (response.status >= 200 && response.status < 500) return response;
    } catch (error) {
      lastError = error;
    }
    await sleep(350);
  }
  throw new Error(`Timed out waiting for ${url}${lastError ? `: ${lastError.message}` : ""}`);
}

async function waitForJson(url, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch (error) {
      lastError = error;
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${url}${lastError ? `: ${lastError.message}` : ""}`);
}

class CdpClient {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.nextId = 1;
    this.pending = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("CDP websocket connect timeout")), 10000);
      this.ws.addEventListener("open", () => {
        clearTimeout(timer);
        resolve();
      }, { once: true });
      this.ws.addEventListener("error", (event) => {
        clearTimeout(timer);
        reject(event.error || new Error("CDP websocket connection failed"));
      }, { once: true });
    });

    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id) return;
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
      else pending.resolve(message.result || {});
    });
  }

  send(method, params = {}) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return Promise.reject(new Error(`CDP is not connected for ${method}`));
    }
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, method });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.ws && this.ws.readyState <= WebSocket.OPEN) this.ws.close();
  }
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) throw new Error(`Runtime evaluation failed: ${JSON.stringify(result.exceptionDetails)}`);
  return result.result?.value;
}

async function waitForDocument(client, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const state = await evaluate(client, "document.readyState");
      if (state === "complete") {
        await sleep(650);
        return;
      }
    } catch {
      // Navigation can temporarily invalidate the execution context.
    }
    await sleep(200);
  }
  throw new Error("Timed out waiting for document.readyState=complete");
}

const metricsExpression = String.raw`(() => {
  const doc = document.documentElement;
  const body = document.body;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isVisible = (el) => {
    const style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity || 1) > 0 && rect.width > 0 && rect.height > 0;
  };
  const rect = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height, left: r.left, right: r.right, top: r.top, bottom: r.bottom };
  };
  const name = (el) => {
    const cls = typeof el.className === "string" ? el.className.trim().replace(/\s+/g, ".") : "";
    return [el.tagName.toLowerCase(), el.id ? `#${el.id}` : "", cls ? `.${cls}` : ""].join("");
  };

  const overflowOffenders = [...document.querySelectorAll("*")]
    .filter(isVisible)
    .map((el) => ({ el, r: el.getBoundingClientRect(), style: getComputedStyle(el) }))
    .filter(({ r, style }) => style.position !== "fixed" && (r.right > viewportWidth + 1 || r.left < -1))
    .slice(0, 30)
    .map(({ el, r }) => ({ selector: name(el), text: (el.innerText || "").trim().slice(0, 120), left: r.left, right: r.right, width: r.width }));

  const smallTargets = [...document.querySelectorAll("a,button,input,select,textarea,summary")]
    .filter(isVisible)
    .filter((el) => !(el instanceof HTMLInputElement && ["checkbox", "radio", "hidden"].includes(el.type)))
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.width < 44 || r.height < 44)
    .slice(0, 60)
    .map(({ el, r }) => ({ selector: name(el), text: (el.innerText || el.value || "").trim().slice(0, 120), width: r.width, height: r.height }));

  const stickyCta = document.querySelector(".funnel-mobile-sticky, .funnel-mobile-sticky-cta, [class*='mobile-sticky']");
  const hero = document.querySelector(".funnel-hero");
  const heroVisual = document.querySelector(".funnel-hero-visual");
  const h1 = document.querySelector(".funnel-hero h1");
  const announcement = document.querySelector(".funnel-announcement");
  const registerCard = document.querySelector(".funnel-register-card");
  const agenda = document.querySelector(".funnel-agenda-layout");
  const transformation = document.querySelector(".funnel-transformation-board");

  return {
    url: location.href,
    title: document.title,
    viewport: { width: viewportWidth, height: viewportHeight },
    page: {
      scrollWidth: doc.scrollWidth,
      scrollHeight: doc.scrollHeight,
      bodyScrollWidth: body.scrollWidth,
      horizontalOverflow: doc.scrollWidth > viewportWidth + 1,
    },
    hero: hero ? rect(hero) : null,
    heroH1: h1 ? { ...rect(h1), text: h1.innerText.trim(), fontSize: getComputedStyle(h1).fontSize, lineHeight: getComputedStyle(h1).lineHeight } : null,
    heroVisual: heroVisual ? rect(heroVisual) : null,
    announcement: announcement ? rect(announcement) : null,
    agenda: agenda ? rect(agenda) : null,
    transformation: transformation ? rect(transformation) : null,
    registerCard: registerCard ? rect(registerCard) : null,
    stickyCta: stickyCta && isVisible(stickyCta) ? rect(stickyCta) : null,
    overflowOffenders,
    smallTargets,
  };
})()`;

async function capture(client, route, viewport) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.width <= 834,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });
  await client.send("Page.navigate", { url: `${baseUrl}${route.path}` });
  await waitForDocument(client);

  const metrics = await evaluate(client, metricsExpression);
  const layout = await client.send("Page.getLayoutMetrics");
  const content = layout.cssContentSize || layout.contentSize;
  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
    clip: {
      x: 0,
      y: 0,
      width: Math.ceil(content.width),
      height: Math.ceil(content.height),
      scale: 1,
    },
  });

  const fileName = `${route.key}-${viewport.key}.png`;
  await writeFile(path.join(outDir, fileName), Buffer.from(screenshot.data, "base64"));
  return { route: route.path, viewport, screenshot: fileName, metrics };
}

async function main() {
  await rm(outDir, { recursive: true, force: true });
  await rm(chromeProfile, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await mkdir(chromeProfile, { recursive: true });

  const server = spawn(process.execPath, [path.join(root, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(port)], {
    cwd: root,
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const serverLogs = [];
  server.stdout.on("data", (chunk) => serverLogs.push(chunk.toString()));
  server.stderr.on("data", (chunk) => serverLogs.push(chunk.toString()));

  let chrome;
  let client;
  try {
    await waitForHttp(`${baseUrl}/masterclass/chatgpt/free`);

    const chromeBinary = findChrome();
    chrome = spawn(chromeBinary, [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      `--remote-debugging-port=${debuggingPort}`,
      `--user-data-dir=${chromeProfile}`,
      "about:blank",
    ], { stdio: ["ignore", "pipe", "pipe"] });

    await waitForJson(`http://127.0.0.1:${debuggingPort}/json/version`);
    const targetResponse = await fetch(`http://127.0.0.1:${debuggingPort}/json/new?about:blank`, { method: "PUT" });
    if (!targetResponse.ok) throw new Error(`Unable to create Chrome target: ${targetResponse.status}`);
    const target = await targetResponse.json();

    client = new CdpClient(target.webSocketDebuggerUrl);
    await client.connect();
    await client.send("Page.enable");
    await client.send("Runtime.enable");

    const captures = [];
    for (const route of routes) {
      for (const viewport of viewports) {
        process.stdout.write(`Phase 15 visual QA: ${route.key} @ ${viewport.key}px\n`);
        captures.push(await capture(client, route, viewport));
      }
    }

    const failures = captures.flatMap((capture) => {
      const messages = [];
      if (capture.metrics.page.horizontalOverflow) {
        messages.push(`${capture.route} @ ${capture.viewport.key}px has horizontal overflow (${capture.metrics.page.scrollWidth}px > ${capture.metrics.viewport.width}px)`);
      }
      return messages;
    });

    const report = {
      generatedAt: new Date().toISOString(),
      headSha: process.env.GITHUB_SHA || null,
      baseUrl,
      captures,
      failures,
    };
    await writeFile(path.join(outDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
    await writeFile(path.join(outDir, "server.log"), serverLogs.join(""));

    if (failures.length) {
      throw new Error(`Phase 15 responsive QA failed:\n${failures.join("\n")}`);
    }
  } finally {
    if (client) client.close();
    if (chrome && !chrome.killed) chrome.kill("SIGTERM");
    if (!server.killed) server.kill("SIGTERM");
    await sleep(350);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
