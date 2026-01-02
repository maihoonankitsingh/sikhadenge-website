import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import CounsellingModal from '../components/CounsellingModal';

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 16, padding: 16, color: '#fff' }}>
      <div style={{ fontWeight: 900, marginBottom: 6 }}>{title}</div>
      <div style={{ opacity: 0.85, lineHeight: 1.6, fontSize: 14 }}>{text}</div>
    </div>
  );
}

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Sikhadenge — Live Online Creative Skills</title>
        <meta name="description" content="Live online training: Graphic Design, Video Editing, AI-powered creative skills. Request a 1:1 counselling call." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <section style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 18, padding: 22, color: '#fff' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, alignItems: 'center' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 42, fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1.1 }}>
                Learn creative skills
                <br /> with industry tools.
              </h1>
              <p style={{ marginTop: 10, marginBottom: 16, opacity: 0.9, lineHeight: 1.6, maxWidth: 520 }}>
                Graphic Design • Video Editing • AI-powered workflows (live online).
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  style={{ height: 46, padding: '0 18px', borderRadius: 12, border: 'none', background: 'var(--sd-accent, #ff6b5a)', color: '#fff', fontWeight: 900, fontSize: 14, cursor: 'pointer' }}
                >
                  Open Counselling Form
                </button>

                <Link
                  href="/contact"
                  style={{ height: 46, display: 'inline-flex', alignItems: 'center', padding: '0 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,.22)', color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: 14 }}
                >
                  Contact
                </Link>
              </div>

              <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
                By submitting, you agree to our Terms and Privacy Policy.
              </div>
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
              <Card title="Live + Practical" text="Daily live sessions with assignments and real outputs." />
              <Card title="Industry software" text="Photoshop, Illustrator, Premiere Pro, After Effects + AI tools." />
              <Card title="Portfolio focus" text="Work samples + guidance to build a presentable portfolio." />
            </div>
          </div>
        </section>

        <section style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          <Card title="Graphic Design Track" text="Design basics, branding, posters, social media creatives, portfolio." />
          <Card title="Video Editing Track" text="Premiere Pro workflow, editing principles, output formats, reels." />
          <Card title="AI Track" text="AI-assisted ideation, mockups, assets, productivity workflows." />
        </section>

        <section style={{ marginTop: 18, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 18, padding: 18, color: '#fff' }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>FAQ</h2>
          <div style={{ marginTop: 10, display: 'grid', gap: 10, fontSize: 14, lineHeight: 1.6, opacity: 0.9 }}>
            <div><b>Mode:</b> Live online.</div>
            <div><b>Who is it for:</b> Students, job seekers, freelancers, creators.</div>
            <div><b>Counselling:</b> Form submit के बाद callback/WhatsApp follow-up किया जाता है.</div>
          </div>
        </section>

        <CounsellingModal open={open} onClose={() => setOpen(false)} />
      </main>
    </>
  );
}

