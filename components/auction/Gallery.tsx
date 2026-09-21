"use client";
import { useState } from "react";
import { Expand } from "lucide-react";
import { AssetVisual } from "@/components/ui/AssetVisual";
import { Dialog } from "@/components/ui/Dialog";
import { Category } from "@/lib/data";

export function Gallery({
  category,
  title,
}: {
  category: Category;
  count: number;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-card border border-border-subtle bg-white"
        aria-label={`Ampliar ilustração: ${title}`}
      >
        <AssetVisual
          category={category}
          showLabel={false}
          rounded=""
          className="aspect-[16/10] w-full"
        />
        <span className="absolute bottom-3 right-3 inline-flex min-h-11 items-center gap-2 rounded-control border border-border-subtle bg-white px-3 text-label font-semibold text-text-primary shadow-card">
          <Expand size={17} aria-hidden="true" />
          Ampliar
        </span>
      </button>
      <p className="mt-2 text-caption text-text-secondary">
        Ilustração da categoria. Fotografias do ativo ainda não foram
        adicionadas.
      </p>
      {open && (
        <Dialog
          title={title}
          onClose={() => setOpen(false)}
          className="wide-dialog"
        >
          <AssetVisual
            category={category}
            showLabel={false}
            className="aspect-[16/10] w-full"
          />
          <p className="mt-3 text-metadata text-text-secondary">
            Imagem ilustrativa, sem vínculo com um equipamento real.
          </p>
        </Dialog>
      )}
    </div>
  );
}
