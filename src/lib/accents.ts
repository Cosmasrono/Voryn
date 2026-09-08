import type { Product } from "./products";

type AccentStyle = {
  chip: string;
  icon: string;
  bar: string;
  ring: string;
  soft: string;
};

export const accents: Record<Product["accent"], AccentStyle> = {
  navy: {
    chip: "bg-navy-50 text-navy-700",
    icon: "bg-navy-700 text-white",
    bar: "bg-navy-700",
    ring: "group-hover:border-navy-300",
    soft: "text-navy-700",
  },
  gold: {
    chip: "bg-gold-500/15 text-gold-600",
    icon: "bg-gold-500 text-navy-900",
    bar: "bg-gold-500",
    ring: "group-hover:border-gold-400",
    soft: "text-gold-600",
  },
  rose: {
    chip: "bg-rose-50 text-rose-600",
    icon: "bg-rose-500 text-white",
    bar: "bg-rose-500",
    ring: "group-hover:border-rose-300",
    soft: "text-rose-600",
  },
  teal: {
    chip: "bg-teal-50 text-teal-700",
    icon: "bg-teal-600 text-white",
    bar: "bg-teal-600",
    ring: "group-hover:border-teal-300",
    soft: "text-teal-700",
  },
  green: {
    chip: "bg-emerald-50 text-emerald-700",
    icon: "bg-emerald-600 text-white",
    bar: "bg-emerald-600",
    ring: "group-hover:border-emerald-300",
    soft: "text-emerald-700",
  },
};
