import Link from "next/link";
import { ArrowRight, Clock, Layers, MapPin } from "lucide-react";
import { AuctionEvent } from "@/lib/auctions";
import { CATEGORY_SHORT } from "@/lib/data";
import { formatCurrencyCard, formatShortDate } from "@/lib/format";
import { DeadlineLabel } from "@/components/auction/CountdownClock";
import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Cartão de leilão: o agrupamento de lotes de uma empresa.
 *
 * A moldura principal fica ao lado de uma pilha de três miniaturas, com o
 * total de lotes marcado sobre a última — a leitura padrão de catálogo de
 * leilão industrial, em que o conjunto importa mais que a peça isolada.
 */
export function AuctionCard({ event }: { event: AuctionEvent }) {
  const sameDay = event.firstDeadlineIso === event.lastDeadlineIso;
  const extras = Math.max(event.lots.length - 1, 0);

  return (
    <article className="card-lift group relative flex flex-col border border-border-subtle bg-white">
      <div className="flex gap-px border-b border-border-subtle bg-border-subtle">
        <div className="relative min-w-0 flex-1">
          <ImageSlot
            src={`/images/assets/${event.lots[0].slug}.webp`}
            ratio="aspect-[4/3]"
            className="h-full w-full border-0"
            label="Imagem do leilão"
          />
          {event.nextOpenDeadlineIso && (
            <span className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 rounded-[2px] bg-white/95 px-1.5 py-1 text-caption font-semibold text-text-primary shadow-card">
              <Clock size={12} aria-hidden="true" className="text-action" />
              <DeadlineLabel deadlineIso={event.nextOpenDeadlineIso} />
            </span>
          )}
        </div>

        <div className="flex w-[30%] shrink-0 flex-col gap-px">
          <ImageSlot src={`/images/assets/${event.lots[0].slug}.webp`} ratio="aspect-[4/3]" size="sm" className="w-full border-0" />
          <ImageSlot src={`/images/assets/${event.lots[0].slug}.webp`} ratio="aspect-[4/3]" size="sm" className="w-full border-0" />
          <div className="relative">
            <ImageSlot
              src={`/images/assets/${event.lots[0].slug}.webp`}
              ratio="aspect-[4/3]"
              size="sm"
              className="w-full border-0"
            />
            {extras > 0 && (
              <span className="absolute inset-0 flex items-center justify-center gap-1 bg-brand-900/85 text-label font-bold text-white tabular">
                <Layers size={13} aria-hidden="true" />
                {extras}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="lot-tag">{event.code}</span>
          <span className="text-caption font-semibold text-text-secondary tabular">
            {event.openLots > 0
              ? `${event.openLots} ${event.openLots === 1 ? "lote aberto" : "lotes abertos"}`
              : "Sem lotes abertos"}
          </span>
        </div>

        <h3 className="mt-1.5 text-title-card text-text-primary">
          <Link
            href={`/leiloes/${event.company.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-action"
          >
            {event.company.name}
          </Link>
        </h3>

        <p className="mt-0.5 truncate text-caption text-text-muted">
          {event.categories.map((c) => CATEGORY_SHORT[c]).join(" · ")}
        </p>

        <p className="mt-1.5 flex items-center gap-1 truncate text-metadata text-text-secondary">
          <MapPin size={13} aria-hidden="true" className="shrink-0" />
          {event.company.city} · {event.company.state}
        </p>

        <p className="mt-0.5 text-caption text-text-muted">
          Encerra{" "}
          {sameDay
            ? formatShortDate(event.firstDeadlineIso)
            : `de ${formatShortDate(event.firstDeadlineIso)} a ${formatShortDate(event.lastDeadlineIso)}`}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-border-subtle pt-2">
          <div>
            <span className="block text-caption text-text-muted">
              Lotes a partir de
            </span>
            <span className="text-title-card font-bold text-text-primary tabular">
              {formatCurrencyCard(event.minAmount)}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 pb-0.5 text-caption font-semibold text-action">
            Ver lotes
            <ArrowRight
              size={13}
              aria-hidden="true"
              className="transition-transform duration-standard ease-standard group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
