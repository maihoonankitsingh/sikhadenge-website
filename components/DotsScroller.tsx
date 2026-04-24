"use client";

import React, { useEffect, useMemo, useState } from "react";

type Props = {
  scrollerId: string;
  className?: string;
};

export default function DotsScroller({ scrollerId, className }: Props) {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);

  const getEl = () => (typeof document !== "undefined" ? document.getElementById(scrollerId) : null);

  const compute = () => {
    const el = getEl();
    if (!el) return { c: 0, a: 0 };

    const kids = Array.from(el.children).filter((n) => n.nodeType === 1) as HTMLElement[];
    const c = kids.length;
    if (!c) return { c: 0, a: 0 };

    const center = el.scrollLeft + el.clientWidth / 2;
    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    for (let i = 0; i < kids.length; i++) {
      const k = kids[i];
      const kCenter = k.offsetLeft + k.offsetWidth / 2;
      const d = Math.abs(kCenter - center);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    return { c, a: Math.min(Math.max(bestIdx, 0), c - 1) };
  };

  useEffect(() => {
    const el = getEl();
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const { c, a } = compute();
        setCount(c);
        setActive(a);
      });
    };

    const ro = new ResizeObserver(() => onScroll());
    ro.observe(el);

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollerId]);

  const scrollToIdx = (idx: number) => {
    const el = getEl();
    if (!el) return;
    const kids = Array.from(el.children).filter((n) => n.nodeType === 1) as HTMLElement[];
    const target = kids[idx];
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  };

  const dots = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);

  if (count <= 1) return null;

  return (
    <div className={className ?? "mt-4 flex justify-center gap-2"}>
      {dots.map((i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className={[
              "h-2 w-2 rounded-full transition",
              isActive ? "bg-[#F5B301]" : "bg-white/25",
            ].join(" ")}
            style={isActive ? { boxShadow: "0 0 18px rgba(245,179,1,0.55)" } : undefined}
          />
        );
      })}
    </div>
  );
}
