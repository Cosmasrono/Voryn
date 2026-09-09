import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden text-white">
      {/* ── Full-screen background photo ── */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Vibrant Kenyan market"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Multi-layer overlay - dark on left, fading right, navy brand tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/92 via-navy-950/80 to-navy-900/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/30" />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-grid opacity-25" />

      {/* Decorative orbs */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-navy-500/25 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="container-x relative py-20 sm:py-24">
        {/* Breadcrumb */}
        {crumbs && (
          <nav className="mb-5 flex items-center gap-1.5 text-sm text-silver-400">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-gold-400">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-silver-200">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-silver-500" />}
              </span>
            ))}
          </nav>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <span className="eyebrow !text-gold-400">
            <span className="h-px w-6 bg-current" />
            {eyebrow}
            <span className="h-px w-6 bg-current" />
          </span>
        )}

        {/* Title */}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-silver-300">{subtitle}</p>
        )}

        {/* Bottom gold accent line */}
        <div className="mt-8 h-0.5 w-16 rounded-full bg-gradient-to-r from-gold-500 to-gold-300" />
      </div>
    </section>
  );
}
