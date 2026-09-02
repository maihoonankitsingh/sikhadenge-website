import styles from "../styles/claude-ai-video-proof.module.css";

type ProofCard = {
  brand: string;
  brandClass?: "serif" | "stacked" | "compact";
  stat: string;
  title: string;
  copy: string;
  source: string;
};

const jobsProof: readonly ProofCard[] = [
  {
    brand: "Goldman Sachs",
    brandClass: "serif",
    stat: "30 Crore",
    title: "full-time jobs exposed to AI automation",
    copy: "A major global estimate showing the scale of work that could be affected as generative AI is adopted.",
    source: "Goldman Sachs · Generative AI and the future of work",
  },
  {
    brand: "McKinsey & Company",
    brandClass: "serif",
    stat: "40 Crore",
    title: "workers could be displaced by automation",
    copy: "Global workforce scenarios show how automation can shift occupations and the skills people need to stay relevant.",
    source: "McKinsey Global Institute · Future of Work",
  },
  {
    brand: "WORLD ECONOMIC FORUM",
    brandClass: "stacked",
    stat: "9.2 Crore",
    title: "current jobs projected to be displaced by 2030",
    copy: "The Future of Jobs research also projects substantial job creation as technology changes the labour market.",
    source: "World Economic Forum · Future of Jobs Report 2025",
  },
] as const;

const skillsProof: readonly ProofCard[] = [
  {
    brand: "pwc",
    brandClass: "compact",
    stat: "+69%",
    title: "Jobs asking for AI skills are outpacing the broader job market.",
    copy: "PwC's global AI Jobs Barometer shows stronger growth in roles that explicitly require AI-related skills.",
    source: "PwC · Global AI Jobs Barometer",
  },
  {
    brand: "WORLD ECONOMIC FORUM",
    brandClass: "stacked",
    stat: "+78M",
    title: "The global job market is expected to create more roles than it loses.",
    copy: "The 2025 report projects 170M roles created and 92M displaced by 2030, for a net gain of 78M jobs.",
    source: "World Economic Forum · Future of Jobs Report 2025",
  },
  {
    brand: "servicenow",
    brandClass: "compact",
    stat: "10.35M",
    title: "India's workforce is moving toward AI-enabled roles.",
    copy: "India-focused workforce research points to millions of technology roles being reshaped as AI becomes part of everyday work.",
    source: "ServiceNow workforce research · India",
  },
] as const;

function ReportCard({ card, tone }: { card: ProofCard; tone: "orange" | "purple" }) {
  return (
    <article className={`${styles.reportCard} ${tone === "purple" ? styles.purpleCard : ""}`}>
      <span className={styles.tape} aria-hidden="true" />
      <div className={`${styles.brand} ${card.brandClass ? styles[card.brandClass] : ""}`}>{card.brand}</div>
      <div className={styles.rule} aria-hidden="true" />
      <strong className={styles.stat}>{card.stat}</strong>
      <h3>{card.title}</h3>
      <p>{card.copy}</p>
      <small>{card.source}</small>
      <span className={styles.paperNoise} aria-hidden="true" />
    </article>
  );
}

export default function ClaudeAiVideoProofSection({ registerHref }: { registerHref: string }) {
  return (
    <section className={styles.root} id="why" aria-label="AI jobs and AI skills research">
      <div className={styles.jobsSection}>
        <div className={styles.shell}>
          <span className={styles.eyebrow}>WORK, REIMAGINED</span>
          <h2 className={styles.title}>
            AI &amp; automation are reshaping <em>hundreds of millions of jobs.</em>
          </h2>
          <p className={styles.intro}>
            Major global research shows how quickly work is changing — and why learning to work with AI is becoming a practical skill, not an optional extra.
          </p>

          <div className={styles.reportGrid}>
            {jobsProof.map((card) => <ReportCard key={card.brand} card={card} tone="orange" />)}
          </div>

          <div className={styles.contextNote}>
            <span aria-hidden="true">i</span>
            <p>These are global estimates and scenarios, not guaranteed layoffs. Research also points to new job creation, with many existing roles expected to change rather than disappear completely.</p>
          </div>

          <div className={styles.opportunity}>
            The opportunity isn't to compete with AI. <strong>It's to learn how to direct it.</strong>
          </div>
        </div>
      </div>

      <div className={styles.skillsSection}>
        <div className={styles.shell}>
          <span className={styles.eyebrow}>LATEST AI SKILLS DATA</span>
          <h2 className={styles.title}>
            AI isn't only changing jobs. <em>It's increasing the value of AI skills.</em>
          </h2>
          <p className={styles.intro}>
            Recent global and India-focused research shows stronger demand for AI capability, higher skill premiums, and millions of tech jobs expected to be created or re-shaped.
          </p>

          <div className={styles.reportGrid}>
            {skillsProof.map((card) => <ReportCard key={card.brand} card={card} tone="purple" />)}
          </div>

          <div className={styles.opportunity}>
            The market isn't simply moving toward “AI jobs.” <strong>It's moving toward people who can work effectively with AI.</strong>
          </div>

          <div className={styles.actions}>
            <a href={registerHref}>Get My Free Seat <span>· 100% · Free</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
