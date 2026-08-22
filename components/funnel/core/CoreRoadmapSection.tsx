import type { FunnelConfig } from "../../../lib/funnel/types";

const roadmap = [
  ["Foundation", "AI operating principles, prompting frameworks and verification habits"],
  ["Research", "Source-driven research, synthesis, long documents and structured reasoning"],
  ["Productivity", "Documents, spreadsheets, office workflows and repeatable digital execution"],
  ["Content", "Professional writing, communication, planning and multi-format content workflows"],
  ["Creative AI", "Practical image, design, video and audio-assisted production workflows"],
  ["Automation", "No-code automation foundations, handoffs and simple repeatable systems"],
  ["Application", "Career, freelance, creator and business use cases with project-oriented practice"],
  ["Capstone", "End-to-end final implementation, review, portfolio packaging and next-step roadmap"],
] as const;

export default function CoreRoadmapSection({ config }: { config: FunnelConfig }) {
  return (
    <section className="core-section">
      <div className="core-section-head">
        <span className="core-kicker">STRUCTURED LEARNING ROADMAP</span>
        <h2>{config.coreProgramDuration}: from foundations to an end-to-end capstone.</h2>
        <p>
          The sequence is designed to build capability progressively. Exact session sequencing can evolve by cohort without changing the program's core outcome architecture.
        </p>
      </div>
      <div className="core-roadmap">
        {roadmap.map(([phase, title], index) => (
          <article key={phase}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <small>{phase}</small>
              <strong>{title}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
