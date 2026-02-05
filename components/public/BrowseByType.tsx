"use client"

import { Car, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

const CAR_TYPES = [
  {
    name: "SUV",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop&q=90",
  },
  {
    name: "Sedan",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop&q=90",
  },
  {
    name: "Hatchback",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop&q=90",
  },
  {
    name: "MUV",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop&q=90",
  },
  {
    name: "Coupe",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=400&fit=crop&q=90",
  },
  {
    name: "Convertible",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop&q=90",
  },
  {
    name: "Wagon",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&q=90",
  },
  {
    name: "Luxury",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&q=90",
  },
]

export default function BrowseByType() {
  const router = useRouter()

  const handleBodyTypeClick = (bodyType: string) => {
    // Navigate to search with body type filter
    const params = new URLSearchParams()
    params.set("bodyType", bodyType)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Car size={32} className="text-[#ED264F]" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Browse by Car Type
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Explore cars by body type and find the perfect match for your needs
          </p>
        </div>

        {/* Horizontal Scrollable Carousel */}
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-4 md:gap-6 min-w-max">
            {CAR_TYPES.map((carType) => (
              <button
                key={carType.name}
                onClick={() => handleBodyTypeClick(carType.name)}
                className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex-shrink-0"
                style={{ width: '200px', minWidth: '200px' }}
              >
                {/* Image with overlay - similar to MostPopularCars */}
                <div className="relative h-40 md:h-48 w-full">
                  <Image
                    src={carType.image}
                    alt={carType.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="200px"
                    quality={90}
                  />
                  {/* Gradient overlay - similar to MostPopularCars */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-gray-900/40 group-hover:from-gray-900/80 group-hover:to-gray-900/50 transition-opacity" />
                  {/* Car type name */}
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <h3 className="text-base md:text-lg font-bold text-white text-center drop-shadow-lg">
                      {carType.name}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
            
            {/* View All Button at the end */}
            <Link
              href="/search"
              className="flex-shrink-0 flex items-center justify-center gap-2 px-6 md:px-8 py-4 bg-gradient-to-r from-[#ED264F] to-[#FF6B9D] text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105 h-40 md:h-48 w-40 md:w-48"
            >
              <div className="text-center">
                <ArrowRight size={24} className="mx-auto mb-2" />
                <span className="text-sm md:text-base">View All</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
