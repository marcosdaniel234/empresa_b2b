"use client";
import { useEffect } from "react";
import { createSlugListStore } from "@/components/shared/localSlugList";

const MAX_RECENT = 20;
const store = createSlugListStore(
  "ativos-b2b:vistos",
  "ativos-b2b:vistos-changed",
  MAX_RECENT,
);

/** Lê a lista atual sem se inscrever em mudanças — usada só para gravar. */
function readCurrent(): string[] {
  try {
    return JSON.parse(store.readRaw()) as string[];
  } catch {
    return [];
  }
}

/** Move o lote para o topo da lista de vistos recentemente. */
function recordView(slug: string) {
  const current = readCurrent().filter((s) => s !== slug);
  store.write([slug, ...current]);
}

/** Lista de slugs vistos recentemente, do mais para o menos recente. */
export function useRecentlyViewed(): string[] {
  return store.useList();
}

/**
 * Componente sem saída visual: registra o lote atual como visto ao montar a
 * página de detalhe. Vive junto do conteúdo, não em um serviço de analytics.
 */
export function RecordView({ slug }: { slug: string }) {
  useEffect(() => {
    recordView(slug);
  }, [slug]);
  return null;
}
