import type { FunnelConfig } from "../../../lib/funnel/types";

const transformations = {
  chatgpt: {
    before: ["Starting every task with a blank chat", "Long prompts with inconsistent output", "Research spread across many tabs", "Repeating the same instructions again and again"],
    after: ["A clear context → method → output workflow", "Reusable prompt structures for recurring work", "Research organized into reviewable steps", "A repeatable way to move from task to usable output"],
    focus: "ChatGPT becomes more useful when the workflow around it is structured.",
  },
  claude: {
    before: ["Dropping long documents into a chat without a plan", "Losing structure across complex research", "Re-explaining context for every long-form task", "Treating artifacts and projects as isolated features"],
    after: ["A deliberate deep-context workflow", "Structured extraction, synthesis and decision paths", "Reusable project context for consistent work", "A clearer path from source material to working output"],
    focus: "Claude becomes more useful when deep work is organized before the answer is generated.",
  },
} as const;

export default function TransformationSection({ config }: { config: FunnelConfig }) {
  const content = transformations[config.product];

  return (
    <section className="funnel-transformation-section">
      <div className="funnel-container">
        <div className="funnel-transformation-heading">
          <span className="funnel-kicker">THE REAL TRANSFORMATION</span>
          <h2>The goal is not “more AI.” The goal is a better way of working.</h2>
          <p>{content.focus}</p>
        </div>

        <div className="funnel-transformation-board">
          <article className="funnel-transformation-column is-before">
            <div className="funnel-transformation-label"><span>BEFORE</span><strong>Unstructured AI use</strong></div>
            <div className="funnel-transformation-list">
              {content.before.map((item, index) => (
                <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>
              ))}
            </div>
          </article>

          <div className="funnel-transformation-arrow" aria-hidden="true">
            <span>→</span>
            <small>LIVE MASTERCLASS</small>
          </div>

          <article className="funnel-transformation-column is-after">
            <div className="funnel-transformation-label"><span>AFTER</span><strong>Workflow-first AI use</strong></div>
            <div className="funnel-transformation-list">
              {content.after.map((item, index) => (
                <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
