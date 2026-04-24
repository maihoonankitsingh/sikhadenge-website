type SectionPillProps = {
  label: string;
};

export default function SectionPill({ label }: SectionPillProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-[#BFD3F2] bg-[#EFF6FF] px-3.5 py-1.5 text-[13px] font-semibold tracking-[-0.01em] text-[#2563EB] shadow-[0_4px_12px_rgba(37,99,235,0.07)]">
      {label}
    </div>
  );
}
