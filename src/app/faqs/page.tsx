import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FaqsClient from "./FaqsClient";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about Voryn Capital loans — eligibility, repayment, M-Pesa, the graduation pathway, Chama group loans, and more.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Everything you need to know about borrowing with Voryn"
        subtitle="Clear, honest answers about our loan products, eligibility, repayment, and how the graduation pathway works."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
      />
      <FaqsClient />
    </>
  );
}
