import { Quote } from "lucide-react";
import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Depoimentos do catálogo de demonstração. As falas são exemplos escritos para
 * o protótipo, atribuídas às empresas fictícias do catálogo — não são
 * avaliações reais e a seção diz isso de forma explícita.
 */
const ENTRIES = [
  {
    quote:
      "Publicamos as empilhadeiras substituídas no fim de cada ciclo de renovação. A ficha técnica e o prazo visíveis reduziram as perguntas repetidas por telefone.",
    name: "Coordenação de suprimentos",
    company: "Metalfor Industrial Ltda.",
    role: "Vendedor",
  },
  {
    quote:
      "Conseguimos comparar lotes por estado, ano e quilometragem sem abrir dez páginas. O código do lote facilitou o controle interno da compra.",
    name: "Gestão de frota",
    company: "Transnorte Logística S.A.",
    role: "Comprador",
  },
  {
    quote:
      "Para o parque de TI, o relatório de apagamento de dados previsto em cada lote foi o ponto decisivo na avaliação da nossa equipe.",
    name: "Infraestrutura",
    company: "Novadata Tecnologia S.A.",
    role: "Vendedor",
  },
];

export function Testimonials() {
  return (
    <section className="container-content py-6">
      <div className="section-heading">
        <h2 className="section-title">Depoimentos</h2>
        <span className="text-caption text-text-muted">
          Falas de exemplo, escritas para a demonstração
        </span>
      </div>

      <ul className="mt-3 grid gap-3 md:grid-cols-3">
        {ENTRIES.map((entry) => (
          <li key={entry.company} className="panel card-lift flex flex-col p-4">
            <Quote
              size={20}
              aria-hidden="true"
              className="shrink-0 text-accent-strong"
            />
            <blockquote className="mt-2 flex-1 text-body text-text-secondary">
              {entry.quote}
            </blockquote>
            <div className="mt-3 flex items-center gap-2.5 border-t border-border-subtle pt-3">
              <ImageSlot
                ratio="aspect-square"
                size="sm"
                className="h-10 w-10 shrink-0 rounded-full"
              />
              <div className="min-w-0">
                <p className="truncate text-label font-semibold text-text-primary">
                  {entry.name}
                </p>
                <p className="truncate text-caption text-text-muted">
                  {entry.company} · {entry.role}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
