import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  FileText,
  GraduationCap,
  Lightbulb,
  MonitorSmartphone,
  Search,
  Sparkles,
  Target,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Digital Jobs | Sikhadenge",
  description:
    "Explore the best AI skills for digital jobs across communication, research, content support, execution workflows, and practical digital capability. A useful guide for students, freshers, job seekers, and career switchers.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-digital-jobs",
  },
  openGraph: {
    title: "Best AI Skills for Digital Jobs | Sikhadenge",
    description:
      "A practical guide to the best AI skills for digital jobs across communication, research, content support, and workflow execution.",
    url: "https://sikhadenge.in/ai-skills-for-digital-jobs",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Digital Jobs | Sikhadenge",
    description:
      "A practical guide to the best AI skills for digital jobs across communication, research, content support, and workflow execution.",
  },
};

const quickInfo = [
  {
    title: "Job relevance",
    desc: "Modern digital jobs increasingly reward people who can work faster, communicate clearly, and use AI support in practical workflows.",
  },
  {
    title: "Execution support",
    desc: "The right AI skills help people perform better across communication, research, content, and day-to-day digital tasks.",
  },
  {
    title: "Practical value",
    desc: "Useful AI skills improve employability when they support real job execution instead of staying limited to random tool use.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Digital jobs are changing quickly",
    desc: "Many digital roles now expect faster execution, better written communication, stronger support skills, and higher adaptability across tools and workflows.",
  },
  {
    icon: Workflow,
    title: "Basic familiarity is no longer enough",
    desc: "People grow faster in digital jobs when they can combine thinking, execution, communication, and workflow support with AI.",
  },
  {
    icon: Bot,
    title: "AI can improve job-readiness",
    desc: "Practical AI skills can support research, writing, documentation, task execution, and output quality in many digital job roles.",
  },
  {
    icon: Briefcase,
    title: "Employability now includes digital capability",
    desc: "Students, freshers, and job seekers benefit when they can demonstrate useful AI-supported execution instead of only theoretical knowledge.",
  },
];

const skillCategories = [
  {
    icon: FileText,
    title: "Communication Skills",
    desc: "Digital-job learners should learn how AI supports structured writing, summaries, professional communication, replies, and explanation clarity.",
  },
  {
    icon: Search,
    title: "Research Skills",
    desc: "Useful skills include comparison support, quick research, note structuring, topic understanding, and information organization for real work.",
  },
  {
    icon: MonitorSmartphone,
    title: "Digital Execution Skills",
    desc: "A practical AI skill is learning how to support content, documentation, task execution, and common digital workflows across modern roles.",
  },
  {
    icon: Wrench,
    title: "Productivity Skills",
    desc: "People benefit when they can use AI to reduce repetitive effort, organize work better, and improve output consistency.",
  },
  {
    icon: Target,
    title: "Role Adaptability Skills",
    desc: "Strong digital-job skills include learning how AI can support multiple job use cases across business, content, support, and operations roles.",
  },
  {
    icon: Workflow,
    title: "Workflow System Skills",
    desc: "Learners should understand how AI fits into repeatable systems like research, draft, refine, execute, review, and deliver workflows.",
  },
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Students can use AI skills to build stronger projects, better communication, and more visible digital capability.",
  },
  {
    icon: Users,
    title: "Freshers",
    desc: "Freshers can use AI skills to become more job-ready by improving writing, task execution, and output quality.",
  },
  {
    icon: Briefcase,
    title: "Job Seekers",
    desc: "Job seekers can use AI skills to improve readiness for real digital work and present stronger practical value.",
  },
  {
    icon: Lightbulb,
    title: "Career Switchers",
    desc: "Career switchers can use AI skills to adapt faster to digital roles and improve confidence in practical work environments.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect digital jobs with practical execution capability.",
  },
  {
    href: "/ai-skills-for-career-growth",
    title: "AI Skills for Career Growth",
    desc: "See which AI skills support long-term growth, stronger output quality, and better role adaptability.",
  },
  {
    href: "/ai-skills-for-job-seekers",
    title: "AI Skills for Job Seekers",
    desc: "Review the job-seeker-focused AI skill path for employability, communication, and practical readiness.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Understand the wider AI skill categories that matter for modern work, digital roles, and career development.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how digital-job-focused AI skills fit into a broader AI Expert capability model.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how practical AI-first capability is taught.",
  },
];

const faqs = [
  {
    q: "Which AI skills are useful for digital jobs?",
    a: "Useful AI skills for digital jobs include communication support, research skills, digital execution support, productivity workflows, role adaptability, and repeatable work systems.",
  },
  {
    q: "Can AI skills help people get better digital job opportunities?",
    a: "Yes. AI skills can improve communication, task execution, output quality, and practical readiness, which strengthens digital job relevance.",
  },
  {
    q: "Do people need coding to use AI in digital jobs?",
    a: "No. Many practical AI skills for digital jobs do not require coding. A strong starting point is writing, research, execution support, and workflow organization.",
  },
  {
    q: "Are AI tools and AI skills the same for digital jobs?",
    a: "No. AI tools are the platforms or software. AI skills are the practical abilities to use those tools effectively for real work and better output.",
  },
  {
    q: "Can students and freshers build digital-job readiness with AI skills?",
    a: "Yes. Students and freshers can use AI skills to improve projects, summaries, communication, practical execution, and digital confidence.",
  },
  {
    q: "What is the biggest mistake people make while learning AI for digital jobs?",
    a: "A common mistake is learning random tools without building structured execution ability, communication quality, and role-relevant workflows.",
  },
  {
    q: "Can AI skills help with documentation, task support, and digital work quality?",
    a: "Yes. AI can support documentation, research, communication drafts, summaries, and repeatable task execution across many digital roles.",
  },
  {
    q: "Where should people start learning AI properly for digital jobs?",
    a: "A structured learning path is the best starting point. Begin with communication, research, execution support, and repeatable workflows instead of random tool exploration.",
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

export default function AiSkillsForDigitalJobsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Digital Jobs AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for digital jobs
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Digital jobs do not reward tool knowledge alone. They reward people who can research, communicate,
              organize, and execute well in real working systems. Practical AI skills help students, freshers,
              job seekers, and career switchers build better digital capability and become more effective in
              modern work environments.
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
            title="Why AI skills matter for digital jobs"
            desc="Digital jobs increasingly need people who can work with structure, speed, and clarity. Practical AI skills help improve both readiness and day-to-day performance."
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
            title="Main AI skill categories for digital jobs"
            desc="A strong digital-job AI path should focus on practical skill areas that improve communication, execution, adaptability, and repeatable work quality."
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
            title="Who can benefit from digital-job AI skills"
            desc="Digital-job-focused AI skills are useful across multiple learner types when the learning path stays practical and role-relevant."
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
            desc="These pages connect digital-job-focused AI learning with the broader Sikhadenge topic cluster around skills, jobs, and AI-first digital capability."
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
            desc="These are the common questions people ask before starting AI skills for digital jobs."
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
