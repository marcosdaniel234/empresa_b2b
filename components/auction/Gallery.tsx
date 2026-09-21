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
        className="relative block w-full overflow-hidden rounded-card border"
        aria-label={`Ampliar ilustração: ${title}`}
      >
        <AssetVisual category={category} className="aspect-[4/3] w-full" />
        <span className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-card">
          <Expand size={20} aria-hidden="true" />
        </span>
      </button>
      <p className="mt-3 text-caption text-text-secondary">
        Ilustração da categoria. Fotografias do ativo ainda não foram
        adicionadas.
      </p>
      {open && (
        <Dialog
          title={title}
          onClose={() => setOpen(false)}
          className="wide-dialog"
        >
          <AssetVisual category={category} className="aspect-[4/3] w-full" />
          <p className="mt-3 text-metadata text-text-secondary">
            Imagem ilustrativa, sem vínculo com um equipamento real.
          </p>
        </Dialog>
      )}
    </div>
  );
}

