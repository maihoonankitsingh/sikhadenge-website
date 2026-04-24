import SectionPill from "./SectionPill";

type SectionHeaderProps = {
  pill?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  pill,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignClasses = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignClasses} gap-4 ${className}`}>
      {pill ? <SectionPill label={pill} /> : null}

      <div className="max-w-4xl">
        <h2 className="text-[28px] font-bold leading-[1.12] tracking-[-0.03em] text-[#0B1220] md:text-[40px]">
          {title}
        </h2>

        {description ? (
          <p className="mt-3 text-[16px] leading-[1.75] text-[#475569] md:text-[18px]">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
