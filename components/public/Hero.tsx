"use client"

import Image from "next/image"
import bgImage from "@/assets/images/bg1.jpeg"
import SearchFormCar from "@/components/search/SearchFormCar"

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative min-h-[70vh] flex items-center px-4 md:px-8 py-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl w-full">
          <div className="text-left mb-8">
            <p className="text-sm uppercase text-white/90 font-[500] mb-4 tracking-wider">
              SEARCH CARS
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Find the Right Car For You
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">
              Search through thousands of verified listings across India.
            </p>
          </div>

          {/* Search Form */}
          <div className="rounded-2xl">
            <SearchFormCar variant="hero" />
          </div>
        </div>
      </div>
    </section>
  )
}
