"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Search, X } from "lucide-react";
import { CATEGORY_LABELS, Category, Modalidade } from "@/lib/data";
import { createSlugListStore } from "@/components/shared/localSlugList";
import { parseTextList } from "@/lib/preferences";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

const ABAS: { id: Modalidade | ""; label: string }[] = [
  { id: "", label: "Todos os ativos" },
  { id: "leilao", label: "Leilões" },
  { id: "venda_direta", label: "Venda direta" },
];

/** Sugestões mostradas enquanto o navegador ainda não tem buscas próprias. */
const SUGESTOES = ["Caminhão", "Empilhadeira", "Gerador"];

const recentes = createSlugListStore(
  "ativos-b2b:buscas-recentes",
  "ativos-b2b:buscas-recentes-change",
  5,
  parseTextList,
);

/**
 * Busca principal, sobreposta à abertura. As abas escolhem a modalidade; a
 * consulta vai por GET para /resultados, como URL compartilhável.
 *
 * As buscas recentes são as desta pessoa, neste navegador — não uma lista
 * fixa. Enquanto não houver nenhuma, o rótulo muda para "Sugestões", para não
 * apresentar exemplo como histórico.
 */
export function SearchPanel({ states }: { states: { uf: string; name: string }[] }) {
  const id = useId();
  const [aba, setAba] = useState<Modalidade | "">("");
  const historico = recentes.useList();
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  function lembrar(termo: string) {
    const t = termo.trim().slice(0, 60);
    if (!t) return;
    const atual = parseTextList(recentes.readRaw(), 5).filter(
      (x) => x.toLowerCase() !== t.toLowerCase(),
    );
    recentes.write([t, ...atual]);
  }

  function esquecer(termo: string) {
    recentes.write(parseTextList(recentes.readRaw(), 5).filter((x) => x !== termo));
  }

  const termos = historico.length ? historico : SUGESTOES;
  const hrefDe = (q: string) =>
    `/resultados?${new URLSearchParams({ q, ...(aba ? { modalidade: aba } : {}) })}`;

  return (
    <section aria-label="Buscar ativos" className="relative z-20 -mt-24 lg:-mt-28">
      <div className="container-content">
        <div className="rounded-panel border border-border-subtle bg-surface-card shadow-float">
          <div className="flex items-end justify-between gap-4 border-b border-border-subtle px-3 sm:px-8">
            <div role="tablist" aria-label="Modalidade" className="scroll-rail -mb-px gap-1 sm:gap-6">
              {ABAS.map((item) => {
                const ativa = aba === item.id;
                return (
                  <button
                    key={item.label}
                    type="button"
                    role="tab"
                    aria-selected={ativa}
                    onClick={() => setAba(item.id)}
                    className={`relative shrink-0 px-2 pb-4 pt-5 text-[15px] transition-colors duration-standard sm:px-5 sm:text-[17px] ${
                      ativa
                        ? "font-bold text-action"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-[3px] origin-left rounded-full bg-action transition-transform duration-panel ease-standard ${
                        ativa ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <Link
              href="/resultados"
              className="text-link mb-3 hidden text-[15px] font-medium sm:inline-flex"
            >
              Busca avançada <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <form
            action={`${base}/resultados/`}
            role="search"
            onSubmit={(e) => lembrar(String(new FormData(e.currentTarget).get("q") ?? ""))}
            className="grid gap-4 px-5 pb-6 pt-5 sm:px-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,.85fr)_minmax(0,.85fr)_auto] lg:items-end"
          >
            {aba && <input type="hidden" name="modalidade" value={aba} />}

            <div>
              <label htmlFor={`${id}-q`} className="field-label text-[15px] font-medium">
                Qual ativo sua empresa procura?
              </label>
              <div className="relative mt-2">
                <Search
                  size={20}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
                />
                <input
                  id={`${id}-q`}
                  name="q"
                  type="search"
                  maxLength={160}
                  placeholder="Digite marca, modelo ou palavra-chave…"
                  className="field pl-12"
                />
              </div>
            </div>

            <div>
              <label htmlFor={`${id}-cat`} className="field-label text-[15px] font-medium">
                Categoria
              </label>
              <div className="relative mt-2">
                <select id={`${id}-cat`} name="categoria" defaultValue="" className="field appearance-none pr-10">
                  <option value="">Todas as categorias</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {CATEGORY_LABELS[c]}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
              </div>
            </div>

            <div>
              <label htmlFor={`${id}-uf`} className="field-label text-[15px] font-medium">
                Estado
              </label>
              <div className="relative mt-2">
                <select id={`${id}-uf`} name="uf" defaultValue="" className="field appearance-none pr-10">
                  <option value="">Todos os estados</option>
                  {states.map((s) => (
                    <option key={s.uf} value={s.uf}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
              </div>
            </div>

            <button type="submit" className="primary-link group h-12 px-8 text-[16px] lg:min-w-[210px]">
              Buscar
              <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-standard group-hover:translate-x-1" />
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-2.5 px-5 pb-6 sm:px-8">
            <span className="text-[15px] text-text-secondary">
              {historico.length ? "Buscas recentes:" : "Sugestões:"}
            </span>
            {termos.map((termo) => (
              <span
                key={termo}
                className="inline-flex min-h-9 items-center rounded-full border border-border-strong bg-surface-card text-[14px] text-text-secondary transition-colors duration-standard hover:border-action"
              >
                <Link
                  href={hrefDe(termo)}
                  onClick={() => lembrar(termo)}
                  className={`py-1.5 pl-4 hover:text-action ${historico.length ? "pr-1.5" : "pr-4"}`}
                >
                  {termo}
                </Link>
                {historico.length > 0 && (
                  <button
                    type="button"
                    onClick={() => esquecer(termo)}
                    aria-label={`Remover “${termo}” das buscas recentes`}
                    className="mr-1.5 flex h-7 w-7 items-center justify-center rounded-full text-text-muted hover:bg-surface-subtle hover:text-action"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
