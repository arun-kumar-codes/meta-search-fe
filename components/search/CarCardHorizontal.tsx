"use client"

import { useState } from "react"
import { MapPin, Calendar, Gauge, Fuel, Settings2, ExternalLink, Building2, Heart, Image as ImageIcon, MessageCircle } from "lucide-react"
import { CarListing } from "@/lib/api"
import Link from "next/link"
import ImageGalleryModal from "@/components/shared/ImageGalleryModal"
import WhatsAppContactModal from "@/components/shared/WhatsAppContactModal"

interface CarCardHorizontalProps {
  car: CarListing
  inWishlist?: boolean
  onWishlistClick?: () => void
  returnCity?: string
}

export default function CarCardHorizontal({ car, inWishlist, onWishlistClick, returnCity }: CarCardHorizontalProps) {
  const detailHref = `/search/${car.id}${returnCity ? `?from_city=${encodeURIComponent(returnCity)}` : ""}`
  const [imageError, setImageError] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [whatsappOpen, setWhatsappOpen] = useState(false)
  const imageList = (car.images && Array.isArray(car.images) ? car.images.filter(Boolean) : []) as string[]
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
    <div className="bg-card rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-border hover:border-primary/30">
      <div className="flex flex-col lg:flex-row">
        {/* Mobile: image strip (one main + small icons) */}
        <div className="lg:hidden flex gap-1.5 p-2 border-b border-border">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); if (imageList.length > 0) setGalleryOpen(true) }}
            className="flex-1 min-h-[100px] rounded-lg overflow-hidden bg-muted"
          >
            {imageList.length > 0 && imageList[0] && !imageError ? (
              <img src={imageList[0]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" onError={() => setImageError(true)} />
            ) : (
              <div className="w-full h-full flex items-center justify-center"><ImageIcon size={28} className="text-muted-foreground" /></div>
            )}
          </button>
          {imageList.length > 1 && (
            <div className="flex flex-col gap-1 w-14 shrink-0">
              {imageList.slice(1, 3).map((url, i) => (
                <button key={i} type="button" onClick={(e) => { e.preventDefault(); setGalleryOpen(true) }} className="flex-1 min-h-[32px] rounded overflow-hidden bg-muted">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
              {imageList.length > 3 && (
                <button type="button" onClick={(e) => { e.preventDefault(); setGalleryOpen(true) }} className="min-h-[32px] rounded bg-muted/80 text-muted-foreground text-xs flex items-center justify-center">+{imageList.length - 3}</button>
              )}
            </div>
          )}
        </div>
        {/* Left side - Car Info */}
        <div className="flex-1 p-4 sm:p-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div className="flex-1 min-w-0">
              <Link href={detailHref}>
              <h4 className="text-lg sm:text-xl font-bold text-foreground mb-1 truncate">{car.brand}</h4>
              <p className="text-muted-foreground text-base mb-1 font-medium truncate">
                {car.model} {car.variant ? `• ${car.variant}` : ''}
              </p>
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <MapPin size={14} className="text-primary shrink-0" />
                <span>
                  {car.city || 'N/A'}
                  {car.state ? `, ${car.state}` : ''}
                </span>
              </div>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {onWishlistClick && (
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); onWishlistClick() }}
                  className={`p-1.5 rounded-lg transition-colors ${inWishlist ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart size={18} className={inWishlist ? "fill-current" : ""} />
                </button>
              )}
              {car.agency.name && (
                <span className="bg-[#ED264D] text-white text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                  {car.agency.name}
                </span>
              )}
              {car.ownership && (
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                  {car.ownership}
                </span>
              )}
              {car.isAvailable && (
                <span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                  Available
                </span>
              )}
            </div>
          </div>

        

          {/* Key Details - Inline without containers */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 text-sm">
            <div className="flex items-center gap-1.5 text-foreground">
              <Calendar size={16} className="text-primary shrink-0" />
              <span className="font-medium">{car.year}</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <Gauge size={16} className="text-primary shrink-0" />
              <span className="font-medium">{formatMileage(car.mileage)} km</span>
            </div>
            {car.fuelType && (
              <div className="flex items-center gap-1.5 text-foreground">
                <Fuel size={16} className="text-primary shrink-0" />
                <span className="font-medium">{car.fuelType}</span>
              </div>
            )}
            {car.transmission && (
              <div className="flex items-center gap-1.5 text-foreground">
                <Settings2 size={16} className="text-primary shrink-0" />
                <span className="font-medium">{car.transmission}</span>
              </div>
            )}
            {car.bodyType && (
              <div className="flex items-center gap-1.5 text-foreground">
                <Building2 size={16} className="text-primary shrink-0" />
                <span className="font-medium">{car.bodyType}</span>
              </div>
            )}
          </div>

          {/* Additional Info Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {car.color && (
              <span className="bg-primary/10 text-primary border border-primary/30 text-xs font-medium px-2.5 py-1 rounded-full">
                {car.color}
              </span>
            )}
          </div>
        </div>

        {/* Middle - Image: full container main image, small thumbnails overlapping at bottom in scroll */}
        <div className="hidden lg:block lg:w-52 border-t lg:border-t-0 lg:border-l lg:border-r border-border shrink-0 relative min-h-[200px]">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (imageList.length > 0) setGalleryOpen(true) }}
            className="absolute inset-0 w-full h-full rounded-none overflow-hidden bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
          >
            {imageList.length > 0 && imageList[0] && !imageError ? (
              <img
                src={imageList[0]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <ImageIcon size={32} className="text-muted-foreground" />
              </div>
            )}
          </button>
          {imageList.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 flex gap-1.5 p-2 overflow-x-auto overflow-y-hidden bg-gradient-to-t from-black/70 to-transparent pt-6">
              {imageList.slice(1).map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setGalleryOpen(true) }}
                  className="shrink-0 w-11 h-11 rounded overflow-hidden bg-muted/90 border border-white/30 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary shadow"
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Price and Action Buttons (Visit Dealer only if link; WhatsApp if enabled; one or both) */}
        <div className="lg:w-48 flex flex-col border-t lg:border-t-0 lg:border-l border-border shrink-0">
          <div className="flex flex-col gap-3 p-4">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-foreground">{formatPrice(car.price, car.currency)}</p>
            </div>
            <div className="flex flex-col gap-2">
              {(function () {
                const hasDealerLink = !!(car.externalUrl && String(car.externalUrl).trim())
                if (!hasDealerLink) return null
                const url = car.trackingUrl || car.externalUrl || ''
                return (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    let finalUrl = url
                    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3377'
                      finalUrl = url.startsWith('/') ? `${apiBaseUrl}${url}` : `${apiBaseUrl}/${url}`
                    }
                    window.open(finalUrl, '_blank', 'noopener,noreferrer')
                  }}
                  className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold py-2.5 px-4 rounded-lg transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Visit Dealer
                  <ExternalLink size={14} />
                </button>
                )
              })()}
              {car.agency?.whatsappNumber && String(car.agency.whatsappNumber).trim() && (
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWhatsappOpen(true) }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {whatsappOpen && (
        <WhatsAppContactModal open={whatsappOpen} onClose={() => setWhatsappOpen(false)} car={car} />
      )}
      {galleryOpen && imageList.length > 0 && (
        <ImageGalleryModal
          images={imageList}
          initialIndex={0}
          onClose={() => setGalleryOpen(false)}
          title={`${car.brand} ${car.model}`}
        />
      )}
    </div>
  )
}
