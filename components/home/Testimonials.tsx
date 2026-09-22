import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Depoimentos do catálogo de demonstração.
 *
 * As falas são exemplos escritos para o protótipo, atribuídas às empresas
 * fictícias do catálogo — não são avaliações reais, e a seção diz isso de
 * forma explícita, acima das falas e não em letra miúda no rodapé. O retrato
 * fica como moldura reservada: inventar um rosto para um depoimento que não
 * existe seria o tipo de prova social falsa que este protótipo não usa.
 */
const ENTRIES = [
  {
    quote:
      "Publicamos as empilhadeiras substituídas no fim de cada ciclo de renovação. A ficha técnica e o prazo visíveis reduziram as perguntas repetidas por telefone.",
    name: "Coordenação de suprimentos",
    company: "Metalfor Industrial Ltda.",
    role: "Movimentação e elevação",
  },
  {
    quote:
      "Conseguimos comparar lotes por estado, ano e quilometragem sem abrir dez páginas. O código do lote facilitou o controle interno da compra.",
    name: "Gestão de frota",
    company: "Transnorte Logística S.A.",
    role: "Transporte e distribuição",
  },
  {
    quote:
      "Para o parque de TI, o relatório de apagamento de dados previsto em cada lote foi o ponto decisivo na avaliação da nossa equipe.",
    name: "Infraestrutura",
    company: "Novadata Tecnologia S.A.",
    role: "Tecnologia da informação",
  },
  {
    quote:
      "A desmontagem da ponte rolante exigia laudo e ART. Ter os dois anexados ao lote encurtou a aprovação interna em duas semanas.",
    name: "Engenharia de manutenção",
    company: "Siderpampa Metalurgia S.A.",
    role: "Caldeiraria e estruturas",
  },
];

export function Testimonials() {
  return (
    <section
      aria-labelledby="titulo-depoimentos"
      className="border-y border-border-subtle bg-white"
    >
      <div className="container-content py-8 text-center md:py-10">
        <span className="eyebrow">Depoimentos</span>
        <h2
          id="titulo-depoimentos"
          className="mt-1.5 text-title-page-mobile text-text-primary md:text-title-page"
        >
          O que compradores e vendedores relatam
        </h2>
        <p className="mx-auto mt-1.5 max-w-xl text-metadata text-text-muted">
          Falas de exemplo, escritas para esta demonstração e atribuídas às
          empresas fictícias do catálogo.
        </p>

        <ul className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {ENTRIES.map((entry) => (
            <li key={entry.company} className="flex flex-col items-center">
              <ImageSlot
                ratio="aspect-square"
                size="sm"
                className="h-24 w-24 shrink-0 rounded-full"
              />
              <p className="mt-3 text-title-card text-text-primary">
                {entry.name}
              </p>
              <p className="mt-0.5 text-caption text-text-secondary">
                {entry.company}
              </p>
              <p className="mt-0.5 text-caption font-semibold text-action">
                {entry.role}
              </p>
              <blockquote className="mt-2.5 text-metadata leading-6 text-text-secondary">
                &ldquo;{entry.quote}&rdquo;
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
