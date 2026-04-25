"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Phone, User, ArrowRight, Video, Users, Clock, CheckCircle } from "lucide-react";

const DELAY_MS = 5000;
const SESSION_KEY = "sd_popup_dismissed";
const REGISTER_LINK = "/gen-ai-masterclass/register-one-step";

type Props = { skill: string; waLink: string };

export default function SkillPopup({ skill, waLink }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    timerRef.current = setTimeout(() => setOpen(true), DELAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  function dismiss() {
    setOpen(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (hp) { setStatus("success"); return; }
    if (!name.trim() || name.trim().length < 2) { setErrorMsg("Please enter your name"); return; }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) { setErrorMsg("Enter a valid 10-digit mobile number"); return; }
    setErrorMsg("");
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name.trim(),
          phone,
          source: "skill-popup",
          page: typeof window !== "undefined" ? window.location.pathname : "/skill-page",
          notes: { course: skill, popup: true },
          hp,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
        sessionStorage.setItem(SESSION_KEY, "1");
      } else {
        setErrorMsg(data.error || "Something went wrong. Try again.");
        setStatus("idle");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("idle");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 hover:bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-slate-500" />
        </button>

        {/* Header */}
        <div className="bg-[#0B1220] px-6 pt-6 pb-5 text-white">
          {/* Brand + Zoom pill */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-white font-black text-lg tracking-tight">sikhadenge</span>
            <span className="flex items-center gap-1 bg-[#2D8CFF]/20 border border-[#2D8CFF]/30 text-[#7AB8FF] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              <Video className="w-3 h-3" /> Live on Zoom
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
            <span className="text-green-400 text-xs font-semibold uppercase tracking-wide">Seats filling fast — This Sunday</span>
          </div>

          <h2 className="text-xl font-black leading-snug mb-1">
            Free Live Online Class<br />
            <span className="text-blue-400">{skill.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</span> Masterclass
          </h2>
          <p className="text-slate-400 text-xs">on Zoom · This Sunday · 11 AM – 1 PM · Hindi + English</p>

          {/* Stats row */}
          <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
            {[
              { icon: Users, val: "1,50,000+", label: "Students" },
              { icon: Clock,  val: "2 Hours",   label: "Live Session" },
              { icon: CheckCircle, val: "Free", label: "No Payment" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <s.icon className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-white text-xs font-bold leading-none">{s.val}</p>
                  <p className="text-slate-500 text-[10px]">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form / Success */}
        <div className="px-6 py-5">
          {status === "success" ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-black text-slate-900 text-lg mb-1">You're registered! 🎉</h3>
              <p className="text-slate-500 text-sm mb-5">
                Our team will send the Zoom link on WhatsApp before the class.
              </p>
              <Link
                href={REGISTER_LINK}
                onClick={dismiss}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl text-center text-sm transition-all mb-3"
              >
                Complete Enrollment →
              </Link>
              <Link
                href={waLink}
                onClick={dismiss}
                className="block w-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-bold py-2.5 rounded-xl text-center text-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5 inline mr-1.5" />Join WhatsApp Group
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className="text-slate-700 font-semibold text-sm mb-4">Register free — get Zoom link on WhatsApp</p>

              {/* Honeypot — hidden from humans */}
              <input
                type="text"
                name="hp"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0 }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="space-y-3 mb-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 placeholder-slate-400"
                    required
                    maxLength={60}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="tel"
                    placeholder="Mobile number (WhatsApp)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 placeholder-slate-400"
                    required
                    maxLength={15}
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-red-500 text-xs mb-3 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-black py-3.5 rounded-xl text-base transition-all flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Join Free Live Class <ArrowRight className="w-4 h-4" /></>
                )}
              </button>

              <p className="text-center text-slate-400 text-[11px] mt-3">
                🔒 No payment · No spam · Zoom link on WhatsApp
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
