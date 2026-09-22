/**
 * Espaço reservado para publicidade paga (banners de terceiros ou destaque
 * pago de anunciantes do catálogo). Nenhuma rede de anúncios está conectada
 * nesta demonstração — o espaço fica marcado, nas dimensões padrão do
 * mercado (IAB), para o ponto exato onde a peça entrará.
 *
 * O rótulo "Publicidade" fica sempre visível: é a prática padrão de
 * transparência para conteúdo patrocinado, não apenas um placeholder de
 * desenvolvimento.
 */

type AdFormat = "leaderboard" | "billboard" | "rectangle" | "skyscraper" | "infeed";

const FORMATS: Record<AdFormat, string> = {
  leaderboard: "970 × 90 px",
  billboard: "970 × 250 px",
  rectangle: "300 × 250 px",
  skyscraper: "300 × 600 px",
  infeed: "formato nativo",
};

const HEIGHT_CLASS: Record<AdFormat, string> = {
  leaderboard: "h-[64px] sm:h-[90px]",
  billboard: "h-[160px] sm:h-[250px]",
  rectangle: "h-[250px]",
  skyscraper: "h-[600px]",
  infeed: "h-[110px] sm:h-[140px]",
};

export function AdSlot({
  format,
  slotId,
  className = "",
}: {
  format: AdFormat;
  /** Identificador do inventário — vai só no atributo de título, não no texto visível. */
  slotId: string;
  className?: string;
}) {
  return (
    <div
      role="complementary"
      aria-label={`Espaço publicitário, formato ${format}, ${slotId}`}
      title={slotId}
      className={`flex items-center justify-center gap-2 overflow-hidden border border-dashed border-border-strong bg-surface-subtle px-3 ${HEIGHT_CLASS[format]} ${className}`}
    >
      <span className="shrink-0 rounded-[2px] bg-surface-raised px-1.5 py-0.5 text-micro font-bold uppercase tracking-[.08em] text-text-muted">
        Publicidade
      </span>
      <span className="truncate font-mono text-micro text-text-muted">
        Espaço reservado · {FORMATS[format]}
      </span>
    </div>
  );
}
