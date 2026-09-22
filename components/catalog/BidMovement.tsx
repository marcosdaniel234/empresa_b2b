import { TrendingUp } from "lucide-react";
import { getBidMovementPercent } from "@/lib/format";

/**
 * Variação percentual do lance atual sobre o lance inicial — um dado
 * verificável, calculado a partir do próprio lote, não um selo decorativo.
 */
export function BidMovement({
  startingBid,
  currentBid,
  className = "",
}: {
  startingBid: number;
  currentBid: number | null;
  className?: string;
}) {
  const percent = getBidMovementPercent(startingBid, currentBid);
  if (!percent || percent <= 0) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 text-caption font-semibold text-success-text ${className}`}
    >
      <TrendingUp size={12} aria-hidden="true" />+{percent}% sobre o inicial
    </span>
  );
}
