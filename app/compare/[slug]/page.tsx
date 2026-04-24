import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import {
  ArrowRight,
  Lock,
  Scale,
  Award,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Info,
  Clock3,
  Code2,
  Brain,
  BadgeHelp,
  Layers3,
} from "lucide-react";

type CompareItem = {
  slug: string;
  title: string;
  description: string;
  toolA: string;
  toolB: string;
  task: string;
  intro?: string;
  quickVerdict?: string;
  bestForA?: string[];
  bestForB?: string[];
  strengthsA?: string[];
  strengthsB?: string[];
  weaknessesA?: string[];
  weaknessesB?: string[];
  scoreA?: number;
  scoreB?: number;
  methodology?: string[];
  updatedAt?: string;
  relatedSlugs?: string[];
};

function getVsData(): CompareItem[] {
  try {
    const filePath = path.join(process.cwd(), "data/generated-vs.json");
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const __all = await (async () => {
return [];
  })();
  return Array.isArray(__all) ? __all.slice(0, 100) : [];
}


export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 2592000;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = getVsData().find((p) => p.slug === params.slug);
  if (!page) {
    return { title: "AI Tool Comparison | Sikhadenge" };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `https://sikhadenge.in/compare/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://sikhadenge.in/compare/${page.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

function normalizeText(value?: string) {
  return (value || "").toLowerCase().trim();
}

function tokenize(value?: string) {
  return normalizeText(value)
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function toTitleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function inferScore(toolName: string, task: string) {
  const tool = normalizeText(toolName);
  const useCase = normalizeText(task);

  let score = 8.8;

  if (tool.includes("chatgpt")) score += 0.3;
  if (tool.includes("claude")) score += 0.3;
  if (tool.includes("gemini")) score += 0.15;
  if (tool.includes("perplexity")) score += 0.1;
  if (tool.includes("copilot")) score += 0.2;
  if (tool.includes("midjourney")) score += 0.35;
  if (tool.includes("firefly")) score += 0.15;
  if (tool.includes("n8n")) score += 0.15;
  if (tool.includes("make")) score += 0.1;

  if (useCase.includes("coding")) {
    if (tool.includes("chatgpt")) score += 0.25;
    if (tool.includes("claude")) score += 0.2;
    if (tool.includes("copilot")) score += 0.3;
  }

  if (useCase.includes("research")) {
    if (tool.includes("perplexity")) score += 0.35;
    if (tool.includes("gemini")) score += 0.15;
  }

  if (useCase.includes("writing") || useCase.includes("copy")) {
    if (tool.includes("claude")) score += 0.3;
    if (tool.includes("chatgpt")) score += 0.2;
  }

  return Number(Math.min(9.8, Math.max(8.5, score)).toFixed(1));
}

function inferStrengths(toolName: string, task: string) {
  const tool = normalizeText(toolName);
  const useCase = normalizeText(task);
  const items: string[] = [];

  if (tool.includes("chatgpt")) {
    items.push("Fast multi-purpose output generation");
    items.push("Strong structured drafting and iteration");
    if (useCase.includes("coding")) items.push("Useful for debugging and code explanation");
  }

  if (tool.includes("claude")) {
    items.push("Handles long context very well");
    items.push("Cleaner long-form reasoning and rewriting");
    if (useCase.includes("writing") || useCase.includes("coding")) {
      items.push("Strong for nuanced logic-heavy responses");
    }
  }

  if (tool.includes("gemini")) {
    items.push("Useful within Google ecosystem workflows");
    items.push("Good multimodal support for mixed tasks");
  }

  if (tool.includes("perplexity")) {
    items.push("Fast answer discovery with source-backed browsing");
    items.push("Strong for research-first workflows");
  }

  if (tool.includes("copilot")) {
    items.push("Helpful inside developer workflow environments");
    items.push("Good inline assistance for code tasks");
  }

  if (tool.includes("midjourney")) {
    items.push("Strong visual quality for image generation");
    items.push("Excellent style-rich creative outputs");
  }

  if (tool.includes("firefly")) {
    items.push("Good fit for Adobe-oriented creative workflows");
    items.push("Easy entry point for branded visual work");
  }

  if (tool.includes("n8n")) {
    items.push("Flexible automation building for advanced users");
    items.push("Good control over multi-step workflows");
  }

  if (tool.includes("make")) {
    items.push("Clean visual automation builder");
    items.push("Fast setup for common business automations");
  }

  if (items.length < 3) {
    items.push(`Useful for ${task.toLowerCase()} workflows`);
    items.push("Good output speed for repeated tasks");
    items.push("Beginner-friendly for standard use cases");
  }

  return items.slice(0, 3);
}

function inferWeaknesses(toolName: string, task: string) {
  const tool = normalizeText(toolName);
  const useCase = normalizeText(task);
  const items: string[] = [];

  if (tool.includes("chatgpt")) {
    items.push("May produce confident but incorrect details without verification");
  }

  if (tool.includes("claude")) {
    items.push("Can feel restrictive in some safety-sensitive requests");
  }

  if (tool.includes("gemini")) {
    items.push("Output consistency can vary by task type");
  }

  if (tool.includes("perplexity")) {
    items.push("Less ideal when you need deep custom drafting");
  }

  if (tool.includes("copilot")) {
    items.push("Best value usually depends on dev-environment fit");
  }

  if (tool.includes("midjourney")) {
    items.push("Less direct control for purely business-document tasks");
  }

  if (tool.includes("firefly")) {
    items.push("May feel less flexible for highly stylized creative exploration");
  }

  if (tool.includes("n8n")) {
    items.push("Can require more setup thinking for beginners");
  }

  if (tool.includes("make")) {
    items.push("Complex logic can become harder to scale cleanly");
  }

  if (useCase.includes("coding")) {
    items.push("Always needs human review before production deployment");
  }

  if (items.length < 2) {
    items.push(`Not always the strongest option for every ${task.toLowerCase()} scenario`);
    items.push("Output still needs manual review for important work");
  }

  return items.slice(0, 3);
}

function inferBestFor(toolName: string, task: string) {
  const tool = normalizeText(toolName);
  const useCase = normalizeText(task);
  const items: string[] = [];

  if (tool.includes("chatgpt")) {
    items.push("Beginners who want fast first drafts");
    items.push("Freelancers handling mixed client tasks");
  }

  if (tool.includes("claude")) {
    items.push("Users working with long context and detailed reasoning");
    items.push("Teams refining complex written or logic-heavy work");
  }

  if (tool.includes("perplexity")) {
    items.push("Research-first users comparing information quickly");
  }

  if (tool.includes("copilot")) {
    items.push("Developers working inside coding environments");
  }

  if (tool.includes("midjourney") || tool.includes("firefly")) {
    items.push("Creative professionals making visual assets");
  }

  if (tool.includes("n8n") || tool.includes("make")) {
    items.push("Automation-focused users building repeatable workflows");
  }

  if (useCase.includes("coding")) {
    items.push("People testing code ideas before manual validation");
  }

  if (items.length < 2) {
    items.push(`Users solving ${task.toLowerCase()} tasks more efficiently`);
    items.push("Professionals who need repeatable output");
  }

  return items.slice(0, 3);
}

function inferQuickVerdict(page: CompareItem, scoreA: number, scoreB: number) {
  const winner = scoreA >= scoreB ? page.toolA : page.toolB;
  const loser = scoreA >= scoreB ? page.toolB : page.toolA;

  return `For ${page.task.toLowerCase()}, ${winner} is usually the stronger choice for most users, while ${loser} can still be the better fit in specific workflow situations.`;
}

function inferIntro(page: CompareItem) {
  return `Choosing between ${page.toolA} and ${page.toolB} for ${page.task.toLowerCase()} depends on output quality, speed, context handling, and how much manual cleanup you want after generation. This comparison is designed to help students, freelancers, creators, and working professionals quickly decide which tool fits their workflow better.`;
}

function inferMethodology(page: CompareItem) {
  return [
    `We reviewed both tools specifically for ${page.task.toLowerCase()} workflows.`,
    "We compared output clarity, speed, consistency, and practical usability.",
    "We considered beginner use, freelancer delivery, and repeated real-world task execution.",
  ];
}

function buildComparisonRows(page: CompareItem, scoreA: number, scoreB: number) {
  const task = normalizeText(page.task);

  const rows = [
    {
      label: "Overall score",
      a: `${scoreA}/10`,
      b: `${scoreB}/10`,
    },
    {
      label: "Speed",
      a: scoreA >= scoreB ? "Faster for common tasks" : "Good speed with stable output",
      b: scoreB > scoreA ? "Faster for this workflow" : "Good speed with stable output",
    },
    {
      label: "Context handling",
      a: normalizeText(page.toolA).includes("claude") ? "Strong with long context" : "Good for standard context windows",
      b: normalizeText(page.toolB).includes("claude") ? "Strong with long context" : "Good for standard context windows",
    },
    {
      label: "Ease for beginners",
      a: "Easy to start with guided prompting",
      b: "Easy after task-specific testing",
    },
    {
      label: "Best use case",
      a: `Useful for ${page.task.toLowerCase()} workflows`,
      b: `Useful for ${page.task.toLowerCase()} workflows`,
    },
    {
      label: "Human review needed",
      a: task.includes("coding") ? "Required before production use" : "Recommended for important outputs",
      b: task.includes("coding") ? "Required before production use" : "Recommended for important outputs",
    },
  ];

  return rows;
}

function getRelatedLinks(data: CompareItem[], page: CompareItem) {
  if (page.relatedSlugs?.length) {
    const mapped = page.relatedSlugs
      .map((slug) => data.find((item) => item.slug === slug))
      .filter(Boolean) as CompareItem[];

    if (mapped.length >= 4) return mapped.slice(0, 4);
  }

  const currentTaskTokens = new Set(tokenize(page.task));
  const currentToolATokens = new Set(tokenize(page.toolA));
  const currentToolBTokens = new Set(tokenize(page.toolB));

  return data
    .filter((item) => item.slug !== page.slug)
    .map((item) => {
      let score = 0;
      const itemTaskTokens = tokenize(item.task);
      const itemToolTokens = [...tokenize(item.toolA), ...tokenize(item.toolB)];

      itemTaskTokens.forEach((token) => {
        if (currentTaskTokens.has(token)) score += 3;
      });

      itemToolTokens.forEach((token) => {
        if (currentToolATokens.has(token) || currentToolBTokens.has(token)) score += 2;
      });

      if (normalizeText(item.toolA) === normalizeText(page.toolA)) score += 3;
      if (normalizeText(item.toolB) === normalizeText(page.toolB)) score += 3;
      if (normalizeText(item.toolA) === normalizeText(page.toolB)) score += 2;
      if (normalizeText(item.toolB) === normalizeText(page.toolA)) score += 2;

      return { item, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((entry) => entry.item);
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const data = getVsData();
  const page = data.find((p) => p.slug === params.slug);

  if (!page) notFound();

  const scoreA = page.scoreA ?? inferScore(page.toolA, page.task);
  const scoreB = page.scoreB ?? inferScore(page.toolB, page.task);

  const strengthsA = page.strengthsA?.length ? page.strengthsA : inferStrengths(page.toolA, page.task);
  const strengthsB = page.strengthsB?.length ? page.strengthsB : inferStrengths(page.toolB, page.task);

  const weaknessesA = page.weaknessesA?.length ? page.weaknessesA : inferWeaknesses(page.toolA, page.task);
  const weaknessesB = page.weaknessesB?.length ? page.weaknessesB : inferWeaknesses(page.toolB, page.task);

  const bestForA = page.bestForA?.length ? page.bestForA : inferBestFor(page.toolA, page.task);
  const bestForB = page.bestForB?.length ? page.bestForB : inferBestFor(page.toolB, page.task);

  const quickVerdict = page.quickVerdict || inferQuickVerdict(page, scoreA, scoreB);
  const intro = page.intro || inferIntro(page);
  const methodology = page.methodology?.length ? page.methodology : inferMethodology(page);
  const relatedLinks = getRelatedLinks(data, page);
  const comparisonRows = buildComparisonRows(page, scoreA, scoreB);
  const updatedAt = page.updatedAt || "April 2026";

  const winnerTool = scoreA >= scoreB ? page.toolA : page.toolB;
  const winnerReason =
    scoreA >= scoreB
      ? `${page.toolA} currently looks stronger for broad ${page.task.toLowerCase()} use cases because it balances speed, usability, and practical output quality well.`
      : `${page.toolB} currently looks stronger for broad ${page.task.toLowerCase()} use cases because it balances speed, usability, and practical output quality well.`;

  const FAQs = [
    {
      q: `Which is better for ${page.task}: ${page.toolA} or ${page.toolB}?`,
      a: quickVerdict,
    },
    {
      q: `Which tool is better for beginners?`,
      a: `${page.toolA} and ${page.toolB} can both work for beginners, but the better choice depends on whether you want faster drafting, deeper reasoning, better long-context handling, or a more workflow-specific result.`,
    },
    {
      q: `Can I rely fully on AI output for ${page.task}?`,
      a: `No. AI output should still be reviewed manually, especially for technical, client-facing, research, or production-critical work.`,
    },
    {
      q: `How often should this comparison be updated?`,
      a: `AI tools change quickly, so comparisons like this should be reviewed regularly whenever major model, pricing, workflow, or feature updates happen.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://sikhadenge.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare",
        item: "https://sikhadenge.in/compare",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: `https://sikhadenge.in/compare/${page.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-5 py-2 text-sm font-bold text-blue-700 mb-8 uppercase tracking-widest shadow-sm">
            <Scale className="w-5 h-5 mr-3" /> Detailed Comparison
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08] mb-6">
            <span className="text-blue-600">{page.toolA}</span> vs{" "}
            <span className="text-indigo-600">{page.toolB}</span>
            <br />
            for {page.task}
          </h1>

          <p className="text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto font-medium">
            {intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-slate-500">
            <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2">
              <Clock3 className="w-4 h-4 mr-2" />
              Updated: {updatedAt}
            </div>
            <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2">
              <Code2 className="w-4 h-4 mr-2" />
              Use case: {page.task}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Quick verdict</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">{quickVerdict}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white border-2 border-slate-200 shadow-sm rounded-[2rem] p-8 hover:border-blue-300 transition-colors">
            <h3 className="text-3xl font-black text-slate-900 mb-2">{page.toolA}</h3>
            <p className="text-slate-500 font-bold mb-8">
              Performance Score: <span className="text-emerald-500 font-black">{scoreA}/10</span>
            </p>

            <div className="space-y-3 mb-8">
              {strengthsA.map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 shrink-0" />
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-200">
              <p className="font-black text-slate-900 mb-4">Limitations</p>
              <div className="space-y-3">
                {weaknessesA.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mr-3 mt-0.5 shrink-0" />
                    <span className="font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 shadow-sm rounded-[2rem] p-8 hover:border-indigo-300 transition-colors">
            <h3 className="text-3xl font-black text-slate-900 mb-2">{page.toolB}</h3>
            <p className="text-slate-500 font-bold mb-8">
              Performance Score: <span className="text-emerald-500 font-black">{scoreB}/10</span>
            </p>

            <div className="space-y-3 mb-8">
              {strengthsB.map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 shrink-0" />
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-200">
              <p className="font-black text-slate-900 mb-4">Limitations</p>
              <div className="space-y-3">
                {weaknessesB.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mr-3 mt-0.5 shrink-0" />
                    <span className="font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="px-8 md:px-10 py-8 border-b border-slate-200">
            <h2 className="text-3xl font-black text-slate-900 mb-3">Detailed comparison table</h2>
            <p className="text-slate-600 font-medium text-lg">
              A practical side-by-side view for real workflow decisions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-8 py-5 text-sm font-black uppercase tracking-wider text-slate-500">
                    Factor
                  </th>
                  <th className="text-left px-8 py-5 text-sm font-black uppercase tracking-wider text-slate-500">
                    {page.toolA}
                  </th>
                  <th className="text-left px-8 py-5 text-sm font-black uppercase tracking-wider text-slate-500">
                    {page.toolB}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={row.label} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="px-8 py-5 font-black text-slate-900">{row.label}</td>
                    <td className="px-8 py-5 font-medium text-slate-700">{row.a}</td>
                    <td className="px-8 py-5 font-medium text-slate-700">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <Brain className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-black text-slate-900">Best for {page.toolA}</h2>
            </div>
            <div className="space-y-4">
              {bestForA.map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 mt-0.5 shrink-0" />
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <Layers3 className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-black text-slate-900">Best for {page.toolB}</h2>
            </div>
            <div className="space-y-4">
              {bestForB.map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 shrink-0" />
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-slate-200 shadow-xl rounded-[2.5rem] p-10 md:p-12 text-center ring-1 ring-slate-900/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
              <Award className="w-10 h-10 text-amber-600" />
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-4">Current winner for {page.task}</h2>
            <p className="text-xl text-slate-600 font-bold mb-8">{winnerReason}</p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
              <h3 className="text-2xl font-black text-slate-900 mb-3">Winner: {winnerTool}</h3>
              <p className="font-medium text-slate-600 leading-relaxed">
                This recommendation is for broad practical use. Final choice can still change based on budget, workflow style,
                required integrations, context length, and the exact complexity of your task.
              </p>
            </div>

            <Link
              href="https://sikhadenge.in/gen-ai-masterclass/register-one-step"
              className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-full font-black text-xl shadow-2xl border border-slate-700"
            >
              <Lock className="w-5 h-5 mr-3 text-amber-400" />
              Learn Which Tools to Use
            </Link>

            <div className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
              Practical workflow mapping inside AI Masterclass
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <BadgeHelp className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-black text-slate-900">How we evaluated this</h2>
            </div>
            <div className="space-y-4">
              {methodology.map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 shrink-0" />
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Who should read this page</h2>
            <div className="space-y-4">
              {[
                `Students learning ${page.task.toLowerCase()}`,
                `Freelancers comparing tools for client delivery`,
                `Working professionals selecting better AI workflows`,
                `Beginners who want faster tool decisions`,
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 mt-0.5 shrink-0" />
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Read more comparisons</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Explore closely related pages based on similar tools and use cases.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedLinks.map((linkData, i) => (
              <Link
                key={i}
                href={`/compare/${linkData.slug}`}
                className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-[0_15px_40px_rgba(37,99,235,0.08)] hover:border-blue-300 transition-all block text-center"
              >
                <h3 className="text-lg font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                  {linkData.toolA} vs {linkData.toolB}
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{toTitleCase(linkData.task)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 mb-14 text-center">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQs.map((faq, i) => (
              <details
                key={i}
                className="group bg-slate-50 border border-slate-200 rounded-2xl open:bg-white open:ring-2 open:ring-blue-100 transition-all duration-200"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-900 text-lg list-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="w-6 h-6 text-slate-400 group-open:text-blue-600 group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed font-medium pt-2">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900 -z-10"></div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8">Stop guessing. Start building.</h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join the Masterclass and learn which tools fit which workflow, so you can move faster with better output.
        </p>
        <Link
          href="https://sikhadenge.in/gen-ai-masterclass/register-one-step"
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-full font-black text-xl shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-transform hover:-translate-y-1"
        >
          Join AI Masterclass <ArrowRight className="ml-3 w-6 h-6" />
        </Link>
      </section>
    </main>
  );
}
