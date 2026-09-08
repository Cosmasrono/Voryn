import { products, formatKES } from "./products";
import { site } from "./site";

export interface BotResponse {
  content: string;
  source?: "ai" | "engine";
}

// Extract numerical values from user query (e.g. "50k", "50,000", "20000", "1m", "1 million")
function extractAmount(text: string): number | null {
  const clean = text.toLowerCase().replace(/,/g, "");
  
  // Matches "1.5m", "1m", "1 million"
  const millionMatch = clean.match(/(\d+(?:\.\d+)?)\s*(?:m|million)/);
  if (millionMatch) return Math.round(parseFloat(millionMatch[1]) * 1000000);

  // Matches "50k", "50 k", "250k"
  const kMatch = clean.match(/(\d+(?:\.\d+)?)\s*k\b/);
  if (kMatch) return Math.round(parseFloat(kMatch[1]) * 1000);

  // Matches pure numbers e.g. "50000", "kes 20000"
  const numMatch = clean.match(/(?:kes|ksh|sh|shs)?\s*(\d{4,7})\b/);
  if (numMatch) return parseInt(numMatch[1], 10);

  return null;
}

// Predict the best loan product for a specific amount
function predictLoanForAmount(amount: number): string {
  const matching = products.filter((p) => amount >= p.min && amount <= p.max);
  if (matching.length === 0) {
    if (amount < 3000) {
      return `Our minimum loan starts at **KES 3,000** for **Voryn Daily Trader** (7–14 days for quick market turnover). For larger business needs up to **KES 250,000**, our flagship **Voryn Biashara** loan is ideal.\n\nWould you like to apply for KES 3,000 or talk to an officer on **${site.phone}**?`;
    }
    return `For amounts above KES 250,000, our **Voryn Growth** loan covers up to **KES 1,000,000** for qualifying enterprises (3–18 months tenure).\n\nCall our credit team directly on **${site.phone}** or WhatsApp us to structure this facility.`;
  }

  let text = `For **${formatKES(amount)}**, here are the best loan options:\n\n`;
  matching.forEach((p) => {
    text += `• **${p.name}** (${p.short})\n  - Amount: ${formatKES(p.min)} – ${formatKES(p.max)}\n  - Tenure: ${p.tenure}\n  - Disbursement: ${p.disbursement}\n  - Best for: ${p.bestFor[0]}\n\n`;
  });

  text += `⚡ **Fast M-Pesa disbursement** with no collateral required.\nCall or WhatsApp us on **${site.phone}** to get started today!`;
  return text;
}

export function generateLocalBotReply(messages: { role: string; content: string }[]): string {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const query = lastUserMsg.trim().toLowerCase();

  // 1. Amount prediction
  const detectedAmount = extractAmount(query);
  const mentionsNeedOrWant = /(need|want|borrow|qualify|loan of|give me|nipatie|nahitaji|mkopo wa|how much)/i.test(query);
  if (detectedAmount && (mentionsNeedOrWant || query.length < 25)) {
    return predictLoanForAmount(detectedAmount);
  }

  // 2. Location / Office / Where are you
  if (
    query.includes("where") ||
    query.includes("location") ||
    query.includes("located") ||
    query.includes("address") ||
    query.includes("office") ||
    query.includes("mko wapi") ||
    query.includes("mahali") ||
    query.includes("directions") ||
    query.includes("visit")
  ) {
    return `📍 **Our Location:**\n**${site.name}** is headquartered at:\n🏢 **${site.address}**\n\n⏰ **Office Hours:** ${site.hours}\n\n📞 **Phone / WhatsApp:** **${site.phone}**\n✉️ **Email:** ${site.email}\n\nOur relationship officers also visit businesses and markets across Nairobi and surrounding counties! Would you like an officer to reach out?`;
  }

  // 3. What loans do you offer / All products
  if (
    query.includes("what loans") ||
    query.includes("which loans") ||
    query.includes("loan products") ||
    query.includes("types of loan") ||
    query.includes("list of loans") ||
    query.includes("offer") ||
    query.includes("mikopo gani") ||
    query.includes("bidhaa")
  ) {
    return `We offer **5 tailored loan products** with instant M-Pesa disbursement:\n\n` +
      `1. 🏪 **Voryn Biashara** (KES 10,000 – 250,000 | 1–6 months)\n` +
      `   Our flagship unsecured working-capital loan for retail shops, salons, wholesale, and SMEs.\n\n` +
      `2. ⚡ **Voryn Daily Trader** (KES 3,000 – 30,000 | 7–14 days)\n` +
      `   Ultra-short quick capital for market vendors, kiosk owners, and daily hustlers.\n\n` +
      `3. 🌸 **Voryn Mama Biashara** (KES 5,000 – 100,000 | 21–45 days)\n` +
      `   Tailored for female entrepreneurs with priority processing and supportive coaching.\n\n` +
      `4. 🚀 **Voryn Growth** (KES 100,000 – 1,000,000 | 3–18 months)\n` +
      `   For established SMEs funding expansion, stock scaling, and equipment.\n\n` +
      `5. 🌱 **Voryn Agri-Boost** (KES 10,000 – 200,000 | 30–90 days)\n` +
      `   Seasonal crop and livestock financing aligned with your harvest cycles.\n\n` +
      `Which of these matches your business? Or tell me how much you need!`;
  }

  // 4. Specific product queries
  if (query.includes("mama biashara") || query.includes("women") || query.includes("mama")) {
    const p = products.find((x) => x.slug === "voryn-mama-biashara")!;
    return `🌸 **${p.name}** (${p.short}):\n\n` +
      `• **Limit:** ${formatKES(p.min)} – ${formatKES(p.max)}\n` +
      `• **Tenure:** ${p.tenure}\n` +
      `• **Disbursement:** ${p.disbursement}\n` +
      `• **Best for:** ${p.bestFor.join(", ")}\n` +
      `• **Highlights:** Priority M-Pesa processing, flexible entry criteria for first-time borrowers, and gender-sensitive business coaching.\n\n` +
      `Ready to apply? Call or WhatsApp us on **${site.phone}**!`;
  }

  if (query.includes("daily trader") || query.includes("daily") || query.includes("quick loan") || query.includes("short term") || query.includes("haraka")) {
    const p = products.find((x) => x.slug === "voryn-daily-trader")!;
    return `⚡ **${p.name}** (${p.short}):\n\n` +
      `• **Limit:** ${formatKES(p.min)} – ${formatKES(p.max)}\n` +
      `• **Tenure:** ${p.tenure} (1–2 weeks)\n` +
      `• **Disbursement:** ${p.disbursement}\n` +
      `• **Best for:** Fresh-produce vendors, roadside stalls, kiosk traders, and daily buy-and-sell hustles.\n` +
      `• **Features:** Ultra-fast approval, flexible daily or weekly repayments, and builds credit for larger loans.\n\n` +
      `Would you like to get quick stock capital today? Call **${site.phone}**!`;
  }

  if (query.includes("biashara") || query.includes("working capital")) {
    const p = products.find((x) => x.slug === "voryn-biashara")!;
    return `🏪 **${p.name}** (${p.short}):\n\n` +
      `• **Limit:** ${formatKES(p.min)} – ${formatKES(p.max)}\n` +
      `• **Tenure:** ${p.tenure}\n` +
      `• **Disbursement:** Instant M-Pesa disbursement\n` +
      `• **Features:** No collateral required! Graduated credit starting at KES 20K that scales to 50K → 100K → 200K+ as you repay on time.\n` +
      `• **Bonus:** Includes practical business-skills training.\n\n` +
      `Call or WhatsApp **${site.phone}** to apply!`;
  }

  if (query.includes("growth") || query.includes("1 million") || query.includes("1m") || query.includes("large") || query.includes("sme")) {
    const p = products.find((x) => x.slug === "voryn-growth")!;
    return `🚀 **${p.name}** (${p.short}):\n\n` +
      `• **Limit:** ${formatKES(p.min)} – ${formatKES(p.max)}\n` +
      `• **Tenure:** ${p.tenure}\n` +
      `• **Disbursement:** Structured drawdown\n` +
      `• **Best for:** Multi-branch retailers, growing distributors, and established SMEs.\n` +
      `• **Features:** Dedicated growth advisory support, competitive terms, and capital to finance equipment, staff, or new premises.\n\n` +
      `Speak with an SME portfolio manager on **${site.phone}**.`;
  }

  if (query.includes("agri") || query.includes("farm") || query.includes("farmer") || query.includes("kilimo") || query.includes("harvest") || query.includes("livestock") || query.includes("cows")) {
    const p = products.find((x) => x.slug === "voryn-agri-boost")!;
    return `🌱 **${p.name}** (${p.short}):\n\n` +
      `• **Limit:** ${formatKES(p.min)} – ${formatKES(p.max)}\n` +
      `• **Tenure:** ${p.tenure}\n` +
      `• **Disbursement:** Cycle-aligned disbursement\n` +
      `• **Best for:** Smallholder farmers, livestock keepers, agri-input dealers, and crop transporters.\n` +
      `• **Advantage:** Repayment is structured around when your harvest or livestock sells — you don't pay when your money is tied up in the field!\n\n` +
      `Apply today via **${site.phone}**.`;
  }

  // 5. How to apply / Requirements / Eligibility
  if (
    query.includes("how to apply") ||
    query.includes("how do i apply") ||
    query.includes("requirements") ||
    query.includes("eligibility") ||
    query.includes("qualify") ||
    query.includes("documents") ||
    query.includes("masharti") ||
    query.includes("vigezo") ||
    query.includes("application")
  ) {
    return `📋 **How to Apply & Requirements:**\n\n` +
      `**Simple Requirements:**\n` +
      `1. Valid Kenyan National ID.\n` +
      `2. Active M-Pesa registered phone number.\n` +
      `3. Active running business, trade, kiosk, or farming activity.\n` +
      `4. **No collateral** required for most micro & working-capital loans!\n\n` +
      `**3 Easy Ways to Apply:**\n` +
      `• **WhatsApp / Call:** Reach us directly at **${site.phone}**.\n` +
      `• **Online Form:** Visit our **Contact Page** on this site.\n` +
      `• **Relationship Officer:** An officer can visit your business premises or market stall.\n\n` +
      `Once approved, money is disbursed **instantly via M-Pesa**! Would you like us to call you back?`;
  }

  // 6. Interest rate / Fees / Charges
  if (
    query.includes("interest") ||
    query.includes("rate") ||
    query.includes("fee") ||
    query.includes("cost") ||
    query.includes("percentage") ||
    query.includes("riba") ||
    query.includes("gharama")
  ) {
    return `💰 **Interest Rates & Transparency:**\n\n` +
      `At Voryn Capital, we practice **100% transparent pricing** with zero hidden fees:\n` +
      `• Indicative monthly rates range from **3.5% to 6%** depending on the loan product, loan size, and tenure.\n` +
      `• For ultra-short loans like *Voryn Daily Trader*, terms are tailored for rapid 7–14 day turnovers.\n` +
      `• Every loan includes **free business advisory coaching**.\n\n` +
      `You can use our **Loan Calculator** on the home page or products page to estimate your payments, or call **${site.phone}** for an exact quote tailored to your cash flow!`;
  }

  // 7. Disbursement / Speed / How fast
  if (
    query.includes("disburse") ||
    query.includes("how fast") ||
    query.includes("how long") ||
    query.includes("mpesa") ||
    query.includes("speed") ||
    query.includes("haraka") ||
    query.includes("muda gani")
  ) {
    return `⚡ **Disbursement Speed:**\n\n` +
      `• All loans are disbursed **directly to your M-Pesa**.\n` +
      `• For repeat clients, approval and disbursement happen **same-day (within hours)**.\n` +
      `• For new applicants, our relationship officer reviews your cash flow quickly so you get funded without business interruptions.\n\n` +
      `Need urgent stock? Call us now on **${site.phone}**!`;
  }

  // 8. Collateral / Security
  if (query.includes("collateral") || query.includes("security") || query.includes("dhamana") || query.includes("title deed") || query.includes("logbook")) {
    return `🛡️ **Collateral Policy:**\n\n` +
      `**Most Voryn Capital loans are UNSECURED!**\n` +
      `• We do **not** demand title deeds or vehicle logbooks for our working-capital loans (like Voryn Biashara, Daily Trader, Mama Biashara, or Agri-Boost).\n` +
      `• We assess your eligibility based on real **cash flow, business activity, and trading turnover**.\n` +
      `• As you repay on time, your credit limit automatically grows!`;
  }

  // 9. Business Advisory
  if (query.includes("advisory") || query.includes("coaching") || query.includes("training") || query.includes("skills") || query.includes("mafunzo")) {
    return `📚 **Business Advisory Service:**\n\n` +
      `Every loan at Voryn Capital comes with **free hands-on business coaching**:\n` +
      `• 📊 **Cash-flow & record-keeping**: Track money in and out easily.\n` +
      `• 🏷️ **Pricing & profit**: Calculate real margins on every item.\n` +
      `• 📦 **Inventory management**: Avoid tied-up dead stock.\n` +
      `• 📱 **Digital payments**: Maximize M-Pesa for business.\n` +
      `• 👥 **1-on-1 coaching** with your local relationship officer.\n\n` +
      `Learn more on our **Advisory Page** or call **${site.phone}**!`;
  }

  // 10. Asset Management
  if (query.includes("asset") || query.includes("investment") || query.includes("machinery") || query.includes("equipment") || query.includes("vehicle") || query.includes("ufugaji")) {
    return `🏗️ **Asset Management & Equipment Finance:**\n\n` +
      `Through Voryn Capital (part of ${site.group}), we support enterprises graduating from micro-credit to long-term wealth:\n` +
      `• 🚜 **Asset & Equipment Finance**: Machinery, commercial vehicles, solar systems, and agricultural tools.\n` +
      `• 📈 **Portfolio Management**: Short-term capital solutions structured around business cycles.\n` +
      `• 🏢 **Strategic Expansion**: Financing premises and productive projects.\n\n` +
      `Visit our **Asset Management** page or contact our corporate desk on **${site.phone}**.`;
  }

  // 11. Contact / Phone / WhatsApp / Email
  if (query.includes("contact") || query.includes("phone") || query.includes("call") || query.includes("whatsapp") || query.includes("email") || query.includes("namba") || query.includes("piga simu")) {
    return `📞 **Contact Voryn Capital:**\n\n` +
      `• **Phone / WhatsApp:** [${site.phone}](tel:${site.phoneHref})\n` +
      `• **Email:** [${site.email}](mailto:${site.email})\n` +
      `• **Address:** ${site.address}\n` +
      `• **Hours:** ${site.hours}\n\n` +
      `Feel free to give us a call or send a WhatsApp message anytime!`;
  }

  // 12. Swahili / Sheng greetings
  if (
    query.includes("habari") ||
    query.includes("mambo") ||
    query.includes("sasa") ||
    query.includes("jambo") ||
    query.includes("niaje") ||
    query.includes("hujambo")
  ) {
    return `Salama! 👋 Mimi ni **Vori**, msaidizi wa **Voryn Capital**.\n\nTunatoa mikopo ya haraka ya biashara bila dhamana (unsecured) kupitia **M-Pesa**:\n• **Voryn Biashara** (KES 10k–250k)\n• **Voryn Daily Trader** (KES 3k–30k kwa wafanyabiashara wa kila siku)\n• **Voryn Mama Biashara** (KES 5k–100k)\n• **Voryn Agri-Boost** (kwa wakulima)\n• **Voryn Growth** (hadi KES 1M)\n\nJe, unahitaji kiasi gani cha mkopo kwa biashara yako leo?`;
  }

  // 13. General greetings
  if (query === "hi" || query === "hello" || query === "hey" || query === "good morning" || query === "good afternoon" || query === "good evening") {
    return `Hello! 👋 I'm **Vori**, your Voryn Capital assistant.\n\nI can help you:\n• Find the right loan product for your trade or SME\n• Check eligibility and application steps\n• Calculate repayments and amounts\n• Connect you with a relationship officer\n\nWhat kind of business do you operate, or what loan amount are you looking for?`;
  }

  // 14. Thank you
  if (query.includes("thank") || query.includes("asante") || query.includes("shukran")) {
    return `You're very welcome! 🙏 Karibu sana to Voryn Capital. If you're ready to proceed or have any more questions, call or WhatsApp us on **${site.phone}**. We're here to fuel your hustle!`;
  }

  // 15. Intelligent general fallback with rich dynamic prompt
  return `Thank you for asking! **Voryn Capital** provides fast, unsecured working-capital loans (from **KES 3,000 up to KES 1,000,000**) disbursed directly to **M-Pesa** across Kenya.\n\n` +
    `Here is how I can assist you right now:\n` +
    `• 💼 **Loan Recommendations**: Tell me your business type (e.g. shop, mama mboga, salon, farm) or target amount.\n` +
    `• 📍 **Our Office**: Located at **${site.address}**.\n` +
    `• 📞 **Speak with Us**: Call or WhatsApp our relationship desk on **${site.phone}**.\n\n` +
    `What specific question can I answer for you?`;
}
