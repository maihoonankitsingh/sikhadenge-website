'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

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
  const pathname = usePathname() ?? ''

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0B1220]/88 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-[82px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-white">
              SD
            </div>
            <div className="text-base font-semibold text-white">Sikhadenge</div>
          </Link>

          <nav className="hidden items-center gap-3 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  'rounded-full px-4 py-2.5 text-sm transition',
                  isActive(item.href)
                    ? 'bg-white/10 text-white'
                    : 'text-white/75 hover:bg-white/5 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="ml-3 inline-flex items-center justify-center rounded-2xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(37,99,235,0.45)] transition hover:bg-[#1D4ED8]"
            >
              Enquire
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>

        {open && (
          <div className="pb-4 md:hidden">
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
                      : 'text-white/75 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(37,99,235,0.45)] transition hover:bg-[#1D4ED8]"
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
