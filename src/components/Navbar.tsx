"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { site } from "@/lib/site";

// ── Primary nav (always visible in desktop) ─────────────────────────────────
const primaryNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Loan Products", href: "/products" },
  { label: "Advisory", href: "/advisory" },
  { label: "Asset Management", href: "/asset-management" },
];

// ── Secondary nav (shown in "More" dropdown on desktop) ─────────────────────
const moreNav = [
  { label: "Governance", href: "/governance" },
  { label: "Careers", href: "/careers" },
  { label: "News", href: "/news" },
  { label: "FAQs", href: "/faqs" },
];

// ── All nav items (for mobile menu) ─────────────────────────────────────────
const allNav = [...primaryNav, ...moreNav, { label: "Contact", href: "/contact" }];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const moreActive = moreNav.some((item) => pathname.startsWith(item.href));

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-xl shadow-[0_2px_24px_rgba(16,26,61,0.10)] border-b border-silver-200/60"
          : "bg-white border-b border-transparent"
      }`}
    >
      {/* Gold top accent strip */}
      <div
        className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold-500/0 via-gold-500 to-gold-500/0 transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="container-x flex min-h-[5.25rem] lg:min-h-[5.75rem] items-center justify-between py-3.5 lg:py-4">
        <Logo size="lg" className="shrink-0" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 xl:gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative whitespace-nowrap rounded-full px-3 xl:px-3.5 py-2.5 text-[14px] xl:text-[15px] font-semibold transition-all duration-200 ${
                  active
                    ? "text-navy-900 bg-navy-50/90 font-bold"
                    : "text-silver-600 hover:text-navy-900 hover:bg-silver-100/80"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 block h-[2.5px] w-5 rounded-full bg-gold-500 shadow-sm" />
                )}
              </Link>
            );
          })}

          {/* "More" dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 xl:px-3.5 py-2.5 text-[14px] xl:text-[15px] font-semibold transition-all duration-200 ${
                moreActive
                  ? "text-navy-900 bg-navy-50/90 font-bold"
                  : "text-silver-600 hover:text-navy-900 hover:bg-silver-100/80"
              }`}
            >
              More
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
              />
              {moreActive && (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 block h-[2.5px] w-5 rounded-full bg-gold-500 shadow-sm" />
              )}
            </button>

            {/* Dropdown panel */}
            <div
              className={`absolute right-0 top-full mt-2.5 w-52 overflow-hidden rounded-2xl border border-silver-200 bg-white p-1.5 shadow-2xl transition-all duration-200 ${
                moreOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              {moreNav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors ${
                      active
                        ? "bg-navy-50 text-navy-800 border-l-2 border-gold-500"
                        : "text-silver-700 hover:bg-silver-50 hover:text-navy-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:gap-4 lg:flex">
          <a
            href={`tel:${site.phoneHref}`}
            aria-label={`Call ${site.phone}`}
            title={site.phone}
            className="group flex items-center gap-2.5 whitespace-nowrap text-[14px] font-semibold text-navy-800 transition-colors hover:text-gold-600"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/10 ring-1 ring-gold-500/30 group-hover:bg-gold-500/20 group-hover:scale-105 transition-all">
              <Phone className="h-4 w-4 text-gold-600" />
            </span>
            <span className="hidden xl:inline">{site.phone}</span>
          </a>
          <Link
            href="/contact"
            className="btn-gold whitespace-nowrap rounded-full bg-navy-700 hover:bg-navy-800 px-5 xl:px-6 py-2.5 text-[15px] font-bold text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
          >
            Apply Now
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-xl p-2.5 text-navy-700 transition-colors hover:bg-silver-100 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          open ? "max-h-[600px] border-t border-silver-200 bg-white" : "max-h-0"
        }`}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {allNav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-xl px-4 py-3.5 text-base font-semibold transition-colors ${
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
            className="mt-2 rounded-xl bg-navy-700 px-4 py-3.5 text-center text-base font-bold text-white transition-colors hover:bg-navy-800 shadow-md"
          >
            Apply Now
          </Link>
          <a
            href={`tel:${site.phoneHref}`}
            className="flex items-center justify-center gap-2.5 px-4 py-3.5 text-[15px] font-semibold text-navy-800"
          >
            <Phone className="h-4.5 w-4.5 text-gold-500" /> {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
