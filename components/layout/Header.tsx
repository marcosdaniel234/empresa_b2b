import Link from "next/link";
import { Heart, Plus, UserRound } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { CategoryNav } from "./CategoryNav";

/**
 * Cabeçalho em três níveis: faixa utilitária (rola com a página), barra
 * principal com a busca dominante e barra de categorias — as duas últimas
 * ficam fixas no topo.
 */
export function Header() {
  return (
    <>
      <div className="on-dark bg-brand-900 text-white/80">
        <div className="container-content flex h-9 items-center justify-between gap-4 text-caption">
          <p className="truncate">
            Catálogo demonstrativo · ativos, empresas e lances são exemplos
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Atendimento seg a sex, 9h–18h</span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/25 sm:block" />
            <span className="hidden sm:inline">Português (BR) · BRL</span>
            <Link
              href="/favoritos"
              className="inline-flex items-center gap-1.5 hover:text-white hover:underline sm:hidden"
            >
              <Heart size={14} aria-hidden="true" />
              Favoritos
            </Link>
            <Link href="/entrar" className="hover:text-white hover:underline sm:hidden">
              Entrar
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white shadow-card">
        <a href="#conteudo-principal" className="skip-link">
          Pular para o conteúdo
        </a>

        <div className="container-content flex h-14 items-center gap-2.5 md:h-16 md:gap-3 lg:gap-8">
          <Link
            href="/"
            aria-label="ATIVOS B2B, página inicial"
            className="flex shrink-0 items-center gap-2.5"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-[5px] bg-brand-900 text-accent-strong"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path
                  d="M3 20h18M6 20V9l6-4 6 4v11M10 20v-5h4v5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="square"
                />
              </svg>
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[17px] font-extrabold tracking-tight text-brand-900">
                ATIVOS<span className="text-action">B2B</span>
              </span>
              <span className="mt-0.5 text-micro font-medium uppercase tracking-[.11em] text-text-secondary">
                Leilão industrial entre empresas
              </span>
            </span>
          </Link>

          <div className="min-w-0 flex-1">
            <SearchBar />
          </div>

          <nav
            aria-label="Conta e anúncios"
            className="flex shrink-0 items-center gap-1"
          >
            <Link href="/favoritos" className="header-link hidden md:inline-flex">
              <Heart size={18} aria-hidden="true" />
              <span className="hidden lg:inline">Favoritos</span>
            </Link>
            <Link href="/entrar" className="header-link hidden md:inline-flex">
              <UserRound size={18} aria-hidden="true" />
              <span className="hidden lg:inline">Entrar</span>
            </Link>
            <Link href="/anunciar" className="primary-link px-3 md:px-4">
              <Plus size={17} aria-hidden="true" />
              <span className="hidden md:inline">Anunciar ativo</span>
              <span className="sr-only md:hidden">Anunciar ativo</span>
            </Link>
          </nav>
        </div>

        <CategoryNav />
      </header>
    </>
  );
}
