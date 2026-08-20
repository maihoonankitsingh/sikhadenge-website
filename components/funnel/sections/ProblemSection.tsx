import type { FunnelConfig } from "../../../lib/funnel/types";

const problems = [
  ["Random prompts", "One-off prompting makes quality inconsistent and difficult to repeat."],
  ["Tool overload", "Knowing more AI names does not automatically create better work."],
  ["No workflow", "Without a process, every task starts from zero again."],
  ["No implementation", "Watching tutorials is different from building a working method."],
] as const;

export default function ProblemSection({ config }: { config: FunnelConfig }) {
  return (
    <section className="funnel-section funnel-container">
      <div className="funnel-section-heading">
        <span className="funnel-kicker">WHY THIS MASTERCLASS</span>
        <h2>{config.problemTitle}</h2>
        <p>{config.problemDescription}</p>
      </div>

      <div className="funnel-problem-grid">
        {problems.map(([title, description], index) => (
          <article className="funnel-card" key={title}>
            <span className="funnel-card-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
