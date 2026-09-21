"use client";

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
    <div className="container-content py-8 md:py-10">
      <h1 className="text-title-page-mobile text-text-primary md:text-title-page">
        Favoritos
      </h1>
      <p className="mt-2 max-w-2xl text-body text-text-secondary">
        Sua seleção, em um só lugar. Os favoritos ficam salvos neste navegador
        para você retomar a pesquisa.
      </p>

      <div className="mt-8">
        {!ready ? null : favoriteAssets.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Você ainda não tem favoritos."
            description="Toque no coração em qualquer ativo para guardá-lo aqui."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteAssets.map((asset, i) => (
              <AssetCard key={asset.id} asset={asset} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
