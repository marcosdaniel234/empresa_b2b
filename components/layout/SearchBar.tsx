"use client";
import { useId } from "react";
import { Search } from "lucide-react";

/**
 * Busca dominante do marketplace. Envia por GET para /resultados, de modo que
 * a consulta continua funcionando como URL compartilhável.
 */
export function SearchBar({
  className = "",
  size = "default",
  defaultValue = "",
}: {
  className?: string;
  size?: "default" | "large";
  defaultValue?: string;
}) {
  const id = useId();
  const height = size === "large" ? "h-12 md:h-14" : "h-11 md:h-12";
  const text = size === "large" ? "text-label md:text-body" : "text-label";
  // O envio por GET não passa pelo router, então o basePath entra manualmente.
  const action = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resultados/`;

  return (
    <form
      action={action}
      role="search"
      aria-label="Buscar ativos"
      className={`relative flex w-full ${className}`}
    >
      <label htmlFor={id} className="sr-only">
        O que você procura?
      </label>
      <Search
        size={19}
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary md:left-3.5"
      />
      <input
        id={id}
        type="search"
        name="q"
        defaultValue={defaultValue}
        maxLength={160}
        placeholder="O que você procura?"
        className={`min-w-0 w-full rounded-control border border-border-strong bg-white pl-10 pr-12 md:pl-11 md:pr-[104px] ${text} ${height} text-text-primary placeholder:text-text-secondary`}
      />
      <button
        type="submit"
        className="absolute bottom-1 right-1 top-1 inline-flex items-center justify-center rounded-[4px] bg-action px-3 text-label font-semibold text-white transition-colors duration-quick hover:bg-action-hover md:px-4"
      >
        <Search size={18} aria-hidden="true" className="md:hidden" />
        <span className="sr-only md:not-sr-only">Buscar</span>
      </button>
    </form>
  );
}
