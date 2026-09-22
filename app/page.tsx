import Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { AuctionCard } from "@/components/catalog/AuctionCard";
import { PersonalShelf } from "@/components/catalog/PersonalShelf";
import { CategoryExplorer } from "@/components/home/CategoryExplorer";
import { HeroCatalog } from "@/components/home/HeroCatalog";
import { Testimonials } from "@/components/home/Testimonials";
import { AdSlot } from "@/components/ads/AdSlot";
import { getAuctionEvents } from "@/lib/auctions";
import { ASSETS, COMPANIES } from "@/lib/data";

const LIVE = ASSETS.filter((a) => a.status !== "cancelado");

export default function HomePage() {
  const events = getAuctionEvents();

  return (
    <div>
      <HeroCatalog />

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

      <section className="border-y border-border-subtle bg-surface-page">
        <div className="container-content py-3">
          <AdSlot format="billboard" slotId="home-meio" />
        </div>
      </section>

      <PersonalShelf assets={ASSETS} />

      <CategoryExplorer />

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
