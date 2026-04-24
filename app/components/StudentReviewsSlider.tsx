'use client';


export const dynamic = "force-dynamic";
export const revalidate = 0;
import React, { useEffect, useMemo, useState } from 'react';

type Review = {
  name: string;
  role: string;
  rating: number; // 1..5
  text: string;
};

const intervalMs = 3200;

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-1 text-sm text-gray-900" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < n ? 'opacity-100' : 'opacity-25'}>★</span>
      ))}
    </div>
  );
}

export default function StudentReviewsSlider() {
  // ===== EDIT ONLY THIS ARRAY =====
  const REVIEWS: Review[] = [
    { name: "Aman", role: "Student • Beginner", rating: 5, text: "Session ka workflow clear ho gaya. Prompting + Photoshop polish ka step-by-step mila." },
    { name: "Ritika", role: "Working Professional", rating: 5, text: "Reels framework practical tha. Hook → pacing → captions ka structure clear hua." },
    { name: "Sahil", role: "Freelancer", rating: 5, text: "Repeatable prompts mil gaye. Output consistency improve hui." },
    { name: "Neha", role: "Content Creator", rating: 5, text: "AI base + Ps finish approach simple aur professional laga." },
    { name: "Arjun", role: "Student", rating: 5, text: "Portfolio next steps + project selection wali part useful thi." },
    { name: "Pooja", role: "Career Switcher", rating: 5, text: "Roadmap clean tha. Practice sequence clear ho gaya." },
    { name: "Kunal", role: "Business Owner", rating: 5, text: "In-house creatives fast ban rahe. Workflow directly usable." },
    { name: "Simran", role: "Student", rating: 5, text: "Variations select + polish method se randomness control hua." },
    { name: "Rahul", role: "Editor", rating: 5, text: "Shorts/Reels speed improve hui. Captions/transitions ka flow mila." },
    { name: "Anjali", role: "Beginner", rating: 5, text: "Zero se start karne walo ke liye clear and simple examples." },
  ];

  const slides = useMemo(() => REVIEWS, []);
  const total = slides.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % total), intervalMs);
    return () => clearInterval(t);
  }, [paused, total]);

  const go = (i: number) => setIndex((i + total) % total);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  return (
    <div className="mt-10" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((r, i) => (
            <div key={i} className="min-w-full p-6 md:p-10">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-base md:text-lg font-semibold text-gray-900 truncate">{r.name}</div>
                  <div className="text-sm text-gray-600">{r.role}</div>
                </div>
                <div className="shrink-0">
                  <Stars n={r.rating} />
                </div>
              </div>

              <div className="mt-5 text-sm md:text-base leading-relaxed text-gray-700">
                “{r.text}”
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                <span className="inline-flex h-2 w-2 rounded-full bg-[#2563EB]" />
                Masterclass attendee
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={prev}
          className="hidden md:grid absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
          aria-label="Previous review"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          className="hidden md:grid absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
          aria-label="Next review"
        >
          ›
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            className={[
              "h-2.5 rounded-full transition-all",
              i === index ? "w-7 bg-gray-900" : "w-2.5 bg-gray-300 hover:bg-gray-400",
            ].join(" ")}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div></div>
  );
}
