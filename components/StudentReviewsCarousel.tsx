'use client';

import React, { useEffect, useRef, useState } from 'react';

type Review = {
  name: string;
  role: string;
  rating: number; // 1..5
  text: string;
  tag?: string;
};

const REVIEWS: Review[] = [
  {
    name: 'Sana',
    role: 'Content Creator',
    rating: 5,
    text: 'Hooks + transitions ka workflow clear ho gaya. Ab reels ka pace zyada smooth lagta hai aur retention better aata hai.',
    tag: 'Masterclass attendee',
  },
  {
    name: 'Rahul',
    role: 'Editor',
    rating: 5,
    text: 'Caption timing + beat matching ka clear structure mila. Ab edits zyada clean dikhte hain aur flow break nahi hota.',
    tag: 'Masterclass attendee',
  },
  {
    name: 'Neha',
    role: 'Student',
    rating: 5,
    text: 'AI prompts ka practical use samajh aaya. Thumbnails/posters fast banne lage aur results random feel nahi hote.',
    tag: 'Masterclass attendee',
  },
  {
    name: 'Aman',
    role: 'Freelancer',
    rating: 5,
    text: 'Client-style workflow mila: idea → AI draft → Photoshop polish. Delivery time reduce hua aur output zyada premium lagta hai.',
    tag: 'Masterclass attendee',
  },
  {
    name: 'Pooja',
    role: 'Working Professional',
    rating: 5,
    text: 'Spacing + typography basics (hierarchy, grids) clear ho gaye. Layouts ab zyada balanced aur professional lagte hain.',
    tag: 'Masterclass attendee',
  },
  {
    name: 'Arjun',
    role: 'YouTuber',
    rating: 5,
    text: 'Shorts editing ka framework mila: hook → pattern breaks → captions. Engagement improve hua aur videos zyada watchable ho gaye.',
    tag: 'Masterclass attendee',
  },
  {
    name: 'Mehak',
    role: 'Entrepreneur',
    rating: 5,
    text: 'Team ke liye repeatable prompt patterns mil gaye. Brand consistency better hui aur creatives ka output stable ho gaya.',
    tag: 'Masterclass attendee',
  },
  {
    name: 'Kunal',
    role: 'Designer',
    rating: 5,
    text: 'AI output ko control karna aaya—variations se best pick + refine. Final results zyada consistent aur usable aaye.',
    tag: 'Masterclass attendee',
  },
  {
    name: 'Isha',
    role: 'Beginner',
    rating: 5,
    text: 'Zero se start karke clear roadmap mila. Confusion kam hua aur exactly pata chal gaya next practice kaise karni hai.',
    tag: 'Masterclass attendee',
  },
  {
    name: 'Vikas',
    role: 'Video Editor',
    rating: 5,
    text: 'Transitions + sound beats ka practical approach mila. Ab edits zyada professional feel dete hain aur timing accurate ho gayi.',
    tag: 'Masterclass attendee',
  },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-1.5" aria-label={`${full} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`${i < full ? "text-[#F5B301]" : "text-gray-300"} text-lg md:text-xl leading-none`}>★</span>
      ))}
    </div>
  );
}

export default function StudentReviewsCarousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const drag = useRef({
    active: false,
    startX: 0,
    startLeft: 0,
    moved: false,
    pointerId: -1,
  });

  // autoplay: scroll by 1 card
  useEffect(() => {
    if (hovered) return;
    const el = scrollerRef.current;
    if (!el) return;

    const tick = () => {
      const card = el.querySelector<HTMLElement>('[data-review-card="1"]');
      const w = card ? card.getBoundingClientRect().width + 24 : 384; // gap-6 = 24px
      const max = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + w;

      if (max <= 0) return;

      el.scrollTo({
        left: next >= max - 4 ? 0 : next,
        behavior: 'smooth',
      });
    };

    const id = window.setInterval(tick, 3200);
    return () => window.clearInterval(id);
  }, [hovered]);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current.active = true;
    drag.current.startX = e.clientX;
    drag.current.startLeft = el.scrollLeft;
    drag.current.moved = false;
    drag.current.pointerId = e.pointerId;
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch {}
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
    drag.current.pointerId = -1;
  };

  return (
    <div
      className="relative mx-auto max-w-6xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* viewport */}
      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="sd-no-scrollbar flex gap-6 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory select-none cursor-grab active:cursor-grabbing"
      >
        {REVIEWS.map((r, i) => (
          <div
            key={i}
            data-review-card="1"
            className="snap-start shrink-0 w-[300px] md:w-[360px]"
          >
            <div className="h-full group relative overflow-hidden rounded-3xl border border-gray-200 bg-[#FFF7E6] p-7 md:p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#2563EB]/8 to-transparent" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-gray-900">{r.name}</div>
                  <div className="mt-1 text-sm md:text-base text-gray-600">{r.role}</div>
                </div>
                <Stars rating={r.rating} />
              </div>

              <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-700">
                “{r.text}”
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs text-gray-600">
                <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                <span>{r.tag ?? 'Masterclass attendee'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .sd-no-scrollbar { scrollbar-width: none; }
        .sd-no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
