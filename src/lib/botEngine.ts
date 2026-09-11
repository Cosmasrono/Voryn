import { products, formatKES } from "./products";
import { site } from "./site";

export interface BotResponse {
  content: string;
  source?: "ai" | "engine";
}

// Extract numerical values from user query (e.g. "50k", "50,000", "20000", "150k", "10k")
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
    if (amount < 5000) {
      return `Our smallest seasonal loan starts at **KES 5,000** for **Voryn Agri-Boost** or **Voryn Mama Biashara**.\n\nFor new business clients, our direct entry product is **Voryn Biashara** (KES 10,000 – 20,000). Repaying on time builds your trust score and unlocks all other products!\n\nWould you like to start an application for KES 10,000 with an officer on **${site.phone}**?`;
    }
    return `For amounts up to **KES 150,000**, our **Voryn Asset Loan** finances delivery motorcycles and productive machinery, and **Voryn Biashara** scales up to **KES 20,000** for repeat borrowers.\n\nCall our credit team directly on **${site.phone}** or message us on WhatsApp to discuss your facility!`;
  }

  let text = `For **${formatKES(amount)}**, here are the matching facilities:\n\n`;
  matching.forEach((p) => {
    const starterTag = p.isStarterProduct ? " ⭐ *(Starter: Open to New Clients)*" : " 🏆 *(Graduation Tier)*";
    text += `• **${p.name}** (${p.short})${starterTag}\n  - Limit: ${formatKES(p.min)} – ${formatKES(p.max)}\n  - Tenure: ${p.tenure}\n  - Best for: ${p.bestFor[0]}\n\n`;
  });

  text += `💡 **New Client Notice:** All first-time clients start with **Voryn Biashara**. As you repay on time, you graduate to unlock Chama, Agri, Growth, and Asset loans!\n\nCall or WhatsApp us on **${site.phone}** to get started.`;
  return text;
}

export function generateLocalBotReply(messages: { role: string; content: string }[]): string {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const query = lastUserMsg.trim().toLowerCase();

  // 1. Amount prediction
  const detectedAmount = extractAmount(query);
  const mentionsNeedOrWant = /(need|want|borrow|qualify|loan of|give me|nipatie|nahitaji|mkopo wa|how much|amount)/i.test(query);
  if (detectedAmount && (mentionsNeedOrWant || query.length < 25)) {
    return predictLoanForAmount(detectedAmount);
  }

  // 2. New Client / Graduation rule query
  if (
    query.includes("new client") ||
    query.includes("first time") ||
    query.includes("graduate") ||
    query.includes("graduation") ||
    query.includes("starter") ||
    query.includes("mgeni") ||
    query.includes("mara ya kwanza")
  ) {
    return `🌱 **New Client & Graduation Pathway:**\n\n` +
      `At Voryn Capital, we build trust step-by-step with zero land title deed requirements:\n\n` +
      `1. **Start with Voryn Biashara:** All new business clients begin with **Voryn Biashara** (KES 10,000 – 20,000) for working capital.\n` +
      `2. **Build Your Track Record:** Repay your installments on time via M-Pesa.\n` +
      `3. **Graduate to Specialized Loans:** After establishing trust, you unlock:\n` +
      `   • 👥 **Voryn Chama** (KES 10k–30k for groups)\n` +
      `   • 🌱 **Voryn Agri-Boost** (KES 5k–20k for farm cycles)\n` +
      `   • 🚀 **Voryn Growth** (KES 21k–100k for bulk orders)\n` +
      `   • 🏍️ **Voryn Asset Loan** (KES 10k–150k for motorcycles & equipment)\n\n` +
      `Ready to take your first step? Call or WhatsApp us on **${site.phone}**!`;
  }

  // 3. Location / Office / Where are you
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
    return `📍 **Our Location:**\n**${site.name}** is headquartered at:\n🏢 **${site.address}**\n\n⏰ **Hours:** ${site.hours}\n\n📞 **Phone / WhatsApp:** **${site.phone}**\n✉️ **Email:** ${site.email}\n\nOur relationship officers also visit businesses and trade centers directly. Would you like an officer to reach out to you?`;
  }

  // 4. Asset Loan / Motorcycle / Boda Boda / Machinery
  if (
    query.includes("asset") ||
    query.includes("motorcycle") ||
    query.includes("motorbike") ||
    query.includes("boda") ||
    query.includes("pikipiki") ||
    query.includes("machine") ||
    query.includes("equipment") ||
    query.includes("tool") ||
    query.includes("posho") ||
    query.includes("chiller")
  ) {
    const p = products.find((x) => x.slug === "voryn-asset-loan")!;
    return `🏍️ **${p.name}** (${p.short}):\n\n` +
      `• **Limit:** ${formatKES(p.min)} – ${formatKES(p.max)}\n` +
      `• **Tenure:** ${p.tenure} (comfortable monthly installments)\n` +
      `• **Target Assets:** Delivery motorcycles (boda boda / courier), workshop tools, commercial refrigeration, posho mill motors, and salon equipment.\n` +
      `• **Security:** The asset itself serves as productive security — **no land title deeds needed**!\n` +
      `• **Graduation Status:** Unlocked for business owners who have built trust through Voryn Biashara or have verified daily income.\n\n` +
      `Would you like to speak to an asset portfolio officer on **${site.phone}**?`;
  }

  // 5. Chama / Group loan
  if (
    query.includes("chama") ||
    query.includes("group") ||
    query.includes("table banking") ||
    query.includes("merry go round") ||
    query.includes("kikundi")
  ) {
    const p = products.find((x) => x.slug === "voryn-chama")!;
    return `👥 **${p.name}** (${p.short}):\n\n` +
      `• **Limit:** ${formatKES(p.min)} – ${formatKES(p.max)}\n` +
      `• **Tenure:** ${p.tenure}\n` +
      `• **Disbursement:** Direct to Chama M-Pesa treasury\n` +
      `• **Best for:** Registered chamas, table-banking circles, and joint trade cooperatives.\n` +
      `• **Advantage:** Group mutual social guarantee — no individual land collateral required.\n\n` +
      `Would you like an officer to visit your next chama meeting? Call us on **${site.phone}**!`;
  }

  // 6. What loans do you offer / All products
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
    return `We offer **6 tailored loan facilities** with instant M-Pesa disbursement:\n\n` +
      `1. 🏪 **Voryn Biashara** (KES 10,000 – 20,000 | 1–6 months)\n` +
      `   *The required starter loan for all new business clients.* Working capital for retail, shops & services.\n\n` +
      `2. 👥 **Voryn Chama** (KES 10,000 – 30,000 | 1–3 months)\n` +
      `   Group financing for table-banking and joint trade ventures.\n\n` +
      `3. 🌸 **Voryn Mama Biashara** (KES 5,000 – 50,000 | 21–45 days)\n` +
      `   Priority support and coaching for female traders and stallholders.\n\n` +
      `4. 🌱 **Voryn Agri-Boost** (KES 5,000 – 20,000 | 30–90 days)\n` +
      `   Seasonal crop, dairy, and farm inputs aligned with your harvest.\n\n` +
      `5. 🚀 **Voryn Growth** (KES 21,000 – 100,000 | 30–90 days)\n` +
      `   Scale-up working capital for bulk orders and expanding stock lines.\n\n` +
      `6. 🏍️ **Voryn Asset Loan** (KES 10,000 – 150,000 | 1–12 months)\n` +
      `   Finance delivery motorcycles (boda boda), machinery, tools, and equipment.\n\n` +
      `New to Voryn? Start with **Voryn Biashara** today! Tell me what business you operate to get matched.`;
  }

  // 7. Specific product queries
  if (query.includes("mama biashara") || query.includes("women") || query.includes("mama")) {
    const p = products.find((x) => x.slug === "voryn-mama-biashara")!;
    return `🌸 **${p.name}** (${p.short}):\n\n` +
      `• **Limit:** ${formatKES(p.min)} – ${formatKES(p.max)}\n` +
      `• **Tenure:** ${p.tenure}\n` +
      `• **Disbursement:** Priority M-Pesa processing\n` +
      `• **Best for:** Market stall vendors, mama mbogas, salons, and food producers.\n` +
      `• **Highlights:** Priority application review, supportive relationship officers, and free business-skills coaching.\n\n` +
      `Ready to apply? Call or WhatsApp us on **${site.phone}**!`;
  }

  if (query.includes("biashara") || query.includes("working capital")) {
    const p = products.find((x) => x.slug === "voryn-biashara")!;
    return `🏪 **${p.name}** (${p.short}) — **Starter Facility**:\n\n` +
      `• **Limit:** ${formatKES(p.min)} – ${formatKES(p.max)}\n` +
      `• **Tenure:** ${p.tenure}\n` +
      `• **Eligibility:** Open to **all new business owners** with active daily trade!\n` +
      `• **Features:** 100% unsecured, instant M-Pesa disbursement, and automatic graduation to larger asset loans upon on-time repayment.\n\n` +
      `Call or WhatsApp **${site.phone}** to start your application!`;
  }

  if (query.includes("growth") || query.includes("bulk") || query.includes("scale")) {
    const p = products.find((x) => x.slug === "voryn-growth")!;
    return `🚀 **${p.name}** (${p.short}):\n\n` +
      `• **Limit:** ${formatKES(p.min)} – ${formatKES(p.max)}\n` +
      `• **Tenure:** ${p.tenure} (30–90 days)\n` +
      `• **Best for:** Growing shops restocking larger bulk orders and expanding suppliers.\n` +
      `• **Graduation Tier:** Earned through consistent on-time repayments on Voryn Biashara.\n\n` +
      `Call **${site.phone}** to speak with a growth portfolio manager.`;
  }

  if (query.includes("agri") || query.includes("farm") || query.includes("farmer") || query.includes("kilimo") || query.includes("harvest") || query.includes("livestock")) {
    const p = products.find((x) => x.slug === "voryn-agri-boost")!;
    return `🌱 **${p.name}** (${p.short}):\n\n` +
      `• **Limit:** ${formatKES(p.min)} – ${formatKES(p.max)}\n` +
      `• **Tenure:** ${p.tenure} (30–90 days)\n` +
      `• **Advantage:** Structured around crop and livestock seasons so you pay after your harvest or milk yields come in!\n` +
      `• **Best for:** Seeds, fertilizer, animal feed, and market transport.\n\n` +
      `Connect with an agricultural loan officer on **${site.phone}**.`;
  }

  // 8. How to apply / Requirements / Eligibility
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
    return `📋 **Simple Requirements & How to Apply:**\n\n` +
      `**What You Need:**\n` +
      `1. Valid National ID.\n` +
      `2. Active M-Pesa registered mobile number.\n` +
      `3. Active running business, trade, shop, workshop, or farm.\n` +
      `4. **No land title deeds or car logbooks** needed for our micro facilities!\n\n` +
      `**How New Clients Apply:**\n` +
      `• New clients apply for **Voryn Biashara** (our foundational loan).\n` +
      `• Apply online via our **Contact Page**, call **${site.phone}**, or chat with an officer on WhatsApp.\n` +
      `• Once approved, money is sent straight to your **M-Pesa**!\n\n` +
      `Would you like us to call you back today?`;
  }

  // 9. Interest rate / Fees
  if (
    query.includes("interest") ||
    query.includes("rate") ||
    query.includes("fee") ||
    query.includes("cost") ||
    query.includes("percentage") ||
    query.includes("riba") ||
    query.includes("gharama")
  ) {
    return `💰 **Transparent Pricing & Terms:**\n\n` +
      `• We practice **100% transparent pricing** with no hidden administrative surprises.\n` +
      `• Indicative monthly service fees range between **3.5% and 6%** depending on loan product, size, and tenure.\n` +
      `• Productive asset loans have lower monthly rates up to 12 months.\n` +
      `• Practical business coaching is always included free of charge.\n\n` +
      `Try our interactive **Loan Calculator** on this page or call **${site.phone}** for an exact quote!`;
  }

  // 10. Swahili / Sheng greetings
  if (
    query.includes("habari") ||
    query.includes("mambo") ||
    query.includes("sasa") ||
    query.includes("jambo") ||
    query.includes("niaje") ||
    query.includes("hujambo")
  ) {
    return `Salama! 👋 Mimi ni **Vori**, msaidizi wako wa **Voryn Capital**.\n\nTunatoa mikopo ya haraka ya biashara bila kuitisha hati miliki ya ardhi (title deed) kupitia **M-Pesa**:\n• **Voryn Biashara** (KES 10k–250k kwa wateja wote wapya)\n• **Voryn Chama** (KES 10k–30k kwa vikundi vya chamas & table-banking)\n• **Voryn Asset Loan** (KES 10k–150k kwa pikipiki/boda boda na mashine za kazi)\n• **Voryn Agri-Boost** (KES 5k–20k kwa wakulima)\n• **Voryn Growth** (KES 21k–100k)\n\nWateja wapya wanaanza na **Voryn Biashara**, kisha wanapandishwa daraja (graduate) baada ya kulipa kwa wakati!\n\nJe, unahitaji mkopo wa kiasi gani kwa biashara yako leo?`;
  }

  // 11. General greetings
  if (query === "hi" || query === "hello" || query === "hey" || query.startsWith("good morning") || query.startsWith("good afternoon") || query.startsWith("good evening")) {
    return `Hello! 👋 I'm **Vori**, your Voryn Capital assistant.\n\nI can help you:\n• Explore our 6 tailored loan products (including motorcycle asset loans & chamas)\n• Understand how new clients start with **Voryn Biashara** and graduate with trust\n• Estimate your repayments and installments\n• Connect you directly with a local relationship officer\n\nWhat type of enterprise do you run, or how much capital are you looking for?`;
  }

  // 12. Fallback
  return `Thank you for reaching out! **Voryn Capital** provides responsible working-capital and asset financing (from **KES 5,000 up to KES 250,000**) disbursed directly to **M-Pesa**.\n\n` +
    `Here is how I can help right now:\n` +
    `• 💼 **New Clients**: Start with **Voryn Biashara** to establish your trust record.\n` +
    `• 🏍️ **Asset & Motorcycle Loans**: Learn about financing a boda boda, machinery, or tools (up to KES 150K).\n` +
    `• 👥 **Chama Groups**: Explore table-banking loans for groups (up to KES 30K).\n` +
    `• 📞 **Speak with Us**: Call or WhatsApp our desk on **${site.phone}**.\n\n` +
    `What specific question can I answer for you?`;
}
