import Head from "next/head";
import { useState, type KeyboardEvent, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  Clock3,
  Film,
  ImageIcon,
  Layers3,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Play,
  Repeat2,
  Sparkles,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";
import styles from "../../../styles/ai-video-masterclass.module.css";
import processStyles from "../../../styles/ai-video-process-premium.module.css";

const registerHref = "/gen-ai-masterclass/register-one-step?source=ai-video-masterclass";
const canonicalUrl = "https://sikhadenge.in/masterclass/ai-video";
const pageTitle = "Free 2-Hour AI Video Generation Masterclass | SikhaDenge";
const pageDescription =
  "Learn a repeatable AI video workflow for ads, reels, product films and image-to-video creation in a free 2-hour live SikhaDenge masterclass.";
const durationLabel = "2 Hours";
const durationCompact = "2-Hour";

const outcomes = [
  {
    eyebrow: "PRODUCT AD",
    title: "Create polished product videos",
    text: "Turn a prompt or product image into premium commercial-style shots with intentional camera motion, lighting and pacing.",
    tags: ["Prompting", "Camera", "Lighting"],
    visual: "outcomeProduct",
  },
  {
    eyebrow: "CINEMATIC REEL",
    title: "Build connected story sequences",
    text: "Plan multiple shots that feel like one reel instead of a collection of random AI clips.",
    tags: ["Shot flow", "Consistency", "Pacing"],
    visual: "outcomeReel",
  },
  {
    eyebrow: "IMAGE → VIDEO",
    title: "Animate stills with control",
    text: "Use portraits, products and keyframes as references while preserving composition and visual intent.",
    tags: ["References", "Motion", "Iteration"],
    visual: "outcomeMotion",
  },
] as const;

const modules = [
  ["01", "Prompt for motion", "Write prompts around subject, action, camera, lighting, timing and sound—not just a static description."],
  ["02", "Text → video", "Turn an idea into cinematic shots, social clips and product visuals using a repeatable scene framework."],
  ["03", "Image → video", "Animate product shots, portraits and keyframes while controlling movement and composition."],
  ["04", "Keep scenes consistent", "Use references, shot planning and controlled iteration so multiple clips feel connected."],
  ["05", "Build ads & reels", "Create practical concepts for product ads, reels, creator content and short narratives."],
  ["06", "Finish the output", "Sequence shots, handle audio and captions, review quality and prepare the final clip for delivery."],
] as const;

const videoTools = [
  ["KL", "Kling AI", "Text & image-to-video"],
  ["HF", "Higgsfield", "Cinematic motion & camera"],
  ["VE", "Google Veo", "Cinematic generation"],
  ["RW", "Runway", "Generation & references"],
  ["PK", "Pika", "Short-form motion"],
  ["LU", "Luma AI", "Creative video generation"],
  ["HL", "Hailuo AI", "Image & text-to-video"],
  ["SD", "Seedance", "Fast multi-shot generation"],
] as const;

const imageTools = [
  ["MJ", "Midjourney", "Concepts & cinematic visuals"],
  ["ID", "Ideogram", "Design, text & posters"],
  ["FF", "Adobe Firefly", "Creative image workflows"],
  ["LE", "Leonardo AI", "Characters & visual assets"],
  ["FL", "FLUX", "Photorealistic generation"],
  ["OI", "OpenAI Images", "Prompt-driven image creation"],
  ["RC", "Recraft", "Design assets & visual styles"],
  ["CA", "Canva AI", "Fast social creative workflows"],
] as const;

const audiences = [
  ["Creators & video editors", "Make reels, hooks, visual concepts and AI-assisted shots faster."],
  ["Freelancers & agencies", "Prototype client video ideas and creative directions before full production."],
  ["Marketers & founders", "Create product-film concepts, launch creatives and short-form ad directions."],
  ["Students & beginners", "Learn a structured AI-video workflow without coding or advanced VFX knowledge."],
] as const;

const faqs = [
  ["Is this masterclass only about AI video generation?", "Yes. The session focuses on practical AI video-generation workflows rather than a broad tour of unrelated AI tools."],
  ["Do I need video-editing experience?", "No. The workflow starts from the beginning and keeps the finishing process beginner friendly."],
  ["Will we cover text-to-video and image-to-video?", "Yes. Both are covered, including prompting, references, motion, iteration and consistency."],
  ["Do I need coding?", "No. The workflow is creator friendly and does not require coding."],
  ["Will the masterclass cover ads and reels?", "Yes. Practical examples include product ads, reels, cinematic clips and image-to-video outputs."],
  ["Do I need every paid AI tool before joining?", "No. You can learn the workflow without owning every paid subscription. Individual tools may have their own free limits, credits or paid plans."],
] as const;

type AnalyticsWindow = Window & {
  fbq?: (...args: unknown[]) => void;
  dataLayer?: Array<Record<string, unknown>>;
};

function trackCta(placement: string) {
  if (typeof window === "undefined") return;

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer?.push({
    event: "masterclass_cta_click",
    masterclass: "ai-video",
    placement,
  });

  if (typeof analyticsWindow.fbq === "function") {
    analyticsWindow.fbq("trackCustom", "MasterclassCTA", {
      masterclass: "ai-video",
      placement,
    });
  }
}

function Cta({
  children,
  placement,
  className = styles.primary,
}: {
  children: ReactNode;
  placement: string;
  className?: string;
}) {
  return (
    <a
      href={registerHref}
      className={className}
      onClick={() => trackCta(placement)}
      data-cta-placement={placement}
    >
      <span>{children}</span>
      <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
    </a>
  );
}

function ToolGrid({
  tools,
  panelId,
  labelledBy,
}: {
  tools: readonly (readonly [string, string, string])[];
  panelId: string;
  labelledBy: string;
}) {
  return (
    <div
      className={styles.toolGrid}
      role="tabpanel"
      id={panelId}
      aria-labelledby={labelledBy}
      tabIndex={0}
    >
      {tools.map(([code, name, text]) => (
        <article className={styles.toolCard} key={name}>
          <span className={styles.toolIcon} aria-hidden="true">{code}</span>
          <div>
            <h3>{name}</h3>
            <p>{text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function AiVideoMasterclassPage() {
  const [toolTab, setToolTab] = useState<"video" | "image">("video");

  const setAndFocusToolTab = (next: "video" | "image") => {
    setToolTab(next);
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        document.getElementById(`tool-tab-${next}`)?.focus();
      });
    }
  };

  const handleToolTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    current: "video" | "image",
  ) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      setAndFocusToolTab(current === "video" ? "image" : "video");
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setAndFocusToolTab("video");
    }

    if (event.key === "End") {
      event.preventDefault();
      setAndFocusToolTab("image");
    }
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "AI Video Generation Masterclass",
    description: pageDescription,
    provider: {
      "@type": "Organization",
      name: "SikhaDenge",
      url: "https://sikhadenge.in",
    },
    url: canonicalUrl,
    inLanguage: ["en", "hi"],
    educationalLevel: "Beginner",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta key="description" name="description" content={pageDescription} />
        <meta key="robots" name="robots" content="index,follow,max-image-preview:large" />
        <meta key="theme-color" name="theme-color" content="#ffffff" />
        <link key="canonical" rel="canonical" href={canonicalUrl} />
        <link
          key="hero-logo-preload"
          rel="preload"
          as="image"
          href="/brand/sikhadenge-header-safe-320.png?v=headersafe2-20260728"
        />

        <meta key="og-type" property="og:type" content="website" />
        <meta key="og-site-name" property="og:site_name" content="SikhaDenge" />
        <meta key="og-url" property="og:url" content={canonicalUrl} />
        <meta key="og-title" property="og:title" content={pageTitle} />
        <meta key="og-description" property="og:description" content={pageDescription} />
        <meta
          key="og-image"
          property="og:image"
          content="https://sikhadenge.in/images/about/about-hero-desk.webp"
        />

        <meta key="twitter-card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter-title" name="twitter:title" content={pageTitle} />
        <meta key="twitter-description" name="twitter:description" content={pageDescription} />
        <meta
          key="twitter-image"
          name="twitter:image"
          content="https://sikhadenge.in/images/about/about-hero-desk.webp"
        />

        <script
          key="course-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
        <script
          key="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <a className={styles.skipLink} href="#main-content">Skip to masterclass content</a>

      <main className={styles.page} id="main-content">
        <section className={styles.hero} id="top" aria-labelledby="ai-video-hero-title">
          <div className={styles.heroGridGlow} aria-hidden="true" />
          <div className={`${styles.heroOrb} ${styles.heroOrbLeft}`} aria-hidden="true" />
          <div className={`${styles.heroOrb} ${styles.heroOrbRight}`} aria-hidden="true" />

          <div className={`${styles.container} ${styles.heroInner}`}>
            <div className={styles.heroTop}>
              <div className={styles.heroMetaCard}>
                <span className={styles.heroMetaIcon}><Clock3 size={24} aria-hidden="true" /></span>
                <span><strong>{durationCompact}</strong><small>Live Session</small></span>
              </div>

              <img
                className={styles.heroLogo}
                src="/brand/sikhadenge-header-safe-320.png?v=headersafe2-20260728"
                alt="SikhaDenge"
                width="320"
                height="96"
                loading="eager"
                decoding="async"
              />

              <div className={styles.heroMetaCard}>
                <span className={styles.heroMetaIcon}><Users size={24} aria-hidden="true" /></span>
                <span><strong>150,000+ Students</strong><small>Growing community</small></span>
              </div>
            </div>

            <span className={styles.kicker}>
              <span className={styles.liveDot} aria-hidden="true" />
              LIVE · PRACTICAL · AI VIDEO MASTERCLASS
            </span>

            <h1 id="ai-video-hero-title">
              Create cinematic AI videos
              <span>from <em>text &amp; images.</em></span>
            </h1>

            <p className={styles.heroSubhead}>
              Learn a repeatable workflow to make ads, reels, product films and image-to-video clips using leading AI tools—without coding.
            </p>

            <div className={styles.heroStage}>
              <aside className={`${styles.heroToolCard} ${styles.heroToolLeft}`} aria-label="Kling AI tool highlight">
                <span className={styles.heroToolMark}>
                  <img src="/ai-video-kling-mark.svg" width="70" height="70" alt="Kling AI" loading="eager" decoding="async" />
                </span>
                <strong>Kling AI</strong>
                <small>AI video generation</small>
              </aside>

              <div className={styles.heroCore}>
                <div className={styles.heroFeatures} aria-label="Masterclass features">
                  <div className={styles.heroFeature}>
                    <span><Clock3 size={22} aria-hidden="true" /></span>
                    <div><strong>FREE {durationCompact}</strong><small>Live Masterclass</small></div>
                  </div>
                  <div className={styles.heroFeature}>
                    <span><Mic2 size={22} aria-hidden="true" /></span>
                    <div><strong>Hindi</strong><small>Easy Hinglish</small></div>
                  </div>
                  <div className={styles.heroFeature}>
                    <span><Play size={22} aria-hidden="true" /></span>
                    <div><strong>Practical</strong><small>Live Demo</small></div>
                  </div>
                  <div className={styles.heroFeature}>
                    <span><MessageCircle size={22} aria-hidden="true" /></span>
                    <div><strong>Live Q&amp;A</strong><small>With Expert</small></div>
                  </div>
                  <div className={styles.heroFeature}>
                    <span><Users size={22} aria-hidden="true" /></span>
                    <div><strong>Beginner</strong><small>Friendly</small></div>
                  </div>
                </div>

                <div className={styles.heroActions}>
                  <Cta placement="hero-primary">Get My Free Seat · ₹999 → FREE</Cta>
                  <a className={styles.secondary} href="#outcomes">
                    <Play size={18} aria-hidden="true" />
                    <span>See What You’ll Create</span>
                  </a>
                </div>

                <div className={styles.heroTrust} aria-label="Masterclass trust points">
                  <span><BadgeCheck size={18} aria-hidden="true" /> Beginner friendly</span>
                  <span><BadgeCheck size={18} aria-hidden="true" /> No coding</span>
                  <span><BadgeCheck size={18} aria-hidden="true" /> Practical output</span>
                </div>
              </div>

              <aside className={`${styles.heroToolCard} ${styles.heroToolRight}`} aria-label="Higgsfield tool highlight">
                <span className={styles.heroToolMark}>
                  <img src="/ai-video-higgsfield-mark.svg" width="70" height="70" alt="Higgsfield" loading="eager" decoding="async" />
                </span>
                <strong>Higgsfield</strong>
                <small>AI motion &amp; film</small>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.outcomesSection} id="outcomes" aria-labelledby="outcomes-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span>WHAT YOU’LL BE ABLE TO CREATE</span>
              <h2 id="outcomes-title">Learn the workflow behind <em>real creative output.</em></h2>
              <p>Not a dashboard demo. You’ll understand the decisions behind the shots people actually use in ads, reels and visual storytelling.</p>
            </div>

            <div className={styles.outcomeGrid}>
              {outcomes.map((item, index) => (
                <article className={styles.outcomeCard} key={item.title}>
                  <div className={`${styles.outcomeVisual} ${styles[item.visual]}`} aria-hidden="true">
                    <span className={styles.visualBadge}>0{index + 1}</span>
                    <div className={styles.visualFrame}><i /><i /><i /></div>
                    <span className={styles.visualCaption}>{item.eyebrow}</span>
                  </div>
                  <div className={styles.outcomeBody}>
                    <span>{item.eyebrow}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <div className={styles.tagRow}>{item.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
                  </div>
                </article>
              ))}
            </div>

            <div className={processStyles.wrap} aria-label="AI video creation workflow">
              <div className={processStyles.grid}>
                <div className={processStyles.step}>
                  <span className={processStyles.number}>01</span>
                  <span className={processStyles.icon}><WandSparkles /></span>
                  <span className={processStyles.copy}><strong>Prompt</strong><small>Define the idea, subject and intent</small></span>
                </div>
                <span className={processStyles.arrow} aria-hidden="true"><ArrowRight /></span>
                <div className={processStyles.step}>
                  <span className={processStyles.number}>02</span>
                  <span className={processStyles.icon}><Camera /></span>
                  <span className={processStyles.copy}><strong>Design the shot</strong><small>Frame, camera, lighting and style</small></span>
                </div>
                <span className={processStyles.arrow} aria-hidden="true"><ArrowRight /></span>
                <div className={processStyles.step}>
                  <span className={processStyles.number}>03</span>
                  <span className={processStyles.icon}><Zap /></span>
                  <span className={processStyles.copy}><strong>Generate</strong><small>Create the first controlled variation</small></span>
                </div>
                <span className={processStyles.arrow} aria-hidden="true"><ArrowRight /></span>
                <div className={processStyles.step}>
                  <span className={processStyles.number}>04</span>
                  <span className={processStyles.icon}><Repeat2 /></span>
                  <span className={processStyles.copy}><strong>Refine</strong><small>Compare, iterate and improve details</small></span>
                </div>
                <span className={processStyles.arrow} aria-hidden="true"><ArrowRight /></span>
                <div className={processStyles.step}>
                  <span className={processStyles.number}>05</span>
                  <span className={processStyles.icon}><Film /></span>
                  <span className={processStyles.copy}><strong>Finish</strong><small>Sequence, polish and export</small></span>
                </div>
              </div>
            </div>

            <div className={styles.center}><Cta placement="outcomes">Learn This Workflow Live</Cta></div>
          </div>
        </section>

        <section className={styles.learnSection} id="learn" aria-labelledby="agenda-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span>{durationCompact.toUpperCase()} PRACTICAL AGENDA</span>
              <h2 id="agenda-title">Six blocks. <em>Zero filler.</em></h2>
              <p>Each block answers a practical question you face while creating AI video—from prompting motion to preparing the final output.</p>
            </div>

            <div className={styles.moduleGrid}>
              {modules.map(([n, title, text], index) => (
                <article key={n}>
                  <div className={styles.moduleTop}>
                    <span>{n}</span>
                    {index === 0 && <WandSparkles size={20} aria-hidden="true" />}
                    {index === 1 && <MonitorPlay size={20} aria-hidden="true" />}
                    {index === 2 && <ImageIcon size={20} aria-hidden="true" />}
                    {index === 3 && <Layers3 size={20} aria-hidden="true" />}
                    {index === 4 && <Camera size={20} aria-hidden="true" />}
                    {index === 5 && <Film size={20} aria-hidden="true" />}
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.toolsSection} id="tools" aria-labelledby="tools-title">
          <div className={styles.container}>
            <div className={`${styles.sectionHead} ${styles.sectionHeadDark}`}>
              <span>AI CREATION STACK</span>
              <h2 id="tools-title">Understand the tools behind <em>modern AI visuals.</em></h2>
              <p>See where different video and image-generation tools fit into one repeatable creative workflow.</p>
            </div>

            <div className={styles.toolTabs} role="tablist" aria-label="AI tool categories">
              <button
                id="tool-tab-video"
                type="button"
                className={toolTab === "video" ? styles.activeTab : ""}
                onClick={() => setToolTab("video")}
                onKeyDown={(event) => handleToolTabKeyDown(event, "video")}
                role="tab"
                aria-selected={toolTab === "video"}
                aria-controls="tool-panel-video"
                tabIndex={toolTab === "video" ? 0 : -1}
              >
                <Film size={18} aria-hidden="true" /> Video Generation <span>8 tools</span>
              </button>
              <button
                id="tool-tab-image"
                type="button"
                className={toolTab === "image" ? styles.activeTab : ""}
                onClick={() => setToolTab("image")}
                onKeyDown={(event) => handleToolTabKeyDown(event, "image")}
                role="tab"
                aria-selected={toolTab === "image"}
                aria-controls="tool-panel-image"
                tabIndex={toolTab === "image" ? 0 : -1}
              >
                <ImageIcon size={18} aria-hidden="true" /> Image Generation <span>8 tools</span>
              </button>
            </div>

            {toolTab === "video" ? (
              <ToolGrid tools={videoTools} panelId="tool-panel-video" labelledBy="tool-tab-video" />
            ) : (
              <ToolGrid tools={imageTools} panelId="tool-panel-image" labelledBy="tool-tab-image" />
            )}

            <p className={styles.toolsNote}>
              <Check size={17} aria-hidden="true" /> Tool interfaces change. Prompting, references, shot design, iteration and finishing remain transferable.
            </p>
          </div>
        </section>

        <section className={styles.audienceSection} aria-labelledby="audience-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span>WHO THIS IS FOR</span>
              <h2 id="audience-title">Built for people who want <em>better video output.</em></h2>
              <p>Start from your current skill level and learn the workflow behind stronger AI-generated visuals.</p>
            </div>

            <div className={styles.audienceGrid}>
              {audiences.map(([title, text], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>

            <div className={styles.audienceChecks}>
              <span><Check size={17} aria-hidden="true" /> Beginner friendly</span>
              <span><Check size={17} aria-hidden="true" /> No coding</span>
              <span><Check size={17} aria-hidden="true" /> Live demonstrations</span>
              <span><Check size={17} aria-hidden="true" /> Practical Hinglish</span>
            </div>
          </div>
        </section>

        <section className={styles.faqSection} id="faq" aria-labelledby="faq-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span>COMMON QUESTIONS</span>
              <h2 id="faq-title">Know before you <em>reserve your seat.</em></h2>
            </div>

            <div className={styles.faqGrid}>
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<span aria-hidden="true">+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalSection} aria-labelledby="final-title">
          <div className={`${styles.container} ${styles.finalCard}`}>
            <div>
              <span className={styles.finalKicker}><Sparkles size={16} aria-hidden="true" /> AI VIDEO GENERATION MASTERCLASS</span>
              <h2 id="final-title">Stop guessing prompts.<br /><em>Start directing the output.</em></h2>
              <p>Learn a practical process for creating stronger AI-generated ads, reels and cinematic clips in one focused {durationCompact.toLowerCase()} live session.</p>
            </div>
            <div className={styles.finalAction}>
              <Cta placement="final" className={styles.finalButton}>Get My Free Seat</Cta>
              <span><Users size={16} aria-hidden="true" /> Live · Easy Hinglish · Beginner Friendly</span>
            </div>
          </div>
        </section>

        <div className={styles.mobileSticky} aria-label="Reserve your AI video masterclass seat">
          <div><small>AI VIDEO MASTERCLASS</small><strong>{durationLabel} · Live</strong></div>
          <Cta placement="mobile-sticky" className={styles.mobileButton}>Get Free Seat</Cta>
        </div>
      </main>
    </>
  );
}

(AiVideoMasterclassPage as typeof AiVideoMasterclassPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export default AiVideoMasterclassPage;
