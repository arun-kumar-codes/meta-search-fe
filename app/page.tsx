import Header from "@/components/Header"
import Hero from "@/components/Hero"
import CoreFeatures from "@/components/CoreFeatures"
import MostSearchedCars from "@/components/MostSearchedCars"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <Hero />
      <CoreFeatures />
      <MostSearchedCars />
      <Footer />
    </main>
  )
}
