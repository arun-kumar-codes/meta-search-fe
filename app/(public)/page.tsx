import Hero from "@/components/public/Hero"
import MostPopularCars from "@/components/public/MostPopularCars"
import BrowseByType from "@/components/public/BrowseByType"
import AboutSection from "@/components/public/AboutSection"
import HowItWorksSection from "@/components/public/HowItWorksSection"
import FAQSection from "@/components/public/FAQSection"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Search */}
      <Hero />
      
      {/* Most Popular Cars */}
      <MostPopularCars />
      
      {/* Browse by Type - Car Types */}
      <BrowseByType />
      
      {/* About Section */}
      <AboutSection />
      
      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* FAQ Section */}
      <FAQSection />
    </main>
  )
}
