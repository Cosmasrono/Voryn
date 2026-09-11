"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { site } from "@/lib/site";

// ── Primary nav (inline on desktop) ─────────────────────────────────────────
// Items marked `wide` only fit inline on xl+ screens; below that they move
// into the "More" dropdown so the bar never gets cramped.
const primaryNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Loan Products", href: "/products" },
  { label: "Advisory", href: "/advisory" },
  { label: "Asset Management", href: "/asset-management", wide: true },
];

// ── Secondary nav (always in the "More" dropdown on desktop) ────────────────
const moreNav = [
  { label: "Governance", href: "/governance" },
  { label: "Careers", href: "/careers" },
  { label: "News", href: "/news" },
  { label: "FAQs", href: "/faqs" },
];

const wideNav = primaryNav.filter((item) => item.wide);

// ── All nav items (for mobile menu) ─────────────────────────────────────────
const allNav = [...primaryNav, ...moreNav, { label: "Contact", href: "/contact" }];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

// Fluid sizing: text and padding scale smoothly with the viewport width.
const linkBase =
  "relative flex items-center whitespace-nowrap rounded-full py-2 font-semibold transition-colors duration-200 " +
  "text-[clamp(0.875rem,0.55rem+0.4vw,1rem)] px-[clamp(0.625rem,0.2rem+0.55vw,1.125rem)]";
const linkIdle = "text-silver-600 hover:text-navy-900 hover:bg-silver-100/80";
const linkActive = "text-navy-900 bg-navy-50";

function ActiveDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute bottom-1 left-1/2 block h-[2.5px] w-5 -translate-x-1/2 rounded-full bg-gold-500 ${className}`}
    />
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close menus on route change (adjusting state during render, not in an effect)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setMoreOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close "More" dropdown on outside click or Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const moreActive = moreNav.some((item) => isActive(pathname, item.href));
  // A `wide` item is inside "More" only below xl, so highlight "More" only there.
  const wideActive = wideNav.some((item) => isActive(pathname, item.href));

  const moreClass = moreActive
    ? linkActive
    : wideActive
      ? `${linkActive} xl:bg-transparent xl:text-silver-600 xl:hover:bg-silver-100/80 xl:hover:text-navy-900`
      : linkIdle;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_2px_24px_rgba(16,26,61,0.10)] border-b border-silver-200/60"
          : "bg-white border-b border-transparent"
      }`}
    >
      {/* Gold top accent strip */}
      <div
        className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold-500/0 via-gold-500 to-gold-500/0 transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Fluid-width bar: grows with the screen up to 1600px */}
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[100rem] items-center gap-4 px-5 sm:px-6 lg:h-20 lg:gap-6 lg:px-8 2xl:px-12">
        <Logo size="lg" className="shrink-0" />

        {/* Desktop nav — takes the free space and centres itself in it */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-[clamp(0.125rem,0.3vw,0.5rem)] lg:flex">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`${linkBase} ${active ? linkActive : linkIdle} ${item.wide ? "hidden xl:flex" : ""}`}
              >
                {item.label}
                {active && <ActiveDot />}
              </Link>
            );
          })}

          {/* "More" dropdown */}
          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              className={`${linkBase} gap-1 ${moreClass}`}
            >
              More
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
              />
              {moreActive && <ActiveDot />}
              {!moreActive && wideActive && <ActiveDot className="xl:hidden" />}
            </button>

            {/* Dropdown panel */}
            <div
              className={`absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-silver-200 bg-white p-1.5 shadow-2xl transition-all duration-200 ${
                moreOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              {[...wideNav, ...moreNav].map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`items-center gap-2 rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors ${
                      "wide" in item ? "flex xl:hidden" : "flex"
                    } ${
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

        {/* Desktop actions */}
        <div className="ml-auto hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
          <a
            href={`tel:${site.phoneHref}`}
            aria-label={`Call ${site.phone}`}
            title={site.phone}
            className="group flex items-center gap-2.5 whitespace-nowrap text-[15px] font-semibold text-navy-800 transition-colors hover:text-gold-600"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/10 ring-1 ring-gold-500/30 transition-all group-hover:scale-105 group-hover:bg-gold-500/20">
              <Phone className="h-4 w-4 text-gold-600" />
            </span>
            <span className="hidden 2xl:inline">{site.phone}</span>
          </a>
          <Link
            href="/contact"
            className="btn-gold whitespace-nowrap rounded-full bg-navy-700 px-[clamp(1.25rem,0.6rem+0.6vw,1.75rem)] py-2.5 text-[clamp(0.875rem,0.6rem+0.3vw,1rem)] font-bold text-white shadow-md transition-all duration-200 hover:bg-navy-800 hover:shadow-lg"
          >
            Apply Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex items-center justify-center rounded-xl p-2.5 text-navy-700 transition-colors hover:bg-silver-100 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-y-auto transition-all duration-300 ease-in-out lg:hidden ${
          open ? "max-h-[calc(100dvh-4.5rem)] border-t border-silver-200 bg-white" : "max-h-0"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-2xl flex-col gap-1 px-5 py-4 sm:px-6">
          {allNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
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
            className="mt-2 rounded-xl bg-navy-700 px-4 py-3.5 text-center text-base font-bold text-white shadow-md transition-colors hover:bg-navy-800"
          >
            Apply Now
          </Link>
          <a
            href={`tel:${site.phoneHref}`}
            className="flex items-center justify-center gap-2.5 px-4 py-3.5 text-[15px] font-semibold text-navy-800"
          >
            <Phone className="h-4 w-4 text-gold-500" /> {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
