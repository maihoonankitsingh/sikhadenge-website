"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, Sparkles, X } from "lucide-react";

const POPUP_KEY = "sikhadenge-blog-lead-popup-v7-1";
const MASTERCLASS_URL =
  "https://sikhadenge.in/gen-ai-masterclass/register-one-step";

const GLOBAL_POLISH = `
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
      align-self: stretch;
      height: 100%;
      min-height: 100%;
    }

    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside > div {
      position: sticky !important;
      top: 5.75rem !important;
      max-height: calc(100vh - 6.5rem);
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: none;
      -ms-overflow-style: none;
      gap: 0.85rem !important;
      padding-right: 0.15rem;
    }

    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside > div::-webkit-scrollbar {
      display: none;
    }

    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside section {
      border-radius: 1.35rem !important;
    }

    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside section > div {
      padding: 1.15rem !important;
    }

    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside section h2 {
      line-height: 1.18;
    }

    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside dl > div {
      padding-top: 0.55rem !important;
      padding-bottom: 0.55rem !important;
    }

    main[data-blog-article-design="editorial-v7-longform-sticky-lead"]
      aside a {
      overflow-wrap: anywhere;
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

export function BlogLeadPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let alreadySeen = false;

    try {
      alreadySeen = window.sessionStorage.getItem(POPUP_KEY) === "seen";
    } catch {
      alreadySeen = false;
    }

    if (alreadySeen) return;

    const timer = window.setTimeout(() => setOpen(true), 4500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function closePopup() {
    try {
      window.sessionStorage.setItem(POPUP_KEY, "seen");
    } catch {
      // The popup can still close when storage is unavailable.
    }
    setOpen(false);
  }

  return (
    <>
      <style>{GLOBAL_POLISH}</style>

      {open ? (
        <div
          data-blog-lead-popup="v7-1"
          className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/72 p-0 backdrop-blur-[6px] sm:items-center sm:p-5"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) closePopup();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-lead-popup-title"
            aria-describedby="blog-lead-popup-description"
            className="relative grid max-h-[94dvh] w-full max-w-[1080px] min-w-0 overflow-y-auto rounded-t-[30px] bg-white shadow-[0_35px_120px_rgba(2,8,23,0.48)] sm:max-h-[90vh] sm:grid-cols-[0.96fr_1.04fr] sm:rounded-[34px] lg:overflow-hidden"
          >
            <button
              type="button"
              onClick={closePopup}
              aria-label="Close registration invitation"
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative min-w-0 overflow-hidden bg-[linear-gradient(145deg,#0b347d_0%,#071b43_68%)] px-6 py-8 text-white sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/35 blur-3xl" />
              <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />

              <div className="relative min-w-0">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-blue-100 sm:text-xs">
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span className="truncate">Free practical session</span>
                </div>
                <h2
                  id="blog-lead-popup-title"
                  className="mt-5 max-w-md break-words text-[30px] font-black leading-[1.08] tracking-[-0.04em] sm:text-[36px] lg:text-[40px]"
                >
                  Turn your AI learning into a clear execution plan.
                </h2>
                <p
                  id="blog-lead-popup-description"
                  className="mt-4 max-w-md break-words text-[15px] leading-7 text-blue-100 sm:text-base"
                >
                  Join Sikhadenge&apos;s free Gen AI Masterclass to understand useful workflows,
                  portfolio thinking and the next practical step for your chosen career path.
                </p>

                <div className="mt-6 grid gap-3">
                  {[
                    "Begin with a practical path that matches your current skill level",
                    "Learn workflow, verification and portfolio thinking",
                    "Continue through a direct one-step registration page",
                  ].map((benefit) => (
                    <div
                      key={benefit}
                      className="grid min-w-0 grid-cols-[20px_minmax(0,1fr)] items-start gap-3 text-[13px] leading-6 text-blue-50 sm:text-sm"
                    >
                      <BadgeCheck className="mt-0.5 h-5 w-5 text-[#f5b301]" />
                      <span className="min-w-0 break-words">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-center px-6 py-8 sm:px-9 sm:py-9 lg:px-11 lg:py-10">
              <p className="pr-12 text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-700 sm:text-xs">
                Continue from reading to action
              </p>
              <h3 className="mt-4 max-w-xl break-words text-[29px] font-black leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-[34px] lg:text-[38px]">
                Reserve your free masterclass seat
              </h3>
              <p className="mt-4 max-w-xl break-words text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
                Move from this article into a structured practical session. The registration
                page securely collects the required details and this invitation appears only
                once during the browsing session.
              </p>

              <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                <p className="text-sm font-black text-slate-950">What you leave with</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  A clearer learning direction, one workflow to practise and a portfolio-first
                  next step.
                </p>
              </div>

              <Link
                href={MASTERCLASS_URL}
                onClick={closePopup}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f5b301] px-5 py-4 text-center text-sm font-extrabold text-slate-950 transition hover:bg-[#ffd04a]"
              >
                <span className="min-w-0 break-words">Register for Free Masterclass</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
              <button
                type="button"
                onClick={closePopup}
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-4 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Continue reading this guide
              </button>
              <p className="mt-4 text-center text-[11px] leading-5 text-slate-500 sm:text-xs">
                No guaranteed employment, income or ranking claims. Review the programme details
                before registering.
              </p>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
