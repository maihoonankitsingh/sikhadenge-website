export const siteConfig = {
  name: "Sikhadenge",
  shortName: "Sikhadenge",
  url: "https://sikhadenge.in",
  domain: "sikhadenge.in",
  email: "support@sikhadenge.in",
  phone: "+91-8808505575",
  ogImage: "/og/sikhadenge-og.jpg",
  logo: "/logo.png",

  title: "Sikhadenge",
  titleTemplate: "%s | Sikhadenge",

  defaultTitle:
    "Sikhadenge | AI Expert Professional Program in India",

  description:
    "Sikhadenge helps students, freelancers, creators, and beginners learn practical AI skills across AI design, AI video creation, AI content creation, AI marketing assets, AI websites, and AI automation workflows.",

  keywords: [
    "AI course India",
    "AI tools course",
    "AI Expert Professional Program",
    "AI skills for beginners",
    "AI design course",
    "AI video creation course",
    "AI content creation course",
    "AI marketing course",
    "AI automation course",
    "AI website building course",
    "learn AI tools",
    "AI workflows",
    "AI tools for students",
    "AI tools for freelancers",
    "AI course for content creators",
    "Sikhadenge"
  ],

  authors: [
    { name: "Sikhadenge", url: "https://sikhadenge.in" }
  ],

  creator: "Sikhadenge",
  publisher: "Sikhadenge",

  social: {
    instagram: "https://instagram.com/sikhadenge.ai",
    linkedin: "https://linkedin.com/company/sikhadenge",
  },

  program: {
    name: "AI Expert Professional Program",
    duration: "8 Weeks",
    offerPrice: "4999",
    originalPrice: "25000",
    currency: "INR",
  },
} as const;

export function absoluteUrl(path: string = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath}`;
}
