import { SD_CARD, SD_HOVER } from "../../lib/sikhadenge-ui";

export default function KpiCard({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className={`${SD_CARD} ${SD_HOVER} p-4`}>
      <div className="text-xs text-white/60">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {sub ? <div className="mt-1 text-xs text-white/50">{sub}</div> : null}
    </div>
  );
}
