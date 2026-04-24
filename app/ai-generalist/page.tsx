import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Brush,
  Clapperboard,
  FileText,
  GraduationCap,
  Layers3,
  Link2,
  Megaphone,
  Sparkles,
  Users,
  Wand2,
  Workflow,
} from "lucide-react";
import HubInternalLinks from "@/components/seo/HubInternalLinks";

export const metadata: Metadata = {
  title: "What Is an AI Expert | Sikhadenge",
  description:
    "Understand what an AI Expert is, why this role matters, which skills are involved, and how learners can build practical AI-first digital capability across content, design, video, pages, marketing, and workflows.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-generalist",
  },
  openGraph: {
    title: "What Is an AI Expert | Sikhadenge",
    description:
      "A structured guide to AI Expert skills, use cases, learning paths, and practical capability building.",
    url: "https://sikhadenge.in/ai-generalist",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is an AI Expert | Sikhadenge",
    description:
      "A structured guide to AI Expert skills, use cases, learning paths, and practical capability building.",
  },
};

const quickInfo = [
  {
    title: "Role definition",
    desc: "An AI Expert uses AI across multiple digital work areas instead of depending on a single narrow tool path.",
  },
  {
    title: "Capability range",
    desc: "Content, design, video, pages, marketing assets, and workflow automation can work inside one AI-first system.",
  },
  {
    title: "Real-world value",
    desc: "This role helps people and teams move faster, reduce manual effort, and improve execution quality.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Work is becoming AI-assisted",
    desc: "Digital work now rewards people who can combine prompting, systems thinking, execution clarity, and output quality across functions.",
  },
  {
    icon: Layers3,
    title: "Single-skill learning is limited",
    desc: "Modern work often needs content, visuals, pages, assets, and workflows to move together instead of staying isolated.",
  },
  {
    icon: Workflow,
    title: "Execution speed matters",
    desc: "AI Generalists can reduce friction between idea, production, review, and publishing by using connected workflows.",
  },
  {
    icon: Briefcase,
    title: "Teams value versatility",
    desc: "Students, freelancers, creators, and operators benefit when one person can handle multiple digital execution layers with structure.",
  },
];

const coreSkills = [
  {
    icon: FileText,
    title: "Create Content with AI",
    desc: "Scripts, captions, briefs, outlines, messaging support, structured content systems, and repeatable publishing workflows.",
  },
  {
    icon: Brush,
    title: "Design with AI",
    desc: "Creative asset ideation, visual direction, brand support, ad creatives, social visuals, and faster design refinement.",
  },
  {
    icon: Clapperboard,
    title: "Edit Videos with AI",
    desc: "Short-form planning, video scripting, shot support, reels, promos, explainer concepts, and production acceleration.",
  },
  {
    icon: Megaphone,
    title: "Market with AI",
    desc: "Campaign messaging, offer framing, ad support, funnel assets, landing page copy, and execution support for growth tasks.",
  },
  {
    icon: Link2,
    title: "AI Pages",
    desc: "Landing page structure, website section planning, conversion-focused page support, and AI-assisted digital presentation layers.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    desc: "Workflow support, repetitive task reduction, better prompt systems, basic automations, and productivity-oriented execution systems.",
  },
];

const whereItWorks = [
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Students can build modern digital capability beyond traditional software-only learning and become more job-relevant.",
  },
  {
    icon: Wand2,
    title: "Freelancers",
    desc: "Freelancers can handle a wider scope of client work by combining content, visuals, pages, and fast AI-supported delivery.",
  },
  {
    icon: Users,
    title: "Creators",
    desc: "Creators can improve content systems, creative output, media execution, and publishing support using AI workflows.",
  },
  {
    icon: Briefcase,
    title: "Teams",
    desc: "Small teams and operators can build cross-functional execution support across marketing, assets, pages, and workflows.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills-for-students",
    title: "AI Skills for Students",
    desc: "See how AI-first capability supports learning, employability, and practical execution for modern learners.",
  },
  {
    href: "/ai-skills-for-freelancers",
    title: "AI Skills for Freelancers",
    desc: "Explore how freelancers can use AI across delivery, client work, output speed, and service expansion.",
  },
  {
    href: "/ai-skills-for-creators",
    title: "AI Skills for Creators",
    desc: "Understand the AI skills that improve content workflows, creative systems, and production quality.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Review the practical AI skill categories that matter most for modern execution-focused work.",
  },
  {
    href: "/courses",
    title: "Courses",
    desc: "See the structured Sikhadenge program that supports AI-first digital capability building.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the masterclass to understand how structured AI-first execution is taught in practice.",
  },
];

const faqs = [
  {
    q: "What is an AI Expert?",
    a: "An AI Expert is a person who can use AI across multiple digital work areas such as content, design, video, marketing support, pages, and workflows. Instead of learning only one isolated tool, the focus stays on broader AI-assisted execution capability.",
  },
  {
    q: "Why is the AI Expert role important?",
    a: "This role is becoming important because modern digital work is increasingly cross-functional. Many tasks now require content, creative, communication, publishing, and workflow support to work together, and AI can connect those layers more efficiently.",
  },
  {
    q: "Is an AI Expert only about using AI tools?",
    a: "No. The role is not only about knowing tool names. It is about understanding output, workflow design, task structure, use cases, execution quality, and how AI can support real digital work in a practical way.",
  },
  {
    q: "Who should learn AI Expert skills?",
    a: "Students, freelancers, creators, career switchers, small team members, and digital operators can all benefit from AI Expert skills because the capability applies across multiple forms of modern work.",
  },
  {
    q: "Which skills are part of AI Expert capability?",
    a: "Common areas include AI content systems, AI-assisted creative production, AI video support, AI marketing execution, AI landing pages and funnels, and workflow or automation support.",
  },
  {
    q: "How is an AI Expert different from a specialist?",
    a: "A specialist usually focuses deeply on one narrow domain. An AI Expert works across connected digital execution areas and builds broader operational flexibility using structured AI workflows.",
  },
  {
    q: "Can AI Expert skills help in freelance or job work?",
    a: "Yes. These skills can support freelance delivery, portfolio development, team contribution, faster execution, better output structure, and stronger practical relevance in modern digital roles.",
  },
  {
    q: "Where can I start learning AI Expert skills?",
    a: "A structured learning path is the best starting point. You can begin with the Sikhadenge free masterclass and then explore the broader program through the courses page and related learning paths.",
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

export default function AiGeneralistPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>AI Expert Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              What is an AI Expert
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              An AI Expert is someone who can use AI across multiple digital execution areas instead of
              depending on only one narrow workflow. This includes content support, visual direction, video
              systems, marketing assets, landing pages, and workflow productivity. At Sikhadenge, the idea is
              not to teach isolated tool usage only. The focus is on practical AI-first capability that helps
              learners and teams create better output with more structure, speed, and execution clarity.
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
            title="Why AI Generalists matter in modern digital work"
            desc="The market is moving toward execution models where content, creative, communication, publishing, and workflows need to work together. AI Generalists fit this shift because they can support multiple parts of modern digital execution inside one practical framework."
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
            title="Core skills of an AI Expert"
            desc="An AI Expert does not operate inside just one narrow skill bucket. The role becomes valuable because it connects multiple output areas into one AI-assisted execution system."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {coreSkills.map((item) => {
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
            title="Where AI Generalists can create value"
            desc="This capability can support individual growth as well as practical execution inside client work, creator systems, and modern teams."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {whereItWorks.map((item) => {
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
            title="Explore connected AI learning paths"
            desc="These pages support the broader AI Expert topic cluster and help learners understand how AI capability changes by audience, use case, and execution context."
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
            title="Discover more pages inside the Sikhadenge AI cluster"
            desc="These internal links help learners explore adjacent AI topics across workflows, tools, role-based skills, and practical execution paths."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { href: "/ai-tools", label: "AI Tools" },
              { href: "/ai-skills", label: "AI Skills" },
              { href: "/ai-content-workflows", label: "Create Content with Automate Work with AI" },
              { href: "/ai-design-workflows", label: "Design with Automate Work with AI" },
              { href: "/ai-video-production-workflows", label: "Edit Videos with AI Production Workflows" },
              { href: "/ai-marketing-workflows", label: "Market with Automate Work with AI" },
              { href: "/ai-automation-workflows", label: "AI Automation Workflows" },
              { href: "/ai-business-workflows", label: "AI Business Workflows" },
              { href: "/ai-social-media-workflows", label: "AI Social Media Workflows" },
              { href: "/ai-skills-for-students", label: "AI Skills for Students" },
              { href: "/ai-skills-for-freelancers", label: "AI Skills for Freelancers" },
              { href: "/ai-skills-for-creators", label: "AI Skills for Creators" },
              { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
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
            desc="These are the direct questions people usually ask before exploring AI Expert skills, structured learning paths, and practical AI-first execution."
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
    
      {/* SEO CONTENT SECTION */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          AI Expert: Complete Guide to AI Skills, Tools & Career (2026)
        </h1>

        <p className="text-gray-600 mb-6">
          AI Expert ek aisa professional hota hai jo multiple AI tools, workflows aur digital skills ko combine karke real-world problems solve karta hai. Aaj ke time par companies ko aise logon ki demand hai jo sirf ek kaam nahi, balki content, automation, research, design support aur AI execution ko saath me handle kar sakein.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          AI Expert kya hota hai?
        </h2>

        <p className="text-gray-600 mb-4">
          AI Expert wo person hota hai jo AI tools jaise ChatGPT, Claude, Gemini, image generation tools, video tools aur automation systems ka use karke practical business aur creative work karta hai. Is role me focus sirf theory par nahi hota, balki output aur workflow execution par hota hai.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          AI Expert ko kaun kaun si skills aani chahiye?
        </h2>

        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Prompt Engineering aur structured AI input writing</li>
          <li>Research workflows using ChatGPT, Claude aur Gemini</li>
          <li>AI content creation for text, image aur presentation work</li>
          <li>Basic automation understanding using no-code tools</li>
          <li>Design support using Canva, Photoshop ya AI design tools</li>
          <li>Video scripting, editing support aur AI-assisted production</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          AI Expert banne ke fayde
        </h2>

        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Multiple income opportunities</li>
          <li>Freelancing aur remote work options</li>
          <li>Startup aur agency roles me demand</li>
          <li>Fast-changing digital market me relevance</li>
          <li>Content, marketing, design aur operations me utility</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          AI Expert ka career scope
        </h2>

        <p className="text-gray-600 mb-4">
          AI Expert ka scope 2026 me kaafi strong hai, kyunki businesses ko aise professionals chahiye jo AI ko actual workflows me use kar sakein. Startups, agencies, creators, educators aur digital businesses sabko aise log chahiye jo productivity aur execution dono improve kar sakein.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          Kaise bane AI Expert?
        </h2>

        <ol className="list-decimal pl-5 text-gray-600 space-y-2">
          <li>Core AI tools ko practical tareeke se seekho</li>
          <li>Daily workflow based projects banao</li>
          <li>Content, design, research aur automation ka combination practice karo</li>
          <li>Portfolio aur proof-of-work create karo</li>
          <li>Freelance, internship ya business execution work se start karo</li>
        </ol>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          AI Expert kin logon ke liye useful hai?
        </h2>

        <p className="text-gray-600 mb-4">
          Ye path students, freelancers, creators, marketers, agency owners, business operators aur un logon ke liye useful hai jo AI ko sirf dekhna nahi, balki kaam me use karna chahte hain. Agar kisi ko future-ready digital skill chahiye jisme practical output ho, to AI Expert ek strong direction hai.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          FAQs
        </h2>

        <div className="space-y-4 text-gray-600">
          <div>
            <strong>Q. AI Expert kya hota hai?</strong>
            <p>AI Expert ek multi-skill professional hota hai jo alag-alag AI tools ko combine karke real work complete karta hai.</p>
          </div>
          <div>
            <strong>Q. Kya beginner AI Expert ban sakta hai?</strong>
            <p>Haan. Beginner step by step tools, workflows aur projects ke through start kar sakta hai.</p>
          </div>
          <div>
            <strong>Q. AI Expert me kaun se tools use hote hain?</strong>
            <p>ChatGPT, Claude, Gemini, image generation tools, design tools, automation tools aur AI video tools commonly use hote hain.</p>
          </div>
          <div>
            <strong>Q. Isme job aur freelance dono scope hai?</strong>
            <p>Haan. AI Expert skill set freelance work, startup roles, creator economy aur agency work sab me useful hai.</p>
          </div>
        </div>

        <div className="mt-12 border-t pt-6">
          <h3 className="text-lg font-semibold mb-3">Explore More</h3>
          <ul className="space-y-2 text-blue-600">
            <li><a href="/ai-tools">Best AI Tools</a></li>
            <li><a href="/ai-content-workflows">Create Content with Automate Work with AI</a></li>
            <li><a href="/ai-design-workflows">Design with Automate Work with AI</a></li>
            <li><a href="/gen-ai-masterclass">Gen AI Masterclass</a></li>
          </ul>
        </div>
      </section>

      <HubInternalLinks hub="ai-expert" />

<section className="border-t border-white/10 bg-[#0B1220]">
  <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
    <h2 className="text-2xl md:text-3xl font-bold text-white">
      Understanding AI in Practical Real-World Context
    </h2>

    <p className="mt-4 text-[#B0B7C3] leading-7">
      Artificial intelligence is no longer limited to advanced technical environments. It is now part of everyday digital work including content creation, design execution, video production, marketing workflows, and automation systems. Understanding how AI fits into real-world execution is more important than simply knowing tools.
    </p>

    <p className="mt-4 text-[#B0B7C3] leading-7">
      Modern learners, freelancers, and professionals are increasingly expected to work across multiple digital layers. This includes combining content thinking, creative output, structured workflows, and AI-assisted execution into a single system. Pages like this help build clarity around how these elements connect.
    </p>

    <h3 className="mt-8 text-xl font-semibold text-white">
      How AI is Changing Digital Work
    </h3>

    <ul className="mt-4 space-y-3 text-[#B0B7C3]">
      <li>• Faster execution of content, design, and video tasks</li>
      <li>• Reduced dependency on manual repetitive work</li>
      <li>• Ability to manage multiple roles with smaller teams</li>
      <li>• Improved consistency in output and workflow systems</li>
      <li>• Higher productivity for individuals and freelancers</li>
    </ul>

    <h3 className="mt-8 text-xl font-semibold text-white">
      Practical Use Cases of AI
    </h3>

    <p className="mt-4 text-[#B0B7C3] leading-7">
      AI is being used in real scenarios such as creating social media content, editing videos faster, generating design ideas, writing marketing copy, building landing pages, and automating repetitive business tasks. The real advantage comes when these use cases are combined into a structured workflow.
    </p>

    <h3 className="mt-8 text-xl font-semibold text-white">
      Why Structured Learning Matters
    </h3>

    <p className="mt-4 text-[#B0B7C3] leading-7">
      Learning isolated tools does not provide long-term value. A structured approach that connects skills, tools, workflows, and real execution scenarios helps learners build strong practical capability. This is especially important for students, freelancers, and professionals who want to work in modern AI-assisted environments.
    </p>
  </div>
</section>

</main>
  );
}
