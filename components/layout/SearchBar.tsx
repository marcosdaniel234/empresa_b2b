"use client";
import { useId } from "react";
import { Search } from "lucide-react";
import { CATEGORY_SHORT, Category } from "@/lib/data";

const CATEGORIES = Object.keys(CATEGORY_SHORT) as Category[];

/**
 * Busca do catálogo, com seletor de categoria acoplado. Envia por GET para
 * /resultados, de modo que a consulta continua sendo uma URL compartilhável.
 */
export function SearchBar({
  className = "",
  size = "default",
  defaultValue = "",
  defaultCategory = "",
  withCategory = true,
}: {
  className?: string;
  size?: "default" | "large";
  defaultValue?: string;
  defaultCategory?: string;
  withCategory?: boolean;
}) {
  const id = useId();
  const height = size === "large" ? "h-11 md:h-12" : "h-10 md:h-11";
  // O envio por GET não passa pelo router, então o basePath entra manualmente.
  const action = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resultados/`;

  return (
    <form
      action={action}
      role="search"
      aria-label="Buscar no catálogo"
      className={`flex w-full rounded-control border border-border-strong bg-white ${className}`}
    >
      {withCategory && (
        <>
          <label htmlFor={`${id}-cat`} className="sr-only">
            Categoria
          </label>
          <select
            id={`${id}-cat`}
            name="categoria"
            defaultValue={defaultCategory}
            className={`hidden min-w-0 shrink-0 border-r border-border-subtle bg-surface-subtle px-2 text-label text-text-primary md:block ${height}`}
          >
            <option value="">Todas as categorias</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {CATEGORY_SHORT[category]}
              </option>
            ))}
          </select>
        </>
      )}

      <label htmlFor={id} className="sr-only">
        Buscar por lote, equipamento, empresa ou cidade
      </label>
      <input
        id={id}
        type="search"
        name="q"
        defaultValue={defaultValue}
        maxLength={160}
        placeholder="Buscar por equipamento, lote, empresa ou cidade"
        className={`min-w-0 flex-1 bg-transparent px-3 text-label text-text-primary placeholder:text-text-muted focus-visible:outline-offset-[-2px] ${height}`}
      />
      <button
        type="submit"
        className={`inline-flex shrink-0 items-center justify-center gap-2 bg-action px-3.5 text-label font-semibold text-white transition-colors duration-quick hover:bg-action-hover md:px-5 ${height}`}
      >
        <Search size={17} aria-hidden="true" />
        <span className="sr-only md:not-sr-only">Buscar</span>
      </button>
    </form>
  );
}
