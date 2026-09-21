import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Info } from "lucide-react";
import { COMPANIES, getAssetsByCompany, getCompanyBySlug } from "@/lib/data";
import { getAuctionEventByCompany } from "@/lib/auctions";
import { CompanyAssetTabs } from "@/components/catalog/CompanyAssetTabs";
import { ImageSlot } from "@/components/ui/ImageSlot";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COMPANIES.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  return { title: company ? company.name : "Vendedor" };
}

export default async function LojaPage({ params }: PageProps) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const assets = getAssetsByCompany(company.slug);
  const live = assets.filter((asset) => asset.status !== "cancelado");
  const event = getAuctionEventByCompany(company.slug);
  const initials = company.name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="container-content py-4">
      <nav
        aria-label="Trilha de navegação"
        className="text-caption text-text-muted"
      >
        <Link href="/" className="hover:text-action hover:underline">
          Início
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-text-secondary">Vendedor</span>
      </nav>

      <div className="panel mt-1.5 overflow-hidden">
        <ImageSlot
          ratio="h-28 sm:h-36"
          label="Imagem do vendedor"
          className="w-full border-0 border-b border-border-subtle"
        />

        <div className="grid gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <div className="flex items-start gap-3">
              <span className="company-monogram h-12 w-12 text-title-card">
                {initials}
              </span>
              <div className="min-w-0">
                <h1 className="text-title-page-mobile text-text-primary md:text-title-page">
                  {company.name}
                </h1>
                <p className="mt-0.5 text-metadata text-text-secondary">
                  {company.segment}
                </p>
              </div>
            </div>
            <p className="mt-3 max-w-3xl text-body text-text-secondary">
              {company.description}
            </p>
          </div>

          <dl className="self-start border border-border-subtle">
            <div className="panel-head">
              <dt className="panel-title">Dados do vendedor</dt>
            </div>
            {[
              { label: "Localização", value: `${company.city} · ${company.state}` },
              { label: "Fundação informada", value: company.since },
              { label: "Lotes publicados", value: `${live.length}` },
              { label: "Leilão", value: event ? event.code : "—" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-3 border-b border-border-subtle px-3 py-2 text-metadata last:border-b-0"
              >
                <dt className="text-text-muted">{row.label}</dt>
                <dd className="text-right font-semibold text-text-primary">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="flex items-start gap-2 border-t border-border-subtle bg-surface-subtle px-3 py-2 text-caption text-text-secondary">
          <Info
            size={14}
            className="mt-0.5 shrink-0 text-info-text"
            aria-hidden="true"
          />
          Perfil demonstrativo. Não há verificação cadastral, avaliação ou
          histórico de operações nesta versão.
        </p>
      </div>

      {event && (
        <Link
          href={`/leiloes/${company.slug}`}
          className="mt-3 flex items-center justify-between gap-3 border border-border-subtle bg-white p-3 transition-colors duration-quick hover:border-action"
        >
          <span className="min-w-0">
            <span className="block text-title-card text-text-primary">
              Leilão {event.code}
            </span>
            <span className="mt-0.5 block text-metadata text-text-secondary">
              {event.lots.length} lotes · {event.openLots} abertos
            </span>
          </span>
          <ArrowRight size={17} aria-hidden="true" className="shrink-0 text-action" />
        </Link>
      )}

      <section className="mt-5">
        <div className="section-heading">
          <h2 className="section-title">Lotes deste vendedor</h2>
        </div>
        <div className="mt-3">
          <CompanyAssetTabs assets={assets} />
        </div>
      </section>
    </div>
  );
}
