import Link from "next/link";
import { Heart, LogIn } from "lucide-react";
import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <header className="on-dark sticky top-0 z-40 bg-brand-900">
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo
      </a>
      <div className="container-content flex h-[72px] items-center gap-6">
        <Link href="/" className="flex flex-shrink-0 flex-col leading-none text-text-inverse">
          <span className="text-[19px] font-bold tracking-tight">ATIVOS B2B</span>
          <span className="hidden text-caption font-normal text-white/70 sm:block">
            Ativos de hoje, novos negócios amanhã.
          </span>
        </Link>

        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>

        <nav aria-label="Conta e favoritos" className="ml-auto flex flex-shrink-0 items-center gap-2 md:gap-4">
          <Link
            href="/favoritos"
            className="hidden items-center gap-2 rounded-control px-3 py-2 text-label text-text-inverse hover:bg-white/10 md:inline-flex"
          >
            <Heart className="h-5 w-5" aria-hidden="true" />
            Favoritos
          </Link>
          <Link
            href="/entrar"
            className="hidden items-center gap-2 rounded-control px-3 py-2 text-label text-text-inverse hover:bg-white/10 md:inline-flex"
          >
            <LogIn className="h-5 w-5" aria-hidden="true" />
            Entrar
          </Link>
          <Link
            href="/anunciar"
            className="inline-flex h-11 items-center justify-center rounded-control bg-action px-4 text-label font-medium text-text-inverse transition-colors duration-quick hover:bg-action-hover active:bg-action-pressed"
          >
            Anunciar ativo
          </Link>
        </nav>
      </div>
      <div className="border-t border-white/10 px-4 pb-3 pt-2 md:hidden">
        <SearchBar compact />
      </div>
    </header>
  );
}
