import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Blocks,
  Bot,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Clapperboard,
  Clock3,
  FileText,
  GraduationCap,
  ImageIcon,
  Languages,
  LayoutTemplate,
  Lightbulb,
  Megaphone,
  MonitorPlay,
  PenTool,
  PlayCircle,
  Rocket,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import FaqBlock, {
  type FaqItem,
} from "@/app/components/brand/FaqBlock";

const BASE_URL = "https://sikhadenge.in";

export const metadata: Metadata = {
  title: "AI Expert Professional Program | Courses",
  description:
    "Explore the AI Expert Professional Program by Sikhadenge. Build practical AI-powered capability across content, design, video, marketing, landing pages, and workflow systems.",
  alternates: {
    canonical: `${BASE_URL}/courses`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/courses`,
    title:
      "AI Expert Professional Program | Sikhadenge",
    description:
      "Build practical AI-powered digital capability through live, guided, execution-first learning across content, design, video, marketing, pages, and workflows.",
    siteName: "Sikhadenge",
    images: [
      `${BASE_URL}/images/courses/ai-mastery.webp`,
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Expert Professional Program | Sikhadenge",
    description:
      "Build practical AI-powered capability through an eight-week guided and execution-first learning structure.",
    images: [
      `${BASE_URL}/images/courses/ai-mastery.webp`,
    ],
  },
};

type ThreeDIconProps = {
  icon: ReactNode;
  gradient: string;
  shadow: string;
};

function ThreeDIcon({
  icon,
  gradient,
  shadow,
}: ThreeDIconProps) {
  return (
    <div
      data-course-3d-icon="brand-cube-v1"
      className="relative h-[74px] w-[74px] shrink-0"
    >
      <div className="absolute inset-[9px] translate-y-3 rounded-[24px] bg-slate-950/25 blur-[3px]" />

      <div
        className="absolute inset-0 -rotate-6 rounded-[26px] border border-white/60"
        style={{
          background: gradient,
          boxShadow: shadow,
        }}
      />

      <div className="absolute inset-[7px] rotate-3 rounded-[22px] border border-white/50 bg-white/15 shadow-[inset_0_2px_3px_rgba(255,255,255,0.45)] backdrop-blur-sm" />

      <div className="relative flex h-full w-full items-center justify-center text-white drop-shadow-[0_3px_5px_rgba(15,23,42,0.3)]">
        {icon}
      </div>
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";

  const eyebrowClasses =
    tone === "dark"
      ? "border-white/15 bg-white/10 text-blue-100"
      : "border-blue-200 bg-blue-50 text-blue-700";

  const titleClasses =
    tone === "dark"
      ? "text-white"
      : "text-slate-950";

  const descriptionClasses =
    tone === "dark"
      ? "text-blue-50/75"
      : "text-slate-600";

  return (
    <div
      className={`flex max-w-4xl flex-col ${alignment}`}
    >
      <span
        className={`inline-flex rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] ${eyebrowClasses}`}
      >
        {eyebrow}
      </span>

      <h2
        className={`mt-5 text-[30px] font-medium leading-[1.08] tracking-[-0.035em] sm:text-[38px] lg:text-[44px] ${titleClasses}`}
      >
        {title}
      </h2>

      <p
        className={`mt-4 max-w-3xl text-[15px] leading-7 sm:text-[17px] sm:leading-8 ${descriptionClasses}`}
      >
        {description}
      </p>
    </div>
  );
}

const overviewCards = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: "AI Content Systems",
    description:
      "Build clearer systems for ideas, hooks, scripts, captions, copy, and modern communication workflows.",
    gradient:
      "linear-gradient(145deg,#2563EB 0%,#38BDF8 100%)",
    shadow:
      "0 18px 34px rgba(37,99,235,0.28)",
  },
  {
    icon: <PenTool className="h-8 w-8" />,
    title: "AI Visual Execution",
    description:
      "Create stronger social assets, layouts, thumbnails, brand visuals, and presentation-ready creative work.",
    gradient:
      "linear-gradient(145deg,#7C3AED 0%,#C084FC 100%)",
    shadow:
      "0 18px 34px rgba(124,58,237,0.25)",
  },
  {
    icon: <Clapperboard className="h-8 w-8" />,
    title: "AI Video Workflows",
    description:
      "Understand reels, short-form content, edit planning, production support, and repeatable video systems.",
    gradient:
      "linear-gradient(145deg,#DB2777 0%,#FB7185 100%)",
    shadow:
      "0 18px 34px rgba(219,39,119,0.24)",
  },
  {
    icon: <Megaphone className="h-8 w-8" />,
    title: "AI Marketing Assets",
    description:
      "Develop campaign content, offer communication, launch assets, and audience-facing execution systems.",
    gradient:
      "linear-gradient(145deg,#EA580C 0%,#FBBF24 100%)",
    shadow:
      "0 18px 34px rgba(234,88,12,0.23)",
  },
  {
    icon: <LayoutTemplate className="h-8 w-8" />,
    title: "AI Pages and Funnels",
    description:
      "Learn landing-page structure, section logic, offer presentation, and conversion-oriented page thinking.",
    gradient:
      "linear-gradient(145deg,#059669 0%,#34D399 100%)",
    shadow:
      "0 18px 34px rgba(5,150,105,0.24)",
  },
  {
    icon: <Workflow className="h-8 w-8" />,
    title: "AI Automation Systems",
    description:
      "Reduce repetitive work and build clearer productivity systems through connected AI-assisted workflows.",
    gradient:
      "linear-gradient(145deg,#0F766E 0%,#22D3EE 100%)",
    shadow:
      "0 18px 34px rgba(15,118,110,0.24)",
  },
] as const;

const moduleCards = [
  {
    number: "01",
    icon: <Sparkles className="h-5 w-5" />,
    title: "AI Foundations",
    description:
      "Build the mindset and structured thinking required for practical AI-first work.",
    items: [
      "AI mindset and modern digital execution",
      "Prompt thinking and structured inputs",
      "Tool ecosystem overview and role clarity",
      "Workflow-based learning approach",
    ],
  },
  {
    number: "02",
    icon: <FileText className="h-5 w-5" />,
    title: "AI Content Creation Systems",
    description:
      "Turn ideas into structured communication and reusable content workflows.",
    items: [
      "Idea generation and topic structuring",
      "Hooks, scripts, captions, and copy",
      "Content planning for digital use cases",
      "Practical writing-support workflows",
    ],
  },
  {
    number: "03",
    icon: <ImageIcon className="h-5 w-5" />,
    title: "AI Design and Visual Execution",
    description:
      "Use AI support to improve creative direction, layouts, and brand-oriented output.",
    items: [
      "Creative support for digital assets",
      "Visual systems, thumbnails, and layouts",
      "Brand-oriented creative thinking",
      "Practical design execution with AI",
    ],
  },
  {
    number: "04",
    icon: <Clapperboard className="h-5 w-5" />,
    title: "AI Video Production Systems",
    description:
      "Develop repeatable systems for planning and producing short-form video content.",
    items: [
      "Short-form and reels workflows",
      "Video planning and execution systems",
      "AI-assisted production support",
      "Content-to-video execution thinking",
    ],
  },
  {
    number: "05",
    icon: <Megaphone className="h-5 w-5" />,
    title: "AI Marketing Asset Systems",
    description:
      "Connect content, offers, campaigns, and launch-side communication.",
    items: [
      "Campaign content and offer messaging",
      "Launch and audience-facing assets",
      "Digital marketing support systems",
      "Practical promotion workflows",
    ],
  },
  {
    number: "06",
    icon: <LayoutTemplate className="h-5 w-5" />,
    title: "AI Pages and Funnels",
    description:
      "Understand page structure, digital flow, and conversion-oriented presentation.",
    items: [
      "Landing-page structure and section logic",
      "Offer presentation and digital flow",
      "Page execution for digital brands",
      "Conversion-oriented layout thinking",
    ],
  },
  {
    number: "07",
    icon: <Workflow className="h-5 w-5" />,
    title: "AI Automation and Workflows",
    description:
      "Connect recurring tasks into clearer and more productive execution systems.",
    items: [
      "Internal productivity systems",
      "Documentation and recurring-task support",
      "Structured AI-assisted workflows",
      "Execution clarity across connected tasks",
    ],
  },
] as const;

const practiceOutputs = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Content workflow",
    description:
      "A repeatable system for ideas, scripts, captions, and communication.",
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "Visual asset system",
    description:
      "Structured creative direction for posts, layouts, and presentation assets.",
  },
  {
    icon: <PlayCircle className="h-6 w-6" />,
    title: "Video execution flow",
    description:
      "A practical process for short-form planning and production support.",
  },
  {
    icon: <LayoutTemplate className="h-6 w-6" />,
    title: "Landing-page framework",
    description:
      "A clear section system for presenting offers and digital services.",
  },
  {
    icon: <Megaphone className="h-6 w-6" />,
    title: "Campaign asset pack",
    description:
      "Connected communication assets for promotion and audience engagement.",
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: "Automation playbook",
    description:
      "A structured workflow for reducing repetitive digital work.",
  },
] as const;

const audienceCards = [
  {
    icon: <GraduationCap className="h-7 w-7" />,
    title: "Students",
    description:
      "Build practical AI capability before internships, projects, and early-career opportunities.",
  },
  {
    icon: <BriefcaseBusiness className="h-7 w-7" />,
    title: "Freelancers",
    description:
      "Expand client-side capability across content, visuals, video, pages, and workflows.",
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: "Creators",
    description:
      "Develop faster systems for ideas, scripts, visuals, videos, offers, and audience content.",
  },
  {
    icon: <Rocket className="h-7 w-7" />,
    title: "Career Switchers",
    description:
      "Move into modern digital roles through structured capability instead of random tool learning.",
  },
  {
    icon: <Bot className="h-7 w-7" />,
    title: "Digital Operators",
    description:
      "Become more useful in execution environments shaped by AI-assisted work.",
  },
  {
    icon: <Lightbulb className="h-7 w-7" />,
    title: "Serious Beginners",
    description:
      "Follow a structured path into AI-first digital execution without confusion.",
  },
] as const;

const outcomeCards = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Execution clarity",
    description:
      "Understand how content, visuals, videos, pages, campaigns, and workflows connect.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Stronger output",
    description:
      "Create more structured and more professional digital work with AI support.",
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: "Repeatable systems",
    description:
      "Improve speed, organisation, and productivity across recurring work.",
  },
  {
    icon: <Blocks className="h-6 w-6" />,
    title: "Broader capability",
    description:
      "Move beyond one narrow skill and become useful across connected execution areas.",
  },
  {
    icon: <Megaphone className="h-6 w-6" />,
    title: "Market relevance",
    description:
      "Build capability aligned with how digital teams, creators, and businesses work.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Career readiness",
    description:
      "Develop practical confidence for modern AI-assisted digital opportunities.",
  },
] as const;

const formatPoints = [
  {
    icon: <Clock3 className="h-5 w-5" />,
    title: "Eight-week structure",
    description:
      "A guided sequence designed to build capability step by step.",
  },
  {
    icon: <MonitorPlay className="h-5 w-5" />,
    title: "Live practical classes",
    description:
      "Sessions focused on execution, examples, and applied learning.",
  },
  {
    icon: <Languages className="h-5 w-5" />,
    title: "Hindi-friendly support",
    description:
      "Clear explanations and learning support for easier understanding.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Assignments and practice",
    description:
      "Execution-oriented activities that reinforce each learning area.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Doubt support",
    description:
      "Guided clarity when learners need help understanding a concept or workflow.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Built for real work",
    description:
      "The program prioritises practical capability over passive tool watching.",
  },
] as const;

const faqItems: FaqItem[] = [
  {
    question:
      "What is the AI Expert Professional Program?",
    answer:
      "It is an eight-week guided learning program by Sikhadenge designed to build practical AI-powered capability across content, design, video, marketing assets, landing pages, and workflow systems.",
  },
  {
    question:
      "Is this only an AI tools course?",
    answer:
      "No. The program is built around execution systems, practical output, and how AI supports real digital work across multiple connected areas.",
  },
  {
    question:
      "Who should join this program?",
    answer:
      "Students, freelancers, creators, serious beginners, career switchers, and modern digital professionals can benefit from the program.",
  },
  {
    question:
      "Do I need prior AI or technical experience?",
    answer:
      "No. The structure is suitable for beginners and evolving learners. Concepts and workflows are introduced step by step.",
  },
  {
    question:
      "What topics are covered in the program?",
    answer:
      "The program covers AI foundations, content systems, design execution, video workflows, marketing assets, pages and funnels, and automation-oriented workflow thinking.",
  },
  {
    question:
      "What is the main outcome of the course?",
    answer:
      "The main outcome is stronger practical digital capability using AI, with better execution clarity across several modern work areas.",
  },
  {
    question:
      "How long is the program?",
    answer:
      "The program follows an eight-week guided learning structure with live sessions, practice, assignments, and support.",
  },
  {
    question:
      "Are the classes live or recorded?",
    answer:
      "The delivery model includes live classes with practical focus. Supporting learning resources may also be used where required.",
  },
  {
    question:
      "Is Hindi-friendly learning support available?",
    answer:
      "Yes. The program is designed with Hindi-friendly explanations and support to make complex workflows easier to understand.",
  },
  {
    question:
      "Will I receive assignments and practical work?",
    answer:
      "Yes. The learning structure includes assignments and execution-oriented practice so learners can apply the concepts they study.",
  },
  {
    question:
      "Will the program focus on one specific AI tool?",
    answer:
      "No. Tools may change, so the program focuses on transferable thinking, structured workflows, execution systems, and practical use cases.",
  },
  {
    question:
      "How can I understand the program before joining?",
    answer:
      "You can join the free Sikhadenge masterclass to understand the learning approach, practical use cases, and the next steps available.",
  },
];

function ModuleCard({
  number,
  icon,
  title,
  description,
  items,
}: {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  items: readonly string[];
}) {
  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-blue-100 bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.055)] transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_22px_48px_rgba(37,99,235,0.11)]">
      <div
        aria-hidden="true"
        className="absolute right-[-55px] top-[-55px] h-36 w-36 rounded-full bg-blue-100/60 blur-3xl"
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-medium text-white shadow-[0_12px_24px_rgba(37,99,235,0.25)]">
            {number}
          </span>

          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-700">
            {icon}
          </span>
        </div>

        <h3 className="mt-5 text-[21px] font-medium leading-[1.2] tracking-[-0.025em] text-slate-950">
          {title}
        </h3>

        <p className="mt-3 text-[14px] leading-7 text-slate-600">
          {description}
        </p>

        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3"
            >
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <Check className="h-3.5 w-3.5" />
              </span>

              <p className="text-[13px] leading-6 text-slate-600 sm:text-[14px]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI Expert Professional Program",
  description:
    "An eight-week guided Sikhadenge program focused on practical AI-powered digital capability across content, design, video, marketing, pages, and workflow systems.",
  url: `${BASE_URL}/courses`,
  provider: {
    "@type": "EducationalOrganization",
    name: "Sikhadenge",
    url: BASE_URL,
  },
  educationalLevel: "Beginner to intermediate",
  timeRequired: "P8W",
  teaches: [
    "AI foundations",
    "AI content systems",
    "AI visual execution",
    "AI video workflows",
    "AI marketing assets",
    "AI pages and funnels",
    "AI automation systems",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function CoursesPage() {
  return (
    <main
      data-courses-hub-design="premium-3d-brand-v1"
      className="sd-courses-polish min-h-screen bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_28%,#F8FAFC_100%)] text-slate-950"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <section className="relative overflow-hidden border-b border-blue-100 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute left-[-190px] top-[-190px] h-[460px] w-[460px] rounded-full bg-blue-200/45 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute right-[-120px] top-[30px] h-[380px] w-[380px] rounded-full bg-violet-200/35 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-blue-700 shadow-[0_8px_24px_rgba(37,99,235,0.08)] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Sikhadenge flagship program
            </div>

            <h1 className="mt-6 max-w-4xl text-[36px] font-medium leading-[1.02] tracking-[-0.042em] text-slate-950 sm:text-[48px] lg:text-[60px]">
              Build practical AI capability for modern
              digital work
            </h1>

            <p className="mt-5 max-w-2xl text-[16px] leading-8 text-slate-600 sm:text-[18px]">
              The AI Expert Professional Program connects
              content, design, video, marketing, pages, and
              automation through one structured,
              execution-first learning journey.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-medium text-white shadow-[0_15px_32px_rgba(37,99,235,0.25)] transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Join Free Masterclass
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#program-modules"
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-800 shadow-[0_10px_26px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-700"
              >
                Explore Program Curriculum
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["8 weeks", "Guided learning"],
                ["7 modules", "Connected skills"],
                ["Live", "Practical classes"],
                ["Hindi", "Friendly support"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[20px] border border-blue-100 bg-white/85 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.045)] backdrop-blur"
                >
                  <p className="text-xl font-medium text-slate-950">
                    {value}
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[580px]">
            <div
              data-courses-hero-visual="ai-program-command-center-v1"
              className="relative overflow-hidden rounded-[36px] border border-blue-100 bg-[linear-gradient(145deg,#07152F_0%,#164A9D_58%,#7255D9_100%)] p-5 shadow-[0_34px_80px_rgba(30,64,175,0.22)] sm:p-6"
            >
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/25 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl"
              />

              <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-white/15 bg-slate-950/25">
                  <Image
                    src="/images/courses/ai-mastery.webp"
                    alt="AI Expert Professional Program visual"
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 540px"
                    className="object-cover object-center"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(3,12,31,0.78)_100%)]" />

                  <div className="absolute inset-x-4 bottom-4 rounded-[20px] border border-white/15 bg-slate-950/45 p-4 backdrop-blur-md">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-blue-100/75">
                      AI Expert learning system
                    </p>

                    <p className="mt-2 text-lg font-medium text-white">
                      Learn · Build · Execute
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    ["01", "Content"],
                    ["02", "Design"],
                    ["03", "Systems"],
                  ].map(([number, label]) => (
                    <div
                      key={label}
                      className="rounded-[18px] border border-white/12 bg-white/10 p-3 text-center"
                    >
                      <p className="text-[10px] text-blue-100/65">
                        {number}
                      </p>

                      <p className="mt-1 text-xs font-medium text-white">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -left-3 top-12 hidden rounded-[18px] border border-blue-100 bg-white px-4 py-3 shadow-[0_14px_35px_rgba(15,23,42,0.12)] sm:block">
              <p className="text-[10px] uppercase tracking-[0.14em] text-blue-600">
                Structure
              </p>
              <p className="mt-1 text-sm font-medium text-slate-950">
                7 connected modules
              </p>
            </div>

            <div className="absolute -right-3 bottom-14 hidden rounded-[18px] border border-blue-100 bg-white px-4 py-3 shadow-[0_14px_35px_rgba(15,23,42,0.12)] sm:block">
              <p className="text-[10px] uppercase tracking-[0.14em] text-blue-600">
                Focus
              </p>
              <p className="mt-1 text-sm font-medium text-slate-950">
                Practice-first learning
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-blue-100 bg-white px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Live guided learning",
            "Assignments and practice",
            "Hindi-friendly support",
            "Modern execution systems",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-[18px] border border-blue-100 bg-blue-50/55 px-4 py-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                <Check className="h-4 w-4" />
              </span>

              <p className="text-sm font-medium text-slate-700">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Program overview"
            title="What you will learn in the AI Expert Program"
            description="Six connected capability areas help learners understand where AI fits inside real modern digital work."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {overviewCards.map((item) => (
              <article
                key={item.title}
                className="group rounded-[30px] border border-blue-100 bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_22px_48px_rgba(37,99,235,0.1)]"
              >
                <ThreeDIcon
                  icon={item.icon}
                  gradient={item.gradient}
                  shadow={item.shadow}
                />

                <h3 className="mt-6 text-[22px] font-medium leading-[1.2] tracking-[-0.025em] text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-[15px] leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="program-modules"
        className="border-y border-blue-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Program modules"
            title="Course modules built for practical digital execution"
            description="Each module develops one capability while connecting it with the complete AI-powered work system."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {moduleCards.map((item) => (
              <ModuleCard
                key={item.number}
                number={item.number}
                icon={item.icon}
                title={item.title}
                description={item.description}
                items={item.items}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-blue-900/40 bg-[linear-gradient(145deg,#06152F_0%,#0E3575_56%,#5C4FD0_100%)] p-6 text-white shadow-[0_30px_70px_rgba(30,64,175,0.2)] sm:p-9">
          <SectionHeading
            eyebrow="Practice and output"
            title="What learners will practise and build"
            tone="dark"
            description="The program connects learning with practical systems that can support real content, creative, marketing, page, and workflow execution."
          />

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {practiceOutputs.map((item) => (
              <article
                key={item.title}
                className="rounded-[24px] border border-white/12 bg-white/10 p-5 backdrop-blur-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cyan-100">
                  {item.icon}
                </span>

                <h3 className="mt-5 text-xl font-medium text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-blue-50/75">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Who this is for"
            title="Who should join this program"
            description="The AI Expert Professional Program is designed for learners who want broader capability and stronger real-world relevance."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {audienceCards.map((item) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-blue-100 bg-white p-6 shadow-[0_13px_34px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-blue-300"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-blue-100 bg-[linear-gradient(145deg,#EFF6FF,#F2EEFF)] text-blue-700 shadow-[0_10px_24px_rgba(37,99,235,0.1)]">
                  {item.icon}
                </span>

                <h3 className="mt-5 text-[21px] font-medium tracking-[-0.02em] text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-[15px] leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Program outcomes"
            title="What learners can achieve after this program"
            description="The course is designed to improve execution quality, confidence, and practical usefulness across modern digital work."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {outcomeCards.map((item) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-slate-800/70 bg-[linear-gradient(160deg,#0B2246_0%,#061731_100%)] p-6 text-white shadow-[0_18px_42px_rgba(11,18,32,0.16)] transition hover:-translate-y-1"
              >
                <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[18px] border border-white/10 bg-white/5 text-cyan-100">
                  {item.icon}
                </span>

                <h3 className="mt-5 text-[21px] font-medium tracking-[-0.02em] text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-[15px] leading-7 text-white/75">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[34px] border border-blue-100 bg-[linear-gradient(135deg,#F1F7FF_0%,#F5F1FF_100%)] p-6 shadow-[0_20px_50px_rgba(37,99,235,0.08)] sm:p-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            eyebrow="Course format"
            title="How the program is delivered"
            description="The delivery model keeps learning practical, guided, understandable, and connected with real execution."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {formatPoints.map((item) => (
              <article
                key={item.title}
                className="rounded-[22px] border border-blue-100 bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.045)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  {item.icon}
                </span>

                <h3 className="mt-4 text-[17px] font-medium text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-[14px] leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        data-courses-faq-style="home-about-contact-v1"
        className="border-y border-slate-200 bg-[#F6F8FC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <FaqBlock
            pill="FAQs"
            title="Frequently asked questions"
            description="Clear answers about the AI Expert Professional Program, learning structure, live classes, practical work, support, and outcomes."
            items={faqItems}
          />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-blue-900/40 bg-[linear-gradient(135deg,#07152F_0%,#174899_60%,#6255D8_100%)] px-6 py-10 text-white shadow-[0_30px_75px_rgba(30,64,175,0.22)] sm:px-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-blue-100/70">
                Start with practical clarity
              </p>

              <h2 className="mt-3 text-[30px] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[40px]">
                Understand the AI learning path before
                choosing your next step
              </h2>

              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-blue-50/80 sm:text-[17px] sm:leading-8">
                Join the free masterclass to explore the
                Sikhadenge learning approach, practical
                workflows, and modern AI-powered work
                opportunities.
              </p>
            </div>

            <Link
              href="/gen-ai-masterclass"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-blue-800 transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Join Free Masterclass
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
