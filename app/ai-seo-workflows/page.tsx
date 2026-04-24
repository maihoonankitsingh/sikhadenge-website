import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  ClipboardList,
  FileSearch,
  FileText,
  FolderKanban,
  Lightbulb,
  RefreshCcw,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI SEO Workflows | Sikhadenge",
  description:
    "Understand AI SEO workflows in a practical way. Learn how structured AI-assisted systems help with keyword mapping, search intent analysis, content planning, on-page optimization, updating pages, and repeatable SEO execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-seo-workflows",
  },
  openGraph: {
    title: "AI SEO Workflows | Sikhadenge",
    description:
      "A practical guide to AI SEO workflows across keyword mapping, search intent analysis, content planning, on-page optimization, updating pages, and repeatable SEO execution.",
    url: "https://sikhadenge.in/ai-seo-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SEO Workflows | Sikhadenge",
    description:
      "A practical guide to AI SEO workflows across keyword mapping, search intent analysis, content planning, on-page optimization, updating pages, and repeatable SEO execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI SEO workflows are structured systems that use AI support for keyword mapping, search intent understanding, content planning, on-page improvements, update cycles, and repeatable SEO execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, SEO becomes random and slow. A structured system improves topical planning, content quality, optimization discipline, and long-term search visibility.",
  },
  {
    title: "Who benefits",
    desc: "Founders, marketers, content teams, freelancers, agencies, educators, creators, and businesses building organic traffic all benefit from stronger AI-assisted SEO workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than one keyword list",
    desc: "AI SEO workflows are not limited to collecting keywords. They connect search intent, topic clusters, content structure, page optimization, internal linking, and update logic into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI can support many SEO stages",
    desc: "A useful workflow uses AI across topic expansion, keyword grouping, search intent analysis, content outlining, meta support, internal linking ideas, and update planning instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better search execution",
    desc: "A strong workflow helps SEO become easier to plan, easier to scale, easier to refine, and easier to repeat across many pages and topics.",
  },
  {
    icon: Briefcase,
    title: "This matters in real growth systems",
    desc: "Modern organic growth usually depends on stronger content systems, not random publishing. Weak planning often creates overlap, weak relevance, and poor long-term authority signals.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Topic, Search Intent & Audience Clarity",
    desc: "Start by identifying what topic matters, what the user is searching for, what intent sits behind the query, and what kind of page should solve that need.",
  },
  {
    icon: ClipboardList,
    title: "Keyword Mapping & Cluster Planning",
    desc: "Use AI to group related queries, map primary and supporting keywords, identify subtopics, and structure stronger topic clusters for long-term SEO coverage.",
  },
  {
    icon: FileText,
    title: "Outline, Content & On-Page Support",
    desc: "Build clearer outlines, headings, supporting sections, meta descriptions, FAQ ideas, internal link opportunities, and stronger on-page structure for each page.",
  },
  {
    icon: Search,
    title: "Optimization & Search Relevance Direction",
    desc: "Plan how the page should match search intent through content clarity, scannability, keyword relevance, semantic depth, and stronger page usefulness.",
  },
  {
    icon: RefreshCcw,
    title: "Updating & Improvement Loop",
    desc: "Refine weak pages, expand thin sections, improve titles, adjust internal linking, refresh FAQs, and strengthen topical relevance through repeated updates.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable SEO System",
    desc: "Organize topic maps, keyword clusters, page templates, update notes, internal linking logic, and publishing plans into a repeatable SEO workflow system.",
  },
];

const useCases = [
  {
    icon: TrendingUp,
    title: "Businesses & Growth Teams",
    desc: "Businesses and growth teams can use AI SEO workflows to build stronger organic traffic systems, improve topic coverage, and manage content execution with more discipline.",
  },
  {
    icon: Sparkles,
    title: "Founders & Personal Brands",
    desc: "Founders and personal brands can use these workflows to build authority, improve discoverability, and publish more structured SEO-focused content.",
  },
  {
    icon: Briefcase,
    title: "Freelancers & Agencies",
    desc: "Freelancers and agencies can use workflow systems to create stronger SEO delivery, faster planning, better page structure, and clearer optimization processes.",
  },
  {
    icon: Users,
    title: "Content & Education Teams",
    desc: "Content teams and education brands can use structured workflows to scale topic clusters, improve internal linking, and create more useful search-focused pages.",
  },
];

const relatedPages = [
  {
    href: "/ai-content-planning-workflows",
    title: "Create Content with AI Planning Workflows",
    desc: "See how SEO execution connects with planning systems, topic sequencing, publishing consistency, and structured content preparation.",
  },
  {
    href: "/ai-content-workflows",
    title: "Create Content with Automate Work with AI",
    desc: "Understand how SEO workflows connect with content creation systems, outline quality, content depth, and repeatable publishing models.",
  },
  {
    href: "/ai-marketing-workflows",
    title: "Market with Automate Work with AI",
    desc: "Explore how SEO fits into broader marketing systems, audience communication, acquisition strategy, and long-term traffic growth.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how SEO-related AI workflows fit into a broader practical skill stack for digital growth and modern online work.",
  },
  {
    href: "/blog",
    title: "Blog",
    desc: "Explore more AI learning pages, search-friendly content, topic cluster articles, and authority-building educational resources.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how SEO workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI SEO workflow?",
    a: "An AI SEO workflow is a structured process that uses AI across topic planning, keyword grouping, search intent analysis, content structuring, optimization, and repeatable SEO execution.",
  },
  {
    q: "Why are AI SEO workflows important?",
    a: "They are important because they help individuals and teams move from random content publishing to more structured, relevant, and repeatable organic growth systems.",
  },
  {
    q: "Can beginners use AI SEO workflows?",
    a: "Yes. Beginners can start with simple workflows for keyword grouping, search intent understanding, page outlines, and on-page improvements before using more advanced systems.",
  },
  {
    q: "Are AI SEO workflows only for large websites?",
    a: "No. Founders, freelancers, agencies, education brands, bloggers, small businesses, and content teams can all use structured AI SEO workflows.",
  },
  {
    q: "What is the difference between SEO tools and SEO workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical SEO execution.",
  },
  {
    q: "Can AI SEO workflows help with content updates?",
    a: "Yes. A strong workflow can support page expansion, title improvements, internal link updates, FAQ refreshes, content restructuring, and stronger search relevance over time.",
  },
  {
    q: "What is the biggest mistake people make with AI in SEO?",
    a: "A common mistake is generating keyword-heavy content without building a proper system for search intent, page usefulness, topic clusters, internal linking, and structured updates.",
  },
  {
    q: "Where should someone start with AI SEO workflows?",
    a: "A good starting point is a simple system: choose one topic, map related keywords, define search intent, create a strong outline, publish the page, then improve it through updates and internal links.",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-5 py-3 text-[15px] font-semibold leading-none text-[#245EEA] shadow-[0_4px_16px_rgba(37,99,235,0.08)]">
      {children}
    </div>
  );
}

function SectionTitle({
  pill,
  title,
  desc,
}: {
  pill: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-4xl">
      <Pill>{pill}</Pill>
      <h2 className="mt-7 text-[38px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#071533] md:text-[56px]">
        {title}
      </h2>
      {desc ? (
        <p className="mt-5 max-w-4xl text-[18px] leading-[1.7] text-[#47607F] md:text-[19px]">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

export default function AiSeoWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI SEO workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI SEO workflows help people move from disconnected optimization tasks to a structured system for topic
              planning, keyword mapping, content outlining, on-page improvements, update cycles, and repeatable search
              execution. Instead of relying on random SEO actions, a workflow creates a practical process that improves
              relevance, clarity, and long-term organic growth discipline.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-skills"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {quickInfo.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-[#D8E5F4] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
              >
                <h3 className="text-[22px] font-semibold leading-[1.25] text-[#071533]">{item.title}</h3>
                <p className="mt-4 text-[17px] leading-[1.75] text-[#47607F]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="What this means"
            title="What AI SEO workflows actually mean"
            desc="A workflow-based SEO approach makes AI useful because search decisions sit inside a practical sequence instead of becoming random keyword use or random content publishing."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {meaningBlocks.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="grid grid-cols-[92px_1fr] gap-5 rounded-[30px]">
                  <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[24px] border border-[#CFE0F6] bg-[#EAF2FE] shadow-[0_10px_24px_rgba(37,99,235,0.06)]">
                    <Icon className="h-8 w-8 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <div className="pt-2">
                    <h3 className="text-[20px] font-semibold leading-[1.3] text-[#071533]">{item.title}</h3>
                    <p className="mt-4 max-w-[620px] text-[17px] leading-[1.85] text-[#47607F]">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Workflow stages"
            title="Core stages inside an AI SEO workflow"
            desc="A practical SEO system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {workflowStages.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[34px] border border-[#0E3A83] bg-[linear-gradient(180deg,#022A67_0%,#011B46_100%)] p-7 shadow-[0_18px_38px_rgba(1,27,70,0.22)]"
                >
                  <div className="flex h-[98px] w-[98px] items-center justify-center rounded-[28px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.07)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <Icon className="h-8 w-8 text-white" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-10 text-[20px] font-semibold leading-[1.35] text-white">{item.title}</h3>
                  <p className="mt-4 text-[17px] leading-[1.8] text-[#C9D7F0]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Use cases"
            title="Where AI SEO workflows are commonly used"
            desc="These workflows are relevant wherever organic traffic, topical authority, page quality, and search-focused content need to be built in a structured way."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {useCases.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[30px] border border-[#D8E5F4] bg-white p-7 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-[82px] w-[82px] items-center justify-center rounded-[24px] border border-[#CFE0F6] bg-[#EAF2FE]">
                    <Icon className="h-7 w-7 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-7 text-[20px] font-semibold leading-[1.35] text-[#071533]">{item.title}</h3>
                  <p className="mt-4 text-[17px] leading-[1.82] text-[#47607F]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Related pages"
            title="Explore connected AI learning pages"
            desc="These pages connect AI SEO workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[30px] border border-[#D8E5F4] bg-[#FBFDFF] p-7 shadow-[0_10px_28px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:border-[#BFD4F3] hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[20px] font-semibold leading-[1.35] text-[#071533]">{item.title}</h3>
                    <p className="mt-4 text-[16px] leading-[1.78] text-[#47607F]">{item.desc}</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-[#2563EB] transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="FAQs"
            title="Frequently asked questions"
            desc="These are the common questions people ask before building structured AI SEO workflows."
          />

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-[28px] border border-[#D8E5F4] bg-white px-6 py-5 shadow-[0_6px_18px_rgba(15,23,42,0.03)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-semibold leading-[1.5] text-[#071533] marker:content-none">
                  <span>{item.q}</span>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-[#D8E5F4] bg-[#F9FBFF] text-[#2563EB] transition group-open:rotate-180">
                    <ArrowRight className="h-4 w-4 rotate-90" />
                  </span>
                </summary>
                <p className="pt-4 pr-2 text-[16px] leading-[1.85] text-[#47607F]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
    </main>
  );
}
