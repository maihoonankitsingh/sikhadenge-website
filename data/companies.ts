export type Company = { name: string; sources: string[]; fallback: string };

const base = (n: string) => [
  `/images/companies/${n}.svg`,
  `/images/companies/${n}.png`,
  `/images/companies/${n}.jpg`,
  `/images/companies/${n}.jpeg`,
];

export const companies: Company[] = [
  { name: "Apple", sources: base("apple"), fallback: "/images/companies/fallback.svg" },
  { name: "Blinkit", sources: base("blinkit"), fallback: "/images/companies/fallback.svg" },
  { name: "BookMyShow", sources: base("bookmyshow"), fallback: "/images/companies/fallback.svg" },
  { name: "Crunchbase", sources: base("crunchbase"), fallback: "/images/companies/fallback.svg" },
  { name: "EaseMyTrip", sources: base("easemytrip"), fallback: "/images/companies/fallback.svg" },
  { name: "Fractal", sources: base("fractal"), fallback: "/images/companies/fallback.svg" },
  { name: "Juspay", sources: base("juspay"), fallback: "/images/companies/fallback.svg" },
  { name: "Khetyi", sources: base("khetyi"), fallback: "/images/companies/fallback.svg" },
  { name: "KukuFM", sources: base("kukufm"), fallback: "/images/companies/fallback.svg" },
  { name: "Okta", sources: base("okta"), fallback: "/images/companies/fallback.svg" },
  { name: "Oracle", sources: base("oracle"), fallback: "/images/companies/fallback.svg" },
  { name: "Oyo", sources: base("oyo"), fallback: "/images/companies/fallback.svg" },
  { name: "Paytm", sources: base("paytm"), fallback: "/images/companies/fallback.svg" },
  { name: "Phonepe", sources: base("phonepe"), fallback: "/images/companies/fallback.svg" },
  { name: "Pocket FM", sources: base("pocketfm"), fallback: "/images/companies/fallback.svg" },
  { name: "Rapido", sources: base("rapido"), fallback: "/images/companies/fallback.svg" },
  { name: "Razorpay", sources: base("razorpay"), fallback: "/images/companies/fallback.svg" },
  { name: "redBus", sources: base("redbus"), fallback: "/images/companies/fallback.svg" },
  { name: "Swiggy", sources: base("swiggy"), fallback: "/images/companies/fallback.svg" },
  { name: "Tata CLiQ", sources: base("tatacliq"), fallback: "/images/companies/fallback.svg" },
  { name: "Tech Mahindra", sources: base("techmahindra"), fallback: "/images/companies/fallback.svg" },
  { name: "Typeform", sources: base("typeform"), fallback: "/images/companies/fallback.svg" },
  { name: "Unacademy", sources: base("unacademy"), fallback: "/images/companies/fallback.svg" },
  { name: "Uplers", sources: base("uplers"), fallback: "/images/companies/fallback.svg" },
  { name: "Vimeo", sources: base("vimeo"), fallback: "/images/companies/fallback.svg" },
  { name: "Zerodha", sources: base("zerodha"), fallback: "/images/companies/fallback.svg" },
  { name: "Zomato", sources: base("zomato"), fallback: "/images/companies/fallback.svg" },
];
