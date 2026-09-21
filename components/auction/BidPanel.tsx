"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Clock3, Info, ArrowRight } from "lucide-react";
import { Asset } from "@/lib/data";
import { formatCurrencyFull, formatDateTimeWithZone } from "@/lib/format";
import { validateDemoBid } from "@/lib/money";
import { Button } from "@/components/ui/Button";
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
      <div
        ref={panel}
        id="painel-lance"
        className="overflow-hidden rounded-[16px] border border-border-subtle bg-white shadow-card"
      >
        <div className="flex items-center justify-between border-b bg-surface-page px-6 py-4">
          <p className="text-label font-semibold">Informações do leilão</p>
          <span className="text-caption text-text-secondary">
            Lote {asset.id.toUpperCase()}
          </span>
        </div>
        <div className="p-6">
          <p className="text-metadata text-text-secondary">
            {asset.status === "encerrado_vencedor"
              ? "Valor final do exemplo"
              : asset.currentBid !== null
                ? "Lance atual"
                : "Lance inicial"}
          </p>
          <p className="mt-1 break-words text-value tracking-tight tabular">
            {formatCurrencyFull(asset.currentBid ?? asset.startingBid)}
          </p>
          {isOpen && (
            <>
              <dl className="mt-5 space-y-2 border-t pt-4 text-metadata">
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-text-secondary">Próximo mínimo</dt>
                  <dd className="font-semibold tabular">
                    {formatCurrencyFull(minimum)}
                  </dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-text-secondary">Incremento mínimo</dt>
                  <dd className="tabular">
                    {formatCurrencyFull(asset.minIncrement)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-secondary">Lances no exemplo</dt>
                  <dd>{asset.bidCount}</dd>
                </div>
              </dl>
              <div className="my-5 rounded-control bg-surface-subtle p-4">
                <p className="flex items-center gap-2 text-label">
                  <Clock3 size={17} aria-hidden="true" /> Encerramento do
                  exemplo
                </p>
                <p className="mt-2 text-metadata text-text-secondary">
                  {formatDateTimeWithZone(asset.deadlineIso)}
                </p>
                <p className="mt-2 text-title-card">
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
                  <label
                    htmlFor="valor-lance"
                    className="text-label font-semibold"
                  >
                    Valor para simular (R$)
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
                    className={`mt-2 h-12 w-full rounded-control border bg-white px-3 text-body tabular ${error ? "border-danger-text" : "border-border-control"}`}
                  />
                  <p
                    id="ajuda-lance"
                    className={`mt-2 text-metadata ${error ? "text-danger-text" : "text-text-secondary"}`}
                    role={error ? "alert" : undefined}
                  >
                    {error ||
                      `A partir de ${formatCurrencyFull(minimum)}. Você revisa antes de concluir.`}
                  </p>
                  <Button type="submit" fullWidth className="mt-4">
                    Revisar simulação{" "}
                    <ArrowRight size={17} aria-hidden="true" />
                  </Button>
                </form>
              ) : (
                <p className="rounded-control bg-warning-surface p-4 text-metadata text-warning-text">
                  {expired
                    ? "O prazo desta demonstração foi atingido. Explore outros ativos do catálogo."
                    : "Carregando o prazo da demonstração…"}
                </p>
              )}
            </>
          )}
          {!isOpen && (
            <div className="mt-5 rounded-control bg-surface-subtle p-4 text-metadata">
              <p className="font-semibold">
                {asset.status === "agendado"
                  ? "Leilão agendado"
                  : asset.status === "cancelado"
                    ? "Leilão cancelado"
                    : "Leilão encerrado"}
              </p>
              <p className="mt-2 text-text-secondary">
                {asset.status === "agendado"
                  ? `Início previsto: ${formatDateTimeWithZone(asset.startsAtIso ?? asset.deadlineIso)}.`
                  : "Este lote faz parte do catálogo de demonstração e não recebe lances."}
              </p>
              <Link href="/resultados?status=aberto" className="text-link mt-3">
                Ver leilões abertos <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          )}
          <p className="mt-5 flex items-start gap-2 text-metadata text-text-secondary">
            <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            Modo demonstração. Não há envio de lance, cobrança ou atualização em
            tempo real.
          </p>
          {receiptTime && !phase && (
            <p
              role="status"
              className="mt-4 rounded-control bg-success-surface p-3 text-metadata text-success-text"
            >
              Última simulação: {formatCurrencyFull(amount)}. Nenhum lance foi
              registrado.
            </p>
          )}
        </div>
      </div>
      {canReview && !visible && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t bg-white p-4 md:hidden"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
        >
          <div className="min-w-0 flex-1">
            <p className="text-caption text-text-secondary">Próximo mínimo</p>
            <p className="text-label font-semibold tabular">
              {formatCurrencyFull(minimum)}
            </p>
          </div>
          <Button
            onClick={() => {
              panel.current?.scrollIntoView({ block: "center" });
              inputRef.current?.focus({ preventScroll: true });
            }}
          >
            Revisar valor
          </Button>
        </div>
      )}
      {phase && (
        <BidReviewModal
          asset={asset}
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
