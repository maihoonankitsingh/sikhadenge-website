"use client";

import { useMemo, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type CreateOrderResponse = {
  success: boolean;
  collectionId: string;
  orderId: string;
  amount: number;
  currency: string;
  key: string;
  brandName: string;
};

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (
      document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      )
    ) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function FeesCollectionPage() {
  const [studentName, setStudentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successData, setSuccessData] = useState<null | {
    paymentId: string;
    orderId: string;
    amount: number;
  }>(null);

  const numericAmount = Number(amount);

  const isValid = useMemo(() => {
    return (
      studentName.trim().length >= 2 &&
      /^[0-9]{10}$/.test(phoneNumber.trim()) &&
      batchNumber.trim().length >= 1 &&
      Number.isFinite(numericAmount) &&
      numericAmount >= 1
    );
  }, [studentName, phoneNumber, batchNumber, numericAmount]);

  async function handlePay() {
    setMessage("");
    setSuccessData(null);

    if (!isValid) {
      setMessage(
        "Please fill valid name, 10-digit phone number, batch number, and payable amount."
      );
      return;
    }

    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        setMessage("Razorpay checkout failed to load. Please refresh and try again.");
        setLoading(false);
        return;
      }

      const createOrderRes = await fetch("/api/fees/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: studentName.trim(),
          phoneNumber: phoneNumber.trim(),
          batchNumber: batchNumber.trim().toUpperCase(),
          amount: numericAmount,
        }),
      });

      const createOrderData:
        | CreateOrderResponse
        | {
            error?: string;
          } = await createOrderRes.json();

      if (
        !createOrderRes.ok ||
        !("success" in createOrderData) ||
        !createOrderData.success
      ) {
        setMessage(
          (createOrderData as { error?: string }).error ||
            "Unable to create payment order."
        );
        setLoading(false);
        return;
      }

      const options = {
        key: createOrderData.key,
        amount: createOrderData.amount,
        currency: createOrderData.currency,
        name: createOrderData.brandName,
        description: "Installment Fee Payment",
        order_id: createOrderData.orderId,
        prefill: {
          name: studentName.trim(),
          contact: phoneNumber.trim(),
        },
        theme: {
          color: "#2563EB",
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            const verifyRes = await fetch("/api/fees/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                collectionId: createOrderData.collectionId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData?.success) {
              setMessage(verifyData?.error || "Payment verification failed.");
              return;
            }

            setSuccessData({
              paymentId: verifyData.paymentId,
              orderId: verifyData.orderId,
              amount: verifyData.amount,
            });

            setMessage("Payment received successfully.");
            setStudentName("");
            setPhoneNumber("");
            setBatchNumber("");
          } catch {
            setMessage(
              "Payment completed but verification request failed. Please contact support."
            );
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch {
      setMessage("Something went wrong while starting the payment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 text-[#0F172A]">
      <div className="mx-auto max-w-xl">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(2,6,23,0.08)]">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="inline-flex items-center rounded-full border border-[#F5B301]/30 bg-[#F5B301]/10 px-3 py-1 text-xs font-medium text-[#B77900]">
              Sikhadenge Fee Collection
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#0F172A]">
              Installment Payment
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Fill your details and enter the amount you want to pay for this installment.
            </p>
          </div>

          <div className="space-y-5 px-6 py-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                Full Name
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter full name"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-[#0F172A] outline-none placeholder:text-slate-400 focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                Phone Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="Enter 10-digit phone number"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-[#0F172A] outline-none placeholder:text-slate-400 focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                Batch Number
              </label>
              <input
                type="text"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                placeholder="Enter batch number"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-[#0F172A] outline-none placeholder:text-slate-400 focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                Payable Amount
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ""))}
                placeholder="Select or type amount"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-[#0F172A] outline-none placeholder:text-slate-400 focus:border-[#2563EB]"
              />
              <p className="mt-2 text-xs text-slate-500">
                Enter the installment amount you want to collect in INR.
              </p>
            </div>

            <button
              onClick={handlePay}
              disabled={!isValid || loading}
              className="w-full rounded-2xl bg-[#2563EB] px-4 py-3 font-semibold text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Processing..." : "Pay & Submit"}
            </button>

            {message ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {message}
              </div>
            ) : null}

            {successData ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm">
                <div className="font-semibold text-emerald-700">
                  Payment Successful
                </div>
                <div className="mt-2 text-emerald-700">
                  Payment ID: {successData.paymentId}
                </div>
                <div className="text-emerald-700">
                  Order ID: {successData.orderId}
                </div>
                <div className="text-emerald-700">
                  Amount: ₹{(successData.amount / 100).toLocaleString("en-IN")}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
