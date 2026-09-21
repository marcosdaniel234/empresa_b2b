import Link from "next/link";
import { AnnouncementChecklist } from "@/components/catalog/AnnouncementChecklist";

export const metadata = { title: "Anunciar ativo" };

export default function AnunciarPage() {
  return (
    <div className="container-content py-5 md:py-8">
      <nav
        aria-label="Trilha de navegação"
        className="text-caption text-text-secondary"
      >
        <Link href="/" className="hover:text-action hover:underline">
          Início
        </Link>
        <span aria-hidden="true"> / </span>
        <span>Anunciar ativo</span>
      </nav>

      <div className="max-w-3xl">
        <p className="eyebrow mt-2">Para quem vende</p>
        <h1 className="mt-1.5 text-title-page-mobile text-text-primary md:text-title-page">
          Um bom anúncio começa nos detalhes.
        </h1>
        <p className="mt-2 text-body text-text-secondary">
          Organize as informações que ajudam outra empresa a avaliar seu ativo
          com confiança.
        </p>
        <p className="mt-4 rounded-control border border-border-subtle bg-surface-subtle p-3 text-metadata text-text-secondary">
          A publicação ainda não está disponível. Esta lista é apenas uma
          orientação: não recebe arquivos nem publica anúncios.
        </p>
        <AnnouncementChecklist />
      </div>
    </div>
  );
}
