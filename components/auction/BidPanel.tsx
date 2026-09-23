"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock3, Gavel, Info, Tag } from "lucide-react";
import { Asset, modalidadeOf } from "@/lib/data";
import { formatCurrencyFull, formatDateTimeWithZone } from "@/lib/format";
import { validateDemoBid } from "@/lib/money";
import { Button } from "@/components/ui/Button";
import { BidMovement } from "@/components/catalog/BidMovement";
import { CountdownClock, useDemoClock } from "./CountdownClock";
import { BidPhase, BidReviewModal } from "./BidReviewModal";

export function BidPanel({ asset }: { asset: Asset }) {
  const minimum =
    asset.currentBid !== null
      ? asset.currentBid + asset.minIncrement
      : asset.startingBid;
  const [input, setInput] = useState(minimum.toFixed(2).replace(".", ","));
  const [phase, setPhase] = useState<BidPhase | null>(null);
  const [amount, setAmount] = useState(minimum);
  const [receiptTime, setReceiptTime] = useState<string>();
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(true);
  const panel = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sending = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const now = useDemoClock();
  // Venda direta: preço fixo, sem disputa — o painel fala de compra, não de lance.
  const direta = modalidadeOf(asset) === "venda_direta";
  const Icone = direta ? Tag : Gavel;
  const isOpen = asset.status === "aberto" || asset.status === "encerrando";
  const expired = now > 0 && now >= Date.parse(asset.deadlineIso);
  const canReview = isOpen && !expired && now > 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    if (panel.current) observer.observe(panel.current);
    return () => {
      observer.disconnect();
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function review() {
    if (!canReview || Date.now() >= Date.parse(asset.deadlineIso)) {
      setError("O prazo desta demonstração foi atingido.");
      return;
    }
    const result = validateDemoBid(input, minimum);
    if (result.error || result.cents === null) {
      setError(result.error ?? "Confira o valor informado.");
      panel.current?.scrollIntoView({ block: "center" });
      inputRef.current?.focus({ preventScroll: true });
      return;
    }
    setError("");
    setAmount(result.cents / 100);
    setPhase("review");
  }

  function confirm() {
    if (sending.current) return;
    if (Date.now() >= Date.parse(asset.deadlineIso)) {
      setPhase("uncertain");
      return;
    }
    sending.current = true;
    setPhase("confirming");
    timer.current = setTimeout(() => {
      setReceiptTime(new Date().toISOString());
      setPhase("accepted");
      sending.current = false;
    }, 600);
  }

  return (
    <div>
      <div ref={panel} id="painel-lance" className="panel overflow-hidden">
        <div className="flex items-center justify-between gap-2 border-b border-border-subtle bg-surface-subtle px-4 py-2.5">
          <p className="inline-flex items-center gap-2 text-label font-semibold text-text-primary">
            <Icone size={16} aria-hidden="true" className="text-action" />
            {direta ? "Informações da venda direta" : "Informações do leilão"}
          </p>
          <span className="lot-tag">{asset.lot}</span>
        </div>

        <div className="p-4">
          <p className="text-metadata text-text-secondary">
            {direta
              ? "Preço de venda"
              : asset.status === "encerrado_vencedor"
                ? "Valor final do exemplo"
                : asset.currentBid !== null
                  ? "Lance atual"
                  : "Lance inicial"}
          </p>
          <p className="mt-0.5 break-words text-value tracking-tight text-text-primary tabular">
            {formatCurrencyFull(asset.currentBid ?? asset.startingBid)}
          </p>
          <BidMovement
            startingBid={asset.startingBid}
            currentBid={asset.currentBid}
            className="mt-1"
          />

          {isOpen && (
            <>
              {!direta && (
              <dl className="mt-4 divide-y divide-border-subtle border-y border-border-subtle text-metadata">
                <div className="flex flex-wrap items-baseline justify-between gap-2 py-2">
                  <dt className="text-text-secondary">Próximo mínimo</dt>
                  <dd className="font-semibold text-text-primary tabular">
                    {formatCurrencyFull(minimum)}
                  </dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 py-2">
                  <dt className="text-text-secondary">Incremento mínimo</dt>
                  <dd className="text-text-primary tabular">
                    {formatCurrencyFull(asset.minIncrement)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-2 py-2">
                  <dt className="text-text-secondary">Lances no exemplo</dt>
                  <dd className="text-text-primary tabular">
                    {asset.bidCount}
                  </dd>
                </div>
              </dl>
              )}

              <div className="my-4 rounded-control bg-surface-subtle p-3">
                <p className="flex items-center gap-2 text-label font-semibold text-text-primary">
                  <Clock3 size={16} aria-hidden="true" />
                  {direta ? "Disponível até" : "Encerramento do exemplo"}
                </p>
                <p className="mt-1.5 text-metadata text-text-secondary">
                  {formatDateTimeWithZone(asset.deadlineIso)}
                </p>
                <p className="mt-1.5 text-title-section text-text-primary">
                  <CountdownClock deadlineIso={asset.deadlineIso} />
                </p>
              </div>

              {canReview ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    review();
                  }}
                >
                  <label htmlFor="valor-lance" className="field-label">
                    {direta ? "Valor da compra (R$)" : "Valor para simular (R$)"}
                  </label>
                  <input
                    ref={inputRef}
                    id="valor-lance"
                    inputMode="decimal"
                    type="text"
                    autoComplete="off"
                    maxLength={24}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setError("");
                    }}
                    aria-invalid={!!error}
                    aria-describedby="ajuda-lance"
                    className={`field mt-1.5 h-12 text-body tabular ${
                      error ? "border-danger-text" : ""
                    }`}
                  />
                  <p
                    id="ajuda-lance"
                    className={`mt-1.5 text-metadata ${error ? "text-danger-text" : "text-text-secondary"}`}
                    role={error ? "alert" : undefined}
                  >
                    {error ||
                      (direta
                        ? `Preço anunciado: ${formatCurrencyFull(minimum)}. Você revisa antes de concluir.`
                        : `A partir de ${formatCurrencyFull(minimum)}. Você revisa antes de concluir.`)}
                  </p>
                  <Button type="submit" fullWidth className="mt-3">
                    {direta ? "Revisar compra" : "Revisar simulação"}
                    <ArrowRight size={17} aria-hidden="true" />
                  </Button>
                </form>
              ) : (
                <p className="rounded-control bg-warning-surface p-3 text-metadata text-warning-text">
                  {expired
                    ? "O prazo desta demonstração foi atingido. Explore outros lotes do catálogo."
                    : "Carregando o prazo da demonstração…"}
                </p>
              )}
            </>
          )}

          {!isOpen && (
            <div className="mt-4 rounded-control bg-surface-subtle p-3 text-metadata">
              <p className="font-semibold text-text-primary">
                {asset.status === "agendado"
                  ? "Leilão agendado"
                  : asset.status === "cancelado"
                    ? "Leilão cancelado"
                    : "Leilão encerrado"}
              </p>
              <p className="mt-1.5 text-text-secondary">
                {asset.status === "agendado"
                  ? `Início previsto: ${formatDateTimeWithZone(asset.startsAtIso ?? asset.deadlineIso)}.`
                  : "Este lote faz parte do catálogo de demonstração e não recebe lances."}
              </p>
              <Link href="/resultados?status=aberto" className="text-link mt-2">
                Ver leilões abertos <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          )}

          <p className="mt-4 flex items-start gap-2 text-caption text-text-secondary">
            <Info size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
            Modo demonstração. Não há envio de {direta ? "pedido" : "lance"},
            cobrança ou atualização em tempo real.
          </p>

          {receiptTime && !phase && (
            <p
              role="status"
              className="mt-3 rounded-control bg-success-surface p-3 text-metadata text-success-text"
            >
              Última simulação: {formatCurrencyFull(amount)}. Nada foi
              registrado.
            </p>
          )}
        </div>
      </div>

      {canReview && !visible && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border-subtle bg-white p-3 shadow-elevated md:hidden"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
        >
          <div className="min-w-0 flex-1">
            <p className="text-caption text-text-secondary">
              {direta ? "Preço de venda" : "Próximo mínimo"} · {asset.lot}
            </p>
            <p className="truncate text-title-card text-text-primary tabular">
              {formatCurrencyFull(minimum)}
            </p>
          </div>
          <Button
            onClick={() => {
              panel.current?.scrollIntoView({ block: "center" });
              inputRef.current?.focus({ preventScroll: true });
            }}
          >
            {direta ? "Simular compra" : "Simular lance"}
          </Button>
        </div>
      )}

      {phase && (
        <BidReviewModal
          asset={asset}
          direta={direta}
          phase={phase}
          bidValue={amount}
          receiptTime={receiptTime}
          onClose={() => setPhase(null)}
          onConfirm={confirm}
          onBackToBoard={() => setPhase(null)}
        />
      )}
    </div>
  );
}
