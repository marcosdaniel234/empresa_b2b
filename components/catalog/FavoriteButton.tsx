"use client";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Heart } from "lucide-react";
import { parseFavorites } from "@/lib/preferences";
const STORAGE_KEY = "ativos-b2b:favoritos";
const CHANGE_EVENT = "ativos-b2b:favoritos-changed";
let memory = "[]";
let unavailable = false;
function readRaw() {
  if (unavailable) return memory;
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return memory;
  }
}
function writeFavorites(slugs: string[]) {
  memory = JSON.stringify(slugs);
  try {
    window.localStorage.setItem(STORAGE_KEY, memory);
    unavailable = false;
  } catch {
    unavailable = true;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
  return !unavailable;
}
function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
const server = () => "[]";
const subscribeReady = () => () => {};
export function useFavorites() {
  const raw = useSyncExternalStore(subscribe, readRaw, server);
  const ready = useSyncExternalStore(
    subscribeReady,
    () => true,
    () => false,
  );
  return { favorites: useMemo(() => parseFavorites(raw), [raw]), ready };
}
export function FavoriteButton({
  slug,
  title,
  className = "",
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  const { favorites } = useFavorites();
  const [message, setMessage] = useState("");
  const active = favorites.includes(slug);
  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const current = parseFavorites(readRaw());
          const exists = current.includes(slug);
          const persistent = writeFavorites(
            exists ? current.filter((s) => s !== slug) : [...current, slug],
          );
          setMessage(
            persistent
              ? exists
                ? "Removido dos favoritos."
                : "Salvo nos favoritos deste navegador."
              : "Salvo apenas nesta página. O navegador não permitiu guardar o favorito.",
          );
        }}
        aria-pressed={active}
        aria-label={
          active
            ? `Remover ${title} dos favoritos`
            : `Adicionar ${title} aos favoritos`
        }
        // A posição vem de quem usa o botão: sobre a imagem no card em grade,
        // no fluxo normal na lista. Aqui ficam apenas aparência e empilhamento.
        className={`z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-white/95 shadow-card transition-colors duration-quick hover:border-action hover:bg-white ${className}`}
      >
        <Heart
          className={
            active
              ? "h-5 w-5 fill-action text-action"
              : "h-5 w-5 text-text-secondary"
          }
          aria-hidden="true"
        />
      </button>
      <span role="status" className="sr-only">
        {message}
      </span>
    </>
  );
}
