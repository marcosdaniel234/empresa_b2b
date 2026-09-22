import Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { AssetCard } from "@/components/catalog/AssetCard";
import { AuctionCard } from "@/components/catalog/AuctionCard";
import { PersonalShelf } from "@/components/catalog/PersonalShelf";
import { CategoryExplorer } from "@/components/home/CategoryExplorer";
import { Testimonials } from "@/components/home/Testimonials";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { AdSlot } from "@/components/ads/AdSlot";
import { getAuctionEvents } from "@/lib/auctions";
import { ASSETS, COMPANIES, getClosingSoon } from "@/lib/data";

const LIVE = ASSETS.filter((a) => a.status !== "cancelado");

export default function HomePage() {
  const events = getAuctionEvents();
  const closingSoon = getClosingSoon(8);
  const openLots = LIVE.filter(
    (a) => a.status === "aberto" || a.status === "encerrando",
  ).length;
  const closingToday = LIVE.filter((a) => a.status === "encerrando").length;
  const states = new Set(LIVE.map((a) => a.state)).size;


  return (
    <div>
      {/* Faixa de busca: entrada do catálogo, sem texto de campanha. */}
      <section className="border-b border-border-subtle bg-white">
        <div className="container-content grid gap-4 py-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:items-stretch">
          <div className="min-w-0">
            <h1 className="text-title-page-mobile text-text-primary md:text-title-page">
              Catálogo de leilão de ativos industriais
            </h1>
            <dl className="mt-2.5 grid grid-cols-2 border border-border-subtle bg-white sm:grid-cols-4">
              {[
                { label: "Lotes abertos", value: openLots },
                { label: "Encerram em 24h", value: closingToday },
                { label: "Leilões", value: events.length },
                { label: "Estados", value: states },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border-r border-border-subtle px-3 py-2 last:border-r-0"
                >
                  <dt className="text-caption text-text-muted">{item.label}</dt>
                  <dd className="text-title-section text-text-primary tabular">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ImageSlot
            ratio="aspect-[16/9] lg:aspect-auto lg:h-full"
            label="Imagem de destaque"
            size="lg"
            className="w-full"
          />
        </div>

        {/* Entrada por categoria: no corpo da página, não no cabeçalho. */}
        <div className="container-content pb-5">
          <CategoryExplorer />
        </div>
      </section>

      <section className="border-b border-border-subtle bg-surface-page">
        <div className="container-content py-3">
          <AdSlot format="leaderboard" slotId="home-topo" />
        </div>
      </section>

      <section className="container-content py-6">
        <div className="section-heading">
          <h2 className="section-title">Leilões em andamento</h2>
          <Link href="/leiloes" className="text-link">
            Ver todos os leilões <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {events.slice(0, 4).map((event) => (
            <AuctionCard key={event.code} event={event} />
          ))}
        </div>
      </section>

      <section className="container-content pb-6">
        <div className="section-heading">
          <h2 className="section-title">Lotes encerrando em breve</h2>
          <Link
            href="/resultados?status=aberto&sort=encerrando"
            className="text-link"
          >
            Ver no catálogo <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {closingSoon.slice(0, 4).map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </section>

      <section className="border-y border-border-subtle bg-surface-page">
        <div className="container-content py-3">
          <AdSlot format="billboard" slotId="home-meio" />
        </div>
      </section>

      <PersonalShelf assets={ASSETS} />

      <section className="border-b border-border-subtle bg-surface-page">
        <div className="container-content py-3">
          <AdSlot format="leaderboard" slotId="home-categorias" />
        </div>
      </section>

      <section className="border-y border-border-subtle bg-white">
        <div className="container-content py-6">
          <div className="section-heading">
            <h2 className="section-title">Empresas vendedoras</h2>
            <Link href="/leiloes" className="text-link">
              Ver leilões <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {COMPANIES.map((company, i) => {
              const total = LIVE.filter(
                (a) => a.companySlug === company.slug,
              ).length;
              return (
                <Link
                  key={company.slug}
                  href={`/loja/${company.slug}`}
                  className="card-lift group flex items-start gap-2.5 border border-border-subtle bg-white p-3"
                >
                  <span className={`company-monogram company-tone-${(i % 4) + 1}`}>
                    {company.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-title-card text-text-primary group-hover:text-action">
                      {company.name}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1 truncate text-caption text-text-secondary">
                      <MapPin size={12} aria-hidden="true" />
                      {company.city} · {company.state}
                    </span>
                    <span className="mt-1 block text-caption text-text-muted tabular">
                      {total} {total === 1 ? "lote" : "lotes"}
                    </span>
                  </span>
                  <Building2
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 text-text-muted"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="border-y border-border-subtle bg-surface-page">
        <div className="container-content py-3">
          <AdSlot format="leaderboard" slotId="home-rodape" />
        </div>
      </section>

      <section className="on-dark bg-brand-900">
        <div className="container-content flex flex-col gap-4 py-6 text-white md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-title-section-mobile md:text-title-section">
              Publicar ativos no catálogo
            </h2>
            <p className="mt-1 text-metadata text-white/75">
              Requisitos de cadastro, documentação, fotos e condições de leilão.
            </p>
          </div>
          <Link
            href="/anunciar"
            className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-control bg-accent-soft px-5 text-label font-bold text-brand-900 transition-[background-color,transform] duration-standard ease-standard hover:bg-accent-strong active:translate-y-px"
          >
            Ver requisitos
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-standard ease-standard group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
