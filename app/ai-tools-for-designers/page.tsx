import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Brush,
  Eye,
  FileImage,
  GraduationCap,
  Image as ImageIcon,
  LayoutTemplate,
  Lightbulb,
  Palette,
  Sparkles,
  Users,
  Wand2,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Tools for Designers | Sikhadenge",
  description:
    "Explore the best AI tools for designers across visual ideation, image generation, editing support, layout thinking, brand assets, and workflow acceleration. A practical guide for students, freelancers, creators, and design-focused learners.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-tools-for-designers",
  },
  openGraph: {
    title: "Best AI Tools for Designers | Sikhadenge",
    description:
      "A practical guide to the best AI tools for designers across visual ideation, image generation, editing support, layouts, and brand asset workflows.",
    url: "https://sikhadenge.in/ai-tools-for-designers",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Tools for Designers | Sikhadenge",
    description:
      "A practical guide to the best AI tools for designers across visual ideation, image generation, editing support, layouts, and brand asset workflows.",
  },
};

const quickInfo = [
  {
    title: "Visual speed",
    desc: "AI tools can help designers move faster from concept to draft, variation, and refinement.",
  },
  {
    title: "Creative support",
    desc: "The right tool mix helps with ideation, style exploration, image generation, and asset support.",
  },
  {
    title: "Practical output",
    desc: "Useful design tools are the ones that improve workflow quality, not just create random visuals.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Design work is evolving",
    desc: "Modern design work now includes faster concepting, rapid iterations, style exploration, and AI-assisted asset generation.",
  },
  {
    icon: Workflow,
    title: "Creative execution needs speed",
    desc: "Designers often need to create more content, more variations, and faster outputs without losing visual direction.",
  },
  {
    icon: Bot,
    title: "AI can support—not replace—thinking",
    desc: "The best AI tools work as support systems for ideation, visual development, editing, and presentation workflows.",
  },
  {
    icon: Briefcase,
    title: "Design relevance is growing",
    desc: "Students, freelancers, creators, and digital teams all benefit when design work becomes faster and more structured.",
  },
];

const toolCategories = [
  {
    icon: Lightbulb,
    title: "Visual Ideation Tools",
    desc: "Tools that help generate concepts, visual directions, mood ideas, style references, and early creative exploration.",
  },
  {
    icon: ImageIcon,
    title: "Image Generation Tools",
    desc: "Tools that help create visual drafts, concept art, ad visuals, poster directions, and creative image outputs.",
  },
  {
    icon: Wand2,
    title: "Editing Support Tools",
    desc: "Tools that assist with background changes, object edits, retouching support, cleanup, and visual refinement tasks.",
  },
  {
    icon: LayoutTemplate,
    title: "Layout & Composition Tools",
    desc: "Tools that help with section planning, creative arrangement, structure thinking, and visual presentation support.",
  },
  {
    icon: Palette,
    title: "Brand Asset Tools",
    desc: "Tools that support color exploration, ad creative development, campaign visuals, and consistent output direction.",
  },
  {
    icon: Workflow,
    title: "Workflow Tools",
    desc: "Tools that support creative organization, prompt systems, design planning, iteration flow, and asset management.",
  },
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Students can use AI tools to build visual practice, improve ideation, and create better project outputs faster.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers can improve creative delivery speed, handle more variation work, and strengthen client presentations.",
  },
  {
    icon: Users,
    title: "Creators",
    desc: "Creators can use AI tools for thumbnails, posters, social creatives, campaign visuals, and content support assets.",
  },
  {
    icon: Eye,
    title: "Design Operators",
    desc: "Design-focused operators can use AI to improve creative output quality, concept support, and production workflows.",
  },
];

const relatedPaths = [
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "Explore the broader AI tools ecosystem across design, video, content, automation, and digital execution.",
  },
  {
    href: "/ai-skills-for-creators",
    title: "AI Skills for Creators",
    desc: "See how creators use AI across visuals, content systems, short-form outputs, and practical digital work.",
  },
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Understand the broader AI skills that connect tools with execution quality and structured creative workflows.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Review the AI skill categories that matter most for modern design, content, and digital execution work.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how AI tools fit into a wider AI Expert capability model across multiple work areas.",
  },
  {
    href: "/courses",
    title: "Courses",
    desc: "Explore the Sikhadenge learning path that combines AI design with broader AI-first digital capability.",
  },
];

const faqs = [
  {
    q: "What are AI tools for designers?",
    a: "AI tools for designers are tools that support ideation, image generation, visual refinement, editing tasks, style exploration, creative asset development, and faster execution workflows.",
  },
  {
    q: "Can AI tools help with design ideas?",
    a: "Yes. Many AI tools can support concept generation, visual directions, style experiments, mood references, and creative exploration before final design work begins.",
  },
  {
    q: "Are AI tools enough to become a strong designer?",
    a: "No. AI tools can speed up output and support experimentation, but strong design still requires visual judgment, hierarchy, composition, communication clarity, and editing decisions.",
  },
  {
    q: "Which AI tools are useful for design work?",
    a: "Useful tools depend on the workflow, but the main categories include ideation tools, image generation tools, editing support tools, layout tools, and creative workflow tools.",
  },
  {
    q: "Who should learn AI tools for design?",
    a: "Students, freelancers, creators, marketers, and design-focused learners can all benefit from AI tools when they want faster creative execution and broader visual capability.",
  },
  {
    q: "Can beginners start using AI tools for design?",
    a: "Yes. Beginners can start with idea generation, visual drafts, simple editing support, and creative exploration before moving into more advanced workflows.",
  },
  {
    q: "What is the difference between design tools and design skills?",
    a: "Design tools are software or platforms. Design skills are the practical abilities to use those tools well while maintaining good visual communication and output quality.",
  },
  {
    q: "Where should I start learning AI tools for design properly?",
    a: "A structured learning path is the best starting point. Begin with ideation, composition support, image workflows, and practical design use cases instead of random experiments.",
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

export default function AiToolsForDesignersPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Design with AI Tools Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI tools for designers
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI tools for designers can support visual ideation, concept development, image generation, creative
              editing, layout thinking, and faster asset production. The best tools are not shortcuts for random
              output. They are creative support systems that help designers move faster while keeping control over
              visual quality, direction, and communication.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-tools"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Tools
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
            title="Why AI tools matter for designers"
            desc="Modern design work often needs faster ideation, more variations, and broader output demands. AI tools can support designers by making visual exploration, editing, and creative execution more efficient."
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
            pill="Tool categories"
            title="Main AI tool categories for design work"
            desc="The strongest design workflows usually combine multiple tool categories instead of relying on only one output method."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {toolCategories.map((item) => {
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
            title="Who can use these tools effectively"
            desc="Design-focused AI tools are useful across multiple audiences when they are applied inside a clear visual workflow."
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
            desc="These pages connect design-focused AI tools with the broader Sikhadenge topic cluster around skills, creators, tools, and AI-first digital execution."
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
            desc="These are the common questions people ask before choosing AI tools for design workflows and creative execution."
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
