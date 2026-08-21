const outcomes = [
  ["01", "Prompt Systems", "Design reusable instructions, role/context patterns and output structures instead of depending on random prompts."],
  ["02", "Research & Knowledge Work", "Turn broad questions, sources and documents into structured research, synthesis and decision-ready outputs."],
  ["03", "Documents, Data & Productivity", "Use AI across professional documents, spreadsheets, analysis and repeatable day-to-day digital work."],
  ["04", "Content & Communication", "Build practical workflows for professional writing, content planning, communication and presentation-ready output."],
  ["05", "Creative AI Workflows", "Understand practical image, design, video and audio workflows without making the course dependent on one vendor."],
  ["06", "Automation Foundations", "Connect repeat tasks into simple automation and no-code workflows while understanding where human review remains necessary."],
  ["07", "Career & Business Application", "Translate AI capability into portfolio, freelance, workplace and business execution instead of collecting certificates alone."],
  ["08", "Capstone & Responsible Execution", "Combine the system into a reviewable final project with responsible use, verification and quality-control habits."],
] as const;

export default function CoreOutcomesSection() {
  return (
    <section className="core-section core-section-light">
      <div className="core-section-head">
        <span className="core-kicker">WHAT CHANGES AT THE CORE PROGRAM LEVEL</span>
        <h2>One tool gave you implementation practice. The program builds transferable AI capability.</h2>
        <p>
          The objective is not to memorize more product menus. It is to develop repeatable working methods that survive tool changes.
        </p>
      </div>
      <div className="core-outcome-grid">
        {outcomes.map(([index, title, description]) => (
          <article key={index}>
            <span>{index}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
