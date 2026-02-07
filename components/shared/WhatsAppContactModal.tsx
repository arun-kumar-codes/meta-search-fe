"use client"

import { useState } from "react"
import { X, MessageCircle } from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import { usersAPI } from "@/lib/api"
import type { CarListing } from "@/lib/api"

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
  const [phone, setPhone] = useState(user?.phone ?? "")
  const [email, setEmail] = useState(user?.email ?? "")
  const [suggestionsOptIn, setSuggestionsOptIn] = useState(user?.suggestionsOptIn ?? false)
  const [saving, setSaving] = useState(false)

  const dealerNumber = car.agency?.whatsappNumber
  const message = buildWhatsAppMessage(car, { name, phone, email })

  const handleOpenWhatsApp = async () => {
    if (!dealerNumber) return
    if (suggestionsOptIn) {
      setSaving(true)
      try {
        await usersAPI.updatePreferences(true)
      } catch {
        // ignore
      }
      setSaving(false)
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

        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Your phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Your email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
            />
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 border border-border p-3 mb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Message preview</p>
          <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">{buildWhatsAppMessage(car, { name, phone, email })}</pre>
        </div>

        <label className="flex items-center gap-2 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={suggestionsOptIn}
            onChange={(e) => setSuggestionsOptIn(e.target.checked)}
            className="rounded border-border text-primary focus:ring-ring"
          />
          <span className="text-sm text-foreground">Send me suggestions for similar cars in the future</span>
        </label>

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
            disabled={saving}
            className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50"
          >
            Open WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
