import { spawn, spawnSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, ".tmp", "phase16-workshop-visual-qa");
const port = Number(process.env.PHASE16_QA_PORT || 3002);
const baseUrl = `http://127.0.0.1:${port}`;
const nextCli = path.join(root, "node_modules", "next", "dist", "bin", "next");

const routes = [
  { key: "workshop-chatgpt", path: "/workshop/chatgpt" },
  { key: "workshop-claude", path: "/workshop/claude" },
];

const viewports = [
  { key: "375", width: 375, height: 812 },
  { key: "768", width: 768, height: 1024 },
  { key: "1366", width: 1366, height: 768 },
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

async function waitForServer(url, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { redirect: "manual" });
      await response.arrayBuffer();
      if (response.status >= 200 && response.status < 500) return;
    } catch (error) {
      lastError = error;
    }
    await sleep(300);
  }
  throw new Error(`Timed out waiting for ${url}${lastError ? `: ${lastError.message}` : ""}`);
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const chrome = findChrome();
const results = [];
let combinedLog = "";

for (const route of routes) {
  const app = spawn(process.execPath, [nextCli, "start", "-p", String(port)], {
    cwd: root,
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let appLog = "";
  app.stdout.on("data", (chunk) => { appLog += chunk.toString(); });
  app.stderr.on("data", (chunk) => { appLog += chunk.toString(); });

  try {
    await waitForServer(`${baseUrl}/masterclass/chatgpt/free`);
    const url = `${baseUrl}${route.path}`;

    for (const viewport of viewports) {
      const filename = `${route.key}-${viewport.key}.png`;
      const filepath = path.join(outDir, filename);
      const result = spawnSync(chrome, [
        "--headless=new",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--no-sandbox",
        "--hide-scrollbars",
        `--window-size=${viewport.width},${viewport.height}`,
        `--screenshot=${filepath}`,
        url,
      ], { cwd: root, encoding: "utf8", timeout: 15000 });

      if (result.status !== 0) {
        throw new Error(`Chrome screenshot failed for ${route.key} ${viewport.key}: ${result.stderr || result.stdout}`);
      }

      results.push({ route: route.key, path: route.path, viewport, screenshot: filename });
      await sleep(250);
    }
  } catch (error) {
    combinedLog += `\n=== ${route.key} ===\n${appLog}`;
    const message = error instanceof Error ? error.message : String(error);
    await writeFile(path.join(outDir, "report.json"), JSON.stringify({ failures: [message], results, appLog: combinedLog }, null, 2));
    app.kill("SIGTERM");
    throw error;
  } finally {
    app.kill("SIGTERM");
    await sleep(700);
    combinedLog += `\n=== ${route.key} ===\n${appLog}`;
  }
}

await writeFile(path.join(outDir, "report.json"), JSON.stringify({ failures: [], results }, null, 2));
await writeFile(path.join(outDir, "app.log"), combinedLog);
console.log(`Phase 16 workshop visual QA captured ${results.length} screenshots.`);
