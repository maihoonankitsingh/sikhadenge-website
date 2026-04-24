import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Camera,
  FileText,
  Image as ImageIcon,
  Lightbulb,
  Megaphone,
  MessageSquareText,
  Mic2,
  Presentation,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Personal Brand Building | Sikhadenge",
  description:
    "Explore the best AI skills for personal brand building across content ideas, scripts, visuals, communication, positioning, and workflow systems. A practical guide for coaches, consultants, creators, educators, and founders.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-personal-brand",
  },
  openGraph: {
    title: "Best AI Skills for Personal Brand Building | Sikhadenge",
    description:
      "A practical guide to the best AI skills for personal brand building across content ideas, scripts, visuals, positioning, and workflow systems.",
    url: "https://sikhadenge.in/ai-skills-for-personal-brand",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Personal Brand Building | Sikhadenge",
    description:
      "A practical guide to the best AI skills for personal brand building across content ideas, scripts, visuals, positioning, and workflow systems.",
  },
};

const quickInfo = [
  {
    title: "Brand relevance",
    desc: "Personal brands grow faster when content, messaging, and visual presentation become more consistent and more structured.",
  },
  {
    title: "Execution support",
    desc: "The right AI skills help personal brands create better ideas, clearer scripts, stronger content systems, and faster execution.",
  },
  {
    title: "Practical value",
    desc: "Useful AI skills improve communication and visibility systems more than random posting without a clear content process.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Personal brands need consistent output",
    desc: "Modern personal brands often need regular posts, short videos, clear positioning, useful insights, and repeated communication across platforms.",
  },
  {
    icon: Workflow,
    title: "Manual content systems are hard to sustain",
    desc: "Without structure, ideation, scripting, visual support, and publishing become inconsistent and difficult to maintain.",
  },
  {
    icon: Bot,
    title: "AI can support brand-building workflows",
    desc: "Practical AI skills help with ideas, writing, visuals, brand communication, and repeatable content execution systems.",
  },
  {
    icon: Briefcase,
    title: "Personal brand is now digital leverage",
    desc: "Coaches, consultants, founders, educators, and creators benefit when they can communicate clearly and publish consistently.",
  },
];

const skillCategories = [
  {
    icon: Lightbulb,
    title: "Content Ideation Skills",
    desc: "Personal brands should learn how AI supports topics, content pillars, hooks, audience angles, and series planning.",
  },
  {
    icon: FileText,
    title: "Writing & Script Skills",
    desc: "Useful skills include post drafts, captions, short scripts, thought pieces, carousel structure, and message clarity.",
  },
  {
    icon: ImageIcon,
    title: "Visual Support Skills",
    desc: "A practical AI skill is learning how to support thumbnails, posters, social creatives, and visual consistency for public presence.",
  },
  {
    icon: MessageSquareText,
    title: "Positioning & Communication Skills",
    desc: "Strong personal-brand skills include using AI to improve bio lines, explanations, offer clarity, and audience-facing communication.",
  },
  {
    icon: Mic2,
    title: "Speaking & Video Support Skills",
    desc: "Personal brands benefit when they can use AI for speaking points, talking-head scripts, voice support, and video structure.",
  },
  {
    icon: Workflow,
    title: "Content System Skills",
    desc: "Creators should learn how AI fits into repeatable workflows like idea, script, design, post, repurpose, and publish systems.",
  },
];

const useCases = [
  {
    icon: Presentation,
    title: "Coaches & Consultants",
    desc: "Coaches and consultants can use AI skills to improve content clarity, authority building, and consistent communication.",
  },
  {
    icon: Camera,
    title: "Creators",
    desc: "Creators can use AI skills to improve content flow, visuals, scripts, and platform-wise execution consistency.",
  },
  {
    icon: Target,
    title: "Founders",
    desc: "Founders building a public presence can use AI skills to support insights, visibility, positioning, and content systems.",
  },
  {
    icon: Users,
    title: "Educators & Experts",
    desc: "Experts and educators can use AI skills to turn knowledge into clearer, more repeatable public-facing content.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect personal-brand growth with practical digital execution.",
  },
  {
    href: "/ai-skills-for-content-creators",
    title: "AI Skills for Content Creators",
    desc: "See which creator-focused AI skills help with scripts, visuals, short-form content, and publishing systems.",
  },
  {
    href: "/ai-tools-for-creators",
    title: "AI Tools for Creators",
    desc: "Review the AI tools that support ideation, visuals, scripts, and repeatable content workflows.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Understand the wider AI skill categories that matter for modern visibility, content, and digital leverage.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how personal-brand-focused AI skills fit into a broader AI Expert capability model.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how practical AI-first content systems are taught.",
  },
];

const faqs = [
  {
    q: "Which AI skills are useful for personal brand building?",
    a: "Useful AI skills for personal brand building include content ideation, writing support, script drafting, visual support, positioning support, and repeatable content workflow systems.",
  },
  {
    q: "Can AI skills help personal brands grow faster?",
    a: "Yes. AI skills can support idea generation, writing, communication, visual support, and publishing consistency, which helps personal brands execute faster.",
  },
  {
    q: "Do personal brands need coding to learn AI skills?",
    a: "No. Many practical AI skills for personal brand building do not require coding. A strong starting point is content, communication, visuals, and workflow support.",
  },
  {
    q: "Are AI tools and AI skills the same for personal brand work?",
    a: "No. AI tools are the software or platforms. AI skills are the practical abilities to use those tools effectively for real content systems and brand communication.",
  },
  {
    q: "Can beginners build a personal brand using AI skills?",
    a: "Yes. Beginners can start with simple ideas, short scripts, captions, visual support, and a clear content workflow before moving into advanced systems.",
  },
  {
    q: "What is the biggest mistake people make while using AI for personal branding?",
    a: "A common mistake is publishing generic content without a clear point of view, audience angle, personal positioning, or repeatable content process.",
  },
  {
    q: "Can AI skills help with LinkedIn posts, reels, captions, and visual content?",
    a: "Yes. AI can support post ideas, scripts, captions, short-form content planning, and basic visual support for multiple brand-building formats.",
  },
  {
    q: "Where should personal brands start learning AI properly?",
    a: "A structured learning path is the best starting point. Begin with ideation, scripts, communication, and repeatable content workflows instead of random tool exploration.",
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

export default function AiSkillsForPersonalBrandPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Personal Brand AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for personal brand building
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Personal brands do not grow with random content alone. They grow when ideas, scripts, visuals,
              messaging, and publishing systems become more structured. Practical AI skills help coaches,
              consultants, creators, founders, and educators build clearer communication and more consistent
              visibility through repeatable content workflows.
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
            title="Why AI skills matter for personal brands"
            desc="Personal-brand growth depends on clarity, consistency, and visible communication. Practical AI skills help people build structured content systems without losing their own voice."
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
            title="Main AI skill categories for personal brands"
            desc="A strong personal-brand AI path should focus on practical skill areas that improve ideas, scripts, visuals, positioning, and repeatable publishing systems."
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
            title="Who can benefit from personal-brand AI skills"
            desc="Personal-brand-focused AI skills are useful across multiple public-facing roles when the learning path stays practical and communication-driven."
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
            desc="These pages connect personal-brand-focused AI learning with the broader Sikhadenge topic cluster around skills, creators, and AI-first digital capability."
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
            desc="These are the common questions people ask before starting AI skills for personal-brand building."
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
