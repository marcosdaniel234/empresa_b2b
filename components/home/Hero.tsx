import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  MapPin,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  ASSETS,
  getClosingSoon,
  getCompanyBySlug,
  getStateCounts,
} from "@/lib/data";
import { formatCurrencyFull } from "@/lib/format";
import { CountdownClock } from "@/components/auction/CountdownClock";
import { FavoriteButton } from "@/components/catalog/FavoriteButton";
import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Abertura em duas colunas sobre o marinho: à esquerda a promessa da
 * plataforma, à direita o lote que encerra primeiro, com contagem regressiva.
 *
 * As três garantias do rodapé da abertura descrevem o que o catálogo entrega
 * de fato — ficha, identificação do vendedor e alcance — e não um selo de
 * verificação, que esta demonstração não tem como emitir.
 */
export function Hero() {
  const destaque = getClosingSoon(1)[0];
  const empresa = destaque ? getCompanyBySlug(destaque.companySlug) : undefined;
  const estados = getStateCounts().length;
  const abertos = ASSETS.filter(
    (a) => a.status === "aberto" || a.status === "encerrando",
  ).length;

  const garantias = [
    {
      icon: ClipboardList,
      label: "Ficha técnica completa",
      hint: "Ano, uso e estado declarados",
    },
    {
      icon: ShieldCheck,
      label: "Empresas identificadas",
      hint: "Razão social e localização à vista",
    },
    {
      icon: Truck,
      label: "Ativos em todo o Brasil",
      hint: `Lotes em ${estados} estados`,
    },
  ];

  return (
    <section className="on-dark bg-brand-900">
      <div className="container-content grid gap-0 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="relative flex min-w-0 flex-col py-10 lg:py-14 lg:pr-10">
          <p
            aria-hidden="true"
            className="absolute right-0 top-10 hidden text-micro font-bold uppercase leading-5 tracking-[.2em] text-white/45 xl:block"
          >
            Equipamentos
            <br />
            que constroem
            <br />
            novos ciclos
            <span className="mt-2 block h-[3px] w-8 bg-action-bright" />
          </p>

          <span className="kicker-on-dark">Ativos que movem o seu negócio</span>

          <h1 className="mt-5 max-w-xl text-[36px] font-extrabold leading-[1.08] tracking-[-.025em] text-white sm:text-[46px] lg:text-[54px]">
            Encontre ativos empresariais{" "}
            <span className="text-action-bright">com procedência</span>
          </h1>

          <p className="mt-5 max-w-lg text-body leading-7 text-white/75">
            Máquinas, veículos, tecnologia, mobiliário e muito mais. São{" "}
            {abertos} lotes abertos de empresas reais, com prazo e endereço de
            retirada declarados.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/resultados" className="primary-link group">
              Explorar lotes
              <ArrowRight
                size={17}
                aria-hidden="true"
                className="transition-transform duration-standard ease-standard group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/anunciar"
              className="inline-flex min-h-11 items-center justify-center rounded-control border border-white/40 px-5 text-label font-bold text-white transition-colors duration-standard ease-standard hover:border-white hover:bg-white/10"
            >
              Publicar ativos
            </Link>
          </div>

          <ul className="mt-9 grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-3">
            {garantias.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-white/20 text-white"
                >
                  <item.icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-label font-bold text-white">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-caption leading-4 text-white/60">
                    {item.hint}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Painel do lote que encerra primeiro. */}
        {destaque && (
          <div className="min-w-0 bg-brand-800 px-5 py-8 lg:px-7 lg:py-10">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-title-card font-bold text-white">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-emerald-400"
                />
                Leilões em destaque
              </h2>
              <Link
                href="/leiloes"
                className="inline-flex items-center gap-1 text-caption font-semibold text-white/70 transition-colors duration-quick hover:text-white"
              >
                Ver todos <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>

            <article className="card-lift group relative mt-4 overflow-hidden rounded-card bg-white">
              <div className="relative">
                <ImageSlot
                  ratio="aspect-[16/9]"
                  src={`/images/assets/${destaque.slug}.png`}
                  className="w-full rounded-none border-0"
                />
                <span className="absolute left-3 top-3 flex items-center gap-2">
                  <span className="status-pill bg-action text-white">
                    Encerrando em breve
                  </span>
                  <span className="inline-flex items-center rounded-full bg-brand-900/85 px-2.5 py-1 text-micro font-bold text-white tabular">
                    <CountdownClock deadlineIso={destaque.deadlineIso} />
                  </span>
                </span>
                <FavoriteButton
                  slug={destaque.slug}
                  title={destaque.title}
                  className="absolute right-3 top-3 z-10"
                />
              </div>

              <div className="p-4">
                <h3 className="text-[17px] font-extrabold leading-6 text-text-primary">
                  <Link
                    href={`/leilao/${destaque.slug}`}
                    className="after:absolute after:inset-0 after:content-[''] hover:text-action"
                  >
                    {destaque.title}
                  </Link>
                </h3>
                <p className="mt-1 text-caption font-bold uppercase tracking-[.06em] text-text-muted">
                  Lote {destaque.lot}
                </p>
                <p className="mt-1.5 flex items-center gap-1 text-metadata text-text-secondary">
                  <MapPin size={14} aria-hidden="true" className="text-action" />
                  {destaque.state} – {destaque.city}
                  {empresa && (
                    <span className="truncate text-text-muted">
                      · {empresa.name}
                    </span>
                  )}
                </p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {destaque.specs.slice(0, 3).map((spec) => (
                    <li key={spec.label} className="spec-pill">
                      {spec.value}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <span className="block text-caption text-text-muted">
                      {destaque.currentBid !== null
                        ? "Lance atual"
                        : "Lance inicial"}
                    </span>
                    <span className="text-[24px] font-extrabold leading-8 text-action tabular">
                      {formatCurrencyFull(
                        destaque.currentBid ?? destaque.startingBid,
                      )}
                    </span>
                  </div>
                  <span className="primary-link relative z-10 min-h-10 px-4">
                    Ver lote
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform duration-standard ease-standard group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
