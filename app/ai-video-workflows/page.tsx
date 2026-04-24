import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Camera,
  Clapperboard,
  FileVideo,
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
  title: "Edit Videos with Automate Work with AI | Sikhadenge",
  description:
    "Understand AI video workflows in a practical way. Learn how structured AI-assisted video systems help with ideation, scripting, shot planning, asset support, editing, and final output creation.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-video-workflows",
  },
  openGraph: {
    title: "Edit Videos with Automate Work with AI | Sikhadenge",
    description:
      "A practical guide to AI video workflows across ideation, scripting, shot planning, editing support, and final output systems.",
    url: "https://sikhadenge.in/ai-video-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edit Videos with Automate Work with AI | Sikhadenge",
    description:
      "A practical guide to AI video workflows across ideation, scripting, shot planning, editing support, and final output systems.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI video workflows are structured systems that use AI support across planning, scripting, asset preparation, editing, and delivery.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, AI video often becomes random generation or disconnected edits. A system improves speed, clarity, and output quality.",
  },
  {
    title: "Who benefits",
    desc: "Creators, editors, freelancers, marketers, and teams all benefit from better AI-assisted video workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than one video tool",
    desc: "AI video workflows are not just about one generator or one editing shortcut. They connect idea, script, sequence planning, assets, editing logic, and final output into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI supports multiple video stages",
    desc: "Useful workflows use AI across ideation, scripting, voice support, shot planning, visual support, edit direction, and output refinement instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is stronger video execution",
    desc: "A good workflow helps videos become clearer, more platform-ready, more structured, and more aligned with the intended audience or business objective.",
  },
  {
    icon: Briefcase,
    title: "This matters in real digital work",
    desc: "Modern digital work often needs faster reels, explainers, content clips, ad creatives, and educational videos with better repeatable execution.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Idea & Format Planning",
    desc: "Start with topic, audience, objective, content angle, platform format, and video intent before creating anything.",
  },
  {
    icon: Clapperboard,
    title: "Script & Sequence Planning",
    desc: "Use AI to structure hooks, scene flow, talking points, shot logic, and short-form or long-form video sequence planning.",
  },
  {
    icon: Camera,
    title: "Asset & Shot Support",
    desc: "Build references, visual directions, image assets, B-roll logic, shot ideas, and creative support materials for smoother editing.",
  },
  {
    icon: Mic,
    title: "Voice & Audio Support",
    desc: "Use AI to support narration drafts, voiceover text, subtitle flow, and audio planning for stronger viewer clarity.",
  },
  {
    icon: RefreshCcw,
    title: "Editing & Refinement",
    desc: "Improve pacing, transitions, clarity, subtitles, structure, retention flow, and visual consistency through revision cycles.",
  },
  {
    icon: FolderKanban,
    title: "Final Output System",
    desc: "Organize versions, aspect ratios, export logic, review checkpoints, and repeatable publishing systems for final delivery.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Creators",
    desc: "Creators can use AI video workflows for reels, explainers, talking-head content, short videos, and repeated platform publishing.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers can use these workflows to improve client video delivery, scripting speed, asset planning, and cleaner revisions.",
  },
  {
    icon: FileVideo,
    title: "Editors",
    desc: "Editors can use structured AI workflows to support planning, rough structure, subtitle flow, and faster production systems.",
  },
  {
    icon: Workflow,
    title: "Marketing Teams",
    desc: "Teams can use video workflows for campaign creatives, ad videos, social content, and consistent multi-format production.",
  },
];

const relatedPages = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the wider AI skill categories that connect with video systems and practical digital execution.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support video ideation, scripting, generation, editing, and structured creative workflows.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how video workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/ai-skills-for-creators",
    title: "AI Skills for Creators",
    desc: "Review the creator-focused AI skill path that connects video, design, content, and publishing systems.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how video workflows connect with broader high-value AI skill development.",
  },
  {
    href: "/ai-content-workflows",
    title: "Create Content with Automate Work with AI",
    desc: "Explore the connected workflow layer for ideation, scripts, drafts, repurposing, and content systems.",
  },
];

const faqs = [
  {
    q: "What is an AI video workflow?",
    a: "An AI video workflow is a structured process that uses AI across idea planning, scripting, shot support, voice support, editing, and final output creation.",
  },
  {
    q: "Why are AI video workflows important?",
    a: "They are important because they make video creation more structured, faster, and more repeatable than random one-off generation or disconnected edits.",
  },
  {
    q: "Can beginners use AI video workflows?",
    a: "Yes. Beginners can start with simple workflows for topic planning, script support, subtitles, and short-form edit structure before moving into advanced systems.",
  },
  {
    q: "Are AI video workflows only for video editors?",
    a: "No. Creators, freelancers, marketers, educators, and content teams can all use structured AI video workflows.",
  },
  {
    q: "What is the difference between AI video tools and AI video workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that show how those tools are used step by step for practical video output.",
  },
  {
    q: "Can AI video workflows help with reels and short-form content?",
    a: "Yes. A strong workflow can support hook planning, script flow, edit logic, subtitles, visual support, and faster short-form video production.",
  },
  {
    q: "What is the biggest mistake people make with AI video?",
    a: "A common mistake is generating visuals or edits without a clear idea, script, format plan, pacing logic, or refinement process.",
  },
  {
    q: "Where should someone start with AI video workflows?",
    a: "A good starting point is a simple system: idea, script, shot support, edit structure, refine, and finalize.",
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

export default function AiVideoWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI video workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI video workflows help people move from random generation or scattered editing to a structured
              system for planning, scripting, sequence building, asset preparation, editing, and final delivery.
              Instead of relying on disconnected tools, a workflow creates a repeatable process that improves
              clarity, speed, and practical video execution across multiple use cases.
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
            title="What AI video workflows actually mean"
            desc="A workflow-based video approach makes AI useful because every step of video creation sits inside a practical sequence instead of becoming a disconnected output."
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
            title="Core stages inside an AI video workflow"
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
            title="Where AI video workflows are commonly used"
            desc="These workflows are relevant wherever videos need to be planned, built, refined, and reused in a repeatable way."
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
            desc="These pages connect AI video workflows with the broader Sikhadenge topic cluster around skills, tools, creators, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI video workflows."
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
