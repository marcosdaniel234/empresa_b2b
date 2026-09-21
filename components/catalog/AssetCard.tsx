import Link from "next/link";
import { MapPin, Clock, Gavel } from "lucide-react";
import { Asset, CATEGORY_LABELS, getCompanyBySlug } from "@/lib/data";
import { formatCurrencyCard } from "@/lib/format";
import { DeadlineLabel } from "@/components/auction/CountdownClock";
import { StatusChip } from "@/components/ui/StatusChip";
import { AssetVisual } from "@/components/ui/AssetVisual";
import { FavoriteButton } from "./FavoriteButton";

const CLOSED: Asset["status"][] = [
  "encerrado_vencedor",
  "encerrado_sem_vencedor",
  "cancelado",
];

function priceLabel(asset: Asset) {
  if (asset.status === "encerrado_vencedor") return "Valor final do exemplo";
  return asset.currentBid !== null ? "Lance atual" : "Lance inicial";
}

/**
 * Card de catálogo industrial. A variante `grid` prioriza o visual do lote;
 * a variante `list` mostra a mesma informação em uma linha comparável.
 */
export function AssetCard({
  asset,
  index = 0,
  variant = "grid",
}: {
  asset: Asset;
  index?: number;
  variant?: "grid" | "list";
}) {
  const company = getCompanyBySlug(asset.companySlug);
  const isClosed = CLOSED.includes(asset.status);
  const amount = asset.currentBid ?? asset.startingBid;

  const deadline = !isClosed && (
    <span className="inline-flex items-center gap-1.5 text-metadata text-text-secondary">
      <Clock size={14} aria-hidden="true" />
      {asset.status === "agendado" ? (
        "Início em breve"
      ) : (
        <DeadlineLabel deadlineIso={asset.deadlineIso} />
      )}
    </span>
  );

  const bids = asset.bidCount > 0 && (
    <span className="inline-flex items-center gap-1.5 text-metadata text-text-secondary">
      <Gavel size={14} aria-hidden="true" />
      {asset.bidCount} {asset.bidCount === 1 ? "lance" : "lances"}
    </span>
  );

  if (variant === "list") {
    return (
      <article className="group relative flex gap-4 border-b border-border-subtle bg-white p-3 transition-colors duration-quick last:border-b-0 hover:bg-surface-subtle sm:p-4">
        <div className="relative w-28 shrink-0 sm:w-44">
          <AssetVisual
            category={asset.category}
            index={index}
            rounded="rounded-[4px]"
            showLabel={false}
            className="aspect-[4/3] w-full border border-border-subtle"
          />
          <StatusChip status={asset.status} className="absolute left-1 top-1" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="lot-tag">{asset.lot}</span>
              <span className="text-micro font-semibold uppercase tracking-[.09em] text-text-secondary">
                {CATEGORY_LABELS[asset.category]}
              </span>
            </div>
            <h3 className="mt-1 text-title-card text-text-primary">
              <Link
                href={`/leilao/${asset.slug}`}
                className="after:absolute after:inset-0 after:content-[''] hover:text-action hover:underline"
              >
                {asset.title}
              </Link>
            </h3>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-metadata text-text-secondary">
              {company && <span className="truncate">{company.name}</span>}
              <span className="inline-flex items-center gap-1">
                <MapPin size={14} aria-hidden="true" />
                {asset.city} · {asset.state}
              </span>
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              {deadline}
              {bids}
            </p>
          </div>

          <div className="flex shrink-0 items-end justify-between gap-3 sm:w-44 sm:flex-col sm:items-end sm:justify-center">
            <div className="sm:text-right">
              <span className="block text-caption text-text-secondary">
                {priceLabel(asset)}
              </span>
              <span className="text-[19px] font-bold leading-6 text-text-primary tabular">
                {formatCurrencyCard(amount)}
              </span>
            </div>
            <FavoriteButton
              slug={asset.slug}
              title={asset.title}
              className="relative shrink-0"
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-border-subtle bg-white transition-colors duration-quick hover:border-border-control">
      <div className="relative border-b border-border-subtle">
        <AssetVisual
          category={asset.category}
          index={index}
          rounded=""
          showLabel={false}
          className="aspect-[4/3] w-full"
        />
        <StatusChip status={asset.status} className="absolute left-2 top-2" />
        <FavoriteButton
          slug={asset.slug}
          title={asset.title}
          className="absolute right-2 top-2"
        />
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="lot-tag">{asset.lot}</span>
          <span className="text-micro font-semibold uppercase tracking-[.09em] text-text-secondary">
            {CATEGORY_LABELS[asset.category]}
          </span>
        </div>

        <h3 className="mt-1.5 text-title-card text-text-primary">
          <Link
            href={`/leilao/${asset.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-action hover:underline"
          >
            {asset.title}
          </Link>
        </h3>

        <p className="mt-1 truncate text-metadata text-text-secondary">
          {company?.name}
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-metadata text-text-secondary">
          <MapPin size={14} className="shrink-0" aria-hidden="true" />
          {asset.city} · {asset.state}
        </p>

        <div className="mt-3 flex items-end justify-between gap-2 border-t border-border-subtle pt-2.5">
          <div>
            <span className="block text-caption text-text-secondary">
              {priceLabel(asset)}
            </span>
            <span className="text-[19px] font-bold leading-6 text-text-primary tabular">
              {formatCurrencyCard(amount)}
            </span>
          </div>
          <div className="pb-0.5 text-right">{deadline}</div>
        </div>
      </div>
    </article>
  );
}
