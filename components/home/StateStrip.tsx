import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStateCounts } from "@/lib/data";

/**
 * Compra por estado. A retirada de ativo pesado é sempre por conta do
 * comprador, então a distância pesa tanto quanto o preço.
 *
 * No lugar da bandeira de cada unidade federativa entra a sigla em selo: o
 * catálogo não tem os arquivos das bandeiras, e desenhá-las de memória
 * produziria símbolos oficiais errados.
 */
export function StateStrip() {
  const estados = getStateCounts();

  return (
    <section
      aria-labelledby="titulo-estados"
      className="container-content py-8 lg:py-10"
    >
      <div className="section-heading">
        <h2 id="titulo-estados" className="section-title">
          Comprar por estado
        </h2>
        <Link href="/resultados" className="text-link">
          Ver todos os estados <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>

      <ul className="scroll-rail mt-4 gap-3">
        {estados.map((estado) => (
          <li key={estado.uf} className="shrink-0">
            <Link
              href={`/resultados?uf=${estado.uf}`}
              className="card-lift group flex w-[104px] flex-col items-center gap-2 rounded-card border border-border-subtle bg-white px-3 py-3"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-16 items-center justify-center rounded-control bg-brand-900 text-label font-extrabold tracking-[.04em] text-white transition-colors duration-standard ease-standard group-hover:bg-action"
              >
                {estado.uf}
              </span>
              <span className="text-center text-caption font-semibold text-text-primary">
                {estado.name}
              </span>
              <span className="text-caption text-text-muted tabular">
                {estado.total} {estado.total === 1 ? "lote" : "lotes"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
