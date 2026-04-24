export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Shipping Policy — Sikhadenge",
  description: "Shipping policy for Sikhadenge (ThinkGrow Pvt. Ltd.).",
  alternates: { canonical: "https://sikhadenge.in/shipping-policy" },
};

function PageShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <section className="mx-auto max-w-4xl px-4 pt-14 sm:pt-16 pb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{title}</h1>
        <p className="mt-3 text-sm sm:text-base text-white/70">{subtitle}</p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
          <div className="prose prose-invert max-w-none prose-p:text-white/80 prose-li:text-white/80 prose-strong:text-white prose-headings:text-white">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ShippingPolicyPage() {
  return (
    <PageShell
      title="Shipping Policy"
      subtitle="Sikhadenge primarily delivers digital services. Physical shipping is typically not applicable."
    >
      <h2>1) Digital delivery</h2>
      <p>
        Course access and communications are delivered digitally (email/WhatsApp/website dashboard or learning links).
      </p>

      <h2>2) If any physical items are provided</h2>
      <p>
        In rare cases (e.g., optional merchandise), shipping details and timelines will be communicated at the time of purchase.
      </p>

      <h2>3) Contact</h2>
      <p>
        For delivery/support: <strong>support@sikhadenge.in</strong>
      </p>
    </PageShell>
  );
}
