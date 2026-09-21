"use client";

import { useState } from "react";
import { Asset } from "@/lib/data";
import { AssetCard } from "./AssetCard";
import { EmptyState } from "@/components/ui/EmptyState";

type Tab = "abertos" | "todos" | "encerrados";

const TABS: { key: Tab; label: string }[] = [
  { key: "abertos", label: "Ativos" },
  { key: "todos", label: "Todos" },
  { key: "encerrados", label: "Encerrados" },
];

export function CompanyAssetTabs({ assets }: { assets: Asset[] }) {
  const [tab, setTab] = useState<Tab>("abertos");

  const filtered = assets.filter((asset) => {
    if (tab === "abertos") return asset.status === "aberto" || asset.status === "encerrando" || asset.status === "agendado";
    if (tab === "encerrados") return asset.status === "encerrado_vencedor" || asset.status === "encerrado_sem_vencedor";
    return true;
  });

  return (
    <div>
      <div role="tablist" aria-label="Leilões da empresa" className="flex gap-6 border-b border-border-subtle">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`-mb-px border-b-2 px-1 pb-3 text-label font-medium ${
              tab === t.key ? "border-action text-action" : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState title="Nenhum leilão nesta categoria." description="Veja as outras abas para os demais leilões desta empresa." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((asset, i) => (
              <AssetCard key={asset.id} asset={asset} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
