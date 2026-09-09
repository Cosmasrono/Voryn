import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Voryn Capital Limited collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <section className="py-16">
        <div className="container-x max-w-3xl">
          <div className="space-y-6 text-silver-700">
            <p className="text-silver-500">
              This policy is a placeholder to be reviewed and finalised with Voryn Capital&apos;s legal
              and compliance team, in line with the Kenya Data Protection Act, before launch.
            </p>
            {[
              ["Information we collect", "Contact and identity details, business information, and transaction and repayment data needed to assess and service your loan."],
              ["How we use it", "To assess applications, disburse and service loans, provide advisory support, and improve our products - always on a lawful basis."],
              ["Sharing", "We share data only as necessary to provide our services, meet legal obligations, and with trusted partners under appropriate safeguards."],
              ["Mobile money", "Where you transact via M-Pesa or similar, relevant details are processed to disburse funds and record repayments."],
              ["Your rights", "You may request access to, correction of, or deletion of your personal data, subject to legal and regulatory requirements."],
              ["Contact", "For privacy questions or requests, contact us using the details on our Contact page."],
            ].map(([h, b]) => (
              <div key={h}>
                <h2 className="font-display text-xl font-bold text-navy-800">{h}</h2>
                <p className="mt-2">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
