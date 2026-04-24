declare global {
  interface Window {
    fbq?: (...args: any[]) => void
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''

export function pageView() {
  if (typeof window === 'undefined' || !window.fbq || !META_PIXEL_ID) return
  window.fbq('track', 'PageView')
}

export function trackLead(payload: Record<string, any> = {}) {
  if (typeof window === 'undefined' || !window.fbq || !META_PIXEL_ID) return
  window.fbq('track', 'Lead', payload)
}
