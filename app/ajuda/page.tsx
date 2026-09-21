import Link from "next/link";

export const metadata = { title: "Central de ajuda" };
const questions = [
  [
    "Posso comprar ou vender nesta versão?",
    "Ainda não. Este é um catálogo demonstrativo, com empresas, ativos e valores fictícios. A simulação de lance não gera compra, cobrança ou reserva.",
  ],
  [
    "Como encontro um ativo?",
    "Busque pelo nome, categoria, empresa ou cidade. Nos resultados, refine por categoria, localização, situação e faixa de valor. Você também pode ordenar os ativos pelo valor ou encerramento.",
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
    <div className="container-content max-w-3xl py-12 md:py-16">
      <p className="eyebrow">PODEMOS AJUDAR</p>
      <h1 className="mt-3 text-title-page-mobile md:text-title-page">
        Dúvidas, sem complicação.
      </h1>
      <p className="mt-4 text-body text-text-secondary">
        Entenda o catálogo e experimente os recursos com tranquilidade.
      </p>
      <div className="mt-8 divide-y divide-border-subtle rounded-card border border-border-subtle bg-white px-5 sm:px-7">
        {questions.map(([question, answer]) => (
          <details key={question} className="group py-5">
            <summary className="cursor-pointer py-2 text-body font-semibold marker:text-action">
              {question}
            </summary>
            <p className="mt-3 pb-2 text-body text-text-secondary">{answer}</p>
          </details>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/como-funciona" className="primary-link">
          Conhecer a experiência
        </Link>
        <Link href="/resultados" className="text-link">
          Explorar os ativos
        </Link>
      </div>
    </div>
  );
}

