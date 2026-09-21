"use client";
import { useId } from "react";
import { Search } from "lucide-react";

export function SearchBar({
  className = "",
  compact = false,
  defaultValue = "",
}: {
  className?: string;
  compact?: boolean;
  defaultValue?: string;
}) {
  const id = useId();
  return (
    <form
      action="/resultados"
      role="search"
      aria-label="Buscar ativos"
      className={`relative flex w-full ${className}`}
    >
      <label htmlFor={id} className="sr-only">
        O que sua empresa procura?
      </label>
      <input
        id={id}
        type="search"
        name="q"
        defaultValue={defaultValue}
        maxLength={160}
        placeholder="Busque por ativo, categoria ou empresa"
        className={`min-w-0 w-full rounded-control border border-border-subtle bg-surface-page pl-4 pr-14 text-label text-text-primary placeholder:text-text-secondary ${compact ? "h-11" : "h-12"}`}
      />
      <button
        type="submit"
        aria-label="Buscar ativos"
        className="absolute right-0 top-0 flex h-full w-12 items-center justify-center rounded-r-control text-action hover:bg-surface-subtle"
      >
        <Search size={20} aria-hidden="true" />
      </button>
    </form>
  );
}
