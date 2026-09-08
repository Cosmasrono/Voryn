import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  PieChart,
  Building,
  Tractor,
  TrendingUp,
  Truck,
  ArrowRight,
  Check,
} from "lucide-react";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Asset Management",
  description:
    "Professional asset-management solutions from Voryn Capital — portfolio management, working-capital investment, asset finance and growth advisory for high-performing enterprises.",
};

const services = [
  { icon: PieChart, t: "Portfolio management", d: "Professional management of micro-loan books and short-term investment portfolios." },
  { icon: TrendingUp, t: "Working-capital solutions", d: "Short-term investment and working-capital solutions structured around your cash cycles." },
  { icon: Briefcase, t: "Strategic capital allocation", d: "Growth advisory and capital allocation for high-performing micro and small enterprises." },
  { icon: Building, t: "Real-estate & project finance", d: "Financing support linked to business expansion, premises and productive projects." },
  { icon: Tractor, t: "Asset finance", d: "Acquire productive assets — equipment, machinery, solar systems and agricultural tools." },
  { icon: Truck, t: "Commercial vehicles & tech", d: "Finance income-generating vehicles and technology that scale your operations." },
];

export default function AssetManagementPage() {
  return (
    <>
      <PageHero
        eyebrow="Asset Management"
        title="From a first loan to lasting wealth"
        subtitle={`As part of ${site.group}, Voryn offers professional asset-management solutions that create a clear graduation path — from micro-loan to long-term value creation.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Asset Management" }]}
      />

      {/* Establishing image */}
      <section className="container-x -mt-10 sm:-mt-12">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-3xl border border-silver-200 shadow-xl">
            <Image
              src="/images/nairobi-skyline.jpg"
              alt="The Nairobi skyline at dusk"
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-6 max-w-md font-display text-lg font-semibold text-white sm:text-xl">
              From the market stall to the city skyline — a path to lasting value.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Our solutions"
            title="Professional solutions for growing clients & partners"
            subtitle="For high-performing enterprises and institutional partners ready to move beyond pure lending."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.t} delay={(i % 3) * 0.06}>
                <div className="card-lift h-full rounded-2xl border border-silver-200 bg-white p-6 hover:shadow-lg">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <s.icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy-800">{s.t}</h3>
                  <p className="mt-2 text-sm text-silver-600">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Graduation path */}
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-x">
          <SectionHeading
            center
            light
            eyebrow="The graduation path"
            title="Four stages from micro-loan to wealth"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              { s: "01", t: "Micro-loan", d: "A first working-capital loan builds your credit history." },
              { s: "02", t: "Growth finance", d: "Larger, longer financing as your turnover proves out." },
              { s: "03", t: "Asset finance", d: "Acquire productive assets that generate income." },
              { s: "04", t: "Wealth building", d: "Managed investment into productive economic activity." },
            ].map((step, i) => (
              <Reveal key={step.s} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <span className="font-display text-3xl font-extrabold text-gold-400">{step.s}</span>
                  <h3 className="mt-3 font-display text-lg font-bold">{step.t}</h3>
                  <p className="mt-2 text-sm text-silver-300">{step.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cash-flow based finance */}
      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow"><span className="h-px w-6 bg-current" /> A smarter model</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-800">
              Cash-flow based finance, not just collateral
            </h2>
            <p className="mt-4 text-silver-600">
              We assess the actual strength of a business — sales, cash flows, transaction history and
              repayment behaviour — rather than relying solely on traditional collateral. That means
              real businesses get real access to capital.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Decisions based on how your business actually performs",
                "Progressively larger financing as you demonstrate capacity",
                "Risk-managed investment into productive rural activity",
                "A single partner across lending, advisory and assets",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-navy-800">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy-700 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Speak to our team <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 p-8 text-white">
              <p className="font-display text-xl font-bold text-gold-400">For institutional partners</p>
              <p className="mt-3 text-silver-300">
                Voryn Capital partners with institutions seeking risk-managed exposure to Kenya&apos;s
                productive micro and SME economy — with disciplined governance and transparent
                reporting from {site.group}.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { k: "Governed", v: "Group-level oversight" },
                  { k: "Transparent", v: "Clear reporting" },
                  { k: "Diversified", v: "Across products & regions" },
                  { k: "Impact-led", v: "Real economic activity" },
                ].map((c) => (
                  <div key={c.k} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-display font-bold text-white">{c.k}</p>
                    <p className="text-xs text-silver-400">{c.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
