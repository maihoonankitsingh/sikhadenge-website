import Link from "next/link";

type HubKey =
  | "ai-expert"
  | "ai-skills"
  | "ai-tools"
  | "ai-content-workflows"
  | "site-map";

type LinkItem = {
  href: string;
  title: string;
  desc: string;
};

const HUB_LINKS: Record<
  HubKey,
  { heading: string; intro: string; items: LinkItem[] }
> = {
  "ai-expert": {
    heading: "Explore AI career paths, tools, and beginner-friendly guides",
    intro:
      "Use these connected pages to understand AI skills, job roles, tools, and practical learning paths.",
    items: [
      { href: "/ai-skills", title: "AI Skills", desc: "Core AI skills, practical abilities, and learning paths." },
      { href: "/ai-tools", title: "AI Tools", desc: "Popular AI tools across design, writing, work, and automation." },
      { href: "/ai-career-paths", title: "AI Career Paths", desc: "Career options, role types, and direction in AI." },
      { href: "/ai-jobs-without-coding", title: "AI Jobs Without Coding", desc: "AI opportunities for non-technical learners." },
      { href: "/ai-skills-for-students", title: "AI Skills for Students", desc: "Student-focused AI skills for the current market." },
      { href: "/ai-skills-for-freelancers", title: "AI Skills for Freelancers", desc: "Freelance-friendly AI skills and service ideas." },
      { href: "/ai-content-workflows", title: "Create Content with Automate Work with AI", desc: "How AI workflows are used in content and creative work." },
      { href: "/site-map", title: "Full Site Map", desc: "Browse all important SEO and learning pages." }
    ]
  },

  "ai-skills": {
    heading: "Learn practical AI skills through connected topic pages",
    intro:
      "These pages break AI skills into career use cases, learner types, and income-focused directions.",
    items: [
      { href: "/ai-generalist", title: "AI Expert", desc: "Broad overview of what an AI expert learns and does." },
      { href: "/ai-skills-for-students", title: "AI Skills for Students", desc: "Skills students can start learning immediately." },
      { href: "/ai-skills-for-freelancers", title: "AI Skills for Freelancers", desc: "Client-facing skills for freelance execution." },
      { href: "/ai-career-paths", title: "AI Career Paths", desc: "How AI skills connect to job roles and careers." },
      { href: "/ai-jobs-without-coding", title: "AI Jobs Without Coding", desc: "Role options where coding is not required." },
      { href: "/ai-tools", title: "AI Tools", desc: "Tool ecosystem needed to apply AI skills in real work." },
      { href: "/ai-content-workflows", title: "Create Content with Automate Work with AI", desc: "Skill application inside execution workflows." },
      { href: "/site-map", title: "Full Site Map", desc: "See all connected learning and SEO pages." }
    ]
  },

  "ai-tools": {
    heading: "Browse AI tools by use case, learner type, and job application",
    intro:
      "These pages connect tool discovery with workflows, jobs, and practical AI execution.",
    items: [
      { href: "/ai-generalist", title: "AI Expert", desc: "Understand where tools fit in a broader AI skill stack." },
      { href: "/ai-skills", title: "AI Skills", desc: "Tool use only matters when mapped to real skills." },
      { href: "/ai-tools-for-designers", title: "AI Tools for Designers", desc: "Design-focused AI tools for creative workflows." },
      { href: "/ai-content-workflows", title: "Create Content with Automate Work with AI", desc: "How tools are used inside production systems." },
      { href: "/ai-career-paths", title: "AI Career Paths", desc: "Which tools matter for which AI roles." },
      { href: "/ai-jobs-without-coding", title: "AI Jobs Without Coding", desc: "Tool-first work opportunities without coding." },
      { href: "/site-map", title: "Full Site Map", desc: "Browse all major AI pages." }
    ]
  },

  "ai-content-workflows": {
    heading: "See how AI workflows connect tools, skills, and outcomes",
    intro:
      "These pages help users move from isolated tools to actual AI-powered execution systems.",
    items: [
      { href: "/ai-generalist", title: "AI Expert", desc: "Broader understanding of AI-led work and execution." },
      { href: "/ai-skills", title: "AI Skills", desc: "Workflows are built on repeatable practical skills." },
      { href: "/ai-tools", title: "AI Tools", desc: "Workflow execution depends on the right tool stack." },
      { href: "/ai-career-paths", title: "AI Career Paths", desc: "Workflow capability maps to specific role types." },
      { href: "/ai-skills-for-freelancers", title: "AI Skills for Freelancers", desc: "Workflow thinking is critical for freelance delivery." },
      { href: "/ai-tools-for-designers", title: "AI Tools for Designers", desc: "Creative workflow tools for visual execution." },
      { href: "/site-map", title: "Full Site Map", desc: "Browse all important content and workflow pages." }
    ]
  },

  "site-map": {
    heading: "Important AI topic pages across this website",
    intro:
      "Use this directory to navigate the most useful pages covering AI skills, tools, jobs, workflows, and guides.",
    items: [
      { href: "/ai-generalist", title: "AI Expert", desc: "Overview page for general AI learning and application." },
      { href: "/ai-skills", title: "AI Skills", desc: "Skill-focused hub page." },
      { href: "/ai-tools", title: "AI Tools", desc: "Tool-focused hub page." },
      { href: "/ai-content-workflows", title: "Create Content with Automate Work with AI", desc: "Workflow-focused hub page." },
      { href: "/ai-career-paths", title: "AI Career Paths", desc: "Career navigation inside AI." },
      { href: "/ai-skills-for-students", title: "AI Skills for Students", desc: "Student-specific learning path." },
      { href: "/ai-skills-for-freelancers", title: "AI Skills for Freelancers", desc: "Freelancer-specific AI path." },
      { href: "/ai-tools-for-designers", title: "AI Tools for Designers", desc: "Design-focused AI tools." }
    ]
  }
};

export default function HubInternalLinks({ hub }: { hub: HubKey }) {
  const data = HUB_LINKS[hub];

  return (
    <section className="border-t border-white/10 bg-[#0B1220]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border border-[#2563EB]/40 bg-[#2563EB]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[#93C5FD]">
            Related AI Pages
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {data.heading}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#B0B7C3] md:text-base">
            {data.intro}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-white/10 bg-[#111827] p-5 transition hover:border-[#2563EB]/50 hover:bg-[#0f172a]"
            >
              <div className="text-lg font-semibold text-white group-hover:text-[#93C5FD]">
                {item.title}
              </div>
              <p className="mt-2 text-sm leading-6 text-[#B0B7C3]">
                {item.desc}
              </p>
              <div className="mt-4 text-sm font-medium text-[#F5B301]">
                Read more →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
