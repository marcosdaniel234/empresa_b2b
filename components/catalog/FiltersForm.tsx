"use client";
import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORY_LABELS, Category } from "@/lib/data";
import {
  AVAILABLE_UFS,
  FilterState,
  StatusFilter,
  applyFilters,
  filtersToQueryString,
} from "@/lib/filters";
const OPTIONS: { key: StatusFilter; label: string }[] = [
  { key: "aberto", label: "Abertos" },
  { key: "encerrando", label: "Encerram em até 24h" },
  { key: "agendado", label: "Agendados" },
  { key: "encerrado", label: "Encerrados" },
];

export function FiltersForm({
  initial,
  onApplied,
}: {
  initial: FilterState;
  onApplied?: () => void;
}) {
  const router = useRouter();
  const id = useId();
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState("");
  const facets = applyFilters({ ...draft, categorias: [] });
  function navigate(value: FilterState) {
    const qs = filtersToQueryString(value);
    router.push(`/resultados${qs ? "?" + qs : ""}`);
    onApplied?.();
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          draft.valorMin &&
          draft.valorMax &&
          Number(draft.valorMin) > Number(draft.valorMax)
        ) {
          setError("O valor máximo precisa ser maior ou igual ao mínimo.");
          return;
        }
        setError("");
        navigate(draft);
      }}
      className="flex flex-col gap-6 rounded-card bg-white p-1 md:border md:p-5"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-label font-semibold">Refinar busca</h2>
        <button
          type="button"
          onClick={() => {
            const next = {
              ...draft,
              categorias: [],
              status: [],
              uf: "",
              cidade: "",
              valorMin: "",
              valorMax: "",
            };
            setDraft(next);
            setError("");
            if (!onApplied) navigate(next);
          }}
          className="min-h-11 text-label text-action hover:underline"
        >
          Limpar
        </button>
      </div>
      <fieldset>
        <legend className="text-label font-semibold">Categoria</legend>
        <div className="mt-2 space-y-1">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
            <label
              key={c}
              className="flex min-h-11 items-center gap-2 text-metadata"
            >
              <input
                type="checkbox"
                checked={draft.categorias.includes(c)}
                onChange={() =>
                  setDraft((d) => ({
                    ...d,
                    categorias: d.categorias.includes(c)
                      ? d.categorias.filter((x) => x !== c)
                      : [...d.categorias, c],
                  }))
                }
                className="h-4 w-4"
              />
              {CATEGORY_LABELS[c]}
              <span className="ml-auto text-caption text-text-secondary">
                {facets.filter((a) => a.category === c).length}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor={id + "uf"} className="text-label font-semibold">
          Estado
        </label>
        <select
          id={id + "uf"}
          value={draft.uf}
          onChange={(e) => setDraft((d) => ({ ...d, uf: e.target.value }))}
          className="mt-2 h-12 w-full rounded-control border border-border-control bg-white px-3 text-label"
        >
          <option value="">Todos os estados</option>
          {AVAILABLE_UFS.map((uf) => (
            <option key={uf}>{uf}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={id + "cidade"} className="text-label font-semibold">
          Cidade
        </label>
        <input
          id={id + "cidade"}
          maxLength={100}
          value={draft.cidade}
          onChange={(e) => setDraft((d) => ({ ...d, cidade: e.target.value }))}
          placeholder="Ex.: Campinas"
          className="mt-2 h-12 w-full rounded-control border border-border-control px-3 text-label"
        />
      </div>
      <fieldset>
        <legend className="text-label font-semibold">
          Lance atual ou inicial (R$)
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(["valorMin", "valorMax"] as const).map((key, i) => (
            <div key={key}>
              <label
                htmlFor={id + key}
                className="text-caption text-text-secondary"
              >
                {i === 0 ? "Mínimo" : "Máximo"}
              </label>
              <input
                id={id + key}
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={draft[key]}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, [key]: e.target.value }))
                }
                aria-describedby={error ? id + "erro" : undefined}
                aria-invalid={!!error}
                className="mt-1 h-12 w-full min-w-0 rounded-control border border-border-control px-2 text-label"
              />
            </div>
          ))}
        </div>
        {error && (
          <p
            id={id + "erro"}
            role="alert"
            className="mt-2 text-metadata text-danger-text"
          >
            {error}
          </p>
        )}
      </fieldset>
      <fieldset>
        <legend className="text-label font-semibold">Situação do leilão</legend>
        <div className="mt-2 space-y-1">
          {OPTIONS.map((o) => (
            <label
              key={o.key}
              className="flex min-h-11 items-center gap-2 text-metadata"
            >
              <input
                type="checkbox"
                checked={draft.status.includes(o.key)}
                onChange={() =>
                  setDraft((d) => ({
                    ...d,
                    status: d.status.includes(o.key)
                      ? d.status.filter((x) => x !== o.key)
                      : [...d.status, o.key],
                  }))
                }
                className="h-4 w-4"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>
      <button type="submit" className="primary-link w-full">
        Aplicar filtros
      </button>
    </form>
  );
}
