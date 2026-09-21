import { ASSETS, Asset, CATEGORY_LABELS, COMPANIES, Category } from "./data";

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
export const AVAILABLE_UFS = Array.from(
  new Set(ASSETS.map((a) => a.state)),
).sort();
const statuses: StatusFilter[] = [
  "aberto",
  "encerrando",
  "agendado",
  "encerrado",
];
const sorts: SortKey[] = [
  "relevantes",
  "encerrando",
  "valor_asc",
  "valor_desc",
];
export const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
function price(value: string) {
  return /^\d+(?:\.\d{1,2})?$/.test(value) &&
    Number.isFinite(Number(value)) &&
    Number(value) <= Number.MAX_SAFE_INTEGER / 100
    ? value
    : "";
}
export function parseFilters(
  params: Record<string, string | string[] | undefined>,
): FilterState {
  const one = (key: string) => {
    const v = params[key];
    return (Array.isArray(v) ? v[0] : v) ?? "";
  };
  const many = (key: string) => [
    ...new Set(
      (Array.isArray(params[key]) ? (params[key] as string[]) : [one(key)])
        .flatMap((v) => v.split(","))
        .filter(Boolean),
    ),
  ];
  return {
    categorias: many("categoria").filter((v): v is Category =>
      Object.hasOwn(CATEGORY_LABELS, v),
    ),
    status: many("status").filter((v): v is StatusFilter =>
      statuses.includes(v as StatusFilter),
    ),
    uf: AVAILABLE_UFS.includes(one("uf").toUpperCase())
      ? one("uf").toUpperCase()
      : "",
    cidade: one("cidade").trim().slice(0, 100),
    q: one("q").trim().slice(0, 160),
    valorMin: price(one("valorMin")),
    valorMax: price(one("valorMax")),
    sort: sorts.includes(one("sort") as SortKey)
      ? (one("sort") as SortKey)
      : "relevantes",
  };
}
export function filtersToQueryString(filters: FilterState): string {
  const params = new URLSearchParams();
  if (filters.categorias.length)
    params.set("categoria", filters.categorias.join(","));
  if (filters.status.length) params.set("status", filters.status.join(","));
  for (const key of ["uf", "cidade", "valorMin", "valorMax", "q"] as const)
    if (filters[key]) params.set(key, filters[key]);
  if (filters.sort !== "relevantes") params.set("sort", filters.sort);
  return params.toString();
}
export function applyFilters(filters: FilterState): Asset[] {
  const words = normalizeSearch(filters.q).split(/\s+/).filter(Boolean);
  const result = ASSETS.filter((a) => {
    if (a.status === "cancelado") return false;
    if (filters.categorias.length && !filters.categorias.includes(a.category))
      return false;
    if (
      filters.status.length &&
      !filters.status.some((s) =>
        s === "aberto"
          ? ["aberto", "encerrando"].includes(a.status)
          : s === "encerrado"
            ? ["encerrado_vencedor", "encerrado_sem_vencedor"].includes(
                a.status,
              )
            : s === "encerrando"
              ? ["aberto", "encerrando"].includes(a.status) &&
                Date.parse(a.deadlineIso) -
                  Number(
                    process.env.NEXT_PUBLIC_DEMO_EPOCH ??
                      Date.UTC(2026, 8, 21, 12),
                  ) <=
                  86400000
              : a.status === s,
      )
    )
      return false;
    if (filters.uf && a.state !== filters.uf) return false;
    if (
      filters.cidade &&
      !normalizeSearch(a.city).includes(normalizeSearch(filters.cidade))
    )
      return false;
    const amount = a.currentBid ?? a.startingBid;
    if (filters.valorMin && amount < Number(filters.valorMin)) return false;
    if (filters.valorMax && amount > Number(filters.valorMax)) return false;
    const company = COMPANIES.find((c) => c.slug === a.companySlug);
    const haystack = normalizeSearch(
      [
        a.title,
        a.description,
        a.city,
        a.state,
        CATEGORY_LABELS[a.category],
        company?.name,
        ...a.specs.map((s) => s.value),
      ].join(" "),
    );
    return words.every((w) => haystack.includes(w));
  });
  if (filters.sort === "valor_asc")
    result.sort(
      (a, b) =>
        (a.currentBid ?? a.startingBid) - (b.currentBid ?? b.startingBid),
    );
  if (filters.sort === "valor_desc")
    result.sort(
      (a, b) =>
        (b.currentBid ?? b.startingBid) - (a.currentBid ?? a.startingBid),
    );
  if (filters.sort === "encerrando")
    result.sort((a, b) => {
      const rank = (a: Asset) =>
        ["aberto", "encerrando"].includes(a.status)
          ? 0
          : a.status === "agendado"
            ? 1
            : 2;
      return (
        rank(a) - rank(b) ||
        Date.parse(a.deadlineIso) - Date.parse(b.deadlineIso)
      );
    });
  return result;
}
export function countActiveFilters(f: FilterState): number {
  return (
    f.categorias.length +
    f.status.length +
    ["uf", "cidade", "valorMin", "valorMax"].filter(
      (key) => !!f[key as keyof FilterState],
    ).length
  );
}

