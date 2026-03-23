"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { sendChatMessage, type ChatResponse, type ChatState } from "@/lib/chatApi"
import type { ChatMessageData } from "./ChatMessage"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import { useLocation } from "@/contexts/LocationContext"
import { useUser } from "@/contexts/UserContext"
import UserLoginModal from "@/components/user/UserLoginModal"
import { Compass, Sparkles, SlidersHorizontal } from "lucide-react"

const GUEST_MESSAGE_LIMIT = 5
const CHAT_HISTORY_LIMIT = 20

const WELCOME_MESSAGE: ChatMessageData = {
  role: "assistant",
  content:
    "Hi! 👋 I'm here to help you find the right car on this app. Ask in plain language, for example:\n\n" +
    "• **Show me Swift under 5 lakh in Mumbai**\n" +
    "• **Best diesel SUVs under 15 lakh**\n" +
    "• **Maruti Baleno in your city**\n\n" +
    "I'll suggest matching cars, and you can tap any option to see full details. Your search uses your current location—you can change it anytime in the app.",
};

const WELCOME_MESSAGE_SHORT: ChatMessageData = {
  role: "assistant",
  content: "Ask for a car in plain language (e.g. **Swift under 5 lakh** or **diesel SUVs under 15 lakh**). Location can be changed in the app. Tap any result for details.",
};

interface ChatPanelProps {
  className?: string
  city?: string
  contextListingIds?: string[]
  popupMode?: boolean
  inlineMode?: boolean
}

export default function ChatPanel({ className, city: cityProp, contextListingIds, popupMode, inlineMode }: ChatPanelProps) {
  const { location } = useLocation()
  const { user } = useUser()
  const city = cityProp ?? location?.city
  const [conversationId] = useState<string>(() => {
    const key = "atlas_chat_conversation_id"
    if (typeof window === "undefined") return ""
    const existing = window.sessionStorage.getItem(key)
    if (existing) return existing
    const id = (crypto as any)?.randomUUID?.() ?? `chat_${Date.now()}_${Math.random().toString(16).slice(2)}`
    window.sessionStorage.setItem(key, id)
    return id
  })

  const chatStateKey = `atlas_chat_state_${conversationId}`
  const [chatState, setChatState] = useState<ChatState | undefined>(() => {
    if (typeof window === "undefined") return undefined
    const raw = window.sessionStorage.getItem(chatStateKey)
    if (!raw) return undefined
    try {
      return JSON.parse(raw) as ChatState
    } catch {
      return undefined
    }
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!chatState?.lastCityMemory) {
      window.sessionStorage.removeItem(chatStateKey)
      return
    }
    window.sessionStorage.setItem(chatStateKey, JSON.stringify(chatState))
  }, [chatState, chatStateKey])

  const [messages, setMessages] = useState<ChatMessageData[]>([WELCOME_MESSAGE])
  const [sending, setSending] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const userMessageCount = messages.filter((m) => m.role === "user").length
  const guestAtLimit = !user && userMessageCount >= GUEST_MESSAGE_LIMIT

  useEffect(() => {
    const el = scrollContainerRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages])

  const handleSend = async (text: string) => {
    if (guestAtLimit) {
      setLoginModalOpen(true)
      return
    }
    const userMsg: ChatMessageData = { role: "user", content: text }
    const previousMessages = messages
    setMessages((prev) => [...prev, userMsg])
    setSending(true)

    const history = previousMessages
      .slice(-CHAT_HISTORY_LIMIT)
      .map((m) => ({ role: m.role, content: m.content }))

    let response: ChatResponse
    try {
      response = await sendChatMessage({
        message: text,
        conversationId: conversationId || undefined,
        city: city ?? undefined,
        listingIds: contextListingIds?.length ? contextListingIds : undefined,
        history: history.length > 0 ? history : undefined,
        chatState,
      })
    } catch (err: any) {
      const status = err?.status
      if (status === 429 || status === 403) {
        setLoginModalOpen(true)
        response = {
          reply: `You've used your ${GUEST_MESSAGE_LIMIT} free messages. Log in to keep chatting.`,
        }
      } else {
        response = {
          reply: "Something went wrong. Please try again or use manual search below.",
        }
      }
    }

    if (response?.chatState?.lastCityMemory) {
      setChatState(response.chatState)
    }
    setSending(false)
    const assistantMsg: ChatMessageData = {
      role: "assistant",
      content: response.reply,
      listings: response.listings,
    }
    setMessages((prev) => [...prev, assistantMsg])
  }

  return (
    <div
      className={`flex flex-col overflow-hidden w-full max-h-full ${popupMode ? "h-full" : inlineMode ? "rounded-2xl bg-card border border-border shadow-lg h-full min-h-0" : "rounded-2xl border border-border bg-card shadow-lg max-h-[80vh] min-h-[320px]"
        } ${className ?? ""}`}
    >
      {inlineMode && (
        <div
          className="shrink-0 flex items-center justify-between gap-2 sm:gap-3 p-3 sm:p-5 text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(to right, var(--atlas-navy), var(--atlas-cyan))",
          }}
        >
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          <div className="relative flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="size-10 sm:size-12 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0 bg-white/20">
              <Compass className="size-6 sm:size-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-base sm:text-lg flex items-center gap-2 truncate">
                Atlas
                <Sparkles className="size-4 text-[var(--atlas-green)] shrink-0" />
              </h2>
              <p className="text-xs text-white/90 hidden sm:flex items-center gap-1.5">
                <span className="size-2 bg-[var(--atlas-green)] rounded-full animate-pulse shrink-0" />
                AI Guide • Always ready to help
              </p>
            </div>
            <span className="shrink-0 px-2 sm:px-2.5 py-1 rounded-md text-xs font-medium bg-white/20 border-0 hidden sm:inline">
              Online
            </span>
          </div>
          <Link
            href={city ? `/search?city=${encodeURIComponent(city)}` : "/search"}
            className="relative shrink-0 inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Go to search page"
          >
            <SlidersHorizontal size={16} />
          </Link>
        </div>
      )}
      <div
        ref={scrollContainerRef}
        className={`chat-messages-scroll flex-1 min-h-0 overflow-x-hidden p-3 sm:p-5 space-y-4 shrink-0 basis-0 ${popupMode ? "" : inlineMode ? "bg-gradient-to-b from-gray-50 to-white" : ""
          }`}
      >
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            message={msg}
            inlineStyle={inlineMode}
            welcomeShort={i === 0 && inlineMode ? WELCOME_MESSAGE_SHORT.content : undefined}
          />
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="size-8 rounded-lg flex items-center justify-center mr-2 flex-shrink-0 bg-[var(--atlas-cyan)]">
              <Compass className="size-4 text-white" />
            </div>
            <div className="rounded-2xl px-3 sm:px-5 py-3 sm:py-4 bg-white shadow-md border-2 border-gray-100">
              <div className="flex gap-1.5 items-center">
                <span className="text-xs text-gray-500 mr-2">
                  <span className="sm:hidden">Thinking...</span>
                  <span className="hidden sm:inline">Atlas is thinking</span>
                </span>
                <span className="size-2 bg-[var(--atlas-cyan)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="size-2 bg-[var(--atlas-cyan)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="size-2 bg-[var(--atlas-cyan)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className={`shrink-0 border-t-2 border-gray-100 bg-white ${inlineMode ? "p-3 sm:p-5" : "p-4 sm:p-5"}`}>
        {!user && userMessageCount > 0 && !guestAtLimit && (
          <p className="mb-2 text-xs text-muted-foreground">
            {userMessageCount} of {GUEST_MESSAGE_LIMIT} free messages used. Log in for unlimited chat.
          </p>
        )}
        {guestAtLimit && (
          <div className="mb-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm text-amber-800">
              You’ve used your {GUEST_MESSAGE_LIMIT} free messages. Log in to keep chatting.
            </p>
            <button
              type="button"
              onClick={() => setLoginModalOpen(true)}
              className="shrink-0 py-2 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
            >
              Log in
            </button>
          </div>
        )}
        <ChatInput
          onSend={handleSend}
          disabled={sending || guestAtLimit}
          inlineStyle={inlineMode}
          placeholder={guestAtLimit ? "Log in to send more messages" : undefined}
        />
      </div>
      <UserLoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </div>
  )
}
