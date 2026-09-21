"use client";
import { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { Asset, CATEGORY_LABELS, Category } from "@/lib/data";
import { AssetCard } from "./AssetCard";
import { useFavorites } from "./FavoriteButton";

type Selection = Category | "todos" | "favoritos";

/**
 * Segunda vitrine do catálogo: lotes disponíveis, refináveis por categoria,
 * com um atalho para os favoritos salvos neste navegador.
 */
export function PersonalShelf({ assets }: { assets: Asset[] }) {
  const [selected, setSelected] = useState<Selection>("todos");
  const { favorites } = useFavorites();

  const options: { id: Selection; label: string }[] = [
    { id: "todos", label: "Todos" },
    ...(Object.entries(CATEGORY_LABELS) as [Category, string][]).map(
      ([id, label]) => ({ id, label }),
    ),
    { id: "favoritos", label: "Meus favoritos" },
  ];

  const items = assets
    .filter((asset) => {
      if (asset.status === "cancelado") return false;
      if (selected === "favoritos") return favorites.includes(asset.slug);
      const available =
        asset.status === "aberto" ||
        asset.status === "agendado" ||
        asset.status === "encerrando";
      return available && (selected === "todos" || asset.category === selected);
    })
    .slice(0, 4);

  return (
    <section className="border-y border-border-subtle bg-surface-subtle">
      <div className="container-content py-8 md:py-10">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Disponíveis agora</p>
            <h2 className="section-title mt-1">Novidades no catálogo</h2>
          </div>
          <Link href="/resultados" className="text-link">
            Abrir catálogo <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div
          className="scroll-rail my-4 gap-2"
          role="group"
          aria-label="Refinar a vitrine"
        >
          {options.map((option) => (
            <button
              type="button"
              key={option.id}
              aria-pressed={selected === option.id}
              onClick={() => setSelected(option.id)}
              className={`chip shrink-0 ${selected === option.id ? "chip-active" : ""}`}
            >
              {option.id === "favoritos" && (
                <Heart size={14} aria-hidden="true" />
              )}
              {option.label}
            </button>
          ))}
        </div>

        <div className="sr-only" role="status">
          {items.length} lotes nesta seleção.
        </div>

        {items.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((asset, i) => (
              <AssetCard key={asset.id} asset={asset} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-dashed border-border-control bg-white p-8 text-center">
            <Heart className="mx-auto text-action" aria-hidden="true" />
            <h3 className="mt-3 text-title-card">
              {selected === "favoritos"
                ? "Você ainda não salvou nenhum lote."
                : "Nenhum lote disponível nesta categoria."}
            </h3>
            <p className="mt-2 text-metadata text-text-secondary">
              {selected === "favoritos"
                ? "Toque no coração de um lote para encontrá-lo aqui. Os favoritos ficam neste navegador."
                : "Veja as outras categorias ou abra o catálogo completo."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
