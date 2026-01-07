import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";

type Item = { name: string; slug: string };

const items: Item[] = [
  { name: "BookMyShow", slug: "bookmyshow" },
  { name: "redBus", slug: "redbus" },
  { name: "Swiggy", slug: "swiggy" },
  { name: "Zomato", slug: "zomato" },
  { name: "Paytm", slug: "paytm" },
  { name: "PhonePe", slug: "phonepe" },

  { name: "Unacademy", slug: "unacademy" },
  { name: "Razorpay", slug: "razorpay" },
  { name: "Blinkit", slug: "blinkit" },
  { name: "EaseMyTrip", slug: "easemytrip" },
  { name: "Fractal", slug: "fractal" },
  { name: "Juspay", slug: "juspay" },

  { name: "Rapido", slug: "rapido" },
  { name: "Pocket FM", slug: "pocketfm" },
  { name: "KukuFM", slug: "kukufm" },
  { name: "Khetyi", slug: "khetyi" },
  { name: "TataCliq", slug: "tatacliq" },
  { name: "Uplers", slug: "uplers" },

  { name: "Oracle", slug: "oracle" },
  { name: "Tech Mahindra", slug: "techmahindra" },
  { name: "Crunchbase", slug: "crunchbase" },
  { name: "Okta", slug: "okta" },
  { name: "OYO", slug: "oyo" },
  { name: "Typeform", slug: "typeform" },

  { name: "Vimeo", slug: "vimeo" },
  { name: "Zerodha", slug: "zerodha" },
];

const srcs = (slug: string) => [
  `/images/companies/${slug}.svg`,
  `/images/companies/${slug}.png`,
  `/images/companies/${slug}.jpg`,
  `/images/companies/${slug}.jpeg`,
];

function Logo({ name, slug }: Item) {
  const sources = useMemo(() => srcs(slug), [slug]);
  const [idx, setIdx] = useState(0);

  return (
    <div className="flex min-w-[240px] items-center gap-4 rounded-2xl border border-white/10 bg-[#0B1220]/25 px-6 py-5">
      <div className="relative h-10 w-28 shrink-0">
        <Image
          src={sources[idx]}
          alt={name}
          fill
          sizes="112px"
          className="object-contain opacity-90 [filter:grayscale(1)_brightness(2.1)_contrast(1.05)]"
          onError={() => {
            setIdx((v) => (v < sources.length - 1 ? v + 1 : v));
          }}
        />
      </div>
      <div className="text-sm font-semibold text-white/85">{name}</div>
    </div>
  );
}

export default function CompaniesMarquee() {
  // 2 copies for seamless loop
  const loop = [...items, ...items];

  return (
    <section className="bg-sd-navy">
      <div className="mx-auto max-w-7xl px-4 pt-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-sd-text sm:text-4xl">
            Companies our learners work for
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            A snapshot of brands where learners have worked or collaborated.
          </p>
        </div>
      </div>

      {/* FULL WIDTH: left -> right infinite marquee */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] mt-8 w-screen">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#0B1220] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#0B1220] to-transparent" />

        <div className="overflow-hidden">
          <div className="rounded-3xl border-y border-white/10 bg-[#111827]/25 py-6">
            <div className="sd-marquee-track flex w-max gap-5 px-6">
              {loop.map((x, i) => (
                <Logo key={`${x.slug}-${i}`} {...x} />
              ))}
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes sdMarquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .sd-marquee-track {
            animation: sdMarquee 35s linear infinite;
            will-change: transform;
          }
          .sd-marquee-track:hover { animation-play-state: paused; }
        `}</style>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-6">
        <div className="flex justify-center">
          <Link href="/companies" className="sd-btn-secondary">
            View all companies
          </Link>
        </div>
        <div className="mt-10 sd-divider"></div>
      </div>
    </section>
  );
}
