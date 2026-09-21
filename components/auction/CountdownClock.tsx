"use client";

import { useSyncExternalStore } from "react";
import { getCountdownParts, pad2 } from "@/lib/format";

function subscribe(callback: () => void) {
  const interval = setInterval(callback, 1000);
  return () => clearInterval(interval);
}

function getSnapshot() {
  return Date.now();
}

/** No servidor/hidratação inicial não há relógio; 0 é o sentinela de "ainda não medido". */
function getServerSnapshot() {
  return 0;
}

/**
 * Relógio derivado do horário; dígitos tabulares, sem animação de rolagem
 * (ANIMACOES_E_MICROINTERACOES.md M15). Sincroniza com o relógio do sistema
 * via useSyncExternalStore — não anunciado continuamente a leitores de tela.
 */
export function CountdownClock({ deadlineIso, className = "" }: { deadlineIso: string; className?: string }) {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (now === 0) {
    return <span className={`tabular ${className}`}>--:--:--</span>;
  }

  const { days, hours, minutes, seconds, isPast } = getCountdownParts(deadlineIso, now);

  if (isPast) {
    return <span className={`tabular ${className}`}>Prazo atingido</span>;
  }

  if (days >= 1) {
    return (
      <span className={`tabular ${className}`}>
        {days}d {pad2(hours)}h {pad2(minutes)}min
      </span>
    );
  }

  return (
    <span className={`tabular ${className}`}>
      {pad2(hours)}:{pad2(minutes)}:{pad2(seconds)}
    </span>
  );
}
