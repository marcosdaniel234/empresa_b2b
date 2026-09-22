import Link from "next/link";
import { Clock, Gavel, MapPin } from "lucide-react";
import {
  Asset,
  CATEGORY_SHORT,
  getCompanyBySlug,
  getSubcategoryLabel,
} from "@/lib/data";
import { formatCurrencyCard } from "@/lib/format";
import { DeadlineLabel } from "@/components/auction/CountdownClock";
import { StatusChip } from "@/components/ui/StatusChip";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FavoriteButton } from "./FavoriteButton";
import { CompareToggle } from "./CompareToggle";
import { BidMovement } from "./BidMovement";

const CLOSED: Asset["status"][] = [
  "encerrado_vencedor",
  "encerrado_sem_vencedor",
  "cancelado",
];

function priceLabel(asset: Asset) {
  if (asset.status === "encerrado_vencedor") return "Valor final";
  return asset.currentBid !== null ? "Lance atual" : "Lance inicial";
}

/** Duas especificações de maior peso, exibidas direto no card. */
function keySpecs(asset: Asset) {
  return asset.specs.slice(0, 2);
}

export function AssetCard({
  asset,
  variant = "grid",
}: {
  asset: Asset;
  /** `index` é aceito para compatibilidade com as listagens existentes. */
  index?: number;
  variant?: "grid" | "list";
}) {
  const company = getCompanyBySlug(asset.companySlug);
  const isClosed = CLOSED.includes(asset.status);
  const amount = asset.currentBid ?? asset.startingBid;
  const subcategory = getSubcategoryLabel(asset.category, asset.subcategory);

  const deadline = !isClosed && (
    <span className="inline-flex items-center gap-1.5 text-metadata text-text-secondary">
      <Clock size={13} aria-hidden="true" />
      {asset.status === "agendado" ? (
        "Início em breve"
      ) : (
        <DeadlineLabel deadlineIso={asset.deadlineIso} />
      )}
    </span>
  );

  if (variant === "list") {
    return (
      <article className="group relative flex gap-3 border-b border-border-subtle bg-white p-3 transition-colors duration-quick last:border-b-0 hover:bg-surface-subtle">
        <div className="relative w-24 shrink-0 sm:w-40">
          <ImageSlot size="sm" src={`/images/assets/${asset.slug}.png`} className="w-full" />
          <StatusChip status={asset.status} className="absolute left-1 top-1" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:gap-5">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="lot-tag">{asset.lot}</span>
              <span className="text-micro uppercase tracking-[.07em] text-text-muted">
                {CATEGORY_SHORT[asset.category]}
                {subcategory ? ` · ${subcategory}` : ""}
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
            <dl className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
              {keySpecs(asset).map((spec) => (
                <div key={spec.label} className="flex gap-1 text-caption">
                  <dt className="text-text-muted">{spec.label}:</dt>
                  <dd className="text-text-secondary">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-metadata text-text-secondary">
              {company && <span className="truncate">{company.name}</span>}
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} aria-hidden="true" />
                {asset.city} · {asset.state}
              </span>
              {deadline}
            </p>
            <CompareToggle
              slug={asset.slug}
              title={asset.title}
              className="mt-0.5"
            />
          </div>

          <div className="flex shrink-0 items-end justify-between gap-3 sm:w-40 sm:flex-col sm:items-end sm:justify-center">
            <div className="sm:text-right">
              <span className="block text-caption text-text-muted">
                {priceLabel(asset)}
              </span>
              <span className="text-[17px] font-bold leading-6 text-text-primary tabular">
                {formatCurrencyCard(amount)}
              </span>
              <BidMovement
                startingBid={asset.startingBid}
                currentBid={asset.currentBid}
                className="mt-0.5 sm:justify-end"
              />
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
    <article className="card-lift group relative flex flex-col border border-border-subtle bg-white">
      <div className="relative">
        <ImageSlot
          src={`/images/assets/${asset.slug}.png`}
          ratio="aspect-[16/10]"
          className="w-full border-0 border-b border-border-subtle"
        />
        <StatusChip status={asset.status} className="absolute left-2 top-2" />
        <FavoriteButton
          slug={asset.slug}
          title={asset.title}
          className="absolute right-2 top-2"
        />
      </div>

      <div className="flex flex-1 flex-col p-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="lot-tag">{asset.lot}</span>
          <span className="truncate text-micro uppercase tracking-[.07em] text-text-muted">
            {CATEGORY_SHORT[asset.category]}
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

        <dl className="mt-1.5 border-t border-border-subtle pt-1.5">
          {keySpecs(asset).map((spec) => (
            <div
              key={spec.label}
              className="flex items-baseline justify-between gap-2 text-caption"
            >
              <dt className="truncate text-text-muted">{spec.label}</dt>
              <dd className="shrink-0 text-text-secondary">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-1.5 flex items-center gap-1 truncate text-metadata text-text-secondary">
          <MapPin size={13} className="shrink-0" aria-hidden="true" />
          {asset.city} · {asset.state}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-border-subtle pt-2">
          <div>
            <span className="block text-caption text-text-muted">
              {priceLabel(asset)}
            </span>
            <span className="text-[17px] font-bold leading-6 text-text-primary tabular">
              {formatCurrencyCard(amount)}
            </span>
            <BidMovement
              startingBid={asset.startingBid}
              currentBid={asset.currentBid}
              className="mt-0.5"
            />
          </div>
          <div className="pb-0.5 text-right">
            {deadline}
            {asset.bidCount > 0 && (
              <span className="mt-0.5 flex items-center justify-end gap-1 text-caption text-text-muted">
                <Gavel size={12} aria-hidden="true" />
                {asset.bidCount}
              </span>
            )}
          </div>
        </div>

        <CompareToggle slug={asset.slug} title={asset.title} className="mt-1.5" />
      </div>
    </article>
  );
}
