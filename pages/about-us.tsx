import Head from 'next/head';

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About — Sikhadenge</title>
        <meta name="description" content="About Sikhadenge: live online creative skill training." />
      </Head>

      <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 18, padding: 20, color: '#fff' }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900 }}>About Sikhadenge</h1>
        <p style={{ marginTop: 10, opacity: 0.9, lineHeight: 1.7 }}>
          Sikhadenge live online training provide करता है: Graphic Design, Video Editing, और AI-powered creative workflows.
          Focus practical outputs, assignments, और portfolio-ready work पर रहता है.
        </p>

        <div style={{ marginTop: 12, display: 'grid', gap: 10, opacity: 0.9, lineHeight: 1.7 }}>
          <div><b>What you learn:</b> Industry tools + real workflows.</div>
          <div><b>How you learn:</b> Live sessions + assignments + guidance.</div>
          <div><b>Outcome:</b> Skill + portfolio-ready projects.</div>
        </div>
      </div>
    </>
  );
}
