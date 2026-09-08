import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using Voryn Capital Limited's services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]}
      />
      <section className="py-16">
        <div className="container-x max-w-3xl">
          <div className="prose-voryn space-y-6 text-silver-700">
            <p className="text-silver-500">
              These terms are a placeholder to be reviewed and finalised with Voryn Capital&apos;s
              legal and compliance team before launch.
            </p>
            {[
              ["1. About these terms", "These terms govern your use of Voryn Capital Limited's website and services. By applying for a loan or using our services you agree to be bound by them."],
              ["2. Eligibility", "Products are available to qualifying micro, small and medium enterprises and individuals in Kenya, subject to our assessment and responsible-lending criteria."],
              ["3. Loans & repayment", "Loan amounts, tenures and terms are as described per product and confirmed in your loan agreement. Repayments are made via the agreed channel, primarily M-Pesa."],
              ["4. Responsible lending", "We assess affordability and lend within what your business can sustainably repay. Limits grow progressively based on repayment history."],
              ["5. Fees & charges", "All applicable fees are disclosed transparently before you accept a loan. We do not levy hidden charges."],
              ["6. Data & privacy", "Your information is handled in line with our Privacy Policy and applicable Kenyan data-protection law."],
              ["7. Contact", "For questions about these terms, contact us using the details on our Contact page."],
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
