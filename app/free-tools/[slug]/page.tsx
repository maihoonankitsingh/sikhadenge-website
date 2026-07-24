import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import {
  ArrowRight,
  Lock,
  Sparkles,
  Settings,
  Activity,
  ShieldCheck,
  Terminal,
} from "lucide-react";

const BASE_URL = "https://sikhadenge.in";
const REVIEWED_ISO = "2026-07-25";
const REVIEWED_LABEL = "July 25, 2026";

type ToolPage = {
  slug: string;
  title: string;
  name: string;
  task: string;
  description: string;
};

function getGeneratedTools(): ToolPage[] {
  try {
    const filePath = path.join(process.cwd(), "data/generated-mini-tools.json");
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function pageTitle(page: ToolPage) {
  return `${page.name} Workflow Guide and Preview`;
}

function pageDescription(page: ToolPage) {
  return `Learn the inputs, workflow, review steps, and output structure commonly used for ${page.task.trim()} with this ${page.name} guide from Sikhadenge.`;
}

function tokens(value: string) {
  return new Set(
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .split(/\s+/)
      .filter((token) => token.length >= 3),
  );
}

function selectRelatedTools(data: ToolPage[], page: ToolPage, limit = 8) {
  const source = tokens(`${page.name} ${page.task} ${page.description}`);

  return data
    .filter((item) => item.slug !== page.slug)
    .map((item) => {
      const candidate = tokens(`${item.name} ${item.task} ${item.description}`);
      let score = 0;
      source.forEach((token) => {
        if (candidate.has(token)) score += 1;
      });
      return { item, score };
    })
    .sort((left, right) => right.score - left.score || left.item.slug.localeCompare(right.item.slug))
    .slice(0, limit)
    .map((entry) => entry.item);
}

export async function generateStaticParams() {
  return getGeneratedTools().map((page) => ({ slug: page.slug }));
}

export const dynamicParams = true;
export const revalidate = 2592000;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getGeneratedTools().find((item) => item.slug === params.slug);

  if (!page) {
    return {
      title: "Free AI Workflow Guides",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `${BASE_URL}/free-tools/${page.slug}`;
  const title = pageTitle(page);
  const description = pageDescription(page);

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: "Sikhadenge",
      title,
      description,
      images: [{ url: `${BASE_URL}/images/og/og-home.jpg`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/images/og/og-home.jpg`],
    },
  };
}

export default function FreeToolPage({ params }: { params: { slug: string } }) {
  const data = getGeneratedTools();
  const page = data.find((item) => item.slug === params.slug);

  if (!page) notFound();

  const canonical = `${BASE_URL}/free-tools/${page.slug}`;
  const relatedLinks = selectRelatedTools(data, page);
  const faqs = [
    {
      q: `What does this ${page.name} page help me understand?`,
      a: `It explains the inputs, output structure, and practical workflow commonly used for ${page.task.trim()}. It is an educational preview, not a promise of an automatic result.`,
    },
    {
      q: "Can I generate a result directly on this page?",
      a: "No. The controls shown here are a guided interface preview. Public generation is not enabled on this page, so the call to action leads to Sikhadenge training and workflow guidance.",
    },
    {
      q: "Do I need coding experience to learn this workflow?",
      a: "No. The workflow can be understood with plain-language instructions, but important outputs still require human review, fact checking, and task-specific judgment.",
    },
    {
      q: "How should I use AI-generated output responsibly?",
      a: "Review accuracy, originality, privacy, permissions, and platform rules before publishing or using an output for clients, employment, business, or other important decisions.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: pageTitle(page),
        description: pageDescription(page),
        dateModified: REVIEWED_ISO,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        author: { "@id": `${BASE_URL}/authors/sikhadenge-editorial-team#organization` },
        publisher: { "@id": `${BASE_URL}/#organization` },
        about: { "@type": "Thing", name: page.name, description: page.task.trim() },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "AI Tools", item: `${BASE_URL}/ai-tools` },
          { "@type": "ListItem", position: 3, name: page.name, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
        <div className="max-w-4xl mx-auto relative z-10">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center justify-center gap-2">
              <li><Link className="hover:text-slate-900" href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link className="hover:text-slate-900" href="/ai-tools">AI Tools</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-700" aria-current="page">{page.name}</li>
            </ol>
          </nav>

          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-5 py-2 text-sm font-bold text-blue-700 mb-8 uppercase tracking-widest shadow-sm">
              <ShieldCheck className="w-5 h-5 mr-3" /> Sikhadenge Workflow Preview
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6 drop-shadow-sm">
              Free AI Workflow <br /><span className="text-blue-600">{page.name}</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
              {pageDescription(page)}
            </p>
          </div>

          <section className="mt-10 rounded-3xl border border-blue-100 bg-blue-50/80 p-6 text-left shadow-sm" aria-labelledby="tool-direct-answer">
            <h2 id="tool-direct-answer" className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Direct answer</h2>
            <p className="mt-3 text-base leading-7 text-slate-700">
              A {page.name} workflow helps structure the information needed for {page.task.trim().toLowerCase()}, organize the expected output, and define the human checks required before the result is used.
            </p>
          </section>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" aria-labelledby="workflow-preview">
        <h2 id="workflow-preview" className="sr-only">Workflow interface preview</h2>
        <div className="grid lg:grid-cols-12 gap-8 items-start h-full">
          <div className="lg:col-span-5 bg-white border border-slate-200 shadow-sm rounded-[2rem] p-8 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold flex items-center">
                <Settings className="w-5 h-5 text-indigo-500 mr-2" /> Example inputs
              </h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Subject or context</label>
                <input type="text" placeholder="e.g. Technology, Business..." disabled className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-600 font-medium hover:cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Detailed variables</label>
                <textarea rows={4} placeholder="Describe the audience, constraints, source material, and expected output..." disabled className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-600 font-medium hover:cursor-not-allowed resize-none" />
              </div>
              <div className="pt-4">
                <Link href="/gen-ai-masterclass/register-one-step" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xl py-4 rounded-xl flex items-center justify-center shadow-md transition-all hover:scale-[1.02]">
                  <Sparkles className="w-5 h-5 mr-3" /> Learn this workflow
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-[600px] rounded-[2rem] bg-white border border-slate-200 shadow-sm relative overflow-hidden flex flex-col">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
              <div className="flex gap-2.5" aria-hidden="true">
                <span className="w-3.5 h-3.5 rounded-full bg-red-400 border border-red-500/20" />
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-500/20" />
                <span className="w-3.5 h-3.5 rounded-full bg-green-400 border border-green-500/20" />
              </div>
              <div className="text-sm font-mono text-slate-500 font-semibold tracking-wide flex items-center">
                <Activity className="w-4 h-4 mr-2" /> Example output preview
              </div>
            </div>
            <div className="p-10 flex-1 relative bg-[linear-gradient(rgba(241,245,249,0.5)_2px,transparent_2px)] bg-[length:100%_32px]">
              <div className="max-w-2xl mx-auto space-y-6 opacity-60 blur-[3px]" aria-hidden="true">
                <div className="w-3/4 h-8 bg-slate-200 rounded-lg" />
                <div className="w-full h-4 bg-slate-200 rounded" />
                <div className="w-11/12 h-4 bg-slate-200 rounded" />
                <div className="w-full h-4 bg-slate-200 rounded" />
                <div className="pt-6" />
                <div className="w-1/2 h-8 bg-slate-200 rounded-lg" />
                <div className="w-full h-4 bg-slate-200 rounded" />
                <div className="w-full h-4 bg-slate-200 rounded" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-white via-white/95 to-transparent flex flex-col items-center justify-end pb-12 z-20">
              <div className="mb-6 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm font-bold flex items-center shadow-sm">
                <Lock className="w-4 h-4 mr-2" />
                Preview only — public generation is not enabled on this page
              </div>
              <Link href="/gen-ai-masterclass/register-one-step" className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-full font-black text-xl transition-all hover:scale-105 shadow-xl border border-slate-700">
                Learn the full workflow <ArrowRight className="w-6 h-6 ml-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Explore related AI workflow previews</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Use these pages to compare common task structures and identify the inputs and review steps each workflow needs.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedLinks.map((linkData) => (
              <Link key={linkData.slug} href={`/free-tools/${linkData.slug}`} className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-[0_15px_40px_rgba(37,99,235,0.08)] hover:border-blue-300 transition-all block">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 border border-blue-100 group-hover:bg-blue-600 transition-colors">
                    <Terminal className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Workflow preview</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">{linkData.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 mb-14 text-center">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-slate-50 border border-slate-200 rounded-2xl open:bg-white open:ring-2 open:ring-blue-100 transition-all duration-200">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-900 text-lg list-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <svg className="w-6 h-6 text-blue-600 group-open:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed font-medium pt-2">{faq.a}</div>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-600">
            <p>
              Reviewed by the{" "}
              <Link className="font-semibold text-blue-700 hover:underline" href="/authors/sikhadenge-editorial-team">Sikhadenge Editorial Team</Link>{" "}
              on {REVIEWED_LABEL}. Read the{" "}
              <Link className="font-semibold text-blue-700 hover:underline" href="/editorial-policy">editorial policy</Link>{" "}
              or report a page issue through the{" "}
              <Link className="font-semibold text-blue-700 hover:underline" href="/contact-us">contact page</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900 -z-10" />
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8">Build practical AI workflows</h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">Join the free masterclass to learn prompt structure, output verification, privacy checks, and repeatable workflow design for common tasks.</p>
        <Link href="/gen-ai-masterclass/register-one-step" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/50 px-12 py-5 rounded-full font-black text-xl shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-transform hover:-translate-y-1">
          Join the free AI masterclass <ArrowRight className="ml-3 w-6 h-6" />
        </Link>
      </section>
    </main>
  );
}
