"use client";

import Link from "next/link";
import { Scale, X } from "lucide-react";
import {
  ASSETS,
  CATEGORY_SHORT,
  getCompanyBySlug,
  getSubcategoryLabel,
} from "@/lib/data";
import { formatCurrencyFull, formatDateTimeWithZone } from "@/lib/format";
import {
  MAX_COMPARE,
  removeFromCompare,
  useCompareList,
} from "@/components/catalog/CompareToggle";
import { BidMovement } from "@/components/catalog/BidMovement";
import { StatusChip } from "@/components/ui/StatusChip";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { EmptyState } from "@/components/ui/EmptyState";

export default function CompararPage() {
  const selected = useCompareList();
  const assets = selected
    .map((slug) => ASSETS.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => !!a);

  const specLabels = [
    ...new Set(assets.flatMap((asset) => asset.specs.map((s) => s.label))),
  ];

  const rows: { label: string; render: (asset: (typeof assets)[number]) => React.ReactNode }[] = [
    {
      label: "Categoria",
      render: (a) =>
        `${CATEGORY_SHORT[a.category]}${
          getSubcategoryLabel(a.category, a.subcategory)
            ? ` · ${getSubcategoryLabel(a.category, a.subcategory)}`
            : ""
        }`,
    },
    {
      label: "Vendedor",
      render: (a) => getCompanyBySlug(a.companySlug)?.name ?? "—",
    },
    { label: "Localização", render: (a) => `${a.city} · ${a.state}` },
    { label: "Situação", render: (a) => <StatusChip status={a.status} /> },
    {
      label: "Valor (lance atual, inicial ou final)",
      render: (a) => (
        <div>
          <span className="block text-caption font-normal text-text-muted">
            {a.status === "encerrado_vencedor"
              ? "Valor final"
              : a.currentBid !== null
                ? "Lance atual"
                : "Lance inicial"}
          </span>
          <span className="tabular">
            {formatCurrencyFull(a.currentBid ?? a.startingBid)}
          </span>
          <BidMovement
            startingBid={a.startingBid}
            currentBid={a.currentBid}
            className="mt-0.5"
          />
        </div>
      ),
    },
    {
      label: "Incremento mínimo",
      render: (a) => formatCurrencyFull(a.minIncrement),
    },
    { label: "Lances no exemplo", render: (a) => `${a.bidCount}` },
    {
      label: "Encerramento",
      render: (a) =>
        a.status === "agendado"
          ? `Início: ${formatDateTimeWithZone(a.startsAtIso ?? a.deadlineIso)}`
          : formatDateTimeWithZone(a.deadlineIso),
    },
    ...specLabels.map((label) => ({
      label,
      render: (a: (typeof assets)[number]) =>
        a.specs.find((s) => s.label === label)?.value ?? "—",
    })),
  ];

  return (
    <div className="container-content py-5 md:py-6">
      <nav aria-label="Trilha de navegação" className="text-caption text-text-secondary">
        <Link href="/" className="hover:text-action hover:underline">
          Início
        </Link>
        <span aria-hidden="true"> / </span>
        <span>Comparar lotes</span>
      </nav>

      <h1 className="mt-2 text-title-page-mobile text-text-primary md:text-title-page">
        Comparar lotes
      </h1>
      <p className="mt-1 max-w-2xl text-metadata text-text-secondary">
        Até {MAX_COMPARE} lotes lado a lado, selecionados pela caixa
        &quot;Comparar&quot; no catálogo. A seleção fica salva neste
        navegador.
      </p>

      <div className="mt-5">
        {assets.length === 0 ? (
          <EmptyState
            icon={Scale}
            title="Nenhum lote selecionado para comparar."
            description='Marque a caixa "Comparar" em até quatro lotes do catálogo para ver esta tabela.'
            action={
              <Link href="/resultados" className="secondary-link mt-1">
                Abrir o catálogo
              </Link>
            }
          />
        ) : (
          <div className="overflow-x-auto border border-border-subtle bg-white">
            <table className="spec-table min-w-[640px]">
              <thead>
                <tr>
                  <th scope="col" className="w-40 bg-white" />
                  {assets.map((asset) => (
                    <th
                      key={asset.id}
                      scope="col"
                      className="w-48 border-b-2 border-brand-900 bg-white align-top"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <ImageSlot
                          ratio="aspect-[4/3]"
                          size="sm"
                          className="w-16 shrink-0"
                        />
                        <button
                          type="button"
                          onClick={() => removeFromCompare(asset.slug)}
                          aria-label={`Remover ${asset.title} da comparação`}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-control text-text-muted hover:bg-surface-subtle hover:text-danger-text"
                        >
                          <X size={14} aria-hidden="true" />
                        </button>
                      </div>
                      <Link
                        href={`/leilao/${asset.slug}`}
                        className="mt-1.5 block text-label font-semibold normal-case tracking-normal text-text-primary hover:text-action hover:underline"
                      >
                        {asset.title}
                      </Link>
                      <span className="lot-tag mt-1 inline-flex normal-case">
                        {asset.lot}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {assets.map((asset) => (
                      <td key={asset.id}>{row.render(asset)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
