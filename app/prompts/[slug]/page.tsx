import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import {
  ArrowRight,
  Lock,
  CheckCircle2,
  Terminal,
  ChevronDown,
  Info,
  Clock3,
  Wand2,
  Braces,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

type PromptItem = {
  slug: string;
  title: string;
  description: string;
  target: string;
  tool: string;
  type: string;
  intro?: string;
  useCases?: string[];
  customizationTips?: string[];
  commonMistakes?: string[];
  promptFramework?: string;
  exampleInput?: string;
  expectedOutput?: string;
  updatedAt?: string;
  relatedSlugs?: string[];
};

function getGeneratedPrompts(): PromptItem[] {
  try {
    const filePath = path.join(process.cwd(), "data/generated-prompts.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
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
  const data = getGeneratedPrompts();
  const page = data.find((p) => p.slug === params.slug);

  if (!page) {
    return { title: "Prompt Directory | Sikhadenge" };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `https://sikhadenge.in/prompts/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://sikhadenge.in/prompts/${page.slug}`,
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

function inferIntro(page: PromptItem) {
  return `These ${page.tool} prompts for ${page.target} are designed to help you save time, improve output quality, and avoid weak generic prompting. Instead of starting from scratch, you can use a stronger structure built around clear context, role definition, task clarity, and expected output format.`;
}

function inferUseCases(page: PromptItem) {
  const base = [
    `Daily ${page.target.toLowerCase()} productivity tasks`,
    `Faster first-draft generation using ${page.tool}`,
    `Reducing time spent on repetitive workflow steps`,
  ];

  if (normalizeText(page.target).includes("student")) {
    base.push("Assignments, summaries, notes, and study workflows");
  } else if (normalizeText(page.target).includes("freelancer")) {
    base.push("Client communication, proposals, delivery, and revisions");
  } else if (normalizeText(page.target).includes("business")) {
    base.push("Marketing, operations, planning, and workflow support");
  } else if (normalizeText(page.target).includes("designer")) {
    base.push("Creative direction, ideation, and workflow assistance");
  }

  return base.slice(0, 4);
}

function inferCustomizationTips(page: PromptItem) {
  return [
    "Replace placeholders with your exact industry, task, or project context",
    "Mention your target audience, tone, format, and output goal clearly",
    `Tell ${page.tool} what success should look like before asking for output`,
    "Iterate once with constraints instead of rewriting the whole prompt again",
  ];
}

function inferCommonMistakes(page: PromptItem) {
  return [
    "Using vague instructions without context or role definition",
    "Asking for too much in one step without output structure",
    `Trusting the first ${page.tool} output without refining it`,
    "Skipping examples, constraints, or desired tone",
  ];
}

function inferPromptFramework(page: PromptItem) {
  return `Act as an expert ${page.type === "profession" ? page.target : "digital specialist"} with strong practical experience. Help me with a high-quality workflow for ${page.target}. First understand my objective, current situation, audience, constraints, and desired output format. Then create a step-by-step response that is clear, practical, and easy to execute. Keep the result structured, relevant, and outcome-focused.`;
}

function inferExampleInput(page: PromptItem) {
  return `My role is ${page.target}. I want help with a practical workflow using ${page.tool}. My goal is to improve output quality, save time, and get a result that is ready to use in real work. Give me a structured response with steps, examples, and final output format.`;
}

function inferExpectedOutput(page: PromptItem) {
  return `A structured, role-specific response for ${page.target} that includes clear steps, practical suggestions, and a usable first draft instead of a generic answer.`;
}

function getRelatedLinks(data: PromptItem[], page: PromptItem) {
  if (page.relatedSlugs?.length) {
    const mapped = page.relatedSlugs
      .map((slug) => data.find((item) => item.slug === slug))
      .filter(Boolean) as PromptItem[];

    if (mapped.length >= 8) return mapped.slice(0, 8);
  }

  const currentTargetTokens = new Set(tokenize(page.target));
  const currentToolTokens = new Set(tokenize(page.tool));
  const currentType = normalizeText(page.type);

  return data
    .filter((item) => item.slug !== page.slug)
    .map((item) => {
      let score = 0;

      tokenize(item.target).forEach((token) => {
        if (currentTargetTokens.has(token)) score += 3;
      });

      tokenize(item.tool).forEach((token) => {
        if (currentToolTokens.has(token)) score += 3;
      });

      if (normalizeText(item.type) === currentType) score += 2;
      if (normalizeText(item.tool) === normalizeText(page.tool)) score += 4;
      if (normalizeText(item.target) === normalizeText(page.target)) score += 5;

      return { item, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((entry) => entry.item);
}

export default function PromptDirectoryPage({ params }: { params: { slug: string } }) {
  const data = getGeneratedPrompts();
  const page = data.find((p) => p.slug === params.slug);

  if (!page) notFound();

  const relatedLinks = getRelatedLinks(data, page);
  const intro = page.intro || inferIntro(page);
  const useCases = page.useCases?.length ? page.useCases : inferUseCases(page);
  const customizationTips = page.customizationTips?.length
    ? page.customizationTips
    : inferCustomizationTips(page);
  const commonMistakes = page.commonMistakes?.length
    ? page.commonMistakes
    : inferCommonMistakes(page);
  const promptFramework = page.promptFramework || inferPromptFramework(page);
  const exampleInput = page.exampleInput || inferExampleInput(page);
  const expectedOutput = page.expectedOutput || inferExpectedOutput(page);
  const updatedAt = page.updatedAt || "April 2026";

  const FAQs = [
    {
      q: `How should I use these ${page.tool} prompts for ${page.target}?`,
      a: `Start with the prompt framework, then replace the placeholders with your exact context, output goal, audience, and constraints. Better prompting usually comes from better context, not longer text.`,
    },
    {
      q: `Are these ${page.tool} prompts free to use?`,
      a: `Yes, the visible framework and examples on this page can be used directly. You can also refine them based on your own workflow needs.`,
    },
    {
      q: `Do I need coding knowledge to use these prompts?`,
      a: `No. Most users can work with these prompts without coding knowledge, as long as they clearly explain the task, context, and expected result.`,
    },
    {
      q: `Why do prompts matter for ${page.target}?`,
      a: `A better prompt helps reduce vague outputs, saves time on revisions, and gives more relevant results for real work instead of generic answers.`,
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
        name: "Prompts",
        item: "https://sikhadenge.in/prompts",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: `https://sikhadenge.in/prompts/${page.slug}`,
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
            <Terminal className="w-5 h-5 mr-3" /> Prompt Directory
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08] mb-6">
            Best {page.tool} Prompts for <br />
            <span className="text-blue-600">{page.target}</span>
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
              <Wand2 className="w-4 h-4 mr-2" />
              Tool: {page.tool}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">What this prompt page helps you do</h2>
              <div className="space-y-3">
                {useCases.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 shrink-0" />
                    <span className="font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 max-w-5xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(37,_99,_235,_0.08)] relative group">
          <div className="bg-slate-50 px-6 py-5 flex items-center border-b border-slate-200">
            <div className="flex gap-2.5 mr-4">
              <div className="w-3.5 h-3.5 rounded-full bg-red-400 border border-red-500/20"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-500/20"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-green-400 border border-green-500/20"></div>
            </div>
            <div className="text-sm font-mono text-slate-500 font-semibold tracking-wide">
              prompt_framework.txt
            </div>
          </div>

          <div className="p-8 sm:p-12 font-mono text-lg leading-relaxed text-slate-700 relative bg-[linear-gradient(rgba(241,245,249,0.5)_2px,transparent_2px)] bg-[length:100%_32px]">
            <p className="mb-6">{promptFramework}</p>

            <p className="mb-4 font-bold text-slate-900">Customize it with:</p>
            <ul className="list-none mb-8 space-y-3">
              <li><span className="text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded-md border border-blue-100">[YOUR GOAL]</span></li>
              <li><span className="text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded-md border border-blue-100">[TARGET AUDIENCE]</span></li>
              <li><span className="text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded-md border border-blue-100">[CONTEXT / TASK DETAILS]</span></li>
              <li><span className="text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded-md border border-blue-100">[DESIRED OUTPUT FORMAT]</span></li>
            </ul>

            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white via-white/95 to-transparent flex flex-col items-center justify-end pb-12">
              <div className="mb-6 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm font-bold flex items-center shadow-sm">
                <Lock className="w-4 h-4 mr-2" />
                Advanced workflow library continues below
              </div>
              <Link
                href="https://sikhadenge.in/gen-ai-masterclass/register-one-step"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-black text-xl transition-all hover:scale-105 shadow-[0_10px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)]"
              >
                Unlock Full Prompt Library <ArrowRight className="w-6 h-6 ml-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <Braces className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-black text-slate-900">Customization tips</h2>
            </div>
            <div className="space-y-4">
              {customizationTips.map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 mt-0.5 shrink-0" />
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-6 h-6 text-amber-600 mr-3" />
              <h2 className="text-2xl font-black text-slate-900">Common mistakes</h2>
            </div>
            <div className="space-y-4">
              {commonMistakes.map((item, index) => (
                <div key={index} className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mr-3 mt-0.5 shrink-0" />
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <Sparkles className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-black text-slate-900">Example input</h2>
            </div>
            <p className="text-slate-700 leading-relaxed font-medium">{exampleInput}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <Info className="w-6 h-6 text-emerald-600 mr-3" />
              <h2 className="text-2xl font-black text-slate-900">Expected output style</h2>
            </div>
            <p className="text-slate-700 leading-relaxed font-medium">{expectedOutput}</p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Explore related prompts</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Browse closely related prompt pages based on audience, tool, and intent.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedLinks.map((linkData: PromptItem, i: number) => (
              <Link
                key={i}
                href={`/prompts/${linkData.slug}`}
                className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-[0_15px_40px_rgba(37,99,235,0.08)] hover:border-blue-300 transition-all block"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors">
                    <Terminal className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">
                    {linkData.tool}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                  Prompts for {linkData.target}
                </h3>
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
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8">Get better AI output with better prompts</h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join the Masterclass and access structured prompt systems, workflow templates, and practical AI usage guidance.
        </p>
        <Link
          href="https://sikhadenge.in/gen-ai-masterclass/register-one-step"
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/50 px-12 py-5 rounded-full font-black text-xl shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-transform hover:-translate-y-1"
        >
          Join AI Masterclass <ArrowRight className="ml-3 w-6 h-6" />
        </Link>
      </section>
    </main>
  );
}
