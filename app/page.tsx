import Link from "next/link";
import { ArrowRight, Factory, Truck, Server, Armchair, ShieldCheck, Gavel, Building2 } from "lucide-react";
import { SearchBar } from "@/components/layout/SearchBar";
import { AssetCard } from "@/components/catalog/AssetCard";
import { ASSETS, CATEGORY_LABELS, COMPANIES, Category, getClosingSoon, getNewest } from "@/lib/data";

const CATEGORY_ICONS: Record<Category, typeof Factory> = {
  maquinas: Factory,
  veiculos: Truck,
  tecnologia: Server,
  mobiliario: Armchair,
};

const VALUE_PROPS = [
  {
    icon: Gavel,
    title: "Lance com regras claras",
    description: "Valor atual, próximo mínimo e prazo sempre visíveis antes de qualquer confirmação.",
  },
  {
    icon: Building2,
    title: "Empresa a empresa",
    description: "Todo anúncio é publicado e adquirido em nome de uma organização identificada.",
  },
  {
    icon: ShieldCheck,
    title: "Informação verificável",
    description: "Sem selos ou reputação inventados: só o que a plataforma pode efetivamente confirmar.",
  },
];

export default function HomePage() {
  const closingSoon = getClosingSoon(4);
  const newest = getNewest(4);

  return (
    <div>
      <section className="border-b border-border-subtle bg-surface-card">
        <div className="container-content grid gap-10 py-12 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div>
            <h1 className="text-display-mobile text-text-primary md:text-display">
              Ativos que movem <span className="text-action">novos negócios.</span>
            </h1>
            <p className="mt-4 max-w-xl text-body text-text-secondary md:text-[18px] md:leading-7">
              Equipamentos, veículos, tecnologia e mobiliário corporativo em leilão, de empresa para empresa —
              com informação técnica completa e prazos claros.
            </p>
            <div className="mt-8 max-w-xl">
              <SearchBar />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {(Object.keys(CATEGORY_LABELS) as Category[]).map((category) => {
                const Icon = CATEGORY_ICONS[category];
                return (
                  <Link
                    key={category}
                    href={`/resultados?categoria=${category}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-page px-4 py-2 text-label text-text-primary transition-colors duration-quick hover:border-action hover:text-action"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    {CATEGORY_LABELS[category]}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-modal border border-border-subtle bg-brand-900 p-8 text-text-inverse">
            <p className="text-caption font-semibold uppercase tracking-wide text-accent-soft">
              Mais ativos, mais oportunidades
            </p>
            <p className="mt-3 text-title-section-mobile md:text-title-section">
              {ASSETS.length} ativos publicados por {COMPANIES.length} empresas nesta demonstração.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <dt className="text-caption text-white/70">Leilões abertos agora</dt>
                <dd className="text-value-mobile md:text-value tabular">
                  {ASSETS.filter((a) => a.status === "aberto").length}
                </dd>
              </div>
              <div>
                <dt className="text-caption text-white/70">Encerrando em breve</dt>
                <dd className="text-value-mobile md:text-value tabular">{closingSoon.length}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-border-subtle bg-surface-page">
        <div className="container-content grid gap-8 py-12 md:grid-cols-3">
          {VALUE_PROPS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-control bg-surface-subtle text-action">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-title-card text-text-primary">{title}</h2>
                <p className="mt-1 text-metadata text-text-secondary">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {closingSoon.length > 0 && (
        <section className="container-content py-12 md:py-16">
          <div className="flex items-end justify-between">
            <h2 className="text-title-section-mobile text-text-primary md:text-title-section">Encerrando em breve</h2>
            <Link href="/resultados?status=encerrando" className="inline-flex items-center gap-1 text-label text-action hover:underline">
              Ver todos <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {closingSoon.map((asset, i) => (
              <AssetCard key={asset.id} asset={asset} index={i} />
            ))}
          </div>
        </section>
      )}

      {newest.length > 0 && (
        <section className="container-content border-t border-border-subtle py-12 md:py-16">
          <div className="flex items-end justify-between">
            <h2 className="text-title-section-mobile text-text-primary md:text-title-section">Novos leilões</h2>
            <Link href="/resultados" className="inline-flex items-center gap-1 text-label text-action hover:underline">
              Ver todos <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newest.map((asset, i) => (
              <AssetCard key={asset.id} asset={asset} index={i} />
            ))}
          </div>
        </section>
      )}

      {COMPANIES.length > 0 && (
        <section className="border-t border-border-subtle bg-surface-card">
          <div className="container-content py-12 md:py-16">
            <h2 className="text-title-section-mobile text-text-primary md:text-title-section">
              Empresas com ativos disponíveis
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {COMPANIES.map((company) => (
                <Link
                  key={company.slug}
                  href={`/loja/${company.slug}`}
                  className="rounded-card border border-border-subtle bg-surface-page p-5 transition-colors duration-quick hover:border-action"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-control bg-brand-900 text-text-inverse">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-title-card text-text-primary">{company.name}</h3>
                  <p className="mt-1 text-metadata text-text-secondary">
                    {company.segment} · {company.city}/{company.state}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
