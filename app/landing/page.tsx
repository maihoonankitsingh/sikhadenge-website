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
    headline: "Become an AI Expert with Practical AI Skills",
    subheadline:
      "Join 150,000+ students who are building practical AI skills, working faster, automating repetitive tasks, and future-proofing their careers.",
    duration: "8 WEEKS",
    batchDate: "NEXT BATCH SOON",
    timing: "3 HRS/DAY",
    learnerCount: "150,000+",
  },
  contact: {
    phone: "+91 8808505575",
    email: "support@sikhadenge.in",
    instagram: "@sikhadenge.ai",
    whatsapp:
      "https://wa.me/918808505575",
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
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
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
    {
      value: "150,000+",
      label: "Students",
      note: "Practical AI students",
      icon: Users,
      iconWrap: "bg-[#EAF2FF]",
      iconColor: "text-[#2563EB]",
      bar: "bg-gradient-to-r from-[#2563EB] to-[#06B6D4]",
    },
    {
      value: "4.9/5",
      label: "Rating",
      note: "Learner trust score",
      icon: Star,
      iconWrap: "bg-[#F3EDFF]",
      iconColor: "text-[#7C3AED]",
      bar: "bg-gradient-to-r from-[#7C3AED] to-[#4F46E5]",
    },
    {
      value: "Live",
      label: "Sessions",
      note: "Guided class flow",
      icon: FileVideo,
      iconWrap: "bg-[#E8FBFD]",
      iconColor: "text-[#0891B2]",
      bar: "bg-gradient-to-r from-[#06B6D4] to-[#2563EB]",
    },
    {
      value: "Structured",
      label: "Assignments",
      note: "Practice-first tasks",
      icon: ListChecks,
      iconWrap: "bg-[#EDF5FF]",
      iconColor: "text-[#2563EB]",
      bar: "bg-gradient-to-r from-[#2563EB] to-[#06B6D4]",
    },
  ]

  return (
    <section className="bg-white py-3 md:py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-[#D8E5F6] bg-[linear-gradient(135deg,#F9FBFF_0%,#F3F7FF_52%,#EDF9FF_100%)] p-4 shadow-[0_16px_45px_rgba(15,23,42,0.07)] md:p-5">

          <div
            aria-hidden="true"
            className="absolute -left-16 -top-20 h-52 w-52 rounded-full bg-[#2563EB]/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-16 h-56 w-56 rounded-full bg-[#06B6D4]/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/35 to-transparent"
          />

          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 flex-1 items-start gap-4 md:items-center md:gap-5">

              <div className="relative shrink-0">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-2 -bottom-2 h-6 rounded-full bg-[#1D4ED8]/25 blur-lg"
                />

                <div className="relative grid h-[78px] w-[78px] place-items-center overflow-hidden rounded-[24px] border border-white/80 bg-[linear-gradient(145deg,#8FC7FF_0%,#3B82F6_38%,#1E40AF_100%)] shadow-[inset_0_2px_0_rgba(255,255,255,0.72),inset_0_-10px_18px_rgba(15,42,120,0.30),0_14px_28px_rgba(37,99,235,0.32)] md:h-[86px] md:w-[86px] md:rounded-[26px]">
                  <div
                    aria-hidden="true"
                    className="absolute left-2 right-2 top-2 h-7 rounded-full bg-white/25 blur-sm"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-5 -right-4 h-14 w-14 rounded-full bg-[#172554]/35 blur-lg"
                  />

                  <Users
                    className="relative z-10 h-9 w-9 text-white drop-shadow-[0_4px_4px_rgba(15,23,42,0.35)] md:h-10 md:w-10"
                    strokeWidth={2.4}
                  />
                </div>

                <div className="absolute -bottom-1.5 -right-2 grid h-9 min-w-9 place-items-center rounded-[13px] border-2 border-white bg-[linear-gradient(145deg,#FFB020,#F97316)] px-2 text-[11px] font-black text-white shadow-[0_8px_16px_rgba(249,115,22,0.35)]">
                  01
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center rounded-full border border-[#BFDBFE] bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#1D4ED8] shadow-[0_5px_14px_rgba(37,99,235,0.08)] md:text-[11px]">
                    Learner Trust
                  </div>

                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.13em] text-[#047857] shadow-[0_5px_14px_rgba(5,150,105,0.07)] md:text-[11px]">
                    <Lock className="h-3.5 w-3.5" strokeWidth={2.4} />
                    Guided Learning
                  </div>
                </div>

                <h2 className="mt-2.5 text-[27px] font-black leading-[1.02] tracking-[-0.045em] text-[#071533] sm:text-[32px] md:text-[38px]">
                  <span className="bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
                    150,000+
                  </span>{" "}
                  Students
                </h2>

                <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#52637A] md:text-[15px]">
                  Building practical digital skills through live sessions,
                  structured assignments and guided execution.
                </p>
              </div>
            </div>

            <div className="w-full rounded-[20px] border border-white/90 bg-white/80 px-4 py-3 shadow-[0_12px_28px_rgba(15,23,42,0.07)] backdrop-blur-sm sm:w-auto sm:min-w-[190px]">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#94A3B8]">
                Learning Model
              </p>

              <div className="mt-1.5 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-35" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>

                <span className="text-sm font-black text-[#1D4ED8]">
                  Live &amp; guided
                </span>
              </div>
            </div>
          </div>

          <div className="relative mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {trustStats.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.label}
                  className="group relative overflow-hidden rounded-[20px] border border-[#DCE7F5] bg-white/95 p-3 shadow-[0_8px_20px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-0.5 hover:border-[#2563EB]/25 hover:shadow-[0_14px_28px_rgba(37,99,235,0.09)] md:p-3.5"
                >
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-[3px] ${item.bar}`}
                  />

                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-[14px] ${item.iconWrap} shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_6px_14px_rgba(15,23,42,0.05)]`}
                    >
                      <Icon
                        className={`h-5 w-5 ${item.iconColor}`}
                        strokeWidth={2.4}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[20px] font-black leading-none tracking-[-0.035em] text-[#071533] md:text-[22px]">
                        {item.value}
                      </p>
                      <p className="mt-1 truncate text-[9px] font-black uppercase tracking-[0.13em] text-[#64748B] md:text-[10px]">
                        {item.label}
                      </p>
                    </div>
                  </div>

                  <p className="mt-2 hidden truncate text-[11px] font-semibold text-[#718096] sm:block">
                    {item.note}
                  </p>
                </div>
              )
            })}
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              {["4.9/5", "150,000+", "Practical"].map((item, i) => (
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
  const skillSystems = [
    {
      number: "01",
      category: "AI Foundation",
      title: "AI Tools & Prompt Engineering",
      description:
        "Master ChatGPT, Claude, Gemini and AI research through reusable prompt systems.",
      tags: ["Prompt Systems", "AI Research"],
      icon: Sparkles,
      accent: "#2563EB",
      gradient:
        "linear-gradient(145deg, #60A5FA 0%, #2563EB 50%, #1D4ED8 100%)",
      surface:
        "linear-gradient(145deg, rgba(239,246,255,0.96), rgba(255,255,255,0.99))",
      glow: "rgba(37,99,235,0.24)",
    },
    {
      number: "02",
      category: "Creator Studio",
      title: "AI Graphics, Video & Content",
      description:
        "Create brand graphics, reels, scripts, thumbnails and complete content systems.",
      tags: ["Graphics", "Video"],
      icon: FileVideo,
      accent: "#7C3AED",
      gradient:
        "linear-gradient(145deg, #C4B5FD 0%, #8B5CF6 50%, #6D28D9 100%)",
      surface:
        "linear-gradient(145deg, rgba(245,243,255,0.96), rgba(255,255,255,0.99))",
      glow: "rgba(124,58,237,0.24)",
    },
    {
      number: "03",
      category: "Web Experience",
      title: "Website & Landing Page Builder",
      description:
        "Build responsive websites, course pages, lead funnels and conversion-focused sections.",
      tags: ["Landing Pages", "Web Copy"],
      icon: Globe,
      accent: "#0891B2",
      gradient:
        "linear-gradient(145deg, #67E8F9 0%, #06B6D4 48%, #0891B2 100%)",
      surface:
        "linear-gradient(145deg, rgba(236,254,255,0.96), rgba(255,255,255,0.99))",
      glow: "rgba(8,145,178,0.24)",
    },
    {
      number: "04",
      category: "Product Builder",
      title: "No-Code Apps & Dashboards",
      description:
        "Create CRM systems, business apps, admin dashboards and practical MVP prototypes.",
      tags: ["No-Code Apps", "Dashboards"],
      icon: Table,
      accent: "#4F46E5",
      gradient:
        "linear-gradient(145deg, #A5B4FC 0%, #6366F1 48%, #4338CA 100%)",
      surface:
        "linear-gradient(145deg, rgba(238,242,255,0.96), rgba(255,255,255,0.99))",
      glow: "rgba(79,70,229,0.24)",
    },
    {
      number: "05",
      category: "Conversation AI",
      title: "Chatbots & Messaging Automation",
      description:
        "Build website bots, WhatsApp lead flows and Instagram messaging automations.",
      tags: ["WhatsApp Bot", "Lead Bot"],
      icon: MailIcon,
      accent: "#9333EA",
      gradient:
        "linear-gradient(145deg, #E879F9 0%, #A855F7 48%, #7E22CE 100%)",
      surface:
        "linear-gradient(145deg, rgba(250,245,255,0.96), rgba(255,255,255,0.99))",
      glow: "rgba(147,51,234,0.24)",
    },
    {
      number: "06",
      category: "Agentic Workflow",
      title: "AI Agents & n8n Automation",
      description:
        "Connect forms, CRM, email, APIs, AI agents and human approval into smart workflows.",
      tags: ["AI Agents", "n8n"],
      icon: Cpu,
      accent: "#0F9F86",
      gradient:
        "linear-gradient(145deg, #6EE7B7 0%, #10B981 48%, #047857 100%)",
      surface:
        "linear-gradient(145deg, rgba(236,253,245,0.96), rgba(255,255,255,0.99))",
      glow: "rgba(5,150,105,0.24)",
    },
    {
      number: "07",
      category: "Growth Engine",
      title: "AI Marketing & Search Growth",
      description:
        "Build campaigns across content strategy, SEO, AEO, GEO and digital distribution.",
      tags: ["Marketing", "SEO + AEO"],
      icon: TrendingUp,
      accent: "#EA580C",
      gradient:
        "linear-gradient(145deg, #FDBA74 0%, #F97316 48%, #EA580C 100%)",
      surface:
        "linear-gradient(145deg, rgba(255,247,237,0.96), rgba(255,255,255,0.99))",
      glow: "rgba(249,115,22,0.24)",
    },
    {
      number: "08",
      category: "Performance Lab",
      title: "Analytics & Conversion Systems",
      description:
        "Track user behaviour, campaign performance and conversion-focused growth insights.",
      tags: ["Analytics", "Conversion"],
      icon: BarChart3,
      accent: "#0284C7",
      gradient:
        "linear-gradient(145deg, #7DD3FC 0%, #0EA5E9 48%, #0369A1 100%)",
      surface:
        "linear-gradient(145deg, rgba(240,249,255,0.96), rgba(255,255,255,0.99))",
      glow: "rgba(2,132,199,0.24)",
    },
    {
      number: "09",
      category: "Career System",
      title: "Portfolio, Freelancing & Client Work",
      description:
        "Turn practical output into case studies, service offers and client-ready portfolio work.",
      tags: ["Portfolio", "Freelancing"],
      icon: Briefcase,
      accent: "#C026D3",
      gradient:
        "linear-gradient(145deg, #F0ABFC 0%, #D946EF 48%, #A21CAF 100%)",
      surface:
        "linear-gradient(145deg, rgba(253,244,255,0.96), rgba(255,255,255,0.99))",
      glow: "rgba(192,38,211,0.24)",
    },
  ]

  return (
    <section className="bg-[#F8FAFC] py-8 md:py-12" id="courses">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-home-skill-system-premium="v3"
          className="relative overflow-hidden rounded-[34px] border border-[#DCE7F5] bg-[linear-gradient(135deg,#F8FBFF_0%,#F6F7FF_48%,#EFFCFF_100%)] p-4 shadow-[0_26px_70px_rgba(15,23,42,0.09)] sm:p-6 md:p-8"
        >
          <div
            aria-hidden="true"
            className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#2563EB]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[42%] h-60 w-60 rounded-full bg-[#06B6D4]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.28]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(37,99,235,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.10) 1px, transparent 1px)",
              backgroundSize: "46px 46px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 52%)",
            }}
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E4FF] bg-white/85 px-4 py-2 shadow-[0_8px_24px_rgba(37,99,235,0.08)] backdrop-blur">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[linear-gradient(145deg,#60A5FA,#7C3AED)] text-white shadow-[0_5px_12px_rgba(99,102,241,0.30)]">
                <Layers className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>

              <span className="text-[10px] font-black uppercase tracking-[0.17em] text-[#4F46E5] sm:text-[11px]">
                Complete Course &amp; Skill Stack
              </span>
            </div>

            <h2 className="mt-4 text-[34px] font-black leading-[1.01] tracking-[-0.055em] text-[#071533] sm:text-4xl md:text-[50px] lg:text-[56px]">
              AI Digital Growth Creator
              <span className="mt-1 block bg-gradient-to-r from-[#4F46E5] via-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                Practical Skill System
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm font-medium leading-6 text-[#52637A] sm:text-base sm:leading-7 md:text-[17px]">
              Build a complete stack across AI creation, websites,
              automation, marketing, analytics and portfolio-ready
              implementation.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {[
                "9 Skill Systems",
                "Practical Projects",
                "Guided Execution",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/75 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#64748B] shadow-[0_5px_14px_rgba(15,23,42,0.05)] backdrop-blur"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {skillSystems.map((item) => {
              const Icon = item.icon

              return (
                <article
                  key={item.number}
                  className="group relative min-h-[248px] overflow-hidden rounded-[26px] border border-white/95 p-4 shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#CDD9F0] hover:shadow-[0_22px_48px_rgba(37,99,235,0.13)] md:p-5"
                  style={{
                    background: item.surface,
                    boxShadow:
                      "0 12px 32px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.92)",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{ background: item.gradient }}
                  />

                  <div
                    aria-hidden="true"
                    className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
                    style={{ background: item.accent }}
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <div
                      className="relative grid h-13 w-13 shrink-0 place-items-center overflow-hidden rounded-[18px] border border-white/80 text-white transition-transform duration-300 group-hover:scale-105"
                      style={{
                        width: "52px",
                        height: "52px",
                        background: item.gradient,
                        boxShadow:
                          `inset 0 1px 0 rgba(255,255,255,0.46), ` +
                          `inset 0 -8px 15px rgba(15,23,42,0.17), ` +
                          `0 10px 22px ${item.glow}`,
                      }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute left-1.5 right-1.5 top-1 h-5 rounded-full bg-white/25 blur-[2px]"
                      />

                      <Icon
                        className="relative z-10 h-5.5 w-5.5 drop-shadow-[0_3px_3px_rgba(15,23,42,0.27)]"
                        strokeWidth={2.3}
                      />
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span
                        className="rounded-full border border-white/90 bg-white/80 px-2.5 py-1 text-[9px] font-black tracking-[0.14em] shadow-[0_4px_12px_rgba(15,23,42,0.05)]"
                        style={{ color: item.accent }}
                      >
                        {item.number}
                      </span>

                      <span
                        className="rounded-full border border-white/90 bg-white/70 px-3 py-1 text-[8px] font-black uppercase tracking-[0.13em] shadow-[0_4px_12px_rgba(15,23,42,0.04)] sm:text-[9px]"
                        style={{ color: item.accent }}
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="relative mt-5">
                    <h3 className="text-[18px] font-black leading-snug tracking-[-0.035em] text-[#071533] md:text-[19px]">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-sm font-medium leading-6 text-[#5B6B82]">
                      {item.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border bg-white/80 px-3 py-1.5 text-[9px] font-black shadow-[0_4px_12px_rgba(15,23,42,0.04)]"
                          style={{
                            color: item.accent,
                            borderColor: `${item.accent}30`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="relative mt-7 rounded-[24px] border border-white/90 bg-white/72 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.055)] backdrop-blur md:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-black text-[#071533]">
                  One connected practical learning system
                </p>

                <p className="mt-1 text-xs font-semibold leading-5 text-[#64748B] sm:text-sm">
                  Learn individual skills and combine them into complete
                  digital workflows.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "Create",
                  "Build",
                  "Automate",
                  "Measure",
                  "Present",
                ].map((stage, index) => (
                  <span
                    key={stage}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE6F5] bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.11em] text-[#475569] shadow-[0_4px_12px_rgba(15,23,42,0.04)]"
                  >
                    <span className="text-[#2563EB]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {stage}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


// ==================== SECTION 9: TOOLS USE-CASE CARDS ====================
const ToolsUseCaseSection = () => {
  const projectOutcomes = [
    {
      number: "01",
      title: "Brand Content Kit",
      description:
        "Social posts, thumbnails, ad creatives and campaign-ready brand visuals.",
      category: "Content",
      icon: MailIcon,
      accent: "#2563EB",
      gradient:
        "linear-gradient(145deg, #60A5FA 0%, #2563EB 48%, #1D4ED8 100%)",
      card:
        "linear-gradient(145deg, rgba(239,246,255,0.88), rgba(255,255,255,0.98))",
      glow: "rgba(37,99,235,0.24)",
    },
    {
      number: "02",
      title: "Short-Form Video Pack",
      description:
        "Reels, shorts, scripts and polished promotional video assets.",
      category: "Video",
      icon: FileVideo,
      accent: "#7C3AED",
      gradient:
        "linear-gradient(145deg, #C4B5FD 0%, #8B5CF6 48%, #6D28D9 100%)",
      card:
        "linear-gradient(145deg, rgba(245,243,255,0.92), rgba(255,255,255,0.98))",
      glow: "rgba(124,58,237,0.23)",
    },
    {
      number: "03",
      title: "Conversion Landing Page",
      description:
        "A responsive lead-generation or course landing page built for action.",
      category: "Website",
      icon: Lightbulb,
      accent: "#D97706",
      gradient:
        "linear-gradient(145deg, #FDE68A 0%, #F59E0B 48%, #EA580C 100%)",
      card:
        "linear-gradient(145deg, rgba(255,251,235,0.94), rgba(255,255,255,0.98))",
      glow: "rgba(245,158,11,0.23)",
    },
    {
      number: "04",
      title: "AI Lead Chatbot",
      description:
        "A website FAQ assistant or WhatsApp lead-qualification workflow.",
      category: "AI System",
      icon: Cpu,
      accent: "#0891B2",
      gradient:
        "linear-gradient(145deg, #67E8F9 0%, #06B6D4 48%, #0891B2 100%)",
      card:
        "linear-gradient(145deg, rgba(236,254,255,0.92), rgba(255,255,255,0.98))",
      glow: "rgba(8,145,178,0.23)",
    },
    {
      number: "05",
      title: "Automated Business Workflow",
      description:
        "A connected form, CRM, email and follow-up automation system.",
      category: "Automation",
      icon: Zap,
      accent: "#EA580C",
      gradient:
        "linear-gradient(145deg, #FDBA74 0%, #F97316 48%, #EA580C 100%)",
      card:
        "linear-gradient(145deg, rgba(255,247,237,0.94), rgba(255,255,255,0.98))",
      glow: "rgba(249,115,22,0.23)",
    },
    {
      number: "06",
      title: "Search Visibility Campaign",
      description:
        "An SEO, AEO and GEO-focused campaign for stronger search visibility.",
      category: "Growth",
      icon: Rocket,
      accent: "#059669",
      gradient:
        "linear-gradient(145deg, #6EE7B7 0%, #10B981 48%, #047857 100%)",
      card:
        "linear-gradient(145deg, rgba(236,253,245,0.94), rgba(255,255,255,0.98))",
      glow: "rgba(5,150,105,0.23)",
    },
    {
      number: "07",
      title: "No-Code Business Dashboard",
      description:
        "A CRM, reporting dashboard or working MVP prototype.",
      category: "No-Code",
      icon: Presentation,
      accent: "#4F46E5",
      gradient:
        "linear-gradient(145deg, #A5B4FC 0%, #6366F1 48%, #4338CA 100%)",
      card:
        "linear-gradient(145deg, rgba(238,242,255,0.94), rgba(255,255,255,0.98))",
      glow: "rgba(79,70,229,0.23)",
    },
    {
      number: "08",
      title: "Growth Analytics Report",
      description:
        "Performance insights, reporting and practical optimization recommendations.",
      category: "Analytics",
      icon: BarChart3,
      accent: "#0284C7",
      gradient:
        "linear-gradient(145deg, #7DD3FC 0%, #0EA5E9 48%, #0369A1 100%)",
      card:
        "linear-gradient(145deg, rgba(240,249,255,0.94), rgba(255,255,255,0.98))",
      glow: "rgba(2,132,199,0.23)",
    },
    {
      number: "09",
      title: "Professional Portfolio Case Study",
      description:
        "A client-ready presentation with clear process and measurable outcomes.",
      category: "Portfolio",
      icon: Briefcase,
      accent: "#9333EA",
      gradient:
        "linear-gradient(145deg, #E879F9 0%, #A855F7 48%, #7E22CE 100%)",
      card:
        "linear-gradient(145deg, rgba(250,245,255,0.94), rgba(255,255,255,0.98))",
      glow: "rgba(147,51,234,0.23)",
    },
  ]

  return (
    <section className="bg-[#F8FAFC] py-8 md:py-12" id="projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-home-project-outcomes-premium="v2"
          className="relative overflow-hidden rounded-[32px] border border-[#DCE7F5] bg-[linear-gradient(135deg,#F8FBFF_0%,#F5F7FF_52%,#F0FDFF_100%)] p-4 shadow-[0_24px_65px_rgba(15,23,42,0.08)] sm:p-6 md:p-8"
        >
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#2563EB]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -right-24 -top-16 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-[#06B6D4]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.28]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(37,99,235,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.10) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 48%)",
            }}
          />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E4FF] bg-white/85 px-4 py-2 shadow-[0_8px_22px_rgba(37,99,235,0.08)] backdrop-blur">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[linear-gradient(145deg,#60A5FA,#7C3AED)] text-white shadow-[0_5px_12px_rgba(99,102,241,0.28)]">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>

                <span className="text-[11px] font-black uppercase tracking-[0.17em] text-[#4F46E5] md:text-xs">
                  Project Outcomes
                </span>
              </div>

              <h2 className="mt-4 text-[34px] font-black leading-[1.02] tracking-[-0.055em] text-[#071533] sm:text-4xl md:text-[48px] lg:text-[54px]">
                Projects You&apos;ll{" "}
                <span className="bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
                  Finish
                </span>
              </h2>

              <p className="mt-4 max-w-3xl text-sm font-medium leading-6 text-[#52637A] sm:text-base sm:leading-7 md:text-[17px]">
                Complete practical, portfolio-ready projects across content,
                video, websites, automation, growth and analytics.
              </p>
            </div>

            <div className="flex w-full items-center gap-3 rounded-[22px] border border-white/90 bg-white/80 p-3 shadow-[0_14px_35px_rgba(15,23,42,0.08)] backdrop-blur sm:w-auto sm:min-w-[235px]">
              <div className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[18px] bg-[linear-gradient(145deg,#7C3AED_0%,#2563EB_55%,#06B6D4_100%)] text-xl font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-8px_14px_rgba(15,23,42,0.18),0_10px_24px_rgba(37,99,235,0.28)]">
                <div
                  aria-hidden="true"
                  className="absolute left-2 right-2 top-1.5 h-5 rounded-full bg-white/25 blur-[2px]"
                />
                <span className="relative z-10">9</span>
              </div>

              <div>
                <p className="text-sm font-black text-[#071533]">
                  Practical Builds
                </p>
                <p className="mt-0.5 text-xs font-semibold text-[#64748B]">
                  Portfolio-ready outcomes
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {projectOutcomes.map((item) => {
              const Icon = item.icon

              return (
                <article
                  key={item.number}
                  className="group relative min-h-[190px] overflow-hidden rounded-[24px] border border-white/95 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#CCD9F1] hover:shadow-[0_20px_44px_rgba(37,99,235,0.12)] md:p-5"
                  style={{
                    background: item.card,
                    boxShadow:
                      "0 12px 30px rgba(15,23,42,0.055), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{ background: item.gradient }}
                  />

                  <div
                    aria-hidden="true"
                    className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
                    style={{ background: item.accent }}
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <div
                      className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[16px] border border-white/80 text-white transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: item.gradient,
                        boxShadow:
                          `inset 0 1px 0 rgba(255,255,255,0.45), ` +
                          `inset 0 -7px 13px rgba(15,23,42,0.17), ` +
                          `0 9px 20px ${item.glow}`,
                      }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute left-1.5 right-1.5 top-1 h-4 rounded-full bg-white/25 blur-[2px]"
                      />

                      <Icon
                        className="relative z-10 h-5.5 w-5.5 drop-shadow-[0_3px_3px_rgba(15,23,42,0.25)]"
                        strokeWidth={2.25}
                      />
                    </div>

                    <span
                      className="rounded-full border border-white/90 bg-white/75 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.13em] shadow-[0_4px_12px_rgba(15,23,42,0.04)]"
                      style={{ color: item.accent }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div className="relative mt-5">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-black tracking-[0.18em]"
                        style={{ color: item.accent }}
                      >
                        PROJECT {item.number}
                      </span>

                      <span
                        className="h-px flex-1 opacity-20"
                        style={{ background: item.accent }}
                      />
                    </div>

                    <h3 className="mt-2 text-[17px] font-black leading-snug tracking-[-0.025em] text-[#071533] md:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-6 text-[#5B6B82]">
                      {item.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-bold text-[#64748B]">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
              Practical execution
            </span>

            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#7C3AED]" />
              Guided reviews
            </span>

            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#06B6D4]" />
              Portfolio-ready output
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}


// ==================== SECTION 10: TOOLS LOGOS GRID ====================
const ToolsLogosSection = () => {
  const toolVisuals = {
    ChatGPT: {
      icon: Cpu,
      gradient: "linear-gradient(145deg, #10B981 0%, #059669 45%, #0D9488 100%)",
      glow: "rgba(16,185,129,0.28)",
      accent: "#059669",
    },
    Claude: {
      icon: Sparkles,
      gradient: "linear-gradient(145deg, #FDBA74 0%, #F97316 48%, #EA580C 100%)",
      glow: "rgba(249,115,22,0.26)",
      accent: "#EA580C",
    },
    Gemini: {
      icon: Sparkles,
      gradient: "linear-gradient(145deg, #60A5FA 0%, #6366F1 50%, #8B5CF6 100%)",
      glow: "rgba(99,102,241,0.28)",
      accent: "#4F46E5",
    },
    DeepSeek: {
      icon: Globe,
      gradient: "linear-gradient(145deg, #38BDF8 0%, #2563EB 52%, #1D4ED8 100%)",
      glow: "rgba(37,99,235,0.28)",
      accent: "#2563EB",
    },
    Perplexity: {
      icon: Globe,
      gradient: "linear-gradient(145deg, #22D3EE 0%, #0891B2 50%, #0F766E 100%)",
      glow: "rgba(8,145,178,0.26)",
      accent: "#0891B2",
    },
    Midjourney: {
      icon: PenTool,
      gradient: "linear-gradient(145deg, #C084FC 0%, #8B5CF6 48%, #6366F1 100%)",
      glow: "rgba(139,92,246,0.27)",
      accent: "#7C3AED",
    },
    Ideogram: {
      icon: Lightbulb,
      gradient: "linear-gradient(145deg, #FDE68A 0%, #F59E0B 48%, #EA580C 100%)",
      glow: "rgba(245,158,11,0.27)",
      accent: "#D97706",
    },
    Runway: {
      icon: FileVideo,
      gradient: "linear-gradient(145deg, #A78BFA 0%, #7C3AED 48%, #4F46E5 100%)",
      glow: "rgba(124,58,237,0.28)",
      accent: "#7C3AED",
    },
    Pika: {
      icon: Sparkles,
      gradient: "linear-gradient(145deg, #FDA4AF 0%, #EC4899 50%, #DB2777 100%)",
      glow: "rgba(236,72,153,0.27)",
      accent: "#DB2777",
    },
    Veo: {
      icon: Play,
      gradient: "linear-gradient(145deg, #67E8F9 0%, #0EA5E9 50%, #2563EB 100%)",
      glow: "rgba(14,165,233,0.27)",
      accent: "#0284C7",
    },
    "Luma AI": {
      icon: Layers,
      gradient: "linear-gradient(145deg, #818CF8 0%, #6366F1 48%, #7C3AED 100%)",
      glow: "rgba(99,102,241,0.27)",
      accent: "#4F46E5",
    },
    ElevenLabs: {
      icon: BarChart3,
      gradient: "linear-gradient(145deg, #C4B5FD 0%, #8B5CF6 48%, #6D28D9 100%)",
      glow: "rgba(139,92,246,0.27)",
      accent: "#7C3AED",
    },
    HeyGen: {
      icon: User,
      gradient: "linear-gradient(145deg, #22D3EE 0%, #6366F1 52%, #A855F7 100%)",
      glow: "rgba(99,102,241,0.27)",
      accent: "#6366F1",
    },
    Descript: {
      icon: FileText,
      gradient: "linear-gradient(145deg, #93C5FD 0%, #3B82F6 50%, #2563EB 100%)",
      glow: "rgba(59,130,246,0.27)",
      accent: "#2563EB",
    },
    "Notion AI": {
      icon: FileText,
      gradient: "linear-gradient(145deg, #64748B 0%, #1E293B 50%, #020617 100%)",
      glow: "rgba(15,23,42,0.24)",
      accent: "#0F172A",
    },
    Zapier: {
      icon: Zap,
      gradient: "linear-gradient(145deg, #FDBA74 0%, #F97316 48%, #EA580C 100%)",
      glow: "rgba(249,115,22,0.27)",
      accent: "#EA580C",
    },
    Make: {
      icon: Layers,
      gradient: "linear-gradient(145deg, #D8B4FE 0%, #9333EA 50%, #6D28D9 100%)",
      glow: "rgba(147,51,234,0.27)",
      accent: "#7E22CE",
    },
    n8n: {
      icon: Rocket,
      gradient: "linear-gradient(145deg, #FDA4AF 0%, #F43F5E 48%, #E11D48 100%)",
      glow: "rgba(244,63,94,0.26)",
      accent: "#E11D48",
    },
    "Webflow AI": {
      icon: Globe,
      gradient: "linear-gradient(145deg, #60A5FA 0%, #2563EB 48%, #1D4ED8 100%)",
      glow: "rgba(37,99,235,0.27)",
      accent: "#2563EB",
    },
    "Gamma AI": {
      icon: Presentation,
      gradient: "linear-gradient(145deg, #F0ABFC 0%, #A855F7 48%, #6366F1 100%)",
      glow: "rgba(168,85,247,0.27)",
      accent: "#9333EA",
    },
  }

  return (
    <section className="bg-white py-8 md:py-12" id="tools">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-home-tools-premium="v1"
          className="relative overflow-hidden rounded-[32px] border border-[#DCE6F5] bg-[linear-gradient(135deg,#F8FBFF_0%,#F5F3FF_48%,#F0FDFF_100%)] px-4 py-8 shadow-[0_24px_65px_rgba(15,23,42,0.09)] sm:px-6 md:px-8 md:py-10 lg:px-10"
        >
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#2563EB]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#A855F7]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#06B6D4]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.32]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(37,99,235,0.14) 1px, transparent 0)",
              backgroundSize: "28px 28px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 45%)",
            }}
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9E5FF] bg-white/85 px-4 py-2 shadow-[0_8px_24px_rgba(37,99,235,0.08)] backdrop-blur">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[linear-gradient(145deg,#60A5FA,#7C3AED)] text-white shadow-[0_5px_12px_rgba(99,102,241,0.28)]">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>

              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#4F46E5] md:text-xs">
                Tools Ecosystem
              </span>
            </div>

            <h2 className="mt-4 text-[34px] font-black leading-[1.02] tracking-[-0.055em] text-[#071533] sm:text-4xl md:text-[48px] lg:text-[56px]">
              <span className="bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
                25+
              </span>{" "}
              AI Tools You Will Master
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm font-medium leading-6 text-[#52637A] sm:text-base sm:leading-7 md:text-[17px]">
              Modern creators combine these tools into practical workflows.
              You&apos;ll learn how to use them together for design, video,
              content, automation and digital execution.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {["Design", "Video", "Content", "Automation"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/90 bg-white/75 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.13em] text-[#64748B] shadow-[0_5px_14px_rgba(15,23,42,0.05)] backdrop-blur"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mt-7 grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
            {aiTools.map((tool) => {
              const visual =
                toolVisuals[tool.name as keyof typeof toolVisuals] ??
                toolVisuals.ChatGPT

              const Icon = visual.icon

              return (
                <div
                  key={tool.name}
                  className="group relative flex min-h-[78px] items-center gap-3 overflow-hidden rounded-[20px] border border-white/90 bg-white/75 p-3 shadow-[0_10px_26px_rgba(15,23,42,0.055)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#C7D7F5] hover:bg-white hover:shadow-[0_18px_40px_rgba(37,99,235,0.13)] md:min-h-[84px] md:p-3.5"
                  style={{
                    boxShadow:
                      "0 10px 26px rgba(15,23,42,0.055), inset 0 1px 0 rgba(255,255,255,0.85)",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        `linear-gradient(90deg, transparent, ${visual.accent}, transparent)`,
                    }}
                  />

                  <div
                    className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-[15px] border border-white/80 text-white transition-transform duration-300 group-hover:scale-105 md:h-12 md:w-12"
                    style={{
                      background: visual.gradient,
                      boxShadow:
                        `inset 0 1px 0 rgba(255,255,255,0.45), ` +
                        `inset 0 -7px 14px rgba(15,23,42,0.16), ` +
                        `0 8px 20px ${visual.glow}`,
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute left-1.5 right-1.5 top-1 h-4 rounded-full bg-white/25 blur-[2px]"
                    />

                    <Icon
                      className="relative z-10 h-5 w-5 drop-shadow-[0_3px_3px_rgba(15,23,42,0.28)] md:h-5.5 md:w-5.5"
                      strokeWidth={2.35}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-black leading-tight tracking-[-0.02em] text-[#071533] sm:text-[15px] md:text-base">
                      {tool.name}
                    </p>

                    <p
                      className="mt-1 hidden truncate text-[9px] font-black uppercase tracking-[0.13em] sm:block"
                      style={{ color: visual.accent }}
                    >
                      {tool.category}
                    </p>
                  </div>

                  <div
                    aria-hidden="true"
                    className="absolute -bottom-8 -right-8 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
                    style={{ background: visual.accent }}
                  />
                </div>
              )
            })}
          </div>

          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-bold text-[#64748B]">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
              Practical workflows
            </span>

            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#7C3AED]" />
              Guided execution
            </span>

            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#06B6D4]" />
              Portfolio-ready output
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}


// ==================== SECTION 11: VIDEO TESTIMONIALS ====================
const VideoTestimonialsSection = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const interactionTimerRef = useRef<number | null>(null)
  const autoPausedRef = useRef(false)

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const testimonials = useMemo(
    () =>
      videoTestimonials.map((testimonial, index) => ({
        ...testimonial,
        poster: `/images/testimonials/t${index + 1}.webp`,
        videoUrl: `/reviews/videos/t${index + 1}.mp4`,
      })),
    []
  )

  const pauseAutoScroll = (resumeAfter = 0) => {
    autoPausedRef.current = true

    if (interactionTimerRef.current !== null) {
      window.clearTimeout(interactionTimerRef.current)
      interactionTimerRef.current = null
    }

    if (resumeAfter > 0) {
      interactionTimerRef.current = window.setTimeout(() => {
        autoPausedRef.current = false
        interactionTimerRef.current = null
      }, resumeAfter)
    }
  }

  const resumeAutoScroll = () => {
    if (interactionTimerRef.current !== null) {
      window.clearTimeout(interactionTimerRef.current)
      interactionTimerRef.current = null
    }

    autoPausedRef.current = false
  }

  const getCardStep = () => {
    const scroller = scrollerRef.current

    if (!scroller) return 280

    const firstCard = scroller.querySelector<HTMLElement>(
      "[data-testimonial-card]"
    )

    if (!firstCard) {
      return Math.max(
        Math.round(scroller.clientWidth * 0.82),
        280
      )
    }

    const styles = window.getComputedStyle(scroller)
    const parsedGap = Number.parseFloat(
      styles.columnGap || styles.gap || "16"
    )

    const gap = Number.isFinite(parsedGap)
      ? parsedGap
      : 16

    return firstCard.offsetWidth + gap
  }

  const stopInlineVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }

    setActiveIndex(null)
    resumeAutoScroll()
  }

  const activateInlineVideo = (index: number) => {
    pauseAutoScroll()
    setActiveIndex(index)
  }

  useEffect(() => {
    const scroller = scrollerRef.current

    if (!scroller) return

    const handleWheel = (event: WheelEvent) => {
      const maxScroll =
        scroller.scrollWidth - scroller.clientWidth

      if (maxScroll <= 1) return

      const movement =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY

      if (movement === 0) return

      const atStart = scroller.scrollLeft <= 1
      const atEnd =
        scroller.scrollLeft >= maxScroll - 1

      if (
        (movement < 0 && atStart) ||
        (movement > 0 && atEnd)
      ) {
        return
      }

      event.preventDefault()
      pauseAutoScroll(2800)

      scroller.scrollBy({
        left: movement,
        behavior: "auto",
      })
    }

    scroller.addEventListener("wheel", handleWheel, {
      passive: false,
    })

    return () => {
      scroller.removeEventListener("wheel", handleWheel)
    }
  }, [])

  useEffect(() => {
    if (activeIndex !== null) return

    const intervalId = window.setInterval(() => {
      const scroller = scrollerRef.current

      if (
        !scroller ||
        autoPausedRef.current ||
        document.hidden
      ) {
        return
      }

      const maxScroll =
        scroller.scrollWidth - scroller.clientWidth

      if (maxScroll <= 1) return

      const step = getCardStep()
      const nextPosition = scroller.scrollLeft + step
      const nearEnd =
        nextPosition >= maxScroll - step * 0.35

      if (nearEnd) {
        scroller.scrollTo({
          left: 0,
          behavior: "smooth",
        })
      } else {
        scroller.scrollBy({
          left: step,
          behavior: "smooth",
        })
      }
    }, 3600)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [activeIndex])

  useEffect(() => {
    if (activeIndex === null) return

    pauseAutoScroll()

    const playTimer = window.setTimeout(() => {
      const player = videoRef.current

      if (!player) return

      player.load()

      void player.play().catch(() => {
        // Native video controls remain available.
      })
    }, 60)

    return () => {
      window.clearTimeout(playTimer)

      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [activeIndex])

  useEffect(() => {
    return () => {
      if (interactionTimerRef.current !== null) {
        window.clearTimeout(interactionTimerRef.current)
      }

      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [])

  return (
    <section
      className="bg-[#F8FAFC] py-8 md:py-12"
      id="reviews"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-home-video-testimonials-premium="v4"
          className="relative overflow-hidden rounded-[32px] border border-[#DCE7F5] bg-[linear-gradient(135deg,#F8FBFF_0%,#F6F5FF_48%,#EFFCFF_100%)] px-4 py-7 shadow-[0_24px_65px_rgba(15,23,42,0.08)] sm:px-6 md:px-8 md:py-9"
        >
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#2563EB]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -right-24 top-8 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-[-120px] left-[38%] h-64 w-64 rounded-full bg-[#06B6D4]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.24]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(37,99,235,0.16) 1px, transparent 0)",
              backgroundSize: "30px 30px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 48%)",
            }}
          />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E4FF] bg-white/85 px-4 py-2 shadow-[0_8px_22px_rgba(37,99,235,0.08)] backdrop-blur">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[linear-gradient(145deg,#60A5FA,#7C3AED)] text-white shadow-[0_5px_12px_rgba(99,102,241,0.30)]">
                <Play
                  className="h-3.5 w-3.5 translate-x-[1px]"
                  fill="currentColor"
                  strokeWidth={2.2}
                />
              </span>

              <span className="text-[10px] font-black uppercase tracking-[0.17em] text-[#4F46E5] sm:text-[11px]">
                Real Learner Stories
              </span>
            </div>

            <h2 className="mt-4 text-[34px] font-black leading-[1.02] tracking-[-0.05em] text-[#071533] sm:text-4xl md:text-[48px]">
              Success stories from
              <span className="ml-2 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
                real learners
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-6 text-[#52637A] sm:text-base sm:leading-7">
              Watch learners share their practical experience,
              learning journey and results from the program.
            </p>
          </div>

          <div
            ref={scrollerRef}
            onMouseEnter={() => pauseAutoScroll()}
            onMouseLeave={() => {
              if (activeIndex === null) {
                resumeAutoScroll()
              }
            }}
            onFocusCapture={() => pauseAutoScroll()}
            onBlurCapture={() => {
              if (activeIndex === null) {
                resumeAutoScroll()
              }
            }}
            onPointerDown={() => pauseAutoScroll(3200)}
            onTouchStart={() => pauseAutoScroll(3200)}
            className="no-scrollbar relative mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pb-3 touch-pan-x sm:gap-4"
            aria-label="Learner video testimonials"
          >
            {testimonials.map((testimonial, index) => {
              const isActive = activeIndex === index

              return (
                <article
                  key={testimonial.name}
                  data-testimonial-card
                  className="group relative aspect-[9/16] w-[205px] shrink-0 snap-center overflow-hidden rounded-[24px] border border-white/90 bg-[#071533] shadow-[0_16px_36px_rgba(15,23,42,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(37,99,235,0.20)] sm:w-[225px] md:w-[240px] lg:w-[250px]"
                >
                  {isActive ? (
                    <div className="absolute inset-0 bg-black">
                      <video
                        ref={videoRef}
                        key={testimonial.videoUrl}
                        src={testimonial.videoUrl}
                        poster={testimonial.poster}
                        className="h-full w-full object-contain"
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                        onEnded={stopInlineVideo}
                        onPlay={() => pauseAutoScroll()}
                        onContextMenu={(event) =>
                          event.preventDefault()
                        }
                      >
                        Your browser does not support video playback.
                      </video>

                      <button
                        type="button"
                        onClick={stopInlineVideo}
                        className="absolute right-2.5 top-2.5 z-20 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/55 text-white shadow-[0_8px_20px_rgba(0,0,0,0.25)] backdrop-blur transition hover:bg-black/75"
                        aria-label="Close video"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        activateInlineVideo(index)
                      }
                      className="absolute inset-0 block h-full w-full overflow-hidden text-left"
                      aria-label={`Play ${testimonial.name} learner story`}
                    >
                      <img
                        src={testimonial.poster}
                        alt={`${testimonial.name} learner testimonial`}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/20" />

                      <span className="absolute inset-0 grid place-items-center">
                        <span className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-white/30 bg-[linear-gradient(145deg,#FDE047_0%,#F5B301_55%,#F97316_100%)] text-[#071533] shadow-[inset_0_1px_0_rgba(255,255,255,0.50),inset_0_-7px_14px_rgba(180,83,9,0.20),0_12px_28px_rgba(245,179,1,0.38)] transition-transform duration-300 group-hover:scale-110">
                          <span
                            aria-hidden="true"
                            className="absolute left-2 right-2 top-1 h-5 rounded-full bg-white/30 blur-[2px]"
                          />

                          <Play
                            className="relative z-10 h-6 w-6 translate-x-[2px]"
                            fill="currentColor"
                            strokeWidth={2}
                          />
                        </span>
                      </span>
                    </button>
                  )}
                </article>
              )
            })}
          </div>
        </div>
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
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
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
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
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
  <section className="bg-white pt-8 pb-2 md:pt-10 md:pb-3">
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
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
                <p className="text-2xl font-bold text-[#2563EB]">150,000+</p>
                <p className="text-[#475569] text-xs">Students</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#0F172A]/10">
                <p className="text-2xl font-bold text-[#F5B301]">4.9★</p>
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
    <section data-home-mentor-faq-gap-fix="v1" className="bg-[#F8FAFC] pt-5 pb-8 md:pt-6 md:pb-10" id="faq">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
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
  <section className="bg-[#F8FAFC] py-8 md:py-12" id="register">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        data-home-final-cta-premium="v5"
        className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,#071533_0%,#0B1F4A_50%,#0C4A6E_100%)] px-5 py-8 shadow-[0_26px_70px_rgba(15,23,42,0.20)] sm:px-7 md:px-10 md:py-10 lg:px-12"
      >
        <div
          aria-hidden="true"
          className="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-[#2563EB]/30 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-[#06B6D4]/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute bottom-[-140px] left-[38%] h-72 w-72 rounded-full bg-[#7C3AED]/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.20]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 78%)",
          }}
        />

        <div className="relative grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[linear-gradient(145deg,#60A5FA,#7C3AED)] text-white shadow-[0_5px_12px_rgba(99,102,241,0.35)]">
                  <Sparkles
                    className="h-3.5 w-3.5"
                    strokeWidth={2.5}
                  />
                </span>

                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/85 sm:text-[11px]">
                  Admission Guidance
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-200 backdrop-blur sm:text-[11px]">
                <Lock className="h-3.5 w-3.5" strokeWidth={2.4} />
                Direct Support
              </div>
            </div>

            <h2 className="mt-5 max-w-3xl text-[36px] font-black leading-[1.02] tracking-[-0.055em] text-white sm:text-4xl md:text-[50px] lg:text-[56px]">
              Get your personalised
              <span className="mt-1 block bg-gradient-to-r from-[#F5B301] via-[#FBBF24] to-[#67E8F9] bg-clip-text text-transparent">
                AI learning roadmap
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-white/70 sm:text-base sm:leading-7 md:text-[17px]">
              WhatsApp par apni details share karein. Team aapko active
              batch, course fee, class timing aur practical learning
              roadmap ki complete information degi.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Batch Details",
                "Fee Guidance",
                "Class Timing",
                "Course Roadmap",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[10px] font-bold text-white/75 backdrop-blur"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F5B301]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative w-full overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.09] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_20px_45px_rgba(2,6,23,0.18)] backdrop-blur-xl sm:p-5 lg:max-w-[500px] lg:justify-self-end">
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#F5B301]/15 blur-2xl"
            />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[18px] border border-white/20 bg-[linear-gradient(145deg,#60A5FA_0%,#2563EB_52%,#1E3A8A_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-8px_15px_rgba(15,23,42,0.22),0_10px_24px_rgba(37,99,235,0.38)]">
                  <div
                    aria-hidden="true"
                    className="absolute left-2 right-2 top-1.5 h-5 rounded-full bg-white/25 blur-[2px]"
                  />

                  <Users
                    className="relative z-10 h-6 w-6"
                    strokeWidth={2.3}
                  />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/50">
                    Free Guidance
                  </p>

                  <p className="mt-1 text-lg font-black text-white">
                    Talk to our team
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <a
                  href={CONFIG.contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Get course details on WhatsApp"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-[18px] bg-[linear-gradient(135deg,#F5B301_0%,#FBBF24_100%)] px-4 py-4 text-center text-sm font-black leading-5 text-[#071533] shadow-[0_13px_30px_rgba(245,179,1,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(245,179,1,0.38)] sm:px-5 sm:text-base"
                >
                  <span className="whitespace-normal">
                    Get course details on WhatsApp
                  </span>

                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="/gen-ai-masterclass/register-one-step"
                  aria-label="Open complete registration form"
                  className="group grid w-full grid-cols-[40px_minmax(0,1fr)_18px] items-center gap-3 rounded-[18px] border border-white/15 bg-white/[0.08] p-3.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.12]"
                >
                  <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-[13px] border border-white/15 bg-[linear-gradient(145deg,#A78BFA_0%,#6366F1_52%,#2563EB_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_0_-6px_12px_rgba(15,23,42,0.20),0_8px_18px_rgba(99,102,241,0.30)]">
                    <span
                      aria-hidden="true"
                      className="absolute left-1.5 right-1.5 top-1 h-3 rounded-full bg-white/20 blur-[1px]"
                    />

                    <ListChecks
                      className="relative z-10 h-5 w-5 text-white"
                      strokeWidth={2.3}
                      aria-hidden="true"
                    />
                  </span>

                  <span className="min-w-0 text-left">
                    <span className="block text-[9px] font-black uppercase tracking-[0.13em] text-white/50">
                      Registration form
                    </span>

                    <span className="mt-0.5 block whitespace-normal break-words text-[13px] font-black leading-[1.25] text-white sm:text-sm">
                      Complete your registration
                    </span>
                  </span>

                  <ArrowRight className="h-4 w-4 shrink-0 text-white/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
                </a>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-white/40">
                    Support
                  </p>

                  <p className="mt-1 text-xs font-semibold text-white/75">
                    support@sikhadenge.in
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>

                  <span className="text-[10px] font-black text-emerald-200">
                    Admission support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-7 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Sikhadenge · ThinkGrow Pvt. Ltd.
          </p>

          <p>
            Practical AI learning · Guided execution
          </p>
        </div>
      </div>
    </div>
  </section>
)


export default function LandingPage() {
  return (
    <div className="bg-[#F8FAFC] home-typography-bricolage-v1">
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
