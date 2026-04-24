import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Lightbulb, Rocket, Target, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Start an AI Career in India | Sikhadenge",
  description:
    "Learn how to start an AI career in India without confusion. Understand practical skills, tools, roadmap, and real opportunities in AI for students, freelancers, beginners, and working professionals with Sikhadenge.",
  alternates: {
    canonical: "https://sikhadenge.in/how-to-start-ai-career",
  },
};

export default function Page() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">

      <section className="border-b border-[#E4ECF7]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-semibold">
            How to start an AI career in India
          </h1>
          <p className="mt-6 text-lg text-[#47607F] max-w-3xl">
            Starting a career in AI does not require complex coding or advanced technical knowledge.
            What matters more is understanding practical AI skills, tools, and workflows that are used in real digital work.
          </p>

          <div className="mt-8 flex gap-4">
            <Link href="/gen-ai-masterclass" className="bg-[#2563EB] text-white px-6 py-3 rounded-full">
              Join Free Masterclass
            </Link>
            <Link href="/ai-skills" className="border px-6 py-3 rounded-full">
              Explore AI Skills
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold">Why AI career is growing fast</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            "AI is used in content, design, marketing, and business workflows",
            "Companies need faster execution with fewer resources",
            "AI increases productivity across almost every digital role",
          ].map((item) => (
            <div className="p-6 border rounded-xl bg-white">{item}</div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold">Step by step AI career roadmap</h2>

          <div className="grid md:grid-cols-5 gap-6 mt-10">
            {[
              "Understand AI skills",
              "Learn basic tools",
              "Practice workflows",
              "Build projects",
              "Start earning",
            ].map((step, i) => (
              <div key={i} className="p-6 border rounded-xl">
                <div className="text-blue-600 font-semibold">Step {i + 1}</div>
                <p className="mt-2">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold">Best AI career paths</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            "Create Content with AI Creator",
            "Design with AIer",
            "Edit Videos with AI Editor",
            "AI Freelancer",
            "Market with AI Specialist",
            "AI Expert",
          ].map((item) => (
            <div className="p-6 border rounded-xl bg-white">{item}</div>
          ))}
        </div>
      </section>

      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-semibold">
            Start your AI career in India with structured learning
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
