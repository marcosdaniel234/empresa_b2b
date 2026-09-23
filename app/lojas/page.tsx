import type { Metadata } from "next";
import { ASSETS, COMPANIES } from "@/lib/data";
import { Contours } from "@/components/brand/Contours";
import { StoreDirectory, StoreEntry } from "@/components/catalog/StoreDirectory";

export const metadata: Metadata = {
  title: "Lojas",
  description:
    "As empresas que anunciam na ATIVOS B2B: segmento, cidade e os ativos disponíveis de cada loja.",
};

function entradas(): StoreEntry[] {
  return COMPANIES.map((company) => {
    const lotes = ASSETS.filter(
      (a) =>
        a.companySlug === company.slug &&
        a.status !== "cancelado" &&
        !a.status.startsWith("encerrado"),
    );
    return {
      company,
      disponiveis: lotes.length,
      fotos: lotes.slice(0, 3).map((a) => ({ slug: a.slug, title: a.title })),
    };
  }).sort(
    (a, b) =>
      b.disponiveis - a.disponiveis ||
      a.company.name.localeCompare(b.company.name, "pt-BR"),
  );
}

export default function LojasPage() {
  const lista = entradas();
  return (
    <>
      <section className="on-dark relative overflow-hidden bg-brand-900 py-12 text-white lg:py-16">
        <Contours className="opacity-80" />
        <div className="container-content relative">
          <p className="kicker-on-dark animate-rise">Lojas</p>
          <h1
            className="mt-4 max-w-3xl animate-rise text-[36px] font-extrabold leading-[1.05] tracking-[-.035em] sm:text-[48px]"
            style={{ animationDelay: "100ms" }}
          >
            Empresas que movimentam o mercado.
          </h1>
          <p
            className="mt-4 max-w-2xl animate-rise text-[17px] leading-relaxed text-white/75"
            style={{ animationDelay: "180ms" }}
          >
            {lista.length} empresas com loja no catálogo de demonstração. Siga as que
            interessam para encontrá-las depois, neste navegador.
          </p>
        </div>
      </section>
      <div className="container-content py-10 lg:py-14">
        <StoreDirectory entries={lista} />
      </div>
    </>
  );
}
