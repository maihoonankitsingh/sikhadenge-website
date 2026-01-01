import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(10px)', background: 'rgba(10,10,20,.35)', borderBottom: '1px solid rgba(255,255,255,.10)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900, letterSpacing: '-.02em', fontSize: 18 }}>
          Sikhadenge
        </Link>

        <nav style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,.85)', textDecoration: 'none', fontSize: 14 }}>Home</Link>
          <Link href="/about-us" style={{ color: 'rgba(255,255,255,.85)', textDecoration: 'none', fontSize: 14 }}>About</Link>
          <Link href="/contact" style={{ color: 'rgba(255,255,255,.85)', textDecoration: 'none', fontSize: 14 }}>Contact</Link>
          <Link href="/blog" style={{ color: 'rgba(255,255,255,.85)', textDecoration: 'none', fontSize: 14 }}>Blog</Link>
        </nav>
      </div>
    </header>
  );
}
