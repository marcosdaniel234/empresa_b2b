/**
 * Fundo das faixas em vinho.
 *
 * A base é sempre um degradê de uma cor fixa — o vinho `#6B2A2F` em
 * transparências diferentes sobre o vinho profundo da faixa —, um brilho
 * suave atrás do texto que some antes das bordas. Por sumir antes das
 * bordas, duas faixas vizinhas nunca mostram emenda.
 *
 * `variant="rotas"` acrescenta, em telas médias e grandes, o Brasil em
 * retícula com rotas pontilhadas entre os estados com lotes (arquivo de
 * scripts/generate-backdrop.mjs). O desenho só aparece do meio da faixa para
 * a direita, para nunca cruzar títulos e textos. No celular fica só o
 * degradê.
 *
 * `fade="left"` prende o degradê à esquerda, nas aberturas com foto à
 * direita, para não tingir a fotografia.
 *
 * O caminho do SVG entra por estilo inline, e não em CSS, porque precisa do
 * basePath da publicação no GitHub Pages.
 */
import { photoSources } from "@/lib/images";

const WINE = "107, 42, 47"; // #6B2A2F, brand-600

const GLOW = `radial-gradient(ellipse 70% 58% at 28% 50%, rgba(${WINE}, .6), rgba(${WINE}, 0))`;

const MASKS = {
  edges: "linear-gradient(180deg, transparent, #000 18%, #000 82%, transparent)",
  left: "linear-gradient(90deg, #000 20%, transparent 62%)",
  none: undefined,
} as const;

const CLEAR_TEXT_SIDE = "linear-gradient(90deg, transparent 18%, #000 50%)";

function masked(masks: (string | undefined)[]) {
  const list = masks.filter((m): m is string => Boolean(m));
  if (!list.length) return {};
  const mask = list.join(", ");
  return {
    maskImage: mask,
    WebkitMaskImage: mask,
    // Várias máscaras valem juntas: só aparece onde todas deixam.
    maskComposite: "intersect",
    WebkitMaskComposite: "source-in",
  };
}

export function Backdrop({
  className = "",
  variant = "degrade",
  fade = "edges",
}: {
  className?: string;
  variant?: "degrade" | "rotas" | "metal" | "industrial";
  fade?: keyof typeof MASKS;
}) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const material = variant === "metal" || variant === "industrial"
    ? photoSources(`/images/backgrounds/${variant === "metal" ? "metal-cobre" : "panorama-industrial"}.webp`)
    : null;
  if (material) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        style={masked([MASKS[fade]])}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- assets responsivos na exportação estática */}
        <img
          src={material.src}
          srcSet={material.srcSet}
          sizes="100vw"
          alt=""
          width={1600}
          height={900}
          loading={fade === "left" ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 size-full object-cover ${variant === "metal" ? "opacity-75" : "opacity-65"}`}
          style={{ objectPosition: "right center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/50 via-brand-900/20 to-brand-900/10" />
      </div>
    );
  }
  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${className}`}
        style={{ backgroundImage: GLOW, ...masked([fade === "left" ? MASKS.left : undefined]) }}
      />
      {variant === "rotas" && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 hidden md:block ${className}`}
          style={{
            backgroundImage: `url(${base}/images/rotas.svg)`,
            backgroundSize: "cover",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
            ...masked([MASKS[fade], CLEAR_TEXT_SIDE]),
          }}
        />
      )}
    </>
  );
}
