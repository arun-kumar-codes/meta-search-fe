import Hero from "@/components/public/Hero"
import TraditionalSearch from "@/components/public/TraditionalSearch"
import AtlasFeatures from "@/components/public/AtlasFeatures"
import HowAtlasWorks from "@/components/public/HowAtlasWorks"
import FeaturedCars from "@/components/public/FeaturedCars"
import PopularBrands from "@/components/public/PopularBrands"
import FAQSection from "@/components/public/FAQSection"

export default function Home() {
  return (
    <main className="min-h-full bg-background">
      <Hero />
      <TraditionalSearch />
      <AtlasFeatures />
      <HowAtlasWorks />
      <FeaturedCars />
      <PopularBrands />
      <FAQSection />
    </main>
  )
}
