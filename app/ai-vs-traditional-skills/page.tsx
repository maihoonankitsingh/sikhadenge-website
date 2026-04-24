import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Lightbulb, Scale, Sparkles, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "AI vs Traditional Skills | Sikhadenge",
  description:
    "Understand the difference between AI skills and traditional skills. Learn how AI-assisted capability changes digital work, where fundamentals still matter, and how to combine both for stronger career growth.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-vs-traditional-skills",
  },
  openGraph: {
    title: "AI vs Traditional Skills | Sikhadenge",
    description:
      "Understand the difference between AI skills and traditional skills. Learn how AI-assisted capability changes digital work, where fundamentals still matter, and how to combine both for stronger career growth.",
    url: "https://sikhadenge.in/ai-vs-traditional-skills",
    siteName: "Sikhadenge",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI vs Traditional Skills | Sikhadenge",
    description:
      "Understand the difference between AI skills and traditional skills. Learn how AI-assisted capability changes digital work, where fundamentals still matter, and how to combine both for stronger career growth.",
  },
};

const faqs = [
  {
    q: "What is the difference between AI skills and traditional skills?",
    a: "Traditional skills focus on manual execution and foundational craft, while AI skills focus on using AI tools, workflows, and systems to improve speed, output, and practical execution. The strongest approach combines both.",
  },
  {
    q: "Will AI skills replace traditional skills completely?",
    a: "No. In most cases, traditional skills still matter because fundamentals improve judgment, quality, and output direction. AI usually becomes more powerful when it is combined with strong fundamentals.",
  },
  {
    q: "Which is better: AI skills or traditional skills?",
    a: "Neither works best alone in many modern digital roles. Traditional skills build depth, while AI skills improve speed and execution. Together they create stronger capability.",
  },
  {
    q: "Should beginners learn traditional fundamentals before AI?",
    a: "Beginners should learn both in a balanced way. They do not need to master everything first, but they should understand core fundamentals while learning how AI fits into practical workflows.",
  },
  {
    q: "Why are employers and clients asking for AI-assisted capability?",
    a: "Because AI-assisted capability helps improve speed, reduce repetitive effort, and support broader execution across content, design, video, marketing, and workflows.",
  },
  {
    q: "What is the best long-term strategy for career growth?",
    a: "The best long-term strategy is to build strong fundamentals, learn AI tools practically, and combine both inside real workflows and projects.",
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

export default function AiVsTraditionalSkillsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Skills Comparison Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[40px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[62px]">
              AI vs traditional skills
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              The comparison between AI skills and traditional skills is often misunderstood. This is not a simple
              either-or decision. Traditional skills still matter because they build craft, judgment, quality, and
              understanding. AI skills matter because they improve speed, workflow support, and modern execution.
              The strongest digital workers are increasingly the ones who can combine both.
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
            pill="Core comparison"
            title="How AI skills and traditional skills differ"
            desc="The real difference is not just tools. It is the way work gets executed, improved, and scaled."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Briefcase,
                title: "Traditional skills build craft",
                desc: "Traditional skills usually develop deep understanding, manual execution quality, design sense, content judgment, editing instincts, and foundational capability.",
              },
              {
                icon: Sparkles,
                title: "AI skills improve speed",
                desc: "AI skills help reduce repetitive effort, accelerate ideation, support output creation, and improve workflow efficiency across many digital tasks.",
              },
              {
                icon: Workflow,
                title: "Traditional skills create depth",
                desc: "People with strong fundamentals often produce better direction, stronger decisions, and higher-quality work because they understand what good output looks like.",
              },
              {
                icon: Lightbulb,
                title: "AI skills create leverage",
                desc: "AI can expand capability by allowing one person to handle more tasks, move faster, and support broader execution without increasing effort at the same rate.",
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
            pill="Where traditional skills still matter"
            title="Why fundamentals still remain important"
            desc="Even as AI grows, strong fundamentals continue to shape output quality and professional value."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[
              "Creative judgment and taste",
              "Communication clarity and intent",
              "Visual hierarchy and design fundamentals",
              "Editing sense and storytelling quality",
              "Decision-making in workflows and projects",
              "Understanding what makes output strong or weak",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Scale className="mt-0.5 h-5 w-5 text-[#2563EB]" />
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
            pill="Where AI skills create advantage"
            title="Why AI skills are becoming more valuable"
            desc="AI skills create real advantage when speed, output volume, and system thinking matter."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Faster output cycles",
                desc: "AI helps move from idea to output more quickly across multiple digital tasks.",
              },
              {
                title: "Broader capability",
                desc: "One person can often support more connected work areas with AI-assisted systems.",
              },
              {
                title: "Better workflow efficiency",
                desc: "AI improves repeatability, task support, and structured execution in many environments.",
              },
              {
                title: "More relevance in modern work",
                desc: "Clients, teams, and businesses increasingly expect AI-assisted capability alongside fundamentals.",
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
            pill="Best strategy"
            title="Why combining both creates the strongest advantage"
            desc="The long-term winning path is usually not choosing one side. It is integrating both skill types properly."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {[
              "Build strong fundamentals",
              "Understand where AI fits",
              "Use AI to support execution",
              "Keep judgment and quality high",
              "Create systems that combine craft and speed",
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
            pill="Who should think about this"
            title="Who benefits most from this comparison"
            desc="This comparison matters for anyone making decisions about future learning and career direction."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              "Students deciding what to learn next",
              "Freelancers trying to stay competitive",
              "Creators balancing craft and speed",
              "Job seekers adapting to changing digital roles",
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
            desc="These pages connect this comparison guide with the wider Sikhadenge AI learning cluster."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { href: "/ai-skills", label: "AI Skills" },
              { href: "/ai-tools", label: "AI Tools" },
              { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
              { href: "/future-of-ai-skills", label: "Future of AI Skills" },
              { href: "/ai-generalist", label: "AI Expert" },
              { href: "/how-to-learn-ai-skills", label: "How to Learn AI Skills" },
              { href: "/ai-skills-roadmap-for-beginners", label: "AI Skills Roadmap for Beginners" },
              { href: "/ai-jobs-without-coding", label: "AI Jobs Without Coding" },
              { href: "/ai-career-paths", label: "AI Career Paths" },
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
            desc="These are the common questions people ask when comparing AI skills and traditional skills."
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
