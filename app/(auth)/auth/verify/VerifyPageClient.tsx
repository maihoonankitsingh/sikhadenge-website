"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerifyPage() {
  const sp = useSearchParams();
  const r = useRouter();
  const email = sp?.get("email") || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onVerify() {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/auth/api/otp/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const j = await res.json();
      if (!j.ok) throw new Error(j.reason || "FAILED");
      if (j.user?.role === "affiliate") {
        r.push("/affiliate/dashboard");
      } else {
        r.push("/dashboard");
      }
    } catch (e: any) {
      setErr(e?.message || "FAILED");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
      <div className="w-full max-w-md bg-white border border-black/10 rounded-2xl p-6">
        <div className="text-xl font-semibold">Verify OTP</div>
        <div className="text-sm text-black/60 mt-1">{email}</div>

        <div className="mt-4">
          <div className="text-sm font-medium">OTP</div>
          <input
            className="mt-1 w-full border border-black/10 rounded-xl px-3 py-2 outline-none tracking-widest"
            placeholder="6-digit"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            inputMode="numeric"
            autoComplete="one-time-code"
          />
        </div>

        {err && <div className="mt-3 text-sm text-red-600">{err}</div>}

        <button
          onClick={onVerify}
          disabled={loading}
          className="mt-4 w-full rounded-xl bg-[#2563EB] text-white py-2 font-medium disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify & Login"}
        </button>
      </div>
    </div>
  );
}
