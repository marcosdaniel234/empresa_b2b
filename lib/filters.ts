import { ASSETS, Asset, AuctionStatus, Category } from "./data";

export type StatusFilter = "aberto" | "encerrando" | "agendado" | "encerrado";
export type SortKey = "relevantes" | "encerrando" | "valor_asc" | "valor_desc";

export interface FilterState {
  categorias: Category[];
  status: StatusFilter[];
  uf: string;
  cidade: string;
  valorMin: string;
  valorMax: string;
  q: string;
  sort: SortKey;
}

export const EMPTY_FILTERS: FilterState = {
  categorias: [],
  status: [],
  uf: "",
  cidade: "",
  valorMin: "",
  valorMax: "",
  q: "",
  sort: "relevantes",
};

const STATUS_MAP: Record<StatusFilter, AuctionStatus[]> = {
  aberto: ["aberto", "encerrando"],
  encerrando: ["encerrando"],
  agendado: ["agendado"],
  encerrado: ["encerrado_vencedor", "encerrado_sem_vencedor"],
};

export function parseFilters(searchParams: Record<string, string | string[] | undefined>): FilterState {
  const getAll = (key: string): string[] => {
    const value = searchParams[key];
    if (!value) return [];
    return Array.isArray(value) ? value : value.split(",").filter(Boolean);
  };
  const getOne = (key: string): string => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] ?? "" : value ?? "";
  };

  return {
    categorias: getAll("categoria") as Category[],
    status: getAll("status") as StatusFilter[],
    uf: getOne("uf"),
    cidade: getOne("cidade"),
    valorMin: getOne("valorMin"),
    valorMax: getOne("valorMax"),
    q: getOne("q"),
    sort: (getOne("sort") as SortKey) || "relevantes",
  };
}

export function filtersToQueryString(filters: FilterState): string {
  const params = new URLSearchParams();
  if (filters.categorias.length) params.set("categoria", filters.categorias.join(","));
  if (filters.status.length) params.set("status", filters.status.join(","));
  if (filters.uf) params.set("uf", filters.uf);
  if (filters.cidade) params.set("cidade", filters.cidade);
  if (filters.valorMin) params.set("valorMin", filters.valorMin);
  if (filters.valorMax) params.set("valorMax", filters.valorMax);
  if (filters.q) params.set("q", filters.q);
  if (filters.sort !== "relevantes") params.set("sort", filters.sort);
  return params.toString();
}

export function applyFilters(filters: FilterState): Asset[] {
  let result = ASSETS.filter((asset) => asset.status !== "cancelado");

  if (filters.categorias.length) {
    result = result.filter((asset) => filters.categorias.includes(asset.category));
  }
  if (filters.status.length) {
    const allowed = new Set(filters.status.flatMap((s) => STATUS_MAP[s] ?? []));
    result = result.filter((asset) => allowed.has(asset.status));
  }
  if (filters.uf) {
    result = result.filter((asset) => asset.state === filters.uf);
  }
  if (filters.cidade) {
    const term = filters.cidade.trim().toLowerCase();
    result = result.filter((asset) => asset.city.toLowerCase().includes(term));
  }
  const min = Number(filters.valorMin);
  if (filters.valorMin && !Number.isNaN(min)) {
    result = result.filter((asset) => (asset.currentBid ?? asset.startingBid) >= min);
  }
  const max = Number(filters.valorMax);
  if (filters.valorMax && !Number.isNaN(max)) {
    result = result.filter((asset) => (asset.currentBid ?? asset.startingBid) <= max);
  }
  if (filters.q) {
    const term = filters.q.trim().toLowerCase();
    result = result.filter(
      (asset) => asset.title.toLowerCase().includes(term) || asset.city.toLowerCase().includes(term)
    );
  }

  switch (filters.sort) {
    case "encerrando":
      result = [...result].sort((a, b) => new Date(a.deadlineIso).getTime() - new Date(b.deadlineIso).getTime());
      break;
    case "valor_asc":
      result = [...result].sort((a, b) => (a.currentBid ?? a.startingBid) - (b.currentBid ?? b.startingBid));
      break;
    case "valor_desc":
      result = [...result].sort((a, b) => (b.currentBid ?? b.startingBid) - (a.currentBid ?? a.startingBid));
      break;
    default:
      break;
  }

  return result;
}

export function countActiveFilters(filters: FilterState): number {
  return (
    filters.categorias.length +
    filters.status.length +
    (filters.uf ? 1 : 0) +
    (filters.cidade ? 1 : 0) +
    (filters.valorMin ? 1 : 0) +
    (filters.valorMax ? 1 : 0)
  );
}

export const AVAILABLE_UFS = Array.from(new Set(ASSETS.map((a) => a.state))).sort();
