"use client"

import { useEffect, useState, useRef } from "react"
import { Heart, MapPin, Fuel, Gauge, Calendar, CheckCircle, Loader2, Car } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { searchAPI, CarListing } from "@/lib/api"
import { useLocation } from "@/contexts/LocationContext"
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price)
}

export default function FeaturedCars() {
  const router = useRouter()
  const { location } = useLocation()
  const [listings, setListings] = useState<CarListing[]>([])
  const [loading, setLoading] = useState(true)
  const hasLoadedOnce = useRef(false)
  const city = location?.city || "Delhi"

  useEffect(() => {
    let cancelled = false
    if (!hasLoadedOnce.current) setLoading(true)
    const run = async () => {
      try {
        const response = await searchAPI.search({
          page: "1",
          limit: "4",
          city,
          sortBy: "price_asc",
        })
        if (!cancelled) {
          setListings(response.listings || [])
          hasLoadedOnce.current = true
        }
      } catch {
        if (!cancelled) setListings([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [city])

  const handleCarClick = (car: CarListing) => {
    router.push(`/search/${car.id}`)
  }

  if (loading) {
    return (
      <motion.section
        className="py-12 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="animate-spin text-[var(--atlas-cyan)]" />
          </div>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      className="py-12 bg-white"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--atlas-navy)] mb-2">
              Featured Used Cars
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Top used car picks from verified dealers across India
            </p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border-2 text-[var(--atlas-navy)] font-semibold transition-colors border-[var(--atlas-cyan)] hover:bg-[var(--atlas-cyan)] hover:text-white shrink-0"
          >
            View All
          </Link>
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.map((car) => {
              const imageUrl = car.images?.[0] ?? null
              return (
                <div
                  key={car.id}
                  className="overflow-hidden rounded-xl bg-card border-2 border-transparent hover:border-[var(--atlas-cyan)] hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => handleCarClick(car)}
                  onKeyDown={(e) => e.key === "Enter" && handleCarClick(car)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="relative">
                    {imageUrl ? (
                      <ImageWithFallback
                        src={imageUrl}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-muted flex items-center justify-center">
                        <Car className="size-12 text-muted-foreground" />
                      </div>
                    )}
                    <button
                      type="button"
                      className="absolute top-3 right-3 size-9 rounded-full bg-white/90 hover:bg-white hover:text-[var(--atlas-cyan)] flex items-center justify-center shadow"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push("/wishlist")
                      }}
                      aria-label="Add to wishlist"
                    >
                      <Heart className="size-4" />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-[var(--atlas-green)] text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium">
                      <CheckCircle className="size-3" />
                      Verified
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-[var(--atlas-navy)] mb-2 line-clamp-1">
                      {car.brand} {car.model} {car.variant ?? ""}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-[var(--atlas-cyan)]">
                        {formatPrice(car.price)}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-4" />
                          {car.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <Gauge className="size-4" />
                          {car.mileage?.toLocaleString("en-IN")} km
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Fuel className="size-4" />
                          {car.fuelType ?? "—"}
                        </span>
                        <span>{car.transmission ?? "—"}</span>
                      </div>
                      {(car.city || car.state) && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="size-4" />
                          {[car.city, car.state].filter(Boolean).join(", ")}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      className="w-full py-2.5 rounded-lg font-semibold text-white transition-colors"
                      style={{ backgroundColor: "var(--atlas-cyan)" }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCarClick(car)
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Car size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No featured cars available at the moment</p>
            <Link
              href="/search"
              className="inline-block mt-4 px-4 py-2 rounded-lg font-medium text-white"
              style={{ backgroundColor: "var(--atlas-cyan)" }}
            >
              Browse all cars
            </Link>
          </div>
        )}
      </div>
    </motion.section>
  )
}
