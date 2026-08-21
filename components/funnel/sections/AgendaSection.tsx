import type { FunnelConfig } from "../../../lib/funnel/types";
import TrackedCta from "../TrackedCta";

const agendas = {
  chatgpt: [
    ["01", "Prompt Architecture", "Turn vague requests into structured instructions with context, constraints and output format."],
    ["02", "Research Workflow", "Move from scattered questions to a deliberate research process with reviewable summaries."],
    ["03", "Documents & Communication", "Use ChatGPT to shape briefs, notes, proposals and professional communication more systematically."],
    ["04", "Data & Productivity", "See how recurring digital work can become a repeatable AI-assisted workflow instead of a one-off chat."],
    ["05", "Build Your Reusable System", "Connect the ideas into a simple workflow you can adapt for study, work, freelance or business tasks."],
  ],
  claude: [
    ["01", "Deep Context Setup", "Learn how to frame complex work so Claude has the context, constraints and purpose it needs."],
    ["02", "Long-Document Analysis", "Break dense information into structured insights, questions, decisions and action points."],
    ["03", "Research & Synthesis", "Combine multiple considerations into a clearer, more deliberate analysis and writing workflow."],
    ["04", "Projects & Reusable Context", "Understand how persistent context can reduce repeated setup and improve consistency across work."],
    ["05", "Artifacts & Working Outputs", "See how an idea can move from text into a more usable structured or interactive result."],
  ],
} as const;

export default function AgendaSection({ config }: { config: FunnelConfig }) {
  const agenda = agendas[config.product];

  return (
    <section className="funnel-agenda-section">
      <div className="funnel-container">
        <div className="funnel-agenda-heading">
          <div>
            <span className="funnel-kicker">INSIDE THE LIVE MASTERCLASS</span>
            <h2>A guided journey from “I use AI” to “I know how to work with it.”</h2>
          </div>
          <p>
            The session is structured like a working lab: understand the method, watch it applied,
            then see how the same thinking transfers to your own tasks.
          </p>
        </div>

        <div className="funnel-agenda-layout">
          <div className="funnel-agenda-list">
            {agenda.map(([number, title, description]) => (
              <article key={number}>
                <div className="funnel-agenda-index">{number}</div>
                <div className="funnel-agenda-copy">
                  <small>LIVE MODULE</small>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <span className="funnel-agenda-status">LIVE</span>
              </article>
            ))}
          </div>

          <aside className="funnel-agenda-sidecard">
            <span className="funnel-kicker">SESSION FORMAT</span>
            <h3>Learn by seeing the workflow actually happen.</h3>
            <div className="funnel-agenda-sidegrid">
              <div><small>01</small><strong>Understand</strong><span>The principle behind the workflow.</span></div>
              <div><small>02</small><strong>Watch</strong><span>A practical live demonstration.</span></div>
              <div><small>03</small><strong>Adapt</strong><span>How to use the same method yourself.</span></div>
            </div>
            <TrackedCta config={config} location="agenda_section" label={config.offerMode === "free" ? "Reserve My Free Seat" : `Reserve My Seat for ₹${config.entryPrice}`} />
            <p className="funnel-agenda-note">{config.dateLabel} • {config.timeLabel} • {config.languageLabel}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
