import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Factory,
  Truck,
  Server,
  Armchair,
  MoveRight,
} from "lucide-react";
import { AssetCard } from "@/components/catalog/AssetCard";
import { AssetVisual } from "@/components/ui/AssetVisual";
import { PersonalShelf } from "@/components/catalog/PersonalShelf";
import {
  ASSETS,
  CATEGORY_LABELS,
  COMPANIES,
  Category,
  getClosingSoon,
} from "@/lib/data";

const CATEGORIES: { id: Category; icon: typeof Factory; note: string }[] = [
  { id: "maquinas", icon: Factory, note: "Para sua próxima operação" },
  { id: "veiculos", icon: Truck, note: "Novos caminhos para sua frota" },
  { id: "tecnologia", icon: Server, note: "Equipamentos para sua equipe" },
  { id: "mobiliario", icon: Armchair, note: "Espaço para trabalhar melhor" },
];

export default function HomePage() {
  return (
    <div>
      <section className="container-content py-8 md:py-12">
        <div className="hero-layout overflow-hidden rounded-[24px] bg-[#E9EEE7]">
          <div className="px-6 py-10 md:px-10 lg:py-14">
            <p className="eyebrow flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-action" /> NEGÓCIOS
              ENTRE EMPRESAS
            </p>
            <h1 className="mt-5 max-w-xl text-[36px] font-semibold leading-[1.12] tracking-[-.045em] sm:text-[44px] lg:text-[54px]">
              Um novo destino
              <br />
              para bons <span className="text-action">ativos.</span>
            </h1>
            <p className="mt-5 max-w-md text-body leading-7 text-text-secondary">
              Encontre equipamentos para sua empresa e dê espaço ao próximo
              ciclo do seu negócio.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link href="/resultados" className="primary-link">
                Explorar leilões <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/como-funciona" className="text-link">
                Como funciona <MoveRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <a
              href="#categorias"
              className="mt-9 inline-flex items-center gap-2 text-metadata text-text-secondary"
            >
              <ArrowDown size={15} aria-hidden="true" /> Encontre a sua
              categoria
            </a>
          </div>
          <div className="relative flex min-h-[280px] items-center bg-[#E3E7DD] p-6 md:p-8">
            <div className="relative w-full overflow-hidden rounded-card border border-white/70 bg-white/55 p-3 shadow-elevated">
              <div className="flex items-center justify-between px-2 py-2 text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
                <span>Em destaque</span>
                <span>Máquinas</span>
              </div>
              <AssetVisual
                category="maquinas"
                className="aspect-[4/3] w-full"
              />
              <div className="flex items-center justify-between gap-4 px-2 pb-2 pt-4">
                <div>
                  <p className="text-label font-semibold">
                    Equipamentos industriais
                  </p>
                  <p className="mt-1 text-metadata text-text-secondary">
                    Confira os lotes disponíveis
                  </p>
                </div>
                <Link
                  href="/resultados?categoria=maquinas"
                  aria-label="Explorar equipamentos industriais"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-900 text-white"
                >
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="categorias" className="container-content scroll-mt-40 pb-12">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-title-section">O que sua empresa precisa?</h2>
          <span className="text-metadata text-text-secondary">
            Escolha por categoria
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {CATEGORIES.map(({ id, icon: Icon, note }) => (
            <Link
              href={`/resultados?categoria=${id}`}
              key={id}
              className="category-tile group"
            >
              <div className="flex items-center justify-between">
                <Icon
                  className="h-6 w-6 text-action"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <ArrowUpRight
                  size={16}
                  className="text-text-secondary group-hover:text-action"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-5 text-title-card">{CATEGORY_LABELS[id]}</h3>
              <p className="mt-1 text-metadata text-text-secondary">{note}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="container-content border-t border-border-subtle py-10">
        <div className="section-heading">
          <div>
            <p className="eyebrow mb-2">DE OLHO NO PRAZO</p>
            <h2 className="text-title-section">Próximos encerramentos</h2>
            <p className="mt-2 text-metadata text-text-secondary">
              Confira os detalhes e as condições de cada lote.
            </p>
          </div>
          <Link
            href="/resultados?sort=encerrando&status=aberto"
            className="text-link"
          >
            Ver todos <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {getClosingSoon(4).map((asset, i) => (
            <AssetCard key={asset.id} asset={asset} index={i} />
          ))}
        </div>
      </section>
      <PersonalShelf assets={ASSETS} />
      <section className="container-content py-12">
        <div className="section-heading">
          <div>
            <p className="eyebrow mb-2">CONHEÇA QUEM ANUNCIA</p>
            <h2 className="text-title-section">Empresas do catálogo</h2>
          </div>
          <span className="text-metadata text-text-secondary">
            Perfis demonstrativos
          </span>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {COMPANIES.slice(0, 3).map((company, i) => (
            <Link
              href={`/loja/${company.slug}`}
              key={company.slug}
              className="group flex items-start gap-4 rounded-card border bg-white p-5 transition-colors hover:border-action"
            >
              <span className={`company-monogram company-tone-${i}`}>
                {company.name.slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0">
                <h3 className="text-label font-semibold group-hover:text-action">
                  {company.name}
                </h3>
                <p className="mt-1 text-metadata text-text-secondary">
                  {company.city} · {company.state}
                </p>
                <p className="mt-3 text-caption text-text-secondary">
                  {company.segment}
                </p>
              </div>
              <ArrowUpRight
                size={17}
                className="ml-auto shrink-0 text-action"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="container-content pb-8">
        <div className="flex flex-col gap-6 rounded-[20px] bg-brand-900 p-7 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="text-caption font-semibold uppercase tracking-widest text-accent-soft">
              PARA QUEM VENDE
            </p>
            <h2 className="mt-3 text-title-section">
              O que já cumpriu seu papel pode fazer parte de outro negócio.
            </h2>
            <p className="mt-3 max-w-xl text-metadata text-white/80">
              Veja o que preparar para anunciar os ativos da sua empresa.
            </p>
          </div>
          <Link
            href="/anunciar"
            className="on-dark inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-control bg-accent-soft px-5 text-label font-semibold text-brand-900"
          >
            Preparar meu anúncio <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
