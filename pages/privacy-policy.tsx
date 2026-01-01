import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Sikhadenge</title>
        <meta name="description" content="Privacy policy." />
      </Head>

      <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 18, padding: 20, color: '#fff', lineHeight: 1.8, maxWidth: 900 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900 }}>Privacy Policy</h1>
        <div style={{ marginTop: 8, opacity: 0.75, fontSize: 13 }}>Last updated: 30 Dec 2025</div>

        <h2 style={{ marginTop: 14, fontSize: 16, fontWeight: 900 }}>What we collect</h2>
        <div style={{ opacity: 0.9 }}>Form submissions में name, phone, course interest जैसी info collect हो सकती है.</div>

        <h2 style={{ marginTop: 14, fontSize: 16, fontWeight: 900 }}>Why we collect</h2>
        <div style={{ opacity: 0.9 }}>Counselling / support के लिए contact करने और lead management के लिए.</div>

        <h2 style={{ marginTop: 14, fontSize: 16, fontWeight: 900 }}>Data access</h2>
        <div style={{ opacity: 0.9 }}>Access internal team तक limited रहता है.</div>
      </div>
    </>
  );
}
