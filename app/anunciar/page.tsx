import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  FileText,
  Gavel,
  MapPin,
  Store,
  Tag,
  Users,
} from "lucide-react";
import { ASSETS, COMPANIES } from "@/lib/data";
import { companyInitials, companyShortName } from "@/lib/format";
import { assetPhoto, photoSources } from "@/lib/images";
import { AnnouncementChecklist } from "@/components/catalog/AnnouncementChecklist";
import { Backdrop } from "@/components/brand/Backdrop";
import { BrazilMap } from "@/components/brand/BrazilMap";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SellerForm } from "@/components/seller/SellerForm";

export const metadata: Metadata = {
  title: "Anunciar ativo",
  description:
    "Abra a loja da sua empresa na ATIVOS B2B e anuncie máquinas, veículos, tecnologia e mobiliário para outras empresas, em leilão ou venda direta.",
};

const RECURSOS = [
  { icon: Store, titulo: "Loja própria", texto: "Todos os seus ativos reunidos sob o nome da empresa." },
  { icon: FileText, titulo: "Ficha padronizada", texto: "Especificações, documentos e retirada em cada lote." },
  { icon: Users, titulo: "Entre empresas", texto: "Uma vitrine feita para compradores corporativos." },
];

const ETAPAS = [
  {
    icon: ClipboardList,
    titulo: "Cadastre a empresa",
    texto: "Razão social, CNPJ e um contato responsável. A loja nasce com o nome, a cidade e o segmento da empresa.",
  },
  {
    icon: Tag,
    titulo: "Publique os ativos",
    texto: "Fotos atuais, ficha técnica, documentos e local de retirada. Você escolhe leilão, com lance inicial, ou venda direta, com preço fixo.",
  },
  {
    icon: Gavel,
    titulo: "Feche com outra empresa",
    texto: "Os lances ou pedidos chegam com a identificação de quem compra; a retirada segue o prazo declarado no anúncio.",
  },
];

/** A prévia usa a loja com mais ativos do catálogo de demonstração, não números inventados. */
function lojaExemplo() {
  const disponiveis = (slug: string) =>
    ASSETS.filter(
      (a) => a.companySlug === slug && a.status !== "cancelado" && !a.status.startsWith("encerrado"),
    );
  const [loja] = COMPANIES.map((c) => ({ c, lotes: disponiveis(c.slug) })).sort(
    (a, b) => b.lotes.length - a.lotes.length,
  );
  return { loja: loja.c, lotes: loja.lotes };
}

export default function AnunciarPage() {
  const { loja, lotes } = lojaExemplo();
  const foto = photoSources("/images/institutional/acompanhamento-lotes.webp");

  return (
    <>
      {/* Abertura */}
      <section className="on-dark relative isolate overflow-hidden bg-brand-900 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden lg:left-[42%]">
          {/* eslint-disable-next-line @next/next/no-img-element -- exportação estática; srcset resolve a largura */}
          <img
            src={foto.src}
            srcSet={foto.srcSet}
            sizes="(min-width: 1024px) 58vw, 100vw"
            alt=""
            width={1600}
            height={1000}
            fetchPriority="high"
            className="size-full animate-ken-burns object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-transparent to-brand-900/50" />
          <div className="absolute inset-0 bg-brand-900/75 lg:hidden" />
        </div>
        <Backdrop fade="left" className="-z-10" />

        <div className="container-content grid gap-12 pb-16 pt-[116px] md:pt-[140px] lg:min-h-[720px] lg:grid-cols-[minmax(0,600px)_minmax(0,1fr)] lg:pb-20">
          <div>
            <p className="kicker-on-dark animate-rise" style={{ animationDelay: "80ms" }}>
              Para quem vende
            </p>
            <h1
              className="mt-5 animate-rise text-[40px] font-extrabold leading-[1.02] tracking-[-.04em] sm:text-[56px] lg:text-[64px]"
              style={{ animationDelay: "160ms" }}
            >
              Seu próximo negócio começa{" "}
              <span className="text-accent-gradient">com o que você já tem.</span>
            </h1>
            <p
              className="mt-5 max-w-[500px] animate-rise text-[18px] leading-[1.5] text-white/80 sm:text-[20px]"
              style={{ animationDelay: "260ms" }}
            >
              Máquinas paradas, frota renovada, equipamentos de um projeto encerrado: abra a
              loja da sua empresa e ofereça esses ativos a quem vai colocá-los para trabalhar.
            </p>
            <div className="mt-8 flex animate-rise flex-wrap gap-3" style={{ animationDelay: "340ms" }}>
              <a href="#cadastro" className="cream-link group pr-2.5">
                Criar minha loja
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-action text-white transition-transform duration-standard group-hover:translate-x-0.5">
                  <ArrowRight size={17} aria-hidden="true" />
                </span>
              </a>
              <a href="#etapas" className="ghost-light-link">
                Como funciona
              </a>
            </div>

            <ul className="mt-12 grid animate-rise gap-6 sm:grid-cols-3" style={{ animationDelay: "440ms" }}>
              {RECURSOS.map((r) => (
                <li key={r.titulo} className="border-t border-white/15 pt-4">
                  <r.icon size={26} strokeWidth={1.5} aria-hidden="true" className="text-accent-bright" />
                  <p className="mt-3 text-[15px] font-bold text-white">{r.titulo}</p>
                  <p className="mt-1 text-[14px] leading-snug text-white/70">{r.texto}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Prévia da loja */}
          <div className="flex items-end justify-end">
            <article
              aria-labelledby="previa-loja"
              className="w-full max-w-[420px] animate-rise rounded-panel border border-white/15 bg-brand-900/80 p-5 backdrop-blur-md sm:p-6"
              style={{ animationDelay: "520ms" }}
            >
              <p className="kicker-on-dark">Sua loja na ATIVOS B2B</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="company-monogram h-14 w-14 text-[18px]">{companyInitials(loja.name)}</span>
                <div className="min-w-0">
                  <h2 id="previa-loja" className="truncate text-[19px] font-extrabold text-white">
                    {companyShortName(loja.name)}
                  </h2>
                  <p className="mt-0.5 flex items-center gap-1 text-[14px] text-white/70">
                    <MapPin size={14} aria-hidden="true" className="text-accent-bright" />
                    {loja.city} - {loja.state} · {loja.segment}
                  </p>
                </div>
              </div>
              <ul className="mt-5 grid grid-cols-3 gap-2">
                {lotes.slice(0, 3).map((a) => (
                  <li key={a.id} className="overflow-hidden rounded-control">
                    <ImageSlot src={assetPhoto(a.slug)} alt={a.title} ratio="aspect-[4/3]" size="sm" sizes="140px" />
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                <p className="text-[14px] text-white/75">
                  <span className="text-[20px] font-extrabold text-white tabular">{lotes.length}</span>{" "}
                  {lotes.length === 1 ? "ativo disponível" : "ativos disponíveis"}
                </p>
                <Link
                  href={`/loja/${loja.slug}`}
                  className="inline-flex min-h-10 items-center gap-1.5 text-[14px] font-semibold text-accent-bright hover:text-white"
                >
                  Ver loja de exemplo <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Etapas */}
      <section id="etapas" aria-labelledby="titulo-etapas" className="py-16 lg:py-24">
        <div className="container-content">
          <div data-reveal className="max-w-3xl">
            <p className="kicker">Da sua empresa para a próxima operação</p>
            <h2 id="titulo-etapas" className="section-title mt-3">
              Três passos entre o ativo parado e o negócio fechado.
            </h2>
          </div>

          <ol className="mt-10 grid gap-5 lg:grid-cols-3">
            {ETAPAS.map((e, i) => (
              <li
                key={e.titulo}
                data-reveal={String(i + 1)}
                className="relative rounded-panel border border-border-subtle bg-surface-card p-6 shadow-card sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[44px] font-extrabold leading-none tracking-[-.04em] text-accent tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-action">
                    <e.icon size={22} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-5 text-[20px] font-extrabold tracking-[-.01em]">{e.titulo}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{e.texto}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-14">
            <div data-reveal>
              <p className="kicker">Antes de anunciar</p>
              <h2 className="mt-3 text-[26px] font-extrabold leading-tight tracking-[-.02em] sm:text-[32px]">
                O que ter em mãos para o primeiro lote.
              </h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-text-secondary">
                Compradores corporativos decidem pela ficha. Quanto mais completa ela chega, menos
                perguntas antes do lance — e menos surpresa na retirada.
              </p>
              <Link href="/resultados" className="text-link mt-6 text-[15px] font-medium">
                Ver como os lotes aparecem no catálogo <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div data-reveal="1">
              <AnnouncementChecklist />
            </div>
          </div>
        </div>
      </section>

      {/* Cadastro */}
      <section
        id="cadastro"
        aria-labelledby="titulo-cadastro"
        className="on-dark relative overflow-hidden bg-brand-800 py-16 lg:py-24"
      >
        <Backdrop variant="rotas" />
        <BrazilMap className="absolute -left-20 bottom-0 hidden w-[460px] bg-accent-bright/[.1] lg:block" />
        <div className="container-content relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <p className="kicker-on-dark">Cadastro de vendedor</p>
            <h2 id="titulo-cadastro" className="section-title mt-3 text-white">
              Sua loja começa com três informações.
            </h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-white/75">
              Depois do cadastro vêm a conferência dos dados da empresa e a publicação do
              primeiro lote, com a ficha que você preparou na lista acima.
            </p>
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-white/60">
              Prazos de análise e condições comerciais: [CONTEÚDO A DEFINIR].
            </p>
          </div>
          <div data-reveal="1">
            <SellerForm />
          </div>
        </div>
      </section>
    </>
  );
}
