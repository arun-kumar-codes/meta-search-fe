"use client"

import { useEffect, useState, Suspense } from "react"
import { useParams, useRouter } from "next/navigation"
import { searchAPI, CarListing } from "@/lib/api"
import { 
  MapPin, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings2, 
  ExternalLink, 
  Building2, 
  Globe,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Image as ImageIcon
} from "lucide-react"
import Link from "next/link"

function CarDetailsContent() {
  const params = useParams()
  const router = useRouter()
  const listingId = params.id as string
  const [car, setCar] = useState<CarListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [heroImageError, setHeroImageError] = useState(false)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (listingId) {
      fetchCarDetails()
    }
  }, [listingId])

  const fetchCarDetails = async () => {
    setLoading(true)
    setError(null)
    try {
      const carData = await searchAPI.getCarById(listingId)
      setCar(carData)
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        err.message || 
        "Failed to load car details. Please try again."
      )
      console.error("Error fetching car details:", err)
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 size={48} className="animate-spin text-[#ED264F] mx-auto mb-4" />
            <p className="text-gray-600">Loading car details...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !car) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <Link 
            href="/search"
            className="inline-flex items-center gap-2 text-[#ED264F] hover:text-[#ED264F]/80 mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Search</span>
          </Link>
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            <p className="font-semibold mb-2">Error Loading Car Details</p>
            <p>{error || "Car not found"}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/search"
          className="inline-flex items-center gap-2 text-[#ED264F] hover:text-[#ED264F]/80 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Search Results</span>
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Hero Image Section */}
          {car.images && car.images.length > 0 && car.images[0] && !heroImageError ? (
            <div className="relative w-full h-64 md:h-96 bg-gray-900">
              <img
                src={car.images[0]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
                onError={() => setHeroImageError(true)}
              />
            </div>
          ) : (
            <div className="relative w-full h-64 md:h-96 bg-gray-200 flex items-center justify-center">
              <ImageIcon size={64} className="text-gray-400" />
            </div>
          )}
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {car.brand} {car.model}
                </h1>
                {car.variant && (
                  <p className="text-xl md:text-2xl text-gray-300 mb-4">{car.variant}</p>
                )}
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin size={18} />
                  <span>
                    {car.city || 'N/A'}
                    {car.state ? `, ${car.state}` : ''}
                    {car.country ? `, ${car.country}` : ''}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3">
                {car.isAvailable ? (
                  <span className="bg-lime-400 text-gray-900 text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    Available
                  </span>
                ) : (
                  <span className="bg-red-400 text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                    <XCircle size={16} />
                    Not Available
                  </span>
                )}
                <div className="text-right">
                  <p className="text-4xl md:text-5xl font-bold text-white">
                    {formatPrice(car.price, car.currency)}
                  </p>
                  <p className="text-gray-300 text-sm mt-1">Price includes all taxes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery Section */}
          {car.images && car.images.length > 0 && (
            <div className="border-t border-gray-200 p-8 md:p-12 bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {car.images.map((imageUrl, index) => {
                  const hasError = imageErrors.has(index)
                  return (
                    <div key={index} className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden group cursor-pointer">
                      {!hasError && imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={`${car.brand} ${car.model} - Image ${index + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          onError={() => {
                            setImageErrors((prev) => new Set(prev).add(index))
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <ImageIcon size={32} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Details Section */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Key Specifications */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Specifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar size={24} className="text-[#ED264F]" />
                        <span className="text-sm text-gray-500 font-medium">Manufacturing Year</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{car.year}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Gauge size={24} className="text-[#ED264F]" />
                        <span className="text-sm text-gray-500 font-medium">Mileage</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{formatMileage(car.mileage)} km</p>
                    </div>
                    {car.fuelType && (
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                          <Fuel size={24} className="text-[#ED264F]" />
                          <span className="text-sm text-gray-500 font-medium">Fuel Type</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{car.fuelType}</p>
                      </div>
                    )}
                    {car.transmission && (
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                          <Settings2 size={24} className="text-[#ED264F]" />
                          <span className="text-sm text-gray-500 font-medium">Transmission</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{car.transmission}</p>
                      </div>
                    )}
                    {car.bodyType && (
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                          <Building2 size={24} className="text-[#ED264F]" />
                          <span className="text-sm text-gray-500 font-medium">Body Type</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{car.bodyType}</p>
                      </div>
                    )}
                    {car.color && (
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-6 h-6 rounded-full border-2 border-[#ED264F] flex items-center justify-center">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: car.color.toLowerCase() }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500 font-medium">Color</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{car.color}</p>
                      </div>
                    )}
                    {car.ownership && (
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-gray-500 font-medium">Ownership</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{car.ownership}</p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Location Information */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin size={20} className="text-[#ED264F]" />
                        <div>
                          <p className="text-sm text-gray-500">City</p>
                          <p className="text-lg font-semibold text-gray-900">{car.city}</p>
                        </div>
                      </div>
                      {car.state && (
                        <div className="flex items-center gap-3">
                          <MapPin size={20} className="text-[#ED264F]" />
                          <div>
                            <p className="text-sm text-gray-500">State</p>
                            <p className="text-lg font-semibold text-gray-900">{car.state}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <Globe size={20} className="text-[#ED264F]" />
                        <div>
                          <p className="text-sm text-gray-500">Country</p>
                          <p className="text-lg font-semibold text-gray-900">{car.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column - Dealer Info & Actions */}
              <div className="lg:col-span-1 space-y-6 mt-14">
                {/* Dealer Information */}
                <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Dealer Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Dealer Name</p>
                      <p className="text-lg font-semibold text-gray-900">{car.agency.name}</p>
                    </div>
                  </div>
                </section>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {(car.trackingUrl || car.externalUrl) ? (
                    <button
                      onClick={() => {
                        const url = car.trackingUrl || car.externalUrl || '';
                        let finalUrl = url;
                        
                        // Ensure absolute URL
                        if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                          const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3377';
                          finalUrl = url.startsWith('/') ? `${apiBaseUrl}${url}` : `${apiBaseUrl}/${url}`;
                        }
                        
                        console.log('Opening dealer URL:', finalUrl);
                        // Use window.open to ensure it opens externally and bypasses Next.js routing
                        window.open(finalUrl, '_blank', 'noopener,noreferrer');
                      }}
                      className="w-full bg-[#ED264F] hover:bg-[#ED264F]/90 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Visit Dealer Website
                      <ExternalLink size={18} />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-400 cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2"
                    >
                      Dealer Link Not Available
                    </button>
                  )}
                  <Link
                    href="/search"
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Back to Search
                  </Link>
                </div>

                {/* Quick Info Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-semibold text-gray-900">{formatPrice(car.price, car.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year:</span>
                      <span className="font-semibold text-gray-900">{car.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mileage:</span>
                      <span className="font-semibold text-gray-900">{formatMileage(car.mileage)} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-semibold ${car.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                        {car.isAvailable ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function CarDetailsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-20">
          <Loader2 size={48} className="animate-spin text-[#ED264F]" />
        </div>
      </main>
    }>
      <CarDetailsContent />
    </Suspense>
  )
}
