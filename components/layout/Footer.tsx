import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Wordmark } from "./Header";
import { BrazilMap } from "@/components/brand/BrazilMap";
import { Backdrop } from "@/components/brand/Backdrop";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Explorar",
    links: [
      { label: "Todos os ativos", href: "/resultados" },
      { label: "Leilões", href: "/leiloes" },
      { label: "Venda direta", href: "/resultados?modalidade=venda_direta" },
      { label: "Favoritos", href: "/favoritos" },
      { label: "Comparar lotes", href: "/comparar" },
    ],
  },
  {
    title: "Para empresas",
    links: [
      { label: "Anunciar um ativo", href: "/anunciar" },
      { label: "Lojas", href: "/lojas" },
      { label: "Área da empresa", href: "/entrar" },
      { label: "Como funciona", href: "/como-funciona" },
    ],
  },
  {
    title: "Sobre",
    links: [
      { label: "Perguntas frequentes", href: "/ajuda" },
      { label: "Termos de uso", href: "/termos" },
      { label: "Privacidade", href: "/privacidade" },
    ],
  },
];

const SOCIAIS = [
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Facebook, label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden border-t border-white/[.07] bg-brand-900 text-white/70">
      <Backdrop className="opacity-60" />

      <div className="container-content relative grid gap-10 pb-10 pt-14 lg:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,.7fr))] lg:pt-20">
        <div>
          <Link href="/" aria-label="ATIVOS B2B — página inicial" className="inline-block">
            <Wordmark />
          </Link>
          <p className="mt-6 max-w-sm text-[26px] font-extrabold leading-[1.15] tracking-[-.02em] text-white">
            Negócios que movimentam o Brasil.
          </p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/70">
            Máquinas, veículos, tecnologia e mobiliário corporativo passando de uma empresa
            para outra, com ficha, localização e prazo de cada lote.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <ul className="flex items-center gap-2" aria-label="Perfis sociais">
              {SOCIAIS.map(({ Icon, label }) => (
                <li key={label}>
                  <span
                    aria-disabled="true"
                    title={`Perfil no ${label} ainda não publicado`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/45"
                  >
                    <Icon size={16} aria-hidden="true" />
                    <span className="sr-only">{label}: perfil ainda não publicado</span>
                  </span>
                </li>
              ))}
            </ul>
            <span className="text-[13px] text-white/50">Perfis ainda não publicados</span>
          </div>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="kicker-on-dark">{column.title}</h2>
            <ul className="mt-4">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex min-h-10 items-center text-[15px] text-white/75 transition-colors duration-standard hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container-content relative">
        <div className="flex items-center gap-4 border-t border-white/10 py-6">
          <BrazilMap solid className="w-9 shrink-0 bg-copper-bright" />
          <p className="text-[12px] font-semibold uppercase tracking-[.26em] text-white/80">
            Ativos para um Brasil mais produtivo
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/15 py-5">
        <div className="container-content flex flex-col gap-2 text-[13px] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} ATIVOS B2B · Ambiente de demonstração: empresas, lotes e
            valores são exemplos e não há transações.
          </p>
          <p className="flex gap-5">
            <Link href="/privacidade" className="hover:text-white">
              Privacidade
            </Link>
            <Link href="/termos" className="hover:text-white">
              Termos
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
