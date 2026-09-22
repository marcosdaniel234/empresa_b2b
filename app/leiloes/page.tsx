import Link from "next/link";
import { AuctionCard } from "@/components/catalog/AuctionCard";
import { getAuctionEvents } from "@/lib/auctions";

export const metadata = { title: "Leilões" };

export default function LeiloesPage() {
  const events = getAuctionEvents();
  const openEvents = events.filter((event) => event.openLots > 0);
  const totalLots = events.reduce((sum, event) => sum + event.lots.length, 0);

  return (
    <div className="container-content py-4">
      <nav
        aria-label="Trilha de navegação"
        className="text-caption text-text-muted"
      >
        <Link href="/" className="hover:text-action hover:underline">
          Início
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-text-secondary">Leilões</span>
      </nav>

      <div className="mt-1.5 border-b-2 border-action pb-2">
        <h1 className="text-title-page-mobile text-text-primary md:text-title-page">
          Leilões em andamento
        </h1>
        <p className="mt-0.5 text-metadata text-text-secondary">
          <strong className="font-bold text-text-primary tabular">
            {events.length}
          </strong>{" "}
          {events.length === 1 ? "leilão" : "leilões"} ·{" "}
          <strong className="font-bold text-text-primary tabular">
            {totalLots}
          </strong>{" "}
          lotes · {openEvents.length} com lotes abertos
        </p>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {events.map((event) => (
          <AuctionCard key={event.code} event={event} />
        ))}
      </div>

      <p className="mt-4 text-caption text-text-muted">
        Cada leilão reúne os lotes publicados por uma empresa. Datas, valores e
        empresas são exemplos do catálogo de demonstração.
      </p>
    </div>
  );
}
