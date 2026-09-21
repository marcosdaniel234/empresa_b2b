export const metadata = { title: "Privacidade" };

export default function PrivacidadePage() {
  return (
    <div className="container-content max-w-2xl py-12 md:py-16">
      <h1 className="text-title-page-mobile text-text-primary md:text-title-page">Privacidade</h1>
      <p className="mt-4 text-body text-text-secondary">
        Este MVP de demonstração não coleta, armazena ou processa dados pessoais em servidor: não há cadastro,
        autenticação nem envio de formulários a um backend. A única informação salva é a lista de favoritos, mantida
        localmente no seu navegador (localStorage), que você pode apagar limpando os dados do site.
      </p>
      <p className="mt-4 text-body text-text-secondary">
        Uma política de privacidade completa, cobrindo dados de empresas, membros e transações, será redigida antes
        de qualquer versão com contas reais — ver roteiro no README do repositório.
      </p>
    </div>
  );
}
