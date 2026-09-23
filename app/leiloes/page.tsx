import { PageIntro } from "@/components/layout/PageIntro";
import { AuctionCard } from "@/components/catalog/AuctionCard";
import { getAuctionEvents } from "@/lib/auctions";

export const metadata = { title: "Leilões" };

export default function LeiloesPage() {
  const events = getAuctionEvents();
  const openEvents = events.filter((event) => event.openLots > 0);
  const totalLots = events.reduce((sum, event) => sum + event.lots.length, 0);

  return (
    <>
      <PageIntro
        crumbs={[{ label: "Leilões" }]}
        kicker="Leilões"
        title="Leilões em andamento"
      >
        <strong className="font-bold text-white tabular">
          {events.length}
        </strong>{" "}
        {events.length === 1 ? "leilão" : "leilões"} ·{" "}
        <strong className="font-bold text-white tabular">{totalLots}</strong>{" "}
        lotes em leilão · {openEvents.length} com lotes abertos. Cada leilão
        reúne os lotes de uma empresa.
      </PageIntro>
      <div className="container-content py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {events.map((event) => (
            <AuctionCard key={event.code} event={event} />
          ))}
        </div>

        <p className="mt-4 text-caption text-text-muted">
          Cada leilão reúne os lotes publicados por uma empresa. Datas, valores
          e empresas são exemplos do catálogo de demonstração.
        </p>
      </div>
    </>
  );
}
