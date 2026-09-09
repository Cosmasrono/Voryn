import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Payload = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  business?: string;
  location?: string;
  product?: string;
  message?: string;
};

const esc = (s = "") =>
  s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const firstName = (data.firstName || "").trim();
  const phone = (data.phone || "").trim();
  if (!firstName || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name and phone are required." },
      { status: 422 }
    );
  }

  const rows: [string, string][] = [
    ["Name", `${firstName} ${data.lastName || ""}`.trim()],
    ["Phone", phone],
    ["Email", data.email || "-"],
    ["Business", data.business || "-"],
    ["Location", data.location || "-"],
    ["Preferred product", data.product || "-"],
    ["Notes", data.message || "-"],
  ];

  const html = `
    <div style="font-family:system-ui,Arial,sans-serif;max-width:560px">
      <h2 style="color:#1b2a5b;margin:0 0 4px">New loan enquiry - Voryn Capital website</h2>
      <p style="color:#6b7280;margin:0 0 16px">Submitted via voryncapital.co.ke</p>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="padding:8px 12px;background:#f4f5f7;font-weight:600;color:#16224a;width:160px;vertical-align:top">${k}</td>
                 <td style="padding:8px 12px;color:#0f1526">${esc(v)}</td>
               </tr>`
          )
          .join("")}
      </table>
    </div>`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Voryn Website <onboarding@resend.dev>";

  // No provider configured yet → accept the lead so the client can fall back to WhatsApp.
  if (!apiKey) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New loan enquiry - ${firstName} ${data.lastName || ""}`.trim(),
        html,
        ...(data.email ? { reply_to: data.email } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error", res.status, detail);
      return NextResponse.json({ ok: false, delivered: false, error: "Email failed." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("Contact route error", e);
    return NextResponse.json({ ok: false, delivered: false, error: "Server error." }, { status: 500 });
  }
}
