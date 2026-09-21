import Link from "next/link";
import { SearchX, X } from "lucide-react";
import { AssetCard } from "@/components/catalog/AssetCard";
import { FiltersForm } from "@/components/catalog/FiltersForm";
import { MobileFilterSheet } from "@/components/catalog/MobileFilterSheet";
import { SortSelect } from "@/components/catalog/SortSelect";
import { EmptyState } from "@/components/ui/EmptyState";
import { CATEGORY_LABELS } from "@/lib/data";
import { applyFilters, countActiveFilters, filtersToQueryString, parseFilters } from "@/lib/filters";

export const metadata = { title: "Resultados" };

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ResultadosPage({ searchParams }: PageProps) {
  const filters = parseFilters(await searchParams);
  const results = applyFilters(filters);
  const activeCount = countActiveFilters(filters);

  const chips: { label: string; href: string }[] = [
    ...filters.categorias.map((c) => ({
      label: CATEGORY_LABELS[c],
      href: `/resultados?${filtersToQueryString({ ...filters, categorias: filters.categorias.filter((x) => x !== c) })}`,
    })),
    ...(filters.uf
      ? [{ label: `Estado: ${filters.uf}`, href: `/resultados?${filtersToQueryString({ ...filters, uf: "" })}` }]
      : []),
    ...(filters.cidade
      ? [{ label: `Cidade: ${filters.cidade}`, href: `/resultados?${filtersToQueryString({ ...filters, cidade: "" })}` }]
      : []),
    ...(filters.valorMin || filters.valorMax
      ? [
          {
            label: `Valor: R$ ${filters.valorMin || "0"} – ${filters.valorMax || "∞"}`,
            href: `/resultados?${filtersToQueryString({ ...filters, valorMin: "", valorMax: "" })}`,
          },
        ]
      : []),
    ...filters.status.map((s) => ({
      label: s === "aberto" ? "Leilão aberto" : s === "encerrando" ? "Encerrando em breve" : s === "agendado" ? "Agendado" : "Encerrado",
      href: `/resultados?${filtersToQueryString({ ...filters, status: filters.status.filter((x) => x !== s) })}`,
    })),
  ];

  return (
    <div className="container-content py-8 md:py-10">
      <nav aria-label="Breadcrumb" className="text-caption text-text-secondary">
        <Link href="/" className="hover:text-action">
          Início
        </Link>{" "}
        / Resultados
      </nav>

      <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-title-page-mobile text-text-primary md:text-title-page">
            {filters.q ? `Resultados para "${filters.q}"` : "Todos os ativos"}
          </h1>
          <p className="mt-1 text-metadata text-text-secondary">
            {results.length} {results.length === 1 ? "ativo encontrado" : "ativos encontrados"}
          </p>
        </div>
        <div className="hidden sm:block">
          <SortSelect current={filters.sort} />
        </div>
      </div>

      {chips.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li key={chip.label}>
              <Link
                href={chip.href}
                className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-3 py-1.5 text-caption text-text-primary hover:bg-border-subtle"
              >
                {chip.label}
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex gap-2 sm:hidden">
        <MobileFilterSheet initial={filters} activeCount={activeCount} />
        <div className="flex-1">
          <SortSelect current={filters.sort} />
        </div>
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">
          <FiltersForm initial={filters} />
        </aside>

        <div>
          {results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="Nenhum ativo corresponde aos filtros."
              description="Limpe alguns filtros para ampliar a busca."
              action={
                <Link
                  href="/resultados"
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-control border border-action px-4 text-label font-medium text-action hover:bg-surface-subtle"
                >
                  Limpar filtros
                </Link>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((asset, i) => (
                <AssetCard key={asset.id} asset={asset} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
