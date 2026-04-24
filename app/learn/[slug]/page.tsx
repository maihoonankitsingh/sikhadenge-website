import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { ArrowRight, Lock, Clock, BookOpen, Lightbulb, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";

function getBlogData() {
  try {
    const filePath = path.join(process.cwd(), 'data/generated-mega-blog.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) { return []; }
}

export async function generateStaticParams() {
  const __all = await (async () => {
const data = getBlogData();
  return data.slice(0, 200).map((p: any) => ({ slug: p.slug }));
  })();
  return Array.isArray(__all) ? __all.slice(0, 60) : [];
}

export const dynamicParams = true;
export const revalidate = 2592000;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = getBlogData().find((p: any) => p.slug === params.slug);
  if (page) return { title: `${page.title} | Sikhadenge Blog`, description: page.description };
  return { title: "AI Learning Blog | Sikhadenge" };
}

function shuffleArray(array: any[]) {
  const s = [...array];
  for (let i = s.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [s[i], s[j]] = [s[j], s[i]]; }
  return s;
}

export default function MegaBlogPage({ params }: { params: { slug: string } }) {
  const data = getBlogData();
  const page = data.find((p: any) => p.slug === params.slug);
  if (!page) notFound();

  const related = shuffleArray(data).filter((p: any) => p.slug !== params.slug).slice(0, 4);
  const readTime = Math.floor(Math.random() * 6) + 5;

  const tocItems = [
    `Why ${page.category} Matters`,
    `Top 5 Tools`,
    "Step-by-Step Guide",
    "Common Mistakes",
    "Expert Tips",
    "FAQ"
  ];

  const FAQs = [
    { q: `Is ${page.category} difficult for ${page.audience.toLowerCase()}?`, a: `Not at all. With the right framework, ${page.audience.toLowerCase()} can start seeing results within the first week. Our Masterclass breaks everything into bite-sized, actionable modules.` },
    { q: `What tools do I need for ${page.category}?`, a: `You only need a laptop or smartphone with internet. All AI tools we recommend have free tiers that are enough to get started.` },
    { q: `How long to master ${page.category}?`, a: `Most ${page.audience.toLowerCase()} get professional-grade output within 2-3 weeks. Full mastery takes 2-3 months with our structured approach.` },
    { q: `Can I earn money with ${page.category}?`, a: `Absolutely. Thousands are already earning ₹30K-₹2L/month using these exact skills.` }
  ];

  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": FAQs.map(faq => ({ "@type": "Question", "name": faq.q, "acceptedAnswer": { "@type": "Answer", "text": faq.a } }))
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-200 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* 1. HERO */}
      <section className="pt-20 sm:pt-28 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-[10px] sm:text-xs font-black text-blue-700 uppercase tracking-widest">
              {page.category}
            </span>
            <span className="flex items-center text-xs text-slate-400 font-bold">
              <Clock className="w-3.5 h-3.5 mr-1" /> {readTime} min read
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-4">
            {page.title}
          </h1>
          <p className="text-sm sm:text-lg text-slate-500 leading-relaxed mb-6 font-medium">
            {page.description}
          </p>
          <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shrink-0">S</div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Sikhadenge Team</p>
              <p className="text-xs text-slate-400 font-medium">Apr 10, 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE TOC */}
      <div className="lg:hidden px-4 py-3 bg-slate-50 border-b border-slate-200">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer font-bold text-sm text-slate-700 list-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-600" /> Table of Contents</span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
          </summary>
          <nav className="mt-3 space-y-2">
            {tocItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 w-5 h-5 rounded flex items-center justify-center shrink-0">{i + 1}</span>
                <span className="break-words">{item}</span>
              </div>
            ))}
          </nav>
        </details>
      </div>

      {/* 2. CONTENT + SIDEBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
          
          <article className="min-w-0 overflow-hidden">
            
            {/* Section 1 */}
            <div className="mb-10">
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 mb-4 break-words">
                <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-lg text-xs sm:text-sm font-black mr-2 align-middle">1</span>
                Why {page.category} Matters
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                The world of {page.category.toLowerCase()} is evolving fast. For {page.audience.toLowerCase()}, this is both a massive opportunity and an urgent skill gap.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                Professionals who master {page.category.toLowerCase()} earn 40-60% more than peers using traditional methods.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 my-6">
                <div className="flex gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-blue-900 mb-1 text-sm">Pro Tip</p>
                    <p className="text-blue-800 font-medium text-sm leading-relaxed">Focus on one specific workflow and master it completely before moving to the next.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Tools */}
            <div className="mb-10">
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 mb-4 break-words">
                <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-lg text-xs sm:text-sm font-black mr-2 align-middle">2</span>
                Top 5 {page.category} Tools
              </h2>
              <div className="space-y-3">
                {[
                  { name: "ChatGPT", desc: "Most versatile AI assistant.", score: "9.4" },
                  { name: "Gemini", desc: "Best for research & Google integration.", score: "9.2" },
                  { name: "Claude AI", desc: "Superior for long-form writing.", score: "9.1" },
                  { name: "Midjourney", desc: "Gold standard for AI images.", score: "9.3" },
                  { name: "Canva AI", desc: "Quick design & social media.", score: "8.9" }
                ].map((tool, i) => (
                  <div key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-xs sm:text-sm shrink-0">{i + 1}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate">{tool.name}</h3>
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">{tool.score}</span>
                      </div>
                      <p className="text-slate-500 font-medium text-xs sm:text-sm">{tool.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Table */}
            <div className="mb-10">
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 mb-4 break-words">
                <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-lg text-xs sm:text-sm font-black mr-2 align-middle">3</span>
                Traditional vs AI-Powered
              </h2>
              <div className="overflow-x-auto -mx-4 px-4">
                <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden" style={{ minWidth: '320px' }}>
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="px-3 sm:px-4 py-2.5 sm:py-3 font-bold">Aspect</th>
                      <th className="px-3 sm:px-4 py-2.5 sm:py-3 font-bold">Old Way</th>
                      <th className="px-3 sm:px-4 py-2.5 sm:py-3 font-bold">AI Way</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Speed", "4-6 hrs", "15-30 min"],
                      ["Quality", "Inconsistent", "High"],
                      ["Cost", "₹5K-20K", "₹500-2K"],
                      ["Scale", "Limited", "Unlimited"]
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-3 sm:px-4 py-2.5 sm:py-3 font-bold text-slate-900">{row[0]}</td>
                        <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-red-600 font-medium">{row[1]}</td>
                        <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-emerald-600 font-bold">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 🔒 BLUR TRAP */}
            <div className="relative my-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <div className="blur-[6px] opacity-50 select-none pointer-events-none p-4 sm:p-8">
                <h3 className="text-lg font-black text-slate-900 mb-3">Secret Frameworks</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Here are the exact prompt templates that top professionals use to generate quality output in under 10 minutes...
                </p>
                <div className="bg-white p-4 rounded-xl border">
                  <p className="font-bold text-sm">Secret Framework #1</p>
                  <p className="text-slate-400 text-xs">Step 1: Open the tool and paste this exact prompt...</p>
                </div>
                <div className="bg-white p-4 rounded-xl border mt-3">
                  <p className="font-bold text-sm">Secret Framework #2</p>
                  <p className="text-slate-400 text-xs">Step 2: Configure the settings to maximize output...</p>
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[2px] p-4">
                <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-2xl text-center w-full max-w-[300px]">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-orange-200">
                    <Lock className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2">Full Article Locked</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mb-4">Free Masterclass join karein</p>
                  <Link href="https://sikhadenge.in/gen-ai-masterclass/register-one-step" className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-full font-bold text-sm shadow-lg w-full">
                    <Lock className="w-4 h-4 mr-2" /> Unlock Free
                  </Link>
                  <p className="text-[10px] text-slate-400 font-bold mt-2">6,200+ ne already unlock kiya</p>
                </div>
              </div>
            </div>

            {/* Section 4: Mistakes */}
            <div className="mb-10">
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 mb-4 break-words">
                <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-lg text-xs sm:text-sm font-black mr-2 align-middle">4</span>
                Common Mistakes
              </h2>
              <div className="space-y-3">
                {[
                  { mistake: "Trying to learn everything at once", fix: "Focus on one workflow. Master it. Then expand." },
                  { mistake: "Using AI without reviewing output", fix: "Always review and refine AI content before delivery." },
                  { mistake: "Not building a portfolio", fix: "Document every project. Build proof of work." }
                ].map((item, i) => (
                  <div key={i} className="bg-red-50/50 border border-red-100 rounded-xl p-4">
                    <p className="font-bold text-red-700 mb-1.5 text-sm">❌ {item.mistake}</p>
                    <p className="text-slate-600 font-medium flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span><strong className="text-emerald-700">Fix:</strong> {item.fix}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2 text-xs uppercase tracking-widest">
                  <BookOpen className="w-4 h-4 text-blue-600" /> Contents
                </h3>
                <nav className="space-y-3">
                  {tocItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group cursor-pointer">
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">{i + 1}</span>
                      <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors leading-snug">{item}</span>
                    </div>
                  ))}
                </nav>
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10"><Sparkles className="w-24 h-24" /></div>
                <h3 className="font-black text-lg mb-2 relative">Free AI Masterclass</h3>
                <p className="text-slate-400 text-sm font-medium mb-4 relative">50,000+ professionals learning AI</p>
                <Link href="https://sikhadenge.in/gen-ai-masterclass/register-one-step" className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all text-sm relative">
                  Join Free
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 mb-6 sm:mb-14 text-center">FAQ</h2>
          <div className="space-y-3">
            {FAQs.map((faq, i) => (
              <details key={i} className="group bg-white border border-slate-200 rounded-xl open:ring-2 open:ring-blue-100 transition-all shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-slate-900 text-sm sm:text-base list-none [&::-webkit-details-marker]:hidden gap-3">
                  <span className="break-words min-w-0">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:text-blue-600 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-slate-600 leading-relaxed font-medium text-sm">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 mb-6 sm:mb-12 text-center">Related Articles</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {related.map((post: any, i: number) => (
              <Link key={i} href={`/learn/${post.slug}`} className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all block">
                <div className="h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                <div className="p-3 sm:p-5">
                  <span className="text-[9px] sm:text-xs font-black text-blue-600 uppercase tracking-widest">{post.category}</span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 mt-1 leading-snug group-hover:text-blue-600 transition-colors line-clamp-3">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DARK CTA */}
      <section className="py-12 sm:py-24 px-4 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-900 to-slate-900"></div>
        <div className="relative z-10">
          <h2 className="text-xl sm:text-4xl font-black text-white mb-4">Start Your AI Journey</h2>
          <p className="text-sm sm:text-lg text-slate-400 mb-6 sm:mb-10 max-w-2xl mx-auto">Join 50,000+ learners mastering AI skills.</p>
          <Link href="https://sikhadenge.in/gen-ai-masterclass/register-one-step" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 sm:py-5 rounded-full font-black text-sm sm:text-xl shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-transform hover:-translate-y-1">
            Join Masterclass Free <ArrowRight className="ml-2 w-4 h-4 sm:w-6 sm:h-6" />
          </Link>
        </div>
      </section>
    </main>
  );
}
