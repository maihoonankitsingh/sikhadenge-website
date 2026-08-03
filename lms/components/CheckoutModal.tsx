// =============================================================
// Checkout modal — paid course ke liye Razorpay payment.
// Flow: create-order (coupon ke saath) -> Razorpay checkout -> verify -> enroll.
// =============================================================

import React, { useState } from "react";

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name?: string; email?: string; contact?: string };
  theme: { color: string };
  handler: (r: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
};
type RazorpayInstance = { open: () => void };

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

type Props = {
  course: { id: string; title: string; priceInr: number };
  user: { name: string; email: string | null; phone: string | null };
  onClose: () => void;
  onSuccess: () => void;
};

export default function CheckoutModal({ course, user, onClose, onSuccess }: Props) {
  const [coupon, setCoupon] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function pay() {
    setErr(null);
    setBusy(true);
    try {
      // 1. Order banao (server coupon apply karta hai).
      const orderRes = await fetch("/api/student/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id, couponCode: coupon.trim() || undefined }),
      });
      const order = await orderRes.json().catch(() => null);
      if (!orderRes.ok || !order?.ok) throw new Error(order?.error || "Could not start payment");

      // 2. Razorpay script load karo.
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) throw new Error("Payment SDK load nahi hua");

      // 3. Checkout kholo.
      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amountInr * 100,
        currency: "INR",
        name: "Sikhadenge",
        description: course.title,
        order_id: order.orderId,
        prefill: { name: user.name, email: user.email || undefined, contact: user.phone || undefined },
        theme: { color: "#ff6b5a" },
        handler: async (r: RazorpayResponse) => {
          // 4. Server pe verify + enroll.
          const vr = await fetch("/api/student/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpayOrderId: r.razorpay_order_id,
              razorpayPaymentId: r.razorpay_payment_id,
              razorpaySignature: r.razorpay_signature,
            }),
          });
          const vj = await vr.json().catch(() => null);
          if (vr.ok && vj?.ok) onSuccess();
          else setErr(vj?.error || "Payment verify failed");
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rzp.open();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Payment failed");
      setBusy(false);
    }
  }

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", display: "grid", placeItems: "center", zIndex: 50, padding: 16 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(420px,100%)", background: "#fff", borderRadius: 16, padding: 20, color: "#0f172a" }}
      >
        <div style={{ fontWeight: 900, fontSize: 18 }}>Checkout</div>
        <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{course.title}</div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "16px 0" }}>
          <span style={{ fontSize: 13, color: "#64748b" }}>Price</span>
          <span style={{ fontSize: 20, fontWeight: 900 }}>₹{course.priceInr}</span>
        </div>

        <label style={{ fontSize: 12.5, fontWeight: 800 }}>Coupon / Referral code (optional)</label>
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value.toUpperCase())}
          placeholder="e.g. SDRAM10"
          style={{ width: "100%", height: 42, borderRadius: 10, border: "1px solid rgba(15,23,42,.16)", padding: "0 12px", marginTop: 6, fontSize: 14, outline: "none" }}
        />

        {err && <div style={{ color: "#b91c1c", fontSize: 12.5, marginTop: 10 }}>{err}</div>}

        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          <button onClick={pay} disabled={busy} style={{ flex: 1, height: 46, borderRadius: 12, border: "none", fontWeight: 900, fontSize: 14, color: "#fff", background: "linear-gradient(180deg,#ff7a6d,#ff6b5a)", cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.7 : 1 }}>
            {busy ? "Processing..." : `Pay ₹${course.priceInr}`}
          </button>
          <button onClick={onClose} disabled={busy} style={{ height: 46, padding: "0 16px", borderRadius: 12, border: "1px solid rgba(15,23,42,.16)", background: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
            Cancel
          </button>
        </div>
        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 10, textAlign: "center" }}>
          Coupon discount payment ke waqt final amount pe apply hoga.
        </div>
      </div>
    </div>
  );
}
