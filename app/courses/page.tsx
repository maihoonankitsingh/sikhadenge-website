import type { Metadata } from "next";
import {
  Blocks,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Clapperboard,
  FileText,
  GraduationCap,
  LayoutTemplate,
  Lightbulb,
  Megaphone,
  PenTool,
  Rocket,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

import SectionHeader from "@/app/components/brand/SectionHeader";
import LightFeatureCard from "@/app/components/brand/LightFeatureCard";
import DarkCapabilityCard from "@/app/components/brand/DarkCapabilityCard";
import FaqBlock, { type FaqItem } from "@/app/components/brand/FaqBlock";

export const metadata: Metadata = {
  title: "AI Expert Professional Program | Courses | Sikhadenge",
  description:
    "Explore the AI Expert Professional Program by Sikhadenge. Learn practical AI-powered digital capability across content, design, video, marketing assets, pages and workflows.",
  alternates: {
    canonical: "https://sikhadenge.in/courses",
  },
};

const overviewCards = [
  {
    icon: <FileText className="h-7 w-7" />,
    title: "Create Content with AI Systems",
    description:
      "Learn how AI supports ideas, scripts, captions, copy structure, and communication workflows for modern digital execution.",
  },
  {
    icon: <PenTool className="h-7 w-7" />,
    title: "AI Visual Execution",
    description:
      "Build practical capability across design support, social assets, creative layouts, thumbnails, and brand-oriented visual work.",
  },
  {
    icon: <Clapperboard className="h-7 w-7" />,
    title: "Edit Videos with Automate Work with AI",
    description:
      "Understand reels, short-form systems, edit planning, video support, and AI-assisted content production workflows.",
  },
  {
    icon: <Megaphone className="h-7 w-7" />,
    title: "Market with AI Assets",
    description:
      "Create stronger campaign assets, offers, messaging systems, and launch-side digital execution support using AI.",
  },
  {
    icon: <LayoutTemplate className="h-7 w-7" />,
    title: "AI Pages & Funnels",
    description:
      "Learn landing page structure, section thinking, digital presentation, and conversion-oriented page execution basics.",
  },
  {
    icon: <Workflow className="h-7 w-7" />,
    title: "AI Automation & Systems",
    description:
      "Reduce repetitive work and build productivity systems using AI-assisted workflows, clearer structure, and better execution logic.",
  },
];

const moduleCards = [
  {
    number: "01",
    title: "AI Foundations",
    items: [
      "AI mindset and modern digital execution",
      "Prompt thinking and structured input systems",
      "Tool ecosystem overview and role clarity",
      "Workflow-based learning approach",
    ],
  },
  {
    number: "02",
    title: "Create Content with AI Creation",
    items: [
      "Idea generation and topic structuring",
      "Hooks, scripts, captions, and communication systems",
      "Content planning for modern digital use-cases",
      "Practical writing support workflows",
    ],
  },
  {
    number: "03",
    title: "Design with AI Execution",
    items: [
      "Creative support for posts and digital assets",
      "Visual systems, thumbnails, and layouts",
      "Brand-oriented creative thinking",
      "Practical design execution support using AI",
    ],
  },
  {
    number: "04",
    title: "Edit Videos with AI Systems",
    items: [
      "Short-form and reels workflow understanding",
      "Video planning and execution systems",
      "AI-assisted media support and production flow",
      "Content-to-video execution thinking",
    ],
  },
  {
    number: "05",
    title: "Market with AI Assets",
    items: [
      "Campaign content and offer communication",
      "Launch assets and audience-facing execution",
      "Structured digital marketing support systems",
      "Practical messaging and promotion workflows",
    ],
  },
  {
    number: "06",
    title: "AI Pages & Funnels",
    items: [
      "Landing page structure and section logic",
      "Offer presentation and digital flow thinking",
      "Page execution support for modern digital brands",
      "Conversion-oriented layout understanding",
    ],
  },
  {
    number: "07",
    title: "AI Automation & Workflow Systems",
    items: [
      "Internal productivity systems",
      "Documentation and recurring task support",
      "Structured workflows using AI assistance",
      "Execution clarity across connected digital tasks",
    ],
  },
];

const audienceCards = [
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Students",
    description:
      "For learners who want practical AI-powered digital capability before internships, projects, and early-career opportunities.",
  },
  {
    icon: <BriefcaseBusiness className="h-8 w-8" />,
    title: "Freelancers",
    description:
      "For people who want broader client-side capability across content, visuals, videos, pages, and workflow execution.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Creators",
    description:
      "For creators who need faster systems for ideas, scripts, visuals, videos, offers, and audience-facing content execution.",
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Career Switchers",
    description:
      "For people moving into modern digital roles who want practical capability instead of scattered tool learning.",
  },
  {
    icon: <Bot className="h-8 w-8" />,
    title: "Digital Operators",
    description:
      "For serious learners who want to become more useful in modern execution environments shaped by AI-assisted work.",
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Serious Beginners",
    description:
      "For beginners who want a structured path into AI-first digital execution without confusion and random tool chasing.",
  },
];

const outcomeCards = [
  {
    icon: <CheckCircle2 className="h-8 w-8" />,
    title: "Practical Execution Clarity",
    description:
      "Understand how content, visuals, videos, pages, campaigns, and workflows connect in real digital work.",
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Stronger Output Quality",
    description:
      "Create more structured and more professional digital work using AI-assisted systems and better execution thinking.",
  },
  {
    icon: <Workflow className="h-8 w-8" />,
    title: "Better Workflow Systems",
    description:
      "Build repeatable systems that improve speed, organization, and productivity across recurring tasks.",
  },
  {
    icon: <Blocks className="h-8 w-8" />,
    title: "Broader Digital Capability",
    description:
      "Move beyond one narrow skill and become more useful across multiple connected execution areas.",
  },
  {
    icon: <Megaphone className="h-8 w-8" />,
    title: "Modern Market Relevance",
    description:
      "Build capability aligned with how current digital teams, creators, freelancers, and businesses increasingly work.",
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "AI-First Career Readiness",
    description:
      "Develop practical confidence for modern digital opportunities shaped by faster and broader AI-assisted execution.",
  },
];

const formatPoints = [
  "8-week guided learning structure",
  "Live classes with practical focus",
  "Hindi-friendly learning support",
  "Assignments and execution-oriented practice",
  "Doubt support and guided clarity",
  "Built for real digital capability, not passive watching",
];

const faqItems: FaqItem[] = [
  {
    question: "What is the AI Expert Professional Program?",
    answer:
      "It is a structured learning program by Sikhadenge designed to help learners build practical AI-powered digital capability across content, visuals, video, pages, marketing assets, and workflows.",
  },
  {
    question: "Is this only an AI tools course?",
    answer:
      "No. The program is not just about tool names. It is built around execution systems, practical output, and how AI supports real digital work across multiple connected areas.",
  },
  {
    question: "Who should join this program?",
    answer:
      "Students, freelancers, creators, serious beginners, career switchers, and modern digital learners can all benefit from this program.",
  },
  {
    question: "Do I need prior experience to join?",
    answer:
      "No. The structure is designed to help beginners and evolving learners build practical clarity step by step.",
  },
  {
    question: "What kind of topics are covered?",
    answer:
      "The program covers AI foundations, content systems, design execution, video workflows, marketing assets, pages and funnels, and automation-oriented workflow thinking.",
  },
  {
    question: "What is the main outcome of this course?",
    answer:
      "The main outcome is stronger practical digital capability using AI, with better execution clarity across multiple modern work areas instead of one narrow skill only.",
  },
];

function ModuleCard({
  number,
  title,
  items,
}: {
  number: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-[22px] border border-[#D7E3F4] bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[13px] font-bold text-[#2563EB]">
          {number}
        </div>
        <h3 className="text-[18px] font-bold leading-[1.24] tracking-[-0.02em] text-[#0B1220] md:text-[19px]">
          {title}
        </h3>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2.5">
            <span className="mt-1 text-[#2563EB]">
              <CheckCircle2 className="h-4 w-4" />
            </span>
            <p className="text-[14px] leading-[1.75] text-[#475569] md:text-[15px]">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#0B1220]">
      <section className="border-b border-[#E2E8F0] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="max-w-5xl">
            <div className="inline-flex items-center rounded-full border border-[#BFD3F2] bg-[#EFF6FF] px-3 py-1 text-[12px] font-semibold text-[#2563EB] shadow-[0_3px_10px_rgba(37,99,235,0.06)]">
              Sikhadenge flagship course
            </div>

            <h1 className="mt-5 text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-[#0B1220] md:text-[52px]">
              AI Expert Professional Program
            </h1>

            <p className="mt-4 max-w-4xl text-[16px] leading-[1.75] text-[#475569] md:text-[18px]">
              Build practical AI-powered digital capability across design, video, content,
              marketing assets, landing pages, and workflow systems through a structured,
              execution-first learning model.
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <a
                href="/gen-ai-masterclass"
                className="inline-flex items-center rounded-full bg-[#2563EB] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </a>

              <a
                href="#program-modules"
                className="inline-flex items-center rounded-full border border-[#C7D7EF] bg-white px-6 py-3 text-[14px] font-semibold text-[#0B1220] shadow-[0_8px_20px_rgba(15,23,42,0.05)] transition hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                Explore Program Curriculum
              </a>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {[
                "AI-first digital capability",
                "Execution-focused learning structure",
                "Built for modern practical work",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[18px] border border-[#D7E3F4] bg-white px-4 py-3 text-[13px] font-semibold text-[#0B1220] shadow-[0_6px_16px_rgba(15,23,42,0.035)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeader
          pill="Program overview"
          title="What you will learn in the AI Expert Program"
          description="The program is designed around practical execution areas that matter in modern digital work."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {overviewCards.map((item) => (
            <LightFeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section id="program-modules" className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <SectionHeader
          pill="Program modules"
          title="Course modules built for practical digital execution"
          description="Each module is designed to help learners understand where AI fits inside modern execution systems."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {moduleCards.map((item) => (
            <ModuleCard
              key={item.number}
              number={item.number}
              title={item.title}
              items={item.items}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeader
          pill="Who this is for"
          title="Who should join this program"
          description="The AI Expert Professional Program is designed for learners who want broader capability and stronger real-world relevance."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {audienceCards.map((item) => (
            <LightFeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <SectionHeader
          pill="Program outcomes"
          title="What learners can achieve after this program"
          description="The course is designed to improve execution quality, confidence, and practical usefulness across modern digital work."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {outcomeCards.map((item) => (
            <DarkCapabilityCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="rounded-[24px] border border-[#D7E3F4] bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.04)] md:p-6">
          <SectionHeader
            pill="Course format"
            title="How the program is delivered"
            description="The delivery model is designed to keep learning practical, guided, and execution-oriented."
          />

          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {formatPoints.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5 rounded-[18px] border border-[#D7E3F4] bg-[#F8FBFF] px-4 py-3"
              >
                <span className="mt-0.5 text-[#2563EB]">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <p className="text-[14px] leading-[1.75] text-[#475569] md:text-[15px]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 pb-20 md:px-6 md:pb-24">
        <FaqBlock
          pill="FAQs"
          title="Frequently asked questions"
          description="Clear answers to common questions about the AI Expert Professional Program."
          items={faqItems}
        />
      </section>
    </main>
  );
}
