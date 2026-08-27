import styles from "../styles/claude-bonus-section.module.css";

type ClaudeBonusSectionProps = {
  registerHref: string;
};

function PlaybookIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M12 7h20a5 5 0 0 1 5 5v29H16a5 5 0 0 1-5-5V8a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
      <path d="M16 33h21M18 16h13M18 22h10" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

function FrameworkIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="7" y="8" width="34" height="32" rx="6" fill="none" stroke="currentColor" strokeWidth="2.3" />
      <path d="M14 17h20M14 24h8M26 24h8M14 31h13" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      <circle cx="33" cy="31" r="3" fill="currentColor" />
    </svg>
  );
}

function WorkbookIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M11 7h21l6 6v28H11V7Z" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
      <path d="M32 7v8h6M17 21h14M17 27h14" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      <path d="m18 35 2.5 2.5L26 32" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const bonuses = [
  {
    title: "Claude Workflow Playbook",
    description: "A repeatable Claude workflow.",
    icon: <PlaybookIcon />,
  },
  {
    title: "Prompt + Context Framework",
    description: "Clearer prompts with better context.",
    icon: <FrameworkIcon />,
  },
  {
    title: "Workbook + Deep-Work Checklist",
    description: "A simple guide for focused work.",
    icon: <WorkbookIcon />,
  },
] as const;

export default function ClaudeBonusSection({ registerHref }: ClaudeBonusSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="claude-bonus-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>FREE BONUS KIT</span>
          <h2 id="claude-bonus-title">Keep the workflow.</h2>
          <p>3 practical resources included with your free seat.</p>
        </header>

        <div className={styles.grid}>
          {bonuses.map((bonus) => (
            <article className={styles.card} key={bonus.title}>
              <div className={styles.icon}>{bonus.icon}</div>
              <h3>{bonus.title}</h3>
              <p>{bonus.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.action}>
          <a className={styles.cta} href={registerHref}>
            Reserve My Free Seat
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
