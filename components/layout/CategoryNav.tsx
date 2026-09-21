"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Armchair,
  ChevronDown,
  Factory,
  LayoutGrid,
  Server,
  Truck,
} from "lucide-react";
import { ASSETS, CATEGORY_LABELS, COMPANIES, Category } from "@/lib/data";

const CATEGORY_ICONS: Record<Category, typeof Factory> = {
  maquinas: Factory,
  veiculos: Truck,
  tecnologia: Server,
  mobiliario: Armchair,
};

const CATEGORY_NOTES: Record<Category, string> = {
  maquinas: "Equipamentos de produção, movimentação e geração",
  veiculos: "Utilitários, furgões e veículos de frota",
  tecnologia: "Servidores, estações de trabalho e notebooks",
  mobiliario: "Mobiliário corporativo e de escritório",
};

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

/** Quantidade real de lotes ativos por categoria no catálogo de demonstração. */
function countIn(category: Category) {
  return ASSETS.filter((a) => a.category === category && a.status !== "cancelado")
    .length;
}

const SHORTCUTS = [
  { label: "Leilões abertos", href: "/resultados?status=aberto" },
  { label: "Encerram em até 24h", href: "/resultados?status=encerrando" },
  { label: "Agendados", href: "/resultados?status=agendado" },
  { label: "Maior valor", href: "/resultados?sort=valor_desc" },
];

export function CategoryNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Ao trocar de página, o painel se fecha junto — ajuste durante a renderização.
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
          aria-label="Categorias do catálogo"
          className="scroll-rail items-center gap-1 py-1"
        >
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="painel-categorias"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-control px-3 text-label font-semibold text-text-primary transition-colors duration-quick hover:bg-surface-subtle hover:text-action"
          >
            <LayoutGrid size={17} aria-hidden="true" />
            <span className="hidden sm:inline">Ver todas as categorias</span>
            <span className="sm:hidden">Categorias</span>
            <ChevronDown
              size={15}
              aria-hidden="true"
              className={`transition-transform duration-quick ${open ? "rotate-180" : ""}`}
            />
          </button>
          <span
            aria-hidden="true"
            className="mx-1 hidden h-5 w-px shrink-0 bg-border-subtle sm:block"
          />
          {CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category];
            return (
              <Link
                key={category}
                href={`/resultados?categoria=${category}`}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-control px-3 text-label text-text-secondary transition-colors duration-quick hover:bg-surface-subtle hover:text-action"
              >
                <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                {CATEGORY_LABELS[category]}
              </Link>
            );
          })}
          <span
            aria-hidden="true"
            className="mx-1 hidden h-5 w-px shrink-0 bg-border-subtle lg:block"
          />
          <Link
            href="/resultados?status=encerrando"
            className="hidden min-h-11 shrink-0 items-center gap-2 rounded-control px-3 text-label text-text-secondary transition-colors duration-quick hover:bg-surface-subtle hover:text-action lg:inline-flex"
          >
            Encerrando em breve
          </Link>
          <Link
            href="/como-funciona"
            className="ml-auto hidden min-h-11 shrink-0 items-center rounded-control px-3 text-label text-text-secondary transition-colors duration-quick hover:bg-surface-subtle hover:text-action lg:inline-flex"
          >
            Como funciona
          </Link>
        </nav>
      </div>

      {open && (
        <div
          ref={panelRef}
          id="painel-categorias"
          className="absolute inset-x-0 top-full z-40 border-y border-border-subtle bg-white shadow-elevated"
        >
          <div className="container-content grid gap-x-8 gap-y-6 py-6 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="eyebrow">Categorias</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {CATEGORIES.map((category) => {
                  const Icon = CATEGORY_ICONS[category];
                  return (
                    <li key={category}>
                      <Link
                        href={`/resultados?categoria=${category}`}
                        className="category-tile"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-surface-subtle text-action">
                          <Icon size={19} strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-baseline gap-2">
                            <span className="text-title-card text-text-primary">
                              {CATEGORY_LABELS[category]}
                            </span>
                            <span className="text-caption text-text-secondary tabular">
                              {countIn(category)} lotes
                            </span>
                          </span>
                          <span className="mt-0.5 block text-metadata text-text-secondary">
                            {CATEGORY_NOTES[category]}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="eyebrow">Atalhos</h2>
                <ul className="mt-3 space-y-0.5">
                  {SHORTCUTS.map((shortcut) => (
                    <li key={shortcut.href}>
                      <Link
                        href={shortcut.href}
                        className="flex min-h-10 items-center text-metadata text-text-secondary hover:text-action hover:underline"
                      >
                        {shortcut.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="eyebrow">Empresas que anunciam</h2>
                <ul className="mt-3 space-y-0.5">
                  {COMPANIES.slice(0, 4).map((company) => (
                    <li key={company.slug}>
                      <Link
                        href={`/loja/${company.slug}`}
                        className="flex min-h-10 items-center text-metadata text-text-secondary hover:text-action hover:underline"
                      >
                        {company.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
