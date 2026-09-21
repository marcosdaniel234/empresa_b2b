"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ASSETS, CATEGORY_LABELS, Category } from "@/lib/data";
import { AVAILABLE_UFS, FilterState, StatusFilter, filtersToQueryString } from "@/lib/filters";

const STATUS_OPTIONS: { key: StatusFilter; label: string }[] = [
  { key: "aberto", label: "Leilão aberto" },
  { key: "encerrando", label: "Encerrando em breve" },
  { key: "agendado", label: "Agendado" },
  { key: "encerrado", label: "Encerrado" },
];

function countByCategory(category: Category): number {
  return ASSETS.filter((a) => a.category === category && a.status !== "cancelado").length;
}

export function FiltersForm({
  initial,
  onApplied,
}: {
  initial: FilterState;
  /** Chamado após navegar — usado pela folha mobile para fechar-se. */
  onApplied?: () => void;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<FilterState>(initial);

  function toggleCategory(category: Category) {
    setDraft((d) => ({
      ...d,
      categorias: d.categorias.includes(category)
        ? d.categorias.filter((c) => c !== category)
        : [...d.categorias, category],
    }));
  }

  function toggleStatus(status: StatusFilter) {
    setDraft((d) => ({
      ...d,
      status: d.status.includes(status) ? d.status.filter((s) => s !== status) : [...d.status, status],
    }));
  }

  function apply() {
    const qs = filtersToQueryString(draft);
    router.push(`/resultados${qs ? `?${qs}` : ""}`);
    onApplied?.();
  }

  function clear() {
    setDraft({ ...draft, categorias: [], status: [], uf: "", cidade: "", valorMin: "", valorMax: "" });
    router.push(draft.q ? `/resultados?q=${encodeURIComponent(draft.q)}` : "/resultados");
    onApplied?.();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-title-card text-text-primary">Filtrar resultados</h2>
        <button type="button" onClick={clear} className="text-label text-action hover:underline">
          Limpar filtros
        </button>
      </div>

      <fieldset>
        <legend className="text-label font-medium text-text-primary">Categoria</legend>
        <div className="mt-3 flex flex-col gap-2">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((category) => (
            <label key={category} className="flex items-center gap-2 text-body text-text-primary">
              <input
                type="checkbox"
                checked={draft.categorias.includes(category)}
                onChange={() => toggleCategory(category)}
                className="h-5 w-5 rounded border-border-control text-action focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring"
              />
              {CATEGORY_LABELS[category]}
              <span className="text-caption text-text-secondary">({countByCategory(category)})</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="filtro-uf" className="text-label font-medium text-text-primary">
          Estado
        </label>
        <select
          id="filtro-uf"
          value={draft.uf}
          onChange={(e) => setDraft((d) => ({ ...d, uf: e.target.value }))}
          className="mt-2 h-12 w-full rounded-control border border-border-control bg-surface-card px-3 text-body text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring"
        >
          <option value="">Todos os estados</option>
          {AVAILABLE_UFS.map((uf) => (
            <option key={uf} value={uf}>
              {uf}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filtro-cidade" className="text-label font-medium text-text-primary">
          Cidade
        </label>
        <input
          id="filtro-cidade"
          type="text"
          value={draft.cidade}
          onChange={(e) => setDraft((d) => ({ ...d, cidade: e.target.value }))}
          placeholder="Digite uma cidade"
          className="mt-2 h-12 w-full rounded-control border border-border-control bg-surface-card px-3 text-body text-text-primary placeholder:text-text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring"
        />
      </div>

      <div>
        <span className="text-label font-medium text-text-primary">Lance atual ou inicial (R$)</span>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={draft.valorMin}
            onChange={(e) => setDraft((d) => ({ ...d, valorMin: e.target.value }))}
            placeholder="Mínimo"
            aria-label="Valor mínimo"
            className="h-12 w-full rounded-control border border-border-control bg-surface-card px-3 text-body text-text-primary placeholder:text-text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring"
          />
          <span className="text-text-secondary" aria-hidden="true">
            –
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={draft.valorMax}
            onChange={(e) => setDraft((d) => ({ ...d, valorMax: e.target.value }))}
            placeholder="Máximo"
            aria-label="Valor máximo"
            className="h-12 w-full rounded-control border border-border-control bg-surface-card px-3 text-body text-text-primary placeholder:text-text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring"
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-label font-medium text-text-primary">Status</legend>
        <div className="mt-3 flex flex-col gap-2">
          {STATUS_OPTIONS.map((option) => (
            <label key={option.key} className="flex items-center gap-2 text-body text-text-primary">
              <input
                type="checkbox"
                checked={draft.status.includes(option.key)}
                onChange={() => toggleStatus(option.key)}
                className="h-5 w-5 rounded border-border-control text-action focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={apply}
        className="h-12 rounded-control bg-action text-label font-medium text-text-inverse transition-colors duration-quick hover:bg-action-hover active:bg-action-pressed"
      >
        Aplicar filtros
      </button>
    </div>
  );
}
