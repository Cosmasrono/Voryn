import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Clock, Wallet, Zap, Target, ListChecks, Phone } from "lucide-react";
import { products, productBySlug, formatKES } from "@/lib/products";
import { accents } from "@/lib/accents";
import { site } from "@/lib/site";
import ProductIcon from "@/components/ProductIcon";
import Reveal from "@/components/Reveal";
import LoanCalculator from "@/components/LoanCalculator";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — ${product.short}`,
    description: product.summary,
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const a = accents[product.accent];
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-x relative py-16 sm:py-20">
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-silver-400">
            <Link href="/" className="hover:text-gold-400">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gold-400">Loan Products</Link>
            <span>/</span>
            <span className="text-silver-300">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${a.icon}`}>
                  <ProductIcon slug={product.slug} className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-silver-200">
                  {product.category}
                </span>
              </div>
              <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-2 font-display text-xl font-semibold text-gold-400">{product.headline}</p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-silver-300">
                {product.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-navy-900 transition-transform hover:scale-[1.03]"
                >
                  Apply for {product.name}
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" /> Talk to us
                </a>
              </div>
            </div>

            {/* Image + key facts */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">Key terms</p>
              <dl className="mt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-gold-400" />
                  <div>
                    <dt className="text-xs text-silver-400">Loan amount</dt>
                    <dd className="font-display text-lg font-bold text-white">
                      {formatKES(product.min)} – {formatKES(product.max)}
                    </dd>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gold-400" />
                  <div>
                    <dt className="text-xs text-silver-400">Repayment period</dt>
                    <dd className="font-display text-lg font-bold text-white">{product.tenure}</dd>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-gold-400" />
                  <div>
                    <dt className="text-xs text-silver-400">Disbursement</dt>
                    <dd className="font-display text-lg font-bold text-white">{product.disbursement}</dd>
                  </div>
                </div>
              </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          <Reveal>
            <div className="rounded-2xl border border-silver-200 bg-white p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                <Target className="h-5.5 w-5.5" />
              </div>
              <h2 className="mt-4 font-display text-xl font-bold text-navy-800">Who it&apos;s for</h2>
              <ul className="mt-4 space-y-2.5">
                {product.bestFor.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-silver-700">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${a.soft}`} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-2xl border border-silver-200 bg-white p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                <ListChecks className="h-5.5 w-5.5" />
              </div>
              <h2 className="mt-4 font-display text-xl font-bold text-navy-800">What you can use it for</h2>
              <ul className="mt-4 space-y-2.5">
                {product.uses.map((u) => (
                  <li key={u} className="flex items-start gap-2.5 text-sm text-silver-700">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${a.soft}`} />
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className={`rounded-2xl border border-silver-200 bg-white p-7`}>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${a.icon}`}>
                <Zap className="h-5.5 w-5.5" />
              </div>
              <h2 className="mt-4 font-display text-xl font-bold text-navy-800">Features &amp; benefits</h2>
              <ul className="mt-4 space-y-2.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-silver-700">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${a.soft}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold text-navy-800">
            Estimate your {product.name} repayment
          </h2>
          <p className="mt-2 max-w-2xl text-silver-600">
            Move the sliders for an instant indicative estimate. Final terms are confirmed on
            application.
          </p>
          <Reveal className="mt-8">
            <LoanCalculator products={products} initialSlug={product.slug} lockProduct />
          </Reveal>
        </div>
      </section>

      {/* Other products */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold text-navy-800">Other Voryn loans</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group card-lift rounded-2xl border border-silver-200 bg-white p-6 hover:shadow-lg"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accents[p.accent].icon}`}>
                  <ProductIcon slug={p.slug} className="h-5.5 w-5.5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-800">{p.name}</h3>
                <p className="text-sm text-silver-500">{p.short}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy-700">
                  View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
