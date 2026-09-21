import Link from "next/link";
import { CATEGORY_LABELS, Category } from "@/lib/data";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Categorias",
    links: CATEGORIES.map((category) => ({
      label: CATEGORY_LABELS[category],
      href: `/resultados?categoria=${category}`,
    })),
  },
  {
    title: "Comprar e vender",
    links: [
      { label: "Catálogo completo", href: "/resultados" },
      { label: "Leilões abertos", href: "/resultados?status=aberto" },
      { label: "Encerrando em breve", href: "/resultados?status=encerrando" },
      { label: "Anunciar um ativo", href: "/anunciar" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Como funciona", href: "/como-funciona" },
      { label: "Central de ajuda", href: "/ajuda" },
      { label: "Meus favoritos", href: "/favoritos" },
      { label: "Entrar", href: "/entrar" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Termos de uso", href: "/termos" },
      { label: "Privacidade", href: "/privacidade" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="on-dark mt-10 bg-brand-900 text-white/75">
      <div className="container-content grid gap-8 py-10 md:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))]">
        <div>
          <span className="text-[17px] font-extrabold tracking-tight text-white">
            ATIVOS<span className="text-accent-strong">B2B</span>
          </span>
          <p className="mt-2 max-w-xs text-metadata">
            Marketplace de leilão de ativos corporativos entre empresas:
            máquinas, veículos, tecnologia e mobiliário.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-label font-semibold text-white">
              {column.title}
            </h2>
            <ul className="mt-3 space-y-0.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex min-h-9 items-center text-metadata hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-content flex flex-col gap-1.5 text-caption md:flex-row md:items-center md:justify-between">
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
