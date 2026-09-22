import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  ASSETS,
  CATEGORY_LABELS,
  CATEGORY_SHORT,
  Category,
  SUBCATEGORIES,
} from "@/lib/data";
import { ImageSlot } from "@/components/ui/ImageSlot";

const CATEGORIES = Object.keys(CATEGORY_SHORT) as Category[];

function lotsIn(category: Category) {
  return ASSETS.filter(
    (a) => a.status !== "cancelado" && a.category === category,
  ).length;
}

/** Categorias em destaque: cartão de imagem com nome e contagem de lotes. */
export function CategoryGrid() {
  return (
    <section
      aria-labelledby="titulo-categorias"
      className="container-content pb-8 lg:pb-10"
    >
      <div className="section-heading">
        <h2 id="titulo-categorias" className="section-title">
          Categorias em destaque
        </h2>
        <Link href="/resultados" className="text-link">
          Ver todas as categorias <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CATEGORIES.map((category) => {
          const total = lotsIn(category);
          return (
            <Link
              key={category}
              href={`/resultados?categoria=${category}`}
              className="card-lift group overflow-hidden rounded-card border border-border-subtle bg-white"
              aria-label={`${CATEGORY_LABELS[category]}, ${total} lotes`}
            >
              <ImageSlot
                ratio="aspect-[4/3]"
                className="w-full rounded-none border-0"
              />
              <span className="flex items-end justify-between gap-2 p-3">
                <span className="min-w-0">
                  <span className="block truncate text-label font-bold text-text-primary group-hover:text-action">
                    {CATEGORY_SHORT[category]}
                  </span>
                  <span className="mt-0.5 block text-caption text-text-muted tabular">
                    {total} {total === 1 ? "lote" : "lotes"} ·{" "}
                    {SUBCATEGORIES[category].length} subcategorias
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-subtle text-action transition-colors duration-standard ease-standard group-hover:border-action group-hover:bg-action group-hover:text-white"
                >
                  <ArrowRight size={14} />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
