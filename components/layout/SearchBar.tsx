"use client";
import { useId } from "react";
import { Search } from "lucide-react";

/**
 * Busca do cabeçalho: campo translúcido sobre o azul profundo. Envia por GET para
 * /resultados, de modo que a consulta continua sendo uma URL compartilhável.
 * A busca completa, com categoria, estado e modalidade, fica no painel da
 * página inicial (components/home/SearchPanel.tsx).
 */
export function SearchBar({
  className = "",
  defaultValue = "",
  autoFocus = false,
}: {
  className?: string;
  /** Mantido por compatibilidade com chamadas antigas; só existe a forma escura. */
  variant?: "on-dark";
  defaultValue?: string;
  autoFocus?: boolean;
}) {
  const id = useId();
  // O envio por GET não passa pelo router, então o basePath entra manualmente.
  const action = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resultados/`;

  return (
    <form
      action={action}
      role="search"
      aria-label="Buscar no catálogo"
      className={`flex h-11 w-full items-center gap-2.5 rounded-control border border-white/20 bg-white/[.06] px-3.5 transition-[border-color,background-color] duration-standard focus-within:border-accent-bright/70 focus-within:bg-white/10 ${className}`}
    >
      <Search size={17} aria-hidden="true" className="shrink-0 text-white/60" />
      <label htmlFor={id} className="sr-only">
        Buscar ativos, marcas ou categorias
      </label>
      <input
        id={id}
        type="search"
        name="q"
        defaultValue={defaultValue}
        maxLength={160}
        autoFocus={autoFocus}
        placeholder="Buscar ativos, marcas ou categorias…"
        className="min-w-0 flex-1 bg-transparent text-label text-white placeholder:text-white/55 focus-visible:outline-none"
      />
      <button type="submit" className="sr-only">
        Buscar
      </button>
    </form>
  );
}
