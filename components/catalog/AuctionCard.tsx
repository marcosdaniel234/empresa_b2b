import Link from "next/link";
import { ArrowRight, Boxes, Clock, MapPin } from "lucide-react";
import { AuctionEvent } from "@/lib/auctions";
import { CATEGORY_SHORT } from "@/lib/data";
import { formatCurrencyCard, formatShortDate } from "@/lib/format";
import { DeadlineLabel } from "@/components/auction/CountdownClock";
import { ImageSlot } from "@/components/ui/ImageSlot";

/** Cartão de leilão: o agrupamento de lotes de uma empresa. */
export function AuctionCard({ event }: { event: AuctionEvent }) {
  const sameDay = event.firstDeadlineIso === event.lastDeadlineIso;

  return (
    <article className="group relative flex flex-col border border-border-subtle bg-white transition-colors duration-quick hover:border-border-control">
      <ImageSlot
        ratio="aspect-[16/7]"
        label="Imagem do leilão"
        className="w-full border-0 border-b border-border-subtle"
      />

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
            className="after:absolute after:inset-0 after:content-[''] hover:text-action hover:underline"
          >
            {event.company.name}
          </Link>
        </h3>

        <p className="mt-0.5 text-caption text-text-muted">
          {event.categories.map((c) => CATEGORY_SHORT[c]).join(" · ")}
        </p>

        <dl className="mt-2 border-t border-border-subtle pt-2 text-caption">
          <div className="flex items-center justify-between gap-2 py-0.5">
            <dt className="inline-flex items-center gap-1.5 text-text-muted">
              <Boxes size={13} aria-hidden="true" />
              Lotes
            </dt>
            <dd className="text-text-secondary tabular">{event.lots.length}</dd>
          </div>
          <div className="flex items-center justify-between gap-2 py-0.5">
            <dt className="inline-flex items-center gap-1.5 text-text-muted">
              <MapPin size={13} aria-hidden="true" />
              Local
            </dt>
            <dd className="truncate text-text-secondary">
              {event.company.city} · {event.company.state}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-2 py-0.5">
            <dt className="inline-flex items-center gap-1.5 text-text-muted">
              <Clock size={13} aria-hidden="true" />
              Encerramento
            </dt>
            <dd className="text-text-secondary">
              {sameDay
                ? formatShortDate(event.firstDeadlineIso)
                : `${formatShortDate(event.firstDeadlineIso)} a ${formatShortDate(event.lastDeadlineIso)}`}
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-border-subtle pt-2">
          <div>
            <span className="block text-caption text-text-muted">
              Lotes a partir de
            </span>
            <span className="text-title-card font-bold text-text-primary tabular">
              {formatCurrencyCard(event.minAmount)}
            </span>
          </div>
          {event.openLots > 0 && (
            <span className="inline-flex items-center gap-1 pb-0.5 text-caption text-text-secondary">
              <DeadlineLabel deadlineIso={event.firstDeadlineIso} />
            </span>
          )}
        </div>

        <span className="mt-2 inline-flex items-center gap-1 text-caption font-semibold text-action">
          Ver lotes do leilão
          <ArrowRight size={13} aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
