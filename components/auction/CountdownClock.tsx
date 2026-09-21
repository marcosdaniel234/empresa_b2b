"use client";
import { useSyncExternalStore } from "react";
import { formatDeadlineLabel, getCountdownParts, pad2 } from "@/lib/format";

let currentTime = 0;
let interval: ReturnType<typeof setInterval> | undefined;
const listeners = new Set<() => void>();
function subscribe(callback: () => void) {
  listeners.add(callback);
  currentTime = Date.now();
  callback();
  interval ??= setInterval(() => {
    currentTime = Date.now();
    listeners.forEach((listener) => listener());
  }, 1000);
  return () => {
    listeners.delete(callback);
    if (!listeners.size) {
      clearInterval(interval);
      interval = undefined;
    }
  };
}
const getSnapshot = () => currentTime;
const getServerSnapshot = () => 0;
export function useDemoClock() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function DeadlineLabel({ deadlineIso }: { deadlineIso: string }) {
  const now = useDemoClock();
  return (
    <span>
      {now === 0 ? "Conferir prazo" : formatDeadlineLabel(deadlineIso, now)}
    </span>
  );
}

export function CountdownClock({
  deadlineIso,
  className = "",
}: {
  deadlineIso: string;
  className?: string;
}) {
  const now = useDemoClock();
  const time = getCountdownParts(deadlineIso, now);
  return (
    <span className={`tabular ${className}`}>
      {now === 0
        ? "Calculando prazo…"
        : time.isPast
          ? "Prazo atingido"
          : time.days >= 1
            ? `${time.days}d ${pad2(time.hours)}h ${pad2(time.minutes)}min`
            : `${pad2(time.hours)}:${pad2(time.minutes)}:${pad2(time.seconds)}`}
    </span>
  );
}
