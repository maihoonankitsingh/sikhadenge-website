import fs from "node:fs";
import path from "node:path";

const reportDir = process.env.AI_VIDEO_LIGHTHOUSE_DIR || path.join(process.cwd(), "artifacts/ai-video-lighthouse");
const targets = ["desktop", "mobile"];
const requiredCategories = ["performance", "accessibility", "best-practices", "seo"];
const failures = [];
const summary = {};

function pct(score) {
  return Math.round((Number(score) || 0) * 100);
}

for (const target of targets) {
  const file = path.join(reportDir, `${target}.json`);
  if (!fs.existsSync(file)) {
    failures.push(`${target}: missing Lighthouse report ${file}`);
    continue;
  }

  const report = JSON.parse(fs.readFileSync(file, "utf8"));
  const categories = Object.fromEntries(
    requiredCategories.map((name) => [name, pct(report.categories?.[name]?.score)]),
  );

  const audits = report.audits || {};
  const metrics = {
    fcpMs: Math.round(audits["first-contentful-paint"]?.numericValue || 0),
    lcpMs: Math.round(audits["largest-contentful-paint"]?.numericValue || 0),
    cls: Number((audits["cumulative-layout-shift"]?.numericValue || 0).toFixed(4)),
    tbtMs: Math.round(audits["total-blocking-time"]?.numericValue || 0),
    speedIndexMs: Math.round(audits["speed-index"]?.numericValue || 0),
  };

  summary[target] = { categories, metrics };

  for (const [name, score] of Object.entries(categories)) {
    if (score < 90) failures.push(`${target}: Lighthouse ${name} ${score}% < 90%`);
  }

  if (metrics.lcpMs <= 0 || metrics.lcpMs > 2500) {
    failures.push(`${target}: LCP ${metrics.lcpMs}ms exceeds 2500ms`);
  }
  if (metrics.cls > 0.1) failures.push(`${target}: CLS ${metrics.cls} exceeds 0.10`);
  if (metrics.tbtMs > 300) failures.push(`${target}: TBT ${metrics.tbtMs}ms exceeds 300ms`);
}

fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(path.join(reportDir, "summary.json"), JSON.stringify({ summary, failures }, null, 2));

console.log("AI VIDEO LIGHTHOUSE 90+ GATE");
console.log("============================");
for (const [target, data] of Object.entries(summary)) {
  console.log(`\n${target.toUpperCase()}`);
  console.log(`Performance:    ${data.categories.performance}%`);
  console.log(`Accessibility:  ${data.categories.accessibility}%`);
  console.log(`Best Practices: ${data.categories["best-practices"]}%`);
  console.log(`SEO:            ${data.categories.seo}%`);
  console.log(`LCP: ${data.metrics.lcpMs}ms | CLS: ${data.metrics.cls} | TBT: ${data.metrics.tbtMs}ms`);
}

if (failures.length) {
  console.error("\n90+ gate failures:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log("\nAll required Lighthouse categories are 90%+ on desktop and mobile.");
