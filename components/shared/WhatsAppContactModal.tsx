"use client"

import { useState } from "react"
import { X, MessageCircle } from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import type { CarListing } from "@/lib/api"
import { leadsAPI } from "@/lib/api"

function buildWhatsAppMessage(car: CarListing, userDetails: { name: string; phone: string; email: string }) {
  const lines = [
    "Hi, I'm interested in this car:",
    `${car.brand} ${car.model}${car.variant ? ` ${car.variant}` : ""} (${car.year})`,
    `Price: ${car.currency} ${new Intl.NumberFormat("en-IN").format(car.price)}`,
    `Listing ID: ${car.id}`,
    "",
    "My details:",
    `Name: ${userDetails.name || "—"}`,
    `Phone: ${userDetails.phone || "—"}`,
    `Email: ${userDetails.email || "—"}`,
  ]
  return lines.join("\n")
}

function getWhatsAppLink(phone: string, message: string) {
  const cleaned = phone.replace(/\D/g, "")
  const number = cleaned.startsWith("91") ? cleaned : `91${cleaned}`
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export default function WhatsAppContactModal({
  open,
  onClose,
  car,
}: {
  open: boolean
  onClose: () => void
  car: CarListing
}) {
  const { user } = useUser()
  const [name, setName] = useState(user?.name ?? "")

  const dealerNumber = car.agency?.whatsappNumber
  const message = buildWhatsAppMessage(car, {
    name,
    phone: user?.phone ?? "",
    email: user?.email ?? "",
  })

  const handleOpenWhatsApp = async () => {
    if (!dealerNumber) return
    // Record a lead for billing (website clicks + WhatsApp initiations).
    // Best-effort: don't block WhatsApp even if the API call fails.
    try {
      await leadsAPI.recordWhatsappLead(car.id, car.agency?.id)
    } catch {
      // ignore
    }
    const link = getWhatsAppLink(dealerNumber, message)
    window.open(link, "_blank", "noopener,noreferrer")
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-card border border-border shadow-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageCircle size={24} className="text-primary" />
            <h2 className="text-xl font-bold text-foreground">Message dealer on WhatsApp</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted text-foreground"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          The message below will open in WhatsApp. You can edit your details before sending.
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
              required
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-border font-medium text-foreground hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50"
          >
            Open WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
