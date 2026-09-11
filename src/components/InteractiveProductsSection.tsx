"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Filter, Info } from "lucide-react";
import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

export default function InteractiveProductsSection({
  products,
  showCompareLink = true,
}: {
  products: Product[];
  showCompareLink?: boolean;
}) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filters = [
    { id: "all", label: `All Loans (${products.length})` },
    { id: "starter", label: "Starter Loan (New Clients)" },
    { id: "graduation", label: "Graduation Loans" },
    { id: "asset", label: "Asset & Motorcycles" },
    { id: "chama", label: "Chama & Groups" },
    { id: "agri", label: "Agriculture" },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "starter") return p.isStarterProduct;
    if (activeFilter === "graduation") return !p.isStarterProduct;
    if (activeFilter === "asset") return p.slug === "voryn-asset-loan";
    if (activeFilter === "chama") return p.slug === "voryn-chama";
    if (activeFilter === "agri") return p.slug === "voryn-agri-boost";
    return true;
  });

  return (
    <div>
      {/* Human-Friendly New Client Notification Banner */}
      <div className="mb-8 rounded-2xl border border-gold-500/30 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 p-4 sm:p-5 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-500 text-navy-950 font-bold shadow-md">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
                New Client Policy &amp; Graduation Rule
              </p>
              <p className="mt-0.5 text-xs sm:text-sm text-silver-300">
                Are you new to Voryn Capital? All first-time clients begin with{" "}
                <strong className="text-white">Voryn Biashara</strong> to establish an on-time repayment record. As you build trust, you graduate to unlock our specialized Chama, Agri, Growth, and Asset loans!
              </p>
            </div>
          </div>

          <Link
            href="/contact?product=Voryn+Biashara"
            className="shrink-0 rounded-full bg-gold-500 px-5 py-2 text-xs font-bold text-navy-950 hover:bg-gold-400 transition-colors shadow"
          >
            Start with Biashara →
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === f.id
                ? "bg-navy-800 text-white shadow-md shadow-navy-800/20 scale-[1.03]"
                : "bg-silver-100 text-silver-600 hover:bg-silver-200 hover:text-navy-800"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Product Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((p) => (
          <ProductCard
            key={p.slug}
            product={p}
            onQuickView={(prod) => setSelectedProduct(prod)}
          />
        ))}

        {showCompareLink && (
          <Link
            href="/products"
            className="card-glow group flex h-full min-h-[20rem] flex-col items-center justify-center rounded-2xl border border-dashed border-navy-300 bg-gradient-to-br from-navy-50/80 to-silver-100/30 p-6 text-center transition-transform hover:scale-[1.02]"
          >
            <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-navy-700 text-white shadow-lg shadow-navy-700/30 transition-transform group-hover:scale-110">
              <ArrowRight className="h-6 w-6" />
            </div>
            <p className="mt-4 font-display text-lg font-bold text-navy-800">
              Compare all 6 products
            </p>
            <p className="mt-1 text-xs sm:text-sm text-silver-500">
              Side-by-side comparison &amp; loan calculator
            </p>
          </Link>
        )}
      </div>

      {/* Interactive Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
