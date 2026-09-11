import type { Metadata } from "next";
import Link from "next/link";
import { Check, Clock, Wallet, ArrowRight, Sparkles, TrendingUp, Bike } from "lucide-react";
import { products, formatKES } from "@/lib/products";
import { accents } from "@/lib/accents";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import LoanCalculator from "@/components/LoanCalculator";
import InteractiveProductsSection from "@/components/InteractiveProductsSection";
import GraduationPathway from "@/components/GraduationPathway";

export const metadata: Metadata = {
  title: "Loan Products & Graduation Pathway",
  description:
    "Explore Voryn Capital's six loan products - from Voryn Biashara starter working capital to Voryn Chama, Agri-Boost, Growth, and Voryn Asset Loan for productive equipment, machinery, tools, and motorcycles.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Loan Products"
        title="Finance tailored to the real rhythm of your trade"
        subtitle="Six focused facilities covering starter working capital, group chamas, women entrepreneurs, seasonal farming, and asset loans for productive business equipment, machinery, and motorcycles."
        crumbs={[{ label: "Home", href: "/" }, { label: "Loan Products" }]}
      />

      {/* Interactive Products Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Explore Products"
            title="Interactive Loan Directory"
            subtitle="Click on any loan below to test instant repayment figures, check qualifications, or explore how to graduate into it."
          />

          <div className="mt-12">
            <InteractiveProductsSection products={products} showCompareLink={false} />
          </div>
        </div>
      </section>

      {/* Interactive Graduation Pathway */}
      <GraduationPathway products={products} />

      {/* Loan calculator standalone */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Loan Calculator"
            title="See what repayment looks like"
            subtitle="Select any product, slide the amount and choose your preferred tenure to see indicative weekly or monthly installments."
          />
          <Reveal className="mt-12">
            <LoanCalculator products={products} />
          </Reveal>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="At a glance"
            title="Compare all six products"
            subtitle="A clear side-by-side comparison to help you find the right fit for your enterprise."
          />

          <Reveal className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse overflow-hidden rounded-2xl bg-white text-left text-sm shadow-md border border-silver-200">
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th className="px-5 py-4 font-semibold">Product</th>
                  <th className="px-5 py-4 font-semibold">Client Status</th>
                  <th className="px-5 py-4 font-semibold">Amount Range</th>
                  <th className="px-5 py-4 font-semibold">Repayment Period</th>
                  <th className="px-5 py-4 font-semibold">Primary Target</th>
                  <th className="px-5 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug} className="border-b border-silver-200 last:border-0 hover:bg-silver-50/70 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <span className={`h-3 w-3 rounded-full ${accents[p.accent].bar}`} />
                        <div>
                          <p className="font-bold text-navy-800">{p.name}</p>
                          <p className="text-xs text-silver-500">{p.short}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {p.isStarterProduct ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                          <Sparkles className="h-3 w-3" /> Starter (New Clients)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-navy-100 px-2.5 py-0.5 text-xs font-bold text-navy-800">
                          <TrendingUp className="h-3 w-3 text-gold-600" /> {p.graduationTier}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 font-semibold text-navy-900">
                      {formatKES(p.min)} – {formatKES(p.max)}
                    </td>
                    <td className="px-5 py-4 text-navy-800 font-medium">{p.tenure}</td>
                    <td className="px-5 py-4 text-xs text-silver-600 max-w-xs">{p.bestFor[0]}</td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/products/${p.slug}`}
                        className="inline-flex items-center gap-1 font-bold text-navy-800 hover:text-gold-600 transition-colors text-xs"
                      >
                        View Details <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Wallet,
                t: "Starter Biashara",
                d: "Open directly to all new business owners with active daily trade.",
              },
              {
                icon: TrendingUp,
                t: "Progressive Graduation",
                d: "On-time repayments build your trust record and unlock specialized facilities.",
              },
              {
                icon: Bike,
                t: "Productive Assets",
                d: "Finance productive equipment, commercial machinery, tools, and delivery motorcycles without putting up land title deeds.",
              },
            ].map((f) => (
              <div
                key={f.t}
                className="flex items-start gap-3 rounded-2xl border border-silver-200 bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-navy-800">{f.t}</p>
                  <p className="text-xs sm:text-sm text-silver-600 mt-0.5 leading-relaxed">{f.d}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
