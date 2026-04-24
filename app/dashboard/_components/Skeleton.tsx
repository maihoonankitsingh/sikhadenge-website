export const dynamic = "force-dynamic";
export const revalidate = 0;
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />;
}
