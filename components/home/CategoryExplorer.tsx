"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  ASSETS,
  CATEGORY_LABELS,
  CATEGORY_SHORT,
  Category,
  SUBCATEGORIES,
} from "@/lib/data";
import { ImageSlot } from "@/components/ui/ImageSlot";

const CATEGORIES = Object.keys(CATEGORY_SHORT) as Category[];

function lotsIn(category: Category, subcategory?: string) {
  return ASSETS.filter(
    (asset) =>
      asset.status !== "cancelado" &&
      asset.category === category &&
      (!subcategory || asset.subcategory === subcategory),
  ).length;
}

/**
 * Entrada do catálogo por categoria, no corpo da página em vez do cabeçalho.
 * Cada bloco abre as subcategorias no lugar, com a contagem de lotes — o
 * comprador vê a profundidade do catálogo sem trocar de página, e quem já
 * sabe o que quer clica direto no título para abrir a categoria filtrada.
 */
export function CategoryExplorer() {
  const [open, setOpen] = useState<Category | null>(null);
  const openLabel = open ? CATEGORY_LABELS[open] : null;

  return (
    <section aria-labelledby="titulo-categorias" className="mt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-action pb-2">
        <h2 id="titulo-categorias" className="section-title">
          Categorias do catálogo
        </h2>
        <Link href="/resultados" className="text-link">
          Catálogo completo <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {CATEGORIES.map((category) => {
          const isOpen = open === category;
          const total = lotsIn(category);
          return (
            <div
              key={category}
              className={`group flex flex-col border bg-white transition-[border-color,box-shadow,transform] duration-standard ease-standard hover:-translate-y-[2px] hover:shadow-elevated ${
                isOpen
                  ? "border-action shadow-elevated"
                  : "border-border-subtle hover:border-action"
              }`}
            >
              <Link
                href={`/resultados?categoria=${category}`}
                className="block"
                aria-label={`Abrir ${CATEGORY_LABELS[category]} no catálogo`}
              >
                <ImageSlot
                  ratio="aspect-[16/7]"
                  size="sm"
                  className="w-full border-0 border-b border-border-subtle"
                />
              </Link>

              <div className="flex flex-1 flex-col p-2.5">
                <Link
                  href={`/resultados?categoria=${category}`}
                  className="nav-underline -mx-0.5 inline-flex items-baseline justify-between gap-2 px-0.5 pb-1 text-title-card text-text-primary transition-colors duration-quick hover:text-action"
                >
                  {CATEGORY_SHORT[category]}
                  <span className="shrink-0 text-caption font-normal text-text-muted tabular">
                    {total} {total === 1 ? "lote" : "lotes"}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : category)}
                  aria-expanded={isOpen}
                  aria-controls="painel-subcategorias"
                  className="mt-auto inline-flex min-h-9 items-center justify-between gap-1.5 pt-1 text-caption font-semibold text-action transition-colors duration-quick hover:text-action-hover"
                >
                  {SUBCATEGORIES[category].length} subcategorias
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className={`transition-transform duration-standard ease-standard ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {open && openLabel && (
        <div
          id="painel-subcategorias"
          className="mt-2.5 animate-panel-down border border-action bg-white"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface-subtle px-3 py-2">
            <h3 className="text-label font-bold uppercase tracking-[.05em] text-text-primary">
              {openLabel}
            </h3>
            <Link
              href={`/resultados?categoria=${open}`}
              className="inline-flex items-center gap-1.5 text-caption font-semibold text-action transition-colors duration-quick hover:text-action-hover hover:underline"
            >
              Ver os {lotsIn(open)} lotes
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid gap-x-4 p-2 sm:grid-cols-2 lg:grid-cols-4">
            {SUBCATEGORIES[open].map((sub) => (
              <li key={sub.slug}>
                <Link
                  href={`/resultados?categoria=${open}&subcategoria=${sub.slug}`}
                  className="nav-underline flex min-h-9 items-baseline justify-between gap-2 px-1.5 text-metadata text-text-secondary transition-colors duration-quick hover:text-action"
                >
                  {sub.label}
                  <span className="text-caption text-text-muted tabular">
                    {lotsIn(open, sub.slug)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
