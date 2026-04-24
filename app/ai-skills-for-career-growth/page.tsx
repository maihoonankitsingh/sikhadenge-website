import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Briefcase,
  FileText,
  GraduationCap,
  Lightbulb,
  LineChart,
  Presentation,
  Search,
  Sparkles,
  Target,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Career Growth | Sikhadenge",
  description:
    "Explore the best AI skills for career growth across communication, digital execution, research, content support, presentations, and workflow systems. A practical guide for students, freshers, freelancers, and career switchers.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-career-growth",
  },
  openGraph: {
    title: "Best AI Skills for Career Growth | Sikhadenge",
    description:
      "A practical guide to the best AI skills for career growth across communication, research, digital execution, and workflow systems.",
    url: "https://sikhadenge.in/ai-skills-for-career-growth",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Career Growth | Sikhadenge",
    description:
      "A practical guide to the best AI skills for career growth across communication, research, digital execution, and workflow systems.",
  },
};

const quickInfo = [
  {
    title: "Career relevance",
    desc: "Modern career growth increasingly depends on digital adaptability, practical execution, and the ability to work effectively with AI support.",
  },
  {
    title: "Execution support",
    desc: "The right AI skills help learners improve communication, research, content support, and visible work quality.",
  },
  {
    title: "Practical value",
    desc: "Useful AI skills create career advantage when they help people produce better output, not just use more tools.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Career growth now needs broader capability",
    desc: "Modern roles often reward people who can communicate clearly, think structurally, adapt quickly, and use digital systems productively.",
  },
  {
    icon: Workflow,
    title: "One narrow skill is often not enough",
    desc: "Career growth becomes easier when people can combine writing, research, execution, communication, and workflow thinking together.",
  },
  {
    icon: Bot,
    title: "AI can improve professional readiness",
    desc: "Practical AI skills can support task execution, better thinking, stronger preparation, and more visible digital output across roles.",
  },
  {
    icon: Briefcase,
    title: "Career advantage comes from usable skills",
    desc: "People grow faster when they learn AI in a practical way that supports real work, not just casual experimentation.",
  },
];

const skillCategories = [
  {
    icon: FileText,
    title: "Communication & Writing Skills",
    desc: "Career-focused learners should learn how AI supports clear writing, structured explanations, summaries, professional drafts, and practical communication.",
  },
  {
    icon: Search,
    title: "Research & Thinking Skills",
    desc: "Useful skills include structured research, comparison thinking, topic understanding, note-making, and idea support for better decision-making.",
  },
  {
    icon: Presentation,
    title: "Presentation & Output Skills",
    desc: "A practical AI skill is learning how to support slides, project explanations, portfolio thinking, and presentable output creation.",
  },
  {
    icon: Wrench,
    title: "Digital Execution Skills",
    desc: "Career growth improves when people can use AI to support content, visuals, task systems, page thinking, and practical digital work.",
  },
  {
    icon: Target,
    title: "Role Adaptability Skills",
    desc: "Strong career skills include learning how AI can support different use cases across jobs, freelancing, business support, and creator work.",
  },
  {
    icon: Workflow,
    title: "Workflow System Skills",
    desc: "Learners should understand how AI fits into repeatable systems like learn, research, plan, create, refine, and deliver workflows.",
  },
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Students can use AI skills to improve projects, assignments, presentations, and early professional readiness.",
  },
  {
    icon: Users,
    title: "Freshers",
    desc: "Freshers can use AI skills to become more job-ready by improving communication, output quality, and task execution support.",
  },
  {
    icon: Briefcase,
    title: "Career Switchers",
    desc: "Career switchers can use AI skills to adapt faster to modern digital work and strengthen visible practical capability.",
  },
  {
    icon: LineChart,
    title: "Growth-Focused Learners",
    desc: "Anyone looking to improve relevance, output quality, and execution speed can benefit from career-focused AI skills.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect career growth with practical digital execution.",
  },
  {
    href: "/ai-skills-for-job-seekers",
    title: "AI Skills for Job Seekers",
    desc: "See which AI skills help improve readiness, communication, and practical employability.",
  },
  {
    href: "/ai-skills-for-students",
    title: "AI Skills for Students",
    desc: "Review the student-focused AI skill path that supports projects, learning systems, and early digital capability.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Understand the wider AI skill categories that matter for modern work, freelancing, and career development.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how career-growth-focused AI skills fit into a broader AI Expert capability model.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how practical AI-first capability is taught.",
  },
];

const faqs = [
  {
    q: "Which AI skills are useful for career growth?",
    a: "Useful AI skills for career growth include communication support, research skills, presentation support, digital execution, role adaptability, and workflow system skills.",
  },
  {
    q: "Can AI skills help people grow faster in their career?",
    a: "Yes. AI skills can improve task execution, communication quality, research ability, and overall professional readiness, which supports faster growth.",
  },
  {
    q: "Do people need coding to use AI for career growth?",
    a: "No. Many practical AI skills for career growth do not require coding. A strong starting point is writing, research, presentations, and execution support.",
  },
  {
    q: "Are AI tools and AI skills the same for career growth?",
    a: "No. AI tools are the software or platforms. AI skills are the practical abilities to use those tools effectively for real work and visible output.",
  },
  {
    q: "Can students and freshers use AI skills for better career readiness?",
    a: "Yes. Students and freshers can use AI skills to improve project work, communication, digital capability, and practical output quality.",
  },
  {
    q: "What is the biggest mistake people make while learning AI for career growth?",
    a: "A common mistake is learning random tools without building practical workflow ability, communication quality, and role-relevant execution skills.",
  },
  {
    q: "Can AI skills help with projects, portfolios, and professional communication?",
    a: "Yes. AI can support project structuring, portfolio thinking, clearer writing, presentations, summaries, and practical output refinement.",
  },
  {
    q: "Where should people start learning AI properly for career growth?",
    a: "A structured learning path is the best starting point. Begin with communication, research, presentations, and repeatable execution workflows instead of random tool exploration.",
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

export default function AiSkillsForCareerGrowthPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Career Growth AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for career growth
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Career growth does not happen only by knowing more tools. It improves when communication,
              research, digital execution, presentation, and workflow ability become stronger. Practical AI
              skills help students, freshers, freelancers, and career switchers build more visible capability
              and become more relevant in modern digital work environments.
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
            pill="Why this matters"
            title="Why AI skills matter for career growth"
            desc="Career growth now depends more on adaptable execution and visible capability than on static knowledge alone. Practical AI skills help people become more effective and more relevant."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {whyItMatters.map((item) => {
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
            pill="Core skill categories"
            title="Main AI skill categories for career growth"
            desc="A strong career-growth AI path should focus on practical skill areas that improve clarity, output, digital adaptability, and repeatable workflow execution."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {skillCategories.map((item) => {
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
            title="Who can benefit from career-growth AI skills"
            desc="Career-growth-focused AI skills are useful across multiple learner types when the learning path stays practical and role-relevant."
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
            pill="Related learning paths"
            title="Explore connected AI learning pages"
            desc="These pages connect career-growth-focused AI learning with the broader Sikhadenge topic cluster around skills, jobs, learning paths, and AI-first digital capability."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPaths.map((item) => (
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
            desc="These are the common questions people ask before starting AI skills for career growth."
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
