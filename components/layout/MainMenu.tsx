"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  ASSETS,
  CATEGORY_SHORT,
  Category,
  SUBCATEGORIES,
} from "@/lib/data";

const CATEGORIES = Object.keys(CATEGORY_SHORT) as Category[];

const SECTIONS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Comprar",
    links: [
      { href: "/resultados", label: "Catálogo de lotes" },
      { href: "/leiloes", label: "Leilões em andamento" },
      { href: "/resultados?status=encerrando", label: "Encerrando em 24h" },
      { href: "/favoritos", label: "Favoritos" },
      { href: "/comparar", label: "Comparar lotes" },
    ],
  },
  {
    title: "Vender",
    links: [
      { href: "/anunciar", label: "Anunciar ativo" },
      { href: "/como-funciona", label: "Como funciona" },
      { href: "/entrar", label: "Área da empresa" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { href: "/ajuda", label: "Perguntas frequentes" },
      { href: "/termos", label: "Termos de uso" },
      { href: "/privacidade", label: "Privacidade" },
    ],
  },
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
 * Único ponto de navegação do topo: um botão de menu que abre o mapa completo
 * do site (seções + taxonomia). Substitui a antiga barra de categorias, que
 * repetia no cabeçalho o que a página inicial e o rodapé já mostram.
 *
 * Abre por clique (nunca por hover), fecha com Escape, clique fora ou troca de
 * página, e devolve o foco ao botão.
 */
export function MainMenu() {
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
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="menu-principal"
        aria-label={open ? "Fechar menu" : "Abrir menu de navegação"}
        className={`nav-underline inline-flex h-10 shrink-0 items-center gap-2 rounded-control px-2.5 text-label font-semibold transition-colors duration-standard ease-standard sm:px-3 ${
          open
            ? "bg-surface-subtle text-action"
            : "text-text-primary hover:bg-surface-subtle hover:text-action"
        }`}
      >
        <span className="relative flex h-[18px] w-[18px] items-center justify-center">
          <Menu
            size={18}
            aria-hidden="true"
            className={`absolute transition-[opacity,transform] duration-standard ease-standard ${
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          />
          <X
            size={18}
            aria-hidden="true"
            className={`absolute transition-[opacity,transform] duration-standard ease-standard ${
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
          />
        </span>
        <span className="hidden sm:inline">Menu</span>
      </button>

      {open && (
        <div
          ref={panelRef}
          id="menu-principal"
          className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-120px)] animate-panel-down overflow-y-auto border-b border-border-strong bg-white shadow-elevated"
        >
          <div className="container-content grid gap-x-6 gap-y-5 py-5 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
            <div className="grid gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-1">
              {SECTIONS.map((section) => (
                <nav key={section.title} aria-label={section.title}>
                  <h2 className="border-b-2 border-action pb-1 text-label font-bold uppercase tracking-[.06em] text-text-primary">
                    {section.title}
                  </h2>
                  <ul className="mt-1.5">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="nav-underline flex min-h-9 items-center px-0.5 text-metadata text-text-secondary transition-colors duration-quick hover:text-action"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            <nav aria-label="Categorias do catálogo">
              <h2 className="border-b-2 border-action pb-1 text-label font-bold uppercase tracking-[.06em] text-text-primary">
                Categorias
              </h2>
              <div className="mt-1.5 grid gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
                {CATEGORIES.map((category) => (
                  <div key={category}>
                    <Link
                      href={`/resultados?categoria=${category}`}
                      className="nav-underline flex items-baseline justify-between gap-2 px-0.5 pb-1 text-label font-bold text-text-primary transition-colors duration-quick hover:text-action"
                    >
                      {CATEGORY_SHORT[category]}
                      <span className="text-caption font-normal text-text-muted tabular">
                        {lotsIn(category)}
                      </span>
                    </Link>
                    <ul>
                      {SUBCATEGORIES[category].map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={`/resultados?categoria=${category}&subcategoria=${sub.slug}`}
                            className="nav-underline flex min-h-8 items-baseline justify-between gap-2 px-0.5 text-caption text-text-secondary transition-colors duration-quick hover:text-action"
                          >
                            {sub.label}
                            <span className="text-text-muted tabular">
                              {lotsIn(category, sub.slug)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
