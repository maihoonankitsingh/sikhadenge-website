// src/sections/Courses.tsx
const courses = [
  {
    title: "Graphic Design",
    desc: "Photoshop, Illustrator, InDesign + design foundations. Portfolio-focused.",
    tags: ["Ps", "Ai", "Id"],
    badge: "Most chosen",
  },
  {
    title: "Video Editing",
    desc: "Premiere Pro workflow, pacing, audio basics, real-world edit practice.",
    tags: ["Pr", "Au"],
    badge: "High demand",
  },
  {
    title: "Motion Graphics",
    desc: "After Effects fundamentals, motion principles, templates + real shots.",
    tags: ["Ae"],
    badge: "Career track",
  },
  {
    title: "AI Tools (Creative)",
    desc: "AI-assisted design & content workflows. Faster output, better iterations.",
    tags: ["ChatGPT", "Firefly"],
    badge: "New",
  },
  {
    title: "UI/UX Basics",
    desc: "Layout thinking, typography, components, and beginner product visuals.",
    tags: ["UI", "UX"],
    badge: "Starter",
  },
  {
    title: "All-in-One (4 Months)",
    desc: "Graphic + Video + Motion + AI Tools. One system, one outcome: portfolio.",
    tags: ["Ps", "Ai", "Id", "Pr", "Ae", "Au"],
    badge: "Flagship",
  },
];

function Card({
  title,
  desc,
  tags,
  badge,
}: {
  title: string;
  desc: string;
  tags: string[];
  badge: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {title}
          </h3>
          <span className="shrink-0 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] text-white/80">
            {badge}
          </span>
        </div>

        <p className="mt-2 text-sm leading-6 text-white/70">{desc}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/75"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-white/50">Live • Projects • Portfolio</span>
          <span className="text-xs text-white/70">View details →</span>
        </div>
      </div>
    </div>
  );
}

export default function Courses() {
  return (
    <section id="courses" className="relative mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">
            Courses
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Choose a track. Follow one system.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
            Structured live batches, real assignments, and portfolio outcomes.
            Same premium workflow across tracks.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <a
            href="#"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            All Courses
          </a>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <Card
            key={c.title}
            title={c.title}
            desc={c.desc}
            tags={c.tags}
            badge={c.badge}
          />
        ))}
      </div>
    </section>
  );
}
