/**
 * Curvas de nível em cobre sobre o vinho — a textura de todas as faixas
 * escuras. O arquivo vem de scripts/generate-contours.mjs.
 *
 * `fade` dissolve a textura nas bordas: "edges" (padrão) apaga em cima e
 * embaixo, para que duas faixas vizinhas nunca mostrem as linhas cortadas na
 * emenda; "left" mantém as curvas só à esquerda, onde a abertura tem texto e
 * não foto; "none" deixa o desenho inteiro.
 *
 * O caminho entra por estilo inline, e não em CSS, porque precisa do
 * basePath da publicação no GitHub Pages.
 */
const MASKS = {
  edges: "linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent)",
  left: "linear-gradient(90deg, #000 28%, transparent 68%)",
  none: undefined,
} as const;

export function Contours({
  className = "",
  fade = "edges",
}: {
  className?: string;
  fade?: keyof typeof MASKS;
}) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const mask = MASKS[fade];
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-cover bg-center ${className}`}
      style={{
        backgroundImage: `url(${base}/images/curvas.svg)`,
        ...(mask ? { maskImage: mask, WebkitMaskImage: mask } : {}),
      }}
    />
  );
}
