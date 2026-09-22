import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ImageSlot } from "@/components/ui/ImageSlot";

const VANTAGENS = [
  "Processo simples e rápido",
  "Visibilidade em todo o Brasil",
  "Suporte especializado",
];

/** Faixa de conversão para quem vende, com a moldura de imagem ao centro. */
export function SellCta() {
  return (
    <section className="container-content pb-8 lg:pb-10">
      <div className="hero-fx on-dark grid overflow-hidden rounded-panel border border-white/10 shadow-float lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.8fr)_minmax(0,.9fr)]">
        <div className="min-w-0 p-6 lg:p-9">
          <span className="kicker-on-dark">
            Seu ativo alcança novos compradores
          </span>
          <h2 className="mt-4 text-[26px] font-extrabold leading-[1.15] tracking-[-.02em] text-white sm:text-[30px]">
            Sua empresa também pode{" "}
            <span className="text-action-bright">vender</span> com a{" "}
            <span className="whitespace-nowrap">
              ATIVOS <span className="text-action-bright">B2B</span>
            </span>
          </h2>
          <p className="mt-4 max-w-md text-metadata leading-6 text-white/70">
            Publique seus ativos, alcance compradores qualificados e transforme
            equipamentos ociosos em resultados.
          </p>
        </div>

        <ImageSlot
          ratio="aspect-[4/3] lg:aspect-auto lg:h-full"
          src="/images/institutional/acompanhamento-lotes.png"
          className="w-full rounded-none border-0"
        />

        <div className="flex min-w-0 flex-col justify-center gap-5 p-6 lg:p-9">
          <Link href="/anunciar" className="primary-link group w-full sm:w-auto">
            Publicar ativos
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-standard ease-standard group-hover:translate-x-1"
            />
          </Link>
          <ul className="space-y-2.5">
            {VANTAGENS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-metadata text-white/80"
              >
                <Check
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-action-bright"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
