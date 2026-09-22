"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ASSETS, CATEGORY_LABELS, Category } from "@/lib/data";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

function lotsIn(category: Category) {
  return ASSETS.filter(
    (a) => a.status !== "cancelado" && a.category === category,
  ).length;
}

function Bar() {
  const pathname = usePathname();
  const params = useSearchParams();
  const atual = params.get("categoria");
  const noCatalogo = pathname.startsWith("/resultados");

  return (
    <nav
      aria-label="Categorias do catálogo"
      className="scroll-rail container-content items-center gap-1"
    >
      <Link
        href="/resultados"
        data-active={noCatalogo && !atual}
        className="nav-tab-dark"
      >
        Todos os lotes
      </Link>
      {CATEGORIES.map((category) => (
        <Link
          key={category}
          href={`/resultados?categoria=${category}`}
          data-active={atual === category}
          className="nav-tab-dark"
        >
          {CATEGORY_LABELS[category]}
          <span className="text-caption text-white/45 tabular">
            {lotsIn(category)}
          </span>
        </Link>
      ))}
    </nav>
  );
}

/**
 * Barra de categorias do cabeçalho, sobre o marinho. Só a partir de `lg` —
 * abaixo disso a navegação inteira mora no botão de menu.
 *
 * Lê a categoria da URL para marcar a aba corrente, e por isso precisa de um
 * limite de Suspense: na exportação estática `useSearchParams` só resolve no
 * navegador.
 */
export function CategoryNav() {
  return (
    <div className="hidden border-t border-white/10 bg-brand-800 lg:block">
      <Suspense
        fallback={<div className="container-content h-12" aria-hidden="true" />}
      >
        <Bar />
      </Suspense>
    </div>
  );
}
