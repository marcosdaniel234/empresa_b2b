import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStateCounts } from "@/lib/data";

/**
 * Compra por estado. A retirada de ativo pesado é sempre por conta do
 * comprador, então a distância pesa tanto quanto o preço.
 *
 * Cada cartão traz a bandeira da unidade federativa, a sigla e a oferta do
 * estado.
 */
export function StateStrip() {
  const estados = getStateCounts();
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
              <img
                src={`${base}/images/states/${estado.uf.toLowerCase()}.svg`}
                alt=""
                aria-hidden="true"
                className="h-10 w-16 rounded-[3px] border border-border-subtle object-cover"
              />
              <span className="text-label font-extrabold tracking-[.04em] text-text-primary transition-colors duration-standard ease-standard group-hover:text-action">
                {estado.uf}
              </span>
              <span className="text-center text-caption text-text-secondary">
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
