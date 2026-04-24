'use client';

import React from 'react';
import Header from '../../components/Header';

export default function HeaderAutoHide() {
  return (
    <div className="sticky top-[56px] z-[999]">
      <Header />
    </div>
  );
}
