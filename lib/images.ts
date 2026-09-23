/**
 * Caminhos das fotografias publicadas. Cada foto existe em duas larguras
 * (ver scripts/optimize-images.mjs): `<nome>.webp` e `<nome>-640.webp`.
 */

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Foto principal de um lote, pelo slug. */
export function assetPhoto(slug: string): string {
  return `/images/assets/${slug}.webp`;
}

/** Fotos institucionais já produzidas para as fachadas das lojas. */
const COMPANY_PHOTOS = new Set([
  "cerrado-agroindustrial",
  "metalfor-industrial",
  "novadata-tecnologia",
  "transnorte-logistica",
]);

/** Capa própria quando disponível; lojas sem foto mantêm a imagem do lote. */
export function companyPhoto(slug: string): string | undefined {
  return COMPANY_PHOTOS.has(slug) ? `/images/companies/${slug}.webp` : undefined;
}

/**
 * Resolve `src` e `srcSet` de uma foto publicada. Arquivos que não seguem a
 * convenção de duas larguras (SVG, por exemplo) voltam só com `src`.
 */
export function photoSources(path: string): { src: string; srcSet?: string } {
  const src = path.startsWith("/") ? `${BASE}${path}` : path;
  if (!/^\/images\/[^/]+\/[^/]+\.webp$/.test(path)) return { src };
  const small = src.replace(/\.webp$/, "-640.webp");
  return { src, srcSet: `${small} 640w, ${src} 1600w` };
}
