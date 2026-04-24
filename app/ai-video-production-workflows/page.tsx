import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Camera,
  Clapperboard,
  FileText,
  FolderKanban,
  Lightbulb,
  Mic,
  RefreshCcw,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Edit Videos with AI Production Workflows | Sikhadenge",
  description:
    "Understand AI video production workflows in a practical way. Learn how structured AI-assisted systems help with concept planning, scripting, shot thinking, editing flow, and repeatable video execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-video-production-workflows",
  },
  openGraph: {
    title: "Edit Videos with AI Production Workflows | Sikhadenge",
    description:
      "A practical guide to AI video production workflows across concept planning, scripting, shot thinking, editing flow, and repeatable video execution.",
    url: "https://sikhadenge.in/ai-video-production-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edit Videos with AI Production Workflows | Sikhadenge",
    description:
      "A practical guide to AI video production workflows across concept planning, scripting, shot thinking, editing flow, and repeatable video execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI video production workflows are structured systems that use AI support across concept planning, scripting, production thinking, editing, and final output flow.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, video production becomes slow and scattered. A system improves clarity, speed, consistency, and output quality.",
  },
  {
    title: "Who benefits",
    desc: "Creators, editors, freelancers, marketers, founders, and content teams all benefit from better AI-assisted video production workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than one edit or one tool",
    desc: "AI video production workflows are not limited to generating one script or one visual. They connect concept planning, scripting, shot thinking, edit flow, and repeatable output systems into one process.",
  },
  {
    icon: Bot,
    title: "AI supports multiple video stages",
    desc: "Useful workflows use AI across ideation, scripting, shot breakdown, visual direction, voice support, edit planning, and output refinement instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better video execution",
    desc: "A strong workflow helps video work become more structured, faster to produce, easier to improve, and easier to repeat at scale.",
  },
  {
    icon: Briefcase,
    title: "This matters in real content systems",
    desc: "Modern video work often needs faster turnaround, clearer story flow, stronger production planning, and better execution consistency across repeated content cycles.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Concept & Video Goal Clarity",
    desc: "Start by defining what the video is about, who it is for, what format it fits, and what result the viewer should get from it.",
  },
  {
    icon: FileText,
    title: "Script & Structure Planning",
    desc: "Use AI to support hooks, scene flow, talking points, script drafts, voice structure, and better narrative clarity.",
  },
  {
    icon: Camera,
    title: "Shot Thinking & Production Direction",
    desc: "Plan scenes, visuals, shot sequence, camera intent, background ideas, reference direction, and content structure before editing begins.",
  },
  {
    icon: Mic,
    title: "Audio, Voice & Delivery Support",
    desc: "Support voice lines, narration flow, dialogue clarity, subtitles, audio structure, and speaking rhythm inside the production workflow.",
  },
  {
    icon: RefreshCcw,
    title: "Edit & Refinement Loop",
    desc: "Improve pace, remove weak sections, tighten the narrative, enhance transitions, and refine the final viewer experience through iteration.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Video System",
    desc: "Organize script banks, shot plans, edit patterns, reusable structures, production templates, and repeatable video execution systems.",
  },
];

const useCases = [
  {
    icon: Clapperboard,
    title: "Creators",
    desc: "Creators can use AI video production workflows to produce reels, short videos, explainers, and repeatable content more efficiently.",
  },
  {
    icon: Briefcase,
    title: "Freelancers & Editors",
    desc: "Freelancers and editors can use these workflows to improve client projects, scripting flow, edit planning, and delivery consistency.",
  },
  {
    icon: Sparkles,
    title: "Marketers & Brands",
    desc: "Marketers and brands can use workflow systems to produce campaign videos, promo assets, and repeated short-form content more clearly.",
  },
  {
    icon: Users,
    title: "Content Teams",
    desc: "Teams can use structured workflows to improve coordination, reduce production chaos, and build better repeatable video pipelines.",
  },
];

const relatedPages = [
  {
    href: "/ai-creator-workflows",
    title: "AI Creator Workflows",
    desc: "See how video production connects with broader creator systems including ideas, publishing, and reuse workflows.",
  },
  {
    href: "/ai-content-workflows",
    title: "Create Content with Automate Work with AI",
    desc: "Explore the broader content workflow layer for ideation, scripting, refinement, and structured output systems.",
  },
  {
    href: "/ai-content-repurposing-workflows",
    title: "Create Content with AI Repurposing Workflows",
    desc: "Understand how one video source can turn into multiple content outputs through repeatable reuse systems.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support scripting, visual direction, voice, editing support, and structured video production workflows.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how video production workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how video production workflows connect with broader high-value AI skill development.",
  },
];

const faqs = [
  {
    q: "What is an AI video production workflow?",
    a: "An AI video production workflow is a structured process that uses AI across concept planning, scripting, shot thinking, editing, audio support, and repeatable video execution.",
  },
  {
    q: "Why are AI video production workflows important?",
    a: "They are important because they help creators and teams move from scattered video work to more structured, faster, and more repeatable production systems.",
  },
  {
    q: "Can beginners use AI video production workflows?",
    a: "Yes. Beginners can start with simple workflows for concept clarity, hook writing, script support, and edit planning before using advanced systems.",
  },
  {
    q: "Are AI video production workflows only for editors?",
    a: "No. Creators, editors, freelancers, marketers, founders, brands, and content teams can all use structured AI video production workflows.",
  },
  {
    q: "What is the difference between video tools and video production workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical video execution.",
  },
  {
    q: "Can AI video production workflows help with scripting and editing?",
    a: "Yes. A strong workflow can support hooks, scripts, scene flow, edit clarity, subtitle support, pacing improvements, and repeatable output quality.",
  },
  {
    q: "What is the biggest mistake people make with AI video production?",
    a: "A common mistake is using AI for isolated scripts or visuals without building a full system for planning, production flow, editing, and refinement.",
  },
  {
    q: "Where should someone start with AI video production workflows?",
    a: "A good starting point is a simple system: define the video goal, create a script outline, plan the shot flow, edit clearly, then refine what worked for the next production cycle.",
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

export default function AiVideoProductionWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI video production workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI video production workflows help people move from random video making to a structured system for concept planning,
              scripting, shot thinking, editing, and repeatable output. Instead of relying on disconnected production steps,
              a workflow creates a repeatable process that improves consistency, speed, and practical video execution.
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
            title="What AI video production workflows actually mean"
            desc="A workflow-based video approach makes AI useful because production tasks sit inside a practical sequence instead of becoming disconnected creative actions."
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
            title="Core stages inside an AI video production workflow"
            desc="A practical video system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI video production workflows are commonly used"
            desc="These workflows are relevant wherever video content needs to be planned, produced, refined, and repeated in a structured way."
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
            desc="These pages connect AI video production workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI video production workflows."
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
