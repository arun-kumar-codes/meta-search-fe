"use client"

import { Search, Shield, TrendingUp, Car } from "lucide-react"

export default function CoreFeatures() {
  const features = [
    {
      id: 1,
      title: "Easy Search",
      description: "Search through thousands of verified used cars from trusted dealers across India",
      image: "search",
    },
    {
      id: 2,
      title: "Verified Listings",
      description: "All cars are verified and inspected by our partner dealers for quality assurance",
      image: "verified",
    },
    {
      id: 3,
      title: "Best Prices",
      description: "Compare prices from multiple dealers and get the best deals on your dream car",
      image: "prices",
    },
  ]

  return (
    <section className="bg-gray-900 px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-colors"
            >
              {/* Car Image Card */}
              <div className="mb-6 relative">
                {feature.image === "search" && (
                  <div className="bg-white rounded-xl p-6 shadow-2xl">
                    {/* Search Interface */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Search size={20} className="text-lime-400" />
                        <span className="font-semibold text-gray-900">Search Cars</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-10 bg-gray-100 rounded-lg flex items-center px-3">
                          <span className="text-sm text-gray-600">Brand: Maruti Suzuki</span>
                        </div>
                        <div className="h-10 bg-gray-100 rounded-lg flex items-center px-3">
                          <span className="text-sm text-gray-600">Model: Swift</span>
                        </div>
                        <div className="h-10 bg-gray-100 rounded-lg flex items-center px-3">
                          <span className="text-sm text-gray-600">Year: 2021</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Car Preview */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 flex items-center justify-center h-32">
                      <Car size={48} className="text-white opacity-80" />
                    </div>
                    
                    {/* Results Count */}
                    <div className="mt-4 bg-lime-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-600 mb-1">Found</div>
                      <div className="text-lg font-bold text-gray-900">1,234 Cars</div>
                    </div>
                  </div>
                )}

                {feature.image === "verified" && (
                  <div className="bg-white rounded-xl p-6 shadow-2xl">
                    {/* Verification Badge */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-lime-100 flex items-center justify-center">
                        <Shield size={40} className="text-lime-600" />
                      </div>
                    </div>
                    
                    {/* Car Card */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 border-2 border-lime-400">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-lime-400"></div>
                        <span className="text-xs font-semibold text-gray-900">Verified Listing</span>
                      </div>
                      <div className="text-sm font-bold text-gray-900 mb-1">Maruti Swift ZXI</div>
                      <div className="text-xs text-gray-600">2021 • 25,000 km</div>
                    </div>

                    {/* Verification Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Vehicle History Verified</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Dealer Verified</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Quality Inspected</span>
                      </div>
                    </div>
                  </div>
                )}

                {feature.image === "prices" && (
                  <div className="bg-white rounded-xl p-6 shadow-2xl">
                    {/* Price Comparison Header */}
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp size={20} className="text-lime-400" />
                      <span className="font-semibold text-gray-900">Price Comparison</span>
                    </div>
                    
                    {/* Price Cards */}
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 border-l-4 border-blue-500">
                        <div className="text-xs text-gray-600 mb-1">Dealer A</div>
                        <div className="text-lg font-bold text-gray-900">₹6,80,000</div>
                        <div className="text-xs text-green-600 mt-1">Best Price</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-gray-300">
                        <div className="text-xs text-gray-600 mb-1">Dealer B</div>
                        <div className="text-lg font-bold text-gray-900">₹7,20,000</div>
                        <div className="text-xs text-gray-500 mt-1">+₹40,000</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-gray-300">
                        <div className="text-xs text-gray-600 mb-1">Dealer C</div>
                        <div className="text-lg font-bold text-gray-900">₹7,50,000</div>
                        <div className="text-xs text-gray-500 mt-1">+₹70,000</div>
                      </div>
                    </div>
                    
                    {/* Savings Badge */}
                    <div className="mt-4 bg-lime-100 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-600 mb-1">You Save</div>
                      <div className="text-xl font-bold text-lime-600">₹70,000</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Feature Title and Description */}
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
