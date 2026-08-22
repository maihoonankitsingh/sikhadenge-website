import { spawn, spawnSync } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import net from "node:net";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, ".tmp", "phase15-visual-qa");
const chromeProfile = path.join(root, ".tmp", "phase15-chrome-profile");
const port = Number(process.env.PHASE15_QA_PORT || 3001);
const baseUrl = `http://127.0.0.1:${port}`;
const debuggingPort = Number(process.env.PHASE15_CDP_PORT || 9222);
const WS_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

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

class LocalWebSocket {
  constructor(url) {
    this.url = new URL(url);
    this.socket = null;
    this.buffer = Buffer.alloc(0);
    this.fragmentOpcode = null;
    this.fragments = [];
    this.onMessage = null;
    this.onClose = null;
    this.onError = null;
  }

  async connect(timeoutMs = 10000) {
    if (this.url.protocol !== "ws:") throw new Error(`Only local ws:// CDP URLs are supported: ${this.url.href}`);
    const host = this.url.hostname;
    const port = Number(this.url.port || 80);
    const key = randomBytes(16).toString("base64");
    const expectedAccept = createHash("sha1").update(key + WS_GUID).digest("base64");

    await new Promise((resolve, reject) => {
      let settled = false;
      let handshakeBuffer = Buffer.alloc(0);
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        this.socket?.destroy();
        reject(new Error("CDP websocket handshake timeout"));
      }, timeoutMs);

      const fail = (error) => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          reject(error);
        } else if (this.onError) {
          this.onError(error);
        }
      };

      this.socket = net.createConnection({ host, port }, () => {
        const request = [
          `GET ${this.url.pathname}${this.url.search} HTTP/1.1`,
          `Host: ${host}:${port}`,
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Key: ${key}`,
          "Sec-WebSocket-Version: 13",
          "\r\n",
        ].join("\r\n");
        this.socket.write(request);
      });

      this.socket.on("error", fail);
      this.socket.on("close", () => this.onClose?.());
      this.socket.on("data", (chunk) => {
        if (!settled) {
          handshakeBuffer = Buffer.concat([handshakeBuffer, chunk]);
          const marker = handshakeBuffer.indexOf("\r\n\r\n");
          if (marker === -1) return;
          const headerText = handshakeBuffer.subarray(0, marker).toString("utf8");
          const remainder = handshakeBuffer.subarray(marker + 4);
          const lines = headerText.split("\r\n");
          if (!/^HTTP\/1\.1 101\b/.test(lines[0] || "")) {
            fail(new Error(`CDP websocket upgrade failed: ${lines[0] || "missing status"}`));
            return;
          }
          const headers = new Map(
            lines.slice(1).map((line) => {
              const index = line.indexOf(":");
              return index === -1 ? [line.toLowerCase(), ""] : [line.slice(0, index).trim().toLowerCase(), line.slice(index + 1).trim()];
            }),
          );
          if (headers.get("sec-websocket-accept") !== expectedAccept) {
            fail(new Error("CDP websocket accept key mismatch"));
            return;
          }
          settled = true;
          clearTimeout(timer);
          if (remainder.length) this.consume(remainder);
          resolve();
          return;
        }
        this.consume(chunk);
      });
    });
  }

  consume(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    while (this.buffer.length >= 2) {
      const first = this.buffer[0];
      const second = this.buffer[1];
      const fin = Boolean(first & 0x80);
      const opcode = first & 0x0f;
      const masked = Boolean(second & 0x80);
      let length = second & 0x7f;
      let offset = 2;

      if (length === 126) {
        if (this.buffer.length < 4) return;
        length = this.buffer.readUInt16BE(2);
        offset = 4;
      } else if (length === 127) {
        if (this.buffer.length < 10) return;
        const bigLength = this.buffer.readBigUInt64BE(2);
        if (bigLength > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("CDP websocket frame too large");
        length = Number(bigLength);
        offset = 10;
      }

      let mask;
      if (masked) {
        if (this.buffer.length < offset + 4) return;
        mask = this.buffer.subarray(offset, offset + 4);
        offset += 4;
      }
      if (this.buffer.length < offset + length) return;

      let payload = Buffer.from(this.buffer.subarray(offset, offset + length));
      this.buffer = this.buffer.subarray(offset + length);
      if (masked && mask) {
        for (let i = 0; i < payload.length; i += 1) payload[i] ^= mask[i % 4];
      }

      if (opcode === 0x8) {
        this.close();
        return;
      }
      if (opcode === 0x9) {
        this.sendFrame(0xA, payload);
        continue;
      }
      if (opcode === 0xA) continue;

      if (opcode === 0x1 || opcode === 0x2) {
        if (fin) {
          if (opcode === 0x1) this.onMessage?.(payload.toString("utf8"));
        } else {
          this.fragmentOpcode = opcode;
          this.fragments = [payload];
        }
        continue;
      }

      if (opcode === 0x0 && this.fragmentOpcode !== null) {
        this.fragments.push(payload);
        if (fin) {
          const combined = Buffer.concat(this.fragments);
          if (this.fragmentOpcode === 0x1) this.onMessage?.(combined.toString("utf8"));
          this.fragmentOpcode = null;
          this.fragments = [];
        }
      }
    }
  }

  sendFrame(opcode, payload) {
    if (!this.socket || this.socket.destroyed) throw new Error("CDP websocket is not connected");
    const data = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
    const mask = randomBytes(4);
    let header;
    if (data.length < 126) {
      header = Buffer.alloc(2);
      header[1] = 0x80 | data.length;
    } else if (data.length <= 0xffff) {
      header = Buffer.alloc(4);
      header[1] = 0x80 | 126;
      header.writeUInt16BE(data.length, 2);
    } else {
      header = Buffer.alloc(10);
      header[1] = 0x80 | 127;
      header.writeBigUInt64BE(BigInt(data.length), 2);
    }
    header[0] = 0x80 | opcode;
    const masked = Buffer.alloc(data.length);
    for (let i = 0; i < data.length; i += 1) masked[i] = data[i] ^ mask[i % 4];
    this.socket.write(Buffer.concat([header, mask, masked]));
  }

  sendText(text) {
    this.sendFrame(0x1, Buffer.from(text, "utf8"));
  }

  close() {
    if (!this.socket || this.socket.destroyed) return;
    try {
      this.sendFrame(0x8, Buffer.alloc(0));
    } catch {
      // Ignore close-frame errors during teardown.
    }
    this.socket.end();
  }
}

class CdpClient {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.nextId = 1;
    this.pending = new Map();
  }

  async connect() {
    this.ws = new LocalWebSocket(this.url);
    this.ws.onMessage = (data) => {
      const message = JSON.parse(data);
      if (!message.id) return;
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
      else pending.resolve(message.result || {});
    };
    this.ws.onError = (error) => {
      for (const pending of this.pending.values()) pending.reject(error);
      this.pending.clear();
    };
    await this.ws.connect();
  }

  send(method, params = {}) {
    if (!this.ws) return Promise.reject(new Error(`CDP is not connected for ${method}`));
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, method });
      this.ws.sendText(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws?.close();
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
    return el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (cls ? "." + cls : "");
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

  const stickyCta = document.querySelector(".funnel-mobile-cta, .funnel-mobile-sticky, .funnel-mobile-sticky-cta, [class*='mobile-sticky']");
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
