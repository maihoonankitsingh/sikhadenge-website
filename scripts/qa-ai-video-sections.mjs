import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.AI_VIDEO_QA_BASE_URL || "http://127.0.0.1:3000";
const outputDir = process.env.AI_VIDEO_SECTION_QA_OUTPUT || path.join(process.cwd(), "artifacts/ai-video-qa/sections");
const route = "/masterclass/ai-video";

const views = [
  { name: "desktop", width: 1668, height: 943, dpr: 1, mobile: false, touch: false },
  { name: "tablet", width: 800, height: 1179, dpr: 1.5, mobile: false, touch: true },
  { name: "mobile", width: 390, height: 844, dpr: 2, mobile: true, touch: true },
];

const sections = [
  { name: "hero", selector: "section[aria-labelledby='ai-video-hero-title']", heading: "#ai-video-hero-title" },
  { name: "outcomes", selector: "#outcomes", heading: "#outcomes-title" },
  { name: "agenda", selector: "#learn", heading: "#agenda-title" },
  { name: "tools", selector: "#tools", heading: "#tools-title" },
  { name: "audience", selector: "section[aria-labelledby='audience-title']", heading: "#audience-title" },
  { name: "faq", selector: "#faq", heading: "#faq-title" },
  { name: "final", selector: "section[aria-labelledby='final-title']", heading: "#final-title" },
];

fs.mkdirSync(outputDir, { recursive: true });
const failures = [];
const results = {};

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
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 45_000 });
    await page.waitForTimeout(300);

    const viewResults = [];

    for (const section of sections) {
      const target = page.locator(section.selector);
      if ((await target.count()) !== 1) {
        failures.push(`${view.name}/${section.name}: section missing or duplicated`);
        viewResults.push({ name: section.name, ok: false, reason: "missing-or-duplicate" });
        continue;
      }

      await target.scrollIntoViewIfNeeded();
      await page.waitForTimeout(180);

      const state = await page.evaluate(({ selector, heading }) => {
        const sectionNode = document.querySelector(selector);
        const headingNode = document.querySelector(heading);
        const rect = sectionNode?.getBoundingClientRect();
        const headingRect = headingNode?.getBoundingClientRect();
        const style = sectionNode ? getComputedStyle(sectionNode) : null;
        const headingStyle = headingNode ? getComputedStyle(headingNode) : null;
        const horizontalOverflow = Math.max(0, document.documentElement.scrollWidth - innerWidth);
        const text = sectionNode?.innerText?.trim() || "";

        return {
          sectionVisible: Boolean(
            rect && rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight &&
            style?.display !== "none" && style?.visibility !== "hidden" && Number(style?.opacity || 1) > 0
          ),
          headingVisible: Boolean(
            headingRect && headingRect.width > 0 && headingRect.height > 0 &&
            headingStyle?.display !== "none" && headingStyle?.visibility !== "hidden" && Number(headingStyle?.opacity || 1) > 0
          ),
          width: Math.round(rect?.width || 0),
          height: Math.round(rect?.height || 0),
          textChars: text.length,
          horizontalOverflow,
          contentVisibility: style?.contentVisibility || "visible",
        };
      }, { selector: section.selector, heading: section.heading });

      const ok =
        state.sectionVisible &&
        state.headingVisible &&
        state.textChars >= 40 &&
        state.horizontalOverflow <= 1;

      if (!ok) {
        failures.push(
          `${view.name}/${section.name}: visible=${state.sectionVisible}, heading=${state.headingVisible}, text=${state.textChars}, overflow=${state.horizontalOverflow}`,
        );
      }

      await page.screenshot({
        path: path.join(outputDir, `${view.name}-${section.name}.png`),
        fullPage: false,
        animations: "disabled",
      });

      viewResults.push({ name: section.name, ok, ...state });
    }

    results[view.name] = viewResults;
    await context.close();
  }
} finally {
  await browser.close();
}

const checks = Object.values(results).flat();
const passed = checks.filter((item) => item.ok).length;
const score = checks.length ? Math.round((passed / checks.length) * 100) : 0;

fs.writeFileSync(
  path.join(outputDir, "section-visual-summary.json"),
  JSON.stringify({ score, results, failures }, null, 2),
);

console.log("AI VIDEO SECTION VIEWPORT QA");
console.log("============================");
console.log(`Visual viewport score: ${score}% (${passed}/${checks.length})`);

if (failures.length) {
  console.error("\nSection viewport failures:\n- " + failures.join("\n- "));
  process.exit(1);
}

if (score < 90) {
  console.error(`Visual viewport score ${score}% is below 90%`);
  process.exit(1);
}

console.log("Every major section renders in real desktop/tablet/mobile scroll context at 90%+.");
