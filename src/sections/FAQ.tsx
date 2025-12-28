const FAQS = [
  {
    q: "Is this beginner friendly?",
    a: "Yes. The system starts from foundations and ramps up with projects.",
  },
  {
    q: "Do I need a laptop?",
    a: "Yes. Practical work needs a laptop/PC for software-based training.",
  },
  {
    q: "Is it live or recorded?",
    a: "Live classes with structured assignments and mentor feedback.",
  },
  {
    q: "What will I get at the end?",
    a: "A clean portfolio set: design + video + motion projects and case studies.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="flex flex-col gap-3">
        <div className="text-xs text-white/60">FAQ</div>
        <h2 className="text-2xl font-semibold md:text-3xl">
          Quick answers
        </h2>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {FAQS.map((f) => (
          <div
            key={f.q}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="text-base font-semibold">{f.q}</div>
            <div className="mt-2 text-sm leading-6 text-white/70">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
