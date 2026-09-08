import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import Logo from "./Logo";
import { site, nav } from "@/lib/site";
import { products } from "@/lib/products";

const socialPaths: Record<string, string> = {
  Facebook:
    "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z",
  Instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z",
  Twitter:
    "M18.9 1.6h3.4l-7.4 8.5L23.9 22h-6.8l-5.3-7-6.1 7H2.3l7.9-9.1L1.7 1.6h7l4.8 6.4zm-1.2 18.4h1.9L7.3 3.5H5.3z",
  LinkedIn:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4z",
};

function SocialIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d={socialPaths[name]} />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-navy-950 text-silver-300">
      {/* Decorative wave top */}
      <div className="wave-top overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full"
          style={{ height: "48px" }}
        >
          <path
            d="M0,32 C360,0 1080,64 1440,16 L1440,48 L0,48 Z"
            fill="rgb(10,18,48)"
          />
        </svg>
      </div>

      {/* CTA band */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-6 py-12 text-center md:flex-row md:text-left">
          <div>
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl [text-shadow:0_0_30px_rgba(201,162,39,0.2)]">
              Ready to grow your business?
            </h3>
            <p className="mt-2 max-w-xl text-silver-400">
              Apply in minutes. Get matched with the right Voryn product and disbursed straight to{" "}
              {site.mpesa}.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-gold shrink-0 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-navy-900 shadow-lg"
          >
            Apply Today
          </Link>
        </div>
      </div>

      <div className="container-x grid grid-cols-2 gap-8 py-14 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <Logo variant="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-silver-400">
            {site.description}
          </p>
          <p className="mt-4 text-xs text-silver-500">A member of {site.group}.</p>
          <div className="mt-5 flex gap-3">
            {[
              { href: site.socials.facebook, label: "Facebook" },
              { href: site.socials.instagram, label: "Instagram" },
              { href: site.socials.twitter, label: "Twitter" },
              { href: site.socials.linkedin, label: "LinkedIn" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-silver-300 ring-1 ring-white/10 transition-all hover:bg-gold-500 hover:text-navy-900 hover:ring-gold-500/50"
              >
                <SocialIcon name={label} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Company
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-silver-400 transition-colors hover:text-gold-400"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Loans
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="text-silver-400 transition-colors hover:text-gold-400"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <span className="text-silver-400">{site.address}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <a href={`tel:${site.phoneHref}`} className="text-silver-400 hover:text-gold-400">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <a
                href={`mailto:${site.email}`}
                className="break-all text-silver-400 hover:text-gold-400"
              >
                {site.email}
              </a>
            </li>
            <li className="pt-1 text-xs text-silver-500">{site.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-silver-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/terms" className="hover:text-gold-400 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/credits" className="hover:text-gold-400 transition-colors">
              Image Credits
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
