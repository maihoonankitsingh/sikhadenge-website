export const dynamic = "force-dynamic";
export const revalidate = 0;
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Privacy Policy — Sikhadenge",
  description:
    "Privacy Policy for Sikhadenge (ThinkGrow Pvt. Ltd.) explaining data collection, use, sharing, and user rights.",
  alternates: { canonical: "https://sikhadenge.in/privacy-policy" },
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

export default function PrivacyPolicyPage() {
  const content = `Privacy Policy

Effective date: 2026-07-16

1) Who we are

Sikhadenge is an online learning platform operated by ThinkGrow Pvt. Ltd. (“we”, “us”, “our”).

Registered Office
ThinkGrow Pvt. Ltd., Varanasi, Uttar Pradesh 221008, India.

2) Information we collect

- Contact details: name, phone number, email, city/state (when you submit a form, register, or contact us).
- Course interest details: selected course, experience level, preferences.
- Usage and attribution data: pages visited, clicks and scrolling, device/browser information, approximate location, referrer, UTM parameters and campaign identifiers such as fbclid, gclid or msclkid where available.
- Communication data: messages/calls/WhatsApp conversations and support history for counselling/admissions/support.
- Transaction data (if you pay): payment status/receipt details. We do not store full card/banking credentials; payments are processed via authorized payment gateways.

3) How we use information

- To respond to enquiries and provide counselling/admissions support.
- To send operational updates related to your enquiry/enrolment (utility communication).
- To deliver classes/services you enroll in, and to provide support.
- To improve website, content, and user experience through analytics when analytics consent is granted.
- To measure advertising and campaign conversions when advertising consent is granted.
- To comply with legal obligations and prevent fraud/abuse.

4) Cookies, consent and tracking technologies

Essential storage is used to operate the website, maintain security and remember your privacy choices. Essential storage remains enabled because the website cannot provide these functions without it.

Optional analytics and advertising technologies are disabled unless you grant the relevant consent through our privacy controls.

Analytics technologies: When analytics consent is granted, we may use Microsoft Clarity to understand page visits, clicks, scrolling, device/browser information, referrers, campaign attribution and session-level website interactions. We do not intentionally use Clarity to collect form-field values, OTPs, payment credentials or login credentials.

Advertising technologies: When advertising consent is granted, we may use Meta Pixel and the Meta Conversions API to measure page views, content views, checkout steps and successful lead or conversion events. Depending on the event, Meta measurement may process page URL, referrer, IP address, browser user-agent, campaign identifiers, Meta browser identifiers such as fbp or fbc where available, and hashed contact identifiers submitted with a successful lead.

We store your consent decision in browser local storage and in a first-party cookie named sd_consent_v1 for up to 180 days. The stored choice may be reset sooner if you clear browser data, change your preferences, or we introduce a new consent-policy version.

You can accept all optional technologies, reject non-essential technologies, or make separate choices for analytics and advertising. You can later change or withdraw these choices using the persistent “Privacy settings” button available on the website. A changed choice applies to future optional tracking.

5) Sharing of information

We may share limited information with:
- Service providers (hosting, analytics, CRM/communication tools, payment gateways) strictly for providing services to us.
- Legal authorities if required by law, or to protect rights/safety.

We do not sell your personal information.

6) Data security

We take reasonable technical and organizational measures to protect data. However, no system is 100% secure and we cannot guarantee absolute security.

7) Data retention

We retain information only as long as necessary for the purposes described, or as required by law. We may retain certain records for compliance, dispute resolution, and enforcement.

8) Your choices and rights

- You can request access, correction, or deletion of your data, subject to applicable legal requirements.
- You can change or withdraw consent for optional analytics and advertising at any time through the website’s “Privacy settings” control.
- You can withdraw consent for non-essential communications.
- Withdrawing a tracking choice affects future optional processing and does not automatically delete records that must be retained for legal, security, fraud-prevention or dispute-resolution purposes.
To make a data request, email us from your registered email address at privacy@sikhadenge.in or support@sikhadenge.in with subject “Privacy Request”.

9) Children’s privacy

If a user is under 18 years of age, use of our services should be under the guidance/consent of a parent or legal guardian. If you believe a child has provided personal data without appropriate consent, contact us to review and take appropriate action.

10) Cross-border processing

Depending on service providers used (for example, hosting/analytics/communication tools), your data may be processed in locations outside India, in accordance with applicable law and appropriate safeguards.

11) Grievance Officer

For complaints or grievances relating to personal data:
Grievance Officer: ThinkGrow Pvt. Ltd. (Sikhadenge)
Email: grievance@sikhadenge.in
We aim to respond within a reasonable time as per applicable law.

12) Updates to this policy

We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised effective date. Continued use of the Website constitutes acceptance of the updated policy.

13) Contact

For privacy queries, contact:
privacy@sikhadenge.in
Support: support@sikhadenge.in
WhatsApp: +91 88085 05575
`;

  return (
    <PageShell title="Privacy Policy" updated="Effective date: 2026-07-16">
      {renderPolicyBlocks(content)}
    </PageShell>
  );
}
