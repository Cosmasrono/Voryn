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
} from "lucide-react";
import { products } from "@/lib/products";
import { site, stats } from "@/lib/site";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    icon: Smartphone,
    title: "Apply in minutes",
    body: "Reach out via phone, WhatsApp or a local relationship officer. Simple requirements, no paperwork mountain.",
  },
  {
    icon: BadgeCheck,
    title: "Get approved fast",
    body: "We assess your real cash flow and trading history — not just collateral. Same-day approval for repeat clients.",
  },
  {
    icon: HandCoins,
    title: "Receive on M-Pesa",
    body: "Funds are disbursed instantly to your mobile money. Repay conveniently and unlock a bigger limit next time.",
  },
];

const why = [
  {
    icon: Clock,
    title: "Built for real cash-flow cycles",
    body: "Weekly, bi-weekly and monthly terms designed around how rural and informal businesses actually earn.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent & responsible",
    body: "Clear terms, no hidden charges, and responsible lending limits that grow only as you succeed.",
  },
  {
    icon: TrendingUp,
    title: "Graduated credit",
    body: "Every loan repaid on time unlocks a higher limit — from KES 20,000 all the way to KES 1,000,000.",
  },
  {
    icon: GraduationCap,
    title: "Advisory included",
    body: "Every loan is paired with practical coaching on cash flow, pricing and record-keeping.",
  },
  {
    icon: Smartphone,
    title: "Local + digital",
    body: "A 'touch-tech' model: on-the-ground relationship officers plus simple M-Pesa tools.",
  },
  {
    icon: Landmark,
    title: "Backed by Voryn Group",
    body: `Governance, capital strength and multi-sector expertise of ${site.group}.`,
  },
];

const testimonials = [
  {
    quote:
      "I restocked my shop the same afternoon I applied. My limit has grown three times since my first Voryn Biashara loan.",
    name: "Beatrice M.",
    role: "Retail shop owner, Machakos",
  },
  {
    quote:
      "As a produce seller I needed money fast, weekly. Voryn Daily Trader fits exactly how I buy and sell.",
    name: "James K.",
    role: "Fresh-produce trader, Kitengela",
  },
  {
    quote:
      "The coaching was as valuable as the loan. Mama Biashara understood my business and believed in me.",
    name: "Mary N.",
    role: "Market vendor, Meru",
  },
];

const trustedBadges = [
  "M-Pesa Enabled",
  "Same-Day Approval",
  "No Hidden Fees",
  "Unsecured Loans",
  "Free Advisory",
  "Licensed Lender",
  "M-Pesa Enabled",
  "Same-Day Approval",
  "No Hidden Fees",
  "Unsecured Loans",
  "Free Advisory",
  "Licensed Lender",
];

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative min-h-[92vh] lg:min-h-screen overflow-hidden text-white flex flex-col">
        {/* ── Full-screen background image ── */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Vibrant Kenyan market — the people Voryn Capital serves"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Multi-layer dark overlay for legibility + brand tone */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/75 to-navy-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
        {/* Subtle grid texture on top */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Gold accent glow — bottom left */}
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
        {/* Soft blue orb — top right */}
        <div className="orb-float-slow absolute -right-20 top-10 h-96 w-96 rounded-full bg-navy-400/20 blur-3xl pointer-events-none" />

        {/* Content grid */}
        <div className="container-x relative flex flex-1 items-center">
          <div className="grid w-full items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
            {/* Left — headline + CTAs */}
            <div>
              <Reveal delay={0.03}>
                <span className="eyebrow !text-gold-400">
                  <span className="h-px w-6 bg-current" />
                  Kenya&apos;s Growth Partner
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
                  Fast, unsecured working-capital and SME growth loans for traders, market vendors,
                  farmers and small businesses — disbursed to {site.mpesa} and paired with real
                  business advisory.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="btn-gold group inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-navy-900 shadow-lg shadow-gold-500/30"
                  >
                    Apply Today
                    <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50"
                  >
                    Explore loans
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.26}>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-silver-300">
                  {[
                    "Unsecured loans",
                    "Instant M-Pesa",
                    "No hidden fees",
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

            {/* Right — graduated credit widget */}
            <Reveal delay={0.18} className="relative">
              <div className="glow-widget relative mx-auto max-w-md rounded-3xl border border-white/15 bg-navy-950/70 p-6 shadow-2xl backdrop-blur-xl">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-500/15 blur-2xl pointer-events-none" />

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                      Voryn Biashara
                    </p>
                    <p className="mt-1 font-display text-lg font-bold text-white">Graduated credit</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/30">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>

                <div className="relative mt-6 space-y-3">
                  {[
                    { label: "First loan", value: "KES 20,000", w: "20%" },
                    { label: "On-time repayment", value: "KES 50,000", w: "40%" },
                    { label: "On-time repayment", value: "KES 100,000", w: "68%" },
                    { label: "Trusted client", value: "KES 200,000+", w: "100%" },
                  ].map((row, i) => (
                    <div key={i} className="rounded-xl bg-white/[0.07] p-3 transition-colors hover:bg-white/10">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-silver-300">{row.label}</span>
                        <span className="font-semibold text-white">{row.value}</span>
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

                <div className="relative mt-5 flex items-center gap-2 rounded-xl bg-gold-500/12 p-3 text-xs text-gold-200 border border-gold-500/20">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-gold-400" />
                  Your limit grows every time you repay on time.
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Trusted badges marquee — bottom strip */}
        <div className="relative border-t border-white/10 bg-navy-950/60 py-4 backdrop-blur-sm overflow-hidden">
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
      <section className="bg-navy-950 text-white">
        <div className="container-x grid grid-cols-2 gap-0 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.07} className="relative text-center">
              {/* Divider between items */}
              {i > 0 && (
                <span className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/10 lg:block" />
              )}
              <div className="py-12 px-6">
                <p className="glow-gold font-display text-3xl font-extrabold text-gold-400 sm:text-4xl">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-silver-500">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Loan Products"
            title="Five loans, built for the way you trade"
            subtitle="From daily hustle capital to KES 1 million growth financing — each product is matched to the real cash-flow rhythm of your business."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.07}>
                <ProductCard product={p} />
              </Reveal>
            ))}
            <Reveal delay={0.14}>
              <Link
                href="/products"
                className="card-glow group flex h-full min-h-[20rem] flex-col items-center justify-center rounded-2xl border border-dashed border-navy-300 bg-gradient-to-br from-navy-50/80 to-silver-100/30 p-6 text-center"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-navy-700 text-white shadow-lg shadow-navy-700/30 transition-transform group-hover:scale-110">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <p className="mt-4 font-display text-lg font-bold text-navy-800">
                  Compare all products
                </p>
                <p className="mt-1 text-sm text-silver-500">
                  Find the loan that fits your business best.
                </p>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-mesh opacity-60" />
        <div className="container-x relative">
          <SectionHeading
            center
            light
            eyebrow="Simple Process"
            title="From application to cash in three steps"
            subtitle="A fast, transparent process designed for busy business owners."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="step-connector relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all hover:bg-white/[0.07] hover:border-white/20">
                  {/* Large ghost step number */}
                  <span className="absolute right-6 top-5 font-display text-6xl font-extrabold text-white/[0.04]">
                    0{i + 1}
                  </span>
                  {/* Step number badge */}
                  <span className="absolute -top-3.5 left-6 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold-500 text-xs font-extrabold text-navy-900 shadow-md shadow-gold-500/30">
                    {i + 1}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/25 mt-3">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-silver-300">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        {/* subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(27,42,91,0.6) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container-x relative">
          <SectionHeading
            center
            eyebrow="Why Voryn"
            title="More than a lender — a growth partner"
            subtitle="We combine responsible credit, hands-on advisory and asset-management support to help your business build lasting value."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={i} delay={(i % 3) * 0.07}>
                <div className="card-gold-top h-full rounded-2xl border border-silver-200 bg-white p-6">
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

      {/* ================= ROOTED IN KENYA (image band) ================= */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow !text-gold-400">
              <span className="h-px w-6 bg-current" /> Rooted in Kenya
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Built for the real economy — the market, the duka, the shamba
            </h2>
            <p className="mt-4 text-silver-300">
              We meet business owners where they are: in the market stalls, roadside kiosks,
              hardware shops and farms that keep Kenya moving. Our relationship officers live and
              work in these communities — so we understand your cash flow, your seasons and your
              ambitions.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { k: "Informal traders", v: "Market & roadside vendors" },
                { k: "Women in business", v: "Mama biashara & producers" },
                { k: "Smallholder farmers", v: "Seasonal agri finance" },
                { k: "Growing SMEs", v: "Shops, salons & services" },
              ].map((c) => (
                <div
                  key={c.k}
                  className="group rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-all hover:bg-white/[0.08] hover:border-white/20 cursor-default"
                >
                  <p className="font-display font-bold text-white">{c.k}</p>
                  <p className="text-sm text-silver-400">{c.v}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "/images/market-mackinnon.jpg", alt: "Traders at a Kenyan market" },
                { src: "/images/hardware-shop.jpg", alt: "A woman running her hardware shop" },
                { src: "/images/smallholder-farmers.jpg", alt: "Smallholder farmers in their shamba" },
                { src: "/images/market-women.jpg", alt: "Women heading to market" },
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
                  {/* subtle gold overlay on hover */}
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
                Business advisory, included
              </h3>
              <p className="mt-3 text-silver-600">
                Every loan comes with practical coaching — cash-flow and record-keeping, pricing and
                profit, inventory management, and digital-payment best practices — delivered by local
                relationship officers.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Simple cash-flow & record-keeping training",
                  "Pricing, profit & inventory guidance",
                  "One-on-one and small-group coaching",
                  "Progress reviews after every loan cycle",
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
                Learn about advisory <ArrowRight className="h-4 w-4" />
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
                Asset management &amp; a graduation path
              </h3>
              <p className="relative mt-3 text-silver-300">
                As part of {site.group}, Voryn helps high-performing clients move from their first
                micro-loan to longer-term value creation and wealth building.
              </p>
              <ul className="relative mt-5 space-y-2.5">
                {[
                  "Portfolio management of micro-loan books",
                  "Working-capital & short-term investment solutions",
                  "Strategic capital allocation & growth advisory",
                  "Real-estate & project-financing support",
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
                Explore asset management <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Client Stories"
            title="Trusted by businesses across Kenya"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <figure className="group card-gold-top flex h-full flex-col rounded-2xl border border-silver-200 bg-white p-7 shadow-sm">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 star-gold fill-current" />
                    ))}
                  </div>
                  {/* Large decorative quote */}
                  <div className="mb-2">
                    <Quote className="h-9 w-9 gradient-gold opacity-80" />
                  </div>
                  <blockquote className="flex-1 text-navy-800 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-silver-200 pt-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-navy-600 to-navy-800 font-display font-bold text-white shadow-md shadow-navy-700/20">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-navy-800">{t.name}</p>
                      <p className="text-sm text-silver-500">{t.role}</p>
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
              {/* background texture */}
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute inset-0 bg-mesh opacity-70" />
              {/* glow orb */}
              <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-500/12 blur-3xl pointer-events-none" />
              {/* pulsing ring */}
              <div className="relative inline-block pulse-ring">
                <span className="inline-block h-3 w-3 rounded-full bg-gold-500" />
              </div>
              <div className="relative mt-6">
                <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold sm:text-4xl">
                  Your next stock order is{" "}
                  <span className="gradient-gold">one application away</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-silver-300">
                  Talk to a Voryn relationship officer today and get matched with the right loan for
                  your business.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="btn-gold rounded-full bg-gold-500 px-8 py-3.5 font-semibold text-navy-900 shadow-lg shadow-gold-500/25"
                  >
                    Apply Today
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
