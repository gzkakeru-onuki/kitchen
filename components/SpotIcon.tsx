import { Anchor, Building2, Factory, Flower2, ShoppingBag, Tent } from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";
import type { SpotIcon as SpotIconKey } from "@/lib/mock";

const map: Record<SpotIconKey, LucideIcon> = {
  building: Building2,
  anchor: Anchor,
  shopping: ShoppingBag,
  tent: Tent,
  flower: Flower2,
  factory: Factory,
};

export default function SpotIcon({ icon, ...props }: { icon: SpotIconKey } & LucideProps) {
  const Icon = map[icon];
  return <Icon {...props} />;
}

// 出店場所・記事のサムネイル（写真の代わりに色面＋アイコン）
export function SpotThumb({
  icon,
  color,
  className = "h-32",
  size = 44,
}: {
  icon: SpotIconKey;
  color: string;
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ background: `${color}18`, color }}
    >
      <SpotIcon icon={icon} size={size} strokeWidth={1.5} />
    </div>
  );
}
