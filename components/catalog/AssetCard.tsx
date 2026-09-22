import Link from "next/link";
import { Clock, Gavel, MapPin } from "lucide-react";
import { Asset, CATEGORY_SHORT, getCompanyBySlug } from "@/lib/data";
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
  const specs = asset.specs.slice(0, 3);
  const foto = `/images/assets/${asset.slug}.png`;

  const deadline = !isClosed && (
    <span className="inline-flex items-center gap-1.5 text-metadata font-semibold text-text-secondary">
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
          <ImageSlot size="sm" src={foto} className="w-full" />
          <StatusChip status={asset.status} className="absolute left-1 top-1" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:gap-5">
          <div className="min-w-0 flex-1">
            <p className="text-caption font-bold uppercase tracking-[.06em] text-text-muted">
              Lote {asset.lot} · {CATEGORY_SHORT[asset.category]}
            </p>
            <h3 className="mt-1 text-title-card font-bold text-text-primary">
              <Link
                href={`/leilao/${asset.slug}`}
                className="after:absolute after:inset-0 after:content-[''] hover:text-action"
              >
                {asset.title}
              </Link>
            </h3>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {specs.map((spec) => (
                <li key={spec.label} className="spec-pill">
                  {spec.value}
                </li>
              ))}
            </ul>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-metadata text-text-secondary">
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} aria-hidden="true" className="text-action" />
                {asset.state} – {asset.city}
              </span>
              {company && <span className="truncate">{company.name}</span>}
              {deadline}
            </p>
            <CompareToggle
              slug={asset.slug}
              title={asset.title}
              className="mt-1"
            />
          </div>

          <div className="flex shrink-0 items-end justify-between gap-3 sm:w-44 sm:flex-col sm:items-end sm:justify-center">
            <div className="sm:text-right">
              <span className="block text-caption text-text-muted">
                {priceLabel(asset)}
              </span>
              <span className="text-[19px] font-extrabold leading-7 text-action tabular">
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
              className="shrink-0"
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="fx-card card-lift group relative flex h-full flex-col overflow-hidden rounded-card border">
      <div className="relative">
        <ImageSlot
          ratio="aspect-[4/3]"
          src={foto}
          className="w-full rounded-none border-0"
        />
        <StatusChip status={asset.status} className="absolute left-3 top-3" />
        <FavoriteButton
          slug={asset.slug}
          title={asset.title}
          className="absolute right-3 top-3 z-10"
        />
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <p className="text-caption font-bold uppercase tracking-[.06em] text-text-muted">
          Lote {asset.lot}
        </p>

        <h3 className="mt-1 text-title-card font-bold leading-6 text-text-primary">
          <Link
            href={`/leilao/${asset.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-action"
          >
            {asset.title}
          </Link>
        </h3>

        <p className="mt-1.5 flex items-center gap-1 truncate text-metadata text-text-secondary">
          <MapPin size={13} className="shrink-0 text-action" aria-hidden="true" />
          {asset.state} – {asset.city}
        </p>

        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {specs.map((spec) => (
            <li key={spec.label} className="spec-pill">
              {spec.value}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-border-subtle pt-3">
          <div className="min-w-0">
            <span className="block text-caption text-text-muted">
              {priceLabel(asset)}
            </span>
            <span className="text-[19px] font-extrabold leading-7 text-action tabular">
              {formatCurrencyCard(amount)}
            </span>
            <BidMovement
              startingBid={asset.startingBid}
              currentBid={asset.currentBid}
              className="mt-0.5"
            />
          </div>
          <div className="shrink-0 pb-1 text-right">
            {deadline}
            {asset.bidCount > 0 && (
              <span className="mt-0.5 flex items-center justify-end gap-1 text-caption text-text-muted">
                <Gavel size={12} aria-hidden="true" />
                {asset.bidCount}
              </span>
            )}
          </div>
        </div>

        <CompareToggle slug={asset.slug} title={asset.title} className="mt-2" />
      </div>
    </article>
  );
}
