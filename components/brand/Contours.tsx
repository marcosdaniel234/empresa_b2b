/**
 * Curvas de nível em cobre sobre o vinho — a textura de todas as faixas
 * escuras. O arquivo vem de scripts/generate-contours.mjs.
 *
 * O caminho entra por estilo inline, e não em CSS, porque precisa do
 * basePath da publicação no GitHub Pages.
 */
export function Contours({ className = "" }: { className?: string }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(${base}/images/curvas.svg)` }}
    />
  );
}
