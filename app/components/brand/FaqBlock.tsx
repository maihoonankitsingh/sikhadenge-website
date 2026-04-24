"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeader from "./SectionHeader";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqBlockProps = {
  pill?: string;
  title: string;
  description?: string;
  items: FaqItem[];
  className?: string;
};

export default function FaqBlock({
  pill = "FAQs",
  title,
  description,
  items,
  className = "",
}: FaqBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={`w-full ${className}`}>
      <SectionHeader
        pill={pill}
        title={title}
        description={description}
      />

      <div className="mt-8 space-y-3.5">
        {items.map((item, index) => {
          const open = openIndex === index;

          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-[22px] border border-[#D7E3F4] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.04)]"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
              >
                <span className="text-[18px] font-bold leading-[1.4] tracking-[-0.02em] text-[#0B1220] md:text-[20px]">
                  {item.question}
                </span>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-[#D7E3F4] bg-[#F8FBFF] text-[#2563EB]">
                  <ChevronDown
                    className={`h-4.5 w-4.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </span>
              </button>

              {open ? (
                <div className="border-t border-[#E7EEF8] px-5 pb-5 pt-4 md:px-6">
                  <p className="max-w-5xl text-[15px] leading-[1.85] text-[#475569] md:text-[16px]">
                    {item.answer}
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
