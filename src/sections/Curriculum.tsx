const MODULES = [
  {
    title: "Design Foundations",
    items: ["Color, typography, layout", "Branding basics", "Export standards"],
  },
  {
    title: "Graphic Design Stack",
    items: ["Photoshop", "Illustrator", "InDesign", "Mockups + presentations"],
  },
  {
    title: "Video Editing Stack",
    items: ["Premiere Pro", "Audio cleanup", "Reels + YouTube workflows"],
  },
  {
    title: "Motion Stack",
    items: ["After Effects", "Motion principles", "Templates + assets"],
  },
  {
    title: "AI Tools",
    items: ["Idea generation", "Design speed-up", "Production workflows"],
  },
  {
    title: "Portfolio + Work Ready",
    items: ["Case studies", "Client-style briefs", "Delivery checklists"],
  },
];

export default function Curriculum() {
  return (
    <section id="curriculum" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs text-white/60">Curriculum</div>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              Clear modules. Clear output.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
              This is a structured skill pipeline — not random tutorials.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              Get Fee + Batch Details
            </a>
            <a
              href="#faq"
              className="hidden items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 md:inline-flex"
            >
              Read FAQ
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <div
              key={m.title}
              className="rounded-3xl border border-white/10 bg-black/30 p-5"
            >
              <div className="text-base font-semibold">{m.title}</div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {m.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/50" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
