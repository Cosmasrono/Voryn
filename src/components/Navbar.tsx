"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-xl shadow-[0_2px_24px_rgba(16,26,61,0.10)] border-b border-silver-200/60"
          : "bg-white border-b border-transparent"
      }`}
    >
      {/* Gold top accent strip — visible when scrolled */}
      <div
        className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold-500/0 via-gold-500 to-gold-500/0 transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="container-x flex h-18 items-center justify-between py-3">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "text-navy-700 bg-navy-50"
                    : "text-silver-500 hover:text-navy-700 hover:bg-silver-100/70"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 block h-0.5 w-4 rounded-full bg-gold-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phoneHref}`}
            className="group flex items-center gap-2 text-sm font-semibold text-navy-700 transition-colors hover:text-gold-600"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-500/10 ring-1 ring-gold-500/30 group-hover:bg-gold-500/20 transition-colors">
              <Phone className="h-3.5 w-3.5 text-gold-600" />
            </span>
            {site.phone}
          </a>
          <Link
            href="/contact"
            className="btn-gold rounded-full bg-navy-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            Apply Now
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-navy-700 transition-colors hover:bg-silver-100 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          open ? "max-h-[500px] border-t border-silver-200 bg-white" : "max-h-0"
        }`}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                  active
                    ? "bg-navy-50 text-navy-700 border-l-2 border-gold-500"
                    : "text-silver-600 hover:bg-silver-50 hover:text-navy-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="mt-2 rounded-xl bg-navy-700 px-4 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-navy-800"
          >
            Apply Now
          </Link>
          <a
            href={`tel:${site.phoneHref}`}
            className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-navy-700"
          >
            <Phone className="h-4 w-4 text-gold-500" /> {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
