import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, FileText, MapPin, Truck } from "lucide-react";
import {
  ASSETS,
  CATEGORY_SHORT,
  getAssetBySlug,
  getAssetsByCompany,
  getCompanyBySlug,
  getSubcategoryLabel,
} from "@/lib/data";
import { getAuctionEventByCompany } from "@/lib/auctions";
import { formatDateTimeWithZone } from "@/lib/format";
import { Gallery } from "@/components/auction/Gallery";
import { BidPanel } from "@/components/auction/BidPanel";
import { LotTable } from "@/components/catalog/LotTable";
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
  return { title: asset ? `${asset.lot} · ${asset.title}` : "Lote" };
}

export default async function LeilaoPage({ params }: PageProps) {
  const { slug } = await params;
  const asset = getAssetBySlug(slug);
  if (!asset) notFound();

  const company = getCompanyBySlug(asset.companySlug);
  const event = getAuctionEventByCompany(asset.companySlug);
  const subcategory = getSubcategoryLabel(asset.category, asset.subcategory);
  const related = getAssetsByCompany(asset.companySlug)
    .filter((item) => item.slug !== asset.slug && item.status !== "cancelado")
    .slice(0, 5);

  const lotData: { label: string; value: React.ReactNode }[] = [
    { label: "Código do lote", value: asset.lot },
    {
      label: "Categoria",
      value: `${CATEGORY_SHORT[asset.category]}${subcategory ? ` · ${subcategory}` : ""}`,
    },
    { label: "Vendedor", value: company?.name ?? "—" },
    { label: "Localização", value: `${asset.city} · ${asset.state}` },
    {
      label: "Leilão",
      value: event ? `${event.code} · ${event.lots.length} lotes` : "—",
    },
    {
      label: asset.status === "agendado" ? "Início previsto" : "Encerramento",
      value: formatDateTimeWithZone(
        asset.status === "agendado"
          ? (asset.startsAtIso ?? asset.deadlineIso)
          : asset.deadlineIso,
      ),
    },
    {
      label: "Prorrogação automática",
      value: asset.antiSniping
        ? "Lances no fim do prazo podem estender o encerramento"
        : "Não prevista",
    },
  ];

  return (
    <div className="container-content py-4 pb-24 md:pb-6">
      <nav
        aria-label="Trilha de navegação"
        className="flex flex-wrap items-center gap-1 text-caption text-text-muted"
      >
        <Link href="/" className="hover:text-action hover:underline">
          Início
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href={`/resultados?categoria=${asset.category}`}
          className="hover:text-action hover:underline"
        >
          {CATEGORY_SHORT[asset.category]}
        </Link>
        {subcategory && (
          <>
            <span aria-hidden="true">/</span>
            <Link
              href={`/resultados?categoria=${asset.category}&subcategoria=${asset.subcategory}`}
              className="hover:text-action hover:underline"
            >
              {subcategory}
            </Link>
          </>
        )}
        <span aria-hidden="true">/</span>
        <span className="text-text-secondary">{asset.lot}</span>
      </nav>

      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        <StatusChip status={asset.status} />
        <span className="lot-tag">Lote {asset.lot}</span>
        {event && (
          <Link
            href={`/leiloes/${asset.companySlug}`}
            className="text-caption font-semibold text-action hover:underline"
          >
            Leilão {event.code}
          </Link>
        )}
      </div>

      <h1 className="mt-1 max-w-4xl text-title-page-mobile text-text-primary md:text-title-page">
        {asset.title}
      </h1>

      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-metadata text-text-secondary">
        {company && (
          <Link
            href={`/loja/${company.slug}`}
            className="inline-flex items-center gap-1.5 hover:text-action hover:underline"
          >
            <Building2 size={14} aria-hidden="true" />
            {company.name}
          </Link>
        )}
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={14} aria-hidden="true" />
          {asset.city} · {asset.state}
        </span>
      </div>

      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-5">
        <div className="min-w-0 lg:col-start-1 xl:max-w-[760px]">
          <Gallery count={asset.gallery} title={asset.title} />
        </div>

        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start lg:sticky lg:top-[140px]">
          <BidPanel key={asset.id} asset={asset} />
        </div>

        <div className="min-w-0 lg:col-start-1">
          <section className="panel mt-4 overflow-hidden">
            <div className="panel-head">
              <h2 className="panel-title">Dados do lote</h2>
            </div>
            <table className="spec-table">
              <tbody>
                {lotData.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="panel mt-4 overflow-hidden">
            <div className="panel-head">
              <h2 className="panel-title">Ficha técnica</h2>
            </div>
            <table className="spec-table">
              <tbody>
                {asset.specs.map((spec) => (
                  <tr key={spec.label}>
                    <th scope="row">{spec.label}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="panel mt-4 p-3">
            <h2 className="panel-title">Descrição</h2>
            <p className="mt-1.5 text-body text-text-secondary">
              {asset.description}
            </p>
            <h3 className="panel-title mt-3">Condição e avarias</h3>
            <p className="mt-1.5 text-body text-text-secondary">
              {asset.condition}
            </p>
          </section>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {asset.documents.length > 0 && (
              <section className="panel p-3">
                <h2 className="panel-title">Documentos previstos</h2>
                <ul className="mt-1.5 space-y-1">
                  {asset.documents.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-start gap-2 text-metadata text-text-secondary"
                    >
                      <FileText
                        size={14}
                        className="mt-0.5 shrink-0 text-text-muted"
                        aria-hidden="true"
                      />
                      {doc}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="panel p-3">
              <h2 className="panel-title">Retirada</h2>
              <p className="mt-1.5 flex items-start gap-2 text-metadata text-text-secondary">
                <Truck
                  size={14}
                  className="mt-0.5 shrink-0 text-text-muted"
                  aria-hidden="true"
                />
                {asset.pickup}
              </p>
            </section>
          </div>
        </div>
      </div>

      {related.length > 0 && event && (
        <section className="mt-6">
          <div className="section-heading">
            <h2 className="section-title">Outros lotes do leilão {event.code}</h2>
            <Link href={`/leiloes/${asset.companySlug}`} className="text-link">
              Ver leilão completo
            </Link>
          </div>
          <div className="mt-3">
            <LotTable assets={related} />
          </div>
        </section>
      )}
    </div>
  );
}
