'use client';


import React, {useState, useEffect, useRef, useMemo} from "react";
import PlyrPlayer from "../components/PlyrPlayer";
import {
  Play, ChevronDown, ArrowRight, Clock, Calendar, Users, Star, Quote, User,
  Sparkles, Zap, BookOpen, Layers, Briefcase,
  ListChecks, BarChart3, PenTool, FileText, Presentation, TrendingUp, Lock, Cpu,
  Mail as MailIcon, Lightbulb, FileVideo, Rocket, Table, Globe, X
} from "lucide-react";

// ==================== CONFIG DATA (EASY TO EDIT) ====================
const CONFIG = {
  hero: {
    headline: "Become an AI Expert",
    subheadline:
      "Join 150,000+ learners who are building practical AI skills, working faster, automating repetitive tasks, and future-proofing their careers.",
    duration: "8 WEEKS",
    batchDate: "NEXT BATCH SOON",
    timing: "3 HRS/DAY",
    learnerCount: "5000+",
  },
  contact: {
    phone: "+91 8808505575",
    email: "support@sikhadenge.in",
    instagram: "@sikhadenge.ai",
    whatsapp:
      "https://chat.whatsapp.com/BrWIgvcmOGZBdmfcoPCGHD",
  },
  company: {
    name: "Sikhadenge",
    parent: "ThinkGrow Pvt. Ltd.",
    tagline: "AI-First Digital Capability Program",
  },
}

// Company logos - Text based for better visibility
const companyLogos = [
  { name: "Omkar", src: "/company-logos/company-logo-01.png" },
  { name: "AECOM", src: "/company-logos/company-logo-02.png" },
  { name: "Housing.com", src: "/company-logos/company-logo-03.png" },
  { name: "Just My Films", src: "/company-logos/company-logo-04.png" },
  { name: "Adani", src: "/company-logos/company-logo-05.png" },
  { name: "Godrej", src: "/company-logos/company-logo-06.png" },
  { name: "JLL", src: "/company-logos/company-logo-07.png" },
  { name: "Flipkart", src: "/company-logos/company-logo-08.png" },
  { name: "Dar", src: "/company-logos/company-logo-09.png" },
  { name: "ZEE", src: "/company-logos/company-logo-10.png" },
  { name: "PW", src: "/company-logos/company-logo-11.png" },
  { name: "Pepperfry", src: "/company-logos/company-logo-12.png" },
  { name: "redBus", src: "/company-logos/company-logo-13.png" },
  { name: "Disney+ Hotstar", src: "/company-logos/company-logo-14.png" },
  { name: "DCS", src: "/company-logos/company-logo-15.png" },
  { name: "Apna", src: "/company-logos/company-logo-16.png" },
  { name: "F1 Studioz", src: "/company-logos/company-logo-17.png" },
  { name: "Partner Brand", src: "/company-logos/company-logo-18.png" },
  { name: "Creative Partner", src: "/company-logos/company-logo-19.png" },
  { name: "Hiring Partner", src: "/company-logos/company-logo-20.png" },
]
// Video testimonials - Reel format with video URLs
const videoTestimonials = [
  { name: "Radhika", location: "Mumbai", poster: "/images/testimonials/t1.jpg", videoUrl: "/images/testimonials/t1.mp4" },
  { name: "Vishal", location: "Jharkhand", poster: "/images/testimonials/t2.jpg", videoUrl: "/images/testimonials/t2.mp4" },
  { name: "Avinash", location: "Delhi", poster: "/images/testimonials/t3.jpg", videoUrl: "/images/testimonials/t3.mp4" },
  { name: "Vadika", location: "Bangalore", poster: "/images/testimonials/t4.jpg", videoUrl: "/images/testimonials/t4.mp4" },
  { name: "Priya", location: "Pune", poster: "/images/testimonials/t5.jpg", videoUrl: "/images/testimonials/t5.mp4" },
  { name: "Aman", location: "Noida", poster: "/images/testimonials/t6.jpg", videoUrl: "/images/testimonials/t6.mp4" },
  { name: "Anjali", location: "Indore", poster: "/images/testimonials/t7.jpg", videoUrl: "/images/testimonials/t7.mp4" },
  { name: "Shubham", location: "Lucknow", poster: "/images/testimonials/t8.jpg", videoUrl: "/images/testimonials/t8.mp4" },
  { name: "Neelam", location: "Jaipur", poster: "/images/testimonials/t9.jpg", videoUrl: "/images/testimonials/t9.mp4" },
  { name: "Rohit", location: "Kolkata", poster: "/images/testimonials/t10.jpg", videoUrl: "/images/testimonials/t10.mp4" },
]
// Text reviews
const textReviews = [
  { name: 'Sneha Yadav', role: 'Learner', text: 'Program ka best part ye tha ki learning random tools tak limited nahi thi. Design, video, content aur AI workflows ko ek structured system me samjhaya gaya, jisse real output banana easy ho gaya.' },
  { name: 'Amit Verma', role: 'Alumni', text: 'Sirf theory nahi mili. Har cheez practical thi — content ideas, visuals, short videos, marketing creatives aur execution workflow sab step-by-step clear hua.' },
  { name: 'Pooja Sharma', role: 'Learner', text: 'Pehle alag-alag AI tools dekh kar confusion hota tha. Ab samajh aa gaya ki AI ko real digital work me kaise use karna hai, better structure aur visible output ke saath.' },
  { name: 'Rahul Singh', role: 'Learner', text: 'Assignments aur review system strong tha. Har module me practical work mila, jisse design, video, content aur landing section thinking ek saath improve hui.' },
  { name: 'Neha Gupta', role: 'Learner', text: 'Is program ne mujhe scattered learning se nikal kar structured execution sikhaya. Ab creatives, content flow aur AI-assisted workflow pe zyada confidence hai.' },
  { name: 'Mohit Kumar', role: 'Alumni', text: 'Portfolio-ready output, workflow clarity aur practical execution tino mile. Ab client-style work ko better planning aur faster delivery ke saath handle kar pa raha hu.' }
]

// AI Tools
const aiTools = [
  { name: 'ChatGPT', category: 'Assistant', icon: '🤖' },
  { name: 'Claude', category: 'Writing', icon: '🧠' },
  { name: 'Gemini', category: 'Research', icon: '💎' },
  { name: 'DeepSeek', category: 'Logic', icon: '🔎' },
  { name: 'Perplexity', category: 'Search', icon: '🔍' },
  { name: 'Midjourney', category: 'Image', icon: '🎨' },
  { name: 'Ideogram', category: 'Image', icon: '💡' },
  { name: 'Runway', category: 'Video', icon: '🎬' },
  { name: 'Pika', category: 'Video', icon: '🦩' },
  { name: 'Veo', category: 'Video', icon: '🌊' },
  { name: 'Luma AI', category: 'Video', icon: '🌙' },
  { name: 'ElevenLabs', category: 'Voice', icon: '🔊' },
  { name: 'HeyGen', category: 'Avatar', icon: '🧑‍💻' },
  { name: 'Descript', category: 'Audio', icon: '🎞️' },
  { name: 'Notion AI', category: 'Productivity', icon: '📝' },
  { name: 'Zapier', category: 'Automation', icon: '⚡' },
  { name: 'Make', category: 'Automation', icon: '🔗' },
  { name: 'n8n', category: 'Automation', icon: '🔁' },
  { name: 'Webflow AI', category: 'Website', icon: '🌐' },
  { name: 'Gamma AI', category: 'Presentation', icon: '📊' },
]

// ==================== SECTION 1: NAVBAR ====================
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
      }`}
 >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
              <span className="text-text font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-xl text-[#0F172A]">Sikhadenge</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            <a href="#courses" className="text-[#475569] hover:text-[#2563EB] transition font-medium">Courses</a>
            <a href="#reviews" className="text-[#475569] hover:text-[#2563EB] transition font-medium">Reviews</a>
            <a href="#faq" className="text-[#475569] hover:text-[#2563EB] transition font-medium">FAQ</a>
            <a
              href="/gen-ai-masterclass/register"
              className="bg-[#F5B301] hover:bg-[#d69e01] text-text font-semibold px-6 py-2.5 rounded-full transition-all hover:scale-105"
 >
              Register Free →
            </a>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="menu">
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-[#0F172A] transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-[#0F172A] transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-[#0F172A] transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-[#0F172A]/10">
            <div className="flex flex-col gap-4">
              <a href="#courses" className="text-[#475569] hover:text-[#2563EB]">Courses</a>
              <a href="#reviews" className="text-[#475569] hover:text-[#2563EB]">Reviews</a>
              <a href="#faq" className="text-[#475569] hover:text-[#2563EB]">FAQ</a>
              <a href="/gen-ai-masterclass/register" className="bg-[#F5B301] text-text font-semibold px-6 py-2.5 rounded-full text-center">
                Register Free →
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// ==================== SECTION 2: HERO ====================
const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="pt-3 md:pt-8 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#0B1220] border border-white/10 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_20%,rgba(37,99,235,0.22),transparent_60%),radial-gradient(900px_500px_at_85%_45%,rgba(245,179,1,0.18),transparent_55%)]" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          <div className="relative px-4 py-5 sm:px-6 sm:py-6 md:px-10 md:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 items-center">
              <div className="space-y-3 md:space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-white/85 text-sm font-medium">{CONFIG.company.tagline}</span>
                </div>

                <h1 className="text-[34px] sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white leading-[1.08] tracking-[-0.03em]">
                  {CONFIG.hero.headline}
                </h1>

                <p className="max-w-xl text-[15px] md:text-base text-white/75 leading-7 md:leading-relaxed">
                  {CONFIG.hero.subheadline}
                </p>

                <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                  <div className="flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-2 rounded-full min-w-0">
                    <Clock className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-white font-semibold text-sm truncate">{CONFIG.hero.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-2 rounded-full min-w-0">
                    <Calendar className="w-5 h-5 text-[#F5B301]" />
                    <span className="text-white font-semibold text-sm truncate">{CONFIG.hero.batchDate}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-2 rounded-full min-w-0">
                    <Users className="w-5 h-5 text-emerald-400" />
                    <span className="text-white font-semibold text-sm truncate">{CONFIG.hero.timing}</span>
                  </div>
                </div>

                <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href="/gen-ai-masterclass/register"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#F5B301] hover:bg-[#d69e01] text-black font-bold text-base px-6 py-3.5 rounded-full transition-all hover:scale-[1.02] shadow-lg"
                    style={{ boxShadow: "0 0 18px rgba(245,179,1,0.55)" }}
 >
                    Join Free Masterclass
                    <ArrowRight className="w-5 h-5" />
                  </a>

                </div>
              </div>

              <div
                className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer group bg-[#111827] mt-1"
                onClick={() => setShowVideo(true)}
 >
                <img
                  src="/demo/thumbs/hero-demo.jpg?v=20260326231041"
                  alt="Live Class Demo"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-all flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#F5B301] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-8 h-8 text-black ml-1" fill="black" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-[#0F172A] text-sm font-medium">🎬 Watch Live Class Demo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showVideo && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/80 flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowVideo(false)} className="absolute -top-12 right-0 text-white hover:text-[#F5B301]" aria-label="close">
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              <div className="w-full h-full"><PlyrPlayer src="/demo/ai-expert-program-live.mp4?v=20260405-final-1" poster="/demo/thumbs/hero-demo.jpg?v=20260326231041" /></div></div>
          </div>
        </div>
      )}
    </section>
  )
  };

  // ==================== SECTION 3: LEARNERS + COMPANIES ====================
const LearnersSection = () => {
  const trustStats = [
    { value: "150,000+", label: "Students", desc: "Practical AI learners", icon: "users", tone: "blue" },
    { value: "4.9/5", label: "Rating", desc: "Learner trust score", icon: "star", tone: "violet" },
    { value: "Live", label: "Sessions", desc: "Guided class flow", icon: "video", tone: "cyan" },
    { value: "Structured", label: "Assignments", desc: "Practice-first tasks", icon: "clipboard", tone: "blue" },
  ]

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-5 md:py-7">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(37,99,235,0.08),transparent_24%),radial-gradient(circle_at_90%_12%,rgba(6,182,212,0.08),transparent_24%),linear-gradient(180deg,#F8FAFC_0%,#F1F7FF_100%)]" />

      <div className="relative mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-[26px] border border-[#DDE8F7] bg-white/92 px-4 py-5 shadow-[0_16px_44px_rgba(15,23,42,0.055)] backdrop-blur md:px-7 md:py-6 lg:px-9">
          <div className="mx-auto mb-3 flex max-w-3xl flex-col items-center justify-center gap-2 sm:flex-row">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F2C55C] bg-white px-3 py-1.5 shadow-[0_8px_20px_rgba(245,179,1,0.10)]">
              <div className="flex items-center gap-1 text-[#F5B301]" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                    <path d="M12 2.4l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.46l-5.91 3.1 1.13-6.57-4.77-4.65 6.6-.96L12 2.4z" />
                  </svg>
                ))}
              </div>
              <span className="h-4 w-px bg-[#E5E7EB]" />
              <span className="text-xs font-black text-[#071533]">4.9/5 rating</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#DDE8F7] bg-white px-3 py-1.5 shadow-[0_8px_20px_rgba(37,99,235,0.07)]">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#EEF6FF] text-[#2563EB]" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-[2.4]">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                  <circle cx="9.5" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <span className="text-xs font-bold text-[#334155]">Trusted by learners across India</span>
            </div>
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-[#7C3AED] md:text-[11px]">
              Skill today. Succeed tomorrow.
            </p>

            <h2 className="text-[34px] font-black leading-[0.96] tracking-[-0.06em] text-[#071533] sm:text-5xl md:text-[56px] lg:text-[66px]">
              <span className="bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
                150,000+
              </span>{" "}
              Students
            </h2>

            <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-[#475569] md:text-base md:leading-7">
              are building practical digital skills through live sessions, structured assignments and guided learning.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {trustStats.map((item) => (
              <div key={item.label} className="group relative overflow-hidden rounded-[24px] border border-[#DDE8F7] bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2563EB]/25 hover:shadow-[0_18px_42px_rgba(37,99,235,0.10)] md:p-5">
                <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${
                  item.tone === "violet"
                    ? "bg-gradient-to-r from-[#7C3AED] to-[#2563EB]"
                    : item.tone === "cyan"
                      ? "bg-gradient-to-r from-[#06B6D4] to-[#2563EB]"
                      : "bg-gradient-to-r from-[#2563EB] to-[#06B6D4]"
                }`} />

                <div className="flex items-center gap-3">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl shadow-[0_10px_24px_rgba(15,23,42,0.06)] ${
                    item.tone === "violet"
                      ? "bg-[#F4F0FF] text-[#7C3AED]"
                      : item.tone === "cyan"
                        ? "bg-[#ECFEFF] text-[#0891B2]"
                        : "bg-[#EEF6FF] text-[#2563EB]"
                  }`}>
                    {item.icon === "users" && (
                      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[2.5]">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                        <circle cx="9.5" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}

                    {item.icon === "star" && (
                      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[2.5]">
                        <path d="M12 3.5l2.65 5.37 5.93.86-4.29 4.18 1.01 5.9L12 17.02l-5.3 2.79 1.01-5.9-4.29-4.18 5.93-.86L12 3.5z" />
                      </svg>
                    )}

                    {item.icon === "video" && (
                      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[2.5]">
                        <rect x="3" y="6" width="13" height="12" rx="3" />
                        <path d="M16 10l5-3v10l-5-3z" />
                      </svg>
                    )}

                    {item.icon === "clipboard" && (
                      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[2.5]">
                        <path d="M9 4h6l1 2h3v15H5V6h3l1-2z" />
                        <path d="M9 11h6" />
                        <path d="M9 15h4" />
                      </svg>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[24px] font-black leading-none tracking-[-0.04em] text-[#071533] md:text-[28px]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#64748B] md:text-[11px]">
                      {item.label}
                    </p>
                  </div>
                </div>

                <p className="mt-3 hidden text-xs font-semibold leading-5 text-[#64748B] sm:block">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}



// ==================== SECTION 4: REAL PRACTITIONERS BANNER ====================
const RealPractitionersBanner = () => {
  return (
    <section className="bg-white py-6 md:py-8">
      <div className="mx-auto max-w-[1640px] px-3 sm:px-5 lg:px-8">
        <h2 className="sr-only">
          AI job market shift 2025-26: AI is changing jobs fast and skills move careers ahead
        </h2>

        <div className="hidden overflow-hidden rounded-[28px] border border-[#E6ECF5] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)] md:block">
          <img
            src="/assets/home/ai-jobs-data-banner/ai-jobs-data-banner-desktop.webp"
            alt="2025-26 AI job market shift desktop banner showing AI job cuts, AI skills wage premium and India AI hiring growth"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        <div className="mx-auto block max-w-[560px] overflow-hidden rounded-[28px] border border-[#E6ECF5] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] md:hidden">
          <img
            src="/assets/home/ai-jobs-data-banner/ai-jobs-data-banner-mobile.webp"
            alt="2025-26 AI job market shift mobile banner with compact AI careers data"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}



// ==================== SECTION 5: 3-STEP PROCESS ====================
const ProcessSection = () => {
  return (
    <section className="pt-4 pb-10 md:pt-6 md:pb-14 bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1500px] px-3 sm:px-5 lg:px-8">
        <div className="overflow-hidden rounded-[30px] border border-[#E6ECF5] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <img
            src="/assets/home/process-section/process-section-ai-digital-growth-mobile.png"
            alt="AI Digital Growth Creator Program section mobile view"
            className="block h-auto w-full md:hidden"
            loading="lazy"
          />
          <img
            src="/assets/home/process-section/process-section-ai-digital-growth-desktop.png"
            alt="AI Digital Growth Creator Program section desktop view"
            className="hidden h-auto w-full md:block"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

// ==================== SECTION 6: QUOTE TESTIMONIAL ====================
const QuoteTestimonial = () => {
  const [currentQuote, setCurrentQuote] = useState(0)

  const quotes = [
    {
      text: "Sikhadenge me sirf tools nahi sikhaye gaye. Design, video, content aur AI workflows ko practical way me samjhaya gaya — isliye real output banana easy ho gaya.",
      author: "Rahul Singh",
      role: "AI Digital Growth Learner",
      result: "Built first portfolio project",
      initials: "RS",
      chips: ["Design", "Video", "AI Workflow"],
    },
    {
      text: "Program ka best part ye tha ki har cheez output-based thi. Content ideas se landing sections, short videos aur automation tak sab step-by-step clear hua.",
      author: "Sneha Yadav",
      role: "Creator & Freelancer",
      result: "Started client-ready workflow",
      initials: "SY",
      chips: ["Content", "Landing Page", "Automation"],
    },
    {
      text: "Pehle AI tools dekh raha tha, but clarity nahi thi. Sikhadenge ke baad samajh aaya ki AI ko real digital work me kaise use karna hai.",
      author: "Mohit Kumar",
      role: "Student to Digital Creator",
      result: "Created practical AI assets",
      initials: "MK",
      chips: ["AI Tools", "Portfolio", "Growth"],
    },
  ]

  const active = quotes[currentQuote]

  return (
    <section className="relative overflow-hidden bg-white py-8 md:py-10">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(37,99,235,0.08),transparent_30%),radial-gradient(circle_at_88%_24%,rgba(245,179,1,0.14),transparent_28%)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-4 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[26px] border border-[#DDE8F7] bg-[#F8FAFC] p-5 shadow-[0_14px_38px_rgba(15,23,42,0.05)] md:p-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DBEAFE] bg-white px-3 py-1.5 text-xs font-black text-[#2563EB]">
              <span className="text-[#F5B301]">★</span>
              Learner Story
            </div>

            <h2 className="mt-4 text-xl font-black leading-tight tracking-[-0.04em] text-[#071533] md:text-3xl">
              Real learners.
              <span className="block bg-gradient-to-r from-[#7C3AED] via-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                Real digital output.
              </span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#475569]">
              Students, creators aur freelancers Sikhadenge ke practical AI workflow se apne portfolio, content aur client-ready output build kar rahe hain.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {["4.9/5", "150K+", "Practical"].map((item, i) => (
                <div key={item} className="rounded-2xl border border-[#E2EAF6] bg-white p-3 text-center shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
                  <p className="text-base font-black text-[#071533]">{item}</p>
                  <p className="mt-1 text-[11px] font-bold text-[#64748B]">
                    {i === 0 ? "Rating" : i === 1 ? "Learners" : "Training"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-[#E8D9A8] bg-gradient-to-br from-[#FFFBEB] via-white to-[#F8FBFF] p-5 shadow-[0_18px_48px_rgba(15,23,42,0.07)] md:p-6 lg:p-7">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#F5B301]/15 blur-2xl" />
            <div aria-hidden="true" className="absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-[#2563EB]/10 blur-2xl" />

            <div className="relative flex flex-col gap-5 md:flex-row md:items-start">
              <div className="flex md:block md:w-[135px] md:shrink-0">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-[#7C3AED] via-[#2563EB] to-[#06B6D4] text-xl font-black text-white shadow-[0_18px_45px_rgba(37,99,235,0.28)]">
                  {active.initials}
                </div>

                <div className="ml-4 md:ml-0 md:mt-4">
                  <p className="text-base font-black text-[#071533]">{active.author}</p>
                  <p className="mt-1 text-xs font-bold text-[#64748B]">{active.role}</p>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-black text-[#92400E]">
                    ★★★★★ 4.9/5
                  </span>
                  <span className="rounded-full bg-[#ECFEFF] px-3 py-1 text-xs font-black text-[#0891B2]">
                    {active.result}
                  </span>
                </div>

                <p className="relative text-[18px] font-bold leading-[1.62] tracking-[-0.025em] text-[#071533] md:text-[22px] md:leading-[1.55]">
                  <span className="absolute -left-2 -top-8 text-[54px] font-serif leading-none text-[#F5B301]/35 md:-left-8 md:-top-10 md:text-[72px]">“</span>
                  {active.text}
                  <span className="ml-2 text-[#F5B301]/60">”</span>
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {active.chips.map((chip) => (
                    <span key={chip} className="rounded-full border border-[#DDE8F7] bg-white px-3 py-1.5 text-xs font-black text-[#334155] shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {quotes.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentQuote(i)}
                        aria-label={`Show learner story ${i + 1}`}
                        className={`h-3 rounded-full transition-all duration-300 ${
                          currentQuote === i
                            ? 'w-7 bg-[#2563EB]'
                            : 'w-3 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="hidden rounded-full border border-[#DDE8F7] bg-white px-3 py-1.5 text-xs font-black text-[#2563EB] shadow-[0_8px_20px_rgba(15,23,42,0.04)] sm:block">
                    Trusted by learners across India
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



// ==================== SECTION 7: 4 BENEFIT CARDS ====================
const BenefitsSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-8 md:py-12">
      <div className="mx-auto max-w-[1680px] px-3 sm:px-5 lg:px-8">
        <h2 className="sr-only">
          Complete AI-Driven Growth System Learn Build Grow
        </h2>

        <div className="mx-auto hidden max-w-[1420px] overflow-hidden rounded-[32px] border border-[#DDE8F7] bg-white shadow-[0_22px_70px_rgba(15,23,42,0.07)] md:block">
          <img
            src="/assets/home/ai-growth-system-section/ai-growth-system-desktop.webp"
            alt="Complete AI-Driven Growth System desktop section for AI Digital Growth Creator Program"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        <div className="mx-auto block max-w-[560px] overflow-hidden rounded-[30px] border border-[#DDE8F7] bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)] md:hidden">
          <img
            src="/assets/home/ai-growth-system-section/ai-growth-system-mobile.webp"
            alt="Complete AI-Driven Growth System mobile section for AI Digital Growth Creator Program"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}



// ==================== SECTION 8: FRAMEWORKS GRID ====================
const FrameworksSection = () => {
  const frameworks = [
    {
      title: "AI Tools & Prompt Engineering",
      description:
        "Master ChatGPT, Claude, Gemini and AI research using reusable prompt frameworks.",
      category: "AI Foundation",
      chips: ["Prompt Systems", "AI Research"],
      action: "Master Prompts",
      icon: "spark",
      theme: "blue",
    },
    {
      title: "AI Graphics, Video & Content",
      description:
        "Create brand graphics, reels, scripts, thumbnails and complete content systems.",
      category: "Creator Studio",
      chips: ["Graphics", "Video"],
      action: "Create Assets",
      icon: "video",
      theme: "violet",
    },
    {
      title: "Website & Landing Page Builder",
      description:
        "Build responsive websites, course pages, lead funnels and conversion-focused sections.",
      category: "Web Experience",
      chips: ["Landing Pages", "Web Copy"],
      action: "Launch Pages",
      icon: "website",
      theme: "cyan",
    },
    {
      title: "No-Code Apps & Dashboards",
      description:
        "Create CRM systems, business apps, admin dashboards and practical MVP prototypes.",
      category: "Product Builder",
      chips: ["No-Code Apps", "Dashboards"],
      action: "Build Your MVP",
      icon: "app",
      theme: "indigo",
    },
    {
      title: "Chatbots & Messaging Automation",
      description:
        "Build website bots, WhatsApp lead flows and Instagram messaging automations.",
      category: "Conversation AI",
      chips: ["WhatsApp Bot", "Lead Bot"],
      action: "Deploy Chatbots",
      icon: "chat",
      theme: "purple",
    },
    {
      title: "AI Agents & n8n Automation",
      description:
        "Connect forms, CRM, email, APIs, AI agents and human approval into smart workflows.",
      category: "Agentic Workflow",
      chips: ["AI Agents", "n8n"],
      action: "Automate Work",
      icon: "agent",
      theme: "teal",
    },
    {
      title: "SEO, AEO, GEO & Paid Growth",
      description:
        "Build search visibility, AI answer visibility, funnels, advertising and retargeting.",
      category: "Growth Engine",
      chips: ["SEO · AEO · GEO", "Paid Ads"],
      action: "Grow Visibility",
      icon: "growth",
      theme: "orange",
    },
    {
      title: "Analytics, Projects & Certification",
      description:
        "Track performance, generate reports and prove your skills through practical projects.",
      category: "Performance Lab",
      chips: ["Analytics", "Certification"],
      action: "Measure Results",
      icon: "analytics",
      theme: "sky",
    },
    {
      title: "Portfolio & Career Launch",
      description:
        "Package your projects into a professional portfolio, case study and client presentation.",
      category: "Career System",
      chips: ["Portfolio", "Case Study"],
      action: "Launch Portfolio",
      icon: "portfolio",
      theme: "fuchsia",
    },
  ]

  const themes: Record<
    string,
    {
      surface: string
      icon: string
      number: string
      category: string
      chip: string
      button: string
      glow: string
      line: string
    }
  > = {
    blue: {
      surface: "from-[#EFF6FF] via-white to-[#F8FBFF]",
      icon: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
      number: "border-[#BFDBFE] bg-white text-[#2563EB]",
      category: "bg-[#DBEAFE] text-[#1D4ED8]",
      chip: "border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]",
      button: "from-[#2563EB] to-[#0EA5E9]",
      glow: "bg-[#2563EB]",
      line: "from-[#2563EB] to-[#06B6D4]",
    },
    violet: {
      surface: "from-[#F5F3FF] via-white to-[#FCFAFF]",
      icon: "border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED]",
      number: "border-[#DDD6FE] bg-white text-[#7C3AED]",
      category: "bg-[#EDE9FE] text-[#6D28D9]",
      chip: "border-[#DDD6FE] bg-[#F5F3FF] text-[#6D28D9]",
      button: "from-[#7C3AED] to-[#4F46E5]",
      glow: "bg-[#7C3AED]",
      line: "from-[#7C3AED] to-[#2563EB]",
    },
    cyan: {
      surface: "from-[#ECFEFF] via-white to-[#F7FEFF]",
      icon: "border-[#A5F3FC] bg-[#ECFEFF] text-[#0891B2]",
      number: "border-[#A5F3FC] bg-white text-[#0891B2]",
      category: "bg-[#CFFAFE] text-[#0E7490]",
      chip: "border-[#A5F3FC] bg-[#ECFEFF] text-[#0E7490]",
      button: "from-[#0891B2] to-[#06B6D4]",
      glow: "bg-[#06B6D4]",
      line: "from-[#06B6D4] to-[#2563EB]",
    },
    indigo: {
      surface: "from-[#EEF2FF] via-white to-[#FAFBFF]",
      icon: "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]",
      number: "border-[#C7D2FE] bg-white text-[#4F46E5]",
      category: "bg-[#E0E7FF] text-[#4338CA]",
      chip: "border-[#C7D2FE] bg-[#EEF2FF] text-[#4338CA]",
      button: "from-[#4F46E5] to-[#2563EB]",
      glow: "bg-[#4F46E5]",
      line: "from-[#4F46E5] to-[#2563EB]",
    },
    purple: {
      surface: "from-[#FAF5FF] via-white to-[#FFFBFF]",
      icon: "border-[#E9D5FF] bg-[#FAF5FF] text-[#9333EA]",
      number: "border-[#E9D5FF] bg-white text-[#9333EA]",
      category: "bg-[#F3E8FF] text-[#7E22CE]",
      chip: "border-[#E9D5FF] bg-[#FAF5FF] text-[#7E22CE]",
      button: "from-[#9333EA] to-[#7C3AED]",
      glow: "bg-[#9333EA]",
      line: "from-[#9333EA] to-[#7C3AED]",
    },
    teal: {
      surface: "from-[#F0FDFA] via-white to-[#F8FFFD]",
      icon: "border-[#99F6E4] bg-[#F0FDFA] text-[#0D9488]",
      number: "border-[#99F6E4] bg-white text-[#0D9488]",
      category: "bg-[#CCFBF1] text-[#0F766E]",
      chip: "border-[#99F6E4] bg-[#F0FDFA] text-[#0F766E]",
      button: "from-[#0D9488] to-[#06B6D4]",
      glow: "bg-[#14B8A6]",
      line: "from-[#14B8A6] to-[#06B6D4]",
    },
    orange: {
      surface: "from-[#FFF7ED] via-white to-[#FFFCF8]",
      icon: "border-[#FED7AA] bg-[#FFF7ED] text-[#F97316]",
      number: "border-[#FED7AA] bg-white text-[#F97316]",
      category: "bg-[#FFEDD5] text-[#EA580C]",
      chip: "border-[#FED7AA] bg-[#FFF7ED] text-[#EA580C]",
      button: "from-[#F97316] to-[#F59E0B]",
      glow: "bg-[#F97316]",
      line: "from-[#F97316] to-[#F59E0B]",
    },
    sky: {
      surface: "from-[#F0F9FF] via-white to-[#F9FDFF]",
      icon: "border-[#BAE6FD] bg-[#F0F9FF] text-[#0284C7]",
      number: "border-[#BAE6FD] bg-white text-[#0284C7]",
      category: "bg-[#E0F2FE] text-[#0369A1]",
      chip: "border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1]",
      button: "from-[#0284C7] to-[#2563EB]",
      glow: "bg-[#0284C7]",
      line: "from-[#0284C7] to-[#2563EB]",
    },
    fuchsia: {
      surface: "from-[#FDF4FF] via-white to-[#FFFAFF]",
      icon: "border-[#F5D0FE] bg-[#FDF4FF] text-[#C026D3]",
      number: "border-[#F5D0FE] bg-white text-[#C026D3]",
      category: "bg-[#FAE8FF] text-[#A21CAF]",
      chip: "border-[#F5D0FE] bg-[#FDF4FF] text-[#A21CAF]",
      button: "from-[#C026D3] to-[#7C3AED]",
      glow: "bg-[#C026D3]",
      line: "from-[#C026D3] to-[#7C3AED]",
    },
  }

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-9 md:py-12 lg:py-14">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_8%_8%,rgba(37,99,235,0.11),transparent_25%),radial-gradient(circle_at_92%_15%,rgba(6,182,212,0.11),transparent_25%),radial-gradient(circle_at_52%_100%,rgba(124,58,237,0.08),transparent_32%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(#DDE8F7_1px,transparent_1px),linear-gradient(90deg,#DDE8F7_1px,transparent_1px)] [background-size:46px_46px]"
      />

      <div className="relative mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-[#D7E5FA] bg-white/90 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#2563EB] shadow-[0_12px_28px_rgba(37,99,235,0.08)] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]" />
            Complete Course & Skill Stack
          </div>

          <h2 className="text-[34px] font-black leading-[1.02] tracking-[-0.055em] text-[#071533] sm:text-[40px] md:text-[48px] lg:text-[54px]">
            AI Digital Growth Creator
            <span className="block bg-gradient-to-r from-[#7C3AED] via-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              Practical Skill System
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#475569] md:text-base md:leading-7">
            Build a complete stack across AI creation, websites, automation,
            marketing, analytics and portfolio-ready implementation.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {frameworks.map((item, index) => {
            const theme = themes[item.theme]

            return (
              <article
                key={item.title}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-[#DCE7F6] bg-gradient-to-br ${theme.surface} p-5 shadow-[0_16px_45px_rgba(15,23,42,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-[0_28px_75px_rgba(37,99,235,0.13)] md:p-6`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${theme.glow} opacity-[0.08] blur-3xl transition-opacity duration-300 group-hover:opacity-[0.17]`}
                />

                <div
                  aria-hidden="true"
                  className={`absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r ${theme.line}`}
                />

                <div className="relative mb-5 flex items-start justify-between gap-4">
                  <div
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border shadow-[0_12px_28px_rgba(15,23,42,0.07)] ${theme.icon}`}
                  >
                    {item.icon === "spark" && (
                      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[2.35]">
                        <path d="M12 2l1.7 6.2L20 10l-6.3 1.8L12 18l-1.7-6.2L4 10l6.3-1.8L12 2z" />
                        <path d="M19 16l.8 2.7 2.2.8-2.2.8L19 23l-.8-2.7-2.2-.8 2.2-.8L19 16z" />
                      </svg>
                    )}

                    {item.icon === "video" && (
                      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[2.35]">
                        <rect x="3" y="5" width="13" height="14" rx="3" />
                        <path d="M16 10l5-3v10l-5-3z" />
                        <path d="M7 9h5M7 13h4" />
                      </svg>
                    )}

                    {item.icon === "website" && (
                      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[2.35]">
                        <rect x="3" y="4" width="18" height="16" rx="3" />
                        <path d="M3 9h18M8 14h4M15 14h3" />
                      </svg>
                    )}

                    {item.icon === "app" && (
                      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[2.35]">
                        <rect x="5" y="3" width="14" height="18" rx="3" />
                        <path d="M9 7h6M9 11h2M13 11h2M9 15h2M13 15h2" />
                      </svg>
                    )}

                    {item.icon === "chat" && (
                      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[2.35]">
                        <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.6-4.5A8 8 0 1 1 21 12z" />
                        <path d="M8 12h.01M12 12h.01M16 12h.01" />
                      </svg>
                    )}

                    {item.icon === "agent" && (
                      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[2.35]">
                        <rect x="6" y="8" width="12" height="10" rx="3" />
                        <path d="M12 8V4M9 4h6M9 13h.01M15 13h.01M8 18l-2 3M16 18l2 3" />
                      </svg>
                    )}

                    {item.icon === "growth" && (
                      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[2.35]">
                        <path d="M4 18h16" />
                        <path d="M6 16l4-4 3 3 5-7" />
                        <path d="M17 8h1v1" />
                      </svg>
                    )}

                    {item.icon === "analytics" && (
                      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[2.35]">
                        <path d="M4 19V5" />
                        <path d="M8 17v-6M12 17V8M16 17v-4M20 17V6" />
                        <path d="M3 19h18" />
                      </svg>
                    )}

                    {item.icon === "portfolio" && (
                      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[2.35]">
                        <rect x="3" y="7" width="18" height="13" rx="3" />
                        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                        <path d="M8 13h8" />
                      </svg>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-black shadow-sm ${theme.number}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] ${theme.category}`}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col">
                  <h3 className="text-[20px] font-black leading-[1.18] tracking-[-0.025em] text-[#071533] md:text-[22px]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#52617A] md:text-[15px] md:leading-7">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.chips.map((chip) => (
                      <span
                        key={chip}
                        className={`rounded-full border px-3 py-1.5 text-[11px] font-extrabold ${theme.chip}`}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}



// ==================== SECTION 9: TOOLS USE-CASE CARDS ====================
const ToolsUseCaseSection = () => {
  const useCases = [
    { icon: MailIcon, title: 'Brand Content Kit', desc: 'Social posts, thumbnails, ad creatives and campaign visuals.' },
    { icon: ListChecks, title: 'Short-Form Video Pack', desc: 'Reels, shorts, scripts and edited promotional videos.' },
    { icon: Lightbulb, title: 'Conversion Landing Page', desc: 'A responsive lead-generation or course landing page.' },
    { icon: FileText, title: 'AI Lead Chatbot', desc: 'A website FAQ bot or WhatsApp lead qualification flow.' },
    { icon: FileVideo, title: 'Automated Business Workflow', desc: 'A connected form, CRM, email and follow-up automation.' },
    { icon: Rocket, title: 'Search Visibility Campaign', desc: 'An SEO, AEO and GEO-focused visibility campaign.' },
    { icon: Presentation, title: 'No-Code Business Dashboard', desc: 'A CRM, reporting dashboard or working MVP prototype.' },
    { icon: Table, title: 'Growth Analytics Report', desc: 'Performance insights, reporting and optimization recommendations.' },
    { icon: Globe, title: 'Professional Portfolio Case Study', desc: 'A client-ready project presentation with measurable outcomes.' },
  ]

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-8 overflow-hidden rounded-[30px] border border-[#DCE7F6] bg-white/90 px-5 py-7 shadow-[0_20px_55px_rgba(15,23,42,0.07)] backdrop-blur sm:px-7 md:mb-10 md:px-9 md:py-9 lg:px-10">
          <div
            aria-hidden="true"
            className="absolute -left-16 -top-20 h-48 w-48 rounded-full bg-[#2563EB]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-24 right-0 h-52 w-52 rounded-full bg-[#06B6D4]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.20] [background-image:linear-gradient(#DBEAFE_1px,transparent_1px),linear-gradient(90deg,#DBEAFE_1px,transparent_1px)] [background-size:32px_32px]"
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D7E5FA] bg-white/95 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#2563EB] shadow-[0_8px_22px_rgba(37,99,235,0.08)] sm:text-[11px]">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3 fill-none stroke-current stroke-[2.5]"
                  >
                    <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z" />
                  </svg>
                </span>
                Project Outcomes
              </div>

              <h2 className="text-[34px] font-black leading-[1.03] tracking-[-0.05em] text-[#071533] sm:text-[40px] md:text-[48px] lg:text-[52px]">
                Projects You’ll
                <span className="ml-2 bg-gradient-to-r from-[#7C3AED] via-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                  Finish
                </span>
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#52617A] sm:text-base md:leading-7">
                Complete practical, portfolio-ready projects across content,
                video, websites, automation, growth and analytics.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-[#DCE7F6] bg-white/95 px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#7C3AED] via-[#2563EB] to-[#06B6D4] text-lg font-black text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)]">
                9
              </div>

              <div>
                <p className="text-sm font-black leading-tight text-[#071533]">
                  Practical Builds
                </p>
                <p className="mt-0.5 text-xs text-[#64748B]">
                  Portfolio-ready outcomes
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((u) => (
            <div key={u.title} className="bg-white rounded-xl p-5 border border-[#0F172A]/10 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#F5B301]/10 rounded-lg flex items-center justify-center mb-3">
                <u.icon className="w-6 h-6 text-[#F5B301]" />
              </div>
              <h3 className="text-[#0F172A] font-bold mb-1">{u.title}</h3>
              <p className="text-[#475569] text-sm">{u.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== SECTION 10: TOOLS LOGOS GRID ====================
const ToolsLogosSection = () => (
  <section className="py-16 md:py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 md:mb-12">
        <p className="text-[#2563EB] font-medium uppercase tracking-wider text-sm mb-2">
          TOOLS ECOSYSTEM
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
          25+ AI Tools You Will Master
        </h2>
        <p className="mt-4 max-w-3xl text-base md:text-lg leading-8 text-[#475569]">
          Modern creators combine these tools into practical workflows. You’ll learn how to use them together for design, video, content, automation and digital execution.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {aiTools.map((tool) => (
          <div
            key={tool.name}
            className="flex h-[68px] items-center gap-3 rounded-2xl border border-[#0F172A]/10 bg-[#F8FAFC] px-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all hover:border-[#2563EB]/25 hover:bg-white"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[19px] leading-none shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
              {tool.icon}
            </span>
            <div className="min-w-0">
              <div className="truncate text-[#0F172A] font-semibold text-[16px] md:text-[17px] leading-none">
                {tool.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  );

// ==================== SECTION 11: VIDEO TESTIMONIALS ====================
  const VideoTestimonialsSection = () => {
    const scrollerRef = useRef<HTMLDivElement | null>(null)
    const rafRef = useRef<number | null>(null)

    const draggingRef = useRef(false)
    const movedRef = useRef(false)
    const startXRef = useRef(0)
    const startScrollLeftRef = useRef(0)

    const [paused, setPaused] = useState(false)
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    // duplicate for seamless loop
    const items = useMemo(() => [...videoTestimonials, ...videoTestimonials], [])

    const stopDrag = () => {
      draggingRef.current = false
      // reset "moved" shortly after release (prevents accidental click)
      window.setTimeout(() => (movedRef.current = false), 0)
    }

    const onMouseDown = (e: React.MouseEvent) => {
      const el = scrollerRef.current
      if (!el) return
      draggingRef.current = true
      movedRef.current = false
      startXRef.current = e.pageX
      startScrollLeftRef.current = el.scrollLeft
    }

    const onMouseMove = (e: React.MouseEvent) => {
      const el = scrollerRef.current
      if (!el || !draggingRef.current) return
      e.preventDefault()
      const dx = e.pageX - startXRef.current
      if (Math.abs(dx) > 3) movedRef.current = true
      el.scrollLeft = startScrollLeftRef.current - dx
    }

    const onTouchStart = (e: React.TouchEvent) => {
      const el = scrollerRef.current
      if (!el) return
      draggingRef.current = true
      movedRef.current = false
      startXRef.current = e.touches[0].pageX
      startScrollLeftRef.current = el.scrollLeft
    }

    const onTouchMove = (e: React.TouchEvent) => {
      const el = scrollerRef.current
      if (!el || !draggingRef.current) return
      const dx = e.touches[0].pageX - startXRef.current
      if (Math.abs(dx) > 3) movedRef.current = true
      el.scrollLeft = startScrollLeftRef.current - dx
    }

    const onCardClick = (i: number) => {
      // if user dragged, ignore click
      if (movedRef.current) return
      setOpenIndex(i)
      setPaused(true)
    }

    // autoscroll (seamless because items are duplicated)
    useEffect(() => {
      const el = scrollerRef.current
      if (!el) return

      let last = performance.now()
      const pxPerMs = 0.035 // ~35px/sec

      const tick = (t: number) => {
        const node = scrollerRef.current
        if (!node) return

        const dt = t - last
        last = t

        if (!paused && !draggingRef.current) {
          node.scrollLeft += dt * pxPerMs
          const half = node.scrollWidth / 2
          if (half > 0 && node.scrollLeft >= half) node.scrollLeft = node.scrollLeft - half
        }

        rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    }, [paused])

    return (
      <section className="py-20 bg-[#F8FAFC]" id="reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#F5B301] font-medium uppercase tracking-wider text-sm mb-2">VIDEO TESTIMONIALS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Success Stories From Real Learners</h2>
          </div>

          {/* Horizontal reel slider (shows ~3 on desktop, swipe/drag supported) */}
          <div
            ref={scrollerRef}
            className="relative overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing touch-pan-x"
            style={{ WebkitOverflowScrolling: "touch" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { stopDrag(); if (openIndex === null) setPaused(false) }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={stopDrag}
 >
            <div className="flex gap-4 pr-6">
              {items.map((v, i) => (
                <button
                  key={`${v.name}-${i}`}
                  type="button"
                  onClick={() => onCardClick(i)}
                  className="relative group flex-shrink-0 rounded-2xl overflow-hidden bg-[#0F172A] border border-white/10 shadow-lg
                             w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px]
                             aspect-[9/16]"
                  aria-label={`Play ${v.name} testimonial`}
 >
                  <video className="absolute inset-0 w-full h-full object-cover" src={v.videoUrl} muted playsInline onContextMenu={(e)=>e.preventDefault()} preload="metadata" poster={v.poster} />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-[#F5B301] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-6 h-6 text-text ml-1" fill="black" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <p className="text-text font-semibold text-base">{v.name}</p>
                    <p className="text-text/70 text-sm">{v.location}</p>
                  </div>

                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                    <p className="text-text text-xs font-medium">▶ Reel</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Modal player (same page) */}
          {openIndex !== null && (
            <div
              className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => { setOpenIndex(null); setPaused(false) }}
              role="dialog"
              aria-modal="true"
 >
              <div
                className="relative w-full max-w-[420px] aspect-[9/16] bg-black rounded-2xl overflow-hidden border border-white/10"
                onClick={(e) => e.stopPropagation()}
 >
                <button
                  type="button"
                  className="absolute top-3 right-3 z-10 bg-white/15 hover:bg-white/25 backdrop-blur px-2 py-2 rounded-full"
                  onClick={() => { setOpenIndex(null); setPaused(false) }}
                  aria-label="Close"
 >
                  <X className="w-5 h-5 text-white" />
                </button>

                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={items[openIndex].videoUrl}
                  controls controlsList="nodownload noplaybackrate noremoteplayback" disablePictureInPicture
                  autoPlay
                  playsInline onContextMenu={(e)=>e.preventDefault()}
                  preload="metadata"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }

  // ==================== SECTION 12: TEXT REVIEWS ====================

const TextReviewsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const reviewsPerView = 3
  const totalSlides = Math.ceil(textReviews.length / reviewsPerView)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 4000)
    return () => clearInterval(timer)
  }, [totalSlides])

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#2563EB] font-medium uppercase tracking-wider text-sm mb-2">LEARNER FEEDBACK</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">What Our Learners Say</h2>
        </div>

        <div className="relative">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
 >
            {[...Array(totalSlides)].map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                  {textReviews
                    .slice(slideIndex * reviewsPerView, (slideIndex + 1) * reviewsPerView)
                    .map((r) => (
                      <div key={r.name} className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#0F172A]/10 hover:shadow-lg hover:border-[#2563EB]/20 transition-all">
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-4 h-4 text-[#F5B301] fill-[#F5B301]" />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-[#2563EB]/20 mb-2" />
                        <p className="text-[#475569] mb-4 leading-relaxed">"{r.text}"</p>
                        <div className="flex items-center gap-3 mt-auto">
                          <div className="w-12 h-12 bg-bg from-[#2563EB] to-[#1d4ed8] rounded-full flex items-center justify-center">
                            <span className="text-text font-bold text-lg">{r.name[0]}</span>
                          </div>
                          <div>
                            <p className="text-[#0F172A] font-semibold">{r.name}</p>
                            <p className="text-[#2563EB] text-sm font-medium">{r.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {[...Array(totalSlides)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === i ? 'w-8 bg-[#2563EB]' : 'w-2 bg-[#0F172A]/20 hover:bg-[#0F172A]/40'
                }`}
                aria-label={`slide-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================== SECTION 13: WHO IS THIS FOR ====================
const WhoIsThisForSection = () => {
  const audiences = [
    'Students',
    'Freshers',
    'Freelancers',
    'Digital Operators',
    'Content Creators',
    'Personal Brand Builders',
    'Small Business Support Learners',
    'Serious Beginners',
    'Career Switchers',
  ]

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Who Is This Program For?</h2>
          <p className="text-[#475569] mt-2 max-w-2xl mx-auto">
            This program is designed for serious learners who want practical digital capability, not casual tool exploration.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {audiences.map((a) => (
            <div key={a} className="flex items-center gap-2 bg-white border border-[#0F172A]/10 px-5 py-3 rounded-full hover:border-[#2563EB]/30 hover:shadow-sm transition-all">
              <div className="w-2 h-2 bg-[#2563EB] rotate-45" />
              <span className="text-[#0F172A] font-medium">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ========14: MENTOR SECTION ====================
const MentorSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Meet Your Mentor</h2>
      </div>

      <div className="bg-[#F8FAFC] rounded-3xl p-6 md:p-10 border border-[#0F172A]/10">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          {/* LEFT: PHOTO CARD */}
          <div className="md:col-span-2 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl border border-[#0F172A]/10 bg-white p-4">
              <div className="overflow-hidden rounded-2xl border border-[#0F172A]/10 bg-[#FFF7E6]">
                <img
                  src="/images/Ankit.webp"
                  alt="Ankit Singh"
                  className="aspect-[4/4.2] w-full object-cover object-top"
                />
              </div>

              <div className="mt-4">
                <p className="text-[#0F172A] font-bold text-xl">Ankit Singh</p>
                <p className="text-[#475569] text-sm">Founder & Lead Mentor</p>
                <div className="mt-2 inline-flex items-center rounded-full border border-[#0F172A]/10 bg-[#F8FAFC] px-3 py-1 text-xs text-[#475569]">
                  Sikhadenge Teaching Team
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: AUTHORITY + PROOF */}
          <div className="md:col-span-3">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] leading-tight">
              Hi, I’m Ankit Singh. I’ll be your mentor for this program.
            </h3>

            <div className="mt-4 space-y-3 text-[#475569] leading-relaxed">
              <p>
                This program is built for learners who want to move from
                <span className="font-semibold text-[#0F172A]"> scattered AI learning </span>
                to
                <span className="font-semibold text-[#0F172A]"> structured digital capability</span>.
              </p>
              <p>
                You will learn practical execution across
                <span className="font-semibold text-[#0F172A]"> design, video, content, marketing assets, landing pages and workflows</span>
                — so you can build visible output with better clarity.
              </p>
              <p>
                Focus is on
                <span className="font-semibold text-[#0F172A]"> live guidance, assignments, reviews and real execution thinking</span>
                instead of random tutorials.
              </p>
            </div>

            {/* STATS STRIP */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 bg-white rounded-2xl border border-[#0F172A]/10">
                <p className="text-2xl font-bold text-[#2563EB]">8K+</p>
                <p className="text-[#475569] text-xs">LinkedIn</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#0F172A]/10">
                <p className="text-2xl font-bold text-[#2563EB]">30K+</p>
                <p className="text-[#475569] text-xs">Instagram</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#0F172A]/10">
                <p className="text-2xl font-bold text-[#2563EB]">35000+</p>
                <p className="text-[#475569] text-xs">Students</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#0F172A]/10">
                <p className="text-2xl font-bold text-[#F5B301]">4.8★</p>
                <p className="text-[#475569] text-xs">Rating</p>
              </div>
            </div>

            {/* OPTIONAL CTA */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/gen-ai-masterclass/register"
                className="inline-flex items-center justify-center rounded-full bg-[#F5B301] hover:bg-[#d69e01] text-text font-semibold px-6 py-3 transition-all"
              >
                Register Free →
              </a>

              <a
                href="https://www.instagram.com/sikhadenge.ai/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#0F172A]/10 bg-white hover:shadow-sm text-[#0F172A] font-semibold px-6 py-3 transition-all"
              >
                View Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// ==================== SECTION 15: FAQ ====================
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: 'What is the AI Expert Professional Program?',
      a: 'The AI Expert Professional Program is an 8-week live guided training program by Sikhadenge. It helps learners build practical digital skills across AI design, AI video, AI content, AI marketing assets, AI websites and AI workflows.'
    },
    {
      q: 'Who is this AI program for?',
      a: 'This program is for students, freshers, freelancers, content creators, career switchers and serious beginners who want practical digital capability with AI. It is designed for learners who want structured skill building, not random tool exploration.'
    },
    {
      q: 'Is the AI Expert Professional Program beginner-friendly?',
      a: 'Yes, the program is beginner-friendly. It is structured for learners who are new to AI tools as well as those who have seen tools before but still lack workflow clarity and practical execution skills.'
    },
    {
      q: 'How long is the AI Expert Professional Program?',
      a: 'The program duration is 8 weeks. It is delivered in a guided live format with practical assignments, structured learning and output-based execution.'
    },
    {
      q: 'How many hours per day are classes?',
      a: 'Classes are planned for around 3 hours per day depending on the batch schedule. The exact timing is shared during the admission and onboarding process.'
    },
    {
      q: 'Is this program live or recorded?',
      a: 'The main format of the AI Expert Professional Program is live guided learning. Recording availability depends on the batch policy and internal access rules.'
    },
    {
      q: 'What will I learn in this AI course?',
      a: 'In this program, you will learn AI design, AI video, AI content creation, AI marketing assets, AI websites and AI workflow systems. The focus is on practical execution and real digital output.'
    },
    {
      q: 'Is this only a graphic design course or video editing course?',
      a: 'No, this is not only a graphic design course or a video editing course. It is an AI-first digital capability program that combines multiple skill areas into one structured learning system.'
    },
    {
      q: 'Will I get practical assignments in this program?',
      a: 'Yes, the program includes practical assignments, guided execution and review-based learning. The goal is to help learners build visible output, not just watch theory.'
    },
    {
      q: 'Will I build real projects and portfolio work?',
      a: 'Yes, learners work on practical output such as social media creatives, short-form video assets, content workflows, landing page sections and portfolio-ready projects. Portfolio building is an important part of the learning process.'
    },
    {
      q: 'Do I need prior experience with AI tools?',
      a: 'No, deep prior experience with AI tools is not required. The program is designed to help learners build understanding step by step through live guidance and structured practice.'
    },
    {
      q: 'Do I need a laptop for this program?',
      a: 'Yes, a laptop is strongly recommended for the AI Expert Professional Program. Since the program is practical and workflow-oriented, a laptop helps learners follow classes and complete assignments properly.'
    },
    {
      q: 'Will I receive a certificate after completion?',
      a: 'Yes, a completion certificate can be provided based on participation and the required completion criteria. Certificate eligibility depends on attendance, submission and program guidelines.'
    },
    {
      q: 'Is this program useful for freelancers and content creators?',
      a: 'Yes, this program is highly useful for freelancers and content creators. It helps learners build multi-skill execution capability across design, content, video and digital workflows.'
    },
    {
      q: 'Will this AI program help me build a portfolio?',
      a: 'Yes, one of the core goals of the program is to help learners create practical, presentable and portfolio-ready output. The learning model focuses on visible work and execution quality.'
    },
    {
      q: 'Is EMI or payment flexibility available?',
      a: 'Payment flexibility or EMI availability depends on the active batch and admission options available at that time. The team shares current payment options during the registration process.'
    },
    {
      q: 'Will I get support during the program?',
      a: 'Yes, learners get support through live guidance, practical assignments, review systems and structured learning flow. The program is designed to provide direction and execution clarity.'
    },
    {
      q: 'What makes this program different from YouTube learning?',
      a: 'YouTube usually gives scattered information, while this program gives structure, practical workflow clarity, guided execution and output-focused learning. The difference is in system, support and real implementation.'
    },
    {
      q: 'How can I join the AI Expert Professional Program?',
      a: 'You can join by attending the masterclass or following the registration process shared by Sikhadenge. After that, eligible learners can proceed with admission and onboarding.'
    }
  ]

  return (
    <section className="py-10 md:py-12 bg-[#F8FAFC]" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-12">
          <div className="inline-flex items-center rounded-full border border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-2 text-sm font-medium text-[#2563EB]">
            FAQs
          </div>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A]">
            Frequently asked questions
          </h2>

          <p className="mt-3 max-w-2xl text-base md:text-[17px] leading-7 text-[#475569]">
            Find answers about the AI Expert Professional Program, including duration, live classes, eligibility, assignments, certificate, portfolio building and admission process.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-[24px] border border-[#0F172A]/10 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[#0F172A] text-[17px] md:text-[18px] font-semibold leading-snug">
                    {faq.q}
                  </span>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#0F172A]/10 bg-[#F8FAFC]">
                    <ChevronDown
                      className={`h-5 w-5 text-[#2563EB] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-6 pb-5 md:pb-6 max-w-4xl text-[#475569] text-[15px] leading-7">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ==================== SECTION 16: FINAL CTA ====================
const FinalCTASection = () => (
  <section className="py-20 bg-[#2563EB]" id="register">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
        <span className="text-text font-medium">Limited Seats Available</span>
      </div>

      <h2 className="text-3xl md:text-5xl font-bold text-text mb-4">
        Free Counselling + Roadmap
      </h2>
      <p className="text-text/80 text-lg mb-8">
        WhatsApp पर details भेजो — team आपको batch, fee, timing और roadmap share करेगी.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={CONFIG.contact.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#F5B301] hover:bg-[#d69e01] text-text font-bold text-lg px-8 py-4 rounded-full transition-all"
 >
          Get course details
          <ArrowRight className="w-5 h-5" />
        </a>
        <a
          href="tel:+918808505575"
          className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/20 text-text font-semibold px-8 py-4 rounded-full border border-white/20 transition-all"
 >
          Call Now
        </a>
      </div>

      <p className="text-text/60 text-sm mt-6">
        {CONFIG.company.name} • {CONFIG.company.parent}
      </p>
    </div>
  </section>
)

export default function LandingPage() {
  return (
    <div className="bg-[#F8FAFC]">
        <HeroSection />
      <LearnersSection />
      <RealPractitionersBanner />
      <ProcessSection />
<BenefitsSection />
      <FrameworksSection />
      <ToolsUseCaseSection />
      <ToolsLogosSection />
      <VideoTestimonialsSection />
      <TextReviewsSection />
      <WhoIsThisForSection />
      <MentorSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  )
}
