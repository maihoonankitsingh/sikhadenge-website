import type { Metadata } from "next";
import {
  Bot,
  BriefcaseBusiness,
  Clapperboard,
  FileText,
  Image as ImageIcon,
  LayoutTemplate,
  Lightbulb,
  Megaphone,
  PenTool,
  Search,
  Sparkles,
  Wand2,
  Workflow,
} from "lucide-react";

import SectionHeader from "@/app/components/brand/SectionHeader";
import LightFeatureCard from "@/app/components/brand/LightFeatureCard";
import DarkCapabilityCard from "@/app/components/brand/DarkCapabilityCard";
import FaqBlock, { type FaqItem } from "@/app/components/brand/FaqBlock";
import HubInternalLinks from "@/components/seo/HubInternalLinks";

export const metadata: Metadata = {
  title: "AI Tools for Modern Digital Work | Sikhadenge",
  description:
    "Explore practical AI tools for content, design, video, marketing, websites, and workflows, and understand how Sikhadenge connects these tools to real digital execution for students, freelancers, creators, and working professionals in India.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-tools",
  },
};

const whyCards = [
  {
    icon: <Sparkles className="h-9 w-9" />,
    title: "AI tools matter only when they improve execution",
    description:
      "The real value of AI tools is not novelty. Useful tools help people create faster, organize work better, and produce stronger digital output across real tasks.",
  },
  {
    icon: <Workflow className="h-9 w-9" />,
    title: "Modern work now depends on tool ecosystems",
    description:
      "Digital execution is no longer done through one software alone. Teams and individuals now work through connected tool stacks for content, visuals, videos, pages, and workflows.",
  },
  {
    icon: <Bot className="h-9 w-9" />,
    title: "The right tool depends on the actual task",
    description:
      "Different tools support different output layers such as writing, design support, image generation, editing, automation, planning, and communication systems.",
  },
  {
    icon: <BriefcaseBusiness className="h-9 w-9" />,
    title: "Useful tools are tied to practical business value",
    description:
      "The best AI tools are the ones that help with real output, clearer systems, faster delivery, and more useful execution in projects, freelancing, teams, or creator work.",
  },
];

const toolCards = [
  {
    icon: <FileText className="h-9 w-9" />,
    title: "Content and writing tools",
    description:
      "These tools support ideation, drafting, scripting, captions, outlines, communication, and structured content workflows across modern digital execution.",
  },
  {
    icon: <ImageIcon className="h-9 w-9" />,
    title: "Image and visual generation tools",
    description:
      "These tools help create concepts, visual assets, image variations, thumbnails, creative support, and design-oriented execution outputs.",
  },
  {
    icon: <Clapperboard className="h-9 w-9" />,
    title: "Video and media workflow tools",
    description:
      "These tools support reels, edits, production planning, AI-assisted video systems, media enhancement, and faster creator-side execution.",
  },
  {
    icon: <PenTool className="h-9 w-9" />,
    title: "Design support and creative workflow tools",
    description:
      "These tools help with layout support, design refinement, visual systems, branding support, and practical creative asset execution.",
  },
  {
    icon: <Megaphone className="h-9 w-9" />,
    title: "Marketing and campaign support tools",
    description:
      "These tools are useful for offer communication, audience messaging, campaign execution, asset coordination, and digital launch workflows.",
  },
  {
    icon: <LayoutTemplate className="h-9 w-9" />,
    title: "Page, website, and workflow tools",
    description:
      "These tools help with page structure, website support, planning systems, documentation, automation, and recurring task execution.",
  },
];

const categoryCards = [
  {
    icon: <Search className="h-10 w-10" />,
    title: "Discovery Tools",
    description:
      "Useful for research, planning, ideation, topic discovery, and getting faster clarity before starting execution.",
  },
  {
    icon: <FileText className="h-10 w-10" />,
    title: "Content Tools",
    description:
      "Useful for writing systems, outlines, scripts, captions, briefs, messaging, and content execution support.",
  },
  {
    icon: <ImageIcon className="h-10 w-10" />,
    title: "Visual Tools",
    description:
      "Useful for image ideas, thumbnails, graphics, creative exploration, and practical digital asset generation.",
  },
  {
    icon: <Clapperboard className="h-10 w-10" />,
    title: "Video Tools",
    description:
      "Useful for short-form workflows, video support, edit systems, media generation, and creator-side production speed.",
  },
  {
    icon: <Wand2 className="h-10 w-10" />,
    title: "Creative Workflow Tools",
    description:
      "Useful for design refinement, asset support, creative productivity, and structured output execution across formats.",
  },
  {
    icon: <Workflow className="h-10 w-10" />,
    title: "Automation Tools",
    description:
      "Useful for reducing repetitive work, connecting systems, improving documentation, and building cleaner recurring workflows.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "What are AI tools in simple terms?",
    answer:
      "AI tools are software systems that use AI to help with tasks such as writing, visuals, videos, research, planning, communication, workflow support, and digital execution.",
  },
  {
    question: "Which AI tools are most useful right now?",
    answer:
      "The most useful AI tools are usually the ones that support practical output across content, visuals, video, pages, and workflow systems rather than tools chosen only because they are trending.",
  },
  {
    question: "Should people learn tools or workflows first?",
    answer:
      "Workflows should come first. Tools are more valuable when people understand the actual execution task and then choose the right tool for that purpose.",
  },
  {
    question: "Are AI tools enough on their own?",
    answer:
      "No. Tools only become useful when they are part of a clear execution system. Output quality, structure, and workflow understanding matter more than simply knowing tool names.",
  },
  {
    question: "Do different users need different AI tools?",
    answer:
      "Yes. Students, freelancers, creators, teams, and businesses often need different tool stacks depending on whether their work is focused on content, visuals, videos, communication, or systems.",
  },
  {
    question: "What is the biggest mistake people make while choosing AI tools?",
    answer:
      "A common mistake is collecting too many tools without understanding where each one fits. The better approach is to choose tools based on actual work needs and execution outcomes.",
  },
];

const quickAnswers = [
  {
    label: "Best focus",
    value:
      "The best AI tools are the ones that improve real execution across content, visuals, video, pages, and workflows.",
  },
  {
    label: "Main goal",
    value:
      "The goal is to build a useful execution stack, not just collect random AI tools.",
  },
  {
    label: "Big advantage",
    value:
      "People who choose the right tools work faster, stay more organized, and create stronger digital output.",
  },
];

export default function AiToolsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#0B1220]">
      <section className="border-b border-[#E2E8F0] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center rounded-full border border-[#BFD3F2] bg-[#EFF6FF] px-4 py-2 text-[15px] font-semibold text-[#2563EB] shadow-[0_4px_14px_rgba(37,99,235,0.08)]">
              AI tools guide
            </div>

            <h1 className="mt-6 text-[40px] font-bold leading-[1.04] tracking-[-0.03em] text-[#0B1220] md:text-[68px]">
              Best AI tools for practical digital execution
            </h1>

            <p className="mt-6 max-w-4xl text-[19px] leading-[1.8] text-[#475569] md:text-[22px]">
              AI tools are useful when they improve real work. The strongest tool stacks support
              content, visuals, video, communication, pages, and workflows in a structured way.
              These are the tools that help people move faster and build stronger digital output.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/gen-ai-masterclass"
                className="inline-flex items-center rounded-full bg-[#2563EB] px-7 py-3.5 text-[16px] font-semibold text-white shadow-[0_14px_34px_rgba(37,99,235,0.28)] transition hover:bg-[#1D4ED8]"
              >
                Join free masterclass
              </a>

              <a
                href="/best-ai-skills-to-learn"
                className="inline-flex items-center rounded-full border border-[#C7D7EF] bg-white px-7 py-3.5 text-[16px] font-semibold text-[#0B1220] shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                Explore AI skills
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {quickAnswers.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-[#D7E3F4] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                >
                  <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#2563EB]">
                    {item.label}
                  </div>
                  <p className="mt-3 text-[16px] leading-[1.8] text-[#475569]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <SectionHeader
          pill="Why this matters"
          title="Why choosing the right AI tools matters"
          description="The right AI tools improve execution quality, output speed, and workflow clarity across practical digital work."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {whyCards.map((item) => (
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
          pill="Tool coverage"
          title="Which AI tool categories are the most useful"
          description="The most useful AI tools usually support real output across writing, visuals, videos, marketing, pages, and workflow systems."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {toolCards.map((item) => (
            <LightFeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <SectionHeader
          pill="Tool categories"
          title="How AI tools usually fit into modern work"
          description="Different categories of AI tools solve different layers of execution, and strong digital systems usually combine multiple tool types."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categoryCards.map((item) => (
            <DarkCapabilityCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="rounded-[36px] border border-[#D7E3F4] bg-white p-8 shadow-[0_18px_42px_rgba(15,23,42,0.06)] md:p-12">
          <SectionHeader
            pill="Related learning paths"
            title="Explore connected AI pages"
            description="These pages help connect AI tools with broader learning paths, role-based skill guides, and the AI Expert model."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              { href: "/ai-generalist", label: "AI Expert" },
              { href: "/ai-skills", label: "AI Skills" },
              { href: "/ai-skills-for-students", label: "AI Skills for Students" },
              { href: "/ai-skills-for-freelancers", label: "AI Skills for Freelancers" },
              { href: "/ai-skills-for-creators", label: "AI Skills for Creators" },
              { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
              { href: "/ai-content-workflows", label: "Create Content with Automate Work with AI" },
              { href: "/ai-design-workflows", label: "Design with Automate Work with AI" },
              { href: "/ai-video-production-workflows", label: "Edit Videos with AI Production Workflows" },
              { href: "/ai-marketing-workflows", label: "Market with Automate Work with AI" },
              { href: "/ai-tools-for-content-creation", label: "AI Tools for Content Creation" },
              { href: "/ai-tools-for-designers", label: "AI Tools for Designers" },
              { href: "/ai-tools-for-video-editing", label: "AI Tools for Video Editing" },
              { href: "/ai-tools-roadmap", label: "AI Tools Roadmap" },
              { href: "/how-to-learn-ai-tools", label: "How to Learn AI Tools" },
              { href: "/ai-tools-salary-in-india", label: "AI Tools Salary in India" },
              { href: "/ai-tools-projects-for-beginners", label: "AI Tools Projects for Beginners" },
              { href: "/ai-tools-without-coding", label: "AI Tools Without Coding" },
              { href: "/site-map", label: "HTML Sitemap" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-[22px] border border-[#D7E3F4] bg-[#F8FBFF] px-5 py-4 text-[16px] font-semibold text-[#0B1220] shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 pb-20 md:px-6 md:pb-24">
        <FaqBlock
          pill="FAQs"
          title="Frequently asked questions"
          description="Clear answers to common questions people usually have before choosing which AI tools to use."
          items={faqItems}
        />
      </section>
    
      <section className="border-t border-slate-100 bg-[#07152E] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(15,23,42,0.9))] p-8 shadow-[0_24px_80px_rgba(2,6,23,0.45)] sm:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-200 sm:text-sm">
              Final Next Step
            </div>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Start practical AI tools learning with Sikhadenge
            </h2>
            <p className="mb-8 text-sm leading-7 text-slate-300 sm:text-base">
              Learn which AI tools matter, how they fit into real workflows, and how to use them for practical digital execution.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 sm:text-base"
              >
                Join Free AI Masterclass
              </a>
              <a
                href="/courses"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:text-base"
              >
                Explore Courses
              </a>
            </div>
          </div>
        </div>
      </section>

</main>
  );
}
