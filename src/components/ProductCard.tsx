"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Wallet, Sparkles, TrendingUp, Calculator } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatKES } from "@/lib/products";
import { accents } from "@/lib/accents";
import ProductIcon from "./ProductIcon";

export default function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  const a = accents[product.accent];

  const handleCardClick = (e: React.MouseEvent) => {
    // If clicking directly on a link or button inside, let it handle
    const target = e.target as HTMLElement;
    if (target.closest("a") && !target.closest(".quick-view-btn")) return;
    if (onQuickView) {
      e.preventDefault();
      onQuickView(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group card-glow relative flex flex-col overflow-hidden rounded-2xl border border-silver-200 bg-white shadow-[0_1px_3px_rgba(16,26,61,0.04)] cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${a.ring}`}
    >
      {/* Image header */}
      <div className="relative h-48 w-full overflow-hidden bg-navy-950">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-108"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" />
        {/* Accent top bar */}
        <div className={`absolute inset-x-0 top-0 h-1 ${a.bar}`} />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {product.isStarterProduct ? (
            <span className="flex items-center gap-1 rounded-full bg-emerald-600/90 backdrop-blur-sm px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-white shadow-md">
              <Sparkles className="h-3 w-3" /> Starter Loan
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-navy-900/80 backdrop-blur-sm px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-gold-300 border border-gold-500/30 shadow-md">
              <TrendingUp className="h-3 w-3 text-gold-400" /> Graduation
            </span>
          )}

          {product.flagship && (
            <span className="rounded-full bg-gold-500 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-navy-900 shadow-md">
              Flagship
            </span>
          )}
        </div>

        {/* Floating icon */}
        <div className={`absolute -bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-xl shadow-lg ${a.icon}`}>
          <ProductIcon slug={product.slug} className="h-5.5 w-5.5" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-8">
        <div className="flex items-center justify-between">
          <span className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.chip}`}>
            {product.category}
          </span>
          <span className="text-[0.7rem] font-medium text-silver-400">
            {product.isStarterProduct ? "Open to New Clients" : "Trust Required"}
          </span>
        </div>

        <h3 className="mt-2.5 font-display text-xl font-bold text-navy-800 group-hover:text-navy-950 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-silver-500">{product.short}</p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-silver-600">{product.summary}</p>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-silver-200 pt-4 text-sm">
          <div className="flex items-start gap-2">
            <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-silver-400" />
            <div>
              <p className="text-[0.7rem] uppercase tracking-wide text-silver-400">Amount</p>
              <p className="font-semibold text-navy-800">
                {formatKES(product.min).replace("KES ", "")} – {formatKES(product.max).replace("KES ", "")}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-silver-400" />
            <div>
              <p className="text-[0.7rem] uppercase tracking-wide text-silver-400">Tenure</p>
              <p className="font-semibold text-navy-800">{product.tenure}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-between border-t border-silver-100 pt-4 gap-2">
          {onQuickView ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="quick-view-btn inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3.5 py-1.5 text-xs font-bold text-navy-800 transition-colors hover:bg-gold-500 hover:text-navy-950"
            >
              <Calculator className="h-3.5 w-3.5" />
              Quick View &amp; Calculate
            </button>
          ) : (
            <span className="text-xs font-semibold text-navy-700">View details</span>
          )}

          <Link
            href={`/products/${product.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs font-bold text-navy-700 hover:text-gold-600 transition-colors"
          >
            Details <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
