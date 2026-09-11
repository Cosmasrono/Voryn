import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Target, Eye, Heart, ShieldCheck, Users, Building2, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Voryn Capital Limited delivers responsible finance for micro and small enterprises - backed by Voryn Group Holdings Limited.",
};

const values = [
  {
    icon: ShieldCheck,
    t: "Responsible lending",
    d: "We lend within what a business can sustainably repay, with transparent terms and zero hidden fees.",
  },
  {
    icon: Users,
    t: "Client first",
    d: "Local relationship officers who understand your hustle and stand beside you as you grow.",
  },
  {
    icon: Heart,
    t: "Genuine inclusion",
    d: "Credit and practical knowledge for the traders, artisans, women, and farmers traditional institutions overlook.",
  },
  {
    icon: Target,
    t: "Productive assets",
    d: "Capital that helps you trade, produce, acquire revenue-generating machinery, and build lasting wealth.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Voryn"
        title="Finance that helps enterprises build lasting value"
        subtitle="Voryn Capital Limited is your trusted growth partner, expanding access to sensible working capital, group chamas, and productive asset financing for entrepreneurs and small businesses."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Establishing image */}
      <section className="container-x -mt-10 sm:-mt-12">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-3xl border border-silver-200 shadow-xl">
            <Image
              src="/images/market-mackinnon.jpg"
              alt="Everyday enterprise and traders - the businesses Voryn Capital serves"
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-6 max-w-md font-display text-lg font-semibold text-white sm:text-xl">
              The traders, artisans, vendors, and farmers who power the everyday enterprise economy.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Intro */}
      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow"><span className="h-px w-6 bg-current" /> Who we are</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-800">
              Sensible, responsible finance for everyday enterprises
            </h2>
            <div className="mt-5 space-y-4 text-silver-600 leading-relaxed">
              <p>
                We deliver practical financial facilities designed specifically for micro and small
                enterprises that traditional banks often overlook — informal traders, market vendors,
                workshop artisans, smallholder farmers, and women-led businesses.
              </p>
              <p>
                We combine foundational starter working-capital loans (Voryn Biashara), group table-banking
                facilities (Voryn Chama), seasonal farm financing, and productive asset loans for business equipment,
                machinery, and motorcycles. Everything is delivered through dedicated on-the-ground relationship officers
                and fast digital disbursement via {site.mpesa}.
              </p>
              <p>
                We believe credit should do more than patch a short-term cash squeeze. Finance should empower
                entrepreneurs to acquire productive assets, expand trade lines, and build resilient, lasting businesses.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-silver-200 bg-white p-6 shadow-sm">
                <Eye className="h-7 w-7 text-gold-500" />
                <h3 className="mt-3 font-display text-lg font-bold text-navy-800">Our Vision</h3>
                <p className="mt-2 text-sm text-silver-600 leading-relaxed">
                  To be your trusted enterprise-finance partner, transforming lives and fostering
                  sustainable prosperity through financial inclusion and progressive trust.
                </p>
              </div>
              <div className="rounded-2xl border border-silver-200 bg-white p-6 shadow-sm">
                <Target className="h-7 w-7 text-gold-500" />
                <h3 className="mt-3 font-display text-lg font-bold text-navy-800">Our Mission</h3>
                <p className="mt-2 text-sm text-silver-600 leading-relaxed">
                  To empower enterprising communities with accessible, transparent financial solutions —
                  fostering self-reliance and practical economic advancement.
                </p>
              </div>
              <div className="rounded-2xl bg-navy-900 p-6 text-white sm:col-span-2 shadow-md">
                <p className="font-display text-lg font-bold text-gold-400">Our Graduation Approach</p>
                <p className="mt-2 text-sm text-silver-300 leading-relaxed">
                  First-time clients start with <strong className="text-white">Voryn Biashara</strong>. With consistent on-time repayments, clients build their trust rating and graduate to specialized group chamas, seasonal agricultural credit, and asset loans for productive equipment, machinery, and delivery motorcycles.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading center eyebrow="What guides us" title="Our core principles" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={(i % 4) * 0.06}>
                <div className="card-lift h-full rounded-2xl border border-silver-200 bg-white p-6 hover:shadow-lg transition-all">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <v.icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy-800">{v.t}</h3>
                  <p className="mt-2 text-sm text-silver-600 leading-relaxed">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Voryn Group */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 p-8 text-white sm:p-12 shadow-xl">
              <div className="absolute inset-0 bg-grid opacity-40" />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500 text-navy-900 shadow-md">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
                    Part of {site.group}
                  </h2>
                  <p className="mt-4 text-silver-300 leading-relaxed">
                    Voryn Capital is backed by the governance, capital foundation, and multi-sector
                    expertise of the wider Voryn Group — providing clients with a reliable partner and
                    a clear pathway from starter micro-loans to long-term productive assets.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 font-semibold text-navy-900 transition-transform hover:scale-[1.03]"
                  >
                    Partner with us <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { t: "Strategic Investments" },
                    { t: "Financial Strength" },
                    { t: "Partnering for Success" },
                    { t: "Sustainable Growth" },
                    { t: "Corporate Governance" },
                    { t: "Multi-sector Support" },
                  ].map((p) => (
                    <div
                      key={p.t}
                      className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-silver-200"
                    >
                      {p.t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
