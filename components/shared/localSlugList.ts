"use client";
import { useMemo, useSyncExternalStore } from "react";
import { parseSlugList } from "@/lib/preferences";

/**
 * Fábrica para uma lista de slugs persistida no localStorage, sincronizada
 * entre componentes via useSyncExternalStore. Mesmo padrão usado pelos
 * favoritos (components/catalog/FavoriteButton.tsx), reaproveitado aqui para
 * não duplicar a leitura/escrita/assinatura em cada recurso novo.
 */
export function createSlugListStore(
  storageKey: string,
  changeEvent: string,
  max: number,
) {
  let memory = "[]";
  let unavailable = false;

  function readRaw() {
    if (unavailable) return memory;
    try {
      return window.localStorage.getItem(storageKey) ?? "[]";
    } catch {
      return memory;
    }
  }

  function write(slugs: string[]) {
    memory = JSON.stringify(slugs.slice(0, max));
    try {
      window.localStorage.setItem(storageKey, memory);
      unavailable = false;
    } catch {
      unavailable = true;
    }
    window.dispatchEvent(new Event(changeEvent));
    return !unavailable;
  }

  function subscribe(callback: () => void) {
    window.addEventListener(changeEvent, callback);
    window.addEventListener("storage", callback);
    return () => {
      window.removeEventListener(changeEvent, callback);
      window.removeEventListener("storage", callback);
    };
  }

  const server = () => "[]";

  function useList(): string[] {
    const raw = useSyncExternalStore(subscribe, readRaw, server);
    return useMemo(() => parseSlugList(raw, max), [raw]);
  }

  return { readRaw, write, useList };
}
