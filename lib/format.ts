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

/**
 * Variação percentual do lance atual sobre o lance inicial. `null` quando
 * ainda não há lance (o card mostra o valor inicial, não uma variação).
 */
export function getBidMovementPercent(
  startingBid: number,
  currentBid: number | null,
): number | null {
  if (currentBid === null || startingBid <= 0) return null;
  const percent = ((currentBid - startingBid) / startingBid) * 100;
  return Math.round(percent);
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

/**
 * Contagem compacta dos cartões ("2d 14h 32m", "14h 32m", "32m 10s"). Mostra
 * sempre as duas ou três unidades mais significativas, para a largura do
 * rótulo quase não variar enquanto o relógio anda.
 */
export function formatCompactCountdown(
  deadlineIso: string,
  nowMs: number = Date.now(),
): string {
  const { days, hours, minutes, seconds, isPast } = getCountdownParts(
    deadlineIso,
    nowMs,
  );
  if (isPast) return "Encerrado";
  if (days >= 1) return `${days}d ${pad2(hours)}h ${pad2(minutes)}m`;
  if (hours >= 1) return `${hours}h ${pad2(minutes)}m`;
  return `${minutes}m ${pad2(seconds)}s`;
}

export function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

/** Iniciais para o monograma de uma empresa ("Metalfor Industrial Ltda." → "MI"). */
export function companyInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Nome sem a natureza jurídica, para rótulos curtos. */
export function companyShortName(name: string): string {
  return name.replace(/ (Ltda\.|S\.A\.)$/, "");
}
