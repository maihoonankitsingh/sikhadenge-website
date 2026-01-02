import PageShell from "../components/PageShell";

export default function ReviewsPage() {
  return (
    <PageShell title="Student Reviews">
      <section className="rounded-xl border border-white/10 bg-[#111827] p-5 sm:p-6">
        <p className="text-[#B0B7C3] leading-relaxed">
          This page will contain student reviews, testimonials, and (optional) video review embeds.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
              <div className="text-sm text-[#9CA3AF]">Review</div>
              <div className="mt-2 font-semibold">Student Name</div>
              <p className="mt-2 text-sm text-[#B0B7C3] leading-relaxed">
                Placeholder review text. We will replace with real reviews and proper layout based on your sample.
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
