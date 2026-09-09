import type { Metadata } from "next";
import Link from "next/link";
import { Check, Clock, Wallet, ArrowRight } from "lucide-react";
import { products, formatKES } from "@/lib/products";
import { accents } from "@/lib/accents";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import LoanCalculator from "@/components/LoanCalculator";

export const metadata: Metadata = {
  title: "Loan Products",
  description:
    "Explore Voryn Capital's five loan products - from Voryn Daily Trader quick cash to Voryn Growth SME financing up to KES 1,000,000.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Loan Products"
        title="Finance matched to the way you trade"
        subtitle="Five focused products covering everyday working capital, ultra-short daily cash, women-led businesses, premium SME growth and seasonal agriculture."
        crumbs={[{ label: "Home", href: "/" }, { label: "Loan Products" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Loan calculator */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Loan Calculator"
            title="See what repayment could look like"
            subtitle="Pick a product, amount and period for an instant indicative estimate. Adjust and compare before you apply."
          />
          <Reveal className="mt-12">
            <LoanCalculator products={products} />
          </Reveal>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="At a glance"
            title="Compare the products"
            subtitle="A quick side-by-side to help you find the right fit."
          />

          <Reveal className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse overflow-hidden rounded-2xl bg-white text-left text-sm shadow-sm">
              <thead>
                <tr className="bg-navy-800 text-white">
                  <th className="px-5 py-4 font-semibold">Product</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Tenure</th>
                  <th className="px-5 py-4 font-semibold">Best for</th>
                  <th className="px-5 py-4" />
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug} className="border-b border-silver-200 last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${accents[p.accent].bar}`} />
                        <div>
                          <p className="font-semibold text-navy-800">{p.name}</p>
                          <p className="text-xs text-silver-500">{p.short}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-navy-800">
                      {formatKES(p.min).replace("KES ", "KES ")} – {formatKES(p.max).replace("KES ", "")}
                    </td>
                    <td className="px-5 py-4 text-navy-800">{p.tenure}</td>
                    <td className="px-5 py-4 text-silver-600">{p.bestFor[0]}</td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/products/${p.slug}`}
                        className="inline-flex items-center gap-1 font-semibold text-navy-700 hover:text-gold-600"
                      >
                        View <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Wallet, t: "Unsecured", d: "No collateral for qualifying clients." },
              { icon: Clock, t: "Short cycles", d: "Weekly, bi-weekly & monthly terms." },
              { icon: Check, t: "Advisory included", d: "Coaching bundled with every loan." },
            ].map((f) => (
              <div key={f.t} className="flex items-start gap-3 rounded-xl border border-silver-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-navy-800">{f.t}</p>
                  <p className="text-sm text-silver-600">{f.d}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
