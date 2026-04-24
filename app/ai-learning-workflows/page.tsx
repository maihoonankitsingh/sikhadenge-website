import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Briefcase,
  CheckSquare,
  FileText,
  FolderKanban,
  GraduationCap,
  Lightbulb,
  RefreshCcw,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Learning Workflows | Sikhadenge",
  description:
    "Understand AI learning workflows in a practical way. Learn how structured AI-assisted systems help with topic planning, learning order, revision, note building, and repeatable skill development.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-learning-workflows",
  },
  openGraph: {
    title: "AI Learning Workflows | Sikhadenge",
    description:
      "A practical guide to AI learning workflows across topic planning, learning order, revision, note building, and repeatable skill development.",
    url: "https://sikhadenge.in/ai-learning-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Learning Workflows | Sikhadenge",
    description:
      "A practical guide to AI learning workflows across topic planning, learning order, revision, note building, and repeatable skill development.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI learning workflows are structured systems that use AI support to improve what to learn, how to learn, and how to retain and apply skills.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, learning becomes scattered and repetitive. A system improves clarity, sequence, revision, and practical progress.",
  },
  {
    title: "Who benefits",
    desc: "Students, beginners, freelancers, creators, and professionals all benefit from better AI-assisted learning workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than asking random questions",
    desc: "AI learning workflows are not limited to asking one doubt at a time. They connect topic planning, sequence, revision, note building, and skill application into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI supports multiple learning stages",
    desc: "Useful workflows use AI across concept explanation, breakdown, examples, revision support, summaries, and practice direction instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better learning quality",
    desc: "A strong workflow helps learners move from confusion to structure, from passive consumption to active understanding, and from theory to application.",
  },
  {
    icon: Briefcase,
    title: "This matters in real skill development",
    desc: "Modern learners often consume too much content without enough structure, repetition planning, note systems, or output-based learning flow.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Learning Goal Clarity",
    desc: "Start by defining what skill needs to be learned, why it matters, how deep the learning should go, and what outcome is expected.",
  },
  {
    icon: GraduationCap,
    title: "Topic Order & Learning Path",
    desc: "Use AI to create better topic sequence, prerequisite understanding, difficulty order, and cleaner learning progression.",
  },
  {
    icon: BookOpen,
    title: "Concept Understanding & Examples",
    desc: "Break difficult topics into simpler language, examples, analogies, and guided explanation systems that are easier to understand.",
  },
  {
    icon: FileText,
    title: "Notes & Summary Building",
    desc: "Use AI to support short notes, revision notes, topic summaries, checklists, and structured understanding documents.",
  },
  {
    icon: RefreshCcw,
    title: "Revision & Reinforcement",
    desc: "Improve learning retention by revisiting weak areas, asking follow-up questions, testing understanding, and refining note clarity.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Learning System",
    desc: "Organize study plans, topic boards, progress tracking, revision flow, and repeatable learning systems for long-term improvement.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Students",
    desc: "Students can use AI learning workflows to understand concepts faster, organize revision, and build better study structure.",
  },
  {
    icon: Sparkles,
    title: "Beginners",
    desc: "Beginners can use these workflows to avoid confusion and learn new digital skills in a more structured order.",
  },
  {
    icon: Briefcase,
    title: "Freelancers & Professionals",
    desc: "Freelancers and professionals can use learning workflows to upskill faster and turn new knowledge into usable execution ability.",
  },
  {
    icon: Workflow,
    title: "Creators & Self-Learners",
    desc: "Self-learners and creators can use structured systems to learn consistently without depending on random tutorials.",
  },
];

const relatedPages = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the wider AI skill categories that connect with structured learning and practical digital execution.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support concept explanation, summaries, note building, and structured learning workflows.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how learning workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how AI learning workflows connect with choosing and mastering high-value practical skills.",
  },
  {
    href: "/ai-productivity-workflows",
    title: "AI Productivity Workflows",
    desc: "See how structured learning connects with planning, focus, review, and repeatable execution routines.",
  },
  {
    href: "/ai-research-workflows",
    title: "AI Research Workflows",
    desc: "Understand how better research systems support clearer learning, topic breakdown, and deeper understanding.",
  },
];

const faqs = [
  {
    q: "What is an AI learning workflow?",
    a: "An AI learning workflow is a structured process that uses AI across topic planning, explanation, note building, revision, and repeatable skill learning.",
  },
  {
    q: "Why are AI learning workflows important?",
    a: "They are important because they help learners move from scattered study to more structured, understandable, and practical learning systems.",
  },
  {
    q: "Can beginners use AI learning workflows?",
    a: "Yes. Beginners can start with simple workflows for topic order, concept explanation, short notes, and revision support before using more advanced systems.",
  },
  {
    q: "Are AI learning workflows only for students?",
    a: "No. Students, beginners, freelancers, professionals, creators, and self-learners can all use structured AI learning workflows.",
  },
  {
    q: "What is the difference between learning with AI and an AI learning workflow?",
    a: "Learning with AI may be random or casual. An AI learning workflow is a repeatable system that uses AI in a structured way for better learning progress.",
  },
  {
    q: "Can AI learning workflows help with revision?",
    a: "Yes. A strong workflow can support summaries, short notes, repetition planning, concept recall, and better revision clarity.",
  },
  {
    q: "What is the biggest mistake people make with AI learning?",
    a: "A common mistake is consuming many explanations without creating a system for sequence, notes, revision, and practical application.",
  },
  {
    q: "Where should someone start with AI learning workflows?",
    a: "A good starting point is a simple system: define the skill, break the topic order, learn one concept at a time, create notes, then revise and apply it.",
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

export default function AiLearningWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI learning workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI learning workflows help people move from random study and scattered tutorials to a structured system
              for topic planning, explanation, revision, note building, and skill development. Instead of relying on
              disconnected learning inputs, a workflow creates a repeatable process that improves clarity, retention,
              and practical progress.
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
            title="What AI learning workflows actually mean"
            desc="A workflow-based learning approach makes AI useful because every learning task sits inside a practical sequence instead of becoming random study support."
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
            title="Core stages inside an AI learning workflow"
            desc="A practical learning system usually moves through a small number of repeatable stages that make understanding easier to manage and improve."
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
            title="Where AI learning workflows are commonly used"
            desc="These workflows are relevant wherever knowledge needs to be learned, retained, revised, and applied in a practical way."
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
            desc="These pages connect AI learning workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI learning workflows."
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
