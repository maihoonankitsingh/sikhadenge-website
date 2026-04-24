import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, CircleDollarSign, Lightbulb, Sparkles, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Skills to Earn Money in 2026 | Sikhadenge",
  description:
    "Discover the best AI skills to earn money in 2026. Learn which practical AI skills help in freelancing, content creation, design, video editing, and digital services.",
  alternates: {
    canonical: "https://sikhadenge.in/blog/ai-skills-to-earn-money",
  },
};

const skills = [
  "AI content creation for captions, scripts, blog drafts, and client content work",
  "AI design support for thumbnails, social media creatives, and ad assets",
  "AI video editing support for reels, shorts, hooks, and fast content delivery",
  "AI copywriting for offers, landing page copy, messages, and communication",
  "AI workflow and automation thinking for productivity and business execution",
  "AI Expert capability across content, visuals, video, pages, and systems",
];

const steps = [
  "Choose one monetizable skill cluster",
  "Learn the main AI tools used in that skill",
  "Practice with small real outputs",
  "Build portfolio samples",
  "Start freelance or client delivery",
];

const mistakes = [
  "Learning random tools without one earning-focused skill",
  "Copying AI output without editing and quality control",
  "Ignoring business use cases and client needs",
  "Trying to sell services before building samples",
];

const relatedLinks = [
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-skills", label: "AI Skills" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/ai-skills-for-freelancers", label: "AI Skills for Freelancers" },
  { href: "/how-to-earn-money-using-ai", label: "How to Earn Money Using AI" },
  { href: "/ai-jobs-without-coding", label: "AI Jobs Without Coding" },
  { href: "/site-map", label: "HTML Sitemap" },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#245EEA] shadow-[0_4px_16px_rgba(37,99,235,0.08)]">
      {children}
    </div>
  );
}

function SectionTitle({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#071533] md:text-[36px]">
        {title}
      </h2>
      {desc ? <p className="mt-4 text-[17px] leading-[1.8] text-[#47607F]">{desc}</p> : null}
    </div>
  );
}

export default function Page() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>AI Skills Guide</Pill>

          <div className="mt-8 max-w-4xl">
            <h1 className="text-[38px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[58px]">
              AI Skills to Earn Money in 2026
            </h1>

            <p className="mt-6 max-w-3xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              Many people want to earn using AI, but the real question is not only which tools to use. The more
              important question is which AI skills actually help generate income. In practice, earning happens when AI
              is applied inside useful work such as content creation, design support, video execution, marketing
              delivery, and digital services.
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

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: CircleDollarSign,
                title: "Monetizable direction",
                desc: "The strongest AI skills are the ones that solve real business and content problems people already pay for.",
              },
              {
                icon: Workflow,
                title: "Workflow value",
                desc: "Income usually comes from combining tools into useful delivery systems, not just knowing tool names.",
              },
              {
                icon: Briefcase,
                title: "Client relevance",
                desc: "Freelancers and beginners earn faster when their AI skill matches practical market demand.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[26px] border border-[#D8E5F4] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
                  <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[18px] border border-[#CFE0F6] bg-[#EAF2FE]">
                    <Icon className="h-6 w-6 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-5 text-[20px] font-semibold text-[#071533]">{item.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.8] text-[#47607F]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Why AI skills matter for earning"
            desc="AI has made execution faster, but earning still depends on useful skills. The market pays for outcomes like content, visuals, edits, marketing assets, and delivery support. AI skills matter because they help people create those outcomes with more speed and efficiency."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            This is why the best AI skills to earn money are not random experimental skills. They are practical
            execution skills connected to real digital work that businesses, creators, and clients already need.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Best AI skills to earn money"
            desc="These are the skill categories that create the strongest practical earning potential."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {skills.map((item) => (
              <div key={item} className="rounded-[24px] border border-[#D8E5F4] bg-[#FBFDFF] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#2563EB]" />
                  <p className="text-[16px] leading-[1.8] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Which AI skill is best for beginners"
            desc="Beginners usually progress fastest when they choose one execution area instead of trying everything together."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            A good starting point is content, design support, or short-form video execution. These areas have clear
            demand, visible outputs, and strong freelance use cases. Once one skill becomes stable, it becomes easier
            to expand into broader AI Expert capability.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Step-by-step path to turn AI skills into income"
            desc="Use a simple path focused on execution and proof of work."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {steps.map((step, i) => (
              <div key={step} className="rounded-[24px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
                <div className="text-sm font-semibold text-[#2563EB]">Step {i + 1}</div>
                <p className="mt-3 text-[16px] leading-[1.75] text-[#071533]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Mistakes to avoid"
            desc="Most earning delays happen because people focus on tools without building delivery skill."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {mistakes.map((item) => (
              <div key={item} className="rounded-[24px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
                <div className="flex items-start gap-3">
                  <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-[#2563EB]" />
                  <p className="text-[16px] leading-[1.8] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#071533] md:text-[36px]">
            The strongest long-term approach
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            The strongest long-term strategy is to combine fundamentals with AI-assisted execution. The market rewards
            people who can produce quality work faster, communicate clearly, and deliver practical business value.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Explore connected AI pages"
            desc="Use these pages to understand the wider earning, skills, and AI workflow system."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {relatedLinks.map((item) => (
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
        <div className="mx-auto max-w-[1080px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-[#D8E5F4] bg-[linear-gradient(180deg,#F8FBFF_0%,#FFFFFF_100%)] p-8 text-center shadow-[0_10px_28px_rgba(15,23,42,0.04)] md:p-10">
            <h2 className="text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#071533]">
              Learn AI Skills with Sikhadenge
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[17px] leading-[1.85] text-[#47607F]">
              Sikhadenge provides a structured AI Expert Professional Program where learners build practical AI
              skills across design, video, content creation and automation. This helps beginners move from learning to earning.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free AI Masterclass
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
