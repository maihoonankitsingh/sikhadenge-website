import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Star, CheckCircle, Globe, Zap, Users, Phone } from "lucide-react";
import generatedPages from "../../../data/generated-seo.json";

export async function generateStaticParams() {
  return generatedPages.map((page) => ({
    slug: page.slug,
  }));
}

export default function ExpertPage({ params }: { params: { slug: string } }) {
  const pageData = generatedPages.find((p) => p.slug === params.slug);

  if (!pageData) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Premium Hero Section */}
      <section className="pt-32 pb-20 bg-white border-b border-slate-100 italic">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8 tracking-wide uppercase border border-blue-100 shadow-sm">
            <Zap className="h-4 w-4 fill-blue-600" />
            Verified Experts in {pageData.city}
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-slate-900">
            Find the best <span className="text-blue-600">{pageData.skill}</span> experts <br />
            in <span className="underline decoration-blue-200">{pageData.city}</span> for <span className="text-blue-600">{pageData.industry}</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            Directly hire {pageData.skill} specialists for your {pageData.industry} projects. 
            No middleman, zero commission, 100% verified talent available in {pageData.city}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link 
                href={`https://wa.me/916388424652?text=Hi, I am looking for ${pageData.skill} expert in ${pageData.city} for ${pageData.industry} industry.`}
                className="group flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl font-black transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-lg"
             >
               <Phone className="h-6 w-6 fill-white" />
               HIRE ON WHATSAPP
               <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-12 bg-white flex justify-center border-b border-slate-50">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl w-full px-4 text-center">
            <div><div className="text-3xl font-black text-slate-900 mb-1">4.9/5</div><div className="text-slate-500 font-bold text-xs uppercase tracking-widest">Rating</div></div>
            <div><div className="text-3xl font-black text-slate-900 mb-1">100%</div><div className="text-slate-500 font-bold text-xs uppercase tracking-widest">Verified</div></div>
            <div><div className="text-3xl font-black text-slate-900 mb-1">No Fee</div><div className="text-slate-500 font-bold text-xs uppercase tracking-widest">Commission</div></div>
            <div><div className="text-3xl font-black text-slate-900 mb-1">Direct</div><div className="text-slate-500 font-bold text-xs uppercase tracking-widest">Communication</div></div>
         </div>
      </section>

      {/* Details Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
         <div className="md:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
               <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                 <CheckCircle className="text-blue-600 h-8 w-8" />
                 About the Service
               </h2>
               <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
                 Our {pageData.skill} network in {pageData.city} is specifically curated for businesses in {pageData.industry}. 
                 Whether you need a full-time professional or a project-based consultant, we connect you with the right person in minutes.
               </p>
               <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    `Specialized in ${pageData.industry}`,
                    `Local support in ${pageData.city}`,
                    "Direct Negotiation",
                    "Verified Portfolio Check"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-50">
                       <Star className="h-5 w-5 text-blue-600 fill-blue-600" />
                       <span className="font-bold text-slate-800 tracking-tight">{item}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
         
         {/* Sidebar / CTA */}
         <div className="space-y-6">
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Globe className="h-20 w-20" /></div>
               <h3 className="text-2xl font-black mb-4 relative">Need {pageData.skill} Help?</h3>
               <p className="text-slate-400 mb-8 font-medium">Get a call from our verified experts within 24 hours.</p>
               <Link 
                 href="https://wa.me/916388424652"
                 className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl transition-all shadow-lg active:scale-95"
               >
                 REQUEST A CALL
               </Link>
            </div>
         </div>
      </section>
    </main>
  );
}
