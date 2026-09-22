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
 *
 * Os blocos são compactos e só de texto: uma moldura de imagem vazia por
 * categoria não informa nada e transforma a seção num campo bege. Ao abrir,
 * as subcategorias aparecem ordenadas pelo que existe em catálogo — o
 * comprador vê primeiro onde há lote, não a taxonomia em ordem alfabética.
 */
export function CategoryExplorer() {
  const [open, setOpen] = useState<Category | null>(null);

  const subs = open
    ? [...SUBCATEGORIES[open]]
        .map((sub) => ({ ...sub, total: lotsIn(open, sub.slug) }))
        .sort((a, b) => b.total - a.total)
    : [];

  return (
    <section
      aria-labelledby="titulo-categorias"
      className="container-content py-6"
    >
      <div className="section-heading">
        <h2 id="titulo-categorias" className="section-title">
          Categorias do catálogo
        </h2>
        <Link href="/resultados" className="text-link">
          Catálogo completo <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {CATEGORIES.map((category) => {
          const isOpen = open === category;
          const total = lotsIn(category);
          return (
            <div
              key={category}
              className={`flex items-stretch border bg-white transition-[border-color,box-shadow] duration-standard ease-standard ${
                isOpen
                  ? "border-action shadow-card"
                  : "border-border-subtle hover:border-border-strong"
              }`}
            >
              <Link
                href={`/resultados?categoria=${category}`}
                className="nav-underline flex min-w-0 flex-1 flex-col justify-center gap-0.5 px-3 py-2.5 transition-colors duration-quick hover:text-action"
              >
                <span className="truncate text-title-card text-text-primary">
                  {CATEGORY_SHORT[category]}
                </span>
                <span className="text-caption text-text-muted tabular">
                  {total} {total === 1 ? "lote" : "lotes"} ·{" "}
                  {SUBCATEGORIES[category].length} subcategorias
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : category)}
                aria-expanded={isOpen}
                aria-controls="painel-subcategorias"
                aria-label={`${isOpen ? "Fechar" : "Abrir"} subcategorias de ${CATEGORY_LABELS[category]}`}
                className={`flex w-11 shrink-0 items-center justify-center border-l border-border-subtle transition-colors duration-quick ${
                  isOpen
                    ? "bg-action text-white"
                    : "text-text-muted hover:bg-surface-subtle hover:text-action"
                }`}
              >
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`transition-transform duration-standard ease-standard ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {open && (
        <div
          id="painel-subcategorias"
          className="mt-2 animate-panel-down border border-action bg-white"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface-subtle px-3 py-2">
            <h3 className="text-label font-bold uppercase tracking-[.05em] text-text-primary">
              {CATEGORY_LABELS[open]}
            </h3>
            <Link
              href={`/resultados?categoria=${open}`}
              className="inline-flex items-center gap-1.5 text-caption font-semibold text-action transition-colors duration-quick hover:text-action-hover hover:underline"
            >
              Ver os {lotsIn(open)} lotes
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid gap-x-5 p-2 sm:grid-cols-2 lg:grid-cols-4">
            {subs.map((sub) => (
              <li key={sub.slug}>
                <Link
                  href={`/resultados?categoria=${open}&subcategoria=${sub.slug}`}
                  className="nav-underline flex min-h-9 items-baseline justify-between gap-2 px-1.5 text-metadata transition-colors duration-quick hover:text-action"
                >
                  <span
                    className={
                      sub.total > 0 ? "text-text-secondary" : "text-text-muted"
                    }
                  >
                    {sub.label}
                  </span>
                  <span
                    className={`text-caption tabular ${
                      sub.total > 0
                        ? "font-semibold text-text-primary"
                        : "text-text-muted"
                    }`}
                  >
                    {sub.total}
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
