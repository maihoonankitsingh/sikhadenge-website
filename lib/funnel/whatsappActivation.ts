import { prisma } from "../prisma";
import { sendRegistrationToWhatsAppAgent } from "./whatsappAgent";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function parseNotes(value: string | null): Record<string, unknown> {
  if (!value) return {};
  try {
    return asRecord(JSON.parse(value));
  } catch {
    return {};
  }
}

function text(value: unknown, max = 300) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function activateExistingWhatsAppMasterclass(leadId: string) {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { id: true, name: true, phone: true, source: true, notes: true },
  });
  if (!lead) return { attempted: false, ok: false, error: "Lead not found" };

  const notes = parseNotes(lead.notes);
  const consentRecord = asRecord(notes.consent);
  const consent = consentRecord.whatsappMasterclass === true || notes.whatsappConsent === true;
  if (!consent) {
    return { attempted: false, ok: false, error: "Stored WhatsApp masterclass consent is missing" };
  }

  const name = text(lead.name, 160);
  const phone = text(lead.phone, 40);
  const email = text(notes.email, 220);
  if (!name) return { attempted: false, ok: false, error: "Stored lead name is missing" };
  if (!phone) return { attempted: false, ok: false, error: "Stored lead phone is missing" };
  if (!email) return { attempted: false, ok: false, error: "Stored lead email is missing" };

  return sendRegistrationToWhatsAppAgent({
    registrationId: lead.id,
    name,
    phone,
    email,
    city: text(notes.city, 120),
    source: lead.source || "funnel:paid-masterclass",
    consent: true,
  });
}
