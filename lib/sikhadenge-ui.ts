/**
 * Minimal UI class tokens used by dashboard/components.
 * Keep lightweight so build doesn't break if dashboard routes are disabled.
 */
export const SD_CARD =
  "rounded-2xl border border-white/10 bg-[#111827] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]";

export const SD_HOVER =
  "transition duration-200 hover:border-white/20 hover:bg-white/[0.03]";

export const SD_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40";

export const SD_DIVIDER = "border-t border-white/[0.08]";

export const SD_CHIP =
  "inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.03] px-3 py-1 text-xs text-white/70";

export const SD_PROGRESS_TRACK = "h-2 w-full rounded-full bg-white/[0.06]";
export const SD_PROGRESS_BAR =
  "h-2 rounded-full bg-gradient-to-r from-blue-500/90 to-blue-400/70 shadow-[0_0_18px_rgba(37,99,235,0.35)]";

export const SD_GOLD_BAR =
  "h-2 rounded-full bg-gradient-to-r from-amber-300/90 to-amber-400/70 shadow-[0_0_18px_rgba(245,179,1,0.30)]";

export const SD_CARD_HI =
  "relative rounded-3xl border border-white/[0.10] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,0.45)]";
