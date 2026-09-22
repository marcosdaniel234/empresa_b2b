"use client";
import Link from "next/link";
import { Scale } from "lucide-react";
import { useCompareList } from "./CompareToggle";

/**
 * Aparece no cabeçalho só depois que o comprador seleciona algum lote para
 * comparar — o mesmo gatilho usado em catálogos de equipamento (Surplex,
 * Ritchie Bros.), sem ocupar espaço enquanto a lista está vazia.
 */
export function CompareHeaderLink() {
  const selected = useCompareList();
  if (selected.length === 0) return null;

  return (
    <Link
      href="/comparar"
      className="header-link hidden md:inline-flex"
      aria-label={`Comparar ${selected.length} lotes selecionados`}
    >
      <span className="relative">
        <Scale size={17} aria-hidden="true" />
        <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-action text-[9px] font-bold text-white tabular">
          {selected.length}
        </span>
      </span>
      <span className="hidden lg:inline">Comparar</span>
    </Link>
  );
}
