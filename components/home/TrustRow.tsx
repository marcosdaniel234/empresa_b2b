import { Building2, ClipboardCheck, FileText, Truck } from "lucide-react";

/**
 * Faixa de garantias sob a busca.
 *
 * A referência promete "empresas verificadas", "time especializado" e
 * "segurança em todas as transações". Nada disso existe nesta demonstração,
 * e o documento de direção proíbe inventar prova. Ficam quatro garantias que
 * o catálogo cumpre de fato, lote a lote.
 */
const ITENS = [
  {
    icon: Building2,
    title: "Empresas identificadas",
    hint: "razão social e localização à vista",
  },
  {
    icon: FileText,
    title: "Documentação por lote",
    hint: "nota fiscal, laudos e históricos",
  },
  {
    icon: Truck,
    title: "Retirada declarada",
    hint: "endereço e prazo em cada ficha",
  },
  {
    icon: ClipboardCheck,
    title: "Revisão antes de concluir",
    hint: "todo lance passa por confirmação",
  },
];

export function TrustRow() {
  return (
    <section aria-label="O que cada lote traz" className="container-content">
      <ul className="grid grid-cols-1 gap-y-5 py-9 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border-strong">
        {ITENS.map((item, i) => (
          <li
            key={item.title}
            data-reveal={i}
            className="flex items-center gap-4 lg:justify-center lg:px-6"
          >
            <item.icon size={34} strokeWidth={1.3} aria-hidden="true" className="shrink-0 text-text-primary" />
            <p className="text-[15px] leading-snug text-text-primary">
              {item.title}
              <span className="block text-text-secondary">{item.hint}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
