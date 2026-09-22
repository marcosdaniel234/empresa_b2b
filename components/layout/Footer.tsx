import Link from "next/link";
import { Wordmark } from "./Header";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import {
  CATEGORY_SHORT,
  Category,
  SUBCATEGORIES,
  getStateCounts,
} from "@/lib/data";

const CATEGORIES = Object.keys(CATEGORY_SHORT) as Category[];

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Comprar",
    links: [
      { label: "Catálogo de lotes", href: "/resultados" },
      { label: "Leilões em andamento", href: "/leiloes" },
      { label: "Leilões abertos", href: "/resultados?status=aberto" },
      { label: "Encerrando em 24h", href: "/resultados?status=encerrando" },
      { label: "Meus favoritos", href: "/favoritos" },
      { label: "Comparar lotes", href: "/comparar" },
    ],
  },
  {
    title: "Vender",
    links: [
      { label: "Requisitos do anúncio", href: "/anunciar" },
      { label: "Como funciona", href: "/como-funciona" },
      { label: "Área da empresa", href: "/entrar" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Perguntas frequentes", href: "/ajuda" },
      { label: "Termos de uso", href: "/termos" },
      { label: "Privacidade", href: "/privacidade" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="on-dark bg-brand-800 text-white/70">
      {/* Taxonomia: o catálogo inteiro alcançável a partir do rodapé. */}
      <div className="container-content grid gap-x-6 gap-y-4 border-b border-white/10 py-7 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <div key={category}>
            <Link
              href={`/resultados?categoria=${category}`}
              className="block border-b border-white/15 pb-1 text-label font-bold uppercase tracking-[.05em] text-white hover:text-action-bright"
            >
              {CATEGORY_SHORT[category]}
            </Link>
            <ul className="mt-1">
              {SUBCATEGORIES[category].map((sub) => (
                <li key={sub.slug}>
                  <Link
                    href={`/resultados?categoria=${category}&subcategoria=${sub.slug}`}
                    className="flex min-h-7 items-center text-caption text-white/60 hover:text-white"
                  >
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-content grid gap-6 py-6 md:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
        <div>
          <Wordmark />
          <p className="mt-3 max-w-xs text-caption text-white/60">
            Catálogo de leilão de ativos corporativos entre empresas: máquinas,
            veículos, tecnologia e mobiliário.
          </p>
          <ul className="mt-3 space-y-1.5 text-caption text-white/60">
            <li className="flex items-center gap-2">
              <Phone size={13} aria-hidden="true" className="text-white/45" />
              Atendimento seg a sex, 9h–18h
            </li>
            <li className="flex items-center gap-2">
              <Mail size={13} aria-hidden="true" className="text-white/45" />
              Canal de contato não disponível nesta demonstração
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={13} aria-hidden="true" className="text-white/45" />
              Lotes em {getStateCounts().length} estados neste catálogo
            </li>
          </ul>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-label font-bold uppercase tracking-[.05em] text-white">
              {column.title}
            </h2>
            <ul className="mt-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex min-h-8 items-center text-metadata text-white/65 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Perfis sociais: marcados como ainda não publicados, em vez de links falsos. */}
      <div className="border-t border-white/10 py-4">
        <div className="container-content flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-label font-semibold text-white">
              Siga e acompanhe
            </span>
            <ul className="flex items-center gap-1.5" aria-label="Perfis sociais">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <li key={label}>
                  <span
                    role="link"
                    aria-disabled="true"
                    title={`Perfil no ${label} ainda não publicado`}
                    className="flex h-9 w-9 items-center justify-center rounded-control border border-white/15 bg-white/5 text-white/50"
                  >
                    <Icon size={15} aria-hidden="true" />
                    <span className="sr-only">
                      {label} — perfil ainda não publicado
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-caption text-white/45">
            Perfis sociais ainda não publicados nesta demonstração.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 bg-brand-900 py-4">
        <div className="container-content flex flex-col gap-1.5 text-caption text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            Ambiente de demonstração. Empresas, lotes e valores são exemplos e
            não há transações.
          </p>
          <p>ATIVOS B2B · Projeto em desenvolvimento.</p>
        </div>
      </div>
    </footer>
  );
}
