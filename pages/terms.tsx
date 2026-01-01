import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms — Sikhadenge</title>
        <meta name="description" content="Terms and conditions." />
      </Head>

      <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 18, padding: 20, color: '#fff', lineHeight: 1.8, maxWidth: 900 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900 }}>Terms</h1>
        <div style={{ marginTop: 8, opacity: 0.75, fontSize: 13 }}>Last updated: 30 Dec 2025</div>

        <h2 style={{ marginTop: 14, fontSize: 16, fontWeight: 900 }}>Use of website</h2>
        <div style={{ opacity: 0.9 }}>Website information general guidance के लिए है. Course details / schedules change हो सकते हैं.</div>

        <h2 style={{ marginTop: 14, fontSize: 16, fontWeight: 900 }}>Lead submission</h2>
        <div style={{ opacity: 0.9 }}>Form submit करने पर name/phone store हो सकता है ताकि team connect कर सके.</div>

        <h2 style={{ marginTop: 14, fontSize: 16, fontWeight: 900 }}>Contact</h2>
        <div style={{ opacity: 0.9 }}>किसी issue के लिए contact page use करें.</div>
      </div>
    </>
  );
}
