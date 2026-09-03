import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.AI_VIDEO_QA_BASE_URL || "http://127.0.0.1:3000";
const route = "/masterclass/ai-video";
const outputDir = process.env.AI_VIDEO_QA_OUTPUT || path.join(process.cwd(), "artifacts/ai-video-qa");

const views = [
  { name: "desktop", width: 1668, height: 943, dpr: 1, mobile: false, touch: false },
  { name: "tablet", width: 800, height: 1179, dpr: 1.5, mobile: false, touch: true },
  { name: "mobile", width: 390, height: 844, dpr: 2, mobile: true, touch: true },
];

fs.mkdirSync(outputDir, { recursive: true });

const failures = [];
const results = {};

function assert(view, name, condition, detail = "") {
  const ok = Boolean(condition);
  if (!ok) failures.push(`${view}: ${name}${detail ? ` — ${detail}` : ""}`);
  return { name, ok, detail };
}

const browser = await chromium.launch({ headless: true });

try {
  for (const view of views) {
    const context = await browser.newContext({
      viewport: { width: view.width, height: view.height },
      deviceScaleFactor: view.dpr,
      isMobile: view.mobile,
      hasTouch: view.touch,
      ignoreHTTPSErrors: true,
    });

    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(String(error)));
    page.on("requestfailed", (request) => {
      failedRequests.push({ url: request.url(), error: request.failure()?.errorText || "unknown" });
    });

    await page.addInitScript(() => {
      window.__AI_VIDEO_QA__ = { lcp: 0, cls: 0, longTasks: [] };

      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) window.__AI_VIDEO_QA__.lcp = entry.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
      } catch {}

      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.__AI_VIDEO_QA__.cls += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
      } catch {}

      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__AI_VIDEO_QA__.longTasks.push({ start: entry.startTime, duration: entry.duration });
          }
        }).observe({ type: "longtask", buffered: true });
      } catch {}
    });

    const started = Date.now();
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 45_000 });
    await page.waitForTimeout(1_200);

    const interactionResult = { imageTab: false, faq: false };

    const imageTab = page.getByRole("tab", { name: /Image Generation/i });
    if ((await imageTab.count()) === 1) {
      await imageTab.click();
      interactionResult.imageTab = (await imageTab.getAttribute("aria-selected")) === "true";
    }

    const firstFaq = page.locator("details").first();
    if ((await firstFaq.count()) === 1) {
      await firstFaq.locator("summary").click();
      interactionResult.faq = await firstFaq.evaluate((element) => element.open);
    }

    await page.waitForTimeout(250);

    const data = await page.evaluate(() => {
      const qa = window.__AI_VIDEO_QA__ || { lcp: 0, cls: 0, longTasks: [] };
      const navigation = performance.getEntriesByType("navigation")[0];
      const fcp = performance.getEntriesByName("first-contentful-paint")[0];
      const hero = document.querySelector("section[aria-labelledby='ai-video-hero-title']");
      const heroRect = hero?.getBoundingClientRect();
      const mobileSticky = document.querySelector("[aria-label='Reserve your AI video masterclass seat']");
      const stickyStyle = mobileSticky ? getComputedStyle(mobileSticky) : null;
      const registerLinks = [...document.querySelectorAll("a[href*='/gen-ai-masterclass/register-one-step']")];
      const images = [...document.images];
      const longTaskTotal = qa.longTasks.reduce((sum, task) => sum + task.duration, 0);
      const durationText = document.body.innerText;
      const resources = performance.getEntriesByType("resource");
      const totalTransfer = resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0);

      return {
        title: document.title,
        h1Count: document.querySelectorAll("h1").length,
        iframeCount: document.querySelectorAll("iframe").length,
        heroVisible: Boolean(heroRect && heroRect.width > 0 && heroRect.height > 0 && getComputedStyle(hero).display !== "none"),
        heroHeight: Math.round(heroRect?.height || 0),
        bodyHeight: document.body.scrollHeight,
        horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
        registerLinks: registerLinks.map((link) => link.getAttribute("href")),
        brokenImages: images.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.currentSrc || img.src),
        duplicateIds: Object.entries(
          [...document.querySelectorAll("[id]")].reduce((acc, element) => {
            acc[element.id] = (acc[element.id] || 0) + 1;
            return acc;
          }, {}),
        ).filter(([, count]) => count > 1),
        hasThreeHourCopy: /\b3\s*-?\s*Hours?\b/i.test(durationText),
        hasTwoHourCopy: /\b2\s*-?\s*Hours?\b/i.test(durationText),
        stickyDisplay: stickyStyle?.display || "none",
        navigation: navigation
          ? {
              ttfb: navigation.responseStart - navigation.startTime,
              domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
              load: navigation.loadEventEnd - navigation.startTime,
            }
          : null,
        vitals: {
          fcp: fcp?.startTime || 0,
          lcp: qa.lcp || 0,
          cls: Number((qa.cls || 0).toFixed(4)),
          longTaskCount: qa.longTasks.length,
          longTaskTotal: Math.round(longTaskTotal),
          maxLongTask: Math.round(Math.max(0, ...qa.longTasks.map((task) => task.duration))),
        },
        resources: {
          count: resources.length,
          transferBytes: totalTransfer,
        },
        domNodes: document.querySelectorAll("*").length,
      };
    });

    const status = response?.status() || 0;
    const checks = [
      assert(view.name, "HTTP 200", status === 200, `status=${status}`),
      assert(view.name, "hero visible", data.heroVisible, `height=${data.heroHeight}`),
      assert(view.name, "exactly one H1", data.h1Count === 1, `count=${data.h1Count}`),
      assert(view.name, "no iframe emulation", data.iframeCount === 0, `count=${data.iframeCount}`),
      assert(view.name, "no horizontal overflow", data.horizontalOverflow <= 1, `overflow=${data.horizontalOverflow}px`),
      assert(view.name, "no broken images", data.brokenImages.length === 0, `count=${data.brokenImages.length}`),
      assert(view.name, "no duplicate IDs", data.duplicateIds.length === 0, `count=${data.duplicateIds.length}`),
      assert(view.name, "2-hour offer visible", data.hasTwoHourCopy),
      assert(view.name, "no 3-hour mismatch", !data.hasThreeHourCopy),
      assert(view.name, "registration CTAs present", data.registerLinks.length >= 3, `count=${data.registerLinks.length}`),
      assert(
        view.name,
        "registration CTAs preserve source",
        data.registerLinks.every((href) => href === "/gen-ai-masterclass/register-one-step?source=ai-video-masterclass"),
      ),
      assert(view.name, "tool tab interaction", interactionResult.imageTab),
      assert(view.name, "FAQ interaction", interactionResult.faq),
      assert(view.name, "no page errors", pageErrors.length === 0, `count=${pageErrors.length}`),
      assert(view.name, "no console errors", consoleErrors.length === 0, `count=${consoleErrors.length}`),
      assert(view.name, "no failed requests", failedRequests.length === 0, `count=${failedRequests.length}`),
      assert(view.name, "CLS <= 0.10", data.vitals.cls <= 0.1, `cls=${data.vitals.cls}`),
      assert(view.name, "FCP <= 2.0s", data.vitals.fcp > 0 && data.vitals.fcp <= 2000, `fcp=${Math.round(data.vitals.fcp)}ms`),
      assert(view.name, "LCP <= 2.5s", data.vitals.lcp > 0 && data.vitals.lcp <= 2500, `lcp=${Math.round(data.vitals.lcp)}ms`),
      assert(view.name, "long-task total <= 500ms", data.vitals.longTaskTotal <= 500, `total=${data.vitals.longTaskTotal}ms`),
      assert(
        view.name,
        view.name === "mobile" ? "mobile sticky visible" : "mobile sticky hidden",
        view.name === "mobile" ? data.stickyDisplay !== "none" : data.stickyDisplay === "none",
        `display=${data.stickyDisplay}`,
      ),
    ];

    const passed = checks.filter((check) => check.ok).length;
    const score = Math.round((passed / checks.length) * 100);

    results[view.name] = {
      viewport: view,
      status,
      elapsedMs: Date.now() - started,
      score,
      checks,
      data,
      consoleErrors,
      pageErrors,
      failedRequests,
    };

    await page.screenshot({
      path: path.join(outputDir, `${view.name}.png`),
      fullPage: true,
      animations: "disabled",
    });

    fs.writeFileSync(
      path.join(outputDir, `${view.name}.json`),
      JSON.stringify(results[view.name], null, 2),
    );

    console.log(`\n${view.name.toUpperCase()} ${score}%`);
    console.log(
      JSON.stringify(
        {
          status,
          viewport: `${view.width}x${view.height}@${view.dpr}`,
          vitals: data.vitals,
          overflow: data.horizontalOverflow,
          brokenImages: data.brokenImages.length,
          consoleErrors: consoleErrors.length,
          failedRequests: failedRequests.length,
          domNodes: data.domNodes,
          transferKB: Math.round(data.resources.transferBytes / 1024),
        },
        null,
        2,
      ),
    );

    await context.close();
  }
} finally {
  await browser.close();
}

const scoreValues = Object.values(results).map((result) => result.score);
const overallScore = scoreValues.length
  ? Math.round(scoreValues.reduce((sum, score) => sum + score, 0) / scoreValues.length)
  : 0;

fs.writeFileSync(
  path.join(outputDir, "all-views.json"),
  JSON.stringify({ overallScore, results, failures }, null, 2),
);

console.log("\nAI VIDEO 3-VIEW BROWSER QA");
console.log("==========================");
console.log(`Overall score: ${overallScore}%`);
console.log(`Artifacts: ${outputDir}`);

if (failures.length) {
  console.error("\nBrowser QA failures:\n- " + failures.join("\n- "));
  process.exit(1);
}

if (overallScore < 90 || scoreValues.some((score) => score < 90)) {
  console.error(`\nBrowser QA score below target: overall=${overallScore}% views=${scoreValues.join(",")}`);
  process.exit(1);
}

console.log("All desktop, tablet and mobile browser guards passed at 90%+.");
