import Head from "next/head";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Sikhadenge</title>
        <meta
          name="description"
          content="Privacy Policy for Sikhadenge (Parented by ThinkGrow Pvt. Ltd.)"
        />
      </Head>

      <div className="bg-[#0B1220] text-white">
        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="sd-card p-6 md:p-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Privacy Policy
              </h1>
              <div className="text-[#B0B7C3]">
                SikhaDenge (Parented by ThinkGrow Pvt. Ltd.)
              </div>
              <div className="text-[#9CA3AF] text-sm">Last Updated: 2025-2026</div>
              <div className="h-px bg-white/10 mt-4" />
            </div>

            <div className="mt-6 space-y-6 text-[#B0B7C3] leading-7">
              <p>
                At SikhaDenge (Parented by ThinkGrow Pvt. Ltd.), we respect your privacy and are
                committed to protecting your personal information. This Privacy Policy explains how
                we collect, use, and safeguard the data you share with us when you access our website,
                courses, or services.
              </p>

              <div className="space-y-3">
                <h2 className="text-white text-xl font-bold">1. Information We Collect</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="text-white/90 font-semibold">Personal Information:</span> Name, email address, phone number, location, billing details.</li>
                  <li><span className="text-white/90 font-semibold">Educational Information:</span> Learning interests, progress reports, submitted assignments, projects.</li>
                  <li><span className="text-white/90 font-semibold">Technical Information:</span> Device type, browser details, IP address, cookies, usage data for analytics.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-white text-xl font-bold">2. How We Use Your Information</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To register you for courses and manage your account.</li>
                  <li>To provide access to live classes, study material, and community features.</li>
                  <li>To send course updates, important notices, and support communication.</li>
                  <li>To improve services through analytics and feedback.</li>
                  <li>To maintain compliance with legal and regulatory requirements.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-white text-xl font-bold">3. Data Protection &amp; Security</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Personal data is stored in secure systems with encryption and access controls.</li>
                  <li>We do not sell, rent, or trade your personal information to any third party.</li>
                  <li>Only authorized employees and service providers can access data for legitimate purposes.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-white text-xl font-bold">4. Sharing of Information</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>With service providers (payment gateways, hosting, CRM) to deliver services.</li>
                  <li>With legal authorities if required under applicable laws.</li>
                  <li>Within ThinkGrow Pvt. Ltd. group companies to enhance learning opportunities.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-white text-xl font-bold">5. Cookies &amp; Tracking Technologies</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Cookies help personalize experience, track progress, and improve performance.</li>
                  <li>You may disable cookies, but some website features may not function properly.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-white text-xl font-bold">6. Your Rights as a User</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Access, update, or correct personal information.</li>
                  <li>Request deletion (subject to legal/regulatory requirements).</li>
                  <li>Opt-out of marketing or promotional communications.</li>
                  <li>Contact us for data-related queries.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-white text-xl font-bold">7. Data Retention</h2>
                <p>
                  We retain data only as long as needed to provide services or as required by law.
                  After the retention period ends, data is securely deleted.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-white text-xl font-bold">8. Children’s Privacy</h2>
                <p>
                  Courses are intended for learners aged 16 and above. For learners below 18 years,
                  parental/guardian consent is required.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-white text-xl font-bold">9. Policy Updates</h2>
                <p>
                  We may update this Privacy Policy from time to time. Significant changes will be
                  notified on the website or via email.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-white text-xl font-bold">10. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or your personal data, contact:
                </p>
                <div className="sd-card p-4 bg-[#111827] border border-white/10">
                  <div className="text-white font-semibold">Email</div>
                  <div className="text-[#B0B7C3]">support@sikhadenge.in</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
