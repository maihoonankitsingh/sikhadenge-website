'use client'

import { useEffect, useState } from 'react'
import MasterclassRegistrationFlow from './MasterclassRegistrationFlow'
import RegisterOneStepPage from './RegisterOneStepPage'
import './masterclass-registration-theme.css'

type Mode = 'checking' | 'new' | 'legacy'
type FunnelTheme = 'claude' | 'ai-video' | null

function getFunnelTheme(): FunnelTheme {
  if (typeof window === 'undefined') return null

  const params = new URLSearchParams(window.location.search)
  const source = (params.get('source') || '').toLowerCase()
  const referrer = (document.referrer || '').toLowerCase()

  if (source.includes('ai-video-masterclass') || referrer.includes('/masterclass/ai-video')) return 'ai-video'
  if (source.includes('claude-masterclass') || referrer.includes('/masterclass/claude/free')) return 'claude'

  return null
}

export default function RegisterOneStepEntry() {
  const [mode, setMode] = useState<Mode>('checking')

  useEffect(() => {
    const theme = getFunnelTheme()

    if (theme) {
      document.body.dataset.masterclassTheme = theme
      setMode('new')
    } else {
      delete document.body.dataset.masterclassTheme
      setMode('legacy')
    }

    return () => {
      delete document.body.dataset.masterclassTheme
    }
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
