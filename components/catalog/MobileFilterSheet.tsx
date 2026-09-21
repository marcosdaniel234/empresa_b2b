"use client";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { FilterState } from "@/lib/filters";
import { Dialog } from "@/components/ui/Dialog";
import { FiltersForm } from "./FiltersForm";

export function MobileFilterSheet({
  initial,
  activeCount,
}: {
  initial: FilterState;
  activeCount: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-control border border-border-strong bg-white text-label font-semibold text-text-primary"
      >
        <SlidersHorizontal size={17} aria-hidden="true" />
        Filtrar
        {activeCount > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-action px-1.5 text-micro font-semibold text-white tabular">
            {activeCount}
          </span>
        )}
      </button>
      {open && (
        <Dialog title="Filtrar catálogo" onClose={() => setOpen(false)}>
          <FiltersForm initial={initial} onApplied={() => setOpen(false)} />
        </Dialog>
      )}
    </>
  );
}
