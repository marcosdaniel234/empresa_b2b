/**
 * Peça de publicidade ilustrativa, organizada nos formatos padrão do mercado
 * (IAB). Nenhuma rede de anúncios está conectada nesta demonstração.
 *
 * O rótulo "Publicidade" fica sempre visível: é a prática padrão de
 * transparência para conteúdo patrocinado, não apenas um placeholder de
 * desenvolvimento.
 */

type AdFormat = "leaderboard" | "billboard" | "rectangle" | "skyscraper" | "infeed";

const HEIGHT_CLASS: Record<AdFormat, string> = {
  leaderboard: "h-[64px] sm:h-[90px]",
  billboard: "h-[160px] sm:h-[250px]",
  rectangle: "h-[250px]",
  skyscraper: "h-[600px]",
  infeed: "h-[110px] sm:h-[140px]",
};

const AD_IMAGES: Record<AdFormat, string> = {
  leaderboard: "/images/ads/leaderboard-empilhadeiras.png",
  billboard: "/images/ads/billboard-maquinas.png",
  rectangle: "/images/ads/rectangle-tecnologia.png",
  skyscraper: "/images/ads/skyscraper-industria.png",
  infeed: "/images/ads/infeed-mobiliario.png",
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
  const imageSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${AD_IMAGES[format]}`;

  return (
    <div
      role="complementary"
      aria-label={`Espaço publicitário, formato ${format}, ${slotId}`}
      title={slotId}
      className={`relative flex items-center justify-center overflow-hidden border border-border-strong bg-surface-subtle ${HEIGHT_CLASS[format]} ${className}`}
    >
      <img src={imageSrc} alt="" className="absolute inset-0 size-full object-cover" />
      <span className="absolute left-2 top-2 shrink-0 rounded-[2px] bg-white/90 px-1.5 py-0.5 text-micro font-bold uppercase tracking-[.08em] text-text-muted">
        Publicidade
      </span>
    </div>
  );
}
