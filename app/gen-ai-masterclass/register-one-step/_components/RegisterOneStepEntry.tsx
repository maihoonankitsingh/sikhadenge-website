'use client'

import { useEffect, useState } from 'react'
import MasterclassRegistrationFlow from './MasterclassRegistrationFlow'
import RegisterOneStepPage from './RegisterOneStepPage'
import themeStyles from './masterclass-registration-theme.module.css'

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
  const [theme, setTheme] = useState<'claude' | 'ai-video'>('ai-video')

  useEffect(() => {
    const nextTheme = getFunnelTheme()
    const previousBackground = document.body.style.background

    if (nextTheme) {
      setTheme(nextTheme)
      document.body.style.background = nextTheme === 'claude' ? '#fff8f3' : '#f7fbff'
      setMode('new')
    } else {
      setMode('legacy')
    }

    return () => {
      document.body.style.background = previousBackground
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

  if (mode === 'new') {
    return (
      <div className={theme === 'claude' ? themeStyles.claudeTheme : themeStyles.aiVideoTheme}>
        <MasterclassRegistrationFlow />
      </div>
    )
  }

  return <RegisterOneStepPage />
}
