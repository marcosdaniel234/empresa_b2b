"use client";
import { useState } from "react";
import { ArrowUpRight, Heart } from "lucide-react";
import Link from "next/link";
import { Asset, CATEGORY_LABELS, Category } from "@/lib/data";
import { AssetCard } from "./AssetCard";
import { useFavorites } from "./FavoriteButton";

export function PersonalShelf({ assets }: { assets: Asset[] }) {
  const [selected, setSelected] = useState<Category | "todos" | "favoritos">(
    "todos",
  );
  const { favorites } = useFavorites();
  const options = [
    { id: "todos", label: "Todos os ativos" },
    ...Object.entries(CATEGORY_LABELS).map(([id, label]) => ({ id, label })),
    { id: "favoritos", label: "Meus favoritos" },
  ];
  const items = assets
    .filter(
      (a) =>
        a.status !== "cancelado" &&
        (selected === "favoritos"
          ? favorites.includes(a.slug)
          : (a.status === "aberto" ||
              a.status === "agendado" ||
              a.status === "encerrando") &&
            (selected === "todos" || a.category === selected)),
    )
    .slice(0, 4);
  return (
    <section className="border-y border-border-subtle bg-[#EEF1EA]">
      <div className="container-content py-10">
        <div className="section-heading">
          <div>
            <p className="eyebrow mb-2">DO SEU JEITO</p>
            <h2 className="text-title-section">
              Seu próximo investimento começa aqui.
            </h2>
            <p className="mt-2 text-metadata text-text-secondary">
              Explore por interesse ou retome os ativos que você salvou.
            </p>
          </div>
          <Link href="/resultados" className="text-link">
            Abrir catálogo <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div
          className="my-6 flex flex-wrap gap-2"
          role="group"
          aria-label="Selecione os ativos da vitrine"
        >
          {options.map((option) => (
            <button
              type="button"
              key={option.id}
              aria-pressed={selected === option.id}
              onClick={() => setSelected(option.id as typeof selected)}
              className={`min-h-11 rounded-full border px-4 text-label transition-colors ${selected === option.id ? "border-brand-900 bg-brand-900 text-white" : "border-border-subtle bg-white text-text-secondary hover:border-action"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="sr-only" role="status">
          {items.length} ativos nesta seleção.
        </div>
        {items.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((asset, i) => (
              <AssetCard key={asset.id} asset={asset} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-dashed border-border-control bg-white p-8 text-center">
            <Heart className="mx-auto text-action" aria-hidden="true" />
            <h3 className="mt-3 text-title-card">
              Guarde as oportunidades que interessam.
            </h3>
            <p className="mt-2 text-metadata text-text-secondary">
              Toque no coração de um ativo para encontrá-lo aqui. Os favoritos
              ficam neste navegador.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
