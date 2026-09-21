"use client";
import { useState } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Galeria do lote. As fotografias ainda não existem no catálogo de
 * demonstração, então as posições ficam reservadas — uma principal e as
 * miniaturas — na quantidade prevista para o lote.
 */
export function Gallery({ count, title }: { count: number; title: string }) {
  const total = Math.max(count, 1);
  const [active, setActive] = useState(0);

  return (
    <div>
      <ImageSlot
        ratio="aspect-[16/10]"
        size="lg"
        label={`Foto ${active + 1} de ${total}`}
        className="w-full"
      >
        <span className="absolute bottom-2 left-2 rounded-[2px] bg-white/90 px-2 py-0.5 text-micro font-semibold uppercase tracking-[.08em] text-text-secondary">
          {active + 1} / {total}
        </span>
      </ImageSlot>

      {total > 1 && (
        <div className="mt-2 grid grid-cols-6 gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-current={active === i}
              aria-label={`Selecionar posição de foto ${i + 1} de ${total}: ${title}`}
              className={`border ${
                active === i ? "border-action" : "border-transparent"
              }`}
            >
              <ImageSlot ratio="aspect-square" size="sm" className="w-full" />
            </button>
          ))}
        </div>
      )}

      <p className="mt-2 text-caption text-text-muted">
        Espaços reservados para as fotografias do lote. Nenhuma imagem foi
        publicada neste catálogo de demonstração.
      </p>
    </div>
  );
}
