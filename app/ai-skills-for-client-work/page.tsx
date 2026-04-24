import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  ClipboardList,
  FileText,
  FolderKanban,
  Lightbulb,
  MessageSquareText,
  PenTool,
  Presentation,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Client Work | Sikhadenge",
  description:
    "Explore the best AI skills for client work across communication, briefs, delivery support, revisions, reporting, and workflow execution. A practical guide for freelancers, agency operators, service providers, and execution teams.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-client-work",
  },
  openGraph: {
    title: "Best AI Skills for Client Work | Sikhadenge",
    description:
      "A practical guide to the best AI skills for client work across communication, briefs, revisions, delivery support, reporting, and workflow execution.",
    url: "https://sikhadenge.in/ai-skills-for-client-work",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Client Work | Sikhadenge",
    description:
      "A practical guide to the best AI skills for client work across communication, briefs, revisions, delivery support, reporting, and workflow execution.",
  },
};

const quickInfo = [
  {
    title: "Client relevance",
    desc: "Modern client work benefits when communication, delivery, revisions, and reporting become more structured and more consistent.",
  },
  {
    title: "Execution support",
    desc: "The right AI skills help freelancers and teams handle briefs, outputs, changes, and follow-ups with better clarity.",
  },
  {
    title: "Practical value",
    desc: "Useful AI skills improve delivery quality and workflow efficiency more than random output generation without process.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Client work needs clear execution",
    desc: "Client delivery often includes requirement understanding, communication, output creation, revisions, updates, and final handover.",
  },
  {
    icon: Workflow,
    title: "Manual coordination creates friction",
    desc: "Without systems, client communication, task flow, revision handling, and delivery updates become inconsistent and time-consuming.",
  },
  {
    icon: Bot,
    title: "AI can support service workflows",
    desc: "Practical AI skills help with client replies, brief structuring, draft support, revision clarity, and reporting workflows.",
  },
  {
    icon: Briefcase,
    title: "Client trust depends on process quality",
    desc: "Freelancers and teams perform better when communication, execution, and handover become more repeatable and professional.",
  },
];

const skillCategories = [
  {
    icon: MessageSquareText,
    title: "Client Communication Skills",
    desc: "Client-facing people should learn how AI supports requirement clarification, replies, follow-ups, update messages, and professional communication.",
  },
  {
    icon: ClipboardList,
    title: "Brief Structuring Skills",
    desc: "Useful skills include turning raw client inputs into structured briefs, clear action points, deliverable lists, and execution notes.",
  },
  {
    icon: PenTool,
    title: "Delivery Support Skills",
    desc: "A practical AI skill is learning how to support output drafts, content direction, design support, and execution preparation for client work.",
  },
  {
    icon: FolderKanban,
    title: "Revision Handling Skills",
    desc: "Teams benefit when they can use AI to organize feedback, convert client comments into tasks, and manage revision communication cleanly.",
  },
  {
    icon: Presentation,
    title: "Reporting & Presentation Skills",
    desc: "Strong client-work skills include using AI for summaries, progress reporting, delivery notes, presentations, and clearer handover structures.",
  },
  {
    icon: Workflow,
    title: "Workflow System Skills",
    desc: "Client workers should learn how AI fits into repeatable systems like receive, clarify, draft, revise, report, and deliver workflows.",
  },
];

const useCases = [
  {
    icon: Target,
    title: "Freelancers",
    desc: "Freelancers can use AI skills to improve client communication, clarity, delivery structure, and revision handling.",
  },
  {
    icon: Users,
    title: "Agency Teams",
    desc: "Agency teams can use AI skills to improve execution speed, note clarity, reporting flow, and handover consistency.",
  },
  {
    icon: Briefcase,
    title: "Service Providers",
    desc: "Service providers can use AI skills to strengthen discovery, communication, project support, and client-facing execution.",
  },
  {
    icon: FileText,
    title: "Execution Operators",
    desc: "Operators handling client tasks can use AI skills to improve briefs, workflow structure, and progress communication.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect client delivery with practical digital execution.",
  },
  {
    href: "/ai-skills-for-freelancers",
    title: "AI Skills for Freelancers",
    desc: "See which AI skills help freelancers improve delivery quality, speed, communication, and practical service workflows.",
  },
  {
    href: "/ai-skills-for-small-business",
    title: "AI Skills for Small Business",
    desc: "Review the AI skills that help small teams handle execution, communication, and business process support.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Understand the wider AI skill categories that matter for professional delivery and modern client-facing work.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how client-work-focused AI skills fit into a broader AI Expert capability model.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how practical AI-first execution systems are taught.",
  },
];

const faqs = [
  {
    q: "Which AI skills are useful for client work?",
    a: "Useful AI skills for client work include communication support, brief structuring, delivery support, revision handling, reporting support, and repeatable workflow execution skills.",
  },
  {
    q: "Can AI skills help freelancers and agencies deliver faster?",
    a: "Yes. AI skills can reduce repetitive effort in notes, replies, summaries, feedback organization, and output preparation, which improves delivery speed.",
  },
  {
    q: "Do client-service professionals need coding to learn AI skills?",
    a: "No. Many practical AI skills for client work do not require coding. A strong starting point is communication, briefs, revision handling, and workflow organization.",
  },
  {
    q: "Are AI tools and AI skills the same for client work?",
    a: "No. AI tools are the software or platforms. AI skills are the practical abilities to use those tools effectively for real service delivery and professional workflow execution.",
  },
  {
    q: "Can AI skills help with revisions and feedback handling?",
    a: "Yes. AI can support feedback summaries, revision notes, clearer task mapping, and smoother revision communication with clients.",
  },
  {
    q: "What is the biggest mistake people make while using AI for client work?",
    a: "A common mistake is generating outputs without understanding the client brief, project context, delivery standard, or revision expectations.",
  },
  {
    q: "Can AI skills help with briefs, progress updates, and handovers?",
    a: "Yes. AI can support brief formatting, progress summaries, delivery notes, handover clarity, and professional communication across the client workflow.",
  },
  {
    q: "Where should people start learning AI properly for client work?",
    a: "A structured learning path is the best starting point. Begin with communication, briefs, revisions, and repeatable delivery workflows instead of random tool exploration.",
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

export default function AiSkillsForClientWorkPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Client Work AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for client work
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Client work does not improve with random AI use. It improves when briefs, communication, delivery,
              revisions, and reporting become more structured. Practical AI skills help freelancers, agencies,
              and service teams handle projects more clearly and more professionally through repeatable execution
              workflows.
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
            title="Why AI skills matter for client work"
            desc="Professional delivery depends on clear communication, good process handling, and repeatable execution. Practical AI skills help improve both speed and service quality across client-facing work."
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
            title="Main AI skill categories for client work"
            desc="A strong client-work AI path should focus on practical skill areas that improve communication, delivery handling, revisions, reporting, and project workflow quality."
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
            title="Who can benefit from client-work AI skills"
            desc="Client-work-focused AI skills are useful across multiple service roles when the learning path stays practical and delivery-driven."
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
            desc="These pages connect client-work-focused AI learning with the broader Sikhadenge topic cluster around skills, freelancers, service delivery, and AI-first digital capability."
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
            desc="These are the common questions people ask before starting AI skills for client-work execution."
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
