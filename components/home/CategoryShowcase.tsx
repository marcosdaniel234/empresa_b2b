import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ASSETS, CATEGORY_LABELS, Category } from "@/lib/data";
import { assetPhoto } from "@/lib/images";
import { ImageSlot } from "@/components/ui/ImageSlot";

/** Foto de capa e linha de apoio de cada categoria — sempre de um lote real do catálogo. */
const CAPAS: Record<Category, { slug: string; linha: string }> = {
  maquinas: { slug: "empilhadeira-gas-3t", linha: "Movimentação, energia, usinagem e envase" },
  veiculos: { slug: "cavalo-mecanico-6x2", linha: "Caminhões, furgões, implementos e frota leve" },
  tecnologia: { slug: "servidores-rack-42u", linha: "Servidores, redes, notebooks e impressão" },
  mobiliario: { slug: "mobiliario-corporativo-sala-reuniao", linha: "Salas de reunião, assentos e bancadas" },
};

const CATEGORIES = Object.keys(CAPAS) as Category[];

function disponiveis(c: Category) {
  return ASSETS.filter(
    (a) => a.category === c && a.status !== "cancelado" && !a.status.startsWith("encerrado"),
  ).length;
}

export function CategoryShowcase() {
  return (
    <section aria-labelledby="titulo-categorias" className="py-16 lg:py-24">
      <div className="container-content">
        <div className="section-heading" data-reveal>
          <div className="flex items-start gap-5 sm:gap-8">
            <span className="section-index mt-2 sm:mt-3">03</span>
            <div>
              <h2 id="titulo-categorias" className="section-title">
                Navegue por categoria
              </h2>
              <p className="mt-2 text-[17px] text-text-secondary">
                Quatro frentes do catálogo, com os lotes disponíveis em cada uma.
              </p>
            </div>
          </div>
          <Link href="/resultados" className="text-link text-[15px] font-medium">
            Ver catálogo completo <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => {
            const total = disponiveis(c);
            return (
              <li key={c} data-reveal={String(i + 1)}>
                <Link
                  href={`/resultados?categoria=${c}`}
                  className="card-lift group relative block overflow-hidden rounded-card bg-brand-900"
                >
                  <ImageSlot
                    src={assetPhoto(CAPAS[c].slug)}
                    ratio="aspect-[4/5] sm:aspect-[3/4]"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/55 to-transparent"
                  />
                  <span className="on-dark absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                    <span>
                      <span className="block text-[13px] font-semibold uppercase tracking-[.2em] text-accent-bright">
                        {total} {total === 1 ? "lote" : "lotes"}
                      </span>
                      <span className="mt-1.5 block text-[21px] font-extrabold leading-tight tracking-[-.02em] text-white">
                        {CATEGORY_LABELS[c]}
                      </span>
                      <span className="mt-1.5 block text-[14px] leading-snug text-white/75">
                        {CAPAS[c].linha}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-standard group-hover:border-accent-bright group-hover:bg-accent-bright group-hover:text-brand-900"
                    >
                      <ArrowRight size={18} />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
