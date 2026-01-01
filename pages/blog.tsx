import Head from 'next/head';

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog — Sikhadenge</title>
        <meta name="description" content="Sikhadenge blog." />
      </Head>

      <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 18, padding: 20, color: '#fff' }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900 }}>Blog</h1>
        <p style={{ marginTop: 10, opacity: 0.9, lineHeight: 1.7 }}>Coming soon.</p>
      </div>
    </>
  );
}
