import { prisma } from "@/lib/prisma";
import Link from "next/link";

type PageProps = {
  searchParams?: {
    storeOrderId?: string;
  };
};

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: "Payment Success | Sikhadenge Store",
  description: "Payment received confirmation for Sikhadenge Store.",
};

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const storeOrderId = String(searchParams?.storeOrderId || "").trim();

  const order = storeOrderId
    ? await prisma.storeOrder.findUnique({
        where: { id: storeOrderId },
        include: {
          product: {
            select: {
              title: true,
              slug: true,
              price: true,
              category: true,
            },
          },
        },
      })
    : null;

  const paid = order?.paymentStatus === "PAID";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
              {paid ? "Payment Received" : "Order Status"}
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {paid ? "Registration Confirmed" : "We Are Checking Your Payment"}
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-600">
              {paid
                ? "Your payment has been received successfully. Your registration is confirmed."
                : "Your payment status is being checked. If you have completed payment, please wait a moment and re-open this page."}
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Next Step</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Your selected product, bonus resources, prompts, or automation toolkit will be
              shared <span className="font-semibold text-slate-900">after the masterclass</span>.
              This page does not provide instant delivery.
            </p>
          </div>

          {order?.product ? (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Product
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {order.product.title}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Amount Paid
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    ₹{order.amount}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Payment Status
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {order.paymentStatus}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Order ID
                  </p>
                  <p className="mt-2 break-all text-sm font-medium text-slate-900">
                    {order.id}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-lg font-semibold text-amber-900">Important</h2>
            <p className="mt-3 text-sm leading-6 text-amber-800">
              Please keep your WhatsApp and email active. Masterclass details and post-masterclass
              delivery updates will be shared there.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/store"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Back to Store
            </Link>

            {order?.product?.slug ? (
              <Link
                href={`/store/${order.product.slug}`}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900"
              >
                View Product Page
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
