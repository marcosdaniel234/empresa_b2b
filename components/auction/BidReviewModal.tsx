"use client";
import { CheckCircle2, Info } from "lucide-react";
import { Asset, getCompanyBySlug } from "@/lib/data";
import { formatCurrencyFull, formatDateTimeWithZone } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";

export type BidPhase = "review" | "confirming" | "accepted" | "uncertain";
export function BidReviewModal({
  asset,
  phase,
  bidValue,
  receiptTime,
  onClose,
  onConfirm,
  onBackToBoard,
}: {
  asset: Asset;
  phase: BidPhase;
  bidValue: number;
  receiptTime?: string;
  onClose: () => void;
  onConfirm: () => void;
  onBackToBoard: () => void;
}) {
  const company = getCompanyBySlug(asset.companySlug);
  const title =
    phase === "accepted"
      ? "Simulação concluída"
      : phase === "uncertain"
        ? "Não foi possível concluir"
        : "Revise a simulação do lance";
  return (
    <Dialog
      title={title}
      onClose={onClose}
      dismissible={phase !== "confirming"}
    >
      <div className="mb-5 flex items-start gap-2 rounded-control bg-info-surface p-3 text-metadata text-info-text">
        <Info size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
        <p>
          Esta é uma demonstração. Nenhum lance é registrado e não há
          compromisso de compra.
        </p>
      </div>
      <dl className="divide-y divide-border-subtle border-y border-border-subtle text-metadata">
        <div className="flex items-baseline justify-between gap-4 py-2.5">
          <dt className="text-text-secondary">Lote</dt>
          <dd className="lot-tag">{asset.lot}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-2.5">
          <dt className="shrink-0 text-text-secondary">Ativo</dt>
          <dd className="text-right font-semibold text-text-primary">
            {asset.title}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-2.5">
          <dt className="shrink-0 text-text-secondary">Empresa do catálogo</dt>
          <dd className="text-right text-text-primary">{company?.name}</dd>
        </div>
      </dl>
      <div className="my-4 rounded-card border border-border-subtle bg-surface-page p-4">
        <p className="text-label text-text-secondary">Valor da simulação</p>
        <p className="mt-1 break-words text-value tabular">
          {formatCurrencyFull(bidValue)}
        </p>
      </div>
      <p className="text-metadata text-text-secondary">{asset.pickup}</p>
      <div role="status" aria-live="polite" className="mt-5">
        {phase === "accepted" && (
          <div className="rounded-control bg-success-surface p-4 text-success-text">
            <p className="flex items-center gap-2 font-medium">
              <CheckCircle2 size={20} aria-hidden="true" />
              Você concluiu a revisão do lance.
            </p>
            <p className="mt-2 text-metadata">
              O catálogo permanece com os valores de exemplo.
            </p>
            <p className="mt-2 text-caption">
              {receiptTime && formatDateTimeWithZone(receiptTime)}
            </p>
          </div>
        )}
        {phase === "uncertain" && (
          <p className="rounded-control bg-warning-surface p-4 text-warning-text">
            O prazo desta demonstração foi atingido. Nenhum lance foi enviado.
          </p>
        )}
        {phase === "confirming" && (
          <p className="text-metadata text-text-secondary">
            Concluindo a simulação…
          </p>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {phase === "review" && (
          <>
            <Button onClick={onConfirm} fullWidth>
              Simular lance de {formatCurrencyFull(bidValue)}
            </Button>
            <Button variant="secondary" onClick={onClose} fullWidth>
              Voltar e editar
            </Button>
          </>
        )}
        {phase === "confirming" && (
          <Button busy busyLabel="Simulando…" fullWidth>
            Concluir
          </Button>
        )}
        {(phase === "accepted" || phase === "uncertain") && (
          <Button onClick={onBackToBoard} fullWidth>
            Voltar ao leilão
          </Button>
        )}
      </div>
    </Dialog>
  );
}
