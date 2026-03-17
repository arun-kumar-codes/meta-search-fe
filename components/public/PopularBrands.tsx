"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "motion/react"
import { searchAPI } from "@/lib/api"
import { useLocation } from "@/contexts/LocationContext"

const BRAND_IMAGES: Record<string, string> = {
  "Maruti Suzuki": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&q=80",
  "Hyundai": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop&q=80",
  "Honda": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop&q=80",
  "Tata": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop&q=80",
  "Mahindra": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop&q=80",
  "Kia": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop&q=80",
  "Toyota": "https://images.unsplash.com/photo-1572183710693-50859fdd4884?w=400&h=300&fit=crop&q=80",
  "Renault": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop&q=80",
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop&q=80"

const FALLBACK_BRANDS = [
  { name: "Maruti Suzuki", count: "2,450+ cars" },
  { name: "Hyundai", count: "1,850+ cars" },
  { name: "Honda", count: "1,200+ cars" },
  { name: "Tata", count: "980+ cars" },
  { name: "Mahindra", count: "750+ cars" },
  { name: "Kia", count: "620+ cars" },
  { name: "Toyota", count: "540+ cars" },
  { name: "Renault", count: "380+ cars" },
]

export default function PopularBrands() {
  const router = useRouter()
  const { location } = useLocation()
  const [brands, setBrands] = useState<{ name: string; count?: string }[]>(FALLBACK_BRANDS)
  const city = location?.city

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const list = await searchAPI.getBrands(city)
        if (!cancelled && Array.isArray(list) && list.length > 0) {
          setBrands(list.map((name) => ({ name, count: FALLBACK_BRANDS.find((b) => b.name === name)?.count })))
        }
      } catch {
        if (!cancelled) setBrands(FALLBACK_BRANDS)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [city])

  const handleBrandClick = (brandName: string) => {
    const params = new URLSearchParams()
    params.set("brand", brandName)
    router.push(`/search?${params.toString()}`)
  }

  const getImageForBrand = (name: string) => BRAND_IMAGES[name] ?? FALLBACK_IMAGE

  return (
    <motion.section
      className="py-12 bg-gray-50"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--atlas-navy)] mb-2">
            Browse Used Cars by Brand
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Or chat with Atlas and tell it which brand you prefer — it will search all dealers for you
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand) => (
            <button
              key={brand.name}
              type="button"
              onClick={() => handleBrandClick(brand.name)}
              className="group relative overflow-hidden rounded-xl bg-card border-2 border-transparent hover:border-[var(--atlas-cyan)] hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="relative h-32 md:h-36 w-full">
                <Image
                  src={getImageForBrand(brand.name)}
                  alt={brand.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-3">
                  <h3 className="text-sm font-bold text-white drop-shadow-lg text-center">
                    {brand.name}
                  </h3>
                  {brand.count && (
                    <p className="text-xs text-white/90 mt-0.5">{brand.count}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
