"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { ASSETS, CATEGORY_SHORT, Category } from "@/lib/data";
import { Contours } from "@/components/brand/Contours";

const CATEGORIES = Object.keys(CATEGORY_SHORT) as Category[];

const PRINCIPAL = [
  { href: "/resultados", label: "Explorar ativos" },
  { href: "/leiloes", label: "Leilões" },
  { href: "/lojas", label: "Lojas" },
  { href: "/como-funciona", label: "Como funciona" },
];

const CONTA = [
  { href: "/favoritos", label: "Favoritos" },
  { href: "/comparar", label: "Comparar lotes" },
  { href: "/entrar", label: "Entrar" },
  { href: "/ajuda", label: "Ajuda" },
];

function lotsIn(category: Category) {
  return ASSETS.filter(
    (a) => a.status !== "cancelado" && a.category === category,
  ).length;
}

/**
 * Menu de telas estreitas. Abre por clique, fecha com Escape, clique fora ou
 * troca de página, e devolve o foco ao botão. Enquanto aberto, a página por
 * trás não rola.
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
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target))
        setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.body.style.overflow = previous;
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
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-standard hover:bg-white/10"
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      {open && (
        <div
          ref={panelRef}
          id="menu-principal"
          className="fixed inset-x-0 bottom-0 top-[68px] z-40 animate-fade-in overflow-y-auto bg-brand-900 md:top-[76px]"
        >
          <Contours className="opacity-70" />
          <div className="container-content relative py-6">
            <nav aria-label="Principal">
              <ul>
                {PRINCIPAL.map((item, i) => (
                  <li
                    key={item.href}
                    className="animate-rise border-b border-white/10"
                    style={{ animationDelay: `${60 + i * 50}ms` }}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                      className="flex min-h-14 items-center justify-between text-[22px] font-bold tracking-[-.02em] text-white"
                    >
                      {item.label}
                      <ArrowRight size={18} aria-hidden="true" className="text-copper-bright" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              href="/anunciar"
              className="cream-link mt-6 w-full animate-rise"
              style={{ animationDelay: "280ms" }}
            >
              Anunciar ativo <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <nav aria-label="Categorias">
                <p className="kicker-on-dark">Categorias</p>
                <ul className="mt-3 space-y-1">
                  {CATEGORIES.map((c) => (
                    <li key={c}>
                      <Link
                        href={`/resultados?categoria=${c}`}
                        className="flex min-h-10 items-center justify-between gap-2 text-body text-white/80"
                      >
                        {CATEGORY_SHORT[c]}
                        <span className="text-caption text-white/45 tabular">{lotsIn(c)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Sua conta">
                <p className="kicker-on-dark">Sua conta</p>
                <ul className="mt-3 space-y-1">
                  {CONTA.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="flex min-h-10 items-center text-body text-white/80">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
