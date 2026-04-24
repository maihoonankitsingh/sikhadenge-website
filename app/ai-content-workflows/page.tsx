import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  FileText,
  FolderKanban,
  Lightbulb,
  MessageSquareText,
  PenSquare,
  RefreshCcw,
  Search,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import HubInternalLinks from "@/components/seo/HubInternalLinks";

export const metadata: Metadata = {
  title: "Create Content with Automate Work with AI | Sikhadenge",
  description:
    "Understand AI content workflows in a practical way. Learn how structured AI-assisted content systems help with ideation, scripting, drafting, editing, repurposing, and publishing across modern digital work.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-content-workflows",
  },
  openGraph: {
    title: "Create Content with Automate Work with AI | Sikhadenge",
    description:
      "A practical guide to AI content workflows across ideation, scripting, drafting, editing, repurposing, and publishing.",
    url: "https://sikhadenge.in/ai-content-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Content with Automate Work with AI | Sikhadenge",
    description:
      "A practical guide to AI content workflows across ideation, scripting, drafting, editing, repurposing, and publishing.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI content workflows are structured systems that use AI support across planning, drafting, editing, and publishing tasks.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, AI content often becomes random, repetitive, or inconsistent. A system improves speed and quality together.",
  },
  {
    title: "Who benefits",
    desc: "Creators, freelancers, teams, founders, educators, and content operators all benefit from better content workflows.",
  },
];

const whatItMeans = [
  {
    icon: Workflow,
    title: "A workflow is more than one prompt",
    desc: "AI content workflows are not just about asking for one caption or one script. They are repeatable systems that connect idea, structure, draft, refinement, and publishing steps.",
  },
  {
    icon: Bot,
    title: "AI supports multiple stages",
    desc: "Useful workflows use AI across ideation, research support, writing support, summarization, repurposing, and content organization rather than one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better execution",
    desc: "A good workflow helps content become clearer, faster, more consistent, and more aligned with the intended audience or platform.",
  },
  {
    icon: Briefcase,
    title: "This matters in real digital work",
    desc: "Modern brands, creators, educators, freelancers, and teams need content systems that scale output without losing structure or relevance.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Ideation",
    desc: "Start with topic directions, hooks, audience angles, content pillars, series ideas, and content opportunities.",
  },
  {
    icon: Search,
    title: "Research Support",
    desc: "Use AI to organize inputs, compare angles, gather supporting points, and improve topic understanding before drafting.",
  },
  {
    icon: PenSquare,
    title: "Drafting",
    desc: "Build first drafts for posts, captions, scripts, outlines, threads, carousels, or short-form content structures.",
  },
  {
    icon: FileText,
    title: "Editing & Refinement",
    desc: "Improve clarity, tighten language, adjust tone, simplify explanations, and remove weak or repetitive sections.",
  },
  {
    icon: RefreshCcw,
    title: "Repurposing",
    desc: "Turn one idea into multiple content formats such as short posts, captions, talking points, scripts, or learning notes.",
  },
  {
    icon: FolderKanban,
    title: "Publishing System",
    desc: "Organize final outputs, content batches, status flow, review checkpoints, and repeatable publishing habits.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Creators",
    desc: "Creators can use AI content workflows to improve consistency across reels, posts, captions, scripts, and content series.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers can use these workflows to support client content production, faster drafts, and cleaner delivery systems.",
  },
  {
    icon: MessageSquareText,
    title: "Personal Brands",
    desc: "Founders, coaches, consultants, and educators can use workflow systems to publish more clearly and more regularly.",
  },
  {
    icon: Workflow,
    title: "Content Teams",
    desc: "Teams can use structured AI workflows to improve planning, content production, revision flow, and multi-format execution.",
  },
];

const relatedPages = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the wider AI skill categories that connect with content systems and practical digital execution.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support content ideation, drafting, refinement, and repeatable workflow building.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how content workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/ai-skills-for-creators",
    title: "AI Skills for Creators",
    desc: "Review the creator-focused AI skill path that connects content, visuals, videos, and publishing systems.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how content workflows connect with broader high-value AI skill development.",
  },
  {
    href: "/blog",
    title: "Blog",
    desc: "Explore supporting content, guides, and future cluster articles connected to AI content systems.",
  },
];

const faqs = [
  {
    q: "What is an AI content workflow?",
    a: "An AI content workflow is a structured process that uses AI across different content stages such as ideation, research support, drafting, editing, repurposing, and publishing.",
  },
  {
    q: "Why are AI content workflows important?",
    a: "They are important because they make content creation more consistent, faster, and easier to manage than random one-off prompting.",
  },
  {
    q: "Can beginners use AI content workflows?",
    a: "Yes. Beginners can start with simple workflows for topic ideas, first drafts, and basic editing before moving into more advanced systems.",
  },
  {
    q: "Are AI content workflows only for creators?",
    a: "No. Creators, freelancers, teams, founders, educators, and personal brands can all use structured content workflows.",
  },
  {
    q: "What is the difference between AI content tools and AI content workflows?",
    a: "Tools are the platforms or software. Workflows are the repeatable systems that show how those tools are used step by step for practical output.",
  },
  {
    q: "Can AI content workflows help with repurposing content?",
    a: "Yes. A strong workflow can turn one content idea into multiple formats such as captions, scripts, post drafts, and short-form talking points.",
  },
  {
    q: "What is the biggest mistake people make with AI content?",
    a: "A common mistake is generating random drafts without a clear idea system, structure, editing step, or audience-focused workflow.",
  },
  {
    q: "Where should someone start with AI content workflows?",
    a: "A good starting point is a simple system: idea, outline, draft, refine, and repurpose. Once that becomes clear, the workflow can expand.",
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

export default function AiContentWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI content workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI content workflows help people move from random content generation to a structured system for
              planning, drafting, refining, and publishing. Instead of relying on one-off prompts, a workflow
              creates a repeatable process that improves clarity, consistency, and execution quality across
              content creation tasks.
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
            title="What AI content workflows actually mean"
            desc="A workflow-based approach makes AI more useful because it places each task inside a practical sequence instead of treating every output like a separate experiment."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {whatItMeans.map((item) => {
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
            title="Core stages inside an AI content workflow"
            desc="A practical content system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI content workflows are commonly used"
            desc="These workflows are relevant wherever content needs to be planned, drafted, refined, and reused in a repeatable way."
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
            desc="These pages connect AI content workflows with the broader Sikhadenge topic cluster around skills, tools, creators, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI content workflows."
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
      <HubInternalLinks hub="ai-content-workflows" />

<section className="border-t border-white/10 bg-[#0B1220]">
  <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
    <h2 className="text-2xl md:text-3xl font-bold text-white">
      Understanding AI in Practical Real-World Context
    </h2>

    <p className="mt-4 text-[#B0B7C3] leading-7">
      Artificial intelligence is no longer limited to advanced technical environments. It is now part of everyday digital work including content creation, design execution, video production, marketing workflows, and automation systems. Understanding how AI fits into real-world execution is more important than simply knowing tools.
    </p>

    <p className="mt-4 text-[#B0B7C3] leading-7">
      Modern learners, freelancers, and professionals are increasingly expected to work across multiple digital layers. This includes combining content thinking, creative output, structured workflows, and AI-assisted execution into a single system. Pages like this help build clarity around how these elements connect.
    </p>

    <h3 className="mt-8 text-xl font-semibold text-white">
      How AI is Changing Digital Work
    </h3>

    <ul className="mt-4 space-y-3 text-[#B0B7C3]">
      <li>• Faster execution of content, design, and video tasks</li>
      <li>• Reduced dependency on manual repetitive work</li>
      <li>• Ability to manage multiple roles with smaller teams</li>
      <li>• Improved consistency in output and workflow systems</li>
      <li>• Higher productivity for individuals and freelancers</li>
    </ul>

    <h3 className="mt-8 text-xl font-semibold text-white">
      Practical Use Cases of AI
    </h3>

    <p className="mt-4 text-[#B0B7C3] leading-7">
      AI is being used in real scenarios such as creating social media content, editing videos faster, generating design ideas, writing marketing copy, building landing pages, and automating repetitive business tasks. The real advantage comes when these use cases are combined into a structured workflow.
    </p>

    <h3 className="mt-8 text-xl font-semibold text-white">
      Why Structured Learning Matters
    </h3>

    <p className="mt-4 text-[#B0B7C3] leading-7">
      Learning isolated tools does not provide long-term value. A structured approach that connects skills, tools, workflows, and real execution scenarios helps learners build strong practical capability. This is especially important for students, freelancers, and professionals who want to work in modern AI-assisted environments.
    </p>
  </div>
</section>

</main>
  );
}
