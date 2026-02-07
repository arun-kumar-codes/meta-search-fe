"use client"

import { useEffect, useState, Suspense } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { searchAPI, usersAPI, type CarListing } from "@/lib/api"
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
  Image as ImageIcon,
  MessageCircle,
  Heart
} from "lucide-react"
import Link from "next/link"
import { useUser } from "@/contexts/UserContext"
import { useLocation } from "@/contexts/LocationContext"
import { getCachedLocation } from "@/lib/location"
import WhatsAppContactModal from "@/components/shared/WhatsAppContactModal"
import ImageGalleryModal from "@/components/shared/ImageGalleryModal"

function CarDetailsContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const listingId = params.id as string
  const { user } = useUser()
  const { location } = useLocation()
  const searchBackUrl = (() => {
    const fromCity = searchParams.get("from_city")
    const city = fromCity || location?.city || getCachedLocation()?.city || "Delhi"
    return `/search?city=${encodeURIComponent(city)}`
  })()
  const [car, setCar] = useState<CarListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)
  const [inWishlist, setInWishlist] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false)

  useEffect(() => {
    if (listingId) {
      fetchCarDetails()
    }
  }, [listingId])

  useEffect(() => {
    if (car && user) {
      usersAPI.recordHistory(car.id).catch(() => {})
    }
  }, [car?.id, user])

  useEffect(() => {
    if (!user || !car) return
    usersAPI.checkWishlist(car.id).then((r) => setInWishlist(r.inWishlist)).catch(() => setInWishlist(false))
  }, [user, car?.id])

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
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading car details...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !car) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
          <Link 
            href={searchBackUrl}
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 mb-6"
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
          href={searchBackUrl}
          className="inline-flex items-center gap-2 text-[#03C5F8] hover:text-[#03C5F8]/80 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Search Results</span>
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Hero: single cover image (click to open gallery) */}
          {car.images && car.images.length > 0 ? (
            <div className="relative w-full h-64 md:h-96 bg-gray-900">
              {car.images[selectedImageIndex] && !imageErrors.has(selectedImageIndex) ? (
                <button
                  type="button"
                  onClick={() => setGalleryOpen(true)}
                  className="block w-full h-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#03C5F8]"
                >
                  <img
                    src={car.images[selectedImageIndex]}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover"
                    onError={() => setImageErrors((prev) => new Set(prev).add(selectedImageIndex))}
                  />
                </button>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <ImageIcon size={64} className="text-muted-foreground" />
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full h-64 md:h-96 bg-muted flex items-center justify-center">
              <ImageIcon size={64} className="text-muted-foreground" />
            </div>
          )}

          {/* Thumbnail strip: select hero image or open gallery */}
          {car.images && car.images.length > 1 && (
            <div className="px-4 py-3 border-b border-border bg-muted/20 overflow-x-auto">
              <div className="flex gap-2 justify-start min-w-max">
                {car.images.map((imageUrl, index) => {
                  const hasError = imageErrors.has(index)
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => (index === selectedImageIndex ? setGalleryOpen(true) : setSelectedImageIndex(index))}
                      className={`shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#03C5F8] ${
                        index === selectedImageIndex ? "border-[#03C5F8] ring-2 ring-[#03C5F8]/30" : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      {!hasError && imageUrl ? (
                        <img src={imageUrl} alt="" className="w-full h-full object-cover" onError={() => setImageErrors((prev) => new Set(prev).add(index))} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted"><ImageIcon size={20} className="text-muted-foreground" /></div>
                      )}
                    </button>
                  )
                })}
                <button
                  type="button"
                  onClick={() => setGalleryOpen(true)}
                  className="shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#03C5F8] flex items-center justify-center text-sm text-muted-foreground hover:text-[#03C5F8]"
                >
                  View all
                </button>
              </div>
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

          {/* Price, link and WhatsApp section - below header */}
          <div className="border-b border-border bg-white px-6 py-4 md:px-8 md:py-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{formatPrice(car.price, car.currency)}</p>
                </div>
                {(car.externalUrl && String(car.externalUrl).trim()) && (
                  <button
                    type="button"
                    onClick={() => {
                      const url = car.trackingUrl || car.externalUrl || '';
                      let finalUrl = url;
                      if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3377';
                        finalUrl = url.startsWith('/') ? `${apiBaseUrl}${url}` : `${apiBaseUrl}/${url}`;
                      }
                      window.open(finalUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="inline-flex items-center gap-2 bg-[#03C5F8] hover:opacity-90 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors"
                  >
                    Visit Dealer Website
                    <ExternalLink size={18} />
                  </button>
                )}
              </div>
              {car.agency?.whatsappNumber && String(car.agency.whatsappNumber).trim() && (
                <div>
                  <button
                    type="button"
                    onClick={() => setWhatsappModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors"
                  >
                    <MessageCircle size={18} />
                    Message dealer on WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Left Column - Main Details */}
              <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                {/* Key Specifications */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">Key Specifications</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-muted/50 rounded-lg p-4 md:p-6 border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar size={24} className="text-primary shrink-0" />
                        <span className="text-sm text-muted-foreground font-medium">Manufacturing Year</span>
                      </div>
                      <p className="text-xl md:text-2xl font-bold text-foreground">{car.year}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 md:p-6 border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Gauge size={24} className="text-primary shrink-0" />
                        <span className="text-sm text-muted-foreground font-medium">KM Driven</span>
                      </div>
                      <p className="text-xl md:text-2xl font-bold text-foreground">{formatMileage(car.mileage)} km</p>
                    </div>
                    {car.fuelType && (
                      <div className="bg-muted/50 rounded-lg p-4 md:p-6 border border-border">
                        <div className="flex items-center gap-3 mb-2">
                          <Fuel size={24} className="text-primary shrink-0" />
                          <span className="text-sm text-muted-foreground font-medium">Fuel Type</span>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-foreground">{car.fuelType}</p>
                      </div>
                    )}
                    {car.transmission && (
                      <div className="bg-muted/50 rounded-lg p-4 md:p-6 border border-border">
                        <div className="flex items-center gap-3 mb-2">
                          <Settings2 size={24} className="text-primary shrink-0" />
                          <span className="text-sm text-muted-foreground font-medium">Transmission</span>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-foreground">{car.transmission}</p>
                      </div>
                    )}
                    {car.bodyType && (
                      <div className="bg-muted/50 rounded-lg p-4 md:p-6 border border-border">
                        <div className="flex items-center gap-3 mb-2">
                          <Building2 size={24} className="text-primary shrink-0" />
                          <span className="text-sm text-muted-foreground font-medium">Body Type</span>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-foreground">{car.bodyType}</p>
                      </div>
                    )}
                    {car.color && (
                      <div className="bg-muted/50 rounded-lg p-4 md:p-6 border border-border">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: car.color.toLowerCase() }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground font-medium">Color</span>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-foreground">{car.color}</p>
                      </div>
                    )}
                    {car.ownership && (
                      <div className="bg-muted/50 rounded-lg p-4 md:p-6 border border-border">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-muted-foreground font-medium">Ownership</span>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-foreground">{car.ownership}</p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Location Information */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">Location</h2>
                  <div className="bg-muted/50 rounded-lg p-4 md:p-6 border border-border">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin size={20} className="text-primary shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground">City</p>
                          <p className="text-lg font-semibold text-foreground">{car.city}</p>
                        </div>
                      </div>
                      {car.state && (
                        <div className="flex items-center gap-3">
                          <MapPin size={20} className="text-primary shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm text-muted-foreground">State</p>
                            <p className="text-lg font-semibold text-foreground">{car.state}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <Globe size={20} className="text-primary shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground">Country</p>
                          <p className="text-lg font-semibold text-foreground">{car.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column - Dealer Info & Actions */}
              <div className="lg:col-span-1 space-y-6 lg:mt-0 mt-6">
                {/* Dealer Information */}
                <section className="bg-muted/50 rounded-lg p-4 md:p-6 border border-border">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">Dealer Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Dealer Name</p>
                      <p className="text-lg font-semibold text-foreground">{car.agency.name}</p>
                    </div>
                  </div>
                </section>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {user && (
                  <button
                    type="button"
                    onClick={async () => {
                      if (!car) return
                      setWishlistLoading(true)
                      try {
                        if (inWishlist) {
                          await usersAPI.removeWishlist(car.id)
                          setInWishlist(false)
                        } else {
                          await usersAPI.addWishlist(car.id)
                          setInWishlist(true)
                        }
                      } finally {
                        setWishlistLoading(false)
                      }
                    }}
                    disabled={wishlistLoading}
                    className={`w-full font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 border transition-colors ${
                      inWishlist
                        ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                        : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    <Heart size={18} className={inWishlist ? "fill-current" : ""} />
                    {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                  </button>
                )}
                {car.agency?.whatsappNumber && String(car.agency.whatsappNumber).trim() && (
                  <button
                    type="button"
                    onClick={() => setWhatsappModalOpen(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle size={18} />
                    Message dealer on WhatsApp
                  </button>
                )}
                {(car.externalUrl && String(car.externalUrl).trim()) && (
                  <button
                    type="button"
                    onClick={() => {
                      const url = car.trackingUrl || car.externalUrl || '';
                      let finalUrl = url;
                      if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3377';
                        finalUrl = url.startsWith('/') ? `${apiBaseUrl}${url}` : `${apiBaseUrl}/${url}`;
                      }
                      window.open(finalUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Visit Dealer Website
                    <ExternalLink size={18} />
                  </button>
                )}
                <Link
                  href={searchBackUrl}
                  className="w-full bg-foreground hover:opacity-90 text-background font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Back to Search
                </Link>
              </div>
              {car && (
                <WhatsAppContactModal
                  open={whatsappModalOpen}
                  onClose={() => setWhatsappModalOpen(false)}
                  car={car}
                />
              )}
              {car?.images && car.images.length > 0 && galleryOpen && (
                <ImageGalleryModal
                  images={car.images}
                  initialIndex={selectedImageIndex}
                  onClose={() => setGalleryOpen(false)}
                  title={`${car.brand} ${car.model}`}
                />
              )}

                {/* Quick Info Card */}
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 md:p-6">
                  <h4 className="font-semibold text-foreground mb-3">Quick Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-semibold text-foreground">{formatPrice(car.price, car.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Year:</span>
                      <span className="font-semibold text-foreground">{car.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">KM Driven:</span>
                      <span className="font-semibold text-foreground">{formatMileage(car.mileage)} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
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
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-20">
          <Loader2 size={48} className="animate-spin text-primary" />
        </div>
      </main>
    }>
      <CarDetailsContent />
    </Suspense>
  )
}
