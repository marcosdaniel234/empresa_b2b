import { ImageIcon } from "lucide-react";

/**
 * Moldura de fotografia. Com `src`, exibe a imagem cobrindo o quadro; sem
 * `src`, fica reservada — hachurada e rotulada — na proporção e na posição em
 * que a foto entrará.
 */
export function ImageSlot({
  className = "",
  label,
  ratio = "aspect-[4/3]",
  size = "default",
  src,
  children,
}: {
  className?: string;
  label?: string;
  ratio?: string;
  size?: "sm" | "default" | "lg";
  src?: string;
  children?: React.ReactNode;
}) {
  const icon = size === "sm" ? 16 : size === "lg" ? 34 : 24;
  const imageSrc = src?.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`
    : src;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-border-subtle bg-surface-subtle ${ratio} ${className}`}
    >
      {imageSrc && <img src={imageSrc} alt="" className="absolute inset-0 size-full object-cover" />}
      {/* Hachura diagonal discreta, para o espaço vazio não parecer falha de carregamento. */}
      {!src && <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 9px, #C9D2DE 9px 10px)",
        }}
      />}
      {!src && <div className="relative flex flex-col items-center gap-1 text-text-muted">
        <ImageIcon size={icon} strokeWidth={1.5} aria-hidden="true" />
        {label && size !== "sm" && (
          <span className="px-2 text-center text-micro uppercase tracking-[.1em]">
            {label}
          </span>
        )}
      </div>}
      {children}
    </div>
  );
}
