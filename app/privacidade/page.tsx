import Link from "next/link";

export const metadata = { title: "Privacidade" };

export default function PrivacidadePage() {
  return (
    <div className="container-content py-5 md:py-8">
      <nav
        aria-label="Trilha de navegação"
        className="text-caption text-text-secondary"
      >
        <Link href="/" className="hover:text-action hover:underline">
          Início
        </Link>
        <span aria-hidden="true"> / </span>
        <span>Privacidade</span>
      </nav>

      <div className="panel mt-2 max-w-2xl p-5 sm:p-6">
        <h1 className="text-title-page-mobile text-text-primary md:text-title-page">
          Privacidade
        </h1>
        <p className="mt-3 text-body text-text-secondary">
          Esta demonstração não solicita cadastro, documentos ou dados de
          pagamento. Os favoritos são guardados neste navegador e podem ser
          removidos pelo coração de cada lote ou pela limpeza dos dados do site.
          Os termos da busca aparecem no endereço da página e podem constar no
          histórico do navegador e nos registros da hospedagem.
        </p>
        <p className="mt-3 text-body text-text-secondary">
          A política completa de privacidade será apresentada antes da abertura
          de contas empresariais. Evite incluir informações pessoais ou
          confidenciais nas buscas.
        </p>
      </div>
    </div>
  );
}
