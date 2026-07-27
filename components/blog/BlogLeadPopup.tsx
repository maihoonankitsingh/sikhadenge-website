"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeCheck, Sparkles, X } from "lucide-react";

const POPUP_KEY = "sikhadenge-blog-lead-popup-v7-4";
const MASTERCLASS_URL =
  "https://sikhadenge.in/gen-ai-masterclass/register-one-step";

const GLOBAL_POLISH = `
  html,
  body {
    overflow-x: clip !important;
  }

  main[data-blog-article-design="editorial-v7-longform-sticky-lead"] {
    overflow-x: clip !important;
    overflow-y: visible !important;
  }

  main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
    nav[aria-label="Article sections"] {
    scrollbar-width: none;
    -ms-overflow-style: none;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
  }

  main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
    nav[aria-label="Article sections"]::-webkit-scrollbar {
    display: none;
  }

  main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
    nav[aria-label="Article sections"]::before {
    content: "On this page";
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    background: #071b43;
    padding: 0.55rem 0.9rem;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    scroll-snap-align: start;
  }

  main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
    nav[aria-label="Article sections"] > a {
    scroll-snap-align: start;
  }

  @media (min-width: 1024px) {
    main[data-blog-article-design="editorial-v7-longform-sticky-lead"] aside {
      align-self: stretch !important;
      height: auto !important;
      min-height: 100% !important;
      overflow: visible !important;
    }

    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside > div {
      position: sticky !important;
      top: calc(var(--sd-offer-h, 0px) + 64px + 1rem) !important;
      display: grid !important;
      gap: 0.75rem !important;
      max-height: none !important;
      overflow: visible !important;
      padding: 0 !important;
      transform: none !important;
    }

    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside > div > section {
      border-radius: 1.25rem !important;
      margin: 0 !important;
    }

    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside section > div {
      padding: 1rem !important;
    }

    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside section h2 {
      font-size: 1.08rem !important;
      line-height: 1.2 !important;
    }

    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside section p,
    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside section dd,
    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside section dt,
    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside section a {
      overflow-wrap: anywhere;
    }

    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside dl > div {
      padding-top: 0.42rem !important;
      padding-bottom: 0.42rem !important;
    }
  }

  @media (min-width: 1280px) {
    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      nav[aria-label="Article sections"] {
      flex-wrap: wrap;
      overflow-x: visible;
      row-gap: 0.5rem;
      padding-top: 0.65rem;
      padding-bottom: 0.65rem;
    }

    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      nav[aria-label="Article sections"] > a {
      padding: 0.52rem 0.78rem;
      font-size: 0.78rem;
    }
  }
`;

function rememberPopupShown() {
  try {
    window.sessionStorage.setItem(POPUP_KEY, "seen");
  } catch {
    // The invitation still works when storage is unavailable.
  }
}

export function BlogLeadPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let alreadySeen = false;
    let timer: number | undefined;
    let hasOpened = false;

    try {
      alreadySeen = window.sessionStorage.getItem(POPUP_KEY) === "seen";
    } catch {
      alreadySeen = false;
    }

    if (alreadySeen) return;

    const schedulePopup = () => {
      if (hasOpened || timer !== undefined || document.visibilityState !== "visible") return;

      timer = window.setTimeout(() => {
        timer = undefined;
        hasOpened = true;
        setOpen(true);
      }, 4500);
    };

    const handleVisibilityChange = () => {
      if (hasOpened) return;

      if (document.visibilityState === "hidden") {
        if (timer !== undefined) window.clearTimeout(timer);
        timer = undefined;
        return;
      }

      schedulePopup();
    };

    schedulePopup();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      document.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open]);

  function closePopup() {
    rememberPopupShown();
    setOpen(false);
  }

  return (
    <>
      <style>{GLOBAL_POLISH}</style>

      {open ? (
        <div
          data-blog-lead-popup="v7-4"
          className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-[5px] md:items-center md:p-5"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) closePopup();
          }}
        >
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-lead-popup-title"
            aria-describedby="blog-lead-popup-description"
            className="relative grid max-h-[92dvh] w-full max-w-[920px] min-w-0 overflow-y-auto rounded-t-[28px] bg-white shadow-[0_35px_120px_rgba(2,8,23,0.48)] md:max-h-[86dvh] md:grid-cols-[0.86fr_1.14fr] md:rounded-[30px]"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closePopup}
              aria-label="Close registration invitation"
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative min-w-0 overflow-hidden bg-[linear-gradient(145deg,#123d86_0%,#071b43_72%)] px-6 py-7 text-white sm:px-8 md:px-9 md:py-8">
              <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-500/30 blur-3xl" />
              <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />

              <div className="relative min-w-0">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.13em] text-blue-100 sm:text-[11px]">
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span className="truncate">Free practical session</span>
                </div>

                <h2
                  id="blog-lead-popup-title"
                  className="mt-5 max-w-md break-words text-[25px] font-black leading-[1.12] tracking-[-0.03em] sm:text-[29px] md:text-[30px]"
                >
                  Turn this guide into one clear AI action plan.
                </h2>

                <p
                  id="blog-lead-popup-description"
                  className="mt-4 max-w-md break-words text-[14px] leading-7 text-blue-100 sm:text-[15px]"
                >
                  Join Sikhadenge&apos;s free Gen AI Masterclass for a practical learning direction,
                  workflow framework and portfolio-first next step.
                </p>

                <div className="mt-5 grid gap-2.5">
                  {[
                    "Beginner-friendly learning direction",
                    "Workflow and verification framework",
                    "Direct one-step registration",
                  ].map((benefit) => (
                    <div
                      key={benefit}
                      className="grid min-w-0 grid-cols-[19px_minmax(0,1fr)] items-start gap-2.5 text-[12px] leading-5 text-blue-50 sm:text-[13px]"
                    >
                      <BadgeCheck className="mt-0.5 h-[18px] w-[18px]" />
                      <span className="min-w-0 break-words">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-center px-6 py-7 sm:px-8 md:px-10 md:py-8">
              <p className="pr-12 text-[10px] font-extrabold uppercase tracking-[0.15em] text-blue-700 sm:text-[11px]">
                Continue from reading to action
              </p>

              <h3 className="mt-3 max-w-xl break-words text-[24px] font-black leading-[1.14] tracking-[-0.03em] text-slate-950 sm:text-[28px] md:text-[29px]">
                Reserve your free masterclass seat
              </h3>

              <p className="mt-4 max-w-xl break-words text-[14px] leading-7 text-slate-600 sm:text-[15px]">
                Continue through the secure one-step registration page. This invitation is shown
                only once during the current browsing session.
              </p>

              <div className="mt-5 grid gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-black text-slate-950">Learning direction</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">Choose one useful starting path.</p>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-950">Practical output</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">Plan one workflow and portfolio step.</p>
                </div>
              </div>

              <Link
                href={MASTERCLASS_URL}
                onClick={closePopup}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f5b301] px-5 py-3.5 text-center text-sm font-extrabold text-slate-950 transition hover:bg-[#ffd04a] focus:outline-none focus:ring-4 focus:ring-amber-200"
              >
                <span className="min-w-0 break-words">Register for Free Masterclass</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>

              <button
                type="button"
                onClick={closePopup}
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3.5 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                Continue reading this guide
              </button>

              <p className="mt-3 text-center text-[10px] leading-4 text-slate-500 sm:text-[11px]">
                No guaranteed employment, income or ranking claims.
              </p>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
