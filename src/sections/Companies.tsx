"use client";

import Image from "next/image";

type Brand = { name: string; logo: string };

const BRANDS: Brand[] = [
  { name: "Rapido", logo: "/images/companies/Rapido.png" },
  { name: "Quora", logo: "/images/companies/Quora.png" },
  { name: "Pocket FM", logo: "/images/companies/Pocketfm.png" },
  { name: "Oracle", logo: "/images/companies/Oracle.png" },
  { name: "PhonePe", logo: "/images/companies/Phonepe.png" },
  { name: "Juspay", logo: "/images/companies/Juspay.png" },
  { name: "Zomato", logo: "/images/companies/Zomato.png" },
  { name: "Blinkit", logo: "/images/companies/Blinkit.png" },
  { name: "Flipkart", logo: "/images/companies/Flipkart.png" },
  { name: "BookMyShow", logo: "/images/companies/Bookmyshow.png" },
];

function uniqByName(list: Brand[]) {
  const seen = new Set<string>();
  return list.filter((b) => {
    const k = b.name.trim().toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function LogoPill({ name, logo }: Brand) {
  return (
    <div
      className="h-16 w-[260px] shrink-0 rounded-full bg-white/95 border border-black/5 flex items-center justify-center px-6"
      title={name}
      aria-label={name}
    >
      <div className="relative h-12 w-[210px] mx-auto overflow-hidden rounded-xl">
        <Image src={logo} alt={name} fill className="object-cover" sizes="210px" />
      </div>
    </div>
  );
}

export default function Companies() {
  const clean = uniqByName(BRANDS);
  const track = [...clean, ...clean];

  return (
    <section className="bg-[#0B1220] py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-white text-xl font-semibold">Companies our students work for</h2>

        <div className="mt-8 rounded-2xl bg-[#111827] border border-white/10 p-6 overflow-hidden relative">
          <div className="sd-companies-track flex gap-5 will-change-transform">
            {track.map((b, i) => (
              <LogoPill key={`${b.name}-${i}`} name={b.name} logo={b.logo} />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#111827] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#111827] to-transparent" />
        </div>
      </div>

      <style jsx global>{`
        .sd-companies-track { animation: sdCompaniesMarquee 22s linear infinite; }
        @keyframes sdCompaniesMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sd-companies-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
