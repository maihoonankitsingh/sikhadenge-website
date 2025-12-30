import { useState } from 'react';
import CounsellingModal from '../components/CounsellingModal';

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, var(--sd-bg-1), var(--sd-bg-2))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: 'min(980px, 100%)',
          background: 'rgba(255,255,255,.06)',
          border: '1px solid rgba(255,255,255,.14)',
          borderRadius: 18,
          padding: 28,
          color: '#fff',
        }}
      >
        <h1 style={{ margin: 0, fontSize: 38, fontWeight: 900, letterSpacing: '-.02em' }}>
          Sikhadenge
        </h1>

        <p style={{ marginTop: 10, marginBottom: 18, opacity: 0.9, maxWidth: 680, lineHeight: 1.5 }}>
          Graphic Design • Video Editing • AI-powered creative skills (live online).
        </p>

        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            height: 46,
            padding: '0 18px',
            borderRadius: 12,
            border: 'none',
            background: 'var(--sd-accent)',
            color: '#fff',
            fontWeight: 800,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          Open Counselling Form
        </button>
      </div>

      <CounsellingModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
