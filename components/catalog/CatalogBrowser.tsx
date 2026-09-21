"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, List, SearchX, X } from "lucide-react";
import { AssetCard } from "@/components/catalog/AssetCard";
import { FiltersForm } from "@/components/catalog/FiltersForm";
import { MobileFilterSheet } from "@/components/catalog/MobileFilterSheet";
import { SortSelect } from "@/components/catalog/SortSelect";
import { EmptyState } from "@/components/ui/EmptyState";
import { CATEGORY_LABELS } from "@/lib/data";
import {
  applyFilters,
  countActiveFilters,
  filtersToQueryString,
  parseFilters,
} from "@/lib/filters";

const STATUS_LABELS: Record<string, string> = {
  aberto: "Leilão aberto",
  encerrando: "Encerra em até 24h",
  agendado: "Agendado",
  encerrado: "Encerrado",
};

/**
 * O catálogo lê os filtros da própria URL no navegador. Isso mantém os links
 * filtráveis funcionando também na exportação estática, onde `searchParams`
 * não chega ao servidor.
 */
export function CatalogBrowser() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");

  const filters = useMemo(
    () => parseFilters(Object.fromEntries(searchParams.entries())),
    [searchParams],
  );
  const results = useMemo(() => applyFilters(filters), [filters]);
  const activeCount = countActiveFilters(filters);
  const queryKey = filtersToQueryString(filters);

  const chipLink = (next: Parameters<typeof filtersToQueryString>[0]) => {
    const qs = filtersToQueryString(next);
    return `/resultados${qs ? `?${qs}` : ""}`;
  };

  const chips = [
    ...(filters.q
      ? [
          {
            label: `Busca: ${filters.q}`,
            href: chipLink({ ...filters, q: "" }),
          },
        ]
      : []),
    ...filters.categorias.map((c) => ({
      label: CATEGORY_LABELS[c],
      href: chipLink({
        ...filters,
        categorias: filters.categorias.filter((x) => x !== c),
      }),
    })),
    ...(filters.uf
      ? [{ label: `Estado: ${filters.uf}`, href: chipLink({ ...filters, uf: "" }) }]
      : []),
    ...(filters.cidade
      ? [
          {
            label: `Cidade: ${filters.cidade}`,
            href: chipLink({ ...filters, cidade: "" }),
          },
        ]
      : []),
    ...(filters.valorMin || filters.valorMax
      ? [
          {
            label: `Valor: R$ ${filters.valorMin || "0"} até ${
              filters.valorMax ? `R$ ${filters.valorMax}` : "sem limite"
            }`,
            href: chipLink({ ...filters, valorMin: "", valorMax: "" }),
          },
        ]
      : []),
    ...filters.status.map((s) => ({
      label: STATUS_LABELS[s] ?? s,
      href: chipLink({
        ...filters,
        status: filters.status.filter((x) => x !== s),
      }),
    })),
  ];

  return (
    <div className="container-content py-5 md:py-6">
      <nav aria-label="Trilha de navegação" className="text-caption text-text-secondary">
        <Link href="/" className="hover:text-action hover:underline">
          Início
        </Link>
        <span aria-hidden="true"> / </span>
        <span>Catálogo</span>
      </nav>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-title-page-mobile text-text-primary md:text-title-page">
            {filters.q ? `Busca: “${filters.q}”` : "Catálogo de ativos"}
          </h1>
          <p role="status" className="mt-1 text-metadata text-text-secondary">
            <strong className="font-semibold text-text-primary tabular">
              {results.length}
            </strong>{" "}
            {results.length === 1 ? "lote encontrado" : "lotes encontrados"}
            {activeCount > 0 &&
              ` · ${activeCount} ${activeCount === 1 ? "filtro ativo" : "filtros ativos"}`}
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div
            role="group"
            aria-label="Formato de exibição"
            className="flex rounded-control border border-border-strong bg-white p-0.5"
          >
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-[4px] ${
                view === "grid"
                  ? "bg-surface-raised text-action"
                  : "text-text-secondary hover:text-action"
              }`}
            >
              <LayoutGrid size={18} aria-hidden="true" />
              <span className="sr-only">Ver em grade</span>
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-[4px] ${
                view === "list"
                  ? "bg-surface-raised text-action"
                  : "text-text-secondary hover:text-action"
              }`}
            >
              <List size={18} aria-hidden="true" />
              <span className="sr-only">Ver em lista</span>
            </button>
          </div>
          <SortSelect current={filters.sort} />
        </div>
      </div>

      {chips.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li key={chip.label}>
              <Link
                href={chip.href}
                aria-label={`Remover filtro ${chip.label}`}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-surface-raised px-3.5 text-metadata text-text-primary transition-colors duration-quick hover:bg-border-subtle"
              >
                {chip.label}
                <X size={13} aria-hidden="true" />
              </Link>
            </li>
          ))}
          {chips.length > 1 && (
            <li>
              <Link
                href="/resultados"
                className="inline-flex min-h-9 items-center text-metadata font-semibold text-action hover:underline"
              >
                Limpar tudo
              </Link>
            </li>
          )}
        </ul>
      )}

      <div className="mt-3 flex gap-2 md:hidden">
        <MobileFilterSheet
          key={queryKey}
          initial={filters}
          activeCount={activeCount}
        />
        <div className="flex-1">
          <SortSelect current={filters.sort} />
        </div>
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-[236px_minmax(0,1fr)] lg:gap-8">
        <aside className="hidden md:block">
          <div className="sticky top-[132px]">
            <FiltersForm key={queryKey} initial={filters} />
          </div>
        </aside>

        <div className="min-w-0">
          {results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="Nenhum lote corresponde aos filtros."
              description="Remova um filtro ou amplie a faixa de valor para ver mais lotes do catálogo."
              action={
                <Link href="/resultados" className="secondary-link mt-1">
                  Limpar filtros
                </Link>
              }
            />
          ) : view === "list" ? (
            <div className="overflow-hidden rounded-card border border-border-subtle bg-white">
              {results.map((asset, i) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  index={i}
                  variant="list"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {results.map((asset, i) => (
                <AssetCard key={asset.id} asset={asset} index={i} />
              ))}
            </div>
          )}

          <p className="mt-6 text-caption text-text-secondary">
            Catálogo de demonstração. As imagens são ilustrações de categoria,
            não fotografias dos ativos.
          </p>
        </div>
      </div>
    </div>
  );
}
