import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  HandCoins,
  Clock,
  BadgeCheck,
  GraduationCap,
  Landmark,
  Users,
  Quote,
  Check,
  Star,
  Zap,
  Sparkles,
  Bike,
} from "lucide-react";
import { products } from "@/lib/products";
import { site, stats } from "@/lib/site";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SectionHeading from "@/components/SectionHeading";
import InteractiveProductsSection from "@/components/InteractiveProductsSection";
import GraduationPathway from "@/components/GraduationPathway";

const steps = [
  {
    icon: Smartphone,
    title: "1. Apply in minutes",
    body: "Reach out via phone, WhatsApp or your local relationship officer. Simple requirements, no mountain of paperwork.",
  },
  {
    icon: BadgeCheck,
    title: "2. Fast, sensible assessment",
    body: "We look at your real business turnover and cash flow — not demanding land titles or car logbooks.",
  },
  {
    icon: HandCoins,
    title: "3. Receive on M-Pesa & graduate",
    body: "Funds disburse straight to your phone. Repay on schedule to unlock bigger limits, group chamas, and asset loans.",
  },
];

const why = [
  {
    icon: Clock,
    title: "Built for real trading cycles",
    body: "Weekly and monthly terms shaped around how market traders, artisans, and small enterprises actually earn.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent & human",
    body: "Plain language, zero hidden charges, and sensible borrowing limits that protect your business cash flow.",
  },
  {
    icon: TrendingUp,
    title: "Clear graduation pathway",
    body: "New clients start with Voryn Biashara, and with trust, graduate to Chama, Agri, Growth, and Asset loans up to KES 150,000.",
  },
  {
    icon: GraduationCap,
    title: "Hands-on advisory included",
    body: "Every loan is supported by practical, down-to-earth advice on record-keeping, margins, and inventory turnover.",
  },
  {
    icon: Smartphone,
    title: "Relationship-first + digital",
    body: "Dedicated officers who visit your business in person, backed by fast and familiar M-Pesa payments.",
  },
  {
    icon: Landmark,
    title: "Backed by Voryn Group",
    body: `The governance, financial strength, and multi-sector support of ${site.group}.`,
  },
];

const testimonials = [
  {
    quote:
      "I restocked my general shop the same afternoon I applied. As a first-time client, Voryn Biashara gave me the exact boost I needed, and my limit has grown steadily.",
    name: "Beatrice M.",
    role: "Retail shop owner, Machakos",
  },
  {
    quote:
      "Financing my Boxer delivery motorcycle through Voryn Asset Loan gave me reliable daily income. No title deed was demanded, just reasonable monthly installments that match my courier earnings.",
    name: "Peter O.",
    role: "Logistics & boda boda operator, Nairobi",
  },
  {
    quote:
      "Our women's group needed funds to purchase wholesale stock together. Voryn Chama understood table-banking and the relationship officer even attended our meeting.",
    name: "Mary N.",
    role: "Market vendor & Chama treasurer, Meru",
  },
];

const trustedBadges = [
  "M-Pesa Enabled",
  "No Land Titles Needed",
  "Clear Plain Terms",
  "New Client Starter Loan",
  "Motorcycle & Asset Financing",
  "Chama Group Loans",
  "Direct Human Support",
  "M-Pesa Enabled",
  "No Land Titles Needed",
  "Clear Plain Terms",
  "New Client Starter Loan",
  "Motorcycle & Asset Financing",
];

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative min-h-[92vh] lg:min-h-screen overflow-hidden text-white flex flex-col">
        {/* Full-screen background image */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Vibrant commercial enterprise - the businesses Voryn Capital partners with"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Multi-layer dark overlay for legibility + brand tone */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/92 via-navy-950/80 to-navy-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Ambient glows */}
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-gold-500/15 blur-3xl pointer-events-none" />
        <div className="orb-float-slow absolute -right-20 top-10 h-96 w-96 rounded-full bg-navy-400/20 blur-3xl pointer-events-none" />

        {/* Content grid */}
        <div className="container-x relative flex flex-1 items-center">
          <div className="grid w-full items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
            {/* Left - headline + CTAs */}
            <div>
              <Reveal delay={0.03}>
                <span className="eyebrow !text-gold-400">
                  <span className="h-px w-6 bg-current" />
                  Your Trusted Growth Partner
                  <span className="h-px w-6 bg-current" />
                </span>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-balance sm:text-5xl lg:text-[3.6rem]">
                  Capital for growth.
                  <br />
                  <span className="gradient-gold">Credit for enterprise.</span>
                  <br />
                  Assets for tomorrow.
                </h1>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-silver-300">
                  Sensible working capital, Chama group finance, and asset loans for motorcycles and machinery. For new clients, start with <strong className="text-white font-semibold">Voryn Biashara</strong> and graduate to unlock higher limits as you build trust.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="btn-gold group inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-navy-900 shadow-lg shadow-gold-500/30"
                  >
                    Apply for Starter Loan
                    <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50"
                  >
                    Explore all 6 loans
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-silver-300">
                  {[
                    "Starter: Voryn Biashara",
                    "Asset & Motorcycle loans",
                    "Instant M-Pesa",
                    "Zero hidden fees",
                  ].map((t) => (
                    <span key={t} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500/20 ring-1 ring-gold-500/40">
                        <Check className="h-3 w-3 text-gold-400" />
                      </span>
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right - Interactive graduation widget */}
            <Reveal delay={0.18} className="relative">
              <div className="glow-widget relative mx-auto max-w-md rounded-3xl border border-white/15 bg-navy-950/80 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-500/15 blur-2xl pointer-events-none" />

                <div className="relative flex items-center justify-between">
                  <div>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[0.7rem] font-bold text-emerald-300 border border-emerald-500/30">
                      Graduation Pathway
                    </span>
                    <p className="mt-2 font-display text-xl font-bold text-white">
                      Grow with Trust
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/30">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>

                <div className="relative mt-6 space-y-3">
                  {[
                    {
                      label: "Stage 1: Starter Client",
                      loan: "Voryn Biashara",
                      value: "KES 10K – 25K",
                      w: "25%",
                      active: true,
                    },
                    {
                      label: "Stage 2: Repaid on Time",
                      loan: "Biashara Limit Boost",
                      value: "KES 25K – 50K",
                      w: "50%",
                    },
                    {
                      label: "Stage 3: Specialized Unlock",
                      loan: "Chama & Agri-Boost",
                      value: "KES 10K – 30K",
                      w: "75%",
                    },
                    {
                      label: "Stage 4: Asset & Scale",
                      loan: "Asset Loan (Motorcycle/Equip)",
                      value: "Up to KES 150,000",
                      w: "100%",
                    },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-white/[0.07] p-3 transition-colors hover:bg-white/10"
                    >
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div>
                          <span className="font-semibold text-white">{row.loan}</span>
                          <span className="block text-[0.7rem] text-silver-400">{row.label}</span>
                        </div>
                        <span className="font-bold text-gold-400">{row.value}</span>
                      </div>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-300"
                          style={{ width: row.w }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative mt-5 flex items-start gap-2.5 rounded-xl bg-gold-500/12 p-3 text-xs text-gold-200 border border-gold-500/20">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" />
                  <span>
                    <strong>New clients start with Voryn Biashara.</strong> Repaying reliably unlocks our motorcycle asset loans, group chamas, and higher limits.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Trusted badges marquee */}
        <div className="relative border-t border-white/10 bg-navy-950/70 py-3.5 backdrop-blur-sm overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {trustedBadges.map((badge, i) => (
              <span
                key={i}
                className="mx-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-silver-400"
              >
                <Zap className="h-3 w-3 text-gold-500" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-navy-950 text-white border-b border-white/5">
        <div className="container-x grid grid-cols-2 gap-0 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.07} className="relative text-center">
              {i > 0 && (
                <span className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/10 lg:block" />
              )}
              <div className="py-10 px-6">
                <p className="glow-gold font-display text-3xl font-extrabold text-gold-400 sm:text-4xl">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs sm:text-sm text-silver-400">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= PRODUCTS (INTERACTIVE) ================= */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Loan Products"
            title="Six tailored loans, built for your everyday hustle"
            subtitle="Click any product below to test interactive repayments, check requirements, or see where it fits in the graduation pathway."
          />

          <div className="mt-12">
            <InteractiveProductsSection products={products} />
          </div>
        </div>
      </section>

      {/* ================= GRADUATION PATHWAY (INTERACTIVE) ================= */}
      <GraduationPathway products={products} />

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-mesh opacity-60" />
        <div className="container-x relative">
          <SectionHeading
            center
            light
            eyebrow="Simple, Human Process"
            title="From conversation to cash in three straightforward steps"
            subtitle="No automated runarounds. Real relationship officers who understand the real economy."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="step-connector relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all hover:bg-white/[0.07] hover:border-white/20">
                  <span className="absolute right-6 top-5 font-display text-6xl font-extrabold text-white/[0.04]">
                    0{i + 1}
                  </span>
                  <span className="absolute -top-3.5 left-6 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold-500 text-xs font-extrabold text-navy-900 shadow-md shadow-gold-500/30">
                    {i + 1}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/25 mt-3">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-silver-300 leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="relative py-20 sm:py-24 overflow-hidden bg-cream">
        <div className="container-x relative">
          <SectionHeading
            center
            eyebrow="Why Voryn"
            title="More than a lender — your practical growth partner"
            subtitle="We pair responsible credit with down-to-earth business coaching and long-term asset building."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={i} delay={(i % 3) * 0.07}>
                <div className="card-gold-top h-full rounded-2xl border border-silver-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-navy-600 to-navy-800 text-white shadow-md shadow-navy-700/20">
                    <w.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy-800">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver-600">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BUILT FOR COMMUNITY ENTERPRISE ================= */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow !text-gold-400">
              <span className="h-px w-6 bg-current" /> Community Enterprise
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Built for the real economy — the market, the workshop, the farm
            </h2>
            <p className="mt-4 text-silver-300 leading-relaxed">
              We meet business owners where real commerce takes place: in the market stalls, carpentry workshops, boda boda stages, retail shops, and smallholder farms that drive daily livelihoods. Our relationship officers know your trade, your seasons, and your ambitions.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { k: "Everyday Traders", v: "Retail stores, stalls & mini-marts" },
                { k: "Asset Owners", v: "Motorcycles, tools & machinery" },
                { k: "Chamas & Groups", v: "Table-banking & group savings" },
                { k: "Seasonal Farmers", v: "Crop cycles & livestock finance" },
              ].map((c) => (
                <div
                  key={c.k}
                  className="group rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-all hover:bg-white/[0.08] hover:border-white/20 cursor-default"
                >
                  <p className="font-display font-bold text-white">{c.k}</p>
                  <p className="text-xs text-silver-400 mt-1">{c.v}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "/images/asset-loan.jpg", alt: "Motorcycle delivery courier outside general store" },
                { src: "/images/hardware-shop.jpg", alt: "Small enterprise retail shop owner" },
                { src: "/images/chama-group.jpg", alt: "Chama group meeting discussing table-banking" },
                { src: "/images/smallholder-farmers.jpg", alt: "Farmers working on productive agricultural land" },
              ].map((img, i) => (
                <div
                  key={i}
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 ${
                    i % 2 === 1 ? "mt-6" : ""
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gold-500/0 transition-colors hover:bg-gold-500/10" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= ADVISORY + ASSET MGMT ================= */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-silver-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-[0_12px_40px_rgba(16,26,61,0.08)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy-600 to-navy-800 text-white shadow-md shadow-navy-700/20">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-navy-800">
                Practical business coaching, included
              </h3>
              <p className="mt-3 text-silver-600 leading-relaxed">
                Every facility comes with friendly, practical coaching — calculating true gross margins, tracking daily cash in and cash out, managing stock turnover, and preventing tied-up dead inventory.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Simple cash-flow & record-keeping assistance",
                  "Pricing, profit & stock turnover guidance",
                  "One-on-one reviews directly with your relationship officer",
                  "Graduation assessments after every completed loan cycle",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-navy-800">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold-500/15">
                      <Check className="h-2.5 w-2.5 text-gold-600" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href="/advisory"
                className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-gold-600 transition-colors"
              >
                Learn about our advisory approach <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-navy-800 bg-navy-900 p-8 text-white shadow-xl">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/12 blur-3xl pointer-events-none" />
              <div className="absolute -left-8 bottom-0 h-40 w-40 rounded-full bg-navy-500/20 blur-2xl pointer-events-none" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/30">
                <Landmark className="h-6 w-6" />
              </div>
              <h3 className="relative mt-5 font-display text-2xl font-bold">
                Asset financing &amp; long-term ownership
              </h3>
              <p className="relative mt-3 text-silver-300 leading-relaxed">
                As part of {site.group}, we assist entrepreneurs in acquiring productive machinery, delivery motorcycles, and equipment that turn daily sweat into lasting equity.
              </p>
              <ul className="relative mt-5 space-y-2.5">
                {[
                  "Delivery motorcycle (boda boda / courier) financing up to KES 150K",
                  "Workshop machines, tailoring equipment & posho mill motors",
                  "Commercial cooling units & barbershop/salon setups",
                  "Smooth transition from micro-loans to asset ownership",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-silver-200">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold-500/20 border border-gold-500/30">
                      <Check className="h-2.5 w-2.5 text-gold-400" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href="/asset-management"
                className="relative mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
              >
                Explore asset financing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Client Stories"
            title="Real stories from everyday business owners"
            subtitle="Hear from entrepreneurs who started with Voryn Biashara and grew their limits and assets."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <figure className="group card-gold-top flex h-full flex-col rounded-2xl border border-silver-200 bg-white p-7 shadow-sm">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 star-gold fill-current" />
                    ))}
                  </div>
                  <div className="mb-2">
                    <Quote className="h-9 w-9 gradient-gold opacity-80" />
                  </div>
                  <blockquote className="flex-1 text-navy-800 leading-relaxed text-sm sm:text-base">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-silver-200 pt-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-navy-600 to-navy-800 font-display font-bold text-white shadow-md shadow-navy-700/20">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-navy-800">{t.name}</p>
                      <p className="text-xs text-silver-500">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-cream pb-24">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 px-8 py-16 text-center text-white sm:px-16">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute inset-0 bg-mesh opacity-70" />
              <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-500/12 blur-3xl pointer-events-none" />

              <div className="relative inline-block pulse-ring">
                <span className="inline-block h-3 w-3 rounded-full bg-gold-500" />
              </div>

              <div className="relative mt-6">
                <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold sm:text-4xl">
                  Take the first step with{" "}
                  <span className="gradient-gold">Voryn Biashara</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-silver-300">
                  Join hundreds of business owners who start with everyday working capital, build trust, and graduate to asset and equipment financing.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="btn-gold rounded-full bg-gold-500 px-8 py-3.5 font-semibold text-navy-900 shadow-lg shadow-gold-500/25"
                  >
                    Apply for Starter Loan
                  </Link>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="rounded-full border border-white/25 px-8 py-3.5 font-semibold text-white transition-all hover:bg-white/10 hover:border-white/40"
                  >
                    Call {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
