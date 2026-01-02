import React from "react";
import SiteLayout from "../components/SiteLayout";

function Badge({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontSize: 11,
        letterSpacing: ".12em",
        textTransform: "uppercase",
        opacity: 0.92,
      }}
    >
      <span
        style={{
          height: 10,
          width: 10,
          borderRadius: 999,
          background: "#22c55e",
          boxShadow: "0 0 0 4px rgba(34,197,94,.18)",
        }}
      />
      {text}
    </span>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        width: 34,
        height: 34,
        borderRadius: 999,
        display: "inline-grid",
        placeItems: "center",
        background: "rgba(255,255,255,.10)",
        border: "1px solid rgba(255,255,255,.14)",
        color: "#fff",
        flex: "0 0 auto",
      }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

const I = {
  doc: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path
        fill="currentColor"
        d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5"
      />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path
        fill="currentColor"
        d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Z"
      />
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path
        fill="currentColor"
        d="M12 6V3L8 7l4 4V8c2.8 0 5 2.2 5 5a5 5 0 0 1-9.6 2H5.3A7 7 0 0 0 19 13c0-3.9-3.1-7-7-7Z"
      />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path
        fill="currentColor"
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
      />
    </svg>
  ),
};

function Section({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      style={{
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.14)",
        borderRadius: 18,
        padding: 16,
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Icon>{icon}</Icon>
        <div style={{ fontWeight: 900 }}>{title}</div>
      </div>
      <div style={{ marginTop: 10, opacity: 0.92, lineHeight: 1.7, fontSize: 14 }}>
        {children}
      </div>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "10px 12px",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,.18)",
        background: "rgba(255,255,255,.06)",
        color: "rgba(255,255,255,.92)",
        textDecoration: "none",
        fontWeight: 800,
        fontSize: 13,
      }}
    >
      {label} <span aria-hidden>→</span>
    </a>
  );
}

export default function TermsPage() {
  return (
    <SiteLayout>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "26px 18px 40px" }}>
        <div
          style={{
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.14)",
            borderRadius: 18,
            padding: 18,
            color: "#fff",
          }}
        >
          <Badge text="POLICIES" />
          <h1 style={{ margin: "10px 0 0", fontSize: 28, fontWeight: 900, letterSpacing: "-.02em" }}>
            Terms, Privacy & Refund Policy
          </h1>
          <div style={{ marginTop: 6, opacity: 0.8, fontSize: 13 }}>
            SikhaDenge (Parented by ThinkGrow Pvt. Ltd.) • Last Updated: 2025-2026
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <QuickLink href="#terms" label="Terms" />
            <QuickLink href="#refund" label="Refund Policy" />
            <QuickLink href="#privacy" label="Privacy Policy" />
            <QuickLink href="/refund-policy" label="Open Refund Page" />
            <QuickLink href="/privacy-policy" label="Open Privacy Page" />
          </div>
        </div>

        <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
          <Section id="terms" title="Terms of Use (Website)" icon={I.doc}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Use of website</div>
            Website information general guidance के लिए है. Course details / schedules change हो सकते हैं.
            <div style={{ height: 12 }} />
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Lead submission</div>
            Form submit करने पर name/phone store हो सकता है ताकि team connect कर सके.
            <div style={{ height: 12 }} />
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Contact</div>
            किसी भी issue के लिए contact page use करें.
          </Section>

          <Section id="refund" title="Refund, Pre-Booking & Re-Admission Policy" icon={I.refresh}>
            <ol style={{ margin: 0, paddingLeft: 18 }}>
              <li>
                <b>Nature of Services (Digital Service Policy)</b>
                <div style={{ marginTop: 6 }}>
                  हमारे सभी programs में Live Online Classes, Mentor Support, Assignments, Digital Notes, Recordings (where applicable) शामिल हैं।
                  As per digital service norms, once access to live sessions or course material is provided, it is considered as service delivered.
                </div>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Refund Eligibility (Strict Government-Aligned Conditions)</b>
                <div style={{ marginTop: 6 }}>
                  Refund केवल निम्न तीन स्थितियों में review किया जा सकता है:
                  <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                    <li>Duplicate / Accidental Payment</li>
                    <li>If there is a technical issue from our side that prevents the student from joining the class.</li>
                    <li>Student raises a request before attending the first live class.</li>
                  </ul>
                  <div style={{ marginTop: 8 }}>
                    Once a digital service is accessed (live class / material), refund is not applicable.
                  </div>
                </div>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Non-Refundable Situations</b>
                <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                  <li>Student ने 1 या उससे अधिक live classes attend कर ली हैं।</li>
                  <li>Student को course material, notes, or recordings मिल चुके हैं।</li>
                  <li>Student personal reasons की वजह से continue नहीं कर पा रहा (time, interest change, practice issues).</li>
                  <li>Required equipment (Laptop / Internet / Software) arrange नहीं किया गया।</li>
                  <li>Student behaviour violation, discipline issues, या unresponsiveness हो।</li>
                </ul>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Pre-Booking Policy (Updated – Legally Compliant)</b>
                <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                  <li>हर Pre-Booking सिर्फ 30 Days तक valid रहती है।</li>
                  <li>30 Days के बाद Pre-Booking automatically expire हो जाएगी.</li>
                  <li>Pre-Booking amount Non-Refundable है क्योंकि ये Seat Reservation + Offer Holding Fee है।</li>
                  <li>Expired Pre-Booking को next batch me adjust नहीं किया जाएगा.</li>
                </ul>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Dropout & Re-Admission Policy</b>
                <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                  <li>Student को old fee या old offer पर admission नहीं मिलेगा।</li>
                  <li>Re-admission हमेशा current course fee पर ही होगा।</li>
                  <li>Batch transfer या re-entry management approval पर depend करेगी।</li>
                </ul>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Refund Request Process</b>
                <div style={{ marginTop: 6 }}>
                  Student को भुगतान के 7 working days के अंदर request email करनी होगी।
                  <br />
                  All requests must be sent to: <b>support@sikhadenge.in</b>
                </div>
                <div style={{ marginTop: 6 }}>
                  Email में ये details देना जरूरी है:
                  <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                    <li>Full Name</li>
                    <li>Registered Mobile</li>
                    <li>Payment Screenshot</li>
                    <li>Reason for Refund</li>
                  </ul>
                </div>
                <div style={{ marginTop: 6 }}>
                  Approved refunds will be processed within 10–15 business days to the original payment method (UPI/Card/Net Banking), as per banking rules.
                </div>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>No Physical Returns</b>
                <div style={{ marginTop: 6 }}>
                  हम कोई physical product sell नहीं करते, इसलिए Return Policy लागू नहीं होती. All services are purely digital and non-returnable.
                </div>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Policy Updates</b>
                <div style={{ marginTop: 6 }}>
                  Institute किसी भी समय policy update कर सकता है. All updates will be posted on our official website.
                </div>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Contact</b>
                <div style={{ marginTop: 6 }}>
                  Email: <b>support@sikhadenge.in</b>
                  <br />
                  Website: <b>www.sikhadenge.in</b>
                </div>
              </li>
            </ol>
          </Section>

          <Section id="privacy" title="Privacy Policy" icon={I.shield}>
            <div style={{ marginBottom: 10 }}>
              At SikhaDenge (Parented by ThinkGrow Pvt. Ltd.), we respect your privacy and are committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, and safeguard the data you share with us when you access our website, courses, or services.
            </div>

            <ol style={{ margin: 0, paddingLeft: 18 }}>
              <li>
                <b>Information We Collect</b>
                <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                  <li>Personal Information: Name, email address, phone number, location, billing details.</li>
                  <li>Educational Information: Learning interests, progress reports, submitted assignments, projects.</li>
                  <li>Technical Information: Device type, browser details, IP address, cookies, and usage data for analytics.</li>
                </ul>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>How We Use Your Information</b>
                <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                  <li>To register you for courses and manage your account.</li>
                  <li>To provide access to live classes, study material, and community features.</li>
                  <li>To send course updates, important notices, and support communication.</li>
                  <li>To improve our services through analytics and feedback.</li>
                  <li>To maintain compliance with legal and regulatory requirements.</li>
                </ul>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Data Protection & Security</b>
                <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                  <li>All personal data is stored in secure systems with encryption and access controls.</li>
                  <li>We do not sell, rent, or trade your personal information to any third party.</li>
                  <li>Only authorized employees and service providers can access your data for legitimate purposes.</li>
                </ul>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Sharing of Information</b>
                <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                  <li>With service providers (payment gateways, hosting partners, CRM systems) who help us deliver services.</li>
                  <li>With legal authorities, if required to comply with applicable laws.</li>
                  <li>Within the ThinkGrow Pvt. Ltd. group companies, to enhance and expand learning opportunities.</li>
                </ul>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Cookies & Tracking Technologies</b>
                <div style={{ marginTop: 6 }}>
                  We use cookies to personalize your experience, track learning progress, and improve website performance.
                  You may disable cookies in your browser, but some features of the website may not function properly.
                </div>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Your Rights as a User</b>
                <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                  <li>Access, update, or correct your personal information.</li>
                  <li>Request deletion of your data (subject to legal or regulatory requirements).</li>
                  <li>Opt-out of marketing or promotional communications.</li>
                  <li>Contact us anytime for data-related queries.</li>
                </ul>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Data Retention</b>
                <div style={{ marginTop: 6 }}>
                  We retain your data only for as long as it is necessary to provide our services or as required by law. Once the retention period ends, your data will be securely deleted.
                </div>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Children’s Privacy</b>
                <div style={{ marginTop: 6 }}>
                  Our courses are intended for learners aged 16 and above. For learners below 18 years, parental or guardian consent is required to enroll.
                </div>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Policy Updates</b>
                <div style={{ marginTop: 6 }}>
                  We may update this Privacy Policy from time to time. Any significant changes will be notified on our website or via email.
                </div>
              </li>
              <li style={{ marginTop: 10 }}>
                <b>Contact Us</b>
                <div style={{ marginTop: 6, display: "flex", gap: 10, alignItems: "center" }}>
                  <Icon>{I.mail}</Icon>
                  <div>Email: <b>support@sikhadenge.in</b></div>
                </div>
              </li>
            </ol>
          </Section>
        </div>
      </div>
    </SiteLayout>
  );
}
