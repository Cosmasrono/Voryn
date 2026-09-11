import { Store, Users, Sprout, TrendingUp, HeartHandshake, Bike, type LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = {
  "voryn-biashara": Store,
  "voryn-chama": Users,
  "voryn-mama-biashara": HeartHandshake,
  "voryn-growth": TrendingUp,
  "voryn-agri-boost": Sprout,
  "voryn-asset-loan": Bike,
};

export default function ProductIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = map[slug] ?? Store;
  return <Icon className={className} />;
}
