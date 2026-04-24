import type { Metadata } from "next";
import Link from "next/link";
import { Search, ArrowRight, Briefcase, Lightbulb, Rocket, Target, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Career Paths | Sikhadenge",
  description:
    "Explore practical AI career paths for beginners, students, freelancers, creators, and modern digital workers. Understand which AI roles are growing, what skills matter, and how to choose the right path.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-career-paths",
  },
  openGraph: {
    title: "AI Career Paths | Sikhadenge",
    description:
      "Explore practical AI career paths for beginners, students, freelancers, creators, and modern digital workers. Understand which AI roles are growing, what skills matter, and how to choose the right path.",
    url: "https://sikhadenge.in/ai-career-paths",
    siteName: "Sikhadenge",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Career Paths | Sikhadenge",
    description:
      "Explore practical AI career paths for beginners, students, freelancers, creators, and modern digital workers. Understand which AI roles are growing, what skills matter, and how to choose the right path.",
  },
};

const faqs = [
  {
    q: "What are the main AI career paths today?",
    a: "The main practical AI career paths today include AI content work, AI design support, AI video execution, AI marketing support, AI automation support, AI freelancing, and broader AI Expert roles.",
  },
  {
    q: "Do AI career paths require coding?",
    a: "Not always. Many AI career paths in content, design, video, marketing, productivity, and workflow support can be started without coding.",
  },
  {
    q: "Which AI career path is best for beginners?",
    a: "The best path depends on the person, but beginners often progress faster in practical areas such as AI content, AI design support, AI video support, and AI Expert execution roles.",
  },
  {
    q: "Can freelancers build a career using AI skills?",
    a: "Yes. Freelancers can use AI skills to expand services, improve speed, increase output quality, and support a wider range of client work.",
  },
  {
    q: "How should someone choose the right AI career path?",
    a: "A good way is to look at strengths, interest areas, output preference, and which practical skill cluster feels most natural, such as content, visuals, video, workflows, or digital execution.",
  },
  {
    q: "Is AI Expert a valid career direction?",
    a: "Yes. AI Expert capability is becoming more relevant because modern digital work often needs broader AI-assisted execution across multiple connected tasks.",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#245EEA] shadow-[0_4px_16px_rgba(37,99,235,0.08)]">
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
      <h2 className="mt-6 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#071533] md:text-[48px]">
        {title}
      </h2>
      {desc ? (
        <p className="mt-4 max-w-4xl text-[17px] leading-[1.8] text-[#47607F] md:text-[18px]">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

export default function AiCareerPathsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Career Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[40px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[62px]">
              AI career paths
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              AI is creating multiple career directions, but not all of them look the same. Some paths are technical,
              while many practical paths focus on digital execution, content systems, visuals, workflows, tools, and
              modern business support. The right career path depends on how someone wants to work, what kind of output
              they enjoy, and which AI skill cluster feels most natural.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/how-to-start-ai-career"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-sm font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Start AI Career
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Why this matters"
            title="Why understanding AI career paths is important"
            desc="People often hear that AI is growing, but real career clarity only comes when the role categories are understood properly."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Search,
                title: "Not every AI path is technical",
                desc: "A common misunderstanding is that every AI role requires deep coding. In reality, many practical AI paths are connected to digital execution and output support.",
              },
              {
                icon: Workflow,
                title: "Career clarity reduces confusion",
                desc: "When people understand role categories clearly, they can choose learning paths with more focus and less wasted effort.",
              },
              {
                icon: Briefcase,
                title: "Different skills support different roles",
                desc: "The right path depends on whether someone is stronger in writing, visuals, videos, systems, coordination, or broader execution work.",
              },
              {
                icon: Target,
                title: "The goal is role-fit, not random learning",
                desc: "Career progress happens faster when the learning path matches the desired work direction instead of staying generic.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-[#D8E5F4] bg-white p-7 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-[78px] w-[78px] items-center justify-center rounded-[22px] border border-[#CFE0F6] bg-[#EAF2FE]">
                    <Icon className="h-7 w-7 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-6 text-[20px] font-semibold text-[#071533]">{item.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.85] text-[#47607F]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Main paths"
            title="The most practical AI career paths today"
            desc="These are some of the strongest non-random AI career directions for modern digital work."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Create Content with AI Specialist",
                desc: "Focused on writing support, scripts, captions, communication systems, and structured content workflows.",
              },
              {
                title: "Design with AI Support Specialist",
                desc: "Focused on creative assets, visual direction, thumbnails, layout thinking, and AI-assisted design execution.",
              },
              {
                title: "Edit Videos with AI Workflow Specialist",
                desc: "Focused on short-form video systems, editing support, script-to-video execution, and media workflows.",
              },
              {
                title: "Market with AI Execution Specialist",
                desc: "Focused on campaigns, content angles, ad creatives, offer communication, and digital growth support.",
              },
              {
                title: "AI Freelance Service Provider",
                desc: "Focused on client projects using AI across multiple outputs such as content, design, video, and workflow support.",
              },
              {
                title: "AI Expert",
                desc: "Focused on broad AI-assisted execution across multiple connected digital tasks instead of one narrow specialty.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-[#D8E5F4] bg-white p-7 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <h3 className="text-[20px] font-semibold text-[#071533]">{item.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.85] text-[#47607F]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="How to choose"
            title="How to decide which AI career path fits you"
            desc="The right AI career path usually becomes clear when strengths and output preference are matched with the right skill cluster."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Choose by output type",
                desc: "If you enjoy writing, content may fit. If you enjoy visuals, design may fit. If you enjoy media, video may fit.",
              },
              {
                title: "Choose by workflow style",
                desc: "Some people prefer focused specialist execution, while others fit better in broader AI Expert workflows.",
              },
              {
                title: "Choose by work model",
                desc: "Freelancers, creators, job seekers, and startup team members often need different AI role paths.",
              },
              {
                title: "Choose by long-term growth",
                desc: "The best path is not only easy to start, but also strong enough to grow into more useful work over time.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-[#D8E5F4] bg-[#FBFDFF] p-7 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <h3 className="text-[20px] font-semibold text-[#071533]">{item.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.85] text-[#47607F]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Useful roadmap"
            title="A simple path for entering an AI career"
            desc="Most practical AI career paths can be approached through a simple structured sequence."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {[
              "Understand role categories",
              "Choose one main skill cluster",
              "Learn useful tools in that cluster",
              "Practice real workflows and outputs",
              "Build projects and start positioning yourself",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-[26px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="text-sm font-semibold text-[#2563EB]">Step {index + 1}</div>
                <p className="mt-3 text-[16px] font-semibold leading-[1.75] text-[#071533]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Who should explore this"
            title="Who benefits from understanding AI career paths"
            desc="Career path clarity is useful for anyone trying to build a serious future in modern AI-assisted digital work."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              "Students exploring future-proof skills",
              "Freelancers trying to expand service direction",
              "Creators looking for monetizable AI capability",
              "Job seekers entering modern digital roles",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="mt-0.5 h-5 w-5 text-[#2563EB]" />
                  <p className="text-[16px] font-semibold leading-[1.75] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Related pages"
            title="Explore connected AI pages"
            desc="These pages connect this career guide with the wider Sikhadenge AI learning and execution cluster."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { href: "/how-to-start-ai-career", label: "How to Start AI Career" },
              { href: "/ai-generalist", label: "AI Expert" },
              { href: "/ai-skills", label: "AI Skills" },
              { href: "/ai-tools", label: "AI Tools" },
              { href: "/ai-skills-for-job-seekers", label: "AI Skills for Job Seekers" },
              { href: "/ai-skills-for-freelancers", label: "AI Skills for Freelancers" },
              { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
              { href: "/ai-content-workflows", label: "Create Content with Automate Work with AI" },
              { href: "/ai-marketing-workflows", label: "Market with Automate Work with AI" },
              { href: "/site-map", label: "HTML Sitemap" },
            ].map((item) => (
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
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="FAQs"
            title="Frequently asked questions"
            desc="These are the common questions people ask before choosing an AI career path."
          />

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-[24px] border border-[#D8E5F4] bg-[#FBFDFF] px-6 py-5 shadow-[0_6px_18px_rgba(15,23,42,0.03)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-semibold leading-[1.5] text-[#071533] marker:content-none">
                  <span>{item.q}</span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[#D8E5F4] bg-white text-[#2563EB] transition group-open:rotate-180">
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
