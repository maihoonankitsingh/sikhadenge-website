import type { ReactNode } from "react";

type LightFeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
};

export default function LightFeatureCard({
  icon,
  title,
  description,
  className = "",
}: LightFeatureCardProps) {
  return (
    <div
      className={`rounded-[26px] border border-[#D7E3F4] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.045)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(15,23,42,0.07)] ${className}`}
    >
      <div className="mb-4 flex h-[68px] w-[68px] items-center justify-center rounded-[22px] border border-[#CFE0F8] bg-[#EFF6FF] text-[#2563EB] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        {icon}
      </div>

      <h3 className="text-[20px] font-bold leading-[1.24] tracking-[-0.02em] text-[#0B1220] md:text-[21px]">
        {title}
      </h3>

      <p className="mt-3 text-[15px] leading-[1.8] text-[#475569] md:text-[16px]">
        {description}
      </p>
    </div>
  );
}
