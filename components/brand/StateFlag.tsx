/**
 * Bandeira de uma UF, em WebP de 160 px gerado por `npm run images` a partir
 * dos SVG em assets-src/states/. As bandeiras têm proporções diferentes; a
 * moldura fixa 3:2 recorta todas do mesmo jeito.
 */
export function StateFlag({ uf, className = "" }: { uf: string; className?: string }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    // eslint-disable-next-line @next/next/no-img-element -- arquivo estático minúsculo, sem otimizador na exportação
    <img
      src={`${base}/images/states/${uf.toLowerCase()}.webp`}
      alt=""
      width={48}
      height={32}
      loading="lazy"
      decoding="async"
      className={`aspect-[3/2] shrink-0 rounded-[4px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,.12)] ${className}`}
    />
  );
}
