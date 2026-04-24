import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Lightbulb, Rocket, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Productivity Tools | Sikhadenge",
  description:
    "Discover the best AI productivity tools to improve work speed, efficiency, and output quality. Learn how AI tools help in content, planning, workflows, and digital execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-productivity-tools",
  },
};

const relatedLinks = [
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-skills", label: "AI Skills" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/ai-productivity-workflows", label: "AI Productivity Workflows" },
  { href: "/ai-automation-workflows", label: "AI Automation Workflows" },
  { href: "/ai-business-workflows", label: "AI Business Workflows" },
  { href: "/ai-skills-for-business", label: "AI Skills for Business" },
  { href: "/site-map", label: "HTML Sitemap" },
];

export default function Page() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-semibold">
            AI productivity tools
          </h1>
          <p className="mt-6 text-lg text-[#47607F] max-w-3xl">
            AI productivity tools help individuals and teams complete tasks faster, reduce manual effort,
            and improve output quality. These tools are widely used in content creation, planning,
            communication, and workflow management.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link href="/gen-ai-masterclass" className="bg-[#2563EB] text-white px-6 py-3 rounded-full">
              Join Free Masterclass
            </Link>
            <Link href="/ai-tools" className="border px-6 py-3 rounded-full">
              Explore AI Tools
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold">Why AI productivity tools matter</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            "Reduce time spent on repetitive tasks",
            "Improve speed of execution",
            "Help manage workflows and planning",
          ].map((item) => (
            <div key={item} className="p-6 border rounded-xl bg-white">{item}</div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold">Best AI productivity tools categories</h2>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              "AI writing and assistant tools",
              "AI note-taking tools",
              "AI planning and task tools",
              "AI automation tools",
              "AI research tools",
              "AI workflow tools",
            ].map((tool) => (
              <div key={tool} className="p-6 border rounded-xl bg-white">{tool}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold">How AI improves productivity</h2>

        <div className="grid md:grid-cols-4 gap-6 mt-10">
          {[
            "Faster content creation",
            "Better organization",
            "Reduced manual effort",
            "Improved decision-making",
          ].map((item) => (
            <div key={item} className="p-6 border rounded-xl bg-white">{item}</div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold">How to use AI productivity tools</h2>

          <div className="grid md:grid-cols-5 gap-6 mt-10">
            {[
              "Identify repetitive tasks",
              "Choose relevant tools",
              "Integrate into workflow",
              "Automate processes",
              "Improve continuously",
            ].map((step, i) => (
              <div key={i} className="p-6 border rounded-xl bg-white">
                <div className="text-blue-600 font-semibold">Step {i + 1}</div>
                <p className="mt-2">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold">Explore connected AI pages</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          {relatedLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between rounded-2xl border border-[#D8E5F4] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.03)] transition hover:border-[#BFD4F3]"
            >
              <span className="font-semibold text-[#071533]">{item.label}</span>
              <ArrowRight className="h-4 w-4 text-[#2563EB] transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-semibold">
            Boost your productivity using AI
          </h2>

          <Link
            href="/gen-ai-masterclass"
            className="inline-block mt-6 bg-[#2563EB] text-white px-8 py-3 rounded-full"
          >
            Join Free AI Masterclass
          </Link>
        </div>
      </section>
    </main>
  );
}
