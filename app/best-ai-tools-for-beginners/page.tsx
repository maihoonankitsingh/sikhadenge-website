import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Briefcase, Lightbulb, Search, Sparkles, Wrench, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Tools for Beginners | Sikhadenge",
  description:
    "Explore the best AI tools for beginners in a practical way. Learn which AI tools are useful for content, design, video, workflows, and digital execution without getting lost in unnecessary complexity.",
  alternates: {
    canonical: "https://sikhadenge.in/best-ai-tools-for-beginners",
  },
  openGraph: {
    title: "Best AI Tools for Beginners | Sikhadenge",
    description:
      "Explore the best AI tools for beginners in a practical way. Learn which AI tools are useful for content, design, video, workflows, and digital execution without getting lost in unnecessary complexity.",
    url: "https://sikhadenge.in/best-ai-tools-for-beginners",
    siteName: "Sikhadenge",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Tools for Beginners | Sikhadenge",
    description:
      "Explore the best AI tools for beginners in a practical way. Learn which AI tools are useful for content, design, video, workflows, and digital execution without getting lost in unnecessary complexity.",
  },
};

const faqs = [
  {
    q: "What are the best AI tools for beginners?",
    a: "The best AI tools for beginners are usually the ones that are simple to use, practical for real output, and useful across common tasks like writing, design support, video support, and workflow assistance.",
  },
  {
    q: "Should beginners learn many AI tools together?",
    a: "No. Beginners usually progress faster when they start with a small set of useful tools and learn where each one fits in a practical workflow.",
  },
  {
    q: "Which AI tool category should beginners start with?",
    a: "A useful starting point is AI writing and content support, followed by design support, simple workflow tools, and then role-specific AI tools based on the learner’s goals.",
  },
  {
    q: "Are free AI tools enough for beginners?",
    a: "In many cases, yes. Free tools or free plans are often enough to understand the workflow, build small projects, and learn core execution patterns before upgrading.",
  },
  {
    q: "Can beginners use AI tools without coding?",
    a: "Yes. Most beginner-friendly AI tools for content, visuals, productivity, and workflow support do not require coding knowledge.",
  },
  {
    q: "What is the biggest mistake beginners make with AI tools?",
    a: "A common mistake is trying too many tools without understanding the skill, workflow, or output goal. This creates confusion instead of practical capability.",
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

export default function BestAiToolsForBeginnersPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>AI Tools Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[40px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[62px]">
              Best AI tools for beginners
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              Beginners often feel overwhelmed because the AI tools landscape looks bigger than it actually needs to be.
              In practice, most beginners only need a small set of tools that support real tasks such as writing,
              ideation, design support, workflow organization, and simple digital execution. The goal is not to learn
              every tool. The goal is to use the right tools inside a practical system.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-tools"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-sm font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Start with clarity"
            title="Why beginners should not chase every AI tool"
            desc="The fastest learning path comes from using a small number of useful tools in the right order."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Search,
                title: "Too many tools create noise",
                desc: "Beginners usually waste time when they try to learn every new AI tool they see online instead of focusing on useful categories.",
              },
              {
                icon: Workflow,
                title: "Tools only matter inside workflows",
                desc: "A tool becomes useful when it supports a task, a workflow, or an output. Without workflow clarity, tool learning stays shallow.",
              },
              {
                icon: Bot,
                title: "Simple tools are often enough",
                desc: "Beginners do not need complex enterprise systems. They need a few practical tools that make learning and output easier.",
              },
              {
                icon: Briefcase,
                title: "Real work relevance should guide choices",
                desc: "The strongest beginner tools are the ones that support practical digital work such as content, visuals, communication, productivity, and execution.",
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
            pill="Main categories"
            title="The most useful AI tool categories for beginners"
            desc="Beginners learn faster when tool discovery is grouped into simple practical categories."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[
              "AI writing and idea generation tools",
              "AI design and visual support tools",
              "AI video support and production tools",
              "AI productivity and workflow tools",
              "AI research and summarization tools",
              "AI page and communication support tools",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Wrench className="mt-0.5 h-5 w-5 text-[#2563EB]" />
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
            pill="Practical selection"
            title="What makes an AI tool beginner-friendly"
            desc="A beginner-friendly AI tool is not just popular. It should support learning, ease of use, and practical output."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Simple interface",
                desc: "The tool should be easy to understand without creating unnecessary technical confusion.",
              },
              {
                title: "Useful output",
                desc: "The tool should help produce something practical such as content, visuals, summaries, ideas, or workflow support.",
              },
              {
                title: "Fast learning curve",
                desc: "Beginners should be able to get meaningful results without too much setup or complexity.",
              },
              {
                title: "Workflow relevance",
                desc: "The tool should fit into a broader learning path instead of staying isolated as a novelty.",
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
            pill="Best approach"
            title="How beginners should learn AI tools properly"
            desc="The strongest approach is to connect tool learning with skills and workflows instead of collecting random platforms."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {[
              "Start with one writing or ideation tool",
              "Add one visual or design support tool",
              "Learn one workflow or productivity system",
              "Use tools inside simple projects",
              "Expand only after the workflow feels clear",
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
            pill="Who benefits"
            title="Who should explore beginner AI tools"
            desc="These tool paths are especially useful for people trying to build practical digital capability quickly."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              "Students starting modern digital learning",
              "Freelancers improving client-side output",
              "Creators improving content systems",
              "Beginners exploring AI for practical work",
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

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Related pages"
            title="Explore connected AI pages"
            desc="These pages connect this tools guide with the wider Sikhadenge AI learning cluster."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { href: "/ai-generalist", label: "AI Expert" },
              { href: "/ai-skills", label: "AI Skills" },
              { href: "/ai-tools", label: "AI Tools Hub" },
              { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
              { href: "/how-to-learn-ai-skills", label: "How to Learn AI Skills" },
              { href: "/ai-skills-roadmap-for-beginners", label: "AI Skills Roadmap for Beginners" },
              { href: "/ai-content-workflows", label: "Create Content with Automate Work with AI" },
              { href: "/ai-design-workflows", label: "Design with Automate Work with AI" },
              { href: "/ai-tools-for-designers", label: "AI Tools for Designers" },
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
            desc="These are the common questions beginners ask before choosing AI tools."
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
