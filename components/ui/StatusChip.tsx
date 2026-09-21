import { AuctionStatus } from "@/lib/data";

const STATUS_META: Record<AuctionStatus, { label: string; className: string }> = {
  agendado: { label: "Agendado", className: "bg-info-surface text-info-text" },
  aberto: { label: "Leilão aberto", className: "bg-action text-text-inverse" },
  encerrando: { label: "Encerrando em breve", className: "bg-warning-surface text-warning-text" },
  encerrado_vencedor: { label: "Encerrado", className: "bg-success-surface text-success-text" },
  encerrado_sem_vencedor: { label: "Encerrado", className: "bg-surface-subtle text-text-secondary" },
  cancelado: { label: "Cancelado", className: "bg-surface-subtle text-text-secondary" },
};

export function StatusChip({ status, className = "" }: { status: AuctionStatus; className?: string }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-caption font-medium leading-none ${meta.className} ${className}`}
    >
      {meta.label}
    </span>
  );
}
