"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Rows3,
  SearchX,
  X,
} from "lucide-react";
import { AssetCard } from "@/components/catalog/AssetCard";
import { FiltersForm } from "@/components/catalog/FiltersForm";
import { MobileFilterSheet } from "@/components/catalog/MobileFilterSheet";
import { SortSelect } from "@/components/catalog/SortSelect";
import { LotTable } from "@/components/catalog/LotTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  CATEGORY_SHORT,
  Category,
  MODALIDADE_LABELS,
  getSubcategoryLabel,
} from "@/lib/data";
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

const PER_PAGE = 12;
type View = "grid" | "list" | "table";

const VIEWS: { key: View; label: string; icon: typeof LayoutGrid }[] = [
  { key: "grid", label: "Ver em grade", icon: LayoutGrid },
  { key: "list", label: "Ver em lista", icon: List },
  { key: "table", label: "Ver em tabela", icon: Rows3 },
];

export function CatalogBrowser() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<View>("grid");
  const [page, setPage] = useState(1);

  const filters = useMemo(
    () => parseFilters(Object.fromEntries(searchParams.entries())),
    [searchParams],
  );
  const results = useMemo(() => applyFilters(filters), [filters]);
  const activeCount = countActiveFilters(filters);
  const queryKey = filtersToQueryString(filters);

  // Uma mudança de filtro volta para a primeira página.
  const [lastQuery, setLastQuery] = useState(queryKey);
  if (lastQuery !== queryKey) {
    setLastQuery(queryKey);
    setPage(1);
  }

  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = results.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const chipLink = (next: Parameters<typeof filtersToQueryString>[0]) => {
    const qs = filtersToQueryString(next);
    return `/resultados${qs ? `?${qs}` : ""}`;
  };

  const chips = [
    ...(filters.q
      ? [{ label: `Busca: ${filters.q}`, href: chipLink({ ...filters, q: "" }) }]
      : []),
    ...(filters.modalidade
      ? [
          {
            label: MODALIDADE_LABELS[filters.modalidade],
            href: chipLink({ ...filters, modalidade: "" }),
          },
        ]
      : []),
    ...filters.categorias.map((c) => ({
      label: CATEGORY_SHORT[c],
      href: chipLink({
        ...filters,
        categorias: filters.categorias.filter((x) => x !== c),
      }),
    })),
    ...filters.subcategorias.map((s) => ({
      label:
        filters.categorias
          .map((c) => getSubcategoryLabel(c, s))
          .find(Boolean) ??
        (Object.keys(CATEGORY_SHORT) as Category[])
          .map((c) => getSubcategoryLabel(c, s))
          .find(Boolean) ??
        s,
      href: chipLink({
        ...filters,
        subcategorias: filters.subcategorias.filter((x) => x !== s),
      }),
    })),
    ...(filters.uf
      ? [
          {
            label: `Estado: ${filters.uf}`,
            href: chipLink({ ...filters, uf: "" }),
          },
        ]
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
    <div className="container-content py-4">
      <nav
        aria-label="Trilha de navegação"
        className="text-caption text-text-muted"
      >
        <Link href="/" className="hover:text-action hover:underline">
          Início
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-text-secondary">Catálogo</span>
      </nav>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-3 border-b border-border-subtle pb-4">
        <div className="min-w-0">
          <h1 className="text-[28px] font-extrabold leading-[1.08] tracking-[-.03em] text-text-primary sm:text-[36px]">
            {filters.q ? `Busca: “${filters.q}”` : "Catálogo de lotes"}
          </h1>
          <p role="status" className="mt-1.5 text-[15px] text-text-secondary">
            <strong className="font-bold text-text-primary tabular">
              {results.length}
            </strong>{" "}
            {results.length === 1 ? "lote" : "lotes"}
            {activeCount > 0 &&
              ` · ${activeCount} ${activeCount === 1 ? "filtro" : "filtros"}`}
            {pages > 1 && ` · página ${current} de ${pages}`}
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div
            role="group"
            aria-label="Formato de exibição"
            className="flex rounded-control border border-border-strong bg-white"
          >
            {VIEWS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                aria-pressed={view === key}
                className={`inline-flex h-9 w-9 items-center justify-center border-r border-border-subtle last:border-r-0 ${
                  view === key
                    ? "bg-action text-white"
                    : "text-text-muted hover:text-action"
                }`}
              >
                <Icon size={16} aria-hidden="true" />
                <span className="sr-only">{label}</span>
              </button>
            ))}
          </div>
          <SortSelect current={filters.sort} />
        </div>
      </div>

      {chips.length > 0 && (
        <ul className="mt-2 flex flex-wrap items-center gap-1.5">
          {chips.map((chip) => (
            <li key={chip.label}>
              <Link
                href={chip.href}
                aria-label={`Remover filtro ${chip.label}`}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-control border border-border-subtle bg-surface-subtle px-2.5 text-caption text-text-primary transition-colors duration-quick hover:border-action hover:text-action"
              >
                {chip.label}
                <X size={12} aria-hidden="true" />
              </Link>
            </li>
          ))}
          {chips.length > 1 && (
            <li>
              <Link
                href="/resultados"
                className="inline-flex min-h-9 items-center px-1 text-caption font-semibold text-action hover:underline"
              >
                Limpar tudo
              </Link>
            </li>
          )}
        </ul>
      )}

      <div className="mt-2 flex gap-2 md:hidden">
        <MobileFilterSheet
          key={queryKey}
          initial={filters}
          activeCount={activeCount}
        />
        <div className="flex-1">
          <SortSelect current={filters.sort} />
        </div>
      </div>

      <div className="mt-3 grid gap-4 md:grid-cols-[232px_minmax(0,1fr)] lg:gap-6">
        <aside className="hidden md:block">
          <div className="sticky top-[140px] flex flex-col gap-4">
            <FiltersForm key={queryKey} initial={filters} />
            <AdSlot format="skyscraper" slotId="catalogo-lateral" />
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
          ) : view === "table" ? (
            <LotTable assets={visible} />
          ) : view === "list" ? (
            <div className="border border-border-subtle bg-white">
              {visible.map((asset) => (
                <AssetCard key={asset.id} asset={asset} variant="list" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {visible.flatMap((asset, i) => {
                const card = <AssetCard key={asset.id} asset={asset} />;
                if (i === 0 || i % 8 !== 0) return [card];
                return [
                  <div key={`ad-${asset.id}`} className="col-span-full">
                    <AdSlot format="infeed" slotId={`catalogo-feed-${i}`} />
                  </div>,
                  card,
                ];
              })}
            </div>
          )}

          {pages > 1 && (
            <nav
              aria-label="Paginação"
              className="mt-4 flex items-center justify-center gap-1"
            >
              <button
                type="button"
                onClick={() => setPage(current - 1)}
                disabled={current === 1}
                className="inline-flex h-9 items-center gap-1 rounded-control border border-border-strong bg-white px-2.5 text-caption font-semibold text-text-primary disabled:opacity-40"
              >
                <ChevronLeft size={15} aria-hidden="true" />
                Anterior
              </button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  aria-current={n === current ? "page" : undefined}
                  className={`h-9 w-9 rounded-control border text-caption font-semibold tabular ${
                    n === current
                      ? "border-action bg-action text-white"
                      : "border-border-strong bg-white text-text-primary hover:border-action hover:text-action"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage(current + 1)}
                disabled={current === pages}
                className="inline-flex h-9 items-center gap-1 rounded-control border border-border-strong bg-white px-2.5 text-caption font-semibold text-text-primary disabled:opacity-40"
              >
                Próxima
                <ChevronRight size={15} aria-hidden="true" />
              </button>
            </nav>
          )}

          <p className="mt-4 text-caption text-text-muted">
            Catálogo de demonstração. Os espaços de imagem ficam reservados até
            que as fotografias dos lotes sejam publicadas.
          </p>
        </div>
      </div>
    </div>
  );
}
