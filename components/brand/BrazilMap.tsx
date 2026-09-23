/**
 * Contorno do Brasil com as divisas estaduais, usado como marca d'água.
 *
 * O SVG (public/images/brasil.svg) entra como máscara: assim a cor vem da
 * classe de fundo e o mesmo arquivo serve ao verde-mar vivo dos ícones e ao
 * verde-mar esmaecido do rodapé. Traçado: @svg-maps/brazil, Victor Cazanave, CC-BY-4.0.
 *
 * `solid` troca o traçado das divisas pela silhueta cheia, que é a forma
 * legível em tamanho de ícone.
 */
export function BrazilMap({ className = "", solid = false }: { className?: string; solid?: boolean }) {
  const file = solid ? "brasil-solido.svg" : "brasil.svg";
  const url = `url(${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/${file})`;
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none block aspect-[613/639] ${className}`}
      style={{
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
