"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Phone, User, ArrowRight, CheckCircle } from "lucide-react";

const DELAY_MS = 5000;
const SESSION_KEY = "sd_popup_dismissed";
const REGISTER_LINK = "/gen-ai-masterclass/register-one-step";

type Props = { skill: string; waLink: string };

export default function SkillPopup({ skill, waLink }: Props) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const skillLabel = skill.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    timerRef.current = setTimeout(() => { setOpen(true); setTimeout(() => setVisible(true), 10); }, DELAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  function dismiss() {
    setVisible(false);
    setTimeout(() => setOpen(false), 250);
    sessionStorage.setItem(SESSION_KEY, "1");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (hp) { setStatus("success"); return; }
    if (!name.trim() || name.trim().length < 2) { setErrorMsg("Apna naam likhein"); return; }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) { setErrorMsg("Valid 10-digit mobile number likhein"); return; }
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
          page: typeof window !== "undefined" ? window.location.pathname : "/",
          notes: { course: skillLabel, popup: true },
          hp,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
        sessionStorage.setItem(SESSION_KEY, "1");
      } else {
        setErrorMsg(data.error || "Kuch problem aayi, dobara try karein");
        setStatus("idle");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("idle");
    }
  }

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes sdPopupIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .sd-popup-card { animation: sdPopupIn 0.28s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Overlay */}
      <div
        onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "16px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <div
          className="sd-popup-card"
          style={{
            width: "100%", maxWidth: 440,
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* ── Close ── */}
          <button
            onClick={dismiss}
            aria-label="Close"
            style={{
              position: "absolute", top: 12, right: 12, zIndex: 10,
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff",
            }}
          >
            <X size={16} />
          </button>

          {/* ── Header ── */}
          <div style={{ background: "#0B1220", padding: "24px 24px 20px" }}>
            {/* Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 18, letterSpacing: -0.5 }}>sikhadenge</span>
              <span style={{
                display: "flex", alignItems: "center", gap: 4,
                background: "rgba(45,140,255,0.18)", border: "1px solid rgba(45,140,255,0.35)",
                color: "#7ab8ff", fontSize: 10, fontWeight: 700,
                padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 0.8,
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
                Live on Zoom
              </span>
            </div>

            {/* Live badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} className="animate-pulse" />
              <span style={{ color: "#4ade80", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                Live Class · This Sunday · 11 AM
              </span>
            </div>

            <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, lineHeight: 1.25, marginBottom: 4 }}>
              Join Free Masterclass
            </h2>
            <p style={{ color: "#60a5fa", fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{skillLabel}</p>
            <p style={{ color: "#64748b", fontSize: 12 }}>Hindi + English · 2 Hours · Certificate included</p>

            {/* Stats */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3,1fr)",
              gap: 0, marginTop: 18, paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}>
              {[
                { val: "1,50,000+", label: "Students" },
                { val: "Free",      label: "No Payment" },
                { val: "Zoom Link", label: "on WhatsApp" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <p style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>{s.val}</p>
                  <p style={{ color: "#64748b", fontSize: 10 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Body ── */}
          <div style={{ padding: "22px 24px 24px", background: "#fff" }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "#f0fdf4", display: "flex", alignItems: "center",
                  justifyContent: "center", margin: "0 auto 12px",
                }}>
                  <CheckCircle size={28} color="#16a34a" />
                </div>
                <h3 style={{ fontWeight: 900, fontSize: 18, color: "#0f172a", marginBottom: 6 }}>Registered! 🎉</h3>
                <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>
                  Zoom link WhatsApp pe milega. Ab full masterclass ke liye register karein:
                </p>
                <Link
                  href={REGISTER_LINK}
                  onClick={dismiss}
                  style={{
                    display: "block", width: "100%",
                    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                    color: "#fff", fontWeight: 900, padding: "16px 0",
                    borderRadius: 12, textAlign: "center", fontSize: 16,
                    marginBottom: 10, textDecoration: "none",
                    boxShadow: "0 4px 18px rgba(37,99,235,0.4)",
                  }}
                >
                  🎓 Complete Enrollment Now →
                </Link>
                <Link
                  href={waLink}
                  onClick={dismiss}
                  style={{
                    display: "block", width: "100%",
                    background: "rgba(37,211,102,0.08)",
                    border: "1px solid rgba(37,211,102,0.25)",
                    color: "#16a34a", fontWeight: 700, padding: "11px 0",
                    borderRadius: 12, textAlign: "center", fontSize: 13,
                    textDecoration: "none",
                  }}
                >
                  📱 Join WhatsApp Group
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <p style={{ color: "#334155", fontWeight: 600, fontSize: 13, marginBottom: 14 }}>
                  Register karein — Zoom link WhatsApp pe milega
                </p>

                {/* Honeypot */}
                <input
                  type="text" name="hp" value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0 }}
                  tabIndex={-1} autoComplete="off" aria-hidden="true"
                />

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
                  {/* Name */}
                  <div style={{ position: "relative" }}>
                    <User size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }} />
                    <input
                      type="text"
                      placeholder="Aapka naam"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required maxLength={60}
                      style={{
                        width: "100%", paddingLeft: 36, paddingRight: 14,
                        paddingTop: 12, paddingBottom: 12,
                        border: "1.5px solid #e2e8f0", borderRadius: 10,
                        fontSize: 14, color: "#0f172a", background: "#f8fafc",
                        outline: "none", boxSizing: "border-box",
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#2563eb"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
                    />
                  </div>
                  {/* Phone */}
                  <div style={{ position: "relative" }}>
                    <Phone size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }} />
                    <input
                      type="tel"
                      placeholder="WhatsApp number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required maxLength={15}
                      style={{
                        width: "100%", paddingLeft: 36, paddingRight: 14,
                        paddingTop: 12, paddingBottom: 12,
                        border: "1.5px solid #e2e8f0", borderRadius: 10,
                        fontSize: 14, color: "#0f172a", background: "#f8fafc",
                        outline: "none", boxSizing: "border-box",
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#2563eb"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p style={{
                    color: "#dc2626", fontSize: 12, marginBottom: 10,
                    background: "#fef2f2", border: "1px solid #fecaca",
                    borderRadius: 8, padding: "8px 12px",
                  }}>{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%", background: "#2563eb", color: "#fff",
                    fontWeight: 800, fontSize: 15,
                    padding: "14px 0", borderRadius: 12,
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    opacity: status === "loading" ? 0.75 : 1,
                  }}
                >
                  {status === "loading"
                    ? <span style={{ width: 18, height: 18, border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                    : <><span>Register & Join Free Class</span><ArrowRight size={16} /></>
                  }
                </button>

                <div style={{ margin: "10px 0 4px", display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                  <span style={{ color: "#94a3b8", fontSize: 11 }}>ya</span>
                  <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                </div>

                <Link
                  href={REGISTER_LINK}
                  onClick={dismiss}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    width: "100%", background: "#f8fafc",
                    border: "1.5px solid #e2e8f0", color: "#2563eb",
                    fontWeight: 700, fontSize: 13,
                    padding: "11px 0", borderRadius: 12,
                    textDecoration: "none",
                  }}
                >
                  Seedha Register Karein <ArrowRight size={13} />
                </Link>

                <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 11, marginTop: 8 }}>
                  🔒 No payment · No spam · Cancel anytime
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

    </>
  );
}
