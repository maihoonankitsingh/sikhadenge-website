import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pagePath = path.join(root, "pages/masterclass/ai-video/index.tsx");
const cssPath = path.join(root, "styles/ai-video-masterclass.module.css");
const processCssPath = path.join(root, "styles/ai-video-process-premium.module.css");
const appPath = path.join(root, "pages/_app.tsx");
const documentPath = path.join(root, "pages/_document.tsx");
const nextConfigPath = path.join(root, "next.config.js");
const klingAssetPath = path.join(root, "public/ai-video-kling-mark.svg");
const higgsfieldAssetPath = path.join(root, "public/ai-video-higgsfield-mark.svg");
const canonicalUrl = "https://sikhadenge.in/masterclass/ai-video";

const page = fs.readFileSync(pagePath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");
const processCss = fs.readFileSync(processCssPath, "utf8");
const app = fs.readFileSync(appPath, "utf8");
const documentSource = fs.readFileSync(documentPath, "utf8");
const nextConfig = fs.readFileSync(nextConfigPath, "utf8");

const failures = [];
const checks = [];

function check(name, condition, detail = "") {
  checks.push({ name, ok: Boolean(condition), detail });
  if (!condition) failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
}

const pageImportantMatches = css.match(/!important/g) || [];
const hasOnlyScopedMobileImportant =
  pageImportantMatches.length <= 1 &&
  (pageImportantMatches.length === 0 || css.includes("justify-self: stretch !important"));

check("single source of truth uses 2-hour duration", page.includes('const durationLabel = "2 Hours"') && !/3\s*Hours?/i.test(page));
check("no document replacement APIs", !/document\s*\.\s*(open|write|close)\s*\(/.test(page));
check("no external favicon waterfall", !page.includes("google.com/s2/favicons"));
check("no Google Fonts dependency", !page.includes("fonts.googleapis.com") && !page.includes("fonts.gstatic.com"));
check("no remote GitHub hero asset", !page.includes("raw.githubusercontent.com"));
check("local Kling asset referenced", page.includes('/ai-video-kling-mark.svg'));
check("local Higgsfield asset referenced", page.includes('/ai-video-higgsfield-mark.svg'));
check("local Kling asset exists", fs.existsSync(klingAssetPath));
check("local Higgsfield asset exists", fs.existsSync(higgsfieldAssetPath));
check("canonical metadata", page.includes('rel="canonical"') && page.includes(canonicalUrl));
check("page-specific Open Graph", page.includes('property="og:title"') && page.includes('property="og:url"') && page.includes('property="og:description"'));
check("Twitter card metadata", page.includes('name="twitter:card"') && page.includes('name="twitter:title"'));
check("overridable app-level social defaults", app.includes('key="og-title"') && app.includes('key="twitter-title"'));
check("no hard-coded social defaults in _document", !documentSource.includes('property="og:title"') && !documentSource.includes('name="twitter:title"'));
check("structured Course data", page.includes('"@type": "Course"'));
check("structured FAQ data", page.includes('"@type": "FAQPage"'));
check("one JSX h1", (page.match(/<h1\b/g) || []).length === 1);
check("tab controls wired", page.includes('aria-controls="tool-panel-video"') && page.includes('aria-controls="tool-panel-image"'));
check("tab panels wired", page.includes('role="tabpanel"') && page.includes('aria-labelledby={labelledBy}'));
check("keyboard tab navigation", page.includes('event.key === "ArrowLeft"') && page.includes('event.key === "ArrowRight"') && page.includes('event.key === "Home"') && page.includes('event.key === "End"'));
check("skip link present", page.includes('Skip to masterclass content'));
check("section labelling present", page.includes('aria-labelledby="ai-video-hero-title"') && page.includes('aria-labelledby="faq-title"'));
check("CTA tracking placements", page.includes('masterclass_cta_click') && page.includes('MasterclassCTA'));
check("mobile safe-area sticky", css.includes('env(safe-area-inset-bottom'));
check("opaque mobile sticky", !css.includes('backdrop-filter'));
check("reduced motion support", css.includes('@media (prefers-reduced-motion: reduce)') && processCss.includes('@media (prefers-reduced-motion: reduce)'));
check("tablet breakpoint exists", css.includes('@media (max-width: 1024px)'));
check("mobile breakpoint exists", css.includes('@media (max-width: 760px)'));
check("small mobile breakpoint exists", css.includes('@media (max-width: 480px)'));
check("below-fold render containment", css.includes('content-visibility: auto') && css.includes('contain-intrinsic-size'));
check("landing page gets short edge-cache policy", nextConfig.includes('source: "/masterclass/ai-video"') && nextConfig.includes("s-maxage=300") && nextConfig.includes("stale-while-revalidate=86400"));
check("site no-store matcher excludes AI Video prefix", nextConfig.includes("masterclass/ai-video") && nextConfig.includes("Cache-Control\", value: \"no-store"));
check("no legacy warm override import", !app.includes('ai-video-warm-reference.css'));
check("specificity debt bounded to at most one scoped mobile override", hasOnlyScopedMobileImportant, `!important count=${pageImportantMatches.length}`);
check("no important specificity debt in process CSS", !processCss.includes('!important'));
check("no iframe tablet emulation", !page.includes("iframe") && !page.includes("desktopEmbed") && !page.includes("tabletV7"));
check("no MutationObserver hotfix architecture", !page.includes("MutationObserver"));

console.log("AI VIDEO MASTERCLASS SOURCE AUDIT");
console.log("=================================");
for (const item of checks) {
  console.log(`${item.ok ? "PASS" : "FAIL"}  ${item.name}${item.detail ? ` — ${item.detail}` : ""}`);
}

const passed = checks.filter((item) => item.ok).length;
const score = Math.round((passed / checks.length) * 100);
console.log("\nScore:", `${passed}/${checks.length} (${score}%)`);

if (failures.length) {
  console.error("\nAudit failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log("\nAll AI Video source guards passed.");
