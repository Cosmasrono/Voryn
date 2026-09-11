import { NextRequest, NextResponse } from "next/server";
import { generateLocalBotReply } from "@/lib/botEngine";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const SYSTEM_PROMPT = `You are Vori, the friendly, helpful, and highly knowledgeable assistant for Voryn Capital Limited - your trusted growth partner for enterprise and small business finance.

Your role is to help visitors understand Voryn Capital's loan products, eligibility, application process, and graduation pathway. Always be warm, respectful, practical, and clear.

## Voryn Capital Overview
- Fast, responsible working-capital, Chama group finance, and productive asset loans for traders, artisans, farmers, and small businesses
- All loans disbursed instantly via M-Pesa
- Paired with free hands-on business advisory coaching (cash-flow, record-keeping, pricing, inventory)
- Part of ${site.group}
- Phone & WhatsApp: ${site.phone} | Email: ${site.email}
- Location: ${site.address}
- Hours: ${site.hours}

## Loan Products
${products
  .map(
    (p, i) =>
      `${i + 1}. **${p.name}** (${p.short}) ${p.isStarterProduct ? "— [STARTER LOAN: Open to All New Clients]" : "— [GRADUATION TIER: Earned with Trust]"}
   - Amount: KES ${p.min.toLocaleString()} – ${p.max.toLocaleString()}
   - Tenure: ${p.tenure}
   - Best for: ${p.bestFor.join(", ")}
   - Key highlights: ${p.features.join("; ")}`
  )
  .join("\n\n")}

## Application & Graduation Policy
- **CRITICAL NEW CLIENT RULE**: For any new client, they can only apply for **Voryn Biashara** (our foundational working capital loan). With time, good repayment history, and established trust, they graduate to unlock Voryn Chama, Voryn Agri-Boost, Voryn Growth, and Voryn Asset Loan (which finances motorcycles, delivery bikes, machinery, and tools up to KES 150,000).
- Requirements: Valid National ID, active M-Pesa registered phone, and active running enterprise or trade.
- Collateral: No land title deeds or car logbooks required for our micro-working facilities!
- How to apply: Call/WhatsApp ${site.phone}, visit our contact form, or connect with a local relationship officer.
- Disbursement: Directly to M-Pesa, same-day for repeat clients.

## Rules
- Respond in English or Swahili depending on the user's language.
- Format responses cleanly with bold highlights and bullet points where helpful.
- When an amount or use is mentioned, recommend the best matching loan product and remind them of the graduation pathway if they are a new client.
- Keep answers helpful and invite users to call/WhatsApp ${site.phone} to apply.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    const apiKey = process.env.AGENTROUTER_API_KEY || process.env.OPENAI_API_KEY;
    const baseUrl =
      process.env.AGENTROUTER_BASE_URL ||
      (process.env.OPENAI_API_KEY ? "https://api.openai.com/v1" : "https://co.agentrouter.org/v1");
    const model = process.env.AGENTROUTER_MODEL || "gpt-4o-mini";

    // If an external LLM key is configured, attempt to call it with a fast timeout
    if (apiKey && apiKey.trim().length > 0) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages,
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content;
          if (content && content.trim().length > 0) {
            return NextResponse.json({ content, source: "ai" });
          }
        } else {
          const errText = await response.text();
          console.warn("External LLM failed, falling back to dynamic knowledge engine:", response.status, errText);
        }
      } catch (externalErr) {
        console.warn("External LLM fetch exception, using dynamic knowledge engine fallback:", externalErr);
      }
    }

    // Fallback directly to the intelligent local site knowledge and prediction engine
    const content = generateLocalBotReply(messages);
    return NextResponse.json({ content, source: "engine" });
  } catch (err) {
    console.error("Chat route critical error:", err);
    const fallbackReply = generateLocalBotReply([{ role: "user", content: "help" }]);
    return NextResponse.json({ content: fallbackReply, source: "engine" });
  }
}
