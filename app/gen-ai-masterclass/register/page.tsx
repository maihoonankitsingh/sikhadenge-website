import { redirect } from "next/navigation"; type SearchParams = { [key: string]: string | string[] | undefined;
}; function buildQuery(searchParams: SearchParams) { const qs = new URLSearchParams(); for (const [key, value] of Object.entries(searchParams || {})) { if (typeof value === "string" && value.trim()) { qs.set(key, value); } else if (Array.isArray(value) && value[0]?.trim()) { qs.set(key, value[0]); } } return qs.toString();
} export default function GenAiRegisterRedirectPage({ searchParams,
}: { searchParams: SearchParams;
}) { const query = buildQuery(searchParams || {}); redirect( query ? `/gen-ai-masterclass/register-one-step?${query}` : "/gen-ai-masterclass/register-one-step" );
}
