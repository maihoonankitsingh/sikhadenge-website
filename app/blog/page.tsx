import type { Metadata } from "next";
import {
  Blocks,
  Bot,
  BriefcaseBusiness,
  Clapperboard,
  FileText,
  Globe,
  LayoutTemplate,
  Lightbulb,
  Megaphone,
  PenTool,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";

import SectionHeader from "@/app/components/brand/SectionHeader";
import LightFeatureCard from "@/app/components/brand/LightFeatureCard";
import DarkCapabilityCard from "@/app/components/brand/DarkCapabilityCard";
import FaqBlock, { type FaqItem } from "@/app/components/brand/FaqBlock";

export const metadata: Metadata = {
  title: "AI Blog, Guides and Learning Resources | Sikhadenge",
  description:
    "Explore AI blog articles, practical guides and learning resources across AI skills, tools, content, design, video, digital execution and workflow systems.",
  alternates: {
    canonical: "https://sikhadenge.in/blog",
  },
};

const whyCards = [
  {
    icon: <Search className="h-9 w-9" />,
    title: "Learn through practical topic clusters",
    description:
      "The blog is structured to help readers understand how AI connects with real digital execution across content, visuals, videos, pages, communication, and workflows.",
  },
  {
    icon: <Sparkles className="h-9 w-9" />,
    title: "Useful guides matter more than random articles",
    description:
      "The strongest learning resources are the ones that improve clarity, decision-making, output quality, and practical understanding instead of just listing tools.",
  },
  {
    icon: <Blocks className="h-9 w-9" />,
    title: "Connected content builds stronger understanding",
    description:
      "Readers learn faster when articles are linked across related themes such as AI skills, AI tools, creator workflows, freelancer execution, and digital systems.",
  },
  {
    icon: <BriefcaseBusiness className="h-9 w-9" />,
    title: "Business relevance comes from execution context",
    description:
      "The blog is designed to support people who want AI knowledge that is useful for actual work, projects, teams, freelancing, and digital growth.",
  },
];

const categoryCards = [
  {
    icon: <Bot className="h-9 w-9" />,
    title: "AI career and role guides",
    description:
      "Articles that explain modern AI-linked roles, career paths, execution relevance, and how broader digital capability is changing practical opportunities.",
  },
  {
    icon: <PenTool className="h-9 w-9" />,
    title: "AI design and visual execution",
    description:
      "Guides on visuals, brand assets, design support, thumbnails, creative production, and how AI fits into modern visual workflows.",
  },
  {
    icon: <FileText className="h-9 w-9" />,
    title: "AI content and communication systems",
    description:
      "Articles focused on writing support, scripting, captions, audience messaging, copy structure, and practical content workflows.",
  },
  {
    icon: <Clapperboard className="h-9 w-9" />,
    title: "AI video workflow guides",
    description:
      "Resources that cover reels, edits, short-form systems, production support, creator execution, and AI-assisted video workflows.",
  },
  {
    icon: <Megaphone className="h-9 w-9" />,
    title: "AI tools and execution guides",
    description:
      "Practical tool-focused content that explains where tools fit, how to use them intelligently, and which kinds of output they support best.",
  },
  {
    icon: <Workflow className="h-9 w-9" />,
    title: "Workflow and digital systems thinking",
    description:
      "Articles that connect AI with productivity, documentation, repeatable systems, page execution, and practical digital organization.",
  },
];

const clusterCards = [
  {
    icon: <Bot className="h-10 w-10" />,
    title: "AI Career Cluster",
    description:
      "For readers exploring AI Expert roles, freelancer skill paths, digital career relevance, and the changing nature of modern work.",
  },
  {
    icon: <PenTool className="h-10 w-10" />,
    title: "Design with AI Cluster",
    description:
      "For readers interested in creative assets, visual systems, layouts, AI-supported design execution, and brand-oriented digital work.",
  },
  {
    icon: <FileText className="h-10 w-10" />,
    title: "Create Content with AI Cluster",
    description:
      "For readers focused on scripts, copy, communication, audience messaging, structured content planning, and publishing systems.",
  },
  {
    icon: <Clapperboard className="h-10 w-10" />,
    title: "Edit Videos with AI Cluster",
    description:
      "For readers learning short-form execution, editing support, reels workflows, production systems, and creator-side video improvement.",
  },
  {
    icon: <Lightbulb className="h-10 w-10" />,
    title: "AI Tools Cluster",
    description:
      "For readers trying to understand which tools matter, where they fit, and how to choose practical stacks for real output.",
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Digital Execution Cluster",
    description:
      "For readers connecting AI with pages, campaigns, content systems, workflow clarity, and broader practical execution.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "What is covered in the Sikhadenge blog?",
    answer:
      "The blog covers AI skills, AI tools, content systems, design workflows, video execution, career guides, and practical digital execution topics connected to modern work.",
  },
  {
    question: "Is this blog only for beginners?",
    answer:
      "No. The blog is useful for beginners, students, freelancers, creators, and working professionals who want clearer understanding of how AI fits into practical digital execution.",
  },
  {
    question: "Are the articles focused on theory or real application?",
    answer:
      "The content is designed to stay practical. The focus is on execution relevance, useful systems, and real output rather than only abstract theory.",
  },
  {
    question: "How should someone use these blog resources properly?",
    answer:
      "The best approach is to read connected topic clusters instead of isolated posts. That helps build stronger understanding across skills, tools, workflows, and practical use-cases.",
  },
  {
    question: "Does the blog connect with the broader Sikhadenge learning path?",
    answer:
      "Yes. The blog supports deeper learning across AI Expert thinking, AI skills, AI tools, and broader digital execution capability.",
  },
  {
    question: "Why does a structured blog matter for SEO and learning?",
    answer:
      "A structured blog helps both readers and search engines understand the site’s authority across connected topics. That improves clarity, discoverability, and topical strength.",
  },
];

const quickAnswers = [
  {
    label: "Best use",
    value:
      "Use the blog to learn practical AI skills, tool categories, role guides, and execution systems through connected topic clusters.",
  },
  {
    label: "Main goal",
    value:
      "The goal is to build clearer understanding of how AI fits into real digital work, not just collect random information.",
  },
  {
    label: "Big advantage",
    value:
      "Readers get structured learning across skills, tools, workflows, and execution topics that support modern digital capability.",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#0B1220]">
      <section className="border-b border-[#E2E8F0] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center rounded-full border border-[#BFD3F2] bg-[#EFF6FF] px-4 py-2 text-[15px] font-semibold text-[#2563EB] shadow-[0_4px_14px_rgba(37,99,235,0.08)]">
              AI blog hub
            </div>

            <h1 className="mt-6 text-[40px] font-bold leading-[1.04] tracking-[-0.03em] text-[#0B1220] md:text-[68px]">
              AI blog, guides and practical learning resources
            </h1>

            <p className="mt-6 max-w-4xl text-[19px] leading-[1.8] text-[#475569] md:text-[22px]">
              Explore practical blog resources across AI skills, tools, content, design, video,
              workflows, and digital execution. The goal is to help readers build useful understanding
              through connected topic clusters instead of scattered information.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/ai-generalist"
                className="inline-flex items-center rounded-full bg-[#2563EB] px-7 py-3.5 text-[16px] font-semibold text-white shadow-[0_14px_34px_rgba(37,99,235,0.28)] transition hover:bg-[#1D4ED8]"
              >
                Explore AI Expert
              </a>

              <a
                href="/ai-tools"
                className="inline-flex items-center rounded-full border border-[#C7D7EF] bg-white px-7 py-3.5 text-[16px] font-semibold text-[#0B1220] shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                Explore AI Tools
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
          title="Why a structured AI blog matters"
          description="A strong AI blog helps readers learn faster and helps search engines understand topic depth, content quality, and authority across connected subject areas."
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
          pill="Content categories"
          title="What kinds of guides are covered here"
          description="The blog is organized around practical categories that connect AI with real digital execution and modern work."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categoryCards.map((item) => (
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
          pill="Topic clusters"
          title="How the blog builds topical authority"
          description="The strongest authority comes from connected topic clusters that reinforce each other across roles, tools, skills, and execution systems."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {clusterCards.map((item) => (
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
            description="These pages connect the blog with broader Sikhadenge learning paths across AI skills, tools, and practical execution."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { href: "/ai-generalist", label: "AI Expert" },
              { href: "/ai-skills", label: "AI Skills" },
              { href: "/ai-tools", label: "AI Tools Hub" },
              { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
              { href: "/ai-content-workflows", label: "Create Content with Automate Work with AI" },
              { href: "/ai-design-workflows", label: "Design with Automate Work with AI" },
              { href: "/ai-video-production-workflows", label: "Edit Videos with Automate Work with AI" },
              { href: "/ai-marketing-workflows", label: "Market with Automate Work with AI" },
              { href: "/ai-skills-for-students", label: "AI Skills for Students" },
              { href: "/ai-skills-for-freelancers", label: "AI Skills for Freelancers" },
              { href: "/ai-skills-for-creators", label: "AI Skills for Creators" },
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
          description="Clear answers to common questions readers usually have about the Sikhadenge blog and how to use it properly."
          items={faqItems}
        />
      </section>
    
<section className="border-t border-white/10 bg-[#0B1220]">
  <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">

    <h2 className="text-2xl md:text-3xl font-bold text-white">
      Practical Understanding and Real Use Cases
    </h2>

    <p className="mt-4 text-[#B0B7C3] leading-7">
      This topic is not only theoretical. It is actively used in real digital workflows including content creation, freelance delivery, marketing execution, and online earning systems. Understanding how it works in real scenarios is important for building practical skills.
    </p>

    <h3 className="mt-8 text-xl font-semibold text-white">
      Real Use Cases
    </h3>

    <ul className="mt-4 space-y-3 text-[#B0B7C3]">
      <li>• Freelancing services using AI tools</li>
      <li>• Content creation and social media growth</li>
      <li>• Video editing and short-form content production</li>
      <li>• Digital marketing and lead generation</li>
      <li>• Online earning and skill-based income</li>
    </ul>

    <h3 className="mt-8 text-xl font-semibold text-white">
      Tools Commonly Used
    </h3>

    <p className="mt-4 text-[#B0B7C3] leading-7">
      People working in this area commonly use AI tools for writing, design, automation, and content production. The real advantage comes when these tools are used together inside a structured workflow instead of individually.
    </p>

    <h3 className="mt-8 text-xl font-semibold text-white">
      Why This Skill Matters
    </h3>

    <p className="mt-4 text-[#B0B7C3] leading-7">
      This skill is becoming important because modern work is shifting toward faster execution, higher productivity, and multi-skill capability. AI enables individuals to work smarter and handle multiple types of tasks efficiently.
    </p>

  </div>
</section>

</main>
  );
}
