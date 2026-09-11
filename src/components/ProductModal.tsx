"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Phone,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Target,
  ListChecks,
  Info,
  Clock,
  Wallet,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { formatKES } from "@/lib/products";
import { estimateLoan, allowedFrequencies, type Frequency } from "@/lib/loan";
import { accents } from "@/lib/accents";
import { site } from "@/lib/site";
import ProductIcon from "./ProductIcon";

function stepFor(max: number) {
  if (max <= 30000) return 1000;
  if (max <= 100000) return 2000;
  if (max <= 250000) return 5000;
  return 10000;
}

function roundTo(n: number, step: number) {
  return Math.round(n / step) * step;
}

const kes0 = (n: number) => "KES " + Math.round(n).toLocaleString("en-KE");

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"calc" | "details" | "graduation">("calc");

  // Calculator state
  const step = product ? stepFor(product.max) : 1000;
  const defaultTenure = product
    ? product.tenureOptions[Math.floor(product.tenureOptions.length / 2)]
    : 1;

  const [amount, setAmount] = useState<number>(() =>
    product ? roundTo((product.min + product.max) / 2, step) : 10000
  );
  const [tenure, setTenure] = useState<number>(defaultTenure);
  const [frequency, setFrequency] = useState<Frequency>("monthly");

  // Reset when product changes
  useEffect(() => {
    if (product) {
      const s = stepFor(product.max);
      setAmount(roundTo((product.min + product.max) / 2, s));
      setTenure(product.tenureOptions[Math.floor(product.tenureOptions.length / 2)]);
      setActiveTab("calc");
    }
  }, [product]);

  // Adjust frequency
  useEffect(() => {
    if (!product) return;
    const freqs = allowedFrequencies(product, tenure);
    if (!freqs.includes(frequency)) {
      setFrequency(freqs[0]);
    }
  }, [product, tenure, frequency]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  const est = useMemo(() => {
    if (!product) return null;
    return estimateLoan(product, amount, tenure, frequency);
  }, [product, amount, tenure, frequency]);

  if (!product) return null;

  const a = accents[product.accent];
  const unit = product.tenureUnit === "months" ? "month" : "day";
  const freqs = allowedFrequencies(product, tenure);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-navy-950/80 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl transition-all my-auto"
      >
        {/* Top Header Strip */}
        <div className="relative bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 p-6 sm:p-7 text-white">
          {/* Subtle background glow */}
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-500/20 blur-2xl pointer-events-none" />

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${a.icon} shadow-lg`}>
              <ProductIcon slug={product.slug} className="h-6 w-6" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                  {product.category}
                </span>

                {product.isStarterProduct ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300 ring-1 ring-emerald-500/30">
                    <Sparkles className="h-3 w-3 text-emerald-400" />
                    Starter Loan • Open to All New Clients
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold-500/20 px-2.5 py-0.5 text-xs font-bold text-gold-300 ring-1 ring-gold-500/30">
                    <TrendingUp className="h-3 w-3 text-gold-400" />
                    {product.graduationTier}
                  </span>
                )}
              </div>

              <h2 id="product-modal-title" className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                {product.name}
              </h2>
            </div>
          </div>

          <p className="mt-3 text-sm text-silver-300 leading-relaxed max-w-2xl">
            {product.headline}
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-white/10 pt-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-gold-400 shrink-0" />
              <div>
                <p className="text-[0.68rem] uppercase tracking-wide text-silver-400">Amount range</p>
                <p className="font-semibold text-white">
                  {formatKES(product.min)} – {formatKES(product.max)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold-400 shrink-0" />
              <div>
                <p className="text-[0.68rem] uppercase tracking-wide text-silver-400">Repayment tenure</p>
                <p className="font-semibold text-white">{product.tenure}</p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <div>
                <p className="text-[0.68rem] uppercase tracking-wide text-silver-400">Security / Collateral</p>
                <p className="font-semibold text-white">
                  {product.slug === "voryn-asset-loan" ? "Asset-backed (No land deeds)" : "100% Unsecured"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Graduation Notice Banner */}
        <div
          className={`px-6 py-3.5 text-xs sm:text-sm flex items-start gap-2.5 border-b ${
            product.isStarterProduct
              ? "bg-emerald-50 text-emerald-900 border-emerald-100"
              : "bg-amber-50/90 text-amber-950 border-amber-200/70"
          }`}
        >
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-current opacity-80" />
          <div>
            <span className="font-bold">
              {product.isStarterProduct ? "First time applying with Voryn? " : "Graduation Pathway Rule: "}
            </span>
            {product.isStarterProduct ? (
              <span>
                You can apply for <strong>Voryn Biashara</strong> directly today! Every on-time repayment builds your trust profile to unlock our specialized Chama, Agri, Growth, and Asset loans.
              </span>
            ) : (
              <span>
                For new clients, you begin with <strong>Voryn Biashara</strong>. With consistent on-time repayment and trust, you unlock <strong>{product.name}</strong> on your next cycle. Already an existing client? You can apply directly!
              </span>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-silver-200 bg-silver-50 px-6">
          <button
            onClick={() => setActiveTab("calc")}
            className={`flex items-center gap-2 border-b-2 py-3 px-3 text-sm font-semibold transition-colors ${
              activeTab === "calc"
                ? "border-navy-700 text-navy-800 bg-white shadow-sm"
                : "border-transparent text-silver-500 hover:text-navy-700"
            }`}
          >
            <Calculator className="h-4 w-4 text-gold-500" />
            Repayment Calculator
          </button>

          <button
            onClick={() => setActiveTab("details")}
            className={`flex items-center gap-2 border-b-2 py-3 px-3 text-sm font-semibold transition-colors ${
              activeTab === "details"
                ? "border-navy-700 text-navy-800 bg-white shadow-sm"
                : "border-transparent text-silver-500 hover:text-navy-700"
            }`}
          >
            <ListChecks className="h-4 w-4 text-gold-500" />
            Who it&apos;s for &amp; Uses
          </button>

          <button
            onClick={() => setActiveTab("graduation")}
            className={`flex items-center gap-2 border-b-2 py-3 px-3 text-sm font-semibold transition-colors ${
              activeTab === "graduation"
                ? "border-navy-700 text-navy-800 bg-white shadow-sm"
                : "border-transparent text-silver-500 hover:text-navy-700"
            }`}
          >
            <TrendingUp className="h-4 w-4 text-gold-500" />
            Graduation Path
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-7 max-h-[58vh] overflow-y-auto">
          {/* TAB 1: CALCULATOR */}
          {activeTab === "calc" && est && (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-silver-500">
                  Select Loan Amount
                </h3>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-display text-2xl font-bold text-navy-800">{formatKES(amount)}</span>
                  <span className="text-xs font-semibold text-silver-500">
                    Range: {formatKES(product.min)} – {formatKES(product.max)}
                  </span>
                </div>

                <input
                  type="range"
                  min={product.min}
                  max={product.max}
                  step={step}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="mt-3 w-full accent-navy-700 cursor-pointer"
                />

                <div className="mt-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-silver-500">
                    Repayment Period
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.tenureOptions.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTenure(t)}
                        className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                          t === tenure
                            ? "bg-navy-700 text-white shadow-md"
                            : "bg-silver-100 text-silver-600 hover:bg-silver-200"
                        }`}
                      >
                        {t} {unit}
                        {t > 1 ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-silver-500">
                    Payment Frequency
                  </label>
                  <div className="mt-2 inline-flex rounded-xl bg-silver-100 p-1">
                    {(["weekly", "monthly"] as Frequency[]).map((f) => {
                      const disabled = !freqs.includes(f);
                      return (
                        <button
                          key={f}
                          disabled={disabled}
                          onClick={() => setFrequency(f)}
                          className={`rounded-lg px-4 py-1.5 text-xs font-bold capitalize transition-colors ${
                            frequency === f
                              ? "bg-white text-navy-800 shadow-sm"
                              : disabled
                              ? "cursor-not-allowed text-silver-300"
                              : "text-silver-500 hover:text-navy-700"
                          }`}
                        >
                          {f}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Estimate Calculation Summary Card */}
              <div className="rounded-2xl border border-silver-200 bg-gradient-to-br from-navy-50 to-white p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-navy-600">
                    Indicative Repayment
                  </p>
                  <p className="mt-2 font-display text-3xl font-extrabold text-navy-900">
                    {kes0(est.perInstallment)}
                    <span className="text-sm font-normal text-silver-500">
                      {" "}/ {frequency === "weekly" ? "week" : "month"}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-silver-500">
                    Total of {est.installments} {frequency === "weekly" ? "weekly" : "monthly"} installments
                  </p>

                  <dl className="mt-4 space-y-2 border-t border-silver-200 pt-3 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <dt className="text-silver-600">You Receive</dt>
                      <dd className="font-semibold text-navy-900">{kes0(est.amount)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-silver-600">
                        Interest &amp; Service Fee{" "}
                        <span className="text-silver-400 font-normal">
                          ({est.feePercentOfPrincipal.toFixed(1)}%)
                        </span>
                      </dt>
                      <dd className="font-semibold text-navy-900">{kes0(est.fee)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-silver-600">Indicative Rate</dt>
                      <dd className="font-semibold text-navy-900">{(product.rateMonthly * 100).toFixed(1)}% / mo</dd>
                    </div>
                    <div className="flex justify-between border-t border-silver-200 pt-2 font-bold text-navy-900">
                      <dt>Total Repayable</dt>
                      <dd className="text-gold-600">{kes0(est.total)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-5 rounded-xl bg-white p-3.5 border border-silver-200 text-xs text-silver-600 shadow-sm">
                  <p className="flex items-center gap-1.5 font-bold text-navy-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Competitive Interest Rates • Zero Hidden Fees
                  </p>
                  <p className="mt-1.5 text-xs text-silver-600 leading-relaxed">
                    Our interest rates are competitive and tailored to each client depending on their individual credit-risk assessment, enterprise performance, and repayment history.
                  </p>
                  <p className="mt-1 text-[0.7rem] text-silver-400">
                    * Figures shown are illustrative estimates. Final terms are confirmed upon credit evaluation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DETAILS & WHO IT'S FOR */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-base font-bold text-navy-800 flex items-center gap-2">
                  <Target className="h-4.5 w-4.5 text-gold-500" />
                  Who It&apos;s Best For
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {product.bestFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-silver-700">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-silver-200 pt-5">
                <h3 className="font-display text-base font-bold text-navy-800 flex items-center gap-2">
                  <ListChecks className="h-4.5 w-4.5 text-gold-500" />
                  What You Can Use It For
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {product.uses.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-silver-700">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {product.targetAsset && (
                <div className="rounded-2xl bg-navy-50 p-4 border border-navy-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-navy-800">
                    Target Assets Eligible
                  </p>
                  <p className="mt-1 text-sm font-medium text-navy-900">{product.targetAsset}</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GRADUATION PATHWAY */}
          {activeTab === "graduation" && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-silver-200 bg-silver-50 p-4">
                <h3 className="font-display text-base font-bold text-navy-800">
                  How Clients Graduate at Voryn Capital
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-silver-600">
                  We believe in progressive trust. Rather than demanding land title deeds or car logbooks, we let your real business cash flow and repayment track record unlock larger capital.
                </p>
              </div>

              <div className="space-y-3">
                {/* Level 1 */}
                <div
                  className={`rounded-2xl border p-4 transition-all ${
                    product.slug === "voryn-biashara"
                      ? "border-gold-500 bg-gold-50/40 ring-2 ring-gold-500/20"
                      : "border-silver-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-700 text-xs font-bold text-white">
                        1
                      </span>
                      <h4 className="font-bold text-navy-800">Level 1: The Starter Foundation</h4>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                      Open to All New Clients
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-silver-600">
                    All new clients start with <strong>Voryn Biashara</strong> (KES 10,000 – 20,000). You get instant M-Pesa working capital to prove your trading rhythm.
                  </p>
                </div>

                {/* Level 2 */}
                <div
                  className={`rounded-2xl border p-4 transition-all ${
                    ["voryn-chama", "voryn-agri-boost", "voryn-mama-biashara"].includes(product.slug)
                      ? "border-gold-500 bg-gold-50/40 ring-2 ring-gold-500/20"
                      : "border-silver-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-900">
                        2
                      </span>
                      <h4 className="font-bold text-navy-800">Level 2: Specialized Enterprise Facilities</h4>
                    </div>
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                      Earned with 1–2 Cycles
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-silver-600">
                    After on-time repayment, you unlock <strong>Voryn Chama</strong> (group loans), <strong>Voryn Agri-Boost</strong> (harvest cycles), and <strong>Voryn Mama Biashara</strong>.
                  </p>
                </div>

                {/* Level 3 */}
                <div
                  className={`rounded-2xl border p-4 transition-all ${
                    ["voryn-growth", "voryn-asset-loan"].includes(product.slug)
                      ? "border-gold-500 bg-gold-50/40 ring-2 ring-gold-500/20"
                      : "border-silver-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-gold-400">
                        3
                      </span>
                      <h4 className="font-bold text-navy-800">Level 3: Asset Ownership &amp; Scale</h4>
                    </div>
                    <span className="rounded-full bg-navy-100 px-2.5 py-0.5 text-xs font-bold text-navy-800">
                      Proven Enterprises
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-silver-600">
                    Unlock <strong>Voryn Asset Loan</strong> (up to KES 150,000 for productive equipment, machinery, tools, and delivery motorcycles) and <strong>Voryn Growth</strong> (up to KES 100,000 for major restocking).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="border-t border-silver-200 bg-silver-50/80 px-6 py-4 sm:flex sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-silver-600 mb-3 sm:mb-0">
            <Phone className="h-4 w-4 text-gold-600 shrink-0" />
            <span>
              Questions? Call or WhatsApp our relationship officers directly on{" "}
              <a href={`tel:${site.phoneHref}`} className="font-bold text-navy-800 hover:text-gold-600">
                {site.phone}
              </a>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="rounded-full border border-silver-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-navy-800 hover:bg-silver-100 transition-colors"
            >
              Full details
            </Link>

            {product.isStarterProduct ? (
              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                onClick={onClose}
                className="btn-gold rounded-full bg-gold-500 px-6 py-2.5 text-xs sm:text-sm font-bold text-navy-900 shadow-md transition-transform hover:scale-[1.02] flex items-center gap-1.5"
              >
                Apply for {product.name}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/contact?product=Voryn+Biashara"
                  onClick={onClose}
                  className="rounded-full border border-gold-400 bg-gold-50 px-4 py-2 text-xs font-bold text-navy-900 hover:bg-gold-100 transition-colors"
                  title="New clients begin with Voryn Biashara to graduate"
                >
                  New Client? Start with Biashara
                </Link>

                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  onClick={onClose}
                  className="btn-gold rounded-full bg-navy-800 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-navy-700 transition-colors flex items-center gap-1.5"
                >
                  Existing Client Apply
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
