"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { createSlugListStore } from "@/components/shared/localSlugList";

export const MAX_COMPARE = 4;

const store = createSlugListStore(
  "ativos-b2b:comparar",
  "ativos-b2b:comparar-changed",
  MAX_COMPARE,
);

function readCurrent(): string[] {
  try {
    return JSON.parse(store.readRaw()) as string[];
  } catch {
    return [];
  }
}

/** Lista de slugs selecionados para comparação, neste navegador. */
export function useCompareList(): string[] {
  return store.useList();
}

export function removeFromCompare(slug: string) {
  store.write(readCurrent().filter((s) => s !== slug));
}

export function clearCompareList() {
  store.write([]);
}

/**
 * Checkbox de comparação, no padrão de catálogo de equipamento industrial
 * (Surplex, Ritchie Bros.): até {@link MAX_COMPARE} lotes lado a lado.
 */
export function CompareToggle({
  slug,
  title,
  className = "",
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  const selected = useCompareList();
  const [limitMessage, setLimitMessage] = useState("");
  const active = selected.includes(slug);

  return (
    <div className={`relative z-10 ${className}`}>
      <label className="flex min-h-9 cursor-pointer items-center gap-1.5 text-caption text-text-secondary">
        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] border border-border-control bg-white">
          {active && (
            <Check
              size={12}
              strokeWidth={3}
              className="text-action"
              aria-hidden="true"
            />
          )}
        </span>
        <input
          type="checkbox"
          checked={active}
          className="sr-only"
          onChange={(e) => {
            e.stopPropagation();
            const current = readCurrent();
            if (active) {
              store.write(current.filter((s) => s !== slug));
              setLimitMessage("");
              return;
            }
            if (current.length >= MAX_COMPARE) {
              setLimitMessage(
                `Você já selecionou ${MAX_COMPARE} lotes. Remova um para comparar outro.`,
              );
              return;
            }
            store.write([...current, slug]);
            setLimitMessage("");
          }}
          aria-label={
            active ? `Remover ${title} da comparação` : `Comparar ${title}`
          }
        />
        Comparar
      </label>
      <span role="alert" className="sr-only">
        {limitMessage}
      </span>
      {limitMessage && (
        <p className="mt-1 text-caption text-danger-text">{limitMessage}</p>
      )}
    </div>
  );
}
