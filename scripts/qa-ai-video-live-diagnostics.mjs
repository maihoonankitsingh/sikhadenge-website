import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.AI_VIDEO_LIVE_BASE_URL || "https://sikhadenge.in";
const outputDir = process.env.AI_VIDEO_LIVE_DIAG_OUTPUT || path.join(process.cwd(), "artifacts/ai-video-live-diagnostics");
const route = `/masterclass/ai-video?liveDiag=${Date.now()}`;

fs.mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1668, height: 943 },
  deviceScaleFactor: 1,
  ignoreHTTPSErrors: true,
});
const page = await context.newPage();

const httpErrors = [];
const consoleErrors = [];
const failedRequests = [];

page.on("response", (response) => {
  if (response.status() >= 400) {
    httpErrors.push({
      status: response.status(),
      url: response.url(),
      resourceType: response.request().resourceType(),
    });
  }
});

page.on("console", (message) => {
  if (message.type() === "error") {
    consoleErrors.push({
      text: message.text(),
      location: message.location(),
    });
  }
});

page.on("requestfailed", (request) => {
  failedRequests.push({
    url: request.url(),
    resourceType: request.resourceType(),
    error: request.failure()?.errorText || "unknown",
  });
});

const response = await page.goto(`${baseUrl}${route}`, {
  waitUntil: "networkidle",
  timeout: 45_000,
});
await page.waitForTimeout(1500);

const diagnostics = await page.evaluate(() => {
  const nav = performance.getEntriesByType("navigation")[0];
  const resources = performance.getEntriesByType("resource")
    .map((entry) => ({
      name: entry.name,
      initiatorType: entry.initiatorType,
      duration: Math.round(entry.duration),
      transferSize: entry.transferSize || 0,
      startTime: Math.round(entry.startTime),
    }))
    .sort((a, b) => b.duration - a.duration);

  return {
    title: document.title,
    statusText: document.readyState,
    bodyHeight: document.body.scrollHeight,
    navigation: nav ? {
      ttfb: Math.round(nav.responseStart - nav.startTime),
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
      load: Math.round(nav.loadEventEnd - nav.startTime),
    } : null,
    slowestResources: resources.slice(0, 20),
    iconLinks: [...document.querySelectorAll("link[rel*='icon']")].map((el) => el.href),
  };
});

const result = {
  pageStatus: response?.status() || 0,
  httpErrors,
  consoleErrors,
  failedRequests,
  diagnostics,
};

fs.writeFileSync(path.join(outputDir, "diagnostics.json"), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));

await context.close();
await browser.close();
