import Link from "next/link";
import { Building2, Gavel, MapPin, Boxes } from "lucide-react";
import { ASSETS, getStateCounts } from "@/lib/data";
import { getAuctionEvents } from "@/lib/auctions";

/**
 * Faixa de números do catálogo.
 *
 * A referência traz marcas de tração — compradores cadastrados, volume
 * transacionado, percentual verificado. Nenhuma delas existe nesta
 * demonstração, e inventá-las seria o único tipo de mentira que um protótipo
 * não pode contar. Ficam os quatro números que o próprio catálogo produz, e
 * cada um leva ao recorte que ele conta.
 */
export function StatsBand() {
  const vivos = ASSETS.filter((a) => a.status !== "cancelado");
  const events = getAuctionEvents();
  const lances = vivos.reduce((total, a) => total + a.bidCount, 0);

  const numeros = [
    {
      icon: Boxes,
      value: vivos.length,
      label: "lotes no catálogo",
      href: "/resultados",
    },
    {
      icon: Building2,
      value: events.length,
      label: "empresas vendedoras",
      href: "/leiloes",
    },
    {
      icon: MapPin,
      value: getStateCounts().length,
      label: "estados com retirada",
      href: "/resultados",
    },
    {
      icon: Gavel,
      value: lances,
      label: "lances no exemplo",
      href: "/resultados?status=aberto",
    },
  ];

  return (
    <section
      aria-label="Números do catálogo"
      className="container-content pb-8 lg:pb-10"
    >
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-border-subtle bg-border-subtle shadow-card lg:grid-cols-4">
        {numeros.map((item) => (
          <li key={item.label} className="fx-card">
            <Link
              href={item.href}
              className="flex min-h-[96px] items-center gap-3.5 px-4 py-5 transition-colors duration-standard ease-standard hover:bg-action-soft sm:px-6"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-action-soft text-action"
              >
                <item.icon size={21} />
              </span>
              <span className="min-w-0">
                <span className="block text-[26px] font-extrabold leading-8 text-text-primary tabular">
                  {item.value}
                </span>
                <span className="block truncate text-caption text-text-muted">
                  {item.label}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
