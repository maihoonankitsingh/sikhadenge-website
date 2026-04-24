export const dynamic = "force-dynamic";
export const revalidate = 0;
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Cancellation Policy — Sikhadenge",
  description: "Cancellation policy for Sikhadenge (ThinkGrow Pvt. Ltd.).",
  alternates: { canonical: "https://sikhadenge.in/cancellation-policy" },
};

function PageShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:pt-12 pb-16">
        <div className="text-sm text-slate-500">
          <Link
            href="/"
            aria-label="Home"
            className="mr-2 inline-flex items-center hover:text-slate-900"
          >
            🏠
          </Link>
          <span className="mx-1">›</span>
          <span>{title}</span>
        </div>

        <h1 className="mt-6 text-4xl sm:text-6xl font-normal tracking-tight">
          {title}
        </h1>

        <div className="mt-4 text-[13px] sm:text-[14px] text-slate-600">
          {updated}
        </div>

        <div className="mt-10 max-w-5xl leading-relaxed text-[16px] sm:text-[17px] text-slate-900">
          {children}
        </div>
      </section>
    </main>
  );
}

function renderPolicyBlocks(raw: string) {
  const normalized = raw.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();

  const blocks = normalized
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block, idx) => {
    const oneLine = !block.includes("\n");

    const isHeading =
      oneLine &&
      block.length <= 80 &&
      !/[.?!:]$/.test(block) &&
      !block.toLowerCase().includes("http");

    if (isHeading) {
      return (
        <h2 key={idx} className="mt-10 font-semibold text-slate-900">
          {block}
        </h2>
      );
    }

    const lines = block.split("\n").map((x) => x.trim());
    const isBullets = lines.every((x) => x.startsWith("- "));

    if (isBullets) {
      return (
        <ul key={idx} className="mt-8 list-disc pl-6">
          {lines.map((x, j) => (
            <li key={j} className="mt-3">
              {x.replace(/^- /, "")}
            </li>
          ))}
        </ul>
      );
    }

    const text = block.replace(/\n+/g, " ");
    return (
      <p key={idx} className="mt-8">
        {text}
      </p>
    );
  });
}

export default function CancellationPolicyPage() {
  const content = `Cancellation Policy

Last Updated on 25th Feb 2026

Overview

This Cancellation Policy explains how cancellation requests are handled for enrolments, subscriptions, and services offered under the Sikhadenge brand (ThinkGrow Pvt. Ltd.). This policy should be read along with the Refund Policy and Terms & Conditions.

1) How to request cancellation

To request cancellation, email us from your registered email address or include your registered details:
- Registered name
- Registered phone number
- Registered email
- Course / program name
- Batch / start date (if applicable)
- Payment reference / receipt (if available)
- Reason for cancellation (optional)

Email: support@sikhadenge.in
WhatsApp (support): +91 88085 05575

2) When cancellation is considered “submitted”

A cancellation request is considered submitted only when received through the official channels above with sufficient details to identify the enrolment. If required details are missing, processing may be delayed.

3) Relationship with refunds

Cancellation does not automatically guarantee a refund.
Refund eligibility (if any) is governed by:
- Refund Policy published on the Website; and/or
- Specific terms communicated at the time of enrolment/payment.

4) Access and service delivery

Depending on the program and the stage of service delivery (e.g., access to materials, live sessions attended, recordings shared, assignments/reviews), cancellation may:
- Stop future service delivery; and/or
- Disable access to certain services/materials (where applicable),
subject to the applicable terms of enrolment and refund rules.

5) Batch transfer / deferment (if available)

In certain cases, we may offer a batch transfer or deferment option instead of cancellation, subject to:
- Seat availability in the requested batch
- Schedule and operational constraints
- Policy in effect at the time of request
Approval is at our discretion.

6) Charges and non-refundable components

Certain components may be non-refundable (where applicable), such as:
- Payment gateway charges
- Taxes/levies as per law
- Services already delivered/consumed
- Any non-refundable items as stated in the Refund Policy or at enrolment

7) Updates to this policy

We may update this Cancellation Policy from time to time. The updated version will be posted on this page with a revised “Last Updated” date.

8) Contact

Support: support@sikhadenge.in
WhatsApp: +91 88085 05575
Parent Company: ThinkGrow Pvt. Ltd.
`;

  return (
    <PageShell title="Cancellation Policy" updated="Last Updated on 25th Feb 2026">
      {renderPolicyBlocks(content)}
    </PageShell>
  );
}
