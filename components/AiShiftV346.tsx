import styles from "../styles/claude-ai-shift-v346.module.css";

type AiShiftV346Props = {
  registerHref: string;
};

const capabilityCards = [
  {
    number: "01",
    title: "Research Faster",
    body: "Analyze documents, reports and information at AI speed with deep insights.",
    tag: "RESEARCH • ANALYSIS",
    icon: "research",
  },
  {
    number: "02",
    title: "Create Better Output",
    body: "Transform ideas into professional writing, plans and business output.",
    tag: "WRITING • STRATEGY",
    icon: "write",
  },
  {
    number: "03",
    title: "Automate Repetitive Work",
    body: "Reduce manual tasks and build smarter productivity systems.",
    tag: "AUTOMATION • PRODUCTIVITY",
    icon: "automation",
  },
] as const;

const metrics = [
  {
    eyebrow: "AI MARKET GROWTH",
    value: "300M",
    body: "jobs globally exposed to generative AI",
    source: "Source: Goldman Sachs Research",
    art: "globe",
  },
  {
    eyebrow: "WORKFORCE IMPACT",
    value: "75M–375M",
    body: "workers may need to switch occupational categories by 2030",
    source: "Source: McKinsey Global Institute",
    art: "bars",
  },
  {
    eyebrow: "WORLD ECONOMIC FORUM",
    value: "83M",
    body: "jobs displaced, 69M created by 2027",
    source: "Source: WEF Future of Jobs Report 2023",
    art: "orbit",
  },
] as const;

const opportunityNews = [
  {
    brand: "BUSINESS DAILY",
    date: "May 14, 2024",
    title: "AI Prompt Engineers Earn $300k Salaries: Here’s To Learn The Skill For Free",
    body: "Companies are paying top dollar for AI-savvy professionals to optimize AI tools and results.",
  },
  {
    brand: "CAREER INSIGHTS",
    date: "April 25, 2024",
    title: "69 million jobs to emerge in the next five years — and AI could play a key role",
    body: "AI is expected to create new industries, transforming work across functions.",
  },
  {
    brand: "FUTURE OF WORK",
    date: "June 5, 2024",
    title: "AI-related roles saw unprecedented growth across industries",
    body: "Explore roles now hiring for AI skills at a pace never seen before.",
  },
] as const;

const pressureNews = [
  {
    brand: "TECH SENTINEL",
    date: "March 18, 2024",
    title: "Stability AI (CEO) says most Italian developers will lose jobs within 2 years. AI to make outsourcing redundant",
    body: "AI will reinvent repetitive services IT industry models and operations.",
  },
  {
    brand: "MARKET WATCH",
    date: "Feb 21, 2024",
    title: "JP Morgan analysts report wave of impacts on Indian IT industry as AI models like ChatGPT disrupt market",
    body: "AI is reshaping business models and raising the bar for knowledge work everywhere.",
  },
  {
    brand: "ENTERPRISE TODAY",
    date: "Jan 11, 2024",
    title: "Bersaluna-based CEO claims to have cut 90% staff by integrating AI and automation",
    body: "AI-first enterprises are achieving more with leaner teams.",
  },
] as const;

function CapabilityIcon({ kind }: { kind: (typeof capabilityCards)[number]["icon"] }) {
  if (kind === "research") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="20" cy="20" r="9" />
        <path d="m27 27 10 10" />
        <text x="20" y="23" textAnchor="middle">AI</text>
      </svg>
    );
  }

  if (kind === "write") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M12 34h22" />
        <path d="m14 30 4-10 14-14 6 6-14 14-10 4Z" />
        <path d="m28 10 6 6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="8" />
      <path d="M24 7v5M24 36v5M7 24h5M36 24h5M12 12l4 4M32 32l4 4M36 12l-4 4M16 32l-4 4" />
      <circle cx="24" cy="24" r="16" />
    </svg>
  );
}

function MetricArt({ kind }: { kind: (typeof metrics)[number]["art"] }) {
  if (kind === "bars") {
    return (
      <div className={`${styles.metricArt} ${styles.metricBars}`} aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i />
      </div>
    );
  }

  if (kind === "globe") {
    return (
      <div className={`${styles.metricArt} ${styles.metricGlobe}`} aria-hidden="true">
        <span className={styles.globeRingA} />
        <span className={styles.globeRingB} />
        <span className={styles.globeRingC} />
      </div>
    );
  }

  return (
    <div className={`${styles.metricArt} ${styles.metricOrbit}`} aria-hidden="true">
      <span /><span /><span />
    </div>
  );
}

function NewsCard({ item }: { item: (typeof opportunityNews)[number] | (typeof pressureNews)[number] }) {
  return (
    <article className={styles.newsCard}>
      <div className={styles.newsMeta}>
        <strong>{item.brand}</strong>
        <span>{item.date}</span>
      </div>
      <h4>{item.title}</h4>
      <p>{item.body}</p>
      <span className={styles.newsArrow} aria-hidden="true">↗</span>
    </article>
  );
}

function CircuitBackground() {
  return (
    <svg className={styles.circuit} viewBox="0 0 1400 1035" preserveAspectRatio="none" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity=".34">
        <path d="M0 160 H74 L122 112 H224 L267 69" />
        <path d="M0 205 H58 L96 168 H159 L190 197 H278" />
        <path d="M26 239 H132" />
        <circle cx="74" cy="160" r="6" />
        <circle cx="224" cy="112" r="3" />
        <circle cx="159" cy="168" r="3" />
        <circle cx="132" cy="239" r="3" />
        <path d="M1400 74 H1345 L1316 103 H1220" />
        <path d="M1400 133 H1329 L1291 171 H1211" />
        <path d="M1400 206 H1330 L1300 236" />
        <circle cx="1316" cy="103" r="6" />
        <circle cx="1220" cy="103" r="3" />
        <circle cx="1211" cy="171" r="3" />
        <circle cx="700" cy="140" r="342" opacity=".36" />
        <circle cx="700" cy="140" r="315" opacity=".24" />
      </g>
      <g fill="currentColor" opacity=".16">
        {[28, 39, 50, 61, 72].flatMap((x) => [25, 36, 47].map((y) => <circle key={`l-${x}-${y}`} cx={x} cy={y} r="1.3" />))}
        {[1260, 1271, 1282, 1293, 1304].flatMap((x) => [168, 179, 190].map((y) => <circle key={`r-${x}-${y}`} cx={x} cy={y} r="1.3" />))}
      </g>
    </svg>
  );
}

export default function AiShiftV346({ registerHref }: AiShiftV346Props) {
  return (
    <section className={styles.section} aria-labelledby="ai-shift-title" data-ai-shift-version="v346-source">
      <div className={styles.shell}>
        <CircuitBackground />

        <header className={styles.phase1} data-ai-shift-phase="1">
          <div className={styles.badge}>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5 12 8l6.5 2-6.5 2-2 6.5L8 12l-6.5-2L8 8l2-6.5Z" /></svg>
            <span>THE AI SHIFT</span>
          </div>
          <h2 id="ai-shift-title" className={styles.title}>
            AI is changing the way <span>professionals</span> work.
          </h2>
          <p className={styles.subtitle}>
            From research to execution, AI-powered workflows are helping professionals move faster, think bigger, and create more impact than ever before.
          </p>
        </header>

        <div className={styles.phase2} data-ai-shift-phase="2">
          {capabilityCards.map((card) => (
            <article className={styles.capability} key={card.number}>
              <div className={styles.capabilityIcon}><CapabilityIcon kind={card.icon} /></div>
              <div className={styles.capabilityNumber}>{card.number}</div>
              <div className={styles.capabilityBody}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <span>{card.tag}</span>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.phase3} data-ai-shift-phase="3">
          <div className={styles.signalLabel}>
            <span className={styles.signalShield}>◇</span>
            <strong>INDUSTRY SIGNAL</strong>
          </div>
          <span className={styles.signalDivider} />
          <span className={styles.signalLead}>Trusted research. Global perspective.</span>
          <div className={styles.signalSources}>
            <span>Goldman Sachs</span><i />
            <span>McKinsey</span><i />
            <span>World Economic Forum</span><i />
            <span>Microsoft</span><i />
            <span>LinkedIn</span>
          </div>
        </div>

        <div className={styles.phase4} data-ai-shift-phase="4">
          {metrics.map((metric) => (
            <article className={styles.metricCard} key={metric.value}>
              <div className={styles.metricCopy}>
                <span className={styles.metricEyebrow}>{metric.eyebrow}</span>
                <strong>{metric.value}</strong>
                <p>{metric.body}</p>
                <small>{metric.source}</small>
              </div>
              <MetricArt kind={metric.art} />
            </article>
          ))}
        </div>

        <div className={styles.phase5} data-ai-shift-phase="5">
          <div className={styles.newsRow}>
            <article className={styles.newsLeadCard}>
              <div className={styles.newsLeadIcon}>◎</div>
              <h3>Rise in<br />AI-related<br />opportunities</h3>
              <p>AI is creating new roles, rewarding creators and unlocking massive opportunity.</p>
            </article>
            {opportunityNews.map((item) => <NewsCard key={item.title} item={item} />)}
          </div>
          <div className={styles.newsRow}>
            <article className={styles.newsLeadCard}>
              <div className={styles.newsLeadIcon}>◇</div>
              <h3>Industry warnings<br />and workforce<br />pressure</h3>
              <p>Businesses work in order pressure. Adapt or risk being left behind.</p>
            </article>
            {pressureNews.map((item) => <NewsCard key={item.title} item={item} />)}
          </div>
        </div>

        <div className={styles.phase6} data-ai-shift-phase="6">
          <div className={styles.ctaCircuit} aria-hidden="true"><span /><span /><span /></div>
          <div className={styles.ctaIcon} aria-hidden="true">⌃</div>
          <p>
            Jobs are moving toward AI-enabled professionals. <strong>Become AI-enabled before the shift leaves you behind.</strong>
          </p>
          <a href={registerHref}>Get AI-Ready <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
