"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { useChat } from "@/contexts/ChatContext"
import ChatPanel from "./ChatPanel"

export default function ChatPopup() {
  const { isOpen, closeChat } = useChat()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Chat with car agent"
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={closeChat}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Close chat"
      />

      {/* Popup: full screen on mobile, large modal on desktop */}
      <div className="relative w-full h-[82dvh] sm:h-[85vh] sm:max-h-[800px] sm:max-w-2xl sm:rounded-2xl bg-card border border-border shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between shrink-0 px-4 py-3 border-b border-border bg-muted/50">
          <h2 className="text-lg font-semibold text-foreground">Chat with our agent</h2>
          <button
            type="button"
            onClick={closeChat}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 min-h-0 flex flex-col">
          <ChatPanel className="flex-1 min-h-0 rounded-none border-0 shadow-none" popupMode />
        </div>
      </div>
    </div>
  )
}
