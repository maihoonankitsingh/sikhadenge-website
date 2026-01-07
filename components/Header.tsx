'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'About', href: '/about-us' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Reviews', href: '/reviews' },
]

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [path, setPath] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') setPath(window.location.pathname)
  }, [])

  const isActive = (href: string) => {
    if (!path) return false
    if (href === '/') return path === '/'
    return path === href || path.startsWith(href + '/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1220]/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#111827] text-sm font-semibold">
              SD
            </div>
            <div className="text-sm font-semibold text-white">Sikhadenge</div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  'rounded-full px-4 py-2 text-sm transition',
                  isActive(item.href)
                    ? 'bg-white/10 text-white'
                    : 'text-[#B0B7C3] hover:bg-white/5 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="ml-2 inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(37,99,235,0.55)] hover:bg-[#1D4ED8]"
            >
              Enquire
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#111827] p-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cx(
                    'rounded-xl px-4 py-3 text-sm',
                    isActive(item.href)
                      ? 'bg-white/10 text-white'
                      : 'text-[#B0B7C3] hover:bg-white/5 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(37,99,235,0.55)] hover:bg-[#1D4ED8]"
              >
                Enquire
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

