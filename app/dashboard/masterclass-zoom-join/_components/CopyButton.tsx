"use client"; import { useState } from "react";
import { Check, Copy } from "lucide-react"; type Props = { value: string;
}; export default function CopyButton({ value }: Props) { const [copied, setCopied] = useState(false); async function handleCopy() { try { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {} } if (!value || value === "-") return null; return ( <button type="button" onClick={handleCopy} className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-800" title={copied ? "Copied" : "Copy"} > {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} </button> );
}
