import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { AuctionEvent } from "@/lib/auctions";
import { CATEGORY_SHORT } from "@/lib/data";
import { DeadlineLabel } from "@/components/auction/CountdownClock";
import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Leilões em destaque: dois conjuntos apresentados em largura dupla, com as
 * fotos à esquerda e o convite de entrada à direita. Aqui o que se vende é o
 * leilão inteiro — por isso o destaque é o número de lotes e não o valor de
 * uma peça.
 */
function HighlightCard({ event }: { event: AuctionEvent }) {
  return (
    <article className="card-lift group relative flex flex-col gap-3 border border-border-subtle bg-white p-3 sm:flex-row">
      <div className="grid w-full shrink-0 grid-cols-2 gap-1 sm:w-[42%]">
        <ImageSlot ratio="aspect-[4/3]" className="w-full" />
        <ImageSlot ratio="aspect-[4/3]" className="w-full" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-text-secondary">
          <span className="inline-flex items-center gap-1">
            <span
              aria-hidden="true"
              className="inline-flex h-4 items-center rounded-[2px] bg-brand-900 px-1 text-micro font-bold text-white"
            >
              {event.company.state}
            </span>
            <MapPin size={12} aria-hidden="true" />
            {event.company.city}
          </span>
          {event.nextOpenDeadlineIso && (
            <span className="inline-flex items-center gap-1 font-semibold text-action">
              <Clock size={12} aria-hidden="true" />
              <DeadlineLabel deadlineIso={event.nextOpenDeadlineIso} />
            </span>
          )}
        </p>

        <h3 className="mt-1.5 text-[17px] font-bold leading-6 text-text-primary">
          <Link
            href={`/leiloes/${event.company.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-action"
          >
            {event.company.name}
          </Link>
        </h3>

        <p className="mt-1 text-caption text-text-muted">
          {event.categories.map((c) => CATEGORY_SHORT[c]).join(" · ")} ·{" "}
          {event.company.segment}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border border-border-subtle bg-surface-subtle p-2 pl-3">
          <span className="text-metadata text-text-secondary">
            <strong className="font-bold text-text-primary tabular">
              {event.lots.length}
            </strong>{" "}
            {event.lots.length === 1 ? "lote" : "lotes"} neste leilão
          </span>
          <span className="primary-link relative z-10 min-h-9 px-3">
            Ver leilão
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-standard ease-standard group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </article>
  );
}

export function FeaturedAuctions({ events }: { events: AuctionEvent[] }) {
  const featured = events.slice(0, 2);
  if (featured.length === 0) return null;

  return (
    <section
      aria-labelledby="titulo-destaques"
      className="container-content py-6"
    >
      <div className="section-heading">
        <h2 id="titulo-destaques" className="section-title">
          Leilões em destaque
        </h2>
        <Link href="/leiloes" className="text-link">
          Ver todos os leilões <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        {featured.map((event) => (
          <HighlightCard key={event.code} event={event} />
        ))}
      </div>
    </section>
  );
}
