import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, Calendar, MapPin, Boxes, Gavel } from "lucide-react";
import { CATEGORY_SHORT } from "@/lib/data";
import { getAuctionEventByCompany, getAuctionEvents } from "@/lib/auctions";
import { formatCurrencyCard, formatDateTimeWithZone } from "@/lib/format";
import { LotTable } from "@/components/catalog/LotTable";
import { ImageSlot } from "@/components/ui/ImageSlot";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAuctionEvents().map((event) => ({ slug: event.company.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = getAuctionEventByCompany(slug);
  return {
    title: event ? `${event.code} · ${event.company.name}` : "Leilão",
  };
}

export default async function LeilaoEventoPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getAuctionEventByCompany(slug);
  if (!event) notFound();

  const { company } = event;

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
        <Link href="/leiloes" className="hover:text-action hover:underline">
          Leilões
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-text-secondary">{event.code}</span>
      </nav>

      <div className="mt-1.5 panel overflow-hidden">
        <ImageSlot
          src={`/images/assets/${event.lots[0].slug}.webp`}
          ratio="h-36 sm:h-44"
          label="Imagem do leilão"
          size="lg"
          className="w-full border-0 border-b border-border-subtle"
        />

        <div className="grid gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="lot-tag">{event.code}</span>
              <span className="text-micro uppercase tracking-[.08em] text-text-muted">
                {event.categories.map((c) => CATEGORY_SHORT[c]).join(" · ")}
              </span>
            </div>
            <h1 className="mt-1.5 text-[28px] font-extrabold leading-[1.08] tracking-[-.03em] text-text-primary sm:text-[36px]">
              Leilão {event.code} · {company.name}
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-metadata text-text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} aria-hidden="true" />
                {company.city} · {company.state}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Building2 size={14} aria-hidden="true" />
                {company.segment}
              </span>
              <Link
                href={`/loja/${company.slug}`}
                className="font-semibold text-action hover:underline"
              >
                Ver perfil do vendedor
              </Link>
            </p>
            <p className="mt-2 max-w-3xl text-body text-text-secondary">
              {company.description}
            </p>
          </div>

          <dl className="self-start border border-border-subtle">
            <div className="flex items-center justify-between gap-2 border-b border-border-subtle bg-surface-subtle px-3 py-2">
              <dt className="panel-title">Dados do leilão</dt>
            </div>
            {[
              {
                icon: Boxes,
                label: "Lotes publicados",
                value: `${event.lots.length}`,
              },
              {
                icon: Boxes,
                label: "Lotes abertos",
                value: `${event.openLots}`,
              },
              {
                icon: Gavel,
                label: "Lances no exemplo",
                value: `${event.totalBids}`,
              },
              {
                icon: Calendar,
                label: "Primeiro encerramento",
                value: formatDateTimeWithZone(event.firstDeadlineIso),
              },
              {
                icon: Calendar,
                label: "Último encerramento",
                value: formatDateTimeWithZone(event.lastDeadlineIso),
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-3 border-b border-border-subtle px-3 py-2 last:border-b-0 text-metadata"
              >
                <dt className="text-text-muted">{row.label}</dt>
                <dd className="text-right font-semibold text-text-primary tabular">
                  {row.value}
                </dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-3 bg-surface-subtle px-3 py-2 text-metadata">
              <dt className="text-text-muted">Lotes a partir de</dt>
              <dd className="text-right font-bold text-text-primary tabular">
                {formatCurrencyCard(event.minAmount)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <section className="mt-5">
        <div className="section-heading">
          <h2 className="section-title">Lotes deste leilão</h2>
          <span className="text-metadata text-text-secondary tabular">
            {event.lots.length} {event.lots.length === 1 ? "lote" : "lotes"}
          </span>
        </div>
        <div className="mt-3">
          <LotTable assets={event.lots} />
        </div>
      </section>

      <section className="mt-5">
        <div className="section-heading">
          <h2 className="section-title">Condições de participação</h2>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {[
            {
              title: "Retirada",
              body: "A retirada é por conta do comprador, no endereço informado em cada lote, dentro do prazo indicado após o fechamento.",
            },
            {
              title: "Documentação",
              body: "Os documentos previstos aparecem na ficha de cada lote. Nesta demonstração não há arquivos disponíveis para download.",
            },
            {
              title: "Lances",
              body: "Cada lote tem lance inicial, incremento mínimo e prazo próprios. A revisão antecede qualquer confirmação.",
            },
          ].map((block) => (
            <div key={block.title} className="panel p-3">
              <h3 className="text-title-card text-text-primary">
                {block.title}
              </h3>
              <p className="mt-1 text-metadata text-text-secondary">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
