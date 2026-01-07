import type { ComponentType, CSSProperties } from "react";

type IconType = ComponentType<{ className?: string; style?: CSSProperties }>;

export default function IconNeon({
  icon: Icon,
  tone = "blue",
  size = 42,
  iconSize = 18,
}: {
  icon: IconType;
  tone?: "blue" | "gold";
  size?: number;
  iconSize?: number;
}) {
  const isBlue = tone === "blue";

  const ringColor = isBlue ? "rgba(37,99,235,0.55)" : "rgba(245,179,1,0.55)";
  const glow = isBlue
    ? "0 0 18px rgba(37,99,235,0.55)"
    : "0 0 18px rgba(245,179,1,0.55)";

  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center rounded-full border bg-white/[0.04] ring-1 overflow-hidden"
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderColor: ringColor,
        boxShadow: glow,
      }}
      aria-hidden="true"
    >
      <span
        className="absolute inset-0"
        style={{
          background: isBlue
            ? "radial-gradient(circle at 30% 30%, rgba(37,99,235,0.30), transparent 60%)"
            : "radial-gradient(circle at 30% 30%, rgba(245,179,1,0.22), transparent 60%)",
        }}
      />
      <span
        className="absolute inset-[2px] rounded-full"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        }}
      />
      <Icon
        className="relative"
        style={{
          width: iconSize,
          height: iconSize,
          color: isBlue ? "#2563EB" : "#F5B301",
        }}
      />
    </span>
  );
}
