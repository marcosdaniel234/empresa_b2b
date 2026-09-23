"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { Company } from "@/lib/data";
import { companyInitials, companyShortName } from "@/lib/format";
import { assetPhoto } from "@/lib/images";
import { FollowButton, useFollowedStores } from "@/components/catalog/FollowButton";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { EmptyState } from "@/components/ui/EmptyState";

export interface StoreEntry {
  company: Company;
  /** Lotes ainda disponíveis (abertos, encerrando ou agendados). */
  disponiveis: number;
  /** Slugs das fotos dos primeiros lotes disponíveis. */
  fotos: { slug: string; title: string }[];
}

function normalizar(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/**
 * Diretório de lojas com busca por nome, cidade ou segmento e o filtro das
 * lojas seguidas neste navegador.
 */
export function StoreDirectory({ entries }: { entries: StoreEntry[] }) {
  const id = useId();
  const [termo, setTermo] = useState("");
  const [soSeguidas, setSoSeguidas] = useState(false);
  const seguidas = useFollowedStores();

  const q = normalizar(termo.trim());
  const lista = entries.filter(({ company: c }) => {
    if (soSeguidas && !seguidas.includes(c.slug)) return false;
    if (!q) return true;
    return normalizar(`${c.name} ${c.city} ${c.state} ${c.segment}`).includes(q);
  });

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full min-w-0 sm:w-auto sm:max-w-md sm:flex-1">
          <label htmlFor={`${id}-q`} className="sr-only">
            Buscar loja por nome, cidade ou segmento
          </label>
          <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            id={`${id}-q`}
            type="search"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Nome, cidade ou segmento…"
            className="field pl-11"
          />
        </div>
        <button
          type="button"
          aria-pressed={soSeguidas}
          onClick={() => setSoSeguidas((v) => !v)}
          className={`chip h-12 ${soSeguidas ? "chip-active" : ""}`}
        >
          Só as que sigo <span className="tabular opacity-80">({seguidas.length})</span>
        </button>
        <p className="ml-auto text-[14px] text-text-secondary" aria-live="polite">
          {lista.length} {lista.length === 1 ? "loja" : "lojas"}
        </p>
      </div>

      {lista.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title={soSeguidas && !q ? "Você ainda não segue nenhuma loja" : "Nenhuma loja encontrada"}
            description={
              soSeguidas && !q
                ? "Use o botão Seguir em uma loja para encontrá-la aqui depois."
                : "Tente outro nome, cidade ou segmento."
            }
          />
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {lista.map(({ company, disponiveis, fotos }) => (
            <li
              key={company.slug}
              className="card-lift group relative flex flex-col rounded-panel border border-border-subtle bg-surface-card p-5 shadow-card"
            >
              <div className="flex items-start gap-4">
                <span className="company-monogram h-12 w-12 text-[16px]">
                  {companyInitials(company.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[17px] font-extrabold leading-tight tracking-[-.01em]">
                    <Link
                      href={`/loja/${company.slug}`}
                      className="after:absolute after:inset-0 after:rounded-panel group-hover:text-action"
                    >
                      {companyShortName(company.name)}
                    </Link>
                  </h2>
                  <p className="mt-1 flex flex-wrap gap-x-3 text-[13px] text-text-secondary">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={13} aria-hidden="true" className="text-auction" />
                      {company.city} - {company.state}
                    </span>
                    <span>Desde {company.since}</span>
                  </p>
                </div>
                <FollowButton slug={company.slug} name={companyShortName(company.name)} tone="light" />
              </div>

              <p className="mt-3 text-[14px] text-text-secondary">{company.segment}</p>

              <ul className="mt-4 grid grid-cols-3 gap-2" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="overflow-hidden rounded-control">
                    {fotos[i] ? (
                      <ImageSlot src={assetPhoto(fotos[i].slug)} ratio="aspect-[4/3]" size="sm" sizes="140px" />
                    ) : (
                      <div className="aspect-[4/3] bg-surface-subtle" />
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4">
                <div className="flex items-center justify-between gap-3 border-t border-border-subtle pt-4">
                  <p className="text-[14px] text-text-secondary">
                    <span className="text-[18px] font-extrabold text-text-primary tabular">{disponiveis}</span>{" "}
                    {disponiveis === 1 ? "ativo disponível" : "ativos disponíveis"}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-action">
                    Ver loja <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-standard group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
