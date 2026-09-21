"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { Asset, getCompanyBySlug } from "@/lib/data";
import { formatCurrencyFull, formatDateTimeWithZone } from "@/lib/format";
import { Button } from "@/components/ui/Button";

export type BidPhase = "review" | "confirming" | "accepted" | "uncertain";

interface BidReviewModalProps {
  asset: Asset;
  phase: BidPhase;
  bidValue: number;
  receiptTime?: string;
  onClose: () => void;
  onConfirm: () => void;
  onBackToBoard: () => void;
}

export function BidReviewModal({ asset, phase, bidValue, receiptTime, onClose, onConfirm, onBackToBoard }: BidReviewModalProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const company = getCompanyBySlug(asset.companySlug);
  const canDismiss = phase === "review";

  useEffect(() => {
    titleRef.current?.focus();
  }, [phase]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && canDismiss) onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canDismiss, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="presentation">
      <div className="absolute inset-0 bg-brand-900/50" onClick={canDismiss ? onClose : undefined} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bid-modal-title"
        className="relative w-full max-w-[520px] rounded-t-modal bg-surface-card p-6 shadow-modal sm:rounded-modal"
      >
        {phase === "review" && (
          <>
            <h2 id="bid-modal-title" ref={titleRef} tabIndex={-1} className="text-title-section-mobile text-text-primary">
              Revise seu lance
            </h2>
            <div className="mt-4 space-y-3 rounded-control bg-surface-subtle p-4">
              <div>
                <span className="block text-caption text-text-secondary">Ativo</span>
                <span className="text-body font-medium text-text-primary">{asset.title}</span>
              </div>
              <div>
                <span className="block text-caption text-text-secondary">Vendedor</span>
                <span className="text-body text-text-primary">{company?.name}</span>
              </div>
              <div>
                <span className="block text-caption text-text-secondary">Mínimo conhecido no momento</span>
                <span className="text-body text-text-primary tabular">
                  {formatCurrencyFull(asset.currentBid ? asset.currentBid + asset.minIncrement : asset.startingBid)}
                </span>
              </div>
            </div>
            <div className="mt-4 rounded-control border border-border-subtle p-4">
              <span className="block text-caption text-text-secondary">Valor proposto</span>
              <span className="text-value text-text-primary tabular">{formatCurrencyFull(bidValue)}</span>
            </div>
            <p className="mt-4 text-metadata text-text-secondary">
              Você está dando este lance como parte de um protótipo de demonstração — nenhum valor real é
              registrado. Em produção, o servidor validaria este valor no envio e a organização representada
              seria exibida aqui.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button variant="secondary" onClick={onClose}>
                Voltar e editar
              </Button>
              <Button variant="primary" onClick={onConfirm}>
                Confirmar lance de {formatCurrencyFull(bidValue)}
              </Button>
            </div>
          </>
        )}

        {phase === "confirming" && (
          <>
            <h2 id="bid-modal-title" ref={titleRef} tabIndex={-1} className="text-title-section-mobile text-text-primary">
              Revise seu lance
            </h2>
            <div className="mt-4 rounded-control border border-border-subtle p-4">
              <span className="block text-caption text-text-secondary">Valor proposto</span>
              <span className="text-value text-text-primary tabular">{formatCurrencyFull(bidValue)}</span>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="primary" busy busyLabel="Confirmando…" disabled>
                Confirmar lance de {formatCurrencyFull(bidValue)}
              </Button>
            </div>
          </>
        )}

        {phase === "accepted" && (
          <>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-7 w-7 flex-shrink-0 text-success-text" aria-hidden="true" />
              <div>
                <h2 id="bid-modal-title" ref={titleRef} tabIndex={-1} className="text-title-section-mobile text-text-primary">
                  Lance de {formatCurrencyFull(bidValue)} confirmado
                </h2>
                <p className="mt-1 text-metadata text-text-secondary">
                  {receiptTime ? formatDateTimeWithZone(receiptTime) : ""} · referência DEMO-{asset.id.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-control bg-success-surface p-4 text-body text-success-text">
              Recibo de demonstração gerado. A posição de liderança é uma informação separada e pode mudar — este
              protótipo não simula outros licitantes.
            </div>
            <p className="mt-4 text-metadata text-text-secondary">
              Esta confirmação faz parte do protótipo de interface do MVP e não representa um lance real nem uma
              transação comercial.
            </p>
            <div className="mt-6 flex justify-end">
              <Button variant="primary" onClick={onBackToBoard}>
                Voltar ao leilão
              </Button>
            </div>
          </>
        )}

        {phase === "uncertain" && (
          <>
            <div className="flex items-start gap-3">
              <HelpCircle className="mt-0.5 h-7 w-7 flex-shrink-0 text-info-text" aria-hidden="true" />
              <div>
                <h2 id="bid-modal-title" ref={titleRef} tabIndex={-1} className="text-title-section-mobile text-text-primary">
                  Estamos verificando se seu lance foi registrado
                </h2>
                <p className="mt-1 text-metadata text-text-secondary">Não feche esta janela até a confirmação.</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="secondary" onClick={onBackToBoard}>
                Consultar status no leilão
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
