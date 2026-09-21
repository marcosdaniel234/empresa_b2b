import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "tertiary" | "destructive";
type Size = "default" | "compact";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  busy?: boolean;
  busyLabel?: string;
  fullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-control text-label font-semibold transition-colors duration-quick ease-standard disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-action text-white hover:bg-action-hover active:bg-action-pressed",
  secondary:
    "border border-border-strong bg-white text-text-primary hover:border-action hover:text-action",
  tertiary:
    "bg-transparent text-action underline-offset-4 hover:underline px-1",
  destructive:
    "bg-danger-text text-white hover:brightness-95 active:brightness-90",
};

const sizes: Record<Size, string> = {
  default: "min-h-11 px-4",
  compact: "min-h-10 px-3",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "default",
      busy,
      busyLabel,
      fullWidth,
      className = "",
      children,
      disabled,
      ...props
    },
    ref,
  ) {
    const sizeClass = variant === "tertiary" ? "" : sizes[size];
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizeClass} ${fullWidth ? "w-full" : ""} ${className}`}
        disabled={disabled || busy}
        aria-busy={busy || undefined}
        {...props}
      >
        {busy ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            <span>{busyLabel ?? "Processando…"}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);
