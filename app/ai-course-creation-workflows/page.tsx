import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Briefcase,
  ClipboardList,
  FileText,
  FolderKanban,
  GraduationCap,
  Lightbulb,
  RefreshCcw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Course Creation Workflows | Sikhadenge",
  description:
    "Understand AI course creation workflows in a practical way. Learn how structured AI-assisted systems help with curriculum planning, lesson structuring, content sequencing, learning outcomes, delivery planning, and repeatable course execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-course-creation-workflows",
  },
  openGraph: {
    title: "AI Course Creation Workflows | Sikhadenge",
    description:
      "A practical guide to AI course creation workflows across curriculum planning, lesson structuring, content sequencing, learning outcomes, delivery planning, and repeatable execution.",
    url: "https://sikhadenge.in/ai-course-creation-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Course Creation Workflows | Sikhadenge",
    description:
      "A practical guide to AI course creation workflows across curriculum planning, lesson structuring, content sequencing, learning outcomes, delivery planning, and repeatable execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI course creation workflows are structured systems that use AI support for curriculum planning, lesson sequencing, outcome design, resource preparation, and repeatable course development execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, courses become unstructured, repetitive, and hard to improve. A structured system improves learning clarity, module flow, delivery quality, and long-term course consistency.",
  },
  {
    title: "Who benefits",
    desc: "Educators, coaches, founders, training companies, creators, freelancers, education brands, and internal learning teams all benefit from stronger AI-assisted course creation workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than making one lesson",
    desc: "AI course creation workflows are not limited to generating one class topic or one presentation. They connect learner needs, curriculum design, content sequencing, assignment logic, delivery structure, and improvement cycles into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI can support many course stages",
    desc: "A useful workflow uses AI across syllabus planning, topic expansion, lesson structuring, explanation support, quiz ideas, practice tasks, and revision planning instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better learning execution",
    desc: "A strong workflow helps courses become easier to design, easier to improve, easier to deliver, and easier to scale across batches, topics, and learning levels.",
  },
  {
    icon: Briefcase,
    title: "This matters in real education systems",
    desc: "Modern learning businesses and educators depend on stronger instructional systems. Random course building usually weakens clarity, completion quality, learner trust, and delivery consistency.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Learner, Outcome & Course Goal Clarity",
    desc: "Start by identifying who the course is for, what skill or result matters most, what level of learner is being served, and what practical outcome the course should create.",
  },
  {
    icon: ClipboardList,
    title: "Curriculum & Module Planning",
    desc: "Use AI to break the course into modules, map prerequisite topics, structure learning progression, define lesson order, and organize the curriculum for better understanding.",
  },
  {
    icon: FileText,
    title: "Lesson, Script & Resource Support",
    desc: "Build clearer lesson notes, teaching points, class explanations, worksheet ideas, practice tasks, assignments, and recap material that match each learning objective.",
  },
  {
    icon: BookOpen,
    title: "Delivery & Learning Experience Direction",
    desc: "Plan whether the course works best as live classes, recorded lessons, cohort-based learning, guided projects, templates, practice sessions, or mixed delivery formats.",
  },
  {
    icon: RefreshCcw,
    title: "Feedback & Improvement Loop",
    desc: "Refine weak lessons, improve sequencing, simplify confusing modules, strengthen assignments, and upgrade learning clarity through repeated student feedback and iteration.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Course System",
    desc: "Organize module maps, class templates, teaching notes, assignment formats, learner feedback, and revision logs into a repeatable course creation workflow system.",
  },
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Educators & Trainers",
    desc: "Educators and trainers can use AI course creation workflows to build clearer syllabi, better classes, and more structured learner journeys.",
  },
  {
    icon: Sparkles,
    title: "Creators & Coaches",
    desc: "Creators and coaches can use these workflows to turn expertise into a structured learning product with stronger lesson flow and better delivery consistency.",
  },
  {
    icon: Briefcase,
    title: "Education Brands",
    desc: "Education brands can use workflow systems to standardize course quality, improve batch delivery, and scale programs with stronger documentation and structure.",
  },
  {
    icon: Users,
    title: "Business & Internal Teams",
    desc: "Businesses and internal teams can use structured workflows to build onboarding programs, team training content, and repeatable internal learning systems.",
  },
];

const relatedPages = [
  {
    href: "/ai-learning-workflows",
    title: "AI Learning Workflows",
    desc: "See how course creation connects with broader learning systems, study structures, skill development, and organized educational execution.",
  },
  {
    href: "/ai-content-planning-workflows",
    title: "Create Content with AI Planning Workflows",
    desc: "Understand how structured planning supports curriculum mapping, class sequencing, and better long-form educational content systems.",
  },
  {
    href: "/ai-video-production-workflows",
    title: "Edit Videos with AI Production Workflows",
    desc: "Explore how course creation connects with recorded classes, lesson videos, editing structure, and content delivery formats.",
  },
  {
    href: "/ai-skills-for-educators",
    title: "AI Skills for Educators",
    desc: "See which AI skills help educators improve curriculum design, lesson preparation, teaching support, and educational delivery quality.",
  },
  {
    href: "/ai-tools-for-content-creation",
    title: "AI Tools for Content Creation",
    desc: "See which AI tools support lesson planning, resource drafting, curriculum support, script development, and structured course execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how course creation workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI course creation workflow?",
    a: "An AI course creation workflow is a structured process that uses AI across curriculum planning, lesson sequencing, learning outcome design, resource development, revision, and repeatable course execution.",
  },
  {
    q: "Why are AI course creation workflows important?",
    a: "They are important because they help educators and teams move from random lesson creation to more structured, useful, and repeatable learning systems.",
  },
  {
    q: "Can beginners use AI course creation workflows?",
    a: "Yes. Beginners can start with simple workflows for syllabus planning, lesson outlines, assignment ideas, and topic sequencing before using more advanced systems.",
  },
  {
    q: "Are AI course creation workflows only for education companies?",
    a: "No. Educators, coaches, creators, internal training teams, businesses, freelancers, and education brands can all use structured AI course creation workflows.",
  },
  {
    q: "What is the difference between course tools and course creation workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical course development execution.",
  },
  {
    q: "Can AI course creation workflows help improve delivery quality?",
    a: "Yes. A strong workflow can support clearer lesson design, better sequencing, stronger assignments, simpler explanations, and more consistent learner experiences.",
  },
  {
    q: "What is the biggest mistake people make with AI in course creation?",
    a: "A common mistake is generating lots of lessons without building a proper system for learner level, course goals, curriculum progression, assignments, and revision quality.",
  },
  {
    q: "Where should someone start with AI course creation workflows?",
    a: "A good starting point is a simple system: define the learner, clarify the end outcome, break the course into modules, plan each lesson, then improve the course through feedback and iteration.",
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

export default function AiCourseCreationWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI course creation workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI course creation workflows help people move from disconnected teaching materials to a structured system
              for curriculum planning, lesson design, learning outcomes, content sequencing, and repeatable course
              delivery execution. Instead of relying on random module creation, a workflow creates a practical process
              that improves clarity, consistency, and long-term educational quality.
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
            title="What AI course creation workflows actually mean"
            desc="A workflow-based course creation approach makes AI useful because learning design decisions sit inside a practical sequence instead of becoming random lessons, random modules, or random teaching materials."
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
            title="Core stages inside an AI course creation workflow"
            desc="A practical course creation system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI course creation workflows are commonly used"
            desc="These workflows are relevant wherever structured learning needs to be designed, delivered, improved, and repeated in a reliable way."
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
            desc="These pages connect AI course creation workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI course creation workflows."
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
