import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { ArrowRight, Lock, Sparkles, Settings, Activity, ShieldCheck, ChevronDown, CheckCircle2, Terminal } from "lucide-react";

function getGeneratedTools() {
  try {
    const filePath = path.join(process.cwd(), 'data/generated-mini-tools.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) { return []; }
}

export async function generateStaticParams() {
  return getGeneratedTools().map((p: any) => ({ slug: p.slug }));
}
export const dynamicParams = true;
export const revalidate = 2592000;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = getGeneratedTools().find((p: any) => p.slug === params.slug);
  if (page) return { title: page.title, description: page.description };
  return { title: "Free AI Tools | Sikhadenge" };
}

// SPIDER WEB MIXER ALGORITHM
function shuffleArray(array: any[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FreeToolPage({ params }: { params: { slug: string } }) {
  const data = getGeneratedTools();
  const page = data.find((p: any) => p.slug === params.slug);

  if (!page) notFound();

  // Pick 6 Random Tools for Google Bot Spider Web
  const relatedLinks = shuffleArray(data).filter((p: any) => p.slug !== params.slug).slice(0, 8);

  const FAQs = [
    { q: `How does the ${page.name} generate results so accurately?`, a: `Our engine is powered by advanced 2026 AI models fine-tuned specifically for ${page.task}. It analyzes your context and constraints to craft human-like, highly optimized outputs instantly.` },
    { q: `Is this tool completely free to use?`, a: `You can access the UI and preview mode for free. However, to unlock the full generated content and export it, you need to be a Sikhadenge Masterclass member.` },
    { q: `Do I need coding or AI skills to use this?`, a: `Not at all. The interface is completely No-Code. Just type in plain English, and our backend AI pipeline structure handles 100% of the complex prompting behind the scenes.` },
    { q: `Can I use the output for commercial purposes?`, a: `Yes, once you unlock the generated content, you own 100% of the commercial rights to use it for your business, clients, or personal projects.` }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* 1. HEADER SECTION (Consistent with Prompt Pages) */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-5 py-2 text-sm font-bold text-blue-700 mb-8 uppercase tracking-widest shadow-sm">
             <ShieldCheck className="w-5 h-5 mr-3" /> Sikhadenge Utility Engine
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6 drop-shadow-sm">
            Free Online <br/><span className="text-blue-600">{page.name}</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
            {page.description} Stop doing manual work. Let our AI pipeline execute your tasks instantly.
          </p>
        </div>
      </section>

      {/* 2. THE TOOL UI TRAP */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start h-full">
           
           {/* LEFT COLUMN: THE FORM */}
           <div className="lg:col-span-5 bg-white border border-slate-200 shadow-sm rounded-[2rem] p-8 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                 <h3 className="text-xl font-bold flex items-center">
                   <Settings className="w-5 h-5 text-indigo-500 mr-2" /> Tool Settings
                 </h3>
              </div>
              <div className="space-y-6">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Subject / Context</label>
                    <input type="text" placeholder="e.g. Technology, Business..." disabled className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-600 font-medium focus:ring-2 focus:ring-blue-100 outline-none hover:cursor-not-allowed" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Detailed Variables</label>
                    <textarea rows={4} placeholder="Describe exactly what kind of output you are looking for..." disabled className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-600 font-medium focus:ring-2 focus:ring-blue-100 hover:cursor-not-allowed outline-none resize-none"></textarea>
                 </div>
                 <div className="pt-4">
                   <Link href="https://sikhadenge.in/gen-ai-masterclass/register-one-step" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xl py-4 rounded-xl flex items-center justify-center shadow-md transition-all hover:scale-[1.02]">
                      <Sparkles className="w-5 h-5 mr-3" /> Generate with AI
                   </Link>
                 </div>
              </div>
           </div>

           {/* RIGHT COLUMN: THE GLASS LOCK TRAP */}
           <div className="lg:col-span-7 h-[600px] rounded-[2rem] bg-white border border-slate-200 shadow-sm relative overflow-hidden flex flex-col">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
                 <div className="flex gap-2.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-400 border border-red-500/20"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-500/20"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-green-400 border border-green-500/20"></span>
                 </div>
                 <div className="text-sm font-mono text-slate-500 font-semibold tracking-wide flex items-center">
                   <Activity className="w-4 h-4 mr-2" /> Live Output Window
                 </div>
              </div>
              <div className="p-10 flex-1 relative bg-[linear-gradient(rgba(241,245,249,0.5)_2px,transparent_2px)] bg-[length:100%_32px]">
                 <div className="max-w-2xl mx-auto space-y-6 opacity-60 blur-[3px]">
                    <div className="w-3/4 h-8 bg-slate-200 rounded-lg"></div>
                    <div className="w-full h-4 bg-slate-200 rounded"></div>
                    <div className="w-11/12 h-4 bg-slate-200 rounded"></div>
                    <div className="w-full h-4 bg-slate-200 rounded"></div>
                    <div className="pt-6"></div>
                    <div className="w-1/2 h-8 bg-slate-200 rounded-lg"></div>
                    <div className="w-full h-4 bg-slate-200 rounded"></div>
                    <div className="w-full h-4 bg-slate-200 rounded"></div>
                 </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-white via-white/95 to-transparent flex flex-col items-center justify-end pb-12 z-20">
                 <div className="mb-6 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm font-bold flex items-center shadow-sm">
                   <Lock className="w-4 h-4 mr-2" />
                   {page.name} is strictly locked
                 </div>
                 <Link href="https://sikhadenge.in/gen-ai-masterclass/register-one-step" className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-full font-black text-xl transition-all hover:scale-105 shadow-xl border border-slate-700">
                   Unlock This Tool <ArrowRight className="w-6 h-6 ml-3" />
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* 3. NEW: INTERNAL SPIDER WEB (Consistent with Prompts) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-black text-slate-900 mb-4">Explore More Free Utility Tools</h2>
             <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Master advanced 2026 workflows. Automate your daily tasks permanently.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedLinks.map((linkData: any, i: number) => (
              <Link key={i} href={`/free-tools/${linkData.slug}`} className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-[0_15px_40px_rgba(37,99,235,0.08)] hover:border-blue-300 transition-all block">
                 <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 border border-blue-100 group-hover:bg-blue-600 transition-colors">
                      <Terminal className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none drop-shadow-sm">Free Tool</span>
                 </div>
                 <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                    {linkData.name}
                 </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DYNAMIC FAQ SECTION (Consistent with Prompts) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 mb-14 text-center">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQs.map((faq, i) => (
              <details key={i} className="group bg-slate-50 border border-slate-200 rounded-2xl open:bg-white open:ring-2 open:ring-blue-100 transition-all duration-200">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-900 text-lg list-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <svg className="w-6 h-6 text-blue-600 group-open:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed font-medium pt-2">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA PITCH (Consistent with Prompts) */}
      <section className="py-24 px-4 bg-slate-900 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900 -z-10"></div>
         <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8">Access 50+ Premium AI Tools</h2>
         <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">Join the exclusive Sikhadenge Masterclass and unlock our entire internal database of AI utility tools completely free.</p>
         <Link href="https://sikhadenge.in/gen-ai-masterclass/register-one-step" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/50 px-12 py-5 rounded-full font-black text-xl shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-transform hover:-translate-y-1">
           Join AI Masterclass <ArrowRight className="ml-3 w-6 h-6" />
         </Link>
      </section>

    </main>
  );
}
