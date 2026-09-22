import { ImageIcon } from "lucide-react";

/**
 * Espaço reservado para fotografia. O catálogo de demonstração ainda não tem
 * imagens dos lotes, então a moldura fica vazia, no lugar e na proporção em que
 * a foto entrará.
 */
export function ImageSlot({
  className = "",
  label,
  ratio = "aspect-[4/3]",
  size = "default",
  children,
}: {
  className?: string;
  label?: string;
  ratio?: string;
  size?: "sm" | "default" | "lg";
  children?: React.ReactNode;
}) {
  const icon = size === "sm" ? 16 : size === "lg" ? 34 : 24;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-border-subtle bg-surface-subtle ${ratio} ${className}`}
    >
      {/* Hachura diagonal discreta, para o espaço vazio não parecer falha de carregamento. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 9px, #C6CBCE 9px 10px)",
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
      {children}
    </div>
  );
}
