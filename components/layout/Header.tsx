"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Heart, Search, X } from "lucide-react";
import { MainMenu } from "./MainMenu";
import { SearchBar } from "./SearchBar";
import { CompareHeaderLink } from "@/components/catalog/CompareHeaderLink";

/** Páginas que abrem com uma faixa escura em tela cheia sob o cabeçalho. */
export const HERO_PATHS = ["/", "/anunciar"];

export function isHeroPath(pathname: string) {
  const clean = pathname.replace(/\/$/, "") || "/";
  return HERO_PATHS.includes(clean);
}

/** Assinatura da marca: "ATIVOS" em branco, "B2B" no degradê verde-mar. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`whitespace-nowrap text-[24px] font-extrabold leading-none tracking-[-.035em] text-white md:text-[28px] ${className}`}
    >
      ATIVOS <span className="text-accent-gradient">B2B</span>
    </span>
  );
}

const NAV = [
  { href: "/resultados", label: "Explorar ativos" },
  { href: "/leiloes", label: "Leilões" },
  { href: "/lojas", label: "Lojas" },
  { href: "/como-funciona", label: "Como funciona" },
];

/**
 * Cabeçalho fixo. Sobre as aberturas em azul profundo ele começa transparente e só
 * ganha fundo depois que a página rola — a foto da abertura passa por baixo,
 * como na referência. Nas demais páginas já nasce sólido e traz a busca aberta.
 */
export function Header() {
  const pathname = usePathname();
  const hero = isHeroPath(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    setSearchOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  const solid = !hero || scrolled || searchOpen;
  // A busca embutida só aparece quando há largura para ela e o cabeçalho é sólido.
  const inlineSearch = solid;

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-panel ease-standard ${
        solid
          ? "border-b border-white/10 bg-brand-900/[.97] shadow-[0_10px_30px_rgba(4,12,18,.35)] backdrop-blur"
          : "border-b border-white/15 bg-transparent"
      }`}
    >
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo
      </a>

      <div className="container-content flex h-[68px] items-center gap-4 md:h-[76px] lg:gap-7">
        <div className="-ml-2 lg:hidden">
          <MainMenu />
        </div>

        <Link href="/" aria-label="ATIVOS B2B, página inicial" className="shrink-0">
          <Wordmark />
        </Link>

        <span aria-hidden="true" className="hidden h-7 w-px bg-white/20 lg:block" />

        <nav aria-label="Principal" className="hidden shrink-0 items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const current = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`nav-underline inline-flex h-11 items-center whitespace-nowrap px-2.5 text-[15px] transition-colors duration-quick xl:px-3.5 ${
                  current ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-2">
          {inlineSearch && (
            <div className="hidden min-w-0 max-w-[320px] flex-1 xl:block">
              <SearchBar variant="on-dark" />
            </div>
          )}
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-expanded={searchOpen}
            aria-controls="busca-cabecalho"
            aria-label={searchOpen ? "Fechar a busca" : "Abrir a busca"}
            className={`flex h-11 w-11 items-center justify-center rounded-full text-white/85 transition-colors duration-standard hover:bg-white/10 hover:text-white ${
              inlineSearch ? "xl:hidden" : ""
            }`}
          >
            {searchOpen ? <X size={21} aria-hidden="true" /> : <Search size={21} aria-hidden="true" />}
          </button>
          <CompareHeaderLink />
          <Link
            href="/favoritos"
            aria-label="Meus favoritos"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-white/85 transition-colors duration-standard hover:bg-white/10 hover:text-white sm:flex"
          >
            <Heart size={19} aria-hidden="true" />
          </Link>
          <span aria-hidden="true" className="hidden h-6 w-px bg-white/20 md:block" />
          <Link
            href="/entrar"
            className="hidden shrink-0 whitespace-nowrap px-2 text-[15px] text-white/85 transition-colors hover:text-white md:inline-flex"
          >
            Entrar
          </Link>
          <Link
            href="/anunciar"
            className="group ml-1 hidden min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-control border border-accent-bright/70 px-4 text-[15px] font-semibold text-white transition-[background-color,border-color] duration-standard hover:border-accent-bright hover:bg-accent-bright/10 sm:inline-flex"
          >
            Anunciar ativo
            <ArrowRight
              size={17}
              aria-hidden="true"
              className="transition-transform duration-standard group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div
          id="busca-cabecalho"
          className="animate-panel-down border-t border-white/10 bg-brand-900"
        >
          <div className="container-content py-4">
            <SearchBar variant="on-dark" autoFocus />
          </div>
        </div>
      )}
    </header>
  );
}

/**
 * Compensa a altura do cabeçalho fixo nas páginas sem abertura escura; nas
 * aberturas o conteúdo começa por baixo dele, de propósito.
 */
export function HeaderSpacer() {
  const pathname = usePathname();
  if (isHeroPath(pathname)) return null;
  return <div aria-hidden="true" className="h-[68px] md:h-[76px]" />;
}
