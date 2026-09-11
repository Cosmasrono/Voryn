"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Bike,
  Store,
  Users,
  Sprout,
  HeartHandshake,
  Layers,
} from "lucide-react";
import type { Product } from "@/lib/products";

type PathwayLevel = {
  level: number;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  who: string;
  unlockCriteria: string;
  loanSlugs: string[];
  perks: string[];
};

const levels: PathwayLevel[] = [
  {
    level: 1,
    badge: "Open to All New Clients",
    badgeColor: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
    title: "Level 1: The Starter Foundation",
    subtitle: "Voryn Biashara — Start your journey here",
    who: "Every new client begins here. No paperwork mountain, no land deeds.",
    unlockCriteria: "Immediate application for all registered or operating micro-businesses.",
    loanSlugs: ["voryn-biashara"],
    perks: [
      "100% unsecured working capital from KES 10,000 to KES 20,000",
      "Instant M-Pesa disbursement to keep business moving",
      "Free cash-flow & record-keeping coaching from your relationship officer",
      "Every on-time repayment boosts your internal Voryn Trust Score",
    ],
  },
  {
    level: 2,
    badge: "Graduation Tier • Earned with Trust",
    badgeColor: "bg-gold-500/15 text-gold-700 border-gold-500/30",
    title: "Level 2: Specialized Enterprise Facilities",
    subtitle: "Voryn Chama, Agri-Boost & Mama Biashara",
    who: "Clients with 1–2 successful repayment cycles or verified registered chamas.",
    unlockCriteria: "Consistent on-time repayments on Voryn Biashara or verified group minutes.",
    loanSlugs: ["voryn-chama", "voryn-agri-boost", "voryn-mama-biashara"],
    perks: [
      "Voryn Chama: KES 10,000 – 30,000 for table-banking & group joint investments",
      "Voryn Agri-Boost: KES 5,000 – 20,000 synchronized to seasonal crop & livestock cycles",
      "Voryn Mama Biashara: Priority terms and coaching for women stallholders",
      "Flexible tenures: 7 to 90 days matching your trade cash-flow rhythm",
    ],
  },
  {
    level: 3,
    badge: "Asset & Scale • Top Tier",
    badgeColor: "bg-navy-700/10 text-navy-800 border-navy-700/20",
    title: "Level 3: Asset Ownership & Enterprise Scale",
    subtitle: "Voryn Asset Loan & Voryn Growth",
    who: "Proven businesses ready to acquire revenue-generating machinery and scale bulk orders.",
    unlockCriteria: "Established repayment track record and strong ongoing daily turnover.",
    loanSlugs: ["voryn-asset-loan", "voryn-growth"],
    perks: [
      "Voryn Asset Loan: KES 10,000 – 150,000 for productive equipment, machinery, tools & motorcycles (boda boda)",
      "Voryn Growth: KES 21,000 – 100,000 for bulk stock & business expansion",
      "Longer tenures up to 12 months with predictable monthly repayment",
      "Asset acts as the primary productive security — ownership transfers 100% to you",
    ],
  },
];

export default function GraduationPathway({
  products,
  onSelectProduct,
}: {
  products: Product[];
  onSelectProduct?: (product: Product) => void;
}) {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const activeData = levels.find((l) => l.level === selectedLevel) ?? levels[0];

  const matchingProducts = products.filter((p) => activeData.loanSlugs.includes(p.slug));

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-900 via-navy-950 to-navy-900 py-20 text-white sm:py-24">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute left-1/2 -top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

      <div className="container-x relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow !text-gold-400">
            <span className="h-px w-6 bg-current" />
            Graduation Pathway
            <span className="h-px w-6 bg-current" />
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl text-white">
            How You Grow With Voryn: <span className="gradient-gold">Step by Step</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-silver-300 leading-relaxed">
            We don&apos;t ask for land title deeds or car logbooks. For all new clients, you begin with{" "}
            <strong className="text-white">Voryn Biashara</strong>. As you repay on time and build trust, you graduate to unlock specialized group loans, agricultural finance, and asset loans for productive equipment, machinery, and motorcycles.
          </p>
        </div>

        {/* 3 Step Interactive Level Switcher */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {levels.map((lvl) => {
            const isSelected = selectedLevel === lvl.level;
            return (
              <button
                key={lvl.level}
                onClick={() => setSelectedLevel(lvl.level)}
                className={`group relative flex flex-col rounded-2xl p-6 text-left transition-all duration-300 ${
                  isSelected
                    ? "border-2 border-gold-500 bg-white/10 shadow-xl shadow-gold-500/10 scale-[1.02]"
                    : "border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold transition-colors ${
                      isSelected
                        ? "bg-gold-500 text-navy-950 shadow-md"
                        : "bg-white/10 text-silver-300 group-hover:bg-white/20"
                    }`}
                  >
                    0{lvl.level}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider ${
                      isSelected ? "border-gold-400/50 bg-gold-500/20 text-gold-300" : "border-white/10 text-silver-400"
                    }`}
                  >
                    {lvl.level === 1 ? "New Clients" : "Graduation"}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                  {lvl.title}
                </h3>
                <p className="mt-1 text-xs text-silver-400">{lvl.subtitle}</p>

                {isSelected && (
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-gold-400">
                    <span>Active Stage View</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Display Card */}
        <div className="mt-8 rounded-3xl border border-white/15 bg-white/[0.06] p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left: Explanation & Perks */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-gold-500/20 border border-gold-500/30 px-3 py-1 text-xs font-bold text-gold-300">
                  Level {activeData.level} of 3
                </span>
                <span className="text-xs text-silver-400 font-medium">{activeData.badge}</span>
              </div>

              <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl text-white">
                {activeData.title}
              </h3>
              <p className="mt-2 text-sm text-silver-300 leading-relaxed">{activeData.who}</p>

              {/* Requirement pill */}
              <div className="mt-4 rounded-xl border border-gold-500/30 bg-gold-500/10 p-3.5 text-xs sm:text-sm text-gold-200 flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" />
                <div>
                  <strong className="text-gold-300">Unlock Requirement: </strong>
                  {activeData.unlockCriteria}
                </div>
              </div>

              {/* Perks list */}
              <div className="mt-6 space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-silver-400">What you unlock:</p>
                {activeData.perks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-silver-200">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Matching Loan Cards */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-silver-400">
                Products Available in Level {activeData.level}:
              </p>

              <div className="space-y-3">
                {matchingProducts.map((p) => (
                  <div
                    key={p.slug}
                    className="group relative rounded-2xl border border-white/15 bg-white/[0.05] p-4 transition-all hover:bg-white/[0.1] hover:border-gold-500/40"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500 text-navy-900 font-bold shadow-md">
                          {p.slug === "voryn-asset-loan" && <Bike className="h-5 w-5" />}
                          {p.slug === "voryn-biashara" && <Store className="h-5 w-5" />}
                          {p.slug === "voryn-chama" && <Users className="h-5 w-5" />}
                          {p.slug === "voryn-agri-boost" && <Sprout className="h-5 w-5" />}
                          {p.slug === "voryn-mama-biashara" && <HeartHandshake className="h-5 w-5" />}
                          {p.slug === "voryn-growth" && <TrendingUp className="h-5 w-5" />}
                        </div>
                        <div>
                          <h4 className="font-display text-base font-bold text-white group-hover:text-gold-300 transition-colors">
                            {p.name}
                          </h4>
                          <p className="text-xs text-silver-400">{p.short}</p>
                        </div>
                      </div>

                      <span className="text-right text-xs font-bold text-gold-400">
                        KES {p.min.toLocaleString()} – {p.max.toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-xs text-silver-300 leading-relaxed">
                      {p.summary}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="text-[0.7rem] text-silver-400">Tenure: {p.tenure}</span>

                      {onSelectProduct ? (
                        <button
                          onClick={() => onSelectProduct(p)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors"
                        >
                          Quick View &amp; Calculate <ArrowRight className="h-3 w-3" />
                        </button>
                      ) : (
                        <Link
                          href={`/products/${p.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors"
                        >
                          View Details <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Guidance CTA */}
              <div className="mt-4 rounded-xl bg-navy-950/80 p-4 border border-white/10 text-center">
                {activeData.level === 1 ? (
                  <Link
                    href="/contact?product=Voryn+Biashara"
                    className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-2.5 text-xs font-bold text-navy-950 hover:bg-gold-400 transition-all shadow-md"
                  >
                    Apply for Voryn Biashara (Starter Loan)
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <p className="text-xs text-silver-300">
                    Are you a new borrower?{" "}
                    <Link
                      href="/contact?product=Voryn+Biashara"
                      className="font-bold text-gold-400 underline hover:text-gold-300"
                    >
                      Start with Voryn Biashara today
                    </Link>{" "}
                    to build your graduation pathway!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
