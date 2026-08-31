'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Gift,
  GraduationCap,
  Laptop,
  LockKeyhole,
  Mail,
  MessageCircle,
  Monitor,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  User,
  Users,
} from 'lucide-react'
import { trackLead, trackMetaEvent, readMetaBrowserIdentifiers } from '@/lib/metaPixel'
import { trackEvent } from '@/lib/analytics'
import { readStoredConsentState } from '@/lib/consent'
import styles from './masterclass-registration-flow.module.css'

type FormState = {
  name: string
  email: string
  phone: string
  experience: string
  goal: string
  laptop: string
}

type FormKey = keyof FormState
type ErrorState = Partial<Record<FormKey, string>>
type WorkshopKind = 'claude' | 'ai-video'

type TrackingState = {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
  utm_id: string
  utm_campaign_id: string
  utm_adset_id: string
  utm_ad_id: string
  fbclid: string
  gclid: string
  msclkid: string
  landingUrl: string
  referrer: string
}

const STEP_LABELS = ['Your Details', 'About You', 'Your Goal', 'Bonuses', 'Confirmation'] as const

const ROLES = [
  {
    value: 'Student',
    title: 'Student',
    icon: GraduationCap,
  },
  {
    value: 'Salaried Professional',
    title: 'Working Professional',
    icon: BriefcaseBusiness,
  },
  {
    value: 'Self-Employed',
    title: 'Freelancer / Self-employed',
    icon: User,
  },
  {
    value: 'Founder',
    title: 'Business Owner / Founder',
    icon: Building2,
  },
] as const

const GOALS = [
  {
    value: 'Kickstart Career',
    title: 'Kickstart Career',
    text: 'Build practical AI skills and create a stronger future-ready starting point.',
    icon: Rocket,
  },
  {
    value: 'Career Transition',
    title: 'Career Transition',
    text: 'Explore a new role or domain with practical AI-assisted workflows.',
    icon: ArrowRight,
  },
  {
    value: 'Upskilling',
    title: 'Upskilling',
    text: 'Improve your current workflow and stay ahead with applied AI skills.',
    icon: Sparkles,
  },
  {
    value: 'Build with AI / Business Growth',
    title: 'Build with AI / Business Growth',
    text: 'Use AI to create, automate work, improve delivery, or grow a business.',
    icon: Building2,
  },
] as const

const BONUSES = [
  ['AI Tools Directory', 'A curated shortlist of useful AI tools by practical use case.'],
  ['Ready-to-Use Prompt Collection', 'Practical prompts and frameworks you can reuse after the workshop.'],
  ['Workshop Cheat Sheets', 'Compact notes to help you revisit the key workflows.'],
  ['Bonus Templates & Resources', 'Useful templates and supporting resources shared in the joining flow.'],
] as const

function parseAttribution(search: string, referrer: string): TrackingState {
  const current = new URLSearchParams(search)
  let sourceParams: URLSearchParams | null = null

  try {
    if (referrer) sourceParams = new URL(referrer).searchParams
  } catch {}

  const get = (key: string) => current.get(key) || sourceParams?.get(key) || ''

  return {
    utm_source: get('utm_source'),
    utm_medium: get('utm_medium'),
    utm_campaign: get('utm_campaign'),
    utm_term: get('utm_term'),
    utm_content: get('utm_content'),
    utm_id: get('utm_id'),
    utm_campaign_id: get('utm_campaign_id') || get('campaign_id'),
    utm_adset_id: get('utm_adset_id') || get('adset_id'),
    utm_ad_id: get('utm_ad_id') || get('ad_id'),
    fbclid: get('fbclid'),
    gclid: get('gclid'),
    msclkid: get('msclkid'),
    landingUrl: typeof window !== 'undefined' ? window.location.href : '',
    referrer,
  }
}

function getWorkshopKind(search: string, referrer: string): WorkshopKind {
  const params = new URLSearchParams(search)
  const source = (params.get('source') || '').toLowerCase()
  const ref = referrer.toLowerCase()

  if (source.includes('ai-video') || ref.includes('/masterclass/ai-video')) return 'ai-video'
  return 'claude'
}

export default function MasterclassRegistrationFlow() {
  const [step, setStep] = useState(1)
  const [search, setSearch] = useState('')
  const [referrer, setReferrer] = useState('')
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    experience: '',
    goal: '',
    laptop: '',
  })
  const [errors, setErrors] = useState<ErrorState>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [welcomeUrl, setWelcomeUrl] = useState('/gen-ai-masterclass/welcome')

  useEffect(() => {
    setSearch(window.location.search || '')
    setReferrer(document.referrer || '')
  }, [])

  const workshopKind = useMemo(() => getWorkshopKind(search, referrer), [search, referrer])
  const tracking = useMemo(() => parseAttribution(search, referrer), [search, referrer])

  const workshop = workshopKind === 'ai-video'
    ? {
        name: 'AI Video Generation Masterclass',
        shortName: 'AI Video Masterclass',
        description: 'Reserve your free seat for the practical AI video generation workshop.',
        duration: '3 Hours',
        language: 'Hinglish',
      }
    : {
        name: 'Claude 101 Workshop',
        shortName: 'Claude 101 Workshop',
        description: 'Reserve your free seat for the practical Claude 101 Workshop.',
        duration: '3 Hours',
        language: 'Hinglish',
      }

  function setField<K extends FormKey>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
    setSubmitError('')
  }

  function validateDetails() {
    const next: ErrorState = {}
    if (!form.name.trim()) next.name = 'Please enter your full name.'

    if (!form.email.trim()) {
      next.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.'
    }

    const digits = form.phone.replace(/\D/g, '')
    if (!digits) {
      next.phone = 'Please enter your WhatsApp number.'
    } else if (digits.length !== 10 || !/^[6-9]/.test(digits)) {
      next.phone = 'Enter a valid 10-digit Indian mobile number.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function goNextFromDetails() {
    if (!validateDetails()) return
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goNextFromRole() {
    if (!form.experience) {
      setErrors({ experience: 'Please select what you currently do.' })
      return
    }
    setErrors({})
    setStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goNextFromGoal() {
    const next: ErrorState = {}
    if (!form.goal) next.goal = 'Please select your goal.'
    if (!form.laptop) next.laptop = 'Please select your laptop or desktop status.'
    setErrors(next)
    if (Object.keys(next).length) return
    setStep(4)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goBack(target: number) {
    setErrors({})
    setSubmitError('')
    setStep(target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function completeRegistration() {
    setSubmitError('')
    if (!validateDetails() || !form.experience || !form.goal || !form.laptop) {
      setSubmitError('Please complete all required registration details before continuing.')
      return
    }

    setSubmitting(true)

    try {
      const advertisingConsent = readStoredConsentState()?.advertising === 'granted' ? 'granted' : 'denied'
      const metaIdentifiers = readMetaBrowserIdentifiers()
      const phone = form.phone.replace(/\D/g, '')

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone,
        experience: form.experience,
        goal: form.goal,
        laptop: form.laptop === 'true',
        source: 'website',
        page: '/gen-ai-masterclass/register-one-step',
        advertisingConsent,
        whatsappConsent: true,
        utm_source: tracking.utm_source || null,
        utm_medium: tracking.utm_medium || null,
        utm_campaign: tracking.utm_campaign || null,
        utm_term: tracking.utm_term || null,
        utm_content: tracking.utm_content || null,
        utm_id: tracking.utm_id || null,
        utm_campaign_id: tracking.utm_campaign_id || null,
        utm_adset_id: tracking.utm_adset_id || null,
        utm_ad_id: tracking.utm_ad_id || null,
        fbclid: tracking.fbclid || null,
        gclid: tracking.gclid || null,
        msclkid: tracking.msclkid || null,
        fbp: metaIdentifiers.fbp || null,
        fbc: metaIdentifiers.fbc || null,
        landingUrl: tracking.landingUrl || null,
        referrer: tracking.referrer || null,
        attribution: {
          fbclid: tracking.fbclid,
          gclid: tracking.gclid,
          msclkid: tracking.msclkid,
          referrer: tracking.referrer,
          landingUrl: tracking.landingUrl,
        },
      }

      const response = await fetch('/api/masterclass/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      let data: { id?: string | null; error?: string } = {}
      try {
        data = await response.json()
      } catch {}

      if (!response.ok) {
        throw new Error(data?.error || 'Registration could not be completed. Please try again.')
      }

      const browserEventId = data?.id || undefined
      trackLead(
        { content_name: 'Gen AI Masterclass Registration', status: 'completed' },
        browserEventId || undefined,
      )
      trackMetaEvent('CompleteRegistration', {
        content_name: 'Gen AI Masterclass Registration',
        status: 'completed',
      })
      trackEvent({
        action: 'generate_lead',
        category: 'lead',
        label: 'gen-ai-masterclass-register-one-step',
        page_path: '/gen-ai-masterclass/register-one-step',
      })

      const qs = new URLSearchParams()
      if (tracking.utm_source) qs.set('utm_source', tracking.utm_source)
      if (tracking.utm_medium) qs.set('utm_medium', tracking.utm_medium)
      if (tracking.utm_campaign) qs.set('utm_campaign', tracking.utm_campaign)
      if (tracking.utm_term) qs.set('utm_term', tracking.utm_term)
      if (tracking.utm_content) qs.set('utm_content', tracking.utm_content)
      if (tracking.utm_campaign_id) qs.set('utm_campaign_id', tracking.utm_campaign_id)
      if (tracking.utm_adset_id) qs.set('utm_adset_id', tracking.utm_adset_id)
      if (tracking.utm_ad_id) qs.set('utm_ad_id', tracking.utm_ad_id)
      if (tracking.fbclid) qs.set('fbclid', tracking.fbclid)
      qs.set('phone', phone)
      qs.set('name', form.name.trim())

      setWelcomeUrl(`/gen-ai-masterclass/welcome?${qs.toString()}`)
      setStep(5)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className={styles.shell}>
      <style jsx global>{`
        header, footer { display: none !important; }
        html, body { background: #f7fbff; }
      `}</style>

      <div className={styles.page}>
        <div className={styles.topbar}>
          <div className={styles.brand} aria-label="SikhaDenge">
            <span className={styles.brandMark} aria-hidden="true">S</span>
            <span>SikhaDenge</span>
          </div>
          <span className={styles.freeBadge}><Gift size={15} aria-hidden="true" /> 100% Free</span>
        </div>

        <section className={styles.card} aria-label={`${workshop.name} registration`}>
          <div className={styles.cardBody}>
            <nav className={styles.stepper} aria-label="Registration progress">
              {STEP_LABELS.map((label, index) => {
                const number = index + 1
                const active = number === step
                const done = number < step
                const className = `${styles.stepItem} ${active ? styles.stepItemActive : ''} ${done ? styles.stepItemDone : ''}`
                return (
                  <div className={className} key={label} aria-current={active ? 'step' : undefined}>
                    <span className={styles.stepDot}>{done ? <Check size={15} aria-hidden="true" /> : number}</span>
                    <span>{label}</span>
                  </div>
                )
              })}
            </nav>

            {step === 1 && (
              <div>
                <header className={styles.heading}>
                  <p className={styles.eyebrow}>Step 1 of 5</p>
                  <h1>👋 Let&apos;s get to know you</h1>
                  <p>{workshop.description}</p>
                </header>

                <div className={styles.infoPanel}>
                  <span className={styles.infoIcon}><Gift size={21} aria-hidden="true" /></span>
                  <div>
                    <strong>What you&apos;ll get after registration</strong>
                    <div className={styles.benefitsInline}>
                      <span><i>✓</i> Workshop joining link</span>
                      <span><i>✓</i> Reminders &amp; important updates</span>
                      <span><i>✓</i> Bonus learning resources</span>
                    </div>
                  </div>
                </div>

                <div className={styles.formStack}>
                  <label className={styles.field}>
                    <span className={styles.label}>Full Name <span className={styles.required}>*</span></span>
                    <span className={styles.inputWrap}>
                      <User className={styles.inputIcon} size={18} aria-hidden="true" />
                      <input
                        className={styles.input}
                        value={form.name}
                        onChange={(event) => setField('name', event.target.value)}
                        autoComplete="name"
                        inputMode="text"
                        placeholder="Enter your full name"
                        aria-invalid={Boolean(errors.name)}
                      />
                    </span>
                    {errors.name && <span className={styles.error} role="alert">{errors.name}</span>}
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Email Address <span className={styles.required}>*</span></span>
                    <span className={styles.inputWrap}>
                      <Mail className={styles.inputIcon} size={18} aria-hidden="true" />
                      <input
                        className={styles.input}
                        value={form.email}
                        onChange={(event) => setField('email', event.target.value)}
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="Enter your email address"
                        aria-invalid={Boolean(errors.email)}
                      />
                    </span>
                    <span className={styles.hint}>We&apos;ll use this for registration confirmation and important workshop updates.</span>
                    {errors.email && <span className={styles.error} role="alert">{errors.email}</span>}
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>WhatsApp Number <span className={styles.required}>*</span></span>
                    <span className={styles.phoneWrap}>
                      <span className={styles.country}><span className={styles.flag}>🇮🇳</span> +91</span>
                      <input
                        className={styles.phoneInput}
                        value={form.phone}
                        onChange={(event) => setField('phone', event.target.value.replace(/\D/g, '').slice(0, 10))}
                        type="tel"
                        autoComplete="tel"
                        inputMode="numeric"
                        placeholder="Enter your WhatsApp number"
                        aria-invalid={Boolean(errors.phone)}
                      />
                    </span>
                    <span className={styles.hint}>Please use your active WhatsApp number.</span>
                    {errors.phone && <span className={styles.error} role="alert">{errors.phone}</span>}
                  </label>
                </div>

                <div className={styles.whatsappPanel}>
                  <span className={styles.whatsappIcon}><MessageCircle size={22} aria-hidden="true" /></span>
                  <div>
                    <strong>Why WhatsApp?</strong>
                    <p>The workshop link, reminders and important joining updates are sent through the existing SikhaDenge WhatsApp flow.</p>
                  </div>
                </div>

                <div className={`${styles.actions} ${styles.actionsSingle}`}>
                  <button type="button" className={styles.primaryButton} onClick={goNextFromDetails}>
                    Continue <ArrowRight size={18} aria-hidden="true" />
                  </button>
                </div>
                <p className={styles.securityLine}><LockKeyhole size={13} aria-hidden="true" /> Your information is handled securely.</p>
                <TrustRow />
              </div>
            )}

            {step === 2 && (
              <div>
                <header className={styles.heading}>
                  <p className={styles.eyebrow}>Step 2 of 5</p>
                  <h1>👋 Tell us a little about yourself</h1>
                  <p>This helps us understand who is joining the {workshop.shortName}.</p>
                </header>

                <p className={styles.questionTitle}>What do you currently do? <span className={styles.required}>*</span></p>
                <div className={styles.choiceGrid} role="radiogroup" aria-label="Current occupation">
                  {ROLES.map(({ value, title, icon: Icon }) => {
                    const selected = form.experience === value
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        className={`${styles.choiceCard} ${selected ? styles.choiceCardSelected : ''}`}
                        onClick={() => setField('experience', value)}
                      >
                        {selected && <span className={styles.selectedTick}><Check size={15} aria-hidden="true" /></span>}
                        <span className={styles.choiceIcon}><Icon size={29} aria-hidden="true" /></span>
                        <strong>{title}</strong>
                      </button>
                    )
                  })}
                </div>
                {errors.experience && <p className={styles.error} role="alert">{errors.experience}</p>}

                <div className={styles.whatsappPanel}>
                  <span className={styles.whatsappIcon}><MessageCircle size={22} aria-hidden="true" /></span>
                  <div>
                    <strong>We&apos;ll connect on WhatsApp</strong>
                    <p>You&apos;ll receive joining updates, reminders and workshop resources through the same existing WhatsApp registration flow.</p>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button type="button" className={styles.secondaryButton} onClick={() => goBack(1)}><ArrowLeft size={17} /> Back</button>
                  <button type="button" className={styles.primaryButton} onClick={goNextFromRole}>Continue <ArrowRight size={18} /></button>
                </div>
                <p className={styles.securityLine}><LockKeyhole size={13} /> Your information is handled securely.</p>
                <TrustRow />
              </div>
            )}

            {step === 3 && (
              <div>
                <header className={styles.heading}>
                  <p className={styles.eyebrow}>Step 3 of 5</p>
                  <h1>🎯 What do you want from this workshop?</h1>
                  <p>Choose the goal that best describes what you want to achieve.</p>
                </header>

                <div className={styles.goalPanel}>
                  <div className={styles.goalIntro}>
                    <span className={styles.sectionIcon}><Target size={21} /></span>
                    <div>
                      <strong>What is your goal for joining this workshop? <span className={styles.required}>*</span></strong>
                      <p>Select the option that best matches your current goal.</p>
                    </div>
                  </div>
                  <div className={styles.goalList} role="radiogroup" aria-label="Workshop goal">
                    {GOALS.map(({ value, title, text, icon: Icon }) => {
                      const selected = form.goal === value
                      return (
                        <button
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          className={`${styles.goalCard} ${selected ? styles.goalCardSelected : ''}`}
                          key={value}
                          onClick={() => setField('goal', value)}
                        >
                          <span className={styles.goalIcon}><Icon size={18} /></span>
                          <span className={styles.goalCopy}><strong>{title}</strong><small>{text}</small></span>
                          {selected ? <CheckCircle2 size={19} color="#0b63f6" /> : <ChevronRight className={styles.chevron} size={19} />}
                        </button>
                      )
                    })}
                  </div>
                  {errors.goal && <p className={styles.error} role="alert">{errors.goal}</p>}
                </div>

                <div className={styles.laptopPanel}>
                  <div className={styles.laptopHeader}>
                    <span className={styles.sectionIcon}><Laptop size={20} /></span>
                    <div><strong>Do you have a laptop or desktop? <span className={styles.required}>*</span></strong><p>This helps us understand your setup for practical workshop activities.</p></div>
                  </div>
                  <div className={styles.laptopGrid} role="radiogroup" aria-label="Laptop or desktop availability">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={form.laptop === 'true'}
                      className={`${styles.laptopChoice} ${form.laptop === 'true' ? styles.laptopChoiceSelected : ''}`}
                      onClick={() => setField('laptop', 'true')}
                    >
                      <CheckCircle2 size={18} color="#18a957" /> Yes, I have one
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={form.laptop === 'false'}
                      className={`${styles.laptopChoice} ${form.laptop === 'false' ? styles.laptopChoiceSelected : ''}`}
                      onClick={() => setField('laptop', 'false')}
                    >
                      <Monitor size={18} color="#0b63f6" /> I will arrange one
                    </button>
                  </div>
                  {errors.laptop && <p className={styles.error} role="alert">{errors.laptop}</p>}
                </div>

                <div className={styles.noticePanel}>
                  <BadgeCheck size={20} color="#0b63f6" />
                  <p><strong>Not sure about your setup yet?</strong>You can still complete registration. We&apos;ll share the joining details before the workshop.</p>
                </div>

                <div className={styles.actions}>
                  <button type="button" className={styles.secondaryButton} onClick={() => goBack(2)}><ArrowLeft size={17} /> Back</button>
                  <button type="button" className={styles.primaryButton} onClick={goNextFromGoal}>Continue <ArrowRight size={18} /></button>
                </div>
                <p className={styles.securityLine}><LockKeyhole size={13} /> Your information is handled securely.</p>
              </div>
            )}

            {step === 4 && (
              <div>
                <header className={styles.heading}>
                  <p className={styles.eyebrow}>Step 4 of 5</p>
                  <h1>🎁 Your workshop bonus pack</h1>
                  <p>These resources support the practical learning flow after you register.</p>
                </header>

                <div className={styles.offerPanel}>
                  <span className={styles.offerBadge}>Included with free registration</span>
                  <h2>Practical resources to help you apply what you learn</h2>
                  <p>We&apos;re keeping this registration flow non-transactional: no payment is collected on this step.</p>
                  <div className={styles.offerList}>
                    {BONUSES.map(([title, text]) => (
                      <div className={styles.offerItem} key={title}>
                        <span className={styles.offerItemIcon}><Check size={15} /></span>
                        <span><strong>{title}</strong><small>{text}</small></span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.includedBox}>
                    <Gift size={22} color="#18a957" />
                    <span>Included in your workshop joining flow<small>No card, UPI or checkout is requested here.</small></span>
                  </div>
                </div>

                {submitError && <p className={styles.submitError} role="alert" aria-live="polite">{submitError}</p>}
                <div className={styles.actions}>
                  <button type="button" className={styles.secondaryButton} onClick={() => goBack(3)} disabled={submitting}><ArrowLeft size={17} /> Back</button>
                  <button type="button" className={styles.primaryButton} onClick={completeRegistration} disabled={submitting}>
                    {submitting ? <><span className={styles.loader} /> Completing registration…</> : <>Complete Free Registration <ArrowRight size={18} /></>}
                  </button>
                </div>
                <p className={styles.securityLine}><LockKeyhole size={13} /> Lead, analytics and WhatsApp processing run only after successful registration.</p>
                <TrustRow />
              </div>
            )}

            {step === 5 && (
              <div className={styles.success} aria-live="polite">
                <span className={styles.successIcon}><Check size={48} strokeWidth={2.5} /></span>
                <h1>🎉 You&apos;re all set!</h1>
                <p className={styles.successLead}>Your registration for the {workshop.shortName} is confirmed.</p>

                <div className={styles.whatsappSuccessCard}>
                  <span className={styles.bigWhatsapp}><MessageCircle size={36} /></span>
                  <div>
                    <h2>Continue to the WhatsApp joining flow</h2>
                    <p>Use the existing SikhaDenge success page to access the workshop joining link, reminders and community instructions.</p>
                    <button className={styles.whatsappButton} type="button" onClick={() => window.location.assign(welcomeUrl)}>
                      <MessageCircle size={19} /> Continue to WhatsApp Community <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                <div className={styles.emailNote}>
                  <Mail size={19} color="#0b63f6" />
                  <span>Your registration details have been captured. Please also check your email and WhatsApp for workshop updates.</span>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}><Clock3 size={21} /><span><small>Workshop Duration</small><strong>{workshop.duration}</strong></span></div>
                  <div className={styles.detailItem}><MessageCircle size={21} /><span><small>Language</small><strong>{workshop.language}</strong></span></div>
                  <div className={styles.detailItem}><Users size={21} /><span><small>Doubt Support</small><strong>Available</strong></span></div>
                  <div className={styles.detailItem}><Monitor size={21} /><span><small>Format</small><strong>Live Online</strong></span></div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

function TrustRow() {
  return (
    <div className={styles.trustRow} aria-label="Registration trust information">
      <div className={styles.trustItem}>
        <span className={styles.trustIcon}><ShieldCheck size={19} /></span>
        <span><strong>Secure &amp; Safe</strong><small>Protected registration flow</small></span>
      </div>
      <div className={styles.trustItem}>
        <span className={styles.trustIcon}><Clock3 size={19} /></span>
        <span><strong>Takes less than 1 minute</strong><small>Quick step-by-step registration</small></span>
      </div>
      <div className={styles.trustItem}>
        <span className={styles.trustIcon}><Users size={19} /></span>
        <span><strong>Built for practical learners</strong><small>Clear, guided workshop onboarding</small></span>
      </div>
    </div>
  )
}
