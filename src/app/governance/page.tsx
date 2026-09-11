import type { Metadata } from "next";
import {
  ShieldCheck,
  Scale,
  FileText,
  Users,
  Eye,
  Building2,
  BarChart3,
  Lock,
  AlertCircle,
} from "lucide-react";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Governance",
  description:
    "Voryn Capital's governance framework — board structure, policies, compliance commitments, and accountability as part of Voryn Group Holdings Limited.",
};

const governanceFramework = [
  {
    icon: Scale,
    title: "Board Oversight",
    body: "An independent Board of Directors provides strategic oversight, sets risk appetite, and ensures accountability across all operations. Board composition and full member profiles will be published in due course.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Management",
    body: "A dedicated Risk & Compliance function monitors credit risk, operational risk, and regulatory compliance on an ongoing basis. All loan decisions are subject to a structured credit committee review.",
  },
  {
    icon: FileText,
    title: "Audit & Transparency",
    body: "Annual financial statements are prepared in accordance with International Financial Reporting Standards (IFRS) and subject to independent external audit. Results are shared with stakeholders in line with regulatory requirements.",
  },
  {
    icon: Eye,
    title: "Regulatory Compliance",
    body: `Voryn Capital Limited operates in full compliance with applicable Kenyan laws and regulatory frameworks governing credit providers. As part of ${site.group}, all entities maintain adherence to group-wide compliance standards.`,
  },
  {
    icon: Lock,
    title: "Data Protection",
    body: "All client data is handled in strict accordance with Kenya's Data Protection Act, 2019. We maintain documented data processing policies, retention schedules, and breach response procedures.",
  },
  {
    icon: AlertCircle,
    title: "Responsible Lending",
    body: "Voryn Capital enforces a responsible lending policy that limits credit to what a client can sustainably repay. All loan terms are disclosed in plain language. No hidden fees are permitted under our conduct standards.",
  },
];

const policies = [
  { title: "Credit Policy & Underwriting Standards", status: "Internal — available upon request" },
  { title: "Anti-Money Laundering (AML) Policy", status: "Internal — available upon request" },
  { title: "Know Your Customer (KYC) Procedures", status: "Internal — applied at onboarding" },
  { title: "Data Protection Policy", status: "Published — see Privacy Policy" },
  { title: "Client Protection & Responsible Lending Policy", status: "Internal — summary available" },
  { title: "Conflicts of Interest Policy", status: "Internal — Board-level oversight" },
  { title: "Whistleblower & Grievance Procedure", status: "Internal — contact Compliance Officer" },
  { title: "Environmental & Social Risk Policy", status: "Under development" },
];

const boardPlaceholders = [
  { role: "Board Chairperson", area: "Strategy & Governance" },
  { role: "Non-Executive Director", area: "Finance & Risk" },
  { role: "Non-Executive Director", area: "Legal & Compliance" },
  { role: "Non-Executive Director", area: "Operations & Technology" },
  { role: "Executive Director (CEO)", area: "Executive Leadership" },
  { role: "Executive Director (CFO)", area: "Finance & Treasury" },
];

const managementPlaceholders = [
  { role: "Chief Executive Officer", dept: "Executive Office" },
  { role: "Chief Finance Officer", dept: "Finance & Treasury" },
  { role: "Head of Credit & Risk", dept: "Credit Operations" },
  { role: "Head of Business Development", dept: "Growth & Partnerships" },
  { role: "Head of Operations", dept: "Operations" },
  { role: "Compliance Officer", dept: "Legal & Compliance" },
];

export default function GovernancePage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate Governance"
        title="Accountable, transparent, and professionally governed"
        subtitle={`Voryn Capital Limited is committed to the highest standards of corporate governance, regulatory compliance, and responsible financial practice — as part of ${site.group}.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Governance" }]}
      />

      {/* ── Governance framework ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Governance Framework"
            title="How we are governed"
            subtitle="Our structure ensures accountability, prudent risk management, and protection of our clients and stakeholders."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {governanceFramework.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.07}>
                <div className="card-gold-top h-full rounded-2xl border border-silver-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-navy-600 to-navy-800 text-white shadow-md shadow-navy-700/20">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy-800">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver-600">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Board & Leadership ── */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Board & Leadership"
            title="Board of Directors"
            subtitle="Our Board provides independent oversight and strategic direction. Full member profiles and biographies will be published in due course."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {boardPlaceholders.map((m, i) => (
              <Reveal key={m.role} delay={(i % 3) * 0.07}>
                <div className="flex items-center gap-4 rounded-2xl border border-silver-200 bg-white p-5 shadow-sm">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-navy-900 text-white">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-navy-800 text-sm">{m.role}</p>
                    <p className="mt-0.5 text-xs text-silver-400">{m.area}</p>
                    <span className="mt-1.5 inline-block rounded-full bg-silver-100 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-silver-400">
                      Profile coming soon
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Executive Management */}
          <div className="mt-16">
            <SectionHeading
              center
              eyebrow="Executive Team"
              title="Senior Management"
              subtitle="Our executive team leads day-to-day operations and is accountable to the Board of Directors."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {managementPlaceholders.map((m, i) => (
                <Reveal key={m.role} delay={(i % 3) * 0.07}>
                  <div className="flex items-center gap-4 rounded-2xl border border-silver-200 bg-white p-5 shadow-sm">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-navy-900">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-navy-800 text-sm">{m.role}</p>
                      <p className="mt-0.5 text-xs text-silver-400">{m.dept}</p>
                      <span className="mt-1.5 inline-block rounded-full bg-silver-100 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-silver-400">
                        Profile coming soon
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Policies & Documents ── */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container-x relative">
          <SectionHeading
            center
            light
            eyebrow="Policies & Documentation"
            title="Our governing documents"
            subtitle="Key policies and frameworks that govern how Voryn Capital conducts its operations."
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {policies.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.05}>
                <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-all hover:bg-white/[0.07]">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-500/15">
                    <FileText className="h-4 w-4 text-gold-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{p.title}</p>
                    <p className="mt-0.5 text-xs text-silver-400">{p.status}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Group affiliation ── */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 px-8 py-14 text-white text-center shadow-xl">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="relative">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/30">
                  <BarChart3 className="h-7 w-7" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
                  Part of {site.group}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-silver-300 leading-relaxed">
                  Voryn Capital Limited is a subsidiary of {site.group}. Our governance framework aligns with group-wide standards on financial integrity, regulatory compliance, and stakeholder accountability.
                </p>
                <p className="mt-4 text-xs text-silver-500">
                  For governance enquiries, contact us at{" "}
                  <a
                    href="mailto:compliance@voryncapital.co.ke"
                    className="text-gold-400 hover:text-gold-300 underline underline-offset-2"
                  >
                    compliance@voryncapital.co.ke
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
