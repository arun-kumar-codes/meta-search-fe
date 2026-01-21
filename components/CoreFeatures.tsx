"use client"

import { Search, MapPin, DollarSign, Car, TrendingUp, Shield } from "lucide-react"

export default function CoreFeatures() {
  const features = [
    {
      id: 1,
      title: "Easy Search",
      description: "With more than 17000 verified listings, find your perfect used car anywhere in India.",
      image: "search",
      icon: Search,
      carImage: "sedan",
    },
    {
      id: 2,
      title: "Compare Prices",
      description: "Compare prices from multiple verified dealers and get the best deals on your dream car.",
      image: "prices",
      icon: DollarSign,
      carImage: "suv",
    },
    {
      id: 3,
      title: "Live Tracking",
      description: "Track your car purchase journey with real-time updates from verified dealers across India.",
      image: "tracking",
      icon: MapPin,
      carImage: "hatchback",
    },
  ]

  return (
    <section className=" relative overflow-hidden">
      <div className="w-full bg-[#1E2939] p-8 mx-auto relative z-10">
        {/* Title and Description */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Core Features
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Find your perfect used car with our comprehensive metasearch platform. Compare prices, verify listings, and connect with trusted dealers across India.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.id}
                className="bg-blue-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Car Image Section */}
                <div className="relative h-48 w-full overflow-hidden">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900">
                   
                    
                    {/* Overlay Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Icon size={24} className="text-white" />
                  </div>
                  
                  {/* Feature Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                    <span className="text-white text-xs font-semibold">{feature.title}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                  
                  {/* Feature Details */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    {feature.image === "search" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/80 text-xs">
                          <Search size={14} className="text-[#00C2A8]" />
                          <span>17,000+ Verified Listings</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-xs">
                          <Shield size={14} className="text-[#00C2A8]" />
                          <span>Trusted Dealers Only</span>
                        </div>
                      </div>
                    )}
                    
                    {feature.image === "prices" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/80 text-xs">
                          <TrendingUp size={14} className="text-[#00C2A8]" />
                          <span>Compare Multiple Dealers</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-xs">
                          <DollarSign size={14} className="text-[#00C2A8]" />
                          <span>Best Price Guaranteed</span>
                        </div>
                      </div>
                    )}
                    
                    {feature.image === "tracking" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/80 text-xs">
                          <MapPin size={14} className="text-[#00C2A8]" />
                          <span>Real-time Updates</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-xs">
                          <Car size={14} className="text-[#00C2A8]" />
                          <span>Track Purchase Journey</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
