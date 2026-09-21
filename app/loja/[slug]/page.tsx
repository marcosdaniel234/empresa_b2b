import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, Calendar, Info, MapPin } from "lucide-react";
import { COMPANIES, getAssetsByCompany, getCompanyBySlug } from "@/lib/data";
import { CompanyAssetTabs } from "@/components/catalog/CompanyAssetTabs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COMPANIES.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  return { title: company ? company.name : "Loja da empresa" };
}

export default async function LojaPage({ params }: PageProps) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const assets = getAssetsByCompany(company.slug);
  const live = assets.filter((asset) => asset.status !== "cancelado");
  const initials = company.name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="container-content py-5 md:py-6">
      <nav
        aria-label="Trilha de navegação"
        className="text-caption text-text-secondary"
      >
        <Link href="/" className="hover:text-action hover:underline">
          Início
        </Link>
        <span aria-hidden="true"> / </span>
        <span>Loja da empresa</span>
      </nav>

      <div className="panel mt-2 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-control bg-surface-subtle text-title-section font-bold text-brand-900">
            {initials || <Building2 size={24} aria-hidden="true" />}
          </span>

          <div className="min-w-0 flex-1">
            <h1 className="text-title-page-mobile text-text-primary md:text-title-page">
              {company.name}
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-1 text-metadata text-text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} aria-hidden="true" />
                {company.city} · {company.state}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={15} aria-hidden="true" />
                Fundação informada: {company.since}
              </span>
              <span className="lot-tag">
                {live.length} {live.length === 1 ? "lote" : "lotes"}
              </span>
            </p>
            <p className="mt-3 max-w-3xl text-body text-text-secondary">
              {company.description}
            </p>
            <p className="mt-2 text-metadata text-text-secondary">
              Segmento: {company.segment}
            </p>
          </div>
        </div>

        <p className="mt-4 flex items-start gap-2 rounded-control bg-surface-subtle p-3 text-metadata text-text-secondary">
          <Info
            size={16}
            className="mt-0.5 shrink-0 text-info-text"
            aria-hidden="true"
          />
          Perfil demonstrativo. Os dados desta empresa são exemplos para você
          conhecer a experiência de uma loja.
        </p>
      </div>

      <section className="mt-6 pb-4">
        <h2 className="section-title">Lotes desta empresa</h2>
        <div className="mt-3">
          <CompanyAssetTabs assets={assets} />
        </div>
      </section>
    </div>
  );
}
