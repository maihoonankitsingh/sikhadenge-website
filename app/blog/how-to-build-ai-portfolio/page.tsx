import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, FolderOpen, Lightbulb, Sparkles, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Build an AI Portfolio in 2026 | Sikhadenge",
  description:
    "Learn how to build an AI portfolio in 2026. Discover what projects to include, how beginners should structure portfolio samples, and how AI skills can be shown through real digital work.",
  alternates: {
    canonical: "https://sikhadenge.in/blog/how-to-build-ai-portfolio",
  },
};

const portfolioIdeas = [
  "AI-assisted content projects such as captions, scripts, blog drafts, and content plans",
  "AI design samples such as thumbnails, social media creatives, and visual concept boards",
  "AI video workflow examples such as reels planning, hooks, short edits, and repurposed content",
  "AI productivity or workflow samples such as content calendars, research systems, and process docs",
  "Client-style mock projects showing before-after improvement using AI-assisted workflows",
  "Role-based samples for freelancer, creator, student, or beginner AI Expert directions",
];

const steps = [
  "Choose one role direction or skill cluster",
  "Create 3 to 5 sample projects with clear output",
  "Show process, tool usage, and final result",
  "Organize samples into simple categories",
  "Keep improving the portfolio with better work",
];

const mistakes = [
  "Adding random samples without one clear direction",
  "Listing tools without showing actual output",
  "Uploading unfinished work without refinement",
  "Ignoring explanation of process and outcome",
];

const relatedLinks = [
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-skills", label: "AI Skills" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/ai-jobs-for-beginners", label: "AI Jobs for Beginners" },
  { href: "/how-to-start-ai-career", label: "How to Start AI Career" },
  { href: "/ai-skills-for-job-seekers", label: "AI Skills for Job Seekers" },
  { href: "/site-map", label: "HTML Sitemap" },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#245EEA] shadow-[0_4px_16px_rgba(37,99,235,0.08)]">
      {children}
    </div>
  );
}

function SectionTitle({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#071533] md:text-[36px]">
        {title}
      </h2>
      {desc ? (
        <p className="mt-4 text-[17px] leading-[1.8] text-[#47607F]">{desc}</p>
      ) : null}
    </div>
  );
}

export default function Page() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Portfolio Guide</Pill>

          <div className="mt-8 max-w-4xl">
            <h1 className="text-[38px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[58px]">
              How to Build an AI Portfolio in 2026
            </h1>

            <p className="mt-6 max-w-3xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              A strong AI portfolio is not a list of tools. It is proof that you can use AI to create real output.
              Whether you want freelance work, a job, or client projects, your portfolio should show what you can
              produce using AI-assisted workflows across content, design, video, and digital execution.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-skills"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-sm font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: FolderOpen,
                title: "Proof of work",
                desc: "A portfolio proves what you can actually create, not just what tools you know.",
              },
              {
                icon: Workflow,
                title: "Process matters",
                desc: "Strong portfolios show workflow thinking, not only final screenshots or raw outputs.",
              },
              {
                icon: Briefcase,
                title: "Career value",
                desc: "Clients and employers trust visible work samples more than generic claims.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-[#D8E5F4] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[18px] border border-[#CFE0F6] bg-[#EAF2FE]">
                    <Icon className="h-6 w-6 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-5 text-[20px] font-semibold text-[#071533]">{item.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.8] text-[#47607F]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="What an AI portfolio should actually show"
            desc="Your portfolio should show practical ability. It should answer one simple question: what can you create using AI-assisted workflows?"
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            A strong portfolio shows real outputs, clear thinking, and visible process. Instead of saying you know
            ChatGPT, Canva, or CapCut, show how you used them to create a content system, design sample, short-form
            video workflow, or client-style deliverable.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Best project types to include"
            desc="Choose sample projects that match real market demand and your role direction."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {portfolioIdeas.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-[#FBFDFF] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#2563EB]" />
                  <p className="text-[16px] leading-[1.8] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="How beginners should structure their portfolio"
            desc="Keep the structure simple, clear, and role-focused."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {steps.map((step, i) => (
              <div
                key={step}
                className="rounded-[24px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="text-sm font-semibold text-[#2563EB]">Step {i + 1}</div>
                <p className="mt-3 text-[16px] leading-[1.75] text-[#071533]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="What each portfolio sample should contain"
            desc="Each sample should be easy to understand and easy to evaluate."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            A good sample should include the project goal, tools used, workflow summary, final output, and what result
            or improvement it creates. This makes the portfolio more credible and more useful for both clients and hiring teams.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Mistakes to avoid"
            desc="These mistakes make portfolios weak even when the person has potential."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {mistakes.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-[#2563EB]" />
                  <p className="text-[16px] leading-[1.8] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#071533] md:text-[36px]">
            The strongest portfolio strategy
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            The strongest strategy is to keep your portfolio aligned with one clear market direction. A focused
            portfolio with 4 strong samples is often better than 20 random outputs. Clarity beats quantity.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Explore connected AI pages"
            desc="Use these pages to understand the larger AI career, portfolio, and skills ecosystem."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-[22px] border border-[#D8E5F4] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.03)] transition hover:border-[#BFD4F3] hover:bg-[#FBFDFF]"
              >
                <span className="text-[15px] font-semibold text-[#071533]">{item.label}</span>
                <ArrowRight className="h-4 w-4 text-[#2563EB] transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-[#D8E5F4] bg-[linear-gradient(180deg,#F8FBFF_0%,#FFFFFF_100%)] p-8 text-center shadow-[0_10px_28px_rgba(15,23,42,0.04)] md:p-10">
            <h2 className="text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#071533]">
              Build a Practical AI Portfolio with Sikhadenge
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[17px] leading-[1.85] text-[#47607F]">
              Sikhadenge helps learners build practical AI skills across content, design, video, and workflows so they
              can create portfolio-ready work and become more job-ready and freelance-ready.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free AI Masterclass
              </Link>
            </div>
          </div>
        </div>
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
