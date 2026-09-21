import Link from "next/link";

export const metadata = { title: "Termos de uso" };

export default function TermosPage() {
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
        <span>Termos de uso</span>
      </nav>

      <div className="panel mt-2 max-w-2xl p-5 sm:p-6">
        <h1 className="text-title-page-mobile text-text-primary md:text-title-page">
          Termos de uso
        </h1>
        <p className="mt-3 text-body text-text-secondary">
          Esta é uma versão de demonstração. Os termos de uso, condições de
          participação em leilões, regras de elegibilidade e política de
          disputas ainda não foram redigidos nem aprovados. Nenhum conteúdo
          desta página deve ser interpretado como um contrato vigente.
        </p>
        <p className="mt-3 text-body text-text-secondary">
          As condições definitivas serão publicadas antes da abertura de
          transações reais. Nesta demonstração, você pode navegar e experimentar
          a revisão de um lance sem compromisso de compra.
        </p>
      </div>
    </div>
  );
}
