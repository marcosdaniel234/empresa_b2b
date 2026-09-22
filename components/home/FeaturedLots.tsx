"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Asset } from "@/lib/data";
import { AssetCard } from "@/components/catalog/AssetCard";

type Aba = "todos" | "encerrando" | "recentes" | "maior" | "menor";

const ABAS: { id: Aba; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "encerrando", label: "Encerrando em breve" },
  { id: "recentes", label: "Mais recentes" },
  { id: "maior", label: "Maior lance" },
  { id: "menor", label: "Menor lance" },
];

const valor = (a: Asset) => a.currentBid ?? a.startingBid;
const ABERTO: Asset["status"][] = ["aberto", "encerrando"];

function ordenar(assets: Asset[], aba: Aba): Asset[] {
  const vivos = assets.filter((a) => a.status !== "cancelado");
  switch (aba) {
    case "encerrando":
      return vivos
        .filter((a) => ABERTO.includes(a.status))
        .sort((a, b) => Date.parse(a.deadlineIso) - Date.parse(b.deadlineIso));
    case "recentes":
      return [...vivos].sort((a, b) => b.lot.localeCompare(a.lot, "pt-BR"));
    case "maior":
      return [...vivos].sort((a, b) => valor(b) - valor(a));
    case "menor":
      return [...vivos].sort((a, b) => valor(a) - valor(b));
    default:
      return vivos;
  }
}

/**
 * Vitrine de lotes com as abas de ordenação da referência. As abas reordenam
 * de verdade a lista — não são rótulos decorativos — e as setas deslocam o
 * trilho horizontal, que também rola por toque e por teclado.
 */
export function FeaturedLots({ assets }: { assets: Asset[] }) {
  const [aba, setAba] = useState<Aba>("todos");
  const railRef = useRef<HTMLUListElement>(null);
  const lotes = ordenar(assets, aba).slice(0, 10);

  function deslocar(direcao: 1 | -1) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direcao * (rail.clientWidth * 0.8), behavior: "smooth" });
  }

  return (
    <section
      aria-labelledby="titulo-lotes"
      className="home-band container-content pb-8 pt-2 lg:pb-10"
    >
      <div className="section-heading">
        <h2 id="titulo-lotes" className="section-title">
          Lotes em destaque
        </h2>
        <Link href="/resultados" className="text-link">
          Ver todos os lotes <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Ordenar os lotes" className="scroll-rail gap-2">
          {ABAS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={aba === item.id}
              onClick={() => setAba(item.id)}
              className={`chip ${aba === item.id ? "chip-active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          {([-1, 1] as const).map((direcao) => (
            <button
              key={direcao}
              type="button"
              onClick={() => deslocar(direcao)}
              aria-label={direcao === -1 ? "Lotes anteriores" : "Próximos lotes"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-white text-text-secondary transition-colors duration-standard ease-standard hover:border-action hover:bg-action hover:text-white"
            >
              {direcao === -1 ? (
                <ChevronLeft size={18} aria-hidden="true" />
              ) : (
                <ChevronRight size={18} aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      </div>

      <ul ref={railRef} className="scroll-rail mt-4 items-stretch gap-4 pb-1">
        {lotes.map((asset) => (
          <li key={asset.id} className="w-[270px] shrink-0 sm:w-[300px]">
            <AssetCard asset={asset} />
          </li>
        ))}
      </ul>
    </section>
  );
}
