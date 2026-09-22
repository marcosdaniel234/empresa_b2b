import Link from "next/link";
import { getStateCounts } from "@/lib/data";

const FLAGS: Record<string, string> = {
  SP: "/images/states/sp.svg", PR: "/images/states/pr.svg", GO: "/images/states/go.svg",
  ES: "/images/states/es.svg", PE: "/images/states/pe.svg", RS: "/images/states/rs.svg",
  BA: "/images/states/ba.svg", MG: "/images/states/mg.svg", RJ: "/images/states/rj.svg", SC: "/images/states/sc.svg",
};

/**
 * Entrada geográfica do catálogo. Retirada de ativo pesado é sempre por conta
 * do comprador, então a distância costuma pesar tanto quanto o preço: a UF
 * merece um ponto de partida próprio, com a oferta de cada estado à vista.
 *
 * A sigla entra em um selo escuro no lugar de uma bandeira — para estado
 * brasileiro a sigla é o identificador que se lê de imediato.
 */
export function StateFinder() {
  const states = getStateCounts();
  const total = states.reduce((sum, state) => sum + state.total, 0);

  return (
    <section
      aria-labelledby="titulo-estados"
      className="border-y border-border-subtle bg-surface-subtle"
    >
      <div className="container-content py-7 text-center">
        <h2
          id="titulo-estados"
          className="text-title-section-mobile text-text-primary md:text-title-section"
        >
          Encontre lotes em:
        </h2>
        <p className="mt-1 text-metadata text-text-secondary">
          {total} lotes em {states.length} estados. A retirada é sempre no
          endereço declarado pelo vendedor.
        </p>

        <ul className="mx-auto mt-4 flex max-w-4xl flex-wrap justify-center gap-2">
          {states.map((state) => (
            <li key={state.uf}>
              <Link
                href={`/resultados?uf=${state.uf}`}
                className="group inline-flex min-h-11 items-center gap-2 rounded-control border border-border-strong bg-white px-3 text-label text-text-primary transition-[color,border-color,transform] duration-standard ease-standard hover:-translate-y-px hover:border-action hover:text-action"
              >
                {FLAGS[state.uf] ? (
                  <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${FLAGS[state.uf]}`} alt={`Bandeira de ${state.name}`} className="h-5 w-7 rounded-[2px] border border-black/10 object-cover" />
                ) : (
                  <span aria-hidden="true" className="inline-flex h-5 items-center rounded-[2px] bg-brand-900 px-1.5 text-micro font-bold text-white">{state.uf}</span>
                )}
                {state.name}
                <span className="text-caption text-text-muted tabular">
                  {state.total}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
