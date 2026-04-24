"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginClient() {
  const r = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSend() {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/auth/api/otp/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const j = await res.json();
      if (!j.ok) throw new Error(j.reason || "FAILED");
      r.push(`/auth/verify?email=${encodeURIComponent(email.trim().toLowerCase())}`);
    } catch (e: any) {
      setErr(e?.message || "FAILED");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
      <div className="w-full max-w-md bg-white border border-black/10 rounded-2xl p-6">
        <div className="text-xl font-semibold">Employee Login</div>
        <div className="text-sm text-black/60 mt-1">Internal access</div>

        <div className="mt-4">
          <div className="text-sm font-medium">Email</div>
          <input
            className="mt-1 w-full border border-black/10 rounded-xl px-3 py-2 outline-none"
            placeholder="name@sikhadenge.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        {err && <div className="mt-3 text-sm text-red-600">{err}</div>}

        <button
          onClick={onSend}
          disabled={loading}
          className="mt-4 w-full rounded-xl bg-[#2563EB] text-white py-2 font-medium disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
}
