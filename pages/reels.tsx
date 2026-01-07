"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Reel = {
  id: string;
  src: string;
  poster?: string;
};

export default function ReelsPage() {
  const reels: Reel[] = useMemo(
    () => [
      { id: "t1", src: "/images/testimonials/t1.mp4" },
      { id: "t2", src: "/images/testimonials/t2.mp4" },
      { id: "t3", src: "/images/testimonials/t3.mp4" },
      { id: "t4", src: "/images/testimonials/t4.mp4" },
      { id: "t5", src: "/images/testimonials/t5.mp4" },
      { id: "t6", src: "/images/testimonials/t6.mp4" },
      { id: "t7", src: "/images/testimonials/t7.mp4" },
    ],
    []
  );

  // duplicate list for seamless loop
  const loopItems = useMemo(() => [...reels, ...reels], [reels]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const rafRef = useRef<number | null>(null);
  const pauseRef = useRef<boolean>(false);
  const resumeTimerRef = useRef<number | null>(null);

  const [playingId, setPlayingId] = useState<string | null>(null);

  const prefersReducedMotion = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  };

  const pauseAuto = () => {
    pauseRef.current = true;
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const resumeAutoLater = (ms = 2500) => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      // if any video is playing, keep paused
      if (playingId) return;
      pauseRef.current = false;
    }, ms);
  };

  const pauseAll = (exceptId?: string) => {
    Object.entries(videoRefs.current).forEach(([id, v]) => {
      if (!v) return;
      if (exceptId && id === exceptId) return;
      try {
        v.pause();
      } catch {}
    });
  };

  const togglePlay = async (id: string) => {
    const v = videoRefs.current[id];
    if (!v) return;

    pauseAll(id);

    if (!v.paused) {
      v.pause();
      setPlayingId(null);
      resumeAutoLater(1200);
      return;
    }

    // while watching, keep auto-scroll paused so card doesn't move
    pauseAuto();

    try {
      await v.play();
      setPlayingId(id);
    } catch {
      setPlayingId(null);
      resumeAutoLater(1200);
    }
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const speed = 0.45; // px per frame (~smooth)
    const step = () => {
      const sc = scrollerRef.current;
      if (!sc) return;

      // if user paused or video playing, do nothing
      if (!pauseRef.current && !playingId) {
        sc.scrollLeft += speed;

        // seamless reset when we pass half (because list duplicated)
        const half = sc.scrollWidth / 2;
        if (sc.scrollLeft >= half) {
          sc.scrollLeft -= half;
        }
      }

      rafRef.current = window.requestAnimationFrame(step);
    };

    rafRef.current = window.requestAnimationFrame(step);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, [playingId]);

  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <style jsx global>{`
        .sd-no-scrollbar::-webkit-scrollbar { display: none; }
        .sd-no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="mx-auto max-w-6xl px-6 pt-24 pb-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15]">
            Success Stories of our learners
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-32 rounded-full bg-white/70" />
          <p className="mt-4 text-sm text-white/70">
            Student video feedback (auto-scroll). Swipe/drag to control.
          </p>
        </div>

        <section className="mt-10">
          <div
            ref={scrollerRef}
            className="sd-no-scrollbar flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
            onMouseEnter={() => pauseAuto()}
            onMouseLeave={() => resumeAutoLater(800)}
            onTouchStart={() => pauseAuto()}
            onTouchEnd={() => resumeAutoLater(1600)}
            onPointerDown={() => pauseAuto()}
            onPointerUp={() => resumeAutoLater(1600)}
            onWheel={() => { pauseAuto(); resumeAutoLater(1800); }}
          >
            {loopItems.map((r, idx) => {
              const key = `${r.id}-${idx}`;
              const isPlaying = playingId === key;

              return (
                <div
                  key={key}
                  className="snap-start shrink-0 w-[78vw] sm:w-[360px] md:w-[320px] xl:w-[280px]"
                >
                  <button
                    type="button"
                    onClick={() => togglePlay(key)}
                    className="group w-full text-left rounded-[28px] border border-white/10 bg-[#0B1220]/40 hover:bg-[#0B1220]/55 transition shadow-[0_22px_70px_rgba(0,0,0,0.55)] p-4"
                    aria-label="Toggle video"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-white/85">
                        Student Review
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
                        <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                        <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                      </div>
                    </div>

                    <div className="mt-3 rounded-[22px] border border-white/10 bg-gradient-to-b from-[#111827] to-[#0B1220] p-3">
                      <div className="relative rounded-[18px] overflow-hidden border border-white/10 bg-black">
                        <div className="aspect-[9/16] w-full">
                          <video
                            ref={(el) => { videoRefs.current[key] = el; }}
                            className="h-full w-full object-cover"
                            src={r.src}
                            poster={r.poster}
                            preload="metadata"
                            playsInline
                            controls={false}
                            onEnded={() => { setPlayingId(null); resumeAutoLater(1200); }}
                            onPause={() => { setPlayingId(null); resumeAutoLater(1200); }}
                            onPlay={() => { setPlayingId(key); pauseAuto(); }}
                          />
                        </div>

                        <div
                          className={[
                            "pointer-events-none absolute inset-0 grid place-items-center transition",
                            isPlaying ? "opacity-0" : "opacity-100",
                          ].join(" ")}
                        >
                          <div className="h-16 w-16 rounded-full bg-black/45 backdrop-blur-sm grid place-items-center border border-white/10 shadow-[0_0_18px_rgba(0,0,0,0.35)]">
                            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="text-white">
                              <path fill="currentColor" d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
