import { AnnouncementChecklist } from "@/components/catalog/AnnouncementChecklist";

export const metadata = { title: "Anunciar ativo" };

export default function AnunciarPage() {
  return (
    <div className="container-content max-w-3xl py-12 md:py-16">
      <p className="eyebrow">PARA SUA EMPRESA</p>
      <h1 className="mt-3 text-title-page-mobile md:text-title-page">
        Um bom anúncio começa nos detalhes.
      </h1>
      <p className="mt-4 text-body text-text-secondary">
        Organize as informações que ajudam outra empresa a avaliar seu ativo com
        confiança.
      </p>
      <p className="mt-5 rounded-control border border-border-subtle bg-surface-subtle p-4 text-metadata text-text-secondary">
        A publicação ainda não está disponível. Esta lista é apenas uma
        orientação: não recebe arquivos nem publica anúncios.
      </p>
      <AnnouncementChecklist />
    </div>
  );
}
