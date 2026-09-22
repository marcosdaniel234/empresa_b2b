import Link from "next/link";
import { ArrowRight, Bell, Heart, Scale } from "lucide-react";
import { ImageSlot } from "@/components/ui/ImageSlot";

const RECURSOS = [
  {
    icon: Heart,
    label: "Favoritar lotes",
    hint: "a lista fica salva neste navegador",
  },
  {
    icon: Scale,
    label: "Comparar até quatro",
    hint: "ficha técnica lado a lado",
  },
  {
    icon: Bell,
    label: "Acompanhar prazos",
    hint: "contagem regressiva por lote",
  },
];

/**
 * Faixa de fechamento da home. Em vez de prometer o que a demonstração não
 * entrega, ela nomeia os três recursos que já funcionam de verdade no
 * protótipo e leva para a página que explica o limite atual do cadastro.
 */
export function AccountCta() {
  return (
    <section className="border-t border-border-subtle bg-white">
      <div className="container-content grid gap-6 py-8 md:grid-cols-2 md:items-center md:py-10">
        <div>
          <h2 className="text-title-page-mobile text-text-primary md:text-title-page">
            Acompanhe os lotes que interessam
          </h2>
          <p className="mt-2 max-w-lg text-body text-text-secondary">
            Marque favoritos, compare fichas técnicas lado a lado e veja o prazo
            de cada leilão em um só lugar.
          </p>

          <ul className="mt-4 space-y-2">
            {RECURSOS.map((recurso) => (
              <li key={recurso.label} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-control border border-border-subtle bg-surface-subtle text-action"
                >
                  <recurso.icon size={14} />
                </span>
                <span className="text-metadata text-text-secondary">
                  <strong className="font-semibold text-text-primary">
                    {recurso.label}
                  </strong>{" "}
                  — {recurso.hint}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/entrar"
            className="group mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-brand-900 px-5 text-label font-bold text-white transition-[background-color,transform] duration-standard ease-standard hover:bg-brand-800 active:translate-y-px"
          >
            Criar uma conta
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-standard ease-standard group-hover:translate-x-1"
            />
          </Link>
          <p className="mt-2 text-caption text-text-muted">
            O cadastro ainda não está implementado nesta demonstração.
          </p>
        </div>

        <ImageSlot
          ratio="aspect-[16/10]"
          label="Imagem institucional"
          size="lg"
          className="w-full"
        />
      </div>
    </section>
  );
}
