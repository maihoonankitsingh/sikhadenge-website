'use client'

import { useEffect, useState } from 'react'
import MasterclassRegistrationFlow from './MasterclassRegistrationFlow'
import RegisterOneStepPage from './RegisterOneStepPage'

type Mode = 'checking' | 'new' | 'legacy'

function isTargetedMasterclass() {
  if (typeof window === 'undefined') return false

  const params = new URLSearchParams(window.location.search)
  const source = (params.get('source') || '').toLowerCase()
  const referrer = (document.referrer || '').toLowerCase()

  if (source.includes('ai-video-masterclass')) return true
  if (source.includes('claude-masterclass')) return true
  if (referrer.includes('/masterclass/ai-video')) return true
  if (referrer.includes('/masterclass/claude/free')) return true

  return false
}

export default function RegisterOneStepEntry() {
  const [mode, setMode] = useState<Mode>('checking')

  useEffect(() => {
    setMode(isTargetedMasterclass() ? 'new' : 'legacy')
  }, [])

  if (mode === 'checking') {
    return (
      <main style={{ minHeight: '100vh', background: '#f7fbff' }} aria-busy="true">
        <style jsx global>{`
          header, footer { display: none !important; }
          html, body { background: #f7fbff; }
        `}</style>
      </main>
    )
  }

  if (mode === 'new') return <MasterclassRegistrationFlow />
  return <RegisterOneStepPage />
}
