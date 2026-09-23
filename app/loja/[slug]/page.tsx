import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Info, MapPin } from "lucide-react";
import { COMPANIES, getAssetsByCompany, getCompanyBySlug } from "@/lib/data";
import { getAuctionEventByCompany } from "@/lib/auctions";
import { CompanyAssetTabs } from "@/components/catalog/CompanyAssetTabs";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Backdrop } from "@/components/brand/Backdrop";
import { FollowButton } from "@/components/catalog/FollowButton";
import { companyInitials, companyShortName } from "@/lib/format";
import { assetPhoto, companyPhoto } from "@/lib/images";

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
  const disponiveis = assets.filter(
    (a) => a.status !== "cancelado" && !a.status.startsWith("encerrado"),
  );
  const capa = disponiveis[0] ?? assets[0];
  const capaDaLoja = companyPhoto(company.slug);
  const nome = companyShortName(company.name);

  return (
    <>
      <section className="on-dark relative isolate overflow-hidden bg-brand-900 text-white">
        {(capaDaLoja || capa) && (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 lg:left-1/2"
          >
            <ImageSlot
              src={capaDaLoja ?? assetPhoto(capa!.slug)}
              ratio="h-full"
              sizes="50vw"
              className="h-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/70 to-brand-900/20" />
            <div className="absolute inset-0 bg-brand-900/70 lg:hidden" />
          </div>
        )}
        <Backdrop fade="left" className="-z-10" />

        <div className="container-content py-10 lg:py-14">
          <nav
            aria-label="Trilha de navegação"
            className="text-[13px] text-white/65"
          >
            <Link href="/" className="hover:text-white hover:underline">
              Início
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href="/lojas" className="hover:text-white hover:underline">
              Lojas
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-white/85">{nome}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-4">
                <span className="company-monogram h-16 w-16 text-[20px]">
                  {companyInitials(company.name)}
                </span>
                <div className="min-w-0">
                  <h1 className="text-[30px] font-extrabold leading-tight tracking-[-.03em] sm:text-[40px]">
                    {company.name}
                  </h1>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-white/75">
                    <span className="inline-flex items-center gap-1">
                      <MapPin
                        size={15}
                        aria-hidden="true"
                        className="text-accent-bright"
                      />
                      {company.city} - {company.state}
                    </span>
                    <span>{company.segment}</span>
                  </p>
                </div>
                <FollowButton
                  slug={company.slug}
                  name={nome}
                  tone="dark"
                  className="sm:ml-2"
                />
              </div>
              <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/80">
                {company.description}
              </p>
            </div>

            <dl className="rounded-panel border border-white/15 bg-brand-900/70 backdrop-blur-md">
              {[
                {
                  label: "Localização",
                  value: `${company.city} · ${company.state}`,
                },
                { label: "Desde", value: company.since },
                { label: "Ativos disponíveis", value: `${disponiveis.length}` },
                { label: "Lotes publicados", value: `${live.length}` },
                { label: "Leilão", value: event ? event.code : "—" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-3 border-b border-white/10 px-4 py-2.5 text-[14px] last:border-b-0"
                >
                  <dt className="text-white/60">{row.label}</dt>
                  <dd className="text-right font-semibold text-white">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-6 flex items-start gap-2 text-[13px] text-white/60">
            <Info
              size={14}
              className="mt-0.5 shrink-0 text-accent-bright"
              aria-hidden="true"
            />
            Perfil demonstrativo. Não há verificação cadastral, avaliação ou
            histórico de operações nesta versão.
          </p>
        </div>
      </section>

      <div className="container-content py-8 lg:py-12">
        {event && (
          <Link
            href={`/leiloes/${company.slug}`}
            className="card-lift mb-8 flex items-center justify-between gap-3 rounded-panel border border-border-subtle bg-surface-card p-5 shadow-card"
          >
            <span className="min-w-0">
              <span className="kicker block">Leilão da empresa</span>
              <span className="mt-1 block text-[18px] font-extrabold text-text-primary">
                Leilão {event.code}
              </span>
              <span className="mt-0.5 block text-[14px] text-text-secondary">
                {event.lots.length} lotes · {event.openLots} abertos
              </span>
            </span>
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="shrink-0 text-action"
            />
          </Link>
        )}

        <section>
          <div className="section-heading">
            <h2 className="section-title">Lotes deste vendedor</h2>
          </div>
          <div className="mt-3">
            <CompanyAssetTabs assets={assets} />
          </div>
        </section>
      </div>
    </>
  );
}
