import { spawn, spawnSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, ".tmp", "phase16-workshop-visual-qa");
const port = Number(process.env.PHASE16_QA_PORT || 3002);
const baseUrl = `http://127.0.0.1:${port}`;

const routes = [
  { key: "workshop-chatgpt", path: "/workshop/chatgpt", expected: "ChatGPT" },
  { key: "workshop-claude", path: "/workshop/claude", expected: "Claude" },
];

const viewports = [
  { key: "375", width: 375, height: 812 },
  { key: "430", width: 430, height: 932 },
  { key: "768", width: 768, height: 1024 },
  { key: "1366", width: 1366, height: 768 },
  { key: "1440", width: 1440, height: 900 },
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
      await response.arrayBuffer();
      if (response.status >= 200 && response.status < 500) return response.status;
    } catch (error) {
      lastError = error;
    }
    await sleep(350);
  }
  throw new Error(`Timed out waiting for ${url}${lastError ? `: ${lastError.message}` : ""}`);
}

async function verifyRoute(url, expected, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (!html.includes(expected)) throw new Error(`missing expected product label ${expected}`);
      return response.status;
    } catch (error) {
      lastError = error;
      await sleep(500);
    }
  }
  throw new Error(`Unable to verify ${url}${lastError ? `: ${lastError.message}` : ""}`);
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const app = spawn("npm", ["run", "start", "--", "-p", String(port)], {
  cwd: root,
  env: { ...process.env, PORT: String(port) },
  stdio: ["ignore", "pipe", "pipe"],
});

let appLog = "";
app.stdout.on("data", (chunk) => { appLog += chunk.toString(); });
app.stderr.on("data", (chunk) => { appLog += chunk.toString(); });

const results = [];

try {
  await waitForHttp(`${baseUrl}/workshop/chatgpt`);
  const chrome = findChrome();

  for (const route of routes) {
    const status = await verifyRoute(`${baseUrl}${route.path}`, route.expected);

    for (const viewport of viewports) {
      const filename = `${route.key}-${viewport.key}.png`;
      const filepath = path.join(outDir, filename);
      const result = spawnSync(chrome, [
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--hide-scrollbars",
        `--window-size=${viewport.width},${viewport.height}`,
        `--screenshot=${filepath}`,
        `${baseUrl}${route.path}`,
      ], { cwd: root, encoding: "utf8", timeout: 30000 });

      if (result.status !== 0) {
        throw new Error(`Chrome screenshot failed for ${route.key} ${viewport.key}: ${result.stderr || result.stdout}`);
      }

      results.push({ route: route.key, path: route.path, viewport, screenshot: filename, status });
      await sleep(250);
    }
  }

  await writeFile(path.join(outDir, "report.json"), JSON.stringify({ failures: [], results }, null, 2));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  await writeFile(path.join(outDir, "report.json"), JSON.stringify({ failures: [message], results, appLog }, null, 2));
  throw error;
} finally {
  app.kill("SIGTERM");
  await writeFile(path.join(outDir, "app.log"), appLog);
}

console.log(`Phase 16 workshop visual QA captured ${results.length} screenshots.`);
