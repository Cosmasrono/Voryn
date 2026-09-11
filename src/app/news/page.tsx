import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Tag, ArrowRight, Rss, TrendingUp, Landmark, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Latest news, company updates, and industry insights from Voryn Capital Limited.",
};

// ─── UPDATE THIS ARRAY TO ADD/EDIT NEWS ARTICLES ───────────────────────────
const articles = [
  {
    id: "launch-2026",
    category: "Company Update",
    categoryIcon: Landmark,
    date: "September 2026",
    title: "Voryn Capital officially launches operations in Nairobi",
    excerpt:
      "Voryn Capital Limited has officially launched its lending operations, bringing accessible working-capital, Chama group finance, and asset loans to micro and small enterprises across Nairobi and surrounding counties.",
    featured: true,
  },
  {
    id: "voryn-biashara-launch",
    category: "Product News",
    categoryIcon: TrendingUp,
    date: "September 2026",
    title: "Introducing Voryn Biashara — the gateway loan for every new client",
    excerpt:
      "Voryn Biashara is now open for applications. Designed as a fully unsecured starter loan for first-time borrowers, it comes with built-in coaching and a clear pathway to higher credit limits.",
    featured: false,
  },
  {
    id: "chama-group-launch",
    category: "Product News",
    categoryIcon: Users,
    date: "September 2026",
    title: "Voryn Chama — group table-banking finance is now available",
    excerpt:
      "Registered chama groups and table-banking circles can now apply for Voryn Chama, a collective lending facility designed around how group savings and lending actually works in the community.",
    featured: false,
  },
  {
    id: "sme-credit-access",
    category: "Industry Insight",
    categoryIcon: Rss,
    date: "August 2026",
    title: "Why traditional credit fails Kenya's everyday traders — and what we're doing about it",
    excerpt:
      "Over 80% of Kenya's informal micro-traders are excluded from formal credit because traditional banks demand collateral, salaried income, or complex documentation. Voryn Capital was built to close that gap.",
    featured: false,
  },
];

const categories = ["All", "Company Update", "Product News", "Industry Insight"];

export default function NewsPage() {
  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <>
      <PageHero
        eyebrow="News & Updates"
        title="What's happening at Voryn Capital"
        subtitle="Company announcements, product launches, and perspectives on enterprise finance in Kenya. Updated regularly."
        crumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
      />

      <section className="py-16 sm:py-24">
        <div className="container-x">
          {/* Category filter pills (visual only — can be wired up later) */}
          <Reveal>
            <div className="mb-10 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all cursor-default ${
                    cat === "All"
                      ? "bg-navy-700 text-white shadow-sm"
                      : "border border-silver-200 bg-white text-silver-500 hover:border-navy-300 hover:text-navy-700"
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Featured article */}
          {featured && (
            <Reveal>
              <div className="mb-10 overflow-hidden rounded-3xl border border-silver-200 bg-white shadow-md hover:shadow-xl transition-shadow">
                <div className="grid lg:grid-cols-[1.4fr_1fr]">
                  {/* Content */}
                  <div className="flex flex-col justify-between p-8 sm:p-10">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/10 px-3 py-1 text-xs font-bold text-gold-700 border border-gold-500/20">
                          <featured.categoryIcon className="h-3 w-3" /> {featured.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-silver-400">
                          <Calendar className="h-3.5 w-3.5" /> {featured.date}
                        </span>
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-emerald-700">
                          Latest
                        </span>
                      </div>
                      <h2 className="mt-5 font-display text-2xl font-bold text-navy-800 sm:text-3xl leading-tight">
                        {featured.title}
                      </h2>
                      <p className="mt-4 text-silver-600 leading-relaxed">{featured.excerpt}</p>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-gold-600 transition-colors cursor-default">
                      Read more <ArrowRight className="h-4 w-4" />
                      <span className="ml-1 text-xs font-normal text-silver-400">(Full article coming soon)</span>
                    </div>
                  </div>

                  {/* Visual panel */}
                  <div className="relative hidden lg:block">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950">
                      <div className="absolute inset-0 bg-grid opacity-40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Landmark className="mx-auto h-16 w-16 text-gold-400 opacity-60" />
                          <p className="mt-4 font-display text-sm font-bold text-white/40">
                            Voryn Capital
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* Article grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, i) => (
              <Reveal key={article.id} delay={i * 0.07}>
                <article className="group flex h-full flex-col rounded-2xl border border-silver-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-2.5 py-1 text-[0.7rem] font-bold text-navy-700 border border-navy-100">
                      <Tag className="h-3 w-3" /> {article.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-[0.7rem] text-silver-400">
                      <Calendar className="h-3 w-3" /> {article.date}
                    </span>
                  </div>

                  <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy-600 to-navy-800 text-white shadow-md">
                    <article.categoryIcon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 flex-1 font-display text-lg font-bold text-navy-800 leading-snug group-hover:text-navy-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-silver-600">{article.excerpt}</p>

                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-silver-400">
                    Full article coming soon
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Subscription / stay updated CTA */}
          <Reveal>
            <div className="mt-16 rounded-3xl bg-cream border border-silver-200 px-8 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-700 text-white shadow-md">
                <Rss className="h-6 w-6" />
              </div>
              <p className="mt-5 font-display text-xl font-bold text-navy-800">
                Stay in the loop
              </p>
              <p className="mt-2 text-silver-600">
                This page is updated regularly with news, product announcements, and industry insights. Check back often or follow us on social media.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <a
                  href="#"
                  className="rounded-full bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-navy-800"
                >
                  Follow on LinkedIn
                </a>
                <a
                  href="#"
                  className="rounded-full border border-silver-300 bg-white px-6 py-3 text-sm font-semibold text-navy-700 transition-all hover:bg-silver-50"
                >
                  Follow on Facebook
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
