import { AuctionStatus } from "@/lib/data";

const STATUS_META: Record<AuctionStatus, { label: string; className: string }> =
  {
    agendado: {
      label: "Agendado",
      className: "bg-info-surface text-info-text",
    },
    aberto: {
      label: "Aberto",
      className: "bg-success-solid text-white",
    },
    encerrando: {
      label: "Encerrando",
      className: "bg-warning-surface text-warning-text",
    },
    encerrado_vencedor: {
      label: "Encerrado",
      className: "bg-surface-raised text-text-secondary",
    },
    encerrado_sem_vencedor: {
      label: "Encerrado",
      className: "bg-surface-raised text-text-secondary",
    },
    cancelado: {
      label: "Cancelado",
      className: "bg-danger-surface text-danger-text",
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
    <span className={`status-pill ${meta.className} ${className}`}>
      {meta.label}
    </span>
  );
}
