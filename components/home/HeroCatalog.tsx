import Link from "next/link";
import { ArrowRight, Clock, Gavel, MapPin } from "lucide-react";
import {
  ASSETS,
  CATEGORY_SHORT,
  getClosingSoon,
  getCompanyBySlug,
} from "@/lib/data";
import { getAuctionEvents } from "@/lib/auctions";
import { formatCurrencyCard, formatCurrencyFull } from "@/lib/format";
import { CountdownClock, DeadlineLabel } from "@/components/auction/CountdownClock";
import { BidMovement } from "@/components/catalog/BidMovement";
import { StatusChip } from "@/components/ui/StatusChip";
import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Primeira dobra do catálogo.
 *
 * Um marketplace precisa mostrar mercadoria antes de mostrar navegação: a
 * dobra abre com o lote que encerra primeiro, em tamanho de vitrine, ao lado
 * da fila dos próximos a encerrar. Os indicadores vêm depois, e cada um é um
 * link para o recorte do catálogo que ele conta — um número que não leva a
 * lugar nenhum é cartaz, não ferramenta.
 */
export function HeroCatalog() {
  const live = ASSETS.filter((a) => a.status !== "cancelado");
  const closing = getClosingSoon(6);
  const featured = closing[0];
  const queue = closing.slice(1, 5);

  const openLots = live.filter(
    (a) => a.status === "aberto" || a.status === "encerrando",
  ).length;
  const closingToday = live.filter((a) => a.status === "encerrando").length;
  const events = getAuctionEvents();
  const company = featured ? getCompanyBySlug(featured.companySlug) : undefined;

  const stats: {
    label: string;
    href: string;
    value: React.ReactNode;
    hint: string;
  }[] = [
    {
      label: "Lotes abertos",
      href: "/resultados?status=aberto",
      value: openLots,
      hint: `em ${events.length} ${events.length === 1 ? "leilão" : "leilões"}`,
    },
    {
      label: "Encerram em 24h",
      href: "/resultados?status=encerrando",
      value: closingToday,
      hint: closingToday > 0 ? "lances em disputa agora" : "nenhum no momento",
    },
    {
      label: "Empresas vendedoras",
      href: "/leiloes",
      value: events.length,
      hint: `${new Set(live.map((a) => a.state)).size} estados`,
    },
    {
      label: "Próximo encerramento",
      href: "/resultados?status=aberto&sort=encerrando",
      value: featured ? (
        <CountdownClock deadlineIso={featured.deadlineIso} />
      ) : (
        "—"
      ),
      hint: featured ? `Lote ${featured.lot}` : "sem lotes abertos",
    },
  ];

  return (
    <section className="border-b border-border-subtle bg-white">
      <div className="container-content py-5">
        <h1 className="text-title-page-mobile text-text-primary md:text-title-page">
          Catálogo de leilão de ativos industriais
        </h1>
        <p className="mt-1 max-w-3xl text-metadata text-text-secondary">
          Máquinas, veículos, tecnologia e mobiliário vendidos por empresas,
          lote a lote, com ficha técnica, prazo e localização declarados.
        </p>

        {featured && (
          <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-stretch">
            {/* Lote em destaque: a mercadoria antes da navegação. */}
            <article className="card-lift group relative flex flex-col border border-border-subtle bg-white">
              <div className="relative">
                <ImageSlot
                  ratio="aspect-[16/9] lg:aspect-auto lg:h-[340px]"
                  label="Foto do lote em destaque"
                  size="lg"
                  className="w-full border-0 border-b border-border-subtle"
                />
                <span className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
                  <StatusChip status={featured.status} />
                  <span className="lot-tag border-border-strong bg-white">
                    {featured.lot}
                  </span>
                  <span className="lot-tag border-border-strong bg-white normal-case tracking-normal">
                    {CATEGORY_SHORT[featured.category]}
                  </span>
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <span className="eyebrow">Lote em destaque · encerra primeiro</span>
                <h2 className="mt-1 text-[19px] font-bold leading-7 text-text-primary md:text-[21px] md:leading-8">
                  <Link
                    href={`/leilao/${featured.slug}`}
                    className="after:absolute after:inset-0 after:content-[''] hover:text-action"
                  >
                    {featured.title}
                  </Link>
                </h2>

                <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                  {featured.specs.slice(0, 3).map((spec) => (
                    <div key={spec.label} className="text-caption">
                      <dt className="inline text-text-muted">{spec.label}: </dt>
                      <dd className="inline font-semibold text-text-secondary">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-0.5 text-metadata text-text-secondary">
                  {company && <span className="truncate">{company.name}</span>}
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={13} aria-hidden="true" />
                    {featured.city} · {featured.state}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Gavel size={13} aria-hidden="true" />
                    {featured.bidCount} lances no exemplo
                  </span>
                </p>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-border-subtle pt-3">
                  <div>
                    <span className="block text-caption text-text-muted">
                      {featured.currentBid !== null
                        ? "Lance atual"
                        : "Lance inicial"}
                    </span>
                    <span className="text-value-mobile text-text-primary tabular md:text-value">
                      {formatCurrencyFull(
                        featured.currentBid ?? featured.startingBid,
                      )}
                    </span>
                    <BidMovement
                      startingBid={featured.startingBid}
                      currentBid={featured.currentBid}
                      className="mt-0.5"
                    />
                  </div>
                  <div className="text-right">
                    <span className="block text-caption text-text-muted">
                      Encerra em
                    </span>
                    <CountdownClock
                      deadlineIso={featured.deadlineIso}
                      className="text-title-section font-bold text-action"
                    />
                  </div>
                </div>
              </div>
            </article>

            {/* Fila dos próximos: urgência legível sem rolar a página. */}
            <aside className="flex flex-col border border-border-subtle bg-white">
              <div className="flex items-center justify-between gap-3 border-b border-border-subtle bg-surface-subtle px-3 py-2">
                <h2 className="panel-title">Encerrando em seguida</h2>
                <Clock size={14} aria-hidden="true" className="text-text-muted" />
              </div>
              <ul className="flex flex-1 flex-col">
                {queue.map((asset) => (
                  <li
                    key={asset.id}
                    className="flex-1 border-b border-border-subtle last:border-b-0"
                  >
                    <Link
                      href={`/leilao/${asset.slug}`}
                      className="group/row flex h-full min-h-[74px] flex-col justify-center gap-1 px-3 py-2.5 transition-colors duration-quick hover:bg-surface-subtle"
                    >
                      <span className="flex items-center gap-2">
                        <span className="lot-tag">{asset.lot}</span>
                        <span className="truncate text-label font-semibold text-text-primary group-hover/row:text-action">
                          {asset.title}
                        </span>
                      </span>
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-metadata font-bold text-text-primary tabular">
                          {formatCurrencyCard(
                            asset.currentBid ?? asset.startingBid,
                          )}
                        </span>
                        <span className="text-caption text-text-secondary">
                          <DeadlineLabel deadlineIso={asset.deadlineIso} />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/resultados?status=aberto&sort=encerrando"
                className="text-link border-t border-border-subtle px-3"
              >
                Ver todos por prazo <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </aside>
          </div>
        )}

        {/* Indicadores: cada número abre o recorte que ele conta. */}
        <ul className="mt-3 grid grid-cols-2 border border-border-subtle bg-white md:grid-cols-4">
          {stats.map((stat, i) => (
            <li
              key={stat.label}
              className={`border-border-subtle ${
                i < 2 ? "border-b md:border-b-0" : ""
              } ${i % 2 === 0 ? "border-r" : ""} md:border-r md:last:border-r-0`}
            >
              <Link href={stat.href} className="stat-cell">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
                <span className="text-caption text-text-muted">{stat.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
