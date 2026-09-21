import { Armchair, Factory, Server, Truck, LucideIcon } from "lucide-react";
import { Category } from "@/lib/data";

const CATEGORY_ICON: Record<Category, LucideIcon> = {
  maquinas: Factory,
  veiculos: Truck,
  tecnologia: Server,
  mobiliario: Armchair,
};

const CATEGORY_TINT: Record<Category, string> = {
  maquinas: "text-brand-900",
  veiculos: "text-action-pressed",
  tecnologia: "text-brand-900",
  mobiliario: "text-action-pressed",
};

interface AssetVisualProps {
  category: Category;
  index?: number;
  className?: string;
  iconSize?: number;
  rounded?: string;
  showLabel?: boolean;
}

/**
 * Substituto ilustrativo de fotografia: este MVP não possui fotos reais de
 * ativos. Em vez de simular fotos realistas (o que confundiria demonstração
 * com anúncio real — ver HANDOFF_DESIGN.md §3), cada ativo recebe uma
 * composição editorial estável por categoria, com padrão de pontos e ícone.
 */
export function AssetVisual({
  category,
  index = 0,
  className = "",
  iconSize = 56,
  rounded = "rounded-card",
  showLabel = false,
}: AssetVisualProps) {
  const Icon = CATEGORY_ICON[category];
  const tint = CATEGORY_TINT[category];
  const patternId = `asset-dots-${category}-${index}`;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-surface-subtle ${rounded} ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <pattern id={patternId} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#D7DFD9" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <div
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, #D9ED92 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <Icon
        className={`relative ${tint}`}
        style={{ width: iconSize, height: iconSize }}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      {showLabel && (
        <span className="absolute bottom-2 right-2 rounded-full bg-surface-card/90 px-2 py-0.5 text-caption text-text-secondary">
          Imagem ilustrativa
        </span>
      )}
    </div>
  );
}
