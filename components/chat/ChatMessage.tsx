"use client"

import type { CarListing } from "@/lib/api"
import { Compass } from "lucide-react"
import ChatListingCard from "./ChatListingCard"

export interface ChatMessageData {
  role: "user" | "assistant"
  content: string
  listings?: CarListing[]
}

interface ChatMessageProps {
  message: ChatMessageData
  inlineStyle?: boolean
  /** Shorter content shown only on mobile when inline */
  welcomeShort?: string
}

function formatMessageText(text: string, isUser: boolean) {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong
            key={i}
            className={isUser ? "font-semibold text-white" : "font-semibold text-foreground"}
          >
            {part.slice(2, -2)}
          </strong>
        )
      }
      return part
    })
}

export default function ChatMessage({ message, inlineStyle, welcomeShort }: ChatMessageProps) {
  const isUser = message.role === "user"
  const content = welcomeShort != null ? (
    <>
      <span className="sm:hidden">{formatMessageText(welcomeShort, isUser)}</span>
      <span className="hidden sm:inline">{formatMessageText(message.content, isUser)}</span>
    </>
  ) : (
    formatMessageText(message.content, isUser)
  )

  if (inlineStyle) {
    return (
      <div className="w-full">
        <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
          {!isUser && (
            <div className="size-8 rounded-lg flex items-center justify-center mr-2 flex-shrink-0 bg-[var(--atlas-cyan)]">
              <Compass className="size-4 text-white" />
            </div>
          )}
          <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2.5 sm:px-5 sm:py-3.5 ${isUser ? "bg-[var(--atlas-cyan)] text-white shadow-lg" : "bg-white shadow-md border-2 border-gray-100"}`}>
            <p className="text-sm whitespace-pre-line leading-relaxed">
              {content}
            </p>
          </div>
        </div>
        {!isUser && message.listings && message.listings.length > 0 && (
          <div className="mt-3 ml-10 overflow-x-auto flex gap-3 pb-1 scrollbar-thin">
            {message.listings.map((car) => (
              <ChatListingCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[88%] sm:max-w-[80%] ${isUser ? "order-2" : ""}`}>
        <div
          className={
            isUser
              ? "rounded-2xl rounded-br-md px-4 py-3 bg-primary text-primary-foreground text-[15px] leading-relaxed shadow-sm"
              : "rounded-2xl rounded-bl-md px-4 py-3 bg-card border border-border/80 text-foreground text-[15px] leading-relaxed shadow-sm"
          }
        >
          <div className="whitespace-pre-wrap break-words">{formatMessageText(message.content, isUser)}</div>
        </div>
        {!isUser && message.listings && message.listings.length > 0 && (
          <div className="mt-3 overflow-x-auto flex gap-3 pb-1 scrollbar-thin">
            {message.listings.map((car) => (
              <ChatListingCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
