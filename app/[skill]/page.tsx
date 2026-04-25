import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle, Globe, Zap, Users, Phone, ChevronDown,
  MapPin, Star, Clock, Shield, Trophy, TrendingUp,
  BookOpen, Award, Play, ArrowRight, BadgeCheck, Briefcase,
} from "lucide-react";
import { skillsData } from "../../data/skillsData";
import SkillPopup from "../../components/SkillPopup";

export const dynamicParams = true;
export const revalidate = 86400;

// ── Data ──────────────────────────────────────────────────────────────────────
type SeoEntry = {
  slug: string; title: string; description: string;
  skill?: string; city?: string; industry?: string;
  dynamicValues?: { topicLabel?: string; audience?: string; city?: string };
};
let _cache: SeoEntry[] | null = null;
function getAllEntries(): SeoEntry[] {
  if (_cache) return _cache;
  for (const rel of ["data/generated-seo-merged.json", "data/generated-seo.json"]) {
    try { _cache = JSON.parse(fs.readFileSync(path.join(process.cwd(), rel), "utf8")); return _cache!; } catch {}
  }
  return [];
}
function findEntry(slug: string): SeoEntry | null { return getAllEntries().find((e) => e.slug === slug) ?? null; }
function toTitle(s?: string) { return s ? s.replace(/\b\w/g, (c) => c.toUpperCase()) : ""; }
function entryCity(e: SeoEntry) { return e.dynamicValues?.city ?? e.city ?? "Online"; }
function entrySkill(e: SeoEntry) { return e.dynamicValues?.topicLabel ?? e.skill ?? e.title.split(" ")[0]; }
function entryAudience(e: SeoEntry): string | null { return e.dynamicValues?.audience ?? null; }

function uniqueTitle(e: SeoEntry, si?: { title: string }): string {
  const city = entryCity(e), skill = entrySkill(e) || si?.title || e.title, audience = entryAudience(e);
  const online = !city || city === "Online" || city === "Remote";
  if (!online) return audience ? `${toTitle(skill)} for ${toTitle(audience)} in ${city} | Sikhadenge` : `${toTitle(skill)} Training in ${city} | Sikhadenge`;
  if (audience) return `${toTitle(skill)} for ${toTitle(audience)} — Free Masterclass | Sikhadenge`;
  if (si) return `How to Become a ${si.title} | Sikhadenge`;
  return `${toTitle(skill)} — Free Masterclass | Sikhadenge`;
}
function uniqueDesc(e: SeoEntry, si?: { description: string }): string {
  const city = entryCity(e), skill = entrySkill(e), audience = entryAudience(e);
  const online = !city || city === "Online" || city === "Remote";
  if (!online && audience) return `Join Sikhadenge\'s free ${skill} masterclass for ${audience} in ${city}. Live sessions, real projects, 1,50,000+ community.`;
  if (!online) return `Learn ${skill} with Sikhadenge\'s live masterclass in ${city}. Practical training, expert mentors, 1,50,000+ student community.`;
  if (si?.description) return si.description;
  return e.description || `Master ${skill} with Sikhadenge\'s free live masterclass. Join 1,50,000+ professionals learning practical skills.`;
}

export async function generateStaticParams() {
  const seen = new Set<string>();
  return [...skillsData.map((s) => ({ skill: s.slug })), ...getAllEntries().slice(0, 500).map((e) => ({ skill: e.slug }))]
    .filter(({ skill }) => { if (seen.has(skill)) return false; seen.add(skill); return true; });
}

export function generateMetadata({ params }: { params: { skill: string } }): Metadata {
  const si = skillsData.find((s) => s.slug === params.skill), entry = findEntry(params.skill);
  const fallbackSkill = toTitle(params.skill.replace(/-/g, " "));
  const title = entry ? uniqueTitle(entry, si) : (si ? `How to Become a ${si.title} | Sikhadenge` : `${fallbackSkill} — Free Masterclass | Sikhadenge`);
  const description = entry ? uniqueDesc(entry, si) : (si ? `Learn ${si.title} with live mentor-led training at Sikhadenge. Join 1,50,000+ students.` : `Master ${fallbackSkill} with Sikhadenge's free live masterclass. Join 1,50,000+ professionals learning practical skills.`);
  const url = `https://sikhadenge.in/${params.skill}`;
  return { title, description, alternates: { canonical: url }, openGraph: { type: "article", url, title, description } };
}

const TESTIMONIALS = [
  { name: "Arjun Mehta", city: "Pune", role: "Freelance Designer", income: "₹80K/month", rating: 5, text: "Sikhadenge join karne ke baad meri freelance income 4x ho gayi. Yahan sikhaya real client kaam hai, theory nahi." },
  { name: "Priya Sharma", city: "Delhi", role: "Digital Marketer", income: "₹65K/month", rating: 5, text: "2 months mein mujhe agency mein job mili. Portfolio banaya Sikhadenge ke projects se — interviewer impressed tha." },
  { name: "Rahul Verma", city: "Mumbai", role: "Content Creator", income: "3.2L subscribers", rating: 5, text: "Sunday sessions ne meri soch badal di. Ab main sirf create nahi karta — strategically grow karta hoon." },
  { name: "Sneha Patel", city: "Ahmedabad", role: "Business Owner", income: "₹1.2L/month", rating: 5, text: "Free masterclass se shuru kiya, ab paid batch mein hoon. ROI? Pehle hi client se course ki cost nikal gayi." },
  { name: "Karan Singh", city: "Jaipur", role: "Agency Founder", income: "5 employees", rating: 5, text: "Maine apni agency open ki Sikhadenge ki training ke 6 months baad. Best investment of my career." },
  { name: "Ananya Gupta", city: "Hyderabad", role: "AI Consultant", income: "₹1.5L/month", rating: 5, text: "No coding background. Phir bhi AI consulting start ki. Sikhadenge ne practical path dikhaya." },
];

const COMPANIES = ["Google", "Meta", "Razorpay", "Flipkart", "Zomato", "Meesho", "PhonePe", "Swiggy"];

const MODULES = [
  { no: "01", title: "Foundations & Mindset", sessions: "2 Sessions", topics: ["Industry overview & career paths", "Tools setup & workflow", "Real project breakdown", "Client communication basics"] },
  { no: "02", title: "Core Skills & Execution", sessions: "4 Sessions", topics: ["Hands-on practical workflow", "Live client simulation", "Common mistakes & fixes", "Portfolio-worthy project"] },
  { no: "03", title: "Advanced Techniques", sessions: "3 Sessions", topics: ["AI-powered workflows", "Speed & quality optimization", "Agency-level delivery", "Pricing your services"] },
  { no: "04", title: "Business & Growth", sessions: "3 Sessions", topics: ["Finding & closing clients", "Building recurring income", "Personal branding strategy", "Scaling to ₹1L/month"] },
];

export default function SkillPage({ params }: { params: { skill: string } }) {
  const si = skillsData.find((s) => s.slug === params.skill);
  const entry = findEntry(params.skill);
  const fallbackSkill = toTitle(params.skill.replace(/-/g, " "));

  const city     = entry ? entryCity(entry) : "Online";
  const skill    = entry ? (entrySkill(entry) || si?.title || fallbackSkill) : (si?.title || fallbackSkill);
  const audience = entry ? entryAudience(entry) : null;
  const isOnline = !city || city === "Online" || city === "Remote";
  const pageTitle = entry ? uniqueTitle(entry, si) : (si ? `How to Become a ${si.title}` : `${fallbackSkill} — Free Masterclass`);
  const pageDesc  = entry ? uniqueDesc(entry, si) : (si ? si.description : `Master ${fallbackSkill} with Sikhadenge's free live masterclass. Join 1,50,000+ professionals.`);
  const pageUrl   = `https://sikhadenge.in/${params.skill}`;
  const registerLink = "/gen-ai-masterclass/register-one-step";
  const waLink = `https://wa.me/918808505575?text=Hi, I want to join the free ${skill} Masterclass on Sikhadenge.`;
  const coreSkills = si?.skills ?? [`${skill} Fundamentals`, "Live Practice Sessions", "Real-World Projects", "Expert Mentorship"];

  const courseSchema = { "@context": "https://schema.org", "@type": "Course", name: pageTitle, description: pageDesc, url: pageUrl, provider: { "@type": "EducationalOrganization", name: "Sikhadenge", url: "https://sikhadenge.in" }, educationalCredentialAwarded: "Certificate of Completion", inLanguage: ["en", "hi"], isAccessibleForFree: false, offers: { "@type": "Offer", price: "0", priceCurrency: "INR", description: "Free demo masterclass — full paid batch available" }, hasCourseInstance: { "@type": "CourseInstance", courseMode: isOnline ? "Online" : "Blended", ...(isOnline ? {} : { location: { "@type": "City", name: city } }), instructor: { "@type": "Person", name: "Sikhadenge Expert", worksFor: { "@type": "Organization", name: "Sikhadenge" } } } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [ { "@type": "Question", name: `Is the ${skill} masterclass really free?`, acceptedAnswer: { "@type": "Answer", text: `Yes — the demo masterclass and WhatsApp community entry are completely free. After attending, you can optionally join the full paid ${skill} batch starting from ₹12,000.` } }, { "@type": "Question", name: `Who should join this ${skill} program?`, acceptedAnswer: { "@type": "Answer", text: audience ? `Designed for ${audience} wanting practical ${skill} skills.` : "Professionals, freelancers, students, and business owners wanting real skills." } }, { "@type": "Question", name: "How is Sikhadenge different from Udemy or YouTube?", acceptedAnswer: { "@type": "Answer", text: "Live interactive sessions with real client projects. Not pre-recorded theory." } }, { "@type": "Question", name: "Will I get a certificate?", acceptedAnswer: { "@type": "Answer", text: "Yes — Sikhadenge Certificate of Completion, shareable on LinkedIn." } } ] };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: "https://sikhadenge.in" }, { "@type": "ListItem", position: 2, name: toTitle(skill), item: pageUrl } ] };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SkillPopup skill={skill} waLink={waLink} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0B1220] pt-20 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto pt-4 pb-6">
          <p className="text-slate-400 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-slate-600">/</span>
            <span className="text-slate-300">{toTitle(skill)}</span>
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-10 pb-0 items-start">
          {/* LEFT */}
          <div className="pb-16">
            {/* Badge */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {isOnline ? "Online Program" : `${city} Batch`}
              </span>
              <span className="bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Free Entry
              </span>
              {audience && (
                <span className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  For {toTitle(audience)}
                </span>
              )}
            </div>

            {/* H1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] mb-5">
              {isOnline
                ? <>Master <span className="text-blue-400">{toTitle(skill)}</span> and Build a Career That Pays</>
                : <>Learn <span className="text-blue-400">{toTitle(skill)}</span> in {city} — Live, Practical, Free</>}
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">{pageDesc}</p>

            {/* Key highlights */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {[
                { icon: Play,      text: "Live online class on Zoom — not pre-recorded" },
                { icon: Users,     text: isOnline ? "1,50,000+ student community" : `${city} batch + online community` },
                { icon: Briefcase, text: "Real client projects in every session" },
                { icon: Award,     text: "Sikhadenge Certificate on completion" },
                { icon: Clock,     text: "2 hours per session — weekends only" },
                { icon: BadgeCheck,text: "Industry experts as mentors" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <span className="text-slate-300 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Rating row */}
            <div className="flex flex-wrap items-center gap-5 mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                <span className="text-white font-bold">4.9</span>
                <span className="text-slate-400 text-sm">(12,400+ ratings)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Users className="w-4 h-4 text-blue-400" />
                <span><span className="text-white font-bold">1,50,000+</span> students enrolled</span>
              </div>
              {!isOnline && (
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Available in <span className="text-white font-bold">{city}</span></span>
                </div>
              )}
            </div>

            {/* Mobile CTA */}
            <div className="flex flex-col sm:flex-row gap-3 lg:hidden">
              <Link
                href={registerLink}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-xl text-lg transition-all"
              >
                Join Free Demo <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={waLink}
                className="flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-bold px-6 py-4 rounded-xl text-base transition-all"
              >
                <Phone className="w-4 h-4" /> WhatsApp
              </Link>
            </div>
          </div>

          {/* RIGHT — sticky enrollment card */}
          <div className="hidden lg:block sticky top-24 self-start">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Card top */}
              <div className="bg-[#0B1220] p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-slate-300">Next session: This Sunday</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black text-green-400">Free Demo Class</span>
                </div>
                <p className="text-slate-400 text-sm">Full Course starts from <span className="text-white font-bold">₹12,000</span></p>
              </div>

              {/* Card body */}
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {[
                    { icon: Clock,    label: "Duration",   val: "12 Weeks Program" },
                    { icon: Globe,    label: "Mode",       val: isOnline ? "Live on Zoom (Online)" : `Live in ${city}` },
                    { icon: Users,    label: "Community",  val: "1,50,000+ Members" },
                    { icon: Award,    label: "Certificate",val: "Yes, Shareable on LinkedIn" },
                    { icon: Shield,   label: "Demo Class",  val: "₹0 — Free Entry" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">{item.label}</p>
                        <p className="text-slate-800 font-semibold text-sm">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href={registerLink}
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl text-lg transition-all mb-3"
                >
                  Join Free Demo <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href={waLink}
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-bold py-3 rounded-xl text-sm transition-all"
                >
                  <Phone className="w-4 h-4" /> Chat on WhatsApp
                </Link>

                <p className="text-center text-slate-400 text-xs mt-4">
                  🔒 No payment. No spam. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPANIES BAR ─────────────────────────────────────────────────── */}
      <section className="bg-[#0f1a2e] border-t border-white/5 py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-500 text-xs font-semibold uppercase tracking-widest mb-4">Our students are hired at</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {COMPANIES.map((c, i) => (
              <span key={i} className="text-slate-400 font-bold text-sm tracking-wide">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAM STATS ─────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "1,50,000+", label: "Students Trained", sub: "Across India" },
            { val: "4.9 / 5",   label: "Program Rating",  sub: "12,400+ reviews" },
            { val: "200+",      label: "Sessions Done",    sub: "Live & recorded" },
            { val: "98%",       label: "Satisfaction",     sub: "Would recommend" },
          ].map((s, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900">{s.val}</div>
              <div className="text-sm font-bold text-slate-700">{s.label}</div>
              <div className="text-xs text-slate-400">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CURRICULUM ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50" id="curriculum">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Curriculum</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
              What you'll master in <span className="text-blue-600">{toTitle(skill)}</span>
            </h2>
            <p className="text-slate-500">12-week structured program. Every session has a deliverable.</p>
          </div>

          <div className="space-y-3">
            {MODULES.map((mod, i) => (
              <details key={i} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <summary className="flex items-center gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                  <span className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0">{mod.no}</span>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">{mod.title}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{mod.sessions}</p>
                  </div>
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5 border-t border-slate-100">
                  <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                    {mod.topics.map((topic, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>

          {/* Core skills from skillsData */}
          {si?.skills && (
            <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="font-bold text-slate-900 mb-4">Skills you'll gain:</p>
              <div className="flex flex-wrap gap-2">
                {coreSkills.map((s, i) => (
                  <span key={i} className="bg-white border border-blue-200 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── MENTOR SECTION ────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Your Mentor</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Learn from practitioners, not professors</h2>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-[#0B1220] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-400 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-4xl font-black">S</span>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-black text-white mb-1">Sikhadenge Expert Team</h3>
              <p className="text-blue-300 font-semibold mb-4">{toTitle(skill)} Specialist · 8+ Years Industry Experience</p>
              <p className="text-slate-300 leading-relaxed mb-5">Our mentors have worked with 500+ clients across India, UAE, and the US. They don't teach theory — they share the exact workflows they use in real projects, every week.</p>
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                {[{ val: "500+", label: "Clients Served" }, { val: "8+ Yrs", label: "Industry Exp." }, { val: "1,50,000+", label: "Students" }].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="text-white font-black text-xl">{s.val}</p>
                    <p className="text-slate-400 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATE ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-10 items-center">
          {/* Certificate visual */}
          <div className="flex-shrink-0 w-full sm:w-80">
            <div className="bg-white border-4 border-blue-100 rounded-3xl p-8 shadow-xl text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-blue-400" />
              <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Certificate of Completion</p>
              <h3 className="text-xl font-black text-slate-900 mb-1">Sikhadenge</h3>
              <p className="text-slate-500 text-sm mb-4">{toTitle(skill)} Masterclass</p>
              <div className="w-24 h-0.5 bg-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 text-xs">Awarded to learners who complete all modules and final project</p>
            </div>
          </div>

          <div>
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Industry Certificate</span>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Get certified. Get hired. Get paid more.</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Complete the {toTitle(skill)} program and earn a Sikhadenge Certificate of Completion — recognized by agencies, clients, and hiring managers across India.
            </p>
            <ul className="space-y-3">
              {[
                "Share on LinkedIn with one click",
                "Add to your portfolio & resume",
                "Recognized by 500+ partner companies",
                "Proves practical skill — not just theory",
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-yellow-50 text-yellow-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Success Stories</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
              1,50,000+ students. Real results.
            </h2>
            <p className="text-slate-500">From freelancers to agency owners — here's what our community achieved.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-slate-700 leading-relaxed mb-4 text-sm">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                      <p className="text-slate-400 text-xs">{t.role} · {t.city}</p>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">
                    {t.income}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Why Sikhadenge</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Why 1,50,000+ chose us over others</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 text-left text-sm font-bold">Feature</th>
                  <th className="p-4 text-center text-sm font-bold bg-blue-600">Sikhadenge ✨</th>
                  <th className="p-4 text-center text-sm font-bold">YouTube</th>
                  <th className="p-4 text-center text-sm font-bold">Udemy / Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {[
                  ["Live interactive sessions", "✅", "❌", "❌"],
                  ["Real client projects", "✅", "❌", "❌"],
                  ["Mentor feedback", "✅", "❌", "❌"],
                  ["Community support", "✅", "Limited", "Limited"],
                  ["Certificate", "✅", "❌", "✅"],
                  ["Demo Class", "FREE", "Free", "Paid"],
                ].map(([feature, sd, yt, ud], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-4 font-medium text-slate-700">{feature}</td>
                    <td className="p-4 text-center font-bold text-blue-600 bg-blue-50/50">{sd}</td>
                    <td className="p-4 text-center text-slate-500">{yt}</td>
                    <td className="p-4 text-center text-slate-500">{ud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B1220] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.2),_transparent_70%)] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F5B301]/10 border border-[#F5B301]/20 text-[#F5B301] px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            <span className="w-2 h-2 bg-[#F5B301] rounded-full animate-pulse" />
            Batch filling up — next session this Sunday
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Your career won't change<br />until <span className="text-blue-400">you do.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-4 max-w-xl mx-auto">
            Join 1,50,000+ professionals who chose practical learning over passive watching. Free demo this Sunday on Zoom.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link
              href={registerLink}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black px-10 py-5 rounded-xl text-lg transition-all hover:-translate-y-0.5"
            >
              Enroll Free Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={waLink}
              className="inline-flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-bold px-8 py-5 rounded-xl text-lg transition-all"
            >
              <Phone className="w-5 h-5" /> WhatsApp Us
            </Link>
          </div>
          <p className="text-slate-600 text-sm">No credit card · No spam · Cancel anytime</p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">FAQ</span>
            <h2 className="text-3xl font-black text-slate-900">Common questions answered</h2>
          </div>
          <div className="space-y-2">
            {[
              { q: `Is the ${skill} masterclass really free?`, a: `Yes — the demo masterclass and community entry are 100% free. After attending, if you want to join the full paid batch with assignments, projects, and mentorship, course fees apply (starting ₹12,000). No hidden charges in the free session.` },
              { q: `I'm a complete beginner. Can I join?`, a: `Absolutely. Our program starts from zero. ${audience ? `Especially designed for ${audience}.` : "No prior experience needed."} You'll learn step-by-step with real examples.` },
              { q: "How is this different from YouTube or Udemy?", a: "YouTube is free but unstructured. Udemy has pre-recorded courses. We give you live mentors, real client projects, and a community that pushes you to execute. The demo is free — and you'll see the difference immediately. That's why 1,50,000+ chose us." },
              { q: "When do sessions happen?", a: "Every Sunday, live on Zoom. 2 hours of interactive learning starting at 11 AM. The Zoom link is sent on WhatsApp. Recordings are shared if you miss a session." },
              { q: "Will I get a certificate?", a: `Yes — complete the ${skill} program and receive a Sikhadenge Certificate of Completion that you can share on LinkedIn and add to your resume.` },
              { q: "Can I get a job or freelance clients after this?", a: "Many of our students have. We focus on portfolio-worthy projects and real workflows — the exact things employers and clients look for." },
            ].map((faq, i) => (
              <details key={i} className="group border border-slate-200 rounded-xl bg-white overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-900 list-none [&::-webkit-details-marker]:hidden select-none gap-4">
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE BOTTOM BAR ──────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        <div className="bg-white border-t border-slate-200 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
          <div className="flex gap-3">
            <Link
              href={registerLink}
              className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 text-white font-black py-3.5 rounded-xl text-sm"
            >
              Join Free Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={waLink}
              className="w-14 flex items-center justify-center bg-[#25D366] text-white rounded-xl"
            >
              <Phone className="w-5 h-5 fill-white" />
            </Link>
          </div>
          <p className="text-center text-slate-400 text-xs mt-1.5">1,50,000+ students · Free · This Sunday</p>
        </div>
      </div>
      <div className="h-24 sm:hidden" />
    </main>
  );
}
