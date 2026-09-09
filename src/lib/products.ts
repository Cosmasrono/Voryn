export type Product = {
  slug: string;
  name: string;
  short: string;
  image: string;
  category: string;
  headline: string;
  summary: string;
  min: number;
  max: number;
  tenure: string;
  tenureShort: string;
  disbursement: string;
  /** Indicative monthly service fee used by the loan calculator (illustrative only). */
  rateMonthly: number;
  tenureUnit: "days" | "months";
  tenureOptions: number[];
  flagship?: boolean;
  featured?: boolean;
  bestFor: string[];
  uses: string[];
  features: string[];
  accent: "navy" | "gold" | "teal" | "rose" | "green";
};

export const products: Product[] = [
  {
    slug: "voryn-biashara",
    rateMonthly: 0.06,
    tenureUnit: "months",
    tenureOptions: [1, 2, 3, 4, 6],
    image: "/images/hardware-shop.jpg",
    name: "Voryn Biashara",
    short: "Working Capital Loan",
    category: "Flagship",
    flagship: true,
    featured: true,
    headline: "The everyday engine for your business.",
    summary:
      "Our flagship unsecured working-capital loan for traders and growing SMEs. Restock inventory, pay suppliers, and close short-term cash-flow gaps - with a credit limit that grows every time you repay.",
    min: 10000,
    max: 250000,
    tenure: "1 – 6 months",
    tenureShort: "1–6 mo",
    disbursement: "Instant M-Pesa disbursement",
    accent: "navy",
    bestFor: [
      "Retail shops & wholesalers",
      "Salons, restaurants & hardware",
      "Distributors & small manufacturers",
      "Informal businesses going formal",
    ],
    uses: [
      "Stock & inventory",
      "Supplier payments",
      "Seasonal restocking",
      "Short-term cash-flow gaps",
    ],
    features: [
      "Unsecured - no collateral required",
      "Graduated credit: KES 20K → 50K → 100K → 200K+",
      "Progressive limits based on repayment history",
      "Basic business-skills training with your first loan",
    ],
  },
  {
    slug: "voryn-daily-trader",
    rateMonthly: 0.12,
    tenureUnit: "days",
    tenureOptions: [7, 14],
    image: "/images/market-mackinnon.jpg",
    name: "Voryn Daily Trader",
    short: "Ultra-Short Quick Loan",
    category: "Quick cash",
    featured: true,
    headline: "Capital that moves as fast as your stock.",
    summary:
      "Built for high-turnover traders who buy and sell daily. Get very quick capital with same-day approval for repeat clients and repayment options that match your cash flow.",
    min: 3000,
    max: 30000,
    tenure: "7 – 14 days",
    tenureShort: "1–2 wks",
    disbursement: "Same-day for repeat clients",
    accent: "gold",
    bestFor: [
      "Fresh-produce sellers",
      "Roadside & kiosk traders",
      "Market vendors",
      "Daily buy-and-sell hustles",
    ],
    uses: ["Daily stock purchase", "Quick top-ups", "Weekly restock", "Emergency trade cash"],
    features: [
      "Ultra-fast approval - often same day",
      "Flexible daily or weekly repayment",
      "Perfect for weekly trading cycles",
      "Builds history toward Voryn Biashara",
    ],
  },
  {
    slug: "voryn-mama-biashara",
    rateMonthly: 0.055,
    tenureUnit: "days",
    tenureOptions: [21, 30, 45],
    image: "/images/market-women.jpg",
    name: "Voryn Mama Biashara",
    short: "Women-Focused Loan",
    category: "Women in business",
    featured: true,
    headline: "Backing the women who move the market.",
    summary:
      "A product designed around female micro-entrepreneurs - with priority processing, gender-sensitive coaching, and flexible entry criteria for first-time rural women borrowers.",
    min: 5000,
    max: 100000,
    tenure: "21 – 45 days",
    tenureShort: "3–6 wks",
    disbursement: "Priority M-Pesa processing",
    accent: "rose",
    bestFor: [
      "Market & stall vendors",
      "Home-based producers",
      "Informal service providers",
      "First-time rural women borrowers",
    ],
    uses: ["Stock & supplies", "Working capital", "Business expansion", "Seasonal demand"],
    features: [
      "Priority application processing",
      "Gender-sensitive business coaching",
      "Flexible entry criteria for first-timers",
      "Supportive local relationship officers",
    ],
  },
  {
    slug: "voryn-growth",
    rateMonthly: 0.035,
    tenureUnit: "months",
    tenureOptions: [3, 6, 9, 12, 18],
    image: "/images/nairobi-skyline.jpg",
    name: "Voryn Growth",
    short: "SME Growth Loan",
    category: "Premium SME",
    featured: true,
    headline: "For businesses ready for the next level.",
    summary:
      "Our premium unsecured SME product for enterprises with proven turnover and repayment capacity. Fund expansion, new branches, equipment and staff - with financing that scales up to KES 1 million.",
    min: 100000,
    max: 1000000,
    tenure: "3 – 18 months",
    tenureShort: "3–18 mo",
    disbursement: "Structured drawdown",
    accent: "teal",
    bestFor: [
      "Established SMEs with steady turnover",
      "Multi-branch retailers",
      "Growing distributors & suppliers",
      "Businesses graduating from Voryn Biashara",
    ],
    uses: [
      "Expansion & new branches",
      "Equipment & machinery",
      "Staff & supplier financing",
      "Marketing & scaling stock",
    ],
    features: [
      "High limits up to KES 1,000,000",
      "Longer, flexible 3–18 month tenures",
      "Unsecured for qualifying businesses",
      "Dedicated growth advisory support",
    ],
  },
  {
    slug: "voryn-agri-boost",
    rateMonthly: 0.045,
    tenureUnit: "days",
    tenureOptions: [30, 60, 90],
    image: "/images/smallholder-farmers.jpg",
    name: "Voryn Agri-Boost",
    short: "Seasonal Agri Loan",
    category: "Agriculture",
    featured: true,
    headline: "Finance that follows the seasons.",
    summary:
      "Seasonal financing for smallholder farmers and rural agri-businesses. Repayment schedules align to your crop and livestock cycles, so you pay when your harvest sells.",
    min: 10000,
    max: 200000,
    tenure: "30 – 90 days",
    tenureShort: "1–3 mo",
    disbursement: "Cycle-aligned disbursement",
    accent: "green",
    bestFor: [
      "Smallholder farmers",
      "Livestock keepers",
      "Agri-input traders",
      "Produce transporters",
    ],
    uses: ["Farm inputs & seed", "Transport to market", "Small equipment", "Livestock & feed"],
    features: [
      "Repayment matched to harvest cycles",
      "Aligned to crop or livestock seasons",
      "Basic agri-business guidance included",
      "Flexible 30–90 day terms",
    ],
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

export function formatKES(n: number): string {
  return "KES " + n.toLocaleString("en-KE");
}
