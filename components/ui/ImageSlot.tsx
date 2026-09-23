import { ImageIcon } from "lucide-react";
import { photoSources } from "@/lib/images";

/**
 * Moldura de fotografia.
 *
 * Com `src`, a foto cobre o quadro e o navegador escolhe a largura certa por
 * `srcset` (640 px nos cartões, 1600 px na abertura e na ficha). Fora da dobra
 * a carga é preguiçosa; a abertura passa `priority` para vir antes do resto.
 *
 * Sem `src`, a moldura fica reservada — hachurada e rotulada — na proporção
 * em que a foto entrará, para não haver salto de layout quando ela chegar.
 */
export function ImageSlot({
  className = "",
  label,
  ratio = "aspect-[4/3]",
  size = "default",
  src,
  alt = "",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  children,
}: {
  className?: string;
  label?: string;
  ratio?: string;
  size?: "sm" | "default" | "lg";
  src?: string;
  /** Vazio quando a foto repete o título ao lado; descritivo quando é o assunto. */
  alt?: string;
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  const icon = size === "sm" ? 16 : size === "lg" ? 34 : 24;
  const photo = src ? photoSources(src) : null;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-surface-subtle ${ratio} ${className}`}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element -- exportação estática: o srcset já cobre o que o otimizador do Next faria
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          sizes={photo.srcSet ? sizes : undefined}
          alt={alt}
          width={1600}
          height={1000}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-transform duration-panel ease-standard"
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0 9px, var(--hatch) 9px 10px)",
            }}
          />
          <div className="relative flex flex-col items-center gap-1 text-text-muted">
            <ImageIcon size={icon} strokeWidth={1.5} aria-hidden="true" />
            {label && size !== "sm" && (
              <span className="px-2 text-center text-micro uppercase tracking-[.1em]">
                {label}
              </span>
            )}
          </div>
        </>
      )}
      {children}
    </div>
  );
}
