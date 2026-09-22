import { Hero } from "@/components/home/Hero";
import { StateStrip } from "@/components/home/StateStrip";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedLots } from "@/components/home/FeaturedLots";
import { SellCta } from "@/components/home/SellCta";
import { StatsBand } from "@/components/home/StatsBand";
import { ClosingBand } from "@/components/home/ClosingBand";
import { ASSETS } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="site-home">
      <Hero />
      <StateStrip />
      <CategoryGrid />
      <FeaturedLots assets={ASSETS} />
      <SellCta />
      <StatsBand />
      <ClosingBand />
    </div>
  );
}
