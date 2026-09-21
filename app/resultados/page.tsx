import { Suspense } from "react";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";

export const metadata = { title: "Catálogo de ativos" };

/**
 * A filtragem acontece no navegador (ver CatalogBrowser), para que os links
 * com filtros continuem válidos na exportação estática do site.
 */
export default function ResultadosPage() {
  return (
    <Suspense
      fallback={
        <div className="container-content py-10">
          <p className="text-metadata text-text-secondary">
            Carregando o catálogo…
          </p>
        </div>
      }
    >
      <CatalogBrowser />
    </Suspense>
  );
}
