import type { MetadataRoute } from "next";
import { ASSETS, COMPANIES } from "@/lib/data";
import { getAuctionEvents } from "@/lib/auctions";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const PAGINAS = [
  "",
  "/resultados",
  "/leiloes",
  "/lojas",
  "/anunciar",
  "/como-funciona",
  "/ajuda",
  "/termos",
  "/privacidade",
];

/** Só as páginas públicas; favoritos, comparação e acesso são pessoais. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_URL}${path}/`;
  return [
    ...PAGINAS.map((p) => ({ url: url(p) })),
    ...ASSETS.filter((a) => a.status !== "cancelado").map((a) => ({ url: url(`/leilao/${a.slug}`) })),
    ...getAuctionEvents().map((e) => ({ url: url(`/leiloes/${e.company.slug}`) })),
    ...COMPANIES.map((c) => ({ url: url(`/loja/${c.slug}`) })),
  ];
}
