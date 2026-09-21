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
        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-control border border-border-control bg-white text-label font-medium"
      >
        <SlidersHorizontal size={18} aria-hidden="true" /> Filtrar{" "}
        {activeCount > 0 && `(${activeCount})`}
      </button>
      {open && (
        <Dialog title="Filtrar resultados" onClose={() => setOpen(false)}>
          <FiltersForm initial={initial} onApplied={() => setOpen(false)} />
        </Dialog>
      )}
    </>
  );
}
