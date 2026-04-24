import type { ReactNode } from "react";

type DarkCapabilityCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
};

export default function DarkCapabilityCard({
  icon,
  title,
  description,
  className = "",
}: DarkCapabilityCardProps) {
  return (
    <div
      className={`rounded-[30px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,#0B2246_0%,#061731_100%)] p-6 text-white shadow-[0_16px_38px_rgba(11,18,32,0.17)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_46px_rgba(11,18,32,0.21)] ${className}`}
    >
      <div className="mb-5 flex h-[78px] w-[78px] items-center justify-center rounded-[24px] border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.05)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        {icon}
      </div>

      <h3 className="text-[20px] font-bold leading-[1.28] tracking-[-0.02em] text-white md:text-[21px]">
        {title}
      </h3>

      <p className="mt-3 text-[15px] leading-[1.8] text-[rgba(255,255,255,0.84)] md:text-[16px]">
        {description}
      </p>
    </div>
  );
}
