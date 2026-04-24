import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, Briefcase, Lightbulb, Rocket, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "Future of AI Skills | Sikhadenge",
  description:
    "Understand the future of AI skills and how practical digital work is changing. Learn which AI skills are becoming more valuable, which roles are growing, and how to prepare for the next phase of work.",
  alternates: {
    canonical: "https://sikhadenge.in/future-of-ai-skills",
  },
  openGraph: {
    title: "Future of AI Skills | Sikhadenge",
    description:
      "Understand the future of AI skills and how practical digital work is changing. Learn which AI skills are becoming more valuable, which roles are growing, and how to prepare for the next phase of work.",
    url: "https://sikhadenge.in/future-of-ai-skills",
    siteName: "Sikhadenge",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Future of AI Skills | Sikhadenge",
    description:
      "Understand the future of AI skills and how practical digital work is changing. Learn which AI skills are becoming more valuable, which roles are growing, and how to prepare for the next phase of work.",
  },
};

const faqs = [
  {
    q: "What is the future of AI skills?",
    a: "The future of AI skills is strongly connected to practical execution. Skills that combine AI tools, workflows, content, design, communication, and digital systems are becoming more valuable across modern work.",
  },
  {
    q: "Will AI skills replace traditional skills completely?",
    a: "No. In most cases, AI skills will not replace foundational skills completely. Instead, they will increase the value of people who can combine fundamentals with AI-assisted execution.",
  },
  {
    q: "Which AI skills are likely to become more important?",
    a: "AI content systems, prompt clarity, workflow thinking, AI-assisted design support, AI video support, automation thinking, and broader AI Expert execution are likely to become more important.",
  },
  {
    q: "Why are AI skills becoming essential for digital work?",
    a: "AI skills are becoming essential because businesses, creators, freelancers, and teams now need faster output, better systems, and more efficient execution across many tasks.",
  },
  {
    q: "Who should focus on future AI skills?",
    a: "Students, freelancers, creators, founders, digital workers, and job seekers should all pay attention to future AI skills because these capabilities increasingly affect how work gets done.",
  },
  {
    q: "How can someone prepare for the future of AI skills?",
    a: "The best approach is to build strong fundamentals, understand practical AI tools, learn workflows, and create real outputs instead of only consuming theory.",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#245EEA] shadow-[0_4px_16px_rgba(37,99,235,0.08)]">
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
      <h2 className="mt-6 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#071533] md:text-[48px]">
        {title}
      </h2>
      {desc ? (
        <p className="mt-4 max-w-4xl text-[17px] leading-[1.8] text-[#47607F] md:text-[18px]">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

export default function FutureOfAiSkillsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Future Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[40px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[62px]">
              Future of AI skills
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              The future of AI skills is not only about tool access. It is about how people use AI to improve digital
              work, output quality, workflow speed, communication, design support, content systems, and broader
              execution capability. As AI becomes more common, the most valuable people will not be the ones who only
              know tool names. They will be the ones who can use AI inside practical systems.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-skills"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-sm font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Why this is changing"
            title="Why AI skills are becoming more important"
            desc="AI is changing work because it affects speed, quality, systems, and execution across multiple functions."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Rocket,
                title: "Work is becoming faster",
                desc: "AI reduces manual time in many digital tasks such as writing, ideation, design assistance, planning, and workflow execution.",
              },
              {
                icon: Workflow,
                title: "Systems matter more than isolated tasks",
                desc: "The future belongs to people who can connect tasks into repeatable systems rather than perform only one disconnected activity.",
              },
              {
                icon: Brain,
                title: "Decision quality is improving",
                desc: "AI can support clearer thinking, better research, faster summaries, and stronger workflow planning when used properly.",
              },
              {
                icon: Briefcase,
                title: "Business expectations are changing",
                desc: "Teams and clients increasingly expect faster delivery, broader capability, and better output with fewer delays.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-[#D8E5F4] bg-white p-7 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-[78px] w-[78px] items-center justify-center rounded-[22px] border border-[#CFE0F6] bg-[#EAF2FE]">
                    <Icon className="h-7 w-7 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-6 text-[20px] font-semibold text-[#071533]">{item.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.85] text-[#47607F]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="High-value future skills"
            title="Which AI skills are likely to matter more in the future"
            desc="The most valuable future AI skills are usually practical, cross-functional, and execution-oriented."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[
              "AI content systems and structured communication",
              "AI-assisted design and creative direction",
              "AI video support and media workflows",
              "Prompt clarity and task structuring",
              "Workflow thinking and AI execution systems",
              "AI Expert capability across multiple outputs",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="mt-0.5 h-5 w-5 text-[#2563EB]" />
                  <p className="text-[16px] font-semibold leading-[1.75] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Future work patterns"
            title="How future digital work is likely to change"
            desc="AI is not changing only one job category. It is reshaping how many digital tasks are planned and delivered."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Broader roles",
                desc: "People who can support multiple connected tasks will become more valuable in many practical work environments.",
              },
              {
                title: "Faster output cycles",
                desc: "Execution timelines will continue to shrink as AI becomes more deeply integrated into workflows.",
              },
              {
                title: "Higher workflow expectations",
                desc: "Teams will expect stronger planning, documentation, and repeatability instead of only raw effort.",
              },
              {
                title: "More emphasis on judgment",
                desc: "Human judgment, direction, and workflow design will become more important as AI handles more support tasks.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-[#D8E5F4] bg-[#FBFDFF] p-7 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <h3 className="text-[20px] font-semibold text-[#071533]">{item.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.85] text-[#47607F]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="How to prepare"
            title="How someone should prepare for the future of AI skills"
            desc="The best preparation is practical, output-based, and connected to real work patterns."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {[
              "Build strong digital fundamentals",
              "Learn practical AI tools with purpose",
              "Practice repeatable workflows",
              "Create real projects and outputs",
              "Improve quality, speed, and judgment together",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-[26px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="text-sm font-semibold text-[#2563EB]">Step {index + 1}</div>
                <p className="mt-3 text-[16px] font-semibold leading-[1.75] text-[#071533]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Who should care most"
            title="Who should focus on future AI skills now"
            desc="The people who start building future-oriented AI skills earlier usually get stronger long-term advantage."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              "Students building future-ready capability",
              "Freelancers trying to stay more competitive",
              "Creators improving digital systems and output",
              "Job seekers preparing for changing work models",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Briefcase className="mt-0.5 h-5 w-5 text-[#2563EB]" />
                  <p className="text-[16px] font-semibold leading-[1.75] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Related pages"
            title="Explore connected AI pages"
            desc="These pages connect this future-focused guide with the wider Sikhadenge AI cluster."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { href: "/ai-generalist", label: "AI Expert" },
              { href: "/ai-skills", label: "AI Skills" },
              { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
              { href: "/how-to-start-ai-career", label: "How to Start AI Career" },
              { href: "/ai-career-paths", label: "AI Career Paths" },
              { href: "/ai-jobs-without-coding", label: "AI Jobs Without Coding" },
              { href: "/ai-tools", label: "AI Tools" },
              { href: "/ai-content-workflows", label: "Create Content with Automate Work with AI" },
              { href: "/site-map", label: "HTML Sitemap" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-[22px] border border-[#D8E5F4] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.03)] transition hover:border-[#BFD4F3] hover:bg-[#FBFDFF]"
              >
                <span className="text-[15px] font-semibold text-[#071533]">{item.label}</span>
                <ArrowRight className="h-4 w-4 text-[#2563EB] transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="FAQs"
            title="Frequently asked questions"
            desc="These are the common questions people ask about the future of AI skills."
          />

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-[24px] border border-[#D8E5F4] bg-[#FBFDFF] px-6 py-5 shadow-[0_6px_18px_rgba(15,23,42,0.03)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-semibold leading-[1.5] text-[#071533] marker:content-none">
                  <span>{item.q}</span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[#D8E5F4] bg-white text-[#2563EB] transition group-open:rotate-180">
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
