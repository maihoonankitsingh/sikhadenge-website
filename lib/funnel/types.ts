export type FunnelProduct = "chatgpt" | "claude";
export type OfferMode = "free" | "paid";

export type FunnelOutcome = {
  title: string;
  description: string;
};

export type FunnelDemo = {
  eyebrow: string;
  title: string;
  description: string;
};

export type FunnelAudience = {
  title: string;
  description: string;
};

export type FunnelFaq = {
  question: string;
  answer: string;
};

export type FunnelConfig = {
  id: string;
  batchId: string;
  product: FunnelProduct;
  offerMode: OfferMode;
  entryPrice: number;
  productLabel: string;
  badge: string;
  theme: "blue" | "amber";
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  dateLabel: string;
  timeLabel: string;
  languageLabel: string;
  durationLabel: string;
  ctaLabel: string;
  problemTitle: string;
  problemDescription: string;
  outcomes: FunnelOutcome[];
  demos: FunnelDemo[];
  audiences: FunnelAudience[];
  bonuses: string[];
  faqs: FunnelFaq[];
  workshopName: string;
  workshopPrice: number;
  workshopRegularPrice: number;
};
