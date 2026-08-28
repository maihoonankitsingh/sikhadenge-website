import Head from "next/head";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  Clock3,
  Film,
  ImageIcon,
  Layers3,
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
  ["Is this masterclass only about AI video generation?", "Yes. The session is focused on practical AI video-generation workflows rather than a broad tour of random AI tools."],
  ["Do I need video-editing experience?", "No. The workflow is explained from the beginning and the finishing process is kept beginner friendly."],
  ["Will we cover text-to-video and image-to-video?", "Yes. Both are covered, including prompting, references, motion, iteration and consistency."],
  ["Do I need coding?", "No. The workflow is creator friendly and does not require coding."],
  ["Will the masterclass cover ads and reels?", "Yes. Practical examples include product ads, reels, cinematic clips and image-to-video outputs."],
  ["Do I need every paid AI tool before joining?", "No. You can learn the workflow without owning every paid subscription. Individual tools may have their own free limits, credits or paid plans."],
] as const;

function Cta({ children, className = styles.primary }: { children: ReactNode; className?: string }) {
  return (
    <a href={registerHref} className={className}>
      <span>{children}</span>
      <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
    </a>
  );
}

function ToolGrid({ tools }: { tools: readonly (readonly [string, string, string])[] }) {
  return (
    <div className={styles.toolGrid}>
      {tools.map(([code, name, text]) => (
        <article className={styles.toolCard} key={name}>
          <span className={styles.toolIcon}>{code}</span>
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

  return (
    <>
      <Head>
        <title>AI Video Generation Masterclass | SikhaDenge</title>
        <meta
          name="description"
          content="Learn practical AI video generation workflows for ads, reels, cinematic clips and image-to-video creation in a live SikhaDenge masterclass."
        />
        <meta name="robots" content="index,follow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.page}>
        <section className={styles.hero} id="top">
          <div className={styles.heroGridGlow} aria-hidden="true" />

          <div className={`${styles.brandFloat} ${styles.brandFloatLeft}`} aria-label="Kling AI">
            <span className={styles.klingLogo} />
          </div>
          <div className={`${styles.brandFloat} ${styles.brandFloatRight}`} aria-label="Higgsfield">
            <img src="https://raw.githubusercontent.com/higgsfield-ai/skills/main/assets/logo.png" alt="Higgsfield" />
          </div>

          <div className={`${styles.container} ${styles.heroInner}`}>
            <img
              className={styles.heroLogo}
              src="/brand/sikhadenge-header-safe-320.png?v=headersafe2-20260728"
              alt="SikhaDenge"
            />

            <span className={styles.kicker}>
              <Sparkles size={14} /> LIVE · PRACTICAL · AI VIDEO MASTERCLASS
            </span>

            <h1>
              Create cinematic AI videos from <em>text &amp; images.</em>
            </h1>

            <p className={styles.heroSubhead}>
              Learn a repeatable workflow to make ads, reels, product films and image-to-video clips using leading AI tools—without coding.
            </p>

            <div className={styles.heroFacts}>
              <div><Clock3 size={21} /><span><small>DURATION</small><strong>3 Hours Live</strong></span></div>
              <div><MonitorPlay size={21} /><span><small>FORMAT</small><strong>Hands-on Builds</strong></span></div>
              <div><Mic2 size={21} /><span><small>LANGUAGE</small><strong>Easy Hinglish</strong></span></div>
            </div>

            <div className={styles.heroActions}>
              <Cta>Reserve My Seat</Cta>
              <a className={styles.secondary} href="#outcomes"><Play size={17} /> See What You’ll Create</a>
            </div>

            <p className={styles.heroTrust}>
              <BadgeCheck size={16} /> Beginner friendly · No coding · Focused on practical output
            </p>

            <div className={styles.heroToolStrip} aria-label="Tools featured across the masterclass">
              <span>Kling AI</span><i />
              <span>Higgsfield</span><i />
              <span>Veo</span><i />
              <span>Runway</span><i />
              <span>Midjourney</span><i />
              <span>Ideogram</span>
            </div>
          </div>
        </section>

        <section className={styles.outcomesSection} id="outcomes">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span>WHAT YOU’LL BE ABLE TO CREATE</span>
              <h2>Learn the workflow behind <em>real creative output.</em></h2>
              <p>Not a dashboard demo. You’ll understand the decisions behind the shots people actually use in ads, reels and visual storytelling.</p>
            </div>

            <div className={styles.outcomeGrid}>
              {outcomes.map((item, index) => (
                <article className={styles.outcomeCard} key={item.title}>
                  <div className={`${styles.outcomeVisual} ${styles[item.visual]}`}>
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

            <div className={styles.center}><Cta>Learn This Workflow Live</Cta></div>
          </div>
        </section>

        <section className={styles.learnSection} id="learn">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span>3-HOUR PRACTICAL AGENDA</span>
              <h2>Six blocks. <em>Zero filler.</em></h2>
              <p>Each block answers a practical question you face while creating AI video—from prompting motion to preparing the final output.</p>
            </div>

            <div className={styles.moduleGrid}>
              {modules.map(([n, title, text], index) => (
                <article key={n}>
                  <div className={styles.moduleTop}>
                    <span>{n}</span>
                    {index === 0 && <WandSparkles size={20} />}
                    {index === 1 && <MonitorPlay size={20} />}
                    {index === 2 && <ImageIcon size={20} />}
                    {index === 3 && <Layers3 size={20} />}
                    {index === 4 && <Camera size={20} />}
                    {index === 5 && <Film size={20} />}
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.toolsSection} id="tools">
          <div className={styles.container}>
            <div className={`${styles.sectionHead} ${styles.sectionHeadDark}`}>
              <span>AI CREATION STACK</span>
              <h2>Understand the tools behind <em>modern AI visuals.</em></h2>
              <p>See where different video and image-generation tools fit into one repeatable creative workflow.</p>
            </div>

            <div className={styles.toolTabs} role="tablist" aria-label="AI tool categories">
              <button
                type="button"
                className={toolTab === "video" ? styles.activeTab : ""}
                onClick={() => setToolTab("video")}
                role="tab"
                aria-selected={toolTab === "video"}
              >
                <Film size={17} /> Video Generation <span>8 tools</span>
              </button>
              <button
                type="button"
                className={toolTab === "image" ? styles.activeTab : ""}
                onClick={() => setToolTab("image")}
                role="tab"
                aria-selected={toolTab === "image"}
              >
                <ImageIcon size={17} /> Image Generation <span>8 tools</span>
              </button>
            </div>

            <ToolGrid tools={toolTab === "video" ? videoTools : imageTools} />

            <p className={styles.toolsNote}>
              <Check size={15} /> Tool interfaces change. Prompting, references, shot design, iteration and finishing remain transferable.
            </p>
          </div>
        </section>

        <section className={styles.audienceSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span>WHO THIS IS FOR</span>
              <h2>Built for people who want <em>better video output.</em></h2>
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
              <span><Check size={16} /> Beginner friendly</span>
              <span><Check size={16} /> No coding</span>
              <span><Check size={16} /> Live demonstrations</span>
              <span><Check size={16} /> Practical Hinglish</span>
            </div>
          </div>
        </section>

        <section className={styles.faqSection} id="faq">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span>COMMON QUESTIONS</span>
              <h2>Know before you <em>reserve your seat.</em></h2>
            </div>

            <div className={styles.faqGrid}>
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<span>+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalSection}>
          <div className={`${styles.container} ${styles.finalCard}`}>
            <div>
              <span className={styles.finalKicker}><Sparkles size={14} /> AI VIDEO GENERATION MASTERCLASS</span>
              <h2>Stop guessing prompts.<br /><em>Start directing the output.</em></h2>
              <p>Learn a practical process for creating stronger AI-generated ads, reels and cinematic clips.</p>
            </div>
            <div className={styles.finalAction}>
              <Cta className={styles.finalButton}>Reserve My Seat</Cta>
              <span><Users size={15} /> Live · Easy Hinglish · Beginner Friendly</span>
            </div>
          </div>
        </section>

        <div className={styles.mobileSticky}>
          <div><small>AI VIDEO MASTERCLASS</small><strong>3 Hours · Live</strong></div>
          <Cta className={styles.mobileButton}>Reserve Seat</Cta>
        </div>
      </main>
    </>
  );
}

(AiVideoMasterclassPage as typeof AiVideoMasterclassPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export default AiVideoMasterclassPage;
