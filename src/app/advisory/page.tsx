import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calculator,
  Tag,
  Boxes,
  Smartphone,
  Users,
  LineChart,
  ArrowRight,
  Check,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Business Advisory",
  description:
    "Every Voryn loan is paired with practical business advisory - cash-flow training, pricing and profit guidance, inventory management and one-on-one coaching.",
};

const services = [
  { icon: Calculator, t: "Cash-flow & record-keeping", d: "Simple systems to track money in and out, so you always know where your business stands." },
  { icon: Tag, t: "Pricing & profit", d: "Practical help setting prices and calculating real profit on every sale." },
  { icon: Boxes, t: "Inventory management", d: "Buy the right stock at the right time and reduce cash tied up in slow-moving goods." },
  { icon: Smartphone, t: "Digital payments", d: "Best practices for M-Pesa and digital tools to trade faster and more securely." },
  { icon: Users, t: "One-on-one coaching", d: "Personal and small-group sessions delivered by local relationship officers who know your context." },
  { icon: LineChart, t: "Progress reviews", d: "A review after every loan cycle with tailored advice for your next stage of growth." },
];

export default function AdvisoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Business Advisory"
        title="Every loan comes with a coach"
        subtitle="Capital alone rarely grows a business. That's why every Voryn loan is paired with practical, hands-on guidance that improves repayment capacity and builds resilience."
        crumbs={[{ label: "Home", href: "/" }, { label: "Business Advisory" }]}
      />

      {/* Intro feature */}
      <section className="py-16 sm:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-silver-200 shadow-xl">
              <Image
                src="/images/advisory-teaching.jpg"
                alt="A relationship officer coaching a client in her community"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="eyebrow"><span className="h-px w-6 bg-current" /> Hands-on, in your community</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-800 sm:text-4xl">
              Knowledge that grows with your business
            </h2>
            <p className="mt-4 text-lg text-silver-600">
              Our officers sit down with you where you work - in the market, the shop, the
              cooperative. They teach practical skills you can use the same day, and stay with you
              cycle after cycle as your business grows.
            </p>
            <p className="mt-4 text-silver-600">
              It&apos;s the difference between a loan that&apos;s spent and a loan that&apos;s
              invested - and it&apos;s included with every Voryn product, at no extra cost.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="What we help with"
            title="Practical support, not theory"
            subtitle="Delivered in plain language by officers on the ground - designed for real, informal and rural businesses."
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

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow"><span className="h-px w-6 bg-current" /> Why it matters</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-800">
              Advisory that pays for itself
            </h2>
            <p className="mt-4 text-silver-600">
              Businesses that understand their numbers repay more comfortably, grow faster and
              qualify for larger limits sooner. Our advisory support is built into the loan journey,
              not sold as an add-on.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Stronger repayment capacity and fewer defaults",
                "Faster graduation to higher credit limits",
                "More profitable, more resilient businesses",
                "A trusted local partner at every loan cycle",
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
              Talk to an officer <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-silver-200 bg-white p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                The Voryn loan journey
              </p>
              <ol className="mt-6 space-y-6">
                {[
                  { s: "1", t: "First loan + orientation", d: "Start small with a guided first experience of formal credit." },
                  { s: "2", t: "Coaching during the cycle", d: "Ongoing support from your relationship officer." },
                  { s: "3", t: "Progress review", d: "We review results and plan your next, bigger step." },
                  { s: "4", t: "Graduated growth", d: "Unlock higher limits and longer-term products." },
                ].map((step, i, arr) => (
                  <li key={step.s} className="relative flex gap-4">
                    {i < arr.length - 1 && (
                      <span className="absolute left-[1.15rem] top-10 h-[calc(100%-0.5rem)] w-px bg-silver-200" />
                    )}
                    <span className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-700 font-display font-bold text-white">
                      {step.s}
                    </span>
                    <div>
                      <p className="font-semibold text-navy-800">{step.t}</p>
                      <p className="text-sm text-silver-600">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
