/**
 * Endereço público do site, sem barra final — por exemplo
 * https://usuario.github.io/empresa_b2b. O workflow de publicação preenche
 * NEXT_PUBLIC_SITE_URL; em desenvolvimento fica vazio e as URLs saem relativas.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
