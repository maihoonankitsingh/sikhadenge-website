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
    number: "01",
    title: "Claude Workflow Playbook",
    description: "A clear framework for research, writing, analysis and repeatable professional work.",
    icon: <PlaybookIcon />,
    preview: "playbook",
  },
  {
    number: "02",
    title: "Prompt + Context Framework",
    description: "A reusable structure for giving Claude better context and producing clearer, reviewable output.",
    icon: <FrameworkIcon />,
    preview: "framework",
  },
  {
    number: "03",
    title: "Workbook + Deep-Work Checklist",
    description: "A working reference and practical checklist for deliberate, repeatable Claude workflows.",
    icon: <WorkbookIcon />,
    preview: "workbook",
  },
] as const;

function ResourcePreview({ variant }: { variant: (typeof bonuses)[number]["preview"] }) {
  return (
    <div className={`${styles.preview} ${styles[variant]}`} aria-hidden="true">
      <div className={styles.previewChrome}><i /><i /><i /></div>
      <div className={styles.previewCanvas}>
        <span className={styles.previewLead} />
        <span className={styles.previewLine} />
        <span className={styles.previewLine} />
        <span className={styles.previewLine} />
        <div className={styles.previewTokens}><b /><b /><b /></div>
      </div>
    </div>
  );
}

export default function ClaudeBonusSection({ registerHref }: ClaudeBonusSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="claude-bonus-title">
      <div className={styles.container}>
        <div className={styles.shell}>
          <div className={styles.offerBar}>
            <div className={styles.offerCopy}>
              <span>FREE MASTERCLASS BONUS KIT</span>
              <strong>Register for the live Claude masterclass and get these practical learning resources included.</strong>
            </div>
            <div className={styles.offerBadge}>INCLUDED FREE</div>
          </div>

          <header className={styles.header}>
            <div className={styles.headerCopy}>
              <span className={styles.eyebrow}>YOUR TAKE-HOME TOOLKIT</span>
              <h2 id="claude-bonus-title">Learn live. <em>Keep the workflow.</em></h2>
              <p>Three practical resources that turn the live session into a repeatable system you can use after the masterclass.</p>
            </div>
            <aside className={styles.headerMeta} aria-label="Three practical take-home resources included with your live seat">
              <span>INCLUDED WITH YOUR LIVE SEAT</span>
              <strong>03</strong>
              <small>practical take-home resources</small>
            </aside>
          </header>

          <div className={styles.grid}>
            {bonuses.map((bonus) => (
              <article className={styles.card} key={bonus.number}>
                <div className={styles.cardTop}>
                  <span className={styles.bonusLabel}>Bonus {bonus.number}</span>
                  <span className={styles.freeLabel}>FREE</span>
                </div>

                <div className={styles.cardVisual}>
                  <div className={styles.icon}>{bonus.icon}</div>
                  <ResourcePreview variant={bonus.preview} />
                </div>

                <div className={styles.cardCopy}>
                  <h3>{bonus.title}</h3>
                  <p>{bonus.description}</p>
                </div>

                <div className={styles.included}><span aria-hidden="true">✓</span> Included with your free live seat</div>
              </article>
            ))}
          </div>

          <div className={styles.bottomBar}>
            <div className={styles.bottomCopy}>
              <span className={styles.check} aria-hidden="true">✓</span>
              <div>
                <strong>One live session. A practical system you can reuse.</strong>
                <small>Research · Writing · Analysis · Professional workflows</small>
              </div>
            </div>

            <a className={styles.cta} href={registerHref}>
              <span>Reserve My Free Seat</span>
              <span className={styles.ctaArrow} aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M5 12h13M14 7l5 5-5 5" /></svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
