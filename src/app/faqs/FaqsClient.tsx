"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const faqCategories = [
  {
    id: "eligibility",
    label: "Eligibility & Requirements",
    faqs: [
      {
        q: "Who can apply for a Voryn Capital loan?",
        a: "Any individual running a legitimate micro or small business in Kenya. This includes retail shop owners, market traders, market vendors, artisans, salon operators, boda boda riders, smallholder farmers, and members of registered chama groups. We do not require a salaried employment history.",
      },
      {
        q: "Do I need a title deed or car logbook as collateral?",
        a: "No. Voryn Capital loans — especially Voryn Biashara, our starter product — are fully unsecured. We assess your real business activity and cash flow, not land or vehicle ownership.",
      },
      {
        q: "What documents do I need to apply?",
        a: "Typically: a valid National ID, an active M-Pesa account, and evidence of your business (could be a business permit, M-Pesa statements, or a brief business description). A relationship officer will guide you through the specifics during the application.",
      },
      {
        q: "Can I apply if I have never taken a loan before?",
        a: "Absolutely. Voryn Biashara is specifically designed as a first-time borrower starter loan. We welcome first-time borrowers and walk you through every step of the process.",
      },
      {
        q: "Is there an age requirement?",
        a: "Yes. Applicants must be at least 18 years old and hold a valid Kenyan National ID.",
      },
    ],
  },
  {
    id: "products",
    label: "Loan Products & Limits",
    faqs: [
      {
        q: "What loan products does Voryn Capital offer?",
        a: "We currently offer six tailored products: Voryn Biashara (starter working capital), Voryn Chama (group table-banking facility), Voryn Mama Biashara (women-focused trade loan), Voryn Agri-Boost (seasonal agricultural credit), Voryn Growth Loan (expanded business capital), and Voryn Asset Loan (productive equipment, machinery, tools, and delivery motorcycles up to KES 150,000).",
      },
      {
        q: "What are the loan limits?",
        a: "Starter clients begin with Voryn Biashara at KES 10,000–20,000. As you repay reliably, limits grow in steps — to KES 10,000–30,000 for group facilities (Chama/Agri), up to KES 50,000 for Mama Biashara, KES 100,000 for Growth, and up to KES 150,000 for asset loans. We believe in earning trust progressively.",
      },
      {
        q: "How long are the loan terms?",
        a: "Loan tenures range from 7–30 days for short-cycle working capital (including Voryn Biashara and Voryn Mama Biashara), 1–3 months for group Chama and seasonal Agri loans, and 1–12 months for productive asset loans. Each product page on our website outlines the specific repayment schedules.",
      },
      {
        q: "Are there any hidden charges?",
        a: "None. All fees, interest, and service charges are disclosed upfront in plain language before you sign anything. We do not add surprise fees after disbursement.",
      },
    ],
  },
  {
    id: "repayment",
    label: "Repayment & M-Pesa",
    faqs: [
      {
        q: "How are loans disbursed?",
        a: "All loans are disbursed directly to your registered M-Pesa number. Once approved, funds typically arrive the same day for repeat clients, and within 24–48 hours for new clients after documentation is verified.",
      },
      {
        q: "How do I repay my loan?",
        a: "Repayments are made via M-Pesa to our Paybill/Till number, which your relationship officer will provide. You can also arrange to pay through your officer directly. Repayment schedules are agreed upon at the time of disbursement.",
      },
      {
        q: "What happens if I miss a repayment?",
        a: "Please contact your relationship officer before a payment is due — not after. We understand businesses have difficult weeks. Early communication allows us to find the best solution without damaging your credit record with us.",
      },
      {
        q: "Can I repay my loan early?",
        a: "Yes. Early repayment is welcomed and may even accelerate your graduation to higher loan limits. Speak to your relationship officer about the process.",
      },
    ],
  },
  {
    id: "graduation",
    label: "Graduation Pathway",
    faqs: [
      {
        q: "What is the graduation pathway?",
        a: "Voryn Capital operates a progressive trust system. All new clients start with Voryn Biashara. Each time you complete a loan cycle on time, your trust rating improves and you unlock access to higher loan limits and specialised products like Chama group loans, Agri-Boost, and the Asset Loan.",
      },
      {
        q: "How quickly can I graduate to a higher loan?",
        a: "After successfully completing your first Voryn Biashara cycle (on-time repayment), you are assessed for an increase. The speed of graduation depends on your repayment consistency, business growth, and your relationship officer's assessment.",
      },
      {
        q: "Can I access an asset loan as a new client?",
        a: "Asset Loans (Voryn Asset Loan) are reserved for clients who have demonstrated consistent repayment history with us. This protects you from over-borrowing and ensures you are financially prepared for the longer repayment terms.",
      },
    ],
  },
  {
    id: "chama",
    label: "Chama & Group Loans",
    faqs: [
      {
        q: "What is Voryn Chama?",
        a: "Voryn Chama is our group lending facility for registered savings and lending groups (chamas). The group applies collectively, shares responsibility, and accesses a pooled credit line for individual members — ideal for table-banking circles and women's groups.",
      },
      {
        q: "How many members does a Chama need to apply?",
        a: "We recommend groups of at least 5–15 active members with a regular meeting and savings history. Your relationship officer will guide the group through the application process at your regular meeting.",
      },
      {
        q: "Does the whole group share one loan, or does each member get their own?",
        a: "The structure depends on your group's preference and the product tier. We offer both pooled group credit and individual-within-group structures. Speak to a relationship officer for details.",
      },
    ],
  },
  {
    id: "company",
    label: "About Voryn Capital",
    faqs: [
      {
        q: "Is Voryn Capital a bank?",
        a: "No. Voryn Capital Limited is a non-bank micro and small enterprise lender. We are not a deposit-taking institution. We are part of Voryn Group Holdings Limited, operating under applicable Kenyan regulatory frameworks for credit providers.",
      },
      {
        q: "Where is Voryn Capital located?",
        a: "Our head office is at Taj Tower, Upper Hill, Nairobi. Our relationship officers operate across multiple counties. Contact us to find out if we are currently active in your area.",
      },
      {
        q: "How do I contact Voryn Capital?",
        a: "You can call or WhatsApp us at +254 722 473 078, email info@voryncapital.co.ke, or visit our Contact page to fill out an application form.",
      },
      {
        q: "Is my personal information safe with Voryn Capital?",
        a: "Yes. We handle all personal and financial information in accordance with Kenya's Data Protection Act. Your data is used only to assess your application and manage your loan. We do not sell your information to third parties. See our Privacy Policy for full details.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border-b border-silver-200 last:border-0 transition-colors ${open ? "bg-navy-50/40" : ""}`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-navy-800 text-sm sm:text-base leading-snug">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gold-500 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="px-6 text-sm leading-relaxed text-silver-600">{a}</p>
      </div>
    </div>
  );
}

export default function FaqsClient() {
  const [activeCategory, setActiveCategory] = useState("eligibility");
  const current = faqCategories.find((c) => c.id === activeCategory)!;

  return (
    <section className="py-16 sm:py-24">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
          {/* Category sidebar */}
          <Reveal>
            <div className="rounded-2xl border border-silver-200 bg-white p-4 shadow-sm lg:sticky lg:top-24">
              <p className="mb-3 px-2 text-xs font-bold uppercase tracking-widest text-silver-400">
                Categories
              </p>
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`mb-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
                    activeCategory === cat.id
                      ? "bg-navy-700 text-white shadow-sm"
                      : "text-silver-600 hover:bg-silver-100 hover:text-navy-700"
                  }`}
                >
                  <HelpCircle
                    className={`h-4 w-4 shrink-0 ${
                      activeCategory === cat.id ? "text-gold-400" : "text-silver-400"
                    }`}
                  />
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* FAQ accordion panel */}
          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-silver-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-silver-200 bg-navy-50 px-6 py-4">
                <h2 className="font-display text-lg font-bold text-navy-800">{current.label}</h2>
                <p className="mt-0.5 text-xs text-silver-500">
                  {current.faqs.length} question{current.faqs.length !== 1 ? "s" : ""}
                </p>
              </div>
              {current.faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Still have questions CTA */}
        <Reveal>
          <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 px-8 py-12 text-center text-white">
            <p className="font-display text-2xl font-bold">Still have questions?</p>
            <p className="mt-3 text-silver-300">
              Our relationship officers are happy to walk you through anything — over the phone,
              on WhatsApp, or in person.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="tel:+254722473078"
                className="rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-navy-900 shadow-lg transition-transform hover:scale-[1.02]"
              >
                Call +254 722 473 078
              </a>
              <a
                href="https://wa.me/254722473078"
                className="rounded-full border border-white/25 px-7 py-3.5 font-semibold text-white transition-all hover:bg-white/10"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
