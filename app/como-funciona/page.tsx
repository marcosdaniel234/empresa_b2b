import Link from "next/link";
import { Search, ClipboardCheck, Gavel, CheckCircle2, PackageCheck, ShieldAlert } from "lucide-react";

export const metadata = { title: "Como funciona" };

const STEPS = [
  {
    icon: Search,
    title: "Buscar",
    description: "Encontre ativos por categoria, localização ou faixa de valor no catálogo público.",
  },
  {
    icon: ClipboardCheck,
    title: "Analisar",
    description: "Veja ficha técnica, condição, avarias, documentos disponíveis e condições de retirada.",
  },
  {
    icon: Gavel,
    title: "Revisar e confirmar",
    description: "Revise o valor proposto antes de enviar. Nenhum lance é enviado sem confirmação explícita.",
  },
  {
    icon: CheckCircle2,
    title: "Acompanhar o resultado",
    description: "Acompanhe se seu lance segue liderando até o encerramento oficial do leilão.",
  },
  {
    icon: PackageCheck,
    title: "Fechamento",
    description: "Vencedor e vendedor seguem as etapas de documentação, pagamento e retirada combinadas.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="container-content py-8 md:py-10">
      <h1 className="text-title-page-mobile text-text-primary md:text-title-page">Como funciona</h1>
      <p className="mt-3 max-w-2xl text-body text-text-secondary">
        O ATIVOS B2B conecta empresas que precisam vender ativos corporativos — máquinas, veículos, tecnologia e
        mobiliário — com empresas interessadas em comprá-los por leilão.
      </p>

      <ol className="mt-10 space-y-6">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4 rounded-card border border-border-subtle bg-surface-card p-5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-900 text-text-inverse">
              <step.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-caption font-medium uppercase tracking-wide text-text-secondary">
                Etapa {i + 1}
              </span>
              <h2 className="text-title-card text-text-primary">{step.title}</h2>
              <p className="mt-1 text-metadata text-text-secondary">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex gap-3 rounded-card border border-border-subtle bg-surface-subtle p-5">
        <ShieldAlert className="h-5 w-5 flex-shrink-0 text-warning-text" aria-hidden="true" />
        <div>
          <h2 className="text-title-card text-text-primary">O que este MVP ainda não faz</h2>
          <p className="mt-1 max-w-2xl text-metadata text-text-secondary">
            Esta versão de demonstração não possui autenticação, habilitação de empresas, pagamento, verificação de
            identidade nem lances processados por um servidor real. O fluxo de revisão de lance é um protótipo de
            interface. Veja o roteiro completo no README do repositório.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Link href="/resultados" className="text-label font-medium text-action hover:underline">
          Explorar ativos disponíveis →
        </Link>
      </div>
    </div>
  );
}
