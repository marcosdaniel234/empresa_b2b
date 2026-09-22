import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Wordmark } from "@/components/layout/Header";

/** Faixa final: assinatura da marca e a última chamada para o catálogo. */
export function ClosingBand() {
  return (
    <section className="on-dark bg-brand-900">
      <div className="container-content flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
          <Wordmark />
          <p className="max-w-md text-metadata text-white/70">
            Ativos reais para empresas que fazem o Brasil acontecer.
          </p>
        </div>
        <Link href="/resultados" className="primary-link group shrink-0">
          Explorar todos os lotes
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-standard ease-standard group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
