import Link from "next/link";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Asset, CATEGORY_LABELS, getCompanyBySlug } from "@/lib/data";
import { formatCurrencyCard } from "@/lib/format";
import { DeadlineLabel } from "@/components/auction/CountdownClock";
import { StatusChip } from "@/components/ui/StatusChip";
import { AssetVisual } from "@/components/ui/AssetVisual";
import { FavoriteButton } from "./FavoriteButton";

export function AssetCard({
  asset,
  index = 0,
}: {
  asset: Asset;
  index?: number;
}) {
  const company = getCompanyBySlug(asset.companySlug);
  const hasBid = asset.currentBid !== null;
  const isClosed = [
    "encerrado_vencedor",
    "encerrado_sem_vencedor",
    "cancelado",
  ].includes(asset.status);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-border-subtle bg-surface-card shadow-card transition-shadow duration-quick hover:shadow-elevated">
      <div className="relative">
        <AssetVisual
          category={asset.category}
          index={index}
          iconSize={48}
          rounded=""
          className="aspect-[4/3] w-full border-b border-border-subtle"
        />
        <StatusChip status={asset.status} className="absolute left-3 top-3" />
        <FavoriteButton
          slug={asset.slug}
          title={asset.title}
          className="absolute right-3 top-3"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-caption font-medium uppercase tracking-wide text-text-secondary">
          {CATEGORY_LABELS[asset.category]}
        </span>
        <h3 className="text-[17px] font-semibold leading-6 text-text-primary">
          <Link
            href={`/leilao/${asset.slug}`}
            className="hover:text-action hover:underline underline-offset-4"
          >
            {asset.title}
          </Link>
        </h3>
        {company && (
          <p className="text-metadata text-text-secondary">{company.name}</p>
        )}
        <p className="flex items-center gap-1 text-metadata text-text-secondary">
          <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          {asset.city} · {asset.state}
        </p>

        <div className="mt-3 flex items-end justify-between gap-2 border-t border-border-subtle pt-3">
          <div>
            <span className="block text-caption text-text-secondary">
              {asset.status === "encerrado_vencedor"
                ? "Valor final do exemplo"
                : hasBid
                  ? "Lance atual"
                  : "Lance inicial"}
            </span>
            <span className="text-title-card font-bold text-text-primary tabular">
              {formatCurrencyCard(
                hasBid ? (asset.currentBid as number) : asset.startingBid,
              )}
            </span>
          </div>
          {!isClosed && (
            <span className="flex items-center gap-1 text-caption text-text-secondary">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {asset.status === "agendado" ? (
                "Em breve"
              ) : (
                <DeadlineLabel deadlineIso={asset.deadlineIso} />
              )}
            </span>
          )}
        </div>

        <Link
          href={`/leilao/${asset.slug}`}
          aria-label={`Ver detalhes de ${asset.title}`}
          className="relative z-10 mt-3 inline-flex min-h-11 items-center justify-center rounded-control border border-action text-label font-medium text-action transition-colors duration-quick hover:bg-surface-subtle"
        >
          Ver detalhes{" "}
          <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

