export const dynamic = "force-dynamic";
export const revalidate = 0;
import Link from "next/link";

export const metadata = {
  title: "Refund Policy — Sikhadenge",
  description: "Refund policy for Sikhadenge (ThinkGrow Pvt. Ltd.).",
  alternates: { canonical: "https://sikhadenge.in/refund-policy" },
};

function PageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:pt-12 pb-16">
        {/* Breadcrumb like screenshot */}
        <div className="text-sm text-slate-500">
          <Link href="/" aria-label="Home" className="mr-2 inline-flex items-center hover:text-slate-900">🏠</Link>
          <span className="mx-1">›</span>
          <span>{title}</span>
        </div>

        <h1 className="mt-6 text-4xl sm:text-6xl font-normal tracking-tight">
          {title}
        </h1>

        <div className="mt-10 max-w-5xl leading-relaxed text-[16px] sm:text-[17px] text-slate-900">
          {children}
        </div>
      </section>
    </main>
  );
}

export default function RefundPolicyPage() {
  return (
    <PageShell title="Refund Policy">
      <p className="mt-0">
        Thanks for your interest in <strong>Sikhadenge</strong>. We ensure to
        provide an excellent experience and learning to all our users. As with
        any online purchase experience, some terms and conditions govern the
        Refund Policy. When you purchase a program on <strong>Sikhadenge</strong>,
        you agree to our <strong>Terms &amp; Conditions</strong> and{" "}
        <strong>Refund Policy</strong>.
      </p>

      <p className="mt-10 font-semibold">Our Refund Policy is as follows:</p>

      <p className="mt-8">
        You acknowledge that the Services purchased by you are non-transferable
        and non-refundable.
      </p>

      <p className="mt-8">
        You acknowledge that we are under no obligation to refund any fees and
        applicable charges paid by you, in full or partially, under no
        circumstances, including for modifying and extending the duration of the
        Service, change in the commencement date of the Service, your failure to
        attend or participate in the Service, modification of the structure or
        content of the Service.
      </p>

      <p className="mt-8">
        If any refund is approved (if at all), it will be processed strictly at our sole discretion and only in accordance with this Refund Policy and the terms communicated at enrolment.
        of any other Services of <strong>Sikhadenge</strong> of equivalent value)
        at the sole discretion of <strong>Sikhadenge</strong>.
      </p>
    </PageShell>
  );
}
