import Head from "next/head";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  Clapperboard,
  Clock3,
  Film,
  ImageIcon,
  Layers3,
  Mic2,
  MonitorPlay,
  Repeat2,
  Sparkles,
  Users,
  WandSparkles,
  Workflow,
} from "lucide-react";
import styles from "../../../styles/ai-video-masterclass.module.css";

const registerHref = "/gen-ai-masterclass/register-one-step?source=ai-video-masterclass";

const modules = [
  ["01", "Prompt for motion", "Build prompts around subject, action, camera, lighting, timing and audio instead of describing a static image."],
  ["02", "Text → video", "Turn an idea into cinematic shots, social clips and product visuals using a repeatable scene framework."],
  ["03", "Image → video", "Animate product shots, portraits and keyframes while controlling movement, composition and visual intent."],
  ["04", "Keep scenes consistent", "Use references, shot planning and controlled iteration so multiple clips feel like one connected story."],
  ["05", "Build ads & reels", "Create practical concepts for product ads, reels, explainers, creator-style content and short narratives."],
  ["06", "Finish the output", "Sequence shots, handle audio and captions, review quality and prepare the final clip for delivery."],
] as const;

const tools = [
  ["VEO", "Veo 3.1", "Cinematic text/image-to-video and audio-aware generation workflows."],
  ["RW", "Runway Gen-4.5", "High-control generation, visual iteration and creator-focused video workflows."],
  ["SD", "Seedance", "Fast multi-shot and reference-driven experimentation for short-form video."],
  ["HL", "Hailuo", "Creative text/image-to-video workflows for motion and visual exploration."],
  ["GV", "Google Vids", "AI-assisted generation, editing and publishing for practical video work."],
] as const;

const builds = [
  ["PRODUCT FILM", "Premium product launch shot", "Commercial", "01"],
  ["CINEMATIC REEL", "Travel / lifestyle story sequence", "Reel", "02"],
  ["AI CHARACTER", "Reference-led character scene", "Character", "03"],
  ["SOCIAL AD", "Creator-style short-form concept", "Ad", "04"],
  ["IMAGE → MOTION", "Controlled animation from a still", "I2V", "05"],
] as const;

const audiences = [
  ["Creators & editors", "Build stronger reels, hooks, transitions, visual concepts and AI-assisted shots."],
  ["Freelancers & agencies", "Prototype and pitch video concepts faster before moving into full production."],
  ["Marketing teams", "Create launch ideas, product-film concepts and short-form creative directions."],
  ["Students & beginners", "Learn a structured AI-video workflow without needing coding or advanced VFX skills."],
  ["Founders & business owners", "Test video ideas and ad directions before investing in a larger production."],
  ["Designers & storytellers", "Move from static visual thinking into motion, scenes, camera language and narrative."],
] as const;

const faqs = [
  ["Is this class only about AI video generation?", "Yes. The session is focused specifically on practical AI video-generation workflows rather than a broad AI-tools workshop."],
  ["Do I need video-editing experience?", "No. We start from the generation workflow and explain the finishing process in a beginner-friendly way."],
  ["Do I need a paid AI-video subscription?", "No paid plan is required just to understand the workflow. Individual tools may have their own free limits, credits or paid tiers."],
  ["Will we learn text-to-video and image-to-video?", "Yes. Both are covered, including prompting, references, motion control, iteration and consistency."],
  ["Will you teach ads and reels?", "Yes. The learning flow includes practical short-form outputs such as product ads, reels, cinematic clips and storytelling sequences."],
  ["Is this a live class?", "Yes. The page is designed for a live, practical workshop format with demonstrations, workflow breakdowns and Q&A."],
] as const;

function Cta({ children, className = styles.primary }: { children: ReactNode; className?: string }) {
  return (
    <a href={registerHref} className={className}>
      <span>{children}</span>
      <ArrowRight size={17} strokeWidth={2.3} aria-hidden="true" />
    </a>
  );
}

function ScenePreview({ index, title }: { index: number; title: string }) {
  return (
    <div className={`${styles.scenePreview} ${styles[`scene${index + 1}`]}`} aria-label={`${title} concept preview`}>
      <div className={styles.sceneChrome}>
        <span><i /> GENERATED</span>
        <span>00:08</span>
      </div>
      <div className={styles.sceneFocus} aria-hidden="true"><i /><i /><i /><i /></div>
      <div className={styles.sceneFooter}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <strong>{title}</strong>
      </div>
    </div>
  );
}

function StudioVisual() {
  return (
    <div className={styles.studioShell} aria-label="AI video generation workflow interface">
      <div className={styles.studioTop}>
        <div><span className={styles.studioMark}><Sparkles size={14} /></span><strong>AI Video Studio</strong></div>
        <span className={styles.liveStatus}><i /> LIVE BUILD</span>
      </div>

      <div className={styles.studioCanvas}>
        <div className={styles.canvasMeta}><span>SCENE 01</span><strong>Product launch film</strong><small>16:9 · cinematic</small></div>
        <div className={styles.heroScene}>
          <div className={styles.productShape}><i /><i /></div>
          <div className={styles.cameraGuide}><span>CAMERA PATH</span><i /></div>
        </div>
        <div className={styles.canvasTags}><span>Orbital camera</span><span>Rim light</span><span>Slow motion</span></div>
      </div>

      <div className={styles.promptComposer}>
        <WandSparkles size={16} />
        <p>Luxury product on black glass, slow orbital camera, cool rim light, premium commercial finish…</p>
        <span>Generate</span>
      </div>

      <div className={styles.timeline}>
        <div className={styles.timelineLabel}><span>TIMELINE</span><small>3 connected shots</small></div>
        <div className={styles.timelineShots}><i /><i /><i /></div>
        <div className={styles.waveform} aria-hidden="true">{Array.from({ length: 24 }).map((_, index) => <i key={index} />)}</div>
      </div>
    </div>
  );
}

function AiVideoMasterclassPage() {
  return (
    <>
      <Head>
        <title>AI Video Generation Masterclass | SikhaDenge</title>
        <meta name="description" content="Learn practical AI video generation workflows for ads, reels, cinematic clips and image-to-video creation in a live SikhaDenge masterclass." />
        <meta name="robots" content="index,follow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <main
        className={styles.page}
        style={{
          fontFamily: 'Manrope, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div className={styles.topStrip}>
          <span><i /> LIVE AI VIDEO GENERATION MASTERCLASS</span>
          <span>TEXT → VIDEO</span>
          <span>IMAGE → VIDEO</span>
          <span>EASY HINGLISH</span>
          <span>NO CODING</span>
        </div>

        <nav className={styles.navWrap}>
          <div className={`${styles.container} ${styles.nav}`}>
            <a className={styles.brand} href="#top" aria-label="SikhaDenge home">
              <img src="/brand/sikhadenge-header-safe-320.png?v=headersafe2-20260728" alt="SikhaDenge" />
            </a>
            <div className={styles.navLinks}>
              <a href="#learn">What You’ll Learn</a>
              <a href="#build">Live Builds</a>
              <a href="#tools">Tools</a>
              <a href="#faq">FAQs</a>
            </div>
            <Cta className={styles.navCta}>Reserve Seat</Cta>
          </div>
        </nav>

        <section id="top" className={styles.hero}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}><Sparkles size={13} /> LIVE · PRACTICAL · AI VIDEO ONLY</span>
              <h1>Create cinematic AI videos from <em>text & images.</em></h1>
              <p className={styles.subhead}>Learn how to direct AI video — from the first prompt to connected shots, motion, references, consistency and final delivery.</p>

              <div className={styles.heroPoints}>
                <span><Check size={15} /> Text-to-video</span>
                <span><Check size={15} /> Image-to-video</span>
                <span><Check size={15} /> Ads, reels & stories</span>
                <span><Check size={15} /> Beginner friendly</span>
              </div>

              <div className={styles.sessionGrid}>
                <div><Clock3 size={18} /><span><small>DURATION</small><strong>3 Hours Live</strong></span></div>
                <div><MonitorPlay size={18} /><span><small>FORMAT</small><strong>Live Builds</strong></span></div>
                <div><Mic2 size={18} /><span><small>LANGUAGE</small><strong>Easy Hinglish</strong></span></div>
                <div><Users size={18} /><span><small>LEVEL</small><strong>Beginner Friendly</strong></span></div>
              </div>

              <div className={styles.heroActions}>
                <Cta>Reserve My Seat</Cta>
                <a className={styles.secondary} href="#build"><Clapperboard size={16} /> See What You’ll Build</a>
              </div>
              <p className={styles.micro}><BadgeCheck size={14} /> One focused skill. No generic AI-tool tour.</p>
            </div>

            <StudioVisual />
          </div>

          <div className={`${styles.container} ${styles.trustRow}`}>
            <div><strong>5+</strong><span>AI-video workflows</span></div>
            <div><strong>Live</strong><span>Generation demos</span></div>
            <div><strong>1 Skill</strong><span>Video generation focus</span></div>
            <div><strong>No Code</strong><span>Creator-friendly workflow</span></div>
          </div>
        </section>

        <section className={styles.workflowSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span>THE CORE WORKFLOW</span>
              <h2>One system from <em>idea to finished clip.</em></h2>
              <p>Tools will change. A strong video-generation process still starts with the brief and ends with deliberate review.</p>
            </div>

            <div className={styles.workflowBoard}>
              <article><span>01</span><div className={styles.workflowIcon}><Sparkles size={21} /></div><h3>Direct the idea</h3><p>Hook, subject, scene, mood and visual intent.</p></article>
              <ArrowRight className={styles.workflowArrow} />
              <article><span>02</span><div className={styles.workflowIcon}><Camera size={21} /></div><h3>Design the shot</h3><p>Camera, motion, lighting, timing and references.</p></article>
              <ArrowRight className={styles.workflowArrow} />
              <article><span>03</span><div className={styles.workflowIcon}><Repeat2 size={21} /></div><h3>Generate & refine</h3><p>Compare versions and change variables intentionally.</p></article>
              <ArrowRight className={styles.workflowArrow} />
              <article><span>04</span><div className={styles.workflowIcon}><Film size={21} /></div><h3>Finish & publish</h3><p>Sequence, audio, captions, cleanup and export.</p></article>
            </div>

            <div className={styles.center}><Cta>Learn This Workflow Live</Cta></div>
          </div>
        </section>

        <section id="learn" className={styles.learnSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span>WHAT YOU’LL ACTUALLY LEARN</span>
              <h2>Six practical blocks. <em>Zero filler.</em></h2>
              <p>The class is organised around the decisions you actually make while creating usable AI video.</p>
            </div>

            <div className={styles.moduleGrid}>
              {modules.map(([n, title, text], index) => (
                <article key={n}>
                  <div className={styles.moduleTop}><span>{n}</span>{index === 0 && <WandSparkles size={19} />}{index === 1 && <MonitorPlay size={19} />}{index === 2 && <ImageIcon size={19} />}{index === 3 && <Layers3 size={19} />}{index === 4 && <Clapperboard size={19} />}{index === 5 && <Film size={19} />}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="build" className={styles.buildSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHead} ${styles.onDark}`}>
              <span>WHAT YOU’LL BUILD LIVE</span>
              <h2>Five formats. <em>One repeatable workflow.</em></h2>
              <p>We use output-focused examples so you can see how the same generation logic changes across different video goals.</p>
            </div>

            <div className={styles.buildGrid}>
              {builds.map(([title, desc, tag, n], index) => (
                <article key={title} className={styles.buildCard}>
                  <ScenePreview index={index} title={title} />
                  <div className={styles.buildMeta}>
                    <div><small>LIVE BUILD · {n}</small><h3>{desc}</h3></div>
                    <span>{tag}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.liveNote}>
              <span className={styles.liveNoteIcon}><Workflow size={20} /></span>
              <div><strong>Prompt → Generate → Compare → Refine → Finish</strong><span>You see the workflow, not just the final result.</span></div>
            </div>
          </div>
        </section>

        <section id="tools" className={styles.toolsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span>CURRENT AI-VIDEO STACK</span>
              <h2>Learn the thinking that transfers <em>across tools.</em></h2>
              <p>The interface can change. Shot design, references, consistency, iteration and finishing remain transferable skills.</p>
            </div>

            <div className={styles.toolGrid}>
              {tools.map(([code, name, desc]) => (
                <article key={name}>
                  <div className={styles.toolLogo}>{code}</div>
                  <div><h3>{name}</h3><p>{desc}</p></div>
                  <span><ArrowRight size={15} /></span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.outcomeSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span>BY THE END OF THE CLASS</span>
              <h2>Move from “try this prompt” to <em>directing the output.</em></h2>
            </div>

            <div className={styles.outcomeGrid}>
              <article><div><Camera size={21} /></div><span>01</span><h3>Design the shot</h3><p>Translate an idea into subject, action, environment, camera, motion and timing.</p></article>
              <article><div><ImageIcon size={21} /></div><span>02</span><h3>Use references</h3><p>Know when to start from text, image, keyframe or an existing visual direction.</p></article>
              <article><div><Repeat2 size={21} /></div><span>03</span><h3>Iterate deliberately</h3><p>Compare outputs and change one variable at a time instead of prompting randomly.</p></article>
              <article><div><BadgeCheck size={21} /></div><span>04</span><h3>Finish for delivery</h3><p>Sequence clips, add audio and captions, review quality and export for the target platform.</p></article>
            </div>
          </div>
        </section>

        <section className={styles.audienceSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHead} ${styles.onDark}`}>
              <span>WHO THIS IS FOR</span>
              <h2>Built for people who need <em>better video output.</em></h2>
            </div>

            <div className={styles.audienceGrid}>
              {audiences.map(([title, text], index) => (
                <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
            <div className={styles.center}><Cta className={styles.lightCta}>Reserve My Seat</Cta></div>
          </div>
        </section>

        <section className={styles.mentorSection}>
          <div className={`${styles.container} ${styles.mentorCard}`}>
            <div className={styles.mentorImage} role="img" aria-label="SikhaDenge live teaching environment"><span>LIVE · PRACTICAL · HINGLISH</span></div>
            <div className={styles.mentorCopy}>
              <span>LEARN WITH SIKHADENGE</span>
              <h2>Watch the workflow being <em>built live.</em></h2>
              <p>We start with the brief, turn it into a shot direction, generate alternatives, compare what changed and refine the clip step by step.</p>
              <div className={styles.mentorChecks}>
                <span><Check /> Live walkthroughs</span>
                <span><Check /> Work-focused examples</span>
                <span><Check /> Prompt frameworks</span>
                <span><Check /> Q&A and iteration</span>
              </div>
              <Cta>Join the AI Video Masterclass</Cta>
            </div>
          </div>
        </section>

        <section id="faq" className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}><span>FAQ</span><h2>Questions before you join.</h2></div>
            <div className={styles.faq}>{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={`${styles.container} ${styles.finalBox}`}>
            <div><span>AI VIDEO GENERATION MASTERCLASS</span><h2>Stop collecting AI-video tools. <em>Learn the workflow.</em></h2><p>Text → video. Image → video. Connected shots. Better iteration. Practical finishing.</p></div>
            <Cta className={styles.finalButton}>Reserve My Seat</Cta>
          </div>
        </section>

        <div className={styles.mobileBar}>
          <div><small>AI VIDEO MASTERCLASS</small><strong>Live · 3 Hours · Hinglish</strong></div>
          <Cta className={styles.mobileCta}>Reserve Seat</Cta>
        </div>
      </main>
    </>
  );
}

(AiVideoMasterclassPage as typeof AiVideoMasterclassPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export default AiVideoMasterclassPage;
