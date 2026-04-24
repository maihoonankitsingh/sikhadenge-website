'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

export type VideoTestimonialItem = {
  src: string;
  poster?: string;
  name: string;
  city: string;
};

export type VideoTestimonialsSliderProps = {
  label?: string;
  title?: string;
  subtitle?: string;
  items?: VideoTestimonialItem[];
  autoplay?: boolean;
  arrows?: boolean;
  dots?: boolean;
  className?: string;
  wrapperClassName?: string;
};

const DEFAULT_ITEMS: VideoTestimonialItem[] = [
  { src: '/reviews/videos/t1.mp4', poster: '/reviews/thumbs/t1.jpg', name: 'Aarav', city: 'Indore' },
  { src: '/reviews/videos/t2.mp4', poster: '/reviews/thumbs/t2.jpg', name: 'Sneha', city: 'Jaipur' },
  { src: '/reviews/videos/t3.mp4', poster: '/reviews/thumbs/t3.jpg', name: 'Rohit', city: 'Noida' },
  { src: '/reviews/videos/t4.mp4', poster: '/reviews/thumbs/t4.jpg', name: 'Mehak', city: 'Lucknow' },
  { src: '/reviews/videos/t5.mp4', poster: '/reviews/thumbs/t5.jpg', name: 'Kunal', city: 'Kolkata' },
  { src: '/reviews/videos/t6.mp4', poster: '/reviews/thumbs/t6.jpg', name: 'Radhika', city: 'Mumbai' },
  { src: '/reviews/videos/t7.mp4', poster: '/reviews/thumbs/t7.jpg', name: 'Vishal', city: 'Jharkhand' },
  { src: '/reviews/videos/t8.mp4', poster: '/reviews/thumbs/t8.jpg', name: 'Avinash', city: 'Delhi' },
  { src: '/reviews/videos/t9.mp4', poster: '/reviews/thumbs/t9.jpg', name: 'Vadika', city: 'Bangalore' },
  { src: '/reviews/videos/t10.mp4', poster: '/reviews/thumbs/t10.jpg', name: 'Priya', city: 'Pune' },
];

export default function VideoTestimonialsSlider(props?: VideoTestimonialsSliderProps) {
  const {
    title, subtitle, label,
    items: itemsProp,
    autoplay = true,
    arrows = true,
    dots = true,
    className,
    wrapperClassName,
  } = props || {};

  const items = useMemo(() => itemsProp?.length ? itemsProp : DEFAULT_ITEMS, [itemsProp]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const drag = useRef({ down: false, startX: 0, startScrollLeft: 0, moved: false, pointerId: -1 });

  function getCardWidth() {
    const el = scrollerRef.current;
    if (!el) return 300;
    const card = el.querySelector<HTMLElement>('[data-card="1"]');
    return card ? card.getBoundingClientRect().width + 20 : 300;
  }

  function pauseAll(exceptIdx: number | null = null) {
    videoRefs.current.forEach((v, i) => {
      if (!v || (exceptIdx !== null && i === exceptIdx)) return;
      try { v.pause(); v.currentTime = 0; v.removeAttribute('controls'); } catch {}
    });
  }

  async function playIdx(idx: number) {
    const v = videoRefs.current[idx];
    if (!v) return;
    pauseAll(idx);
    setPlaying(idx);
    try { v.setAttribute('controls', 'true'); v.muted = false; await v.play(); } catch {}
  }

  function onEnded(idx: number) {
    const v = videoRefs.current[idx];
    if (!v) return;
    try { v.pause(); v.currentTime = 0; v.removeAttribute('controls'); } catch {}
    setPlaying(p => p === idx ? null : p);
  }

  function scrollByCards(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * getCardWidth(), behavior: 'smooth' });
  }

  function onWheel(e: React.WheelEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el) return;
    e.preventDefault();
    el.scrollBy({ left: e.deltaY * 2, behavior: 'smooth' });
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return;
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { down: true, pointerId: e.pointerId, startX: e.clientX, startScrollLeft: el.scrollLeft, moved: false };
    try { el.setPointerCapture(e.pointerId); } catch {}
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.down) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    e.preventDefault();
    el.scrollLeft = drag.current.startScrollLeft - dx;
  }

  function endDrag(e?: React.PointerEvent<HTMLDivElement>) {
    drag.current.down = false;
    if (e && scrollerRef.current) {
      try { scrollerRef.current.releasePointerCapture(drag.current.pointerId); } catch {}
    }
    window.setTimeout(() => { drag.current.moved = false; }, 0);
  }

  function onScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.max(0, Math.min(items.length - 1, Math.round(el.scrollLeft / getCardWidth())));
    setActiveIdx(idx);
  }

  useEffect(() => {
    if (!autoplay) return;
    const el = scrollerRef.current;
    if (!el) return;
    const id = setInterval(() => {
      if (isHovering || playing !== null) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollByCards(1);
      }
    }, 2800);
    return () => clearInterval(id);
  }, [autoplay, isHovering, playing]);

  return (
    <section className={`bg-white ${className || ''}`}>
      <div className={`mx-auto max-w-7xl px-4 py-20 ${wrapperClassName || ''}`}>
        <div className="text-center">
          {label && (
            <div className="text-[11px] tracking-[0.25em] font-semibold text-[#F5B301]">{label}</div>
          )}
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-[#0B1220]">
            {title || 'Success Stories From Real Learners'}
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#0B1220]/70 max-w-3xl mx-auto">
            {subtitle || 'Real students. Real results. Tap any card to play.'}
          </p>
        </div>

        <div className="relative mt-12">
          {arrows && (
            <>
              <button type="button" aria-label="Previous" onClick={() => scrollByCards(-1)}
                className="absolute left-[-14px] top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white shadow-md border border-black/10 flex items-center justify-center text-xl font-bold hover:bg-yellow-50 transition">
                &#8249;
              </button>
              <button type="button" aria-label="Next" onClick={() => scrollByCards(1)}
                className="absolute right-[-14px] top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white shadow-md border border-black/10 flex items-center justify-center text-xl font-bold hover:bg-yellow-50 transition">
                &#8250;
              </button>
            </>
          )}

          <div
            ref={scrollerRef}
            onScroll={onScroll}
            onWheel={onWheel}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="sd-no-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-3 snap-x snap-mandatory select-none cursor-grab active:cursor-grabbing"
            style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
          >
            {items.map((it, idx) => (
              <div key={idx} data-card="1" className="snap-start shrink-0 w-[200px] sm:w-[240px] md:w-[270px]">
                <div className="relative rounded-[24px] overflow-hidden shadow-lg">
                  <div className="absolute right-3 top-3 z-10">
                    <div className="rounded-full bg-black/55 text-white text-xs px-3 py-1 flex items-center gap-1">
                      <span>&#9654;</span><span>Reel</span>
                    </div>
                  </div>

                  <div className="relative w-full aspect-[9/16] bg-black">
                    <video
                      ref={el => { videoRefs.current[idx] = el; }}
                      src={it.src}
                      poster={it.poster}
                      preload="none"
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                      onEnded={() => onEnded(idx)}
                      onPause={() => { if (playing === idx) setPlaying(null); }}
                    />

                    {playing !== idx && (
                      <button type="button" aria-label={`Play ${it.name}`}
                        onClick={() => { if (drag.current.moved) return; playIdx(idx); }}
                        className="absolute inset-0 flex items-center justify-center">
                        <span className="h-[58px] w-[58px] rounded-full bg-[#F5B301] shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                          <span className="text-black text-xl">&#9654;</span>
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {dots && (
            <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
              {items.map((_, i) => (
                <button key={i} type="button" aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                    pauseAll(null); setPlaying(null);
                    const el = scrollerRef.current;
                    if (!el) return;
                    el.scrollTo({ left: i * getCardWidth(), behavior: 'smooth' });
                    setActiveIdx(i);
                  }}
                  className={`rounded-full transition-all ${i === activeIdx ? 'h-2.5 w-6 bg-[#F5B301]' : 'h-2.5 w-2.5 bg-black/15'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .sd-no-scrollbar { scrollbar-width: none; }
        .sd-no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
