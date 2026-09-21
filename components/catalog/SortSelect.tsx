"use client";

import { useId } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SortKey } from "@/lib/filters";

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "relevantes", label: "Ordem do catálogo" },
  { value: "encerrando", label: "Encerrando primeiro" },
  { value: "valor_asc", label: "Menor valor" },
  { value: "valor_desc", label: "Maior valor" },
];

export function SortSelect({ current }: { current: SortKey }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = useId();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "relevantes") params.delete("sort");
    else params.set("sort", value);
    router.push(
      `/resultados${params.toString() ? `?${params.toString()}` : ""}`,
    );
  }

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor={id}
        className="hidden shrink-0 text-metadata text-text-secondary lg:block"
      >
        Ordenar por
      </label>
      <select
        id={id}
        aria-label="Ordenar resultados"
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        className="field h-11 w-full md:w-auto"
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
