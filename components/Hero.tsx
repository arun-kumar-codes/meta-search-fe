"use client"

import Image from "next/image"
import bgImage from "@/assets/images/bg.jpg"
import SearchFormCar from "@/components/SearchFormCar"

export default function Hero() {

  return (
    <section className="relative">
      <div className="relative min-h-screen flex items-center justify-center px-4 md:px-8 py-8 overflow-hidden">
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
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 rounded-2xl p-8 md:px-12 max-w-8xl w-full">
        <p className="text-sm uppercase text-white font-[500] mb-4 tracking-wider">
        SEARCH USED CARS
        </p>
        <h1 className="text-3xl md:text-4xl font-[500] text-white mb-2">
        Find the Right Used Car
        </h1>
        <h2 className="text-3xl md:text-4xl font-[500] text-white mb-4">
        Quickly and Confidently
        </h2>
        <p className="text-white mb-8 text-lg">
        Compare prices from trusted dealers and find the perfect used car for you.
        </p>

        <SearchFormCar variant="hero" />
      </div>
      </div>
    </section>
  )
}
  