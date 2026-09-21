export const metadata = { title: "Termos de uso" };

export default function TermosPage() {
  return (
    <div className="container-content max-w-2xl py-12 md:py-16">
      <h1 className="text-title-page-mobile text-text-primary md:text-title-page">
        Termos de uso
      </h1>
      <p className="mt-4 text-body text-text-secondary">
        Esta é uma versão de demonstração. Os termos de uso, condições de
        participação em leilões, regras de elegibilidade e política de disputas
        ainda não foram redigidos nem aprovados. Nenhum conteúdo desta página
        deve ser interpretado como um contrato vigente.
      </p>
      <p className="mt-4 text-body text-text-secondary">
        As condições definitivas serão publicadas antes da abertura de
        transações reais. Nesta demonstração, você pode navegar e experimentar a
        revisão de um lance sem compromisso de compra.
      </p>
    </div>
  );
}
