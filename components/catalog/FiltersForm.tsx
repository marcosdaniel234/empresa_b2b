"use client";
import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, MapPin } from "lucide-react";
import { StateFlag } from "@/components/brand/StateFlag";
import {
  CATEGORY_SHORT,
  Category,
  MODALIDADE_LABELS,
  Modalidade,
  STATE_NAMES,
  SUBCATEGORIES,
} from "@/lib/data";
import {
  AVAILABLE_UFS,
  FilterState,
  StatusFilter,
  applyFilters,
  filtersToQueryString,
} from "@/lib/filters";

const STATUS_OPTIONS: { key: StatusFilter; label: string }[] = [
  { key: "aberto", label: "Abertos" },
  { key: "encerrando", label: "Encerram em até 24h" },
  { key: "agendado", label: "Agendados" },
  { key: "encerrado", label: "Encerrados" },
];

const CATEGORIES = Object.keys(CATEGORY_SHORT) as Category[];

const MODALIDADES: { key: Modalidade | ""; label: string }[] = [
  { key: "", label: "Todas" },
  { key: "leilao", label: MODALIDADE_LABELS.leilao },
  { key: "venda_direta", label: MODALIDADE_LABELS.venda_direta },
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
  // A árvore abre na categoria já escolhida; as demais ficam recolhidas.
  const [expanded, setExpanded] = useState<Category[]>(
    initial.categorias.length ? initial.categorias : [],
  );

  // Contagens calculadas com os demais filtros aplicados, menos o de categoria.
  const facets = applyFilters({
    ...draft,
    categorias: [],
    subcategorias: [],
  });

  // Contagem por UF com os demais filtros aplicados, menos o de estado.
  const stateFacets = applyFilters({ ...draft, uf: "" });

  function navigate(value: FilterState) {
    const qs = filtersToQueryString(value);
    router.push(`/resultados${qs ? "?" + qs : ""}`);
    onApplied?.();
  }

  function toggleCategory(category: Category) {
    setDraft((d) => {
      const on = d.categorias.includes(category);
      return {
        ...d,
        categorias: on
          ? d.categorias.filter((c) => c !== category)
          : [...d.categorias, category],
        // Ao desmarcar a categoria, suas subcategorias saem junto.
        subcategorias: on
          ? d.subcategorias.filter(
              (s) => !SUBCATEGORIES[category].some((sub) => sub.slug === s),
            )
          : d.subcategorias,
      };
    });
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
      className="md:panel"
    >
      <div className="flex items-center justify-between gap-2 pb-2 md:panel-head md:pb-2">
        <h2 className="panel-title">Refinar busca</h2>
        <button
          type="button"
          onClick={() => {
            const next: FilterState = {
              ...draft,
              categorias: [],
              subcategorias: [],
              status: [],
              modalidade: "",
              uf: "",
              cidade: "",
              valorMin: "",
              valorMax: "",
            };
            setDraft(next);
            setError("");
            if (!onApplied) navigate(next);
          }}
          className="min-h-9 text-caption font-semibold text-action hover:underline"
        >
          Limpar
        </button>
      </div>

      <div className="divide-y divide-border-subtle md:px-3">
        <fieldset className="py-2.5">
          <legend className="field-label">Categoria</legend>
          <ul className="mt-1">
            {CATEGORIES.map((category) => {
              const total = facets.filter(
                (a) => a.category === category,
              ).length;
              const isOpen = expanded.includes(category);
              return (
                <li key={category}>
                  <div className="flex items-center gap-1">
                    <label className="flex min-h-9 flex-1 cursor-pointer items-center gap-2 text-metadata">
                      <input
                        type="checkbox"
                        checked={draft.categorias.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-3.5 w-3.5 shrink-0"
                      />
                      <span className="flex-1 text-text-primary">
                        {CATEGORY_SHORT[category]}
                      </span>
                      <span className="text-caption text-text-muted tabular">
                        {total}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((list) =>
                          isOpen
                            ? list.filter((c) => c !== category)
                            : [...list, category],
                        )
                      }
                      aria-expanded={isOpen}
                      aria-label={`${isOpen ? "Recolher" : "Expandir"} subcategorias de ${CATEGORY_SHORT[category]}`}
                      className="flex h-9 w-6 items-center justify-center text-text-muted hover:text-action"
                    >
                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                        className={`transition-transform duration-quick ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  {isOpen && (
                    <ul className="mb-1 ml-5 border-l border-border-subtle pl-2.5">
                      {SUBCATEGORIES[category].map((sub) => (
                        <li key={sub.slug}>
                          <label className="flex min-h-8 cursor-pointer items-center gap-2 text-caption">
                            <input
                              type="checkbox"
                              checked={draft.subcategorias.includes(sub.slug)}
                              onChange={() =>
                                setDraft((d) => ({
                                  ...d,
                                  subcategorias: d.subcategorias.includes(
                                    sub.slug,
                                  )
                                    ? d.subcategorias.filter(
                                        (s) => s !== sub.slug,
                                      )
                                    : [...d.subcategorias, sub.slug],
                                }))
                              }
                              className="h-3.5 w-3.5 shrink-0"
                            />
                            <span className="flex-1 text-text-secondary">
                              {sub.label}
                            </span>
                            <span className="text-text-muted tabular">
                              {
                                facets.filter(
                                  (a) => a.subcategory === sub.slug,
                                ).length
                              }
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </fieldset>

        <fieldset className="py-2.5">
          <legend className="field-label">Modalidade</legend>
          <div className="mt-1">
            {MODALIDADES.map((o) => (
              <label
                key={o.key || "todas"}
                className="flex min-h-9 cursor-pointer items-center gap-2 text-metadata text-text-primary"
              >
                <input
                  type="radio"
                  name={id + "modalidade"}
                  checked={draft.modalidade === o.key}
                  onChange={() => setDraft((d) => ({ ...d, modalidade: o.key }))}
                  className="h-3.5 w-3.5 shrink-0 accent-action"
                />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="py-2.5">
          <legend className="field-label">Situação</legend>
          <div className="mt-1">
            {STATUS_OPTIONS.map((o) => (
              <label
                key={o.key}
                className="flex min-h-9 cursor-pointer items-center gap-2 text-metadata text-text-primary"
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
                  className="h-3.5 w-3.5 shrink-0"
                />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="py-2.5">
          <legend className="field-label">Estado</legend>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            {[{ uf: "", total: stateFacets.length }, ...AVAILABLE_UFS.map((uf) => ({
              uf,
              total: stateFacets.filter((a) => a.state === uf).length,
            }))].map(({ uf, total }) => (
              <label key={uf || "todos"} className={`relative cursor-pointer ${uf ? "" : "col-span-2"}`}>
                <input
                  type="radio"
                  name={id + "uf"}
                  checked={draft.uf === uf}
                  onChange={() => setDraft((d) => ({ ...d, uf }))}
                  className="peer sr-only"
                />
                <span className="flex min-h-10 items-center gap-2 rounded-control border border-border-subtle bg-surface-card px-2 text-metadata text-text-primary transition-colors duration-quick hover:border-border-control peer-checked:border-action peer-checked:bg-action-soft peer-checked:font-semibold peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring">
                  {uf ? (
                    <StateFlag uf={uf} className="w-6" />
                  ) : (
                    <MapPin size={15} aria-hidden="true" className="ml-1 text-text-muted" />
                  )}
                  <span className="min-w-0 flex-1 truncate" title={uf ? STATE_NAMES[uf] : undefined}>
                    {uf ? (
                      <>
                        <span aria-hidden="true">{uf}</span>
                        <span className="sr-only">{STATE_NAMES[uf] ?? uf}</span>
                      </>
                    ) : (
                      "Todos os estados"
                    )}
                  </span>
                  <span className="text-caption text-text-muted tabular">{total}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="py-2.5">
          <label htmlFor={id + "cidade"} className="field-label block">
            Cidade
          </label>
          <input
            id={id + "cidade"}
            maxLength={100}
            value={draft.cidade}
            onChange={(e) => setDraft((d) => ({ ...d, cidade: e.target.value }))}
            placeholder="Ex.: Campinas"
            className="field mt-1"
          />
        </div>

        <fieldset className="py-2.5">
          <legend className="field-label">Lance atual ou inicial (R$)</legend>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {(["valorMin", "valorMax"] as const).map((key, i) => (
              <div key={key}>
                <label
                  htmlFor={id + key}
                  className="text-caption text-text-muted"
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
                  className="field mt-0.5 px-2"
                />
              </div>
            ))}
          </div>
          {error && (
            <p
              id={id + "erro"}
              role="alert"
              className="mt-1.5 text-caption text-danger-text"
            >
              {error}
            </p>
          )}
        </fieldset>
      </div>

      <div className="pt-2.5 md:border-t md:border-border-subtle md:p-2.5">
        <button type="submit" className="primary-link w-full">
          Aplicar filtros
        </button>
      </div>
    </form>
  );
}
