/**
 * Caminhos das fotografias publicadas. Cada foto existe em duas larguras
 * (ver scripts/optimize-images.mjs): `<nome>.webp` e `<nome>-640.webp`.
 */

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Foto principal de um lote, pelo slug. */
export function assetPhoto(slug: string): string {
  return `/images/assets/${slug}.webp`;
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
