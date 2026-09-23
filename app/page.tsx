import { ASSETS, Asset, getStateCounts, modalidadeOf } from "@/lib/data";
import { HeroShowcase, ShowcaseSlide } from "@/components/home/HeroShowcase";
import { SearchPanel } from "@/components/home/SearchPanel";
import { TrustRow } from "@/components/home/TrustRow";
import { Opportunities } from "@/components/home/Opportunities";
import { StatesExplorer } from "@/components/home/StatesExplorer";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { CompaniesBand } from "@/components/home/CompaniesBand";

/** Especificações que identificam o equipamento, na ordem de preferência. */
const DETALHES = ["Potência", "Capacidade de carga", "Capacidade", "Configuração", "Modelo"];

function spec(asset: Asset, test: (label: string) => boolean) {
  return asset.specs.find((s) => test(s.label))?.value;
}

/** Os três leilões abertos de maior valor abrem a página. */
function destaques(): ShowcaseSlide[] {
  return ASSETS.filter(
    (a) => modalidadeOf(a) === "leilao" && (a.status === "aberto" || a.status === "encerrando"),
  )
    .sort((a, b) => (b.currentBid ?? b.startingBid) - (a.currentBid ?? a.startingBid))
    .slice(0, 3)
    .map((asset) => ({
      asset,
      year: spec(asset, (l) => l.startsWith("Ano"))?.split("/")[0],
      detail: DETALHES.map((d) => spec(asset, (l) => l.startsWith(d))).find(Boolean),
    }));
}

export default function HomePage() {
  return (
    <>
      <HeroShowcase slides={destaques()} />
      <SearchPanel states={getStateCounts()} />
      <TrustRow />
      <Opportunities assets={ASSETS} />
      <StatesExplorer />
      <CategoryShowcase />
      <CompaniesBand />
    </>
  );
}
