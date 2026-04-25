import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Star, CheckCircle, Globe, Zap, Users, Phone, ChevronDown, MapPin, BookOpen, Award, TrendingUp } from "lucide-react";
import generatedPages from "../../../data/generated-seo.json";

// ISR — Build time: top 100 pages, baaki on-demand
export async function generateStaticParams() {
  return generatedPages.slice(0, 100).map((page) => ({
    slug: page.slug,
  }));
}

export const dynamicParams = true;
export const revalidate = 2592000; // 30 days cache

function toTitleCase(s: string) { return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()); }
function makeFallback(slug: string) {
  const title = toTitleCase(slug);
  return { slug, title, description: `Learn ${title} with expert guidance at Sikhadenge. Live sessions, practical training, 1,50,000+ students.`, skill: title.split(" ")[0], industry: "Technology", city: "India" };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pageData = generatedPages.find((p) => p.slug === params.slug) ?? makeFallback(params.slug);
  const url = `https://sikhadenge.in/expert/${pageData.slug}`;
  return {
    title: `${pageData.title} | Sikhadenge`,
    description: pageData.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${pageData.title} | Sikhadenge`,
      description: pageData.description,
      url,
    },
  };
}

export default function ExpertPage({ params }: { params: { slug: string } }) {
  const pageData = generatedPages.find((p) => p.slug === params.slug) ?? makeFallback(params.slug);

  const waLink = `https://wa.me/918808505575?text=Hi, I want to join the free ${pageData.skill} Masterclass on Sikhadenge.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is the ${pageData.skill} masterclass really free?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes — the entry into the WhatsApp community and the overview Sunday session is completely free. You'll get a taste of the practical ${pageData.skill} workflows we teach before any investment.`,
        },
      },
      {
        "@type": "Question",
        name: `Who is this ${pageData.skill} program for?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `It's designed for professionals, freelancers, business owners, and students who want to apply ${pageData.skill} practically — not just understand it theoretically.`,
        },
      },
      {
        "@type": "Question",
        name: "What makes Sikhadenge different from YouTube or Udemy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We focus exclusively on real-world execution. Every session is live, interactive, and based on actual client scenarios — not pre-recorded theory lectures.",
        },
      },
      {
        "@type": "Question",
        name: "How do I join the masterclass?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply click the 'Join Free on WhatsApp' button. You'll be added to the community where session details, resources, and recordings are shared.",
        },
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pageData.title,
    description: pageData.description,
    url: `https://sikhadenge.in/expert/${pageData.slug}`,
    provider: {
      "@type": "EducationalOrganization",
      name: "Sikhadenge",
      url: "https://sikhadenge.in",
    },
    areaServed: { "@type": "Country", name: "India" },
    isRelatedTo: pageData.skill,
    ...(pageData.city && pageData.city !== "Online" ? {
      serviceArea: { "@type": "City", name: pageData.city },
    } : {}),
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ── 1. HERO ── */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-sm font-bold text-blue-600 mb-6 tracking-wide">
              <Zap className="w-4 h-4 fill-blue-600" />
              {pageData.city !== "Online" ? (
                <><MapPin className="w-3.5 h-3.5" /> {pageData.city}</>
              ) : (
                <><Globe className="w-3.5 h-3.5" /> Online Masterclass</>
              )}
            </div>

            {/* H1 */}
            <h1 className="text-5xl sm:text-6xl lg:text-[4.2rem] font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
              {pageData.title}
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl font-medium">
              {pageData.description}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-10">
              {["⭐ 4.9/5 Rating", "🔒 Verified by Sikhadenge", "📲 WhatsApp Community"].map((badge) => (
                <span key={badge} className="bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-bold">
                  {badge}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                href={waLink}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_24px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-1"
              >
                <Phone className="mr-2 w-5 h-5 fill-white" />
                Join Free Masterclass
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="#details"
                className="inline-flex items-center justify-center bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-slate-50"
              >
                Explore Details
                <ChevronDown className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* 3 Feature Cards */}
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: BookOpen, title: "Practical Learning", desc: `Real-world ${pageData.skill} workflows — not just theory.` },
                { icon: Users,    title: "Community Access",  desc: "Join 5,000+ professionals in the Sikhadenge WhatsApp group." },
                { icon: Award,    title: "Expert Sessions",   desc: "Live Sunday masterclasses with industry practitioners." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <item.icon className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS BAR ── */}
      <section className="py-10 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "4.9/5",  label: "Student Rating" },
            { val: "5,000+", label: "Active Members" },
            { val: "Free",   label: "To Join" },
            { val: "Live",   label: "Sunday Sessions" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-black text-slate-900 mb-1">{s.val}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. WHY THIS SKILL ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" id="details">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center md:text-left">
            <div className="inline-block text-blue-600 font-bold mb-3 tracking-wide text-sm uppercase bg-blue-100/50 px-3 py-1 rounded-full">
              Why this matters
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              Why professionals must learn <span className="text-blue-600">{pageData.skill}</span> right now
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              The market is rewarding specialists who can execute, not just those who know the theory.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Zap,         title: "10x Faster Execution",    desc: `Using ${pageData.skill} practically will cut your task time dramatically.` },
              { icon: TrendingUp,  title: "Higher Earning Potential", desc: "Specialists command higher fees. Practical skills = premium positioning." },
              { icon: Users,       title: "Client Demand is Rising",  desc: `Every modern brand needs ${pageData.skill} capabilities in their team or agency.` },
              { icon: CheckCircle, title: "Future-Proof Your Career", desc: "Staying updated with applied skills ensures you remain competitive for years." },
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DARK PREMIUM CTA SECTION ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B1220] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.15),_transparent_70%)]" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-block text-[#F5B301] font-bold mb-4 tracking-wide text-xs uppercase bg-[#F5B301]/10 border border-[#F5B301]/20 px-4 py-1.5 rounded-full">
            🔥 Limited Seats — Sunday Session
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
            Join India's Most Practical <br />
            <span className="text-[#F5B301]">{pageData.skill}</span> Masterclass
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Stop watching theory videos. Come to a live Sunday session where you see real workflows,
            real client examples, and walk away with skills you can sell immediately.
          </p>
          <Link
            href={waLink}
            className="inline-flex items-center justify-center bg-[#F5B301] hover:bg-[#e0a500] text-slate-900 font-black px-10 py-5 rounded-full text-lg shadow-[0_0_40px_rgba(245,179,1,0.35)] transition-all hover:-translate-y-1"
          >
            <Phone className="mr-2 w-5 h-5" />
            Join Free on WhatsApp ⚡
          </Link>
          <p className="text-slate-500 text-sm mt-4">No credit card. No login. Just WhatsApp.</p>
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center md:text-left mb-14">
            <div className="inline-block text-blue-600 font-bold mb-3 tracking-wide text-xs uppercase bg-blue-100/50 px-3 py-1 rounded-full">FAQ</div>
            <h2 className="text-4xl font-black text-slate-900">Frequently asked questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: `Is the ${pageData.skill} masterclass really free?`,
                a: `Yes — the entry into the WhatsApp community and the overview Sunday session is completely free. You'll get a taste of the practical ${pageData.skill} workflows we teach before any investment.`
              },
              {
                q: `Who is this ${pageData.skill} program for?`,
                a: `It's designed for professionals, freelancers, business owners, and students who want to apply ${pageData.skill} practically — not just understand it theoretically.`
              },
              {
                q: "What makes Sikhadenge different from YouTube or Udemy?",
                a: "We focus exclusively on real-world execution. Every session is live, interactive, and based on actual client scenarios — not pre-recorded theory lectures."
              },
              {
                q: "How do I join the masterclass?",
                a: "Simply click the 'Join Free on WhatsApp' button. You'll be added to the community where session details, resources, and recordings are shared."
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-slate-50 border border-slate-200 rounded-2xl open:bg-white open:ring-2 open:ring-blue-100 transition-all duration-200">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-900 select-none list-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:text-blue-600 group-open:rotate-180 transition-transform duration-300 flex-shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed pt-2 border-t border-slate-100 group-open:border-slate-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. STICKY MOBILE CTA (70% conversions) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/80 backdrop-blur-md border-t border-slate-200 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <Link
          href={waLink}
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb959] text-white font-black py-4 rounded-2xl text-base shadow-lg active:scale-95 transition-all w-full"
        >
          <Phone className="w-5 h-5 fill-white" />
          Chat on WhatsApp — Join Free 🚀
        </Link>
      </div>

      {/* Bottom padding for sticky CTA on mobile */}
      <div className="h-20 sm:hidden" />

    </main>
  );
}

