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
  const initials = company.name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div>
      <div className="relative h-40 w-full overflow-hidden bg-brand-900 sm:h-56">
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          aria-hidden="true"
        >
          <pattern
            id="loja-dots"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="#ffffff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#loja-dots)" />
        </svg>
        <div
          className="absolute -right-10 -top-16 h-64 w-64 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #D9ED92 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="container-content">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
          <div className="-mt-10 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-card border-4 border-surface-page bg-surface-card text-title-section font-bold text-brand-900 shadow-card sm:-mt-12 sm:h-24 sm:w-24">
            {initials || <Building2 className="h-8 w-8" aria-hidden="true" />}
          </div>
          <div className="pb-1 pt-2 sm:pt-0">
            <h1 className="text-title-page-mobile text-text-primary md:text-title-page">
              {company.name}
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-metadata text-text-secondary">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {company.city} · {company.state}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Fundação informada: {company.since}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="text-title-card text-text-primary">
              Sobre a empresa
            </h2>
            <p className="mt-2 max-w-2xl text-body text-text-secondary">
              {company.description}
            </p>
            <p className="mt-2 text-metadata text-text-secondary">
              Segmento: {company.segment}
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-card border border-border-subtle bg-surface-card p-4">
            <Info
              className="h-5 w-5 flex-shrink-0 text-info-text"
              aria-hidden="true"
            />
            <p className="text-metadata text-text-secondary">
              Perfil demonstrativo. Os dados desta empresa são exemplos para
              você conhecer a experiência de uma loja.
            </p>
          </div>
        </div>

        <section className="mt-10 pb-16">
          <h2 className="text-title-section-mobile text-text-primary md:text-title-section">
            Leilões
          </h2>
          <div className="mt-6">
            <CompanyAssetTabs assets={assets} />
          </div>
        </section>
      </div>
    </div>
  );
}
