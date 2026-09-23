import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Central de ajuda" };

const questions = [
  [
    "Posso comprar ou vender nesta versão?",
    "Ainda não. Este é um catálogo demonstrativo, com empresas, ativos e valores fictícios. A simulação de lance não gera compra, cobrança ou reserva.",
  ],
  [
    "Como encontro um ativo?",
    "Busque pelo nome, categoria, empresa ou cidade. Nos resultados, refine por categoria, localização, situação e faixa de valor. Você também pode ordenar os lotes pelo valor ou encerramento.",
  ],
  [
    "Onde ficam meus favoritos?",
    "Toque no coração do anúncio. Os favoritos ficam salvos neste navegador, sem conta. Eles não são sincronizados entre dispositivos e podem desaparecer se os dados do navegador forem apagados.",
  ],
  [
    "O que acontece quando simulo um lance?",
    "Você informa o valor, revisa os dados e confirma a simulação. Nada é enviado a uma empresa. O valor do catálogo não muda e não há disputa com outros participantes.",
  ],
  [
    "As imagens e documentos são reais?",
    "As imagens são ilustrações de categoria, não fotografias dos ativos. Os documentos listados são exemplos do que um anúncio poderia apresentar; não há arquivos disponíveis para baixar.",
  ],
  [
    "Há atendimento ou verificação de empresas?",
    "Ainda não há canal de atendimento, verificação cadastral ou análise de documentos nesta versão. Não envie dados pessoais nem faça pagamentos com base nos anúncios de demonstração.",
  ],
];

export default function AjudaPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Central de ajuda" }]}
        kicker="Central de ajuda"
        title="Perguntas frequentes"
      >
        Entenda o catálogo e experimente os recursos com tranquilidade.
      </PageIntro>
      <div className="container-content py-8 lg:py-12">
        <div className="max-w-3xl">
          <div className="panel mt-5 divide-y divide-border-subtle px-4 sm:px-5">
            {questions.map(([question, answer]) => (
              <details key={question} className="group py-1">
                <summary className="flex min-h-12 cursor-pointer items-center py-2 text-body font-semibold text-text-primary marker:text-action">
                  {question}
                </summary>
                <p className="pb-4 pt-1 text-metadata text-text-secondary">
                  {answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href="/como-funciona" className="primary-link">
              Como funciona
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/resultados" className="text-link">
              Explorar o catálogo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
