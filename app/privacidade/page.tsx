import { PageIntro } from "@/components/layout/PageIntro";

export const metadata = { title: "Privacidade" };

export default function PrivacidadePage() {
  return (
    <>
      <PageIntro crumbs={[{ label: "Privacidade" }]} title="Privacidade" />
      <div className="container-content py-8 lg:py-12">
        <div className="panel max-w-2xl p-5 sm:p-7">
          <p className="mt-3 text-body text-text-secondary">
            Esta demonstração não solicita cadastro, documentos ou dados de
            pagamento. Os favoritos são guardados neste navegador e podem ser
            removidos pelo coração de cada lote ou pela limpeza dos dados do
            site. Os termos da busca aparecem no endereço da página e podem
            constar no histórico do navegador e nos registros da hospedagem.
          </p>
          <p className="mt-3 text-body text-text-secondary">
            A política completa de privacidade será apresentada antes da
            abertura de contas empresariais. Evite incluir informações pessoais
            ou confidenciais nas buscas.
          </p>
        </div>
      </div>
    </>
  );
}
