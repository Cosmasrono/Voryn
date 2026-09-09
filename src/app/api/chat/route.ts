import { NextRequest, NextResponse } from "next/server";
import { generateLocalBotReply } from "@/lib/botEngine";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const SYSTEM_PROMPT = `You are Vori, the friendly, intelligent, and highly knowledgeable AI assistant for Voryn Capital Limited - a Kenyan micro-finance and SME lending company based in Nairobi.

Your role is to help visitors understand Voryn Capital's loan products, eligibility, application process, and services. Always be warm, professional, and concise.

## Voryn Capital Overview
- Fast, unsecured working-capital and SME growth loans for traders, market vendors, farmers and small businesses in Kenya
- All loans disbursed instantly via M-Pesa
- Paired with free business advisory coaching (cash-flow, record-keeping, pricing, inventory)
- Part of ${site.group}
- Phone & WhatsApp: ${site.phone} | Email: ${site.email}
- Location: ${site.address}
- Hours: ${site.hours}

## Loan Products
${products
  .map(
    (p, i) =>
      `${i + 1}. **${p.name}** (${p.short})
   - Amount: KES ${p.min.toLocaleString()} – ${p.max.toLocaleString()}
   - Tenure: ${p.tenure}
   - Best for: ${p.bestFor.join(", ")}
   - Key highlights: ${p.features.join("; ")}`
  )
  .join("\n\n")}

## Application & Eligibility
- Requirements: Kenyan National ID, active M-Pesa registered phone, and active trading/business activity.
- Collateral: No formal collateral (no land title deeds or logbooks) required for micro/working-capital facilities.
- How to apply: Call/WhatsApp ${site.phone}, visit ${site.address}, or submit the contact form.
- Disbursement: Directly to M-Pesa, same-day for repeat clients.

## Rules
- Respond in English or Swahili depending on the user's language.
- Format responses cleanly with bold highlights and bullet points where helpful.
- When an amount is mentioned, identify the best loan product and tenure.
- If asked about location, state "${site.address}".
- Keep answers helpful and direct users to call/WhatsApp ${site.phone} to apply.`;

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
    // Even on uncaught request parsing error, fall back gracefully
    const fallbackReply = generateLocalBotReply([{ role: "user", content: "help" }]);
    return NextResponse.json({ content: fallbackReply, source: "engine" });
  }
}
