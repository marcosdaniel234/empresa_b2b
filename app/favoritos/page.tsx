"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { ASSETS } from "@/lib/data";
import { AssetCard } from "@/components/catalog/AssetCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { useFavorites } from "@/components/catalog/FavoriteButton";

export default function FavoritosPage() {
  const { favorites, ready } = useFavorites();
  const favoriteAssets = ASSETS.filter((asset) =>
    favorites.includes(asset.slug),
  );

  return (
    <div className="container-content py-5 md:py-6">
      <nav
        aria-label="Trilha de navegação"
        className="text-caption text-text-secondary"
      >
        <Link href="/" className="hover:text-action hover:underline">
          Início
        </Link>
        <span aria-hidden="true"> / </span>
        <span>Favoritos</span>
      </nav>

      <h1 className="mt-2 text-title-page-mobile text-text-primary md:text-title-page">
        Meus favoritos
      </h1>
      <p role="status" className="mt-1 max-w-2xl text-metadata text-text-secondary">
        {ready && favoriteAssets.length > 0
          ? `${favoriteAssets.length} ${favoriteAssets.length === 1 ? "lote salvo" : "lotes salvos"} neste navegador.`
          : "Os lotes que você salvar ficam guardados neste navegador, sem cadastro."}
      </p>

      <div className="mt-5">
        {!ready ? null : favoriteAssets.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Você ainda não salvou nenhum lote."
            description="Toque no coração de qualquer lote do catálogo para encontrá-lo aqui."
            action={
              <Link href="/resultados" className="secondary-link mt-1">
                Abrir o catálogo
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteAssets.map((asset, i) => (
              <AssetCard key={asset.id} asset={asset} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
