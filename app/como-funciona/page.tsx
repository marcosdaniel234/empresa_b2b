import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import {
  ArrowRight,
  Search,
  ClipboardCheck,
  Gavel,
  CheckCircle2,
  PackageCheck,
  ShieldAlert,
} from "lucide-react";

export const metadata = { title: "Como funciona" };

const STEPS = [
  {
    icon: Search,
    title: "Buscar",
    description:
      "Encontre lotes por categoria, localização ou faixa de valor no catálogo público.",
  },
  {
    icon: ClipboardCheck,
    title: "Analisar",
    description:
      "Veja ficha técnica, condição, avarias, documentos previstos e condições de retirada.",
  },
  {
    icon: Gavel,
    title: "Revisar e confirmar",
    description:
      "Revise o valor proposto antes de enviar. Nenhum lance é enviado sem confirmação explícita.",
  },
  {
    icon: CheckCircle2,
    title: "Acompanhar o resultado",
    description:
      "Acompanhe se seu lance segue liderando até o encerramento oficial do leilão.",
  },
  {
    icon: PackageCheck,
    title: "Fechamento",
    description:
      "Vencedor e vendedor seguem as etapas de documentação, pagamento e retirada combinadas.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Como funciona" }]}
        kicker="Como funciona"
        title="Do catálogo ao negócio fechado, entre empresas."
      >
        Um catálogo onde empresas encontram equipamentos e anunciam os ativos
        que já cumpriram seu papel. Conheça a jornada prevista para participar
        de um leilão.
      </PageIntro>
      <div className="container-content py-8 lg:py-12">
        <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="panel flex gap-3 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-surface-subtle text-action">
                <step.icon size={18} aria-hidden="true" />
              </span>
              <div>
                <span className="text-micro font-semibold uppercase tracking-[.1em] text-text-secondary">
                  Etapa {i + 1}
                </span>
                <h2 className="text-title-card text-text-primary">
                  {step.title}
                </h2>
                <p className="mt-1 text-metadata text-text-secondary">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex gap-3 rounded-card border border-border-subtle bg-surface-subtle p-4">
          <ShieldAlert
            size={20}
            className="mt-0.5 shrink-0 text-warning-text"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-title-card text-text-primary">
              Experimente com tranquilidade
            </h2>
            <p className="mt-1 max-w-3xl text-metadata text-text-secondary">
              Você está em um ambiente de demonstração. Pode explorar lotes,
              salvar favoritos e experimentar a revisão de um lance. Não há
              cadastro, pagamento ou compromisso de compra.
            </p>
          </div>
        </div>

        <Link href="/resultados" className="primary-link mt-6">
          Explorar o catálogo
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}
