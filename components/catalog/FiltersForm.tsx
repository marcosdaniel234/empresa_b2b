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
  // Contagens por categoria considerando os demais filtros já escolhidos.
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
      className="md:panel md:overflow-hidden"
    >
      <div className="flex items-center justify-between gap-2 border-border-subtle px-0 pb-2 md:border-b md:bg-surface-subtle md:px-4 md:py-2.5">
        <h2 className="text-label font-semibold text-text-primary">
          Refinar busca
        </h2>
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
          className="min-h-11 text-metadata font-semibold text-action hover:underline"
        >
          Limpar
        </button>
      </div>

      <div className="divide-y divide-border-subtle md:px-4">
        <fieldset className="py-3">
          <legend className="field-label">Categoria</legend>
          <div className="mt-1.5">
            {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
              <label
                key={c}
                className="flex min-h-11 cursor-pointer items-center gap-2.5 text-metadata"
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
                  className="h-4 w-4 shrink-0"
                />
                <span className="flex-1 text-text-primary">
                  {CATEGORY_LABELS[c]}
                </span>
                <span className="text-caption text-text-secondary tabular">
                  {facets.filter((a) => a.category === c).length}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="py-3">
          <legend className="field-label">Situação</legend>
          <div className="mt-1.5">
            {OPTIONS.map((o) => (
              <label
                key={o.key}
                className="flex min-h-11 cursor-pointer items-center gap-2.5 text-metadata text-text-primary"
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
                  className="h-4 w-4 shrink-0"
                />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="py-3">
          <label htmlFor={id + "uf"} className="field-label">
            Estado
          </label>
          <select
            id={id + "uf"}
            value={draft.uf}
            onChange={(e) => setDraft((d) => ({ ...d, uf: e.target.value }))}
            className="field mt-1.5"
          >
            <option value="">Todos os estados</option>
            {AVAILABLE_UFS.map((uf) => (
              <option key={uf}>{uf}</option>
            ))}
          </select>

          <label htmlFor={id + "cidade"} className="field-label mt-3 block">
            Cidade
          </label>
          <input
            id={id + "cidade"}
            maxLength={100}
            value={draft.cidade}
            onChange={(e) => setDraft((d) => ({ ...d, cidade: e.target.value }))}
            placeholder="Ex.: Campinas"
            className="field mt-1.5"
          />
        </div>

        <fieldset className="py-3">
          <legend className="field-label">Lance atual ou inicial (R$)</legend>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
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
                  className="field mt-1 px-2"
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
      </div>

      <div className="pt-3 md:border-t md:border-border-subtle md:p-3">
        <button type="submit" className="primary-link w-full">
          Aplicar filtros
        </button>
      </div>
    </form>
  );
}
