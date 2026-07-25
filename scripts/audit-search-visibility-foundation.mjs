import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const templates = [
  "app/[skill]/page.tsx",
  "app/blog/[slug]/page.tsx",
  "app/compare/[slug]/page.tsx",
  "app/expert/[slug]/page.tsx",
  "app/free-tools/[slug]/page.tsx",
  "app/hindi/[slug]/page.tsx",
  "app/learn/[slug]/page.tsx",
  "app/prompts/[slug]/page.tsx",
  "app/store/[slug]/page.tsx",
];

const signals = {
  metadata: /generateMetadata|export\s+const\s+metadata/i,
  canonical: /canonical|alternates/i,
  robots: /robots/i,
  schema: /application\/ld\+json|@context|schema\.org/i,
  faq: /FAQPage|frequently asked|\bfaq/i,
  answer: /quick answer|direct answer|quick verdict|key takeaway|answerTitle|answer=/i,
  author: /author|authors|byline|editorial/i,
  dates: /datePublished|dateModified|publishedAt|updatedAt|lastModified|reviewed/i,
  sources: /citation|references|sources|sourceUrl|externalSource|methodology/i,
  breadcrumb: /BreadcrumbList|breadcrumb/i,
};

const templateAnswerEvidence = {
  "app/[skill]/page.tsx": [
    /\{pageDesc\}/,
    /Search clarity/i,
  ],
  "app/hindi/[slug]/page.tsx": [
    /Ye page aapko kis cheez me help karega/i,
    /\{intro\}/,
  ],
  "app/prompts/[slug]/page.tsx": [
    /What this prompt page helps you do/i,
    /\{intro\}/,
  ],
};

const critical = ["metadata", "canonical", "schema", "answer", "breadcrumb"];
const rows = [];
let failed = false;

for (const template of templates) {
  const file = path.join(root, template);
  const source = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  const result = Object.fromEntries(
    Object.entries(signals).map(([name, pattern]) => {
      const genericMatch = pattern.test(source);
      if (name !== "answer" || genericMatch) return [name, genericMatch];

      const templatePatterns = templateAnswerEvidence[template] || [];
      return [name, templatePatterns.some((candidate) => candidate.test(source))];
    }),
  );

  const missingCritical = critical.filter((name) => !result[name]);
  if (!source || missingCritical.length) failed = true;

  rows.push({
    template,
    exists: Boolean(source),
    ...result,
    missingCritical,
  });
}

const columns = ["template", "exists", ...Object.keys(signals), "missingCritical"];
console.log(columns.join("\t"));
for (const row of rows) {
  console.log(
    columns
      .map((column) => {
        const value = row[column];
        if (Array.isArray(value)) return value.length ? value.join(",") : "-";
        if (typeof value === "boolean") return value ? "YES" : "NO";
        return String(value);
      })
      .join("\t"),
  );
}

const outDir = process.env.SEARCH_VISIBILITY_REPORT_DIR
  ? path.resolve(process.env.SEARCH_VISIBILITY_REPORT_DIR)
  : path.join("/tmp", "sikhadenge-search-visibility");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "template-foundation-latest.json");
fs.writeFileSync(
  outFile,
  `${JSON.stringify({ generatedAt: new Date().toISOString(), critical, rows }, null, 2)}\n`,
);
console.log(`REPORT=${outFile}`);

if (failed) {
  console.error("SEARCH_VISIBILITY_FOUNDATION=FAIL");
  process.exitCode = 1;
} else {
  console.log("SEARCH_VISIBILITY_FOUNDATION=PASS");
}
