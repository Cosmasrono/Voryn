import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Apply",
  description:
    "Apply for a Voryn Capital loan or talk to a relationship officer. Call, email or request a call back and get matched with the right product.",
};

export default function ContactPage() {
  const details = [
    { icon: MapPin, t: "Visit us", v: site.address },
    { icon: Phone, t: "Call us", v: site.phone, href: `tel:${site.phoneHref}` },
    { icon: Mail, t: "Email us", v: site.email, href: `mailto:${site.email}` },
    { icon: Clock, t: "Opening hours", v: site.hours },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact & Apply"
        title="Let's find the right loan for your business"
        subtitle="Reach out today. Our relationship officers are ready to guide you from application to disbursement - quickly and transparently."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-800">Get in touch</h2>
              <p className="mt-2 text-silver-600">
                Prefer to talk? Call or message us directly - we&apos;re happy to help you choose.
              </p>

              <div className="mt-8 space-y-4">
                {details.map((d) => (
                  <div key={d.t} className="flex items-start gap-4 rounded-2xl border border-silver-200 bg-white p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                      <d.icon className="h-5.5 w-5.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-silver-400">{d.t}</p>
                      {d.href ? (
                        <a href={d.href} className="font-semibold text-navy-800 hover:text-gold-600">
                          {d.v}
                        </a>
                      ) : (
                        <p className="font-semibold text-navy-800">{d.v}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/${site.phoneHref.replace("+", "")}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                <MessageCircle className="h-4.5 w-4.5" /> Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
