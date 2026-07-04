"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;
function safeQuerySelector(selector: any): Element | null {
  try {
    if (typeof document === "undefined") return null;
    if (typeof selector !== "string") return null;
    const sel = selector.trim();
    if (!sel) return null;
    // prevent obvious invalid selectors like "[]"
    if (sel === "[]") return null;
    return safeQuerySelector(sel);
  } catch {
    return null;
  }
}

function safeQuerySelectorAll(selector: any): NodeListOf<Element> {
  try {
    if (typeof document === "undefined") return safeQuerySelectorAll("__never__");
    if (typeof selector !== "string") return safeQuerySelectorAll("__never__");
    const sel = selector.trim();
    if (!sel || sel === "[]") return safeQuerySelectorAll("__never__");
    return safeQuerySelectorAll(sel);
  } catch {
    return safeQuerySelectorAll("__never__");
  }
}

import CounsellingModal from "../components/CounsellingModal";
import Link from "next/link";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";

import { courses } from "../data/courses";
import { companies } from "../data/companies";

import { Instagram } from "lucide-react";

import Companies from "@/src/sections/Companies";

// SD_AI_TOOLS_DATA_V5
const sdAiTools = [
  { name: "ChatGPT",            logo: "/images/ai-tools/chatgpt.png",            desc: "Conversational AI for content creation, ideation, and automation." },
  { name: "Gemini",             logo: "/images/ai-tools/gemini.png",             desc: "Multimodal AI for advanced search, analysis, and writing." },
  { name: "NotebookLM",         logo: "/images/ai-tools/notebooklm.png",         desc: "AI-powered document exploration and insight extraction." },
  { name: "Julius",             logo: "/images/ai-tools/julius.png",             desc: "AI analyst for turning spreadsheets into smart dashboards." },
  { name: "Google AI Studio",   logo: "/images/ai-tools/google-ai-studio.png",   desc: "Developer tool to build and test with Gemini models via APIs." },
  { name: "Notion",             logo: "/images/ai-tools/notion.png",             desc: "Productivity platform with AI for notes, summaries, and workflows." },
  { name: "Microsoft Copilot",  logo: "/images/ai-tools/copilot.png",            desc: "AI assistant embedded across Microsoft 365 for content and automation." },
];


/* SD_IMAGE_GEN_TOOLS_DATA_V1 */
const sdImageGenTools = [
  { name: "Midjourney",     logo: "/images/tools/midjourney.png",     desc: "Cinematic quality images for ads, posters, and concepts." },
  { name: "DALL·E",         logo: "/images/tools/dalle.png",          desc: "Accurate prompt-based image generation for clean visuals." },
  { name: "Adobe Firefly",  logo: "/images/tools/adobe-firefly.png",  desc: "Commercial-friendly AI creation with Adobe workflow." },
  { name: "Ideogram",       logo: "/images/tools/ideogram.png",       desc: "Poster-style images with readable typography." },
  { name: "Nano Banana",    logo: "/images/tools/nano-banana.png",    desc: "Fast brand visuals: logos, mascots, sticker-style assets." },
];


  /* SD_VIDEO_VOICE_AVATAR_TOOLS_DATA_V1 */
  const sdVideoVoiceAvatarTools = [
    { name: "Loom",        logo: "/images/tools/loom.png",        desc: "AI-enhanced video messaging with summaries and transcripts." },
    { name: "HeyGen",      logo: "/images/tools/heygen.png",      desc: "AI avatars with lip-sync for talking-head videos." },
    { name: "Synthesia",   logo: "/images/tools/synthesia.png",   desc: "Studio-style avatar videos for explainers and training." },
    { name: "ElevenLabs",  logo: "/images/tools/elevenlabs.png",  desc: "High quality AI voice generation and cloning." },
    { name: "Runway",      logo: "/images/tools/runway.png",      desc: "AI video generation + editing for pro outputs." },
  ];
type Course = {
  title: string;
  slug: string;
  chips: string[];
  subtitle?: string;
  image?: string;
};
type TextReview = {
  name: string;
  role: string;
  text: string;
};


function SdHomeEffects() {
  return null;
}

function firstSource(sources: string[], fallback: string) {
  return sources?.[0] || fallback;
}

/**
 * IMPORTANT:
 * Replace this list with the exact same "companies" list used in app/companies/page.tsx
 * (same names => same /public/images/companies/* assets).
 */


const videoReviews = [
  { src: "/images/testimonials/t1.mp4" },
  { src: "/images/testimonials/t2.mp4" },
  { src: "/images/testimonials/t3.mp4" },
  { src: "/images/testimonials/t4.mp4" },
  { src: "/images/testimonials/t5.mp4" },
  { src: "/images/testimonials/t6.mp4" },
  { src: "/images/testimonials/t7.mp4" },
];


const textReviews: TextReview[] = [
  {
    name: "Sneha Yadav",
    role: "Learner",
    text: "Ek hi course me graphic design + video editing dono cover ho gaya. Daily practice aur doubt support se consistency bani. Projects ke saath client-style briefs bhi mile, confidence build hua.",
  },
  {
    name: "Amit Verma",
    role: "Alumni",
    text: "Reels editing workflow clear hua: hooks, pacing, captions, sound selection, color match. Saath me branding basics (logo, poster, social post) practical projects pe karaya.",
  },
  {
    name: "Pooja Sharma",
    role: "Learner",
    text: "Layout grid, hierarchy aur typography rules clear hue. Pehle random design banati thi, ab process follow karke clean output aa raha hai. Portfolio structure bhi samajh aaya.",
  },
  {
    name: "Rahul Singh",
    role: "Learner",
    text: "Photoshop me selection, masking, retouching aur compositing ka flow easy ho gaya. Illustrator me logo + vector icons banane ka confidence aaya. Assignments daily mile, speed badhi.",
  },
  {
    name: "Neha Gupta",
    role: "Learner",
    text: "Color theory aur brand consistency pe focus acha tha. Fundamentals + feedback se social media creatives ab professional lagte hain.",
  },
  {
    name: "Arjun Mishra",
    role: "Learner",
    text: "Premiere Pro me timeline discipline, audio cleanup aur export settings clear hue. Render/export me time waste band ho gaya.",
  },
  {
    name: "Kriti Jain",
    role: "Learner",
    text: "After Effects me smooth keyframes, graphs aur transitions samajh aaye. Pehle foundation strong karaya phir projects pe le gaye.",
  },
  {
    name: "Vikas Tiwari",
    role: "Learner",
    text: "Assignments real-world briefs jaise the: poster, thumbnail, reel cover, brand kit. Feedback point-to-point mila, improvement fast hua.",
  },
  {
    name: "Isha Patel",
    role: "Learner",
    text: "AI tools ka practical use bataya: ideation, reference generation, cleanup, quick variations. Output still professional aur industry tools ke through hi raha.",
  },
  {
    name: "Mohit Kumar",
    role: "Alumni",
    text: "Portfolio presentation, file naming, export formats aur client delivery checklist cover hua. Ab workflow set hai, isliye freelance work handle kar pa raha hu.",
  },
];

function FullBleed({ children }: { children: React.ReactNode }) {

    // Sikhadenge: Courses mobile auto-scroll (manual swipe + vertical page scroll safe)


  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      {children}
    </div>
  );
}

function CompaniesMarquee() {
  const uniq = useMemo(() => {
    const seen = new Set<string>();
    const out: typeof companies = [];
    for (const c of companies) {
      const first = ((c as any).sources && (c as any).sources[0]) ? String((c as any).sources[0]) : "";
      const nm = (c as any).name ? String((c as any).name) : "";
      const key = `${first.toLowerCase()}|${nm.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(c);
    }
    return out;
  }, []);

  const loop = useMemo(() => [...uniq, ...uniq], [uniq]);
return (
    <section className="mt-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Learners build portfolios aligned to real-world standards
            </h2>
            <p className="mt-2 text-sm md:text-base text-[#B0B7C3]">
              Tool-first training • practical projects • review-driven improvement
            </p>
          </div>

</div>
      </div>

      <FullBleed>
        <div className="mt-6 border-y border-[rgba(255,255,255,0.10)] bg-[#0B1220]">
          <Companies />
        </div>
      </FullBleed>
    </section>
  );
}


function CoursesMarquee() {
  // SD_COURSES_SCROLL_MODE_V1
  const [scrollMode, setScrollMode] = useState<"auto" | "manual">("auto");


  
  const [activeIdx, setActiveIdx] = useState(0);
const viewportRef = useRef<HTMLDivElement | null>(null);

  

  // SD_COURSE_ACTIVE_DOT_V2 (robust: nearest card to viewport center)
  useEffect(() => {
    const el = viewportRef.current as HTMLDivElement | null;
    if (!el) return;

    let raf = 0;

    const update = () => {
      raf = 0;

      const cards = Array.from(
        el.querySelectorAll('[data-sd-course-card="1"]')
      ) as HTMLElement[];

      if (!cards.length) return;

      const center = el.scrollLeft + el.clientWidth / 2;

      let best = 0;
      let bestDist = 1e18;

      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        const cCenter = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cCenter - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }

      // If you duplicated cards for looping, map index back into original length
      const originalLen =
        (typeof courses !== "undefined" && Array.isArray(courses) ? courses.length : cards.length) || cards.length;

      setActiveIdx(originalLen ? (best % originalLen) : best);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    // initial
    update();

    return () => {
      el.removeEventListener("scroll", onScroll as any);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
const [activeDot, setActiveDot] = useState(0);
// SD_COURSE_DOT_IO_V15 (mobile dot sync that always works)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.querySelector<HTMLElement>('[data-sd-course-viewport="1"]');
    if (!root) return;

    const total =
      (typeof courses !== "undefined" && Array.isArray(courses) && courses.length)
        ? courses.length
        : 1;

    const all = Array.from(root.querySelectorAll<HTMLElement>('[data-sd-course-card="1"]'));
    const cards = all.slice(0, total);
    if (!cards.length) return;

    const updateFromCenter = () => {
      try {
        const center = root.scrollLeft + root.clientWidth / 2;
        let best = 0;
        let bestDist = Number.POSITIVE_INFINITY;

        for (let i = 0; i < cards.length; i++) {
          const c = cards[i];
          const mid = c.offsetLeft + c.offsetWidth / 2;
          const d = Math.abs(mid - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        }
        setActiveDot(best);
      } catch {}
    };

    updateFromCenter();

    // Fallback if IO not available
    if (!("IntersectionObserver" in window)) {
      const onScroll = () => updateFromCenter();
      root.addEventListener("scroll", onScroll, { passive: true });
      return () => root.removeEventListener("scroll", onScroll as any);
    }

    const idxMap = new Map<HTMLElement, number>();
    cards.forEach((el, i) => idxMap.set(el, i));

    const io = new IntersectionObserver(
      (entries) => {
        let bestIdx: number | null = null;
        let bestRatio = 0;

        for (const e of entries) {
          const idx = idxMap.get(e.target as HTMLElement);
          if (idx == null) continue;
          const r = e.intersectionRatio || 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestIdx = idx;
          }
        }
        if (bestIdx != null) setActiveDot(bestIdx);
      },
      { root, threshold: [0.55, 0.7, 0.85] }
    );

    cards.forEach((c) => io.observe(c));

    return () => {
      io.disconnect();
    };
  }, [courses.length]);


  const [jsScroll, setJsScroll] = useState(false);

  const loop = useMemo(() => [...courses, ...courses], []);

  // Enable JS auto-scroll on mobile/touch; keep finger scroll always enabled
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;

    const isMobile =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(max-width: 1024px)").matches;

    setJsScroll(Boolean(isTouch || isMobile));
  }, []);

  // JS auto-scroll (mobile/touch). IMPORTANT: do NOT pause on "scroll" event (it causes stuck on mobile).
  useEffect(() => {
    if (!jsScroll) return;

    const el = viewportRef.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    let raf = 0;
    let last = 0;
    let pausedLocal = false;
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;

    const pause = () => {
      pausedLocal = true;
      if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
    };

    const resumeSoon = () => {
      if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
      resumeTimer = setTimeout(() => {
        pausedLocal = false;
      }, 900);
    };

    const onTouchStart = () => pause();
    const onTouchEnd = () => resumeSoon();
    const onPointerDown = () => pause();
    const onPointerUp = () => resumeSoon();

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    el.addEventListener("pointerup", onPointerUp, { passive: true });
    el.addEventListener("pointercancel", onPointerUp, { passive: true });

    const tick = (t: number) => {
      if (!last) last = t;
      const dt = t - last;
      last = t;

      if (!pausedLocal) {
        const half = el.scrollWidth / 2;
        el.scrollLeft += dt * 0.35;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    
return () => {
      if (raf) cancelAnimationFrame(raf);
      if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);

      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [jsScroll]);

  // Dots active index based on scroll position
  const lenCourses = courses.length;

  const getStep = () => {
    const el = viewportRef.current;
    if (!el) return 336;

    const card = el.querySelector<HTMLElement>('[data-sd-course-card="1"]');
    const track = el.querySelector<HTMLElement>(".sd-home-course-marquee__track");

    
    // SD_COURSES_MOBILE_AUTOSCROLL_V7
    const sdIsMobile = typeof window !== "undefined" && (window.matchMedia("(max-width: 767px)").matches || window.matchMedia("(pointer: coarse)").matches);
    const sdReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let _sdRaf: number | null = null;
    let sdPaused = false;
    let _sdResumeTimer: unknown = null;

    const sdGetPrimaryCards = () =>
      Array.from(el.querySelectorAll<HTMLElement>(".sd-home-course-card")).slice(0, courses.length);

    const sdSetDotFromScroll = () => {
      try {
        const cards = sdGetPrimaryCards();
        if (!cards.length) return;
        const center = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDist = Number.POSITIVE_INFINITY;

        for (let i = 0; i < cards.length; i++) {
          const c = cards[i];
          const mid = c.offsetLeft + c.offsetWidth / 2;
          const d = Math.abs(mid - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        }
        setActiveDot(best);
      } catch {}
    };

    const sdPause = () => { sdPaused = true; el.classList.add("is-paused"); };
    const sdResumeSoon = () => {
      _sdResumeTimer = setTimeout(() => {
        sdPaused = false;
        el.classList.remove("is-paused");
      }, 900);
    };

    const sdOnUserStart = () => sdPause();
    const sdOnUserEnd   = () => { sdSetDotFromScroll(); sdResumeSoon(); };
    const sdOnUserScroll = () => { sdSetDotFromScroll(); sdPause(); sdResumeSoon(); };

    if (sdIsMobile) {
      el.addEventListener("touchstart", sdOnUserStart as any, { passive: true } as any);
      el.addEventListener("touchend",   sdOnUserEnd as any,   { passive: true } as any);
      el.addEventListener("pointerdown", sdOnUserStart as any);
      el.addEventListener("pointerup",   sdOnUserEnd as any);
      el.addEventListener("scroll",      sdOnUserScroll as any, { passive: true } as any);

      const sdHalf = () => Math.max(1, Math.floor(el.scrollWidth / 2));

      const sdTick = () => {
        if (!sdReduced && !sdPaused) {
          if (el.getAttribute("data-sd-scrollmode") !== "manual") {
          el.scrollLeft += 0.55;
        }
          const half = sdHalf();
          if (el.scrollLeft >= half) el.scrollLeft -= half;
          sdSetDotFromScroll();
        }
        _sdRaf = window.requestAnimationFrame(sdTick);
      };

      sdSetDotFromScroll();
      _sdRaf = window.requestAnimationFrame(sdTick);
    }
const cardW = card ? card.offsetWidth : 320;

    let gap = 16;
    if (track && typeof window !== "undefined") {
      const cs = window.getComputedStyle(track);
      const g = (cs as any).gap || (cs as any).columnGap || "";
      const n = parseFloat(g || "16");
      if (Number.isFinite(n) && n > 0) gap = n;
    }

    return cardW + gap;
  };

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !lenCourses) return;

    const update = () => {
      const step = getStep();
      const idx = Math.round(el.scrollLeft / step) % lenCourses;
      setActiveDot(Number.isFinite(idx) ? idx : 0);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // SD_USER_SCROLL_PAUSE_V6 (mobile swipe/scroll pauses marquee, resumes after 900ms)
    let _sdResumeTimerV6: unknown = null;
    const sdPauseV6 = () => el.classList.add("is-paused");
    const sdResumeSoonV6 = () => {
      _sdResumeTimerV6 = setTimeout(() => el.classList.remove("is-paused"), 900);
    };
    const sdOnUserStartV6 = () => sdPauseV6();
    const sdOnUserEndV6   = () => sdResumeSoonV6();
    const sdOnUserScrollV6 = () => { sdPauseV6(); sdResumeSoonV6(); };

    el.addEventListener("touchstart", sdOnUserStartV6 as any, { passive: true } as any);
    el.addEventListener("touchend",   sdOnUserEndV6 as any,   { passive: true } as any);
    el.addEventListener("pointerdown", sdOnUserStartV6 as any, { passive: true } as any);
    el.addEventListener("pointerup",   sdOnUserEndV6 as any,   { passive: true } as any);
    el.addEventListener("scroll",      sdOnUserScrollV6 as any, { passive: true } as any);


    return () => {
      // SD_COURSES_MOBILE_AUTOSCROLL_V7_CLEANUP
      try {
        el.removeEventListener("touchstart", sdOnUserStartV6 as any);
        el.removeEventListener("touchend",   sdOnUserEndV6 as any);
        el.removeEventListener("pointerdown", sdOnUserStartV6 as any);
        el.removeEventListener("pointerup",   sdOnUserEndV6 as any);
        el.removeEventListener("scroll",      sdOnUserScrollV6 as any);
      } catch {}

      // SD_USER_SCROLL_PAUSE_V6_CLEANUP
      el.removeEventListener("touchstart", sdOnUserStartV6 as any);
      el.removeEventListener("touchend",   sdOnUserEndV6 as any);
      el.removeEventListener("pointerdown", sdOnUserStartV6 as any);
      el.removeEventListener("pointerup",   sdOnUserEndV6 as any);
      el.removeEventListener("scroll",      sdOnUserScrollV6 as any);

      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [lenCourses]);

  const scrollToIndex = (i: number) => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollTo({ left: i * getStep(), behavior: "smooth" });
  };

  return (
    <section className="mt-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">Courses</h2>
            <p className="mt-2 text-sm md:text-base text-[#B0B7C3]">
              Graphic Design + Video Editing. Tool-first. Portfolio output.
            </p>
          </div>

          <Link
            href="/courses"
            className="sd-btn-secondary inline-flex items-center justify-center px-4 py-2 text-sm sd-courses-viewall"
         >
            View all
          </Link>
        </div>
      </div>

      <FullBleed>
        <div className="mt-6 border-y border-[rgba(255,255,255,0.10)] bg-[#0B1220]">
          <div className="px-4 py-6">
            <style jsx global>{`
              .sd-home-course-marquee.is-js-scroll .sd-home-course-marquee__track {
                animation-play-state: running !important;
              }
            

/* SD_COURSES_MOBILE_SCROLL_V1 */
@media (max-width: 767px){
  .sd-home-course-marquee{
    overflow-x: auto !important;
    overflow-y: hidden !important;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    touch-action: pan-y;
  }
  .sd-home-course-marquee__track{
    padding-bottom: 10px; /* room for swipe; scrollbar hidden via sd-home-scrollbar-hide */
  }
}
/* subtle gold thumb if scrollbar shows on some browsers */
/* SD_SCROLLBAR_STYLE_DISABLED_V1_START */
/* .sd-course-scroll::-webkit-scrollbar{ height: 6px; } */
/* SD_SCROLLBAR_STYLE_DISABLED_V1_END */
/* SD_SCROLLBAR_STYLE_DISABLED_V1_START */
/* .sd-course-scroll::-webkit-scrollbar-thumb{ background: rgba(245,179,1,0.55); border-radius: 999px; } */
/* SD_SCROLLBAR_STYLE_DISABLED_V1_END */
/* SD_SCROLLBAR_STYLE_DISABLED_V1_START */
/* .sd-course-scroll::-webkit-scrollbar-track{ background: rgba(255,255,255,0.06); border-radius: 999px; } */
/* SD_SCROLLBAR_STYLE_DISABLED_V1_END */

            /* SD_COURSE_VIEWBTN_NEON_V1 */
            .sd-home-course-card a[href^="/courses/"],
            .sd-home-course-card a[href^="/courses/"]:visited{
              background: #F5B301 !important;
              color: #0B1220 !important;
            }
            .sd-home-course-card a[href^="/courses/"]:hover{
              background: #F5B301 !important;
              color: #0B1220 !important;
              box-shadow: 0 0 18px rgba(245,179,1,0.55);
              transform: translateY(-1px);
            }
            .sd-home-course-card a[href^="/courses/"]:focus-visible{
              outline: none;
              box-shadow: 0 0 0 2px rgba(37,99,235,0.55), 0 0 18px rgba(245,179,1,0.55);
            }

            /* SD_COURSE_MOBILE_SCROLL_V7 */
            @media (max-width: 767px){
              .sd-home-course-marquee{
                overflow-x: auto !important;
                overflow-y: hidden !important;
                -webkit-overflow-scrolling: touch;
                overscroll-behavior-x: contain;
                touch-action: pan-x pan-y;
              }
              /* mobile: use real scroll (JS auto-scroll below), so stop CSS marquee animation */
              .sd-home-course-marquee__track{
                animation: none !important;
              }
            }


            /* SD_COURSE_VIEWBTN_NEON_V2 (keep gold + black text; hover neon gold, no blue) */
            .sd-home-course-card a[href^="/courses/"],
            .sd-home-course-card a[href^="/courses/"]:visited {
              background: #F5B301 !important;
              color: #0B1220 !important;
              border-color: rgba(245,179,1,0.55) !important;
            }
            .sd-home-course-card a[href^="/courses/"]:hover,
            .sd-home-course-card a[href^="/courses/"]:focus-visible {
              background: #F5B301 !important;
              color: #0B1220 !important;
              box-shadow: 0 0 18px rgba(245,179,1,0.55) !important;
              transform: translateY(-1px);
            }
            .sd-home-course-card a[href^="/courses/"]:active {
              transform: translateY(0);
            }

            /* SD_COURSE_MOBILE_SCROLL_V8 (mobile swipe + snap; stop CSS animation so manual scroll works) */
            @media (max-width: 767px) {
              .sd-home-course-marquee {
                overflow-x: auto !important;
                overflow-y: hidden !important;
                -webkit-overflow-scrolling: touch;
                overscroll-behavior-x: contain;
                scroll-snap-type: x mandatory;
                touch-action: pan-x pan-y;
              }
              .sd-home-course-marquee__track {
                animation: none !important;
                padding-bottom: 10px;
              }
              .sd-home-course-card {
                scroll-snap-align: start;
              }
            }


/* SD_COURSES_COLOR_SAFE_V1 */
.sd-course-cta{ background:#F5B301 !important; color:#0B1220 !important; }
.sd-course-cta:hover{ background:#F5B301 !important; color:#0B1220 !important; box-shadow:0 0 18px rgba(245,179,1,0.55) !important; }
.sd-course-cta:visited{ color:#0B1220 !important; }


/* SD_COURSES_COLOR_FIX_V1 */
/* Force View Course button: gold + black, hover = gold neon (no blue) */
.sd-home-course-card a[href^="/courses/"],
.sd-home-course-card a[href^="/courses/"]:visited{
  background: #F5B301 !important;
  color: #0B1220 !important;
}

.sd-home-course-card a[href^="/courses/"]:hover,
.sd-home-course-card a[href^="/courses/"]:focus,
.sd-home-course-card a[href^="/courses/"]:focus-visible{
  background: #F5B301 !important;
  color: #0B1220 !important;
  box-shadow: 0 0 18px rgba(245,179,1,0.55) !important;
}

/* Prevent any generic hover rules from flipping to blue */
.sd-home-course-card a[href^="/courses/"]:hover *{
  color: #0B1220 !important;
}


  /* SD_COURSE_DOT_CSS_V13 */
  button.sd-course-dot-btn{
    height: 8px !important;
    width: 8px !important;
    border-radius: 999px !important;
    background: rgba(255,255,255,0.25) !important;
    box-shadow: none !important;
    border: 0 !important;
    padding: 0 !important;
    transition: width 160ms ease, background 160ms ease, box-shadow 160ms ease;
  }
  button.sd-course-dot-btn.sd-course-dot-btn--active{
    width: 32px !important;
    background: #F5B301 !important;
    box-shadow: 0 0 18px rgba(245,179,1,0.55) !important;
  }


/* SD_AI_TOOLS_STYLE_V5: AI tools layout like sample + neon border animation */
[data-sd-ai-tools="1"] .sd-ai-tools-grid {
  gap: 18px;
}

[data-sd-ai-tools="1"] .sd-ai-tool-card {
  position: relative;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(17,24,39,0.55);
  border-radius: 24px;
  padding: 22px;
  text-align: center;
  box-shadow: 0 0 0 rgba(37,99,235,0);
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
  animation: sdAiNeonPulse 3.2s ease-in-out infinite;
}

@keyframes sdAiNeonPulse {
  0%, 100% {
    box-shadow: 0 0 18px rgba(37,99,235,0.18);
    border-color: rgba(255,255,255,0.10);
  }
  50% {
    box-shadow: 0 0 18px rgba(37,99,235,0.40);
    border-color: rgba(37,99,235,0.35);
  }
}

[data-sd-ai-tools="1"] .sd-ai-tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 18px rgba(37,99,235,0.55);
  border-color: rgba(37,99,235,0.55);
}

[data-sd-ai-tools="1"] .sd-ai-tool-logoBox {
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  padding: 14px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px auto;
  overflow: hidden;
}

[data-sd-ai-tools="1"] .sd-ai-tool-logo {
  max-height: 44px;
  width: auto;
  object-fit: contain;
}

[data-sd-ai-tools="1"] .sd-ai-tool-card h3,
[data-sd-ai-tools="1"] .sd-ai-tool-card .sd-ai-tool-title {
  margin-top: 6px;
  font-weight: 600;
  color: #ffffff;
  font-size: 16px;
}

[data-sd-ai-tools="1"] .sd-ai-tool-card p,
[data-sd-ai-tools="1"] .sd-ai-tool-card .sd-ai-tool-desc {
  margin-top: 8px;
  color: #B0B7C3;
  font-size: 13px;
  line-height: 1.45;
}

/* SD_LOGO_PLATE_SD_FIX_V15 (uniform rectangle behind every logo; +10px padding) */
.sd-logo-plate{
  background:#FFFFFF !important;
  border:1px solid rgba(0,0,0,0.10) !important;
  border-radius:14px !important;
  padding:10px !important;
  width:100% !important;
  min-height:92px !important;
  display:flex !important;
  align-items:center !important;
  justify-content:center !important;
  overflow:hidden !important;
}

.sd-logo-img{
  background:transparent !important;
  padding:0 !important;
  border:0 !important;
  border-radius:0 !important;
  box-shadow:none !important;
  width:auto !important;
  height:auto !important;
  max-height:72px !important;
  max-width:320px !important;
  object-fit:contain !important;
  filter:none !important;
}

`}</style>

            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-xs text-[#9CA3AF]">Courses</div>
</div>


                        <div id="sd-courses-marquee" data-sd-scrollmode={scrollMode} className="sd-marquee overflow-x-auto sd-no-scrollbar sd-home-scrollbar-hide sd-home-scrollbar-hide">
<div data-sd-autoscroll="courses"
              className="sd-home-scrollbar-hide  sd-marquee__track"
              style={{ WebkitOverflowScrolling: "touch" }}
              aria-label="Courses carousel"
              data-sd-course-viewport="1"
              
           >
              <div className={`sd-home-course-marquee ${jsScroll ? "is-js-scroll" : ""} sd-home-scrollbar-hide sd-course-scroll`} data-sd-autoscroll="courses" style={{ touchAction: "pan-x pan-y" }}>
                <div className="sd-home-course-marquee__track">
                  {loop.map((c, idx) => (
                    <article
                      key={`${c.slug}-${idx}`}
                      className="sd-home-course-card sd-card"
                      data-sd-course-card="1"
                   >
                      <div
                        className="sd-home-course-card__media"
                        aria-hidden="true"
                        style={{
                          backgroundImage: c.image ? `url(${c.image})` : undefined,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="p-4">
                        <div className="text-base md:text-lg font-semibold text-white">
                          {c.title}
                        </div>

                        {c.subtitle ? (
                          <div className="mt-1 text-sm text-[#B0B7C3]">{c.subtitle}</div>
                        ) : null}

                        <div className="mt-3 flex flex-wrap gap-2">
                          {c.chips.map((chip) => (
                            <span
                              key={chip}
                              className="text-xs px-2 py-1 rounded-full border border-[rgba(255,255,255,0.10)] text-[#B0B7C3]"
                           >
                              {chip}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4">
                          <Link
                            href={`/courses/${c.slug}`}
                            className="sd-course-cta inline-flex items-center justify-center w-full px-4 py-2 text-sm rounded-xl border border-[rgba(255,255,255,0.10)] !bg-[#F5B301] !text-[#0B1220] hover:!bg-[#F5B301] hover:!text-[#0B1220] hover:shadow-[0_0_18px_rgba(245,179,1,0.55)] focus-visible:shadow-[0_0_18px_rgba(245,179,1,0.55)] font-light"  style={{ fontWeight: 300 }}>
                            View Course
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 lg:hidden z-10 sd-dots-scroll overflow-x-auto sd-no-scrollbar sd-home-scrollbar-hide overflow-y-hidden sd-home-scrollbar-hide touch-pan-x whitespace-nowrap inline-flex" aria-label="Course pagination">
              {courses.map((_, i) => {
                const n = (typeof courses !== "undefined" && Array.isArray(courses) && courses.length) ? courses.length : 1;
                const curRaw = (typeof activeDot === "number" && Number.isFinite(activeDot)) ? activeDot : 0;
                const cur = (((curRaw % n) + n) % n);
                const isActive = i === cur;

                return (
                  <button
                    key={`dot-${i}`}
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Go to course ${i + 1}`}
                    className={isActive ? "sd-course-dot-btn sd-course-dot-btn--active" : "sd-course-dot-btn"}
                      style={{
                        width: isActive ? 32 : 8,
                        background: isActive ? "#F5B301" : "rgba(255,255,255,0.25)",
                        boxShadow: isActive ? "0 0 18px rgba(245,179,1,0.55)" : "none",
                      }}
                  />
                );
              })}
            </div>
          </div>
            </div>
        </div>
      </FullBleed>
    </section>
  );
}

/* SD_VIDEO_REVIEWS_SCROLL_V5 */
function ReviewsHome() {
  const [scrollMode, setScrollMode] = useState<"auto" | "manual">("auto");
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ down: false, x: 0, left: 0 });

  // which video is currently playing (controls overlay visibility)
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  // pause auto when any video is playing
  const anyPlayingRef = useRef(false);

  const items = useMemo(() => videoReviews.concat(videoReviews), []);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const pauseAllExcept = (keepIndex: number) => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i == keepIndex) return;
      try { v.pause(); } catch {}
    });
  };

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let id: any = null;

    const tick = () => {
      if (scrollMode !== "auto") return;
      if (anyPlayingRef.current) return;
      if (dragRef.current.down) return;

      el.scrollLeft += 2;
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft = 0;
    };

    if (scrollMode === "auto") {
      id = setInterval(tick, 16);
    }

    return () => {
      if (id) clearInterval(id);
    };
  }, [scrollMode]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = viewportRef.current;
    if (!el) return;
    const first = el.querySelector("[data-sd-video-card='1']") as HTMLElement | null;
    const step = first ? first.offsetWidth + 16 : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (scrollMode !== "manual") return;
    const el = viewportRef.current;
    if (!el) return;
    dragRef.current.down = true;
    dragRef.current.x = e.pageX;
    dragRef.current.left = el.scrollLeft;
  };
  const onMouseLeave = () => { dragRef.current.down = false; };
  const onMouseUp = () => { dragRef.current.down = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (scrollMode !== "manual") return;
    if (!dragRef.current.down) return;
    const el = viewportRef.current;
    if (!el) return;
    e.preventDefault();
    const walk = (e.pageX - dragRef.current.x) * 1.15;
    el.scrollLeft = dragRef.current.left - walk;
  };

  return (
    <section className="mt-14" aria-label="Video Reviews">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center" data-sd-learner-proof="1">
          <h2 className="text-2xl md:text-4xl font-semibold text-white">
            Learner Video Testimonials
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#B0B7C3]">
            Real learners sharing their learning experience and outcomes.
          </p>
</div>

        <div
          className="mt-8 relative border border-white/10 rounded-3xl bg-[#111827] p-4 md:p-6 overflow-hidden"
          style={{ boxShadow: "0 0 18px rgba(37,99,235,0.16)" }}
        >
          {/* subtle ambience */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute -top-24 left-1/3 h-64 w-64 rounded-full blur-3xl opacity-25"
              style={{ background: "rgba(37,99,235,0.55)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" />
          </div>

          {/* arrows */}
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByCard(-1)}
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-white/10 bg-[#0B1220]/70 backdrop-blur grid place-items-center text-white/90 hover:bg-[#0B1220]"
            style={{ boxShadow: "0 0 18px rgba(37,99,235,0.18)" }}
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByCard(1)}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-white/10 bg-[#0B1220]/70 backdrop-blur grid place-items-center text-white/90 hover:bg-[#0B1220]"
            style={{ boxShadow: "0 0 18px rgba(37,99,235,0.18)" }}
          >
            ›
          </button>

          <div
            ref={viewportRef}
            onWheel={() => setScrollMode("manual")}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className={[
              "relative z-0 overflow-x-auto sd-no-scrollbar overflow-y-hidden",
              "sd-hide-scrollbar sd-no-scrollbar",
              scrollMode === "manual" ? "snap-x snap-mandatory cursor-grab active:cursor-grabbing" : "",
              "scroll-smooth",
            ].join(" ")}
          >
            <div className="flex gap-4 md:gap-6 w-max pr-10 md:pr-14">
              {items.map((v, idx) => (
                <div
                  key={idx}
                  data-sd-video-card="1"
                  className="snap-start shrink-0 w-[260px] md:w-[320px]"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[9/16]">
                    <video
                      ref={(el) => { videoRefs.current[idx] = el; }}
                      src={v.src}
                      controls
                      preload="metadata"
                      playsInline
                      className="w-full h-full object-cover"
                      onPlay={() => {
                        pauseAllExcept(idx);
                        anyPlayingRef.current = true;
                        setPlayingIdx(idx);
                        setScrollMode("manual");
                      }}
                      onPause={() => {
                        anyPlayingRef.current = false;
                        setPlayingIdx((cur) => (cur === idx ? null : cur));
                      }}
                      onEnded={() => {
                        anyPlayingRef.current = false;
                        setPlayingIdx((cur) => (cur === idx ? null : cur));
                      }}
                    />

                    {/* Center Play Overlay - only when NOT playing */}
                    {playingIdx !== idx && (
                      <button
                        type="button"
                        aria-label="Play video"
                        onClick={() => {
                          const vid = videoRefs.current[idx];
                          if (!vid) return;
                          pauseAllExcept(idx);
                          anyPlayingRef.current = true;
                          setPlayingIdx(idx);
                          setScrollMode("manual");
                          try { vid.play(); } catch {}
                        }}
                        className="absolute inset-0 grid place-items-center"
                      >
                        <span
                          className="grid place-items-center h-14 w-14 md:h-16 md:w-16 rounded-full border border-white/15 bg-[#0B1220]/55 backdrop-blur"
                          style={{ boxShadow: "0 0 18px rgba(37,99,235,0.35)" }}
                        >
                          <span className="ml-1 text-white text-xl md:text-2xl">▶</span>
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
</div>
      </div>
    </section>
  );
}


function FaqHome() {
  const items = [
    {
      q: "Will I get a certificate for attending the workshop?",
      a: "Yes. Certificates are provided to participants after completion. Delivery is shared after the workshop ends.",
    },
    {
      q: "Do you get a different certificate for completing the tasks?",
      a: "If tasks are part of the workshop, a separate completion certificate may be provided based on submission and review criteria (if applicable).",
    },
    {
      q: "Do we get recordings of the workshop?",
      a: "Recordings availability depends on the workshop format. If recordings are enabled, access details are shared after the session.",
    },
  ];

  return (
    <section className="mt-14" aria-label="FAQ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="border border-white/10 rounded-3xl bg-[#111827] p-6 md:p-10">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-semibold text-white">FAQs</h2>
            <p className="mt-2 text-sm md:text-base text-[#B0B7C3]">
              Quick answers about certificate, tasks, and recordings.
            </p>
          </div>

          <div className="mt-8 divide-y divide-white/10">
            {items.map((it, idx) => (
              <details key={idx} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-base md:text-lg font-semibold text-white">
                    {it.q}
                  </span>

                  <span
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5"
                    style={{ boxShadow: "0 0 18px rgba(37,99,235,0.20)" }}
                    aria-hidden
                  >
                    <span className="text-[#2563EB] text-lg leading-none group-open:hidden">+</span>
                    <span className="text-[#2563EB] text-lg leading-none hidden group-open:inline">−</span>
                  </span>
                </summary>

                <div className="mt-3 text-sm md:text-base text-[#B0B7C3] leading-relaxed">
                  {it.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* SD_TEXTREVIEWS_SCROLL_V1 */
function TextReviewsHome() {
  // Auto vs manual scroll (same pattern as Courses marquee)
  const [scrollMode, setScrollMode] = useState<"auto" | "manual">("auto");
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const dragRef = useRef({ down: false, x: 0, left: 0 });

  // Duplicate list for seamless loop
  const items = useMemo(() => textReviews.concat(textReviews), []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let timer: any = null;

    const tick = () => {
      if (scrollMode !== "auto") return;
      if (pausedRef.current) return;

      // 1px per tick = smooth; adjust if needed
      el.scrollLeft += 2;

      // When we reach half (because list is duplicated), jump back
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) {
        el.scrollLeft = 0;
      }
    };

    if (scrollMode === "auto") {
      timer = setInterval(tick, 16);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [scrollMode]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onEnter = () => (pausedRef.current = true);
    const onLeave = () => (pausedRef.current = false);

    // On touch/drag: pause auto and allow manual control
    const onTouchStart = () => {
      pausedRef.current = true;
      setScrollMode("manual");
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onTouchStart as any);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (scrollMode !== "manual") return;
    const el = viewportRef.current;
    if (!el) return;
    dragRef.current.down = true;
    dragRef.current.x = e.pageX;
    dragRef.current.left = el.scrollLeft;
  };

  const onMouseLeave = () => {
    dragRef.current.down = false;
  };

  const onMouseUp = () => {
    dragRef.current.down = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (scrollMode !== "manual") return;
    if (!dragRef.current.down) return;
    const el = viewportRef.current;
    if (!el) return;
    e.preventDefault();
    const walk = (e.pageX - dragRef.current.x) * 1.2;
    el.scrollLeft = dragRef.current.left - walk;
  };

  return (
    <section className="mt-14" aria-label="Text Reviews">
      <div className="max-w-6xl mx-auto px-4">
        <div data-sd-learner-proof className="text-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-white">
            Learner Feedback & Experiences
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#B0B7C3] max-w-3xl mx-auto">
            Short, written feedback based on real learning outcomes, practical projects, and hands-on course experience.
          </p>
</div>

        <div className="mt-8 border border-white/10 rounded-3xl bg-white/[0.03] p-4 md:p-6">
          <div
            ref={viewportRef}
            onWheel={() => { pausedRef.current = true; setScrollMode('manual'); }}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className={[
              "overflow-x-auto sd-no-scrollbar overflow-y-hidden",
              "scroll-smooth",
              scrollMode === "manual" ? "snap-x snap-mandatory" : "",
              "sd-hide-scrollbar sd-no-scrollbar",
              scrollMode === "manual" ? "cursor-grab active:cursor-grabbing" : "",
            ].join(" ")}
          >
            <div className="flex gap-4 md:gap-6 w-max pr-8">
              {items.map((t, idx) => (
                <div
                  key={`${t.name}-${idx}`}
                  className="snap-start shrink-0 w-[320px] md:w-[420px] rounded-3xl bg-white text-[#0B1220] border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                >
                  <div className="p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-[#EEF2FF] grid place-items-center text-sm font-semibold">
                          {t.name?.trim()?.[0] || "S"}
                        </div>
                        <div>
                          <div className="text-lg font-semibold">{t.name}</div>
                          <div className="text-sm text-black/60">{t.role}</div>
                        </div>
                      </div>

                      <div className="h-10 w-10 rounded-xl bg-[#EEF2FF] grid place-items-center text-xs font-semibold">
                        f
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-xs">Combined</span>
                      <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-xs">Projects</span>
                      <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-xs">Support</span>
                    </div>

                    <div className="mt-5 text-[15px] leading-relaxed">
                      <span className="text-2xl leading-none">“</span>
                      {t.text}
                      <span className="text-2xl leading-none">”</span>
                    </div>

                    <div className="mt-7 flex items-center justify-between text-sm">
                      <div className="text-black/60">Sikhadenge • Learner feedback</div>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-xl bg-[#EEF2FF] border border-black/10 text-sm font-medium"
                      >
                        Read
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
</div>
      </div>
    </section>
  );
}


function WhoItsForHome() {
  const chips = [
    "Designers & Creatives",
    "Students & Freshers",
    "Freelancers",
    "Working Professionals",
    "Content Creators",
    "Small Business Owners",
    "Marketing Teams",
    "Founders & Entrepreneurs",
    "Career Switchers",
  ];

  return (
    <section className="mt-14" aria-label="Who It's For">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="relative overflow-hidden border border-white/10 rounded-3xl bg-[#111827] px-6 py-8 md:px-10 md:py-10"
          style={{
            boxShadow:
              "0 0 18px rgba(37,99,235,0.22), 0 0 18px rgba(245,179,1,0.14)",
          }}
        >
          {/* subtle neon ambience (brand-safe) */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-3xl opacity-40"
              style={{ background: "rgba(37,99,235,0.55)" }}
            />
            <div
              className="absolute -bottom-28 right-10 h-72 w-72 rounded-full blur-3xl opacity-25"
              style={{ background: "rgba(245,179,1,0.55)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" />
          </div>

          <div className="relative max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Who It&#39;s For
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#B0B7C3] max-w-3xl mx-auto">
              Suitable for learners who want practical, tool-based skills and output-focused practice.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {chips.map((c) => (
                <span
                  key={c}
                  className="px-4 md:px-5 py-2 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm text-white/95
                             shadow-[0_0_18px_rgba(255,255,255,0.04)]
                             hover:border-white/20 hover:bg-white/10"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function SkillsGapSection() {
  return (
    <section className="mt-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <div className="text-xs md:text-sm text-[#9CA3AF] tracking-wide">
            The Future Of Work Is Shifting
          </div>

          <h2 className="mt-2 text-2xl md:text-4xl font-semibold text-white leading-tight">
            And The Skills Gap Is Your{" "}
            <span className="text-[#2563EB]">Opportunity</span>
          </h2>

          <p className="mt-3 text-sm md:text-base text-[#B0B7C3] max-w-3xl mx-auto">
            Graphic Design + Video Editing me ab output speed, workflow, aur AI-assisted execution
            practical requirement ban raha hai. Structured practice se gap close hota hai.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="pl-6 border-l-2 border-[#2563EB]">
            <div className="text-3xl font-semibold text-white">40-60%</div>
            <div className="mt-2 text-sm text-[#B0B7C3] leading-relaxed">
              Routine work activities automate ho sakti hain (AI). <span className="text-[#9CA3AF]">Deloitte</span>
            </div>
          </div>

          <div className="pl-6 border-l-2 border-[#2563EB]">
            <div className="text-3xl font-semibold text-white">66%</div>
            <div className="mt-2 text-sm text-[#B0B7C3] leading-relaxed">
              Creative pros (GenAI users) bolte hain AI se better content banta hai. <span className="text-[#9CA3AF]">Adobe Blog</span>
            </div>
          </div>

          <div className="pl-6 border-l-2 border-[#2563EB]">
            <div className="text-3xl font-semibold text-white">90%</div>
            <div className="mt-2 text-sm text-[#B0B7C3] leading-relaxed">
              Creative pros bolte hain AI se output/quantity increase hua. <span className="text-center mt-2 text-base md:text-xl text-[#2563EB] font-medium">Adobe Blog</span>
            </div>
          </div>

          <div className="pl-6 border-l-2 border-[#2563EB]">
            <div className="text-3xl font-semibold text-white">94%</div>
            <div className="mt-2 text-sm text-[#B0B7C3] leading-relaxed">
              Marketers AI ko creative process ka starting point mante hain.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// SD_AI_TOOLS_DATA_V3 (module scope)
const _SD_AI_TOOLS = [
  { name: "ChatGPT",      logo: "/images/ai-tools/chatgpt.png",      desc: "Conversational AI for content creation, ideation, and automation." },
  { name: "Gemini",       logo: "/images/ai-tools/gemini.png",       desc: "Multimodal AI for advanced search, analysis, and writing." },
  { name: "NotebookLM",   logo: "/images/ai-tools/notebooklm.png",   desc: "AI-powered document exploration and insight extraction." },
  { name: "Julius",       logo: "/images/ai-tools/julius.png",       desc: "AI analyst for turning spreadsheets into smart dashboards." },
  { name: "Google AI Studio", logo: "/images/ai-tools/google-ai-studio.png", desc: "Developer tool to build and test models via APIs." },
  { name: "Notion",       logo: "/images/ai-tools/notion.png",       desc: "Productivity platform with AI for notes, summaries, and workflows." },
  { name: "Microsoft Copilot", logo: "/images/ai-tools/copilot.png", desc: "AI assistant embedded across Microsoft 365 for content and automation." },
] as const;


export default function HomePage() {


  // SD_QS_GUARD_V1: prevent crash on invalid selectors (e.g. "[]")
  useEffect(() => {
    if (typeof document === "undefined") return;

    const docQS = document.querySelector.bind(document);
    const docQSA = document.querySelectorAll.bind(document);

    const safeSel = (sel: any) => {
      if (typeof sel !== "string") return null;
      const t = sel.trim();
      if (!t) return null;
      if (t === "[]") return null;
      return t;
    };

    // Patch document
    (document as any).querySelector = (sel: any) => {
      try {
        const t = safeSel(sel);
        if (!t) return null;
        return docQS(t);
      } catch {
        return null;
      }
    };

    (document as any).querySelectorAll = (sel: any) => {
      try {
        const t = safeSel(sel);
        if (!t) return document.querySelectorAll("__never__");
        return docQSA(t);
      } catch {
        return document.querySelectorAll("__never__");
      }
    };

    // Patch Element.prototype too (for element.querySelector calls)
    const elProto: any = (typeof Element !== "undefined" ? Element.prototype : null);
    const elQS = elProto?.querySelector?.bind(elProto);
    const elQSA = elProto?.querySelectorAll?.bind(elProto);

    if (elProto && elQS && elQSA) {
      const origElQS = elProto.querySelector;
      const origElQSA = elProto.querySelectorAll;

      elProto.querySelector = function (sel: any) {
        try {
          const t = safeSel(sel);
          if (!t) return null;
          return origElQS.call(this, t);
        } catch {
          return null;
        }
      };

      elProto.querySelectorAll = function (sel: any) {
        try {
          const t = safeSel(sel);
          if (!t) return (this as Element).querySelectorAll("__never__");
          return origElQSA.call(this, t);
        } catch {
          return (this as Element).querySelectorAll("__never__");
        }
      };
    }

    // No cleanup restore (safe for runtime). If you want restore, we can add.
  }, []);

  const [counsellingOpen, setCounsellingOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <SdHomeEffects />
        {/* (1) HERO */}
<section className="relative mt-6 sm:mt-10">
  <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <div className="rounded-3xl border border-white/10 bg-[#0B1220]/30 px-6 py-10 sm:px-10 sm:py-14 shadow-[0_0_18px_rgba(37,99,235,0.55)]">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Become a Gen-AI Creative Professional
            <br />
            
            </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Live online classes with daily practice, real projects, industry-standard tools, and certification.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#F5B301] px-6 py-3 text-sm font-semibold text-black shadow-[0_0_18px_rgba(245,179,1,0.55)] sm:w-auto"
              onClick={() => setCounsellingOpen(true)}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-black/10">☎</span>
              Free 1:1 Counselling
            </button>

            <a
              href="https://www.instagram.com/sikhadenge.ai/"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
             target="_blank" rel="noopener noreferrer">
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
          </div>

          <p className="mt-3 text-xs text-white/50">
            Details are used only for counselling and scheduling.
          </p>
        </div>

        <div className="min-w-0">
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-4 shadow-[0_0_18px_rgba(37,99,235,0.55)]">
            <div className="mb-2 flex items-center justify-between text-xs text-white/70">
              <span>Real class preview</span>
              <span>click to play</span>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
              <video
                controls
                className="h-auto w-full"
                preload="metadata"
                playsInline
                poster="/demo/thumbs/hero-demo.jpg"
              >
                <source src="/demo/ai-expert-program-live.mp4?v=20260405-final-1" type="video/mp4" />
              </video>
            </div>

            <p className="mt-3 text-xs text-white/60">
              Screen recording from live class (tools + steps + output).
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_18px_rgba(37,99,235,0.55)]">
          <div className="text-sm font-semibold text-white">Structured learning</div>
          <div className="mt-1 text-sm text-white/65">Daily tasks, weekly milestones, clear outcomes.</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_18px_rgba(37,99,235,0.55)]">
          <div className="text-sm font-semibold text-white">Portfolio output</div>
          <div className="mt-1 text-sm text-white/65">Project-based builds you can show.</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_18px_rgba(37,99,235,0.55)]">
          <div className="text-sm font-semibold text-white">Support + review</div>
          <div className="mt-1 text-sm text-white/65">Feedback loops to improve faster.</div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* (2) COMPANIES MARQUEE */}
        <CompaniesMarquee />

        {/* (3) COURSES (auto-scrolling, manual scroll enabled) */}
        <CoursesMarquee />

          <SkillsGapSection />

        {/* Curriculum snapshot (kept as a small section; minimal change) */}
        <section className="mt-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="sd-card border border-[rgba(255,255,255,0.10)] rounded-3xl bg-[#111827] p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-center text-4xl md:text-6xl font-semibold tracking-tight">Curriculum snapshot</h2>
                  <p className="mt-2 text-sm md:text-base text-[#B0B7C3]">
                    Tools + fundamentals + projects + portfolio presentation.
                  </p>
                </div>
                <Link
                  href="/courses"
                  className="text-sm text-[#B0B7C3] hover:text-white underline underline-offset-4"
               >
                  Full curriculum
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="sd-card bg-[#0B1220] border border-[rgba(255,255,255,0.10)] rounded-2xl p-4">
                  <div className="text-sm font-semibold">Week-by-week structure</div>
                  <div className="mt-1 text-sm text-[#B0B7C3]">Clear progression, practical checkpoints.</div>
                </div>
                <div className="sd-card bg-[#0B1220] border border-[rgba(255,255,255,0.10)] rounded-2xl p-4">
                  <div className="text-sm font-semibold">Assignments + review</div>
                  <div className="mt-1 text-sm text-[#B0B7C3]">Daily practice with improvements tracked.</div>
                </div>
                <div className="sd-card bg-[#0B1220] border border-[rgba(255,255,255,0.10)] rounded-2xl p-4">
                  <div className="text-sm font-semibold">Portfolio packaging</div>
                  <div className="mt-1 text-sm text-[#B0B7C3]">Presentation-ready output for jobs/freelance.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

{/* SD_AI_TOOLS_SECTION_V5 */}
<section className="mt-14">
  {/* SD_AI_TOOLS_SECTION_V5 */}
  <div className="max-w-6xl mx-auto px-4">
    <div className="sd-ai-wrap rounded-3xl border border-[rgba(255,255,255,0.10)] bg-[#111827] p-8 md:p-10">
      <div className="sd-ai-heading text-3xl md:text-4xl font-semibold text-white tracking-tight w-full text-center">From Prompt to Product</div>
      <div className="sd-ai-sub mt-2 text-sm md:text-base text-[#B0B7C3] text-center"><span className="sd-ai-sub-accent">25+ AI Tools in Action</span></div>

      <div className="mt-5 text-sm md:text-base font-semibold text-[#B0B7C3] uppercase tracking-wider text-center">Research &amp; Knowledge Assistant</div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {sdAiTools.map((t, idx) => (
          <div key={t.name} className={`sd-ai-card rounded-2xl p-5 text-center w-full max-w-[380px] border border-[rgba(255,255,255,0.10)] bg-[#0B1220] ${idx === sdAiTools.length - 1 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""}`}>
            <div className="sd-logo-plate">
              <img
                src={t.logo}
                alt={t.name}
                className="sd-logo-img"
                loading="lazy"
              />
            </div>
            <div className="mt-2 text-base font-semibold text-white">{t.name}</div>
            <div className="mt-2 text-sm text-[#B0B7C3] sd-ai-desc">{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


{/* SD_IMAGE_GEN_SECTION_V1_START */}
<section className="mt-14 sd-imggen">
  <div className="max-w-6xl mx-auto px-4">
    <div className="sd-ai-wrap sd-imggen rounded-3xl border border-[rgba(255,255,255,0.10)] bg-[#111827] p-8 md:p-10">
      <div className="sd-ai-heading text-3xl md:text-4xl font-semibold text-white tracking-tight w-full text-center">
        Image Generation &amp; Brand Assets
      </div>
      <div className="sd-ai-sub mt-2 text-sm md:text-base text-[#B0B7C3] text-center">
        <span className="sd-ai-sub-accent">Tools used for visuals, posters, and brand creatives</span>
      </div>

      <div className="mt-5 text-sm md:text-base font-semibold text-[#B0B7C3] uppercase tracking-wider text-center">
        Text-to-Image &amp; Visual Creation
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {sdImageGenTools.map((t, idx) => (
          <div
            key={t.name}
            className={`sd-ai-card rounded-2xl p-5 text-center w-full max-w-[380px] border border-[rgba(255,255,255,0.10)] bg-[#0B1220] ${
              idx === sdImageGenTools.length - 1 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""
            }`}
          >
            <div className="sd-logo-plate">
              <img src={t.logo} alt={t.name} className="sd-logo-img" loading="lazy" />
            </div>

            <div className="text-base font-semibold text-white">{t.name}</div>
            <div className="mt-1 text-sm text-[#B0B7C3]">{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

  {/* SD_VIDEO_VOICE_AVATAR_SECTION_V1 */}
  <section className="mt-14">
    <div className="max-w-6xl mx-auto px-4">
      <div className="rounded-3xl border border-[rgba(255,255,255,0.10)] bg-[#111827] p-6 md:p-8 shadow-[0_0_18px_rgba(37,99,235,0.18)]">

        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Edit Videos with AI, Voice &amp; Avatar Creation Tools
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#2563EB]">
            Tools used for avatars, voice, and video creation
          </p>
          <div className="mt-5 text-xs md:text-sm font-semibold tracking-[0.18em] text-[#B0B7C3]">
            VIDEO, VOICE &amp; AVATAR CREATION
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {sdVideoVoiceAvatarTools.map((t, idx) => (
            <div
              key={t.name}
              className={[
                "rounded-2xl p-6 text-center w-full max-w-[380px]",
                "border border-[rgba(255,255,255,0.10)] bg-[#0B1220]",
                "shadow-[0_0_18px_rgba(37,99,235,0.18)]",
                "hover:shadow-[0_0_28px_rgba(37,99,235,0.45)] hover:border-[rgba(37,99,235,0.35)]",
                "transition-all duration-200",
                idx === sdVideoVoiceAvatarTools.length - 1 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""
              ].join(" ")}
            >
              <div className="sd-logo-plate">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.logo}
                  alt={t.name}
                  className="sd-logo-img"
                  loading="lazy"
                />
              </div>

              <div className="mt-5 text-base md:text-lg font-semibold text-white">
                {t.name}
              </div>
              <p className="mt-2 text-sm text-[#B0B7C3] leading-relaxed">
                {t.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  </section>

{/* SD_IMAGE_GEN_SECTION_V1_END */}


        {/* (4) REVIEWS / TESTIMONIALS */}
        <ReviewsHome />

        
        <TextReviewsHome />

        <WhoItsForHome />

        <FaqHome />

{/* (5) FINAL CTA (bottom counselling) */}
        <section className="mt-14 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="sd-card border border-[rgba(255,255,255,0.10)] rounded-3xl bg-[#111827] p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-white">
                    Need help choosing the right track?
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-[#B0B7C3]">
                    Share your goal and current level. Counsellor will confirm batch and course fit.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    className="sd-btn-primary px-5 py-3 text-sm"
                    onClick={() => setCounsellingOpen(true)}
                 >
                    Open counselling form
                  </button>
</div>
              </div>

              <div className="mt-4 text-xs text-[#9CA3AF]">
                Your details are used only for counselling and scheduling.
              </div>
            </div>
          </div>
        </section>

        <CounsellingModal open={counsellingOpen} onClose={() => setCounsellingOpen(false)} />

        <style jsx global>{`
          /* Hide scrollbar (manual scroll still works) */
          .sd-home-scrollbar-hide {
            scrollbar-width: none;
          }
          .sd-home-scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          /* Logos marquee (reference behavior: translateX(-50%)) */
          .sd-home-marquee {
            overflow: hidden;
            width: 100%;
          }
          .sd-home-marquee__track {
            display: flex;
            width: max-content;
            align-items: center;
            gap: 18px;
            padding: 16px 18px;
            animation: sdMarquee 26s linear infinite;
            will-change: transform;
          }
          .sd-home-marquee--slow .sd-home-marquee__track {
            animation-duration: 34s;
          }
          @keyframes sdMarquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .sd-home-logo {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 180px;
              height: 64px;
              border-radius: 999px;
              overflow: hidden;
              border: 1px solid rgba(255,255,255,0.10);
              background: rgba(17,24,39,0.35);
            }
            @media (max-width: 767px){
              .sd-home-logo{ width: 152px; height: 56px; }
            }
            .sd-home-logo__img{
              width: 100%;
              height: 100%;
              display: block;
              object-fit: contain;
              object-position: center;
              padding: 10px 14px;
              background: #E5E7EB;
              border-radius: 999px;
            }
@media (min-width: 768px) {
              .sd-home-logo { width: 170px; height: 62px; }
            }
            .sd-home-logo img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
            }
/* SD_COURSE_MOBILE_SCROLL_V3 */
            @media (max-width: 767px) {
              .sd-home-course-marquee {
                overflow-x: auto;
                overflow-y: hidden;
                -webkit-overflow-scrolling: touch;
                overscroll-behavior-x: contain;
                touch-action: pan-x pan-y;
              }
              .sd-home-course-marquee__track {
                padding-bottom: 10px;
              }
            }

            /* SD_COURSE_GOLD_FORCE_V2 */
            .sd-home-course-card a[href^="/courses/"],
            .sd-home-course-card a[href^="/courses/"]:hover,
            .sd-home-course-card a[href^="/courses/"]:visited {
              background: #F5B301 !important;
              color: #0B1220 !important;
              border-color: rgba(255,255,255,0.10) !important;
            }

            /* SD_COURSE_MOBILE_SCROLL_V4 (ensure manual swipe works) */
            @media (max-width: 767px) {
              .sd-home-course-marquee {
                overflow-x: auto !important;
                overflow-y: hidden !important;
                -webkit-overflow-scrolling: touch;
                overscroll-behavior-x: contain;
              }
            }
/* Courses marquee (continuous + manual scroll container) */
          .sd-home-course-marquee {
            overflow: hidden;
            width: 100%;
          }
          .sd-home-course-marquee__track {
            display: flex;
            width: max-content;
            gap: 14px;
            padding: 0 18px 6px 18px;
            animation: sdCourseMarquee 38s linear infinite;
            will-change: transform;
          }
          .sd-home-course-marquee.is-paused .sd-home-course-marquee__track {
            animation-play-state: paused;
          }
          .sd-home-course-marquee:hover .sd-home-course-marquee__track {
            animation-play-state: paused;
          }
          
            /* SD_COURSES_VIEWALL_HOVER_V1 */
            a.sd-courses-viewall.sd-btn-secondary:hover{
              background: #F5B301 !important;
              color: #0B1220 !important;
              border-color: rgba(245,179,1,0.55) !important;
            }
            a.sd-courses-viewall.sd-btn-secondary{
              /* keep default non-hover look */
              background: transparent !important;
            }

            /* SD_COURSE_MOBILE_SCROLL_V7 */
            @media (max-width: 767px){
              .sd-home-course-marquee{
                overflow-x: auto !important;
                overflow-y: hidden !important;
                -webkit-overflow-scrolling: touch;
                overscroll-behavior-x: contain;
                touch-action: pan-x pan-y;
              }
              .sd-home-course-marquee__track{
                padding-bottom: 10px;
              }
            }

@media (prefers-reduced-motion: reduce) {
            .sd-home-course-marquee__track,
            .sd-home-marquee__track {
              animation: none !important;
            }
          }
          @keyframes sdCourseMarquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .sd-home-course-card {
            width: 320px;
            min-width: 320px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            background: #111827;
            overflow: hidden;
          }
          .sd-home-course-card__media {
            height: 140px;
            background:
              radial-gradient(700px 220px at 20% 30%, rgba(37, 99, 235, 0.22), transparent 60%),
              radial-gradient(600px 220px at 85% 35%, rgba(245, 179, 1, 0.16), transparent 60%),
              linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0));
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          .sd-home-chip {
            display: inline-flex;
            align-items: center;
            height: 24px;
            padding: 0 10px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(11, 18, 32, 0.6);
            color: #b0b7c3;
            font-size: 12px;
          }

          /* Video cards */
          .sd-home-video-card {
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            background: #111827;
            overflow: hidden;
            text-decoration: none;
          }
          .sd-home-video-card__frame {
            position: relative;
            aspect-ratio: 9 / 16;
            background: #0b1220;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          .sd-home-video-card__media {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .sd-home-video-card__placeholder {
            width: 100%;
            height: 100%;
            background:
              radial-gradient(520px 240px at 20% 20%, rgba(37, 99, 235, 0.22), transparent 60%),
              radial-gradient(520px 240px at 80% 40%, rgba(245, 179, 1, 0.16), transparent 60%),
              linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0));
          }
          .sd-home-video-card__overlay {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at 50% 60%, rgba(0,0,0,0.25), rgba(0,0,0,0.55));
            opacity: 0.9;
            transition: opacity 180ms ease;
          }
          .sd-home-video-card:hover .sd-home-video-card__overlay {
            opacity: 1;
          }
          .sd-home-play {
            width: 54px;
            height: 54px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.16);
            background: rgba(17, 24, 39, 0.55);
            box-shadow: 0 0 18px rgba(37, 99, 235, 0.55);
            display: grid;
            place-items: center;
          }
          .sd-home-play__tri {
            width: 0;
            height: 0;
            border-left: 14px solid white;
            border-top: 9px solid transparent;
            border-bottom: 9px solid transparent;
            margin-left: 3px;
          }

          /* Text review cards inside marquee */
          .sd-home-text-review {
            width: 320px;
            min-width: 320px;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 18px;
            background: #111827;
            padding: 14px;
          }
          .sd-home-course-card__media{ position:relative; overflow:hidden; }
          .sd-home-course-card__img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.92; }

          /* HOME: Courses sample-card override */
          /* Only affects the existing Home Courses cards */
          .sd-home-course-card{
            width: 360px;
            min-width: 360px;
            border-radius: 24px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.10);
            background: #111827;
          }

          /* top image area like sample */
          .sd-home-course-card__media{
            height: 190px;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            border-bottom: 1px solid rgba(255,255,255,0.10);
            position: relative;
          }
          .sd-home-course-card__media::after{
            content:"";
            position:absolute;
            inset:0;
            background: linear-gradient(180deg, rgba(11,18,32,0.10), rgba(11,18,32,0.70));
          }

          /* body padding like sample */
          .sd-home-course-card__body,
          .sd-home-course-card__content{
            padding: 18px !important;
          }

          /* make the 'View Course' link look like a button (without touching other links) */
          .sd-home-course-card a[href^="/courses/"]{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 42px;
            padding: 0 14px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.10);
            background: #F5B301;
            color: #FFFFFF;
            font-weight: 700;
            text-decoration: none;
            white-space: nowrap;
          }
          .sd-home-course-card a[href^="/courses/"]:hover{
            border-color: rgba(37,99,235,0.55);
            box-shadow: 0 0 18px rgba(37,99,235,0.18);
          }


          /* HOME: Courses button center */
          .sd-home-course-card a[href^="/courses/"]{
            margin: 12px auto 0 auto !important;
          
              background: #F5B301;
              color: #FFFFFF;
}


          /* HOME: Courses button full width */
          /* Full-width centered button like sample */
          .sd-home-course-card a[href^="/courses/"]{
            display: flex !important;
            width: 100% !important;
            height: 46px !important;
            justify-content: center !important;
            align-items: center !important;
            margin: 14px 0 0 0 !important;
            border-radius: 14px !important;
            background: #F5B301;
            border: 1px solid rgba(255,255,255,0.10) !important;
            color: #FFFFFF !important;
            font-weight: 800 !important;
            text-decoration: none !important;
            box-shadow: 0 0 18px rgba(37,99,235,0.22) !important;
          }
          .sd-home-course-card a[href^="/courses/"]:hover{
            background: #1D4ED8 !important;
            box-shadow: 0 0 18px rgba(37,99,235,0.30) !important;
          }


          /* HOME: Courses manual scroll */
          [data-sd-course-viewport="1"]{
            overflow-x: auto !important;
            overflow-y: hidden !important;
            -webkit-overflow-scrolling: touch;
            touch-action: pan-x;
            overscroll-behavior-x: contain;
            scroll-behavior: smooth;
            scrollbar-width: thin;
          }
          /* SD_SCROLLBAR_STYLE_DISABLED_V1_START */
/* [data-sd-course-viewport="1"]::-webkit-scrollbar{ height: 8px; } */
/* SD_SCROLLBAR_STYLE_DISABLED_V1_END */
          /* SD_SCROLLBAR_STYLE_DISABLED_V1_START */
/* [data-sd-course-viewport="1"]::-webkit-scrollbar-thumb{
            background: rgba(255,255,255,0.12);
            border-radius: 999px;
          } */
/* SD_SCROLLBAR_STYLE_DISABLED_V1_END */

          /* On mobile, disable CSS marquee animation inside Courses
             (auto-scroll is handled via scrollLeft JS so finger scroll stays smooth) */
          @media (pointer: coarse){
            [data-sd-course-viewport="1"] *{ animation: none !important; }
          }

        

/* SD_FORCE_VIEWCOURSE_GOLD_V1 */
.sd-home-course-card a[href^="/courses/"],
.sd-home-course-card a[href^="/courses/"]:visited,
.sd-home-course-card a[href^="/courses/"]:active {
  background: #F5B301 !important;
  color: #0B1220 !important;
}

.sd-home-course-card a[href^="/courses/"]:hover,
.sd-home-course-card a[href^="/courses/"]:focus,
.sd-home-course-card a[href^="/courses/"]:focus-visible {
  background: #F5B301 !important;
  color: #0B1220 !important;
  box-shadow: 0 0 18px rgba(245,179,1,0.55) !important;
}


/* SD_TABLET_SCROLL_APPEND_V4: tablet/touch swipe scroll (make real overflow scroll work) */
@media (pointer: coarse){
  .sd-home-course-marquee,
  .sd-home-course-marquee__track{
    animation: none !important;
    transform: none !important;
    will-change: auto !important;
    position: static !important;
    pointer-events: auto !important;
  }
  .sd-home-course-marquee{
    overflow: visible !important;
  }
  .sd-home-course-marquee__track{
    display: flex !important;
    width: max-content !important;
  }
  /* viewport must be the scroll container */
  [data-sd-course-viewport="1"]{
    overflow-x: auto !important;
    overflow-y: hidden !important;
    -webkit-overflow-scrolling: touch !important;
    touch-action: pan-x pan-y !important;
  }
}


/* SD_AI_TOOLS_CSS_V5 */
.sd-ai-card{
  background:#0B1220;
  border:1px solid rgba(11,18,32,0.10);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  min-height: 180px;
  box-shadow: 0 0 14px rgba(37,99,235,0.22) !important;

}
.sd-ai-card:hover{
  transform: translateY(-2px);
  box-shadow: 0 0 22px rgba(37,99,235,0.45) !important;
  border-color: rgba(37,99,235,0.45);
  animation: sdNeonPulse 1.8s ease-in-out infinite;
}
@keyframes sdNeonPulse{
  0%,100% { box-shadow: 0 0 10px rgba(37,99,235,0.35); }
  50%     { box-shadow: 0 0 18px rgba(37,99,235,0.55); }
}

.sd-ai-logo{
  background:transparent;
  border:none;
}

.sd-ai-logo-img{
  width:auto;
  height:auto;
  max-height: 56px;     /* bigger logo */
  max-width: 260px;
  object-fit: contain;
  filter: brightness(1.25) contrast(1.12) saturate(1.05);
  background: #FFFFFF;
  border-radius: 16px;
  padding: 5px;
  border: 1px solid rgba(0,0,0,0.10);
  display: inline-block;


}

.sd-ai-desc{
  display:-webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow:hidden;

  color:#B0B7C3;}


/* SD_AI_TOOLS_CSS_V6: heading + neon */
.sd-ai-sub-accent{ color:#2563EB; font-weight:600; font-size:14px; letter-spacing:0.2px; text-shadow:0 0 18px rgba(37,99,235,0.55); }

.sd-ai-card{
  box-shadow: 0 0 10px rgba(37,99,235,0.12);

  background:#0B1220;
  border:1px solid rgba(255,255,255,0.10);}
.sd-ai-card:hover{
  box-shadow: 0 0 18px rgba(37,99,235,0.55);
}

@keyframes sdBlueBreath{
  0%,100%{ box-shadow: 0 0 12px rgba(37,99,235,0.18); }
  50%{ box-shadow: 0 0 18px rgba(37,99,235,0.35); }
}

/* neon on the whole block (the rounded container that holds cards) */
.sd-ai-wrap{
  animation: sdBlueBreath 2.8s ease-in-out infinite;
}


/* SD_AI_TOOLS_CSS_V7: stronger neon + logo normalization */
.sd-ai-wrap{ position: relative; }
.sd-ai-wrap::before{
  content:"";
  position:absolute;
  inset:-1px;
  border-radius:24px;
  padding:1px;
  background: linear-gradient(90deg, rgba(37,99,235,0.70), rgba(245,179,1,0.45), rgba(37,99,235,0.70));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  filter: drop-shadow(0 0 18px rgba(37,99,235,0.55));
  opacity: 0.90;
  pointer-events:none;
}

@keyframes sdBlueBreathStrong{
  0%,100%{ box-shadow: 0 0 18px rgba(37,99,235,0.30); }
  50%{ box-shadow: 0 0 28px rgba(37,99,235,0.55); }
}
.sd-ai-wrap{ animation: sdBlueBreathStrong 3.2s ease-in-out infinite; }

.sd-ai-card{
  border: 1px solid rgba(37,99,235,0.22) !important;
  box-shadow: 0 0 18px rgba(37,99,235,0.28) !important;

  background:#0B1220;}
.sd-ai-card:hover{
  box-shadow: 0 0 28px rgba(37,99,235,0.50) !important;
}

.sd-ai-logo-plate{
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.10);

  height: 92px;
  padding: 16px 18px;
  border-radius: 14px;
display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
}

.sd-ai-logo-img{
  max-height: 60px;
  max-width: 260px;
  width: auto;
  height: auto;
  object-fit: contain;
}

/* SD_AI_TOOLS_NEON_SWEEP_V8 */
@keyframes sdNeonSweep {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.sd-ai-wrap::before{
  background-size: 200% 200% !important;
  animation: sdNeonSweep 4.8s ease-in-out infinite;
}


.sd-ai-logo-plate img[alt="ChatGPT"]{
  max-height: 72px !important;
  max-width: 280px !important;
  transform: scale(1.06);
}
.sd-ai-logo-plate img[alt="Gemini"]{
  max-height: 72px !important;
  max-width: 280px !important;
  transform: scale(1.06);
}


.sd-ai-wrap{ padding: 18px 18px !important; }

.sd-ai-card{
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  gap: 10px !important;
  padding-top: 18px !important;
  text-align: center !important;
}

.sd-ai-logo-plate{
  width: 100% !important;
  height: 118px !important;          /* bigger logo area */
  padding: 18px 18px !important;
  border-radius: 16px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
}

.sd-ai-logo-img{
  max-height: 80px !important;
  max-width: 320px !important;
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
}

.sd-ai-card h3,
.sd-ai-card .sd-ai-title{
  text-align: center !important;
  line-height: 1.15 !important;
  margin-top: 8px !important;
}

.sd-ai-desc{
  text-align: center !important;
  line-height: 1.35 !important;
  display: -webkit-box !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 3 !important;
  overflow: hidden !important;
  min-height: calc(1.35em * 3) !important;  /* equal desc block height */
  margin-top: 6px !important;
}

/* grid items stretch (if wrapper exists) */
.sd-ai-grid,
.sd-ai-row,
.sd-ai-cards{
  align-items: stretch !important;
}


/* The rectangle (plate) behind logo */
.sd-ai-logo-plate{
  background: #FFFFFF !important;
  border: 1px solid rgba(0,0,0,0.10) !important;
  border-radius: 14px !important;
  padding: 10px !important;              /* +10px around logo */
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;

  /* keep consistent row height without forcing logo size */
  min-height: 92px !important;
  overflow: hidden !important;
}

/* The logo image itself should NOT have any rectangle styling */
.sd-ai-logo-img{
  background: transparent !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;

  width: auto !important;
  height: auto !important;
  max-height: 72px !important;
  max-width: 300px !important;
  object-fit: contain !important;
  filter: none !important;               /* keep original logo look */
}


/* The rectangle (plate) behind logo */
.sd-ai-logo-plate{
  background: #FFFFFF !important;
  border: 1px solid rgba(0,0,0,0.10) !important;
  border-radius: 14px !important;
  padding: 10px !important;              /* +10px around logo */
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;

  /* keep consistent row height without forcing logo size */
  min-height: 92px !important;
  overflow: hidden !important;
}

/* The logo image itself should NOT have any rectangle styling */
.sd-ai-logo-img{
  background: transparent !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;

  width: auto !important;
  height: auto !important;
  max-height: 72px !important;
  max-width: 300px !important;
  object-fit: contain !important;
  filter: none !important;               /* keep original logo look */
}


.sd-logo-plate{
  background:#FFFFFF !important;
  border:1px solid rgba(0,0,0,0.10) !important;
  border-radius:14px !important;
  padding:10px !important;           /* logo se +10px all sides */
  width:100% !important;
  min-height:92px !important;
  display:flex !important;
  align-items:center !important;
  justify-content:center !important;
  overflow:hidden !important;
}

.sd-logo-img{
  background:transparent !important;
  padding:0 !important;
  border:0 !important;
  border-radius:0 !important;
  box-shadow:none !important;

  width:auto !important;
  height:auto !important;
  max-height:72px !important;
  max-width:320px !important;
  object-fit:contain !important;
  filter:none !important;
}

`}</style>
            {/* SD_SEO_SCHEMA_V1 */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Sikhadenge",
              "url": "https://sikhadenge.in",
              "description":
                "Live online courses in Graphic Design, Video Editing, Motion Graphics, and AI-powered creative workflows with practical projects and certificate.",
              "sameAs": [
                "https://www.instagram.com/sikhadenge.ai",
                "https://www.linkedin.com"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What do you learn in Sikhadenge courses?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Graphic Design, Video Editing, Motion Graphics, and practical GenAI workflows. Tools include Photoshop, Illustrator, Premiere Pro, After Effects, and supporting AI tools."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are these live online classes?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Classes are live online with structured lessons and practical assignments focused on portfolio output."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is a certificate provided?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. A course completion certificate is provided after completing the required projects and evaluation."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Who is this for?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Students, creators, and early professionals who want industry-standard design and editing skills and portfolio-ready output."
                  }
                }
              ]
            }
          ]),
        }}
      />

      <CounsellingModal open={counsellingOpen} onClose={() => setCounsellingOpen(false)} />
    </main>
  );
}
