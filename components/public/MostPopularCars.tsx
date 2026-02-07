"use client"

import { useEffect, useState } from "react"
import { searchAPI, CarListing } from "@/lib/api"
import { Car, Loader2, Image as ImageIcon } from "lucide-react"
import { useLocation } from "@/contexts/LocationContext"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function MostPopularCars() {
  const router = useRouter()
  const { location } = useLocation()
  const [popularCars, setPopularCars] = useState<CarListing[]>([])
  const [loading, setLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const city = location?.city || "Delhi"

  useEffect(() => {
    loadPopularCars()
  }, [city])

  const loadPopularCars = async () => {
    try {
      setLoading(true)
      const response = await searchAPI.search({
        page: "1",
        limit: "4",
        city,
        sortBy: "price_asc" as const,
      })
      setPopularCars(response.listings || [])
    } catch (error) {
      console.error("Error loading popular cars:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCarClick = (car: CarListing) => {
    router.push(`/search/${car.id}`)
  }

  // Get car image URL - use images from API if available and not errored, otherwise null for placeholder
  const getCarImage = (car: CarListing): string | null => {
    if (imageErrors.has(car.id)) {
      return null // Image failed to load, show placeholder
    }
    if (car.images && car.images.length > 0 && car.images[0]) {
      return car.images[0]
    }
    return null
  }

  const handleImageError = (carId: string) => {
    setImageErrors((prev) => new Set(prev).add(carId))
  }

  if (loading) {
    return (
      <section className="bg-card py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-card py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Most Popular Cars
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Best deals and most searched cars right now
          </p>
        </div>

        {popularCars.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {popularCars.map((car) => (
              <button
                key={car.id}
                onClick={() => handleCarClick(car)}
                className="group relative overflow-hidden rounded-xl bg-card border border-border shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                {/* Image with overlay */}
                <div className="relative h-32 md:h-40 w-full bg-muted">
                  {getCarImage(car) ? (
                    <>
                      <img
                        src={getCarImage(car)!}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={() => handleImageError(car.id)}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-gray-900/40 group-hover:from-gray-900/80 group-hover:to-gray-900/50 transition-opacity" />
                      {/* Car name */}
                      <div className="absolute inset-0 flex items-center justify-center p-2">
                        <h3 className="text-sm md:text-base font-bold text-white text-center drop-shadow-lg">
                          {car.brand} {car.model}
                        </h3>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                      <ImageIcon size={32} className="text-gray-400 mb-2" />
                      <h3 className="text-sm md:text-base font-bold text-gray-700 text-center px-2">
                        {car.brand} {car.model}
                      </h3>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Car size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No popular cars available at the moment</p>
          </div>
        )}
      </div>
    </section>
  )
}
