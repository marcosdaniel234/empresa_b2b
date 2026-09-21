"use client";

import { useState } from "react";
import { Asset } from "@/lib/data";
import { AssetCard } from "./AssetCard";
import { EmptyState } from "@/components/ui/EmptyState";

type Tab = "abertos" | "todos" | "encerrados";

const TABS: { key: Tab; label: string }[] = [
  { key: "abertos", label: "Disponíveis" },
  { key: "todos", label: "Todos" },
  { key: "encerrados", label: "Encerrados" },
];

function matches(asset: Asset, tab: Tab) {
  if (tab === "abertos")
    return (
      asset.status === "aberto" ||
      asset.status === "encerrando" ||
      asset.status === "agendado"
    );
  if (tab === "encerrados")
    return (
      asset.status === "encerrado_vencedor" ||
      asset.status === "encerrado_sem_vencedor"
    );
  return true;
}

export function CompanyAssetTabs({ assets }: { assets: Asset[] }) {
  const [tab, setTab] = useState<Tab>("abertos");
  const filtered = assets.filter((asset) => matches(asset, tab));

  return (
    <div>
      <div
        role="group"
        aria-label="Lotes da empresa"
        className="scroll-rail gap-1 border-b border-border-subtle"
      >
        {TABS.map((t) => {
          const total = assets.filter((asset) => matches(asset, t.key)).length;
          return (
            <button
              key={t.key}
              type="button"
              aria-pressed={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`-mb-px inline-flex min-h-11 shrink-0 items-center gap-1.5 border-b-2 px-3 text-label font-semibold transition-colors duration-quick ${
                tab === t.key
                  ? "border-action text-action"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              {t.label}
              <span className="text-caption font-normal text-text-secondary tabular">
                {total}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        {filtered.length === 0 ? (
          <EmptyState
            title="Nenhum lote nesta aba."
            description="Veja as outras abas para os demais lotes desta empresa."
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((asset, i) => (
              <AssetCard key={asset.id} asset={asset} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
