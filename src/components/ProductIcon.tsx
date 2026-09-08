import { Store, Zap, Sprout, TrendingUp, HeartHandshake, type LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = {
  "voryn-biashara": Store,
  "voryn-daily-trader": Zap,
  "voryn-mama-biashara": HeartHandshake,
  "voryn-growth": TrendingUp,
  "voryn-agri-boost": Sprout,
};

export default function ProductIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = map[slug] ?? Store;
  return <Icon className={className} />;
}
