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
  Layers3,
  Mic2,
  Play,
  Repeat2,
  ShieldCheck,
  Sparkles,
  Users,
  WandSparkles,
} from "lucide-react";
import styles from "../../../styles/ai-video-masterclass.module.css";

const registerHref = "/gen-ai-masterclass/register-one-step?source=ai-video-masterclass";

const modules = [
  ["01", "Prompting for motion, not images", "Learn how subject, action, camera, lens, lighting, timing and audio cues change video output."],
  ["02", "Text-to-video workflows", "Turn an idea into short cinematic scenes, social clips and product visuals using structured prompts."],
  ["03", "Image-to-video workflows", "Animate product shots, portraits and keyframes while controlling motion and composition."],
  ["04", "Character & scene consistency", "Use references, shot planning and iteration to make multiple clips feel like one story."],
  ["05", "Ads, reels & storytelling", "Build platform-ready concepts for ads, reels, explainers and short narrative sequences."],
  ["06", "Edit, upscale & export", "Plan a practical finishing workflow for sequencing, audio, captions, cleanup and delivery."],
] as const;

const tools = [
  ["Veo 3.1", "Cinematic text/image-to-video with native audio workflows"],
  ["Runway Gen-4.5", "High-control cinematic generation and video workflows"],
  ["Seedance", "Fast multi-shot and reference-driven generation workflows"],
  ["Hailuo", "Creative text/image-to-video experimentation"],
  ["Google Vids", "AI-assisted generation, editing and publishing workflow"],
] as const;

const builds = [
  ["PRODUCT AD", "Launch-style product commercial", "Product", "Ad"],
  ["CINEMATIC REEL", "Travel / lifestyle storytelling sequence", "Story", "Reel"],
  ["AI CHARACTER", "Consistent character-led short scene", "Character", "Scene"],
  ["UGC CONCEPT", "Creator-style social ad concept", "UGC", "Ad"],
  ["IMAGE → VIDEO", "Animate a still into a controlled motion shot", "Motion", "I2V"],
] as const;

const audiences = [
  ["Creators & editors", "Make stronger reels, transitions, visual hooks and concept videos."],
  ["Freelancers & agencies", "Pitch and deliver AI-assisted ad concepts and client content faster."],
  ["Marketing teams", "Prototype product ads, launch creatives and short-form concepts."],
  ["Students & beginners", "Learn a repeatable AI-video workflow without needing coding."],
  ["Founders & business owners", "Create and test video concepts before spending on full production."],
  ["Designers & storytellers", "Move from static visuals to motion-led narrative work."],
] as const;

const faqs = [
  ["Is this class only about AI video generation?", "Yes. The page and session are focused specifically on practical AI video-generation workflows, not a general AI-tools workshop."],
  ["Do I need video-editing experience?", "No. The class starts from the generation workflow and explains the finishing process in a beginner-friendly way."],
  ["Do I need a paid AI-video subscription?", "No paid plan is required just to understand the workflow. Individual tools may have their own free limits, credits or paid tiers."],
  ["Will we learn text-to-video and image-to-video?", "Yes. Both are covered, including how to structure prompts, use references and improve consistency."],
  ["Will you teach ads and reels?", "Yes. The learning flow is built around practical short-form outputs such as product ads, reels, cinematic clips and storytelling sequences."],
  ["Is this live?", "The landing page is designed for a live, practical workshop format with demonstrations and Q&A."],
] as const;

function Cta({ children, className = styles.primary }: { children: ReactNode; className?: string }) {
  return (
    <a href={registerHref} className={className}>
      <span>{children}</span>
      <ArrowRight size={17} strokeWidth={2.3} aria-hidden="true" />
    </a>
  );
}

function VideoMock({ index, label }: { index: number; label: string }) {
  return (
    <div className={`${styles.videoMock} ${styles[`mock${index + 1}`]}`} aria-label={`${label} visual preview`}>
      <div className={styles.mockTop}><span>AI VIDEO</span><span>00:08</span></div>
      <button className={styles.playButton} type="button" aria-label={`Preview ${label}`}><Play size={22} fill="currentColor" /></button>
      <div className={styles.mockHud}><i /><i /><i /><span>GENERATED SCENE</span></div>
    </div>
  );
}

export default function AiVideoMasterclassPage() {
  return (
    <>
      <Head>
        <title>AI Video Generation Masterclass | SikhaDenge</title>
        <meta name="description" content="Learn practical AI video generation workflows for ads, reels, cinematic clips and image-to-video creation in a live SikhaDenge masterclass." />
        <meta name="robots" content="index,follow" />
      </Head>

      <main className={styles.page}>
        <div className={styles.topStrip}>
          <span><i /> LIVE AI VIDEO MASTERCLASS</span>
          <span>TEXT → VIDEO</span>
          <span>IMAGE → VIDEO</span>
          <span>LIMITED LIVE SEATS</span>
        </div>

        <section className={styles.hero}>
          <div className={`${styles.container} ${styles.nav}`}>
            <a className={styles.brand} href="#top" aria-label="SikhaDenge home"><b>S</b><strong>SikhaDenge</strong></a>
            <div className={styles.navLinks}><a href="#learn">What You’ll Learn</a><a href="#build">Live Builds</a><a href="#tools">Tools</a><a href="#faq">FAQs</a></div>
            <Cta className={styles.navCta}>Reserve Seat</Cta>
          </div>

          <div id="top" className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}><Sparkles size={13} /> AI VIDEO GENERATION MASTERCLASS</span>
              <h1>Create videos from <em>text, images & ideas.</em></h1>
              <p className={styles.subhead}>Learn a practical workflow for cinematic AI videos, product ads, reels, storytelling shots and image-to-video creation — live, step by step.</p>

              <div className={styles.heroPoints}>
                <span><Check size={15} /> Text-to-video</span>
                <span><Check size={15} /> Image-to-video</span>
                <span><Check size={15} /> Ads & reels</span>
                <span><Check size={15} /> No coding</span>
              </div>

              <div className={styles.sessionGrid}>
                <div><Clock3 size={18} /><span><small>FORMAT</small><strong>3-Hour Live</strong></span></div>
                <div><Camera size={18} /><span><small>FOCUS</small><strong>100% Video</strong></span></div>
                <div><Mic2 size={18} /><span><small>LANGUAGE</small><strong>Easy Hinglish</strong></span></div>
                <div><Users size={18} /><span><small>LEVEL</small><strong>Beginner Friendly</strong></span></div>
              </div>

              <div className={styles.heroActions}><Cta>Reserve My Seat</Cta><a className={styles.secondary} href="#build"><Play size={16} /> See What You’ll Build</a></div>
              <p className={styles.micro}>Practical prompts • live builds • reusable video workflow</p>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.visualBadge}><span>LIVE BUILD</span><strong>AI Product Film</strong></div>
              <VideoMock index={0} label="AI product film" />
              <div className={styles.promptPanel}>
                <small>SHOT PROMPT</small>
                <p>“Luxury product on black glass, slow orbital camera, hard rim light, floating particles, premium commercial look…”</p>
                <div><span>Camera: Orbit</span><span>Style: Product Ad</span><span>8 sec</span></div>
              </div>
            </div>
          </div>

          <div className={`${styles.container} ${styles.trustRow}`}>
            <div><strong>1</strong><span>Focused skill</span></div>
            <div><strong>5+</strong><span>AI-video workflows</span></div>
            <div><strong>Live</strong><span>Generation demos</span></div>
            <div><strong>No Code</strong><span>Creator friendly</span></div>
          </div>
        </section>

        <section className={styles.alertSection}>
          <div className={styles.container}>
            <span className={styles.redEyebrow}>THE SHIFT IS ALREADY HERE</span>
            <h2>AI is changing how video ideas move from <em>concept to screen.</em></h2>
            <p>You do not need to replace filmmaking skills. You need to understand how prompting, references, motion and editing now fit into the workflow.</p>
            <div className={styles.shiftFlow}>
              <article><span>01</span><strong>Idea</strong><small>Concept, hook, visual direction</small></article>
              <ArrowRight />
              <article><span>02</span><strong>Generate</strong><small>Text, image, motion, audio</small></article>
              <ArrowRight />
              <article><span>03</span><strong>Refine</strong><small>Consistency, timing, iterations</small></article>
              <ArrowRight />
              <article><span>04</span><strong>Publish</strong><small>Edit, caption, export, platform</small></article>
            </div>
            <Cta className={styles.redCta}>Learn the Workflow Live</Cta>
          </div>
        </section>

        <section id="learn" className={styles.learnSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}><span>WHAT WE ACTUALLY TEACH</span><h2>Not “AI hype.” A practical <em>video-generation system.</em></h2><p>Each block is designed around decisions you actually make while creating a usable video.</p></div>
            <div className={styles.moduleGrid}>
              {modules.map(([n,title,text]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
            </div>
          </div>
        </section>

        <section id="build" className={styles.buildSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHead} ${styles.onDark}`}><span>WHAT YOU’LL BUILD LIVE</span><h2>See the workflow behind <em>real video formats.</em></h2><p>Instead of random tool demos, the session is organised around outputs creators and businesses actually need.</p></div>
            <div className={styles.buildGrid}>
              {builds.map(([title,desc,a,b], index) => (
                <article key={title} className={styles.buildCard}>
                  <VideoMock index={index} label={title} />
                  <div className={styles.buildMeta}><div><small>{title}</small><h3>{desc}</h3></div><span>{a}</span><span>{b}</span></div>
                </article>
              ))}
            </div>
            <div className={styles.liveNote}><Clapperboard size={21} /><div><strong>Built live, not pre-recorded slides.</strong><span>Prompt → generate → compare → refine → finish.</span></div></div>
          </div>
        </section>

        <section id="tools" className={styles.toolsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}><span>CURRENT AI-VIDEO STACK</span><h2>Learn the thinking that transfers <em>across tools.</em></h2><p>Interfaces change. The core workflow — shot design, references, iteration and finishing — remains useful across multiple generation platforms.</p></div>
            <div className={styles.toolGrid}>
              {tools.map(([name,desc],index) => <article key={name}><span>{String(index+1).padStart(2,"0")}</span><div className={styles.toolIcon}><WandSparkles size={24} /></div><h3>{name}</h3><p>{desc}</p></article>)}
            </div>
          </div>
        </section>

        <section className={styles.outcomeSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}><span>BY THE END OF THE CLASS</span><h2>You should know how to move from <em>brief to finished clip.</em></h2></div>
            <div className={styles.outcomeGrid}>
              <article><Film size={22} /><h3>Design the shot</h3><p>Translate an idea into subject, action, environment, camera, motion and timing.</p></article>
              <article><Layers3 size={22} /><h3>Use references</h3><p>Choose when to start from text, image, keyframe or an existing visual reference.</p></article>
              <article><Repeat2 size={22} /><h3>Iterate deliberately</h3><p>Compare outputs and change one variable at a time instead of prompting randomly.</p></article>
              <article><BadgeCheck size={22} /><h3>Finish for delivery</h3><p>Sequence clips, add audio/captions, clean up and export for the target platform.</p></article>
            </div>
          </div>
        </section>

        <section className={styles.audienceSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHead} ${styles.onDark}`}><span>WHO THIS IS FOR</span><h2>Built for people who need <em>video output.</em></h2></div>
            <div className={styles.audienceGrid}>{audiences.map(([title,text],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
            <div className={styles.center}><Cta className={styles.redCta}>Reserve My Seat</Cta></div>
          </div>
        </section>

        <section className={styles.mentorSection}>
          <div className={`${styles.container} ${styles.mentorCard}`}>
            <div className={styles.mentorImage} role="img" aria-label="SikhaDenge live teaching environment" />
            <div className={styles.mentorCopy}><span>LEARN WITH SIKHADENGE</span><h2>Live teaching. Practical generation. <em>Real workflow thinking.</em></h2><p>The class is structured around demonstration: understand the brief, write the shot, generate alternatives, compare results and refine the clip.</p><div className={styles.mentorChecks}><span><Check />Live walkthroughs</span><span><Check />Work-focused examples</span><span><Check />Prompt frameworks</span><span><Check />Q&A and iteration</span></div><Cta>Join the AI Video Masterclass</Cta></div>
          </div>
        </section>

        <section id="faq" className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}><span>FAQ</span><h2>Frequently asked questions.</h2></div>
            <div className={styles.faq}>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={`${styles.container} ${styles.finalBox}`}><div><span>AI VIDEO GENERATION MASTERCLASS</span><h2>Your next video can start with a prompt — <em>if the workflow is right.</em></h2><p>Learn the practical system behind text-to-video, image-to-video, references, iterations and finishing.</p></div><Cta className={styles.finalButton}>Reserve My Seat</Cta></div>
        </section>

        <div className={styles.mobileBar}><div><small>AI VIDEO MASTERCLASS</small><strong>Live Practical Workshop</strong></div><Cta className={styles.mobileCta}>Reserve Seat</Cta></div>
      </main>
    </>
  );
}

(AiVideoMasterclassPage as typeof AiVideoMasterclassPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;
