export const dynamic = "force-dynamic";
export const revalidate = 0;
import { Suspense } from "react";
import PartnerApplyForm from "../../api/partner/apply/PartnerApplyForm";

export const metadata = {
  title: "Partner Apply | Sikhadenge",
  description: "Apply as an affiliate or influencer partner at Sikhadenge.",
};

export default function PartnerApplyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Partner Application
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Apply as Affiliate or Influencer
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              This form is isolated from the main lead capture flow. It only saves partner
              applications for manual review.
            </p>
          </div>

          <Suspense fallback={<div className="text-sm text-slate-500">Loading form...</div>}>
            <PartnerApplyForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
