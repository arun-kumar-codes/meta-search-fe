"use client"

import { useState } from "react"
import { Truck, Search, Loader2, MapPin, Calendar, Gauge, Fuel, Settings2, ExternalLink } from "lucide-react"
import { searchAPI, SearchParams, CarListing } from "@/lib/api"

export default function Hero() {
  const [activeTab, setActiveTab] = useState("trace")
  const [formData, setFormData] = useState<SearchParams>({
    brand: "",
    model: "",
    year: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<CarListing[] | null>(null)

  const tabs = [
    { id: "trace", label: "Buy Cars", icon: Truck }
  ]

  const handleInputChange = (field: keyof SearchParams, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setError(null) // Clear error when user types
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate that at least one field is filled
    if (!formData.brand && !formData.model && !formData.year) {
      setError("Please fill in at least one field")
      return
    }

    setLoading(true)
    setError(null)
    setSearchResults(null)

    try {
      const response = await searchAPI.search(formData)
      setSearchResults(response.listings || [])
      console.log("Search results:", response)
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        err.message || 
        "Failed to search. Please try again."
      )
      console.error("Search error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-[600px] flex items-center justify-center px-4 md:px-8 py-16 overflow-hidden">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-30 bg-[#F6F8FA]">
        <div className="w-full h-full bg-[#F6F8FA]" style={{
          backgroundImage: `radial-gradient(circle, #9ca3af 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>


      {/* Central Content Card */}
      <div className="relative z-10 bg-[#E6FAF7] rounded-2xl shadow-xl p-8 md:p-12 max-w-7xl w-full">
        {/* Section Title */}
        <p className="text-sm uppercase text-gray-700 font-semibold mb-4 tracking-wider">
        SEARCH USED CARS
        </p>

        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
        Find the Right Used Car
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
        Quickly and Confidently
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8 text-lg">
        Compare prices from trusted dealers and find the perfect used car for you.
        </p>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300"
                }`}
              >
                <Icon size={20} className={isActive ? "text-lime-400" : "text-lime-400"} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Search Input Fields */}
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                placeholder="Select brand"
                value={formData.brand || ""}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-900"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <input
                type="text"
                placeholder="Select model"
                value={formData.model || ""}
                onChange={(e) => handleInputChange("model", e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-900"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input
                type="text"
                placeholder="Select year"
                value={formData.year || ""}
                onChange={(e) => handleInputChange("year", e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-900"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap w-full md:w-auto flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search size={20} className="inline-block md:hidden" />
                    <span className="hidden md:inline">Search</span>
                    <span className="md:hidden">Search</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

        </form>

        {/* Search Results */}
        {searchResults && searchResults.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Found {searchResults.length} {searchResults.length === 1 ? 'car' : 'cars'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        )}

        {searchResults && searchResults.length === 0 && !loading && (
          <div className="mt-12">
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-600 text-lg">No cars found matching your search criteria.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function CarCard({ car }: { car: CarListing }) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-IN').format(mileage)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-xl font-bold text-white">{car.brand}</h4>
            <p className="text-gray-300 text-sm">{car.model} {car.variant}</p>
          </div>
          {car.isAvailable && (
            <span className="bg-lime-400 text-gray-900 text-xs font-semibold px-2 py-1 rounded-full">
              Available
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="mb-4">
          <p className="text-3xl font-bold text-gray-900">{formatPrice(car.price, car.currency)}</p>
        </div>

        {/* Key Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={16} className="text-gray-400" />
            <span className="text-sm">{car.year}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Gauge size={16} className="text-gray-400" />
            <span className="text-sm">{formatMileage(car.mileage)} km</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Fuel size={16} className="text-gray-400" />
            <span className="text-sm">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Settings2 size={16} className="text-gray-400" />
            <span className="text-sm">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-gray-400" />
            <span className="text-sm">{car.city}, {car.state}</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
            {car.bodyType}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
            {car.color}
          </span>
        </div>

        {/* Agency */}
        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 mb-1">Dealer</p>
          <p className="text-sm font-medium text-gray-900">{car.agency.name}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <a
          href={car.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          View Details
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  )
}
  