export function normalizeAffiliateCodeInput(value: string) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

export function buildAffiliateCode(name: string, phone?: string | null) {
  const cleanedName = normalizeAffiliateCodeInput(name).replace(/-/g, "");
  const base = cleanedName.slice(0, 8) || "PARTNER";
  const last4 = (phone || "").replace(/\D/g, "").slice(-4) || "0001";
  return `AFF-${base}-${last4}`;
}

export function buildAffiliateCodeWithSuffix(
  name: string,
  phone?: string | null,
  suffix?: number
) {
  const base = buildAffiliateCode(name, phone);
  if (!suffix || suffix <= 1) return base;
  return `${base}-${suffix}`;
}
