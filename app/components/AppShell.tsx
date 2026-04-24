'use client';

import React from 'react';
import Header from './Header';
import OfferStrip from './OfferStrip';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* GLOBAL TOP UI */}
      <OfferStrip />
      <Header />

      {/* PAGE */}
      <main>{children}</main>
    </>
  );
}
