import Link from "next/link";
import {
  ArrowRight,
  Armchair,
  Building2,
  Clock,
  Factory,
  MapPin,
  Server,
  Truck,
} from "lucide-react";
import { SearchBar } from "@/components/layout/SearchBar";
import { AssetCard } from "@/components/catalog/AssetCard";
import { AssetVisual } from "@/components/ui/AssetVisual";
import { StatusChip } from "@/components/ui/StatusChip";
import { PersonalShelf } from "@/components/catalog/PersonalShelf";
import { DeadlineLabel } from "@/components/auction/CountdownClock";
import {
  ASSETS,
  CATEGORY_LABELS,
  COMPANIES,
  Category,
  getClosingSoon,
  getCompanyBySlug,
} from "@/lib/data";
import { formatCurrencyCard } from "@/lib/format";

const CATEGORY_ICONS: Record<Category, typeof Factory> = {
  maquinas: Factory,
  veiculos: Truck,
  tecnologia: Server,
  mobiliario: Armchair,
};

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];
const LIVE = ASSETS.filter((a) => a.status !== "cancelado");

const STATS = [
  { value: LIVE.length, label: "lotes no catálogo" },
  { value: COMPANIES.length, label: "empresas anunciantes" },
  { value: CATEGORIES.length, label: "categorias" },
];

export default function HomePage() {
  const closingSoon = getClosingSoon(8);
  const featured = closingSoon[0];
  const featuredCompany = featured
    ? getCompanyBySlug(featured.companySlug)
    : undefined;

  return (
    <div>
      {/* Primeira dobra: busca e catálogo, sem bloco de campanha. */}
      <section className="border-b border-border-subtle bg-white">
        <div className="container-content grid gap-8 py-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:py-10">
          <div>
            <p className="eyebrow">Leilão de ativos entre empresas</p>
            <h1 className="mt-2 max-w-2xl text-display-mobile tracking-[-.02em] text-text-primary md:text-display">
              Ativos para o próximo movimento do seu negócio.
            </h1>
            <p className="mt-3 max-w-xl text-body text-text-secondary">
              Máquinas, veículos, tecnologia e mobiliário corporativo de
              empresas que estão renovando seus parques. Ficha técnica,
              localização e prazo em cada lote.
            </p>

            {/* No mobile a busca do cabeçalho já fica visível o tempo todo. */}
            <div className="mt-5 hidden max-w-2xl md:block">
              <SearchBar size="large" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {CATEGORIES.map((category) => {
                const Icon = CATEGORY_ICONS[category];
                return (
                  <Link
                    key={category}
                    href={`/resultados?categoria=${category}`}
                    className="chip"
                  >
                    <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                    {CATEGORY_LABELS[category]}
                  </Link>
                );
              })}
              <Link href="/resultados" className="chip font-semibold">
                Ver catálogo completo
              </Link>
            </div>
          </div>

          {featured && (
            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-border-subtle bg-surface-subtle px-4 py-2">
                <span className="text-micro font-semibold uppercase tracking-[.1em] text-text-secondary">
                  Destaque do catálogo
                </span>
                <span className="lot-tag">{featured.lot}</span>
              </div>
              <Link href={`/leilao/${featured.slug}`} className="group block">
                <div className="relative">
                  <AssetVisual
                    category={featured.category}
                    rounded=""
                    showLabel={false}
                    className="aspect-[16/9] w-full border-b border-border-subtle"
                  />
                  <StatusChip
                    status={featured.status}
                    className="absolute left-3 top-3"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-title-card text-text-primary group-hover:text-action group-hover:underline">
                    {featured.title}
                  </h2>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-metadata text-text-secondary">
                    {featuredCompany && <span>{featuredCompany.name}</span>}
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={14} aria-hidden="true" />
                      {featured.city} · {featured.state}
                    </span>
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-3 border-t border-border-subtle pt-3">
                    <div>
                      <span className="block text-caption text-text-secondary">
                        {featured.currentBid !== null
                          ? "Lance atual"
                          : "Lance inicial"}
                      </span>
                      <span className="text-value-mobile text-text-primary tabular">
                        {formatCurrencyCard(
                          featured.currentBid ?? featured.startingBid,
                        )}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 pb-1 text-metadata text-text-secondary">
                      <Clock size={15} aria-hidden="true" />
                      <DeadlineLabel deadlineIso={featured.deadlineIso} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Faixa de números do catálogo, calculada sobre os dados existentes. */}
      <section className="border-b border-border-subtle bg-surface-subtle">
        <div className="container-content flex flex-wrap items-center gap-x-10 gap-y-4 py-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-block">
              <span className="text-title-section text-text-primary tabular">
                {stat.value}
              </span>
              <span className="text-metadata text-text-secondary">
                {stat.label}
              </span>
            </div>
          ))}
          <p className="ml-auto max-w-sm text-metadata text-text-secondary">
            Números do catálogo de demonstração. Imagens são ilustrações de
            categoria, não fotografias dos ativos.
          </p>
        </div>
      </section>

      <section className="container-content py-8 md:py-10">
        <div className="section-heading">
          <div>
            <p className="eyebrow">De olho no prazo</p>
            <h2 className="section-title mt-1">Leilões encerrando em breve</h2>
          </div>
          <Link href="/resultados?status=aberto&sort=encerrando" className="text-link">
            Ver todos <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {closingSoon.slice(0, 4).map((asset, i) => (
            <AssetCard key={asset.id} asset={asset} index={i} />
          ))}
        </div>
      </section>

      <PersonalShelf assets={ASSETS} />

      <section className="container-content py-8 md:py-10">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Catálogo</p>
            <h2 className="section-title mt-1">Navegue por categoria</h2>
          </div>
          <Link href="/resultados" className="text-link">
            Abrir catálogo <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category];
            const total = LIVE.filter((a) => a.category === category).length;
            return (
              <Link
                key={category}
                href={`/resultados?categoria=${category}`}
                className="category-tile"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-surface-subtle text-action">
                  <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-title-card text-text-primary">
                    {CATEGORY_LABELS[category]}
                  </span>
                  <span className="mt-0.5 block text-metadata text-text-secondary tabular">
                    {total} {total === 1 ? "lote" : "lotes"} no catálogo
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="ml-auto shrink-0 text-text-secondary"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-content py-8 md:py-10">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Quem anuncia</p>
            <h2 className="section-title mt-1">Empresas em destaque</h2>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COMPANIES.map((company, i) => {
            const total = LIVE.filter(
              (a) => a.companySlug === company.slug,
            ).length;
            return (
              <Link
                key={company.slug}
                href={`/loja/${company.slug}`}
                className="group flex items-start gap-3 rounded-card border border-border-subtle bg-white p-4 transition-colors duration-quick hover:border-action"
              >
                <span className={`company-monogram company-tone-${(i % 4) + 1}`}>
                  {company.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-title-card text-text-primary group-hover:text-action">
                    {company.name}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1 text-metadata text-text-secondary">
                    <MapPin size={14} aria-hidden="true" />
                    {company.city} · {company.state}
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-text-secondary">
                    <span>{company.segment}</span>
                    <span className="lot-tag">
                      {total} {total === 1 ? "lote" : "lotes"}
                    </span>
                  </span>
                </span>
                <Building2
                  size={17}
                  aria-hidden="true"
                  className="shrink-0 text-text-secondary"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="on-dark bg-brand-900">
        <div className="container-content flex flex-col gap-5 py-8 text-white md:flex-row md:items-center md:justify-between md:py-10">
          <div className="max-w-2xl">
            <p className="text-micro font-semibold uppercase tracking-[.13em] text-accent-strong">
              Para quem vende
            </p>
            <h2 className="mt-2 text-title-section-mobile md:text-title-section">
              O ativo que já cumpriu seu papel pode financiar o próximo ciclo.
            </h2>
            <p className="mt-2 text-metadata text-white/75">
              Veja o que preparar para anunciar máquinas, veículos, tecnologia
              ou mobiliário da sua empresa no catálogo.
            </p>
          </div>
          <Link
            href="/anunciar"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-control bg-accent-soft px-5 text-label font-semibold text-brand-900 transition-colors duration-quick hover:bg-accent-strong"
          >
            Preparar meu anúncio
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
