import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Wallet } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatKES } from "@/lib/products";
import { accents } from "@/lib/accents";
import ProductIcon from "./ProductIcon";

export default function ProductCard({ product }: { product: Product }) {
  const a = accents[product.accent];
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group card-glow relative flex flex-col overflow-hidden rounded-2xl border border-silver-200 bg-white shadow-[0_1px_3px_rgba(16,26,61,0.04)] ${a.ring}`}
    >
      {/* Image header */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-108"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
        {/* Gold shimmer overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/0 via-gold-400/0 to-gold-300/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
        {/* Accent top bar */}
        <div className={`absolute inset-x-0 top-0 h-1 ${a.bar}`} />
        {product.flagship && (
          <span className="absolute right-3 top-3 rounded-full bg-gold-500 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-navy-900 shadow-md">
            Flagship
          </span>
        )}
        <div className={`absolute -bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-xl shadow-lg ${a.icon}`}>
          <ProductIcon slug={product.slug} className="h-5.5 w-5.5" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-8">
        <span className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.chip}`}>
          {product.category}
        </span>
        <h3 className="mt-2.5 font-display text-xl font-bold text-navy-800">{product.name}</h3>
        <p className="text-sm font-medium text-silver-500">{product.short}</p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-silver-600">{product.summary}</p>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-silver-200 pt-4 text-sm">
          <div className="flex items-start gap-2">
            <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-silver-400" />
            <div>
              <p className="text-[0.7rem] uppercase tracking-wide text-silver-400">Amount</p>
              <p className="font-semibold text-navy-800">
                {formatKES(product.min).replace("KES ", "")} – {formatKES(product.max).replace("KES ", "")}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-silver-400" />
            <div>
              <p className="text-[0.7rem] uppercase tracking-wide text-silver-400">Tenure</p>
              <p className="font-semibold text-navy-800">{product.tenure}</p>
            </div>
          </div>
        </div>

        {/* Pill CTA */}
        <span
          className={`mt-5 inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${a.icon} opacity-0 group-hover:opacity-100`}
          style={{ transition: "opacity 0.25s ease" }}
        >
          View details
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
        <span
          className={`-mt-8 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity group-hover:opacity-0 ${a.soft}`}
          style={{ transition: "opacity 0.25s ease" }}
        >
          View details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
