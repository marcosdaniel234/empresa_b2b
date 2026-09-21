import Link from "next/link";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Marketplace",
    links: [
      { label: "Explorar ativos", href: "/resultados" },
      { label: "Como funciona", href: "/como-funciona" },
      { label: "Anunciar um ativo", href: "/anunciar" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Minha empresa", href: "/entrar" },
      { label: "Favoritos", href: "/favoritos" },
      { label: "Entrar", href: "/entrar" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Termos de uso", href: "/termos" },
      { label: "Privacidade", href: "/privacidade" },
      { label: "Central de ajuda", href: "/ajuda" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border-subtle bg-surface-card">
      <div className="container-content grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <span className="text-[19px] font-bold text-text-primary">
            ATIVOS B2B
          </span>
          <p className="mt-3 max-w-xs text-metadata text-text-secondary">
            Equipamentos, veículos e oportunidades para o próximo ciclo da sua
            empresa.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h2 className="text-label font-semibold text-text-primary">
              {column.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-metadata text-text-secondary hover:text-action"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border-subtle py-6">
        <div className="container-content flex flex-col gap-2 text-caption text-text-secondary md:flex-row md:items-center md:justify-between">
          <p>Ambiente de demonstração. Não são realizadas transações.</p>
          <p>ATIVOS B2B · Projeto em desenvolvimento.</p>
        </div>
      </div>
    </footer>
  );
}
