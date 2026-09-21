"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { AssetVisual } from "@/components/ui/AssetVisual";
import { Category } from "@/lib/data";

export function Gallery({ category, count, title }: { category: Category; count: number; title: string }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const images = Array.from({ length: Math.max(count, 1) });

  function go(delta: number) {
    setActive((current) => (current + delta + images.length) % images.length);
  }

  useEffect(() => {
    if (lightboxOpen) closeButtonRef.current?.focus();
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, images.length]);

  return (
    <div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group relative block w-full overflow-hidden rounded-card"
          aria-label={`Ampliar imagem ${active + 1} de ${images.length}`}
        >
          <AssetVisual category={category} index={active} iconSize={96} className="aspect-[4/3] w-full" showLabel />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-brand-900/80 px-3 py-1 text-caption text-text-inverse">
            <Expand className="h-3.5 w-3.5" aria-hidden="true" />
            {active + 1} de {images.length}
          </span>
        </button>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Imagem anterior"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface-card/90 shadow-card"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima imagem"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface-card/90 shadow-card"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagem ${i + 1} de ${images.length}`}
              aria-current={active === i}
              className={`overflow-hidden rounded-control ${active === i ? "ring-2 ring-focus-ring" : ""}`}
            >
              <AssetVisual category={category} index={i} iconSize={22} className="aspect-square w-full" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria de fotos: ${title}`}
          className="fixed inset-0 z-50 flex flex-col bg-brand-900/95 p-4"
        >
          <div className="flex justify-end">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Fechar galeria"
              className="on-dark flex h-11 w-11 items-center justify-center rounded-full text-text-inverse hover:bg-white/10"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center">
            <AssetVisual category={category} index={active} iconSize={140} className="aspect-[4/3] w-full max-w-2xl" showLabel />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Imagem anterior"
                  className="on-dark absolute left-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-text-inverse hover:bg-white/20"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Próxima imagem"
                  className="on-dark absolute right-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-text-inverse hover:bg-white/20"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
          <p className="text-center text-caption text-white/70">
            {active + 1} de {images.length} — {title}
          </p>
        </div>
      )}
    </div>
  );
}
