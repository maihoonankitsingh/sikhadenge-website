import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  FileText,
  GraduationCap,
  Lightbulb,
  MessageSquareText,
  Search,
  Sparkles,
  Target,
  UserRoundSearch,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Job Seekers | Sikhadenge",
  description:
    "Explore the best AI skills for job seekers across communication, research, resumes, interview preparation, practical execution, and workflow systems. A useful guide for students, freshers, applicants, and career switchers.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-job-seekers",
  },
  openGraph: {
    title: "Best AI Skills for Job Seekers | Sikhadenge",
    description:
      "A practical guide to the best AI skills for job seekers across communication, research, resumes, interview preparation, and workflow systems.",
    url: "https://sikhadenge.in/ai-skills-for-job-seekers",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Job Seekers | Sikhadenge",
    description:
      "A practical guide to the best AI skills for job seekers across communication, research, resumes, interview preparation, and workflow systems.",
  },
};

const quickInfo = [
  {
    title: "Job relevance",
    desc: "Modern job seekers benefit when they can communicate better, prepare smarter, and use AI support in practical career workflows.",
  },
  {
    title: "Preparation support",
    desc: "The right AI skills help job seekers improve resumes, interview preparation, research, and visible output quality.",
  },
  {
    title: "Practical value",
    desc: "Useful AI skills improve employability when they support real preparation and real execution instead of random tool use.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Job search now needs stronger preparation",
    desc: "Job seekers often need clearer communication, better understanding of roles, stronger project presentation, and more structured preparation than before.",
  },
  {
    icon: Workflow,
    title: "Unstructured preparation creates weak results",
    desc: "Without systems, resumes, applications, interview preparation, and skill-building stay scattered and less effective.",
  },
  {
    icon: Bot,
    title: "AI can improve job-seeking workflows",
    desc: "Practical AI skills can support resume drafts, role research, interview preparation, communication, and practical learning systems.",
  },
  {
    icon: Briefcase,
    title: "Employability now includes digital readiness",
    desc: "Students, freshers, and switchers benefit when they can show stronger digital capability and more practical execution quality.",
  },
];

const skillCategories = [
  {
    icon: FileText,
    title: "Resume & Profile Skills",
    desc: "Job seekers should learn how AI supports resume drafts, profile summaries, project descriptions, and clearer skill presentation.",
  },
  {
    icon: MessageSquareText,
    title: "Communication Skills",
    desc: "Useful skills include professional writing, application drafts, follow-up messages, self-introductions, and structured response preparation.",
  },
  {
    icon: Search,
    title: "Role Research Skills",
    desc: "A practical AI skill is learning how to research roles, compare job expectations, understand company context, and identify skill gaps.",
  },
  {
    icon: Target,
    title: "Interview Preparation Skills",
    desc: "Job seekers benefit when they can use AI for mock questions, answer structuring, role-specific thinking, and confidence-building practice.",
  },
  {
    icon: Wrench,
    title: "Practical Execution Skills",
    desc: "Strong job-seeker skills include learning how AI supports projects, assignments, output quality, and digital work samples.",
  },
  {
    icon: Workflow,
    title: "Career Workflow Skills",
    desc: "Learners should understand how AI fits into repeatable systems like learn, prepare, apply, practice, improve, and present workflows.",
  },
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Students can use AI skills to improve project quality, communication, resume preparation, and early job readiness.",
  },
  {
    icon: Users,
    title: "Freshers",
    desc: "Freshers can use AI skills to improve confidence, application quality, interview preparation, and practical employability.",
  },
  {
    icon: UserRoundSearch,
    title: "Job Applicants",
    desc: "Applicants can use AI skills to improve role understanding, response quality, and structured application workflows.",
  },
  {
    icon: Briefcase,
    title: "Career Switchers",
    desc: "Career switchers can use AI skills to adapt faster and build stronger readiness for modern digital opportunities.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect job seeking with practical digital execution.",
  },
  {
    href: "/ai-skills-for-career-growth",
    title: "AI Skills for Career Growth",
    desc: "See which AI skills support long-term growth, stronger output quality, and better role adaptability.",
  },
  {
    href: "/ai-skills-for-digital-jobs",
    title: "AI Skills for Digital Jobs",
    desc: "Review the AI skills that matter for modern work environments and practical digital job readiness.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Understand the wider AI skill categories that matter for employability, modern work, and career development.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how job-seeker-focused AI skills fit into a broader AI Expert capability model.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how practical AI-first capability is taught.",
  },
];

const faqs = [
  {
    q: "Which AI skills are useful for job seekers?",
    a: "Useful AI skills for job seekers include resume support, communication skills, role research, interview preparation, practical execution support, and repeatable career workflow skills.",
  },
  {
    q: "Can AI skills help job seekers prepare better?",
    a: "Yes. AI skills can improve resumes, role understanding, communication, mock preparation, and overall job-readiness workflows.",
  },
  {
    q: "Do job seekers need coding to use AI skills?",
    a: "No. Many practical AI skills for job seekers do not require coding. A strong starting point is writing, research, interview preparation, and workflow support.",
  },
  {
    q: "Are AI tools and AI skills the same for job seekers?",
    a: "No. AI tools are the software or platforms. AI skills are the practical abilities to use those tools effectively for real preparation and stronger employability.",
  },
  {
    q: "Can students and freshers use AI skills for interviews and resumes?",
    a: "Yes. Students and freshers can use AI skills to improve resume quality, project explanations, role understanding, and interview confidence.",
  },
  {
    q: "What is the biggest mistake job seekers make while learning AI?",
    a: "A common mistake is using AI only for shortcuts instead of building communication quality, role understanding, practical projects, and structured preparation systems.",
  },
  {
    q: "Can AI skills help with resume writing, interview answers, and role research?",
    a: "Yes. AI can support resume drafts, answer structuring, company research, role expectations, and better application preparation.",
  },
  {
    q: "Where should job seekers start learning AI properly?",
    a: "A structured learning path is the best starting point. Begin with communication, research, resume support, interview preparation, and repeatable career workflows instead of random tool exploration.",
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

export default function AiSkillsForJobSeekersPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Job Seeker AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for job seekers
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Job seekers do not benefit from random AI tool use alone. They benefit when preparation,
              communication, research, resume quality, and practical output become more structured. Practical
              AI skills help students, freshers, applicants, and career switchers build stronger readiness and
              improve their ability to perform in real job-selection processes.
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
            title="Why AI skills matter for job seekers"
            desc="Job readiness now depends more on practical preparation and stronger communication than on static knowledge alone. Practical AI skills help make that preparation more effective."
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
            title="Main AI skill categories for job seekers"
            desc="A strong job-seeker AI path should focus on practical skill areas that improve preparation quality, communication, and repeatable career workflows."
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
            title="Who can benefit from job-seeker AI skills"
            desc="Job-seeker-focused AI skills are useful across multiple learner types when the learning path stays practical and employability-oriented."
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
            desc="These pages connect job-seeker-focused AI learning with the broader Sikhadenge topic cluster around skills, jobs, career growth, and AI-first digital capability."
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
            desc="These are the common questions people ask before starting AI skills for job seeking."
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
