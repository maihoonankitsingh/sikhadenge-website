import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedNumber from "@/components/AnimatedNumber";
import {
  BrainCircuit,
  Briefcase,
  ChevronRight,
  Cpu,
  FastForward,
  Globe,
  GraduationCap,
  Layers,
  Lightbulb,
  MonitorPlay,
  Paintbrush,
  Rocket,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import type { Metadata } from "next";

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

function IconBadge({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "gold";
}) {
  const ring =
    tone === "gold"
      ? "shadow-[0_0_12px_rgba(245,179,1,0.35)]"
      : "shadow-[0_0_12px_rgba(37,99,235,0.35)]";

  return (
    <span
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-full aspect-square shrink-0 bg-[#111827] border border-white/5",
        ring,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/5 bg-[#111827] px-3 py-1 text-xs font-medium tracking-wide text-[#B0B7C3]">
      {children}
    </span>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/5 bg-[#111827]/80 backdrop-blur-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function AiExpertPage() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <style>{`
        @keyframes sdFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        .sd-float { animation: sdFloat 4s ease-in-out infinite; }
      `}</style>

      <div className="pt-24 pb-20">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          
          <header className="text-center mb-12">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
              How to Become an AI Expert: Top Skills, Tools & Real-World Workflows
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-sm sm:text-base leading-7 text-[#B0B7C3]">
              AI is a practical tool for modern creatives to build faster and deliver higher-quality work. An AI expert uses intelligent workflows to execute professional-grade output in a fraction of the time.
            </p>
          </header>

          <Card className="p-4 sm:p-6 mb-16">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
              <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#0B1220]">
                <div className="absolute left-4 top-4 z-10">
                  <Pill>AI WORKFLOWS</Pill>
                </div>
                <div className="relative aspect-[16/11] w-full bg-[#111827]">
                  <Image
                    src="/images/courses/ai-mastery-design-editing-cover.webp"
                    alt="AI Expert Workflows"
                    fill
                    priority
                    className="object-cover opacity-90 mix-blend-overlay"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-2xl border border-white/5 bg-[#111827]/80 backdrop-blur-md p-4">
                    <div className="flex items-start gap-3">
                      <IconBadge tone="gold">
                        <Cpu className="h-5 w-5 text-[#F5B301]" />
                      </IconBadge>
                      <div>
                        <div className="text-sm font-semibold">Scaling Output Safely</div>
                        <div className="mt-1 text-xs leading-5 text-[#B0B7C3]">
                          Turning manual tasks into streamlined executions using structured prompt logic.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center px-2 sm:px-6">
                <h2 className="text-3xl font-extrabold leading-tight text-white mb-2">
                  What Exactly is an AI Expert?
                </h2>
                <h3 className="text-base font-semibold text-[#F5B301] mb-4">
                  From Prompting to Professional Production
                </h3>
                <p className="text-sm leading-7 text-[#B0B7C3] mb-6">
                  Knowing how to write a prompt is just the beginning. True AI experts solve real design and business problems reliably. They understand how to chain multiple models together to meet strict deadlines. They use{" "}
                  <Link href="/course/ai-mastery-design-editing" className="text-blue-400 hover:text-blue-300 underline">
                    mastering AI for design and workflow optimization
                  </Link>{" "}
                  to improve their overall capacity.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Pill>Prompt Logic</Pill>
                  <Pill>Automation Pipeline</Pill>
                  <Pill>Creative Execution</Pill>
                </div>
              </div>
            </div>
          </Card>

          <div className="mb-16">
            <div className="flex justify-between items-end mb-6 px-2">
              <h2 className="text-2xl font-bold text-white">Why AI Skills Are a Practical Advantage</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Efficient Speed", desc: "Cut content delivery turnaround time down by up to 70%.", icon: FastForward, tone: "blue" as const },
                { title: "Reliable Scale", desc: "Outputting professional work at high volume independently.", icon: Layers, tone: "gold" as const },
                { title: "Industry Demand", desc: "Agencies actively hire individuals who optimize workflows.", icon: Globe, tone: "blue" as const },
                { title: "Precision Tuning", desc: "Executing highly specific and commercially viable outcomes.", icon: Target, tone: "gold" as const },
              ].map((c) => (
                <Card key={c.title} className="p-5 flex flex-col items-start gap-4 hover:border-white/10 transition-colors">
                  <IconBadge tone={c.tone}>
                    <c.icon className={["h-5 w-5", c.tone === "gold" ? "text-[#F5B301]" : "text-[#2563EB]"].join(" ")} />
                  </IconBadge>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">{c.title}</h3>
                    <p className="text-xs leading-5 text-[#B0B7C3]">{c.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-5 px-2 text-sm text-[#B0B7C3]">
              Modern businesses rely on <Link href="/companies" className="text-blue-400 hover:text-blue-300 underline">tech capabilities trusted by industry leaders</Link> to reduce overhead and enhance visual quality dynamically.
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white">What Skills Should an AI Expert Master?</h2>
            <p className="mt-3 text-sm text-[#B0B7C3]">The core capabilities required to build modern creative systems.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mb-16">
            {[
              { title: "Generative Visual Systems", desc: "Architecting visual rules using Midjourney, Stable Diffusion, and Adobe Firefly for strict brand adherence.", icon: Paintbrush, tone: "blue" as const, linkText: "AI-powered graphic design techniques", link: "/course/ai-powered-graphic-design" },
              { title: "Video Post-Production", desc: "Utilizing deep learning models for intelligent upscaling, generative b-roll, audio enhancement, and timeline automation.", icon: MonitorPlay, tone: "gold" as const, linkText: "AI video editing integration", link: "/course/ai-powered-video-editing" },
              { title: "Strategic Prompt Engineering", desc: "Using advanced logic structures to instruct Large Language Models (LLMs) to output highly nuanced, professional copy.", icon: BrainCircuit, tone: "blue" as const, linkText: "Mastering core AI commands", link: "/course/ai-mastery-design-editing" },
              { title: "Motion & Animation Frameworks", desc: "Merging AI outputs with traditional keyframe engines to rapidly produce complex visual movement.", icon: Sparkles, tone: "gold" as const, linkText: "Advanced motion graphics", link: "" },
            ].map((s) => (
              <Card key={s.title} className="p-6 flex items-start gap-4">
                <IconBadge tone={s.tone}>
                  <s.icon className={["h-5 w-5", s.tone === "gold" ? "text-[#F5B301]" : "text-[#2563EB]"].join(" ")} />
                </IconBadge>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-sm leading-6 text-[#B0B7C3] mb-3">{s.desc}</p>
                  {s.link ? (
                    <Link href={s.link} className="text-xs font-semibold text-[#2563EB] hover:text-blue-400">
                      Explore {s.linkText} →
                    </Link>
                  ) : (
                    <span className="text-xs font-semibold text-[#B0B7C3]">
                      Focus on {s.linkText}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 lg:p-8 mb-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <IconBadge tone="blue">
                    <Rocket className="h-5 w-5 text-[#2563EB]" />
                  </IconBadge>
                  <h2 className="text-2xl font-bold text-white">Where AI Strategy Meets Real Work</h2>
                </div>
                <p className="text-sm leading-7 text-[#B0B7C3] mb-4">
                  Knowing the theory isn't enough; true deployment matters. In the real world, an AI expert creates automated color grading workflows, builds rapid brand prototypes for agencies, and generates scalable visual assets for <Link href="/companies" className="text-[#2563EB] hover:underline font-medium">brand leaders</Link>.
                </p>
                <p className="text-sm leading-7 text-[#B0B7C3]">
                  These systemic workflows allow individual creatives to independently combine artificial intelligence with advanced motion graphics to achieve professional agency-level quality.
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-[#0B1220]/50 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Essential Tool Chain Sequence:</h3>
                <ul className="space-y-4">
                  {[
                    "ChatGPT & Claude (Ideation & Logic)",
                    "Midjourney & DALL-E 3 (Visual Generation)",
                    "Adobe Firefly (Integrated Assets)",
                    "Runway & Topaz (Scaling & Video)"
                  ].map((tool) => (
                    <li key={tool} className="flex items-center gap-3">
                      <ChevronRight className="h-4 w-4 text-[#F5B301]" />
                      <span className="text-sm font-medium text-[#B0B7C3]">{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white text-center mb-8">How Professionals Harness Expertise</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { group: "Students", role: "Cross the entry-level gap by walking into job interviews armed with highly relevant tech capabilities.", icon: GraduationCap },
                { group: "Freelancers", role: "Increase client output volume reliably without compromising your creative baseline.", icon: Briefcase },
                { group: "Creators", role: "Scale multi-platform content creation and automate standard editing timelines easily.", icon: MonitorPlay },
                { group: "Working Professionals", role: "Automate corporate workflows, analyze creative data accurately, and boost personal productivity.", icon: Layers },
                { group: "Business Owners", role: "Reduce operational bottlenecks by bringing common creative productions directly in-house.", icon: BrainCircuit },
              ].map((usr) => (
                <Card key={usr.group} className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <usr.icon className="h-5 w-5 text-[#F5B301]" />
                    <h3 className="text-base font-bold text-white">{usr.group}</h3>
                  </div>
                  <p className="text-sm leading-6 text-[#B0B7C3]">{usr.role}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16 overflow-hidden rounded-2xl border border-[#2563EB]/20 bg-[#2563EB]/10">
            <div className="grid md:grid-cols-3">
              <div className="px-6 py-8 text-center border-b md:border-b-0 md:border-r border-[#2563EB]/20">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB]/20 mb-4 sd-float">
                  <Lightbulb className="h-5 w-5 text-[#2563EB]" />
                </div>
                <div className="text-3xl font-extrabold text-white">
                  <AnimatedNumber value={100} suffix="%" durationMs={900} decimals={0} />
                </div>
                <div className="mt-2 text-xs font-semibold tracking-wider text-[#2563EB]">PRACTICAL EXECUTION</div>
              </div>
              <div className="px-6 py-8 text-center border-b md:border-b-0 md:border-r border-[#2563EB]/20">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB]/20 mb-4 sd-float">
                  <Target className="h-5 w-5 text-[#2563EB]" />
                </div>
                <div className="text-3xl font-extrabold text-white">
                  <AnimatedNumber value={10} suffix="X" durationMs={900} decimals={0} />
                </div>
                <div className="mt-2 text-xs font-semibold tracking-wider text-[#2563EB]">SPEED & SCALE</div>
              </div>
              <div className="px-6 py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB]/20 mb-4 sd-float">
                  <Wand2 className="h-5 w-5 text-[#2563EB]" />
                </div>
                <div className="text-xl font-extrabold text-white mt-2 mb-[3px]">
                  MENTOR LED
                </div>
                <div className="mt-2 text-xs font-semibold tracking-wider text-[#2563EB]">PORTFOLIO REVIEW</div>
              </div>
            </div>
            <div className="bg-[#111827] p-4 text-center text-sm border-t border-[#2563EB]/20">
              <span className="text-[#B0B7C3]">Sikhadenge ensures success through practical</span>{" "}
              <Link href="/courses" className="text-white font-semibold hover:text-[#2563EB] transition-colors">structured courses</Link>
              {" "}<span className="text-[#B0B7C3]">supported by</span>{" "}
              <Link href="/about-us" className="text-white font-semibold hover:text-[#2563EB] transition-colors">mentor-led workflow reviews.</Link>
            </div>
          </div>

          <div className="max-w-4xl mx-auto border-t border-white/5 pt-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Do I need an advanced coding background to become an AI Expert?",
                  a: "No. Modern AI expertise in creative and marketing fields relies heavily on workflow structuring, tool chaining, and prompt logic rather than traditional software development."
                },
                {
                  q: "What industries are actively searching for AI Experts?",
                  a: "Digital marketing agencies, video production houses, and e-commerce brands actively look for AI-skilled talent to scale their output efficiently."
                },
                {
                  q: "Will generative AI tools simply replace creative freelancers?",
                  a: "AI amplifies a creator's capabilities. Those who use AI effectively will simply outpace those who rely only on traditional manual methods."
                },
                {
                  q: "Are the AI trainings provided hands-on and practical?",
                  a: "Yes. The curriculum focuses heavily on end-to-end project execution followed by direct mentor feedback cycles to ensure your output looks genuinely professional."
                }
              ].map((faq, idx) => (
                <Card key={idx} className="p-5">
                  <h3 className="text-base font-bold text-white mb-2">{faq.q}</h3>
                  <p className="text-sm leading-6 text-[#B0B7C3]">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mt-14 text-center text-sm">
             <span className="text-[#B0B7C3]">Require tailored workflow training for your team? Request dedicated corporate AI training.</span>
          </div>

        </div>
      </div>
    </main>
  );
}
