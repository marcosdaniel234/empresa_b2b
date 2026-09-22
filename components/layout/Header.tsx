import Link from "next/link";
import { Heart, Phone, Plus, UserRound } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { CategoryNav } from "./CategoryNav";
import { CompareHeaderLink } from "@/components/catalog/CompareHeaderLink";

/**
 * Cabeçalho em três faixas: utilitária (rola com a página), principal com a
 * busca do catálogo e barra de categorias. As duas últimas ficam fixas.
 */
export function Header() {
  return (
    <>
      <div className="on-dark bg-brand-900 text-white/75">
        <div className="container-content flex h-8 items-center justify-between gap-4 text-caption">
          <p className="truncate">
            Catálogo demonstrativo · lotes, empresas e lances são exemplos
          </p>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <Phone size={13} aria-hidden="true" />
              Atendimento seg a sex, 9h–18h
            </span>
            <span
              aria-hidden="true"
              className="hidden h-3 w-px bg-white/20 sm:block"
            />
            <span className="hidden sm:inline">Português (BR) · BRL</span>
            <Link
              href="/favoritos"
              className="hover:text-white hover:underline sm:hidden"
            >
              Favoritos
            </Link>
            <Link
              href="/entrar"
              className="hover:text-white hover:underline sm:hidden"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-border-strong bg-white">
        <a href="#conteudo-principal" className="skip-link">
          Pular para o conteúdo
        </a>

        <div className="container-content flex h-14 items-center gap-3 md:h-[60px] lg:gap-6">
          <Link
            href="/"
            aria-label="ATIVOS B2B, página inicial"
            className="flex shrink-0 items-center gap-2"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-brand-900 text-accent-strong"
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
              <span className="text-[16px] font-extrabold tracking-tight text-brand-900">
                ATIVOS<span className="text-action">B2B</span>
              </span>
              <span className="mt-0.5 text-micro uppercase tracking-[.1em] text-text-muted">
                Leilão industrial B2B
              </span>
            </span>
          </Link>

          <div className="min-w-0 flex-1">
            <SearchBar />
          </div>

          <nav
            aria-label="Conta e anúncios"
            className="flex shrink-0 items-center gap-0.5"
          >
            <Link
              href="/favoritos"
              className="header-link hidden md:inline-flex"
            >
              <Heart size={17} aria-hidden="true" />
              <span className="hidden lg:inline">Favoritos</span>
            </Link>
            <CompareHeaderLink />
            <Link href="/entrar" className="header-link hidden md:inline-flex">
              <UserRound size={17} aria-hidden="true" />
              <span className="hidden lg:inline">Entrar</span>
            </Link>
            <Link href="/anunciar" className="primary-link ml-1 px-3">
              <Plus size={16} aria-hidden="true" />
              <span className="hidden md:inline">Vender ativo</span>
              <span className="sr-only md:hidden">Vender ativo</span>
            </Link>
          </nav>
        </div>

        <CategoryNav />
      </header>
    </>
  );
}
