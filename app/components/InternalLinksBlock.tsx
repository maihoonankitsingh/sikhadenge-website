export const dynamic = "force-dynamic";
export const revalidate = 0;
import Link from "next/link";

const links = [
  {
    href: "/ai-skills-for-students",
    title: "AI Skills for Students",
    desc: "Best AI skills for students in 2026 for study, presentations, productivity and career readiness.",
  },
  {
    href: "/ai-skills-for-freelancers",
    title: "AI Skills for Freelancers",
    desc: "Learn practical AI skills for client work, design delivery, content, speed and workflow efficiency.",
  },
  {
    href: "/ai-skills-for-creators",
    title: "AI Skills for Creators",
    desc: "Use AI for content planning, hooks, scripts, thumbnails, reels and creator workflows.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "A practical roadmap of the most useful AI skills to learn in 2026.",
  },
  {
    href: "/ai-generalist",
    title: "What is an AI Expert?",
    desc: "Understand the AI Expert model, its meaning, skills and why it matters now.",
  },
];

export default function InternalLinksBlock() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-[#2563EB] font-semibold uppercase tracking-[0.16em] text-sm mb-3">
            AI GUIDES
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
            Explore More AI Learning Guides
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-[#475569] text-base md:text-lg leading-8">
            Learn how AI skills apply across students, freelancers, creators and modern digital work.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-[#0F172A]/10 bg-[#F8FAFC] p-6 transition-all hover:border-[#2563EB]/30 hover:bg-white hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
            >
              <h3 className="text-lg font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#475569]">
                {item.desc}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#2563EB]">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
