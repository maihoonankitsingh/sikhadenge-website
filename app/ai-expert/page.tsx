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
      <section className="bg-white border-b border-slate-200 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Small Top Label */}
            <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-blue-700">
              AI Expert Mastery
            </div>
            
            {/* Hero Heading */}
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              How to Become an <span className="text-blue-600">AI Expert</span>: Top Skills & Workflows
            </h1>
            
            {/* Intro Paragraph */}
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              The best AI skills are practical skills across content, visuals, video, marketing, pages, and workflows. 
              The goal is to build stronger real-world execution capability, not only tool familiarity. People who 
              learn the right AI skills become faster, more useful, and more adaptable in modern digital work.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link 
                href="/gen-ai-masterclass" 
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Join free masterclass
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/ai-generalist" 
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors"
              >
                Explore AI Generalist
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        
        {/* 3 Summary Cards */}
        <section>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { 
                title: "Practical, not random", 
                desc: "The most useful AI skills improve real execution across content, visuals, video, and workflows instead of isolated tool usage." 
              },
              { 
                title: "Broader digital capability", 
                desc: "People who can contribute across multiple connected execution areas often become more useful than those who only know one narrow digital task." 
              },
              { 
                title: "Faster output execution", 
                desc: "The biggest shift is not only new tools. The real shift is faster planning, better systems, and improved execution speed." 
              },
            ].map((card, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <StarIcon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.desc}</p>
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
        <section className="overflow-hidden rounded-3xl bg-[#0B1220] py-16 sm:py-24 relative">
          {/* Subtle background glow effect if needed, kept minimal for clean look */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-blue-900/10 blur-3xl pointer-events-none rounded-full" />
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-12 text-center text-white">
            <h2 className="text-sm font-bold tracking-wider text-blue-400 uppercase mb-4">Professional Adaptation</h2>
            <h3 className="text-3xl font-extrabold sm:text-5xl mb-8">Better Decision-Making & Adaptability</h3>
            <p className="mx-auto max-w-2xl text-lg text-slate-300 mb-16 leading-relaxed">
              When people understand where AI actually fits, they make better choices about output, systems, priorities, and digital execution strategy.
            </p>

            <div className="grid gap-8 text-left sm:grid-cols-3">
              <div className="border border-slate-800 bg-slate-900/50 p-8 rounded-2xl backdrop-blur-sm">
                <div className="mb-4 rounded-full bg-blue-500/10 w-12 h-12 flex items-center justify-center text-blue-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white mb-2 text-lg">Students</h4>
                <p className="text-slate-400">Cross the entry-level gap by walking into job interviews armed with highly relevant tech capabilities.</p>
              </div>
              <div className="border border-slate-800 bg-slate-900/50 p-8 rounded-2xl backdrop-blur-sm">
                <div className="mb-4 rounded-full bg-blue-500/10 w-12 h-12 flex items-center justify-center text-blue-400">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white mb-2 text-lg">Freelancers</h4>
                <p className="text-slate-400">Increase client output volume reliably without compromising your creative baseline and quality.</p>
              </div>
              <div className="border border-slate-800 bg-slate-900/50 p-8 rounded-2xl backdrop-blur-sm">
                <div className="mb-4 rounded-full bg-blue-500/10 w-12 h-12 flex items-center justify-center text-blue-400">
                  <Globe className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white mb-2 text-lg">Professionals</h4>
                <p className="text-slate-400">Automate corporate workflows, analyze creative data accurately, and boost practical cross-functional value.</p>
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
            <h2 className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-3">Common Questions</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Frequently asked questions</h3>
            <p className="mt-4 text-slate-600">Clear answers to common questions people usually have before deciding which AI skills are worth learning.</p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: "Do I need an advanced coding background to become an AI Expert?",
                a: "No. Modern AI expertise in creative and marketing fields relies heavily on workflow structuring, tool chaining, and prompt logic rather than traditional software development. The most useful AI skills right now involve content creation, visual support, and workflow execution."
              },
              {
                q: "What industries are actively searching for AI Experts?",
                a: "Digital marketing agencies, video production houses, and e-commerce brands actively look for AI-skilled talent to scale their output efficiently. The goal is real-world capability over simple tool familiarity."
              },
              {
                q: "Will generative AI tools simply replace creative freelancers?",
                a: "AI amplifies a creator's capabilities. Those who use AI effectively will simply outpace those who rely only on traditional manual methods. People who learn the right AI skills become faster, more useful, and adaptable."
              },
              {
                q: "Are the AI trainings provided hands-on and practical?",
                a: "Yes. The curriculum focuses heavily on end-to-end project execution instead of random tool usage. The strongest AI skill stack is practical, cross-functional, and tied to true digital deployment."
              }
            ].map((faq, idx) => (
              <details 
                key={idx} 
                className="group rounded-2xl border border-slate-200 bg-white [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 font-bold text-slate-900">
                  <span className="text-lg">{faq.q}</span>
                  <span className="shrink-0 rounded-full bg-slate-50 p-1.5 text-slate-500 sm:p-3 group-open:bg-blue-50 group-open:text-blue-600 transition-colors">
                    <ChevronDown className="h-5 w-5 transition duration-300 group-open:-rotate-180" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

// Simple internal icon for summary cards
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
