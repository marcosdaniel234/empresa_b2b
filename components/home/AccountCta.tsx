import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Faixa de fechamento da home. Em vez de prometer o que a demonstração não
 * entrega, ela apresenta os recursos disponíveis e leva para a página que
 * explica o limite atual do cadastro.
 */
export function AccountCta() {
  return (
    <section className="border-t border-border-subtle bg-white">
      <div className="container-content grid gap-6 py-8 md:grid-cols-2 md:items-center md:py-10">
        <div>
          <h2 className="text-title-page-mobile text-text-primary md:text-title-page">
            Acompanhe os lotes que interessam
          </h2>
          <p className="mt-2 max-w-xl text-[17px] leading-7 text-text-secondary md:text-lg md:leading-8">
            Marque favoritos, compare fichas técnicas lado a lado e veja o prazo
            de cada leilão em um só lugar.
          </p>

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
          src="/images/institutional/acompanhamento-lotes.png"
          ratio="aspect-[16/10]"
          label="Imagem institucional"
          size="lg"
          className="w-full"
        />
      </div>
    </section>
  );
}
