import type { ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--sd-bg-1, #140032), var(--sd-bg-2, #2b0b6a))' }}>
      <SiteHeader />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '26px 18px 40px' }}>
        {children}
      </div>
      <SiteFooter />
    </div>
  );
}
