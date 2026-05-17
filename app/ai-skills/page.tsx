import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Brush,
  Clapperboard,
  FileText,
  Globe,
  GraduationCap,
  Megaphone,
  Sparkles,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";
import HubInternalLinks from "@/components/seo/HubInternalLinks";

export const metadata: Metadata = {
  title: "AI Skills for Modern Digital Work",
  description:
    "Learn practical AI skills for content, design, video, marketing, websites, tools, workflows, and automation in one clear roadmap.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills",
  },
  openGraph: {
    title: "AI Skills for Modern Digital Work | Sikhadenge",
    description:
      "A practical guide to the most important AI skills across content, design, video, marketing, websites, tools, workflows, and automation for modern digital work in India.",
    url: "https://sikhadenge.in/ai-skills",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills to Learn | Sikhadenge",
    description:
      "A practical guide to the most important AI skills across content, design, video, marketing, pages, tools, and workflows.",
  },
};

const quickInfo = [
  {
    title: "Practical focus",
    desc: "The best AI skills are the ones that improve real digital execution, not just tool familiarity.",
  },
  {
    title: "Cross-functional value",
    desc: "Modern learners benefit when AI supports content, visuals, video, pages, communication, and workflows together.",
  },
  {
    title: "Career relevance",
    desc: "AI skills matter for students, freelancers, creators, operators, and small teams working in digital environments.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Digital work is changing",
    desc: "AI is reshaping how modern digital work gets planned, created, edited, and delivered across multiple functions.",
  },
  {
    icon: Workflow,
    title: "Execution speed now matters",
    desc: "Learners who can use AI inside structured workflows can move faster while improving clarity and output quality.",
  },
  {
    icon: Briefcase,
    title: "Broader capability is valuable",
    desc: "The market increasingly rewards practical execution ability across multiple digital areas rather than isolated tool usage.",
  },
  {
    icon: Bot,
    title: "Tools need systems",
    desc: "Knowing AI tool names is not enough. Real value comes from using them inside repeatable work systems and outcomes.",
  },
];

const skillCategories = [
  {
    icon: FileText,
    title: "Create Content with AI Skills",
    desc: "Hooks, scripts, captions, briefs, post ideas, writing support, structured content systems, and publishing workflows.",
  },
  {
    icon: Brush,
    title: "Design with AI Skills",
    desc: "Creative concepts, thumbnails, posters, ad creatives, social visuals, brand support, and faster asset refinement.",
  },
  {
    icon: Clapperboard,
    title: "Edit Videos with AI Skills",
    desc: "Short-form planning, reel ideas, edit support, explainer structure, shot guidance, and visual storytelling workflows.",
  },
  {
    icon: Megaphone,
    title: "Market with AI Skills",
    desc: "Campaign messaging, offer framing, ad support, creative strategy, funnel asset support, and digital growth execution.",
  },
  {
    icon: Globe,
    title: "AI Website Skills",
    desc: "Landing page structure, section planning, conversion-focused copy support, and AI-assisted page execution thinking.",
  },
  {
    icon: Wrench,
    title: "AI Tools Skills",
    desc: "Understanding which AI tools fit which use case and how they can be combined into structured output systems.",
  },
  {
    icon: Workflow,
    title: "AI Workflow Skills",
    desc: "Prompt systems, repeatable processes, productivity improvement, task support, and better execution flow design.",
  },
  {
    icon: Bot,
    title: "AI Automation Skills",
    desc: "Basic automations, repetitive task reduction, connected systems, and operational support using AI-first logic.",
  },
];

const audiences = [
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Students need AI skills to become more relevant for modern internships, jobs, and digital project work.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers can improve delivery scope, execution speed, and client value with practical AI capability.",
  },
  {
    icon: Users,
    title: "Creators",
    desc: "Creators benefit when AI supports ideation, content systems, visuals, videos, and publishing workflows.",
  },
  {
    icon: Workflow,
    title: "Digital Operators",
    desc: "Operators and execution-focused learners can use AI to improve marketing, pages, assets, and recurring tasks.",
  },
];

const relatedPaths = [
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand the broader role that connects AI skills across multiple digital execution areas.",
  },
  {
    href: "/ai-skills-for-students",
    title: "AI Skills for Students",
    desc: "See which AI skills matter most for students who want practical capability and stronger career relevance.",
  },
  {
    href: "/ai-skills-for-freelancers",
    title: "AI Skills for Freelancers",
    desc: "Explore the AI skills that help freelancers deliver better client work and broader services.",
  },
  {
    href: "/ai-skills-for-creators",
    title: "AI Skills for Creators",
    desc: "Review the skill mix creators need for content systems, visuals, videos, and output speed.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Go deeper into the AI skill categories that matter most for current and future digital work.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "Explore the tools ecosystem behind practical AI-first digital capability and modern execution workflows.",
  },
  {
    href: "/ai-skills-roadmap",
    title: "AI Skills Roadmap",
    desc: "Follow a structured roadmap to learn AI skills step by step with better clarity and practical direction.",
  },
  {
    href: "/ai-skills-jobs",
    title: "AI Skills Jobs",
    desc: "See how practical AI skills connect with real job roles, work opportunities, and execution-focused careers.",
  },
  {
    href: "/ai-skills-career",
    title: "AI Skills Career",
    desc: "Understand how AI skills support long-term career growth, relevance, and stronger digital positioning.",
  },
  {
    href: "/ai-skills-salary-in-india",
    title: "AI Skills Salary in India",
    desc: "Explore how useful AI skills relate to salary potential and market value in India.",
  },
  {
    href: "/ai-skills-without-coding",
    title: "AI Skills Without Coding",
    desc: "Learn which AI skills beginners and non-technical learners can build without coding.",
  },
];

const faqs = [
  {
    q: "What are AI skills?",
    a: "AI skills are the practical abilities required to use AI in real work. These include content support, creative execution, video workflows, marketing support, page building, tool usage, workflow design, and automation thinking.",
  },
  {
    q: "Which AI skills are most useful today?",
    a: "The most useful AI skills today are the ones connected to real digital execution. These usually include AI content, AI design, AI video, AI marketing, AI website support, AI tools understanding, workflow design, and automation support.",
  },
  {
    q: "Are AI skills only about learning tools?",
    a: "No. AI skills are not limited to knowing tool names. Real value comes from applying AI inside work systems, output creation, planning, iteration, and repeatable execution processes.",
  },
  {
    q: "Who should learn AI skills?",
    a: "Students, freelancers, creators, digital operators, career switchers, and serious beginners can all benefit from practical AI skills because digital work is increasingly AI-assisted.",
  },
  {
    q: "Can beginners start learning AI skills?",
    a: "Yes. Beginners can start learning AI skills if the learning path is structured around practical use cases and not just scattered tool tutorials.",
  },
  {
    q: "Do AI skills help in freelance and job work?",
    a: "Yes. AI skills can improve speed, output quality, task handling, idea generation, project support, and broader execution capability in both freelance and job-related work.",
  },
  {
    q: "What is the difference between AI tools and AI skills?",
    a: "AI tools are the platforms or software. AI skills are the practical abilities to use those tools effectively inside real workflows and useful output systems.",
  },
  {
    q: "Where should I start if I want to learn AI skills properly?",
    a: "A structured learning path is the best starting point. You can begin with the Sikhadenge masterclass, understand the broader AI Expert model, and then move into connected skill categories.",
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

export default function AiSkillsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills to learn for modern digital work
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI skills are no longer limited to one isolated task. Modern learners now need practical capability
              across content, design, video, marketing, websites, tools, workflows, and automation support. The
              most useful AI skills are the ones that improve execution quality, reduce manual effort, and help
              people create visible output with more clarity and speed.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore Courses
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
            title="Why AI skills matter now"
            desc="AI is changing how digital work gets planned, produced, reviewed, and delivered. The strongest learners are the ones who build practical AI capability across connected execution areas instead of staying limited to scattered tool use."
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
            pill="Capability coverage"
            title="Main AI skill categories"
            desc="The best AI skill system is not based on only one tool or one output type. It works best when multiple capability areas support each other inside a structured digital workflow."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {skillCategories.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[34px] border border-[#0E3A83] bg-[linear-gradient(180deg,#022A67_0%,#011B46_100%)] p-7 shadow-[0_18px_38px_rgba(1,27,70,0.22)]"
                >
                  <div className="flex h-[86px] w-[86px] items-center justify-center rounded-[26px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.07)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <Icon className="h-7 w-7 text-white" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-8 text-[20px] font-semibold leading-[1.35] text-white">{item.title}</h3>
                  <p className="mt-4 text-[16px] leading-[1.8] text-[#C9D7F0]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Who benefits"
            title="Who should learn AI skills"
            desc="AI skills are useful for anyone working toward modern digital capability, stronger output, and better execution flexibility."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {audiences.map((item) => {
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
            desc="These linked pages help build the wider Sikhadenge authority cluster around AI skills, AI Expert learning, role-based use cases, and practical execution systems."
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
            pill="Explore more AI pages"
            title="Discover more pages inside the Sikhadenge AI skills cluster"
            desc="These internal links help learners move from general AI skills into role-based pages, tools, workflows, and broader AI-first digital capability paths."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { href: "/ai-generalist", label: "What Is an AI Expert" },
              { href: "/ai-tools", label: "AI Tools" },
              { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
              { href: "/ai-skills-for-students", label: "AI Skills for Students" },
              { href: "/ai-skills-for-freelancers", label: "AI Skills for Freelancers" },
              { href: "/ai-skills-for-creators", label: "AI Skills for Creators" },
              { href: "/ai-skills-for-designers", label: "AI Skills for Designers" },
              { href: "/ai-skills-for-video-editors", label: "AI Skills for Video Editors" },
              { href: "/ai-skills-for-digital-marketers", label: "AI Skills for Digital Marketers" },
              { href: "/ai-content-workflows", label: "Create Content with Automate Work with AI" },
              { href: "/ai-design-workflows", label: "Design with Automate Work with AI" },
              { href: "/ai-marketing-workflows", label: "Market with Automate Work with AI" },
              { href: "/ai-automation-workflows", label: "AI Automation Workflows" },
              { href: "/site-map", label: "HTML Sitemap" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-[24px] border border-[#D8E5F4] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#BFD4F3] hover:bg-[#FBFDFF]"
              >
                <span className="text-[16px] font-semibold text-[#071533]">{item.label}</span>
                <ArrowRight className="h-4 w-4 text-[#2563EB] transition group-hover:translate-x-0.5" />
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
            desc="These are the common questions people ask before learning AI skills for practical digital work, career growth, and modern execution."
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

      <section className="border-t border-slate-100 bg-[#07152E] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(15,23,42,0.9))] p-8 shadow-[0_24px_80px_rgba(2,6,23,0.45)] sm:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-200 sm:text-sm">
              Final Next Step
            </div>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Start practical AI learning with Sikhadenge
            </h2>
            <p className="mb-8 text-sm leading-7 text-slate-300 sm:text-base">
              Build real execution capability through structured learning, practical workflows, guided support, and connected AI skill paths.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/gen-ai-masterclass" className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 sm:text-base">
                Join Free AI Masterclass
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/courses" className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:text-base">
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

</main>
  );
}
