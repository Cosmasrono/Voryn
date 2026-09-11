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
  /** True if this is the required entry loan for all first-time / new clients */
  isStarterProduct?: boolean;
  /** Progression tier in the graduation pathway */
  graduationTier: "Starter (New Clients)" | "Level 2: Build Trust" | "Level 3: Asset & Scale";
  /** Plain-language explanation of how new and returning clients access this facility */
  graduationNotice: string;
  /** Productive assets targeted by this loan (if applicable) */
  targetAsset?: string;
};

export const products: Product[] = [
  {
    slug: "voryn-biashara",
    rateMonthly: 0.06,
    tenureUnit: "days",
    tenureOptions: [7, 14, 21, 30],
    image: "/images/hardware-shop.jpg",
    name: "Voryn Biashara",
    short: "Everyday Business Starter Loan",
    category: "Starter Product • Direct Entry",
    flagship: true,
    featured: true,
    isStarterProduct: true,
    graduationTier: "Starter (New Clients)",
    graduationNotice:
      "Open to all new and returning clients. This is the official starting loan for every new business owner at Voryn. Repay on time to build your trust record and automatically graduate to higher limits and specialized products.",
    headline: "The foundational engine for your everyday enterprise.",
    summary:
      "Our core unsecured working-capital loan for retail shops, market stalls, salons, and growing traders. Restock shelves, settle supplier invoices, and smooth out daily cash flow - with a credit line that grows every time you repay on schedule.",
    min: 10000,
    max: 20000,
    tenure: "7 – 30 days",
    tenureShort: "7–30 days",
    disbursement: "Instant M-Pesa disbursement",
    accent: "navy",
    bestFor: [
      "Retail shops, mini-marts & wholesalers",
      "Salons, barbershops & hardware stores",
      "Market traders & distributors",
      "First-time borrowers building a verified track record",
    ],
    uses: [
      "Stock & fast-moving inventory",
      "Immediate supplier payments",
      "Seasonal restocking",
      "Covering short-term cash gaps",
    ],
    features: [
      "Starter loan: open to every verified new business client",
      "100% Unsecured - no title deeds or logbooks required",
      "Stepped limit growth: KES 10,000 → 15,000 → 20,000",
      "Direct pathway to unlock Chama, Agri-Boost, Growth, and Asset loans",
    ],
  },
  {
    slug: "voryn-chama",
    rateMonthly: 0.05,
    tenureUnit: "months",
    tenureOptions: [1, 2, 3],
    image: "/images/chama-group.jpg",
    name: "Voryn Chama",
    short: "Group & Table-Banking Loan",
    category: "Graduation Loan • Groups",
    featured: true,
    isStarterProduct: false,
    graduationTier: "Level 2: Build Trust",
    graduationNotice:
      "Graduation Product: Available once your group has established meeting records or individual group members have successfully completed a Voryn Biashara cycle.",
    headline: "Collective power for group savings and joint enterprise.",
    summary:
      "Designed specifically for chamas, table-banking circles, and trade associations. Pool your group's mutual guarantee to access KES 10,000 to 30,000 for bulk stock purchases, joint investments, or emergency group liquidity.",
    min: 10000,
    max: 30000,
    tenure: "1 – 3 months",
    tenureShort: "1–3 mo",
    disbursement: "Direct to Chama treasury M-Pesa",
    accent: "gold",
    bestFor: [
      "Registered chamas & merry-go-round groups",
      "Table-banking community investment circles",
      "Market vendor cooperatives",
      "Joint retail purchasing groups",
    ],
    uses: [
      "Bulk purchasing for group discounts",
      "Table-banking lending pool top-up",
      "Joint agricultural or trade investments",
      "Community project working capital",
    ],
    features: [
      "Affordable KES 10,000 – 30,000 group capital",
      "Flexible 1 – 3 months repayment matched to group meetings",
      "Mutual social guarantee — no individual land collateral",
      "Dedicated relationship officer to attend group sessions",
    ],
  },
  {
    slug: "voryn-mama-biashara",
    rateMonthly: 0.055,
    tenureUnit: "days",
    tenureOptions: [7, 14, 21, 30],
    image: "/images/market-women.jpg",
    name: "Voryn Mama Biashara",
    short: "Women-Focused Trade Loan",
    category: "Graduation Loan • Women in Business",
    featured: true,
    isStarterProduct: false,
    graduationTier: "Level 2: Build Trust",
    graduationNotice:
      "Graduation Product: Tailored priority processing for female traders and stallholders who have completed an initial borrowing cycle or hold a verified trade stall.",
    headline: "Backing the women who move the market forward.",
    summary:
      "A dedicated product shaped around female micro-entrepreneurs - offering priority processing, supportive business coaching, and adaptable terms for market vendors, tailors, and food producers.",
    min: 5000,
    max: 50000,
    tenure: "7 – 30 days",
    tenureShort: "7–30 days",
    disbursement: "Priority M-Pesa processing",
    accent: "rose",
    bestFor: [
      "Market stall vendors & mama mbogas",
      "Home-based food and clothing producers",
      "Salons & beauty specialists",
      "Female business owners growing their trade",
    ],
    uses: [
      "Daily & weekly fresh inventory",
      "Stall expansion & display shelves",
      "Supplies & equipment purchase",
      "Holiday and festive rush orders",
    ],
    features: [
      "Fast priority application reviews",
      "Free practical record-keeping and cash-flow coaching",
      "Flexible 7 to 30 day repayment intervals",
      "Friendly female relationship managers on the ground",
    ],
  },
  {
    slug: "voryn-agri-boost",
    rateMonthly: 0.045,
    tenureUnit: "days",
    tenureOptions: [30, 60, 90],
    image: "/images/smallholder-farmers.jpg",
    name: "Voryn Agri-Boost",
    short: "Seasonal Farm & Harvest Loan",
    category: "Graduation Loan • Agriculture",
    featured: true,
    isStarterProduct: false,
    graduationTier: "Level 2: Build Trust",
    graduationNotice:
      "Graduation Product: Unlocked as you build your repayment track record. Terms are synchronized to your planting, milking, and harvest cycles.",
    headline: "Farm finance synchronized with the seasons.",
    summary:
      "Targeted seasonal financing for smallholder farmers, dairy keepers, and rural agri-traders. Borrow between KES 5,000 and 20,000 to buy certified seeds, fertilizer, feeds, or pay for transport when prices are best.",
    min: 5000,
    max: 20000,
    tenure: "30 – 90 days",
    tenureShort: "30–90 days",
    disbursement: "Direct to M-Pesa before planting/harvest",
    accent: "green",
    bestFor: [
      "Smallholder horticulture & grain farmers",
      "Dairy and poultry farmers",
      "Agri-input retailers & seed suppliers",
      "Farm produce transporters & aggregation brokers",
    ],
    uses: [
      "Certified seeds, fertilizer & crop protection",
      "Animal feeds, supplements & vet care",
      "Leasing irrigation pumps & harvesting labor",
      "Transporting produce to urban markets",
    ],
    features: [
      "Accessible KES 5,000 – 20,000 seasonal capital",
      "30 – 90 days repayment period aligned to harvest yields",
      "No land deed demanded — assessed on farm output & trade history",
      "Field visits and practical guidance from local officers",
    ],
  },
  {
    slug: "voryn-growth",
    rateMonthly: 0.04,
    tenureUnit: "days",
    tenureOptions: [30, 60, 90],
    image: "/images/nairobi-skyline.jpg",
    name: "Voryn Growth",
    short: "Enterprise Scale-Up Loan",
    category: "Graduation Loan • Scale-Up",
    featured: true,
    isStarterProduct: false,
    graduationTier: "Level 3: Asset & Scale",
    graduationNotice:
      "Graduation Product: Reserved for enterprises that have proven their creditworthiness through consistent on-time repayments on Voryn Biashara.",
    headline: "For established businesses ready to leap to the next tier.",
    summary:
      "Scale-up financing for businesses with proven daily turnover. Restock in bulk for maximum supplier discounts, open an additional sales counter, or manage high-volume orders with KES 21,000 to 100,000 in fast liquidity.",
    min: 21000,
    max: 100000,
    tenure: "30 – 90 days",
    tenureShort: "30–90 days",
    disbursement: "Fast structured disbursement",
    accent: "teal",
    bestFor: [
      "Established shops & multi-counter retailers",
      "Growing distributors & fast-moving suppliers",
      "Service businesses handling larger contracts",
      "Graduated Voryn Biashara clients with top-tier ratings",
    ],
    uses: [
      "Bulk container and wholesale orders",
      "Opening second counters or kiosks",
      "Hiring seasonal support staff",
      "Fulfilling commercial supply contracts",
    ],
    features: [
      "Substantial working capital from KES 21,000 to 100,000",
      "30 to 90 days repayment tailored to rapid turnover",
      "Fast-track approvals for verified repeat entrepreneurs",
      "Dedicated senior portfolio manager support",
    ],
  },
  {
    slug: "voryn-asset-loan",
    rateMonthly: 0.035,
    tenureUnit: "months",
    tenureOptions: [1, 3, 6, 9, 12],
    image: "/images/asset-loan.jpg",
    name: "Voryn Asset Loan",
    short: "Productive Asset & Equipment Loan",
    category: "Graduation Loan • Asset Finance",
    featured: true,
    isStarterProduct: false,
    graduationTier: "Level 3: Asset & Scale",
    targetAsset: "Productive business assets, commercial equipment, workshop machinery, tools, and vehicles/motorcycles",
    graduationNotice:
      "Graduation Product: Unlocked for trusted business owners ready to acquire revenue-generating equipment, commercial machinery, tools, or delivery motorcycles.",
    headline: "Invest in productive machinery, equipment, tools, and vehicles that multiply your daily profit.",
    summary:
      "Empowering small businesses and independent operators to own productive assets tailored to their needs. Finance workshop machinery, commercial refrigeration, posho mill motors, tailoring gear, salon equipment, or delivery motorcycles (boda boda) from KES 10,000 to 150,000 with 1 to 12 months to pay.",
    min: 10000,
    max: 150000,
    tenure: "1 – 12 months",
    tenureShort: "1–12 mo",
    disbursement: "Direct supplier settlement or direct cash disbursement",
    accent: "navy",
    bestFor: [
      "Entrepreneurs acquiring equipment, tools, and income-generating assets",
      "Carpenters, metal fabricators & workshop owners needing industrial tools",
      "Butcheries, grocers & eateries needing commercial chillers & catering gear",
      "Tailoring & beauty specialists acquiring specialized equipment",
      "Boda boda operators & courier delivery riders financing motorcycles",
    ],
    uses: [
      "Commercial deep freezers, milk coolers & display units",
      "Welding sets, generators, lathes & workshop machinery",
      "Industrial sewing machines & salon workstations",
      "Posho mill electric motors, water pumps & processing machinery",
      "New or certified delivery motorcycles (boda boda) & logistics transport",
    ],
    features: [
      "Generous capital from KES 10,000 up to KES 150,000",
      "Comfortable 1 to 12 months tenure with predictable monthly installments",
      "Asset acts as primary productive security — no land title required",
      "Ownership automatically transfers 100% to you upon final repayment",
    ],
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

export function formatKES(n: number): string {
  return "KES " + n.toLocaleString("en-KE");
}
