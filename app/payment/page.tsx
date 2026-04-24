import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function PaymentPage({
  searchParams,
}: {
  searchParams: { admissionId?: string };
}) {
  const admissionId = searchParams.admissionId;
  if (!admissionId) redirect("/admission");

  return (
    <main className="min-h-screen bg-[#0B1220] text-text px-4 py-10">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-[#111827] p-6">
        <h1 className="text-2xl font-bold">Payment</h1>
        <p className="mt-2 text-sm text-text/70">
          Admission saved. Ab yahan Razorpay checkout / payment link open karna hai.
        </p>

        <div className="mt-6 rounded-xl border border-border bg-bg/20 p-4">
          <div className="text-xs text-text/60">Admission ID</div>
          <div className="mt-1 break-all font-mono text-sm">{admissionId}</div>
        </div>

        <div className="mt-6 grid gap-3">
          {/* Replace below with your real payment flow */}
          <a
            className="h-11 rounded-xl bg-[#2563EB] flex items-center justify-center font-semibold hover:bg-[#1D4ED8]"
            href={`/api/payment/create-order?admissionId=${encodeURIComponent(admissionId)}`}
          >
            Continue
          </a>

          <a className="text-sm text-text/70 underline" href="/admission">
            Back to Admission
          </a>
        </div>
      </div>
    </main>
  );
}
