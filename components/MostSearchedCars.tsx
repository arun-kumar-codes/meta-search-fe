"use client"

import { useState } from "react"
import { ChevronRight, ArrowRight, Car } from "lucide-react"
import Image from "next/image"
import punchImage from "@/assets/images/punch.avif"
import sierraImage from "@/assets/images/sierra.avif"
import xuv7xoImage from "@/assets/images/7xo.avif"
import seltosImage from "@/assets/images/kia seltos.avif"
import cretaImage from "@/assets/images/creta.avif"

export default function MostSearchedCars() {
  const [activeCategory, setActiveCategory] = useState("SUV")

  const categories = ["SUV", "Hatchback", "Sedan", "MUV", "Luxury"]

  const imageMap: Record<string, any> = {
    punch: punchImage,
    sierra: sierraImage,
    xuv: xuv7xoImage,
    seltos: seltosImage,
    creta: cretaImage,
  }

  const cars = [
    {
      id: 1,
      name: "Tata Punch",
      price: "₹5.59 - 10.54",
      priceUnit: "Lakh*",
      launchDate: "JAN 13, 2026",
      image: "punch",
      category: "SUV",
      gradient: "from-blue-200 via-blue-300 to-blue-400",
      carColor: "text-blue-600",
    },
    {
      id: 2,
      name: "Tata Sierra",
      price: "₹8.99 - 15.99",
      priceUnit: "Lakh*",
      launchDate: "JAN 10, 2026",
      image: "sierra",
      category: "SUV",
      gradient: "from-yellow-300 via-yellow-400 to-yellow-500",
      carColor: "text-yellow-600",
    },
    {
      id: 3,
      name: "Mahindra XUV 7XO",
      price: "₹12.99 - 18.99",
      priceUnit: "Lakh*",
      launchDate: "JAN 5, 2026",
      image: "xuv",
      category: "SUV",
      gradient: "from-red-800 via-red-900 to-red-950",
      carColor: "text-red-900",
    },
    {
      id: 4,
      name: "Kia Seltos",
      price: "₹10.89 - 20.35",
      priceUnit: "Lakh*",
      launchDate: "JAN 2, 2026",
      image: "seltos",
      category: "SUV",
      gradient: "from-gray-200 via-gray-300 to-gray-400",
      carColor: "text-gray-600",
    },
    {
      id: 5,
      name: "Hyundai Creta",
      price: "₹11.00 - 20.15",
      priceUnit: "Lakh*",
      launchDate: "DEC 28, 2025",
      image: "creta",
      category: "SUV",
      gradient: "from-slate-300 via-slate-400 to-slate-500",
      carColor: "text-slate-600",
    },
  ]

  const filteredCars = cars.filter((car) => car.category === activeCategory)

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById("car-scroll-container")
    if (container) {
      const scrollAmount = 400
      container.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="px-4 md:px-8 py-16 md:py-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          The most searched cars
        </h2>

        {/* Car Cards Container */}
        <div className="relative">
          <div
            id="car-scroll-container"
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
              >
                {/* Car Image */}
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                  {imageMap[car.image] ? (
                    <Image
                      src={imageMap[car.image]}
                      alt={car.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  ) : (
                    <div className={`relative h-full w-full bg-gradient-to-br ${car.gradient}`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Car size={200} className={`${car.carColor} opacity-80`} />
                      </div>
                      <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: `radial-gradient(circle, #000000 1px, transparent 1px)`,
                        backgroundSize: '30px 30px'
                      }}></div>
                    </div>
                  )}
                  
                  {/* Launch Date Tag */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-md px-3 py-1.5 shadow-sm z-10">
                    <span className="text-xs font-semibold text-gray-700">
                      LAUNCHED ON : {car.launchDate}
                    </span>
                  </div>
                </div>

                {/* Car Details */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{car.name}</h3>
                  <p className="text-gray-600 mb-4">
                    <span className="text-xl font-semibold text-gray-900">{car.price}</span>{" "}
                    <span className="text-sm">{car.priceUnit}</span>
                  </p>
                  
                  {/* View Offers Button */}
                  <button className="w-full border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 font-semibold py-2.5 px-4 rounded-lg transition-colors">
                    View January Offers
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Button */}
          <button
            onClick={() => scrollContainer("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 z-10"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
