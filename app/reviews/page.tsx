export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Reviews | Sikhadenge",
  description: "Learner reviews and success stories.",
};

import nextDynamic from "next/dynamic";

const ReviewsClient = nextDynamic(() => import("./ReviewsClient"), { ssr: false });

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-14">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15]">
            Reviews
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-28 sm:w-32 rounded-full bg-white/70"></div>
          <p className="mt-3 text-sm text-white/70">Learner feedback and outcomes.</p>
        </div>

        {/* Client section (videos + text cards) */}
        <ReviewsClient />
      </div>
    </main>
  );
}
