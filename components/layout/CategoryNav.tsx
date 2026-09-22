"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  ASSETS,
  CATEGORY_LABELS,
  CATEGORY_SHORT,
  Category,
  SUBCATEGORIES,
} from "@/lib/data";

const CATEGORIES = Object.keys(CATEGORY_SHORT) as Category[];

function lotsIn(category: Category, subcategory?: string) {
  return ASSETS.filter(
    (asset) =>
      asset.status !== "cancelado" &&
      asset.category === category &&
      (!subcategory || asset.subcategory === subcategory),
  ).length;
}

/**
 * Barra de seções do catálogo, só a partir de `lg` — abaixo disso a navegação
 * é o botão Menu. O item "Categorias" abre um painel de dois lados: a lista de
 * categorias à esquerda governa o conteúdo à direita, que mostra as
 * subcategorias daquela categoria com a contagem de lotes.
 *
 * O lado esquerdo responde ao ponteiro, mas também a foco de teclado, para que
 * a navegação por Tab percorra o painel na mesma ordem em que ele se lê.
 */
export function CategoryNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Category>(CATEGORIES[0]);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      )
        setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const subs = [...SUBCATEGORIES[active]]
    .map((sub) => ({ ...sub, total: lotsIn(active, sub.slug) }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="hidden border-t border-border-subtle bg-white lg:block">
      <div className="container-content flex items-center">
        <nav
          aria-label="Seções do catálogo"
          className="flex min-w-0 flex-1 items-center"
        >
          <Link
            href="/leiloes"
            className="nav-tab"
            data-active={pathname.startsWith("/leiloes")}
          >
            Todos os leilões
          </Link>
          <Link
            href="/resultados"
            className="nav-tab"
            data-active={pathname.startsWith("/resultados")}
          >
            Catálogo de lotes
          </Link>

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="painel-categorias"
            className="nav-tab"
          >
            Categorias
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={`transition-transform duration-standard ease-standard ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/resultados?categoria=${category}`}
              className="nav-tab"
            >
              {CATEGORY_SHORT[category]}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center">
          <Link href="/como-funciona" className="nav-tab">
            Como funciona
          </Link>
          <Link href="/ajuda" className="nav-tab">
            Ajuda
          </Link>
        </div>
      </div>

      {open && (
        <div
          ref={panelRef}
          id="painel-categorias"
          className="absolute inset-x-0 top-full z-40 animate-panel-down border-b border-border-strong bg-white shadow-elevated"
        >
          <div className="container-content grid lg:grid-cols-[300px_minmax(0,1fr)]">
            <ul className="border-r border-border-subtle py-3 pr-4">
              {CATEGORIES.map((category) => {
                const isActive = active === category;
                return (
                  <li key={category}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(category)}
                      onFocus={() => setActive(category)}
                      onClick={() => setActive(category)}
                      aria-pressed={isActive}
                      className={`flex w-full items-center justify-between gap-3 border px-3 py-2.5 text-left text-label transition-colors duration-quick ${
                        isActive
                          ? "border-border-strong bg-surface-subtle font-semibold text-text-primary"
                          : "border-transparent text-text-secondary hover:bg-surface-subtle hover:text-action"
                      }`}
                    >
                      {CATEGORY_LABELS[category]}
                      <ChevronRight
                        size={15}
                        aria-hidden="true"
                        className="shrink-0 text-text-muted"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="py-4 pl-6">
              <h2 className="text-title-section text-text-primary">
                {CATEGORY_LABELS[active]}
              </h2>
              <Link
                href={`/resultados?categoria=${active}`}
                className="mt-0.5 inline-flex items-center gap-1 text-micro font-bold uppercase tracking-[.09em] text-action transition-colors duration-quick hover:text-action-hover hover:underline"
              >
                Ver os {lotsIn(active)} lotes
                <ChevronRight size={13} aria-hidden="true" />
              </Link>

              <ul className="mt-3 grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
                {subs.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`/resultados?categoria=${active}&subcategoria=${sub.slug}`}
                      className="nav-underline flex min-h-9 items-baseline justify-between gap-2 px-0.5 text-metadata transition-colors duration-quick hover:text-action"
                    >
                      <span
                        className={
                          sub.total > 0
                            ? "text-text-secondary"
                            : "text-text-muted"
                        }
                      >
                        {sub.label}
                      </span>
                      <span
                        className={`text-caption tabular ${
                          sub.total > 0
                            ? "font-semibold text-text-primary"
                            : "text-text-muted"
                        }`}
                      >
                        {sub.total}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
