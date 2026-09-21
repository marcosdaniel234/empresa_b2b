import {
  ASSETS,
  Asset,
  Category,
  Company,
  COMPANIES,
  getCompanyBySlug,
} from "./data";

/**
 * Um leilão agrupa os lotes que uma empresa mantém publicados. O agrupamento é
 * derivado dos próprios lotes — não há uma entidade separada nos dados de
 * demonstração —, por isso o código do leilão vem do slug da empresa e a janela
 * de encerramento é calculada a partir dos prazos dos lotes.
 */
export interface AuctionEvent {
  code: string;
  company: Company;
  lots: Asset[];
  openLots: number;
  categories: Category[];
  firstDeadlineIso: string;
  lastDeadlineIso: string;
  minAmount: number;
  totalBids: number;
}

const OPEN: Asset["status"][] = ["aberto", "encerrando"];

/** Código estável e legível, derivado do slug da empresa. */
function auctionCode(slug: string): string {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) % 9000;
  return `LX-${1000 + hash}`;
}

export function getAuctionEvents(): AuctionEvent[] {
  return COMPANIES.map((company) => {
    const lots = ASSETS.filter(
      (asset) =>
        asset.companySlug === company.slug && asset.status !== "cancelado",
    );
    const deadlines = lots
      .map((lot) => lot.deadlineIso)
      .sort((a, b) => Date.parse(a) - Date.parse(b));

    return {
      code: auctionCode(company.slug),
      company,
      lots,
      openLots: lots.filter((lot) => OPEN.includes(lot.status)).length,
      categories: [...new Set(lots.map((lot) => lot.category))],
      firstDeadlineIso: deadlines[0] ?? "",
      lastDeadlineIso: deadlines[deadlines.length - 1] ?? "",
      minAmount: Math.min(
        ...lots.map((lot) => lot.currentBid ?? lot.startingBid),
      ),
      totalBids: lots.reduce((total, lot) => total + lot.bidCount, 0),
    };
  })
    .filter((event) => event.lots.length > 0)
    .sort(
      (a, b) =>
        b.openLots - a.openLots ||
        Date.parse(a.firstDeadlineIso) - Date.parse(b.firstDeadlineIso),
    );
}

export function getAuctionEventByCompany(
  companySlug: string,
): AuctionEvent | undefined {
  const company = getCompanyBySlug(companySlug);
  if (!company) return undefined;
  return getAuctionEvents().find((event) => event.company.slug === companySlug);
}
