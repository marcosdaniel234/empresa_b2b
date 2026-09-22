"use client";
import { useId } from "react";
import { Search } from "lucide-react";
import { CATEGORY_SHORT, Category } from "@/lib/data";

const CATEGORIES = Object.keys(CATEGORY_SHORT) as Category[];

/**
 * Busca do catálogo. Envia por GET para /resultados, de modo que a consulta
 * continua sendo uma URL compartilhável.
 *
 * Duas formas: `on-dark` é a barra compacta do cabeçalho marinho, um campo
 * branco com o botão laranja acoplado; a padrão é o cartão da abertura, com
 * seletor de categoria e botão nomeado.
 */
export function SearchBar({
  className = "",
  size = "default",
  variant = "default",
  defaultValue = "",
  defaultCategory = "",
  withCategory = true,
  hint,
}: {
  className?: string;
  size?: "default" | "large";
  variant?: "default" | "on-dark";
  defaultValue?: string;
  defaultCategory?: string;
  withCategory?: boolean;
  /** Segunda linha de exemplo, sob o campo, como no cartão da abertura. */
  hint?: string;
}) {
  const id = useId();
  // O envio por GET não passa pelo router, então o basePath entra manualmente.
  const action = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resultados/`;

  if (variant === "on-dark") {
    return (
      <form
        action={action}
        role="search"
        aria-label="Buscar no catálogo"
        className={`flex h-11 w-full overflow-hidden rounded-control bg-white ${className}`}
      >
        <label htmlFor={id} className="sr-only">
          Buscar máquinas, veículos, tecnologia e mais
        </label>
        <input
          id={id}
          type="search"
          name="q"
          defaultValue={defaultValue}
          maxLength={160}
          placeholder="Buscar máquinas, veículos, tecnologia e mais"
          className="min-w-0 flex-1 bg-transparent px-4 text-label text-text-primary placeholder:text-text-muted focus-visible:outline-offset-[-3px]"
        />
        <button
          type="submit"
          aria-label="Buscar"
          className="flex w-12 shrink-0 items-center justify-center bg-action text-white transition-colors duration-standard ease-standard hover:bg-action-hover"
        >
          <Search size={19} aria-hidden="true" />
        </button>
      </form>
    );
  }

  const height = size === "large" ? "h-12 md:h-14" : "h-11";

  return (
    <form
      action={action}
      role="search"
      aria-label="Buscar no catálogo"
      className={`flex w-full flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3 ${className}`}
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
            className={`w-full min-w-0 shrink-0 rounded-control border border-border-strong bg-white px-3 text-label text-text-secondary sm:w-52 ${height}`}
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
      <div
        className={`flex min-w-0 flex-1 items-center gap-3 rounded-control border border-border-strong bg-white px-4 ${height}`}
      >
        <Search size={20} aria-hidden="true" className="shrink-0 text-action" />
        <span className="flex min-w-0 flex-1 flex-col justify-center">
          <input
            id={id}
            type="search"
            name="q"
            defaultValue={defaultValue}
            maxLength={160}
            placeholder="O que sua empresa está procurando?"
            className="w-full min-w-0 bg-transparent text-label font-medium text-text-primary placeholder:text-text-secondary focus-visible:outline-none"
          />
          {hint && (
            <span
              aria-hidden="true"
              className="truncate text-caption text-text-muted"
            >
              {hint}
            </span>
          )}
        </span>
      </div>
      <button
        type="submit"
        className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-control bg-action px-6 text-label font-bold text-white transition-[background-color,box-shadow] duration-standard ease-standard hover:bg-action-hover hover:shadow-raised ${height}`}
      >
        Buscar
      </button>
    </form>
  );
}
