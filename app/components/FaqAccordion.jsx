"use client";


export const dynamic = "force-dynamic";
export const revalidate = 0;
import { useState } from "react";

export default function FaqAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="mt-10 space-y-3">
      {items.map(([q, a], idx) => {
        const isOpen = idx === openIndex;
        return (
          <details
            key={q}
            open={isOpen}
            className="group rounded-2xl border border-[rgba(15,23,42,0.10)] bg-white px-5 py-4"
            onToggle={(e) => {
              const nextOpen = e.currentTarget.open;
              setOpenIndex(nextOpen ? idx : -1);
            }}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="text-sm md:text-base font-semibold text-[#0F172A]">
                {q}
              </span>

              <span className="grid h-9 w-9 place-items-center rounded-lg border border-[rgba(15,23,42,0.10)] bg-white">
                <svg
                  className="h-4 w-4 text-[#2563EB] transition-transform group-open:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <div className="mt-3 text-sm text-[#334155] leading-relaxed">{a}</div>
          </details>
        );
      })}
    </div>
  );
}
