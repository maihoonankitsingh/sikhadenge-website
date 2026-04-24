import fs from "fs";
import path from "path";

const root = process.cwd();
const keywordsFile = path.join(root, "keywords.txt");
const blogDir = path.join(root, "app", "blog");

if (!fs.existsSync(keywordsFile)) {
  console.error("keywords.txt not found");
  process.exit(1);
}

const raw = fs.readFileSync(keywordsFile, "utf8");
const slugs = raw
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((w) => {
      if (w.toLowerCase() === "ai") return "AI";
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

function descFromTitle(title) {
  return `Learn about ${title}. Explore practical AI tools, skills, workflows, and beginner-friendly execution paths with Sikhadenge.`;
}

function introFromTitle(title) {
  return `This page explains ${title} in a practical way. The goal is to help beginners, students, freelancers, creators, and digital workers understand how this topic fits into modern AI-assisted work.`;
}

function whyFromTitle(title) {
  return `${title} matters because AI is no longer limited to one type of work. It now supports content, design, video, communication, planning, research, and business execution. People who understand how to apply AI inside real workflows will have a stronger advantage than people who only know tool names.`;
}

function bulletsForTitle(title) {
  return [
    `${title} for practical digital work`,
    `Useful AI tools connected to ${title}`,
    `Workflow thinking around ${title}`,
    `Beginner-friendly execution path`,
    `Portfolio and real output relevance`,
    `Career, freelance, and business use cases`,
  ];
}

function mistakesForTitle(title) {
  return [
    `Learning ${title} only at theory level`,
    `Using AI output without editing and refinement`,
    `Ignoring workflow and focusing only on tools`,
    `Not creating proof-of-work projects around ${title}`,
  ];
}

function ctaTitle(title) {
  return `Build practical capability around ${title}`;
}

function detectCategory(slug) {
  const s = slug.toLowerCase();

  if (
    s.includes("instagram") ||
    s.includes("youtube") ||
    s.includes("reels") ||
    s.includes("shorts") ||
    s.includes("carousel") ||
    s.includes("caption") ||
    s.includes("hook") ||
    s.includes("personal-brand") ||
    s.includes("creator") ||
    s.includes("content")
  ) return "creators";

  if (
    s.includes("freelance") ||
    s.includes("freelancer") ||
    s.includes("client") ||
    s.includes("proposal") ||
    s.includes("pitch") ||
    s.includes("service")
  ) return "freelancers";

  if (
    s.includes("video") ||
    s.includes("editing") ||
    s.includes("captioning") ||
    s.includes("podcast") ||
    s.includes("talking-head") ||
    s.includes("faceless")
  ) return "video";

  if (
    s.includes("design") ||
    s.includes("graphic") ||
    s.includes("poster") ||
    s.includes("logo") ||
    s.includes("thumbnail") ||
    s.includes("visual") ||
    s.includes("creative-direction") ||
    s.includes("brand-identity")
  ) return "design";

  if (
    s.includes("student") ||
    s.includes("college") ||
    s.includes("school") ||
    s.includes("fresher") ||
    s.includes("study") ||
    s.includes("studies") ||
    s.includes("homework") ||
    s.includes("assignment") ||
    s.includes("exam") ||
    s.includes("presentation") ||
    s.includes("project") ||
    s.includes("note-making") ||
    s.includes("research-work")
  ) return "students";

  if (
    s.includes("marketing") ||
    s.includes("copywriting") ||
    s.includes("landing-page") ||
    s.includes("email-marketing") ||
    s.includes("lead-generation") ||
    s.includes("sales-content") ||
    s.includes("offer")
  ) return "marketing";

  if (
    s.includes("business") ||
    s.includes("startup") ||
    s.includes("founder") ||
    s.includes("small-team") ||
    s.includes("small-business") ||
    s.includes("online-business")
  ) return "business";

  if (
    s.includes("career") ||
    s.includes("jobs") ||
    s.includes("job-seeker") ||
    s.includes("portfolio") ||
    s.includes("earn-money") ||
    s.includes("without-coding") ||
    s.includes("from-zero")
  ) return "career";

  return "general";
}

function getRelatedLinks(category) {
  const common = [
    { href: "/ai-generalist", label: "AI Generalist" },
    { href: "/ai-skills", label: "AI Skills" },
    { href: "/ai-tools", label: "AI Tools" },
    { href: "/site-map", label: "HTML Sitemap" },
  ];

  const maps = {
    students: [
      { href: "/ai-skills-for-students", label: "AI Skills for Students" },
      { href: "/ai-tools-for-students", label: "AI Tools for Students" },
      { href: "/ai-jobs-without-coding", label: "AI Jobs Without Coding" },
    ],
    freelancers: [
      { href: "/ai-skills-for-freelancers", label: "AI Skills for Freelancers" },
      { href: "/ai-tools-for-freelancers", label: "AI Tools for Freelancers" },
      { href: "/ai-freelance-workflows", label: "AI Freelance Workflows" },
    ],
    creators: [
      { href: "/ai-skills-for-creators", label: "AI Skills for Creators" },
      { href: "/ai-tools-for-content-creation", label: "AI Tools for Content Creation" },
      { href: "/ai-content-workflows", label: "AI Content Workflows" },
    ],
    video: [
      { href: "/ai-tools-for-video-editing", label: "AI Tools for Video Editing" },
      { href: "/ai-video-workflows", label: "AI Video Workflows" },
      { href: "/ai-video-production-workflows", label: "AI Video Production Workflows" },
    ],
    design: [
      { href: "/ai-tools-for-designers", label: "AI Tools for Designers" },
      { href: "/ai-skills-for-designers", label: "AI Skills for Designers" },
      { href: "/ai-design-workflows", label: "AI Design Workflows" },
    ],
    marketing: [
      { href: "/ai-tools-for-marketing", label: "AI Tools for Marketing" },
      { href: "/ai-marketing-workflows", label: "AI Marketing Workflows" },
      { href: "/ai-marketing-strategy-workflows", label: "AI Marketing Strategy Workflows" },
    ],
    business: [
      { href: "/ai-skills-for-business", label: "AI Skills for Business" },
      { href: "/ai-business-workflows", label: "AI Business Workflows" },
      { href: "/ai-startup-workflows", label: "AI Startup Workflows" },
    ],
    career: [
      { href: "/how-to-start-ai-career", label: "How to Start AI Career" },
      { href: "/ai-career-paths", label: "AI Career Paths" },
      { href: "/ai-jobs-without-coding", label: "AI Jobs Without Coding" },
    ],
    general: [
      { href: "/ai-content-workflows", label: "AI Content Workflows" },
      { href: "/ai-career-paths", label: "AI Career Paths" },
      { href: "/future-of-ai-skills", label: "Future of AI Skills" },
    ],
  };

  return [...(maps[category] || maps.general), ...common];
}

function makePage({ slug, title, description }) {
  const bullets = bulletsForTitle(title);
  const mistakes = mistakesForTitle(title);
  const category = detectCategory(slug);
  const relatedLinks = getRelatedLinks(category);

  const relatedLinksCode = relatedLinks
    .map(
      (item) =>
        `  { href: "${item.href}", label: "${item.label}" },`
    )
    .join("\n");

  return `import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lightbulb, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "${title} | Sikhadenge",
  description: "${description}",
  alternates: {
    canonical: "https://sikhadenge.in/blog/${slug}",
  },
};

const focusAreas = [
  "${bullets[0]}",
  "${bullets[1]}",
  "${bullets[2]}",
  "${bullets[3]}",
  "${bullets[4]}",
  "${bullets[5]}",
];

const mistakes = [
  "${mistakes[0]}",
  "${mistakes[1]}",
  "${mistakes[2]}",
  "${mistakes[3]}",
];

const relatedLinks = [
${relatedLinksCode}
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
          <Pill>AI Guide</Pill>

          <div className="mt-8 max-w-4xl">
            <h1 className="text-[38px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[58px]">
              ${title}
            </h1>

            <p className="mt-6 max-w-3xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              ${introFromTitle(title)}
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
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Why this topic matters"
            desc="${whyFromTitle(title)}"
          />
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Core focus areas"
            desc="Use these areas to understand the practical side of this topic."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {focusAreas.map((item) => (
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
            title="How to approach it practically"
            desc="The best approach is to combine AI tools, workflow thinking, and real output creation."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            A practical path usually starts with understanding the problem, choosing the right tool stack, testing the workflow on a small project, and then improving quality through iteration. This is how AI capability turns into real work, portfolio strength, and earning potential.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Mistakes to avoid"
            desc="Avoid these mistakes if you want stronger results."
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
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Explore connected AI pages"
            desc="Use these pages to understand the wider AI skills and workflow ecosystem."
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
              ${ctaTitle(title)}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[17px] leading-[1.85] text-[#47607F]">
              Sikhadenge helps learners build practical AI skills across content, design, video, and workflows so they can turn learning into real capability.
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
    </main>
  );
}
`;
}

let created = 0;
let skipped = 0;

for (const slug of slugs) {
  const dir = path.join(blogDir, slug);
  const file = path.join(dir, "page.tsx");

  if (fs.existsSync(file)) {
    skipped++;
    console.log(`SKIP  ${slug}`);
    continue;
  }

  fs.mkdirSync(dir, { recursive: true });

  const title = titleFromSlug(slug);
  const description = descFromTitle(title);
  const content = makePage({ slug, title, description });

  fs.writeFileSync(file, content, "utf8");
  created++;
  console.log(`MAKE  ${slug}  [${detectCategory(slug)}]`);
}

console.log(`\nDone. Created: ${created}, Skipped: ${skipped}`);
