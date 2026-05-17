import type { Metadata } from "next";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const fetchCache = "force-no-store";

type PageProps = {
  params: {
    slug: string;
  };
};

function cleanSlug(input: string): string {
  return decodeURIComponent(input || "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleCase(input: string): string {
  const special: Record<string, string> = {
    ai: "AI",
    seo: "SEO",
    aeo: "AEO",
    geo: "GEO",
    hr: "HR",
    ui: "UI",
    ux: "UX",
    api: "API",
    crm: "CRM",
    kpi: "KPI",
    sql: "SQL",
    mvp: "MVP",
    saas: "SaaS",
    chatgpt: "ChatGPT",
    claude: "Claude",
    gemini: "Gemini",
    copilot: "Copilot",
    grok: "Grok",
    meta: "Meta",
    perplexity: "Perplexity",
    semrush: "SEMrush",
    ahrefs: "Ahrefs",
    hubspot: "HubSpot",
    mailchimp: "Mailchimp",
    shopify: "Shopify",
    wordpress: "WordPress",
    jasper: "Jasper",
    excel: "Excel",
    google: "Google",
    sheets: "Sheets",
    power: "Power",
    bi: "BI",
    tableau: "Tableau",
    looker: "Looker",
    airtable: "Airtable",
    canva: "Canva",
    figma: "Figma",
    midjourney: "Midjourney",
    leonardo: "Leonardo",
    dall: "DALL",
    gamma: "Gamma",
    flow: "Flow",
    capcut: "CapCut",
    descript: "Descript",
    elevenlabs: "ElevenLabs",
    heygen: "HeyGen",
    veo: "Veo",
    otter: "Otter",
    fireflies: "Fireflies",
    cursor: "Cursor",
    lovable: "Lovable",
    bolt: "Bolt",
    replit: "Replit",
    n8n: "n8n",
    zapier: "Zapier",
    make: "Make",
    notion: "Notion",
    notebooklm: "NotebookLM",
    slack: "Slack",
  };

  return cleanSlug(input)
    .split("-")
    .filter(Boolean)
    .map((w) => special[w] || w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function parseSlug(rawSlug: string) {
  const slug = cleanSlug(rawSlug);

  const full = slug.match(/^how-to-use-(.+)-for-(.+)-as-(.+)$/);
  if (full) {
    const tool = titleCase(full[1]);
    const skill = titleCase(full[2]);
    const audience = titleCase(full[3]);

    return {
      slug,
      tool,
      skill,
      audience,
      title: `How ${audience} Can Use ${tool} for ${skill}`,
      canonical: `https://sikhadenge.in/learn/${slug}`,
    };
  }

  const basic = slug.match(/^how-to-use-(.+)-for-(.+)$/);
  if (basic) {
    const tool = titleCase(basic[1]);
    const skill = titleCase(basic[2]);

    return {
      slug,
      tool,
      skill,
      audience: "Students, freshers, freelancers, creators, founders, and working professionals",
      title: `How to Use ${tool} for ${skill}`,
      canonical: `https://sikhadenge.in/learn/${slug}`,
    };
  }

  const title = titleCase(slug);

  return {
    slug,
    tool: "AI Tools",
    skill: title,
    audience: "Students, freshers, freelancers, creators, founders, and working professionals",
    title,
    canonical: `https://sikhadenge.in/learn/${slug}`,
  };
}

function getData(slug: string) {
  const data = parseSlug(slug);

  return {
    ...data,
    description: `Learn ${data.title} with practical steps, workflow examples, portfolio ideas, job-focused use cases, and clear implementation guidance from Sikhadenge.`,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = getData(params.slug);

  return {
    title: `${data.title}`,
    description: data.description,
    alternates: {
      canonical: data.canonical,
    },
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
      title: `${data.title}`,
      description: data.description,
      url: data.canonical,
      siteName: "Sikhadenge",
      type: "article",
    },
  };
}

export default function LearnPage({ params }: PageProps) {
  const data = getData(params.slug);

  const faqs = [
    {
      q: `Can I learn ${data.tool} for ${data.skill} without coding?`,
      a: `Yes. Most learners can start with practical workflows, examples, templates, and small projects before moving into advanced technical depth.`,
    },
    {
      q: "Who should read this guide?",
      a: `This guide is useful for ${data.audience}. It is also useful for people preparing for jobs, freelancing, business workflows, or AI-assisted productivity.`,
    },
    {
      q: "What should I practice first?",
      a: "Start with one real use case, create one useful output, review the quality, document the steps, and save it as portfolio proof.",
    },
    {
      q: "How does Sikhadenge help?",
      a: "Sikhadenge focuses on practical AI workflows, no-code career direction, portfolio projects, and job-ready execution instead of only theory.",
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.title,
      description: data.description,
      url: data.canonical,
      mainEntityOfPage: data.canonical,
      publisher: {
        "@type": "Organization",
        name: "Sikhadenge",
        url: "https://sikhadenge.in",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://sikhadenge.in" },
        { "@type": "ListItem", position: 2, name: "Learn", item: "https://sikhadenge.in/learn" },
        { "@type": "ListItem", position: 3, name: data.title, item: data.canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: data.title,
      description: data.description,
      url: data.canonical,
      teaches: data.skill,
      learningResourceType: "Guide",
      educationalLevel: "Beginner to intermediate",
      provider: {
        "@type": "Organization",
        name: "Sikhadenge",
        url: "https://sikhadenge.in",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ];

  const cards = [
    ["Understand the use case", `Know where ${data.skill} creates value and what output is expected.`],
    ["Build the workflow", `Use ${data.tool} with clear inputs, examples, review steps, and reusable process thinking.`],
    ["Create proof of work", "Make one portfolio sample such as a checklist, SOP, report, brief, dashboard, workflow, or case study."],
    ["Apply with positioning", "Explain the problem, tool, workflow, result, and business value in simple language."],
  ];

  return (
    <main className="bg-[#F5F7F3] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="text-white" style={{ background: "linear-gradient(135deg,#0F766E 0%,#0E7490 45%,#061426 100%)" }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-8">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {["No coding required", "Practical AI jobs", "Portfolio proof", "Workflow-first learning"].map((badge) => (
                <span key={badge} className="rounded-full bg-white/10 px-4 py-2 text-[11px] font-bold ring-1 ring-white/20">
                  {badge}
                </span>
              ))}
            </div>

            <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              Practical AI learning guide
            </p>

            <h1 className="mt-3 max-w-4xl text-[42px] font-black leading-[0.98] tracking-tight sm:text-[56px] lg:text-[70px]">
              {data.title}
            </h1>

            <p className="mt-5 max-w-3xl text-[17px] leading-8 text-white/90">
              {data.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/contact-us" className="rounded-2xl bg-[#F8D94E] px-7 py-3.5 text-sm font-black text-slate-950 shadow-lg hover:bg-[#F3D13B]">
                Join Free Masterclass →
              </a>
              <a href="https://wa.me/918808505575" className="rounded-2xl bg-white/10 px-7 py-3.5 text-sm font-black text-white ring-1 ring-white/20 hover:bg-white/15">
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <aside className="rounded-[32px] bg-[#F6ECD8] p-5 shadow-2xl shadow-black/15">
            <div className="rounded-[24px] bg-[#020817] p-6 text-white">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-yellow-300">
                Free AI Career Masterclass
              </p>
              <h2 className="mt-3 text-[34px] font-black leading-[1.02]">
                Start with no-code AI roles
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Learn tools, workflows, portfolio proof, and practical career direction.
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {[
                ["Mode", "Live online masterclass"],
                ["Roadmap", "No-code AI job path"],
                ["Outcome", "Portfolio direction"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[18px] bg-white px-4 py-4 text-slate-950 shadow-sm ring-1 ring-slate-200">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{label}</div>
                  <div className="mt-1 text-sm font-black">{value}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="space-y-8">
            <div className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-emerald-700">
                Practical execution plan
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-[40px]">
                What to learn first, what to practice, and how to show proof
              </h2>
              <p className="mt-5 text-[15px] leading-8 text-slate-700">
                Start by understanding where {data.tool} helps in {data.skill}. Then create a simple workflow, produce a sample output, review it, and document the result as proof of work.
              </p>
              <p className="mt-4 text-[15px] leading-8 text-slate-700">
                The goal is not only to watch tutorials. The goal is to build a repeatable process that can be used in jobs, freelancing, business operations, content work, research, reporting, or automation.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {cards.map(([title, text]) => (
                <div key={title} className="rounded-[22px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h3 className="text-[22px] font-black leading-tight">{title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-slate-600">{text}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-emerald-700">
                AEO answer section
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                Direct answer: best way to learn this
              </h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-700">
                The best way to learn {data.title} is to start with one practical use case, use {data.tool} to create a useful output, review the result, and turn the final workflow into portfolio proof.
              </p>
            </div>

            <div className="rounded-[24px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-3xl font-black tracking-tight">Frequently asked questions</h2>
              <div className="mt-6 space-y-3">
                {faqs.map((item) => (
                  <details key={item.q} className="rounded-[18px] bg-slate-50 px-5 py-4 ring-1 ring-slate-200">
                    <summary className="cursor-pointer text-[15px] font-black">{item.q}</summary>
                    <p className="mt-3 text-[15px] leading-7 text-slate-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </article>

          <aside className="h-fit rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-24">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-emerald-700">Best for</p>
            <h2 className="mt-3 text-[30px] font-black leading-tight">
              Learners who want practical AI career direction
            </h2>
            <div className="mt-6 space-y-3">
              {["Students and freshers", "Working professionals", "Freelancers and creators", "Business owners and teams"].map((item) => (
                <div key={item} className="rounded-[16px] bg-slate-50 px-4 py-3 text-sm font-bold ring-1 ring-slate-200">
                  ✓ {item}
                </div>
              ))}
            </div>
            <a href="/contact-us" className="mt-6 block rounded-[18px] bg-[#041225] px-5 py-3 text-center text-sm font-black text-white hover:bg-[#061A33]">
              Join Free Masterclass →
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
