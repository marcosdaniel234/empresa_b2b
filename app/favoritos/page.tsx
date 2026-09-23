"use client";

import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
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
    <>
      <PageIntro
        crumbs={[{ label: "Favoritos" }]}
        kicker="Seleção pessoal"
        title="Meus favoritos"
      >
        <p role="status">
          {ready && favoriteAssets.length > 0
            ? `${favoriteAssets.length} ${favoriteAssets.length === 1 ? "lote salvo" : "lotes salvos"} neste navegador.`
            : "Os lotes que você salvar ficam guardados neste navegador, sem cadastro."}
        </p>
      </PageIntro>
      <div className="container-content py-8 lg:py-12">
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
    </>
  );
}
