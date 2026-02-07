export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat("en-IN").format(mileage)
}

export function getCarDisplayName(car: { brand: string; model: string; variant?: string | null }): string {
  const base = `${car.brand} ${car.model}`
  return car.variant ? `${base} • ${car.variant}` : base
}

export function getLocationString(car: { city?: string | null; state?: string | null; country?: string | null }): string {
  const parts = [car.city || "N/A", car.state, car.country].filter(Boolean)
  return parts.join(", ")
}
