/**
 * Fundo das faixas em vinho, em duas versões:
 *
 * - "rotas": o Brasil em retícula de pontos cruzado por rotas pontilhadas
 *   entre os estados com lotes — ativos seguindo para novos destinos. O
 *   arquivo vem de scripts/generate-backdrop.mjs.
 * - "pontos": só a malha fina de pontos, para onde já há foto ou mapa e o
 *   desenho completo competiria com o conteúdo.
 *
 * Nas rotas, o desenho só começa a aparecer do meio da faixa para a direita,
 * para que as linhas nunca cruzem títulos e textos, que ficam à esquerda. No
 * celular, onde o texto ocupa a largura toda, as rotas dão lugar aos pontos.
 *
 * `fade` dissolve o fundo nas bordas: "edges" (padrão) apaga em cima e
 * embaixo, para que faixas vizinhas nunca mostrem emenda; "left" mantém o
 * desenho só à esquerda, onde a abertura tem texto e não foto; "none" deixa
 * o desenho inteiro.
 *
 * O caminho entra por estilo inline, e não em CSS, porque precisa do
 * basePath da publicação no GitHub Pages.
 */
const MASKS = {
  edges: "linear-gradient(180deg, transparent, #000 18%, #000 82%, transparent)",
  left: "linear-gradient(90deg, #000 20%, transparent 62%)",
  none: undefined,
} as const;

const CLEAR_TEXT_SIDE = "linear-gradient(90deg, transparent 18%, #000 50%)";

const DOTS = "radial-gradient(circle, rgba(224,164,124,.2) 1px, transparent 1.4px)";

export function Backdrop({
  className = "",
  variant = "rotas",
  fade = "edges",
}: {
  className?: string;
  variant?: "rotas" | "pontos";
  fade?: keyof typeof MASKS;
}) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const layer = (v: "rotas" | "pontos", extra: string) => {
    const masks = [MASKS[fade], v === "rotas" ? CLEAR_TEXT_SIDE : undefined].filter(
      (m): m is string => Boolean(m),
    );
    const mask = masks.join(", ");
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${extra} ${className}`}
        style={{
          ...(v === "rotas"
            ? {
                backgroundImage: `url(${base}/images/rotas.svg)`,
                backgroundSize: "cover",
                backgroundPosition: "right center",
                backgroundRepeat: "no-repeat",
              }
            : { backgroundImage: DOTS, backgroundSize: "22px 22px" }),
          ...(mask
            ? {
                maskImage: mask,
                WebkitMaskImage: mask,
                // Duas máscaras valem juntas: só aparece onde as duas deixam.
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }
            : {}),
        }}
      />
    );
  };

  if (variant === "pontos") return layer("pontos", "");
  // No celular o texto ocupa a largura toda: fica só a malha de pontos.
  return (
    <>
      {layer("pontos", "md:hidden")}
      {layer("rotas", "hidden md:block")}
    </>
  );
}
