const base = (process.env.SITE_URL || "https://sikhadenge.in").replace(/\/$/, "");
const timeoutMs = Number(process.env.VERIFY_TIMEOUT_MS || 15000);

const targets = [
  { path: "/", expected: [200] },
  { path: "/blog", expected: [200] },
  { path: "/about-us", expected: [200] },
  { path: "/contact-us", expected: [200] },
  { path: "/contact", expected: [301, 308] },
  { path: "/editorial-policy", expected: [200] },
  { path: "/authors/sikhadenge-editorial-team", expected: [200] },
  { path: "/robots.txt", expected: [200] },
  { path: "/sitemap.xml", expected: [200] },
  { path: "/llms.txt", expected: [200] },
  { path: "/__sikhadenge-invalid-generated-slug__", expected: [404] },
  { path: "/blog/__sikhadenge-invalid-generated-slug__", expected: [404] },
  { path: "/expert/__sikhadenge-invalid-generated-slug__", expected: [404] },
];

async function request(target) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${base}${target.path}`, {
      redirect: "manual",
      signal: controller.signal,
      headers: { "user-agent": "SikhadengePostDeployVerifier/1.0" },
    });
    const contentType = response.headers.get("content-type") || "";
    const location = response.headers.get("location");
    const body = contentType.includes("text") || contentType.includes("xml")
      ? (await response.text()).slice(0, 250000)
      : "";
    return { status: response.status, contentType, location, body };
  } finally {
    clearTimeout(timer);
  }
}

const failures = [];
const results = [];

for (const target of targets) {
  try {
    const result = await request(target);
    const statusOk = target.expected.includes(result.status);
    const checks = [];

    if (target.path === "/" && result.status === 200) {
      checks.push({ name: "canonical or home metadata", ok: /<title[\s>]/i.test(result.body) });
    }
    if (target.path === "/robots.txt" && result.status === 200) {
      checks.push({ name: "sitemap directive", ok: /sitemap:\s*https:\/\/sikhadenge\.in\/sitemap\.xml/i.test(result.body) });
      checks.push({ name: "OAI-SearchBot rule", ok: /OAI-SearchBot/i.test(result.body) });
      checks.push({ name: "PerplexityBot rule", ok: /PerplexityBot/i.test(result.body) });
    }
    if (target.path === "/sitemap.xml" && result.status === 200) {
      checks.push({ name: "canonical contact route", ok: result.body.includes("https://sikhadenge.in/contact-us") });
      checks.push({ name: "no redirected contact route", ok: !result.body.includes("https://sikhadenge.in/contact<") });
    }
    if (target.path === "/llms.txt" && result.status === 200) {
      checks.push({ name: "editorial policy reference", ok: result.body.includes("https://sikhadenge.in/editorial-policy") });
    }
    if (target.path === "/contact" && [301, 308].includes(result.status)) {
      checks.push({ name: "redirect target", ok: Boolean(result.location?.includes("/contact-us")) });
    }

    const checksOk = checks.every((check) => check.ok);
    results.push({ path: target.path, status: result.status, statusOk, checks });
    if (!statusOk || !checksOk) failures.push(target.path);
  } catch (error) {
    results.push({ path: target.path, error: error instanceof Error ? error.message : String(error) });
    failures.push(target.path);
  }
}

console.log(JSON.stringify({ base, results, failures }, null, 2));
if (failures.length > 0) process.exit(1);
