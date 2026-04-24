import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Briefcase,
  ChevronDown,
  Cpu,
  FastForward,
  Globe,
  GraduationCap,
  Layers,
  Lightbulb,
  MonitorPlay,
  Paintbrush,
  Sparkles,
  Star as LucideStar,
  Target,
  Wand2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Become an AI Expert: Essential Skills, Tools & Practical Training | Sikhadenge",
  description:
    "Discover what it takes to become an AI Expert. Master the core skills, modern tools, and practical workflows essential for students, freelancers, and business professionals.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-expert",
  },
  openGraph: {
    type: "article",
    url: "https://sikhadenge.in/ai-expert",
    title: "How to Become an AI Expert: Top Skills, Tools & Real-World Workflows",
    description:
      "Master the core skills, modern tools, and practical workflows essential for students, freelancers, and business professionals.",
    images: [
      {
        url: "/images/courses/ai-mastery-design-editing-cover.webp",
        width: 1200,
        height: 630,
        alt: "AI Expert Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Become an AI Expert: Top Skills, Tools & Real-World Workflows",
    description:
      "Master the core skills, modern tools, and practical workflows essential for students, freelancers, and business professionals.",
    images: ["/images/courses/ai-mastery-design-editing-cover.webp"],
  },
};

export default function AiExpertPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.10),_transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 right-0 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl"></div>
          <div className="absolute bottom-0 left-10 h-40 w-40 rounded-full bg-slate-100 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 shadow-[0_8px_24px_rgba(37,99,235,0.10)] sm:text-sm">
              Flagship AI Expert Guide
            </div>

            <h1 className="mb-6 max-w-5xl text-4xl font-black leading-[1.02] tracking-tight text-slate-900 sm:text-6xl lg:text-[4.5rem]">
              Become an <span className="text-blue-600">AI Expert</span> with Practical Skills, Tools, and Real Workflows
            </h1>

            <p className="mb-8 max-w-4xl text-base font-medium leading-8 text-slate-600 sm:text-xl">
              The most valuable AI capability is not random tool usage. It is the ability to combine content, visuals, video, systems, and workflow execution into practical output. People who learn this properly become faster, more useful, and more adaptable in modern digital work.
            </p>

            <div className="mb-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-[0_16px_40px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Join Free AI Masterclass
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-[0_10px_28px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600"
              >
                Explore Courses
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                "Content, visuals, video, and workflow execution",
                "Useful for students, freelancers, and professionals",
                "Practical learning path, not random AI tools",
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 text-sm font-semibold text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.04)] backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        
        {/* 3 Summary Cards */}
        <section>
          <div className="mb-8 max-w-3xl">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Why this path matters</h2>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              AI expertise now means stronger execution across connected digital layers
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Practical, not random",
                desc: "The strongest AI capability comes from real execution across content, visuals, video, pages, and workflows instead of disconnected tool knowledge."
              },
              {
                title: "More useful digital range",
                desc: "People who can contribute across multiple connected areas usually become more valuable than those limited to one narrow task."
              },
              {
                title: "Faster systems and output",
                desc: "The biggest shift is better speed, stronger systems, and sharper execution quality across modern digital work."
              },
            ].map((card, i) => (
              <div key={i} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_14px_34px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(15,23,42,0.08)]">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <LucideStar className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-black text-slate-900">{card.title}</h3>
                <p className="text-[15px] leading-7 text-slate-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Skill Area - Light Card Grid Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-3">Core Capabilities</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">What Skills Should an AI Expert Master?</h3>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { 
                title: "Generative Visual Systems", 
                desc: "Visual capability matters because AI can now support graphics, layouts, thumbnails, brand assets, and digital creative output more efficiently.", 
                icon: Paintbrush 
              },
              { 
                title: "Video Workflow Execution", 
                desc: "AI-assisted video systems are becoming highly useful for short-form content, promos, explainers, editing support, and production speed.", 
                icon: MonitorPlay 
              },
              { 
                title: "Content & Communication", 
                desc: "One of the best AI skill areas is content support across ideation, writing, scripting, briefs, audience communication, and structured messaging systems.", 
                icon: BrainCircuit 
              },
              { 
                title: "Workflow Productivity & Systems", 
                desc: "One of the strongest AI skill categories is using AI to reduce repetitive work, improve planning, support documentation, and build clearer systems.", 
                icon: Layers 
              },
            ].map((s, i) => (
              <div key={i} className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <s.icon className="h-6 w-6" />
                </div>
                <h4 className="mb-3 text-xl font-bold text-slate-900">{s.title}</h4>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dark Navy Outcomes Block */}
        <section className="relative overflow-hidden rounded-[34px] bg-[#0B1220] py-16 sm:py-24">
          <div className="absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-blue-700/10 blur-3xl"></div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-12 text-white">
            <div className="max-w-3xl">
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">Professional outcomes</h2>
              <h3 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                Strong AI capability improves speed, adaptability, and market value
              </h3>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                When people understand where AI actually fits, they make better decisions about output, systems, priorities, and execution strategy. That is what turns AI familiarity into practical value.
              </p>
            </div>

            <div className="mt-14 grid gap-8 text-left sm:grid-cols-3">
              <div className="rounded-[26px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-[0_18px_48px_rgba(2,6,23,0.24)]">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <h4 className="mb-3 text-xl font-black text-white">Students</h4>
                <p className="text-sm leading-7 text-slate-300">
                  Build stronger career readiness by connecting modern AI capability with digital execution, projects, and real interview relevance.
                </p>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-[0_18px_48px_rgba(2,6,23,0.24)]">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                  <Briefcase className="h-7 w-7" />
                </div>
                <h4 className="mb-3 text-xl font-black text-white">Freelancers</h4>
                <p className="text-sm leading-7 text-slate-300">
                  Increase output speed, improve service depth, and handle more client execution without depending only on traditional manual methods.
                </p>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-[0_18px_48px_rgba(2,6,23,0.24)]">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                  <Globe className="h-7 w-7" />
                </div>
                <h4 className="mb-3 text-xl font-black text-white">Professionals</h4>
                <p className="text-sm leading-7 text-slate-300">
                  Improve workflow clarity, automate repetitive execution, and bring stronger cross-functional value into modern business environments.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Related Internal Links Block */}
        <section>
          <div className="mb-8">
            <h2 className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-3">Connected Hubs</h2>
            <h3 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Explore connected AI skill pages</h3>
            <p className="mt-4 text-slate-600 max-w-2xl">These pages help connect broader AI learning with students, freelancers, creators, tools, and the AI Expert model.</p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "AI Expert", href: "/ai-generalist" },
              { label: "AI Skills for Students", href: "/ai-skills-for-students" },
              { label: "AI Skills for Freelancers", href: "/ai-skills-for-freelancers" },
              { label: "AI Skills for Creators", href: "/ai-skills-for-creators" },
              { label: "AI Tools Hub", href: "/ai-tools" },
              { label: "Best AI Skills to Learn", href: "/best-ai-skills-to-learn" },
              { label: "AI Course Roadmap", href: "/ai-course-roadmap" },
              { label: "AI Automation Roadmap", href: "/ai-automation-roadmap" },
              { label: "AI Video Editing Roadmap", href: "/ai-video-editing-roadmap" },
              { label: "AI No Code Roadmap", href: "/ai-no-code-roadmap" },
              { label: "AI Freelancing Roadmap", href: "/ai-freelancing-roadmap" },
            ].map((link, i) => (
              <Link 
                key={i} 
                href={link.href}
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 font-semibold text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all"
              >
                {link.label}
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>

        {/* Accordion-style FAQ Block */}
        <section className="mx-auto max-w-4xl pt-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold tracking-[0.18em] text-blue-600 uppercase mb-3">Common Questions</h2>
            <h3 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Frequently asked questions</h3>
            <p className="mt-4 text-slate-600">Clear answers to common questions people usually have before deciding which AI skills are worth learning.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Do I need an advanced coding background to become an AI Expert?",
                a: "No. Modern AI expertise in creative, marketing, and workflow-based environments relies more on prompt logic, execution systems, and connected digital capability than traditional software development."
              },
              {
                q: "What industries are actively searching for AI Experts?",
                a: "Digital marketing, media, creator businesses, agencies, e-commerce, education, and modern business operations all benefit from people who can combine AI with practical execution."
              },
              {
                q: "Will generative AI tools replace creative freelancers?",
                a: "AI usually amplifies capable people. Those who use AI effectively tend to outpace those who depend only on manual methods. Practical capability becomes more important, not less."
              },
              {
                q: "Are the AI trainings practical and hands-on?",
                a: "Yes. The strongest training approach focuses on projects, real workflows, execution systems, and useful output instead of random tool exploration."
              }
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.04)] [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 p-6 font-bold text-slate-900">
                  <span className="text-lg">{faq.q}</span>
                  <span className="shrink-0 rounded-full bg-slate-50 p-2 text-slate-500 transition-colors group-open:bg-blue-50 group-open:text-blue-600 sm:p-3">
                    <ChevronDown className="h-5 w-5 transition duration-300 group-open:-rotate-180" />
                  </span>
                </summary>
                <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-slate-600 leading-7">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border-t border-slate-100 bg-[#07152E] px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-200 sm:text-sm">
                Final Next Step
              </div>
              <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Start building real AI expert capability with Sikhadenge
              </h2>
              <p className="mb-8 text-sm leading-7 text-slate-300 sm:text-base">
                Learn practical AI skills across content, visuals, video, systems, and real execution workflows. Start with the free masterclass and move toward stronger output, better adaptability, and career-ready capability.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/gen-ai-masterclass"
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 sm:text-base"
                >
                  Join Free AI Masterclass
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:text-base"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// Simple internal icon for summary cards
function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
