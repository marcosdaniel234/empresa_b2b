import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, MapPin, Truck } from "lucide-react";
import {
  ASSETS,
  CATEGORY_LABELS,
  getAssetBySlug,
  getCompanyBySlug,
} from "@/lib/data";
import { Gallery } from "@/components/auction/Gallery";
import { BidPanel } from "@/components/auction/BidPanel";
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
  return { title: asset ? asset.title : "Leilão" };
}

export default async function LeilaoPage({ params }: PageProps) {
  const { slug } = await params;
  const asset = getAssetBySlug(slug);
  if (!asset) notFound();

  const company = getCompanyBySlug(asset.companySlug);

  return (
    <div className="container-content py-8 pb-28 md:pb-10">
      <nav aria-label="Breadcrumb" className="text-caption text-text-secondary">
        <Link href="/" className="hover:text-action">
          Início
        </Link>{" "}
        /{" "}
        <Link
          href={`/resultados?categoria=${asset.category}`}
          className="hover:text-action"
        >
          {CATEGORY_LABELS[asset.category]}
        </Link>{" "}
        / {asset.title}
      </nav>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <StatusChip status={asset.status} />
      </div>
      <h1 className="mt-2 text-title-page-mobile text-text-primary md:text-title-page">
        {asset.title}
      </h1>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-metadata text-text-secondary">
        {company && (
          <Link href={`/loja/${company.slug}`} className="hover:text-action">
            {company.name}
          </Link>
        )}
        <span className="flex items-center gap-1">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {asset.city} · {asset.state}
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 lg:col-start-1">
          <Gallery
            category={asset.category}
            count={asset.gallery}
            title={asset.title}
          />
        </div>
        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start lg:sticky lg:top-24">
          <BidPanel key={asset.id} asset={asset} />
        </div>
        <div className="min-w-0 lg:col-start-1">
          <section className="mt-10">
            <h2 className="text-title-section-mobile text-text-primary md:text-title-section">
              Descrição
            </h2>
            <p className="mt-3 max-w-3xl text-body text-text-primary">
              {asset.description}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-title-section-mobile text-text-primary md:text-title-section">
              Ficha técnica
            </h2>
            <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 rounded-card border border-border-subtle bg-surface-card p-5 sm:grid-cols-2">
              {asset.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col items-start gap-1 border-b border-border-subtle py-2 last:border-0 sm:border-0 sm:py-0"
                >
                  <dt className="text-metadata text-text-secondary">
                    {spec.label}
                  </dt>
                  <dd className="text-body font-medium text-text-primary">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-10">
            <h2 className="text-title-section-mobile text-text-primary md:text-title-section">
              Condição e avarias
            </h2>
            <p className="mt-3 max-w-3xl text-body text-text-primary">
              {asset.condition}
            </p>
          </section>

          {asset.documents.length > 0 && (
            <section className="mt-10">
              <h2 className="text-title-section-mobile text-text-primary md:text-title-section">
                Documentos previstos no exemplo
              </h2>
              <ul className="mt-3 space-y-2">
                {asset.documents.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-center gap-2 text-body text-text-primary"
                  >
                    <FileText
                      className="h-4 w-4 flex-shrink-0 text-text-secondary"
                      aria-hidden="true"
                    />
                    {doc}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-10">
            <h2 className="text-title-section-mobile text-text-primary md:text-title-section">
              Retirada
            </h2>
            <p className="mt-3 flex items-start gap-2 max-w-3xl text-body text-text-primary">
              <Truck
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-text-secondary"
                aria-hidden="true"
              />
              {asset.pickup}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
