import Link from "next/link";
import { Gavel, HelpCircle, Building2, UserRound } from "lucide-react";
import { MainMenu } from "./MainMenu";
import { CategoryNav } from "./CategoryNav";
import { SearchBar } from "./SearchBar";
import { CompareHeaderLink } from "@/components/catalog/CompareHeaderLink";

/** Assinatura da marca: palavra em duas cores sobre a régua e a promessa. */
export function Wordmark({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const primary = tone === "dark" ? "text-white" : "text-text-primary";
  const rule = tone === "dark" ? "border-white/20" : "border-border-strong";
  const tag = tone === "dark" ? "text-white/55" : "text-text-muted";
  return (
    <span className="flex flex-col leading-none">
      <span className={`text-[21px] font-extrabold tracking-[-.02em] ${primary}`}>
        ATIVOS <span className="text-action-bright">B2B</span>
      </span>
      <span
        className={`mt-1 border-t pt-1 text-[8px] font-bold uppercase tracking-[.14em] ${rule} ${tag}`}
      >
        Ativos hoje. Novas oportunidades amanhã.
      </span>
    </span>
  );
}

const ATALHOS = [
  { href: "/leiloes", label: "Leilões", icon: Gavel },
  { href: "/como-funciona", label: "Como funciona", icon: HelpCircle },
  { href: "/anunciar", label: "Para empresas", icon: Building2 },
];

/**
 * Cabeçalho em três faixas sobre o marinho: utilitária (institucional e
 * conta), principal (marca, busca e atalhos) e a barra de categorias. Abaixo
 * de `lg` as duas últimas recolhem no botão de menu.
 */
export function Header() {
  return (
    <header className="on-dark sticky top-0 z-50 bg-brand-900">
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo
      </a>

      <div className="hidden border-b border-white/10 md:block">
        <div className="container-content flex h-9 items-center justify-between gap-4 text-caption text-white/65">
          <p className="truncate">
            Catálogo demonstrativo de ativos empresariais — lotes, empresas e
            lances são exemplos
          </p>
          <div className="flex items-center gap-5">
            <Link href="/como-funciona" className="hover:text-white">
              Sobre nós
            </Link>
            <Link href="/ajuda" className="hover:text-white">
              Ajuda
            </Link>
            <Link href="/ajuda" className="hover:text-white">
              Fale conosco
            </Link>
            <Link
              href="/entrar"
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <UserRound size={14} aria-hidden="true" />
              Entrar
            </Link>
            <Link href="/entrar" className="primary-link min-h-8 px-3.5 text-caption">
              Criar conta
            </Link>
          </div>
        </div>
      </div>

      <div className="container-content flex h-16 items-center gap-3 md:h-[78px] lg:gap-6">
        <div className="lg:hidden">
          <MainMenu />
        </div>

        <Link
          href="/"
          aria-label="ATIVOS B2B, página inicial"
          className="shrink-0 rounded-control"
        >
          <Wordmark />
        </Link>

        <div className="ml-auto hidden min-w-0 flex-1 md:ml-0 md:block lg:px-4">
          <SearchBar variant="on-dark" />
        </div>

        <nav
          aria-label="Atalhos"
          className="hidden shrink-0 items-center lg:flex"
        >
          {ATALHOS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-w-[92px] flex-col items-center gap-1 rounded-control px-3 py-1.5 text-caption text-white/75 transition-colors duration-standard ease-standard hover:bg-white/10 hover:text-white"
            >
              <item.icon size={19} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto shrink-0 lg:hidden">
          <CompareHeaderLink />
        </div>
      </div>

      {/* Em telas estreitas a busca ganha uma linha própria: espremida entre a
          marca e as ações, ela encolhia até sobrar só o botão. */}
      <div className="container-content pb-3 md:hidden">
        <SearchBar variant="on-dark" />
      </div>

      <CategoryNav />
    </header>
  );
}
