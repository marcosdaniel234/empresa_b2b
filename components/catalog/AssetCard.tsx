import Link from "next/link";
import { ArrowRight, Info, MapPin, Timer } from "lucide-react";
import {
  Asset,
  CATEGORY_SHORT,
  MODALIDADE_LABELS,
  getCompanyBySlug,
  modalidadeOf,
} from "@/lib/data";
import { companyInitials, companyShortName, formatCurrencyCard } from "@/lib/format";
import { assetPhoto } from "@/lib/images";
import { CompactCountdown } from "@/components/auction/CountdownClock";
import { StatusChip } from "@/components/ui/StatusChip";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FavoriteButton } from "./FavoriteButton";
import { CompareToggle } from "./CompareToggle";
import { BidMovement } from "./BidMovement";

const OPEN: Asset["status"][] = ["aberto", "encerrando"];

/** Rótulos curtos para as colunas estreitas do cartão; a ficha mostra o nome completo. */
const ROTULO_CURTO: Record<string, string> = {
  "Ano de fabricação": "Ano",
  "Ano de aquisição": "Aquisição",
  "Horas de uso registradas": "Horas de uso",
  "Horas de operação": "Horas de uso",
  "Capacidade de carga": "Capacidade",
  "Altura de elevação": "Elevação",
  "Estado de conservação": "Conservação",
  "Quilometragem média": "Km médio",
  "Tipo de alimentação": "Alimentação",
  "Temperatura de operação": "Temperatura",
};

function priceLabel(asset: Asset) {
  if (modalidadeOf(asset) === "venda_direta") return "Preço";
  if (asset.status === "encerrado_vencedor") return "Valor final";
  return asset.currentBid !== null ? "Lance atual" : "Lance inicial";
}

/**
 * Selo sobre a foto. Lotes abertos mostram a modalidade (o que o comprador
 * precisa saber para agir); os demais mostram a situação.
 */
function ModalityBadge({ asset }: { asset: Asset }) {
  if (!OPEN.includes(asset.status)) return <StatusChip status={asset.status} />;
  const direta = modalidadeOf(asset) === "venda_direta";
  return (
    <span
      className={`status-pill text-white ${direta ? "bg-direct" : "bg-auction"}`}
    >
      {direta ? (
        <Info size={11} aria-hidden="true" />
      ) : (
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white" />
      )}
      {MODALIDADE_LABELS[modalidadeOf(asset)]}
    </span>
  );
}

export function AssetCard({
  asset,
  variant = "grid",
  priority = false,
}: {
  asset: Asset;
  /** `index` é aceito para compatibilidade com as listagens existentes. */
  index?: number;
  variant?: "grid" | "list";
  priority?: boolean;
}) {
  const company = getCompanyBySlug(asset.companySlug);
  const amount = asset.currentBid ?? asset.startingBid;
  const specs = asset.specs.slice(0, 3);
  const foto = assetPhoto(asset.slug);
  const direta = modalidadeOf(asset) === "venda_direta";
  const showClock = !direta && OPEN.includes(asset.status);

  if (variant === "list") {
    return (
      <article className="group relative flex gap-4 border-b border-border-subtle bg-surface-card p-3 transition-colors duration-quick last:border-b-0 hover:bg-surface-subtle">
        <div className="relative w-28 shrink-0 overflow-hidden rounded-[8px] sm:w-44">
          <ImageSlot size="sm" src={foto} className="w-full" sizes="176px" />
          <span className="absolute bottom-1.5 left-1.5">
            <ModalityBadge asset={asset} />
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:gap-5">
          <div className="min-w-0 flex-1">
            <p className="text-caption font-semibold uppercase tracking-[.08em] text-text-muted">
              {asset.lot} · {CATEGORY_SHORT[asset.category]}
            </p>
            <h3 className="mt-1 text-title-card font-bold text-text-primary">
              <Link
                href={`/leilao/${asset.slug}`}
                className="after:absolute after:inset-0 after:content-[''] hover:text-action"
              >
                {asset.title}
              </Link>
            </h3>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-metadata text-text-secondary">
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} aria-hidden="true" className="text-auction" />
                {asset.city} - {asset.state}
              </span>
              {company && <span className="truncate">{company.name}</span>}
            </p>
            <CompareToggle slug={asset.slug} title={asset.title} className="mt-1" />
          </div>

          <div className="flex shrink-0 items-end justify-between gap-3 sm:w-48 sm:flex-col sm:items-end sm:justify-center">
            <div className="sm:text-right">
              <span className="block text-caption text-text-muted">
                {priceLabel(asset)}
              </span>
              <span className="text-[20px] font-extrabold leading-7 tracking-tight text-text-primary tabular">
                {formatCurrencyCard(amount)}
              </span>
              {showClock && (
                <span className="mt-1 flex items-center gap-1 text-caption font-semibold text-copper sm:justify-end">
                  <Timer size={12} aria-hidden="true" />
                  <CompactCountdown deadlineIso={asset.deadlineIso} />
                </span>
              )}
            </div>
            <FavoriteButton slug={asset.slug} title={asset.title} className="shrink-0" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-card border border-border-subtle bg-surface-card">
      <div className="relative overflow-hidden">
        <ImageSlot
          ratio="aspect-[3/2]"
          src={foto}
          priority={priority}
          className="w-full"
        />
        <FavoriteButton
          slug={asset.slug}
          title={asset.title}
          className="absolute right-3 top-3 z-10"
        />
        <span className="absolute bottom-3 left-3">
          <ModalityBadge asset={asset} />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <h3 className="text-[16px] font-bold leading-6 tracking-[-.01em] text-text-primary">
          <Link
            href={`/leilao/${asset.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-action"
          >
            {asset.title}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1 truncate text-metadata text-text-secondary">
          <MapPin size={14} className="shrink-0 text-auction" aria-hidden="true" />
          {asset.city} - {asset.state}
        </p>

        {/* Três especificações em colunas: valor em cima, rótulo embaixo. */}
        <dl className="mt-3 grid grid-cols-3 divide-x divide-border-subtle">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex min-w-0 flex-col-reverse px-2 first:pl-0 last:pr-0"
            >
              <dt title={spec.label} className="truncate text-micro font-normal text-text-muted">
                {ROTULO_CURTO[spec.label] ?? spec.label}
              </dt>
              <dd className="truncate text-caption font-semibold text-text-primary">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="sr-only">{priceLabel(asset)}: </span>
            <span className="text-[24px] font-extrabold leading-8 tracking-[-.02em] text-text-primary tabular">
              {formatCurrencyCard(amount)}
            </span>
          </div>
          {showClock && (
            <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-copper-soft px-2.5 py-1.5 text-caption font-semibold text-copper">
              <Timer size={14} aria-hidden="true" />
              <span className="sr-only">Encerra em </span>
              <CompactCountdown deadlineIso={asset.deadlineIso} />
            </span>
          )}
        </div>
        {!direta && (
          <BidMovement
            startingBid={asset.startingBid}
            currentBid={asset.currentBid}
            className="mt-0.5"
          />
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="flex min-w-0 items-center gap-2">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-800 text-[11px] font-bold text-white"
            >
              {company ? companyInitials(company.name) : "—"}
            </span>
            <span className="truncate text-caption text-text-secondary">
              {company ? companyShortName(company.name) : null}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-[6px] border border-action/60 px-3 py-1.5 text-caption font-semibold text-action transition-colors duration-standard ease-standard group-hover:bg-action group-hover:text-white"
          >
            Ver lote
            <ArrowRight size={13} />
          </span>
        </div>

        <CompareToggle slug={asset.slug} title={asset.title} className="mt-3" />
      </div>
    </article>
  );
}
