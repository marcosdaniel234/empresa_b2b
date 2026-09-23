import { PageIntro } from "@/components/layout/PageIntro";

export const metadata = { title: "Termos de uso" };

export default function TermosPage() {
  return (
    <>
      <PageIntro crumbs={[{ label: "Termos de uso" }]} title="Termos de uso" />
      <div className="container-content py-8 lg:py-12">
        <div className="panel max-w-2xl p-5 sm:p-7">
          <p className="mt-3 text-body text-text-secondary">
            Esta é uma versão de demonstração. Os termos de uso, condições de
            participação em leilões, regras de elegibilidade e política de
            disputas ainda não foram redigidos nem aprovados. Nenhum conteúdo
            desta página deve ser interpretado como um contrato vigente.
          </p>
          <p className="mt-3 text-body text-text-secondary">
            As condições definitivas serão publicadas antes da abertura de
            transações reais. Nesta demonstração, você pode navegar e
            experimentar a revisão de um lance sem compromisso de compra.
          </p>
        </div>
      </div>
    </>
  );
}
