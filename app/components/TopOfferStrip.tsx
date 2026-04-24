'use client';


export const dynamic = "force-dynamic";
export const revalidate = 0;
import React, { useEffect, useMemo, useState } from 'react';

function formatMMSS(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function TopOfferStrip() {
  const START = 10 * 60; // 10:00
  const [t, setT] = useState<number>(START);

  useEffect(() => {
    setT(START);
    const id = window.setInterval(() => {
      setT((x) => (x <= 0 ? 0 : x - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const timer = useMemo(() => formatMMSS(t), [t]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] h-[56px] bg-[#2563EB] text-white">
      <div className="h-full w-full overflow-hidden">
        <div
          className="flex h-full items-center whitespace-nowrap"
          style={{ animation: 'sdMarquee 14s linear infinite', willChange: 'transform' }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 px-8 text-[18px] leading-[22px] font-semibold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-95">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <span className="line-through opacity-90">₹1,999</span>
              <span className="text-[#FACC15]">FREE Masterclass</span>
              <span className="opacity-95">for next</span>
              <span className="font-extrabold">{timer}</span>
              <span className="opacity-95">Minutes ONLY</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sdMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
