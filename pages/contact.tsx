import Head from 'next/head';
import { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const can = name.trim().length >= 2 && phone.replace(/\D/g, '').length >= 10;

  const submit = async () => {
    if (!can || submitting) return;
    setSubmitting(true);
    setErr(null);

    try {
      const payload = {
        fullName: name.trim(),
        phone: phone.replace(/\D/g, '').slice(-10),
        notes: msg.trim() ? msg.trim() : null,
        source: 'contact-page',
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());
      setDone(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Request failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact — Sikhadenge</title>
        <meta name="description" content="Contact Sikhadenge." />
      </Head>

      <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 18, padding: 20, color: '#fff', maxWidth: 720 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900 }}>Contact</h1>
        <p style={{ marginTop: 8, opacity: 0.9, lineHeight: 1.7 }}>You can submit your details here. Team will connect.</p>

        {done ? (
          <div style={{ marginTop: 14, padding: 14, borderRadius: 14, background: 'rgba(0,0,0,.25)', border: '1px solid rgba(255,255,255,.14)' }}>
            Submitted. We will connect.
          </div>
        ) : (
          <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              style={{ height: 44, borderRadius: 12, border: '1px solid rgba(255,255,255,.18)', background: 'rgba(0,0,0,.18)', color: '#fff', padding: '0 12px' }}
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (10 digits)"
              style={{ height: 44, borderRadius: 12, border: '1px solid rgba(255,255,255,.18)', background: 'rgba(0,0,0,.18)', color: '#fff', padding: '0 12px' }}
            />
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Message (optional)"
              rows={4}
              style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,.18)', background: 'rgba(0,0,0,.18)', color: '#fff', padding: 12, resize: 'vertical' }}
            />

            {err && <div style={{ color: '#ffd6d6', fontSize: 13 }}>{err}</div>}

            <button
              type="button"
              onClick={submit}
              disabled={!can || submitting}
              style={{ height: 46, borderRadius: 12, border: 'none', background: !can || submitting ? 'rgba(255,255,255,.18)' : 'var(--sd-accent, #ff6b5a)', color: '#fff', fontWeight: 900, cursor: !can || submitting ? 'not-allowed' : 'pointer' }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </>
  );
}
