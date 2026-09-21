import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, FileText, MapPin, Truck } from "lucide-react";
import {
  ASSETS,
  CATEGORY_LABELS,
  getAssetBySlug,
  getAssetsByCompany,
  getCompanyBySlug,
} from "@/lib/data";
import { Gallery } from "@/components/auction/Gallery";
import { BidPanel } from "@/components/auction/BidPanel";
import { AssetCard } from "@/components/catalog/AssetCard";
import { StatusChip } from "@/components/ui/StatusChip";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ASSETS.map((asset) => ({ slug: asset.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const asset = getAssetBySlug(slug);
  return { title: asset ? `${asset.lot} · ${asset.title}` : "Leilão" };
}

export default async function LeilaoPage({ params }: PageProps) {
  const { slug } = await params;
  const asset = getAssetBySlug(slug);
  if (!asset) notFound();

  const company = getCompanyBySlug(asset.companySlug);
  const related = getAssetsByCompany(asset.companySlug)
    .filter((item) => item.slug !== asset.slug && item.status !== "cancelado")
    .slice(0, 4);

  return (
    <div className="container-content py-5 pb-28 md:py-6 md:pb-10">
      <nav
        aria-label="Trilha de navegação"
        className="flex flex-wrap items-center gap-1 text-caption text-text-secondary"
      >
        <Link href="/" className="hover:text-action hover:underline">
          Início
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href={`/resultados?categoria=${asset.category}`}
          className="hover:text-action hover:underline"
        >
          {CATEGORY_LABELS[asset.category]}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-text-primary">{asset.lot}</span>
      </nav>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <StatusChip status={asset.status} />
        <span className="lot-tag">Lote {asset.lot}</span>
        <span className="text-micro font-semibold uppercase tracking-[.09em] text-text-secondary">
          {CATEGORY_LABELS[asset.category]}
        </span>
      </div>

      <h1 className="mt-2 max-w-4xl text-title-page-mobile text-text-primary md:text-title-page">
        {asset.title}
      </h1>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-1 text-metadata text-text-secondary">
        {company && (
          <Link
            href={`/loja/${company.slug}`}
            className="inline-flex items-center gap-1.5 hover:text-action hover:underline"
          >
            <Building2 size={15} aria-hidden="true" />
            {company.name}
          </Link>
        )}
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={15} aria-hidden="true" />
          {asset.city} · {asset.state}
        </span>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_368px] lg:gap-8">
        <div className="min-w-0 lg:col-start-1">
          <Gallery
            category={asset.category}
            count={asset.gallery}
            title={asset.title}
          />
        </div>

        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start lg:sticky lg:top-[132px]">
          <BidPanel key={asset.id} asset={asset} />
        </div>

        <div className="min-w-0 lg:col-start-1">
          <section className="panel mt-6 p-4 sm:p-5">
            <h2 className="section-title">Ficha técnica</h2>
            <dl className="mt-3 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {asset.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-baseline justify-between gap-4 border-b border-border-subtle py-2.5 text-metadata last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
                >
                  <dt className="text-text-secondary">{spec.label}</dt>
                  <dd className="text-right font-semibold text-text-primary">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-6">
            <h2 className="section-title">Descrição</h2>
            <p className="mt-2 max-w-3xl text-body text-text-primary">
              {asset.description}
            </p>
          </section>

          <section className="mt-6">
            <h2 className="section-title">Condição e avarias</h2>
            <p className="mt-2 max-w-3xl text-body text-text-primary">
              {asset.condition}
            </p>
          </section>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {asset.documents.length > 0 && (
              <section className="panel p-4">
                <h2 className="text-title-card text-text-primary">
                  Documentos previstos no exemplo
                </h2>
                <ul className="mt-2 space-y-1.5">
                  {asset.documents.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-start gap-2 text-metadata text-text-primary"
                    >
                      <FileText
                        size={15}
                        className="mt-0.5 shrink-0 text-text-secondary"
                        aria-hidden="true"
                      />
                      {doc}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="panel p-4">
              <h2 className="text-title-card text-text-primary">Retirada</h2>
              <p className="mt-2 flex items-start gap-2 text-metadata text-text-primary">
                <Truck
                  size={15}
                  className="mt-0.5 shrink-0 text-text-secondary"
                  aria-hidden="true"
                />
                {asset.pickup}
              </p>
            </section>
          </div>
        </div>
      </div>

      {related.length > 0 && company && (
        <section className="mt-10 border-t border-border-subtle pt-6">
          <div className="section-heading">
            <h2 className="section-title">Outros lotes de {company.name}</h2>
            <Link href={`/loja/${company.slug}`} className="text-link">
              Ver a loja
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, i) => (
              <AssetCard key={item.id} asset={item} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
