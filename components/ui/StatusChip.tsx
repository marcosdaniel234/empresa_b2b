import { AuctionStatus } from "@/lib/data";

const STATUS_META: Record<AuctionStatus, { label: string; className: string }> =
  {
    agendado: {
      label: "Agendado",
      className: "bg-info-surface text-info-text",
    },
    aberto: {
      label: "Aberto",
      className: "bg-action text-white",
    },
    encerrando: {
      label: "Encerrando",
      className: "bg-warning-surface text-warning-text",
    },
    encerrado_vencedor: {
      label: "Encerrado",
      className: "bg-success-surface text-success-text",
    },
    encerrado_sem_vencedor: {
      label: "Encerrado",
      className: "bg-surface-raised text-text-secondary",
    },
    cancelado: {
      label: "Cancelado",
      className: "bg-surface-raised text-text-secondary",
    },
  };

export function StatusChip({
  status,
  className = "",
}: {
  status: AuctionStatus;
  className?: string;
}) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center rounded-[3px] px-2 py-1 text-micro font-semibold uppercase tracking-[.07em] leading-none ${meta.className} ${className}`}
    >
      {meta.label}
    </span>
  );
}
