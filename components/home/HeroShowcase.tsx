"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Gem,
  MapPin,
  Tag,
  Timer,
} from "lucide-react";
import { Asset } from "@/lib/data";
import { formatCurrencyCard } from "@/lib/format";
import { assetPhoto, photoSources } from "@/lib/images";
import { CompactCountdown } from "@/components/auction/CountdownClock";
import { BrazilMap } from "@/components/brand/BrazilMap";
import { Contours } from "@/components/brand/Contours";

export interface ShowcaseSlide {
  asset: Asset;
  /** Ano de fabricação ou modelo, quando a ficha traz um. */
  year?: string;
  /** Especificação que identifica o equipamento (marca, modelo, potência). */
  detail?: string;
}

const AUTOPLAY_MS = 8000;

const PILARES = [
  { icon: BarChart3, label: "Mais negócios\npara hoje" },
  { icon: Gem, label: "Mais valor\npara amanhã" },
];

/**
 * Abertura da página inicial: a promessa da marca à esquerda e, ao fundo, a
 * fotografia do lote em destaque, que troca entre os três lotes abertos de
 * maior valor.
 *
 * A troca automática pausa sob o ponteiro, com foco dentro da seção, com a
 * aba em segundo plano e — sempre — para quem pede movimento reduzido. As
 * miniaturas e as setas também trocam o lote, e o contador mostra a posição.
 */
export function HeroShowcase({ slides }: { slides: ShowcaseSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [announce, setAnnounce] = useState(false);
  const reduced = useRef(false);
  const total = slides.length;
  const current = slides[index];

  const go = useCallback(
    (next: number, byUser = true) => {
      setIndex((next + total) % total);
      setAnnounce(byUser);
    },
    [total],
  );

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || total < 2 || reduced.current) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") go(index + 1, false);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [index, paused, total, go]);

  if (!current) return null;
  const { asset } = current;
  const aberto = asset.currentBid !== null;

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Lotes em destaque"
      className="on-dark relative isolate overflow-hidden bg-brand-900 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Fotografias: todas carregadas, só a ativa visível, com aproximação lenta. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden lg:left-[34%]">
        {slides.map((slide, i) => {
          const photo = photoSources(assetPhoto(slide.asset.slug));
          return (
            // eslint-disable-next-line @next/next/no-img-element -- exportação estática; srcset resolve a largura
            <img
              key={slide.asset.id}
              src={photo.src}
              srcSet={photo.srcSet}
              sizes="(min-width: 1024px) 66vw, 100vw"
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              className={`absolute inset-0 size-full object-cover transition-opacity duration-[1100ms] ease-standard ${
                i === index ? "animate-ken-burns opacity-100" : "opacity-0"
              }`}
            />
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/55 to-brand-900/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-brand-900/60" />
        <div className="absolute inset-0 bg-brand-900/70 lg:hidden" />
      </div>
      <Contours className="-z-10 opacity-80 [mask-image:linear-gradient(90deg,#000_30%,transparent_70%)]" />
      <BrazilMap className="absolute left-[18%] top-24 -z-10 hidden w-[340px] bg-copper-bright/[.14] lg:block" />

      <div className="container-content grid gap-10 pb-36 pt-[116px] md:pt-[140px] lg:min-h-[760px] lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:pb-40">
        <div className="relative">
          <p className="kicker-on-dark animate-rise" style={{ animationDelay: "80ms" }}>
            Negócios que movimentam empresas
          </p>
          <h1
            className="mt-5 animate-rise text-[46px] font-extrabold leading-[.98] tracking-[-.045em] sm:text-[64px] lg:text-[78px]"
            style={{ animationDelay: "160ms" }}
          >
            Grandes ativos.
            <span className="text-copper-gradient block pb-1">Novos destinos.</span>
          </h1>
          <p
            className="mt-5 max-w-[470px] animate-rise text-[18px] leading-[1.45] text-white/80 sm:text-[21px]"
            style={{ animationDelay: "260ms" }}
          >
            Conecte sua empresa a oportunidades de compra e venda em todo o
            Brasil.
          </p>

          <div
            className="mt-8 flex animate-rise flex-wrap gap-3"
            style={{ animationDelay: "340ms" }}
          >
            <Link href="/resultados" className="cream-link group pr-2.5">
              Explorar oportunidades
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-action text-white transition-transform duration-standard group-hover:translate-x-0.5">
                <ArrowRight size={17} aria-hidden="true" />
              </span>
            </Link>
            <Link href="/anunciar" className="ghost-light-link">
              Anunciar um ativo
            </Link>
          </div>

          <ul
            className="mt-10 flex animate-rise flex-wrap gap-y-4"
            style={{ animationDelay: "440ms" }}
          >
            {PILARES.map((p) => (
              <li
                key={p.label}
                className="flex items-center gap-3 border-white/15 pr-6 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-6"
              >
                <p.icon size={30} strokeWidth={1.4} aria-hidden="true" className="text-copper-bright" />
                <span className="whitespace-pre-line text-[11px] font-semibold uppercase leading-[1.35] tracking-[.14em] text-white/80">
                  {p.label}
                </span>
              </li>
            ))}
            <li className="flex items-center gap-3 border-l border-white/15 pl-6">
              <BrazilMap solid className="w-8 bg-copper-bright" />
              <span className="whitespace-pre-line text-[11px] font-semibold uppercase leading-[1.35] tracking-[.14em] text-white/80">
                {"Um Brasil mais\nprodutivo"}
              </span>
            </li>
          </ul>

          <p
            className="mt-10 hidden animate-rise text-[12px] font-medium uppercase leading-6 tracking-[.34em] text-white/70 lg:block"
            style={{ animationDelay: "520ms" }}
          >
            &ldquo;Ativos hoje.
            <br />
            Empresas mais fortes amanhã.&rdquo;
          </p>
        </div>

        {/* Lado direito: miniaturas, cartão do lote ativo e navegação. */}
        <div className="relative flex flex-col justify-end gap-5 lg:items-end">
          <div className="hidden gap-3 lg:absolute lg:right-0 lg:top-0 lg:flex lg:flex-col">
            {slides.map((slide, i) => {
              const photo = photoSources(assetPhoto(slide.asset.slug));
              return (
                <button
                  key={slide.asset.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-pressed={i === index}
                  aria-label={`Ver ${slide.asset.title}`}
                  className={`group relative block w-[180px] overflow-hidden rounded-[8px] border-2 text-left transition-[border-color,transform] duration-panel ease-standard xl:w-[196px] ${
                    i === index
                      ? "border-copper-bright"
                      : "border-white/25 hover:-translate-x-1 hover:border-white/60"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- exportação estática */}
                  <img
                    src={photo.srcSet ? photo.src.replace(/\.webp$/, "-640.webp") : photo.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-900/95 to-transparent px-2.5 pb-2 pt-6 text-[12px] font-medium leading-4">
                    {slide.asset.title}
                    {slide.year ? ` • ${slide.year}` : ""}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex w-full flex-col gap-4 lg:w-auto lg:flex-row lg:items-end">
            <article
              key={asset.id}
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${total}`}
              className="relative w-full animate-fade-in rounded-[10px] border border-copper-bright/35 bg-brand-900/85 p-5 pt-6 shadow-float backdrop-blur-md lg:w-[400px]"
            >
              <span className="absolute -top-3 left-5 rounded-[4px] bg-copper-solid px-2.5 py-1 text-[11px] font-bold uppercase tracking-[.08em] text-brand-900">
                {asset.modalidade === "venda_direta" ? "Venda em destaque" : "Lote em destaque"}
              </span>
              <h2 className="text-[20px] font-bold leading-7 tracking-[-.01em]">
                <Link
                  href={`/leilao/${asset.slug}`}
                  className="after:absolute after:inset-0 after:content-[''] hover:text-copper-bright"
                >
                  {asset.title}
                  {current.year ? ` • ${current.year}` : ""}
                </Link>
              </h2>
              <div className="mt-3 flex items-end gap-5">
                <div>
                  <p className="text-[14px] text-white/70">
                    {aberto ? "Lance atual" : "Lance inicial"}
                  </p>
                  <p className="text-[30px] font-extrabold leading-9 tracking-[-.03em] tabular">
                    {formatCurrencyCard(asset.currentBid ?? asset.startingBid)}
                  </p>
                </div>
                <div className="flex items-center gap-2.5 border-l border-white/20 pl-5">
                  <Timer size={22} strokeWidth={1.6} aria-hidden="true" className="text-white/80" />
                  <p className="text-[13px] leading-tight text-white/70">
                    Encerra em
                    <span className="block text-[17px] font-bold text-white">
                      <CompactCountdown deadlineIso={asset.deadlineIso} />
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-white/75">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={15} aria-hidden="true" className="text-white" />
                    {asset.city} - {asset.state}
                  </span>
                  {current.detail && (
                    <span className="inline-flex min-w-0 items-center gap-1.5 border-l border-white/20 pl-3">
                      <Tag size={14} aria-hidden="true" className="shrink-0 text-white" />
                      <span className="truncate">{current.detail}</span>
                    </span>
                  )}
                </p>
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-copper-bright/60 text-copper-bright transition-colors duration-standard"
                >
                  <ArrowRight size={18} />
                </span>
              </div>
            </article>

            <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
              <p className="text-[15px] tabular text-white/70" aria-hidden="true">
                <span className="text-[20px] font-semibold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>{" "}
                / {String(total).padStart(2, "0")}
              </p>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Lote anterior"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-standard hover:border-copper-bright hover:bg-copper-bright hover:text-brand-900"
                >
                  <ChevronLeft size={19} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Próximo lote"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-standard hover:border-copper-bright hover:bg-copper-bright hover:text-brand-900"
                >
                  <ChevronRight size={19} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live={announce ? "polite" : "off"}>
        {`Lote ${index + 1} de ${total}: ${asset.title}`}
      </p>
    </section>
  );
}
