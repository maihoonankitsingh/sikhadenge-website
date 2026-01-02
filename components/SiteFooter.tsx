import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,.10)', marginTop: 40 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 18px', color: 'rgba(255,255,255,.75)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
        <div>
          <div style={{ fontWeight: 900, color: '#fff' }}>Sikhadenge</div>
          <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6 }}>
            Live online training: Graphic Design, Video Editing, AI-powered creative skills.
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 700, color: '#fff', fontSize: 13 }}>Pages</div>
          <div style={{ marginTop: 10, display: 'grid', gap: 8, fontSize: 13 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,.75)', textDecoration: 'none' }}>Home</Link>
            <Link href="/about-us" style={{ color: 'rgba(255,255,255,.75)', textDecoration: 'none' }}>About</Link>
            <Link href="/contact" style={{ color: 'rgba(255,255,255,.75)', textDecoration: 'none' }}>Contact</Link>
            <Link href="/blog" style={{ color: 'rgba(255,255,255,.75)', textDecoration: 'none' }}>Blog</Link>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 700, color: '#fff', fontSize: 13 }}>Policies</div>
          <div style={{ marginTop: 10, display: 'grid', gap: 8, fontSize: 13 }}>
            <Link href="/terms" style={{ color: 'rgba(255,255,255,.75)', textDecoration: 'none' }}>Terms</Link>
            <Link href="/privacy-policy" style={{ color: 'rgba(255,255,255,.75)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/refund-policy" style={{ color: 'rgba(255,255,255,.75)', textDecoration: 'none' }}>Refund Policy</Link>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 18px', textAlign: 'center', color: 'rgba(255,255,255,.55)', fontSize: 12 }}>
        © {new Date().getFullYear()} Sikhadenge
      </div>
    </footer>
  );
}
