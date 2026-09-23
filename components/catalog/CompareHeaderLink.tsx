"use client";
import Link from "next/link";
import { Scale } from "lucide-react";
import { useCompareList } from "./CompareToggle";

/**
 * Aparece no cabeçalho só depois que o comprador seleciona algum lote para
 * comparar, sem ocupar espaço enquanto a lista está vazia.
 */
export function CompareHeaderLink() {
  const selected = useCompareList();
  if (selected.length === 0) return null;

  return (
    <Link
      href="/comparar"
      className="relative flex h-11 w-11 items-center justify-center rounded-full text-white/85 transition-colors duration-standard hover:bg-white/10 hover:text-white"
      aria-label={`Comparar ${selected.length} lotes selecionados`}
    >
      <Scale size={19} aria-hidden="true" />
      <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-copper-solid px-1 text-[10px] font-bold text-brand-900 tabular">
        {selected.length}
      </span>
    </Link>
  );
}
