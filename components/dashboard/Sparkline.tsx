export default function Sparkline({
  points = [4, 6, 5, 8, 7, 9, 6, 10],
}: {
  points?: number[];
}) {
  const w = 160;
  const h = 44;
  const pad = 6;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const scaleX = (i: number) => pad + (i * (w - pad * 2)) / (points.length - 1);
  const scaleY = (v: number) => {
    const t = max === min ? 0.5 : (v - min) / (max - min);
    return h - pad - t * (h - pad * 2);
  };

  const d = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${scaleX(i).toFixed(2)} ${scaleY(v).toFixed(2)}`)
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-95">
      <defs>
        <linearGradient id="sd_line_light" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(37,99,235,1)" />
          <stop offset="1" stopColor="rgba(37,99,235,0.45)" />
        </linearGradient>
        <linearGradient id="sd_fill_light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(37,99,235,0.18)" />
          <stop offset="1" stopColor="rgba(37,99,235,0.00)" />
        </linearGradient>
      </defs>

      <path d={d} fill="none" stroke="url(#sd_line_light)" strokeWidth="2.4" />
      <path d={`${d} L ${w - pad} ${h - pad} L ${pad} ${h - pad} Z`} fill="url(#sd_fill_light)" />
    </svg>
  );
}
