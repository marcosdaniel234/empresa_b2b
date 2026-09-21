import Link from "next/link";
import { ArrowUpRight, Heart, UserRound, Layers3 } from "lucide-react";
import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <>
      <div className="border-b border-border-subtle bg-surface-subtle">
        <div className="container-content flex min-h-8 items-center justify-between gap-3 py-1 text-[11px] text-text-secondary">
          <span>Versão demonstrativa. Ativos e lances são exemplos.</span>
          <Link
            href="/como-funciona"
            className="hidden font-medium underline underline-offset-2 sm:block"
          >
            Conheça o projeto
          </Link>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 backdrop-blur-md">
        <a href="#conteudo-principal" className="skip-link">
          Pular para o conteúdo
        </a>
        <div className="container-content flex h-[76px] items-center gap-3 lg:gap-6">
          <Link
            href="/"
            aria-label="ATIVOS B2B, início"
            className="flex shrink-0 items-center gap-2.5 text-brand-900"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand-900 text-accent-soft">
              <Layers3 size={23} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-xl font-bold tracking-tight">
              ativos
              <span className="ml-1 text-[13px] font-semibold tracking-normal text-action">
                B2B
              </span>
            </span>
          </Link>
          <div className="hidden min-w-0 flex-1 md:block">
            <SearchBar />
          </div>
          <nav
            aria-label="Conta e favoritos"
            className="ml-auto flex shrink-0 items-center gap-2"
          >
            <Link
              href="/favoritos"
              aria-label="Favoritos"
              className="header-link hidden md:inline-flex"
            >
              <Heart size={19} aria-hidden="true" />
              <span className="hidden lg:inline">Favoritos</span>
            </Link>
            <Link
              href="/entrar"
              aria-label="Entrar"
              className="header-link hidden md:inline-flex"
            >
              <UserRound size={19} aria-hidden="true" />
              <span className="hidden lg:inline">Entrar</span>
            </Link>
            <Link href="/anunciar" className="primary-link !min-h-11 !px-4">
              Anunciar <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </nav>
        </div>
        <div className="container-content pb-3 md:hidden">
          <SearchBar compact />
        </div>
      </header>
    </>
  );
}
