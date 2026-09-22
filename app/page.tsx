import Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { AssetCard } from "@/components/catalog/AssetCard";
import { AuctionCard } from "@/components/catalog/AuctionCard";
import { PersonalShelf } from "@/components/catalog/PersonalShelf";
import { Testimonials } from "@/components/home/Testimonials";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { AdSlot } from "@/components/ads/AdSlot";
import { getAuctionEvents } from "@/lib/auctions";
import {
  ASSETS,
  CATEGORY_SHORT,
  COMPANIES,
  Category,
  SUBCATEGORIES,
  getClosingSoon,
} from "@/lib/data";

const CATEGORIES = Object.keys(CATEGORY_SHORT) as Category[];
const LIVE = ASSETS.filter((a) => a.status !== "cancelado");

function lotsIn(category: Category, subcategory?: string) {
  return LIVE.filter(
    (a) =>
      a.category === category && (!subcategory || a.subcategory === subcategory),
  ).length;
}

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
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <span className="text-caption text-text-muted">
                Ir direto para:
              </span>
              {CATEGORIES.map((category) => (
                <Link
                  key={category}
                  href={`/resultados?categoria=${category}`}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-control border border-border-subtle bg-surface-subtle px-2.5 text-caption text-text-primary transition-colors duration-quick hover:border-action hover:text-action"
                >
                  {CATEGORY_SHORT[category]}
                  <span className="text-text-muted tabular">
                    {lotsIn(category)}
                  </span>
                </Link>
              ))}
              <Link
                href="/resultados"
                className="inline-flex min-h-9 items-center px-1 text-caption font-semibold text-action hover:underline"
              >
                Catálogo completo
              </Link>
            </div>
          </div>

          <ImageSlot
            ratio="aspect-[16/9] lg:aspect-auto lg:h-full"
            label="Imagem de destaque"
            size="lg"
            className="w-full"
          />
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

      {/* Taxonomia completa em colunas: navegação por texto, como num catálogo. */}
      <section className="container-content py-6">
        <div className="section-heading">
          <h2 className="section-title">Navegar por categoria</h2>
          <Link href="/resultados" className="text-link">
            Abrir catálogo <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-3 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <div key={category}>
              <ImageSlot
                ratio="aspect-[16/7]"
                size="sm"
                className="mb-2 w-full"
              />
              <Link
                href={`/resultados?categoria=${category}`}
                className="flex items-baseline justify-between gap-2 border-b border-border-strong pb-1.5 text-label font-bold uppercase tracking-[.05em] text-text-primary hover:text-action"
              >
                {CATEGORY_SHORT[category]}
                <span className="text-caption font-normal text-text-muted tabular">
                  {lotsIn(category)} lotes
                </span>
              </Link>
              <ul className="mt-1">
                {SUBCATEGORIES[category].map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`/resultados?categoria=${category}&subcategoria=${sub.slug}`}
                      className="flex min-h-8 items-baseline justify-between gap-2 text-metadata text-text-secondary hover:text-action hover:underline"
                    >
                      {sub.label}
                      <span className="text-caption text-text-muted tabular">
                        {lotsIn(category, sub.slug)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

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
                  className="group flex items-start gap-2.5 border border-border-subtle p-3 transition-colors duration-quick hover:border-action"
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
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-control bg-accent-soft px-5 text-label font-bold text-brand-900 transition-colors duration-quick hover:bg-accent-strong"
          >
            Ver requisitos
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
