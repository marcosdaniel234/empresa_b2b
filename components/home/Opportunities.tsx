"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Asset, CATEGORY_SHORT, Category } from "@/lib/data";
import { assetPhoto, photoSources } from "@/lib/images";
import { AssetCard } from "@/components/catalog/AssetCard";
import { Backdrop } from "@/components/brand/Backdrop";

const CATEGORIES = Object.keys(CATEGORY_SHORT) as Category[];

type Ordem = "recentes" | "encerrando" | "maior" | "menor";
const ORDENS: { id: Ordem; label: string }[] = [
  { id: "recentes", label: "Mais recentes" },
  { id: "encerrando", label: "Encerrando primeiro" },
  { id: "maior", label: "Maior valor" },
  { id: "menor", label: "Menor valor" },
];

const valor = (a: Asset) => a.currentBid ?? a.startingBid;

function ordenar(list: Asset[], ordem: Ordem) {
  const copia = [...list];
  if (ordem === "encerrando")
    return copia.sort((a, b) => Date.parse(a.deadlineIso) - Date.parse(b.deadlineIso));
  if (ordem === "maior") return copia.sort((a, b) => valor(b) - valor(a));
  if (ordem === "menor") return copia.sort((a, b) => valor(a) - valor(b));
  return copia.sort((a, b) => b.lot.localeCompare(a.lot));
}

/** Painel decorativo das margens em telas muito largas, como na referência. */
function SideRail({ side, text, slug }: { side: "left" | "right"; text: string; slug: string }) {
  const photo = photoSources(assetPhoto(slug));
  return (
    <div
      aria-hidden="true"
      className={`on-dark absolute top-0 hidden h-[300px] overflow-hidden bg-brand-900 min-[1720px]:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
      style={{ width: "calc((100vw - 1360px) / 2 - 24px)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- decorativo, exportação estática */}
      <img
        src={photo.src.replace(/\.webp$/, "-640.webp")}
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-30 mix-blend-luminosity"
      />
      <Backdrop fade="none" />
      <p
        className={`relative mt-14 whitespace-pre-line px-6 text-[11px] font-semibold uppercase leading-5 tracking-[.26em] text-white/75 ${
          side === "right" ? "text-left" : ""
        }`}
      >
        {text}
        <span className="mt-3 block h-[2px] w-7 bg-copper-bright" />
      </p>
    </div>
  );
}

export function Opportunities({ assets }: { assets: Asset[] }) {
  const id = useId();
  const [categoria, setCategoria] = useState<Category | "">("");
  const [ordem, setOrdem] = useState<Ordem>("recentes");

  const vivos = assets.filter((a) => a.status === "aberto" || a.status === "encerrando");
  const filtrados = categoria ? vivos.filter((a) => a.category === categoria) : vivos;
  const mostrados = ordenar(filtrados, ordem).slice(0, 4);
  const contagem = (c: Category) => vivos.filter((a) => a.category === c).length;
  const destino = categoria ? `/resultados?categoria=${categoria}` : "/resultados";

  return (
    <section aria-labelledby={`${id}-titulo`} className="relative pb-16 pt-6 lg:pb-24">
      <SideRail side="left" text={"Negócios\nque movimentam\nempresas"} slug="porta-paletes-500-posicoes" />
      <SideRail side="right" text={"Ativos hoje.\nEmpresas mais\nfortes amanhã."} slug="colhedora-de-cana-2016" />

      <div className="container-content">
        <div className="section-heading" data-reveal>
          <div className="flex items-start gap-5 sm:gap-8">
            <span className="section-index mt-2 sm:mt-3">01</span>
            <div>
              <h2 id={`${id}-titulo`} className="section-title">
                Oportunidades em movimento
              </h2>
              <p className="mt-2 text-[17px] text-text-secondary">
                Equipamentos, veículos e estruturas que impulsionam o seu negócio.
              </p>
            </div>
          </div>
          <Link href="/resultados" className="text-link text-[15px] font-medium">
            Ver todos os ativos <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4" data-reveal="1">
          <div role="group" aria-label="Filtrar por categoria" className="scroll-rail -mx-4 gap-2 px-4 sm:mx-0 sm:px-0">
            <button
              type="button"
              aria-pressed={categoria === ""}
              onClick={() => setCategoria("")}
              className={`chip shrink-0 ${categoria === "" ? "chip-active" : ""}`}
            >
              Todos <span className="tabular opacity-80">({vivos.length})</span>
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={categoria === c}
                onClick={() => setCategoria(c)}
                className={`chip shrink-0 ${categoria === c ? "chip-active" : ""}`}
              >
                {CATEGORY_SHORT[c]} <span className="tabular opacity-80">({contagem(c)})</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor={`${id}-ordem`} className="text-[15px] text-text-primary">
              Ordenar por
            </label>
            <div className="relative">
              <select
                id={`${id}-ordem`}
                value={ordem}
                onChange={(e) => setOrdem(e.target.value as Ordem)}
                className="field h-11 w-48 appearance-none pr-9 text-label"
              >
                {ORDENS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            </div>
          </div>
        </div>

        <ul
          key={`${categoria}-${ordem}`}
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          aria-live="polite"
        >
          {mostrados.map((asset, i) => (
            <li key={asset.id} className="animate-rise" style={{ animationDelay: `${i * 70}ms` }}>
              <AssetCard asset={asset} />
            </li>
          ))}
        </ul>

        {filtrados.length > mostrados.length && (
          <p className="mt-6 text-center">
            <Link href={destino} className="text-link text-[15px]">
              Ver os {filtrados.length} ativos
              {categoria ? ` de ${CATEGORY_SHORT[categoria].toLowerCase()}` : ""}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
