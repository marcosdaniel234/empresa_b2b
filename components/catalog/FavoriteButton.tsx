"use client";

import { useMemo, useSyncExternalStore } from "react";
import { Heart } from "lucide-react";

const STORAGE_KEY = "ativos-b2b:favoritos";
const CHANGE_EVENT = "ativos-b2b:favoritos-changed";

function readFavoritesRaw(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function writeFavorites(slugs: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  } catch {
    // Armazenamento indisponível (ex.: navegação privada); favorito não persiste nesta sessão.
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getServerSnapshot() {
  return "[]";
}

/** Lista de favoritos sincronizada com o localStorage via useSyncExternalStore. */
export function useFavorites() {
  const raw = useSyncExternalStore(subscribe, readFavoritesRaw, getServerSnapshot);
  const favorites = useMemo<string[]>(() => {
    try {
      return JSON.parse(raw) as string[];
    } catch {
      return [];
    }
  }, [raw]);

  return { favorites, ready: true };
}

export function FavoriteButton({ slug, title, className = "" }: { slug: string; title: string; className?: string }) {
  const { favorites } = useFavorites();
  const isFavorite = favorites.includes(slug);

  function toggle(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const next = isFavorite ? favorites.filter((s) => s !== slug) : [...favorites, slug];
    writeFavorites(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Remover ${title} dos favoritos` : `Adicionar ${title} aos favoritos`}
      className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-surface-card/95 shadow-card transition-transform duration-quick hover:scale-[1.04] ${className}`}
    >
      <Heart
        className={isFavorite ? "h-5 w-5 fill-danger-text text-danger-text" : "h-5 w-5 text-text-secondary"}
        aria-hidden="true"
      />
    </button>
  );
}
