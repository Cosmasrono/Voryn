"use client";

import { useRef, useState } from "react";
import { Send, CheckCircle2, MessageCircle, Loader2, AlertCircle } from "lucide-react";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

function readForm(form: HTMLFormElement) {
  const fd = new FormData(form);
  const get = (k: string) => (fd.get(k) as string) || "";
  return {
    firstName: get("firstName"),
    lastName: get("lastName"),
    phone: get("phone"),
    email: get("email"),
    business: get("business"),
    location: get("location"),
    product: get("product"),
    message: get("message"),
  };
}

function whatsappUrl(v: ReturnType<typeof readForm>) {
  const lines = [
    "Hello Voryn Capital, I'd like to apply for a loan.",
    "",
    `Name: ${v.firstName} ${v.lastName}`.trim(),
    `Phone: ${v.phone}`,
    v.email && `Email: ${v.email}`,
    v.business && `Business: ${v.business}`,
    v.location && `Location: ${v.location}`,
    v.product && `Preferred product: ${v.product}`,
    v.message && `Notes: ${v.message}`,
  ].filter(Boolean);
  const num = site.phoneHref.replace(/[^0-9]/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = readForm(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.delivered) {
        setStatus("sent");
      } else if (res.ok) {
        // Lead accepted but email not configured - steer to WhatsApp.
        setStatus("fallback");
      } else {
        setStatus("error");
        setError(json.error || "Something went wrong. Please try WhatsApp or call us.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try WhatsApp or call us.");
    }
  }

  function sendWhatsApp() {
    if (!formRef.current) return;
    const v = readForm(formRef.current);
    if (!v.firstName || !v.phone) {
      setStatus("error");
      setError("Please add at least your name and phone before sending.");
      return;
    }
    window.open(whatsappUrl(v), "_blank", "noopener,noreferrer");
  }

  if (status === "sent" || status === "fallback") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-silver-200 bg-white p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-navy-800">Request received!</h3>
        <p className="mt-2 max-w-sm text-silver-600">
          {status === "sent"
            ? "Thank you - your details have been sent to our team. A Voryn relationship officer will call you back shortly."
            : "Thank you! To reach us fastest, tap below to send your details straight to our team on WhatsApp - or we'll call you back."}
        </p>
        <button
          onClick={sendWhatsApp}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          <MessageCircle className="h-4.5 w-4.5" /> Send on WhatsApp
        </button>
        <button
          onClick={() => setStatus("idle")}
          className="mt-3 text-sm font-semibold text-silver-500 hover:text-navy-700"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-silver-300 bg-white px-4 py-3 text-sm text-navy-800 outline-none transition-colors placeholder:text-silver-400 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/15";
  const label = "mb-1.5 block text-sm font-semibold text-navy-800";
  const sending = status === "sending";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-3xl border border-silver-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <h3 className="font-display text-2xl font-bold text-navy-800">Request a call back</h3>
      <p className="mt-1 text-sm text-silver-600">
        Fill in your details and we&apos;ll match you with the right Voryn product.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="firstName">First name</label>
          <input id="firstName" name="firstName" required className={field} placeholder="Jane" />
        </div>
        <div>
          <label className={label} htmlFor="lastName">Last name</label>
          <input id="lastName" name="lastName" className={field} placeholder="Wanjiku" />
        </div>
        <div>
          <label className={label} htmlFor="phone">Phone (M-Pesa)</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={field}
            placeholder="07XX XXX XXX"
          />
        </div>
        <div>
          <label className={label} htmlFor="email">Email (optional)</label>
          <input id="email" name="email" type="email" className={field} placeholder="you@email.com" />
        </div>
        <div>
          <label className={label} htmlFor="business">Business type</label>
          <input id="business" name="business" className={field} placeholder="e.g. Retail shop" />
        </div>
        <div>
          <label className={label} htmlFor="location">Location</label>
          <input id="location" name="location" className={field} placeholder="e.g. Machakos" />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="product">Preferred product</label>
          <select id="product" name="product" className={field} defaultValue="">
            <option value="" disabled>Select a loan product</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name} - {p.short}
              </option>
            ))}
            <option value="Not sure">Not sure - help me choose</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="message">Questions / notes</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={field}
            placeholder="Tell us a little about what you need…"
          />
        </div>
      </div>

      <label className="mt-4 flex items-start gap-2.5 text-sm text-silver-600">
        <input type="checkbox" required className="mt-1 h-4 w-4 accent-navy-700" />
        <span>
          I agree to be contacted by Voryn Capital and accept the{" "}
          <a href="/terms" className="font-semibold text-navy-700 hover:text-gold-600">terms of use</a>{" "}
          and{" "}
          <a href="/privacy" className="font-semibold text-navy-700 hover:text-gold-600">privacy notice</a>.
        </span>
      </label>

      {status === "error" && (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-navy-700 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-70"
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Submit request <Send className="h-4 w-4" />
            </>
          )}
        </button>
        <button
          type="button"
          onClick={sendWhatsApp}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          <MessageCircle className="h-4.5 w-4.5" /> Send on WhatsApp
        </button>
      </div>
    </form>
  );
}
