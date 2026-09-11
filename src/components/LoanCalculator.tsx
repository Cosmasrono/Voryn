"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, Info, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatKES } from "@/lib/products";
import { estimateLoan, allowedFrequencies, type Frequency } from "@/lib/loan";
import { accents } from "@/lib/accents";

function stepFor(max: number) {
  if (max <= 30000) return 1000;
  if (max <= 250000) return 5000;
  return 10000;
}
function roundTo(n: number, step: number) {
  return Math.round(n / step) * step;
}
const kes0 = (n: number) => "KES " + Math.round(n).toLocaleString("en-KE");

export default function LoanCalculator({
  products,
  initialSlug,
  lockProduct = false,
}: {
  products: Product[];
  initialSlug?: string;
  lockProduct?: boolean;
}) {
  const [slug, setSlug] = useState(initialSlug ?? products[0].slug);
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const step = stepFor(product.max);

  const defaultTenure = product.tenureOptions[Math.floor(product.tenureOptions.length / 2)];
  const [amount, setAmount] = useState(() => roundTo((product.min + product.max) / 3, step));
  const [tenure, setTenure] = useState(defaultTenure);
  const [frequency, setFrequency] = useState<Frequency>("weekly");

  // Reset dependent state when the product changes.
  useEffect(() => {
    const s = stepFor(product.max);
    setAmount(roundTo((product.min + product.max) / 3, s));
    setTenure(product.tenureOptions[Math.floor(product.tenureOptions.length / 2)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const freqs = allowedFrequencies(product, tenure);
  // Keep frequency valid for the selected tenure.
  useEffect(() => {
    if (!freqs.includes(frequency)) setFrequency(freqs[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenure, slug]);

  const est = useMemo(
    () => estimateLoan(product, amount, tenure, frequency),
    [product, amount, tenure, frequency]
  );

  const a = accents[product.accent];
  const unit = product.tenureUnit === "months" ? "month" : "day";

  return (
    <div className="overflow-hidden rounded-3xl border border-silver-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-2">
        {/* Controls */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 text-navy-700">
            <Calculator className="h-5 w-5 text-gold-500" />
            <h3 className="font-display text-xl font-bold">Estimate your repayment</h3>
          </div>

          {!lockProduct && (
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-navy-800">Product</label>
              <div className="flex flex-wrap gap-2">
                {products.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => setSlug(p.slug)}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                      p.slug === slug
                        ? "bg-navy-700 text-white"
                        : "bg-silver-100 text-silver-600 hover:bg-silver-200"
                    }`}
                  >
                    {p.name.replace("Voryn ", "")}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Amount */}
          <div className="mt-7">
            <div className="flex items-end justify-between">
              <label className="text-sm font-semibold text-navy-800">Loan amount</label>
              <span className="font-display text-lg font-bold text-navy-800">{formatKES(amount)}</span>
            </div>
            <input
              type="range"
              min={product.min}
              max={product.max}
              step={step}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-3 w-full accent-navy-700"
            />
            <div className="mt-1 flex justify-between text-xs text-silver-400">
              <span>{formatKES(product.min)}</span>
              <span>{formatKES(product.max)}</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-navy-800">
              Repayment period
            </label>
            <div className="flex flex-wrap gap-2">
              {product.tenureOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => setTenure(t)}
                  className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                    t === tenure
                      ? "bg-navy-700 text-white"
                      : "bg-silver-100 text-silver-600 hover:bg-silver-200"
                  }`}
                >
                  {t} {unit}
                  {t > 1 ? "s" : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-navy-800">
              Repayment frequency
            </label>
            <div className="inline-flex rounded-lg bg-silver-100 p-1">
              {(["weekly", "monthly"] as Frequency[]).map((f) => {
                const disabled = !freqs.includes(f);
                return (
                  <button
                    key={f}
                    disabled={disabled}
                    onClick={() => setFrequency(f)}
                    className={`rounded-md px-4 py-1.5 text-sm font-semibold capitalize transition-colors ${
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

        {/* Results */}
        <div className="relative flex flex-col justify-between bg-navy-900 p-6 text-white sm:p-8">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
              Indicative estimate
            </p>

            <div className="mt-5 rounded-2xl bg-white/[0.06] p-5">
              <p className="text-sm text-silver-300">
                {frequency === "weekly" ? "Weekly" : "Monthly"} repayment
              </p>
              <p className="mt-1 font-display text-4xl font-extrabold">
                {kes0(est.perInstallment)}
              </p>
              <p className="mt-1 text-sm text-silver-400">
                × {est.installments} {frequency === "weekly" ? "weekly" : "monthly"} payment
                {est.installments > 1 ? "s" : ""}
              </p>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <dt className="text-silver-300">You receive</dt>
                <dd className="font-semibold">{kes0(est.amount)}</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <dt className="text-silver-300">
                  Interest / service fee{" "}
                  <span className="text-silver-500">
                    ({est.feePercentOfPrincipal.toFixed(1)}% over term)
                  </span>
                </dt>
                <dd className="font-semibold">{kes0(est.fee)}</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <dt className="text-silver-300">Indicative rate</dt>
                <dd className="font-semibold">{(product.rateMonthly * 100).toFixed(1)}% per month</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-silver-300">Total repayable</dt>
                <dd className={`font-display text-lg font-bold ${a.soft} !text-gold-400`}>
                  {kes0(est.total)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative mt-6">
            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 font-semibold text-navy-900 transition-transform hover:scale-[1.02]"
            >
              Apply for {product.name.replace("Voryn ", "")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-white/[0.06] p-3 border border-white/10 text-xs leading-relaxed text-silver-300">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>
                <strong className="text-white">Competitive Interest Rates:</strong> Rates are indicative and competitive, tailored to each borrower depending on their individual credit-risk assessment, enterprise performance, and repayment history. This calculation is for illustration purposes.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
