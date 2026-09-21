"use client";

import { useRouter } from "next/navigation";
import { SortKey } from "@/lib/filters";

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "relevantes", label: "Mais relevantes" },
  { value: "encerrando", label: "Encerrando primeiro" },
  { value: "valor_asc", label: "Menor valor" },
  { value: "valor_desc", label: "Maior valor" },
];

export function SortSelect({ current }: { current: SortKey }) {
  const router = useRouter();

  function handleChange(value: string) {
    const params = new URLSearchParams(window.location.search);
    if (value === "relevantes") params.delete("sort");
    else params.set("sort", value);
    router.push(`/resultados${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="ordenar-por" className="hidden text-label text-text-secondary sm:block">
        Ordenar por
      </label>
      <select
        id="ordenar-por"
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        className="h-11 rounded-control border border-border-control bg-surface-card px-3 text-body text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
