"use client";

import { useMemo, useState } from "react";
import { Building2, Clock, Gavel, RefreshCcw, TimerReset } from "lucide-react";
import { Asset } from "@/lib/data";
import { formatCurrencyFull, formatDateTimeWithZone, getCountdownParts } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { CountdownClock } from "./CountdownClock";
import { BidPhase, BidReviewModal } from "./BidReviewModal";

const CLOSED_RESULT: Record<string, { title: string; tone: string; description: string }> = {
  encerrado_vencedor: {
    title: "Encerrado — resultado confirmado",
    tone: "bg-success-surface text-success-text",
    description: "Este leilão foi encerrado e o resultado já foi confirmado pela plataforma.",
  },
  encerrado_sem_vencedor: {
    title: "Encerrado sem vencedor",
    tone: "bg-surface-subtle text-text-secondary",
    description: "Este leilão foi encerrado sem lances válidos suficientes.",
  },
  cancelado: {
    title: "Leilão cancelado",
    tone: "bg-surface-subtle text-text-secondary",
    description: "O vendedor cancelou este leilão antes do início dos lances.",
  },
};

export function BidPanel({ asset }: { asset: Asset }) {
  const hasBid = asset.currentBid !== null;
  const nextMinimum = hasBid ? (asset.currentBid as number) + asset.minIncrement : asset.startingBid;

  const [bidInput, setBidInput] = useState<string>(String(nextMinimum));
  const [phase, setPhase] = useState<BidPhase | null>(null);
  const [receiptTime, setReceiptTime] = useState<string>();
  const [confirmedValue, setConfirmedValue] = useState<number>(nextMinimum);
  const [error, setError] = useState<string>();

  const isPast = useMemo(() => getCountdownParts(asset.deadlineIso).isPast, [asset.deadlineIso]);
  const isOpenState = asset.status === "aberto" || asset.status === "encerrando";
  const closedInfo = CLOSED_RESULT[asset.status];

  function openReview() {
    const numeric = Number(bidInput.replace(/[^\d]/g, ""));
    if (!numeric || numeric < nextMinimum) {
      setError(`O valor deve ser de pelo menos ${formatCurrencyFull(nextMinimum)}.`);
      return;
    }
    setError(undefined);
    setConfirmedValue(numeric);
    setPhase("review");
  }

  function confirm() {
    setPhase("confirming");
    // Simulação de latência de rede — nenhuma chamada real ocorre neste MVP.
    setTimeout(() => {
      setReceiptTime(new Date().toISOString());
      setPhase("accepted");
    }, 900);
  }

  function closeModal() {
    setPhase(null);
  }

  return (
    <div>
      <div className="rounded-card border border-border-subtle bg-surface-card p-6 shadow-card">
        <div className="flex items-center gap-2">
          <Gavel className="h-5 w-5 text-action" aria-hidden="true" />
          <span className="text-label font-medium text-text-secondary">
            {isOpenState ? "Leilão aberto" : "Estado do leilão"}
          </span>
        </div>

        {isOpenState ? (
          <>
            <div className="mt-4">
              <span className="block text-caption text-text-secondary">{hasBid ? "Lance atual" : "Lance inicial"}</span>
              <span className="text-value text-text-primary tabular">
                {formatCurrencyFull(hasBid ? (asset.currentBid as number) : asset.startingBid)}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-metadata text-text-secondary">
              <span>
                Próximo mínimo: <strong className="text-text-primary tabular">{formatCurrencyFull(nextMinimum)}</strong>
              </span>
              <span>
                Incremento: <span className="tabular">{formatCurrencyFull(asset.minIncrement)}</span>
              </span>
            </div>

            <p className="mt-2 text-metadata text-text-secondary">
              {asset.bidCount} lance{asset.bidCount === 1 ? "" : "s"} válido{asset.bidCount === 1 ? "" : "s"} até agora
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-control bg-surface-subtle p-3 text-metadata text-text-primary">
              <Clock className="h-4 w-4 flex-shrink-0 text-text-secondary" aria-hidden="true" />
              <div>
                <p>{formatDateTimeWithZone(asset.deadlineIso)}</p>
                <p className="mt-0.5">
                  Tempo restante: <CountdownClock deadlineIso={asset.deadlineIso} className="font-semibold" />
                </p>
              </div>
            </div>

            {asset.antiSniping && (
              <p className="mt-3 flex items-start gap-2 text-caption text-text-secondary">
                <TimerReset className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                Lances recebidos nos últimos minutos do prazo podem prorrogar o encerramento automaticamente.
              </p>
            )}

            <div className="mt-5 border-t border-border-subtle pt-5">
              {isPast ? (
                <div className="rounded-control bg-warning-surface p-3 text-body text-warning-text">
                  Prazo atingido. Confirmando o encerramento.
                </div>
              ) : (
                <>
                  <label htmlFor="valor-lance" className="text-label font-medium text-text-primary">
                    Seu lance (R$)
                  </label>
                  <input
                    id="valor-lance"
                    type="number"
                    inputMode="numeric"
                    min={nextMinimum}
                    step={asset.minIncrement}
                    value={bidInput}
                    onChange={(e) => setBidInput(e.target.value)}
                    aria-describedby={error ? "erro-lance" : "ajuda-lance"}
                    aria-invalid={error ? true : undefined}
                    className={`mt-2 h-12 w-full rounded-control border bg-surface-card px-3 text-body text-text-primary tabular focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring ${
                      error ? "border-danger-text" : "border-border-control"
                    }`}
                  />
                  {error ? (
                    <p id="erro-lance" className="mt-1 text-caption text-danger-text">
                      {error}
                    </p>
                  ) : (
                    <p id="ajuda-lance" className="mt-1 text-caption text-text-secondary">
                      Mínimo de {formatCurrencyFull(nextMinimum)}, em incrementos de {formatCurrencyFull(asset.minIncrement)}.
                    </p>
                  )}
                  <Button fullWidth className="mt-4" onClick={openReview}>
                    Revisar lance
                  </Button>
                  <p className="mt-3 flex items-center gap-1.5 text-caption text-text-secondary">
                    <Building2 className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                    Protótipo de demonstração: este MVP ainda não autentica empresas nem organizações representadas.
                  </p>
                </>
              )}
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-caption text-text-secondary">
              <RefreshCcw className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              Dados de demonstração — não atualizados em tempo real.
            </p>
          </>
        ) : (
          closedInfo && (
            <div className="mt-4">
              <span className={`inline-flex rounded-full px-3 py-1 text-caption font-medium ${closedInfo.tone}`}>
                {closedInfo.title}
              </span>
              <p className="mt-3 text-body text-text-secondary">{closedInfo.description}</p>
              {asset.status === "encerrado_vencedor" && hasBid && (
                <div className="mt-4">
                  <span className="block text-caption text-text-secondary">Valor final</span>
                  <span className="text-value text-text-primary tabular">{formatCurrencyFull(asset.currentBid as number)}</span>
                </div>
              )}
            </div>
          )
        )}
      </div>

      {isOpenState && !isPast && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border-subtle bg-surface-card p-4 md:hidden"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
        >
          <div className="min-w-0 flex-1">
            <span className="block text-caption text-text-secondary">Próximo mínimo</span>
            <span className="block truncate text-title-card text-text-primary tabular">{formatCurrencyFull(nextMinimum)}</span>
          </div>
          <Button onClick={openReview} className="flex-shrink-0">
            Revisar lance
          </Button>
        </div>
      )}

      {phase && (
        <BidReviewModal
          asset={asset}
          phase={phase}
          bidValue={confirmedValue}
          receiptTime={receiptTime}
          onClose={closeModal}
          onConfirm={confirm}
          onBackToBoard={closeModal}
        />
      )}
    </div>
  );
}
