import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { ASSETS, COMPANIES, Company } from "@/lib/data";
import { companyInitials, companyShortName } from "@/lib/format";
import { assetPhoto } from "@/lib/images";
import { Contours } from "@/components/brand/Contours";
import { FollowButton } from "@/components/catalog/FollowButton";
import { ImageSlot } from "@/components/ui/ImageSlot";

function lotesDisponiveis(company: Company) {
  return ASSETS.filter(
    (a) =>
      a.companySlug === company.slug &&
      a.status !== "cancelado" &&
      !a.status.startsWith("encerrado"),
  );
}

/**
 * Faixa das lojas: as duas empresas com mais lotes disponíveis. Os números
 * vêm do catálogo; não há selo de verificação porque a demonstração não
 * verifica ninguém.
 */
export function CompaniesBand() {
  const destaque = COMPANIES.map((c) => ({ company: c, lotes: lotesDisponiveis(c) }))
    .filter((x) => x.lotes.length > 0)
    .sort((a, b) => b.lotes.length - a.lotes.length || a.company.name.localeCompare(b.company.name))
    .slice(0, 2);

  return (
    <section
      aria-labelledby="titulo-empresas"
      className="on-dark relative overflow-hidden bg-brand-900 py-16 lg:py-24"
    >
      <Contours className="opacity-80" />
      <div className="container-content relative grid gap-10 lg:grid-cols-[minmax(0,.9fr)_minmax(0,2fr)] lg:gap-14">
        <div data-reveal>
          <div className="flex items-start gap-5">
            <span className="section-index mt-2 text-copper-bright">03</span>
            <div>
              <h2 id="titulo-empresas" className="section-title text-white">
                Empresas que movimentam o mercado
              </h2>
              <p className="mt-4 text-[19px] font-bold text-copper-bright">
                Parcerias que constroem o futuro.
              </p>
              <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-white/75">
                Cada lote pertence a uma empresa com loja própria no catálogo: segmento,
                cidade e todos os ativos que ela anuncia, em um só lugar.
              </p>
              <Link
                href="/lojas"
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-white underline-offset-4 hover:underline"
              >
                Ver todas as lojas <ArrowRight size={17} aria-hidden="true" className="text-copper-bright" />
              </Link>
            </div>
          </div>
        </div>

        <ul className="grid gap-5 md:grid-cols-2">
          {destaque.map(({ company, lotes }, i) => {
            const fotos = lotes.slice(0, 3);
            const extra = lotes.length - fotos.length;
            return (
              <li
                key={company.slug}
                data-reveal={String(i + 1)}
                className="relative flex flex-col rounded-panel border border-white/10 bg-white/[.06] p-5 backdrop-blur-sm transition-colors duration-standard hover:border-copper-bright/50 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="company-monogram h-14 w-14 text-[18px]">
                    {companyInitials(company.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[19px] font-extrabold leading-tight tracking-[-.01em] text-white">
                      <Link
                        href={`/loja/${company.slug}`}
                        className="after:absolute after:inset-0 after:rounded-panel hover:text-copper-bright"
                      >
                        {companyShortName(company.name)}
                      </Link>
                    </h3>
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-white/70">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={14} aria-hidden="true" className="text-copper-bright" />
                        {company.city} - {company.state}
                      </span>
                      <span>Desde {company.since}</span>
                    </p>
                  </div>
                  <FollowButton slug={company.slug} name={companyShortName(company.name)} tone="dark" />
                </div>

                <ul className="mt-5 grid grid-cols-4 gap-2" aria-label={`Lotes de ${companyShortName(company.name)}`}>
                  {fotos.map((a) => (
                    <li key={a.id} className="overflow-hidden rounded-control">
                      <ImageSlot
                        src={assetPhoto(a.slug)}
                        alt={a.title}
                        ratio="aspect-square"
                        size="sm"
                        sizes="120px"
                      />
                    </li>
                  ))}
                  <li className="flex aspect-square items-center justify-center rounded-control border border-white/15 bg-white/[.04] text-center text-[14px] font-bold leading-tight text-white">
                    {extra > 0 ? (
                      <span>
                        +{extra}
                        <span className="block text-[12px] font-medium text-white/65">
                          {extra === 1 ? "ativo" : "ativos"}
                        </span>
                      </span>
                    ) : (
                      <span className="text-[12px] font-medium text-white/65">
                        {lotes.length} {lotes.length === 1 ? "ativo" : "ativos"}
                      </span>
                    )}
                  </li>
                </ul>

                <p className="mt-5 border-t border-white/10 pt-4 text-[14px] text-white/70">
                  {company.segment}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
