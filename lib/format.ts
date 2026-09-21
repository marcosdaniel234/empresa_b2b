/**
 * Formatação de valores monetários e datas em português brasileiro,
 * conforme FUNDACAO_ESTETICA.md §4 (algarismos tabulares, BRL completo
 * em revisão/recibo, datas com fuso explícito).
 */

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const currencyFormatterNoCents = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Sempre com centavos, uso obrigatório em revisão e recibo de lance. */
export function formatCurrencyFull(value: number): string {
  return currencyFormatter.format(value);
}

/** Sem centavos apenas quando o valor for redondo (ex.: cards de catálogo). */
export function formatCurrencyCard(value: number): string {
  return Number.isInteger(value)
    ? currencyFormatterNoCents.format(value)
    : currencyFormatter.format(value);
}

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});

/** Data/hora completa para contexto de confirmação, com fuso explícito no texto. */
export function formatDateTimeWithZone(iso: string): string {
  const formatted = dateTimeFormatter.format(new Date(iso)).replace(".", "");
  return `${formatted} · horário de Brasília`;
}

const shortDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  timeZone: "America/Sao_Paulo",
});

export function formatShortDate(iso: string): string {
  return shortDateFormatter.format(new Date(iso)).replace(".", "");
}

export interface CountdownParts {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function getCountdownParts(
  deadlineIso: string,
  nowMs: number = Date.now(),
): CountdownParts {
  const totalMs = new Date(deadlineIso).getTime() - nowMs;
  const isPast = totalMs <= 0;
  const clamped = Math.max(totalMs, 0);
  const days = Math.floor(clamped / (24 * 60 * 60 * 1000));
  const hours = Math.floor((clamped / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((clamped / (60 * 1000)) % 60);
  const seconds = Math.floor((clamped / 1000) % 60);
  return { totalMs, days, hours, minutes, seconds, isPast };
}

/** Rótulo curto e estável para cards ("Encerra em 2 dias", "Encerra em 3h"). */
export function formatDeadlineLabel(
  deadlineIso: string,
  nowMs: number = Date.now(),
): string {
  const { days, hours, minutes, isPast } = getCountdownParts(
    deadlineIso,
    nowMs,
  );
  if (isPast) return "Prazo atingido";
  if (days >= 1) return `Encerra em ${days} dia${days > 1 ? "s" : ""}`;
  if (hours >= 1) return `Encerra em ${hours}h`;
  return `Encerra em ${Math.max(minutes, 1)} min`;
}

export function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}
