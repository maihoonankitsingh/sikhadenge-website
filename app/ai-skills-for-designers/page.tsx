import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Brush,
  Eye,
  Image as ImageIcon,
  LayoutTemplate,
  Lightbulb,
  Palette,
  PenTool,
  Sparkles,
  Users,
  Wand2,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Designers | Sikhadenge",
  description:
    "Explore the best AI skills for designers across visual ideation, image generation, editing support, layout thinking, brand execution, and workflow systems. A practical guide for designers, creators, freelancers, and digital learners.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-designers",
  },
  openGraph: {
    title: "Best AI Skills for Designers | Sikhadenge",
    description:
      "A practical guide to the best AI skills for designers across visual ideation, image generation, editing support, layouts, brand execution, and workflow systems.",
    url: "https://sikhadenge.in/ai-skills-for-designers",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Designers | Sikhadenge",
    description:
      "A practical guide to the best AI skills for designers across visual ideation, image generation, editing support, layouts, brand execution, and workflow systems.",
  },
};

const quickInfo = [
  {
    title: "Creative relevance",
    desc: "Modern designers benefit when they can use AI across concepting, visual support, edits, and faster output systems.",
  },
  {
    title: "Execution speed",
    desc: "The right AI skills help designers move faster from idea to draft, variation, refinement, and presentation.",
  },
  {
    title: "Practical value",
    desc: "Useful AI skills improve design workflow quality more than random prompts without visual judgment.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Design work is changing fast",
    desc: "Modern design now includes rapid concepting, multi-format output, faster iterations, and stronger visual systems across digital work.",
  },
  {
    icon: Workflow,
    title: "Manual execution alone is slow",
    desc: "Without structured systems, designers spend too much time on repetitive drafts, variations, and support tasks.",
  },
  {
    icon: Bot,
    title: "AI can support—not replace—design thinking",
    desc: "Practical AI skills help designers improve ideation, generation support, editing support, and workflow efficiency while keeping creative control.",
  },
  {
    icon: Briefcase,
    title: "Designers need broader digital capability",
    desc: "Freelancers, content creators, visual operators, and brand teams benefit when design output becomes faster and more structured.",
  },
];

const skillCategories = [
  {
    icon: Lightbulb,
    title: "Visual Ideation Skills",
    desc: "Designers should learn how to use AI for concept directions, mood ideas, style exploration, and early creative thinking support.",
  },
  {
    icon: ImageIcon,
    title: "Image Generation Skills",
    desc: "Useful skills include generating draft visuals, concept references, art directions, and creative image outputs for practical design use.",
  },
  {
    icon: Wand2,
    title: "Editing Support Skills",
    desc: "A practical AI skill is learning how to support cleanup, retouching, variation edits, background changes, and refinement tasks.",
  },
  {
    icon: LayoutTemplate,
    title: "Layout & Composition Skills",
    desc: "Designers benefit when they can use AI to support structure thinking, section layout, visual hierarchy, and presentation planning.",
  },
  {
    icon: Palette,
    title: "Brand & Asset Skills",
    desc: "Strong design AI skills include support for campaign visuals, ad directions, color exploration, and consistent visual asset systems.",
  },
  {
    icon: Workflow,
    title: "Workflow & Prompt Skills",
    desc: "Designers should learn how AI fits into repeatable systems like concept, draft, review, refine, and final output workflows.",
  },
];

const useCases = [
  {
    icon: PenTool,
    title: "Design Learners",
    desc: "Design learners can use AI skills to improve creative confidence, visual exploration, and practical output speed.",
  },
  {
    icon: Briefcase,
    title: "Freelance Designers",
    desc: "Freelancers can use AI skills to improve client delivery, create more variations, and handle broader visual requirements.",
  },
  {
    icon: Users,
    title: "Creators & Brand Builders",
    desc: "Creators can use design-focused AI skills for thumbnails, posters, brand visuals, and stronger digital communication assets.",
  },
  {
    icon: Eye,
    title: "Visual Operators",
    desc: "Execution-focused visual operators can use AI skills to strengthen design support and overall workflow efficiency.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect design work with practical digital execution.",
  },
  {
    href: "/ai-tools-for-designers",
    title: "AI Tools for Designers",
    desc: "See which AI tools support visual ideation, image generation, design support, and workflow acceleration.",
  },
  {
    href: "/ai-skills-for-creators",
    title: "AI Skills for Creators",
    desc: "Review the broader creator-focused AI skill path across visuals, content, videos, and digital output systems.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Understand the wider AI skill categories that matter for modern designers and practical visual work.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how design-focused AI skills fit into a broader AI Expert capability model.",
  },
  {
    href: "/courses",
    title: "Courses",
    desc: "Explore the Sikhadenge learning path for structured AI-first design and digital capability building.",
  },
];

const faqs = [
  {
    q: "Which AI skills are useful for designers?",
    a: "Useful AI skills for designers include visual ideation, image generation support, editing support, layout thinking, brand asset support, and structured prompt workflows.",
  },
  {
    q: "Can AI skills help designers work faster?",
    a: "Yes. AI skills can reduce time spent on ideation, variations, draft support, visual references, and repetitive design assistance tasks.",
  },
  {
    q: "Do designers need coding to learn AI skills?",
    a: "No. Many practical AI skills for designers do not require coding. A strong starting point is visual ideation, image workflows, design support, and structured prompts.",
  },
  {
    q: "Are AI tools and AI skills the same for designers?",
    a: "No. AI tools are the software or platforms. AI skills are the practical abilities to use those tools effectively for real visual output and design workflows.",
  },
  {
    q: "Can beginners in design learn AI skills from zero?",
    a: "Yes. Beginners can start with concept ideation, prompt basics, simple image generation support, and visual refinement workflows before moving into advanced systems.",
  },
  {
    q: "What is the biggest mistake designers make with AI?",
    a: "A common mistake is generating random visuals without a clear concept, composition goal, brand direction, or refinement workflow.",
  },
  {
    q: "Can AI skills help with posters, thumbnails, ads, and brand visuals?",
    a: "Yes. AI can support creative directions, asset variations, concept drafts, image support, and structured visual workflows for many design formats.",
  },
  {
    q: "Where should designers start learning AI properly?",
    a: "A structured learning path is the best starting point. Begin with ideation, image support, editing support, and repeatable design workflows instead of random tool use.",
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

export default function AiSkillsForDesignersPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Design AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for designers
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Designers do not need random prompt experiments to stay relevant. They need practical AI skills
              that improve ideation, image workflows, editing support, layout thinking, and repeatable creative
              systems. A strong designer path starts with useful skills that strengthen visual judgment while
              speeding up practical execution.
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
            title="Why AI skills matter for designers"
            desc="Modern design work needs faster iterations, stronger visual systems, and broader digital adaptability. Practical AI skills help designers improve speed, structure, and creative support while maintaining quality."
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
            title="Main AI skill categories for designers"
            desc="A strong designer AI path should focus on practical skill areas that improve concepts, visuals, refinement, and repeatable design execution."
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
            title="Who can benefit from design-focused AI skills"
            desc="Design-focused AI skills are useful across multiple audience types when the learning path stays practical and execution-oriented."
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
            desc="These pages connect design-focused AI learning with the broader Sikhadenge topic cluster around skills, tools, creators, and AI-first digital capability."
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
            desc="These are the common questions people ask before starting AI skills for design work."
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
