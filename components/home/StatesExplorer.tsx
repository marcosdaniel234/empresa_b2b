import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStateCounts } from "@/lib/data";
import { BRAZIL_STATES, BRAZIL_VIEWBOX } from "@/lib/brazilMap";
import { Backdrop } from "@/components/brand/Backdrop";
import { StateFlag } from "@/components/brand/StateFlag";

const destino = (uf: string) => `/resultados?uf=${uf}`;

/**
 * "Ativos em todo o Brasil": o mapa e as bandeiras levam ao catálogo filtrado
 * pela UF. Os dois lados conversam — passar o ponteiro (ou o foco) numa
 * bandeira acende o estado no mapa, e vice-versa — só com CSS (`:has`), sem
 * JavaScript. O tom de cada estado acompanha quantos lotes ele tem.
 */
export function StatesExplorer() {
  const counts = getStateCounts();
  const total = new Map(counts.map((c) => [c.uf, c.total]));
  const max = Math.max(...counts.map((c) => c.total));

  // Regras de destaque cruzado, uma por UF com lote.
  const css = counts
    .map(
      ({ uf }) =>
        `.estados:has([data-flag="${uf}"]:is(:hover,:focus-visible)) [data-map="${uf}"]{fill:#B4EBE4;fill-opacity:1}` +
        `.estados:has([data-map-link="${uf}"]:is(:hover,:focus-visible)) [data-flag="${uf}"]{border-color:rgba(127,207,198,.7);background:rgba(255,255,255,.09)}`,
    )
    .join("");

  return (
    <section
      aria-labelledby="titulo-estados"
      className="estados on-dark relative overflow-hidden bg-brand-900 py-16 lg:py-24"
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Backdrop />

      <div className="container-content relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <div className="flex items-start gap-5 sm:gap-8" data-reveal>
            <span className="section-index mt-2 text-accent-bright sm:mt-3">02</span>
            <div>
              <h2 id="titulo-estados" className="section-title text-white">
                Ativos em todo o Brasil
              </h2>
              <p className="mt-3 text-[19px] font-bold text-accent-bright">
                Encontre oportunidades perto da sua operação.
              </p>
              <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/75">
                Escolha um estado para ver os lotes com retirada nele. Frete pesa no custo
                final — comprar perto também é economia.
              </p>
            </div>
          </div>

          <ul className="mt-9 grid grid-cols-2 gap-2 sm:gap-2.5" aria-label="Lotes por estado">
            {counts.map(({ uf, name, total: n }, i) => (
              <li key={uf} data-reveal={String(Math.min(i + 1, 6))}>
                <Link
                  href={destino(uf)}
                  data-flag={uf}
                  className="group flex min-h-[60px] items-center gap-2.5 rounded-control border border-white/10 bg-white/[.04] px-2.5 py-2.5 sm:gap-3.5 sm:px-3.5 transition-[background-color,border-color] duration-standard hover:border-accent-bright/70 hover:bg-white/[.09]"
                >
                  <StateFlag uf={uf} className="w-9 sm:w-11" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold text-white sm:text-[15px]">
                      {name}
                    </span>
                    <span className="block text-[13px] text-white/60">
                      {uf} · {n} {n === 1 ? "lote" : "lotes"}
                    </span>
                  </span>
                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                    className="hidden shrink-0 text-accent-bright transition-transform duration-standard group-hover:translate-x-1 sm:block"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative mx-auto w-full max-w-[380px] sm:max-w-[520px]" data-reveal="2">
          <svg
            viewBox={BRAZIL_VIEWBOX}
            className="h-auto w-full overflow-visible"
            aria-label="Mapa do Brasil com os estados que têm lotes no catálogo"
          >
            {BRAZIL_STATES.filter((s) => !total.has(s.uf)).map((s) => (
              <path
                key={s.uf}
                d={s.d}
                fill="#fff"
                fillOpacity={0.06}
                stroke="#fff"
                strokeOpacity={0.2}
                strokeWidth={0.8}
                strokeLinejoin="round"
                aria-hidden="true"
              />
            ))}
            {BRAZIL_STATES.filter((s) => total.has(s.uf)).map((s) => {
              const n = total.get(s.uf)!;
              return (
                <Link
                  key={s.uf}
                  href={destino(s.uf)}
                  data-map-link={s.uf}
                  aria-label={`${s.name}: ${n} ${n === 1 ? "lote" : "lotes"}`}
                  className="uf-link"
                >
                  <path
                    d={s.d}
                    data-map={s.uf}
                    className="uf-ativo"
                    fill="#4FB3AA"
                    fillOpacity={0.38 + 0.5 * (n / max)}
                    stroke="#0B1D2A"
                    strokeWidth={1}
                    strokeLinejoin="round"
                  />
                </Link>
              );
            })}
            {BRAZIL_STATES.filter((s) => total.has(s.uf)).map((s) => (
              <g key={s.uf} aria-hidden="true" className="pointer-events-none">
                <circle cx={s.x} cy={s.y} r={11} fill="#EEF3F4" />
                <text
                  x={s.x}
                  y={s.y}
                  dy="0.35em"
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={800}
                  fill="#0E4A6E"
                >
                  {total.get(s.uf)}
                </text>
              </g>
            ))}
          </svg>
          <figcaption className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-white/65">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="h-3 w-3 rounded-[3px] bg-accent-bright/80" />
              Estado com lotes (número no marcador)
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="h-3 w-3 rounded-[3px] border border-white/25 bg-white/5" />
              Sem lotes no momento
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
