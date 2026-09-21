"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LayoutGrid } from "lucide-react";
import {
  ASSETS,
  CATEGORY_SHORT,
  Category,
  SUBCATEGORIES,
} from "@/lib/data";

const CATEGORIES = Object.keys(CATEGORY_SHORT) as Category[];

const NAV_LINKS = [
  { href: "/leiloes", label: "Leilões" },
  { href: "/resultados", label: "Catálogo" },
  { href: "/anunciar", label: "Vender" },
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/ajuda", label: "Ajuda" },
];

function lotsIn(category: Category, subcategory?: string) {
  return ASSETS.filter(
    (asset) =>
      asset.status !== "cancelado" &&
      asset.category === category &&
      (!subcategory || asset.subcategory === subcategory),
  ).length;
}

/**
 * Barra de categorias com painel de taxonomia completa. O painel abre por
 * clique (não por hover), fecha com Escape, clique fora ou troca de página.
 */
export function CategoryNav() {
  const [open, setOpen] = useState(false);
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

  return (
    <div className="relative border-t border-border-subtle bg-white">
      <div className="container-content">
        <nav
          aria-label="Categorias e seções"
          className="scroll-rail items-stretch"
        >
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="painel-categorias"
            className={`inline-flex min-h-11 shrink-0 items-center gap-2 border-r border-border-subtle px-3 text-label font-bold uppercase tracking-[.04em] transition-colors duration-quick ${
              open
                ? "bg-brand-900 text-white"
                : "bg-surface-subtle text-text-primary hover:text-action"
            }`}
          >
            <LayoutGrid size={16} aria-hidden="true" />
            Todas as categorias
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={`transition-transform duration-quick ${open ? "rotate-180" : ""}`}
            />
          </button>

          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/resultados?categoria=${category}`}
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 border-r border-border-subtle px-3 text-label text-text-primary transition-colors duration-quick hover:bg-surface-subtle hover:text-action"
            >
              {CATEGORY_SHORT[category]}
              <span className="text-caption text-text-muted tabular">
                {lotsIn(category)}
              </span>
            </Link>
          ))}

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 shrink-0 items-center px-3 text-label text-text-secondary transition-colors duration-quick hover:bg-surface-subtle hover:text-action"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {open && (
        <div
          ref={panelRef}
          id="painel-categorias"
          className="absolute inset-x-0 top-full z-40 border-y border-border-strong bg-white shadow-elevated"
        >
          <div className="container-content grid gap-x-6 gap-y-5 py-5 md:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((category) => (
              <div key={category}>
                <Link
                  href={`/resultados?categoria=${category}`}
                  className="flex items-baseline justify-between gap-2 border-b border-border-strong pb-1.5 text-label font-bold uppercase tracking-[.05em] text-text-primary hover:text-action"
                >
                  {CATEGORY_SHORT[category]}
                  <span className="text-caption font-normal text-text-muted tabular">
                    {lotsIn(category)} lotes
                  </span>
                </Link>
                <ul className="mt-1.5">
                  {SUBCATEGORIES[category].map((sub) => {
                    const total = lotsIn(category, sub.slug);
                    return (
                      <li key={sub.slug}>
                        <Link
                          href={`/resultados?categoria=${category}&subcategoria=${sub.slug}`}
                          className="flex min-h-9 items-baseline justify-between gap-2 text-metadata text-text-secondary hover:text-action hover:underline"
                        >
                          {sub.label}
                          <span className="text-caption text-text-muted tabular">
                            {total}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
