import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import credits from "@/lib/image-credits.json";

export const metadata: Metadata = {
  title: "Image Credits",
  description: "Photo attributions for imagery used on the Voryn Capital website.",
};

export default function CreditsPage() {
  return (
    <>
      <PageHero
        eyebrow="Attribution"
        title="Image Credits"
        subtitle="Photography used on this site is licensed from Wikimedia Commons. We're grateful to the photographers who share their work."
        crumbs={[{ label: "Home", href: "/" }, { label: "Image Credits" }]}
      />
      <section className="py-16">
        <div className="container-x max-w-3xl">
          <ul className="space-y-4">
            {credits.map((c) => (
              <li
                key={c.slug}
                className="flex flex-col gap-1 rounded-2xl border border-silver-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-navy-800">{c.title}</p>
                  <p className="text-sm text-silver-500">
                    by {c.artist} · {c.license}
                  </p>
                </div>
                <a
                  href={c.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-navy-700 hover:text-gold-600"
                >
                  View source →
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-silver-500">
            Note: these are placeholder photographs for the launch build. Replace them with Voryn
            Capital&apos;s own photography of branches, staff and (with consent) clients for the
            most authentic result.
          </p>
        </div>
      </section>
    </>
  );
}
