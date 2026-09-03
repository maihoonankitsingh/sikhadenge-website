import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.AI_VIDEO_LIVE_BASE_URL || "https://sikhadenge.in";
const outputDir = process.env.AI_VIDEO_LIVE_E2E_OUTPUT || path.join(process.cwd(), "artifacts/ai-video-live-e2e");
const expectedHref = "/gen-ai-masterclass/register-one-step?source=ai-video-masterclass";
const landingUrl = `${baseUrl}/masterclass/ai-video?liveQa=${Date.now()}`;
const registrationUrl = `${baseUrl}${expectedHref}`;

fs.mkdirSync(outputDir, { recursive: true });

const checks = [];
const failures = [];
const check = (name, ok, detail = "") => {
  const result = { name, ok: Boolean(ok), detail };
  checks.push(result);
  if (!result.ok) failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
};

const browser = await chromium.launch({ headless: true });

try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: { "Cache-Control": "no-cache" },
  });

  const page = await context.newPage();
  await page.addInitScript(() => {
    window.dataLayer = [];
    window.__AI_VIDEO_FB_CALLS__ = [];
    window.fbq = (...args) => window.__AI_VIDEO_FB_CALLS__.push(args);
  });

  const landingResponse = await page.goto(landingUrl, { waitUntil: "networkidle", timeout: 45_000 });
  await page.waitForTimeout(800);

  check("landing HTTP 200", landingResponse?.status() === 200, String(landingResponse?.status()));
  check("source-first hero exists", (await page.locator("#ai-video-hero-title").count()) === 1);
  check("2-hour offer visible", (await page.locator("body").innerText()).includes("2-Hour"));

  const primaryCta = page.locator('[data-cta-placement="hero-primary"]').first();
  check("hero CTA exists", (await primaryCta.count()) === 1);

  const href = await primaryCta.getAttribute("href");
  check("hero CTA destination exact", href === expectedHref, String(href));

  await primaryCta.evaluate((element) => {
    element.addEventListener("click", (event) => event.preventDefault(), { capture: true, once: true });
  });
  await primaryCta.click();
  await page.waitForTimeout(150);

  const analytics = await page.evaluate(() => ({
    dataLayer: Array.isArray(window.dataLayer) ? window.dataLayer : [],
    fbCalls: Array.isArray(window.__AI_VIDEO_FB_CALLS__) ? window.__AI_VIDEO_FB_CALLS__ : [],
  }));

  const dataLayerEvent = analytics.dataLayer.find(
    (event) => event?.event === "masterclass_cta_click" && event?.masterclass === "ai-video" && event?.placement === "hero-primary",
  );
  check("dataLayer CTA event fires", Boolean(dataLayerEvent));

  const fbEvent = analytics.fbCalls.find(
    (args) => args?.[0] === "trackCustom" && args?.[1] === "MasterclassCTA" && args?.[2]?.masterclass === "ai-video" && args?.[2]?.placement === "hero-primary",
  );
  check("Meta CTA event wiring fires", Boolean(fbEvent));

  const registrationPage = await context.newPage();
  const registrationResponse = await registrationPage.goto(registrationUrl, { waitUntil: "networkidle", timeout: 45_000 });
  await registrationPage.waitForTimeout(800);

  check("registration HTTP 200", registrationResponse?.status() === 200, String(registrationResponse?.status()));
  const formSignals = await registrationPage.locator("form, input, select, textarea, button").count();
  check("registration UI renders", formSignals > 0, `interactive controls=${formSignals}`);

  const result = {
    checkedAt: new Date().toISOString(),
    landingUrl,
    registrationUrl,
    checks,
    failures,
  };
  fs.writeFileSync(path.join(outputDir, "live-e2e.json"), JSON.stringify(result, null, 2));

  if (failures.length) {
    console.error("AI VIDEO LIVE E2E FAILED");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log(`AI VIDEO LIVE E2E PASS (${checks.length}/${checks.length})`);
    console.log("No production lead was submitted.");
  }

  await context.close();
} finally {
  await browser.close();
}
