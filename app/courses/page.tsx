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
      `${BASE_URL}/images/courses/courses-hero-ai-workspace.webp`,
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Expert Professional Program | Sikhadenge",
    description:
      "Build practical AI-powered capability through an eight-week guided and execution-first learning structure.",
    images: [
      `${BASE_URL}/images/courses/courses-hero-ai-workspace.webp`,
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
      data-courses-hub-design="futuristic-top-system-v3"
      className="min-h-screen overflow-hidden bg-[#F6F8FC] text-slate-950"
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

      <section
        data-courses-top-section="futuristic-hero-v3"
        className="relative overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#F4F7FF_0%,#F8FAFC_100%)] px-4 pb-12 pt-9 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20"
      >
        <div
          aria-hidden="true"
          className="absolute left-[-180px] top-[-210px] h-[480px] w-[480px] rounded-full bg-blue-200/50 blur-[105px]"
        />

        <div
          aria-hidden="true"
          className="absolute right-[-150px] top-[-140px] h-[470px] w-[470px] rounded-full bg-violet-200/45 blur-[110px]"
        />

        <div className="relative mx-auto grid max-w-7xl gap-11 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700 shadow-[0_8px_24px_rgba(37,99,235,0.08)] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Sikhadenge flagship program
            </div>

            <h1 className="mt-6 max-w-3xl text-[36px] font-medium leading-[1.02] tracking-[-0.044em] text-slate-950 sm:text-[48px] lg:text-[58px]">
              Build practical{" "}
              <span className="bg-[linear-gradient(90deg,#2563EB,#6D5CE7)] bg-clip-text text-transparent">
                AI capability
              </span>{" "}
              for modern digital work
            </h1>

            <p className="mt-5 max-w-2xl text-[16px] leading-8 text-slate-600 sm:text-[18px]">
              A structured, execution-first program that
              connects content, design, video, marketing,
              pages, and automation through one practical
              learning journey.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-medium text-white shadow-[0_16px_34px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Join Free Masterclass
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#structured-curriculum"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-800 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-700"
              >
                Explore Program Curriculum
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 text-[11px] text-slate-600 sm:grid-cols-4">
              {[
                "Project-based",
                "Beginner-friendly",
                "Live mentorship",
                "Career-ready",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Check className="h-3.5 w-3.5" />
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            data-courses-hero-visual="futuristic-ai-learning-portal-v3"
            className="relative mx-auto w-full max-w-[690px]"
          >
            <div className="absolute inset-x-[8%] bottom-[-4%] h-20 rounded-full bg-blue-600/30 blur-3xl" />

            <div className="relative rounded-[38px] bg-[linear-gradient(145deg,#06152F,#225CB3_56%,#7056E0)] p-[2px] shadow-[0_38px_95px_rgba(30,64,175,0.27)]">
              <div className="rounded-[36px] border border-white/15 bg-slate-950/35 p-3 backdrop-blur-xl sm:p-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/15 bg-[#06152F]">
                  <Image
                    src="/images/courses/courses-hero-ai-workspace.webp"
                    alt="Futuristic Sikhadenge AI learning workspace"
                    fill
                    priority
                    sizes="(max-width: 1024px) 94vw, 660px"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,12,31,0.02)_42%,rgba(3,12,31,0.9)_100%)]" />

                  <div className="absolute inset-x-4 bottom-4 rounded-[22px] border border-white/15 bg-slate-950/58 p-4 backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:p-5">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-100/70 sm:text-[10px]">
                      AI Expert learning system
                    </p>

                    <div className="mt-2 flex items-end justify-between gap-4">
                      <p className="text-[20px] font-medium tracking-[-0.02em] text-white sm:text-[27px]">
                        Learn · Build · Execute
                      </p>

                      <span className="hidden rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-cyan-100 sm:inline-flex">
                        Practice-first
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    ["01", "Content"],
                    ["02", "Design"],
                    ["03", "Systems"],
                  ].map(([number, label]) => (
                    <div
                      key={label}
                      className="rounded-[17px] border border-white/12 bg-white/10 px-3 py-3 text-center backdrop-blur"
                    >
                      <p className="text-[9px] text-blue-100/55">
                        {number}
                      </p>

                      <p className="mt-1 text-[11px] font-medium text-white sm:text-xs">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -left-2 top-[9%] hidden rounded-[20px] border border-blue-100 bg-white/95 px-4 py-3 shadow-[0_18px_42px_rgba(15,23,42,0.14)] backdrop-blur sm:block lg:-left-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                Modules
              </p>

              <p className="mt-1 text-xl font-medium text-slate-950">
                7
              </p>

              <p className="text-[10px] text-slate-500">
                Connected skills
              </p>
            </div>

            <div className="absolute -right-2 top-[13%] hidden rounded-[20px] border border-blue-100 bg-white/95 px-4 py-3 shadow-[0_18px_42px_rgba(15,23,42,0.14)] backdrop-blur sm:block lg:-right-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                Outcome
              </p>

              <p className="mt-1 text-sm font-medium text-slate-950">
                Real digital skills
              </p>
            </div>

            <div className="absolute -left-2 bottom-[11%] hidden rounded-[20px] border border-blue-100 bg-white/95 px-4 py-3 shadow-[0_18px_42px_rgba(15,23,42,0.14)] backdrop-blur md:block lg:-left-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                Focus
              </p>

              <p className="mt-1 text-sm font-medium text-slate-950">
                Practice-first
              </p>
            </div>

            <div className="absolute -right-2 bottom-[9%] hidden rounded-[20px] border border-blue-100 bg-white/95 px-4 py-3 shadow-[0_18px_42px_rgba(15,23,42,0.14)] backdrop-blur md:block lg:-right-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                Approach
              </p>

              <p className="mt-1 text-sm font-medium text-slate-950">
                Learn · Build · Execute
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        data-courses-stats="futuristic-metrics-v3"
        className="relative z-10 px-4 py-6 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 rounded-[28px] border border-blue-100 bg-white/95 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur sm:grid-cols-3 sm:p-4 xl:grid-cols-6">
          {[
            {
              icon: <Clock3 className="h-5 w-5" />,
              value: "8 Weeks",
              label: "Guided learning",
            },
            {
              icon: <Blocks className="h-5 w-5" />,
              value: "7 Modules",
              label: "Connected curriculum",
            },
            {
              icon: <MonitorPlay className="h-5 w-5" />,
              value: "Live",
              label: "Practical classes",
            },
            {
              icon: <Languages className="h-5 w-5" />,
              value: "Hindi",
              label: "Friendly support",
            },
            {
              icon: <CheckCircle2 className="h-5 w-5" />,
              value: "Projects",
              label: "Portfolio outputs",
            },
            {
              icon: <Rocket className="h-5 w-5" />,
              value: "Career",
              label: "Job and freelance ready",
            },
          ].map((item) => (
            <article
              key={item.label}
              className="flex min-h-[96px] items-center gap-3 rounded-[20px] border border-blue-50 bg-[linear-gradient(145deg,#FFFFFF,#F4F7FF)] p-3 sm:min-h-[104px] sm:p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 shadow-[0_8px_18px_rgba(37,99,235,0.1)]">
                {item.icon}
              </span>

              <div>
                <p className="text-[15px] font-medium text-slate-950 sm:text-[16px]">
                  {item.value}
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  {item.label}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="structured-curriculum"
        data-courses-curriculum="futuristic-3d-modules-v3"
        className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      >
        <div className="mx-auto max-w-7xl rounded-[34px] border border-blue-100 bg-white p-5 shadow-[0_24px_65px_rgba(15,23,42,0.06)] sm:p-8">
          <SectionHeading
            eyebrow="Structured curriculum"
            title="Seven connected modules. One complete learning journey."
            description="Every module develops one practical capability while connecting it with the complete AI-powered work system."
          />

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {moduleCards.map((item) => (
              <article
                key={item.number}
                className="group rounded-[25px] border border-blue-100 bg-[linear-gradient(160deg,#FFFFFF_0%,#F7F8FF_100%)] p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_20px_46px_rgba(37,99,235,0.12)]"
              >
                <div
                  data-course-3d-icon="futuristic-glass-module-v3"
                  className="relative h-[68px] w-[68px]"
                >
                  <div className="absolute inset-[8px] translate-y-3 rounded-[20px] bg-slate-950/25 blur-[4px]" />

                  <div className="absolute inset-0 -rotate-6 rounded-[23px] border border-white/75 bg-[linear-gradient(145deg,#2563EB_0%,#6D5CE7_58%,#22D3EE_100%)] shadow-[0_18px_36px_rgba(37,99,235,0.28)]" />

                  <div className="absolute inset-[6px] rotate-3 rounded-[19px] border border-white/45 bg-white/15 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)] backdrop-blur" />

                  <div className="relative flex h-full w-full items-center justify-center text-white drop-shadow-[0_4px_6px_rgba(15,23,42,0.3)]">
                    {item.icon}
                  </div>
                </div>

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                  {item.number}
                </p>

                <h3 className="mt-2 text-[18px] font-medium leading-[1.2] text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-[13px] leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        data-courses-build-choose="future-output-system-v3"
        className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <article className="relative overflow-hidden rounded-[34px] border border-blue-900/35 bg-[linear-gradient(145deg,#06152F_0%,#0C3473_58%,#5B4ECC_100%)] p-6 text-white shadow-[0_28px_70px_rgba(30,64,175,0.2)] sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-[80px]"
            />

            <div className="relative">
              <SectionHeading
                eyebrow="What you will build"
                title="Convert learning into practical digital output"
                description="Build connected, portfolio-ready systems for modern content, visual, marketing, page, and workflow execution."
                tone="dark"
              />

              <div className="mt-7 space-y-3">
                {practiceOutputs.slice(0, 5).map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.07] p-3.5 backdrop-blur"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-300/15 text-cyan-100">
                      <Check className="h-4 w-4" />
                    </span>

                    <div>
                      <p className="text-[14px] font-medium text-white">
                        {item.title}
                      </p>

                      <p className="mt-1 text-[12px] leading-5 text-blue-50/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  {
                    icon: <Bot className="h-6 w-6" />,
                    label: "AI systems",
                  },
                  {
                    icon: (
                      <Workflow className="h-6 w-6" />
                    ),
                    label: "Workflows",
                  },
                  {
                    icon: (
                      <Rocket className="h-6 w-6" />
                    ),
                    label: "Outcomes",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[20px] border border-white/10 bg-white/[0.07] p-4 text-center"
                  >
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-100">
                      {item.icon}
                    </span>

                    <p className="mt-3 text-[11px] text-white/75">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-[34px] border border-blue-100 bg-white p-6 shadow-[0_22px_60px_rgba(15,23,42,0.06)] sm:p-8">
            <SectionHeading
              eyebrow="Why Sikhadenge"
              title="Practical learning designed for real execution"
              description="A guided system focused on capability, confidence, useful output, and modern career relevance."
            />

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {outcomeCards.slice(0, 4).map((item) => (
                <article
                  key={item.title}
                  className="rounded-[22px] border border-blue-100 bg-[linear-gradient(150deg,#FFFFFF,#F5F7FF)] p-5 transition hover:-translate-y-1 hover:border-blue-300"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-[17px] border border-blue-100 bg-blue-50 text-blue-700 shadow-[0_9px_22px_rgba(37,99,235,0.11)]">
                    {item.icon}
                  </span>

                  <h3 className="mt-4 text-[17px] font-medium text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section
        data-courses-audience="responsive-future-chips-v3"
        className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
      >
        <div className="mx-auto max-w-7xl rounded-[32px] border border-blue-100 bg-white p-5 shadow-[0_20px_55px_rgba(15,23,42,0.055)] sm:p-8">
          <SectionHeading
            eyebrow="Who this is for"
            title="Designed for learners building modern digital capability"
            description="The program supports different starting points while keeping the learning journey practical and structured."
          />

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {audienceCards.map((item) => (
              <article
                key={item.title}
                className="flex min-h-[86px] items-center gap-3 rounded-[20px] border border-blue-100 bg-[linear-gradient(145deg,#FFFFFF,#F5F7FF)] p-3.5 transition hover:-translate-y-0.5 hover:border-blue-300"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  {item.icon}
                </span>

                <p className="text-[13px] font-medium text-slate-800 sm:text-[14px]">
                  {item.title}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="guided-learning"
        data-courses-learning-journey="responsive-future-timeline-v3"
        className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
      >
        <div className="mx-auto max-w-7xl rounded-[34px] border border-blue-100 bg-[linear-gradient(145deg,#F7FAFF,#F5F2FF)] p-5 shadow-[0_22px_60px_rgba(37,99,235,0.08)] sm:p-8">
          <SectionHeading
            eyebrow="Guided learning"
            title="Learn clearly. Build practically. Improve through feedback."
            description="A responsive learning journey that moves from concepts and demonstrations to projects, review, and real-world execution."
          />

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                step: "01",
                icon: <FileText className="h-6 w-6" />,
                title: "Learn concepts",
                description:
                  "Understand simple practical frameworks.",
              },
              {
                step: "02",
                icon: (
                  <MonitorPlay className="h-6 w-6" />
                ),
                title: "Watch demos",
                description:
                  "See workflows through real examples.",
              },
              {
                step: "03",
                icon: <Blocks className="h-6 w-6" />,
                title: "Build projects",
                description:
                  "Apply skills through hands-on output.",
              },
              {
                step: "04",
                icon: <Users className="h-6 w-6" />,
                title: "Get feedback",
                description:
                  "Improve through guidance and review.",
              },
              {
                step: "05",
                icon: <Rocket className="h-6 w-6" />,
                title: "Go live",
                description:
                  "Use your portfolio and practical skills.",
              },
            ].map((item) => (
              <article
                key={item.step}
                className="relative rounded-[24px] border border-blue-100 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[19px] bg-[linear-gradient(145deg,#2563EB,#6D5CE7)] text-white shadow-[0_13px_28px_rgba(37,99,235,0.24)]">
                    {item.icon}
                  </span>

                  <span className="text-[10px] font-semibold tracking-[0.18em] text-blue-500">
                    {item.step}
                  </span>
                </div>

                <h3 className="mt-5 text-[17px] font-medium text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-[13px] leading-6 text-slate-600">
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
