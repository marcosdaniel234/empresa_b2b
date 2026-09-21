"use client";

import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { FilterState } from "@/lib/filters";
import { FiltersForm } from "./FiltersForm";

export function MobileFilterSheet({ initial, activeCount }: { initial: FilterState; activeCount: number }) {
  const [open, setOpen] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (open) {
      titleRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-control border border-border-control text-label font-medium text-text-primary"
      >
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
        Filtrar {activeCount > 0 && `(${activeCount})`}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-labelledby="filtros-titulo">
          <div className="absolute inset-0 bg-brand-900/40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-modal bg-surface-card p-5 shadow-modal">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="filtros-titulo" ref={titleRef} tabIndex={-1} className="text-title-section-mobile text-text-primary">
                Filtrar resultados
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar filtros"
                className="flex h-10 w-10 items-center justify-center rounded-control text-text-secondary hover:bg-surface-subtle"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <FiltersForm initial={initial} onApplied={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
