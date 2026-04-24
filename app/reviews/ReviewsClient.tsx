"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Reel = {
  id: string;
  name: string;
  sub?: string;
  src: string;
};

type TextRv = {
  id: string;
  name: string;
  role?: string;
  chips: string[];
  text: string;
  meta?: string;
};

const REELS: Reel[] = [
  { id: "t1", name: "Radhika", src: "/images/testimonials/t1.mp4" },
  { id: "t2", name: "Vishal", sub: "Jharkhand", src: "/images/testimonials/t2.mp4" },
  { id: "t3", name: "Avinash Chauhan", src: "/images/testimonials/t3.mp4" },
  { id: "t4", name: "Vadika", src: "/images/testimonials/t4.mp4" },
  { id: "t5", name: "Learner", src: "/images/testimonials/t5.mp4" },
  { id: "t6", name: "Learner", src: "/images/testimonials/t6.mp4" },
  { id: "t7", name: "Learner", src: "/images/testimonials/t7.mp4" },
];

const TEXT_REVIEWS: TextRv[] = [
  {
    id: "tr1",
    name: "Rahul Singh",
    role: "Learner",
    chips: ["Combined course", "Portfolio", "Practical tasks"],
    text: "Sikhadenge me daily assignments + review system strong hai. Design side pe typography, spacing, color balance; editing side pe cuts, pacing, captions aur export settings properly practice karaya.",
    meta: "Combined course • Daily review",
  },
  {
    id: "tr2",
    name: "Sneha Yadav",
    role: "Learner",
    chips: ["Combined course", "Doubt support", "Consistency"],
    text: "Cover step-by-step hua. Daily practice aur doubt support se confidence build hua. Projects ke saath client-style briefs bhi mile.",
    meta: "Combined course • Live practice",
  },
  {
    id: "tr3",
    name: "Learner",
    role: "Student",
    chips: ["Live classes", "Projects", "Support"],
    text: "Structured learning + tasks helped me stay consistent. Feedback cycle clear tha.",
    meta: "Online batch",
  },
  {
    id: "tr4",
    name: "Learner",
    role: "Student",
    chips: ["Tools", "Workflow", "Portfolio"],
    text: "Workflow improve hua aur portfolio direction clear hui.",
    meta: "Online batch",
  },
];

function useAutoMarquee(opts: { enabled: boolean; speedPxPerSec?: number }) {
  const { enabled, speedPxPerSec = 42 } = opts;

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const holdUntilRef = useRef(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);

      if (!enabled) {
        last = now;
        return;
      }
      if (pausedRef.current) {
        last = now;
        return;
      }
      if (now < holdUntilRef.current) {
        last = now;
        return;
      }

      const dt = (now - last) / 1000;
      last = now;

      // content is duplicated => loop at half width
      const half = el.scrollWidth / 2;
      el.scrollLeft += speedPxPerSec * dt;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, speedPxPerSec]);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);
  const holdFor = (ms: number) => (holdUntilRef.current = performance.now() + ms);

  return { scrollerRef, pause, resume, holdFor };
}

function ReelCard({ reel }: { reel: Reel }) {
  return (
    <div className="sd-reel-cardWrap">
      <div className="sd-reel-card">
        <div className="sd-reel-top">
          <div className="sd-reel-title">Student Review</div>
          <div className="sd-reel-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="sd-reel-frame" aria-label={`Video testimonial ${reel.id}`}>
          <div className="sd-reel-chip">Student Review</div>
          <div className="sd-reel-videoWrap">
            <video
              className="sd-reel-video"
              src={reel.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              controls={false}
              controlsList="nodownload noplaybackrate"
            />
          </div>
          <div className="sd-reel-name">
            <div className="sd-reel-nameLine">
              <span className="sd-reel-nameKey">Name:</span>
              <span className="sd-reel-nameVal">{reel.name}</span>
            </div>
            {reel.sub ? <div className="sd-reel-sub">{reel.sub}</div> : null}
          </div>
        </div>

        <div className="sd-reel-footer">Sikhadenge • Video Review</div>
      </div>
    </div>
  );
}

function TextReviewCard({ r }: { r: TextRv }) {
  return (
    <article className="sd-text-card">
      <div className="sd-text-head">
        <div className="sd-avatar" aria-hidden="true">
          <span />
        </div>
        <div className="min-w-0">
          <div className="sd-text-name">{r.name}</div>
          <div className="sd-text-role">{r.role ?? "Learner"}</div>
        </div>
      </div>

      <div className="sd-chipRow">
        {r.chips.slice(0, 3).map((c) => (
          <span key={c} className="sd-chip" title={c}>
            {c}
          </span>
        ))}
      </div>

      <div className="sd-text-quote">
        <span className="sd-quoteMark">“</span>
        {r.text}
        <span className="sd-quoteMark">”</span>
      </div>

      <div className="sd-text-meta">{r.meta ?? "Online batch"}</div>
    </article>
  );
}

export default function ReviewsClient() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const reelsLoop = useMemo(() => [...REELS, ...REELS], []);
  const { scrollerRef, pause, resume, holdFor } = useAutoMarquee({
    enabled: !isMobile, // auto only desktop
    speedPxPerSec: 44,
  });

  return (
    <div className="sd-reviews">
      <style>{CSS}</style>

      {/* VIDEO REELS */}
      <section className="sd-section">
        <div className="sd-center">
          <h2 className="sd-h2">Success Stories of our learners</h2>
          <p className="sd-sub">
            Short video feedback (reels format). Desktop auto-scroll. Mobile swipe scroll.
          </p>
        </div>

        <div
          className={"sd-reel-scroller" + (!isMobile ? " isDesktop" : " isMobile")}
          ref={scrollerRef}
          onMouseEnter={() => {
            if (!isMobile) pause();
          }}
          onMouseLeave={() => {
            if (!isMobile) resume();
          }}
          onPointerDown={() => {
            // let user take control for a moment (desktop / touchpads)
            if (!isMobile) holdFor(3000);
          }}
          onTouchStart={() => {
            // safety
            holdFor(3000);
          }}
        >
          <div className="sd-reel-row">
            {reelsLoop.map((r, idx) => (
              <ReelCard key={`${r.id}-${idx}`} reel={r} />
            ))}
          </div>
        </div>
      </section>

      {/* TEXT REVIEWS */}
      <section className="sd-section sd-sectionText">
        <div className="sd-center">
          <h3 className="sd-h3">Written feedback</h3>
          <p className="sd-sub2">Short text reviews from learners.</p>
        </div>

        <div className="sd-text-grid">
          {TEXT_REVIEWS.map((r) => (
            <TextReviewCard key={r.id} r={r} />
          ))}
        </div>
      </section>
    </div>
  );
}

const CSS = `
.sd-reviews{
  background:#0B1220;
  color:#fff;
}
.sd-section{
  padding: 56px 0 22px;
}
.sd-sectionText{
  padding-top: 20px;
}
.sd-center{
  text-align:center;
  padding: 0 16px;
}
.sd-h2{
  font-size: 44px;
  line-height: 1.12;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
}
.sd-h3{
  font-size: 28px;
  line-height: 1.15;
  font-weight: 700;
  margin: 0;
}
@media (max-width: 640px){
  .sd-h2{ font-size: 30px; }
  .sd-h3{ font-size: 22px; }
}
.sd-sub{
  margin: 10px 0 0;
  font-size: 13px;
  color: rgba(255,255,255,0.75);
}
.sd-sub2{
  margin: 10px 0 0;
  font-size: 12px;
  color: rgba(255,255,255,0.70);
}

/* SCROLLER */
.sd-reel-scroller{
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 16px 10px 8px;
  margin: 0 auto;
  max-width: 1240px;
  scroll-snap-type: x mandatory;
}
.sd-reel-scroller::-webkit-scrollbar{ display:none; }
.sd-reel-row{
  display: flex;
  gap: 18px;
  width: max-content;
  padding: 10px 8px 18px;
}
@media (max-width: 900px){
  .sd-reel-row{ gap: 14px; padding: 10px 12px 16px; }
}

/* CARD OUTER */
.sd-reel-cardWrap{
  flex: 0 0 auto;
  scroll-snap-align: center;
}

/* REEL CARD: premium look, perfect 9:16 window */
.sd-reel-card{
  width: 340px;
  height: 560px;
  border-radius: 26px;
  border: 1px solid rgba(255,255,255,0.10);
  background: #111827;
  box-shadow: 0 22px 70px rgba(0,0,0,0.55);
  overflow: hidden;
}
@media (max-width: 900px){
  .sd-reel-card{
    width: 300px;
    height: 520px;
  }
}

.sd-reel-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 14px 16px 10px;
}
.sd-reel-title{
  font-weight: 700;
  font-size: 14px;
  color: rgba(255,255,255,0.92);
}
.sd-reel-dots{
  display:flex;
  gap: 6px;
}
.sd-reel-dots span{
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: rgba(255,255,255,0.30);
}

/* FRAME holds 9:16 window */
.sd-reel-frame{
  position: relative;
  margin: 0 16px 14px;
  height: calc(100% - 14px - 10px - 14px - 14px - 44px);
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(11,18,32,0.55);
  overflow: hidden;
}
.sd-reel-chip{
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  font-size: 11px;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(17,24,39,0.70);
  color: rgba(255,255,255,0.86);
  backdrop-filter: blur(10px);
}

/* PERFECT 9:16 area inside frame */
.sd-reel-videoWrap{
  position: absolute;
  inset: 0;
}
.sd-reel-video{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display:block;
  transform: translateZ(0);
}

/* Name overlay */
.sd-reel-name{
  position:absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 2;
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(17,24,39,0.70);
  backdrop-filter: blur(10px);
}
.sd-reel-nameLine{
  display:flex;
  gap: 6px;
  align-items: baseline;
}
.sd-reel-nameKey{
  font-size: 12px;
  color: rgba(255,255,255,0.65);
}
.sd-reel-nameVal{
  font-size: 13px;
  font-weight: 700;
  color: rgba(255,255,255,0.92);
}
.sd-reel-sub{
  margin-top: 4px;
  font-size: 12px;
  color: rgba(176,183,195,0.95);
}

.sd-reel-footer{
  padding: 10px 16px 14px;
  font-size: 11px;
  color: rgba(156,163,175,0.95);
}

/* TEXT REVIEWS GRID */
.sd-text-grid{
  max-width: 1240px;
  margin: 18px auto 0;
  padding: 0 16px 22px;
  display:grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (max-width: 900px){
  .sd-text-grid{ grid-template-columns: 1fr; }
}
.sd-text-card{
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.10);
  background: #111827;
  padding: 18px;
  box-shadow: 0 22px 70px rgba(0,0,0,0.55);
}
.sd-text-head{
  display:flex;
  gap: 12px;
  align-items:center;
}
.sd-avatar{
  width: 38px;
  height: 38px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(11,18,32,0.55);
  position: relative;
  overflow:hidden;
}
.sd-avatar span{
  position:absolute;
  inset: -10px;
  background: radial-gradient(circle at 30% 30%, rgba(37,99,235,0.35), transparent 55%),
              radial-gradient(circle at 70% 70%, rgba(245,179,1,0.25), transparent 55%);
  filter: blur(6px);
}
.sd-text-name{
  font-weight: 800;
  font-size: 14px;
}
.sd-text-role{
  font-size: 12px;
  color: rgba(176,183,195,0.95);
}
.sd-chipRow{
  margin-top: 12px;
  display:flex;
  gap: 8px;
  flex-wrap: wrap;
}
.sd-chip{
  font-size: 11px;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.10);
  color: rgba(176,183,195,0.95);
}
.sd-text-quote{
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.85;
  color: rgba(255,255,255,0.86);
}
.sd-quoteMark{
  color: rgba(255,255,255,0.40);
  font-size: 18px;
  line-height: 1;
}
.sd-text-meta{
  margin-top: 12px;
  font-size: 11px;
  color: rgba(156,163,175,0.95);
}
`;
