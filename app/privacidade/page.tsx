export const metadata = { title: "Privacidade" };

export default function PrivacidadePage() {
  return (
    <div className="container-content max-w-2xl py-12 md:py-16">
      <h1 className="text-title-page-mobile text-text-primary md:text-title-page">
        Privacidade
      </h1>
      <p className="mt-4 text-body text-text-secondary">
        Esta demonstração não solicita cadastro, documentos ou dados de
        pagamento. Os favoritos são guardados neste navegador e podem ser
        removidos pelo coração de cada ativo ou pela limpeza dos dados do site.
        Os termos da busca aparecem no endereço da página e podem constar no
        histórico do navegador e nos registros da hospedagem.
      </p>
      <p className="mt-4 text-body text-text-secondary">
        A política completa de privacidade será apresentada antes da abertura de
        contas empresariais. Evite incluir informações pessoais ou confidenciais
        nas buscas.
      </p>
    </div>
  );
}

