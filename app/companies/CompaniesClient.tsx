"use client";

import React, { useMemo, useState } from "react";

type Company = {
  name: string;
  sources: string[];
  fallback: string;
};

type Ext = "svg" | "png" | "jpg" | "jpeg";

const srcs = (n: string, preferred?: Ext) => {
  const all: Ext[] = ["svg", "png", "jpg", "jpeg"];
  const order = preferred ? [preferred, ...all.filter((e) => e !== preferred)] : all;
  return order.map((ext) => `/images/companies/${n}.${ext}`);
};

const companies: Company[] = [
  { name: "Khetyi", sources: srcs("khetyi", "jpg"), fallback: "Khetyi" },
  { name: "KukuFM", sources: srcs("kukufm", "jpg"), fallback: "KukuFM" },
  { name: "Oracle", sources: srcs("oracle", "jpg"), fallback: "Oracle" },
  { name: "Blinkit", sources: srcs("blinkit", "svg"), fallback: "Blinkit" },
  { name: "BookMyShow", sources: srcs("bookmyshow", "svg"), fallback: "BookMyShow" },
  { name: "EaseMyTrip", sources: srcs("easemytrip", "svg"), fallback: "EaseMyTrip" },
  { name: "Fractal", sources: srcs("fractal", "svg"), fallback: "Fractal" },
  { name: "Juspay", sources: srcs("juspay", "svg"), fallback: "Juspay" },
  { name: "Rapido", sources: srcs("rapido", "svg"), fallback: "Rapido" },
  { name: "Razorpay", sources: srcs("razorpay", "jpg"), fallback: "Razorpay" },
  { name: "redBus", sources: srcs("redbus", "png"), fallback: "redBus" },
  { name: "Swiggy", sources: srcs("swiggy", "png"), fallback: "Swiggy" },
  { name: "TataCliq", sources: srcs("tatacliq", "jpg"), fallback: "TataCliq" },
  { name: "Unacademy", sources: srcs("unacademy", "png"), fallback: "Unacademy" },
  { name: "Pocket FM", sources: srcs("pocketfm", "jpg"), fallback: "PocketFM" },
  { name: "Uplers", sources: srcs("uplers", "jpg"), fallback: "Uplers" },
];

function LogoItem({ c }: { c: Company }) {
  const [idx, setIdx] = useState(0);
  const src = c.sources[idx];

  return (
    <div className="sd-item">
      {src ? (
        <img
          src={src}
          alt={c.name}
          loading="lazy"
          className="sd-logo"
          onError={() => setIdx((v) => v + 1)}
        />
      ) : (
        <span className="sd-fallback">{c.fallback}</span>
      )}
      <div className="sd-name">{c.name}</div>
    </div>
  );
}

export default function CompaniesPage() {
  const items = useMemo(() => companies, []);

  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <section className="mx-auto max-w-6xl px-4 pt-14 sm:pt-16">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Companies our students work for
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            A snapshot of brands where learners have worked or collaborated.
          </p>
        </div>
      </section>

      <section className="pb-16 pt-10">
        {/* FULL SCREEN (100vw) */}
        <div className="sd-fullbleed">
          <div className="sd-marquee">
            {/* Edge fade overlays */}
            <div className="sd-fade sd-left" aria-hidden="true" />
            <div className="sd-fade sd-right" aria-hidden="true" />

            {/* Track contains TWO identical groups -> seamless loop */}
            <div className="sd-track" style={{ ["--sdDur" as any]: "26s" }}>
              <div className="sd-group">
                {items.map((c) => (
                  <LogoItem key={"a-" + c.name} c={c} />
                ))}
              </div>

              <div className="sd-group" aria-hidden="true">
                {items.map((c) => (
                  <LogoItem key={"b-" + c.name} c={c} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .sd-fullbleed{
          width: 100vw;
          margin-left: calc(50% - 50vw);
          padding: 0 18px;
        }

        .sd-marquee{
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 170px;
          display: flex;
          align-items: center;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.04);
          box-shadow: 0 24px 90px rgba(0,0,0,0.35);
        }

        /* fade edges like sample */
        .sd-fade{
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 5;
          pointer-events: none;
        }
        .sd-left{ left: 0; background: linear-gradient(90deg, rgba(11,18,32,1), rgba(11,18,32,0)); }
        .sd-right{ right: 0; background: linear-gradient(270deg, rgba(11,18,32,1), rgba(11,18,32,0)); }

        .sd-track{
          display:flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          width: max-content;
          will-change: transform;
          animation: sdMarquee var(--sdDur, 26s) linear infinite;
          padding: 0 18px;
        }

        .sd-marquee:hover .sd-track{ animation-play-state: paused; }

        /* TWO groups side-by-side with SAME gap => translate(-50%) is seamless */
        .sd-group{
          display:flex;
          flex-direction: row;
          align-items: center;
          gap: 20px; /* requested: 20px spacing between logos/cards */
        }

        @keyframes sdMarquee{
          from{ transform: translateX(0); }
          to{ transform: translateX(-50%); }
        }

        .sd-item{
          flex: 0 0 auto;
          min-width: 240px;
          height: 110px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(17,24,39,0.35);
          backdrop-filter: blur(10px);
          padding: 16px 18px;
        }

        .sd-logo{
          height: 54px;
          width: auto;
          max-width: 260px;
          object-fit: contain;
          /* optional: make look more uniform on dark bg */
          filter: grayscale(1) brightness(1.25) contrast(1.05);
          opacity: 0.95;
        }

        .sd-name{
          font-size: 14px;
          font-weight: 700;
          color: rgba(255,255,255,0.82);
          white-space: nowrap;
        }

        .sd-fallback{
          font-size: 14px;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          white-space: nowrap;
        }

        @media (max-width: 640px){
          .sd-fullbleed{ padding: 0 14px; }
          .sd-marquee{ height: 150px; border-radius: 22px; }
          .sd-fade{ width: 60px; }
          .sd-group{ gap: 16px; }
          .sd-item{ min-width: 210px; height: 100px; border-radius: 18px; }
          .sd-logo{ height: 46px; max-width: 220px; }
        }

        @media (prefers-reduced-motion: reduce){
          .sd-track{ animation: none; }
        }
      `}</style>
    </main>
  );
}
