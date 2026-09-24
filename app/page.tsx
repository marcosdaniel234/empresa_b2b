import { ASSETS, Asset, getStateCounts } from "@/lib/data";
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

const HERO_PRODUCT_SLUGS = [
  "sea-doo-wake-pro-230-2026",
  "sea-doo-gtx-170-2026",
  "can-am-outlander-max-xt-700-2026",
  "can-am-renegade-xmr-1000r-2026",
];

/** Produtos selecionados para a vitrine principal. */
function destaques(): ShowcaseSlide[] {
  return HERO_PRODUCT_SLUGS.map((slug) => ASSETS.find((a) => a.slug === slug))
    .filter((asset): asset is Asset => Boolean(asset))
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
