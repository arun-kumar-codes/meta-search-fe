"use client"

import { useState } from "react"
import { X, Loader2 } from "lucide-react"
import { useUser } from "@/contexts/UserContext"

export default function UserLoginModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { sendOtp, login } = useUser()
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const result = await sendOtp(phone)
    setLoading(false)
    if (result.success) {
      setStep("otp")
    } else {
      setError(result.error || "Failed to send OTP")
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const result = await login(phone, otp)
    setLoading(false)
    if (result.success) {
      onClose()
      setStep("phone")
      setPhone("")
      setOtp("")
    } else {
      setError(result.error || "Invalid OTP")
    }
  }

  const handleClose = () => {
    setStep("phone")
    setPhone("")
    setOtp("")
    setError("")
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Login</h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-muted text-foreground"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {step === "phone" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210 or +919876543210"
                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              OTP sent to {phone}. Enter the code below.
            </p>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">OTP</label>
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 8))}
                placeholder="Enter 4–8 digit OTP"
                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setStep("phone"); setError(""); }}
                className="flex-1 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : "Verify & Login"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
