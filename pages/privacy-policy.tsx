import React from "react";
import SiteLayout from "../components/SiteLayout";

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
  shield: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path
        fill="currentColor"
        d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Z"
      />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path
        fill="currentColor"
        d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5"
      />
    </svg>
  ),
  cookie: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10c-4.2 0-8-3.8-8-8 0-.7.1-1.4.3-2A10 10 0 0 0 12 2Zm-2 7a1.2 1.2 0 1 1-2.4 0A1.2 1.2 0 0 1 10 9Zm6 2a1.2 1.2 0 1 1-2.4 0A1.2 1.2 0 0 1 16 11Zm-4 5a1.2 1.2 0 1 1-2.4 0A1.2 1.2 0 0 1 12 16Z"
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

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
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

export default function PrivacyPolicyPage() {
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
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Icon>{I.shield}</Icon>
            <div>
              <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, letterSpacing: "-.02em" }}>
                Privacy Policy
              </h1>
              <div style={{ marginTop: 6, opacity: 0.8, fontSize: 13 }}>
                SikhaDenge (Parented by ThinkGrow Pvt. Ltd.) • Last Updated: 2025-2026
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
          <Card title="1. Information We Collect" icon={I.doc}>
            When you interact with our website or enroll in our courses, we may collect:
            <ul style={{ margin: "10px 0 0", paddingLeft: 18 }}>
              <li><b>Personal Information:</b> Name, email address, phone number, location, billing details.</li>
              <li><b>Educational Information:</b> Learning interests, progress reports, submitted assignments, projects.</li>
              <li><b>Technical Information:</b> Device type, browser details, IP address, cookies, and usage data for analytics.</li>
            </ul>
          </Card>

          <Card title="2. How We Use Your Information" icon={I.shield}>
            We use your information only for purposes that improve your learning experience:
            <ul style={{ margin: "10px 0 0", paddingLeft: 18 }}>
              <li>To register you for courses and manage your account.</li>
              <li>To provide access to live classes, study material, and community features.</li>
              <li>To send course updates, important notices, and support communication.</li>
              <li>To improve our services through analytics and feedback.</li>
              <li>To maintain compliance with legal and regulatory requirements.</li>
            </ul>
          </Card>

          <Card title="3. Data Protection & Security" icon={I.shield}>
            <ul style={{ margin: "10px 0 0", paddingLeft: 18 }}>
              <li>All personal data is stored in secure systems with encryption and access controls.</li>
              <li>We do not sell, rent, or trade your personal information to any third party.</li>
              <li>Only authorized employees and service providers can access your data for legitimate purposes.</li>
            </ul>
          </Card>

          <Card title="4. Sharing of Information" icon={I.doc}>
            Your data may be shared only in the following cases:
            <ul style={{ margin: "10px 0 0", paddingLeft: 18 }}>
              <li>With service providers (payment gateways, hosting partners, CRM systems) who help us deliver services.</li>
              <li>With legal authorities, if required to comply with applicable laws.</li>
              <li>Within the ThinkGrow Pvt. Ltd. group companies, to enhance and expand learning opportunities.</li>
            </ul>
          </Card>

          <Card title="5. Cookies & Tracking Technologies" icon={I.cookie}>
            We use cookies to personalize your experience, track learning progress, and improve website performance.
            <br />
            You may disable cookies in your browser, but some features of the website may not function properly.
          </Card>

          <Card title="6. Your Rights as a User" icon={I.shield}>
            As a learner, you have the right to:
            <ul style={{ margin: "10px 0 0", paddingLeft: 18 }}>
              <li>Access, update, or correct your personal information.</li>
              <li>Request deletion of your data (subject to legal or regulatory requirements).</li>
              <li>Opt-out of marketing or promotional communications.</li>
              <li>Contact us anytime for data-related queries.</li>
            </ul>
          </Card>

          <Card title="7. Data Retention" icon={I.doc}>
            We retain your data only for as long as it is necessary to provide our services or as required by law.
            Once the retention period ends, your data will be securely deleted.
          </Card>

          <Card title="8. Children’s Privacy" icon={I.shield}>
            Our courses are intended for learners aged 16 and above.
            For learners below 18 years, parental or guardian consent is required to enroll.
          </Card>

          <Card title="9. Policy Updates" icon={I.doc}>
            We may update this Privacy Policy from time to time.
            Any significant changes will be notified on our website or via email.
          </Card>

          <Card title="10. Contact Us" icon={I.mail}>
            If you have questions regarding this Privacy Policy or your personal data, contact:
            <br />
            <b>Email:</b> support@sikhadenge.in
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}
