import Link from "next/link";
import { Asset, CATEGORY_SHORT, getCompanyBySlug } from "@/lib/data";
import { formatCurrencyCard, formatShortDate } from "@/lib/format";
import { DeadlineLabel } from "@/components/auction/CountdownClock";
import { StatusChip } from "@/components/ui/StatusChip";
import { CompareToggle } from "./CompareToggle";
import { BidMovement } from "./BidMovement";

const CLOSED: Asset["status"][] = [
  "encerrado_vencedor",
  "encerrado_sem_vencedor",
  "cancelado",
];

/** Listagem comparável dos lotes, no formato de tabela de dados. */
export function LotTable({ assets }: { assets: Asset[] }) {
  return (
    <div className="overflow-x-auto border border-border-subtle bg-white">
      <table className="data-table min-w-[760px]">
        <caption className="sr-only">
          Lotes do catálogo, com situação, localização, encerramento e valor.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-20">
              Comparar
            </th>
            <th scope="col">Lote</th>
            <th scope="col">Descrição</th>
            <th scope="col">Categoria</th>
            <th scope="col">Localização</th>
            <th scope="col">Encerramento</th>
            <th scope="col" className="text-right">
              Lances
            </th>
            <th scope="col" className="text-right">
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => {
            const company = getCompanyBySlug(asset.companySlug);
            const isClosed = CLOSED.includes(asset.status);
            return (
              <tr key={asset.id}>
                <td>
                  <CompareToggle slug={asset.slug} title={asset.title} />
                </td>
                <td className="whitespace-nowrap">
                  <span className="lot-tag">{asset.lot}</span>
                </td>
                <td>
                  <Link
                    href={`/leilao/${asset.slug}`}
                    className="font-semibold text-text-primary hover:text-action hover:underline"
                  >
                    {asset.title}
                  </Link>
                  <span className="mt-0.5 block text-caption text-text-muted">
                    {company?.name}
                  </span>
                </td>
                <td className="whitespace-nowrap text-text-secondary">
                  {CATEGORY_SHORT[asset.category]}
                </td>
                <td className="whitespace-nowrap text-text-secondary">
                  {asset.city} · {asset.state}
                </td>
                <td className="whitespace-nowrap">
                  <StatusChip status={asset.status} />
                  <span className="mt-1 block text-caption text-text-secondary">
                    {isClosed ? (
                      formatShortDate(asset.deadlineIso)
                    ) : asset.status === "agendado" ? (
                      "Início em breve"
                    ) : (
                      <DeadlineLabel deadlineIso={asset.deadlineIso} />
                    )}
                  </span>
                </td>
                <td className="text-right text-text-secondary tabular">
                  {asset.bidCount}
                </td>
                <td className="whitespace-nowrap text-right">
                  <span className="block font-bold text-text-primary tabular">
                    {formatCurrencyCard(asset.currentBid ?? asset.startingBid)}
                  </span>
                  <BidMovement
                    startingBid={asset.startingBid}
                    currentBid={asset.currentBid}
                    className="justify-end"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
