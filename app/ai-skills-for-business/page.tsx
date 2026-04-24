import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Lightbulb, Rocket, Target, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Skills for Business | Sikhadenge",
  description:
    "Learn which AI skills matter for business growth, operations, marketing, content, workflows, and productivity. Understand how practical AI skills help modern businesses improve speed, efficiency, and execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-business",
  },
  openGraph: {
    title: "AI Skills for Business | Sikhadenge",
    description:
      "Learn which AI skills matter for business growth, operations, marketing, content, workflows, and productivity. Understand how practical AI skills help modern businesses improve speed, efficiency, and execution.",
    url: "https://sikhadenge.in/ai-skills-for-business",
    siteName: "Sikhadenge",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Skills for Business | Sikhadenge",
    description:
      "Learn which AI skills matter for business growth, operations, marketing, content, workflows, and productivity. Understand how practical AI skills help modern businesses improve speed, efficiency, and execution.",
  },
};

const faqs = [
  {
    q: "What are AI skills for business?",
    a: "AI skills for business are practical capabilities that help founders, teams, and operators use AI across content, marketing, workflows, communication, productivity, and execution systems.",
  },
  {
    q: "Why do businesses need AI skills now?",
    a: "Businesses need AI skills because AI can reduce manual work, improve speed, support decision-making, and increase efficiency across multiple digital functions.",
  },
  {
    q: "Do business AI skills only mean automation?",
    a: "No. Business AI skills include automation, but they also include content systems, AI-assisted marketing, workflow planning, documentation, communication support, and productivity improvement.",
  },
  {
    q: "Which business teams benefit from AI skills?",
    a: "Marketing, operations, sales, content, founder-led teams, support functions, and small business teams can all benefit from practical AI skills.",
  },
  {
    q: "Can small businesses also use AI skills effectively?",
    a: "Yes. Small businesses often benefit even more because AI can help them do more work with smaller teams and limited resources.",
  },
  {
    q: "What is the best starting point for business AI skills?",
    a: "A good starting point is to identify repetitive work, communication bottlenecks, content needs, and workflow inefficiencies, then apply simple AI tools and structured systems to those areas.",
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

export default function AiSkillsForBusinessPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Business AI Skills</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[40px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[62px]">
              AI skills for business
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              AI skills are becoming important for businesses because modern teams need more speed, better workflow
              clarity, stronger communication systems, and higher output efficiency. These skills are not limited to
              technical development. They include practical business-side capabilities such as content support, AI
              marketing systems, workflow optimization, documentation, and smarter execution across daily operations.
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
            pill="Why it matters"
            title="Why AI skills matter for modern businesses"
            desc="Businesses benefit from AI when it is used as a practical execution layer, not just as a trend."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Rocket,
                title: "Faster execution",
                desc: "AI helps businesses move faster by reducing the time needed for content, communication, research, planning, and repetitive digital work.",
              },
              {
                icon: Workflow,
                title: "Better workflow systems",
                desc: "Businesses can use AI to build cleaner workflows, reduce confusion, improve process documentation, and increase repeatability.",
              },
              {
                icon: Target,
                title: "Smarter resource usage",
                desc: "Teams with limited bandwidth can use AI to handle more work without increasing manual effort at the same rate.",
              },
              {
                icon: Briefcase,
                title: "Higher business efficiency",
                desc: "AI skills support better output quality, stronger internal systems, and more practical use of time across departments.",
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
            pill="Main skill areas"
            title="The most useful AI skill areas for business"
            desc="The strongest business-side AI capability usually comes from practical skill clusters like these."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[
              "AI content creation for business communication",
              "AI marketing support and campaign execution",
              "AI workflow planning and team productivity",
              "AI documentation and knowledge organization",
              "AI research and decision support",
              "AI automation thinking for repetitive business tasks",
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
            pill="Business use cases"
            title="Where businesses can use AI skills practically"
            desc="AI skills create value when they are mapped to actual business execution needs."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Marketing teams",
                desc: "Use AI for content support, messaging, campaign planning, and ad-related execution systems.",
              },
              {
                title: "Operations teams",
                desc: "Use AI for documentation, process support, productivity improvement, and workflow organization.",
              },
              {
                title: "Founder-led businesses",
                desc: "Use AI to increase output speed across communication, ideas, content, systems, and day-to-day execution.",
              },
              {
                title: "Small business teams",
                desc: "Use AI to do more work with smaller teams while improving consistency and reducing manual load.",
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
            pill="Simple roadmap"
            title="How businesses should start using AI skills"
            desc="The best starting point is not complexity. It is structured adoption in a few useful areas."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {[
              "Identify repetitive work and bottlenecks",
              "Map where AI can save time",
              "Choose a small set of useful tools",
              "Build simple team workflows",
              "Expand gradually with real usage",
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
            pill="Who should learn this"
            title="Who should build AI skills in a business context"
            desc="AI business skills are useful for anyone involved in execution, communication, systems, or growth."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              "Founders and business operators",
              "Marketing and growth teams",
              "Operations and support teams",
              "Small business decision-makers",
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
            desc="These pages connect this business guide with the wider Sikhadenge AI skills and workflows cluster."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { href: "/ai-skills", label: "AI Skills" },
              { href: "/ai-generalist", label: "AI Expert" },
              { href: "/ai-tools", label: "AI Tools" },
              { href: "/ai-productivity-workflows", label: "AI Productivity Workflows" },
              { href: "/ai-marketing-workflows", label: "Market with Automate Work with AI" },
              { href: "/ai-business-workflows", label: "AI Business Workflows" },
              { href: "/ai-automation-workflows", label: "AI Automation Workflows" },
              { href: "/ai-productivity-tools", label: "AI Productivity Tools" },
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
            desc="These are the common questions businesses ask before using AI skills practically."
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
