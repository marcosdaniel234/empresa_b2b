import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { CATEGORY_SHORT, Category, SUBCATEGORIES } from "@/lib/data";

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
    <footer className="mt-8 border-t border-border-strong bg-white">
      {/* Taxonomia: o catálogo inteiro alcançável a partir do rodapé. */}
      <div className="container-content grid gap-x-6 gap-y-4 border-b border-border-subtle py-6 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <div key={category}>
            <Link
              href={`/resultados?categoria=${category}`}
              className="block border-b border-border-subtle pb-1 text-label font-bold uppercase tracking-[.05em] text-text-primary hover:text-action"
            >
              {CATEGORY_SHORT[category]}
            </Link>
            <ul className="mt-1">
              {SUBCATEGORIES[category].map((sub) => (
                <li key={sub.slug}>
                  <Link
                    href={`/resultados?categoria=${category}&subcategoria=${sub.slug}`}
                    className="flex min-h-7 items-center text-caption text-text-secondary hover:text-action hover:underline"
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
          <span className="text-[16px] font-extrabold tracking-tight text-brand-900">
            ATIVOS<span className="text-action">B2B</span>
          </span>
          <p className="mt-2 max-w-xs text-caption text-text-secondary">
            Catálogo de leilão de ativos corporativos entre empresas: máquinas,
            veículos, tecnologia e mobiliário.
          </p>
          <ul className="mt-3 space-y-1.5 text-caption text-text-secondary">
            <li className="flex items-center gap-2">
              <Phone size={13} aria-hidden="true" className="text-text-muted" />
              Atendimento seg a sex, 9h–18h
            </li>
            <li className="flex items-center gap-2">
              <Mail size={13} aria-hidden="true" className="text-text-muted" />
              Canal de contato não disponível nesta demonstração
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={13} aria-hidden="true" className="text-text-muted" />
              Lotes em SP e PR neste catálogo
            </li>
          </ul>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-label font-bold uppercase tracking-[.05em] text-text-primary">
              {column.title}
            </h2>
            <ul className="mt-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex min-h-8 items-center text-metadata text-text-secondary hover:text-action hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-border-subtle bg-surface-subtle py-4">
        <div className="container-content flex flex-col gap-1.5 text-caption text-text-secondary md:flex-row md:items-center md:justify-between">
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
