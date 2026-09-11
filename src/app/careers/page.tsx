import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  TrendingUp,
  Users,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Globe,
  Zap,
  ArrowRight,
  Mail,
  MapPin,
  Clock,
  Briefcase,
} from "lucide-react";
import { site, emails } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Voryn Capital team. Build a career that makes a real difference in Kenya's everyday enterprise economy.",
};

const reasons = [
  {
    icon: Heart,
    title: "Mission-driven work",
    body: "Every day, your efforts directly improve the financial lives of traders, artisans, farmers, and small business owners who power Kenya's everyday economy.",
  },
  {
    icon: TrendingUp,
    title: "Room to grow",
    body: "We're a growing organisation with a flat structure — you'll take on real responsibility from day one and grow alongside the company.",
  },
  {
    icon: Users,
    title: "Community-first culture",
    body: "Our team reflects the communities we serve. We value empathy, ground-level understanding, and people who genuinely care.",
  },
  {
    icon: GraduationCap,
    title: "Continuous learning",
    body: "Regular internal training sessions, field exposure, and mentorship from experienced finance and business professionals.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity above all",
    body: "We operate with full transparency — with clients and with each other. No politics, no hidden agendas. Just honest, collaborative work.",
  },
  {
    icon: Globe,
    title: "Part of Voryn Group",
    body: `As part of ${site.group}, career paths can open across multiple sectors and disciplines — from finance to advisory to operations.`,
  },
];

const perks = [
  { icon: Zap, label: "Competitive salary & performance incentives" },
  { icon: ShieldCheck, label: "Medical cover for you and your family" },
  { icon: Clock, label: "Flexible working hours" },
  { icon: GraduationCap, label: "Paid professional development & training" },
  { icon: MapPin, label: "Field exposure across multiple counties" },
  { icon: Users, label: "Collaborative, close-knit team environment" },
  { icon: TrendingUp, label: "Clear career growth framework" },
  { icon: Sparkles, label: "Opportunity to create real community impact" },
];

const openRoles = [
  {
    title: "Relationship Officer",
    location: "Nairobi & Environs",
    type: "Full-time",
    dept: "Credit & Lending",
    summary:
      "Work directly with small business clients in the field — conducting assessments, disbursing loans, and providing hands-on business coaching.",
  },
  {
    title: "Credit Analyst",
    location: "Nairobi (Upper Hill)",
    type: "Full-time",
    dept: "Credit & Risk",
    summary:
      "Evaluate loan applications, assess business cash flow, and support the underwriting team in making sound, responsible credit decisions.",
  },
  {
    title: "Operations & Admin Assistant",
    location: "Nairobi (Upper Hill)",
    type: "Full-time",
    dept: "Operations",
    summary:
      "Support day-to-day office operations, record keeping, reporting, and coordination between field and head-office teams.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers at Voryn"
        title="Build a career that moves Kenya's enterprise economy forward"
        subtitle="We're looking for driven, empathetic people who want to do meaningful work — helping real businesses access capital, grow, and build lasting wealth."
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      {/* ── Why Work For Us ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Why Voryn Capital"
            title="Why work with us"
            subtitle="We're not just a lender. We're a growth partner — for our clients and our team."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={(i % 3) * 0.07}>
                <div className="card-gold-top h-full rounded-2xl border border-silver-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-navy-600 to-navy-800 text-white shadow-md shadow-navy-700/20">
                    <r.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy-800">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver-600">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Culture statement ── */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container-x relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow !text-gold-400">
              <span className="h-px w-6 bg-current" /> Our Culture
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Real impact, every single day
            </h2>
            <p className="mt-5 text-silver-300 leading-relaxed">
              When you join Voryn Capital, you're not just processing loans — you're enabling a
              market trader to restock shelves, a boda boda rider to own their motorcycle, a chama
              to expand their table-banking circle. Our team of relationship officers, analysts,
              and operations staff directly touch hundreds of livelihoods.
            </p>
            <p className="mt-4 text-silver-300 leading-relaxed">
              We hire people who are curious, humble, and genuinely motivated by the communities
              we serve. If that sounds like you, we'd love to hear from you.
            </p>
            <Link
              href={`mailto:${emails.hr}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-navy-900 transition-transform hover:scale-[1.02]"
            >
              <Mail className="h-4 w-4" /> Send us your CV
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-4">
              {perks.map((p, i) => (
                <div
                  key={p.label}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-all hover:bg-white/[0.08]"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold-500/15">
                    <p.icon className="h-3.5 w-3.5 text-gold-400" />
                  </div>
                  <p className="text-sm text-silver-200 leading-snug">{p.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Open Positions"
            title="Current opportunities"
            subtitle="We're growing. If you see a role that fits, apply directly or send us a general application."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {openRoles.map((role, i) => (
              <Reveal key={role.title} delay={i * 0.07}>
                <div className="group flex h-full flex-col rounded-2xl border border-silver-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-gold-500/10 px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide text-gold-700 border border-gold-500/20">
                      {role.type}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-navy-800">{role.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-silver-400 uppercase tracking-wide">
                    {role.dept} · {role.location}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-silver-600">{role.summary}</p>
                  <Link
                    href={`mailto:${emails.hr}?subject=Application: ${encodeURIComponent(role.title)}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-gold-600 transition-colors"
                  >
                    Apply for this role <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {/* General application CTA */}
          <Reveal>
            <div className="mt-10 rounded-3xl border border-silver-200 bg-white px-8 py-10 text-center shadow-sm">
              <p className="font-display text-lg font-bold text-navy-800">
                Don't see the right role?
              </p>
              <p className="mt-2 text-silver-600">
                We're always interested in motivated people. Send a general application and tell us how you'd like to contribute.
              </p>
              <Link
                href={`mailto:${emails.hr}?subject=General Application — Voryn Capital`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-700 px-7 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-navy-800"
              >
                <Mail className="h-4 w-4" /> {emails.hr}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
